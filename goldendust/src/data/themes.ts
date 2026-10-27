// Safari-style pages (/safaris/<slug>). Linked from the footer only, not the main menu.
import type { Section } from "./parks";
import type { Tour } from "./tours";

export type Theme = {
  slug: string;
  name: string;
  seoTitle: string;
  description: string;
  h1: string;
  lede: string;
  hero: string;
  heroAlt: string;
  sections: Section[];
  tours: (t: Tour) => boolean;
  faqs: { q: string; a: string }[];
};

export const themes: Theme[] = [
  {
    slug: "private-safari-tanzania",
    name: "Private Tanzania safaris",
    seoTitle: "Private Tanzania Safari with a Local Guide",
    description: "A private safari in Tanzania with your own vehicle and the same local guide who plans your trip. Serengeti, Ngorongoro and Tarangire from Arusha, priced openly.",
    h1: "Private Tanzania safaris with a local guide",
    lede: "Your own vehicle, your own pace, and a guide you've already spoken to before you land. Every safari we run is private.",
    hero: "/images/gallery/guide-view-gazelles-serengeti.webp",
    heroAlt: "View from the guide's seat of gazelles on the Serengeti plains",
    sections: [
      { h: "What private means with us", p: [
        "You never share the vehicle with strangers. You decide when to leave camp, how long to stay with a leopard in a tree, and when it's time for lunch.",
        "We have two guides, not a hundred. The guide who plans your trip with you is the one who meets you at the airport and drives you every day. You know who you're travelling with before you book.",
      ] },
      { h: "Planned around why you're coming", p: [
        "We usually start with a call. Some guests want the Great Migration, some want big cats, some want a slow trip with their children. We explain the parks honestly, including the ones you can skip, and you decide.",
        "If you'd rather plan it yourself, our <a href=\"/planner\">itinerary planner</a> shows the price of your own route instantly, with a full breakdown.",
      ] },
      { h: "Every budget", p: [
        "A private safari doesn't have to be a luxury safari. You can camp in public campsites, stay in comfortable lodges or choose the finest camps in the Serengeti. The vehicle and guide are yours either way.",
      ] },
    ],
    tours: () => true,
    faqs: [
      { q: "How much does a private safari in Tanzania cost?", a: "It depends mostly on the lodges, the season and how many of you there are. Our sample safaris show real prices per person, and the planner prices your own route." },
      { q: "Is a private safari worth it?", a: "For most guests, yes. Your day isn't set by other people in the vehicle, and the guide can plan around what you want to see." },
    ],
  },
  {
    slug: "family-safari-tanzania",
    name: "Family safaris",
    seoTitle: "Family Safari in Tanzania with Kids | Private & Local",
    description: "How we plan family safaris in Tanzania: shorter drives, the right lodges, child park fees and a guide who's great with kids. Private trips from Arusha.",
    h1: "Family safaris in Tanzania",
    lede: "A safari with children needs a different pace. Shorter drives, breaks when they're needed, and lodges where kids are welcome.",
    hero: "/images/gallery/giraffe-acacia-serengeti.webp",
    heroAlt: "A giraffe beside an acacia tree in the Serengeti",
    sections: [
      { h: "How we plan a family safari", p: [
        "We build the days around the children. That often means fewer hours in the vehicle, an afternoon by the pool, and parks that are close together, like Tarangire, Karatu and Ngorongoro Crater.",
        "Because the safari is private, you stop whenever you want. A long sighting of elephants at a waterhole is often the highlight for younger children, and nobody else in the vehicle is waiting to move on.",
      ] },
      { h: "Children's prices", p: [
        "Park fees are lower for children, and many lodges have child rates or family tents. Our planner asks for each child's age so the price is right from the start.",
        "Some camps have a minimum age. Tell us how old your children are and we'll recommend places that suit them.",
      ] },
      { h: "How long?", p: [
        "Five to seven days is a good length for most families. It's long enough to include the Serengeti without rushing, and short enough that nobody gets tired of game drives.",
      ] },
    ],
    tours: (t) => /children/.test(t.travellers) || t.route.includes("Karatu"),
    faqs: [
      { q: "What age is best for a safari in Tanzania?", a: "Children of any age can come on safari, but from about six years old most children enjoy the game drives and can sit in the vehicle for a few hours." },
      { q: "Is a Tanzania safari safe for children?", a: "Yes, with a good guide. You stay in the vehicle during game drives, and we choose lodges that welcome children." },
    ],
  },
  {
    slug: "honeymoon-safari-tanzania",
    name: "Honeymoon safaris",
    seoTitle: "Honeymoon Safari in Tanzania | Private Serengeti & Ngorongoro",
    description: "Plan a private honeymoon safari in Tanzania: special camps in the Serengeti, the Ngorongoro rim and Tarangire, balloon flights and bush breakfasts, with a local guide.",
    h1: "Honeymoon safaris in Tanzania",
    lede: "Quiet camps, wide skies and a vehicle that's just for the two of you. A safari is a wonderful way to start married life.",
    hero: "/images/blog/sunset-acacia.webp",
    heroAlt: "Sunset behind an acacia tree on the Tanzanian plains",
    sections: [
      { h: "Choosing the camps", p: [
        "For a honeymoon, the camp matters as much as the park. We'd suggest a mix: a lodge on the Ngorongoro rim for the view, a smaller tented camp in the Serengeti, and one special night somewhere you'll remember.",
        "Our <a href=\"/lodges\">lodge pages</a> show the camps we work with, with real photos.",
      ] },
      { h: "Little extras", p: [
        "A sunrise hot-air balloon flight over the Serengeti, a bush breakfast after an early game drive, or simply an extra night with no long drives. You can add these in the <a href=\"/planner\">planner</a> or ask us.",
      ] },
      { h: "When to go", p: [
        "June to October is dry and the wildlife is easy to see. January to March is quieter, green and the calving season in the south. Our <a href=\"/great-migration-serengeti\">Great Migration guide</a> helps you pick.",
      ] },
    ],
    tours: (t) => t.tier === "Premium" || t.tier === "Luxury",
    faqs: [
      { q: "How many days for a honeymoon safari?", a: "Five to seven days lets you include the Serengeti and Ngorongoro without long drives every day." },
    ],
  },
  {
    slug: "budget-camping-safari-tanzania",
    name: "Budget camping safaris",
    seoTitle: "Budget Camping Safari in Tanzania | Private, from Arusha",
    description: "A private camping safari in Tanzania's public campsites: what's included, what it's like, and what it really costs. Serengeti, Ngorongoro and Tarangire from Arusha.",
    h1: "Budget camping safaris in Tanzania",
    lede: "Sleep in a tent inside the parks, hear lions at night, and keep the cost down. Camping is the most affordable way to do a real Tanzania safari.",
    hero: "/images/blog/buffalo-acacia.webp",
    heroAlt: "Buffaloes under an acacia tree in Tanzania",
    sections: [
      { h: "What a camping safari is like", p: [
        "You stay in tents in the public campsites inside the parks, such as Seronera in the central Serengeti, Simba on the Ngorongoro rim and the Tarangire campsite. Washrooms are shared and simple.",
        "Because you sleep inside the park, you're already in the middle of the wildlife at sunrise.",
      ] },
      { h: "Still private", p: [
        "A budget safari with us is still a private safari: your own vehicle and the same guide every day. You save on the accommodation, not on the experience.",
      ] },
      { h: "What it costs", p: [
        "Our sample camping safaris show real prices per person, including park fees, campsite fees, the vehicle and your guide. You can also price your own camping route in the <a href=\"/planner\">planner</a>: choose Budget for each night.",
        "For a full breakdown, read <a href=\"/post/budget-safari-tanzania-chasing-the-big-five-on-a-backpacker-s-budget\">our guide to a budget safari</a>.",
      ] },
    ],
    tours: (t) => t.tier === "Budget",
    faqs: [
      { q: "Is camping in the Serengeti safe?", a: "Yes. The public campsites are used every night by safari groups, and your guide knows the rules. You stay in your tent at night." },
      { q: "What is the cheapest way to do a safari in Tanzania?", a: "A camping safari in the public campsites, in the green season, with more people sharing the vehicle." },
    ],
  },
];

export const themeUrl = (t: Theme | string) => `/safaris/${typeof t === "string" ? t : t.slug}`;
