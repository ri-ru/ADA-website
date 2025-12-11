/**
 * Design System Colors for Chart.js
 * Simplified color system matching design-system.css
 */

export const CHART_COLORS = {
	// Chart colors
	chart1: '#dc8a78',
	chart2: '#dd7878',
	chart3: '#ea76cb',
	chart4: '#8839ef',
	chart5: '#d20f39',
	chart6: '#e64553',
	chart7: '#fe640b',
	chart8: '#df8e1d',
	chart9: '#40a02b',
	chart10: '#179299',
	chart11: '#04a5e5',
	chart12: '#209fb5',
	chart13: '#1e66f5',
	chart14: '#7287fd',
	
	// Core colors
	text: '#cdd6f4',
	textMuted: '#9399b2',
	bg: '#1e1e2e',
	surface: 'rgba(30, 30, 46, 0.85)',
	border: 'rgba(205, 214, 244, 0.2)',
	grid: '#313244',
	error: '#d20f39',
	
	// Alpha variants
	textMutedAlpha: 'rgba(147, 153, 178, 0.25)',
	bgSecondaryAlpha: 'rgba(24, 24, 37, 0.95)',
};

// Chart.js palette array (for multi-series charts)
export const CHART_PALETTE = [
	CHART_COLORS.chart1,
	CHART_COLORS.chart2,
	CHART_COLORS.chart3,
	CHART_COLORS.chart4,
	CHART_COLORS.chart5,
	CHART_COLORS.chart6,
	CHART_COLORS.chart7,
	CHART_COLORS.chart8,
	CHART_COLORS.chart9,
	CHART_COLORS.chart10,
	CHART_COLORS.chart11,
	CHART_COLORS.chart12,
	CHART_COLORS.chart13,
	CHART_COLORS.chart14,
];

// Common Chart.js configuration
export const CHART_DEFAULTS = {
	font: { family: '"Tex Gyre Adventor", sans-serif', size: 12 },
	color: CHART_COLORS.text,
	backgroundColor: 'transparent',
	borderColor: CHART_COLORS.border,
};

// Tooltip configuration
export const TOOLTIP_CONFIG = {
	backgroundColor: CHART_COLORS.surface,
	titleColor: CHART_COLORS.text,
	bodyColor: CHART_COLORS.text,
	borderColor: CHART_COLORS.border,
	borderWidth: 1,
	padding: 12,
	displayColors: true,
	boxPadding: 6,
};

// Grid configuration
export const GRID_CONFIG = {
	color: CHART_COLORS.grid,
	lineWidth: 1,
};

// Axis configuration
export const AXIS_CONFIG = {
	grid: GRID_CONFIG,
	ticks: {
		color: CHART_COLORS.textMuted,
		font: CHART_DEFAULTS.font,
	},
	title: {
		color: CHART_COLORS.text,
		font: { ...CHART_DEFAULTS.font, size: 13, weight: '600' },
	},
};

// Legend configuration
export const LEGEND_CONFIG = {
	labels: {
		color: CHART_COLORS.text,
		font: CHART_DEFAULTS.font,
		usePointStyle: true,
	},
	position: 'bottom',
};
