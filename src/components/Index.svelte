<script>
	import { onMount } from 'svelte';
	
	// ============================================
	// STARFIELD
	// ============================================
	let stars = $state([]);
	let mounted = $state(false);
	
	onMount(() => {
		mounted = true;
		let newStars = [];
		for (let i = 0; i < 200; i++) {
			newStars.push({
				x: Math.random() * 100,
				y: Math.random() * 100,
				size: Math.random() * 2 + 1,
				opacity: Math.random() * 0.5 + 0.5
			});
		}
		stars = newStars;
	});
	
	// ============================================
	// TRANSCRIPT - Using $state for Svelte 5 reactivity
	// ============================================
	let showTranscript = $state(false);
	
	// ============================================
	// SPEAKER CONFIG
	// ============================================
	const speakers = {
		jimmy: { avatar: "assets/pixel_art/jan.gif", name: "Jimmy" },
		eddie: { avatar: "assets/pixel_art/ender.gif", name: "Eddie" },
		kaleb: { avatar: "assets/pixel_art/kalan.gif", name: "Kaleb" },
		daniel: { avatar: "assets/pixel_art/danael.gif", name: "Daniel" },
		vivian: { avatar: "assets/pixel_art/veronika.gif", name: "Vivian" },
	};
	
	function getSpeaker(id) {
		return speakers[id.toLowerCase()] || { avatar: "assets/pixel_art/default.gif", name: id };
	}
	
	// ============================================
	// DIALOGUE DATA
	// "jimmy" = right side (narrator/user perspective)
	// experts = left side
	// ============================================
	
	const introChat = [
		{ speaker: "Eddie", text: "Oh.. a customer?", side: "left" },
		{ speaker: "jimmy", text: "I just spent 999$ on your course with my mom's credit card...", side: "right" },
		{ speaker: "Kaleb", text: "...", side: "left" }, 
		{ speaker: "jimmy", text: "Can you help me make a lot of money on YouTube?", side: "right" },
		{ speaker: "Daniel", text: "Maybe.", side: "left" },
		{ speaker: "jimmy", text: "....I'm getting a refund.", side: "right" },
		{ speaker: "Vivian", text: "Wait! What we CAN do is show you just how Youtube went from an hobby to an industry that makes many people tons of money. We are really good at what we do! We are super trustworthy and we have the best dataset! Check this out... ", side: "left" },


	];
	
	const datasetChat = [
		{ speaker: "jimmy", text: "Okay, fine. You know what you are doing. So how do I make money? ", side: "right" },
		{ speaker: "Kaleb", text: "To know that we know what we know, and that we do not know what we do not know, that is true knowledge..", side: "left" }, 
		{ speaker: "jimmy", text: "... ", side: "right" },
		{ speaker: "Eddie", text: "Ignore that.", side: "left" },
		{ speaker: "Daniel", text: "He's trying to say that in order to master something, you need to first understand it. We have researched several questions, just for you, about what the data tells us.", side: "left" }
	];
	
	// ============================================
	// TEAM DATA
	// ============================================
	const team = [
		{ name: "Eddie", role: "(...) Specialist", avatar: "assets/pixel_art/ender.gif", desc: "expert on question #1" },
		{ name: "Kaleb", role: "(...) Specialist", avatar: "assets/pixel_art/kalan.gif", desc: "expert on question #2" },
		{ name: "Daniel", role: "(...) Specialist", avatar: "assets/pixel_art/danael.gif", desc: "expert on question #3" },
		{ name: "Vivian", role: "website wizard", avatar: "assets/pixel_art/veronika.gif", desc: "likes to snack" },
	];
	
	// ============================================
	// RESEARCH QUESTIONS
	// ============================================
	
	const questions = [
		{
			id: "section-monetization",
			title: "How have channels evolved from indie to professional?",
			desc: `What is the adoption curve of sponsorships between different categories?\nWhen and why do we have a rise of sponsorships?\nHave advertisement strategies changed over time?\nDo different channel sizes employ different strategies (e.g. multiple sponsors, recurring sponsors, brand partnerships)?`
		},
		{
			id: "section-sponsors",
			title: "What enabled indie channels to become professional-minded?",
			desc: `At what subscriber thresholds do creators start showing "industry-like" patterns (sponsors, steady uploads, longer videos, higher engagement ratios)?\nAre there early behavioral indicators (upload rhythm, engagement) that predict professionalisation?\nAre channel/video categories and sponsors correlated?\nAre there cohorts of channels with the same/similar sponsors?\nWhat are the differences between categories for "professional" channels (e.g. > 100k subscribers in sports vs education)? How are they different?\nDo "overnight successes" professionalise faster than slow, organic growers?\nCan we detect signs of professionalism by analysing which videos were later removed, using the YouTube API?`
		},
		{
			id: "section-categories",
			title: "How does a focus on professionalism affect engagement?",
			desc: `Does the number of views, subscriber growth, like/dislike ratio change after channels get sponsors? How? Any other metrics (tags / length of title)?\nIs it different between categories? Is it different between the years?\nDo those metrics change over time (track monetised vs non monetised channels)?`
		}
	];
	
	function jumpTo(id) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<!-- ============================================ -->
