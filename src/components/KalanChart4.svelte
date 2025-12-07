<script lang="ts">
  import echarts from '../lib/echarts';
  import { onMount } from 'svelte';

  let chartDiv: HTMLDivElement;

  onMount(() => {
    var chart = echarts.init(chartDiv, "sheNaNigans", {renderer: "svg"});
    var option = {
  "title": [
    {
      "text": "Channels Active in 2025",
      "textAlign": "center",
      "left": "50%"
    }
  ],
  "animationDuration": 1500.0,
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
    "#1e66f5",
    "#04a5e5",
    "#d20f39",
    "#e64553"
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
    chart.setOption(option);

    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(chartDiv);
  });
</script>

<div bind:this={chartDiv} class="echart" style="width: 100%; height: 700px;"></div>
