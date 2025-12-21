<script>
	// Change this import to match your actual SVG file location
	// Options in the Pudding starter:
	// - wordmark-shadow.svg
	// - wordmark-plain.svg
	// - wordmark-line.svg
	// - wordmark-bubble.svg
	import wordmark from "$svg/wordmark-shadow.svg?raw";
</script>

<header>
	<div class="wordmark">
		<a
			href="https://github.com/epfl-ada/ada-2025-project-shenanigans/tree/main"
			aria-label="From Indie to Industry"
			target="_blank"
			rel="noopener"
		>
			{@html wordmark}
		</a>
	</div>
</header>

<style>
	header {
		position: relative;
		z-index: 100;
	}

	.wordmark {
		max-width: 14em;
		margin: 0 auto;
		padding: 32px 0;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
		/* transform: rotate(-4deg); */
	}

	.wordmark a {
		border: none;
		display: block;
		color: var(--color-fg, white);
	}

	.wordmark a:hover {
		background-color: transparent;
	}

	.wordmark :global(svg) {
		width: 100%;
		height: auto;
	}
</style>
