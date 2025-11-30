<!--
  Header with wordmark logo
-->
<script>
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
		transform: rotate(-4deg);
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