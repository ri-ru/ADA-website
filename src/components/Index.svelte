<script>
	import { onMount } from 'svelte';
	
	// Starfield
	let stars = [];
	let mounted = false;
	
	onMount(() => {
		mounted = true;
		for (let i = 0; i < 200; i++) {
			stars.push({
				x: Math.random() * 100,
				y: Math.random() * 100,
				size: Math.random() * 2 + 1,
				opacity: Math.random() * 0.5 + 0.5
			});
		}
		stars = stars;
	});
	
	// Transcript toggle
	let showTranscript = false;
	
	// Chat messages data
	let messages = [
		{
			speaker: "jimmy",
			text: "I want to be a successful YouTuber...",
			side: "left",
			avatar: "assets/pixel_art/jan.gif" // You'll add this
		},
		{
			speaker: "albert",
			text: "Not that you're not a lovely person. And I would love to spend time with you. But you know what I'm saying? What does it say about us that we'll talk with a complete stranger for $15.",
			side: "right",
			avatar: "assets/pixel_art/veronika.gif"
		},
		{
			speaker: "jimmy",
			text: "damn... how do i do that?",
			side: "left",
			avatar: "assets/pixel_art/ender.gif"
		},
		{
			speaker: "consultant1",
			text: "We are true experts in our craft...",
			side: "right",
			avatar: "assets/pixel_art/kalan.gif"
		}
	];
</script>

