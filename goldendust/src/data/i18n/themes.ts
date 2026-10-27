// Dutch, German and French text for the safari-style pages (src/data/themes.ts).
import type { Theme } from "../themes";

type ThemeText = Pick<Theme, "name" | "seoTitle" | "description" | "h1" | "lede" | "heroAlt" | "sections" | "faqs">;
type Lang3 = "nl" | "de" | "fr";

export const THEMES_I18N: Record<Lang3, Record<string, ThemeText>> = {
  nl: {
    "private-safari-tanzania": {
      name: "Privésafari's in Tanzania",
      seoTitle: "Privésafari in Tanzania met een lokale gids",
      description: "Een privésafari in Tanzania met je eigen voertuig en dezelfde lokale gids die je reis met je plant. Serengeti, Ngorongoro en Tarangire vanuit Arusha, met open prijzen.",
      h1: "Privésafari's in Tanzania met een lokale gids",
      lede: "Je eigen voertuig, je eigen tempo, en een gids die je al hebt gesproken voordat je landt. Elke safari die we doen is privé.",
      heroAlt: "Uitzicht vanaf de stoel van de gids op gazellen op de vlaktes van de Serengeti",
      sections: [
        { h: "Wat privé bij ons betekent", p: [
          "Je deelt het voertuig nooit met vreemden. Jij bepaalt wanneer je het kamp verlaat, hoelang je bij een luipaard in een boom blijft en wanneer het tijd is voor de lunch.",
          "We hebben twee gidsen, niet honderd. De gids die je reis met je plant, is degene die je ophaalt van het vliegveld en je elke dag rondrijdt. Je weet met wie je reist voordat je boekt.",
        ] },
        { h: "Gepland rond de reden van je reis", p: [
          "Meestal beginnen we met een gesprek. Sommige gasten willen de Grote Migratie zien, anderen de grote katten, en weer anderen willen een rustige reis met hun kinderen. We leggen de parken eerlijk uit, ook welke je kunt overslaan, en jij beslist.",
          "Plan je liever zelf? Onze <a href=\"/planner\">reisplanner</a> laat meteen de prijs van je eigen route zien, met een volledig overzicht van de kosten.",
        ] },
        { h: "Voor elk budget", p: [
          "Een privésafari hoeft geen luxesafari te zijn. Je kunt kamperen op openbare campings, in comfortabele lodges slapen of kiezen voor de mooiste kampen van de Serengeti. Het voertuig en de gids zijn hoe dan ook van jou.",
        ] },
      ],
      faqs: [
        { q: "Wat kost een privésafari in Tanzania?", a: "Dat hangt vooral af van de lodges, het seizoen en met hoeveel mensen je bent. Onze voorbeeldsafari's tonen echte prijzen per persoon, en de reisplanner berekent de prijs van je eigen route." },
        { q: "Is een privésafari de moeite waard?", a: "Voor de meeste gasten wel. Je dag wordt niet bepaald door andere mensen in het voertuig, en de gids kan de reis plannen rond wat jij wilt zien." },
      ],
    },
    "family-safari-tanzania": {
      name: "Gezinssafari's",
      seoTitle: "Gezinssafari in Tanzania met kinderen | Privé en lokaal",
      description: "Zo plannen we een gezinssafari in Tanzania: kortere ritten, de juiste lodges, kinderprijzen voor de parken en een gids die goed is met kinderen. Privéreizen vanuit Arusha.",
      h1: "Gezinssafari's in Tanzania",
      lede: "Een safari met kinderen vraagt om een ander tempo. Kortere ritten, pauzes wanneer dat nodig is, en lodges waar kinderen welkom zijn.",
      heroAlt: "Een giraffe naast een acacia in de Serengeti",
      sections: [
        { h: "Zo plannen we een gezinssafari", p: [
          "We bouwen de dagen rond de kinderen. Dat betekent vaak minder uren in het voertuig, een middag bij het zwembad en parken die dicht bij elkaar liggen, zoals Tarangire, Karatu en de Ngorongorokrater.",
          "Omdat de safari privé is, stop je wanneer je wilt. Lang kijken naar olifanten bij een waterpoel is voor jonge kinderen vaak het hoogtepunt, en er zit niemand anders in het voertuig die verder wil.",
        ] },
        { h: "Prijzen voor kinderen", p: [
          "De parkkosten zijn lager voor kinderen, en veel lodges hebben kindertarieven of familietenten. Onze reisplanner vraagt naar de leeftijd van elk kind, zodat de prijs meteen klopt.",
          "Sommige kampen hebben een minimumleeftijd. Vertel ons hoe oud je kinderen zijn, dan raden we plekken aan die bij jullie passen.",
        ] },
        { h: "Hoelang?", p: [
          "Vijf tot zeven dagen is voor de meeste gezinnen een goede lengte. Lang genoeg om zonder haast de Serengeti mee te nemen, en kort genoeg om de game drives niet beu te worden.",
        ] },
      ],
      faqs: [
        { q: "Wat is de beste leeftijd voor een safari in Tanzania?", a: "Kinderen van elke leeftijd kunnen mee op safari, maar vanaf ongeveer zes jaar genieten de meeste kinderen van de game drives en kunnen ze een paar uur in het voertuig zitten." },
        { q: "Is een safari in Tanzania veilig voor kinderen?", a: "Ja, met een goede gids. Je blijft tijdens de game drives in het voertuig, en we kiezen lodges waar kinderen welkom zijn." },
      ],
    },
    "honeymoon-safari-tanzania": {
      name: "Huwelijksreis op safari",
      seoTitle: "Huwelijksreis op safari in Tanzania | Privé in de Serengeti en Ngorongoro",
      description: "Plan een huwelijksreis op privésafari in Tanzania: bijzondere kampen in de Serengeti, op de kraterrand van Ngorongoro en in Tarangire, ballonvaarten en ontbijt in de bush, met een lokale gids.",
      h1: "Huwelijksreis op safari in Tanzania",
      lede: "Rustige kampen, een weidse hemel en een voertuig voor jullie tweeën. Een safari is een prachtige manier om aan je huwelijk te beginnen.",
      heroAlt: "Zonsondergang achter een acacia op de vlaktes van Tanzania",
      sections: [
        { h: "De kampen kiezen", p: [
          "Bij een huwelijksreis is het kamp net zo belangrijk als het park. We stellen meestal een mix voor: een lodge op de kraterrand van Ngorongoro voor het uitzicht, een kleiner tentenkamp in de Serengeti en één bijzondere nacht die je nooit vergeet.",
          "Op onze <a href=\"/lodges\">lodgepagina's</a> zie je de kampen waarmee we werken, met echte foto's.",
        ] },
        { h: "Kleine extra's", p: [
          "Een ballonvaart bij zonsopgang boven de Serengeti, een ontbijt in de bush na een vroege game drive, of gewoon een extra nacht zonder lange ritten. Je kunt ze toevoegen in de <a href=\"/planner\">reisplanner</a> of het ons vragen.",
        ] },
        { h: "Wanneer ga je?", p: [
          "Van juni tot oktober is het droog en zie je de dieren makkelijk. Januari tot maart is rustiger en groen, en dan is het kalfseizoen in het zuiden. Onze <a href=\"/great-migration-serengeti\">gids over de Grote Migratie</a> helpt je kiezen.",
        ] },
      ],
      faqs: [
        { q: "Hoeveel dagen voor een huwelijksreis op safari?", a: "Met vijf tot zeven dagen kun je de Serengeti en Ngorongoro meenemen zonder elke dag lange ritten." },
      ],
    },
    "budget-camping-safari-tanzania": {
      name: "Budget-kampeersafari's",
      seoTitle: "Budget-kampeersafari in Tanzania | Privé, vanuit Arusha",
      description: "Een privé-kampeersafari op de openbare campings van Tanzania: wat inbegrepen is, hoe het is en wat het echt kost. Serengeti, Ngorongoro en Tarangire vanuit Arusha.",
      h1: "Budget-kampeersafari's in Tanzania",
      lede: "Slaap in een tent midden in de parken, hoor 's nachts de leeuwen en houd de kosten laag. Kamperen is de voordeligste manier om een echte safari in Tanzania te maken.",
      heroAlt: "Buffels onder een acacia in Tanzania",
      sections: [
        { h: "Hoe is een kampeersafari?", p: [
          "Je slaapt in tenten op de openbare campings in de parken, zoals Seronera in de centrale Serengeti, Simba op de kraterrand van Ngorongoro en de camping van Tarangire. De sanitaire voorzieningen worden gedeeld en zijn eenvoudig.",
          "Omdat je in het park slaapt, zit je bij zonsopgang al midden tussen de dieren.",
        ] },
        { h: "Nog steeds privé", p: [
          "Een budgetsafari bij ons is nog steeds een privésafari: je eigen voertuig en elke dag dezelfde gids. Je bespaart op de overnachtingen, niet op de beleving.",
        ] },
        { h: "Wat het kost", p: [
          "Onze voorbeeld-kampeersafari's tonen echte prijzen per persoon, inclusief parkkosten, campingkosten, het voertuig en je gids. Je kunt ook je eigen kampeerroute berekenen in de <a href=\"/planner\">reisplanner</a>: kies voor elke nacht Budget.",
          "Voor een volledig overzicht lees je <a href=\"/post/budget-safari-tanzania-chasing-the-big-five-on-a-backpacker-s-budget\">onze gids over een budgetsafari</a>.",
        ] },
      ],
      faqs: [
        { q: "Is kamperen in de Serengeti veilig?", a: "Ja. De openbare campings worden elke nacht door safarigroepen gebruikt, en je gids kent de regels. 's Nachts blijf je in je tent." },
        { q: "Wat is de goedkoopste manier om op safari te gaan in Tanzania?", a: "Een kampeersafari op de openbare campings, in het groene seizoen, met meer mensen die het voertuig delen." },
      ],
    },
  },

  de: {
    "private-safari-tanzania": {
      name: "Privatsafaris in Tansania",
      seoTitle: "Privatsafari in Tansania mit einheimischem Guide",
      description: "Eine Privatsafari in Tansania mit eigenem Fahrzeug und demselben einheimischen Guide, der Ihre Reise mit Ihnen plant. Serengeti, Ngorongoro und Tarangire ab Arusha, mit offenen Preisen.",
      h1: "Privatsafaris in Tansania mit einheimischem Guide",
      lede: "Ihr eigenes Fahrzeug, Ihr eigenes Tempo und ein Guide, mit dem Sie schon vor der Landung gesprochen haben. Jede unserer Safaris ist privat.",
      heroAlt: "Blick vom Fahrersitz des Guides auf Gazellen in der Serengeti",
      sections: [
        { h: "Was privat bei uns bedeutet", p: [
          "Sie teilen das Fahrzeug nie mit Fremden. Sie entscheiden, wann Sie das Camp verlassen, wie lange Sie bei einem Leoparden im Baum bleiben und wann es Zeit fürs Mittagessen ist.",
          "Wir haben zwei Guides, nicht hundert. Der Guide, der Ihre Reise mit Ihnen plant, holt Sie auch am Flughafen ab und fährt Sie jeden Tag. Sie wissen, mit wem Sie reisen, bevor Sie buchen.",
        ] },
        { h: "Geplant nach dem, warum Sie kommen", p: [
          "Meist beginnen wir mit einem Gespräch. Manche Gäste möchten die Große Migration sehen, manche die Großkatzen, andere eine ruhige Reise mit ihren Kindern. Wir erklären die Parks ehrlich, auch die, die Sie auslassen können, und Sie entscheiden.",
          "Wenn Sie lieber selbst planen, zeigt Ihnen unser <a href=\"/planner\">Reiseplaner</a> sofort den Preis Ihrer eigenen Route, mit vollständiger Aufschlüsselung.",
        ] },
        { h: "Für jedes Budget", p: [
          "Eine Privatsafari muss keine Luxussafari sein. Sie können auf öffentlichen Campingplätzen zelten, in komfortablen Lodges wohnen oder die besten Camps der Serengeti wählen. Fahrzeug und Guide gehören in jedem Fall nur Ihnen.",
        ] },
      ],
      faqs: [
        { q: "Was kostet eine Privatsafari in Tansania?", a: "Das hängt vor allem von den Lodges, der Saison und der Gruppengröße ab. Unsere Beispielsafaris zeigen echte Preise pro Person, und der Reiseplaner berechnet Ihre eigene Route." },
        { q: "Lohnt sich eine Privatsafari?", a: "Für die meisten Gäste ja. Ihr Tag richtet sich nicht nach anderen Mitreisenden, und der Guide kann alles darauf ausrichten, was Sie sehen möchten." },
      ],
    },
    "family-safari-tanzania": {
      name: "Familiensafaris",
      seoTitle: "Familiensafari in Tansania mit Kindern | Privat und lokal",
      description: "So planen wir Familiensafaris in Tansania: kürzere Fahrten, die richtigen Lodges, Kinderpreise in den Parks und ein Guide, der gut mit Kindern umgehen kann. Privatreisen ab Arusha.",
      h1: "Familiensafaris in Tansania",
      lede: "Eine Safari mit Kindern braucht ein anderes Tempo. Kürzere Fahrten, Pausen, wann immer sie nötig sind, und Lodges, in denen Kinder willkommen sind.",
      heroAlt: "Eine Giraffe neben einer Akazie in der Serengeti",
      sections: [
        { h: "So planen wir eine Familiensafari", p: [
          "Wir richten die Tage nach den Kindern aus. Das bedeutet oft weniger Stunden im Fahrzeug, einen Nachmittag am Pool und Parks, die nah beieinander liegen, wie Tarangire, Karatu und der Ngorongoro-Krater.",
          "Weil die Safari privat ist, halten Sie an, wann immer Sie möchten. Eine lange Beobachtung von Elefanten am Wasserloch ist für kleinere Kinder oft das Highlight, und niemand sonst im Fahrzeug will weiterfahren.",
        ] },
        { h: "Preise für Kinder", p: [
          "Die Parkgebühren sind für Kinder niedriger, und viele Lodges haben Kinderpreise oder Familienzelte. Unser Reiseplaner fragt nach dem Alter jedes Kindes, damit der Preis von Anfang an stimmt.",
          "Manche Camps haben ein Mindestalter. Sagen Sie uns, wie alt Ihre Kinder sind, und wir empfehlen passende Unterkünfte.",
        ] },
        { h: "Wie lange?", p: [
          "Fünf bis sieben Tage sind für die meisten Familien eine gute Länge. Lang genug für die Serengeti ohne Hetze, und kurz genug, dass niemand die Pirschfahrten satt bekommt.",
        ] },
      ],
      faqs: [
        { q: "Welches Alter ist am besten für eine Safari in Tansania?", a: "Kinder jeden Alters können mit auf Safari, aber ab etwa sechs Jahren genießen die meisten Kinder die Pirschfahrten und können ein paar Stunden im Fahrzeug sitzen." },
        { q: "Ist eine Safari in Tansania sicher für Kinder?", a: "Ja, mit einem guten Guide. Während der Pirschfahrten bleiben Sie im Fahrzeug, und wir wählen Lodges, in denen Kinder willkommen sind." },
      ],
    },
    "honeymoon-safari-tanzania": {
      name: "Flitterwochen-Safaris",
      seoTitle: "Flitterwochen-Safari in Tansania | Privat in Serengeti und Ngorongoro",
      description: "Planen Sie Ihre Flitterwochen als Privatsafari in Tansania: besondere Camps in der Serengeti, am Ngorongoro-Kraterrand und im Tarangire, Ballonfahrten und Frühstück im Busch, mit einheimischem Guide.",
      h1: "Flitterwochen-Safaris in Tansania",
      lede: "Ruhige Camps, ein weiter Himmel und ein Fahrzeug nur für Sie beide. Eine Safari ist ein wunderbarer Start in die Ehe.",
      heroAlt: "Sonnenuntergang hinter einer Akazie in den Ebenen Tansanias",
      sections: [
        { h: "Die richtigen Camps", p: [
          "Für Flitterwochen ist das Camp genauso wichtig wie der Park. Wir schlagen meist eine Mischung vor: eine Lodge am Ngorongoro-Kraterrand wegen der Aussicht, ein kleineres Zeltcamp in der Serengeti und eine besondere Nacht, die Sie nicht vergessen.",
          "Auf unseren <a href=\"/lodges\">Lodge-Seiten</a> sehen Sie die Camps, mit denen wir arbeiten, mit echten Fotos.",
        ] },
        { h: "Kleine Extras", p: [
          "Eine Ballonfahrt bei Sonnenaufgang über der Serengeti, ein Frühstück im Busch nach einer frühen Pirschfahrt oder einfach eine zusätzliche Nacht ohne lange Fahrten. Sie können das im <a href=\"/planner\">Reiseplaner</a> hinzufügen oder uns fragen.",
        ] },
        { h: "Wann reisen?", p: [
          "Von Juni bis Oktober ist es trocken und die Tiere sind leicht zu sehen. Januar bis März ist ruhiger und grün, und im Süden ist Kalbungszeit. Unser <a href=\"/great-migration-serengeti\">Ratgeber zur Großen Migration</a> hilft bei der Wahl.",
        ] },
      ],
      faqs: [
        { q: "Wie viele Tage für eine Flitterwochen-Safari?", a: "Mit fünf bis sieben Tagen können Sie die Serengeti und Ngorongoro einplanen, ohne jeden Tag lange zu fahren." },
      ],
    },
    "budget-camping-safari-tanzania": {
      name: "Budget-Camping-Safaris",
      seoTitle: "Budget-Camping-Safari in Tansania | Privat, ab Arusha",
      description: "Eine private Camping-Safari auf den öffentlichen Campingplätzen Tansanias: was enthalten ist, wie es ist und was es wirklich kostet. Serengeti, Ngorongoro und Tarangire ab Arusha.",
      h1: "Budget-Camping-Safaris in Tansania",
      lede: "Schlafen Sie im Zelt mitten in den Parks, hören Sie nachts die Löwen, und halten Sie die Kosten niedrig. Camping ist die günstigste Art, eine echte Safari in Tansania zu erleben.",
      heroAlt: "Büffel unter einer Akazie in Tansania",
      sections: [
        { h: "Wie ist eine Camping-Safari?", p: [
          "Sie übernachten in Zelten auf den öffentlichen Campingplätzen in den Parks, etwa in Seronera in der zentralen Serengeti, auf dem Simba-Campingplatz am Ngorongoro-Kraterrand und auf dem Campingplatz im Tarangire. Die Waschräume sind einfach und werden geteilt.",
          "Weil Sie im Park übernachten, sind Sie bei Sonnenaufgang schon mitten unter den Tieren.",
        ] },
        { h: "Trotzdem privat", p: [
          "Eine Budget-Safari mit uns ist trotzdem eine Privatsafari: Ihr eigenes Fahrzeug und jeden Tag derselbe Guide. Sie sparen bei der Unterkunft, nicht beim Erlebnis.",
        ] },
        { h: "Was es kostet", p: [
          "Unsere Beispiel-Camping-Safaris zeigen echte Preise pro Person, inklusive Parkgebühren, Campinggebühren, Fahrzeug und Guide. Sie können auch Ihre eigene Camping-Route im <a href=\"/planner\">Reiseplaner</a> berechnen: Wählen Sie für jede Nacht Budget.",
          "Eine vollständige Aufschlüsselung finden Sie in <a href=\"/post/budget-safari-tanzania-chasing-the-big-five-on-a-backpacker-s-budget\">unserem Ratgeber zur Budget-Safari</a>.",
        ] },
      ],
      faqs: [
        { q: "Ist Camping in der Serengeti sicher?", a: "Ja. Die öffentlichen Campingplätze werden jede Nacht von Safarigruppen genutzt, und Ihr Guide kennt die Regeln. Nachts bleiben Sie im Zelt." },
        { q: "Wie macht man in Tansania am günstigsten Safari?", a: "Mit einer Camping-Safari auf den öffentlichen Campingplätzen, in der grünen Saison und mit mehr Personen, die sich das Fahrzeug teilen." },
      ],
    },
  },

  fr: {
    "private-safari-tanzania": {
      name: "Safaris privés en Tanzanie",
      seoTitle: "Safari privé en Tanzanie avec un guide local",
      description: "Un safari privé en Tanzanie avec votre propre véhicule et le guide local qui prépare votre voyage avec vous. Serengeti, Ngorongoro et Tarangire au départ d'Arusha, avec des prix transparents.",
      h1: "Safaris privés en Tanzanie avec un guide local",
      lede: "Votre propre véhicule, votre propre rythme, et un guide avec qui vous avez déjà parlé avant d'atterrir. Tous nos safaris sont privés.",
      heroAlt: "Vue depuis le siège du guide sur des gazelles dans les plaines du Serengeti",
      sections: [
        { h: "Ce que « privé » veut dire chez nous", p: [
          "Vous ne partagez jamais le véhicule avec des inconnus. C'est vous qui décidez quand quitter le camp, combien de temps rester devant un léopard dans un arbre et quand il est l'heure de déjeuner.",
          "Nous avons deux guides, pas cent. Le guide qui prépare votre voyage avec vous est celui qui vient vous chercher à l'aéroport et qui conduit chaque jour. Vous savez avec qui vous voyagez avant de réserver.",
        ] },
        { h: "Pensé autour de vos envies", p: [
          "Nous commençons généralement par un appel. Certains voyageurs veulent voir la Grande Migration, d'autres les grands félins, d'autres encore un voyage tranquille avec leurs enfants. Nous vous présentons honnêtement les parcs, y compris ceux que vous pouvez éviter, et vous choisissez.",
          "Si vous préférez organiser vous-même, notre <a href=\"/planner\">planificateur</a> affiche tout de suite le prix de votre itinéraire, avec le détail complet des coûts.",
        ] },
        { h: "Pour tous les budgets", p: [
          "Un safari privé n'est pas forcément un safari de luxe. Vous pouvez camper dans les campings publics, loger dans des lodges confortables ou choisir les plus beaux camps du Serengeti. Dans tous les cas, le véhicule et le guide sont à vous.",
        ] },
      ],
      faqs: [
        { q: "Combien coûte un safari privé en Tanzanie ?", a: "Cela dépend surtout des lodges, de la saison et du nombre de voyageurs. Nos exemples de safaris affichent de vrais prix par personne, et le planificateur calcule le prix de votre propre itinéraire." },
        { q: "Un safari privé en vaut-il la peine ?", a: "Pour la plupart des voyageurs, oui. Votre journée ne dépend pas des autres passagers, et le guide peut tout organiser autour de ce que vous voulez voir." },
      ],
    },
    "family-safari-tanzania": {
      name: "Safaris en famille",
      seoTitle: "Safari en famille en Tanzanie avec des enfants | Privé et local",
      description: "Comment nous organisons un safari en famille en Tanzanie : des trajets plus courts, les bons lodges, des tarifs enfants dans les parcs et un guide à l'aise avec les enfants. Voyages privés au départ d'Arusha.",
      h1: "Safaris en famille en Tanzanie",
      lede: "Un safari avec des enfants demande un autre rythme. Des trajets plus courts, des pauses quand il le faut et des lodges où les enfants sont les bienvenus.",
      heroAlt: "Une girafe à côté d'un acacia dans le Serengeti",
      sections: [
        { h: "Comment nous organisons un safari en famille", p: [
          "Nous construisons les journées autour des enfants. Cela veut souvent dire moins d'heures en voiture, un après-midi à la piscine et des parcs proches les uns des autres, comme Tarangire, Karatu et le cratère du Ngorongoro.",
          "Comme le safari est privé, vous vous arrêtez quand vous voulez. Observer longuement des éléphants à un point d'eau est souvent le moment préféré des plus jeunes, et personne d'autre dans le véhicule n'attend de repartir.",
        ] },
        { h: "Les prix pour les enfants", p: [
          "Les droits d'entrée des parcs sont moins chers pour les enfants, et beaucoup de lodges proposent des tarifs enfants ou des tentes familiales. Notre planificateur demande l'âge de chaque enfant, pour que le prix soit juste dès le départ.",
          "Certains camps ont un âge minimum. Dites-nous l'âge de vos enfants et nous vous conseillerons des hébergements adaptés.",
        ] },
        { h: "Combien de temps ?", p: [
          "Cinq à sept jours conviennent à la plupart des familles. C'est assez pour inclure le Serengeti sans courir, et assez court pour que personne ne se lasse des safaris.",
        ] },
      ],
      faqs: [
        { q: "Quel est le meilleur âge pour un safari en Tanzanie ?", a: "Les enfants de tout âge peuvent partir en safari, mais à partir de six ans environ, la plupart apprécient les sorties et peuvent rester quelques heures dans le véhicule." },
        { q: "Un safari en Tanzanie est-il sûr pour les enfants ?", a: "Oui, avec un bon guide. Vous restez dans le véhicule pendant les safaris, et nous choisissons des lodges qui accueillent les enfants." },
      ],
    },
    "honeymoon-safari-tanzania": {
      name: "Safaris de lune de miel",
      seoTitle: "Lune de miel en safari en Tanzanie | Privé au Serengeti et au Ngorongoro",
      description: "Organisez votre lune de miel en safari privé en Tanzanie : des camps d'exception au Serengeti, sur le bord du cratère du Ngorongoro et à Tarangire, des vols en montgolfière et des petits-déjeuners en brousse, avec un guide local.",
      h1: "Lune de miel en safari en Tanzanie",
      lede: "Des camps paisibles, un ciel immense et un véhicule rien que pour vous deux. Un safari est une merveilleuse façon de commencer votre vie à deux.",
      heroAlt: "Coucher de soleil derrière un acacia dans les plaines de Tanzanie",
      sections: [
        { h: "Choisir les camps", p: [
          "Pour une lune de miel, le camp compte autant que le parc. Nous proposons souvent un mélange : un lodge sur le bord du cratère du Ngorongoro pour la vue, un petit camp de tentes au Serengeti et une nuit vraiment spéciale dont vous vous souviendrez.",
          "Nos <a href=\"/lodges\">pages lodges</a> présentent les camps avec lesquels nous travaillons, avec de vraies photos.",
        ] },
        { h: "Les petits plus", p: [
          "Un vol en montgolfière au lever du soleil au-dessus du Serengeti, un petit-déjeuner en brousse après un safari matinal, ou simplement une nuit de plus sans longue route. Vous pouvez les ajouter dans le <a href=\"/planner\">planificateur</a> ou nous les demander.",
        ] },
        { h: "Quand partir ?", p: [
          "De juin à octobre, c'est la saison sèche et les animaux sont faciles à voir. De janvier à mars, c'est plus calme et vert, et c'est la saison des naissances dans le sud. Notre <a href=\"/great-migration-serengeti\">guide de la Grande Migration</a> vous aide à choisir.",
        ] },
      ],
      faqs: [
        { q: "Combien de jours pour une lune de miel en safari ?", a: "Cinq à sept jours permettent d'inclure le Serengeti et le Ngorongoro sans longues journées de route." },
      ],
    },
    "budget-camping-safari-tanzania": {
      name: "Safaris camping économiques",
      seoTitle: "Safari camping économique en Tanzanie | Privé, au départ d'Arusha",
      description: "Un safari camping privé dans les campings publics de Tanzanie : ce qui est inclus, comment ça se passe et ce que ça coûte vraiment. Serengeti, Ngorongoro et Tarangire au départ d'Arusha.",
      h1: "Safaris camping économiques en Tanzanie",
      lede: "Dormez sous la tente au cœur des parcs, entendez les lions la nuit et gardez un budget raisonnable. Le camping est la façon la plus abordable de vivre un vrai safari en Tanzanie.",
      heroAlt: "Des buffles sous un acacia en Tanzanie",
      sections: [
        { h: "Comment se passe un safari camping ?", p: [
          "Vous dormez sous la tente dans les campings publics des parcs, comme Seronera au centre du Serengeti, Simba sur le bord du cratère du Ngorongoro et le camping de Tarangire. Les sanitaires sont partagés et simples.",
          "Comme vous dormez dans le parc, vous êtes déjà au milieu des animaux au lever du soleil.",
        ] },
        { h: "Toujours privé", p: [
          "Un safari économique avec nous reste un safari privé : votre propre véhicule et le même guide chaque jour. Vous économisez sur l'hébergement, pas sur l'expérience.",
        ] },
        { h: "Ce que ça coûte", p: [
          "Nos exemples de safaris camping affichent de vrais prix par personne, droits d'entrée des parcs, frais de camping, véhicule et guide compris. Vous pouvez aussi calculer votre propre itinéraire en camping dans le <a href=\"/planner\">planificateur</a> : choisissez Économique pour chaque nuit.",
          "Pour le détail complet, lisez <a href=\"/post/budget-safari-tanzania-chasing-the-big-five-on-a-backpacker-s-budget\">notre guide du safari économique</a>.",
        ] },
      ],
      faqs: [
        { q: "Camper au Serengeti, est-ce sûr ?", a: "Oui. Les campings publics sont utilisés chaque nuit par des groupes de safari, et votre guide connaît les règles. La nuit, vous restez dans votre tente." },
        { q: "Quelle est la façon la moins chère de faire un safari en Tanzanie ?", a: "Un safari camping dans les campings publics, pendant la saison verte, avec plus de voyageurs qui se partagent le véhicule." },
      ],
    },
  },
};
