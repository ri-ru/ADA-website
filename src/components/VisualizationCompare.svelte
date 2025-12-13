<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import chartTheme from '../lib/echarts-theme';

  const fontStack = '"TeX Gyre Adventor", "Tex Gyre Adventor", "Helvetica Neue", Arial, sans-serif';
  Chart.defaults.font.family = fontStack;

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
  const ECHARTS_ORDER = ["Autos & Vehicles","Comedy","Education","Entertainment","Film & Animation","Gaming","Howto & Style","Music","News & Politics","Nonprofits & Activism","People & Blogs","Pets & Animals","Science & Technology","Sports","Travel & Events"];
  const CATEGORY_ICONS = {
    "Autos & Vehicles":{viewBox:"0 0 1400 1400",path:"M316.875 325.156l-61.1719 174.844h688.594l-61.1719 -174.844c-10.5469 -30 -38.9062 -50.1562 -70.7812 -50.1562h-424.688c-31.875 0 -60.2344 20.1562 -70.7812 50.1562zM92.8125 511.25l82.5 -235.547c31.6406 -90.2344 116.719 -150.703 212.344 -150.703h424.688 c95.625 0 180.703 60.4688 212.344 150.703l82.5 235.547c54.375 22.5 92.8125 76.1719 92.8125 138.75v337.5v112.5c0 41.4844 -33.5156 75 -75 75h-75c-41.4844 0 -75 -33.5156 -75 -75v-112.5h-750v112.5c0 41.4844 -33.5156 75 -75 75h-75 c-41.4844 0 -75 -33.5156 -75 -75v-112.5v-337.5c0 -62.5781 38.4375 -116.25 92.8125 -138.75zM300 725c0 -41.3936 -33.6064 -75 -75 -75s-75 33.6064 -75 75s33.6064 75 75 75s75 -33.6064 75 -75zM975 800c41.3936 0 75 -33.6064 75 -75s-33.6064 -75 -75 -75 s-75 33.6064 -75 75s33.6064 75 75 75z"},
    "Comedy":{viewBox:"0 0 1200 1200",path:"M1087.5 650c0 -269.059 -218.441 -487.5 -487.5 -487.5s-487.5 218.441 -487.5 487.5s218.441 487.5 487.5 487.5s487.5 -218.441 487.5 -487.5zM0 650c0 -331.149 268.851 -600 600 -600s600 268.851 600 600s-268.851 600 -600 600s-600 -268.851 -600 -600z M306.328 785.703c-9.84375 -31.875 16.6406 -60.7031 49.9219 -60.7031h498.047c33.2812 0 59.7656 29.0625 49.9219 60.7031c-39.375 127.734 -158.438 220.547 -299.062 220.547s-259.688 -92.8125 -298.828 -220.547zM312.891 356.094l210.703 112.266 c25.0781 13.3594 25.0781 49.4531 0 62.8125l-210.703 112.266c-18.5156 9.84375 -41.0156 -3.51562 -41.0156 -24.6094c0 -6.5625 2.34375 -12.8906 6.5625 -17.8125l84.375 -101.25l-84.375 -101.25c-4.21875 -4.92188 -6.5625 -11.25 -6.5625 -17.8125 c0 -21.0938 22.5 -34.4531 41.0156 -24.6094zM928.125 380.703c0 6.5625 -2.34375 12.8906 -6.5625 17.8125l-84.375 101.25l84.375 101.25c4.21875 4.92188 6.5625 11.25 6.5625 17.8125c0 21.0938 -22.5 34.4531 -41.0156 24.6094l-210.703 -112.266 c-25.0781 -13.3594 -25.0781 -49.4531 0 -62.8125l210.703 -112.266c18.5156 -9.84375 41.0156 3.51562 41.0156 24.6094z"},
    "Education":{viewBox:"0 0 512 512",path:"M256 64l-235 128l235 128l192 -105v148h43v-171zM107 281v86l149 81l149 -81v-86l-149 82z"},
    "Entertainment":{viewBox:"0 0 512 512",path:"M448 64h-384q-18 0 -30.5 12.5t-12.5 30.5v256q0 17 12.5 29.5t30.5 12.5h107v43h170v-43h107q18 0 30.5 -12.5t12.5 -29.5v-256q0 -18 -12.5 -30.5t-30.5 -12.5zM448 363h-384v-256h384v256zM341 235l-149 85v-171z"},
    "Film & Animation":{viewBox:"0 0 1200 1200",path:"M0 275c0 -82.7344 67.2656 -150 150 -150h900c82.7344 0 150 67.2656 150 150v750c0 82.7344 -67.2656 150 -150 150h-900c-82.7344 0 -150 -67.2656 -150 -150v-750zM112.5 912.5v75c0 20.625 16.875 37.5 37.5 37.5h75c20.625 0 37.5 -16.875 37.5 -37.5v-75 c0 -20.625 -16.875 -37.5 -37.5 -37.5h-75c-20.625 0 -37.5 16.875 -37.5 37.5zM975 875c-20.625 0 -37.5 16.875 -37.5 37.5v75c0 20.625 16.875 37.5 37.5 37.5h75c20.625 0 37.5 -16.875 37.5 -37.5v-75c0 -20.625 -16.875 -37.5 -37.5 -37.5h-75zM112.5 612.5v75 c0 20.625 16.875 37.5 37.5 37.5h75c20.625 0 37.5 -16.875 37.5 -37.5v-75c0 -20.625 -16.875 -37.5 -37.5 -37.5h-75c-20.625 0 -37.5 16.875 -37.5 37.5zM975 575c-20.625 0 -37.5 16.875 -37.5 37.5v75c0 20.625 16.875 37.5 37.5 37.5h75 c20.625 0 37.5 -16.875 37.5 -37.5v-75c0 -20.625 -16.875 -37.5 -37.5 -37.5h-75zM112.5 312.5v75c0 20.625 16.875 37.5 37.5 37.5h75c20.625 0 37.5 -16.875 37.5 -37.5v-75c0 -20.625 -16.875 -37.5 -37.5 -37.5h-75c-20.625 0 -37.5 16.875 -37.5 37.5zM975 275 c-20.625 0 -37.5 16.875 -37.5 37.5v75c0 20.625 16.875 37.5 37.5 37.5h75c20.625 0 37.5 -16.875 37.5 -37.5v-75c0 -20.625 -16.875 -37.5 -37.5 -37.5h-75zM375 350v150c0 41.4844 33.5156 75 75 75h300c41.4844 0 75 -33.5156 75 -75v-150 c0 -41.4844 -33.5156 -75 -75 -75h-300c-41.4844 0 -75 33.5156 -75 75zM450 725c-41.4844 0 -75 33.5156 -75 75v150c0 41.4844 33.5156 75 75 75h300c41.4844 0 75 -33.5156 75 -75v-150c0 -41.4844 -33.5156 -75 -75 -75h-300z"},
    "Gaming":{viewBox:"0 0 512 512",path:"M128 149h256q29 0 53.5 14.5t39 39t14.5 53.5t-14.5 53.5t-39 39t-53.5 14.5q-26 0 -48 -11.5t-37 -31.5h-86q-15 20 -37 31.5t-48 11.5q-29 0 -53.5 -14.5t-39 -39t-14.5 -53.5t14.5 -53.5t39 -39t53.5 -14.5zM421 203q-11 0 -18.5 7.5t-7.5 18.5t7.5 19t18.5 8t19 -8 t8 -19t-8 -18.5t-19 -7.5zM368 256q-11 0 -19 8t-8 19t8 18.5t19 7.5t19 -7.5t8 -18.5t-8 -19t-19 -8zM107 192v43h-43v42h43v43h42v-43h43v-42h-43v-43h-42z"},
    "Howto & Style":{viewBox:"0 0 1300 1300",path:"M1099.92 95.2344l54.8438 54.8438c58.5938 58.5938 58.5938 153.516 0 212.109l-132.188 132.188l-267.188 -266.953l132.188 -132.188c58.5938 -58.5938 153.516 -58.5938 212.109 0h0.234375zM105.234 877.812l597.188 -597.422l267.188 267.188l-597.422 597.188 c-15.7031 15.7031 -35.3906 27.1875 -56.7188 33.2812l-243.75 69.6094c-19.6875 5.625 -40.7812 0.234375 -55.3125 -14.2969s-19.9219 -35.625 -14.2969 -55.3125l69.6094 -243.75c6.09375 -21.5625 17.5781 -41.0156 33.2812 -56.7188zM584.531 292.344l-342.188 342.188 l-204.844 -205.078c-43.8281 -43.8281 -43.8281 -115.078 0 -159.141l183.047 -182.812c43.8281 -43.8281 115.078 -43.8281 159.141 0l46.4062 46.4062c-0.703125 0.703125 -1.64062 1.40625 -2.34375 2.10938l-150 150c-14.5312 14.5312 -14.5312 38.4375 0 52.9688 s38.4375 14.5312 52.9688 0l150 -150c0.703125 -0.703125 1.40625 -1.64062 2.10938 -2.34375zM957.656 665.469l105.703 105.703c-0.703125 0.703125 -1.64062 1.40625 -2.34375 2.10938l-150 150c-14.5312 14.5312 -14.5312 38.4375 0 52.9688s38.4375 14.5312 52.9688 0 l150 -150c0.703125 -0.703125 1.40625 -1.64062 2.10938 -2.34375l46.4062 46.6406c43.8281 43.8281 43.8281 115.078 0 159.141l-183.047 182.812c-43.8281 43.8281 -115.078 43.8281 -159.141 0l-204.844 -204.844z"},
    "Music":{viewBox:"0 0 1300 1300",path:"M1169.77 64.7656c18.9844 14.0625 30.2344 36.5625 30.2344 60.2344v168.75v618.75c0 103.594 -100.781 187.5 -225 187.5s-225 -83.9062 -225 -187.5s100.781 -187.5 225 -187.5c26.25 0 51.5625 3.75 75 10.7812v-341.25l-600 180v487.969 c0 103.594 -100.781 187.5 -225 187.5s-225 -83.9062 -225 -187.5s100.781 -187.5 225 -187.5c26.25 0 51.5625 3.75 75 10.7812v-367.031v-168.75c0 -33.0469 21.7969 -62.3438 53.4375 -71.9531l750 -225c22.7344 -6.79688 47.3438 -2.57812 66.3281 11.7188z"},
    "News & Politics":{viewBox:"0 0 1300 1300",path:"M393.75 237.5c-31.1719 0 -56.25 25.0781 -56.25 56.25v712.5c0 19.6875 -3.28125 38.6719 -9.60938 56.25h703.359c31.1719 0 56.25 -25.0781 56.25 -56.25v-712.5c0 -31.1719 -25.0781 -56.25 -56.25 -56.25h-637.5zM168.75 1175 c-93.2812 0 -168.75 -75.4688 -168.75 -168.75v-693.75c0 -31.1719 25.0781 -56.25 56.25 -56.25s56.25 25.0781 56.25 56.25v693.75c0 31.1719 25.0781 56.25 56.25 56.25s56.25 -25.0781 56.25 -56.25v-712.5c0 -93.2812 75.4688 -168.75 168.75 -168.75h637.5 c93.2812 0 168.75 75.4688 168.75 168.75v712.5c0 93.2812 -75.4688 168.75 -168.75 168.75h-862.5zM412.5 368.75c0 -31.1719 25.0781 -56.25 56.25 -56.25h225c31.1719 0 56.25 25.0781 56.25 56.25v187.5c0 31.1719 -25.0781 56.25 -56.25 56.25h-225 c-31.1719 0 -56.25 -25.0781 -56.25 -56.25v-187.5zM881.25 312.5h75c31.1719 0 56.25 25.0781 56.25 56.25s-25.0781 56.25 -56.25 56.25h-75c-31.1719 0 -56.25 -25.0781 -56.25 -56.25s25.0781 -56.25 56.25 -56.25zM881.25 500h75c31.1719 0 56.25 25.0781 56.25 56.25 s-25.0781 56.25 -56.25 56.25h-75c-31.1719 0 -56.25 -25.0781 -56.25 -56.25s25.0781 -56.25 56.25 -56.25zM468.75 687.5h487.5c31.1719 0 56.25 25.0781 56.25 56.25s-25.0781 56.25 -56.25 56.25h-487.5c-31.1719 0 -56.25 -25.0781 -56.25 -56.25 s25.0781 -56.25 56.25 -56.25zM468.75 875h487.5c31.1719 0 56.25 25.0781 56.25 56.25s-25.0781 56.25 -56.25 56.25h-487.5c-31.1719 0 -56.25 -25.0781 -56.25 -56.25s25.0781 -56.25 56.25 -56.25z"},
    "Nonprofits & Activism":{viewBox:"0 0 1400 1400",path:"M384.141 370.859c-68.9062 -69.8438 -68.9062 -183.281 0 -253.125s180.469 -69.8438 249.375 0l41.4844 42.1875l41.4844 -42.1875c68.9062 -69.8438 180.469 -69.8438 249.375 0s68.9062 183.281 0 253.125l-238.125 241.875 c-14.5312 14.7656 -33.5156 22.0312 -52.7344 22.0312s-38.2031 -7.26562 -52.7344 -22.0312zM1331.72 838.203c30.7031 41.7188 21.7969 100.312 -19.9219 131.016l-296.719 218.672c-54.8438 40.3125 -120.938 62.1094 -189.141 62.1094h-375.938h-375 c-41.4844 0 -75 -33.5156 -75 -75v-150c0 -41.4844 33.5156 -75 75 -75h86.25l105.234 -84.375c53.2031 -42.6562 119.297 -65.625 187.5 -65.625h183.516h37.5h150c41.4844 0 75 33.5156 75 75s-33.5156 75 -75 75h-150h-37.5c-20.625 0 -37.5 16.875 -37.5 37.5 s16.875 37.5 37.5 37.5h282.656l280.547 -206.719c41.7188 -30.7031 100.312 -21.7969 131.016 19.9219zM453.75 950h-2.10938h2.10938z"},
    "People & Blogs":{viewBox:"0 0 400 400",path:"M32 85v32q0 66 32 121t85 88v101h320v-43q0 -26 -31 -47q-27 -18 -70 -29q-38 -9 -69 -9h-6q-49 0 -92 -25.5t-68.5 -67t-25.5 -89.5v-32h-75zM299 85q-36 0 -61 25t-25 60.5t25 60.5t60.5 25t60.5 -25t25 -60.5t-25 -60.5t-60 -25z"},
    "Pets & Animals":{viewBox:"0 0 450 450",path:"M384 85q-44 0 -71 13q-27 -13 -57 -13t-57 13q-27 -13 -71 -13q-29 0 -56 46q-22 37 -37 93q-14 49 -14 75q0 13 19 24t48 16q11 36 54.5 60.5t102.5 27.5v-92q-32 -20 -32 -36q0 -14 22 -19q10 -3 21 -3l11 1q13 2 21 6q11 5 11 15q0 16 -32 36v92q59 -3 102.5 -27.5 t54.5 -60.5q29 -5 48 -16t19 -24q0 -26 -14 -75q-15 -56 -37 -93q-27 -46 -56 -46zM89 296q-14 -3 -25 -8q3 -28 15 -66q12 -34 26.5 -62t23.5 -32q11 0 27 2h1q-29 33 -49 87q-13 37 -19 79zM192 256q-9 0 -15 -6t-6 -15t6 -15.5t15 -6.5t15 6.5t6 15.5t-6 15t-15 6z M320 256q-9 0 -15 -6t-6 -15t6 -15.5t15 -6.5t15 6.5t6 15.5t-6 15t-15 6zM423 296q-6 -42 -19 -79q-20 -54 -49 -87h1q16 -2 27 -2q9 4 23.5 32t26.5 62q12 38 15 66q-10 5 -25 8z"},
    "Science & Technology":{viewBox:"0 0 1400 1400",path:"M975 50c41.4844 0 75 33.5156 75 75c0 140.156 -71.0156 251.953 -162.656 343.594c-65.625 65.625 -146.484 125.391 -228.047 181.406l-5.85938 3.98438c-27.8906 18.9844 -55.7812 37.7344 -83.2031 56.0156v0v0v0l-3.75 2.34375 c-14.0625 9.375 -27.8906 18.5156 -41.7188 27.8906c-48.9844 32.8125 -95.625 64.9219 -138.984 97.2656h278.203c-22.9688 -17.3438 -47.1094 -34.4531 -71.9531 -51.7969l16.4062 -11.0156l7.03125 -4.6875c35.3906 -23.6719 72.4219 -48.2812 109.453 -74.0625 c58.5938 42.4219 114.609 87.4219 162.656 135.234c91.4062 91.875 162.422 203.672 162.422 343.828c0 41.4844 -33.5156 75 -75 75s-75 -33.5156 -75 -75h-750c0 41.4844 -33.5156 75 -75 75s-75 -33.5156 -75 -75c0 -140.156 71.0156 -251.953 162.656 -343.594 c65.625 -65.625 146.484 -125.391 228.047 -181.406c-81.5625 -56.0156 -162.422 -115.547 -228.047 -181.406c-91.6406 -91.6406 -162.656 -203.438 -162.656 -343.594c0 -41.4844 33.5156 -75 75 -75s75 33.5156 75 75h750c0 -41.4844 33.5156 -75 75 -75zM793.594 950 h-537.188c-23.6719 24.8438 -43.5938 49.9219 -59.7656 75h656.719c-15.9375 -25.0781 -35.8594 -50.1562 -59.7656 -75zM256.406 350h537.188c23.6719 -25.0781 43.5938 -49.9219 59.7656 -75h-656.719c15.9375 25.0781 35.8594 49.9219 59.7656 75zM386.25 462.5 c43.125 32.3438 90 64.4531 138.984 97.2656c48.9844 -32.8125 95.625 -64.9219 138.984 -97.2656h-278.203h0.234375z"},
    "Sports":{viewBox:"0 0 1400 1400",path:"M202.969 200c75.9375 -66.7969 168.75 -114.844 271.172 -136.875c8.67188 31.6406 13.3594 64.9219 13.3594 99.375c0 90 -31.6406 172.734 -84.8438 237.188zM150 252.969l199.922 199.922c-64.6875 52.9688 -147.422 84.6094 -237.422 84.6094 c-34.4531 0 -67.7344 -4.6875 -99.375 -13.3594c22.0312 -102.422 70.0781 -195.234 136.875 -271.172zM600 50c152.109 0 291.094 56.7188 397.031 150l-397.031 397.031l-143.906 -143.906c66.3281 -78.5156 106.406 -179.766 106.406 -290.625 c0 -37.9688 -4.6875 -75 -13.5938 -110.391c16.875 -1.40625 33.9844 -2.10938 51.0938 -2.10938zM112.5 612.5c110.859 0 212.109 -40.0781 290.625 -106.406l143.906 143.906l-397.031 397.031c-93.2812 -105.938 -150 -244.922 -150 -397.031 c0 -17.1094 0.703125 -34.2188 2.10938 -51.0938c35.3906 8.90625 72.4219 13.5938 110.391 13.5938zM1197.89 701.094c-35.3906 -8.90625 -72.4219 -13.5938 -110.391 -13.5938c-110.859 0 -212.344 40.0781 -290.625 106.406l-143.906 -143.906l397.031 -397.031 c93.2812 105.938 150 244.922 150 397.031c0 17.1094 -0.703125 34.2188 -2.10938 51.0938zM1186.88 775.859c-21.7969 102.656 -70.0781 195.469 -136.875 271.172l-199.922 -199.922c64.6875 -52.9688 147.422 -84.6094 237.422 -84.6094 c34.4531 0 67.7344 4.6875 99.375 13.3594zM797.109 900.078l0.234375 0.234375l199.688 199.688c-75.9375 66.7969 -168.75 114.844 -271.172 136.875c-8.67188 -31.6406 -13.3594 -64.9219 -13.3594 -99.375c0 -90 31.6406 -172.734 84.6094 -237.422zM743.906 846.875 c-66.3281 78.5156 -106.406 179.766 -106.406 290.625c0 37.9688 4.6875 75 13.5938 110.391c-16.875 1.40625 -33.9844 2.10938 -51.0938 2.10938c-152.344 0 -291.328 -56.7188 -397.031 -150l397.031 -397.031z"},
    "Travel & Events":{viewBox:"0 0 1400 1400",path:"M825 650c0 52.0312 -2.8125 102.188 -7.73438 150h-434.531c-5.15625 -47.8125 -7.73438 -97.9688 -7.73438 -150s2.8125 -102.188 7.73438 -150h434.531c5.15625 47.8125 7.73438 97.9688 7.73438 150zM892.5 500h288.516c12.4219 48.0469 18.9844 98.2031 18.9844 150 s-6.5625 101.953 -18.9844 150h-288.516c4.92188 -48.2812 7.5 -98.4375 7.5 -150s-2.57812 -101.719 -7.5 -150zM1156.41 425h-273.516c-23.4375 -149.766 -69.8438 -275.156 -129.609 -355.312c183.516 48.5156 332.812 181.641 402.891 355.312h0.234375zM806.953 425 h-413.906c14.2969 -85.3125 36.3281 -160.781 63.2812 -221.953c24.6094 -55.3125 52.0312 -95.3906 78.5156 -120.703c26.25 -24.8438 48.0469 -32.3438 65.1562 -32.3438s38.9062 7.5 65.1562 32.3438c26.4844 25.3125 53.9062 65.3906 78.5156 120.703 c27.1875 60.9375 48.9844 136.406 63.2812 221.953zM317.109 425h-273.516c70.3125 -173.672 219.375 -306.797 403.125 -355.312c-59.7656 80.1562 -106.172 205.547 -129.609 355.312zM18.9844 500h288.516c-4.92188 48.2812 -7.5 98.4375 -7.5 150 s2.57812 101.719 7.5 150h-288.516c-12.4219 -48.0469 -18.9844 -98.2031 -18.9844 -150s6.5625 -101.953 18.9844 -150zM456.328 1096.72c-27.1875 -60.9375 -48.9844 -136.406 -63.2812 -221.719h413.906c-14.2969 85.3125 -36.3281 160.781 -63.2812 221.719 c-24.6094 55.3125 -52.0312 95.3906 -78.5156 120.703c-26.25 25.0781 -48.0469 32.5781 -65.1562 32.5781s-38.9062 -7.5 -65.1562 -32.3438c-26.4844 -25.3125 -53.9062 -65.3906 -78.5156 -120.703v-0.234375zM317.109 875 c23.4375 149.766 69.8438 275.156 129.609 355.312c-183.75 -48.5156 -332.812 -181.641 -403.125 -355.312h273.516zM1156.41 875c-70.3125 173.672 -219.375 306.797 -402.891 355.312c59.7656 -80.1562 105.938 -205.547 129.609 -355.312h273.281z"}
  };
  const themePalette = chartTheme.color ?? [];
  const categoryColors = categories.reduce((acc, cat) => {
    const idx = ECHARTS_ORDER.indexOf(cat);
    const color = themePalette[idx >= 0 ? idx % themePalette.length : 0] || "#38bdf8";
    acc[cat] = color;
    return acc;
  }, {});
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
  const layoutDims = $derived(getLayoutDims(compareCount));

  const seriesStyles = {
    URLs: { color: categoryColors["Gaming"] || "#38bdf8", dashed: false },
    Monetization: { color: "#22c55e", dashed: true }, // green
    Content: { color: "#38bdf8", dashed: true }, // blue
    Social: { color: chartTheme.color?.[1] || "#f97316", dashed: true },
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

  function computeAverages(cat) {
    const urlsAbs = years.map(y => (urlDataByYear[y]||{})[cat] || 0);
    const totals = years.map(y => {
      const row = dataRows.find(r=>r.year===y);
      return row ? (row[cat]||0) : 0;
    });
    const spec = specialtyData[cat] || {};
    const linkAbs = linkTypes.map(type => years.map(y => (spec[y]||{})[type] || 0));
    const urlsPct = urlsAbs.map((v,i)=> totals[i] ? (v/totals[i])*100 : 0);
    const linkPct = linkAbs.map(series => series.map((v,i)=> totals[i] ? (v/totals[i])*100 : 0));
    const avg = (arr) => arr.reduce((s,v)=>s+v,0) / (arr.length || 1);
    return {
      urls: avg(urlsPct),
      monetization: avg(linkPct[0] || []),
      content: avg(linkPct[1] || []),
      social: avg(linkPct[2] || []),
    };
  }

  function getAvgEntries(cat) {
    const a = computeAverages(cat);
    const entries = [];
    if (seriesVisible.URLs) entries.push({ label: "URLs", value: `${formatAxisValue(a.urls)}%`, color: seriesStyles.URLs.color });
    if (seriesVisible.Monetization) entries.push({ label: "Monetization", value: `${formatAxisValue(a.monetization)}%`, color: seriesStyles.Monetization.color });
    if (seriesVisible.Content) entries.push({ label: "Content", value: `${formatAxisValue(a.content)}%`, color: seriesStyles.Content.color });
    if (seriesVisible.Social) entries.push({ label: "Social", value: `${formatAxisValue(a.social)}%`, color: seriesStyles.Social.color });
    return entries;
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
    const urlColor = seriesStyles.URLs.color || "#38bdf8";
    
    const datasets = [
      {
        label: "URLs",
        data: urlsPct,
        borderColor: urlColor,
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
    // Add weighted average line when a single series is visible
    const visibleKeys = Object.keys(seriesVisible).filter(k => seriesVisible[k]);
    if (visibleKeys.length === 1) {
      const key = visibleKeys[0];
      const totalVideosSum = totals.reduce((s, v) => s + (v || 0), 0) || 1;
      let avgVal = 0;
      let lineColor = seriesStyles[key]?.color || urlColor;
      if (key === "URLs") {
        const urlsSum = urlsAbs.reduce((s, v) => s + (v || 0), 0);
        avgVal = (urlsSum / totalVideosSum) * 100;
      } else {
        const idxMap = { Monetization: 0, Content: 1, Social: 2 };
        const li = idxMap[key];
        const absSeries = li !== undefined ? linkAbs[li] : [];
        const absSum = (absSeries || []).reduce((s, v) => s + (v || 0), 0);
        avgVal = (absSum / totalVideosSum) * 100;
      }
      datasets.push({
        label: `Avg ${key}`,
        data: years.map(() => avgVal),
        borderColor: lineColor,
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 1.2,
        borderDash: [6, 4],
        tension: 0,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 0,
        pointHitRadius: 0,
        hidden: false,
      });
    }
    return { datasets, totals, urlsAbs, linkAbs, urlsPct, linkPct };
  }

  function renderChart(cat, canvas, idx) {
    if (chartInstances[idx]) {
      chartInstances[idx].destroy();
    }

    const { datasets, totals, urlsAbs, linkAbs, urlsPct, linkPct } = buildDatasets(cat);
    const color = seriesStyles.URLs.color || "#38bdf8";
    const ctx = canvas.getContext('2d');

    const visibleKeys = Object.keys(seriesVisible).filter(k => seriesVisible[k]);

    const chart = new Chart(ctx, {
      type: "line",
      data: { labels: years, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        onHover: (event, activeEls) => {
          const idx = activeEls?.[0]?.index;
          chartInstances.forEach((c) => {
            if (!c) return;
            if (idx == null) {
              c.setActiveElements([]);
              c.tooltip?.setActiveElements([], { x: 0, y: 0 });
              c.update();
              return;
            }
            const acts = c.data.datasets
              .map((ds, di) => (ds.hidden ? null : { datasetIndex: di, index: idx }))
              .filter(Boolean);
            c.setActiveElements(acts);
            c.tooltip?.setActiveElements(acts, { x: 0, y: 0 });
            c.update();
          });
        },
        scales: {
          x: { 
            ticks: { color: "#9ca3af" }, 
            grid: { color: "rgba(51,65,85,0.3)" },
            title: { display: true, text: "Year", color: "#d1d5db", font: { size: 12, family: fontStack } }
          },
          y: {
            ticks: { color: "#9ca3af", callback: v=>`${formatAxisValue(v)}%` },
            grid: { color: "rgba(51,65,85,0.3)" },
            title: { display: true, text: "Percent of uploads", color: "#d1d5db", font: { size: 12, family: fontStack } },
            min: 0,
            max: 100
          }
        },
        plugins: {
          legend: { display: false },
          title: { display: false },
          tooltip: {
            backgroundColor: "rgba(15,23,42,0.9)",
            borderColor: color,
            borderWidth: 1.2,
            padding: { top: 10, right: 12, bottom: 10, left: 12 },
            displayColors: false,
            titleFont: { size: 12, family: fontStack },
            bodyFont: { size: 11, family: fontStack },
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
                if (ctx.dataset.label?.startsWith("Avg ")) {
                  return `${ctx.dataset.label}: ${formatAxisValue(ctx.parsed.y)}%`;
                }
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
    chartInstances[idx] = chart;
  }

  function renderAll() {
    selectedCategories.forEach((cat, idx) => {
      if (canvasRefs[idx]) {
        renderChart(cat, canvasRefs[idx], idx);
      }
    });
  }

  function clearAllHover() {
    chartInstances.forEach((c) => {
      if (!c) return;
      c.setActiveElements([]);
      c.tooltip?.setActiveElements([], { x: 0, y: 0 });
      c.update();
    });
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

  function getLayoutDims(count) {
    // Fit 3 per row without shrinking further for higher counts
    if (count >= 3) return { cardMin: 220, cardMinHeight: 340, canvasHeight: 280 };
    return { cardMin: 340, cardMinHeight: 420, canvasHeight: 360 };
  }
</script>

<style>
.viz-compare-wrap {
  width: 100%;
  margin: 2rem 0;
  font-family: var(--viz-font, "TeX Gyre Adventor", "Tex Gyre Adventor", "Helvetica Neue", Arial, sans-serif);
}

  label {
    font-size: 12px;
    color: #94a3b8;
  }

  select {
    background: transparent;
    color: #e5e7eb;
    border: 1px solid rgba(148, 163, 184, 0.35);
    border-radius: 10px;
    padding: 8px 10px;
    font-family: var(--viz-font, "TeX Gyre Adventor", "Tex Gyre Adventor", "Helvetica Neue", Arial, sans-serif);
    font-size: 13px;
    outline: none;
    margin-left: 6px;
    box-shadow: none;
  }

  .selectors {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 12px;
    margin-bottom: 12px;
  }

  .selected-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #e5e7eb;
    font-size: 12px;
    font-family: var(--viz-font, "TeX Gyre Adventor", "Tex Gyre Adventor", "Helvetica Neue", Arial, sans-serif);
  }

  .selected-pill svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  .selector-label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: transparent;
    border: none;
    border-radius: 0;
    padding: 6px 0;
    color: #94a3b8;
    font-size: 12px;
  }

  .series-bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 10px 0 14px;
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
    gap: 14px;
    grid-template-columns: repeat(auto-fit, minmax(var(--card-min, 340px), 1fr));
  }

.card {
  background: transparent;
  border: none;
  border-radius: 10px;
  padding: 12px;
  min-height: var(--card-min-height, 420px);
  position: relative;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-weight: 700;
  font-size: 14px;
  color: #e5e7eb;
}

.card-header svg {
  width: 18px;
  height: 18px;
}

.avg-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 6px;
}

.avg-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 6px;
  border-radius: 6px;
  border: 1px solid rgba(148,163,184,0.3);
  font-size: 11px;
  color: #e5e7eb;
}


  canvas {
    width: 100% !important;
    height: var(--canvas-h, 360px) !important;
  }
</style>

<div class="viz-compare-wrap">
  <div class="selectors">
    {#each Array(compareCount) as _, i}
      <label class="selector-label">
        <div class="selected-pill">
          {#if CATEGORY_ICONS[selectedCategories[i]]}
            <svg viewBox={CATEGORY_ICONS[selectedCategories[i]].viewBox} aria-hidden="true">
              <path d={CATEGORY_ICONS[selectedCategories[i]].path} fill={categoryColors[selectedCategories[i]]} />
            </svg>
          {/if}
          <span>Category {i + 1}: {selectedCategories[i]}</span>
        </div>
        <select bind:value={selectedCategories[i]} onchange={() => updateCategory(i, selectedCategories[i])}>
          {#each categories as cat}
            <option value={cat}>{cat}</option>
          {/each}
        </select>
      </label>
    {/each}
  </div>

  <div class="series-bar">
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

  <div
    class="grid"
    style={`--card-min:${layoutDims.cardMin}px; --card-min-height:${layoutDims.cardMinHeight}px; --canvas-h:${layoutDims.canvasHeight}px;`}
  >
    {#each Array(compareCount) as _, i}
      <div class="card">
        <div class="card-header">
        {#if CATEGORY_ICONS[selectedCategories[i]]}
          <svg viewBox={CATEGORY_ICONS[selectedCategories[i]].viewBox} aria-hidden="true">
            <path d={CATEGORY_ICONS[selectedCategories[i]].path} fill={categoryColors[selectedCategories[i]]} />
          </svg>
        {/if}
        {selectedCategories[i]}
      </div>
        <canvas bind:this={canvasRefs[i]} onmouseleave={clearAllHover}></canvas>
      </div>
    {/each}
  </div>
</div>
