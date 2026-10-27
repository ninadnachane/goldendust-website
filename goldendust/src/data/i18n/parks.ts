// Dutch, German and French text for the park guides (src/data/parks.ts). Links inside the text
// are written without the language prefix; the page adds it.
import type { Park } from "../parks";

type ParkText = Pick<Park, "name" | "seoTitle" | "description" | "h1" | "lede" | "heroAlt" | "facts" | "sections" | "faqs">;
type Lang3 = "nl" | "de" | "fr";

export const PARKS_I18N: Record<Lang3, Record<string, ParkText>> = {
  nl: {
    "serengeti-national-park": {
      name: "Nationaal Park Serengeti",
      seoTitle: "Safari in de Serengeti: beste reistijd, dieren en lodges",
      description: "De Serengeti door de ogen van een lokale gids: waar je overnacht, wanneer je gaat voor de Grote Migratie en de grote katten, parkkosten en hoeveel nachten je nodig hebt. Privésafari's vanuit Arusha.",
      h1: "Nationaal Park Serengeti",
      lede: "Eindeloze vlaktes, de Grote Migratie en meer leeuwen dan bijna waar ook in Afrika. De Serengeti is het park waarvoor de meeste van onze gasten komen, en het stelt zelden teleur.",
      heroAlt: "Olifanten op de open vlaktes van de Serengeti",
      facts: [["Grootte", "Ongeveer 14.750 km²"], ["Vanuit Arusha", "Een hele dag rijden via Ngorongoro, of een korte vlucht"], ["Het beste voor", "De Grote Migratie, leeuwen, cheeta's, luipaarden"], ["Ons advies", "2 tot 3 nachten, meer als je de kuddes volgt"], ["Parkkosten", "$82,60 per volwassene per 24 uur"]],
      sections: [
        { h: "Waarom de Serengeti zo bijzonder is", p: [
          "De Serengeti staat op de Werelderfgoedlijst van UNESCO en vormt samen met de Maasai Mara in Kenia één ecosysteem. Ruim een miljoen gnoes trekken er het hele jaar rond, samen met honderdduizenden zebra's en gazellen, op zoek naar regen en vers gras. De roofdieren volgen ze.",
          "Wat de meeste gasten verrast, is de ruimte. Je rijdt een uur over open grasland en komt dan bij een groep granieten kopjes, met bovenop een slapende troep leeuwen. Het voelt heel anders dan een omheind reservaat.",
        ] },
        { h: "Welk deel van de Serengeti?", p: [
          "In de centrale Serengeti (Seronera) zijn het hele jaar door dieren, en de vallei van de Seronera-rivier is een van de beste plekken in Afrika voor grote katten. Heb je twee nachten en geen vaste maand, dan overnachten we meestal hier.",
          "Op de zuidelijke vlaktes en rond Ndutu komen de kuddes samen om te kalven, ongeveer van januari tot maart. Ndutu ligt net binnen de Ngorongoro Conservation Area, aan de rand van de Serengeti.",
          "De westelijke corridor volgt de Grumeti-rivier, die de kuddes meestal rond juni oversteken. In de noordelijke Serengeti, bij de grens met Kenia, vinden van ongeveer juli tot oktober de oversteken van de Mara-rivier plaats. Dat is ver rijden vanaf Arusha, dus we plannen daar minstens twee nachten.",
        ] },
        { h: "Wanneer ga je?", p: [
          "Er bestaat geen slechte maand in de Serengeti, alleen andere maanden. Van juni tot oktober is het droog, zijn de dieren makkelijk te vinden en is het het drukst en het duurst. Van januari tot maart is het kalfseizoen in het zuiden. April en mei zijn de lange regens: sommige kampen gaan dicht, maar het park is groen, rustig en goedkoper.",
          "Onze gids over de <a href=\"/great-migration-serengeti\">Grote Migratie per maand</a> laat zien waar de kuddes meestal zijn, en in <a href=\"/post/best-time-to-visit-tanzania-for-a-safari-month-by-month-guide\">de beste reistijd voor Tanzania</a> lees je meer over de andere parken.",
        ] },
        { h: "Hoe kom je er?", p: [
          "De meeste gasten gaan met de auto. De weg vanuit Arusha loopt langs Lake Manyara en over de hooglanden van Ngorongoro, dus de rit zelf hoort al bij de safari. Met game drives onderweg kost het het grootste deel van de dag. Je kunt ook van Arusha naar een van de landingsbanen in de Serengeti vliegen en daar je gids ontmoeten.",
        ] },
        { h: "Waar overnacht je?", p: [
          "Je kunt kamperen op een openbare camping, in een comfortabel tentenkamp slapen of kiezen voor een van de luxe kampen. Hieronder staan de kampen en lodges waarmee we werken. Ze zitten in de prijzen van onze reisplanner, dus je kunt ze voor jouw data vergelijken.",
        ] },
      ],
      faqs: [
        { q: "Hoeveel dagen heb je nodig in de Serengeti?", a: "Twee volle dagen, dus drie nachten, is een goed minimum. Met één nacht kom je 's middags aan en vertrek je de volgende ochtend weer, en zit je vooral in de auto." },
        { q: "Kun je de Big Five zien in de Serengeti?", a: "Leeuwen, luipaarden, olifanten en buffels zie je regelmatig. Neushoorns zijn zeldzaam in de Serengeti, daarom combineren we het meestal met de Ngorongorokrater, een van de beste plekken in Tanzania om zwarte neushoorns te zien." },
        { q: "Is de Serengeti de moeite waard bij een korte safari?", a: "Met minder dan vier dagen vaak niet. De rit vanuit Arusha kost heen en terug elk het grootste deel van een dag. Bij een driedaagse reis zie je in Tarangire en de Ngorongorokrater meestal meer dieren." },
      ],
    },
    "ngorongoro-crater": {
      name: "Ngorongorokrater",
      seoTitle: "Safari in de Ngorongorokrater: dieren, kosten en overnachten",
      description: "Alles voor een dag in de Ngorongorokrater: wat je kunt zien, de kosten om de krater in te rijden, overnachten op de kraterrand of in Karatu, en de beste reistijd. Van een lokale gids uit Arusha.",
      h1: "Ngorongorokrater",
      lede: "Een ingestorte vulkaan met een bodem vol dieren. Een dag in de Ngorongorokrater is een van de beste kansen in Tanzania om een zwarte neushoorn te zien, en het past in bijna elke safari.",
      heroAlt: "Een safarivoertuig op de bodem van de Ngorongorokrater",
      facts: [["Kraterbodem", "Ongeveer 260 km², zo'n 600 m onder de rand"], ["Vanuit Arusha", "Ongeveer 3 tot 4 uur rijden"], ["Het beste voor", "Zwarte neushoorns, leeuwen, hyena's, flamingo's"], ["Ons advies", "Een halve of hele dag op de kraterbodem"], ["Kosten", "$71,80 per volwassene per 24 uur, plus $295 per voertuig om de krater in te rijden"]],
      sections: [
        { h: "Wat de krater anders maakt", p: [
          "De Ngorongorokrater is een van de grootste ongebroken vulkanische caldera's ter wereld. Hij ligt in de Ngorongoro Conservation Area, die op de Werelderfgoedlijst van UNESCO staat. Steile wanden omringen een bodem van grasland, moeras, bos en een sodameer, en er leven het hele jaar veel dieren.",
          "Omdat het gebied klein en open is, zie je in een paar uur veel: gnoes, zebra's, buffels, leeuwen, gevlekte hyena's, olifanten en, met wat geduld, zwarte neushoorns. Flamingo's zoeken vaak voedsel in het Magadimeer op de kraterbodem. Anders dan in de meeste nationale parken wonen er Maasai-families in de Conservation Area, die er hun vee laten grazen.",
        ] },
        { h: "Zo gaat een dag in de krater", p: [
          "We rijden vroeg de kraterweg af, brengen de dag door op de bodem en klimmen 's middags weer naar boven. Veel gasten doen de krater op de laatste dag van hun safari, op weg terug naar Arusha.",
          "Elk voertuig betaalt een vergoeding om de kraterbodem op te mogen, bovenop de toegangsprijs voor de Conservation Area per persoon. Zit er in je reis in onze planner een nacht in Ngorongoro, dan is de game drive in de krater altijd inbegrepen.",
        ] },
        { h: "Kraterrand of Karatu?", p: [
          "Je kunt slapen op de kraterrand, hoog boven de bodem, of in <a href=\"/parks/karatu\">Karatu</a>, op ongeveer een half uur van de ingang van de Conservation Area. Op de rand zit je dichter bij de krater, is het uitzicht spectaculair en ben je vroeg beneden. Karatu is goedkoper en warmer, en je betaalt er voor de nacht geen toegangsgeld voor de Conservation Area.",
          "De kraterrand ligt op meer dan 2.000 m hoogte, dus de nachten zijn het hele jaar koud. Neem een warme jas mee.",
        ] },
        { h: "Wanneer ga je?", p: [
          "De krater is het hele jaar goed, omdat de dieren er niet wegtrekken. Van juni tot oktober is het droog en druk. In de regenmaanden is het rustiger en heel groen. In welke maand je ook gaat: wie vroeg is, is de drukte voor.",
        ] },
        { h: "Waar overnacht je?", p: [
          "Dit zijn de kampen en lodges op de kraterrand waarmee we werken. De Simba-camping op de rand is de budgetkeuze.",
        ] },
      ],
      faqs: [
        { q: "Kun je neushoorns zien in de Ngorongorokrater?", a: "Ja. In de krater leeft een kleine populatie zwarte neushoorns, en het is een van de betrouwbaarste plekken in Tanzania om ze te zien. Ze staan wel vaak op afstand en een waarneming is nooit gegarandeerd." },
        { q: "Is één dag genoeg voor de Ngorongorokrater?", a: "Ja. Voor de meeste gasten is een halve of hele dag op de kraterbodem genoeg. Overnacht op de kraterrand of in Karatu, zodat je vroeg naar beneden kunt." },
        { q: "Wat kost een bezoek aan de Ngorongorokrater?", a: "De toegang tot de Conservation Area kost $71,80 per volwassene per 24 uur en elk voertuig betaalt $295 om de krater in te rijden. In onze prijzen zitten ze allebei altijd inbegrepen." },
      ],
    },
    "tarangire-national-park": {
      name: "Nationaal Park Tarangire",
      seoTitle: "Safari in Tarangire: olifanten, beste reistijd en lodges",
      description: "Tarangire ligt op twee uur van Arusha en is beroemd om zijn olifanten en baobabs. Tips van een lokale gids over wanneer je gaat, hoelang je blijft en waar je slaapt.",
      h1: "Nationaal Park Tarangire",
      lede: "Grote olifantenkuddes, reusachtige baobabs en een rivier die het hele droge seizoen dieren aantrekt. Tarangire ligt dicht bij Arusha en is vaak het eerste park op onze safari's.",
      heroAlt: "Zebra's in het grasland van Noord-Tanzania",
      facts: [["Grootte", "Ongeveer 2.850 km²"], ["Vanuit Arusha", "Ongeveer 2 uur rijden"], ["Het beste voor", "Olifanten, baobabs, vogels"], ["Ons advies", "1 tot 2 nachten"], ["Parkkosten", "$53,10 per volwassene per 24 uur"]],
      sections: [
        { h: "Waarom naar Tarangire?", p: [
          "Nationaal Park Tarangire is genoemd naar de Tarangire-rivier, die er dwars doorheen stroomt. In het droge seizoen, als het water elders opraakt, werkt de rivier als een magneet: olifanten, zebra's, gnoes, buffels en de leeuwen die op ze jagen, komen er allemaal drinken.",
          "Het is een van de beste plekken in Tanzania om grote olifantenkuddes te zien, en door de eeuwenoude baobabs lijkt het op geen enkel ander park. Ook voor vogelliefhebbers is het een prachtig park, met honderden soorten.",
        ] },
        { h: "Wanneer ga je?", p: [
          "Tarangire is op zijn best van ongeveer juni tot oktober, als de dieren zich langs de rivier verzamelen. In het natte seizoen trekken veel dieren het park uit, maar het is dan nog steeds mooi en groen, en er zijn veel minder voertuigen.",
        ] },
        { h: "Hoelang blijf je?", p: [
          "Tarangire ligt dicht genoeg bij Arusha voor een dagtrip, maar met één nacht ben je er vroeg in de ochtend en laat in de middag, als het licht en de dieren op hun best zijn. Bij langere reizen geven we het vaak twee nachten.",
          "Het is een makkelijke eerste stop: je landt, rust uit in Arusha en kijkt de volgende dag rond lunchtijd al naar olifanten.",
        ] },
        { h: "Waar overnacht je?", p: [
          "Er is een openbare camping in het park, en er zijn lodges en tentenkampen in het park en aan de rand. Dit zijn de lodges en kampen waarmee we werken.",
        ] },
      ],
      faqs: [
        { q: "Is Tarangire de moeite waard?", a: "Ja, vooral van juni tot oktober. Het ligt op twee uur van Arusha en is een van de beste parken in Tanzania voor olifanten, dus een ideale eerste stop op een safari." },
        { q: "Hoeveel dagen heb je nodig in Tarangire?", a: "Voor de meeste reizen is één nacht genoeg. Met twee nachten kun je verder van de rivier gaan en de rustigere delen van het park zien." },
        { q: "Tarangire of Lake Manyara?", a: "Heb je maar tijd voor één, dan raden we meestal Tarangire aan: het is groter, er zijn meer dieren en de olifantenkuddes zijn moeilijk te overtreffen. Lake Manyara past goed als halve dag op weg naar Ngorongoro." },
      ],
    },
    "lake-manyara-national-park": {
      name: "Nationaal Park Lake Manyara",
      seoTitle: "Safari in Lake Manyara: dieren, beste reistijd en lodges",
      description: "Een klein, groen park onder de wand van de Riftvallei, op weg naar Ngorongoro. Wat je kunt zien in Lake Manyara, wanneer je gaat en waar je overnacht, van een lokale gids.",
      h1: "Nationaal Park Lake Manyara",
      lede: "Een smalle strook bos, grasland en meer onder de steile wand van de Grote Riftvallei. Lake Manyara is klein, maar je ziet er in een halve dag veel.",
      heroAlt: "&Beyond Lake Manyara Tree Lodge",
      facts: [["Ligging", "Tussen de wand van de Riftvallei en Lake Manyara"], ["Vanuit Arusha", "Ongeveer 2 uur rijden"], ["Het beste voor", "Bos, bavianen, olifanten, vogels, uitzicht over de Riftvallei"], ["Ons advies", "Een halve of hele dag"], ["Parkkosten", "$59 per volwassene per 24 uur"]],
      sections: [
        { h: "Hoe is Lake Manyara?", p: [
          "Je komt binnen via een grondwaterbos met hoge vijgen- en mahoniebomen, gevoed door bronnen uit de rotswand. Er trekken troepen bavianen en blauwe apen doorheen, en olifanten eten in de schaduw.",
          "Verderop gaat het bos over in grasland en de oever van het meer, waar nijlpaarden, buffels, giraffen en veel watervogels leven. In sommige jaren verzamelen zich grote aantallen flamingo's op het meer. Het park staat bekend om leeuwen die in bomen klimmen, maar die zie je veel minder vaak dan de verhalen doen geloven.",
        ] },
        { h: "Is het de moeite waard?", p: [
          "Lake Manyara ligt aan de weg van Arusha naar Ngorongoro en de Serengeti, dus je voegt het makkelijk toe als halve dag. Het is een goede keuze als je Tarangire al hebt gezien, van vogels houdt of iets anders wilt dan de open vlaktes. Bij een korte reis zie je in Tarangire meestal meer dieren.",
        ] },
        { h: "Wanneer ga je?", p: [
          "Het droge seizoen, van juni tot oktober, is het beste voor grotere dieren. Het natte seizoen is geweldig voor vogels en dan is het park op zijn groenst.",
        ] },
        { h: "Waar overnacht je?", p: [
          "De meeste lodges liggen op de rotswand boven het park of in het dorp Mto wa Mbu, met een mooi uitzicht over het meer. Veel gasten overnachten in plaats daarvan in <a href=\"/parks/karatu\">Karatu</a> en bezoeken Manyara onderweg.",
        ] },
      ],
      faqs: [
        { q: "Klimmen de leeuwen in Lake Manyara echt in bomen?", a: "Soms, maar je ziet het zelden. Boomklimmende leeuwen komen voor in een paar parken in Oost-Afrika, en Manyara is er een van. Plan je reis er niet omheen." },
        { q: "Hoeveel tijd heb je nodig in Lake Manyara?", a: "Voor de meeste gasten is een halve dag genoeg. Het past goed in de rit van Arusha naar Karatu of Ngorongoro." },
      ],
    },
    karatu: {
      name: "Karatu",
      seoTitle: "Lodges in Karatu: overnachten bij de Ngorongorokrater",
      description: "Karatu is een plaats in de hooglanden, vlak bij de ingang van de Ngorongoro Conservation Area. Waarom veel gasten hier slapen in plaats van op de kraterrand, en de lodges in Karatu waarmee we werken.",
      h1: "Karatu, je uitvalsbasis voor Ngorongoro",
      lede: "Groene heuvels, koffieplantages en koele avonden, dicht bij de ingang van Ngorongoro. In Karatu slapen veel van onze gasten voor of na hun dag in de krater.",
      heroAlt: "Gibb's Farm in de hooglanden van Karatu",
      facts: [["Waar", "Tussen Lake Manyara en de Ngorongoro Conservation Area"], ["Vanuit Arusha", "Ongeveer 2,5 tot 3 uur rijden"], ["Naar de krater", "Ongeveer 30 minuten naar de ingang, dan de rit naar de kraterrand"], ["Het beste voor", "Een comfortabele nacht dicht bij de krater, voor minder geld"]],
      sections: [
        { h: "Waarom overnachten in Karatu?", p: [
          "Karatu ligt in de hooglanden net buiten de Ngorongoro Conservation Area. Omdat het buiten de Conservation Area ligt, betaal je voor de nacht geen toegangsgeld, en de lodges zijn meestal goedkoper dan op de kraterrand. Het ligt ook iets lager en is warmer.",
          "Veel lodges liggen op koffieplantages en in tuinen, met goed eten en ruimte om te ontspannen. Na een lange dag game drives is dat heel welkom.",
        ] },
        { h: "Karatu of de kraterrand?", p: [
          "Wil je het uitzicht en de vroegste start in de <a href=\"/parks/ngorongoro-crater\">Ngorongorokrater</a>, slaap dan op de rand. Wil je geld besparen, of reis je met kinderen die blij worden van een tuin en een zwembad, dan is Karatu een prima keuze. We vertellen je eerlijk wat het beste bij je reis past.",
        ] },
        { h: "Waar overnacht je in Karatu?", p: [
          "Dit zijn de lodges in Karatu waarmee we werken, van comfortabele familiebedrijven tot enkele van de beste lodges van Noord-Tanzania.",
        ] },
      ],
      faqs: [
        { q: "Hoe ver is Karatu van de Ngorongorokrater?", a: "Ongeveer 30 minuten naar de ingang van de Conservation Area, en daarna nog zo'n 30 tot 45 minuten naar de kraterrand en de weg naar beneden." },
        { q: "Kun je beter in Karatu of op de kraterrand overnachten?", a: "De kraterrand ligt dichterbij en het uitzicht is mooier. Karatu is goedkoper en warmer, en je betaalt er voor de nacht geen toegangsgeld voor de Conservation Area. Allebei werkt goed." },
      ],
    },
  },

  de: {
    "serengeti-national-park": {
      name: "Serengeti-Nationalpark",
      seoTitle: "Safari in der Serengeti: beste Reisezeit, Tiere und Lodges",
      description: "Die Serengeti aus Sicht eines einheimischen Guides: wo Sie übernachten, wann Sie für die Große Migration und die Großkatzen reisen, Parkgebühren und wie viele Nächte Sie brauchen. Privatsafaris ab Arusha.",
      h1: "Serengeti-Nationalpark",
      lede: "Endlose Ebenen, die Große Migration und mehr Löwen als fast überall sonst in Afrika. Für die Serengeti kommen die meisten unserer Gäste, und sie enttäuscht selten.",
      heroAlt: "Elefanten in den offenen Ebenen der Serengeti",
      facts: [["Größe", "Etwa 14.750 km²"], ["Ab Arusha", "Eine Tagesfahrt über Ngorongoro oder ein kurzer Flug"], ["Ideal für", "Die Große Migration, Löwen, Geparden, Leoparden"], ["Unsere Empfehlung", "2 bis 3 Nächte, mehr, wenn Sie den Herden folgen"], ["Parkgebühr", "$82,60 pro Erwachsenem pro 24 Stunden"]],
      sections: [
        { h: "Was die Serengeti besonders macht", p: [
          "Die Serengeti ist UNESCO-Weltnaturerbe und bildet zusammen mit der Maasai Mara in Kenia ein einziges Ökosystem. Weit über eine Million Gnus ziehen dort das ganze Jahr umher, zusammen mit Hunderttausenden Zebras und Gazellen, immer dem Regen und dem frischen Gras nach. Die Raubtiere folgen ihnen.",
          "Was die meisten Gäste überrascht, ist die Weite. Sie fahren eine Stunde durch offenes Grasland und erreichen dann eine Gruppe Granitfelsen, Kopjes genannt, auf denen ein Löwenrudel schläft. Das fühlt sich ganz anders an als ein eingezäuntes Reservat.",
        ] },
        { h: "Welcher Teil der Serengeti?", p: [
          "In der zentralen Serengeti (Seronera) gibt es das ganze Jahr über Tiere, und das Tal des Seronera-Flusses ist einer der besten Orte Afrikas für Großkatzen. Wenn Sie zwei Nächte haben und an keinen Monat gebunden sind, übernachten wir meist hier.",
          "In den südlichen Ebenen und rund um Ndutu sammeln sich die Herden etwa von Januar bis März, um ihre Jungen zur Welt zu bringen. Ndutu liegt knapp innerhalb des Ngorongoro-Schutzgebiets, am Rand der Serengeti.",
          "Der westliche Korridor folgt dem Grumeti-Fluss, den die Herden meist um Juni überqueren. In der nördlichen Serengeti, nahe der Grenze zu Kenia, finden etwa von Juli bis Oktober die Überquerungen des Mara-Flusses statt. Von Arusha ist das ein weiter Weg, deshalb planen wir dort mindestens zwei Nächte ein.",
        ] },
        { h: "Wann reisen?", p: [
          "Es gibt keinen schlechten Monat in der Serengeti, nur verschiedene. Von Juni bis Oktober ist es trocken, die Tiere sind leicht zu finden, und es ist die vollste und teuerste Zeit. Von Januar bis März ist im Süden Kalbungszeit. April und Mai sind die große Regenzeit: Einige Camps schließen, aber der Park ist grün, ruhig und günstiger.",
          "Unser Ratgeber zur <a href=\"/great-migration-serengeti\">Großen Migration nach Monaten</a> zeigt, wo die Herden meist sind, und unter <a href=\"/post/best-time-to-visit-tanzania-for-a-safari-month-by-month-guide\">beste Reisezeit für Tansania</a> finden Sie auch die anderen Parks.",
        ] },
        { h: "Anreise", p: [
          "Die meisten unserer Gäste fahren mit dem Auto. Die Straße von Arusha führt am Lake Manyara vorbei und über das Ngorongoro-Hochland, die Fahrt ist also schon Teil der Safari. Mit Pirschfahrten unterwegs dauert sie den größten Teil des Tages. Sie können auch von Arusha zu einer der Landepisten in der Serengeti fliegen und dort Ihren Guide treffen.",
        ] },
        { h: "Übernachten", p: [
          "Sie können auf einem öffentlichen Campingplatz zelten, in einem komfortablen Zeltcamp wohnen oder eines der Luxuscamps wählen. Unten finden Sie die Camps und Lodges, mit denen wir arbeiten. Sie sind in den Preisen unseres Reiseplaners enthalten, so können Sie sie für Ihre Reisedaten vergleichen.",
        ] },
      ],
      faqs: [
        { q: "Wie viele Tage braucht man in der Serengeti?", a: "Zwei volle Tage, also drei Nächte, sind ein gutes Minimum. Mit nur einer Nacht kommen Sie am Nachmittag an, fahren am nächsten Morgen wieder ab und verbringen die meiste Zeit im Auto." },
        { q: "Kann man in der Serengeti die Big Five sehen?", a: "Löwen, Leoparden, Elefanten und Büffel sieht man regelmäßig. Nashörner sind in der Serengeti selten, deshalb kombinieren wir sie meist mit dem Ngorongoro-Krater, einem der besten Orte in Tansania für Spitzmaulnashörner." },
        { q: "Lohnt sich die Serengeti bei einer kurzen Safari?", a: "Bei weniger als vier Tagen oft nicht. Die Fahrt von Arusha dauert hin und zurück jeweils fast einen Tag. Auf einer dreitägigen Reise sehen Sie im Tarangire und im Ngorongoro-Krater meist mehr Tiere." },
      ],
    },
    "ngorongoro-crater": {
      name: "Ngorongoro-Krater",
      seoTitle: "Safari im Ngorongoro-Krater: Tiere, Gebühren und Unterkünfte",
      description: "Alles für Ihren Tag im Ngorongoro-Krater: was Sie sehen können, die Kratergebühr, Übernachtung am Kraterrand oder in Karatu und die beste Reisezeit. Von einem einheimischen Guide aus Arusha.",
      h1: "Ngorongoro-Krater",
      lede: "Ein eingestürzter Vulkan, dessen Boden voller Tiere ist. Ein Tag im Ngorongoro-Krater ist eine der besten Gelegenheiten in Tansania, ein Spitzmaulnashorn zu sehen, und er passt in fast jede Safari.",
      heroAlt: "Ein Safarifahrzeug auf dem Boden des Ngorongoro-Kraters",
      facts: [["Kraterboden", "Etwa 260 km², rund 600 m unter dem Kraterrand"], ["Ab Arusha", "Etwa 3 bis 4 Stunden Fahrt"], ["Ideal für", "Spitzmaulnashörner, Löwen, Hyänen, Flamingos"], ["Unsere Empfehlung", "Ein halber oder ganzer Tag auf dem Kraterboden"], ["Gebühren", "$71,80 pro Erwachsenem pro 24 Stunden, plus $295 pro Fahrzeug für die Fahrt in den Krater"]],
      sections: [
        { h: "Was den Krater so besonders macht", p: [
          "Der Ngorongoro-Krater ist eine der größten intakten vulkanischen Calderen der Welt. Er liegt im Ngorongoro-Schutzgebiet, das zum UNESCO-Welterbe gehört. Steile Wände umschließen einen Boden aus Grasland, Sumpf, Wald und einem Natronsee, und das ganze Jahr leben dort viele Tiere.",
          "Weil das Gebiet klein und offen ist, sehen Sie in wenigen Stunden sehr viel: Gnus, Zebras, Büffel, Löwen, Tüpfelhyänen, Elefanten und mit etwas Geduld Spitzmaulnashörner. Im Magadi-See auf dem Kraterboden suchen oft Flamingos nach Nahrung. Anders als in den meisten Nationalparks leben im Schutzgebiet Massai-Familien, die dort ihr Vieh weiden.",
        ] },
        { h: "So läuft ein Kratertag ab", p: [
          "Wir fahren früh die Kraterstraße hinunter, verbringen den Tag auf dem Kraterboden und fahren am Nachmittag wieder hinauf. Viele Gäste besuchen den Krater am letzten Safaritag, auf dem Rückweg nach Arusha.",
          "Jedes Fahrzeug zahlt für die Fahrt auf den Kraterboden eine eigene Gebühr, zusätzlich zur Gebühr für das Schutzgebiet pro Person. Wenn Ihre Reise im Planer eine Nacht in Ngorongoro enthält, ist die Pirschfahrt im Krater immer dabei.",
        ] },
        { h: "Kraterrand oder Karatu?", p: [
          "Sie können am Kraterrand übernachten, hoch über dem Kraterboden, oder in <a href=\"/parks/karatu\">Karatu</a>, etwa eine halbe Stunde vom Tor des Schutzgebiets entfernt. Am Rand sind Sie näher am Krater, die Aussicht ist spektakulär, und Sie sind früh unten. Karatu ist günstiger und wärmer, und für die Nacht fallen keine Gebühren für das Schutzgebiet an.",
          "Der Kraterrand liegt auf über 2.000 m Höhe, die Nächte sind deshalb das ganze Jahr kalt. Nehmen Sie eine warme Jacke mit.",
        ] },
        { h: "Wann reisen?", p: [
          "Der Krater ist das ganze Jahr lohnend, weil die Tiere dort nicht abwandern. Von Juni bis Oktober ist es trocken und voll. In den Regenmonaten ist es ruhiger und sehr grün. Egal in welchem Monat: Wer früh dran ist, entgeht dem Andrang.",
        ] },
        { h: "Übernachten", p: [
          "Das sind die Camps und Lodges am Kraterrand, mit denen wir arbeiten. Der öffentliche Simba-Campingplatz am Rand ist die günstige Wahl.",
        ] },
      ],
      faqs: [
        { q: "Kann man im Ngorongoro-Krater Nashörner sehen?", a: "Ja. Im Krater lebt eine kleine Population von Spitzmaulnashörnern, und er ist einer der zuverlässigsten Orte in Tansania, um sie zu sehen. Oft sind sie allerdings weit entfernt, und eine Sichtung ist nie garantiert." },
        { q: "Reicht ein Tag für den Ngorongoro-Krater?", a: "Ja. Für die meisten Gäste reicht ein halber oder ganzer Tag auf dem Kraterboden. Übernachten Sie am Kraterrand oder in Karatu, damit Sie früh hinunterfahren können." },
        { q: "Was kostet ein Besuch im Ngorongoro-Krater?", a: "Die Gebühr für das Schutzgebiet beträgt $71,80 pro Erwachsenem pro 24 Stunden, und jedes Fahrzeug zahlt $295 für die Fahrt in den Krater. In unseren Preisen ist beides immer enthalten." },
      ],
    },
    "tarangire-national-park": {
      name: "Tarangire-Nationalpark",
      seoTitle: "Safari im Tarangire: Elefanten, beste Reisezeit und Lodges",
      description: "Der Tarangire liegt zwei Stunden von Arusha und ist berühmt für Elefanten und Baobabs. Tipps eines einheimischen Guides: wann reisen, wie lange bleiben und wo übernachten.",
      h1: "Tarangire-Nationalpark",
      lede: "Große Elefantenherden, riesige Baobabs und ein Fluss, der die ganze Trockenzeit über Tiere anzieht. Der Tarangire liegt nah an Arusha und ist oft der erste Park unserer Safaris.",
      heroAlt: "Zebras im Grasland im Norden Tansanias",
      facts: [["Größe", "Etwa 2.850 km²"], ["Ab Arusha", "Etwa 2 Stunden Fahrt"], ["Ideal für", "Elefanten, Baobabs, Vögel"], ["Unsere Empfehlung", "1 bis 2 Nächte"], ["Parkgebühr", "$53,10 pro Erwachsenem pro 24 Stunden"]],
      sections: [
        { h: "Warum in den Tarangire?", p: [
          "Der Tarangire-Nationalpark ist nach dem Tarangire-Fluss benannt, der ihn durchfließt. In der Trockenzeit, wenn das Wasser anderswo versiegt, wird der Fluss zum Magneten: Elefanten, Zebras, Gnus, Büffel und die Löwen, die sie jagen, kommen alle zum Trinken.",
          "Er ist einer der besten Orte in Tansania für große Elefantenherden, und die uralten Baobabs geben ihm ein Gesicht wie kein anderer Park. Auch für Vogelbeobachter ist er ein wunderbarer Park, mit Hunderten von Arten.",
        ] },
        { h: "Wann reisen?", p: [
          "Am schönsten ist der Tarangire etwa von Juni bis Oktober, wenn sich die Tiere am Fluss sammeln. In der Regenzeit verteilen sich viele Tiere außerhalb des Parks, aber er ist dann trotzdem schön und grün, und es sind viel weniger Fahrzeuge unterwegs.",
        ] },
        { h: "Wie lange bleiben?", p: [
          "Der Tarangire liegt nah genug an Arusha für einen Tagesausflug, aber mit einer Übernachtung sind Sie am frühen Morgen und späten Nachmittag dort, wenn Licht und Tiere am besten sind. Auf längeren Reisen planen wir oft zwei Nächte ein.",
          "Er ist ein entspannter erster Halt: Sie landen, ruhen sich in Arusha aus und beobachten am nächsten Tag zur Mittagszeit schon Elefanten.",
        ] },
        { h: "Übernachten", p: [
          "Im Park gibt es einen öffentlichen Campingplatz, dazu Lodges und Zeltcamps im Park und am Rand. Mit diesen arbeiten wir.",
        ] },
      ],
      faqs: [
        { q: "Lohnt sich der Tarangire?", a: "Ja, vor allem von Juni bis Oktober. Er liegt zwei Stunden von Arusha und ist einer der besten Parks Tansanias für Elefanten, also ein idealer erster Halt auf einer Safari." },
        { q: "Wie viele Tage braucht man im Tarangire?", a: "Für die meisten Reisen reicht eine Nacht. Mit zwei Nächten können Sie sich weiter vom Fluss entfernen und die ruhigeren Teile des Parks sehen." },
        { q: "Tarangire oder Lake Manyara?", a: "Wenn Sie nur für einen Park Zeit haben, empfehlen wir meist den Tarangire: Er ist größer, hat mehr Tiere, und die Elefantenherden sind kaum zu übertreffen. Lake Manyara passt als halber Tag auf dem Weg nach Ngorongoro." },
      ],
    },
    "lake-manyara-national-park": {
      name: "Lake-Manyara-Nationalpark",
      seoTitle: "Safari am Lake Manyara: Tiere, beste Reisezeit und Lodges",
      description: "Ein kleiner, grüner Park unter der Wand des Rift Valley, auf dem Weg nach Ngorongoro. Was Sie am Lake Manyara sehen, wann Sie reisen und wo Sie übernachten, von einem einheimischen Guide.",
      h1: "Lake-Manyara-Nationalpark",
      lede: "Ein schmaler Streifen aus Wald, Grasland und See unter der Steilwand des Großen Afrikanischen Grabenbruchs. Der Lake Manyara ist klein, bietet aber an einem halben Tag sehr viel.",
      heroAlt: "&Beyond Lake Manyara Tree Lodge",
      facts: [["Lage", "Zwischen der Wand des Rift Valley und dem Lake Manyara"], ["Ab Arusha", "Etwa 2 Stunden Fahrt"], ["Ideal für", "Wald, Paviane, Elefanten, Vögel, Blick über das Rift Valley"], ["Unsere Empfehlung", "Ein halber oder ganzer Tag"], ["Parkgebühr", "$59 pro Erwachsenem pro 24 Stunden"]],
      sections: [
        { h: "Wie ist der Lake Manyara?", p: [
          "Sie fahren durch einen Grundwasserwald mit hohen Feigen- und Mahagonibäumen hinein, gespeist von Quellen aus der Steilwand. Paviantrupps und Diademmeerkatzen ziehen hindurch, und Elefanten fressen im Schatten.",
          "Weiter drinnen öffnet sich der Wald zu Grasland und zum Seeufer, wo Flusspferde, Büffel, Giraffen und viele Wasservögel leben. In manchen Jahren sammeln sich auf dem See große Mengen Flamingos. Der Park ist für Löwen bekannt, die auf Bäume klettern, aber man sieht sie viel seltener, als die Geschichten vermuten lassen.",
        ] },
        { h: "Lohnt es sich?", p: [
          "Der Lake Manyara liegt an der Straße von Arusha nach Ngorongoro und in die Serengeti, deshalb lässt er sich leicht als halber Tag einbauen. Er passt gut, wenn Sie den Tarangire schon gesehen haben, Vögel lieben oder etwas anderes als die offenen Ebenen suchen. Bei einer kurzen Reise sehen Sie im Tarangire meist mehr Tiere.",
        ] },
        { h: "Wann reisen?", p: [
          "Die Trockenzeit von Juni bis Oktober ist am besten für größere Tiere. Die Regenzeit ist großartig für Vögel, und der Park ist dann am grünsten.",
        ] },
        { h: "Übernachten", p: [
          "Die meisten Lodges liegen oben auf der Steilwand über dem Park oder im Dorf Mto wa Mbu, mit schönem Blick über den See. Viele Gäste übernachten stattdessen in <a href=\"/parks/karatu\">Karatu</a> und besuchen Manyara unterwegs.",
        ] },
      ],
      faqs: [
        { q: "Klettern die Löwen am Lake Manyara wirklich auf Bäume?", a: "Manchmal, aber Sichtungen sind selten. Baumkletternde Löwen gibt es in einigen Parks Ostafrikas, und Manyara ist einer davon. Planen Sie Ihre Reise nicht danach." },
        { q: "Wie viel Zeit braucht man am Lake Manyara?", a: "Für die meisten Gäste reicht ein halber Tag. Er passt gut in die Fahrt von Arusha nach Karatu oder Ngorongoro." },
      ],
    },
    karatu: {
      name: "Karatu",
      seoTitle: "Lodges in Karatu: Übernachten nahe dem Ngorongoro-Krater",
      description: "Karatu ist ein Ort im Hochland, nah am Tor des Ngorongoro-Schutzgebiets. Warum viele Gäste hier statt am Kraterrand übernachten, und die Lodges in Karatu, mit denen wir arbeiten.",
      h1: "Karatu, der Ausgangspunkt für Ngorongoro",
      lede: "Grüne Hügel, Kaffeefarmen und kühle Abende, nah am Tor zum Ngorongoro. In Karatu übernachten viele unserer Gäste vor oder nach ihrem Tag im Krater.",
      heroAlt: "Gibb's Farm im Hochland von Karatu",
      facts: [["Wo", "Zwischen Lake Manyara und dem Ngorongoro-Schutzgebiet"], ["Ab Arusha", "Etwa 2,5 bis 3 Stunden Fahrt"], ["Zum Krater", "Etwa 30 Minuten zum Tor, dann die Fahrt hinauf zum Rand"], ["Ideal für", "Eine komfortable Nacht nahe dem Krater, zu geringeren Kosten"]],
      sections: [
        { h: "Warum in Karatu übernachten?", p: [
          "Karatu liegt im Hochland direkt vor dem Ngorongoro-Schutzgebiet. Weil es außerhalb des Schutzgebiets liegt, fallen für die Nacht keine Parkgebühren an, und die Lodges sind meist günstiger als am Kraterrand. Es liegt außerdem etwas tiefer und ist wärmer.",
          "Viele Lodges liegen auf Kaffeefarmen und in Gärten, mit gutem Essen und Platz zum Entspannen. Nach einem langen Tag auf Pirschfahrt ist das sehr willkommen.",
        ] },
        { h: "Karatu oder Kraterrand?", p: [
          "Wenn Sie die Aussicht und den frühesten Start in den <a href=\"/parks/ngorongoro-crater\">Ngorongoro-Krater</a> möchten, übernachten Sie am Rand. Wenn Sie sparen möchten oder mit Kindern reisen, die sich über Garten und Pool freuen, ist Karatu eine sehr gute Wahl. Wir sagen Ihnen ehrlich, was besser zu Ihrer Reise passt.",
        ] },
        { h: "Übernachten in Karatu", p: [
          "Das sind die Lodges in Karatu, mit denen wir arbeiten, von komfortablen Familienbetrieben bis zu einigen der besten Lodges im Norden Tansanias.",
        ] },
      ],
      faqs: [
        { q: "Wie weit ist Karatu vom Ngorongoro-Krater entfernt?", a: "Etwa 30 Minuten bis zum Tor des Schutzgebiets, dann noch rund 30 bis 45 Minuten hinauf zum Rand und über die Kraterstraße hinunter." },
        { q: "Besser in Karatu oder am Ngorongoro-Kraterrand übernachten?", a: "Der Kraterrand ist näher und die Aussicht schöner. Karatu ist günstiger, wärmer und ohne Gebühren für das Schutzgebiet in der Nacht. Beides funktioniert gut." },
      ],
    },
  },

  fr: {
    "serengeti-national-park": {
      name: "Parc national du Serengeti",
      seoTitle: "Safari au Serengeti : meilleure période, faune et lodges",
      description: "Le Serengeti vu par un guide local : où dormir, quand partir pour la Grande Migration et les grands félins, les frais de parc et combien de nuits prévoir. Safaris privés au départ d'Arusha.",
      h1: "Parc national du Serengeti",
      lede: "Des plaines à perte de vue, la Grande Migration et plus de lions que presque partout ailleurs en Afrique. Le Serengeti est le parc pour lequel viennent la plupart de nos voyageurs, et il déçoit rarement.",
      heroAlt: "Des éléphants dans les grandes plaines du Serengeti",
      facts: [["Superficie", "Environ 14 750 km²"], ["Depuis Arusha", "Une journée de route via le Ngorongoro, ou un court vol"], ["Idéal pour", "La Grande Migration, les lions, les guépards, les léopards"], ["Notre conseil", "2 à 3 nuits, plus si vous suivez les troupeaux"], ["Droit d'entrée", "82,60 $ par adulte et par 24 heures"]],
      sections: [
        { h: "Pourquoi le Serengeti est unique", p: [
          "Le Serengeti est inscrit au patrimoine mondial de l'UNESCO et forme, avec le Maasai Mara au Kenya, un seul et même écosystème. Bien plus d'un million de gnous y circulent toute l'année, avec des centaines de milliers de zèbres et de gazelles, en suivant la pluie et l'herbe fraîche. Les prédateurs les suivent.",
          "Ce qui surprend le plus nos voyageurs, c'est l'espace. Vous roulez une heure à travers la savane, puis vous arrivez à un groupe de kopjes, ces amas de rochers de granit, avec une troupe de lions endormie au sommet. Rien à voir avec une réserve clôturée.",
        ] },
        { h: "Quelle partie du Serengeti ?", p: [
          "Le centre du Serengeti (Seronera) abrite des animaux toute l'année, et la vallée de la rivière Seronera est l'un des meilleurs endroits d'Afrique pour les grands félins. Si vous avez deux nuits et pas de mois imposé, c'est généralement là que nous logeons.",
          "Les plaines du sud et la région de Ndutu accueillent les troupeaux pour la mise bas, environ de janvier à mars. Ndutu se trouve juste à l'intérieur de l'aire de conservation du Ngorongoro, en bordure du Serengeti.",
          "Le corridor ouest suit la rivière Grumeti, que les troupeaux traversent généralement vers juin. Dans le nord du Serengeti, près de la frontière kenyane, les traversées de la rivière Mara ont lieu environ de juillet à octobre. C'est loin d'Arusha, nous y prévoyons donc au moins deux nuits.",
        ] },
        { h: "Quand partir ?", p: [
          "Il n'y a pas de mauvais mois au Serengeti, seulement des mois différents. De juin à octobre, c'est la saison sèche : les animaux sont faciles à trouver, mais c'est la période la plus fréquentée et la plus chère. De janvier à mars, c'est la saison des naissances dans le sud. Avril et mai sont la grande saison des pluies : certains camps ferment, mais le parc est vert, calme et moins cher.",
          "Notre guide de la <a href=\"/great-migration-serengeti\">Grande Migration mois par mois</a> explique où se trouvent généralement les troupeaux, et notre article sur <a href=\"/post/best-time-to-visit-tanzania-for-a-safari-month-by-month-guide\">la meilleure période pour la Tanzanie</a> couvre aussi les autres parcs.",
        ] },
        { h: "Comment y aller ?", p: [
          "La plupart de nos voyageurs y vont en voiture. La route depuis Arusha longe le lac Manyara et traverse les hauts plateaux du Ngorongoro : le trajet fait déjà partie du safari. Avec les observations en chemin, il prend la plus grande partie de la journée. Vous pouvez aussi prendre un vol d'Arusha vers l'une des pistes du Serengeti et y retrouver votre guide.",
        ] },
        { h: "Où dormir ?", p: [
          "Vous pouvez camper dans un camping public, dormir dans un camp de tentes confortable ou choisir l'un des camps de luxe. Voici les camps et lodges avec lesquels nous travaillons. Ils sont inclus dans les prix de notre planificateur, vous pouvez donc les comparer pour vos dates.",
        ] },
      ],
      faqs: [
        { q: "Combien de jours faut-il au Serengeti ?", a: "Deux journées complètes, donc trois nuits, est un bon minimum. Avec une seule nuit, vous arrivez l'après-midi, repartez le lendemain matin et passez l'essentiel du temps sur la route." },
        { q: "Peut-on voir les Big Five au Serengeti ?", a: "On y voit régulièrement lions, léopards, éléphants et buffles. Les rhinocéros y sont rares, c'est pourquoi nous l'associons généralement au cratère du Ngorongoro, l'un des meilleurs endroits de Tanzanie pour observer le rhinocéros noir." },
        { q: "Le Serengeti vaut-il le coup pour un safari court ?", a: "Avec moins de quatre jours, souvent pas. La route depuis Arusha prend presque une journée à l'aller comme au retour. Sur trois jours, Tarangire et le cratère du Ngorongoro vous laissent généralement plus de temps avec les animaux." },
      ],
    },
    "ngorongoro-crater": {
      name: "Cratère du Ngorongoro",
      seoTitle: "Safari au cratère du Ngorongoro : faune, frais et hébergement",
      description: "Tout pour préparer une journée dans le cratère du Ngorongoro : ce que vous pouvez voir, les frais d'accès au cratère, dormir sur le bord ou à Karatu, et la meilleure période. Par un guide local d'Arusha.",
      h1: "Cratère du Ngorongoro",
      lede: "Un volcan effondré dont le fond regorge d'animaux. Une journée dans le cratère du Ngorongoro est l'une des meilleures occasions de voir un rhinocéros noir en Tanzanie, et elle s'intègre dans presque tous les safaris.",
      heroAlt: "Un véhicule de safari au fond du cratère du Ngorongoro",
      facts: [["Fond du cratère", "Environ 260 km², à quelque 600 m sous le bord"], ["Depuis Arusha", "Environ 3 à 4 heures de route"], ["Idéal pour", "Rhinocéros noirs, lions, hyènes, flamants"], ["Notre conseil", "Une demi-journée ou une journée au fond du cratère"], ["Frais", "71,80 $ par adulte et par 24 heures, plus 295 $ par véhicule pour descendre dans le cratère"]],
      sections: [
        { h: "Ce qui rend le cratère unique", p: [
          "Le cratère du Ngorongoro est l'une des plus grandes caldeiras volcaniques intactes du monde. Il se trouve dans l'aire de conservation du Ngorongoro, inscrite au patrimoine mondial de l'UNESCO. Des parois abruptes entourent un fond de prairies, de marais, de forêt et un lac de soude, où vivent de nombreux animaux toute l'année.",
          "Comme la zone est petite et ouverte, vous voyez beaucoup en quelques heures : gnous, zèbres, buffles, lions, hyènes tachetées, éléphants et, avec un peu de patience, des rhinocéros noirs. Les flamants viennent souvent se nourrir dans le lac Magadi, au fond du cratère. Contrairement à la plupart des parcs nationaux, des familles massaï vivent dans l'aire de conservation et y font paître leur bétail.",
        ] },
        { h: "Une journée dans le cratère", p: [
          "Nous descendons tôt par la piste du cratère, passons la journée au fond et remontons l'après-midi. Beaucoup de voyageurs font le cratère le dernier jour de leur safari, sur le chemin du retour vers Arusha.",
          "Chaque véhicule paie des frais pour descendre au fond du cratère, en plus du droit d'entrée de l'aire de conservation par personne. Quand un voyage dans notre planificateur comprend une nuit au Ngorongoro, le safari dans le cratère est toujours inclus.",
        ] },
        { h: "Bord du cratère ou Karatu ?", p: [
          "Vous pouvez dormir sur le bord du cratère, bien au-dessus du fond, ou à <a href=\"/parks/karatu\">Karatu</a>, à environ une demi-heure de l'entrée de l'aire de conservation. Sur le bord, vous êtes plus près du cratère, la vue est spectaculaire et vous descendez tôt. Karatu est moins cher et plus chaud, et la nuit n'entraîne pas de droit d'entrée pour l'aire de conservation.",
          "Le bord du cratère se trouve à plus de 2 000 m d'altitude, les nuits y sont donc froides toute l'année. Prévoyez une veste chaude.",
        ] },
        { h: "Quand partir ?", p: [
          "Le cratère est intéressant toute l'année, car les animaux n'en migrent pas. De juin à octobre, il fait sec et il y a du monde. Pendant les mois de pluie, c'est plus calme et très vert. Quel que soit le mois, partir tôt permet d'éviter la foule.",
        ] },
        { h: "Où dormir ?", p: [
          "Voici les camps et lodges du bord du cratère avec lesquels nous travaillons. Le camping public Simba, sur le bord, est l'option économique.",
        ] },
      ],
      faqs: [
        { q: "Peut-on voir des rhinocéros dans le cratère du Ngorongoro ?", a: "Oui. Le cratère abrite une petite population de rhinocéros noirs, et c'est l'un des endroits les plus fiables de Tanzanie pour les voir, même s'ils sont souvent loin et qu'une observation n'est jamais garantie." },
        { q: "Une journée suffit-elle pour le cratère du Ngorongoro ?", a: "Oui. Une demi-journée ou une journée au fond du cratère suffit à la plupart des voyageurs. Dormez sur le bord ou à Karatu pour pouvoir descendre tôt." },
        { q: "Combien coûte la visite du cratère du Ngorongoro ?", a: "Le droit d'entrée de l'aire de conservation est de 71,80 $ par adulte et par 24 heures, et chaque véhicule paie 295 $ pour descendre dans le cratère. Nos prix incluent toujours les deux." },
      ],
    },
    "tarangire-national-park": {
      name: "Parc national de Tarangire",
      seoTitle: "Safari à Tarangire : éléphants, meilleure période et lodges",
      description: "Tarangire se trouve à deux heures d'Arusha et est célèbre pour ses éléphants et ses baobabs. Les conseils d'un guide local : quand partir, combien de temps rester et où dormir.",
      h1: "Parc national de Tarangire",
      lede: "De grands troupeaux d'éléphants, des baobabs géants et une rivière qui attire les animaux pendant toute la saison sèche. Tarangire est proche d'Arusha et c'est souvent le premier parc de nos safaris.",
      heroAlt: "Des zèbres dans la savane du nord de la Tanzanie",
      facts: [["Superficie", "Environ 2 850 km²"], ["Depuis Arusha", "Environ 2 heures de route"], ["Idéal pour", "Éléphants, baobabs, oiseaux"], ["Notre conseil", "1 à 2 nuits"], ["Droit d'entrée", "53,10 $ par adulte et par 24 heures"]],
      sections: [
        { h: "Pourquoi aller à Tarangire ?", p: [
          "Le parc national de Tarangire doit son nom à la rivière Tarangire, qui le traverse. Pendant la saison sèche, quand l'eau vient à manquer ailleurs, la rivière devient un aimant : éléphants, zèbres, gnous, buffles et les lions qui les chassent viennent tous y boire.",
          "C'est l'un des meilleurs endroits de Tanzanie pour voir de grands troupeaux d'éléphants, et ses baobabs millénaires lui donnent un visage unique. C'est aussi un parc magnifique pour les oiseaux, avec des centaines d'espèces recensées.",
        ] },
        { h: "Quand partir ?", p: [
          "Tarangire est à son meilleur environ de juin à octobre, quand les animaux se rassemblent le long de la rivière. Pendant la saison des pluies, beaucoup se dispersent hors du parc, mais il reste très beau et vert, avec bien moins de véhicules.",
        ] },
        { h: "Combien de temps rester ?", p: [
          "Tarangire est assez proche d'Arusha pour une excursion d'une journée, mais une nuit sur place vous permet d'être là tôt le matin et en fin d'après-midi, quand la lumière et les animaux sont au rendez-vous. Pour les voyages plus longs, nous prévoyons souvent deux nuits.",
          "C'est une première étape idéale : vous atterrissez, vous vous reposez à Arusha, et le lendemain midi vous observez déjà des éléphants.",
        ] },
        { h: "Où dormir ?", p: [
          "Il y a un camping public dans le parc, ainsi que des lodges et des camps de tentes à l'intérieur et en bordure. Voici ceux avec lesquels nous travaillons.",
        ] },
      ],
      faqs: [
        { q: "Tarangire vaut-il le détour ?", a: "Oui, surtout de juin à octobre. Il est à deux heures d'Arusha et c'est l'un des meilleurs parcs de Tanzanie pour les éléphants, donc une excellente première étape." },
        { q: "Combien de jours faut-il à Tarangire ?", a: "Une nuit suffit pour la plupart des voyages. Deux nuits permettent de s'éloigner de la rivière et de découvrir les zones plus tranquilles du parc." },
        { q: "Tarangire ou lac Manyara ?", a: "Si vous n'avez le temps que pour un seul, nous conseillons généralement Tarangire : il est plus grand, plus riche en animaux et ses troupeaux d'éléphants sont difficiles à égaler. Le lac Manyara convient pour une demi-journée sur la route du Ngorongoro." },
      ],
    },
    "lake-manyara-national-park": {
      name: "Parc national du lac Manyara",
      seoTitle: "Safari au lac Manyara : faune, meilleure période et lodges",
      description: "Un petit parc verdoyant au pied de l'escarpement du Rift, sur la route du Ngorongoro. Ce que l'on voit au lac Manyara, quand partir et où dormir, par un guide local.",
      h1: "Parc national du lac Manyara",
      lede: "Une étroite bande de forêt, de savane et de lac au pied de l'escarpement de la vallée du Grand Rift. Le lac Manyara est petit, mais il offre beaucoup en une demi-journée.",
      heroAlt: "&Beyond Lake Manyara Tree Lodge",
      facts: [["Situation", "Entre l'escarpement du Rift et le lac Manyara"], ["Depuis Arusha", "Environ 2 heures de route"], ["Idéal pour", "Forêt, babouins, éléphants, oiseaux, vues sur le Rift"], ["Notre conseil", "Une demi-journée ou une journée"], ["Droit d'entrée", "59 $ par adulte et par 24 heures"]],
      sections: [
        { h: "À quoi ressemble le lac Manyara ?", p: [
          "On entre par une forêt alimentée par une nappe souterraine, avec de grands figuiers et acajous nourris par les sources de l'escarpement. Des troupes de babouins et de singes bleus la traversent, et les éléphants se nourrissent à l'ombre.",
          "Plus loin, la forêt s'ouvre sur la savane et les rives du lac, où vivent hippopotames, buffles, girafes et de nombreux oiseaux d'eau. Certaines années, les flamants s'y rassemblent en grand nombre. Le parc est connu pour ses lions qui grimpent aux arbres, mais on les voit bien moins souvent que ne le laissent croire les récits.",
        ] },
        { h: "Est-ce que ça vaut le coup ?", p: [
          "Le lac Manyara se trouve sur la route d'Arusha vers le Ngorongoro et le Serengeti, il est donc facile de l'ajouter pour une demi-journée. C'est un bon choix si vous avez déjà vu Tarangire, si vous aimez les oiseaux ou si vous voulez autre chose que les grandes plaines. Pour un voyage court, Tarangire offre généralement plus d'animaux.",
        ] },
        { h: "Quand partir ?", p: [
          "La saison sèche, de juin à octobre, est la meilleure pour les grands animaux. La saison des pluies est idéale pour les oiseaux, et le parc est alors au plus vert.",
        ] },
        { h: "Où dormir ?", p: [
          "La plupart des lodges sont perchés sur l'escarpement au-dessus du parc ou dans le village de Mto wa Mbu, avec une belle vue sur le lac. Beaucoup de voyageurs dorment plutôt à <a href=\"/parks/karatu\">Karatu</a> et visitent Manyara en chemin.",
        ] },
      ],
      faqs: [
        { q: "Les lions du lac Manyara grimpent-ils vraiment aux arbres ?", a: "Parfois, mais c'est rare. Des lions grimpeurs vivent dans quelques parcs d'Afrique de l'Est, dont Manyara. Ne construisez pas votre voyage autour de ça." },
        { q: "Combien de temps faut-il au lac Manyara ?", a: "Une demi-journée suffit à la plupart des voyageurs. Elle s'intègre bien au trajet d'Arusha vers Karatu ou le Ngorongoro." },
      ],
    },
    karatu: {
      name: "Karatu",
      seoTitle: "Lodges à Karatu : dormir près du cratère du Ngorongoro",
      description: "Karatu est une petite ville des hauts plateaux, tout près de l'entrée de l'aire de conservation du Ngorongoro. Pourquoi beaucoup de voyageurs y dorment plutôt que sur le bord du cratère, et les lodges de Karatu avec lesquels nous travaillons.",
      h1: "Karatu, le camp de base du Ngorongoro",
      lede: "Des collines vertes, des plantations de café et des soirées fraîches, tout près de l'entrée du Ngorongoro. C'est à Karatu que dorment beaucoup de nos voyageurs avant ou après leur journée dans le cratère.",
      heroAlt: "Gibb's Farm sur les hauteurs de Karatu",
      facts: [["Où", "Entre le lac Manyara et l'aire de conservation du Ngorongoro"], ["Depuis Arusha", "Environ 2 h 30 à 3 heures de route"], ["Jusqu'au cratère", "Environ 30 minutes jusqu'à l'entrée, puis la montée vers le bord"], ["Idéal pour", "Une nuit confortable près du cratère, pour moins cher"]],
      sections: [
        { h: "Pourquoi dormir à Karatu ?", p: [
          "Karatu se trouve sur les hauts plateaux, juste à l'extérieur de l'aire de conservation du Ngorongoro. Comme on est en dehors de l'aire de conservation, la nuit n'entraîne pas de droit d'entrée, et les lodges sont généralement moins chers que sur le bord du cratère. Il fait aussi un peu plus chaud, car c'est un peu plus bas.",
          "Beaucoup de lodges sont installés dans des plantations de café et des jardins, avec une bonne cuisine et de l'espace pour se détendre. Après une longue journée de safari, c'est très appréciable.",
        ] },
        { h: "Karatu ou le bord du cratère ?", p: [
          "Si vous voulez la vue et le départ le plus matinal vers le <a href=\"/parks/ngorongoro-crater\">cratère du Ngorongoro</a>, dormez sur le bord. Si vous voulez faire des économies, ou si vous voyagez avec des enfants qui apprécieront un jardin et une piscine, Karatu est un excellent choix. Nous vous dirons honnêtement ce qui convient le mieux à votre voyage.",
        ] },
        { h: "Où dormir à Karatu ?", p: [
          "Voici les lodges de Karatu avec lesquels nous travaillons, des adresses familiales confortables à certains des meilleurs lodges du nord de la Tanzanie.",
        ] },
      ],
      faqs: [
        { q: "À quelle distance se trouve Karatu du cratère du Ngorongoro ?", a: "Environ 30 minutes jusqu'à l'entrée de l'aire de conservation, puis encore 30 à 45 minutes pour monter au bord du cratère et descendre par la piste." },
        { q: "Vaut-il mieux dormir à Karatu ou sur le bord du cratère ?", a: "Le bord du cratère est plus proche et la vue est plus belle. Karatu est moins cher, plus chaud et sans droit d'entrée pour la nuit. Les deux fonctionnent très bien." },
      ],
    },
  },
};
