<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import '../styles/index.css';
	import copy from '../data/copy.json';
	
	
	// ============================================
	// STARFIELD
	// ============================================
	let stars = $state([]);
	let mounted = $state(false);
	let chartEl = $state(null); 
	
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
		
		if (chartEl && typeof echarts !== 'undefined') {
            echarts.registerTheme("sheNaNigans", {
				color: ["#dc8a78", "#dd7878", "#ea76cb", "#8839ef", "#d20f39", "#e64553", "#fe640b", "#df8e1d", "#40a02b", "#179299", "#04a5e5", "#209fb5", "#1e66f5", "#7287fd"],
				backgroundColor: "transparent",
				title: { textStyle: { color: "#cdd6f4" }, subtextStyle: { color: "#a6adc8" } },
				legend: { textStyle: { color: "#cdd6f4" }, left: "center", top: "bottom" },
				categoryAxis: { axisLine: { show: true, lineStyle: { color: "#cdd6f4" } }, axisTick: { show: true, lineStyle: { color: "#cdd6f4" } }, axisLabel: { show: true, color: "#cdd6f4" }, splitLine: { show: true, lineStyle: { color: ["#313244"] } } },
				valueAxis: { axisLine: { show: true, lineStyle: { color: "#cdd6f4" } }, axisTick: { show: true, lineStyle: { color: "#cdd6f4" } }, axisLabel: { show: true, color: "#cdd6f4" }, splitLine: { show: true, lineStyle: { color: ["#313244"] } } },
				grid: { left: "10%", right: "10%", top: 60, bottom: 70 }
			});

            const chart = echarts.init(chartEl, 'sheNaNigans');
            
            // Add your chart options here
            const option = {

				"title": [{ "text": "SponsorBlock Videos", "textAlign": "center", "left": "50%" }],
				"animationDuration": 1500.0,
				"tooltip": { "trigger": "item" },
				"legend": {
					"top": "bottom",
					"data": [
						{ "name": "Misc" },
						{ "name": "Autos & Vehicles" },
						{ "name": "Comedy" },
						{ "name": "Education" },
						{ "name": "Entertainment" },
						{ "name": "Film & Animation" },
						{ "name": "Gaming" },
						{ "name": "Howto & Style" },
						{ "name": "Music" },
						{ "name": "News & Politics" },
						{ "name": "Nonprofits & Activism" },
						{ "name": "People & Blogs" },
						{ "name": "Pets & Animals" },
						{ "name": "Science & Technology" },
						{ "name": "Sports" },
						{ "name": "Travel & Events" }
					]
				},
				"grid": [{ "tooltip": { "trigger": "axis" } }],
				"xAxis": {
					"type": "category",
					"name": "year",
					"boundaryGap": false,
					"axisTick": { "show": false },
					"data": ["2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"]
				},
				"yAxis": { "type": "value", "name": "% videos" },
                    "series": [
                        { "type": "line", "name": "Misc", "symbolSize": 8.0, "stack": "videos", "areaStyle": { "opacity": 0.5 }, "emphasis": { "focus": "series" }, "data": [0.0, 0.0, 0.0007285974499089253, 0.0, 0.0, 0.00009212989578266189, 0.0, 0.000034171713543992835, 0.0, 0.0, 0.0, 0.0, 8.008708990504635e-6, 6.5462767102000615e-6, 0.0] },
                        { "type": "line", "name": "Autos & Vehicles", "symbolSize": 8.0, "stack": "videos", "areaStyle": { "opacity": 0.5 }, "emphasis": { "focus": "series" }, "data": [0.0, 0.0, 0.002185792349726776, 0.014495325996923441, 0.00849426852830319, 0.014740783325225902, 0.011360096939493884, 0.011481695750781593, 0.012642240762516254, 0.013166190920579296, 0.011794822381431924, 0.013632324968966414, 0.015280616753882842, 0.015697971551059748, 0.02130765997407555] },
                        { "type": "line", "name": "Comedy", "symbolSize": 8.0, "stack": "videos", "areaStyle": { "opacity": 0.5 }, "emphasis": { "focus": "series" }, "data": [0.0, 0.08585901948999743, 0.08670309653916211, 0.06981422316885576, 0.06665841234922673, 0.04403809018411239, 0.030933597300030292, 0.03307821871058506, 0.03461684429263801, 0.032606593056977176, 0.035090698218232706, 0.03228989914217927, 0.034645675092923045, 0.034669081457219524, 0.04392003096094953] },
                        { "type": "line", "name": "Education", "symbolSize": 8.0, "stack": "videos", "areaStyle": { "opacity": 0.5 }, "emphasis": { "focus": "series" }, "data": [0.0, 0.0, 0.058287795992714025, 0.13193704886995622, 0.08134341895747971, 0.05186913132563865, 0.06320053931126879, 0.0653363162961143, 0.05524758758422457, 0.04976897389040092, 0.05359814056020559, 0.05525635720754386, 0.07879768775757509, 0.08157970036251316, 0.09434003787120207] },
                        { "type": "line", "name": "Entertainment", "symbolSize": 8.0, "stack": "videos", "areaStyle": { "opacity": 0.5 }, "emphasis": { "focus": "series" }, "data": [0.0, 0.14166738215849575, 0.126775956284153, 0.1390368003786534, 0.1138807865404716, 0.09323545453205383, 0.08293404103715019, 0.09086258631347695, 0.13896510318482433, 0.10789712764680014, 0.11147061899462873, 0.10558369338709281, 0.11275461387731475, 0.13155397676818043, 0.1548519058684015] },
                        { "type": "line", "name": "Film & Animation", "symbolSize": 8.0, "stack": "videos", "areaStyle": { "opacity": 0.5 }, "emphasis": { "focus": "series" }, "data": [0.0, 0.04722246071949859, 0.044444444444444446, 0.028399006034788784, 0.02865015995139551, 0.03077138519140907, 0.09200078507336595, 0.03297570356995309, 0.025757321238591188, 0.02565669755637813, 0.03632452770769757, 0.0303118755192312, 0.03013677193126894, 0.031611970233556094, 0.03683057714441831] },
                        { "type": "line", "name": "Gaming", "symbolSize": 8.0, "stack": "videos", "areaStyle": { "opacity": 0.5 }, "emphasis": { "focus": "series" }, "data": [0.0, 0.06868721559199793, 0.02841530054644809, 0.036977872441131224, 0.036568545867610346, 0.03814177685402202, 0.05786716046643598, 0.08659112212047784, 0.12863728838867425, 0.12162317126048325, 0.12915550834362505, 0.1229582252102853, 0.12932463277866885, 0.13432305181659507, 0.16642925118076346] },
                        { "type": "line", "name": "Howto & Style", "symbolSize": 8.0, "stack": "videos", "areaStyle": { "opacity": 0.5 }, "emphasis": { "focus": "series" }, "data": [0.0, 0.034343607795998966, 0.3970856102003643, 0.019820139628446337, 0.016556625097540117, 0.01907088842701101, 0.015466798650015146, 0.020673886694115667, 0.018316317325220398, 0.02152537078657759, 0.018801211268035942, 0.02197210024409881, 0.026380687414722267, 0.02973318881772868, 0.036107484293951705] },
                        { "type": "line", "name": "Music", "symbolSize": 8.0, "stack": "videos", "areaStyle": { "opacity": 0.5 }, "emphasis": { "focus": "series" }, "data": [0.6024096385542169, 0.3219713230874903, 0.13479052823315119, 0.12602058927937523, 0.3164474953425494, 0.128889724199944, 0.10874759464614098, 0.09332294968864444, 0.08667898538551991, 0.0833022196807913, 0.07783407696040817, 0.06719934308231679, 0.06732120777418196, 0.06862461875302725, 0.06797858764875671] },
                        { "type": "line", "name": "News & Politics", "symbolSize": 8.0, "stack": "videos", "areaStyle": { "opacity": 0.5 }, "emphasis": { "focus": "series" }, "data": [0.0, 0.008585901948999742, 0.07868852459016394, 0.028694829014317833, 0.030953690399748914, 0.017781069886053744, 0.013600116054323664, 0.01684665477718847, 0.03573672782475067, 0.030676066529032996, 0.03491443686259487, 0.033091800610941996, 0.029415988122123524, 0.03085260213517289, 0.037475072945921145] },
                        { "type": "line", "name": "Nonprofits & Activism", "symbolSize": 8.0, "stack": "videos", "areaStyle": { "opacity": 0.5 }, "emphasis": { "focus": "series" }, "data": [0.0, 0.0, 0.0036429872495446266, 0.007099751508697196, 0.0033113250195080236, 0.0027638968734798566, 0.002773356999313061, 0.002494535088711477, 0.005076805345577393, 0.003436337219740638, 0.004171518750095475, 0.002801309130877804, 0.002915170072543687, 0.002454853766325023, 0.0020042247485759002] },
                        { "type": "line", "name": "People & Blogs", "symbolSize": 8.0, "stack": "videos", "areaStyle": { "opacity": 0.5 }, "emphasis": { "focus": "series" }, "data": [0.0, 0.008585901948999742, 0.1894353369763206, 0.06153117974204236, 0.02433104036073287, 0.01170049676439806, 0.009333412978457417, 0.011891756313309507, 0.010999744915417685, 0.015617959611068403, 0.023090237588556644, 0.028408696033367653, 0.03366060388709098, 0.03762799853022995, 0.04480031790934365] },
                        { "type": "line", "name": "Pets & Animals", "symbolSize": 8.0, "stack": "videos", "areaStyle": { "opacity": 0.5 }, "emphasis": { "focus": "series" }, "data": [0.0, 0.004292950974499871, 0.0014571948998178506, 0.001479114897645249, 0.0035992663255521996, 0.0013819484367399283, 0.0009066744036215776, 0.001264353401127735, 0.0018415862528074858, 0.0025096844863274318, 0.00233546296220134, 0.002608852778374749, 0.003724049680584655, 0.003515350593377433, 0.004739402052514776] },
                        { "type": "line", "name": "Science & Technology", "symbolSize": 8.0, "stack": "videos", "areaStyle": { "opacity": 0.5 }, "emphasis": { "focus": "series" }, "data": [0.0, 0.0, 0.07067395264116576, 0.10767956454857414, 0.08292709614072268, 0.08346968557909168, 0.06992059665575813, 0.06523380115548232, 0.06569983388394274, 0.05212421625449282, 0.048574691924527236, 0.08732172393846957, 0.04900529031289786, 0.06073635531723617, 0.07349610048601271] },
                        { "type": "line", "name": "Sports", "symbolSize": 8.0, "stack": "videos", "areaStyle": { "opacity": 0.5 }, "emphasis": { "focus": "series" }, "data": [0.30120481927710846, 0.0, 0.02695810564663024, 0.05383978227428707, 0.0227473631774899, 0.027086189360102597, 0.04240036181642083, 0.05081333803991735, 0.05997598471981136, 0.04247158361477193, 0.04578388712692815, 0.03603210599640534, 0.038041367704897015, 0.04736885827500764, 0.06029965596499728] },
                        { "type": "line", "name": "Travel & Events", "symbolSize": 8.0, "stack": "videos", "areaStyle": { "opacity": 0.5 }, "emphasis": { "focus": "series" }, "data": [0.0, 0.0, 0.0014571948998178506, 0.003254052774819548, 0.0023035304483534076, 0.0028560267692625185, 0.001653347441898171, 0.003758888489839212, 0.0036085136034741277, 0.002857179261357384, 0.0036868000220914234, 0.0035925185800570313, 0.004308685436891493, 0.005106095833956048, 0.007584615225002916] }
                    ]
            };
            
            chart.setOption(option);
            
            // Handle resize
            window.addEventListener('resize', () => chart.resize());
        }
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
	
	const ytCategories = [
		{ id: "gaming", name: "Gaming" },
		{ id: "entertainment", name: "Entertainment" },
		{ id: "music", name: "Music" },
		{ id: "news", name: "News & Politics" },
		{ id: "people", name: "People & Blogs" },
		{ id: "sports", name: "Sports" },
		{ id: "howto", name: "Howto & Style" },
		{ id: "education", name: "Education" },
	];
	
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
						<span class="cat-name">{cat.name}</span>
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
								<span class="cat-name">{cat.name}</span>
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
								<span class="cat-name">{cat.name}</span>
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


        <div bind:this={chartEl} style="width: 100%; max-width: 900px; height: 600px; margin: 0 auto;"></div>

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

