<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import Chart from "chart.js/auto";
  import chartTheme from "../lib/echarts-theme";

  const fontStack = '"TeX Gyre Adventor", "Tex Gyre Adventor", "Helvetica Neue", Arial, sans-serif';
  Chart.defaults.font.family = fontStack;

  const dataRows = [
    {
      year: 2008,
      "Autos & Vehicles": 18476,
      Comedy: 9555,
      Education: 22799,
      Entertainment: 55638,
      "Film & Animation": 7751,
      Gaming: 25312,
      "Howto & Style": 26063,
      Music: 51183,
      "News & Politics": 25270,
      "Nonprofits & Activism": 6123,
      "People & Blogs": 31167,
      "Pets & Animals": 6921,
      "Science & Technology": 17317,
      Sports: 23328,
      "Travel & Events": 11130
    },
    {
      year: 2009,
      "Autos & Vehicles": 35480,
      Comedy: 14795,
      Education: 41520,
      Entertainment: 91212,
      "Film & Animation": 14809,
      Gaming: 86693,
      "Howto & Style": 42771,
      Music: 116200,
      "News & Politics": 67463,
      "Nonprofits & Activism": 13577,
      "People & Blogs": 60399,
      "Pets & Animals": 10295,
      "Science & Technology": 32539,
      Sports: 45629,
      "Travel & Events": 21174
    },
    {
      year: 2010,
      "Autos & Vehicles": 59593,
      Comedy: 18945,
      Education: 74632,
      Entertainment: 153734,
      "Film & Animation": 28327,
      Gaming: 141462,
      "Howto & Style": 67351,
      Music: 174585,
      "News & Politics": 97464,
      "Nonprofits & Activism": 21495,
      "People & Blogs": 66036,
      "Pets & Animals": 15596,
      "Science & Technology": 52310,
      Sports: 82347,
      "Travel & Events": 31476
    },
    {
      year: 2011,
      "Autos & Vehicles": 88574,
      Comedy: 32902,
      Education: 120596,
      Entertainment: 304094,
      "Film & Animation": 62429,
      Gaming: 290048,
      "Howto & Style": 108199,
      Music: 285111,
      "News & Politics": 169560,
      "Nonprofits & Activism": 28280,
      "People & Blogs": 97349,
      "Pets & Animals": 21037,
      "Science & Technology": 83395,
      Sports: 137547,
      "Travel & Events": 45701
    },
    {
      year: 2012,
      "Autos & Vehicles": 135684,
      Comedy: 50393,
      Education: 169777,
      Entertainment: 497732,
      "Film & Animation": 91988,
      Gaming: 509309,
      "Howto & Style": 180681,
      Music: 404498,
      "News & Politics": 246839,
      "Nonprofits & Activism": 39107,
      "People & Blogs": 156526,
      "Pets & Animals": 30398,
      "Science & Technology": 125864,
      Sports: 219892,
      "Travel & Events": 67591
    },
    {
      year: 2013,
      "Autos & Vehicles": 162838,
      Comedy: 68485,
      Education: 216381,
      Entertainment: 634714,
      "Film & Animation": 125449,
      Gaming: 833420,
      "Howto & Style": 246132,
      Music: 521508,
      "News & Politics": 349808,
      "Nonprofits & Activism": 59203,
      "People & Blogs": 221188,
      "Pets & Animals": 38922,
      "Science & Technology": 168943,
      Sports: 287302,
      "Travel & Events": 83874
    },
    {
      year: 2014,
      "Autos & Vehicles": 186404,
      Comedy: 90952,
      Education: 255626,
      Entertainment: 807142,
      "Film & Animation": 170831,
      Gaming: 1146869,
      "Howto & Style": 293392,
      Music: 653974,
      "News & Politics": 460032,
      "Nonprofits & Activism": 70375,
      "People & Blogs": 411033,
      "Pets & Animals": 37009,
      "Science & Technology": 186324,
      Sports: 330836,
      "Travel & Events": 78988
    },
    {
      year: 2015,
      "Autos & Vehicles": 258044,
      Comedy: 124527,
      Education: 326137,
      Entertainment: 1029927,
      "Film & Animation": 233288,
      Gaming: 1512749,
      "Howto & Style": 380797,
      Music: 795565,
      "News & Politics": 596981,
      "Nonprofits & Activism": 82187,
      "People & Blogs": 635832,
      "Pets & Animals": 48439,
      "Science & Technology": 220923,
      Sports: 435426,
      "Travel & Events": 127107
    },
    {
      year: 2016,
      "Autos & Vehicles": 260582,
      Comedy: 164941,
      Education: 446510,
      Entertainment: 1565403,
      "Film & Animation": 329656,
      Gaming: 2035816,
      "Howto & Style": 523933,
      Music: 1012825,
      "News & Politics": 873908,
      "Nonprofits & Activism": 97483,
      "People & Blogs": 1012489,
      "Pets & Animals": 66900,
      "Science & Technology": 281005,
      Sports: 545189,
      "Travel & Events": 135793
    },
    {
      year: 2017,
      "Autos & Vehicles": 345724,
      Comedy: 212665,
      Education: 660003,
      Entertainment: 2176261,
      "Film & Animation": 430470,
      Gaming: 2478332,
      "Howto & Style": 702145,
      Music: 1320471,
      "News & Politics": 1290183,
      "Nonprofits & Activism": 118501,
      "People & Blogs": 1411483,
      "Pets & Animals": 101161,
      "Science & Technology": 390603,
      Sports: 687902,
      "Travel & Events": 160395
    },
    {
      year: 2018,
      "Autos & Vehicles": 385196,
      Comedy: 224823,
      Education: 854858,
      Entertainment: 2697068,
      "Film & Animation": 467608,
      Gaming: 2641479,
      "Howto & Style": 791664,
      Music: 1612171,
      "News & Politics": 2120989,
      "Nonprofits & Activism": 130403,
      "People & Blogs": 1684526,
      "Pets & Animals": 145417,
      "Science & Technology": 476513,
      Sports: 861920,
      "Travel & Events": 181124
    }
  ];

  const categories = ["Gaming","Entertainment","Music","News & Politics","People & Blogs","Sports","Howto & Style","Education","Science & Technology","Film & Animation","Autos & Vehicles","Comedy","Travel & Events","Nonprofits & Activism","Pets & Animals"];
  const ECHARTS_ORDER = ["Autos & Vehicles","Comedy","Education","Entertainment","Film & Animation","Gaming","Howto & Style","Music","News & Politics","Nonprofits & Activism","People & Blogs","Pets & Animals","Science & Technology","Sports","Travel & Events"];
  const CATEGORY_ICONS: Record<string,{viewBox:string;path:string}> = {
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
  }, {} as Record<string,string>);
  const palette = categories.map((cat) => categoryColors[cat]);

  const years = dataRows.map(d => d.year);
  const totals = dataRows.map(row => categories.reduce((sum, cat) => sum + (row[cat] || 0), 0));
  const HEADLINES: Record<string, { title: string; subtitle: string }> = 
  {
Gaming: {
  title: "Gaming Over Time",
  subtitle: "Ah, Jimmy! Here we see explosive growth. Gaming grew from a small category into one of the largest sources of uploads on YouTube."
},
Entertainment: {
  title: "Entertainment Over Time",
  subtitle: "Ah, Jimmy! Here we see early dominance. Entertainment was already popular early on and continued to grow as the platform expanded."
},
Music: {
  title: "Music Over Time",
  subtitle: "Ah, Jimmy! Here we see the platform's backbone. Music uploads increased steadily, remaining a core category throughout YouTube’s growth."
},
"News & Politics": {
  title: "News & Politics Over Time",
  subtitle: "Ah, Jimmy! Here we see late acceleration. This category grew slowly at first, then expanded rapidly in later years."
},
"People & Blogs": {
  title: "People & Blogs Over Time",
  subtitle: "Ah, Jimmy! Here we see mass adoption. Uploads rose sharply as more people began sharing personal content."
},
"Film & Animation": {
  title: "Film & Animation Over Time",
  subtitle: "Ah, Jimmy! Here we see slower growth. Film and animation grew steadily but remained smaller than entertainment-driven categories."
},
Education: {
  title: "Education Over Time",
  subtitle: "Ah, Jimmy! Here we see rapid expansion. Education content expanded quickly, becoming a much more visible part of the platform."
},
"Howto & Style": {
  title: "Howto & Style Over Time",
  subtitle: "Ah, Jimmy! Here we see practical content scaling. Practical and instructional content grew consistently as YouTube matured."
},
Sports: {
  title: "Sports Over Time",
  subtitle: "Ah, Jimmy! Here we see steady and bounded growth. Sports uploads increased steadily, broadly tracking platform growth."
},
"Autos & Vehicles": {
  title: "Autos & Vehicles Over Time",
  subtitle: "Ah, Jimmy! Here we see an enthusiast niche. This category grew gradually, reflecting sustained but limited interest."
},
"Science & Technology": {
  title: "Science & Technology Over Time",
  subtitle: "Ah, Jimmy! Here we see moderate growth based on credibility. Science and technology content grew at a moderate pace over the decade."
},
"Pets & Animals": {
  title: "Pets & Animals Over Time",
  subtitle: "Ah, Jimmy! Here we see consistent growth. Starting from a small base, pet-related content grew slowly but consistently."
},
"Nonprofits & Activism": {
  title: "Nonprofits & Activism Over Time",
  subtitle: "Ah, Jimmy! Here we see limited growth. This category remained relatively small, even as overall uploads increased."
},
"Travel & Events": {
  title: "Travel & Events Over Time",
  subtitle: "Ah, Jimmy! Here we see slow growth. Travel content grew over time but did not scale as quickly as major categories."
},
Comedy: {
  title: "Comedy Over Time",
  subtitle: "Ah, Jimmy! Here we see steady growth. Comedy uploads increased steadily, becoming more common as the platform grew."
}
  };

  let xyCanvas: HTMLCanvasElement | null = null;
  let overlayEl: HTMLDivElement | null = null;
  let xyChart: Chart | null = null;
  let polarCharts: Chart[] = [];
  let hoverTooltip: HTMLDivElement | null = null;
  let hoverLine: HTMLDivElement | null = null;
  let activeCategory = $state<string | null>(null);
  let sparkCanvas: HTMLCanvasElement | null = null;
  let sparkChart: Chart | null = null;

  function splitSubtitle(subtitle: string) {
    const splitIndex = subtitle.indexOf(". ");
    if (splitIndex === -1) return [subtitle];
    return [subtitle.slice(0, splitIndex + 1), subtitle.slice(splitIndex + 2)];
  }

  function splitEmphasis(line: string) {
    const markerToken = "**";
    const start = line.indexOf(markerToken);
    if (start !== -1) {
      const end = line.indexOf(markerToken, start + markerToken.length);
      if (end !== -1) {
        return {
          before: line.slice(0, start),
          bold: line.slice(start + markerToken.length, end),
          after: line.slice(end + markerToken.length)
        };
      }
    }

    const marker = "Here we see ";
    const idx = line.indexOf(marker);
    if (idx !== -1) {
      return { before: line.slice(0, idx + marker.length), bold: line.slice(idx + marker.length), after: "" };
    }

    const altMarker = "It is ";
    const altIdx = line.indexOf(altMarker);
    if (altIdx !== -1) {
      return { before: line.slice(0, altIdx + altMarker.length), bold: line.slice(altIdx + altMarker.length), after: "" };
    }

    return { before: line, bold: "", after: "" };
  }

  function formatMillions(value: number) {
    const v = Number(value) || 0;
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(v >= 10_000_000 ? 0 : 1) + "M";
    if (v >= 1_000) return (v / 1_000).toFixed(0) + "K";
    return v.toString();
  }

  function ensureHoverTooltip() {
    if (!overlayEl) return;
    if (!hoverTooltip) {
      hoverTooltip = document.createElement("div");
      hoverTooltip.className = "hover-tooltip";
      overlayEl.appendChild(hoverTooltip);
    }
    if (!hoverLine) {
      hoverLine = document.createElement("div");
      hoverLine.className = "hover-line";
      overlayEl.appendChild(hoverLine);
    }
  }

  function showHoverTooltip(
    content: string,
    anchorX: number,
    anchorY: number,
    color?: string,
    targetX?: number,
    targetY?: number
  ) {
    if (!overlayEl) return;
    ensureHoverTooltip();
    if (!hoverTooltip || !hoverLine) return;
    hoverTooltip.innerHTML = content;
    hoverTooltip.style.display = "block";
    hoverLine.style.display = "block";

    const tint = color || "#7dd3fc";
    hoverTooltip.style.borderColor = `${tint}`;
    hoverTooltip.style.background = `${tint}22`;
    hoverLine.style.background = `${tint}aa`;

    const rect = overlayEl.getBoundingClientRect();
    const maxLeft = overlayEl.clientWidth - hoverTooltip.offsetWidth - 4;
    const maxTop = overlayEl.clientHeight - hoverTooltip.offsetHeight - 4;

    // Place tooltip near provided target, else center
    const fallbackX = overlayEl.clientWidth / 2;
    const fallbackY = overlayEl.clientHeight / 2 - 20;
    let desiredLeft = (targetX ?? fallbackX) - hoverTooltip.offsetWidth / 2;
    let desiredTop = (targetY ?? fallbackY) - hoverTooltip.offsetHeight / 2;
    desiredLeft = Math.max(4, Math.min(desiredLeft, maxLeft));
    desiredTop = Math.max(4, Math.min(desiredTop, maxTop));

    hoverTooltip.style.left = `${desiredLeft}px`;
    hoverTooltip.style.top = `${desiredTop}px`;

    const tooltipCenterX = desiredLeft + hoverTooltip.offsetWidth / 2;
    const tooltipCenterY = desiredTop + hoverTooltip.offsetHeight / 2;

    const lineTop = Math.min(anchorY, tooltipCenterY);
    const lineHeight = Math.max(10, Math.abs(anchorY - tooltipCenterY));
    hoverLine.style.left = `${Math.max(4, Math.min(tooltipCenterX, overlayEl.clientWidth - 4))}px`;
    hoverLine.style.top = `${lineTop}px`;
    hoverLine.style.height = `${lineHeight}px`;
  }

  function hideHoverTooltip() {
    if (hoverTooltip) hoverTooltip.style.display = "none";
    if (hoverLine) hoverLine.style.display = "none";
  }

  function renderSparkChart() {
    if (!sparkCanvas) return;
    sparkChart?.destroy();
    sparkChart = null;

    if (!activeCategory) return;
    // Ensure a stable canvas size for the small sparkline
    const w = sparkCanvas.clientWidth || sparkCanvas.parentElement?.clientWidth || 600;
    sparkCanvas.width = w;
    sparkCanvas.height = 170;

    const ctx = sparkCanvas.getContext("2d");
    if (!ctx) return;
    const dataValues = dataRows.map((row) => row[activeCategory] || 0);
    const tint = categoryColors[activeCategory] || "#38bdf8";
    const maxVal = Math.max(...dataValues);
    const paddedMax = maxVal > 0 ? maxVal * 1.08 : 1;

    const valueLabelPlugin = {
      id: "sparkValueLabels",
      afterDatasetsDraw(chart: Chart) {
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(0);
        if (!meta?.data?.length) return;
        ctx.save();
        ctx.font = "10px " + (Chart.defaults.font.family ?? fontStack);
        ctx.fillStyle = tint;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        meta.data.forEach((pt, idx) => {
          const val = dataValues[idx];
          const label = formatMillions(val);
          ctx.fillText(label, pt.x, pt.y - 6);
        });
        ctx.restore();
      }
    };

    sparkChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: years,
        datasets: [{
          label: `${activeCategory}`,
          data: dataValues,
          borderColor: tint,
          borderWidth: 2,
          pointRadius: 2.8,
          pointHoverRadius: 3.6,
          pointBackgroundColor: "transparent",
          pointBorderColor: tint,
          pointBorderWidth: 1.2,
          backgroundColor: `${tint}08`,
          tension: 0.25,
          fill: true,
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(0,0,0,0)",
            borderWidth: 0,
            displayColors: false,
            titleColor: "#cbd5e1",
            bodyColor: "#e5e7eb",
            padding: 6,
            callbacks: {
              title: (ctx) => `Year ${ctx[0].label}`,
              label: (ctx) => {
                const val = ctx.parsed.y || 0;
                const total = totals[ctx.dataIndex] || 1;
                const pct = (val / total) * 100;
                return `${formatMillions(val)} (${pct.toFixed(1)}%)`;
              },
            }
          }
        },
        scales: {
          x: {
            ticks: { color: "#cbd5e1", maxRotation: 0, font: { size: 10 } },
            grid: { display: false }
          },
          y: {
            ticks: { color: "#cbd5e1", callback: (v) => formatMillions(Number(v)), font: { size: 10 } },
            grid: { display: false },
            suggestedMax: paddedMax
          }
        },
        layout: { padding: { top: 8, right: 12, left: 6, bottom: 6 } },
        elements: { line: { capBezierPoints: true } },
        animations: {
          x: {
            duration: 0
          },
          y: {
            duration: 500,
            easing: "easeInOutQuad",
            delay: (ctx) => (ctx?.index ?? 0) * 50
          }
        }
      },
      plugins: [valueLabelPlugin]
    });
  }

  async function toggleCategory(cat: string) {
    activeCategory = activeCategory === cat ? null : cat;
    await tick();
    renderPolarOverlays();
    if (activeCategory) {
      renderSparkChart();
    } else {
      sparkChart?.destroy();
      sparkChart = null;
    }
  }

  function renderMainChart() {
    if (!xyCanvas) return;
    const ctx = xyCanvas.getContext("2d");
    if (!ctx) return;

    xyChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: years,
        datasets: [{
          label: "Total Videos",
          data: totals,
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 0,
          backgroundColor: "rgba(0,0,0,0)",
          tension: 0.25,
          pointRadius: 0,
          pointHoverRadius: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: { display: true, text: "Year", color: "#d1d5db" },
            ticks: { color: "#9ca3af" },
            grid: { color: "rgba(31,41,55,0.7)" },
          },
          y: {
            title: { display: true, text: "Total Videos (M)", color: "#d1d5db" },
            ticks: {
              color: "#9ca3af",
              callback: (v) => formatMillions(Number(v)),
            },
            grid: { color: "rgba(31,41,55,0.7)" },
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(0,0,0,0.8)",
            titleColor: "#e5e7eb",
            bodyColor: "#e5e7eb",
            borderColor: "#38bdf8",
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              title: (ctx) => `Year ${ctx[0].label}`,
              label: (ctx) => `Total: ${formatMillions(ctx.parsed.y)} videos`,
            }
          }
        },
        layout: {
          padding: { top: 26, right: 48, left: 24, bottom: 16 },
        },
        animation: {
          duration: 700,
          onComplete: () => {
            renderPolarOverlays();
          }
        }
      }
    });
  }

  function renderPolarOverlays() {
    if (!overlayEl || !xyChart) return;

    polarCharts.forEach((chart) => chart.destroy());
    polarCharts = [];
    overlayEl.innerHTML = "";
    hoverTooltip = null;
    hoverLine = null;
    ensureHoverTooltip();

    const meta = xyChart.getDatasetMeta(0);
    if (!meta?.data) return;

  const maxTotal = Math.max(...totals);
  const sizeBase = activeCategory ? 55 : 60;
  const sizeVar = activeCategory ? 26 : 30;

    // Precompute fixed tooltip anchor positions
    const yearToIndex = new Map(years.map((y, i) => [y, i]));
    const getPoint = (yr: number) => {
      const idx = yearToIndex.get(yr);
      const pt = idx !== undefined ? meta.data[idx] : null;
      if (pt && typeof pt.x === "number" && typeof pt.y === "number") return { x: pt.x, y: pt.y };
      return null;
    };
    const leftPts = [getPoint(2010), getPoint(2011)].filter(Boolean) as { x: number; y: number }[];
    const rightPts = [getPoint(2014), getPoint(2015)].filter(Boolean) as { x: number; y: number }[];
    const avgPos = (arr: { x: number; y: number }[]) => {
      if (!arr.length) return null;
      const sx = arr.reduce((s, p) => s + p.x, 0);
      const sy = arr.reduce((s, p) => s + p.y, 0);
      return { x: sx / arr.length, y: sy / arr.length };
    };
    // Fix tooltip anchors using chart scales for clearer placement
    const midAnchor = { x: overlayEl.clientWidth / 2, y: overlayEl.clientHeight / 2 - 20 };

    years.forEach((year, index) => {
      const point = meta.data[index];
      if (!point) return;

      const cx = point.x;
      const cy = point.y;
      const totalYear = totals[index];
      const frac = totalYear / maxTotal;
      const size = sizeBase + sizeVar * Math.sqrt(frac);

      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      canvas.style.position = "absolute";
      const pad = 16;
      const maxLeft = (overlayEl.clientWidth || size) - size - pad;
      const maxTop = (overlayEl.clientHeight || size) - size - pad;
      const left = Math.max(pad, Math.min(cx - size / 2, maxLeft));
      const top = Math.max(pad, Math.min(cy - size / 2, maxTop));
      canvas.style.left = `${left}px`;
      canvas.style.top = `${top}px`;
      canvas.style.pointerEvents = "auto";
      canvas.className = "polar-canvas";
      canvas.style.animationDelay = `${index * 0.08}s`;
      overlayEl.appendChild(canvas);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const row = dataRows[index];
      const values = categories.map((cat) => row[cat] || 0);
      const total = values.reduce((sum, val) => sum + val, 0) || 1;
      const percents = values.map((val) => (val / total) * 100);

      const backgrounds = categories.map((cat, idx) => {
        if (!activeCategory) return `${palette[idx]}aa`;
        return cat === activeCategory ? `${palette[idx]}ee` : `${palette[idx]}15`;
      });

      const borders = categories.map((cat, idx) => {
        if (!activeCategory) return palette[idx];
        return cat === activeCategory ? palette[idx] : `${palette[idx]}33`;
      });

      const polarChart = new Chart(ctx, {
        type: "polarArea",
        data: {
          labels: categories,
          datasets: [{
            data: percents,
            backgroundColor: backgrounds,
            borderColor: borders,
            borderWidth: activeCategory ? 1.4 : 1,
          }]
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          scales: {
            r: {
              ticks: { display: false },
              grid: { display: false },
            },
          },
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
          },
        }
      });

      polarCharts.push(polarChart);

      canvas.addEventListener("click", (event) => {
        const points = polarChart.getElementsAtEventForMode(
          event,
          "nearest",
          { intersect: false },
          false
        );
        if (points?.length) {
          const label = categories[points[0].index];
          toggleCategory(label);
        }
      });

      canvas.addEventListener("mousemove", (event) => {
        const points = polarChart.getElementsAtEventForMode(
          event,
          "nearest",
          { intersect: false },
          false
        );
        if (points?.length) {
          const idx = points[0].index;
          const label = categories[idx];
          const tint = palette[idx] || "#38bdf8";
          const catValue = values[idx] || 0;
          const pct = percents[idx] || 0;
          const content = `<strong>${label}</strong><br>${formatMillions(catValue)} (${pct.toFixed(1)}%)`;
          const targetX = left + event.offsetX;
          const targetY = top + event.offsetY;
          showHoverTooltip(content, targetX, targetY, tint, targetX, targetY - 12);
        } else {
          hideHoverTooltip();
        }
      });

      canvas.addEventListener("mouseleave", () => {
        hideHoverTooltip();
      });

      // Labels moved to sparkline chart; keep overlay clean.
    });
  }

  onMount(() => {
    renderMainChart();
  });

  onDestroy(() => {
    xyChart?.destroy();
    polarCharts.forEach((chart) => chart.destroy());
    sparkChart?.destroy();
  });
