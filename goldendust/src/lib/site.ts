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

  // Instagram live feed via Behold (behold.so, free plan). Paste your feed ID here to switch it on.
  instagramFeedId: "",

  // Reviews. Paste your profile links to show the review buttons.
  tripadvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g297913-d34516684-Reviews-GOLDEN_DUST_SAFARIS-Arusha_Arusha_Region.html",
  googleReviewsUrl: "https://share.google/zsm5yBScSxpGKpaIr",
  // Tripadvisor reviews widget: shown on the site only while the overall rating is 4 or higher.
  // Update tripadvisorRating if the rating on Tripadvisor changes (5.0 from 8 reviews on 17 Oct 2026).
  tripadvisorLocationId: "34516684",
  tripadvisorRating: 5.0,
  tripadvisorMinRating: 4,
  // Optional: a reviews widget (e.g. Trustindex or Elfsight) that shows Google and TripAdvisor reviews.
  // Paste the widget's script URL here; leave empty to show only the buttons above.
  reviewsWidgetScript: "",
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
