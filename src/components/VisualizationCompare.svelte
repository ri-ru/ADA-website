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
  const palette = ["#0ea5e9","#f97316","#22c55e","#eab308","#a855f7","#fb7185","#f43f5e","#14b8a6","#6366f1","#ec4899","#84cc16","#06b6d4","#f87171","#8b5cf6","#facc15"];
  const categoryColors = categories.reduce((acc, cat, idx)=>{acc[cat]=palette[idx%palette.length];return acc;}, {});
  const years = dataRows.map(d=>d.year);

  const urlDataByYear = {
    2008: {"Travel & Events":3679,"Entertainment":22424,"People & Blogs":9987,"Nonprofits & Activism":3549,"Pets & Animals":2375,"Music":21963,"News & Politics":9089,"Autos & Vehicles":8447,"Howto & Style":15148,"Science & Technology":8952,"Comedy":4197,"Education":11776,"Sports":9146,"Gaming":9936,"Film & Animation":3524},
    2009: {"Travel & Events":8791,"Entertainment":42732,"People & Blogs":25590,"Nonprofits & Activism":6400,"Pets & Animals":4116,"Music":54013,"News & Politics":17526,"Autos & Vehicles":14722,"Howto & Style":26539,"Science & Technology":16708,"Comedy":7392,"Education":21423,"Sports":18331,"Gaming":31237,"Film & Animation":7610},
    2010: {"Travel & Events":12459,"Entertainment":73500,"People & Blogs":29844,"Nonprofits & Activism":10142,"Pets & Animals":6563,"Music":82066,"News & Politics":23374,"Autos & Vehicles":26618,"Howto & Style":46383,"Science & Technology":28250,"Comedy":9606,"Education":39246,"Sports":27332,"Gaming":58874,"Film & Animation":14453},
    2011: {"Travel & Events":20320,"Entertainment":152090,"People & Blogs":48277,"Nonprofits & Activism":12111,"Pets & Animals":9467,"Music":145114,"News & Politics":43092,"Autos & Vehicles":42843,"Howto & Style":73403,"Science & Technology":48183,"Comedy":17758,"Education":65052,"Sports":52083,"Gaming":161360,"Film & Animation":39037},
    2012: {"Travel & Events":30472,"Entertainment":298876,"People & Blogs":87387,"Nonprofits & Activism":19644,"Pets & Animals":15107,"Music":238955,"News & Politics":76775,"Autos & Vehicles":70526,"Howto & Style":135329,"Science & Technology":73057,"Comedy":26972,"Education":99364,"Sports":97834,"Gaming":335388,"Film & Animation":57822},
    2013: {"Travel & Events":41745,"Entertainment":401657,"People & Blogs":125562,"Nonprofits & Activism":31190,"Pets & Animals":20785,"Music":334743,"News & Politics":125974,"Autos & Vehicles":88078,"Howto & Style":196258,"Science & Technology":107370,"Comedy":39361,"Education":132849,"Sports":144904,"Gaming":633944,"Film & Animation":80630},
    2014: {"Travel & Events":40545,"Entertainment":539924,"People & Blogs":224993,"Nonprofits & Activism":28116,"Pets & Animals":22559,"Music":440914,"News & Politics":195563,"Autos & Vehicles":104330,"Howto & Style":240237,"Science & Technology":127258,"Comedy":56411,"Education":159912,"Sports":179731,"Gaming":941946,"Film & Animation":120377},
    2015: {"Travel & Events":77975,"Entertainment":717339,"People & Blogs":349662,"Nonprofits & Activism":51480,"Pets & Animals":29316,"Music":556422,"News & Politics":316352,"Autos & Vehicles":172977,"Howto & Style":317974,"Science & Technology":155944,"Comedy":74244,"Education":220831,"Sports":257952,"Gaming":1263173,"Film & Animation":158553},
    2016: {"Travel & Events":83326,"Entertainment":1181945,"People & Blogs":604201,"Nonprofits & Activism":67087,"Pets & Animals":41070,"Music":728162,"News & Politics":470327,"Autos & Vehicles":165476,"Howto & Style":436275,"Science & Technology":205839,"Comedy":98481,"Education":306033,"Sports":328519,"Gaming":1716077,"Film & Animation":220996},
    2017: {"Travel & Events":103854,"Entertainment":1622016,"People & Blogs":860586,"Nonprofits & Activism":75587,"Pets & Animals":70205,"Music":949318,"News & Politics":731850,"Autos & Vehicles":220875,"Howto & Style":590474,"Science & Technology":301642,"Comedy":126351,"Education":485948,"Sports":437542,"Gaming":2105389,"Film & Animation":287600},
    2018: {"Travel & Events":118943,"Entertainment":2022178,"People & Blogs":1005911,"Nonprofits & Activism":86276,"Pets & Animals":94581,"Music":1087263,"News & Politics":1258286,"Autos & Vehicles":263679,"Howto & Style":665634,"Science & Technology":368926,"Comedy":137355,"Education":663884,"Sports":574477,"Gaming":2283730,"Film & Animation":320182}
  };

  const specialtyData = {"Travel & Events":{"2008":{"total":11130,"urls":3679,"monetization":621,"content":734,"social":657},"2009":{"total":21174,"urls":8791,"monetization":1858,"content":1922,"social":2590},"2010":{"total":31476,"urls":12459,"monetization":1807,"content":3164,"social":3153},"2011":{"total":45701,"urls":20320,"monetization":1603,"content":5507,"social":5489},"2012":{"total":67591,"urls":30472,"monetization":3744,"content":9825,"social":9616},"2013":{"total":83874,"urls":41745,"monetization":4109,"content":14106,"social":12568},"2014":{"total":78988,"urls":40545,"monetization":5129,"content":14467,"social":15654},"2015":{"total":127107,"urls":77975,"monetization":13851,"content":28912,"social":55383},"2016":{"total":135793,"urls":83326,"monetization":20520,"content":39132,"social":53636},"2017":{"total":160395,"urls":103854,"monetization":34037,"content":50801,"social":60041},"2018":{"total":181124,"urls":118943,"monetization":45458,"content":55525,"social":72761}},"Entertainment":{"2008":{"total":55638,"urls":22424,"monetization":973,"content":6518,"social":5389},"2009":{"total":91212,"urls":42732,"monetization":3325,"content":11593,"social":14451},"2010":{"total":153734,"urls":73500,"monetization":6768,"content":22448,"social":27729},"2011":{"total":304094,"urls":152090,"monetization":14215,"content":62836,"social":62690},"2012":{"total":497732,"urls":298876,"monetization":29251,"content":134354,"social":147516},"2013":{"total":634714,"urls":401657,"monetization":39451,"content":199915,"social":235311},"2014":{"total":807142,"urls":539924,"monetization":61319,"content":258024,"social":313265},"2015":{"total":1029927,"urls":717339,"monetization":99388,"content":374871,"social":453791},"2016":{"total":1565403,"urls":1181945,"monetization":229061,"content":632704,"social":806558},"2017":{"total":2176261,"urls":1622016,"monetization":328761,"content":943505,"social":1084249},"2018":{"total":2697068,"urls":2022178,"monetization":465051,"content":1141106,"social":1339619}},"People & Blogs":{"2008":{"total":31167,"urls":9987,"monetization":792,"content":2469,"social":2570},"2009":{"total":60399,"urls":25590,"monetization":2428,"content":5956,"social":6683},"2010":{"total":66036,"urls":29844,"monetization":2963,"content":9060,"social":9978},"2011":{"total":97349,"urls":48277,"monetization":6101,"content":16902,"social":21301},"2012":{"total":156526,"urls":87387,"monetization":12398,"content":32170,"social":40422},"2013":{"total":221188,"urls":125562,"monetization":20747,"content":55704,"social":65427},"2014":{"total":411033,"urls":224993,"monetization":40974,"content":108572,"social":129649},"2015":{"total":635832,"urls":349662,"monetization":69454,"content":175025,"social":213946},"2016":{"total":1012489,"urls":604201,"monetization":143194,"content":331928,"social":356116},"2017":{"total":1411483,"urls":860586,"monetization":237861,"content":480899,"social":502853},"2018":{"total":1684526,"urls":1005911,"monetization":338007,"content":546144,"social":594407}},"Nonprofits & Activism":{"2008":{"total":6123,"urls":3549,"monetization":230,"content":303,"social":227},"2009":{"total":13577,"urls":6400,"monetization":333,"content":772,"social":772},"2010":{"total":21495,"urls":10142,"monetization":596,"content":1218,"social":1606},"2011":{"total":28280,"urls":12111,"monetization":595,"content":1654,"social":2312},"2012":{"total":39107,"urls":19644,"monetization":1056,"content":3594,"social":4600},"2013":{"total":59203,"urls":31190,"monetization":1396,"content":11476,"social":10438},"2014":{"total":70375,"urls":28116,"monetization":1924,"content":7227,"social":8284},"2015":{"total":82187,"urls":51480,"monetization":3130,"content":24825,"social":10012},"2016":{"total":97483,"urls":67087,"monetization":4471,"content":29366,"social":22708},"2017":{"total":118501,"urls":75587,"monetization":6219,"content":35443,"social":24595},"2018":{"total":130403,"urls":86276,"monetization":8948,"content":42109,"social":33215}},"Pets & Animals":{"2008":{"total":6921,"urls":2375,"monetization":129,"content":492,"social":479},"2009":{"total":10295,"urls":4116,"monetization":456,"content":1115,"social":956},"2010":{"total":15596,"urls":6563,"monetization":819,"content":2118,"social":1741},"2011":{"total":21037,"urls":9467,"monetization":1222,"content":2591,"social":3087},"2012":{"total":30398,"urls":15107,"monetization":1862,"content":4350,"social":6505},"2013":{"total":38922,"urls":20785,"monetization":2396,"content":7308,"social":9582},"2014":{"total":37009,"urls":22559,"monetization":3181,"content":8864,"social":12783},"2015":{"total":48439,"urls":29316,"monetization":3097,"content":9609,"social":15870},"2016":{"total":66900,"urls":41070,"monetization":6419,"content":17588,"social":21328},"2017":{"total":101161,"urls":70205,"monetization":13252,"content":30737,"social":32805},"2018":{"total":145417,"urls":94581,"monetization":21825,"content":32366,"social":46709}},"Music":{"2008":{"total":51183,"urls":21963,"monetization":2848,"content":4829,"social":8260},"2009":{"total":116200,"urls":54013,"monetization":6876,"content":15191,"social":22882},"2010":{"total":174585,"urls":82066,"monetization":10684,"content":25114,"social":32455},"2011":{"total":285111,"urls":145114,"monetization":20313,"content":49744,"social":66260},"2012":{"total":404498,"urls":238955,"monetization":35688,"content":97071,"social":123960},"2013":{"total":521508,"urls":334743,"monetization":50618,"content":152632,"social":184106},"2014":{"total":653974,"urls":440914,"monetization":60822,"content":209126,"social":269238},"2015":{"total":795565,"urls":556422,"monetization":80966,"content":302127,"social":356773},"2016":{"total":1012825,"urls":728162,"monetization":112398,"content":416491,"social":470521},"2017":{"total":1320471,"urls":949318,"monetization":153929,"content":549530,"social":626568},"2018":{"total":1612171,"urls":1087263,"monetization":210006,"content":634416,"social":733537}},"News & Politics":{"2008":{"total":25270,"urls":9089,"monetization":167,"content":903,"social":667},"2009":{"total":67463,"urls":17526,"monetization":711,"content":1473,"social":3466},"2010":{"total":97464,"urls":23374,"monetization":1401,"content":3361,"social":5932},"2011":{"total":169560,"urls":43092,"monetization":1985,"content":6776,"social":13822},"2012":{"total":246839,"urls":76775,"monetization":3624,"content":14036,"social":26230},"2013":{"total":349808,"urls":125974,"monetization":15602,"content":34945,"social":45214},"2014":{"total":460032,"urls":195563,"monetization":21876,"content":69906,"social":101947},"2015":{"total":596981,"urls":316352,"monetization":29337,"content":111207,"social":185291},"2016":{"total":873908,"urls":470327,"monetization":45939,"content":172854,"social":302744},"2017":{"total":1290183,"urls":731850,"monetization":79393,"content":242818,"social":497074},"2018":{"total":2120989,"urls":1258286,"monetization":187238,"content":492943,"social":966315}},"Autos & Vehicles":{"2008":{"total":18476,"urls":8447,"monetization":326,"content":770,"social":1310},"2009":{"total":35480,"urls":14722,"monetization":1456,"content":3005,"social":2853},"2010":{"total":59593,"urls":26618,"monetization":1466,"content":3838,"social":4685},"2011":{"total":88574,"urls":42843,"monetization":3107,"content":9642,"social":11482},"2012":{"total":135684,"urls":70526,"monetization":5785,"content":18607,"social":25957},"2013":{"total":162838,"urls":88078,"monetization":7010,"content":33076,"social":37980},"2014":{"total":186404,"urls":104330,"monetization":12674,"content":40228,"social":48283},"2015":{"total":258044,"urls":172977,"monetization":17466,"content":53382,"social":113758},"2016":{"total":260582,"urls":165476,"monetization":29395,"content":74528,"social":92607},"2017":{"total":345724,"urls":220875,"monetization":46205,"content":97446,"social":118773},"2018":{"total":385196,"urls":263679,"monetization":66525,"content":106074,"social":132307}},"Howto & Style":{"2008":{"total":26063,"urls":15148,"monetization":1192,"content":3054,"social":2825},"2009":{"total":42771,"urls":26539,"monetization":2899,"content":6417,"social":7286},"2010":{"total":67351,"urls":46383,"monetization":6911,"content":14157,"social":14817},"2011":{"total":108199,"urls":73403,"monetization":11831,"content":26330,"social":33005},"2012":{"total":180681,"urls":135329,"monetization":25170,"content":56147,"social":68437},"2013":{"total":246132,"urls":196258,"monetization":34353,"content":95269,"social":110300},"2014":{"total":293392,"urls":240237,"monetization":51546,"content":120330,"social":146563},"2015":{"total":380797,"urls":317974,"monetization":73821,"content":166093,"social":194200},"2016":{"total":523933,"urls":436275,"monetization":119695,"content":239042,"social":270845},"2017":{"total":702145,"urls":590474,"monetization":189674,"content":329808,"social":367514},"2018":{"total":791664,"urls":665634,"monetization":240816,"content":369507,"social":416769}},"Science & Technology":{"2008":{"total":17317,"urls":8952,"monetization":774,"content":1453,"social":1330},"2009":{"total":32539,"urls":16708,"monetization":1885,"content":2685,"social":3900},"2010":{"total":52310,"urls":28250,"monetization":3528,"content":5480,"social":7276},"2011":{"total":83395,"urls":48183,"monetization":6761,"content":12542,"social":16811},"2012":{"total":125864,"urls":73057,"monetization":12008,"content":23394,"social":29900},"2013":{"total":168943,"urls":107370,"monetization":18188,"content":35496,"social":42846},"2014":{"total":186324,"urls":127258,"monetization":25478,"content":48734,"social":51924},"2015":{"total":220923,"urls":155944,"monetization":35986,"content":59654,"social":69847},"2016":{"total":281005,"urls":205839,"monetization":54695,"content":82989,"social":100559},"2017":{"total":390603,"urls":301642,"monetization":97122,"content":141437,"social":159717},"2018":{"total":476513,"urls":368926,"monetization":140457,"content":168463,"social":204010}},"Comedy":{"2008":{"total":9555,"urls":4197,"monetization":771,"content":2057,"social":1609},"2009":{"total":14795,"urls":7392,"monetization":969,"content":3328,"social":3539},"2010":{"total":18945,"urls":9606,"monetization":1257,"content":4776,"social":4771},"2011":{"total":32902,"urls":17758,"monetization":3069,"content":8669,"social":10281},"2012":{"total":50393,"urls":26972,"monetization":3982,"content":14674,"social":17169},"2013":{"total":68485,"urls":39361,"monetization":6033,"content":21824,"social":25434},"2014":{"total":90952,"urls":56411,"monetization":8992,"content":33100,"social":40380},"2015":{"total":124527,"urls":74244,"monetization":15018,"content":42847,"social":52705},"2016":{"total":164941,"urls":98481,"monetization":22944,"content":59151,"social":67271},"2017":{"total":212665,"urls":126351,"monetization":34762,"content":72288,"social":85802},"2018":{"total":224823,"urls":137355,"monetization":37463,"content":74066,"social":92899}},"Education":{"2008":{"total":22799,"urls":11776,"monetization":4506,"content":1915,"social":1099},"2009":{"total":41520,"urls":21423,"monetization":3381,"content":4303,"social":3133},"2010":{"total":74632,"urls":39246,"monetization":6758,"content":8740,"social":8314},"2011":{"total":120596,"urls":65052,"monetization":10774,"content":17958,"social":14205},"2012":{"total":169777,"urls":99364,"monetization":17329,"content":27955,"social":24201},"2013":{"total":216381,"urls":132849,"monetization":23495,"content":36946,"social":39917},"2014":{"total":255626,"urls":159912,"monetization":29144,"content":51207,"social":54783},"2015":{"total":326137,"urls":220831,"monetization":42443,"content":78743,"social":79237},"2016":{"total":446510,"urls":306033,"monetization":73108,"content":125944,"social":121672},"2017":{"total":660003,"urls":485948,"monetization":144457,"content":213262,"social":226670},"2018":{"total":854858,"urls":663884,"monetization":195638,"content":294786,"social":311816}},"Sports":{"2008":{"total":23328,"urls":9146,"monetization":1231,"content":870,"social":1305},"2009":{"total":45629,"urls":18331,"monetization":2117,"content":1941,"social":2278},"2010":{"total":82347,"urls":27332,"monetization":1974,"content":4744,"social":5887},"2011":{"total":137547,"urls":52083,"monetization":4815,"content":11114,"social":15726},"2012":{"total":219892,"urls":97834,"monetization":9906,"content":29333,"social":39561},"2013":{"total":287302,"urls":144904,"monetization":15844,"content":49040,"social":70902},"2014":{"total":330836,"urls":179731,"monetization":20721,"content":69086,"social":100367},"2015":{"total":435426,"urls":257952,"monetization":32972,"content":103323,"social":153635},"2016":{"total":545189,"urls":328519,"monetization":39258,"content":131206,"social":194982},"2017":{"total":687902,"urls":437542,"monetization":63799,"content":174015,"social":268311},"2018":{"total":861920,"urls":574477,"monetization":106342,"content":220995,"social":376588}},"Gaming":{"2008":{"total":25312,"urls":9936,"monetization":1466,"content":2982,"social":2466},"2009":{"total":86693,"urls":31237,"monetization":2401,"content":11360,"social":8414},"2010":{"total":141462,"urls":58874,"monetization":6331,"content":22413,"social":18266},"2011":{"total":290048,"urls":161360,"monetization":18377,"content":73850,"social":74861},"2012":{"total":509309,"urls":335388,"monetization":40046,"content":181513,"social":209638},"2013":{"total":833420,"urls":633944,"monetization":91530,"content":376999,"social":452301},"2014":{"total":1146869,"urls":941946,"monetization":203053,"content":577722,"social":708948},"2015":{"total":1512749,"urls":1263173,"monetization":378726,"content":787500,"social":951432},"2016":{"total":2035816,"urls":1716077,"monetization":603562,"content":1029184,"social":1299970},"2017":{"total":2478332,"urls":2105389,"monetization":802496,"content":1248837,"social":1578443},"2018":{"total":2641479,"urls":2283730,"monetization":906756,"content":1327323,"social":1705853}},"Film & Animation":{"2008":{"total":7751,"urls":3524,"monetization":377,"content":622,"social":590},"2009":{"total":14809,"urls":7610,"monetization":805,"content":1790,"social":2220},"2010":{"total":28327,"urls":14453,"monetization":1234,"content":4122,"social":5655},"2011":{"total":62429,"urls":39037,"monetization":10190,"content":14611,"social":22456},"2012":{"total":91988,"urls":57822,"monetization":6054,"content":21699,"social":27953},"2013":{"total":125449,"urls":80630,"monetization":7047,"content":31515,"social":39466},"2014":{"total":170831,"urls":120377,"monetization":12115,"content":52665,"social":57862},"2015":{"total":233288,"urls":158553,"monetization":21581,"content":77644,"social":84275},"2016":{"total":329656,"urls":220996,"monetization":38588,"content":114518,"social":118017},"2017":{"total":430470,"urls":287600,"monetization":56443,"content":159347,"social":151319},"2018":{"total":467608,"urls":320182,"monetization":71367,"content":175436,"social":164981}}};

  const linkTypes = ["monetization","content","social"];
  const linkColors = { monetization:"#22d3ee", content:"#a855f7", social:"#f97316" };

  let compareCount = $state(2);
  let selectedCategories = $state(categories.slice(0, 2));
  let chartInstances = [];
  let canvasRefs = [];
  const seriesVisible = $state({ URLs: true, Monetization: true, Content: true, Social: true });

  const seriesStyles = {
    URLs: { color: "#38bdf8", dashed: false },
    Monetization: { color: "#22d3ee", dashed: true },
    Content: { color: "#a855f7", dashed: true },
    Social: { color: "#f97316", dashed: true },
  };

  function formatMillions(value) {
    const v = Number(value) || 0;
    if (v >= 1_000_000) return (v/1_000_000).toFixed(v>=10_000_000?0:1)+"M";
    if (v >= 1_000) return (v/1_000).toFixed(0)+"K";
    return v.toString();
  }

  function formatAxisValue(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return "0";
    return Number.isInteger(num) ? num.toString() : num.toFixed(1);
  }

  function buildDatasets(cat) {
    const urlsAbs = years.map(y => (urlDataByYear[y]||{})[cat] || 0);
    const totals = years.map(y => {
      const row = dataRows.find(r=>r.year===y);
      return row ? (row[cat]||0) : 0;
    });
    const spec = specialtyData[cat] || {};
    const linkAbs = linkTypes.map(type => years.map(y => (spec[y]||{})[type] || 0));
    const urlsPct = urlsAbs.map((v,i)=> totals[i] ? (v/totals[i])*100 : 0);
    const linkPct = linkAbs.map(series => series.map((v,i)=> totals[i] ? (v/totals[i])*100 : 0));
    const color = categoryColors[cat] || "#38bdf8";
    
    const datasets = [
      {
        label: "URLs",
        data: urlsPct,
        borderColor: color,
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 2.5,
        tension: 0.3,
        fill: false,
        pointRadius: 2.5,
        pointHoverRadius: 5,
        pointHitRadius: 10,
        hidden: !seriesVisible.URLs,
      }
    ];
    linkTypes.forEach((type, idx) => {
      const label = type.charAt(0).toUpperCase()+type.slice(1);
      datasets.push({
        label,
        data: linkPct[idx],
        borderColor: (seriesStyles[label]?.color) || linkColors[type] || "#94a3b8",
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 1.6,
        borderDash: seriesStyles[label]?.dashed ? [4,3] : [],
        tension: 0.3,
        fill: false,
        pointRadius: 2,
        pointHoverRadius: 5,
        pointHitRadius: 10,
        hidden: !seriesVisible[label],
      });
    });
    return { datasets, totals, urlsAbs, linkAbs };
  }

  function renderChart(cat, canvas, idx) {
    if (chartInstances[idx]) {
      chartInstances[idx].destroy();
    }
    
    const { datasets, totals, urlsAbs, linkAbs } = buildDatasets(cat);
    const color = categoryColors[cat] || "#38bdf8";
    const ctx = canvas.getContext('2d');

    chartInstances[idx] = new Chart(ctx, {
      type: "line",
      data: { labels: years, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        scales: {
          x: { 
            ticks: { color: "#9ca3af" }, 
            grid: { color: "rgba(51,65,85,0.3)" },
            title: { display: true, text: "Year", color: "#d1d5db", font: { size: 12 } }
          },
          y: {
            ticks: { color: "#9ca3af", callback: v=>`${formatAxisValue(v)}%` },
            grid: { color: "rgba(51,65,85,0.3)" },
            title: { display: true, text: "Percent of uploads", color: "#d1d5db", font: { size: 12 } },
            min: 0,
            max: 100
          }
        },
        plugins: {
          legend: { display: false },
          title: { display: false },
          tooltip: {
            backgroundColor: "rgba(15,23,42,0.92)",
            borderColor: color,
            borderWidth: 1.2,
            padding: { top: 10, right: 12, bottom: 10, left: 12 },
            displayColors: false,
            titleFont: { size: 12, family: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" },
            bodyFont: { size: 11, family: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" },
            bodySpacing: 5,
            itemSort: (a,b)=>{
              const aUrl = a.dataset.label==="URLs";
              const bUrl = b.dataset.label==="URLs";
              if (aUrl && !bUrl) return -1;
              if (!aUrl && bUrl) return 1;
              return (b.parsed.y||0)-(a.parsed.y||0);
            },
            callbacks: {
              title: (ctx) => `Year ${ctx[0].label}`,
              label: (ctx) => {
                const dataIdx = ctx.dataIndex;
                const urlsVal = urlsAbs[dataIdx] || 0;
                const totalVal = totals[dataIdx] || 0;
                if (ctx.dataset.label === "URLs") {
                  const pct = totalVal ? ((urlsVal/totalVal)*100).toFixed(1) : "0.0";
                  return `URLs: ${pct}% • ${formatMillions(urlsVal)} of ${formatMillions(totalVal)}`;
                }
                const key = ctx.dataset.label.toLowerCase();
                const keyIdx = linkTypes.indexOf(key);
                const absVal = keyIdx >= 0 ? (linkAbs[keyIdx][dataIdx]||0) : 0;
                const pctTotal = totalVal ? ((absVal/totalVal)*100).toFixed(1) : "0.0";
                const label = ctx.dataset.label;
                return `${label}: ${pctTotal}% • ${formatMillions(absVal)} of ${formatMillions(totalVal)}`;
              }
            }
          }
        }
      }
    });
  }

  function renderAll() {
    selectedCategories.forEach((cat, idx) => {
      if (canvasRefs[idx]) {
        renderChart(cat, canvasRefs[idx], idx);
      }
    });
  }

  function updateCount(newCount) {
    compareCount = newCount;
    selectedCategories = categories.slice(0, newCount);
    setTimeout(() => renderAll(), 100);
  }

  function updateCategory(idx, cat) {
    selectedCategories[idx] = cat;
    renderAll();
  }

  function toggleSeries(key) {
    const visibleKeys = Object.keys(seriesVisible).filter(k => seriesVisible[k]);
    const solo = visibleKeys.length === 1 && visibleKeys[0] === key;

    if (solo) {
      Object.keys(seriesVisible).forEach(k => { seriesVisible[k] = true; });
    } else {
      Object.keys(seriesVisible).forEach(k => { seriesVisible[k] = false; });
      seriesVisible[key] = true;
    }
    renderAll();
  }

  onMount(() => {
    renderAll();
  });
</script>

<style>
  .viz-compare-wrap {
    width: 100%;
    margin: 2rem 0;
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    margin-bottom: 12px;
  }

  .count-block {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #94a3b8;
  }

  label {
    font-size: 12px;
    color: #94a3b8;
  }

  select {
    background: rgba(15,23,42,0.8);
    color: #e5e7eb;
    border: 1px solid rgba(148, 163, 184, 0.3);
    border-radius: 10px;
    padding: 8px 10px;
    font-family: "Inter", "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 13px;
    outline: none;
    margin-left: 6px;
  }

  .selectors {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 12px;
    margin-bottom: 12px;
  }

  .selector-label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid rgba(148, 163, 184, 0.3);
    border-radius: 12px;
    padding: 10px 12px;
    color: #94a3b8;
    font-size: 12px;
  }

  .series-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    margin: 10px 0 14px;
  }

  .series-bar .legend-label {
    font-size: 13px;
    color: #94a3b8;
    font-weight: 600;
    margin-right: 4px;
  }

  .legend-toggle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    padding: 6px 14px;
    border-radius: 10px;
    border: none;
    background: transparent;
    color: #e5e7eb;
    cursor: pointer;
    transition: all 0.18s ease;
  }

  .legend-toggle .swatch {
    width: 16px;
    height: 10px;
    border-radius: 2px;
    display: inline-block;
    background: transparent;
    border: 2px solid currentColor;
    box-sizing: border-box;
  }

  .legend-toggle.active {
    opacity: 1;
  }

  .legend-toggle.inactive {
    opacity: 0.45;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 14px;
  }

  .card {
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid rgba(148, 163, 184, 0.3);
    border-radius: 14px;
    padding: 12px;
    min-height: 420px;
    position: relative;
  }

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-weight: 700;
    font-size: 14px;
    color: #e5e7eb;
  }

  canvas {
    width: 100% !important;
    height: 360px !important;
  }
