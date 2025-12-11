<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { CHART_COLORS, TOOLTIP_CONFIG, AXIS_CONFIG, LEGEND_CONFIG } from '$lib/chartColors';

	const dumbbellData = {
		"categories": ["Autos & Vehicles", "Comedy", "Education", "Entertainment", "Film & Animation", "Gaming", "Howto & Style", "Music", "News & Politics", "Nonprofits & Activism", "People & Blogs", "Pets & Animals", "Science & Technology", "Sports", "Travel & Events"],
		"metrics": {
			"ratio": {
				"non_sponsored": [96.56019656019656, 97.45006447522522, 97.71787897263806, 97.21792246142121, 97.0811499151099, 97.2753209700428, 97.29549562617959, 97.14285714285714, 96.05189567914853, 97.2612191622712, 97.50842848358289, 97.2972972972973, 96.5947584239615, 96.93335617611788, 97.62879905368797],
				"sponsored": [96.80979626392835, 98.08443840864533, 97.74284977868567, 97.34666163754775, 97.58022425290547, 97.5213308546642, 97.71401912759504, 97.4088915930596, 95.99458315054645, 96.85226929103554, 97.77183600713012, 97.721140611984, 96.73114299659125, 97.06156716417912, 97.34398574732415]
			},
			"duration": {
				"non_sponsored": [444.0, 278.75, 463.5, 439.0, 304.0, 604.0, 393.0, 224.0, 359.5, 218.5, 367.0, 177.5, 402.0, 263.0, 430.0],
				"sponsored": [771.0, 639.0, 699.0, 718.5, 667.5, 741.0, 624.5, 300.0, 857.0, 617.0, 774.25, 542.0, 619.0, 526.5, 854.5]
			},
			"views": {
				"non_sponsored": [56183.0, 81555.5, 44376.0, 71664.0, 52580.25, 58654.5, 44539.0, 64262.0, 30930.0, 17054.0, 43018.5, 34509.0, 31844.0, 34121.0, 30391.5],
				"sponsored": [266931.0, 792977.0, 131642.0, 426198.5, 296703.0, 217956.0, 145404.25, 1337052.5, 131413.5, 107152.0, 232212.75, 161699.0, 91657.0, 158292.75, 179360.0]
			}
		}
	};

	const categories = dumbbellData.categories;

	const metricsConfig = {
		ratio: {
			label: "like/dislike ratio",
			axisLabel: "like/dislike ratio [%]",
			unit: ""
		},
		duration: {
			label: "duration",
			axisLabel: "duration [s]",
			unit: ""
		},
		views: {
			label: "view count",
			axisLabel: "view count",
			unit: ""
		}
	};

	const metricData = {
		ratio: {
			nonSponsored: dumbbellData.metrics.ratio.non_sponsored,
			sponsored: dumbbellData.metrics.ratio.sponsored
		},
		duration: {
			nonSponsored: dumbbellData.metrics.duration.non_sponsored,
			sponsored: dumbbellData.metrics.duration.sponsored
		},
		views: {
			nonSponsored: dumbbellData.metrics.views.non_sponsored,
			sponsored: dumbbellData.metrics.views.sponsored
		}
	};

	let currentMetric = $state("ratio");
	let hoverIndex = $state(null);
	let chartCanvas = $state(null);
	let dumbbellChart = $state(null);

	function buildDatasets(metricKey) {
		const nonSponsored = metricData[metricKey].nonSponsored;
		const sponsored = metricData[metricKey].sponsored;

		const dataNon = nonSponsored.map((value, i) => ({
			x: value,
			y: categories[i],
			category: categories[i],
			type: "Not sponsored"
		}));

		const dataSpon = sponsored.map((value, i) => ({
			x: value,
			y: categories[i],
			category: categories[i],
			type: "Sponsored"
		}));

		return { dataNon, dataSpon };
	}

	function switchMetric(metricKey) {
		if (metricKey === currentMetric) return;
		currentMetric = metricKey;

		if (dumbbellChart) {
			const updated = buildDatasets(currentMetric);
			dumbbellChart.data.datasets[0].data = updated.dataNon;
			dumbbellChart.data.datasets[1].data = updated.dataSpon;
			dumbbellChart.options.scales.x.title.text = metricsConfig[currentMetric].axisLabel;
			hoverIndex = null;
			dumbbellChart.update();
		}
	}

	onMount(() => {
		const initial = buildDatasets(currentMetric);
		const ctx = chartCanvas.getContext("2d");

		dumbbellChart = new Chart(ctx, {
			type: "scatter",
			data: {
				datasets: [
					{
						label: "Not sponsored",
						data: initial.dataNon,
						backgroundColor: CHART_COLORS.chart11,
						borderColor: CHART_COLORS.chart12,
						pointRadius: 5,
						pointHoverRadius: 8
					},
					{
						label: "Sponsored",
						data: initial.dataSpon,
						backgroundColor: CHART_COLORS.chart3,
						borderColor: CHART_COLORS.chart2,
						pointRadius: 5,
						pointHoverRadius: 8
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				indexAxis: "y",
				interaction: {
					mode: "nearest",
					intersect: false,
					axis: "xy"
				},
				animation: {
					duration: 700,
					easing: "easeOutCubic"
				},
				plugins: {
					legend: {
						...LEGEND_CONFIG,
						labels: {
							...LEGEND_CONFIG.labels,
							pointStyle: "circle"
						}
					},
					tooltip: {
						...TOOLTIP_CONFIG,
						displayColors: false,
						callbacks: {
							title: ctx => {
								const c = ctx[0].raw;
								return `${c.category} (${c.type})`;
							},
							label: ctx => {
								const chart = ctx.chart;
								const datasetIndex = ctx.datasetIndex;
								const dataIndex = ctx.dataIndex;

								const value = ctx.raw.x;
								const twinDatasetIndex = datasetIndex === 0 ? 1 : 0;
								const twinValue = chart.data.datasets[twinDatasetIndex].data[dataIndex].x;

								const conf = metricsConfig[currentMetric];
								const v = value.toFixed(2) + conf.unit;
								const vTwin = twinValue.toFixed(2) + conf.unit;

								const delta = (value - twinValue);
								const sign = delta >= 0 ? "+" : "";
								const deltaText = `${sign}${delta.toFixed(2)}${conf.unit}`;

								const otherLabel = twinDatasetIndex === 0 ? "Not sponsored" : "Sponsored";

								return [
									`Value (${ctx.raw.type}) : ${v}`,
									`Value (${otherLabel}) : ${vTwin}`,
									`Difference : ${deltaText}`
								];
							}
						}
					}
				},
				onHover: (event, _elements, chart) => {
					const points = chart.getElementsAtEventForMode(
						event,
						"nearest",
						{ intersect: false },
						true
					);

					const canvas = chart.canvas;

					if (points.length > 0) {
						hoverIndex = points[0].index;
						canvas.style.cursor = "pointer";
					} else {
						hoverIndex = null;
						canvas.style.cursor = "default";
					}

					chart.draw();
				},
				scales: {
					y: {
						type: "category",
						labels: categories,
						offset: true,
						grid: {
							color: CHART_COLORS.grid
						},
						ticks: {
							color: CHART_COLORS.textMuted,
							font: { size: 11, family: '"Tex Gyre Adventor", sans-serif' }
						}
					},
					x: {
						title: {
							display: true,
							text: metricsConfig[currentMetric].axisLabel,
							color: CHART_COLORS.text,
							font: { size: 13, family: '"Tex Gyre Adventor", sans-serif', weight: '600' }
						},
						grid: {
							color: CHART_COLORS.grid
						},
						ticks: {
							color: CHART_COLORS.textMuted,
							font: { size: 11, family: '"Tex Gyre Adventor", sans-serif' }
						}
					}
				}
			},
			plugins: [
				{
					id: "dumbbellLines",
					beforeDatasetsDraw(chart) {
						const { ctx } = chart;
						const metaNon = chart.getDatasetMeta(0);
						const metaSpon = chart.getDatasetMeta(1);

						ctx.save();
						for (let i = 0; i < metaNon.data.length; i++) {
							const p1 = metaNon.data[i];
							const p2 = metaSpon.data[i];

							const isHover = (i === hoverIndex);

							ctx.beginPath();
							ctx.moveTo(p1.x, p1.y);
							ctx.lineTo(p2.x, p2.y);
							ctx.lineWidth = isHover ? 4 : 2;
							ctx.strokeStyle = isHover
								? CHART_COLORS.accent
								: CHART_COLORS.textMuted;
							ctx.stroke();
						}
						ctx.restore();
					}
				}
			]
		});

		chartCanvas.addEventListener("mouseleave", () => {
			hoverIndex = null;
			chartCanvas.style.cursor = "default";
			dumbbellChart.draw();
		});

		return () => {
			if (dumbbellChart) {
				dumbbellChart.destroy();
			}
		};
	});
</script>

<div class="dumbbell-container">
	<h3 class="chart-title">Dumbbell plot - sponsored vs nonsponsored videos for different metrics</h3>

	<div class="controls">
		<button
			class="toggle-button"
			class:active={currentMetric === "ratio"}
			onclick={() => switchMetric("ratio")}
		>
			like/dislike ratio
		</button>
		<button
			class="toggle-button"
			class:active={currentMetric === "duration"}
			onclick={() => switchMetric("duration")}
		>
			duration
		</button>
		<button
			class="toggle-button"
			class:active={currentMetric === "views"}
			onclick={() => switchMetric("views")}
		>
			view count
		</button>
	</div>

	<div class="chart-card">
		<canvas bind:this={chartCanvas}></canvas>
	</div>
</div>

<style>
	.dumbbell-container {
		width: 100%;
		max-width: 1200px;
		margin: var(--ds-space-lg) auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--ds-space-md);
	}

	.chart-title {
		margin: 0;
		font-size: var(--ds-text-lg);
		font-weight: 600;
		text-align: center;
		color: var(--ds-text);
		font-family: var(--ds-font-chart);
	}

	.controls {
		display: flex;
		gap: var(--ds-space-xs);
		flex-wrap: wrap;
		justify-content: center;
	}

	.toggle-button {
		padding: var(--ds-space-xs) var(--ds-space-sm);
		border-radius: 999px;
		border: 1px solid var(--ds-border);
		background: var(--ds-bg);
		color: var(--ds-text);
		font-size: var(--ds-text-sm);
		font-family: var(--ds-font-chart);
		cursor: pointer;
		transition: var(--ds-transition);
	}

	.toggle-button:hover {
		transform: translateY(-1px);
		border-color: var(--ds-border);
	}

	.toggle-button.active {
		background: var(--ds-accent);
		color: var(--ds-bg);
		box-shadow: 0 6px 20px rgba(114,135,253,0.25);
		font-weight: 600;
	}

	.chart-card {
		background: var(--ds-surface);
		border: 1px solid var(--ds-border);
		border-radius: var(--ds-radius);
		padding: var(--ds-space-sm);
		width: 100%;
		height: clamp(420px, 60vh, 640px);
		display: flex;
		flex-direction: column;
	}

	canvas {
		width: 100% !important;
		height: 100% !important;
		flex: 1;
		display: block;
	}
</style>


