import raw from "./tours.wix.json";

export type Day = { title: string; text: string; overnight: string };
export type Tour = {
  slug: string;
  oldSlug: string | null;
  name: string;
  tier: string;
  intro: string;
  days: Day[];
  prices: Record<string, number>;
  image: string;
  imageAlt: string;
  // added for the new site
  shortName: string;
  nights: number;
  route: string[];
  seoTitle: string;
  description: string;
  summary: string;
  stay: string;
};

// SEO titles, descriptions and route data written for the new site.
const extra: Record<string, Partial<Tour>> = {
  "tarangire-serengeti-ngorongoro-safari-5d4n-budget": {
    shortName: "Tarangire, Serengeti & Ngorongoro",
    nights: 4,
    route: ["Arusha", "Tarangire", "Serengeti", "Ngorongoro", "Arusha"],
    seoTitle: "5-Day Budget Tanzania Safari: Tarangire, Serengeti & Ngorongoro",
    description:
      "Private 5-day budget safari from Arusha to Tarangire, the Serengeti and Ngorongoro Crater. From $1,050 per person, with a local guide and your own 4x4.",
    summary:
      "The classic Northern Circuit on a budget: elephants in Tarangire, two days of big cats on the Serengeti plains and an early descent into Ngorongoro Crater.",
    stay: "Tented camps and budget lodges",
  },
  "tarangire-serengeti-ngorongoro-safari-5d4n-mid-range": {
    shortName: "Tarangire, Serengeti & Ngorongoro",
    nights: 4,
    route: ["Arusha", "Tarangire", "Serengeti", "Ngorongoro", "Arusha"],
    seoTitle: "5-Day Mid-Range Tanzania Safari: Tarangire, Serengeti & Ngorongoro",
    description:
      "Private 5-day mid-range safari to Tarangire, the Serengeti and Ngorongoro Crater with comfortable lodges and tented camps. From $1,620 per person.",
    summary:
      "The same Northern Circuit route with more comfort: lodges and permanent tented camps, a full day on the Serengeti and a crater-rim night before Ngorongoro.",
    stay: "Mid-range lodges and tented camps",
  },
  "serengeti-ngorongoro-safari-4d-3n-budget": {
    shortName: "Serengeti & Ngorongoro camping",
    nights: 3,
    route: ["Arusha", "Serengeti", "Ngorongoro", "Arusha"],
    seoTitle: "4-Day Budget Serengeti & Ngorongoro Camping Safari from $800",
    description:
      "Private 4-day Serengeti and Ngorongoro camping safari from Arusha with your own guide and chef. Public campsites, early crater descent. From $800 per person.",
    summary:
      "A private camping safari with your own guide and chef: two nights on the Serengeti, a night on the crater rim and an early, uncrowded crater descent.",
    stay: "Public campsites, with a chef",
  },
  "serengeti-ngorongoro-safari-3d2n-mid-range": {
    shortName: "Serengeti & Ngorongoro",
    nights: 2,
    route: ["Arusha", "Serengeti", "Ngorongoro", "Arusha"],
    seoTitle: "3-Day Mid-Range Serengeti & Ngorongoro Safari from $1,000",
    description:
      "Short on time? A private 3-day Serengeti and Ngorongoro Crater safari from Arusha, staying at Enkiterata Camp and Ngorongoro Wild Camp. From $1,000 per person.",
    summary:
      "The shortest way to see both icons: a night in the central Serengeti, a night near the crater, and a morning inside Ngorongoro Crater.",
    stay: "Enkiterata Camp and Ngorongoro Wild Camp",
  },
};

// Content corrections carried over from the Wix version.
function fixDay(slug: string, d: Day): Day {
  if (slug.endsWith("5d4n-budget") && d.overnight === "Mid-range lodge / tented camp") {
    return { ...d, overnight: "Budget tented camp / lodge" };
  }
  return {
    ...d,
    text: d.text.replace("like Ballon Safari,", "like a hot-air balloon safari (extra cost),"),
  };
}

export const tours: Tour[] = (raw as any[]).map((t) => ({
  ...t,
  ...extra[t.slug],
  days: t.days.map((d: Day) => fixDay(t.slug, d)),
}));

export const fromPrice = (t: Tour) => Math.min(...Object.values(t.prices));
export const usd = (n: number) => "$" + n.toLocaleString("en-US");
export const tourUrl = (t: Tour) => `/product-page/${t.slug}`;