</style>

<div class="viz-compare-wrap">
  <div class="controls">
    <div class="count-block">
      <label>
        How many categories?
        <select bind:value={compareCount} onchange={() => updateCount(compareCount)}>
          {#each Array(14) as _, i}
            <option value={i + 2}>{i + 2}</option>
          {/each}
        </select>
      </label>
      <span>Showing {compareCount} categories</span>
    </div>
  </div>

  <div class="selectors">
    {#each Array(compareCount) as _, i}
      <label class="selector-label">
        Category {String.fromCharCode(65 + i)}
        <select bind:value={selectedCategories[i]} onchange={() => updateCategory(i, selectedCategories[i])}>
          {#each categories as cat}
            <option value={cat}>{cat}</option>
          {/each}
        </select>
      </label>
    {/each}
  </div>

  <div class="series-bar">
    <span class="legend-label">Series:</span>
    <button 
      class="legend-toggle {seriesVisible.URLs ? 'active' : 'inactive'}" 
      style="color:{seriesStyles.URLs.color}"
      onclick={() => toggleSeries('URLs')}
    >
      <span class="swatch" style="border-style:solid"></span>URLs
    </button>
    <button 
      class="legend-toggle {seriesVisible.Monetization ? 'active' : 'inactive'}" 
      style="color:{seriesStyles.Monetization.color}"
      onclick={() => toggleSeries('Monetization')}
    >
      <span class="swatch" style="border-style:dashed"></span>Monetization
    </button>
    <button 
      class="legend-toggle {seriesVisible.Content ? 'active' : 'inactive'}" 
      style="color:{seriesStyles.Content.color}"
      onclick={() => toggleSeries('Content')}
    >
      <span class="swatch" style="border-style:dashed"></span>Content
    </button>
    <button 
      class="legend-toggle {seriesVisible.Social ? 'active' : 'inactive'}" 
      style="color:{seriesStyles.Social.color}"
      onclick={() => toggleSeries('Social')}
    >
      <span class="swatch" style="border-style:dashed"></span>Social
    </button>
  </div>

  <div class="grid">
    {#each Array(compareCount) as _, i}
      <div class="card">
        <div class="card-header">
          {selectedCategories[i]}
        </div>
        <canvas bind:this={canvasRefs[i]}></canvas>
      </div>
    {/each}
  </div>
</div>


