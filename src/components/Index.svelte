<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import '../styles/index.css';
	import copy from '../data/copy.json';
  import { selectedCat, selectedActiveInactive, ytCategories } from "../lib/CategorySelection"
  import KalanChart0 from "./KalanChart0.svelte"
  import KalanChart1 from "./KalanChart1.svelte"
  import KalanChart2 from "./KalanChart2.svelte"
  import KalanChart3 from "./KalanChart3.svelte"
  import KalanChart4 from "./KalanChart4.svelte"
  import Activity1 from "./Activity1.svelte"
  import Activity2 from "./Activity2.svelte"
  import VisualizationFocus from "./VisualizationFocus.svelte"
  import VisualizationCompare from "./VisualizationCompare.svelte"
  import VisualizationDumbbell from "./VisualizationDumbbell.svelte"
  import VisualizationDeltaViews from "./VisualizationDeltaViews.svelte"
  import { rq2 } from "../lib/research_question_2"
  import "katex/dist/katex.min.css"
  import renderMathInElement from "katex/contrib/auto-render"


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

  const q2Chat0 = [
		parseChatMessage(copy.section2_chat_1),
		parseChatMessage(copy.section2_chat_2),
		parseChatMessage(copy.section2_chat_3),
		parseChatMessage(copy.section2_chat_4),
	].filter(m => m && m.text);

  const q2Chat1 = [
		parseChatMessage(copy.section2_chat_5),
		parseChatMessage(copy.section2_chat_6),
		parseChatMessage(copy.section2_chat_7),
	].filter(m => m && m.text);

  const q2Chat2 = [
		parseChatMessage(copy.section2_chat_10),
		parseChatMessage(copy.section2_chat_11),
	].filter(m => m && m.text);

  const q2Chat3 = [
		parseChatMessage(copy.section2_chat_12),
		parseChatMessage(copy.section2_chat_13),
		parseChatMessage(copy.section2_chat_14),
		parseChatMessage(copy.section2_chat_15),
		parseChatMessage(copy.section2_chat_16),
	].filter(m => m && m.text);

  const q2Chat4 = [
		parseChatMessage(copy.section2_chat_17),
		parseChatMessage(copy.section2_chat_18),
		parseChatMessage(copy.section2_chat_19),
		parseChatMessage(copy.section2_chat_20),
		parseChatMessage(copy.section2_chat_21),
		parseChatMessage(copy.section2_chat_22),
		parseChatMessage(copy.section2_chat_23),
		parseChatMessage(copy.section2_chat_24),
		parseChatMessage(copy.section2_chat_25),
		parseChatMessage(copy.section2_chat_26),
		parseChatMessage(copy.section2_chat_27),
		parseChatMessage(copy.section2_chat_28),
		parseChatMessage(copy.section2_chat_29),
		parseChatMessage(copy.section2_chat_30),
		parseChatMessage(copy.section2_chat_31),
	].filter(m => m && m.text);

  const q2Chat5 = [
		parseChatMessage(copy.section2_chat_32),
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

	// ===========
	// Render Math
	// ===========
  function render_math(el) {
    renderMathInElement(el, {
        delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
        ],
        throwOnError: false
    });
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
						<p>{@html msg.text}</p>
					</div>
				{:else}
					<!-- Jimmy on RIGHT -->
					<div class="bubble bubble-right">
						<p>{@html msg.text}</p>
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

<div class="container" use:render_math>
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
        <p class="section-sub">{copy.dataset_subtitle}</p>
				<p> {copy.dataset_p1} </p>
			</div>
			<div class="image-side">
        <a href="https://github.com/epfl-dlab/YouNiverse" target="_blank">
          <img src="assets/youniverse.png" alt={copy.dataset_img_alt} />
        </a>
			</div>
		</div>

		<div class="text-image-block">
			<div class="image-side">
        <a href="https://github.com/ajayyy/SponsorBlock" target="_blank">
          <img src="assets/sponsorblock.png" alt={copy.sb_img_alt} />
        </a>
			</div>
			<div class="text-side">
				<h2>{copy.sb_title}</h2>
        <p class="section-sub">{copy.sb_subtitle}</p>
				<p> {copy.sb_p1} </p>
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

		<div class="section-intro">
			<p class="intro-text">
				About <strong>137K YouTube channels</strong> joined between <strong>2005 and 2019</strong>.
				As of 2025, roughly <strong class="highlight-error">58% (~80K)</strong> are still uploading,
				while about <strong class="highlight-muted">42% (~55K)</strong> no longer publish new videos.
			</p>
		</div>

		<Activity1 />

		<p class="text-content">
			We classify channels into <strong>activity bands</strong> based on their <code class="inline-code">last_upload_date</code>. Activity is measured using the last video date in <strong>2025</strong>: if a channel uploads at least one video in 2025, we treat it as <strong>active</strong>; otherwise, it is considered <strong>not active</strong>.
		</p>

		<Activity2 />

		<h2 class="section-subtitle">
			{copy.viz_main_title}
		</h2>
		<p class="text-content">
			{copy.viz_main_desc}
		</p>

		<div class="iframe-wrapper">
			<iframe 
				src="{base}/data/visualisation_full.html" 
				title="YouTube Upload Volume Visualization"
				class="viz-iframe"
				scrolling="no"
			></iframe>
		</div>

		<p class="text-content">
			{copy.viz_focus_desc}
		</p>

		<VisualizationFocus />

		<h2 class="section-subtitle">
			{copy.viz_compare_title}
		</h2>
		<p class="text-content">
			{copy.viz_compare_desc}
		</p>

		<VisualizationCompare />
	</section>

	<section id="section-sponsors" class="content-section">
		<h2>{copy.section2_title}</h2>

	  {@render dialogue(q2Chat0)}

    <KalanChart3/>

	  {@render dialogue(q2Chat1)}

		<div class="category-selector">
			{#each ytCategories as cat}
				<button
					class="cat-btn"
          class:active={$selectedCat === cat.name}
					onclick={() => selectedCat.set(cat.name)}
				>
          <span class="icon">{cat.icon}</span>
					<span class="cat-name">{cat.name}</span>
				</button>
			{/each}
		</div>

		{#if $selectedCat}
        {@render dialogue([
            parseChatMessage(
                copy.section2_chat_8.replace("<cat>", $selectedCat)
            ),
            parseChatMessage(
                copy.section2_chat_9
                    .replace("<joke>", rq2.repliques[$selectedCat])
                    .replace("<views>", rq2.views[$selectedCat].toLocaleString())
                    .replace("<subs>", rq2.subscribers[$selectedCat].toLocaleString())
                    .replace("<vids>", rq2.videos[$selectedCat].toLocaleString())
                    .replace("<gen_views>", rq2.views["All"].toLocaleString())
                    .replace("<gen_subs>", rq2.subscribers["All"].toLocaleString())
                    .replace("<gen_vids>", rq2.videos["All"].toLocaleString())
            )
        ])}
		{:else}
        {@render dialogue([
            parseChatMessage(
                "[jimmy] <span class='bubble-hint'>"
                    + copy.dialogue_jimmy_hint
                    + "</span>"
            )
        ])}
		{/if}

    <KalanChart1/>

	  {@render dialogue(q2Chat2)}

    <KalanChart2/>

	  {@render dialogue(q2Chat3)}

		<div class="category-selector">
			<button
				class="cat-btn"
        class:active={$selectedActiveInactive === 0}
				onclick={() => selectedActiveInactive.set(0)}
			>
        <span class="icon">󰽢</span>
				<span class="cat-name">All</span>
			</button>
			<button
				class="cat-btn"
        class:active={$selectedActiveInactive === 1}
				onclick={() => selectedActiveInactive.set(1)}
			>
        <span class="icon">󱓮</span>
				<span class="cat-name">Sponsored</span>
				<span class="cat-name">/</span>
        <span class="icon">󱉢</span>
				<span class="cat-name">Not Sponsored</span>
			</button>
		</div>

    <KalanChart4/>

	  {@render dialogue(q2Chat4)}

		<div class="category-selector">
			<a href="{base}/wasm/index.html" target="_blank" class="plain-link">
        <button class="cat-btn active">
          <span class="icon">󱁉</span>
          <span class="cat-name">Show Channel Graph</span>
        </button>
			</a>
		</div>

	  {@render dialogue(q2Chat5)}

    <KalanChart0/>

		<!--
		<div class="container">
       		<div class="item" id="chart" style="width: 900px; height: 600px"></div>
      	</div>
		-->


	</section>



	<section id="section-categories" class="content-section">
		<h2>{copy.section3_title}</h2>
		
		<p class="text-content">
			{copy.section3_intro}
		</p>

		<p class="text-content">
			{copy.section3_dumbbell_intro}
		</p>

		<VisualizationDumbbell />

		<p class="text-content">
			{copy.section3_dumbbell_analysis}
		</p>

		<p class="text-content">
			{copy.section3_dumbbell_conclusion}
		</p>

		<p class="text-content">
			{copy.section3_delta_intro}
		</p>

		<VisualizationDeltaViews />

		<p class="text-content">
			{copy.section3_delta_analysis}
		</p>

		<p class="text-content">
			{copy.section3_delta_views}
		</p>

		<p class="text-content">
			{copy.section3_delta_subs}
		</p>

		<p class="text-content">
			{copy.section3_conclusion}
		</p>
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
