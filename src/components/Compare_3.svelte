<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import {
    CATEGORY_ICONS,
    categories,
    categoryColors,
    buildDatasets,
    buildSeriesStyles,
    fontStack,
    formatAxisValue,
    formatMillions,
    getLayoutDims,
    linkTypes,
    years,
  } from './compareCommon';

  const seriesStyles = buildSeriesStyles();
  let compareCount = $state(2);
  let selectedCategories = $state(categories.slice(0, 2));
  let chartInstances = [];
  let canvasRefs = [];
  const seriesVisible = $state({ URLs: true, Monetization: true, Content: true, Social: true });
  const layoutDims = $derived(getLayoutDims(compareCount));

  function renderChart(cat, canvas, idx) {
    if (chartInstances[idx]) {
      chartInstances[idx].destroy();
    }

    const { datasets, totals, urlsAbs, linkAbs, urlsPct, linkPct } = buildDatasets(
      cat,
      seriesVisible,
      seriesStyles
    );
    const color = seriesStyles.URLs.color || '#38bdf8';
    const ctx = canvas.getContext('2d');
    const totalVideosSum = totals.reduce((s, v) => s + (v || 0), 0) || 0;
    const seriesAvg = [
      { key: 'URLs', pct: urlsPct, abs: urlsAbs },
      { key: 'Monetization', pct: linkPct[0] || [], abs: linkAbs[0] || [] },
      { key: 'Content', pct: linkPct[1] || [], abs: linkAbs[1] || [] },
      { key: 'Social', pct: linkPct[2] || [], abs: linkAbs[2] || [] },
    ].reduce((acc, cur) => {
      const avgPct = cur.pct.reduce((s, v) => s + (v || 0), 0) / (cur.pct.length || 1);
      const absSum = cur.abs.reduce((s, v) => s + (v || 0), 0);
      acc[cur.key] = {
        avgUnweighted: avgPct,
        avgWeighted: totalVideosSum ? (absSum / totalVideosSum) * 100 : 0,
      };
      return acc;
    }, {});

    const visibleKeys = Object.keys(seriesVisible).filter((k) => seriesVisible[k]);
    const showPointLabels = visibleKeys.length === 1;
    const soleKey = showPointLabels ? visibleKeys[0] : null;

    const pointLabelPlugin = showPointLabels
      ? {
          id: `point-labels-${cat}`,
          afterDatasetsDraw(chart) {
            const ctx = chart.ctx;
            chart.data.datasets.forEach((dataset, datasetIndex) => {
              if (dataset.label !== soleKey || dataset.label?.startsWith('Avg')) return;
              const meta = chart.getDatasetMeta(datasetIndex);
              meta.data.forEach((point, i) => {
                const value = dataset.data[i];
                if (value == null || point?.hidden) return;
                const color = dataset.borderColor || '#e5e7eb';
                ctx.save();
                ctx.fillStyle = color;
                ctx.font = `11px ${fontStack}`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText(formatAxisValue(value), point.x, point.y - 6);
                ctx.restore();
              });
            });
          },
        }
      : null;

    const chart = new Chart(ctx, {
      type: 'line',
      data: { labels: years, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        onHover: (event, activeEls) => {
          const idx = activeEls?.[0]?.index;
          chartInstances.forEach((c) => {
            if (!c) return;
            if (idx == null) {
              c.setActiveElements([]);
              c.tooltip?.setActiveElements([], { x: 0, y: 0 });
              c.update();
              return;
            }
            const acts = c.data.datasets
              .map((ds, di) => (ds.hidden ? null : { datasetIndex: di, index: idx }))
              .filter(Boolean);
            c.setActiveElements(acts);
            c.tooltip?.setActiveElements(acts, { x: 0, y: 0 });
            c.update();
          });
        },
        scales: {
          x: {
            ticks: { color: '#9ca3af' },
            grid: { color: 'rgba(51,65,85,0.3)' },
            title: { display: true, text: 'Year', color: '#d1d5db', font: { size: 12, family: fontStack } },
          },
          y: {
            ticks: { color: '#9ca3af', callback: (v) => `${formatAxisValue(v)}%` },
            grid: { color: 'rgba(51,65,85,0.3)' },
            title: { display: true, text: 'Percent of uploads', color: '#d1d5db', font: { size: 12, family: fontStack } },
            min: 0,
            max: 100,
          },
        },
        plugins: {
          legend: { display: false },
          title: { display: false },
          tooltip: {
            backgroundColor: 'rgba(15,23,42,0.9)',
            borderColor: color,
            borderWidth: 1.2,
            padding: { top: 10, right: 12, bottom: 10, left: 12 },
            displayColors: false,
            titleFont: { size: 12, family: fontStack, weight: 'normal' },
            bodyFont: { size: 11, family: fontStack, weight: 'normal' },
            footerFont: { size: 11, family: fontStack, weight: 'normal' },
            bodySpacing: 5,
            itemSort: (a, b) => (b.parsed?.y ?? 0) - (a.parsed?.y ?? 0),
            callbacks: {
              title: (ctx) => `Year ${ctx[0].label}`,
              label: (ctx) => {
                if (ctx.dataset.label?.startsWith('Avg ')) return null;
                const dataIdx = ctx.dataIndex;
                const urlsVal = urlsAbs[dataIdx] || 0;
                const totalVal = totals[dataIdx] || 0;
                if (ctx.dataset.label === 'URLs') {
                  const pct = totalVal ? ((urlsVal / totalVal) * 100).toFixed(1) : '0.0';
                  return `URLs: ${pct}% • ${formatMillions(urlsVal)} of ${formatMillions(totalVal)}`;
                }
                const key = ctx.dataset.label.toLowerCase();
                const keyIdx = linkTypes.indexOf(key);
                const absVal = keyIdx >= 0 ? (linkAbs[keyIdx][dataIdx] || 0) : 0;
                const pctTotal = totalVal ? ((absVal / totalVal) * 100).toFixed(1) : '0.0';
                const label = ctx.dataset.label;
                return `${label}: ${pctTotal}% • ${formatMillions(absVal)} of ${formatMillions(totalVal)}`;
              },
              footer: (ctx) => {
                const soleKey = visibleKeys.length === 1 ? visibleKeys[0] : null;
                if (!soleKey) return undefined;
                const showsSeries = ctx.some((item) => item.dataset?.label === soleKey);
                const stats = seriesAvg[soleKey];
                if (!showsSeries || !stats) return undefined;
                return [
                  `Avg ${soleKey} Weighted: ${formatAxisValue(stats.avgWeighted)}%`,
                  `Avg ${soleKey} Unweighted: ${formatAxisValue(stats.avgUnweighted)}%`,
                ];
              },
            },
          },
        },
      },
      plugins: pointLabelPlugin ? [pointLabelPlugin] : [],
    });
    chartInstances[idx] = chart;
  }

  function renderAll() {
    selectedCategories.forEach((cat, idx) => {
      if (canvasRefs[idx]) {
        renderChart(cat, canvasRefs[idx], idx);
      }
    });
  }

  function rerenderCategoryCharts() {
    selectedCategories.forEach((cat, idx) => {
      if (canvasRefs[idx]) {
        renderChart(cat, canvasRefs[idx], idx);
      }
    });
  }

  function clearAllHover() {
    chartInstances.forEach((c) => {
      if (!c) return;
      c.setActiveElements([]);
      c.tooltip?.setActiveElements([], { x: 0, y: 0 });
      c.update();
    });
  }

  function updateCategory(idx, cat) {
    selectedCategories[idx] = cat;
    if (canvasRefs[idx]) {
      renderChart(cat, canvasRefs[idx], idx);
    }
  }

  function toggleSeries(key) {
    const visibleKeys = Object.keys(seriesVisible).filter((k) => seriesVisible[k]);
    const solo = visibleKeys.length === 1 && visibleKeys[0] === key;

    if (solo) {
      Object.keys(seriesVisible).forEach((k) => {
        seriesVisible[k] = true;
      });
    } else {
      Object.keys(seriesVisible).forEach((k) => {
        seriesVisible[k] = false;
      });
      seriesVisible[key] = true;
    }
    rerenderCategoryCharts();
  }

  function isSeriesSolo(key) {
    const visibleKeys = Object.keys(seriesVisible).filter((k) => seriesVisible[k]);
    return visibleKeys.length === 1 && visibleKeys[0] === key;
  }

  onMount(() => {
    renderAll();
  });
