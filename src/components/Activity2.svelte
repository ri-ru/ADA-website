<script lang="ts">
  import { onDestroy } from 'svelte';
  import enriched from './data_config_activity_v2_enriched.json';
  import enrichedLive from './data_config_activity_v2_enriched_live.json';
  import chartTheme from '../lib/echarts-theme';
  import { ytCategories } from '../lib/CategorySelection';

  const UNIT = 200;  // channels per icon
  const CIRCLE_SIZE = 170;
  const ICON_WIDTH = 14;
  const ICON_HEIGHT = 10;

  // Prefer the live file when available so tooltips get 2025 counts.
  const dataset = (enrichedLive as any)?.DATA ? enrichedLive : enriched;

  const RAW_DATA = (dataset as any)?.DATA || [];
  const DATA = RAW_DATA.map((d: any) => ({
    id: d.id,
    label: d.label,
    active: Number(d.active) || 0,
    not_active: Number(d.not_active) || 0,
  }));

  const rawLinks = (dataset as any)?.LINKS || {};
  const LINKS: Record<string, { active: IconLink[]; not_active: IconLink[] }> = Object.fromEntries(
    Object.entries(rawLinks).map(([cat, entry]: [string, any]) => {
      const toNumber = (value: any): number | null => {
        if (typeof value === "number") return value;
        if (typeof value === "string" && value !== "Not Available" && value.trim() !== "") {
          const parsed = Number(value);
          return Number.isFinite(parsed) ? parsed : null;
        }
        return null;
      };
      const normalize = (item: any): IconLink | null => {
        if (!item) return null;
        if (typeof item === "string") return { url: item };
        return {
          url: item.url || null,
          name: item.name_cc ?? item.name ?? null,
          subscribers2019: toNumber(item.subscribers_cc),
          subscriberCount2025: toNumber(item.subscriber_count_live),
          joinDate: item.join_date ?? null,
          avatarUrl: item.channel_avatar_url ?? null,
          lastTitle: item.last_video_title ?? null,
        };
      };
      const active = (entry?.active || []).map(normalize).filter(Boolean) as IconLink[];
      const inactive = (entry?.not_active || []).map(normalize).filter(Boolean) as IconLink[];
      return [cat, { active, not_active: inactive }];
    })
  );

  interface IconLink {
    url: string | null;
    name?: string | null;
    subscribers2019?: number | null;
    subscriberCount2025?: number | null;
    joinDate?: string | null;
    avatarUrl?: string | null;
    lastTitle?: string | null;
  }

  interface TooltipSnapshot {
    name: string;
    joined: string | null;
    start: number | null;
    end: number | null;
    delta: number | null;
    pctChange: number | null;
    avatarUrl: string | null;
  }

  interface IconData {
    band: 'active' | 'inactive';
    key: string;
    x: number;
    y: number;
    url: string | null;
    meta?: IconLink | null;
    delay: number;
  }

  const compactNumber = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

  function formatCount(value: number | null | undefined): string {
    if (value === null || value === undefined || Number.isNaN(value)) return 'N/A';
    return compactNumber.format(value);
  }

  function formatJoinDate(value: string | null | undefined): string | null {
    if (!value) return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(parsed);
  }

  function formatChange(value: number | null | undefined): string {
    if (value === null || value === undefined || Number.isNaN(value)) return 'N/A';
    const sign = value > 0 ? '+' : '';
    return `${sign}${formatCount(value)}`;
  }

  function formatPercent(value: number | null | undefined): string {
    if (value === null || value === undefined || Number.isNaN(value)) return '';
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  }

  function buildTooltip(meta: IconLink | null): TooltipSnapshot | null {
    if (!meta) return null;
    const start = meta.subscribers2019 ?? null;
    const end = meta.subscriberCount2025 ?? null;
    const delta = start !== null && end !== null ? end - start : null;
    const pctChange = start && end ? (delta / start) * 100 : null;

    return {
      name: meta.name || 'Unknown channel',
      joined: formatJoinDate(meta.joinDate) || meta.joinDate || null,
      start,
      end,
      delta,
      pctChange,
      avatarUrl: meta.avatarUrl || null,
    };
  }

  interface CardData {
    id: string;
    label: string;
    icon: string;
    iconColor: string;
    active: number;
    notActive: number;
    total: number;
    pctActive: number;
    pctInactive: number;
  }

  const ECHARTS_CATEGORY_ORDER = [
    "Autos & Vehicles",
    "Comedy",
    "Education",
    "Entertainment",
    "Film & Animation",
    "Gaming",
    "Howto & Style",
    "Music",
    "News & Politics",
    "Nonprofits & Activism",
    "People & Blogs",
    "Pets & Animals",
    "Science & Technology",
    "Sports",
    "Travel & Events",
  ];

  const LABEL_TO_ECHARTS_NAME: Record<string, string> = {
    "Science & Tech.": "Science & Technology",
    "Nonprofits": "Nonprofits & Activism",
  };

  const CATEGORY_COLORS: Record<string, string> = ECHARTS_CATEGORY_ORDER.reduce((acc, name, idx) => {
    const palette = chartTheme.color ?? [];
    const color = palette[idx % palette.length] || palette[0] || 'var(--ds-text-muted)';
    acc[name] = color;
    return acc;
  }, {} as Record<string, string>);

  function getCategoryColor(label: string): string {
    const key = LABEL_TO_ECHARTS_NAME[label] || label;
    return CATEGORY_COLORS[key] || 'var(--ds-text-muted)';
  }

  let cardObserver: IntersectionObserver | null = null;

  // Compute max icons for scaling
  const MAX_ICONS = Math.max(1, ...DATA.map(d => {
    const nActive = Math.round((d.active || 0) / UNIT);
    const nInactive = Math.round((d.not_active || 0) / UNIT);
    return nActive + nInactive;
  }));

  const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

  function buildIcons(d: typeof DATA[0]): IconData[] {
    const active = d.active || 0;
    const notActive = d.not_active || 0;

    const nActive = Math.round(active / UNIT);
    const nInactive = Math.round(notActive / UNIT);

    const bands: ('active' | 'inactive')[] = [];
    bands.push(...Array(nActive).fill('active'));
    bands.push(...Array(nInactive).fill('inactive'));

    const nIcons = bands.length;
    const cx = CIRCLE_SIZE / 2;
    const cy = CIRCLE_SIZE / 2;

    const baseMaxR = Math.min(cx, cy) + 6;
    const maxR = baseMaxR * Math.sqrt(nIcons / MAX_ICONS);
    const step = nIcons > 0 ? maxR / Math.sqrt(nIcons) : 0;

    const activeLinks = LINKS[d.id]?.active || [];
    const inactiveLinks = LINKS[d.id]?.not_active || [];
    let ai = 0;
    let ii = 0;

    const icons: IconData[] = bands.map((band, idx) => {
      const r = step * Math.sqrt(idx + 0.5);
      const theta = idx * GOLDEN_ANGLE;
      const x = cx + r * Math.cos(theta) - ICON_WIDTH / 2;
      const y = cy + r * Math.sin(theta) - ICON_HEIGHT / 2;
      const link = band === 'active' ? (activeLinks[ai++] || null) : (inactiveLinks[ii++] || null);
      const url = link?.url || null;

      return {
        band,
        key: `${d.id}-${idx}`,
        x,
        y,
        url,
        meta: link,
        delay: idx * 20
      };
    });

    return icons;
  }

  function buildCardData(d: typeof DATA[0]): CardData {
    const active = d.active || 0;
    const notActive = d.not_active || 0;
    const total = active + notActive || 1;
    const pctActive = Math.round((active / total) * 100);
    const pctInactive = Math.round((notActive / total) * 100);
    const icon = ytCategories.find(e => { return e.name === d.label; }).icon;
    const iconColor = getCategoryColor(d.label);
    return {
      id: d.id,
      label: d.label,
      active,
      notActive,
      total,
      pctActive,
      pctInactive,
      icon,
      iconColor,
    };
  }

  const cards: CardData[] = DATA.map(buildCardData);
  const dataById: Record<string, (typeof DATA)[number]> = Object.fromEntries(
    DATA.map((item) => [item.id, item])
  );

  let hoveredIconKey = $state<string | null>(null);
  let isVisible = $state<Record<string, boolean>>({});
  let iconsByCard = $state<Record<string, IconData[]>>({});
  let avatarReady = $state<Record<string, boolean>>({});
  let avatarLoading = $state<Record<string, boolean>>({});
  let showDetails = $state(false);

  function openChannel(url: string | null) {
    if (url) window.open(url, '_blank');
  }

  function ensureIcons(cardId: string) {
    if (iconsByCard[cardId]) return;
    const data = dataById[cardId];
    if (!data) return;
    iconsByCard[cardId] = buildIcons(data);
  }

  function warmAvatar(icon: IconData) {
    if (avatarReady[icon.key] || avatarLoading[icon.key]) return;
    const url = icon.meta?.avatarUrl;
    if (!url) return;
    avatarLoading[icon.key] = true;
    const img = new Image();
    img.onload = () => {
      avatarReady[icon.key] = true;
      avatarLoading[icon.key] = false;
    };
    img.onerror = () => {
      avatarLoading[icon.key] = false;
    };
    img.src = url;
  }