</script>

<style>
  .viz-main-wrap {
    padding: 10px;
    color: #e5e7eb;
    font-family: var(--viz-font, "TeX Gyre Adventor", "Tex Gyre Adventor", "Helvetica Neue", Arial, sans-serif);
    overflow-x: hidden;
    width: min(820px, calc(100vw - 16px));
    margin: 0 auto;
  }

  h1 {
    margin: 0 0 4px;
    font-size: 19px;
    font-weight: 600;
  }

  .note {
    margin: 0 0 8px;
    font-size: 12px;
    color: #9ca3af;
  }

  .chart-container {
    position: relative;
    width: 100%;
    height: clamp(310px, 42vh, 430px);
    background: transparent;
    margin: 8px 0 0;
    border-radius: 8px;
    overflow: visible;
  }

  #xyChart {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }

  #polarOverlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: auto;
  }

  @keyframes dropSlices {
    0% { transform: translateY(-60px) scale(0.85); opacity: 0; }
    60% { transform: translateY(10px) scale(1.03); opacity: 0.9; }
    100% { transform: translateY(0) scale(1); opacity: 1; }
  }

  :global(.polar-canvas) {
    animation: dropSlices 0.7s ease forwards;
    opacity: 0;
  }

  :global(.hover-tooltip) {
    position: absolute;
    padding: 5px 8px;
    background: rgba(15, 23, 42, 0.82);
    border: 1px solid rgba(56, 189, 248, 0.5);
    border-radius: 6px;
    font-size: 10px;
    color: #e0f2fe;
    pointer-events: none;
    white-space: nowrap;
    max-width: none;
    line-height: 1.2;
    display: none;
    box-shadow: 0 10px 28px rgba(2, 6, 23, 0.6);
  }

  :global(.hover-line) {
    position: absolute;
    width: 1.5px;
    background: rgba(125, 211, 252, 0.65);
    display: none;
    pointer-events: none;
    transform: translateX(-50%);
  }


  .category-legend {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    column-gap: 10px;
    row-gap: 6px;
    margin-top: 10px;
    padding: 0 24px 0 24px;
    width: 100%;
    align-items: center;
  }

  .category-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 2px 4px;
    background: transparent;
    border: none;
    color: #e2e8f0;
    font-size: 11px;
    letter-spacing: 0.12px;
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;
    font-family: var(--viz-font, "TeX Gyre Adventor", "Tex Gyre Adventor", "Helvetica Neue", Arial, sans-serif);
    justify-content: flex-start;
    white-space: nowrap;
  }

  .category-pill:hover {
    color: #f8fafc;
    transform: translateY(-1px);
  }

  .category-pill.active { color: #fdf4ff; }

  .category-pill svg {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
  }

  .category-note {
    margin-top: 14px;
    font-size: 12px;
    text-align: center;
  }

  :global(.polar-anno) {
    position: absolute;
    background: rgba(2, 6, 23, 0.85);
    color: #e0f2fe;
    font-size: 9px;
    padding: 3px 5px;
    border-radius: 5px;
    border: 1px solid rgba(56, 189, 248, 0.35);
    pointer-events: none;
    white-space: nowrap;
    transform: translate(0, -6px);
  }

  :global(.polar-total) {
    position: absolute;
    color: rgba(248, 250, 252, 0.72);
    font-weight: 600;
    text-shadow: 0 2px 8px rgba(2, 6, 23, 0.8);
    pointer-events: none;
    transform: translate(-50%, -100%);
    opacity: 0;
    animation: floatTotal 0.35s ease forwards;
  }

  @keyframes floatTotal {
    0% { transform: translate(-50%, -85%); opacity: 0; }
    60% { transform: translate(-50%, -110%); opacity: 1; }
    100% { transform: translate(-50%, -100%); opacity: 1; }
  }

  /* Default cursor; we'll set crosshair only on main chart */
  canvas { cursor: default; }

  .spark-wrap {
    margin: 14px 0 12px;
    padding: 10px 12px 8px 24px;
    background: transparent;
    border-top: none;
  }

  .spark-title {
    font-size: 12px;
    color: #cbd5e1;
    margin: 2px 0 2px;
  }

  .spark-headline {
    display: inline-flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 16px;
    font-weight: 600;
    color: #e5e7eb;
    margin: 2px 0 2px;
  }

  .spark-headline svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  .spark-avatar-col {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    margin-right: 10px;
  }

  .spark-text {
    display: inline-flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 6px;
  }

  .spark-headline-row {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .spark-avatar {
    width: 76px;
    height: 80px;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .spark-avatar-name {
    font-family: var(--ds-font-body);
    font-size: var(--ds-text-xs);
    color: var(--ds-chart-3);
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    line-height: 1.1;
  }

  .spark-subtitle {
    margin: 6px 0 4px;
  }

  .spark-subtitle.bubble {
    max-width: 520px;
    padding: 6px 10px;
    font-family: var(--ds-font-body), "BlexMono";
    background: color-mix(in srgb, var(--ds-pale-3) 92%, transparent);
    color: var(--ds-bg);
    border-radius: var(--ds-radius);
    border-top-left-radius: 0;
    display: inline-block;
  }

  .spark-subtitle.bubble p {
    margin: 0;
    font: inherit;
    font-weight: 400;
  }

  .spark-wrap canvas {
    width: 100%;
    height: 150px;
    cursor: default;
  }

  .chart-container canvas {
    cursor: crosshair;
  }

</style>

<div class="viz-main-wrap">
  <h1>From Indie to Industry: Growth of YouTube uploads across categories (2008–2018)</h1>
  <p class="note">YouTube became capable of sustaining large-scale content production across many categories.</p>

  <div class="chart-container">
    <canvas id="xyChart" bind:this={xyCanvas}></canvas>
    <div id="polarOverlay" bind:this={overlayEl}></div>
  </div>

  {#if activeCategory}
    <div class="spark-wrap">
      {#if HEADLINES[activeCategory]}
        <div class="spark-headline">
          <div class="spark-avatar-col">
            <img src="./assets/pixel_art/ender.gif" alt="Ender" class="spark-avatar" />
            <span class="spark-avatar-name">EDDIE</span>
          </div>
          <div class="spark-text">
            <div class="spark-headline-row">
              {#if CATEGORY_ICONS[activeCategory]}
                <svg viewBox={CATEGORY_ICONS[activeCategory].viewBox} aria-hidden="true">
                  <path d={CATEGORY_ICONS[activeCategory].path} fill={categoryColors[activeCategory]} />
                </svg>
              {/if}
              {HEADLINES[activeCategory].title}
            </div>
            <div class="spark-subtitle bubble bubble-left">
              <p>
                {#each splitSubtitle(HEADLINES[activeCategory].subtitle) as line, idx}
                  {#if idx === 0}
                    {@const parts = splitEmphasis(line)}
                    {parts.before}{#if parts.bold}<strong>{parts.bold}</strong>{/if}{parts.after}
                  {:else}
                    {line}
                  {/if}
                  {#if idx < 1}<br />{/if}
                {/each}
              </p>
            </div>
          </div>
        </div>
      {:else}
        <div class="spark-title spark-headline">
          <div class="spark-avatar-col">
            <img src="./assets/pixel_art/ender.gif" alt="Ender" class="spark-avatar" />
            <span class="spark-avatar-name">EDDIE</span>
          </div>
          <div class="spark-text">
            <div class="spark-headline-row">
              {#if CATEGORY_ICONS[activeCategory]}
                <svg viewBox={CATEGORY_ICONS[activeCategory].viewBox} aria-hidden="true">
                  <path d={CATEGORY_ICONS[activeCategory].path} fill={categoryColors[activeCategory]} />
                </svg>
              {/if}
              {activeCategory} uploads over the years
            </div>
          </div>
        </div>
      {/if}
      <canvas bind:this={sparkCanvas}></canvas>
    </div>
  {/if}

  <div class="category-legend">
    {#each categories as cat}
      <button
        class="category-pill"
        class:active={activeCategory === cat}
        style={activeCategory === cat
          ? `background:${categoryColors[cat]}1f;border-color:${categoryColors[cat]};box-shadow:0 6px 22px ${categoryColors[cat]}44;color:#fdf4ff;`
          : ''}
        onclick={() => toggleCategory(cat)}
      >
        {#if CATEGORY_ICONS[cat]}
          <svg viewBox={CATEGORY_ICONS[cat].viewBox} aria-hidden="true">
            <path d={CATEGORY_ICONS[cat].path} fill={categoryColors[cat]} />
          </svg>
        {/if}
        <span class="label">{cat}</span>
      </button>
    {/each}
  </div>
  <p class="category-note">Click on any category to explore its growth trajectory over time.</p>
</div>