</script>

<style>
.viz-compare-wrap {
  padding: 0;
  color: #e5e7eb;
  font-family: var(--viz-font, 'TeX Gyre Adventor', 'Tex Gyre Adventor', 'Helvetica Neue', Arial, sans-serif);
  overflow-x: hidden;
  width: 100%;
  max-width: none;
  margin: 0;
}

  .selectors {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 12px;
    margin-bottom: 12px;
  }

  .selected-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #e5e7eb;
    font-size: 12px;
    font-family: var(--viz-font, 'TeX Gyre Adventor', 'Tex Gyre Adventor', 'Helvetica Neue', Arial, sans-serif);
  }

  .selected-pill svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  .selector-label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: transparent;
    border: none;
    border-radius: 0;
    padding: 6px 0;
    color: #94a3b8;
    font-size: 12px;
  }

  select {
    background: transparent;
    color: #e5e7eb;
    border: 1px solid rgba(148, 163, 184, 0.35);
    border-radius: 10px;
    padding: 8px 10px;
    font-family: var(--viz-font, 'TeX Gyre Adventor', 'Tex Gyre Adventor', 'Helvetica Neue', Arial, sans-serif);
    font-size: 13px;
    outline: none;
    margin-left: 6px;
    box-shadow: none;
  }

  label {
    font-size: 12px;
    color: #94a3b8;
  }

  .series-bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 10px 0 14px;
  }

  .legend-toggle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    padding: 6px 14px;
    border-radius: 10px;
    border: none;
    background: transparent;
    color: #e5e7eb;
    cursor: pointer;
    transition: all 0.18s ease;
  }

  .legend-toggle .swatch {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    display: inline-block;
    border: 2px solid var(--swatch-color, currentColor);
    background: var(--swatch-bg, transparent);
    box-sizing: border-box;
  }

  .legend-toggle.active {
    opacity: 1;
  }

  .legend-toggle.inactive {
    opacity: 0.45;
  }

  .grid {
    display: grid;
    gap: 14px;
    grid-template-columns: repeat(auto-fit, minmax(var(--card-min, 340px), 1fr));
  }

  .card {
    background: transparent !important;
    border: none;
    border-radius: 10px;
    padding: 12px;
    min-height: var(--card-min-height, 420px);
    position: relative;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
    font-weight: 700;
    font-size: 14px;
    color: #e5e7eb;
  }

  .card-header svg {
    width: 18px;
    height: 18px;
  }

  canvas {
    width: 100% !important;
    height: var(--canvas-h, 360px) !important;
    background: transparent !important;
  }

  .aggregate-title {
    margin: 0 0 4px;
    font-size: 19px;
    font-weight: 600;
    color: #e5e7eb;
  }

  .aggregate-note {
    margin: 0 0 12px;
    font-size: 12px;
    color: #94a3b8;
  }