function observeCard(node: HTMLElement) {
  if (!cardObserver) {
    cardObserver = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const target = entry.target as HTMLElement;
          const id = target.dataset.cardId;

          // always unobserve once it intersects (even if already visible)
          observer.unobserve(target);

          if (!id || isVisible[id]) continue;

          isVisible[id] = true;
          ensureIcons(id);
        }
      },
      { rootMargin: '200px' }
    );
  }

  cardObserver.observe(node);

  return {
    destroy() {
      cardObserver?.unobserve(node);
    }
  };
}


  onDestroy(() => {
    cardObserver?.disconnect();
    cardObserver = null;
  });
</script>

<style>
  .activity2-wrap {
    width: min(1200px, 100%);
    margin: var(--ds-space-xl) auto;
    padding: 0;
    background: transparent;
    border: none;
    box-shadow: none;
    position: relative;
  }

  .activity2-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--ds-text);
    margin: 0 0 var(--ds-space-xs);
  }

  .activity2-subtitle {
    font-size: 1rem;
    color: var(--ds-text-muted);
    line-height: 1.5;
    margin: 0 0 var(--ds-space-sm);
  }

  .activity2-subtitle-row {
    display: block;
    margin: 0 0 var(--ds-space-sm);
  }

  .activity2-subtitle-button {
    appearance: none;
    border: 2px solid rgba(234, 118, 203, 0.5);
    outline: none;
    background: transparent;
    color: var(--ds-text);
    font-size: 0.92rem;
    padding: 2px 8px;
    border-radius: 999px;
    cursor: pointer;
    margin-left: 6px;
    white-space: nowrap;
    vertical-align: baseline;
  }

  .activity2-subtitle-button:hover {
    color: var(--ds-text);
    border-color: var(--ds-chart-3);
  }

  .activity2-subtitle-button:focus-visible {
    outline: 2px solid var(--ds-focus, #7aa2f7);
    outline-offset: 2px;
  }

  .activity2-subtitle-detail {
    font-size: 1rem;
    color: var(--ds-text-muted);
    line-height: 1.5;
    margin: 0 0 var(--ds-space-md);
  }

  .grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--ds-space-xs);
  }

  .card {
    background: transparent;
    border-radius: 0;
    border: none;
    padding: var(--ds-space-xs) var(--ds-space-xs) var(--ds-space-sm);
    box-shadow: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .helper-text {
    font-size: 0.75rem;
    color: var(--ds-text-muted);
    margin-bottom: var(--ds-space-sm);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  .card-title {
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--ds-text);
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .stat-inline {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.58rem;
    color: var(--ds-text-muted);
    text-transform: none;
    letter-spacing: 0.05em;
  }

  .header-icon {
    width: 16px;
    height: 10px;
    border-radius: 3px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: linear-gradient(135deg, #1e66f5, #04a5e5);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.2);
  }

  .header-icon.inactive {
    background: linear-gradient(135deg, #d20f39, #e64553);
  }

  .header-icon::before {
    content: "";
    border-style: solid;
    border-width: 1.5px 0 1.5px 3.5px;
    border-color: transparent transparent transparent #ffffff;
  }

  .card-meta {
    font-size: 0.6rem;
    color: var(--ds-text-muted);
    margin-bottom: var(--ds-space-xs);
    padding-left: 2px;
    text-transform: none;
    letter-spacing: 0.5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .card-meta .total-channels {
    color: #fff;
    font-weight: 400;
  }

  .circle {
    position: relative;
    width: 170px;
    height: 170px;
    max-width: 100%;
    margin: 0 auto;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(30, 102, 245, 0.16), transparent 70%);
    border: none;
    overflow: visible;
  }

  .circle::after {
    content: "";
    position: absolute;
    inset: 14px;
    border-radius: 50%;
    border: none;
    pointer-events: none;
    z-index: 0;
  }

  .icon {
    position: absolute;
    width: 14px;
    height: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 0 0 rgba(15, 23, 42, 0.4);
    opacity: 0;
    transform: scale(.7) translateY(4px);
    transition: opacity .22s ease-out, transform .22s ease-out,
                box-shadow .18s ease-out;
    border: 1px solid #7c828f;
  }

  .icon.active { background: linear-gradient(135deg, #7c828f, #646b79); }
  .icon.inactive { background: linear-gradient(135deg, #7c828f, #646b79); }

  .icon::before {
    content: "";
    border-style: solid;
    border-width: 2px 0 2px 4px;
    border-color: transparent transparent transparent #ffffff;
    margin-left: 0.5px;
    position: relative;
    z-index: 1;
  }

  .icon.on {
    opacity: 1;
    transform: scale(1) translateY(0);
    z-index: 2;
  }

  .icon:hover,
  .icon.is-hovered {
    box-shadow: 0 0 0 2px rgba(114,135,253,0.4);
    transform: scale(1.06) translateY(-1px);
    z-index: 500;
  }

  /* Bring band color back on hover/focus */
  .icon.active:hover,
  .icon.active.is-hovered,
  .icon.active:focus-visible {
    background: linear-gradient(135deg, #1e66f5, #04a5e5);
    border-color: #1e66f5;
  }

  .icon.inactive:hover,
  .icon.inactive.is-hovered,
  .icon.inactive:focus-visible {
    background: linear-gradient(135deg, #d20f39, #e64553);
    border-color: #d20f39;
  }

  .icon.no-link {
    cursor: default;
    box-shadow: none;
    opacity: 0.35;
  }

  .tooltip-card {
    position: absolute;
    left: 50%;
    top: -10px;
    transform: translate(-50%, -115%) scale(0.96);
    background: #0b1222;
    color: #e6edf7;
    border-radius: 10px;
    padding: 10px 12px;
    min-width: 210px;
    max-width: 260px;
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.55);
    border: 1px solid rgba(255, 255, 255, 0.06);
    opacity: 0;
    pointer-events: none;
    transition: opacity .16s ease-out, transform .16s ease-out;
    z-index: 400;
    font-size: 11px;
    line-height: 1.4;
    white-space: normal;
  }

  .icon:hover .tooltip-card,
  .icon.is-hovered .tooltip-card,
  .icon:focus-visible .tooltip-card {
    opacity: 1;
    transform: translate(-50%, -122%) scale(1);
  }

  .tooltip-card.active-band {
    border-color: rgba(30, 102, 245, 0.0);
  }

  .tooltip-card.inactive-band {
    border-color: rgba(210, 15, 57, 0.0);
  }

  .icon:hover .tooltip-card.active-band,
  .icon.is-hovered .tooltip-card.active-band,
  .icon:focus-visible .tooltip-card.active-band {
    border-color: #1e66f5;
    box-shadow: 0 14px 34px rgba(30, 102, 245, 0.18);
  }

  .icon:hover .tooltip-card.inactive-band,
  .icon.is-hovered .tooltip-card.inactive-band,
  .icon:focus-visible .tooltip-card.inactive-band {
    border-color: #d20f39;
    box-shadow: 0 14px 34px rgba(210, 15, 57, 0.18);
  }

  .tooltip-top {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: nowrap;
    margin-bottom: 8px;
  }

  .tooltip-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.1);
  }

  .tooltip-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .tooltip-name {
    font-weight: 700;
    color: #f8fafc;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tooltip-join {
    color: #cbd5e1;
    font-size: 10px;
  }

  .tooltip-change {
    display: inline-flex;
    align-items: baseline;
    gap: 6px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .trend-icon {
    font-size: 12px;
  }

  .trend-label {
    color: #cbd5e1;
    font-weight: 600;
    font-size: 10px;
  }

  .trend-up {
    color: #38b249;
  }

  .trend-down {
    color: #e5484d;
  }

  .trend-pct {
    color: inherit;
    font-weight: 600;
  }

  .tooltip-row {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #e2e8f0;
    font-weight: 600;
  }

  .dot-sep {
    color: #94a3b8;
  }

  @media (max-width: 640px) {
    .activity2-wrap {
      padding: var(--ds-space-md);
    }
    .circle {
      width: 170px;
      height: 170px;
    }
  }
</style>

<div class="activity2-wrap">
  <h2 class="activity2-title">Activity Status of YouTube Channels in 2025</h2>


  <div class="grid">
    {#each cards as card}
        <div class="card" data-card-id={card.id} use:observeCard>
          <div class="card-header">
          <div class="card-title">
            <span class="nf-icon" style="color: {card.iconColor};">{card.icon}</span>
            <span>{card.label}</span>
          </div>
        </div>
        <div class="card-meta">
          <span class="total-channels">Total channels {(card.total / 1000).toFixed(1)}K</span>
          <span class="stat-inline">
            <span class="header-icon"></span>
            <span>Active {card.pctActive}%</span>
          </span>
          <span class="stat-inline">
            <span class="header-icon inactive"></span>
            <span>Inactive {card.pctInactive}%</span>
          </span>
        </div>
        <div class="circle">
          {#if isVisible[card.id]}
            {#each iconsByCard[card.id] ?? [] as icon}
              <div
                class="icon {icon.band}"
                class:on={true}
                class:no-link={!icon.url}
                class:is-hovered={hoveredIconKey === icon.key}
                style="left: {icon.x}px; top: {icon.y}px; animation-delay: {icon.delay}ms;"
                onclick={() => { if (icon.url) openChannel(icon.url); }}
                onkeydown={(e) => { if (icon.url && e.key === 'Enter') openChannel(icon.url); }}
                onpointerenter={() => { hoveredIconKey = icon.key; warmAvatar(icon); }}
                onpointerleave={() => { hoveredIconKey = null; }}
                onfocus={() => { hoveredIconKey = icon.key; warmAvatar(icon); }}
                onblur={() => { hoveredIconKey = null; }}
                role={icon.url ? 'link' : undefined}
            >
              {#if hoveredIconKey === icon.key && icon.meta}
                {@const tooltip = buildTooltip(icon.meta)}
                <div
                  class="tooltip-card"
                  class:active-band={icon.band === 'active'}
                  class:inactive-band={icon.band === 'inactive'}
                  aria-hidden="true"
                >
                  <div class="tooltip-top">
                    {#if tooltip?.avatarUrl && avatarReady[icon.key]}
                      <img class="tooltip-avatar" src={tooltip.avatarUrl} alt="" loading="lazy" decoding="async" />
                    {/if}
                    <div class="tooltip-text">
                      <span class="tooltip-name">{tooltip?.name}</span>
                      {#if tooltip?.joined}
                        <span class="tooltip-join">Joined {tooltip.joined}</span>
                      {/if}
                    </div>
                  </div>
                  <div class="tooltip-row">
                    <span class="trend-label">Subscribers</span>
                    <span>2019 {formatCount(tooltip?.start)}</span>
                    <span class="dot-sep">·</span>
                    <span>2025 {formatCount(tooltip?.end)}</span>
                  </div>
                  {#if tooltip?.delta !== null}
                    <div class="tooltip-change {tooltip.delta >= 0 ? 'trend-up' : 'trend-down'}">
                      <span class="trend-icon">{tooltip.delta >= 0 ? '▲' : '▼'}</span>
                      <span class="trend-value">{formatChange(tooltip.delta)}</span>
                      {#if tooltip?.pctChange !== null}
                        <span class="trend-pct">({formatPercent(tooltip.pctChange)})</span>
                      {/if}
                      <span class="trend-label">from 2019</span>
                    </div>
                  {/if}
                </div>
              {/if}
              </div>
            {/each}
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
