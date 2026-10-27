// General FAQs, shown on the Blogs page (with FAQ schema for Google).
export const faqs = [
  {
    q: "How much does a Tanzania safari with Golden Dust Safaris cost?",
    a: "Our private safaris start at $800 per person for a 4-day Serengeti and Ngorongoro camping safari (group of 6). A 5-day Tarangire, Serengeti and Ngorongoro safari starts at $1,050 per person on a budget and $1,620 mid-range. The price per person drops as your group gets bigger, because you share the vehicle and the crater fee.",
  },
  {
    q: "Can you build a custom safari instead of a package?",
    a: "Yes. Most of our guests end up with a custom plan. Tell us your dates, budget and what you want to see on WhatsApp, and we'll suggest parks and an itinerary, including less-visited parks like Ruaha and Katavi.",
  },
  {
    q: "Will you review a quote from another safari company?",
    a: "Yes, for free. Send it to us and we'll tell you honestly whether it's good value, even if you end up booking with them.",
  },
  {
    q: "What happens when I land in Tanzania?",
    a: "We pick you up at Kilimanjaro or Arusha airport, take you to your hotel (the night before your safari is on us), and your guide briefs you on the days ahead. After the safari we drop you at the airport or your hotel.",
  },
];

import type { Lang } from "../i18n";
const FAQS_I18N: Record<Exclude<Lang, "en">, { q: string; a: string }[]> = {
  nl: [
    { q: "Wat kost een safari in Tanzania met Golden Dust Safaris?", a: "Onze privésafari's beginnen bij $800 per persoon voor een 4-daagse kampeersafari naar de Serengeti en Ngorongoro (groep van 6). Een 5-daagse safari naar Tarangire, de Serengeti en Ngorongoro begint bij $1.050 per persoon met een klein budget en $1.620 in de middenklasse. Hoe groter je groep, hoe lager de prijs per persoon, omdat je het voertuig en de kosten voor de krater deelt." },
    { q: "Kunnen jullie een safari op maat maken in plaats van een pakket?", a: "Ja. De meeste gasten kiezen uiteindelijk voor een plan op maat. Vertel ons via WhatsApp je data, budget en wat je wilt zien, dan stellen we parken en een reisplan voor, ook minder bezochte parken zoals Ruaha en Katavi." },
    { q: "Willen jullie een offerte van een ander safaribedrijf bekijken?", a: "Ja, gratis. Stuur hem naar ons, dan vertellen we je eerlijk of het een goede prijs is, ook als je uiteindelijk bij hen boekt." },
    { q: "Wat gebeurt er als ik in Tanzania land?", a: "We halen je op van Kilimanjaro Airport of het vliegveld van Arusha en brengen je naar je hotel (de nacht voor je safari is van ons), en je gids vertelt je wat je de komende dagen kunt verwachten. Na de safari brengen we je naar het vliegveld of je hotel." },
  ],
  de: [
    { q: "Was kostet eine Safari in Tansania mit Golden Dust Safaris?", a: "Unsere Privatsafaris beginnen bei $800 pro Person für eine 4-tägige Camping-Safari in die Serengeti und zum Ngorongoro (Gruppe von 6). Eine 5-tägige Safari zum Tarangire, in die Serengeti und zum Ngorongoro beginnt bei $1.050 pro Person im Budget-Stil und bei $1.620 in der Mittelklasse. Je größer Ihre Gruppe, desto niedriger der Preis pro Person, weil Sie sich das Fahrzeug und die Kratergebühr teilen." },
    { q: "Können Sie statt eines Pakets eine individuelle Safari planen?", a: "Ja. Die meisten unserer Gäste entscheiden sich am Ende für einen individuellen Plan. Nennen Sie uns per WhatsApp Ihre Reisedaten, Ihr Budget und was Sie sehen möchten, und wir schlagen Parks und einen Reiseverlauf vor, auch weniger besuchte Parks wie Ruaha und Katavi." },
    { q: "Prüfen Sie auch ein Angebot eines anderen Safarianbieters?", a: "Ja, kostenlos. Schicken Sie es uns, und wir sagen Ihnen ehrlich, ob es ein gutes Angebot ist, auch wenn Sie am Ende dort buchen." },
    { q: "Was passiert, wenn ich in Tansania lande?", a: "Wir holen Sie am Kilimanjaro International Airport oder am Flughafen Arusha ab und bringen Sie zu Ihrem Hotel (die Nacht vor der Safari übernehmen wir), und Ihr Guide bespricht mit Ihnen die nächsten Tage. Nach der Safari bringen wir Sie zum Flughafen oder zu Ihrem Hotel." },
  ],
  fr: [
    { q: "Combien coûte un safari en Tanzanie avec Golden Dust Safaris ?", a: "Nos safaris privés commencent à 800 $ par personne pour un safari camping de 4 jours au Serengeti et au Ngorongoro (groupe de 6). Un safari de 5 jours à Tarangire, au Serengeti et au Ngorongoro commence à 1 050 $ par personne en version économique et à 1 620 $ en gamme intermédiaire. Plus le groupe est grand, plus le prix par personne baisse, car vous partagez le véhicule et les frais du cratère." },
    { q: "Pouvez-vous créer un safari sur mesure plutôt qu'un forfait ?", a: "Oui. La plupart de nos voyageurs finissent avec un programme sur mesure. Donnez-nous sur WhatsApp vos dates, votre budget et ce que vous voulez voir, et nous vous proposerons des parcs et un itinéraire, y compris des parcs moins fréquentés comme Ruaha et Katavi." },
    { q: "Pouvez-vous examiner le devis d'une autre agence de safari ?", a: "Oui, gratuitement. Envoyez-le-nous et nous vous dirons honnêtement s'il est intéressant, même si vous réservez finalement chez eux." },
    { q: "Que se passe-t-il quand j'atterris en Tanzanie ?", a: "Nous venons vous chercher à l'aéroport du Kilimandjaro ou d'Arusha et vous conduisons à votre hôtel (la nuit avant le safari est offerte), et votre guide vous présente les jours à venir. Après le safari, nous vous déposons à l'aéroport ou à votre hôtel." },
  ],
};
export const faqsFor = (lang: Lang) => (lang === "en" ? faqs : FAQS_I18N[lang]);
