<script lang="ts">
  import enriched from './data_config_activity_v2_enriched.json';
  import chartTheme from '../lib/echarts-theme';

  const UNIT = 200;  // channels per icon
  const CIRCLE_SIZE = 170;
  const ICON_WIDTH = 14;
  const ICON_HEIGHT = 10;

  const RAW_DATA = (enriched as any)?.DATA || [];
  const DATA = RAW_DATA.map((d: any) => ({
    id: d.id,
    label: d.label,
    active: Number(d.active) || 0,
    not_active: Number(d.not_active) || 0,
  }));

  const rawLinks = (enriched as any)?.LINKS || {};
  const LINKS: Record<string, { active: IconLink[]; not_active: IconLink[] }> = Object.fromEntries(
    Object.entries(rawLinks).map(([cat, entry]: [string, any]) => {
      const normalize = (item: any): IconLink | null => {
        if (!item) return null;
        if (typeof item === "string") return { url: item };
        return {
          url: item.url || null,
          name: item.name_cc ?? item.name ?? null,
          subscribers: item.subscribers_cc ?? null,
          lastTitle: item.last_video_title ?? null,
          joinDate: item.join_date ?? null,
        };
      };
      const active = (entry?.active || []).map(normalize).filter(Boolean) as IconLink[];
      const inactive = (entry?.not_active || []).map(normalize).filter(Boolean) as IconLink[];
      return [cat, { active, not_active: inactive }];
    })
  );

  interface IconLink {
    url: string | null;
    name?: string | null;
    subscribers?: number | null;
    lastTitle?: string | null;
    joinDate?: string | null;
  }

  interface IconData {
    band: 'active' | 'inactive';
    x: number;
    y: number;
    url: string | null;
    label?: string | null;
    meta?: IconLink | null;
    delay: number;
  }

  function iconTooltip(icon: IconData) {
    if (!icon.meta) return "";
    const parts = [];
    if (icon.meta.name) parts.push(`• Channel: ${icon.meta.name}`);
    if (icon.meta.subscribers) parts.push(`• Subscribers: ${icon.meta.subscribers.toLocaleString()}`);
    if (icon.meta.joinDate) parts.push(`• Join Date: ${icon.meta.joinDate}`);
    return parts.join("\n");
  }

  interface CardData {
    id: string;
    label: string;
    iconPath: string | null;
    iconViewBox: string;
    iconColor: string;
    active: number;
    notActive: number;
    total: number;
    pctActive: number;
    pctInactive: number;
    icons: IconData[];
  }

  const CATEGORY_ICONS: Record<string, { path: string; viewBox: string }> = {
    "Autos & Vehicles": {
      viewBox: "0 0 1400 1400",
      path: "M316.875 325.156l-61.1719 174.844h688.594l-61.1719 -174.844c-10.5469 -30 -38.9062 -50.1562 -70.7812 -50.1562h-424.688c-31.875 0 -60.2344 20.1562 -70.7812 50.1562zM92.8125 511.25l82.5 -235.547c31.6406 -90.2344 116.719 -150.703 212.344 -150.703h424.688 c95.625 0 180.703 60.4688 212.344 150.703l82.5 235.547c54.375 22.5 92.8125 76.1719 92.8125 138.75v337.5v112.5c0 41.4844 -33.5156 75 -75 75h-75c-41.4844 0 -75 -33.5156 -75 -75v-112.5h-750v112.5c0 41.4844 -33.5156 75 -75 75h-75 c-41.4844 0 -75 -33.5156 -75 -75v-112.5v-337.5c0 -62.5781 38.4375 -116.25 92.8125 -138.75zM300 725c0 -41.3936 -33.6064 -75 -75 -75s-75 33.6064 -75 75s33.6064 75 75 75s75 -33.6064 75 -75zM975 800c41.3936 0 75 -33.6064 75 -75s-33.6064 -75 -75 -75 s-75 33.6064 -75 75s33.6064 75 75 75z"
    },
    "Comedy": {
      viewBox: "0 0 1200 1200",
      path: "M1087.5 650c0 -269.059 -218.441 -487.5 -487.5 -487.5s-487.5 218.441 -487.5 487.5s218.441 487.5 487.5 487.5s487.5 -218.441 487.5 -487.5zM0 650c0 -331.149 268.851 -600 600 -600s600 268.851 600 600s-268.851 600 -600 600s-600 -268.851 -600 -600z M306.328 785.703c-9.84375 -31.875 16.6406 -60.7031 49.9219 -60.7031h498.047c33.2812 0 59.7656 29.0625 49.9219 60.7031c-39.375 127.734 -158.438 220.547 -299.062 220.547s-259.688 -92.8125 -298.828 -220.547zM312.891 356.094l210.703 112.266 c25.0781 13.3594 25.0781 49.4531 0 62.8125l-210.703 112.266c-18.5156 9.84375 -41.0156 -3.51562 -41.0156 -24.6094c0 -6.5625 2.34375 -12.8906 6.5625 -17.8125l84.375 -101.25l-84.375 -101.25c-4.21875 -4.92188 -6.5625 -11.25 -6.5625 -17.8125 c0 -21.0938 22.5 -34.4531 41.0156 -24.6094zM928.125 380.703c0 6.5625 -2.34375 12.8906 -6.5625 17.8125l-84.375 101.25l84.375 101.25c4.21875 4.92188 6.5625 11.25 6.5625 17.8125c0 21.0938 -22.5 34.4531 -41.0156 24.6094l-210.703 -112.266 c-25.0781 -13.3594 -25.0781 -49.4531 0 -62.8125l210.703 -112.266c18.5156 -9.84375 41.0156 3.51562 41.0156 24.6094z"
    },
    "Education": {
      viewBox: "0 0 512 512",
      path: "M256 64l-235 128l235 128l192 -105v148h43v-171zM107 281v86l149 81l149 -81v-86l-149 82z"
    },
    "Entertainment": {
      viewBox: "0 0 512 512",
      path: "M448 64h-384q-18 0 -30.5 12.5t-12.5 30.5v256q0 17 12.5 29.5t30.5 12.5h107v43h170v-43h107q18 0 30.5 -12.5t12.5 -29.5v-256q0 -18 -12.5 -30.5t-30.5 -12.5zM448 363h-384v-256h384v256zM341 235l-149 85v-171z"
    },
    "Film & Animation": {
      viewBox: "0 0 1200 1200",
      path: "M0 275c0 -82.7344 67.2656 -150 150 -150h900c82.7344 0 150 67.2656 150 150v750c0 82.7344 -67.2656 150 -150 150h-900c-82.7344 0 -150 -67.2656 -150 -150v-750zM112.5 912.5v75c0 20.625 16.875 37.5 37.5 37.5h75c20.625 0 37.5 -16.875 37.5 -37.5v-75 c0 -20.625 -16.875 -37.5 -37.5 -37.5h-75c-20.625 0 -37.5 16.875 -37.5 37.5zM975 875c-20.625 0 -37.5 16.875 -37.5 37.5v75c0 20.625 16.875 37.5 37.5 37.5h75c20.625 0 37.5 -16.875 37.5 -37.5v-75c0 -20.625 -16.875 -37.5 -37.5 -37.5h-75zM112.5 612.5v75 c0 20.625 16.875 37.5 37.5 37.5h75c20.625 0 37.5 -16.875 37.5 -37.5v-75c0 -20.625 -16.875 -37.5 -37.5 -37.5h-75c-20.625 0 -37.5 16.875 -37.5 37.5zM975 575c-20.625 0 -37.5 16.875 -37.5 37.5v75c0 20.625 16.875 37.5 37.5 37.5h75 c20.625 0 37.5 -16.875 37.5 -37.5v-75c0 -20.625 -16.875 -37.5 -37.5 -37.5h-75zM112.5 312.5v75c0 20.625 16.875 37.5 37.5 37.5h75c20.625 0 37.5 -16.875 37.5 -37.5v-75c0 -20.625 -16.875 -37.5 -37.5 -37.5h-75c-20.625 0 -37.5 16.875 -37.5 37.5zM975 275 c-20.625 0 -37.5 16.875 -37.5 37.5v75c0 20.625 16.875 37.5 37.5 37.5h75c20.625 0 37.5 -16.875 37.5 -37.5v-75c0 -20.625 -16.875 -37.5 -37.5 -37.5h-75zM375 350v150c0 41.4844 33.5156 75 75 75h300c41.4844 0 75 -33.5156 75 -75v-150 c0 -41.4844 -33.5156 -75 -75 -75h-300c-41.4844 0 -75 33.5156 -75 75zM450 725c-41.4844 0 -75 33.5156 -75 75v150c0 41.4844 33.5156 75 75 75h300c41.4844 0 75 -33.5156 75 -75v-150c0 -41.4844 -33.5156 -75 -75 -75h-300z"
    },
    "Gaming": {
      viewBox: "0 0 512 512",
      path: "M128 149h256q29 0 53.5 14.5t39 39t14.5 53.5t-14.5 53.5t-39 39t-53.5 14.5q-26 0 -48 -11.5t-37 -31.5h-86q-15 20 -37 31.5t-48 11.5q-29 0 -53.5 -14.5t-39 -39t-14.5 -53.5t14.5 -53.5t39 -39t53.5 -14.5zM421 203q-11 0 -18.5 7.5t-7.5 18.5t7.5 19t18.5 8t19 -8 t8 -19t-8 -18.5t-19 -7.5zM368 256q-11 0 -19 8t-8 19t8 18.5t19 7.5t19 -7.5t8 -18.5t-8 -19t-19 -8zM107 192v43h-43v42h43v43h42v-43h43v-42h-43v-43h-42z"
    },
    "Howto & Style": {
      viewBox: "0 0 1300 1300",
      path: "M1099.92 95.2344l54.8438 54.8438c58.5938 58.5938 58.5938 153.516 0 212.109l-132.188 132.188l-267.188 -266.953l132.188 -132.188c58.5938 -58.5938 153.516 -58.5938 212.109 0h0.234375zM105.234 877.812l597.188 -597.422l267.188 267.188l-597.422 597.188 c-15.7031 15.7031 -35.3906 27.1875 -56.7188 33.2812l-243.75 69.6094c-19.6875 5.625 -40.7812 0.234375 -55.3125 -14.2969s-19.9219 -35.625 -14.2969 -55.3125l69.6094 -243.75c6.09375 -21.5625 17.5781 -41.0156 33.2812 -56.7188zM584.531 292.344l-342.188 342.188 l-204.844 -205.078c-43.8281 -43.8281 -43.8281 -115.078 0 -159.141l183.047 -182.812c43.8281 -43.8281 115.078 -43.8281 159.141 0l46.4062 46.4062c-0.703125 0.703125 -1.64062 1.40625 -2.34375 2.10938l-150 150c-14.5312 14.5312 -14.5312 38.4375 0 52.9688 s38.4375 14.5312 52.9688 0l150 -150c0.703125 -0.703125 1.40625 -1.64062 2.10938 -2.34375zM957.656 665.469l105.703 105.703c-0.703125 0.703125 -1.64062 1.40625 -2.34375 2.10938l-150 150c-14.5312 14.5312 -14.5312 38.4375 0 52.9688s38.4375 14.5312 52.9688 0 l150 -150c0.703125 -0.703125 1.40625 -1.64062 2.10938 -2.34375l46.4062 46.6406c43.8281 43.8281 43.8281 115.078 0 159.141l-183.047 182.812c-43.8281 43.8281 -115.078 43.8281 -159.141 0l-204.844 -204.844z"
    },
    "Music": {
      viewBox: "0 0 1300 1300",
      path: "M1169.77 64.7656c18.9844 14.0625 30.2344 36.5625 30.2344 60.2344v168.75v618.75c0 103.594 -100.781 187.5 -225 187.5s-225 -83.9062 -225 -187.5s100.781 -187.5 225 -187.5c26.25 0 51.5625 3.75 75 10.7812v-341.25l-600 180v487.969 c0 103.594 -100.781 187.5 -225 187.5s-225 -83.9062 -225 -187.5s100.781 -187.5 225 -187.5c26.25 0 51.5625 3.75 75 10.7812v-367.031v-168.75c0 -33.0469 21.7969 -62.3438 53.4375 -71.9531l750 -225c22.7344 -6.79688 47.3438 -2.57812 66.3281 11.7188z"
    },
    "News & Politics": {
      viewBox: "0 0 1300 1300",
      path: "M393.75 237.5c-31.1719 0 -56.25 25.0781 -56.25 56.25v712.5c0 19.6875 -3.28125 38.6719 -9.60938 56.25h703.359c31.1719 0 56.25 -25.0781 56.25 -56.25v-712.5c0 -31.1719 -25.0781 -56.25 -56.25 -56.25h-637.5zM168.75 1175 c-93.2812 0 -168.75 -75.4688 -168.75 -168.75v-693.75c0 -31.1719 25.0781 -56.25 56.25 -56.25s56.25 25.0781 56.25 56.25v693.75c0 31.1719 25.0781 56.25 56.25 56.25s56.25 -25.0781 56.25 -56.25v-712.5c0 -93.2812 75.4688 -168.75 168.75 -168.75h637.5 c93.2812 0 168.75 75.4688 168.75 168.75v712.5c0 93.2812 -75.4688 168.75 -168.75 168.75h-862.5zM412.5 368.75c0 -31.1719 25.0781 -56.25 56.25 -56.25h225c31.1719 0 56.25 25.0781 56.25 56.25v187.5c0 31.1719 -25.0781 56.25 -56.25 56.25h-225 c-31.1719 0 -56.25 -25.0781 -56.25 -56.25v-187.5zM881.25 312.5h75c31.1719 0 56.25 25.0781 56.25 56.25s-25.0781 56.25 -56.25 56.25h-75c-31.1719 0 -56.25 -25.0781 -56.25 -56.25s25.0781 -56.25 56.25 -56.25zM881.25 500h75c31.1719 0 56.25 25.0781 56.25 56.25 s-25.0781 56.25 -56.25 56.25h-75c-31.1719 0 -56.25 -25.0781 -56.25 -56.25s25.0781 -56.25 56.25 -56.25zM468.75 687.5h487.5c31.1719 0 56.25 25.0781 56.25 56.25s-25.0781 56.25 -56.25 56.25h-487.5c-31.1719 0 -56.25 -25.0781 -56.25 -56.25 s25.0781 -56.25 56.25 -56.25zM468.75 875h487.5c31.1719 0 56.25 25.0781 56.25 56.25s-25.0781 56.25 -56.25 56.25h-487.5c-31.1719 0 -56.25 -25.0781 -56.25 -56.25s25.0781 -56.25 56.25 -56.25z"
    },
    "Nonprofits": {
      viewBox: "0 0 1400 1400",
      path: "M384.141 370.859c-68.9062 -69.8438 -68.9062 -183.281 0 -253.125s180.469 -69.8438 249.375 0l41.4844 42.1875l41.4844 -42.1875c68.9062 -69.8438 180.469 -69.8438 249.375 0s68.9062 183.281 0 253.125l-238.125 241.875 c-14.5312 14.7656 -33.5156 22.0312 -52.7344 22.0312s-38.2031 -7.26562 -52.7344 -22.0312zM1331.72 838.203c30.7031 41.7188 21.7969 100.312 -19.9219 131.016l-296.719 218.672c-54.8438 40.3125 -120.938 62.1094 -189.141 62.1094h-375.938h-375 c-41.4844 0 -75 -33.5156 -75 -75v-150c0 -41.4844 33.5156 -75 75 -75h86.25l105.234 -84.375c53.2031 -42.6562 119.297 -65.625 187.5 -65.625h183.516h37.5h150c41.4844 0 75 33.5156 75 75s-33.5156 75 -75 75h-150h-37.5c-20.625 0 -37.5 16.875 -37.5 37.5 s16.875 37.5 37.5 37.5h282.656l280.547 -206.719c41.7188 -30.7031 100.312 -21.7969 131.016 19.9219zM453.75 950h-2.10938h2.10938z"
    },
    "People & Blogs": {
      viewBox: "0 0 400 400",
      path: "M32 85v32q0 66 32 121t85 88v101h320v-43q0 -26 -31 -47q-27 -18 -70 -29q-38 -9 -69 -9h-6q-49 0 -92 -25.5t-68.5 -67t-25.5 -89.5v-32h-75zM299 85q-36 0 -61 25t-25 60.5t25 60.5t60.5 25t60.5 -25t25 -60.5t-25 -60.5t-60 -25z"
    },
    "Pets & Animals": {
      viewBox: "0 0 450 450",
      path: "M384 85q-44 0 -71 13q-27 -13 -57 -13t-57 13q-27 -13 -71 -13q-29 0 -56 46q-22 37 -37 93q-14 49 -14 75q0 13 19 24t48 16q11 36 54.5 60.5t102.5 27.5v-92q-32 -20 -32 -36q0 -14 22 -19q10 -3 21 -3l11 1q13 2 21 6q11 5 11 15q0 16 -32 36v92q59 -3 102.5 -27.5 t54.5 -60.5q29 -5 48 -16t19 -24q0 -26 -14 -75q-15 -56 -37 -93q-27 -46 -56 -46zM89 296q-14 -3 -25 -8q3 -28 15 -66q12 -34 26.5 -62t23.5 -32q11 0 27 2h1q-29 33 -49 87q-13 37 -19 79zM192 256q-9 0 -15 -6t-6 -15t6 -15.5t15 -6.5t15 6.5t6 15.5t-6 15t-15 6z M320 256q-9 0 -15 -6t-6 -15t6 -15.5t15 -6.5t15 6.5t6 15.5t-6 15t-15 6zM423 296q-6 -42 -19 -79q-20 -54 -49 -87h1q16 -2 27 -2q9 4 23.5 32t26.5 62q12 38 15 66q-10 5 -25 8z"
    },
    "Science & Tech.": {
      viewBox: "0 0 1400 1400",
      path: "M975 50c41.4844 0 75 33.5156 75 75c0 140.156 -71.0156 251.953 -162.656 343.594c-65.625 65.625 -146.484 125.391 -228.047 181.406l-5.85938 3.98438c-27.8906 18.9844 -55.7812 37.7344 -83.2031 56.0156v0v0v0l-3.75 2.34375 c-14.0625 9.375 -27.8906 18.5156 -41.7188 27.8906c-48.9844 32.8125 -95.625 64.9219 -138.984 97.2656h278.203c-22.9688 -17.3438 -47.1094 -34.4531 -71.9531 -51.7969l16.4062 -11.0156l7.03125 -4.6875c35.3906 -23.6719 72.4219 -48.2812 109.453 -74.0625 c58.5938 42.4219 114.609 87.4219 162.656 135.234c91.4062 91.875 162.422 203.672 162.422 343.828c0 41.4844 -33.5156 75 -75 75s-75 -33.5156 -75 -75h-750c0 41.4844 -33.5156 75 -75 75s-75 -33.5156 -75 -75c0 -140.156 71.0156 -251.953 162.656 -343.594 c65.625 -65.625 146.484 -125.391 228.047 -181.406c-81.5625 -56.0156 -162.422 -115.547 -228.047 -181.406c-91.6406 -91.6406 -162.656 -203.438 -162.656 -343.594c0 -41.4844 33.5156 -75 75 -75s75 33.5156 75 75h750c0 -41.4844 33.5156 -75 75 -75zM793.594 950 h-537.188c-23.6719 24.8438 -43.5938 49.9219 -59.7656 75h656.719c-15.9375 -25.0781 -35.8594 -50.1562 -59.7656 -75zM256.406 350h537.188c23.6719 -25.0781 43.5938 -49.9219 59.7656 -75h-656.719c15.9375 25.0781 35.8594 49.9219 59.7656 75zM386.25 462.5 c43.125 32.3438 90 64.4531 138.984 97.2656c48.9844 -32.8125 95.625 -64.9219 138.984 -97.2656h-278.203h0.234375z"
    },
    "Sports": {
      viewBox: "0 0 1400 1400",
      path: "M202.969 200c75.9375 -66.7969 168.75 -114.844 271.172 -136.875c8.67188 31.6406 13.3594 64.9219 13.3594 99.375c0 90 -31.6406 172.734 -84.8438 237.188zM150 252.969l199.922 199.922c-64.6875 52.9688 -147.422 84.6094 -237.422 84.6094 c-34.4531 0 -67.7344 -4.6875 -99.375 -13.3594c22.0312 -102.422 70.0781 -195.234 136.875 -271.172zM600 50c152.109 0 291.094 56.7188 397.031 150l-397.031 397.031l-143.906 -143.906c66.3281 -78.5156 106.406 -179.766 106.406 -290.625 c0 -37.9688 -4.6875 -75 -13.5938 -110.391c16.875 -1.40625 33.9844 -2.10938 51.0938 -2.10938zM112.5 612.5c110.859 0 212.109 -40.0781 290.625 -106.406l143.906 143.906l-397.031 397.031c-93.2812 -105.938 -150 -244.922 -150 -397.031 c0 -17.1094 0.703125 -34.2188 2.10938 -51.0938c35.3906 8.90625 72.4219 13.5938 110.391 13.5938zM1197.89 701.094c-35.3906 -8.90625 -72.4219 -13.5938 -110.391 -13.5938c-110.859 0 -212.344 40.0781 -290.625 106.406l-143.906 -143.906l397.031 -397.031 c93.2812 105.938 150 244.922 150 397.031c0 17.1094 -0.703125 34.2188 -2.10938 51.0938zM1186.88 775.859c-21.7969 102.656 -70.0781 195.469 -136.875 271.172l-199.922 -199.922c64.6875 -52.9688 147.422 -84.6094 237.422 -84.6094 c34.4531 0 67.7344 4.6875 99.375 13.3594zM797.109 900.078l0.234375 0.234375l199.688 199.688c-75.9375 66.7969 -168.75 114.844 -271.172 136.875c-8.67188 -31.6406 -13.3594 -64.9219 -13.3594 -99.375c0 -90 31.6406 -172.734 84.6094 -237.422zM743.906 846.875 c-66.3281 78.5156 -106.406 179.766 -106.406 290.625c0 37.9688 4.6875 75 13.5938 110.391c-16.875 1.40625 -33.9844 2.10938 -51.0938 2.10938c-152.344 0 -291.328 -56.7188 -397.031 -150l397.031 -397.031z"
    },
    "Travel & Events": {
      viewBox: "0 0 1400 1400",
      path: "M825 650c0 52.0312 -2.8125 102.188 -7.73438 150h-434.531c-5.15625 -47.8125 -7.73438 -97.9688 -7.73438 -150s2.8125 -102.188 7.73438 -150h434.531c5.15625 47.8125 7.73438 97.9688 7.73438 150zM892.5 500h288.516c12.4219 48.0469 18.9844 98.2031 18.9844 150 s-6.5625 101.953 -18.9844 150h-288.516c4.92188 -48.2812 7.5 -98.4375 7.5 -150s-2.57812 -101.719 -7.5 -150zM1156.41 425h-273.516c-23.4375 -149.766 -69.8438 -275.156 -129.609 -355.312c183.516 48.5156 332.812 181.641 402.891 355.312h0.234375zM806.953 425 h-413.906c14.2969 -85.3125 36.3281 -160.781 63.2812 -221.953c24.6094 -55.3125 52.0312 -95.3906 78.5156 -120.703c26.25 -24.8438 48.0469 -32.3438 65.1562 -32.3438s38.9062 7.5 65.1562 32.3438c26.4844 25.3125 53.9062 65.3906 78.5156 120.703 c27.1875 60.9375 48.9844 136.406 63.2812 221.953zM317.109 425h-273.516c70.3125 -173.672 219.375 -306.797 403.125 -355.312c-59.7656 80.1562 -106.172 205.547 -129.609 355.312zM18.9844 500h288.516c-4.92188 48.2812 -7.5 98.4375 -7.5 150 s2.57812 101.719 7.5 150h-288.516c-12.4219 -48.0469 -18.9844 -98.2031 -18.9844 -150s6.5625 -101.953 18.9844 -150zM456.328 1096.72c-27.1875 -60.9375 -48.9844 -136.406 -63.2812 -221.719h413.906c-14.2969 85.3125 -36.3281 160.781 -63.2812 221.719 c-24.6094 55.3125 -52.0312 95.3906 -78.5156 120.703c-26.25 25.0781 -48.0469 32.5781 -65.1562 32.5781s-38.9062 -7.5 -65.1562 -32.3438c-26.4844 -25.3125 -53.9062 -65.3906 -78.5156 -120.703v-0.234375zM317.109 875 c23.4375 149.766 69.8438 275.156 129.609 355.312c-183.75 -48.5156 -332.812 -181.641 -403.125 -355.312h273.516zM1156.41 875c-70.3125 173.672 -219.375 306.797 -402.891 355.312c59.7656 -80.1562 105.938 -205.547 129.609 -355.312h273.281z"
    }
  };

  const ECHARTS_CATEGORY_ORDER = [
    "Autos & Vehicles",
    "Comedy",
    "Education",
    "Entertainment",
    "Film & Animation",
    "Gaming",
    "Howto & Style",
    "Music",
    "News & Politics",
    "Nonprofits & Activism",
    "People & Blogs",
    "Pets & Animals",
    "Science & Technology",
    "Sports",
    "Travel & Events",
  ];

  const LABEL_TO_ECHARTS_NAME: Record<string, string> = {
    "Science & Tech.": "Science & Technology",
    "Nonprofits": "Nonprofits & Activism",
  };

  const CATEGORY_COLORS: Record<string, string> = ECHARTS_CATEGORY_ORDER.reduce((acc, name, idx) => {
    const palette = chartTheme.color ?? [];
    const color = palette[idx % palette.length] || palette[0] || 'var(--ds-text-muted)';
    acc[name] = color;
    return acc;
  }, {} as Record<string, string>);

  function getCategoryColor(label: string): string {
    const key = LABEL_TO_ECHARTS_NAME[label] || label;
    return CATEGORY_COLORS[key] || 'var(--ds-text-muted)';
  }

  let circleRefs: Record<string, HTMLDivElement> = {};

  // Compute max icons for scaling
  const MAX_ICONS = Math.max(...DATA.map(d => {
    const nActive = Math.round((d.active || 0) / UNIT);
    const nInactive = Math.round((d.not_active || 0) / UNIT);
    return nActive + nInactive;
  }));

  const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

  function buildCardData(d: typeof DATA[0]): CardData {
    const active = d.active || 0;
    const notActive = d.not_active || 0;
    const total = active + notActive || 1;
    const pctActive = Math.round((active / total) * 100);
    const pctInactive = Math.round((notActive / total) * 100);

    const nActive = Math.round(active / UNIT);
    const nInactive = Math.round(notActive / UNIT);

    const bands: ('active' | 'inactive')[] = [];
    bands.push(...Array(nActive).fill('active'));
    bands.push(...Array(nInactive).fill('inactive'));

    const nIcons = bands.length;
    const cx = CIRCLE_SIZE / 2;
    const cy = CIRCLE_SIZE / 2;

    const baseMaxR = Math.min(cx, cy) + 6;
    const maxR = baseMaxR * Math.sqrt(nIcons / MAX_ICONS);
    const step = nIcons > 0 ? maxR / Math.sqrt(nIcons) : 0;

    const urlsByBand = {
      active: [...(LINKS[d.id]?.active || [])],
      inactive: [...(LINKS[d.id]?.not_active || [])]
    };

    const icons: IconData[] = bands.map((band, idx) => {
      const r = step * Math.sqrt(idx + 0.5);
      const theta = idx * GOLDEN_ANGLE;
      const x = cx + r * Math.cos(theta) - ICON_WIDTH / 2;
      const y = cy + r * Math.sin(theta) - ICON_HEIGHT / 2;
      const link = urlsByBand[band].shift() || null;
      const url = link?.url || null;
      const label = link?.name || null;

      return { band, x, y, url, label, meta: link, delay: idx * 20 };
    });

    const iconMeta = CATEGORY_ICONS[d.label];
    const iconPath = iconMeta?.path ?? null;
    const iconViewBox = iconMeta?.viewBox ?? "0 0 1400 1400";
    const iconColor = getCategoryColor(d.label);
    return {
      id: d.id,
      label: d.label,
      active,
      notActive,
      total,
      pctActive,
      pctInactive,
      icons,
      iconPath,
      iconViewBox,
      iconColor
    };
  }

  const cards: CardData[] = DATA.map(buildCardData);

  function openChannel(url: string | null) {
    if (url) window.open(url, '_blank');
  }
