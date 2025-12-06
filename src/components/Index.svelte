<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import '../styles/index.css';
	import copy from '../data/copy.json';
  import { selectedCat, ytCategories } from "../lib/CategorySelection"
  import KalanChart0 from "./KalanChart0.svelte"
  import KalanChart1 from "./KalanChart1.svelte"


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
		siba: { avatar: "assets/pixel_art/siba.gif", name: "Siba" },
	};

	function getSpeaker(id) {
		return speakers[id.toLowerCase()] || { avatar: "assets/pixel_art/default.gif", name: id };
	}

	// ============================================
	// HELPER: Parse chat message from CSV format "[speaker] text"
	// ============================================
	function parseChatMessage(str) {
		const match = str.match(/^\[(\w+)\]\s*(.*)$/);
		if (match) {
			const speakerKey = match[1].toLowerCase();
			const text = match[2];
			const side = speakerKey === 'jimmy' ? 'right' : 'left';
			return { speaker: match[1], text, side };
		}
		return { speaker: "Unknown", text: str, side: "left" };
	}

	// ============================================
	// DIALOGUE DATA (from Google Sheet)
	// ============================================
	const introChat = [
		parseChatMessage(copy.intro_chat_1),
		parseChatMessage(copy.intro_chat_2),
		parseChatMessage(copy.intro_chat_3),
		parseChatMessage(copy.intro_chat_4),
		parseChatMessage(copy.intro_chat_5),
		parseChatMessage(copy.intro_chat_6),
		parseChatMessage(copy.intro_chat_7),
	].filter(m => m && m.text);

	const datasetChat = [
		parseChatMessage(copy.dataset_chat_1),
		parseChatMessage(copy.dataset_chat_2),
		parseChatMessage(copy.dataset_chat_3),
		parseChatMessage(copy.dataset_chat_4),
		parseChatMessage(copy.dataset_chat_5),
	].filter(m => m && m.text);

	// ============================================
	// TEAM DATA (from Google Sheet)
	// ============================================
	const team = [
		{ name: copy.team_1_name, role: copy.team_1_role, avatar: `assets/pixel_art/${copy.team_1_avatar}`, desc: copy.team_1_desc },
		{ name: copy.team_2_name, role: copy.team_2_role, avatar: `assets/pixel_art/${copy.team_2_avatar}`, desc: copy.team_2_desc },
		{ name: copy.team_3_name, role: copy.team_3_role, avatar: `assets/pixel_art/${copy.team_3_avatar}`, desc: copy.team_3_desc },
		{ name: copy.team_4_name, role: copy.team_4_role, avatar: `assets/pixel_art/${copy.team_4_avatar}`, desc: copy.team_4_desc },
		{ name: copy.team_5_name, role: copy.team_5_role, avatar: `assets/pixel_art/${copy.team_5_avatar}`, desc: copy.team_5_desc },
		{ name: copy.team_6_name, role: copy.team_6_role, avatar: `assets/pixel_art/${copy.team_6_avatar}`, desc: copy.team_6_desc },
	];

	// ============================================
	// RESEARCH QUESTIONS (from Google Sheet)
	// ============================================

	const questions = [
		{
			id: "section-monetization",
			title: copy.q1_title,
			desc: copy.q1_desc
		},
		{
			id: "section-sponsors",
			title: copy.q2_title,
			desc: copy.q2_desc
		},
		{
			id: "section-categories",
			title: copy.q3_title,
			desc: copy.q3_desc
		}
	];

	function jumpTo(id) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}

	// ============================================
	// QUESTION 1: Interactive Category Selection
	// ============================================
	let selectedCategory = $state(null);
	let vizIframe = $state(null);

	// Compare categories
	let compareCatA = $state(null);
	let compareCatB = $state(null);
	let compareIframe = $state(null);

	function selectCategory(cat) {
		selectedCategory = cat;
		// Send message to iframe to update visualization
		if (vizIframe && vizIframe.contentWindow) {
			vizIframe.contentWindow.postMessage({
				type: "selectCategory",
				category: cat ? cat.name : null
			}, "*");
		}
	}

	function selectCompareA(cat) {
		compareCatA = cat;
		sendCompareMessage();
	}

	function selectCompareB(cat) {
		compareCatB = cat;
		sendCompareMessage();
	}

	function sendCompareMessage() {
		if (compareIframe && compareIframe.contentWindow) {
			const cats = [compareCatA?.name, compareCatB?.name].filter(Boolean);
			compareIframe.contentWindow.postMessage({
				type: "compareCategories",
				categories: cats
			}, "*");
		}
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
		<h1 class="title">{copy.hero_title}</h1>
		<p class="subtitle">{copy.hero_subtitle}</p>
		<p class="byline">{copy.hero_byline}</p>
		<div class="scroll-indicator">↓</div>
	</section>

	<!-- ========== VIDEO + TRANSCRIPT ========== -->
	<section class="video-section">
		<div class="video-container">
			<iframe
				src={copy.youtube_url}
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
					{showTranscript ? copy.transcript_btn_hide : copy.transcript_btn_show}
				</button>
			</h3>

			{#if showTranscript}
				<div class="collapsible-content">
					<p><strong>Jimmy:</strong> {copy.transcript_content}</p>
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
				<h2>{copy.dataset_title}</h2>
				<p>
					{copy.dataset_p1}
				</p>
				<p>
					{copy.dataset_p2}
				</p>
				<p>
					{copy.dataset_p3}
				</p>
			</div>
			<div class="image-side">
				<img src="assets/1.png" alt={copy.dataset_img_alt} />
			</div>
		</div>
	</section>



	<!-- ========== DIALOGUE 2 ========== -->
	{@render dialogue(datasetChat)}

	<!-- ========== RESEARCH QUESTIONS ========== -->
	<section class="questions-section">
		<h2>{copy.learn_title}</h2>
		<p class="section-sub">{copy.learn_subtitle}</p>

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
		<h2>{copy.section1_title}</h2>

		<!-- Introduction -->
		<div class="section-intro">
			<p>
				{copy.section1_intro}
			</p>
		</div>

		<!-- Interactive Dialogue -->
		<div class="interactive-dialogue">
			<!-- Eddie asks -->
			<div class="msg left">
				<div class="avatar-col">
					<img class="avatar-img" src="{base}/assets/pixel_art/ender.gif" alt="Eddie" />
					<span class="speaker-name">Eddie</span>
				</div>
				<div class="bubble bubble-left">
					<p>{copy.dialogue_eddie_ask}</p>
				</div>
			</div>

			<!-- Category buttons -->
			<div class="category-selector">
				{#each ytCategories as cat}
					<button
						class="cat-btn {selectedCategory?.id === cat.id ? 'active' : ''}"
						onclick={() => selectCategory(cat)}
					>
            <span class="icon">{cat.icon}</span>
						<span class="cat-name"> {cat.name} </span>
					</button>
				{/each}
			</div>

			<!-- Jimmy's dynamic response -->
			{#if selectedCategory}
				<div class="msg right" style="--delay: 0s">
					<div class="bubble bubble-right">
						<p>{copy.dialogue_jimmy_show}<strong>{selectedCategory.name}</strong></p>
					</div>
					<div class="avatar-col">
						<img class="avatar-img" src="{base}/assets/pixel_art/jan.gif" alt="Jimmy" style="transform: scaleX(-1);" />
						<span class="speaker-name">Jimmy</span>
					</div>
				</div>

				<!-- Eddie's response with visualization -->
				<div class="msg left" style="--delay: 0.1s">
					<div class="avatar-col">
						<img class="avatar-img" src="{base}/assets/pixel_art/ender.gif" alt="Eddie" />
						<span class="speaker-name">Eddie</span>
					</div>
					<div class="bubble bubble-left">
						<p>{copy.dialogue_eddie_response_1}<strong>{selectedCategory.name}</strong>{copy.dialogue_eddie_response_2}</p>
					</div>
				</div>
			{:else}
				<div class="msg right" style="--delay: 0s">
					<div class="bubble bubble-right bubble-hint">
						<p>{copy.dialogue_jimmy_hint}</p>
					</div>
					<div class="avatar-col">
						<img class="avatar-img" src="{base}/assets/pixel_art/jan.gif" alt="Jimmy" style="transform: scaleX(-1);" />
						<span class="speaker-name">Jimmy</span>
					</div>
				</div>
			{/if}
		</div>

		<!-- Visualization iframe (main chart only) -->
		<div class="viz-container-plain">
			<iframe
				bind:this={vizIframe}
				src="{base}/data/ender_1.html?view=main"
				title="YouTube Category Visualization"
				class="viz-iframe"
				frameborder="0"
				onload={() => {
					// Send current category to iframe after it loads
					if (selectedCategory && vizIframe && vizIframe.contentWindow) {
						setTimeout(() => {
							vizIframe.contentWindow.postMessage({
								type: "selectCategory",
								category: selectedCategory.name
							}, "*");
						}, 500);
					}
				}}
			></iframe>
		</div>

		<!-- Compare Categories Dialogue -->
		<div class="interactive-dialogue">
			<!-- Eddie asks about comparing -->
			<div class="msg left">
				<div class="avatar-col">
					<img class="avatar-img" src="{base}/assets/pixel_art/ender.gif" alt="Eddie" />
					<span class="speaker-name">Eddie</span>
				</div>
				<div class="bubble bubble-left">
					<p>{copy.dialogue_compare_ask}</p>
				</div>
			</div>

			<!-- Category A and B selection in two columns -->
			<div class="compare-columns">
				<div class="compare-selection">
					<h4 class="compare-label">{copy.compare_label_a}</h4>
					<div class="category-selector-compact">
						{#each ytCategories as cat}
							<button
								class="cat-btn {compareCatA?.id === cat.id ? 'active' : ''}"
								onclick={() => selectCompareA(cat)}
							>
                <span class="icon">{cat.icon}</span>
					      <span class="cat-name"> {cat.name} </span>
							</button>
						{/each}
					</div>
				</div>

				<div class="compare-selection">
					<h4 class="compare-label">{copy.compare_label_b}</h4>
					<div class="category-selector-compact">
						{#each ytCategories as cat}
							<button
								class="cat-btn {compareCatB?.id === cat.id ? 'active' : ''}"
								onclick={() => selectCompareB(cat)}
							>
                <span class="icon">{cat.icon}</span>
					      <span class="cat-name"> {cat.name} </span>
							</button>
						{/each}
					</div>
				</div>
			</div>

			<!-- Jimmy's response for compare -->
			{#if compareCatA && compareCatB}
				<div class="msg right" style="--delay: 0s">
					<div class="bubble bubble-right">
						<p>{copy.dialogue_compare_response}<strong>{compareCatA.name}</strong>{copy.dialogue_compare_vs}<strong>{compareCatB.name}</strong>{copy.dialogue_compare_end}</p>
					</div>
					<div class="avatar-col">
						<img class="avatar-img" src="{base}/assets/pixel_art/jan.gif" alt="Jimmy" style="transform: scaleX(-1);" />
						<span class="speaker-name">Jimmy</span>
					</div>
				</div>
			{:else if compareCatA || compareCatB}
				<div class="msg right" style="--delay: 0s">
					<div class="bubble bubble-right bubble-hint">
						<p>{compareCatA ? copy.dialogue_pick_other_b : copy.dialogue_pick_other_a}</p>
					</div>
					<div class="avatar-col">
						<img class="avatar-img" src="{base}/assets/pixel_art/jan.gif" alt="Jimmy" style="transform: scaleX(-1);" />
						<span class="speaker-name">Jimmy</span>
					</div>
				</div>
			{/if}
		</div>

		<!-- Compare visualization iframe (comparison section only) -->
		{#if compareCatA || compareCatB}
			<div class="viz-container-plain">
				<iframe
					bind:this={compareIframe}
					src="{base}/data/ender_1.html?view=compare"
					title="YouTube Category Comparison"
					class="viz-iframe viz-iframe-compare"
					frameborder="0"
					onload={() => {
						// Send compare categories after iframe loads
						if (compareIframe && compareIframe.contentWindow) {
							setTimeout(() => {
								sendCompareMessage();
							}, 500);
						}
					}}
				></iframe>
			</div>
		{/if}
	</section>

	<section id="section-sponsors" class="content-section">
		<h2>{copy.section2_title}</h2>
		<div class="placeholder">{copy.section2_placeholder}</div>

		<div class="category-selector">
			{#each ytCategories as cat}
				<button
					class="cat-btn"
          class:active={$selectedCat === cat.name}
					onclick={() => selectedCat.set(cat.name)}
				>
          <span class="icon">{cat.icon}</span>
					<span class="cat-name"> {cat.name} </span>
				</button>
			{/each}
		</div>

    <KalanChart0/>
    <KalanChart1/>

		<!--
		<div class="container">
       		<div class="item" id="chart" style="width: 900px; height: 600px"></div>
      	</div>
		-->


	</section>



	<section id="section-categories" class="content-section">
		<h2>{copy.section3_title}</h2>
		<div class="placeholder">{copy.section3_placeholder}</div>
	</section>

	<!-- ========== MEET THE TEAM ========== -->
	<section class="team-section">
		<h2>{copy.team_title}</h2>
		<p class="section-sub">{copy.team_subtitle}</p>

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

</div>
