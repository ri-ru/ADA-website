<script lang="ts">
  import echarts from '../lib/echarts';
  import { onMount } from 'svelte';
  import { selectedActiveInactive } from "../lib/CategorySelection"

  let chartDiv: HTMLDivElement;

  onMount(() => {
    var chart = echarts.init(chartDiv, "sheNaNigans", {renderer: "svg"});

    const optiona = {
  "title": [
    {
      "text": "Channels Active in 2025",
      "textAlign": "center",
      "left": "50%"
    }
  ],
  "animationDuration": 500.0,
  "tooltip": {
    "trigger": "item"
  },
  "legend": {
    "data": [
      {
        "name": "active sponsored"
      },
      {
        "name": "active"
      },
      {
        "name": "inactive sponsored"
      },
      {
        "name": "inactive"
      }
    ]
  },
  "toolbox": {
    "feature": {
      "magicType": {
        "type": [
          "stack"
        ]
      }
    }
  },
  "xAxis": {
    "type": "value",
    "name": "% channels",
    "max": "dataMax",
    "axisLabel": {
      "formatter": function(param) { return Math.round(param * 100) / 100; }
    }
  },
  "yAxis": {
    "type": "category",
    "name": "categories",
    "axisTick": {
      "show": false
    },
    "splitLine": {
      "show": false
    },
    "data": [
      "Autos &\n Vehicles",
      "Comedy",
      "Education",
      "Entertainment",
      "Film &\n Animation",
      "Gaming",
      "Howto &\n Style",
      "Music",
      "News &\n Politics",
      "Nonprofits &\n Activism",
      "People &\n Blogs",
      "Pets &\n Animals",
      "Science &\n Technology",
      "Sports",
      "Travel &\n Events"
    ]
  },
  "color": [
    "#d20f39", //currently actively sponsored --> dark red 
    "#e64553", //active --> light red 
    "#313244", //inactive spons --> dark gray 
    "#585b70"  //inactive  --> gray
  ],
	grid: {
		bottom: 50
	},
  "series": [
    {
      "type": "bar",
      "name": "active sponsored",
      "itemStyle": {
        "borderRadius": 50.0
      },
      "emphasis": {
        "focus": "series"
      },
      "stack": "bars",
      "tooltip": {
        "formatter": function(param) {
            return Math.round(param.data * 100) / 100 + "%";
             }
      },
      "data": [
        6.909581646423752,
        9.583222723652774,
        9.470716391131615,
        5.494313973247353,
        4.698181818181818,
        7.064488904334012,
        5.170526315789473,
        3.755559215944655,
        5.656208572691118,
        1.3415892672858618,
        3.215119752348884,
        4.7213622291021675,
        12.870065789473685,
        5.924630924630924,
        5.379587732528909
      ]
    },
    {
      "type": "bar",
      "name": "active",
      "itemStyle": {
        "borderRadius": 50.0
      },
      "emphasis": {
        "focus": "series"
      },
      "stack": "bars",
      "tooltip": {
        "formatter": function(param) {
            return Math.round(param.data * 100) / 100 + "%";
             }
      },
      "data": [
        64.42645074224022,
        45.925139368197506,
        59.38741509675766,
        50.11110626987931,
        45.876363636363635,
        46.53725860100283,
        59.30947368421052,
        55.6951078899687,
        66.72558550596553,
        31.99174406604747,
        47.81947537066203,
        56.26934984520124,
        53.28947368421053,
        61.79098679098679,
        66.0633484162896
      ]
    },
    {
      "type": "bar",
      "name": "inactive sponsored",
      "itemStyle": {
        "borderRadius": 50.0
      },
      "emphasis": {
        "focus": "series"
      },
      "stack": "bars",
      "tooltip": {
        "formatter": function(param) {
            return Math.round(param.data * 100) / 100 + "%";
             }
      },
      "data": [
        0.9446693657219973,
        3.7164852667905497,
        1.8582596437267718,
        1.468345605855954,
        1.9636363636363636,
        2.338281288785186,
        0.9094736842105263,
        1.2518530719815517,
        0.618647812638091,
        0.9287925696594427,
        0.9286916852223972,
        0.541795665634675,
        2.8166118421052633,
        1.5734265734265733,
        0.8547008547008547
      ]
    },
    {
      "type": "bar",
      "name": "inactive",
      "itemStyle": {
        "borderRadius": 50.0
      },
      "emphasis": {
        "focus": "series"
      },
      "stack": "bars",
      "tooltip": {
        "formatter": function(param) {
            return Math.round(param.data * 100) / 100 + "%";
             }
      },
      "data": [
        27.719298245614034,
        40.77515264135917,
        29.283608868383954,
        42.92623415101738,
        47.46181818181818,
        44.05997120587797,
        34.61052631578947,
        39.29747982210509,
        26.99955810870526,
        65.73787409700722,
        48.03671319176669,
        38.46749226006192,
        31.023848684210527,
        30.710955710955712,
        27.702362996480645
      ]
    }
  ]
};

    const optionb = {
  "title": [
    {
      "text": "Channels Active in 2025",
      "textAlign": "center",
      "left": "50%"
    }
  ],
  "animationDuration": 500.0,
  "animationEasing": "cubicInOut",
  "tooltip": {
    "trigger": "item"
  },
  "legend": {
    "data": [
      {
        "name": "active sponsored"
      },
      {
        "name": "active"
      },
      {
        "name": "inactive sponsored"
      },
      {
        "name": "inactive"
      }
    ]
  },
  "toolbox": {
    "feature": {
      "magicType": {
        "type": [
          "stack"
        ]
      }
    }
  },
  "grid": [
    {
      "bottom": 50
    }
  ],
  "xAxis": {
    "type": "value",
    "name": "% channels",
    "max": "dataMax",
    "axisLabel": {
      "formatter": function(param) { return Math.round(param * 100) / 100; }
    }
  },
  "yAxis": {
    "type": "category",
    "name": "categories",
    "axisTick": {
      "show": false
    },
    "splitLine": {
      "show": false
    },
    "data": [
      "Autos &\n Vehicles",
      "Comedy",
      "Education",
      "Entertainment",
      "Film &\n Animation",
      "Gaming",
      "Howto &\n Style",
      "Music",
      "News &\n Politics",
      "Nonprofits &\n Activism",
      "People &\n Blogs",
      "Pets &\n Animals",
      "Science &\n Technology",
      "Sports",
      "Travel &\n Events"
    ]
  },
  "color": [
    "#d20f39",
    "#313244",
    "#e64553",
    "#585b70"
  ],
  "series": [
    {
      "type": "bar",
      "name": "active sponsored",
      "itemStyle": {
        "borderRadius": 50.0
      },
      "emphasis": {
        "focus": "series"
      },
      "stack": "spon",
      "tooltip": {
        "formatter": function(param) {
            return Math.round(param.data * 100) / 100 + "%";
             }
      },
      "data": [
        87.97250859106529,
        72.0558882235529,
        83.5972850678733,
        78.91113892365456,
        70.52401746724891,
        75.13199577613517,
        85.0415512465374,
        75.0,
        90.14084507042253,
        59.09090909090909,
        77.58846657929227,
        89.70588235294117,
        82.04456094364352,
        79.01554404145078,
        86.29032258064517
      ]
    },
    {
      "type": "bar",
      "name": "inactive sponsored",
      "itemStyle": {
        "borderRadius": 50.0
      },
      "emphasis": {
        "focus": "series"
      },
      "stack": "spon",
      "tooltip": {
        "formatter": function(param) {
            return Math.round(param.data * 100) / 100 + "%";
             }
      },
      "data": [
        12.027491408934708,
        27.944111776447105,
        16.402714932126695,
        21.08886107634543,
        29.475982532751093,
        24.868004223864837,
        14.958448753462603,
        25.0,
        9.859154929577464,
        40.90909090909091,
        22.411533420707734,
        10.294117647058824,
        17.955439056356486,
        20.984455958549223,
        13.709677419354838
      ]
    },
    {
      "type": "bar",
      "name": "active",
      "itemStyle": {
        "borderRadius": 50.0
      },
      "emphasis": {
        "focus": "series"
      },
      "stack": "nspon",
      "tooltip": {
        "formatter": function(param) {
            return Math.round(param.data * 100) / 100 + "%";
             }
      },
      "data": [
        69.91798476859988,
        52.96999387630129,
        66.97499638676109,
        53.86128412869386,
        49.150693470469065,
        51.36719820264124,
        63.14892853940644,
        58.631003988208775,
        71.1928335690712,
        32.734952481520594,
        49.88668555240793,
        59.39542483660131,
        63.20409656181419,
        66.79966400671987,
        70.45576407506702
      ]
    },
    {
      "type": "bar",
      "name": "inactive",
      "itemStyle": {
        "borderRadius": 50.0
      },
      "emphasis": {
        "focus": "series"
      },
      "stack": "nspon",
      "tooltip": {
        "formatter": function(param) {
            return Math.round(param.data * 100) / 100 + "%";
             }
      },
      "data": [
        30.082015231400117,
        47.03000612369871,
        33.02500361323891,
        46.13871587130614,
        50.849306529530935,
        48.63280179735876,
        36.85107146059356,
        41.368996011791225,
        28.807166430928806,
        67.2650475184794,
        50.11331444759207,
        40.60457516339869,
        36.79590343818581,
        33.200335993280135,
        29.544235924932977
      ]
    }
  ]
};

    const options = [optiona, optionb];

    chart.setOption(options[0]);

    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(chartDiv);

    selectedActiveInactive.subscribe(ind => {
      chart.setOption(options[ind], { notMerge: true, lazyUpdate: false });
    });
  });
</script>

<div bind:this={chartDiv} class="echart" style="width: 100%; height: 700px;"></div>
