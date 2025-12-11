<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  const dataRows = [
    {year:2008,"Autos & Vehicles":18476,"Comedy":9555,"Education":22799,"Entertainment":55638,"Film & Animation":7751,"Gaming":25312,"Howto & Style":26063,"Music":51183,"News & Politics":25270,"Nonprofits & Activism":6123,"People & Blogs":31167,"Pets & Animals":6921,"Science & Technology":17317,"Sports":23328,"Travel & Events":11130},
    {year:2009,"Autos & Vehicles":35480,"Comedy":14795,"Education":41520,"Entertainment":91212,"Film & Animation":14809,"Gaming":86693,"Howto & Style":42771,"Music":116200,"News & Politics":67463,"Nonprofits & Activism":13577,"People & Blogs":60399,"Pets & Animals":10295,"Science & Technology":32539,"Sports":45629,"Travel & Events":21174},
    {year:2010,"Autos & Vehicles":59593,"Comedy":18945,"Education":74632,"Entertainment":153734,"Film & Animation":28327,"Gaming":141462,"Howto & Style":67351,"Music":174585,"News & Politics":97464,"Nonprofits & Activism":21495,"People & Blogs":66036,"Pets & Animals":15596,"Science & Technology":52310,"Sports":82347,"Travel & Events":31476},
    {year:2011,"Autos & Vehicles":88574,"Comedy":32902,"Education":120596,"Entertainment":304094,"Film & Animation":62429,"Gaming":290048,"Howto & Style":108199,"Music":285111,"News & Politics":169560,"Nonprofits & Activism":28280,"People & Blogs":97349,"Pets & Animals":21037,"Science & Technology":83395,"Sports":137547,"Travel & Events":45701},
    {year:2012,"Autos & Vehicles":135684,"Comedy":50393,"Education":169777,"Entertainment":497732,"Film & Animation":91988,"Gaming":509309,"Howto & Style":180681,"Music":404498,"News & Politics":246839,"Nonprofits & Activism":39107,"People & Blogs":156526,"Pets & Animals":30398,"Science & Technology":125864,"Sports":219892,"Travel & Events":67591},
    {year:2013,"Autos & Vehicles":162838,"Comedy":68485,"Education":216381,"Entertainment":634714,"Film & Animation":125449,"Gaming":833420,"Howto & Style":246132,"Music":521508,"News & Politics":349808,"Nonprofits & Activism":59203,"People & Blogs":221188,"Pets & Animals":38922,"Science & Technology":168943,"Sports":287302,"Travel & Events":83874},
    {year:2014,"Autos & Vehicles":186404,"Comedy":90952,"Education":255626,"Entertainment":807142,"Film & Animation":170831,"Gaming":1146869,"Howto & Style":293392,"Music":653974,"News & Politics":460032,"Nonprofits & Activism":70375,"People & Blogs":411033,"Pets & Animals":37009,"Science & Technology":186324,"Sports":330836,"Travel & Events":78988},
    {year:2015,"Autos & Vehicles":258044,"Comedy":124527,"Education":326137,"Entertainment":1029927,"Film & Animation":233288,"Gaming":1512749,"Howto & Style":380797,"Music":795565,"News & Politics":596981,"Nonprofits & Activism":82187,"People & Blogs":635832,"Pets & Animals":48439,"Science & Technology":220923,"Sports":435426,"Travel & Events":127107},
    {year:2016,"Autos & Vehicles":260582,"Comedy":164941,"Education":446510,"Entertainment":1565403,"Film & Animation":329656,"Gaming":2035816,"Howto & Style":523933,"Music":1012825,"News & Politics":873908,"Nonprofits & Activism":97483,"People & Blogs":1012489,"Pets & Animals":66900,"Science & Technology":281005,"Sports":545189,"Travel & Events":135793},
    {year:2017,"Autos & Vehicles":345724,"Comedy":212665,"Education":660003,"Entertainment":2176261,"Film & Animation":430470,"Gaming":2478332,"Howto & Style":702145,"Music":1320471,"News & Politics":1290183,"Nonprofits & Activism":118501,"People & Blogs":1411483,"Pets & Animals":101161,"Science & Technology":390603,"Sports":687902,"Travel & Events":160395},
    {year:2018,"Autos & Vehicles":385196,"Comedy":224823,"Education":854858,"Entertainment":2697068,"Film & Animation":467608,"Gaming":2641479,"Howto & Style":791664,"Music":1612171,"News & Politics":2120989,"Nonprofits & Activism":130403,"People & Blogs":1684526,"Pets & Animals":145417,"Science & Technology":476513,"Sports":861920,"Travel & Events":181124},
  ];

  const categories = ["Gaming","Entertainment","Music","News & Politics","People & Blogs","Sports","Howto & Style","Education","Science & Technology","Film & Animation","Autos & Vehicles","Comedy","Travel & Events","Nonprofits & Activism","Pets & Animals"];
  
  const categoryEmojis = {
    "Autos & Vehicles": "🚗", "Comedy": "😂", "Education": "📘", "Entertainment": "🎬",
    "Film & Animation": "🎞️", "Gaming": "🎮", "Howto & Style": "🧵", "Music": "🎵",
    "News & Politics": "📰", "Nonprofits & Activism": "🤝", "People & Blogs": "👥",
    "Pets & Animals": "🐾", "Science & Technology": "🔬", "Sports": "🏅", "Travel & Events": "✈️"
  };

  const palette = ["#0ea5e9","#f97316","#22c55e","#eab308","#a855f7","#fb7185","#f43f5e","#14b8a6","#6366f1","#ec4899","#84cc16","#06b6d4","#f97171","#8b5cf6","#facc15"];
  const categoryColors = categories.reduce((acc, cat, idx) => { acc[cat] = palette[idx % palette.length]; return acc; }, {});

  const years = dataRows.map(d => d.year);
  const totals = dataRows.map(row => categories.reduce((sum, cat) => sum + (row[cat] || 0), 0));

  let activeCategory = $state(null);
  let mainChart;
  let mainCanvas;
  let overlayEl;

  function formatMillions(value) {
    const v = Number(value) || 0;
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(v >= 10_000_000 ? 0 : 1) + "M";
    if (v >= 1_000) return (v / 1_000).toFixed(0) + "K";
    return v.toString();
  }

  function setActiveCategory(cat) {
    activeCategory = activeCategory === cat ? null : cat;
    renderPolarOverlays();
  }

  function renderMainChart() {
    if (!mainCanvas) return;
    const ctx = mainCanvas.getContext('2d');
    mainChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          label: 'Total Videos',
          data: totals,
          borderColor: 'rgba(0,0,0,0)',
          borderWidth: 0,
          backgroundColor: 'rgba(0,0,0,0)',
          tension: 0.25,
          pointRadius: 0,
          pointHoverRadius: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: { display: true, text: 'Year', color: '#d1d5db' },
            ticks: { color: '#9ca3af' },
            grid: { color: 'rgba(31,41,55,0.7)' },
          },
          y: {
            title: { display: true, text: 'Total Videos (M)', color: '#d1d5db' },
            ticks: {
              color: '#9ca3af',
              callback: v => formatMillions(v),
            },
            grid: { color: 'rgba(31,41,55,0.7)' },
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#e5e7eb',
            bodyColor: '#e5e7eb',
            borderColor: '#38bdf8',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              title: ctx => `Year ${ctx[0].label}`,
              label: ctx => {
                const raw = ctx.parsed.y;
                return `Total: ${formatMillions(raw)} videos`;
              }
            }
          }
        },
        animation: {
          duration: 700,
          onComplete: () => {
            renderPolarOverlays();
          }
        }
      }
    });
  }

  function renderPolarOverlays() {
    if (!overlayEl || !mainChart) return;
    overlayEl.innerHTML = '';

    years.forEach((year, idx) => {
      const row = dataRows[idx];
      const total = totals[idx];
      const shares = categories.map(cat => ({
        cat,
        value: row[cat] || 0,
        pct: total ? ((row[cat] || 0) / total) * 100 : 0
      }));

      const meta = mainChart.getDatasetMeta(0);
      const point = meta.data[idx];
      if (!point) return;

      const chartX = point.x;
      const chartY = point.y;

      const size = 100 + (idx * 8);
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      canvas.style.position = 'absolute';
      canvas.style.left = `${chartX - size / 2}px`;
      canvas.style.top = `${chartY - size / 2}px`;
      canvas.style.pointerEvents = 'none';
      canvas.className = 'polar-canvas';
      canvas.style.animationDelay = `${idx * 0.08}s`;

      overlayEl.appendChild(canvas);

      const polarCtx = canvas.getContext('2d');
      new Chart(polarCtx, {
        type: 'doughnut',
        data: {
          labels: shares.map(s => s.cat),
          datasets: [{
            data: shares.map(s => s.value),
            backgroundColor: shares.map(s => {
              const color = categoryColors[s.cat] || '#94a3b8';
              if (!activeCategory) return color;
              return activeCategory === s.cat ? color : color + '33';
            }),
            borderWidth: 0
          }]
        },
        options: {
          responsive: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          }
        }
      });
    });
  }

  onMount(() => {
    renderMainChart();
  });