<!-- DIALOGUE SNIPPET -->
<!-- Jimmy = right (narrator), Experts = left -->
<!-- ============================================ -->
{#snippet dialogue(messages)}
	<div class="dialogue">
		{#each messages as msg, i}
			<div class="msg {msg.side}" style="--delay: {i * 0.1}s">
				{#if msg.side === "left"}
					<!-- Expert on LEFT -->
					<div class="avatar-col">
						<img class="avatar-img" src={getSpeaker(msg.speaker).avatar} alt={msg.speaker} />
						<span class="speaker-name">{getSpeaker(msg.speaker).name}</span>
					</div>
					<div class="bubble bubble-left">
						<p>{msg.text}</p>
					</div>
				{:else}
					<!-- Jimmy on RIGHT -->
					<div class="bubble bubble-right">
						<p>{msg.text}</p>
					</div>
					<div class="avatar-col">
						<img class="avatar-img" src={getSpeaker(msg.speaker).avatar} alt={msg.speaker} />
						<span class="speaker-name">{getSpeaker(msg.speaker).name}</span>
					</div>
				{/if}
			</div>
		{/each}
	</div>
{/snippet}

<!-- ============================================ -->
<!-- PAGE CONTENT -->
<!-- ============================================ -->

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

	<!-- ========== HERO ========== -->
	<section class="hero">
		<h1 class="title">From Indie to Industry</h1>
		<p class="subtitle">how youtube went from a hobbyist paradise to a whole industry</p>
		<p class="byline">Daniel, Eddie, Jan, Kaleb & Vero</p>
		<div class="scroll-indicator">↓</div>
	</section>

	<!-- ========== VIDEO + TRANSCRIPT ========== -->
	<section class="video-section">
		<div class="video-container">
			<iframe
				src="https://www.youtube.com/embed/39ORolk1P0I"
				title="Jimmy's video"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
		
		<!-- Collapsible Transcript Section -->
		<div class="collapsible">
			<h3>
				<button 
					class="collapsible-btn"
					aria-expanded={showTranscript}
					onclick={() => showTranscript = !showTranscript}
				>
					<span class="collapsible-icon">{showTranscript ? '−' : '+'}</span>
					{showTranscript ? 'Hide Transcript' : 'Show Transcript'}
				</button>
			</h3>
			
			{#if showTranscript}
				<div class="collapsible-content">
					<p><strong>Jimmy:</strong> Hey guys, Jimmy here, welcome to my first YouTube video. I'm going to be very famous and get a lot of money from this, but I don't know how to yet. But hey, check this out, I found this really cool site, where apparently, they offer a course, on how to make a living off YouTube. It's quite expensive but at least you do save the one dollar. So um I definitely want to do this, let's check it out... Let's see what happens</p>
					<!-- Add full transcript here -->
				</div>
			{/if}
		</div>
	</section>

	<!-- ========== DIALOGUE 1: Meeting the Experts ========== -->
	{@render dialogue(introChat)}

	<!-- ========== DATASET SECTION ========== -->
	<section class="dataset-section">
		<div class="text-image-block">
			<div class="text-side">
				<h2>The YouNiverse Dataset</h2>
				<p>
					Info here about the YouNiverse dataset. 
				</p>
				<p>					
					YouNiverse is a large collection of channel and video metadata from English-language YouTube. YouNiverse comprises metadata from over 136k channels and 72.9M videos published between May 2005 and October 2019, as well as channel-level time-series data with weekly subscriber and view counts. Leveraging channel ranks from this http URL, an online service that provides information about YouTube, we are able to assess and enhance the representativeness of the sample of channels. Additionally, the dataset also contains a table specifying which videos a set of 449M anonymous users commented on. YouNiverse, publicly available at this https URL, will empower the community to do research with and about YouTube.
				</p>
				<p>
					We can even make a new paragraph here. Very fancy. Very based. 
					More info here abotu it. 
				</p>
			</div>
			<div class="image-side">
				<img src="assets/1.png" alt="Dataset preview" />
			</div>
		</div>
	</section>


	<!-- ========== FIVERR AD ========== 
	<section class="fiverr-section">
		<div class="fake-ad">
			<img src="assets/1.png" alt="Fiverr ad" />
			<p class="ad-caption">💰 CASH COW YOUTUBE VIDEOS 💰</p>
		</div>
	</section>
	-->

	<!-- ========== MEET THE TEAM ========== -->
	<section class="team-section">
		<h2>Optional Section</h2>
		<p class="section-sub">We can present ourselves if we want </p>
		
		<div class="team-grid">
			{#each team as member}
				<div class="expert-card">
					<img class="expert-avatar" src={member.avatar} alt={member.name} />
					<h3>{member.name}</h3>
					<span class="role">{member.role}</span>
					<p class="desc">{member.desc}</p>
				</div>
			{/each}
		</div>
	</section>



	<!-- ========== DIALOGUE 2 ========== -->
	{@render dialogue(datasetChat)}

	<!-- ========== RESEARCH QUESTIONS ========== -->
	<section class="questions-section">
		<h2>What You'll Learn</h2>
		<p class="section-sub">Click any question to jump to that section **I KNOW THIS BIT IS A BIT UGLY**</p>
		
		<!-- In your questions-section -->
		<div class="questions-list">
			{#each questions as q, i}
				<button class="question-btn" onclick={() => jumpTo(q.id)}>
					<span class="q-num">{i + 1}</span>
					<div class="q-text">
						<h3>{q.title}</h3>
						<p>{@html q.desc.replace(/\n/g, '<br>')}</p>
					</div>
					<span class="q-arrow">→</span>
				</button>
			{/each}
		</div>
	</section>

	<!-- ========== CONTENT SECTIONS ========== -->
	<section id="section-monetization" class="content-section">
		<h2>How have channels evolved from indie to professional?</h2>
		<div class="placeholder">[ placeholder ]</div>
	</section>

	<section id="section-sponsors" class="content-section">
		<h2>What enabled indie channels to become professional-minded?</h2>
		<div class="placeholder">[ placeholder ]</div>
	</section>

	<section id="section-categories" class="content-section">
		<h2>How does a focus on professionalism affect engagement?</h2>
		<div class="placeholder">[ placeholder ]</div>
	</section>

</div>

<style>
	/* ============================================ */
	/* BASE */
	/* ============================================ */

	:global(body) {
		background: #0f0f23 !important;
		color: #e0e0e0;
	}

	.container {
		position: relative;
		width: 100%;
		min-height: 100vh;
	}

	/* ============================================ */
	/* STARFIELD */
	/* ============================================ */
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

	/* ============================================ */
	/* HERO */
	/* ============================================ */
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

	/* ============================================ */
	/* SECTIONS */
	/* ============================================ */
	section {
		position: relative;
		z-index: 1;
		padding: 4rem 2rem;
	}

	h2 {
		color: white;
		font-size: 1.6rem;
		margin: 0 0 0.5rem;
		text-align: center;
	}

	.section-sub {
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.95rem;
		margin: 0 0 2rem;
		text-align: center;
	}

	/* ============================================ */
	/* VIDEO */
	/* ============================================ */
	.video-section {
		max-width: 800px;
		margin: 0 auto;
	}

	.video-container {
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
		overflow: hidden;
		border-radius: 12px;
	}

	.video-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	/* ============================================ */
	/* COLLAPSIBLE (Pudding-style) */
	/* ============================================ */
	.collapsible {
		margin-top: 1.5rem;
	}

	.collapsible h3 {
		margin: 0;
	}

	.collapsible-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		padding: 0.75rem 1rem;
		background: rgba(255, 255, 255, 0.08);
		border: 2px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		color: white;
		font-size: 0.95rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.collapsible-btn:hover {
		background: rgba(255, 255, 255, 0.12);
		border-color: #ff69b4;
	}

	.collapsible-btn:focus {
		outline: 2px solid #ff69b4;
		outline-offset: 2px;
	}

	.collapsible-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		background: #ff69b4;
		color: #0f0f23;
		border-radius: 4px;
		font-weight: bold;
		font-size: 1.1rem;
	}

	.collapsible-content {
		margin-top: 0.75rem;
		padding: 1.25rem;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		line-height: 1.7;
		animation: slideDown 0.2s ease;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.collapsible-content p {
		margin: 0.5rem 0;
	}

	/* ============================================ */
	/* DIALOGUE */
	/* No border, no resize on avatars */
	/* Jimmy = right, Experts = left */
	/* ============================================ */
	.dialogue {
		max-width: 800px;
		margin: 2rem auto;
		padding: 0 1rem;
	}

	.msg {
		display: flex;
		gap: 0.75rem;
		margin: 1.25rem 0;
		align-items: flex-start;
		animation: fadeIn 0.4s ease forwards;
		animation-delay: var(--delay);
		opacity: 0;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(8px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.msg.left { justify-content: flex-start; }
	.msg.right { justify-content: flex-end; }

	.msg.right .avatar-img {
		transform: scaleX(-1);
	}

	.avatar-col {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}

	.speaker-name {
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.5);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	/* Avatar image - NO border, NO resize, keeps pixel art crisp */
	.avatar-img {
		width: 76px;
		height: 80px;
		image-rEddieing: pixelated;
		image-rEddieing: crisp-edges;
		-webkit-image-rEddieing: pixelated;  /* ADD */
		transform: translateZ(0); 
	}

	.bubble {
		max-width: 400px;
		padding: 0.9rem 1.1rem;
		border-radius: 16px;
	}

	.bubble-left {
		background: rgba(200, 180, 255, 0.92);
		color: #1a1a2e;
		border-bottom-left-radius: 4px;
	}

	.bubble-right {
		background: rgba(255, 182, 193, 0.92);
		color: #1a1a2e;
		border-bottom-right-radius: 4px;
	}

	.bubble p {
		margin: 0;
		line-height: 1.5;
	}

	/* ============================================ */
	/* FIVERR AD */
	/* ============================================ */
	.fiverr-section { text-align: center; }

	.fake-ad {
		max-width: 500px;
		margin: 0 auto;
	}

	.fake-ad img {
		width: 100%;
		border-radius: 8px;
		border: 2px solid #ff69b4;
	}

	.ad-caption {
		color: #ff69b4;
		margin: 1rem 0 0;
		font-weight: bold;
		font-size: 1.2rem;
	}

	/* ============================================ */
	/* TEAM */
	/* ============================================ */
	.team-grid {
		display: flex;
		gap: 1.25rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 2rem;
	}

	.expert-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1.25rem;
		background: rgba(40, 30, 60, 0.7);
		border-radius: 12px;
		border: 2px solid rgba(255, 105, 180, 0.4);
		width: 150px;
		transition: all 0.3s;
	}

	.expert-card:hover {
		border-color: #ff69b4;
		transform: translateY(-4px);
	}

	.expert-avatar {
		width: 114px;
		height: 120px;
		margin-bottom: 0.75rem;
		image-rEddieing: pixelated;
		image-rEddieing: crisp-edges;
		-webkit-image-rEddieing: pixelated;  /* ADD */
		transform: translateZ(0); 
	}

	.expert-card h3 {
		margin: 0;
		font-size: 1rem;
		color: white;
	}

	.expert-card .role {
		font-size: 0.7rem;
		color: #ff69b4;
		text-transform: uppercase;
	}

	.expert-card .desc {
		margin: 0.5rem 0 0;
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.6);
		text-align: center;
	}

	/* ============================================ */
	/* TEXT + IMAGE BLOCK */
	/* ============================================ */
	.dataset-section {
		max-width: 900px;
		margin: 0 auto;
	}

	.text-image-block {
		display: flex;
		gap: 2.5rem;
		align-items: center;
	}

	.text-side {
		flex: 1;
	}

	.text-side h2 {
		text-align: left;
		margin-bottom: 1rem;
	}

	.text-side p {
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.7;
		margin: 0 0 1rem;
	}

	.image-side {
		flex: 0 0 38%;
		max-width: 320px;
	}

	.image-side img {
		width: 100%;
		border-radius: 10px;
		border: 2px solid rgba(255, 105, 180, 0.3);
	}

	/* ============================================ */
	/* RESEARCH QUESTIONS */
	/* ============================================ */
	.questions-section {
		max-width: 700px;
		margin: 0 auto;
	}

	.questions-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.question-btn {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.25rem;
		background: rgba(50, 40, 70, 0.6);
		border: 2px solid rgba(255, 105, 180, 0.3);
		border-radius: 10px;
		cursor: pointer;
		text-align: left;
		color: white;
		transition: all 0.2s;
	}

	.question-btn:hover {
		border-color: #ff69b4;
		background: rgba(60, 50, 80, 0.8);
		transform: translateX(4px);
	}

	.q-num {
		width: 32px;
		height: 32px;
		background: #ff69b4;
		color: #1a1a2e;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		flex-shrink: 0;
	}

	.q-text { flex: 1; }
	.q-text h3 { margin: 0; font-size: 1rem; font-weight: 500; }
	.q-text p { margin: 0.25rem 0 0; font-size: 0.8rem; color: rgba(255, 255, 255, 0.6); }

	.q-arrow {
		color: #ff69b4;
		font-size: 1.2rem;
		opacity: 0;
		transition: opacity 0.2s;
	}

	.question-btn:hover .q-arrow { opacity: 1; }

	/* ============================================ */
	/* CONTENT SECTIONS */
	/* ============================================ */
	.content-section {
		max-width: 900px;
		margin: 0 auto;
		padding-top: 6rem;
	}

	.placeholder {
		text-align: center;
		padding: 4rem;
		background: rgba(50, 40, 70, 0.4);
		border-radius: 12px;
		border: 2px dashed rgba(255, 105, 180, 0.3);
		color: rgba(255, 255, 255, 0.4);
		margin-top: 1rem;
	}

	/* ============================================ */
	/* RESPONSIVE */
	/* ============================================ */
	@media (max-width: 768px) {
		.title { font-size: 2.5rem; }
		.team-grid { flex-direction: column; align-items: center; }
		.text-image-block { flex-direction: column; }
		.image-side { max-width: 100%; }
		.bubble { max-width: 260px; }
	}
</style>