<script lang="ts">
  import { onMount } from 'svelte';
  import LINKS from './activity2_links.json';

  const UNIT = 200;  // channels per icon

  const DATA = [
    { id: "Music", label: "Music", active: 14437, not_active: 9848 },
    { id: "Entertainment", label: "Entertainment", active: 12762, not_active: 10189 },
    { id: "Gaming", label: "Gaming", active: 10797, not_active: 9346 },
    { id: "People & Blogs", label: "People & Blogs", active: 9397, not_active: 9016 },
    { id: "Howto & Style", label: "Howto & Style", active: 7657, not_active: 4218 },
    { id: "Education", label: "Education", active: 5373, not_active: 2430 },
    { id: "Film & Animation", label: "Film & Animation", active: 3477, not_active: 3398 },
    { id: "Sports", label: "Sports", active: 3486, not_active: 1662 },
    { id: "Science & Technology", label: "Science & Technology", active: 3218, not_active: 1646 },
    { id: "Comedy", label: "Comedy", active: 2091, not_active: 1676 },
    { id: "Autos & Vehicles", label: "Autos & Vehicles", active: 2643, not_active: 1062 },
    { id: "News & Politics", label: "News & Politics", active: 1638, not_active: 625 },
    { id: "Travel & Events", label: "Travel & Events", active: 1421, not_active: 568 },
    { id: "Pets & Animals", label: "Pets & Animals", active: 788, not_active: 504 },
    { id: "Nonprofits & Activism", label: "Nonprofits & Activism", active: 323, not_active: 646 }
  ];

  interface IconData {
    band: 'active' | 'inactive';
    x: number;
    y: number;
    url: string | null;
    delay: number;
  }

  interface CardData {
    id: string;
    label: string;
    active: number;
    notActive: number;
    total: number;
    pctActive: number;
    icons: IconData[];
  }

  let cards = $state<CardData[]>([]);
  let circleRefs: Record<string, HTMLDivElement> = {};

  // Compute max icons for scaling
  const MAX_ICONS = Math.max(...DATA.map(d => {
    const nActive = Math.round((d.active || 0) / UNIT);
    const nInactive = Math.round((d.not_active || 0) / UNIT);
    return nActive + nInactive;
  }));

  const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

  function buildCardData(d: typeof DATA[0]): CardData {
    const active = d.active || 0;
    const notActive = d.not_active || 0;
    const total = active + notActive || 1;
    const pctActive = Math.round((active / total) * 100);

    const nActive = Math.round(active / UNIT);
    const nInactive = Math.round(notActive / UNIT);

    const bands: ('active' | 'inactive')[] = [];
    bands.push(...Array(nActive).fill('active'));
    bands.push(...Array(nInactive).fill('inactive'));

    const nIcons = bands.length;
    const cx = 150; // half of 300px circle
    const cy = 150;

    const baseMaxR = Math.min(cx, cy) + 10;
    const maxR = baseMaxR * Math.sqrt(nIcons / MAX_ICONS);
    const step = nIcons > 0 ? maxR / Math.sqrt(nIcons) : 0;

    const urlsByBand = {
      active: [...(LINKS[d.id]?.active || [])],
      inactive: [...(LINKS[d.id]?.not_active || [])]
    };

    const icons: IconData[] = bands.map((band, idx) => {
      const r = step * Math.sqrt(idx + 0.5);
      const theta = idx * GOLDEN_ANGLE;
      const x = cx + r * Math.cos(theta) - 13;
      const y = cy + r * Math.sin(theta) - 9;
      const url = urlsByBand[band].shift() || null;

      return { band, x, y, url, delay: idx * 20 };
    });

    return { id: d.id, label: d.label, active, notActive, total, pctActive, icons };
  }

  onMount(() => {
    cards = DATA.map(buildCardData);
  });

  function openChannel(url: string | null) {
    if (url) window.open(url, '_blank');
  }
</script>

<style>
  .activity2-wrap {
    width: 100%;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 22px;
  }

  .card {
    background: radial-gradient(900px 600px at -10% 120%, rgba(148, 163, 184, .26), transparent 60%);
    background-color: #0b1020;
    border-radius: 18px;
    padding: 16px 18px 18px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.55);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  }

  .card-title {
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #f3f4f6;
  }

  .card-header-stats {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    font-weight: 600;
    color: #f3f4f6;
  }

  .header-stat {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .header-icon {
    width: 16px;
    height: 10px;
    border-radius: 3px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #ff4b4b;
  }

  .header-icon::before {
    content: "";
    border-style: solid;
    border-width: 3px 0 3px 5px;
    border-color: transparent transparent transparent #ffffff;
  }

  .card-meta {
    font-size: 11px;
    color: #9ca3af;
    margin-bottom: 10px;
  }

  .circle {
    position: relative;
    width: 300px;
    height: 300px;
    max-width: 100%;
    margin-inline: auto;
  }

  .icon {
    position: absolute;
    width: 26px;
    height: 18px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 0 0 rgba(15, 23, 42, 0.4);
    opacity: 0;
    transform: scale(.7) translateY(4px);
    transition: opacity .22s ease-out, transform .22s ease-out,
                box-shadow .18s ease-out;
  }

  .icon.active { background: #ff4b4b; }
  .icon.inactive { background: #4b5563; }

  .icon::before {
    content: "";
    border-style: solid;
    border-width: 4px 0 4px 7px;
    border-color: transparent transparent transparent #ffffff;
    margin-left: 1px;
  }

  .icon.on {
    opacity: 1;
    transform: scale(1) translateY(0);
  }

  .icon:hover {
    box-shadow: 0 0 0 2px rgba(248, 250, 252, 0.5);
    transform: scale(1.06) translateY(-1px);
  }

  .icon.no-link {
    cursor: default;
  }
</style>

<div class="activity2-wrap">
  <div class="grid">
    {#each cards as card}
      <div class="card">
        <div class="card-header">
          <div class="card-title">{card.label}</div>
          <div class="card-header-stats">
            <span class="header-stat">
              <span class="header-icon"></span>
              <span>{card.pctActive}%</span>
            </span>
          </div>
        </div>
        <div class="card-meta">
          total channels: {(card.total / 1000).toFixed(1)}K
        </div>
        <div class="circle" bind:this={circleRefs[card.id]}>
          {#each card.icons as icon, idx}
            <div
              class="icon {icon.band}"
              class:on={true}
              class:no-link={!icon.url}
              style="left: {icon.x}px; top: {icon.y}px; animation-delay: {icon.delay}ms;"
              onclick={() => openChannel(icon.url)}
              onkeydown={(e) => { if (e.key === 'Enter') openChannel(icon.url); }}
              role="link"
              tabindex="0"
              title={icon.url ? 'open channel' : ''}
            ></div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