<div class="container">
	<!-- Starfield Background -->
	{#if mounted}
		<div class="starfield">
			{#each stars as star}
				<div 
					class="star" 
					style="left: {star.x}%; top: {star.y}%; width: {star.size}px; height: {star.size}px; opacity: {star.opacity};"
				></div>
			{/each}
		</div>
	{/if}

	<!-- Hero Section -->
	<section class="hero">
		<h1 class="title">From Indie to Industry</h1>
		<p class="subtitle">how youtube went from a hobbyist paradise</p>
		<p class="subtitle">to a whole industry</p>
		<p class="byline">by: us</p>
		<div class="scroll-indicator">↓</div>
	</section>

	<!-- Intro Text -->

	<!-- Jimmy's YouTube Video -->
	<section class="video-section">
		<div class="video-container">
			<iframe
				width="100%"
				height="400"
				src="https://www.youtube.com/embed/39ORolk1P0I"
				title="Jimmy's video"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
		
		<!-- Transcript Toggle -->
		<button class="transcript-toggle" onclick={() => showTranscript = !showTranscript}>
			{showTranscript ? 'Hide' : 'Show'} Transcript
		</button>
		
		{#if showTranscript}
			<div class="transcript">
				<p>Transcript goes here...</p>
				<p>Jimmy: "I want to be a YouTuber..."</p>
				<p>etc.</p>
			</div>
		{/if}
	</section>

	<!-- Chat-style Conversation -->
	<section class="conversation">
		{#each messages as message}
			<div class="message-wrapper {message.side}">
				{#if message.side === "left"}
					<!-- Jimmy's messages (left side) -->
					<div class="avatar">
						<img src={message.avatar} alt={message.speaker} />
					</div>
					<div class="bubble bubble-left">
						<p>{message.text}</p>
					</div>
				{:else}
					<!-- Consultants (right side) -->
					<div class="bubble bubble-right">
						<p>{message.text}</p>
					</div>
					<div class="avatar">
						<img src={message.avatar} alt={message.speaker} />
					</div>
				{/if}
			</div>
		{/each}
	</section>

	<!-- Fiverr Ad -->
	<section class="fiverr-section">
		<div class="fake-ad">
			<img src="assets/1.png" alt="Fiverr ad" />
			<p class="ad-caption">💰 CASH COW YOUTUBE VIDEOS 💰</p>
		</div>
	</section>

	<!-- Consultants Introduction -->
	<section class="consultants-intro">
		<div class="consultant-grid">
			{#each Array(5) as _, i}
				<div class="consultant-card">
					<div class="ascii-avatar">
						<pre>
╔═══════╗
║ ◉───◉ ║
║   ─   ║
╚═══════╝
						</pre>
					</div>
				</div>
			{/each}
		</div>
		
		<div class="dialog-box center">
			<p>We are true experts in our craft...</p>
		</div>
	</section>

	<!-- Dataset Section -->
	<section class="dataset-section">
		<div class="text-box-dark">
			<h2>Our dataset</h2>
			<p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit..."</p>
		</div>
		
		<div class="dataset-preview">
			<img src="assets/2.png" alt="Dataset preview" />
		</div>
	</section>

	<!-- Interactive Category Selection -->
	<section class="interactive-section">
		<div class="message-wrapper left">
			<div class="avatar">
				<img src="assets/jimmy.gif" alt="Jimmy" />
			</div>
			<div class="bubble bubble-left">
				<p>Jimmy, which category do you want to see now?</p>
			</div>
		</div>
		
		<div class="button-group">
			<button class="category-btn">Gaming 🎮</button>
			<button class="category-btn">Education 📚</button>
			<button class="category-btn">Music 🎵</button>
		</div>
	</section>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background: #0f0f23;
		color: #e0e0e0;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
		overflow-x: hidden;
	}

	.container {
		position: relative;
		width: 100%;
		min-height: 100vh;
	}

	/* Starfield Effect */
	.starfield {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		pointer-events: none;
	}

	.star {
		position: absolute;
		background: #ff69b4;
		border-radius: 50%;
		animation: twinkle 3s infinite ease-in-out;
	}

	@keyframes twinkle {
		0%, 100% { opacity: 0.3; }
		50% { opacity: 1; }
	}

	/* Hero Section */
	.hero {
		position: relative;
		z-index: 1;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 2rem;
	}

	.title {
		font-size: 4rem;
		font-weight: bold;
		color: white;
		margin: 0;
		letter-spacing: -2px;
	}

	.subtitle {
		font-size: 1.3rem;
		color: rgba(255, 255, 255, 0.7);
		margin: 0.5rem 0;
		font-weight: 300;
	}

	.byline {
		margin-top: 3rem;
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.9rem;
	}

	.scroll-indicator {
		position: absolute;
		bottom: 2rem;
		font-size: 2rem;
		color: rgba(255, 255, 255, 0.5);
		animation: bounce 2s infinite;
	}

	@keyframes bounce {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}

	/* Sections */
	section {
		position: relative;
		z-index: 1;
		padding: 4rem 2rem;
	}

	/* Text Boxes */
	.text-box {
		max-width: 600px;
		background: rgba(80, 70, 100, 0.8);
		padding: 2rem;
		border-radius: 8px;
		margin: 2rem auto;
		backdrop-filter: blur(10px);
		text-align: center;
	}

	.text-box-dark {
		max-width: 800px;
		background: rgba(0, 0, 0, 0.8);
		padding: 3rem;
		border-radius: 8px;
		margin: 2rem auto;
	}

	.intro-copy {
		font-size: 1.1rem;
		color: white;
		margin: 0;
	}

	/* Video Section */
	.video-section {
		max-width: 800px;
		margin: 0 auto;
	}

	.video-container {
		position: relative;
		padding-bottom: 56.25%; /* 16:9 aspect ratio */
		height: 0;
		overflow: hidden;
		border-radius: 12px;
		margin-bottom: 1rem;
	}

	.video-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.transcript-toggle {
		display: block;
		margin: 1rem auto;
		padding: 0.75rem 1.5rem;
		background: rgba(255, 255, 255, 0.1);
		border: 2px solid rgba(255, 255, 255, 0.3);
		color: white;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s;
	}

	.transcript-toggle:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.transcript {
		max-width: 800px;
		margin: 2rem auto;
		padding: 2rem;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.transcript p {
		margin: 0.5rem 0;
		line-height: 1.6;
	}

	/* Chat-style Conversation */
	.conversation {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 0;
	}

	.message-wrapper {
		display: flex;
		gap: 1rem;
		margin: 2rem 0;
		align-items: flex-start;
	}

	.message-wrapper.left {
		justify-content: flex-start;
	}

	.message-wrapper.right {
		justify-content: flex-end;
	}

	.avatar {
		width: 80px;
		height: 80px;
		border-radius: 8px;
		overflow: hidden;
		flex-shrink: 0;
		background: rgba(255, 105, 180, 0.2);
		border: 2px solid #ff69b4;
	}

	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.bubble {
		max-width: 500px;
		padding: 1.5rem;
		border-radius: 16px;
		position: relative;
	}

	.bubble-left {
		background: rgba(255, 182, 193, 0.9);
		color: #000;
		border-bottom-left-radius: 4px;
	}

	.bubble-right {
		background: rgba(200, 180, 255, 0.9);
		color: #000;
		border-bottom-right-radius: 4px;
	}

	.bubble p {
		margin: 0;
		line-height: 1.5;
	}

	/* Consultants Grid */
	.consultant-grid {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
		margin: 2rem 0;
	}

	.consultant-card {
		background: rgba(50, 40, 70, 0.6);
		padding: 1.5rem;
		border-radius: 8px;
		border: 2px solid #ff69b4;
	}

	.ascii-avatar pre {
		font-family: 'Courier New', monospace;
		color: #ff69b4;
		font-size: 1.2rem;
		margin: 0;
	}

	.dialog-box {
		background: rgba(255, 182, 193, 0.9);
		color: #000;
		padding: 1.5rem;
		border-radius: 8px;
		max-width: 400px;
		margin: 1rem auto;
	}

	.dialog-box.center {
		text-align: center;
	}

	/* Fake Ad */
	.fake-ad {
		max-width: 600px;
		margin: 2rem auto;
		text-align: center;
	}

	.fake-ad img {
		width: 100%;
		border-radius: 8px;
		border: 2px solid #ff69b4;
	}

	.ad-caption {
		color: #ff69b4;
		margin-top: 1rem;
		font-weight: bold;
		font-size: 1.3rem;
	}

	/* Dataset Preview */
	.dataset-preview {
		max-width: 600px;
		margin: 2rem auto;
	}

	.dataset-preview img {
		width: 100%;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	/* Buttons */
	.button-group {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
		margin: 2rem 0;
	}

	.category-btn {
		padding: 1rem 2rem;
		background: rgba(255, 255, 255, 0.1);
		border: 2px solid rgba(255, 255, 255, 0.3);
		color: white;
		font-size: 1rem;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s;
	}

	.category-btn:hover {
		background: rgba(255, 255, 255, 0.2);
		border-color: #ff69b4;
		transform: translateY(-2px);
	}

	/* Mobile Responsive */
	@media (max-width: 768px) {
		.title {
			font-size: 2.5rem;
		}
		
		.message-wrapper {
			flex-direction: column;
		}
		
		.bubble {
			max-width: 100%;
		}
		
		.consultant-grid {
			flex-direction: column;
			align-items: center;
		}
	}
</style>