</script>

<style>
  .activity2-wrap {
    width: min(1200px, 100%);
    margin: var(--ds-space-xl) auto;
    padding: 0;
    background: transparent;
    border: none;
    box-shadow: none;
    position: relative;
  }

  .grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--ds-space-xs);
  }

  .card {
    background: transparent;
    border-radius: 0;
    border: none;
    padding: var(--ds-space-xs) var(--ds-space-xs) var(--ds-space-sm);
    box-shadow: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .helper-text {
    font-size: 0.75rem;
    color: var(--ds-text-muted);
    margin-bottom: var(--ds-space-sm);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  .card-title {
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--ds-text);
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .title-svg {
    width: 18px;
    height: 18px;
  }

  .title-svg path {
    fill: currentColor;
  }

  .stat-inline {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.58rem;
    color: var(--ds-text-muted);
    text-transform: none;
    letter-spacing: 0.05em;
  }

  .header-icon {
    width: 16px;
    height: 10px;
    border-radius: 3px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: linear-gradient(135deg, #1e66f5, #04a5e5);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.2);
  }

  .header-icon.inactive {
    background: linear-gradient(135deg, #d20f39, #e64553);
  }

  .header-icon::before {
    content: "";
    border-style: solid;
    border-width: 1.5px 0 1.5px 3.5px;
    border-color: transparent transparent transparent #ffffff;
  }

  .card-meta {
    font-size: 0.6rem;
    color: var(--ds-text-muted);
    margin-bottom: var(--ds-space-xs);
    padding-left: 2px;
    text-transform: none;
    letter-spacing: 0.5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .circle {
    position: relative;
    width: 170px;
    height: 170px;
    max-width: 100%;
    margin: 0 auto;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(30, 102, 245, 0.16), transparent 70%);
    border: none;
    overflow: visible;
  }

  .circle::after {
    content: "";
    position: absolute;
    inset: 14px;
    border-radius: 50%;
    border: none;
    pointer-events: none;
    z-index: 0;
  }

  .icon {
    position: absolute;
    width: 14px;
    height: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 0 0 rgba(15, 23, 42, 0.4);
    opacity: 0;
    transform: scale(.7) translateY(4px);
    transition: opacity .22s ease-out, transform .22s ease-out,
                box-shadow .18s ease-out;
    border: 1px solid rgba(255,255,255,0.25);
  }

  .icon.active { background: linear-gradient(135deg, #1e66f5, #04a5e5); }
  .icon.inactive { background: linear-gradient(135deg, #d20f39, #e64553); }

  .icon::before {
    content: "";
    border-style: solid;
    border-width: 2px 0 2px 4px;
    border-color: transparent transparent transparent #ffffff;
    margin-left: 0.5px;
    position: relative;
    z-index: 1;
  }

  .icon[data-tooltip]:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 50%;
    top: -10px;
    transform: translate(-50%, -100%);
    background: #0b1222;
    color: #f8fafc;
    border: none;
    border-radius: 12px;
    padding: 10px 12px;
    font-size: 11px;
    line-height: 1.35;
    white-space: pre-line;
    min-width: 200px;
    max-width: 280px;
    word-break: break-word;
    text-align: left;
    pointer-events: none;
    z-index: 400;
    box-shadow: 0 18px 44px rgba(0, 0, 0, 0.6);
  }

  .icon.on {
    opacity: 1;
    transform: scale(1) translateY(0);
    z-index: 2;
  }

  .icon:hover {
    box-shadow: 0 0 0 2px rgba(114,135,253,0.4);
    transform: scale(1.06) translateY(-1px);
    z-index: 500;
  }

  .icon.no-link {
    cursor: default;
    box-shadow: none;
    opacity: 0.35;
  }

  @media (max-width: 640px) {
    .activity2-wrap {
      padding: var(--ds-space-md);
    }
    .circle {
      width: 170px;
      height: 170px;
    }
  }
</style>

<div class="activity2-wrap">
  <div class="grid">
    {#each cards as card}
        <div class="card">
          <div class="card-header">
          <div class="card-title">
            {#if card.iconPath}
              <svg
                class="title-svg"
                viewBox={card.iconViewBox}
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
                focusable="false"
                style="color: {card.iconColor}"
              >
                <path d={card.iconPath}></path>
              </svg>
            {/if}
            <span>{card.label}</span>
          </div>
        </div>
        <div class="card-meta">
          <span>Total channels {(card.total / 1000).toFixed(1)}K</span>
          <span class="stat-inline">
            <span class="header-icon"></span>
            <span>Active {card.pctActive}%</span>
          </span>
          <span class="stat-inline">
            <span class="header-icon inactive"></span>
            <span>Inactive {card.pctInactive}%</span>
          </span>
        </div>
        <div class="circle" bind:this={circleRefs[card.id]}>
          {#each card.icons as icon, idx}
            <div
              class="icon {icon.band}"
              class:on={true}
              class:no-link={!icon.url}
              style="left: {icon.x}px; top: {icon.y}px; animation-delay: {icon.delay}ms;"
              onclick={() => openChannel(icon.url)}
              onkeydown={(e) => { if (e.key === 'Enter') openChannel(icon.url); }}
              role="link"
              tabindex="0"
              data-tooltip={iconTooltip(icon)}
            ></div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
