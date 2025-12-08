import { writable } from "svelte/store";
export const selectedCat = writable<string | null>(null);
export const ytCategories = [
  { id: "autos",         name: "Autos & Vehicles",     icon: "" },
  { id: "comedy",        name: "Comedy",               icon: "" },
  { id: "education",     name: "Education",            icon: "󰑴" },
  { id: "entertainment", name: "Entertainment",        icon: "󰻏" },
  { id: "film",          name: "Film & Animation",     icon: "" },
  { id: "gaming",        name: "Gaming",               icon: "󰮂" },
  { id: "howto",         name: "Howto & Style",        icon: "" },
  { id: "music",         name: "Music",                icon: "󰝚" },
  { id: "news",          name: "News & Politics",      icon: "" },
  { id: "nonprofits",    name: "Nonprofits & Activism",icon: "" },
  { id: "people",        name: "People & Blogs",       icon: "󰙊" },
  { id: "pets",          name: "Pets & Animals",       icon: "󰩃" },
  { id: "science",       name: "Science & Technology", icon: "" },
  { id: "sports",        name: "Sports",               icon: "" },
  { id: "travel",        name: "Travel & Events",      icon: "" },
];
export const selectedActiveInactive = writable<number>(0);
export const selectedGraph = writable<number | null>(null);
