// Guest reviews shown in the homepage carousel. Only reviews rated 4 stars or more are shown.
// Quotes are short excerpts copied from the original review; check them against the source,
// and paste the full text into `text` if you prefer the whole review.
export type Review = {
  source: "Tripadvisor" | "Google";
  rating: number;      // 1–5
  name: string;
  date: string;        // as shown on the review site
  title?: string;
  text: string;
  translated?: boolean;
};

export const reviews: Review[] = [
  { source: "Google", rating: 5, name: "Ajinkya Vadhavkar", date: "March 2026", text: "They took the time to truly understand my needs, gave me a realistic picture of what a real safari is like — not the Instagram version… It felt like planning a trip with a knowledgeable local friend, not a travel company." },
  { source: "Tripadvisor", rating: 5, name: "Emily R", date: "September 2026", title: "The Perfect Safari with Joshua 🐘🌿", text: "You could really tell that he genuinely cares about the wildlife." },
  { source: "Google", rating: 5, name: "מיכאל ציבין", date: "August 2026", text: "Thanks to him we were able to see everything we could have hoped to see, he was also very helpful with positioning us in the right places to take the best pictures. We couldn't have asked for a better guide." },
  { source: "Tripadvisor", rating: 5, name: "Pia S", date: "September 2026", title: "4-Day Serengeti & Ngorongoro Safari with Joshua", text: "Joshua always listened to our wishes and went out of his way to give us some truly special moments." },
  { source: "Google", rating: 5, name: "Tanvi Deshmukh", date: "March 2026", text: "Joshua was an amazing guide, very knowledgeable and friendly. The company also made all the transfers easy and stress-free. Highly recommend!" },
  { source: "Tripadvisor", rating: 5, name: "Will Jackson", date: "July 2026", title: "A safari to never forget", text: "Josh was in his element on the safari plains" },
  { source: "Google", rating: 5, name: "אלכס ציבין", date: "August 2026", text: "Our guide Joshua knew every animal and every bird we asked him and showed exceptional knowledge. We saw so many animals some that we didn't even know were there." },
  { source: "Tripadvisor", rating: 5, name: "Claire S", date: "July 2026", title: "Incredible trip!!", text: "Josh went above and beyond to make sure we could see the animals each location had to offer." },
  { source: "Tripadvisor", rating: 5, name: "Andreas R", date: "September 2026", title: "Incredible.", text: "It was admirable to me how he looks after the well-being of the animals and respects them.", translated: true },
  { source: "Tripadvisor", rating: 5, name: "Resort49630100335", date: "August 2026", title: "6 days safari in the Central-North Serengeti and Ngorongoro with Joshua", text: "He truly enhances the safari experience" },
  { source: "Tripadvisor", rating: 5, name: "Leonie R", date: "September 2026", title: "Joshua is the best!", text: "Joshua made the safari a dream!", translated: true },
];
