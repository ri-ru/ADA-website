<script lang="ts">
  import { onMount } from 'svelte';

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

  const YOUTUBE_SEARCH = "https://www.youtube.com/results?search_query=";

  let highlightedType = $state<string | null>(null);
  let tooltipEl = $state<HTMLDivElement | null>(null);
  let tooltipText = $state('');
  let tooltipVisible = $state(false);
  let tooltipX = $state(0);
  let tooltipY = $state(0);

  // Process data
  const rows = DATA.map(d => {
    const active = d.active || 0;
    const notActive = d.not_active || 0;
    const total = active + notActive || 1;
    const pctActive = (active / total) * 100;
    const pctInactive = (notActive / total) * 100;
    return {
      id: d.id,
      label: d.label,
      active,
      notActive,
      total,
      pctActive,
      pctInactive
    };
  }).sort((a, b) => b.pctActive - a.pctActive);

  function toggleLegend(type: string) {
    highlightedType = highlightedType === type ? null : type;
  }

  function handleMouseMove(e: MouseEvent, row: typeof rows[0]) {
    tooltipText = `${row.label}\nActive: ${row.active.toLocaleString()} channels (${row.pctActive.toFixed(1)}%)\nNot active: ${row.notActive.toLocaleString()} channels (${row.pctInactive.toFixed(1)}%)`;
    tooltipVisible = true;
    
    const padding = 10;
    let x = e.clientX + padding;
    let y = e.clientY + padding;
    
    // Adjust if tooltip would go off screen
    if (tooltipEl) {
      const rect = tooltipEl.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (x + rect.width + padding > vw) x = e.clientX - rect.width - padding;
      if (y + rect.height + padding > vh) y = e.clientY - rect.height - padding;
    }
    
    tooltipX = x;
    tooltipY = y;
  }

  function handleMouseLeave() {
    tooltipVisible = false;
  }
</script>

<style>
  .activity-wrap {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }

  .summary-title {
    font-size: 22px;
    color: #f3f4f6;
    margin-bottom: 12px;
    line-height: 1.6;
  }

  .pct-active-big {
    font-size: 1.35em;
    font-weight: 700;
    color: #ff4b4b;
    background: rgba(255,255,255,0.07);
    padding: 3px 8px;
    border-radius: 6px;
  }

  .pct-inactive-text {
    font-weight: 700;
    font-size: 1.05em;
    color: #4b5563;
  }

  .legend {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #9ca3af;
    margin-bottom: 14px;
  }

  .legend-btn {
    border: none;
    background: none;
    color: #f3f4f6;
    font: inherit;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 4px 10px;
    border-radius: 999px;
    transition: transform 0.2s;
  }

  .legend-btn:hover {
    transform: translateY(-1px);
  }

  .legend-icon {
    width: 34px;
    height: 22px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 8px;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.35);
    box-shadow: inset 0 0 0 1px rgba(248, 250, 252, 0.35);
    margin-right: 6px;
  }

  .legend-icon.active { background: #ff4b4b; }
  .legend-icon.inactive { background: #4b5563; }

  .legend-icon::after {
    content: "";
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 8px solid #fff;
    margin-left: 6px;
  }

  .summary-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 5px 0;
    font-size: 11px;
    animation: fadein 0.8s ease forwards;
    cursor: pointer;
  }

  @keyframes fadein {
    from { opacity: 0; transform: translateY(3px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .summary-icon {
    width: 42px;
    height: 26px;
    border-radius: 10px;
    background: #ff0000;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    transition: border 0.2s, transform 0.2s;
  }

  .summary-icon::after {
    content: "";
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 10px solid #fff;
  }

  .summary-icon:hover {
    border-color: rgba(255, 255, 255, 0.9);
    transform: translateY(-1px);
  }

  .summary-label {
    width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #9ca3af;
  }

  .summary-bar {
    position: relative;
    flex: 1;
    height: 18px;
    border-radius: 999px;
    overflow: hidden;
    display: flex;
    background: #020617;
  }

  .summary-bar::before {
    content: "";
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    border-style: solid;
    border-width: 6px 0 6px 10px;
    border-color: transparent transparent transparent rgba(248, 250, 252, 0.9);
    z-index: 2;
    pointer-events: none;
  }

  .summary-seg {
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f9fafb;
    font-size: 10px;
    font-weight: 600;
    white-space: nowrap;
    cursor: default;
    pointer-events: none;
    transition: opacity 0.2s;
  }

  .summary-seg.dimmed { opacity: 0.35; }
  .summary-seg.active { background: #ff4b4b; }
  .summary-seg.inactive { background: #4b5563; }
  .summary-seg.small span { display: none; }

  .activity-explainer {
    margin-top: 24px;
    font-size: 13px;
    color: #9ca3af;
  }

  .activity-text {
    margin: 0 0 8px;
    line-height: 1.5;
  }

  .activity-text code {
    font-size: 12px;
    background: rgba(15, 23, 42, 0.9);
    padding: 2px 5px;
    border-radius: 4px;
  }

  .hover-tooltip {
    position: fixed;
    z-index: 99999;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    line-height: 1.5;
    background: rgba(15, 23, 42, 0.98);
    color: #e5e7eb;
    border: 1px solid rgba(148, 163, 184, 0.6);
    pointer-events: none;
    white-space: pre-line;
    box-shadow: 0 10px 30px rgba(0,0,0,0.8);
    transition: opacity 0.12s ease-out;
    max-width: 300px;
  }
</style>

<div class="activity-wrap">
  <section class="summary">
    <div class="legend">
      <button type="button" class="legend-btn" onclick={() => toggleLegend('active')}>
        <span class="legend-icon active"></span>
        <span>Active</span>
      </button>
      <button type="button" class="legend-btn" onclick={() => toggleLegend('inactive')}>
        <span class="legend-icon inactive"></span>
        <span>Not active</span>
      </button>
    </div>

    <div id="summary-bar">
      {#each rows as row, i}
        <div 
          class="summary-row" 
          style="animation-delay: {i * 0.05}s"
          onmousemove={(e) => handleMouseMove(e, row)}
          onmouseleave={handleMouseLeave}
        >
          <a 
            class="summary-icon" 
            href="{YOUTUBE_SEARCH}{encodeURIComponent(row.label)}"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Search YouTube for {row.label} channels"
          ></a>
          <div class="summary-label">{row.label}</div>
          <div class="summary-bar">
            <div 
              class="summary-seg active" 
              class:dimmed={highlightedType && highlightedType !== 'active'}
              class:small={row.pctActive < 8}
              style="width: {row.pctActive}%"
            >
              <span>{row.pctActive.toFixed(0)}%</span>
            </div>
            <div 
              class="summary-seg inactive"
              class:dimmed={highlightedType && highlightedType !== 'inactive'}
              class:small={row.pctInactive < 8}
              style="width: {row.pctInactive}%"
            >
              <span>{row.pctInactive.toFixed(0)}%</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>

<!-- Tooltip (outside main container for proper z-index) -->
{#if tooltipVisible}
  <div 
    bind:this={tooltipEl}
    class="hover-tooltip" 
    style="left: {tooltipX}px; top: {tooltipY}px;"
  >
    {tooltipText}
  </div>
{/if}
