export const site = {
  name: "Golden Dust Safaris",
  url: "https://www.goldendustsafaris.com",
  whatsapp: "255799185811",
  phoneDisplay: "+255 799 185 811",
  instagram: "https://www.instagram.com/goldendustsafaris/",
  instagramHandle: "@goldendustsafaris",
  city: "Arusha",
  country: "TZ",
  logo: "7df076_23c9d5d8eb404c038205431f3e1857f3~mv2.png",
};

export const waLink = (text = "Hi Golden Dust Safaris, I'd like help planning a Tanzania safari.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

import { existsSync } from "node:fs";

// Images: the build first copies every image from the Wix media CDN into public/images
// (scripts/fetch-images.mjs). If a local copy exists it is used; otherwise the Wix URL.
export function img(id: string, w = 1200) {
  if (existsSync(`public/images/${id}`)) return `/images/${id}`;
  return `https://static.wixstatic.com/media/${id}/v1/fit/w_${w},h_${w * 2},q_82,enc_auto/${id}`;
}
