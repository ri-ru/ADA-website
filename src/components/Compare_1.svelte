<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import {
    buildAggregateSeries,
    buildSeriesStyles,
    fontStack,
    formatAxisValue,
    formatMillions,
    linkColors,
    linkLabels,
    makeGradient,
    years,
  } from './compareCommon';

  const seriesStyles = buildSeriesStyles();
  let linkAggregateCanvas;
  let linkAggregateChart;
  let linkAggregateVisible = $state(linkLabels.reduce((acc, k) => ({ ...acc, [k]: true }), {}));

  function isLinkSolo(label) {
    const visibles = Object.keys(linkAggregateVisible).filter((k) => linkAggregateVisible[k]);
    return visibles.length === 1 && visibles[0] === label;
  }

  function toggleLinkType(label) {
    const visibles = Object.keys(linkAggregateVisible).filter((k) => linkAggregateVisible[k]);
    const solo = visibles.length === 1 && visibles[0] === label;
    if (solo) {
      Object.keys(linkAggregateVisible).forEach((k) => (linkAggregateVisible[k] = true));
    } else {
      Object.keys(linkAggregateVisible).forEach((k) => (linkAggregateVisible[k] = k === label));
    }
    renderLinkAggregateChart();
  }

  function renderLinkAggregateChart() {
    if (!linkAggregateCanvas) return;
    if (linkAggregateChart) linkAggregateChart.destroy();
    const ctx = linkAggregateCanvas.getContext('2d');
    const canvasHeight = linkAggregateCanvas.clientHeight || 300;
    const visibleTypes = Object.keys(linkAggregateVisible).filter((k) => linkAggregateVisible[k]);
    const soloLink = visibleTypes.length === 1 ? visibleTypes[0] : null;
    const datasets = linkLabels.map((label) => {
      const { absSeries, pctSeries, totalsAll } = buildAggregateSeries(label);
      const color =
        seriesStyles[label]?.color ||
        linkColors[label.toLowerCase()] ||
        (label === 'URLs' ? seriesStyles.URLs?.color || '#38bdf8' : '#38bdf8');
      return {
        label,
        data: pctSeries,
        _abs: absSeries,
        _totals: totalsAll,
        borderColor: color,
        backgroundColor: makeGradient(ctx, color, canvasHeight),
        borderWidth: 2.3,
        tension: 0.24,
        pointRadius: 2.8,
        pointHoverRadius: 5,
        pointHitRadius: 8,
        fill: true,
        hidden: !linkAggregateVisible[label],
      };
    });
    const visibleDatasets = datasets.filter((d) => !d.hidden);
    const maxVal = visibleDatasets.length
      ? Math.max(...visibleDatasets.flatMap((d) => d.data || []), 0)
      : 100;
    const suggestedMax = Math.min(100, Math.ceil((maxVal + 5) / 10) * 10);

    const linkLabelPlugin = {
      id: 'linkAggLabels',
      afterDatasetsDraw(chart) {
        if (!soloLink) return;
        const dsIndex = chart.data.datasets.findIndex((d) => d.label === soloLink);
        if (dsIndex === -1) return;
        const meta = chart.getDatasetMeta(dsIndex);
        if (!meta || meta.hidden) return;
        const { ctx } = chart;
        ctx.save();
        const color = meta.dataset.borderColor || '#e5e7eb';
        ctx.fillStyle = color;
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

    linkAggregateChart = new Chart(ctx, {
      type: 'line',
      data: { labels: years, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 600, easing: 'easeOutQuad' },
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: {
            ticks: { color: '#9ca3af' },
            grid: { color: 'rgba(51,65,85,0.25)' },
            title: {
              display: true,
              text: 'Year',
              color: '#d1d5db',
              font: { size: 12, family: fontStack },
            },
          },
          y: {
            ticks: { color: '#9ca3af', callback: (v) => `${formatAxisValue(v)}%` },
            grid: { color: 'rgba(51,65,85,0.25)' },
            title: {
              display: true,
              text: 'Percent of uploads',
              color: '#d1d5db',
              font: { size: 13, family: fontStack, weight: 'normal' },
            },
            min: 0,
            suggestedMax,
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(15,23,42,0.9)',
            borderColor: (ctx) => ctx.tooltip?.dataPoints?.[0]?.dataset?.borderColor || '#0ea5e9',
            borderWidth: 1.2,
            padding: { top: 10, right: 12, bottom: 10, left: 12 },
            displayColors: false,
            titleFont: { size: 12, family: fontStack, weight: 'normal' },
            bodyFont: { size: 11, family: fontStack, weight: 'normal' },
            bodySpacing: 5,
            itemSort: (a, b) => (b.parsed?.y ?? 0) - (a.parsed?.y ?? 0),
            callbacks: {
              title: (ctx) => `Year ${ctx[0].label}`,
              label: (ctx) => {
                const idx = ctx.dataIndex;
                const pct = ctx.parsed.y;
                const absVal = ctx.dataset._abs?.[idx] || 0;
                const totalVal = ctx.dataset._totals?.[idx] || 0;
                return `${ctx.dataset.label}: ${formatAxisValue(pct)}% • ${formatMillions(absVal)} of ${formatMillions(totalVal)}`;
              },
            },
          },
        },
      },
      plugins: soloLink ? [linkLabelPlugin] : [],
    });
  }

  onMount(() => {
    renderLinkAggregateChart();
  });
</script>

<style>
.viz-compare-wrap {
  display: inline-table;
  color: #e5e7eb;
  font-family: var(--viz-font, 'TeXGyreAdventor', 'Tex Gyre Adventor', 'Helvetica Neue', Arial, sans-serif);
  width: 100%;
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
    row-gap: 6px;
    margin-top: 24px;
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

  .link-legend {
    margin-top: 6px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 0;
  }

  .link-pill-swatch {
    width: 14px;
    height: 10px;
    border-radius: 3px;
    display: inline-block;
    flex-shrink: 0;
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
    background: transparent !important;
  }
</style>

<div class="viz-compare-wrap">
  <!-- <div class="aggregate-wrap"> -->
    <div class="aggregate-controls">
      <div>
        <p class="aggregate-title">How creators learned to use links on YouTube</p>
        <p class="aggregate-note">From simple URLs to social presence and monetization (2008–2018)</p>
      </div>
    </div>
    <div class="aggregate-legend link-legend">
      {#each linkLabels as lt}
        {@const baseColor = seriesStyles[lt]?.color || linkColors[lt.toLowerCase()] || '#e5e7eb'}
        <button
          class={`legend-toggle ${linkAggregateVisible[lt] ? 'active' : 'inactive'}`}
          onclick={() => toggleLinkType(lt)}
          style={linkAggregateVisible[lt] && isLinkSolo(lt)
            ? `color:${baseColor};background:${baseColor}22;box-shadow:0 8px 24px ${baseColor}33;`
            : `color:${baseColor}`}
        >
          <span
            class="swatch"
            style={`--swatch-color:${baseColor};--swatch-bg:${linkAggregateVisible[lt] ? baseColor : 'transparent'};`}
          ></span>
          <span>{lt}</span>
        </button>
      {/each}
    </div>
    <div class="aggregate-chart">
      <canvas bind:this={linkAggregateCanvas}></canvas>
    </div>
  <!-- </div> -->
</div>
