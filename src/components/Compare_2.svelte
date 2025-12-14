<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import {
    CATEGORY_ICONS,
    categories,
    categoryColors,
    buildAggregateSeries,
    buildCategorySeries,
    buildSeriesStyles,
    fontStack,
    formatAxisValue,
    formatMillions,
    linkColors,
    makeGradient,
    years,
  } from './compareCommon';

  const seriesStyles = buildSeriesStyles();
  let aggregateCanvas;
  let aggregateChart;
  let aggregateMetric = $state('Monetization');
  let aggregateMode = $state('categories'); // preserve original behaviour
  let aggregateVisible = $state(categories.reduce((acc, c) => ({ ...acc, [c]: true }), {}));

  function selectAggregateMetric(metric) {
    aggregateMetric = metric;
    renderAggregateChart();
  }

  function isAggregateSolo(cat) {
    const visibleCats = categories.filter((c) => aggregateVisible[c]);
    return visibleCats.length === 1 && visibleCats[0] === cat;
  }

  function toggleAggregateCat(cat) {
    if (aggregateMode !== 'categories') return;
    const visibleCats = categories.filter((c) => aggregateVisible[c]);
    const solo = visibleCats.length === 1 && visibleCats[0] === cat;
    if (solo) {
      categories.forEach((c) => (aggregateVisible[c] = true));
    } else {
      categories.forEach((c) => (aggregateVisible[c] = c === cat));
    }
    renderAggregateChart();
  }

  function renderAggregateChart() {
    if (!aggregateCanvas) return;
    if (aggregateChart) aggregateChart.destroy();
    const metric = aggregateMetric;
    const { absSeries, pctSeries, totalsAll } = buildAggregateSeries(metric);
    const catSeries = buildCategorySeries(metric);
    const color = seriesStyles[metric]?.color || linkColors[metric.toLowerCase()] || '#38bdf8';
    const ctx = aggregateCanvas.getContext('2d');
    const canvasHeight = aggregateCanvas.clientHeight || 300;
    const grad = makeGradient(ctx, color, canvasHeight);
    const visibleCats = categories.filter((c) => aggregateVisible[c]);
    const soloCat = aggregateMode === 'categories' && visibleCats.length === 1 ? visibleCats[0] : null;
    const maxVal = (() => {
      if (aggregateMode === 'aggregated') {
        const m = Math.max(...pctSeries);
        return Number.isFinite(m) ? m : 100;
      }
      const vals = catSeries.filter((s) => aggregateVisible[s.cat]).flatMap((s) => s.pct || []);
      const m = Math.max(...vals);
      return Number.isFinite(m) ? m : 100;
    })();
    const suggestedMax = Math.min(100, Math.ceil((maxVal + 5) / 10) * 10);

    const labelPlugin = {
      id: 'aggLabels',
      afterDatasetsDraw(chart) {
        if (!soloCat) return;
        const dsIndex = chart.data.datasets.findIndex((d) => d.label === soloCat);
        if (dsIndex === -1) return;
        const meta = chart.getDatasetMeta(dsIndex);
        if (!meta || meta.hidden) return;
        const { ctx } = chart;
        ctx.save();
        const textColor = meta.dataset.borderColor || categoryColors[soloCat] || '#e5e7eb';
        ctx.fillStyle = textColor;
        ctx.strokeStyle = 'rgba(15,23,42,0.75)';
        ctx.lineWidth = 3;
        ctx.font = `11px ${fontStack}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        meta.data.forEach((pt, i) => {
          const val = meta._dataset.data[i];
          if (val == null) return;
          const label = `${formatAxisValue(val)}%`;
          ctx.strokeText(label, pt.x, pt.y - 6);
          ctx.fillText(label, pt.x, pt.y - 6);
        });
        ctx.restore();
      },
    };

    const hasManyCats = aggregateMode === 'categories' && visibleCats.length > 1;

    aggregateChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets:
          aggregateMode === 'aggregated'
            ? [
                {
                  label: metric,
                  data: pctSeries,
                  _abs: absSeries,
                  _totals: totalsAll,
                  borderColor: color,
                  backgroundColor: grad,
                  borderWidth: 2.4,
                  tension: 0.28,
                  pointRadius: 2,
                  pointHoverRadius: 5,
                  pointHitRadius: 8,
                  fill: true,
                },
              ]
            : catSeries.map(({ cat, pct, abs, totals }) => ({
                label: cat,
                data: pct,
                _abs: abs,
                _totals: totals,
                borderColor: categoryColors[cat] || color,
                backgroundColor:
                  soloCat === cat ? makeGradient(ctx, categoryColors[cat] || color, canvasHeight) : 'rgba(0,0,0,0)',
                borderWidth: 2,
                tension: 0.2,
                pointRadius: hasManyCats ? 1.5 : 3,
                pointHoverRadius: hasManyCats ? 4 : 6,
                pointHitRadius: 8,
                fill: soloCat === cat,
                hidden: !aggregateVisible[cat],
              })),
      },
      options: {
        animation: { duration: 650, easing: 'easeOutQuad' },
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
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
            suggestedMax,
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(15,23,42,0.9)',
            borderColor: (ctx) => ctx.tooltip?.dataPoints?.[0]?.dataset?.borderColor || color,
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
                const idx = ctx.dataIndex;
                const pct = ctx.parsed.y;
                const absVal = ctx.dataset._abs?.[idx] || 0;
                const totalVal = ctx.dataset._totals?.[idx] || 0;
                const label = aggregateMode === 'aggregated' ? metric : ctx.dataset.label;
                return `${label}: ${formatAxisValue(pct)}% • ${formatMillions(absVal)} of ${formatMillions(totalVal)}`;
              },
            },
          },
          aggLabels: { enabled: !!soloCat },
        },
      },
      plugins: soloCat ? [labelPlugin] : [],
    });
  }

  onMount(() => {
    renderAggregateChart();
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

  .aggregate-wrap {
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-radius: 10px;
    padding: 10px;
    margin: 10px 0 16px;
    background: transparent !important;
  }

  .aggregate-controls {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    margin-bottom: 8px;
  }

  .aggregate-title {
    margin: 0 0 4px;
    font-size: 19px;
    font-weight: 600;
    color: #e5e7eb;
  }

  .aggregate-note {
    margin: 0 0 8px;
    font-size: 12px;
    color: #94a3b8;
  }

  .aggregate-chart {
    height: clamp(280px, 40vh, 380px);
  }

  .aggregate-legend {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    column-gap: 10px;
    row-gap: 3px;
    margin-top: 0;
    padding: 0 24px 0 24px;
    width: 100%;
    align-items: center;
  }

  .aggregate-legend .pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 2px 4px;
    background: transparent;
    border: none;
    border-radius: 8px;
    color: #e2e8f0;
    font-size: 11px;
    letter-spacing: 0.12px;
    font-family: var(--viz-font, 'TeX Gyre Adventor', 'Tex Gyre Adventor', 'Helvetica Neue', Arial, sans-serif);
    white-space: nowrap;
    cursor: pointer;
    transition: background 0.18s ease, box-shadow 0.18s ease, color 0.18s ease;
  }

  .aggregate-legend .pill.inactive {
    color: #64748b;
    opacity: 0.75;
  }

  .aggregate-legend svg {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
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

  canvas {
    width: 100% !important;
    height: 360px !important;
    background: transparent !important;
  }
</style>

<div class="viz-compare-wrap">
  <div class="aggregate-wrap">
    <div class="aggregate-controls">
      <div>
        <p class="aggregate-title">How creators learned to use links across YouTube categories</p>
        <p class="aggregate-note">When video descriptions became more than an afterthought (2008–2018)</p>
      </div>
    </div>
    <div class="series-bar" style="justify-content:center; margin:4px auto 10px auto; max-width: 520px;">
      {#each ['URLs', 'Monetization', 'Content', 'Social'] as lt}
        {@const baseColor = seriesStyles[lt]?.color || linkColors[lt.toLowerCase()] || '#e5e7eb'}
        <button
          class={`legend-toggle ${aggregateMetric === lt ? 'active' : 'inactive'}`}
          onclick={() => selectAggregateMetric(lt)}
          style={aggregateMetric === lt
            ? `color:${baseColor};background:${baseColor}22;box-shadow:0 8px 24px ${baseColor}33;`
            : `color:${baseColor}`}
        >
          <span
            class="swatch"
            style={`--swatch-color:${baseColor};--swatch-bg:${aggregateMetric === lt ? baseColor : 'transparent'};`}
          ></span>
          <span>{lt}</span>
        </button>
      {/each}
    </div>
    <div class="aggregate-chart">
      <canvas bind:this={aggregateCanvas}></canvas>
    </div>
    <div class="aggregate-legend">
      {#each categories as cat}
        <div
          class={`pill ${aggregateVisible[cat] ? 'active' : 'inactive'}`}
          onclick={() => toggleAggregateCat(cat)}
          title={aggregateMode === 'categories' ? `Toggle ${cat}` : undefined}
          style={aggregateVisible[cat] && isAggregateSolo(cat)
            ? `background:${categoryColors[cat]}20;box-shadow:0 6px 22px ${categoryColors[cat]}33;color:#fdf4ff;`
            : ''}
        >
          {#if CATEGORY_ICONS[cat]}
            <svg viewBox={CATEGORY_ICONS[cat].viewBox} aria-hidden="true">
              <path d={CATEGORY_ICONS[cat].path} fill={categoryColors[cat]} />
            </svg>
          {/if}
          <span style={`color:${aggregateVisible[cat] ? (categoryColors[cat] || '#e2e8f0') : '#64748b'}`}>
            {cat}
          </span>
        </div>
      {/each}
    </div>
  </div>
</div>