</style>

<div class="viz-compare-wrap">
  <div style="margin-bottom: 8px;">
    <p class="aggregate-title">Compare link usage across categories</p>
    <p class="aggregate-note">How similar trends can hide very different publishing scales (2008–2018)</p>
  </div>
  <div class="selectors">
    {#each Array(compareCount) as _, i}
      <label class="selector-label">
        <div class="selected-pill">
          {#if CATEGORY_ICONS[selectedCategories[i]]}
            <svg viewBox={CATEGORY_ICONS[selectedCategories[i]].viewBox} aria-hidden="true">
              <path d={CATEGORY_ICONS[selectedCategories[i]].path} fill={categoryColors[selectedCategories[i]]} />
            </svg>
          {/if}
          <span>Category {i + 1}: {selectedCategories[i]}</span>
        </div>
        <select bind:value={selectedCategories[i]} onchange={() => updateCategory(i, selectedCategories[i])}>
          {#each categories as cat}
            <option value={cat}>{cat}</option>
          {/each}
        </select>
      </label>
    {/each}
  </div>

  <div class="series-bar">
    <button
      class="legend-toggle {seriesVisible.URLs ? 'active' : 'inactive'}"
      onclick={() => toggleSeries('URLs')}
      style={seriesVisible.URLs
        ? `color:${seriesStyles.URLs.color};${isSeriesSolo('URLs') ? `background:${seriesStyles.URLs.color}22;box-shadow:0 8px 24px ${seriesStyles.URLs.color}33;` : ''}`
        : `color:${seriesStyles.URLs.color}`}
    >
      <span
        class="swatch"
        style={`--swatch-color:${seriesStyles.URLs.color};--swatch-bg:${seriesVisible.URLs ? seriesStyles.URLs.color : 'transparent'};`}
      ></span>
      <span>URLs</span>
    </button>
    <button
      class="legend-toggle {seriesVisible.Monetization ? 'active' : 'inactive'}"
      style={seriesVisible.Monetization
        ? `color:${seriesStyles.Monetization.color};${isSeriesSolo('Monetization') ? `background:${seriesStyles.Monetization.color}22;box-shadow:0 8px 24px ${seriesStyles.Monetization.color}33;` : ''}`
        : `color:${seriesStyles.Monetization.color}`}
      onclick={() => toggleSeries('Monetization')}
    >
      <span
        class="swatch"
        style={`--swatch-color:${seriesStyles.Monetization.color};--swatch-bg:${seriesVisible.Monetization ? seriesStyles.Monetization.color : 'transparent'};`}
      ></span>
      <span>Monetization</span>
    </button>
    <button
      class="legend-toggle {seriesVisible.Content ? 'active' : 'inactive'}"
      style={seriesVisible.Content
        ? `color:${seriesStyles.Content.color};${isSeriesSolo('Content') ? `background:${seriesStyles.Content.color}22;box-shadow:0 8px 24px ${seriesStyles.Content.color}33;` : ''}`
        : `color:${seriesStyles.Content.color}`}
      onclick={() => toggleSeries('Content')}
    >
      <span
        class="swatch"
        style={`--swatch-color:${seriesStyles.Content.color};--swatch-bg:${seriesVisible.Content ? seriesStyles.Content.color : 'transparent'};`}
      ></span>
      <span>Content</span>
    </button>
    <button
      class="legend-toggle {seriesVisible.Social ? 'active' : 'inactive'}"
      style={seriesVisible.Social
        ? `color:${seriesStyles.Social.color};${isSeriesSolo('Social') ? `background:${seriesStyles.Social.color}22;box-shadow:0 8px 24px ${seriesStyles.Social.color}33;` : ''}`
        : `color:${seriesStyles.Social.color}`}
      onclick={() => toggleSeries('Social')}
    >
      <span
        class="swatch"
        style={`--swatch-color:${seriesStyles.Social.color};--swatch-bg:${seriesVisible.Social ? seriesStyles.Social.color : 'transparent'};`}
      ></span>
      <span>Social</span>
    </button>
  </div>

  <div
    class="grid"
    style={`--card-min:${layoutDims.cardMin}px; --card-min-height:${layoutDims.cardMinHeight}px; --canvas-h:${layoutDims.canvasHeight}px;`}
  >
    {#each Array(compareCount) as _, i}
      <div class="card">
        <div class="card-header">
          {#if CATEGORY_ICONS[selectedCategories[i]]}
            <svg viewBox={CATEGORY_ICONS[selectedCategories[i]].viewBox} aria-hidden="true">
              <path d={CATEGORY_ICONS[selectedCategories[i]].path} fill={categoryColors[selectedCategories[i]]} />
            </svg>
          {/if}
          {selectedCategories[i]}
        </div>
        <canvas bind:this={canvasRefs[i]} onmouseleave={clearAllHover}></canvas>
      </div>
    {/each}
  </div>
</div>