</script>

<style>
  .viz-full-wrap {
    width: 100%;
    margin: 2rem 0;
  }

  h2 {
    margin: 0 0 6px;
    font-size: 22px;
    font-weight: 600;
    color: #f3f4f6;
  }

  .note {
    margin: 0 0 12px;
    font-size: 13px;
    color: #9ca3af;
  }

  .chart-container {
    position: relative;
    width: 100%;
    height: 600px;
    background: #020617;
    margin: 10px 0 0;
    border-radius: 10px;
  }

  #xyChart {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }

  #polarOverlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  @keyframes dropSlices {
    0% {
      transform: translateY(-60px) scale(0.85);
      opacity: 0;
    }
    60% {
      transform: translateY(10px) scale(1.03);
      opacity: 0.9;
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }

  :global(.polar-canvas) {
    animation: dropSlices 0.7s ease forwards;
    opacity: 0;
  }

  .category-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
    padding: 6px 0;
  }

  .category-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.75);
    color: #e2e8f0;
    font-size: 11px;
    letter-spacing: 0.2px;
    border: 1px solid rgba(148, 163, 184, 0.4);
    outline: none;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  }

  .category-pill:hover {
    transform: translateY(-1px);
    border-color: rgba(148, 163, 184, 0.8);
    background: rgba(21, 32, 58, 0.9);
  }

  .category-pill.active {
    color: #fdf4ff;
  }

  .category-pill .emoji {
    font-size: 13px;
  }
</style>

<div class="viz-full-wrap">
  <h2>From Indie to Industry: How YouTube's Upload Volume Exploded (2008–2018)</h2>
  <p class="note">
    YouTube grew from 338k uploads in 2008 to over 15.2 million in 2018. Click a category to highlight its share across all years.
  </p>

  <div class="chart-container">
    <canvas id="xyChart" bind:this={mainCanvas}></canvas>
    <div id="polarOverlay" bind:this={overlayEl}></div>
  </div>

  <div class="category-legend">
    {#each categories as cat}
      <button 
        class="category-pill {activeCategory === cat ? 'active' : ''}" 
        style="{activeCategory === cat ? `background:${categoryColors[cat]}1f;border-color:${categoryColors[cat]};box-shadow:0 6px 22px ${categoryColors[cat]}44;color:#fdf4ff;` : ''}"
        onclick={() => setActiveCategory(cat)}
      >
        <span class="emoji">{categoryEmojis[cat] || '○'}</span>
        <span class="label">{cat}</span>
      </button>
    {/each}
  </div>
</div>


