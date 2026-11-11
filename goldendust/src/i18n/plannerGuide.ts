// Readable text under the planner (/planner), so search engines and visitors see what the tool does.
// Only facts that are true of the planner and our safaris: no invented prices or promises.
// Sample prices come from PriceBox (src/data/tours.ts), not from here.
import type { Lang } from "./index";

type Guide = {
  h: string;
  intro: string;
  steps: { h: string; p: string }[];
  faqH: string;
  faqs: { q: string; a: string }[];
  moreH: string;
  links: { cost: string; best: string; migration: string; serengeti: string; ngorongoro: string; tarangire: string };
};

export const PLANNER_GUIDE: Record<Lang, Guide> = {
  en: {
    h: "How the Tanzania safari planner works",
    intro: "Most safari websites ask you to fill in a form and wait for a quote. Our planner shows you the price straight away, from the real rates of the camps and lodges we work with in northern Tanzania. You see what each part of the trip costs, change anything you like, and send the plan to your guide when it looks right.",
    steps: [
      { h: "1. Who's travelling", p: "Add adults and children. Children's ages matter, because many camps and parks charge less for them." },
      { h: "2. When you arrive", p: "Pick your arrival date in Arusha or at Kilimanjaro airport and how many nights you have. Your first night, in Arusha or Karatu, is on us." },
      { h: "3. Where to go and where to stay", p: "Choose from Tarangire, Lake Manyara, the Ngorongoro Crater rim, Karatu, Ndutu and the southern, central, western and northern Serengeti. We put them in a sensible order. Then pick a camp or lodge in each area: only places with rates for your dates are shown." },
      { h: "4. See the price and send it", p: "The price per person and for your group updates as you go, split into park fees, vehicle and guide, accommodation, meals and our margin. Send the plan on WhatsApp or download it as a PDF." },
    ],
    faqH: "Questions about planning your safari",
    faqs: [
      { q: "What does the planner price include?", a: "Park fees, your private vehicle and guide, airport transfers, accommodation and meals on safari. International flights, visas, tips and drinks are extra. The price is in US dollars." },
      { q: "Is the price in the planner final?", a: "It is worked out from the current rates of each camp, but camps can fill up. When you send your plan, your guide checks availability and fine-tunes it with you, usually replying on WhatsApp within a few hours." },
      { q: "Where should I go to see the Great Migration?", a: "From about January to March the herds gather to calve on the Ndutu plains and the southern Serengeti. From July they cross the Mara River in the northern Serengeti, where we plan at least two nights. The planner only shows camps that are open on your dates." },
      { q: "Can I plan my safari with a person instead?", a: "Yes, and we encourage it. Most of our guests end up with a custom plan made together with their guide. Message us on WhatsApp with your dates, budget and what you'd like to see." },
    ],
    moreH: "Before you plan",
    links: { cost: "What does a Tanzania safari cost?", best: "The best time to visit Tanzania, month by month", migration: "The Great Migration in the Serengeti", serengeti: "Serengeti National Park", ngorongoro: "Ngorongoro Crater", tarangire: "Tarangire National Park" },
  },
  nl: {
    h: "Zo werkt de safariplanner voor Tanzania",
    intro: "Bij de meeste safaribedrijven vul je een formulier in en wacht je op een offerte. Onze planner laat de prijs meteen zien, berekend met de echte tarieven van de kampen en lodges in Noord-Tanzania waarmee we werken. Je ziet wat elk deel van de reis kost, past aan wat je wilt en stuurt het plan naar je gids als het goed voelt.",
    steps: [
      { h: "1. Wie gaat er mee", p: "Voeg volwassenen en kinderen toe. De leeftijd van kinderen telt, want veel kampen en parken rekenen minder voor hen." },
      { h: "2. Wanneer je aankomt", p: "Kies je aankomstdatum in Arusha of op Kilimanjaro Airport en hoeveel nachten je hebt. Je eerste nacht, in Arusha of Karatu, is van ons." },
      { h: "3. Waarheen en waar je slaapt", p: "Kies uit Tarangire, Lake Manyara, de kraterrand van Ngorongoro, Karatu, Ndutu en de zuidelijke, centrale, westelijke en noordelijke Serengeti. Wij zetten ze in een logische volgorde. Kies daarna in elk gebied een kamp of lodge: je ziet alleen plekken met tarieven voor jouw data." },
      { h: "4. Bekijk de prijs en stuur hem op", p: "De prijs per persoon en voor je groep verandert terwijl je plant, verdeeld over parkkosten, voertuig en gids, accommodatie, maaltijden en onze marge. Stuur het plan via WhatsApp of download het als pdf." },
    ],
    faqH: "Vragen over het plannen van je safari",
    faqs: [
      { q: "Wat zit er in de prijs van de planner?", a: "Parkkosten, je eigen voertuig met gids, transfers van en naar het vliegveld, accommodatie en maaltijden tijdens de safari. Internationale vluchten, visum, fooien en drankjes betaal je apart. De prijs is in Amerikaanse dollars." },
      { q: "Is de prijs in de planner definitief?", a: "Hij is berekend met de actuele tarieven van elk kamp, maar kampen kunnen vol raken. Als je je plan stuurt, controleert je gids de beschikbaarheid en werkt het samen met je uit. Meestal krijg je binnen een paar uur antwoord via WhatsApp." },
      { q: "Waar zie ik de Grote Migratie?", a: "Van ongeveer januari tot maart verzamelen de kuddes zich om te kalven op de vlaktes van Ndutu en in de zuidelijke Serengeti. Vanaf juli steken ze de Mararivier over in de noordelijke Serengeti, waar we minstens twee nachten plannen. De planner toont alleen kampen die op jouw data open zijn." },
      { q: "Kan ik mijn safari ook met iemand samen plannen?", a: "Ja, en dat raden we aan. De meeste gasten kiezen uiteindelijk voor een plan op maat, samen met hun gids. Stuur ons een WhatsApp-bericht met je data, budget en wat je wilt zien." },
    ],
    moreH: "Voordat je gaat plannen",
    links: { cost: "Wat kost een safari in Tanzania?", best: "De beste reistijd voor Tanzania, per maand", migration: "De Grote Migratie in de Serengeti", serengeti: "Serengeti National Park", ngorongoro: "Ngorongorokrater", tarangire: "Tarangire National Park" },
  },
  de: {
    h: "So funktioniert der Tansania-Safariplaner",
    intro: "Bei den meisten Safari-Anbietern füllen Sie ein Formular aus und warten auf ein Angebot. Unser Planer zeigt Ihnen den Preis sofort, berechnet aus den echten Preisen der Camps und Lodges im Norden Tansanias, mit denen wir arbeiten. Sie sehen, was jeder Teil der Reise kostet, ändern, was Sie möchten, und schicken den Plan an Ihren Guide, wenn er passt.",
    steps: [
      { h: "1. Wer reist mit", p: "Fügen Sie Erwachsene und Kinder hinzu. Das Alter der Kinder zählt, denn viele Camps und Parks berechnen für sie weniger." },
      { h: "2. Wann Sie ankommen", p: "Wählen Sie Ihr Ankunftsdatum in Arusha oder am Kilimanjaro Airport und wie viele Nächte Sie haben. Die erste Nacht, in Arusha oder Karatu, geht auf uns." },
      { h: "3. Wohin und wo Sie übernachten", p: "Wählen Sie aus Tarangire, Lake Manyara, dem Kraterrand des Ngorongoro, Karatu, Ndutu und der südlichen, zentralen, westlichen und nördlichen Serengeti. Wir bringen sie in eine sinnvolle Reihenfolge. Dann wählen Sie in jedem Gebiet ein Camp oder eine Lodge: Es erscheinen nur Unterkünfte mit Preisen für Ihre Reisedaten." },
      { h: "4. Preis ansehen und abschicken", p: "Der Preis pro Person und für Ihre Gruppe ändert sich beim Planen, aufgeteilt in Parkgebühren, Fahrzeug und Guide, Unterkunft, Mahlzeiten und unsere Marge. Schicken Sie den Plan per WhatsApp oder laden Sie ihn als PDF herunter." },
    ],
    faqH: "Fragen zur Planung Ihrer Safari",
    faqs: [
      { q: "Was ist im Preis des Planers enthalten?", a: "Parkgebühren, Ihr eigenes Fahrzeug mit Guide, Flughafentransfers, Unterkunft und Mahlzeiten auf Safari. Internationale Flüge, Visum, Trinkgelder und Getränke kommen hinzu. Der Preis ist in US-Dollar." },
      { q: "Ist der Preis im Planer endgültig?", a: "Er wird aus den aktuellen Preisen jedes Camps berechnet, aber Camps können ausgebucht sein. Wenn Sie Ihren Plan schicken, prüft Ihr Guide die Verfügbarkeit und stimmt ihn mit Ihnen ab, meist mit einer Antwort per WhatsApp innerhalb weniger Stunden." },
      { q: "Wo sehe ich die Große Migration?", a: "Von etwa Januar bis März sammeln sich die Herden zum Kalben in den Ebenen von Ndutu und der südlichen Serengeti. Ab Juli überqueren sie den Mara-Fluss in der nördlichen Serengeti, wo wir mindestens zwei Nächte planen. Der Planer zeigt nur Camps, die zu Ihren Reisedaten geöffnet sind." },
      { q: "Kann ich meine Safari auch mit einem Menschen planen?", a: "Ja, und das empfehlen wir. Die meisten Gäste entscheiden sich am Ende für einen individuellen Plan, zusammen mit ihrem Guide. Schreiben Sie uns per WhatsApp Ihre Reisedaten, Ihr Budget und was Sie sehen möchten." },
    ],
    moreH: "Bevor Sie planen",
    links: { cost: "Was kostet eine Safari in Tansania?", best: "Die beste Reisezeit für Tansania, Monat für Monat", migration: "Die Große Migration in der Serengeti", serengeti: "Serengeti-Nationalpark", ngorongoro: "Ngorongoro-Krater", tarangire: "Tarangire-Nationalpark" },
  },
  fr: {
    h: "Comment fonctionne le planificateur de safari en Tanzanie",
    intro: "Chez la plupart des agences de safari, vous remplissez un formulaire et attendez un devis. Notre planificateur affiche le prix tout de suite, calculé à partir des vrais tarifs des camps et lodges du nord de la Tanzanie avec lesquels nous travaillons. Vous voyez ce que coûte chaque partie du voyage, vous changez ce que vous voulez et vous envoyez le plan à votre guide quand il vous convient.",
    steps: [
      { h: "1. Qui voyage", p: "Ajoutez les adultes et les enfants. L'âge des enfants compte, car beaucoup de camps et de parcs leur font un prix plus bas." },
      { h: "2. Quand vous arrivez", p: "Choisissez votre date d'arrivée à Arusha ou à l'aéroport du Kilimandjaro et votre nombre de nuits. Votre première nuit, à Arusha ou à Karatu, est offerte." },
      { h: "3. Où aller et où dormir", p: "Choisissez parmi Tarangire, le lac Manyara, le bord du cratère du Ngorongoro, Karatu, Ndutu et le Serengeti sud, central, ouest et nord. Nous les mettons dans un ordre logique. Puis choisissez un camp ou un lodge dans chaque zone : seuls ceux qui ont des tarifs pour vos dates apparaissent." },
      { h: "4. Voir le prix et l'envoyer", p: "Le prix par personne et pour votre groupe se met à jour au fil de vos choix, détaillé en droits d'entrée, véhicule et guide, hébergement, repas et notre marge. Envoyez le plan sur WhatsApp ou téléchargez-le en PDF." },
    ],
    faqH: "Questions sur la préparation de votre safari",
    faqs: [
      { q: "Que comprend le prix du planificateur ?", a: "Les droits d'entrée des parcs, votre véhicule privé avec guide, les transferts aéroport, l'hébergement et les repas pendant le safari. Les vols internationaux, le visa, les pourboires et les boissons sont en plus. Le prix est en dollars américains." },
      { q: "Le prix du planificateur est-il définitif ?", a: "Il est calculé à partir des tarifs actuels de chaque camp, mais les camps peuvent être complets. Quand vous envoyez votre plan, votre guide vérifie les disponibilités et l'ajuste avec vous, en répondant en général sur WhatsApp en quelques heures." },
      { q: "Où voir la Grande Migration ?", a: "De janvier à mars environ, les troupeaux se rassemblent pour mettre bas dans les plaines de Ndutu et le sud du Serengeti. À partir de juillet, ils traversent la rivière Mara dans le nord du Serengeti, où nous prévoyons au moins deux nuits. Le planificateur ne montre que les camps ouverts à vos dates." },
      { q: "Puis-je préparer mon safari avec quelqu'un ?", a: "Oui, et nous vous le conseillons. La plupart de nos voyageurs finissent par un plan sur mesure, préparé avec leur guide. Écrivez-nous sur WhatsApp avec vos dates, votre budget et ce que vous aimeriez voir." },
    ],
    moreH: "Avant de commencer",
    links: { cost: "Combien coûte un safari en Tanzanie ?", best: "La meilleure période pour la Tanzanie, mois par mois", migration: "La Grande Migration dans le Serengeti", serengeti: "Parc national du Serengeti", ngorongoro: "Cratère du Ngorongoro", tarangire: "Parc national de Tarangire" },
  },
};
