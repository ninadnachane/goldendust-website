// Dutch, German, French, Italian and Spanish text for the park guides (src/data/parks.ts). Links inside the text
// are written without the language prefix; the page adds it.
import type { Park } from "../parks";

type ParkText = Pick<Park, "name" | "seoTitle" | "description" | "h1" | "lede" | "heroAlt" | "facts" | "sections" | "faqs">;
type Lang3 = "nl" | "de" | "fr" | "it" | "es";

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
  it: {
    "serengeti-national-park": {
      name: "Parco nazionale del Serengeti",
      seoTitle: "Safari nel Serengeti: periodo migliore, fauna e lodge",
      description: "Il Serengeti visto da una guida locale: dove dormire, quando andare per la Grande Migrazione e i grandi felini, le tariffe del parco e quante notti prevedere. Safari privati da Arusha.",
      h1: "Parco nazionale del Serengeti",
      lede: "Pianure senza fine, la Grande Migrazione e più leoni che quasi ovunque in Africa. Il Serengeti è il parco per cui viene la maggior parte dei nostri ospiti, e raramente delude.",
      heroAlt: "Elefanti nelle ampie pianure del Serengeti",
      facts: [["Superficie", "Circa 14.750 km²"], ["Da Arusha", "Una giornata di strada passando da Ngorongoro, oppure un breve volo"], ["Ideale per", "La Grande Migrazione, leoni, ghepardi, leopardi"], ["Il nostro consiglio", "2-3 notti, di più se segui le mandrie"], ["Ingresso", "$82,60 per adulto ogni 24 ore"]],
      sections: [
        { h: "Perché il Serengeti è speciale", p: [
          "Il Serengeti è Patrimonio dell'umanità UNESCO e forma un unico ecosistema con il Maasai Mara, in Kenya. Ben più di un milione di gnu lo percorrono tutto l'anno, insieme a centinaia di migliaia di zebre e gazzelle, seguendo la pioggia e l'erba fresca. I predatori li seguono.",
          "Quello che sorprende di più i nostri ospiti è lo spazio. Guidi per un'ora nella savana, poi arrivi a un gruppo di kopje, ammassi di rocce di granito, con un branco di leoni addormentato in cima. Non ha niente a che vedere con una riserva recintata.",
        ] },
        { h: "Quale parte del Serengeti?", p: [
          "Il Serengeti centrale (Seronera) ha animali tutto l'anno, e la valle del fiume Seronera è uno dei posti migliori d'Africa per i grandi felini. Se hai due notti e nessun mese obbligato, di solito è lì che alloggiamo.",
          "Le pianure del sud e la zona di Ndutu accolgono le mandrie per le nascite, più o meno da gennaio a marzo. Ndutu si trova appena dentro l'Area di conservazione di Ngorongoro, al margine del Serengeti.",
          "Il corridoio occidentale segue il fiume Grumeti, che le mandrie di solito attraversano intorno a giugno. Nel Serengeti settentrionale, vicino al confine con il Kenya, gli attraversamenti del fiume Mara avvengono più o meno da luglio a ottobre. È lontano da Arusha, quindi lì prevediamo almeno due notti.",
        ] },
        { h: "Quando andare?", p: [
          "Nel Serengeti non ci sono mesi sbagliati, solo mesi diversi. Da giugno a ottobre è la stagione secca: gli animali si trovano facilmente, ma è il periodo più affollato e più caro. Da gennaio a marzo è la stagione delle nascite al sud. Aprile e maggio sono la stagione delle grandi piogge: alcuni campi chiudono, ma il parco è verde, tranquillo e meno caro.",
          "La nostra guida alla <a href=\"/great-migration-serengeti\">Grande Migrazione mese per mese</a> spiega dove si trovano di solito le mandrie, e il nostro articolo sul <a href=\"/post/best-time-to-visit-tanzania-for-a-safari-month-by-month-guide\">periodo migliore per la Tanzania</a> copre anche gli altri parchi.",
        ] },
        { h: "Come arrivarci", p: [
          "La maggior parte dei nostri ospiti ci arriva in auto. La strada da Arusha passa accanto al Lago Manyara e attraversa gli altopiani di Ngorongoro: il viaggio fa già parte del safari. Con gli avvistamenti lungo la strada, occupa quasi tutta la giornata. Puoi anche volare da Arusha a una delle piste del Serengeti e incontrare lì la tua guida.",
        ] },
        { h: "Dove dormire", p: [
          "Puoi campeggiare in un campeggio pubblico, dormire in un campo tendato confortevole o scegliere uno dei campi di lusso. Questi sono i campi e i lodge con cui lavoriamo. Sono inclusi nei prezzi del nostro planner, così puoi confrontarli per le tue date.",
        ] },
      ],
      faqs: [
        { q: "Quanti giorni servono nel Serengeti?", a: "Due giorni interi, quindi tre notti, sono un buon minimo. Con una sola notte arrivi nel pomeriggio, riparti la mattina dopo e passi la maggior parte del tempo in strada." },
        { q: "Si vedono i Big Five nel Serengeti?", a: "Leoni, leopardi, elefanti e bufali si vedono regolarmente. I rinoceronti invece sono rari, per questo di solito lo abbiniamo al cratere di Ngorongoro, uno dei posti migliori della Tanzania per vedere il rinoceronte nero." },
        { q: "Il Serengeti vale la pena per un safari breve?", a: "Con meno di quattro giorni, spesso no. La strada da Arusha richiede quasi una giornata all'andata e una al ritorno. In tre giorni, Tarangire e il cratere di Ngorongoro di solito ti lasciano più tempo con gli animali." },
      ],
    },
    "ngorongoro-crater": {
      name: "Cratere di Ngorongoro",
      seoTitle: "Safari nel cratere di Ngorongoro: fauna, tariffe e dove dormire",
      description: "Tutto per organizzare una giornata nel cratere di Ngorongoro: cosa puoi vedere, le tariffe per scendere nel cratere, dormire sul bordo o a Karatu e il periodo migliore. Da una guida locale di Arusha.",
      h1: "Cratere di Ngorongoro",
      lede: "Un vulcano crollato con il fondo pieno di animali. Una giornata nel cratere di Ngorongoro è una delle migliori occasioni per vedere un rinoceronte nero in Tanzania, e si inserisce in quasi ogni safari.",
      heroAlt: "Un veicolo da safari sul fondo del cratere di Ngorongoro",
      facts: [["Fondo del cratere", "Circa 260 km², circa 600 m sotto il bordo"], ["Da Arusha", "Circa 3-4 ore di strada"], ["Ideale per", "Rinoceronti neri, leoni, iene, fenicotteri"], ["Il nostro consiglio", "Mezza giornata o una giornata intera sul fondo del cratere"], ["Tariffe", "$71,80 per adulto ogni 24 ore, più $295 per veicolo per scendere nel cratere"]],
      sections: [
        { h: "Cosa rende speciale il cratere", p: [
          "Il cratere di Ngorongoro è una delle più grandi caldere vulcaniche intatte del mondo. Si trova nell'Area di conservazione di Ngorongoro, Patrimonio dell'umanità UNESCO. Pareti ripide circondano un fondo di praterie, paludi, foresta e un lago salato, dove molti animali vivono tutto l'anno.",
          "Dato che la zona è piccola e aperta, in poche ore vedi moltissimo: gnu, zebre, bufali, leoni, iene maculate, elefanti e, con un po' di pazienza, rinoceronti neri. I fenicotteri vengono spesso a nutrirsi nel lago Magadi, sul fondo del cratere. A differenza della maggior parte dei parchi nazionali, nell'area di conservazione vivono famiglie masai che portano qui al pascolo il loro bestiame.",
        ] },
        { h: "Una giornata nel cratere", p: [
          "Scendiamo presto per la pista del cratere, passiamo la giornata sul fondo e risaliamo nel pomeriggio. Molti ospiti fanno il cratere l'ultimo giorno del safari, sulla via del ritorno ad Arusha.",
          "Ogni veicolo paga una tariffa per scendere sul fondo del cratere, oltre all'ingresso a persona dell'area di conservazione. Quando un viaggio nel nostro planner include una notte a Ngorongoro, il game drive nel cratere è sempre compreso.",
        ] },
        { h: "Bordo del cratere o Karatu?", p: [
          "Puoi dormire sul bordo del cratere, alto sopra il fondo, oppure a <a href=\"/parks/karatu\">Karatu</a>, a circa mezz'ora dall'ingresso dell'area di conservazione. Sul bordo sei più vicino al cratere, il panorama è spettacolare e scendi presto. Karatu è meno cara e più calda, e la notte non comporta l'ingresso all'area di conservazione.",
          "Il bordo del cratere supera i 2.000 m di altitudine, quindi le notti sono fredde tutto l'anno. Porta una giacca pesante.",
        ] },
        { h: "Quando andare?", p: [
          "Il cratere è bello tutto l'anno, perché gli animali non migrano via. Da giugno a ottobre è secco e affollato. Nei mesi di pioggia è più tranquillo e molto verde. In qualsiasi mese, partire presto aiuta a evitare la folla.",
        ] },
        { h: "Dove dormire", p: [
          "Questi sono i campi e i lodge sul bordo del cratere con cui lavoriamo. Il campeggio pubblico Simba, sul bordo, è l'opzione economica.",
        ] },
      ],
      faqs: [
        { q: "Si vedono i rinoceronti nel cratere di Ngorongoro?", a: "Sì. Il cratere ospita una piccola popolazione di rinoceronti neri ed è uno dei posti più affidabili della Tanzania per vederli, anche se spesso sono lontani e un avvistamento non è mai garantito." },
        { q: "Basta una giornata per il cratere di Ngorongoro?", a: "Sì. Mezza giornata o una giornata intera sul fondo del cratere basta alla maggior parte dei viaggiatori. Dormi sul bordo o a Karatu per poter scendere presto." },
        { q: "Quanto costa visitare il cratere di Ngorongoro?", a: "L'ingresso all'area di conservazione costa $71,80 per adulto ogni 24 ore, e ogni veicolo paga $295 per scendere nel cratere. I nostri prezzi li includono sempre entrambi." },
      ],
    },
    "tarangire-national-park": {
      name: "Parco nazionale del Tarangire",
      seoTitle: "Safari a Tarangire: elefanti, periodo migliore e lodge",
      description: "Tarangire è a due ore da Arusha ed è famoso per elefanti e baobab. I consigli di una guida locale: quando andare, quanto fermarsi e dove dormire.",
      h1: "Parco nazionale del Tarangire",
      lede: "Grandi mandrie di elefanti, baobab giganti e un fiume che attira gli animali per tutta la stagione secca. Tarangire è vicino ad Arusha ed è spesso il primo parco dei nostri safari.",
      heroAlt: "Zebre nella savana del nord della Tanzania",
      facts: [["Superficie", "Circa 2.850 km²"], ["Da Arusha", "Circa 2 ore di strada"], ["Ideale per", "Elefanti, baobab, uccelli"], ["Il nostro consiglio", "1-2 notti"], ["Ingresso", "$53,10 per adulto ogni 24 ore"]],
      sections: [
        { h: "Perché andare a Tarangire", p: [
          "Il Parco nazionale del Tarangire prende il nome dal fiume Tarangire, che lo attraversa. Nella stagione secca, quando altrove l'acqua scarseggia, il fiume diventa una calamita: elefanti, zebre, gnu, bufali e i leoni che li cacciano vengono tutti a bere qui.",
          "È uno dei posti migliori della Tanzania per vedere grandi mandrie di elefanti, e i suoi baobab millenari gli danno un aspetto unico. È anche un parco splendido per gli uccelli, con centinaia di specie registrate.",
        ] },
        { h: "Quando andare?", p: [
          "Tarangire dà il meglio più o meno da giugno a ottobre, quando gli animali si radunano lungo il fiume. Nella stagione delle piogge molti si spostano fuori dal parco, ma resta bellissimo e verde, con molti meno veicoli.",
        ] },
        { h: "Quanto fermarsi?", p: [
          "Tarangire è abbastanza vicino ad Arusha per una gita in giornata, ma una notte nel parco ti permette di essere lì presto la mattina e nel tardo pomeriggio, quando la luce e gli animali danno il meglio. Per i viaggi più lunghi spesso prevediamo due notti.",
          "È una prima tappa perfetta: atterri, ti riposi ad Arusha e il giorno dopo a mezzogiorno stai già guardando gli elefanti.",
        ] },
        { h: "Dove dormire", p: [
          "Nel parco c'è un campeggio pubblico, oltre a lodge e campi tendati dentro e ai margini del parco. Questi sono quelli con cui lavoriamo.",
        ] },
      ],
      faqs: [
        { q: "Vale la pena visitare Tarangire?", a: "Sì, soprattutto da giugno a ottobre. È a due ore da Arusha ed è uno dei migliori parchi della Tanzania per gli elefanti, quindi un'ottima prima tappa." },
        { q: "Quanti giorni servono a Tarangire?", a: "Una notte basta per la maggior parte dei viaggi. Due notti ti permettono di allontanarti dal fiume e scoprire le zone più tranquille del parco." },
        { q: "Tarangire o Lago Manyara?", a: "Se hai tempo solo per uno, di solito consigliamo Tarangire: è più grande, più ricco di animali e le sue mandrie di elefanti sono difficili da battere. Il Lago Manyara va bene per mezza giornata sulla strada per Ngorongoro." },
      ],
    },
    "lake-manyara-national-park": {
      name: "Parco nazionale del Lago Manyara",
      seoTitle: "Safari al Lago Manyara: fauna, periodo migliore e lodge",
      description: "Un piccolo parco verde ai piedi della scarpata della Rift Valley, sulla strada per Ngorongoro. Cosa si vede al Lago Manyara, quando andare e dove dormire, da una guida locale.",
      h1: "Parco nazionale del Lago Manyara",
      lede: "Una stretta striscia di foresta, savana e lago ai piedi della scarpata della Great Rift Valley. Il Lago Manyara è piccolo, ma in mezza giornata offre molto.",
      heroAlt: "&Beyond Lake Manyara Tree Lodge",
      facts: [["Posizione", "Tra la scarpata della Rift Valley e il Lago Manyara"], ["Da Arusha", "Circa 2 ore di strada"], ["Ideale per", "Foresta, babbuini, elefanti, uccelli, panorami sulla Rift Valley"], ["Il nostro consiglio", "Mezza giornata o una giornata intera"], ["Ingresso", "$59 per adulto ogni 24 ore"]],
      sections: [
        { h: "Com'è il Lago Manyara?", p: [
          "Si entra attraverso una foresta alimentata da una falda sotterranea, con grandi fichi e mogani nutriti dalle sorgenti della scarpata. La attraversano gruppi di babbuini e cercopitechi blu, e gli elefanti si nutrono all'ombra.",
          "Più avanti la foresta si apre sulla savana e sulle rive del lago, dove vivono ippopotami, bufali, giraffe e molti uccelli acquatici. In alcuni anni i fenicotteri si radunano qui in gran numero. Il parco è noto per i leoni che si arrampicano sugli alberi, ma si vedono molto meno spesso di quanto facciano pensare i racconti.",
        ] },
        { h: "Vale la pena?", p: [
          "Il Lago Manyara si trova sulla strada da Arusha a Ngorongoro e al Serengeti, quindi è facile aggiungerlo per mezza giornata. È una buona scelta se hai già visto Tarangire, se ami gli uccelli o se vuoi qualcosa di diverso dalle grandi pianure. Per un viaggio breve, Tarangire di solito offre più animali.",
        ] },
        { h: "Quando andare?", p: [
          "La stagione secca, da giugno a ottobre, è la migliore per i grandi animali. La stagione delle piogge è ideale per gli uccelli, e il parco è al massimo del verde.",
        ] },
        { h: "Dove dormire", p: [
          "La maggior parte dei lodge si trova sulla scarpata sopra il parco o nel villaggio di Mto wa Mbu, con una bella vista sul lago. Molti ospiti dormono invece a <a href=\"/parks/karatu\">Karatu</a> e visitano Manyara lungo la strada.",
        ] },
      ],
      faqs: [
        { q: "I leoni del Lago Manyara si arrampicano davvero sugli alberi?", a: "A volte, ma è raro. Leoni che si arrampicano vivono in alcuni parchi dell'Africa orientale, tra cui Manyara. Non costruire il viaggio intorno a questo." },
        { q: "Quanto tempo serve al Lago Manyara?", a: "Mezza giornata basta alla maggior parte dei viaggiatori. Si inserisce bene nel tragitto da Arusha a Karatu o Ngorongoro." },
      ],
    },
    karatu: {
      name: "Karatu",
      seoTitle: "Lodge a Karatu: dormire vicino al cratere di Ngorongoro",
      description: "Karatu è una cittadina degli altopiani vicinissima all'ingresso dell'Area di conservazione di Ngorongoro. Perché molti ospiti dormono qui invece che sul bordo del cratere, e i lodge di Karatu con cui lavoriamo.",
      h1: "Karatu, il campo base per Ngorongoro",
      lede: "Colline verdi, piantagioni di caffè e serate fresche, a due passi dall'ingresso di Ngorongoro. È a Karatu che molti dei nostri ospiti dormono prima o dopo la giornata nel cratere.",
      heroAlt: "Gibb's Farm sugli altopiani di Karatu",
      facts: [["Dove", "Tra il Lago Manyara e l'Area di conservazione di Ngorongoro"], ["Da Arusha", "Circa 2,5-3 ore di strada"], ["Fino al cratere", "Circa 30 minuti fino all'ingresso, poi la salita al bordo"], ["Ideale per", "Una notte confortevole vicino al cratere, spendendo meno"]],
      sections: [
        { h: "Perché dormire a Karatu?", p: [
          "Karatu si trova sugli altopiani, appena fuori dall'Area di conservazione di Ngorongoro. Dato che è fuori dall'area di conservazione, la notte non comporta l'ingresso, e i lodge di solito costano meno che sul bordo del cratere. Fa anche un po' più caldo, perché è un po' più in basso.",
          "Molti lodge si trovano in piantagioni di caffè e giardini, con buona cucina e spazio per rilassarsi. Dopo una lunga giornata di safari, fa davvero piacere.",
        ] },
        { h: "Karatu o il bordo del cratere?", p: [
          "Se vuoi il panorama e la partenza più mattiniera verso il <a href=\"/parks/ngorongoro-crater\">cratere di Ngorongoro</a>, dormi sul bordo. Se vuoi risparmiare, o viaggi con bambini che apprezzeranno un giardino e una piscina, Karatu è un'ottima scelta. Ti diremo con sincerità cosa è meglio per il tuo viaggio.",
        ] },
        { h: "Dove dormire a Karatu", p: [
          "Questi sono i lodge di Karatu con cui lavoriamo, da indirizzi familiari e confortevoli ad alcuni dei migliori lodge del nord della Tanzania.",
        ] },
      ],
      faqs: [
        { q: "Quanto dista Karatu dal cratere di Ngorongoro?", a: "Circa 30 minuti fino all'ingresso dell'area di conservazione, poi altri 30-45 minuti per salire al bordo del cratere e scendere per la pista." },
        { q: "Meglio dormire a Karatu o sul bordo del cratere?", a: "Il bordo del cratere è più vicino e il panorama è più bello. Karatu costa meno, è più calda e la notte non comporta l'ingresso all'area di conservazione. Funzionano bene entrambe." },
      ],
    },
  },
  es: {
    "serengeti-national-park": {
      name: "Parque Nacional del Serengeti",
      seoTitle: "Safari en el Serengeti: mejor época, fauna y lodges",
      description: "El Serengeti visto por un guía local: dónde alojarse, cuándo ir para la Gran Migración y los grandes felinos, las tarifas del parque y cuántas noches planear. Safaris privados desde Arusha.",
      h1: "Parque Nacional del Serengeti",
      lede: "Llanuras infinitas, la Gran Migración y más leones que casi en cualquier otro lugar de África. El Serengeti es el parque por el que vienen la mayoría de nuestros viajeros, y rara vez decepciona.",
      heroAlt: "Elefantes en las amplias llanuras del Serengeti",
      facts: [["Superficie", "Unos 14.750 km²"], ["Desde Arusha", "Un día de carretera pasando por el Ngorongoro, o un vuelo corto"], ["Ideal para", "La Gran Migración, leones, guepardos, leopardos"], ["Nuestro consejo", "2-3 noches, más si sigues a las manadas"], ["Entrada", "$82,60 por adulto cada 24 horas"]],
      sections: [
        { h: "Por qué el Serengeti es especial", p: [
          "El Serengeti es Patrimonio Mundial de la UNESCO y forma un único ecosistema con el Maasai Mara de Kenia. Mucho más de un millón de ñus lo recorren durante todo el año, junto con cientos de miles de cebras y gacelas, siguiendo la lluvia y la hierba fresca. Los depredadores van detrás.",
          "Lo que más sorprende a nuestros viajeros es el espacio. Conduces una hora por la sabana y llegas a un grupo de kopjes, montículos de rocas de granito, con una manada de leones durmiendo en lo alto. No se parece en nada a una reserva vallada.",
        ] },
        { h: "¿Qué parte del Serengeti?", p: [
          "El centro del Serengeti (Seronera) tiene animales todo el año, y el valle del río Seronera es uno de los mejores lugares de África para ver grandes felinos. Si tienes dos noches y ningún mes fijo, normalmente nos alojamos allí.",
          "Las llanuras del sur y la zona de Ndutu acogen a las manadas para los partos, aproximadamente de enero a marzo. Ndutu está justo dentro del Área de Conservación del Ngorongoro, en el límite del Serengeti.",
          "El corredor occidental sigue el río Grumeti, que las manadas suelen cruzar hacia junio. En el norte del Serengeti, cerca de la frontera con Kenia, los cruces del río Mara tienen lugar aproximadamente de julio a octubre. Queda lejos de Arusha, así que allí planeamos al menos dos noches.",
        ] },
        { h: "¿Cuándo ir?", p: [
          "En el Serengeti no hay meses malos, solo meses distintos. De junio a octubre es la estación seca: los animales son fáciles de encontrar, pero es la época con más gente y más cara. De enero a marzo es la temporada de partos en el sur. Abril y mayo son la estación de las lluvias largas: algunos campamentos cierran, pero el parque está verde, tranquilo y más barato.",
          "Nuestra guía de la <a href=\"/great-migration-serengeti\">Gran Migración mes a mes</a> explica dónde suelen estar las manadas, y nuestro artículo sobre <a href=\"/post/best-time-to-visit-tanzania-for-a-safari-month-by-month-guide\">la mejor época para visitar Tanzania</a> cubre también los demás parques.",
        ] },
        { h: "Cómo llegar", p: [
          "La mayoría de nuestros viajeros van por carretera. El camino desde Arusha pasa junto al lago Manyara y cruza las tierras altas del Ngorongoro: el trayecto ya forma parte del safari. Con los avistamientos por el camino, ocupa casi todo el día. También puedes volar desde Arusha a una de las pistas del Serengeti y encontrarte allí con tu guía.",
        ] },
        { h: "Dónde alojarse", p: [
          "Puedes acampar en un camping público, dormir en un campamento de tiendas cómodo o elegir uno de los campamentos de lujo. Estos son los campamentos y lodges con los que trabajamos. Están incluidos en los precios de nuestro planificador, así que puedes compararlos para tus fechas.",
        ] },
      ],
      faqs: [
        { q: "¿Cuántos días hacen falta en el Serengeti?", a: "Dos días completos, es decir, tres noches, es un buen mínimo. Con una sola noche llegas por la tarde, te vas a la mañana siguiente y pasas la mayor parte del tiempo en la carretera." },
        { q: "¿Se pueden ver los Cinco Grandes en el Serengeti?", a: "Leones, leopardos, elefantes y búfalos se ven con regularidad. Los rinocerontes son raros, por eso solemos combinarlo con el cráter del Ngorongoro, uno de los mejores lugares de Tanzania para ver el rinoceronte negro." },
        { q: "¿Merece la pena el Serengeti en un safari corto?", a: "Con menos de cuatro días, muchas veces no. La carretera desde Arusha lleva casi un día de ida y otro de vuelta. En tres días, Tarangire y el cráter del Ngorongoro suelen darte más tiempo con los animales." },
      ],
    },
    "ngorongoro-crater": {
      name: "Cráter del Ngorongoro",
      seoTitle: "Safari en el cráter del Ngorongoro: fauna, tarifas y alojamiento",
      description: "Todo para planear un día en el cráter del Ngorongoro: qué puedes ver, las tarifas para bajar al cráter, dormir en el borde o en Karatu y la mejor época. Por un guía local de Arusha.",
      h1: "Cráter del Ngorongoro",
      lede: "Un volcán hundido con el fondo lleno de animales. Un día en el cráter del Ngorongoro es una de las mejores oportunidades de ver un rinoceronte negro en Tanzania, y encaja en casi cualquier safari.",
      heroAlt: "Un vehículo de safari en el fondo del cráter del Ngorongoro",
      facts: [["Fondo del cráter", "Unos 260 km², unos 600 m por debajo del borde"], ["Desde Arusha", "Unas 3-4 horas de carretera"], ["Ideal para", "Rinocerontes negros, leones, hienas, flamencos"], ["Nuestro consejo", "Medio día o un día entero en el fondo del cráter"], ["Tarifas", "$71,80 por adulto cada 24 horas, más $295 por vehículo para bajar al cráter"]],
      sections: [
        { h: "Qué hace especial al cráter", p: [
          "El cráter del Ngorongoro es una de las calderas volcánicas intactas más grandes del mundo. Está dentro del Área de Conservación del Ngorongoro, Patrimonio Mundial de la UNESCO. Paredes empinadas rodean un fondo de praderas, pantanos, bosque y un lago salado, donde viven muchos animales todo el año.",
          "Como la zona es pequeña y abierta, ves muchísimo en pocas horas: ñus, cebras, búfalos, leones, hienas manchadas, elefantes y, con un poco de paciencia, rinocerontes negros. Los flamencos suelen alimentarse en el lago Magadi, en el fondo del cráter. A diferencia de la mayoría de los parques nacionales, en el área de conservación viven familias masáis que llevan aquí a pastar su ganado.",
        ] },
        { h: "Un día en el cráter", p: [
          "Bajamos temprano por la pista del cráter, pasamos el día en el fondo y subimos por la tarde. Muchos viajeros hacen el cráter el último día del safari, de camino de vuelta a Arusha.",
          "Cada vehículo paga una tarifa para bajar al fondo del cráter, además de la entrada por persona al área de conservación. Cuando un viaje en nuestro planificador incluye una noche en el Ngorongoro, el safari en el cráter siempre está incluido.",
        ] },
        { h: "¿Borde del cráter o Karatu?", p: [
          "Puedes dormir en el borde del cráter, muy por encima del fondo, o en <a href=\"/parks/karatu\">Karatu</a>, a una media hora de la entrada del área de conservación. En el borde estás más cerca del cráter, las vistas son espectaculares y bajas temprano. Karatu es más barato y más cálido, y la noche allí no implica pagar entrada al área de conservación.",
          "El borde del cráter está a más de 2.000 m de altitud, así que las noches son frías todo el año. Lleva una chaqueta de abrigo.",
        ] },
        { h: "¿Cuándo ir?", p: [
          "El cráter es bueno todo el año, porque los animales no migran fuera de él. De junio a octubre está seco y hay más gente. En los meses de lluvia está más tranquilo y muy verde. En cualquier mes, salir temprano ayuda a evitar las aglomeraciones.",
        ] },
        { h: "Dónde alojarse", p: [
          "Estos son los campamentos y lodges del borde del cráter con los que trabajamos. El camping público Simba, en el borde, es la opción económica.",
        ] },
      ],
      faqs: [
        { q: "¿Se ven rinocerontes en el cráter del Ngorongoro?", a: "Sí. El cráter alberga una pequeña población de rinocerontes negros y es uno de los lugares más fiables de Tanzania para verlos, aunque a menudo están lejos y nunca se puede garantizar un avistamiento." },
        { q: "¿Basta un día para el cráter del Ngorongoro?", a: "Sí. Medio día o un día entero en el fondo del cráter es suficiente para la mayoría de los viajeros. Duerme en el borde o en Karatu para poder bajar temprano." },
        { q: "¿Cuánto cuesta visitar el cráter del Ngorongoro?", a: "La entrada al área de conservación cuesta $71,80 por adulto cada 24 horas, y cada vehículo paga $295 para bajar al cráter. Nuestros precios siempre incluyen las dos cosas." },
      ],
    },
    "tarangire-national-park": {
      name: "Parque Nacional de Tarangire",
      seoTitle: "Safari en Tarangire: elefantes, mejor época y lodges",
      description: "Tarangire está a dos horas de Arusha y es famoso por sus elefantes y baobabs. Los consejos de un guía local: cuándo ir, cuánto tiempo quedarse y dónde alojarse.",
      h1: "Parque Nacional de Tarangire",
      lede: "Grandes manadas de elefantes, baobabs gigantes y un río que atrae a los animales durante toda la estación seca. Tarangire está cerca de Arusha y suele ser el primer parque de nuestros safaris.",
      heroAlt: "Cebras en la sabana del norte de Tanzania",
      facts: [["Superficie", "Unos 2.850 km²"], ["Desde Arusha", "Unas 2 horas de carretera"], ["Ideal para", "Elefantes, baobabs, aves"], ["Nuestro consejo", "1-2 noches"], ["Entrada", "$53,10 por adulto cada 24 horas"]],
      sections: [
        { h: "Por qué ir a Tarangire", p: [
          "El Parque Nacional de Tarangire debe su nombre al río Tarangire, que lo atraviesa. En la estación seca, cuando escasea el agua en otros lugares, el río se convierte en un imán: elefantes, cebras, ñus, búfalos y los leones que los cazan vienen todos a beber.",
          "Es uno de los mejores lugares de Tanzania para ver grandes manadas de elefantes, y sus baobabs milenarios le dan un aspecto único. También es un parque precioso para las aves, con cientos de especies registradas.",
        ] },
        { h: "¿Cuándo ir?", p: [
          "Tarangire está en su mejor momento aproximadamente de junio a octubre, cuando los animales se concentran a lo largo del río. En la estación de lluvias muchos se dispersan fuera del parque, pero sigue siendo precioso y verde, con muchos menos vehículos.",
        ] },
        { h: "¿Cuánto tiempo quedarse?", p: [
          "Tarangire está lo bastante cerca de Arusha para una excursión de un día, pero una noche en el parque te permite estar allí a primera hora de la mañana y a última de la tarde, cuando la luz y los animales están en su mejor momento. En los viajes más largos solemos planear dos noches.",
          "Es una primera parada perfecta: aterrizas, descansas en Arusha y al mediodía siguiente ya estás viendo elefantes.",
        ] },
        { h: "Dónde alojarse", p: [
          "Hay un camping público dentro del parque, además de lodges y campamentos de tiendas dentro y en los límites del parque. Estos son con los que trabajamos.",
        ] },
      ],
      faqs: [
        { q: "¿Merece la pena visitar Tarangire?", a: "Sí, sobre todo de junio a octubre. Está a dos horas de Arusha y es uno de los mejores parques de Tanzania para ver elefantes, así que es una primera parada excelente." },
        { q: "¿Cuántos días hacen falta en Tarangire?", a: "Una noche basta para la mayoría de los viajes. Dos noches permiten alejarse del río y descubrir las zonas más tranquilas del parque." },
        { q: "¿Tarangire o el lago Manyara?", a: "Si solo tienes tiempo para uno, normalmente recomendamos Tarangire: es más grande, tiene más animales y sus manadas de elefantes son difíciles de superar. El lago Manyara funciona bien para medio día de camino al Ngorongoro." },
      ],
    },
    "lake-manyara-national-park": {
      name: "Parque Nacional del Lago Manyara",
      seoTitle: "Safari en el lago Manyara: fauna, mejor época y lodges",
      description: "Un parque pequeño y verde al pie del escarpe del Rift, de camino al Ngorongoro. Qué se ve en el lago Manyara, cuándo ir y dónde alojarse, por un guía local.",
      h1: "Parque Nacional del Lago Manyara",
      lede: "Una estrecha franja de bosque, sabana y lago al pie del escarpe del Gran Valle del Rift. El lago Manyara es pequeño, pero ofrece mucho en medio día.",
      heroAlt: "&Beyond Lake Manyara Tree Lodge",
      facts: [["Ubicación", "Entre el escarpe del Rift y el lago Manyara"], ["Desde Arusha", "Unas 2 horas de carretera"], ["Ideal para", "Bosque, babuinos, elefantes, aves, vistas del Rift"], ["Nuestro consejo", "Medio día o un día entero"], ["Entrada", "$59 por adulto cada 24 horas"]],
      sections: [
        { h: "¿Cómo es el lago Manyara?", p: [
          "Se entra por un bosque alimentado por aguas subterráneas, con grandes higueras y caobas que se nutren de los manantiales del escarpe. Lo atraviesan grupos de babuinos y monos azules, y los elefantes comen a la sombra.",
          "Más adelante, el bosque se abre a la sabana y a la orilla del lago, donde viven hipopótamos, búfalos, jirafas y muchas aves acuáticas. Algunos años, los flamencos se reúnen aquí en gran número. El parque es conocido por sus leones que trepan a los árboles, pero se ven mucho menos de lo que hacen creer las historias.",
        ] },
        { h: "¿Merece la pena?", p: [
          "El lago Manyara está en la carretera de Arusha al Ngorongoro y el Serengeti, así que es fácil añadirlo para medio día. Es una buena elección si ya has visto Tarangire, si te gustan las aves o si quieres algo distinto de las grandes llanuras. En un viaje corto, Tarangire suele ofrecer más animales.",
        ] },
        { h: "¿Cuándo ir?", p: [
          "La estación seca, de junio a octubre, es la mejor para los animales grandes. La estación de lluvias es ideal para las aves, y el parque está más verde que nunca.",
        ] },
        { h: "Dónde alojarse", p: [
          "La mayoría de los lodges están en lo alto del escarpe sobre el parque o en el pueblo de Mto wa Mbu, con buenas vistas del lago. Muchos viajeros prefieren dormir en <a href=\"/parks/karatu\">Karatu</a> y visitar Manyara de camino.",
        ] },
      ],
      faqs: [
        { q: "¿De verdad los leones del lago Manyara trepan a los árboles?", a: "A veces, pero es raro. Hay leones trepadores en algunos parques de África oriental, entre ellos Manyara. No organices el viaje en torno a eso." },
        { q: "¿Cuánto tiempo hace falta en el lago Manyara?", a: "Medio día es suficiente para la mayoría de los viajeros. Encaja bien en el trayecto de Arusha a Karatu o al Ngorongoro." },
      ],
    },
    karatu: {
      name: "Karatu",
      seoTitle: "Lodges en Karatu: dormir cerca del cráter del Ngorongoro",
      description: "Karatu es un pequeño pueblo de las tierras altas muy cerca de la entrada del Área de Conservación del Ngorongoro. Por qué muchos viajeros duermen aquí en lugar de en el borde del cráter, y los lodges de Karatu con los que trabajamos.",
      h1: "Karatu, el campamento base para el Ngorongoro",
      lede: "Colinas verdes, cafetales y noches frescas, a un paso de la entrada del Ngorongoro. Es en Karatu donde muchos de nuestros viajeros duermen antes o después de su día en el cráter.",
      heroAlt: "Gibb's Farm en las tierras altas de Karatu",
      facts: [["Dónde", "Entre el lago Manyara y el Área de Conservación del Ngorongoro"], ["Desde Arusha", "Unas 2,5-3 horas de carretera"], ["Hasta el cráter", "Unos 30 minutos hasta la entrada, y después la subida al borde"], ["Ideal para", "Una noche cómoda cerca del cráter, gastando menos"]],
      sections: [
        { h: "¿Por qué dormir en Karatu?", p: [
          "Karatu está en las tierras altas, justo a las afueras del Área de Conservación del Ngorongoro. Como queda fuera del área de conservación, la noche no implica pagar entrada, y los lodges suelen ser más baratos que en el borde del cráter. También hace algo más de calor, porque está un poco más bajo.",
          "Muchos lodges están entre cafetales y jardines, con buena cocina y espacio para relajarse. Después de un largo día de safari, se agradece mucho.",
        ] },
        { h: "¿Karatu o el borde del cráter?", p: [
          "Si quieres las vistas y la salida más temprana hacia el <a href=\"/parks/ngorongoro-crater\">cráter del Ngorongoro</a>, duerme en el borde. Si quieres ahorrar, o viajas con niños que disfrutarán de un jardín y una piscina, Karatu es una opción excelente. Te diremos con sinceridad qué encaja mejor con tu viaje.",
        ] },
        { h: "Dónde alojarse en Karatu", p: [
          "Estos son los lodges de Karatu con los que trabajamos, desde casas familiares y cómodas hasta algunos de los mejores lodges del norte de Tanzania.",
        ] },
      ],
      faqs: [
        { q: "¿A qué distancia está Karatu del cráter del Ngorongoro?", a: "Unos 30 minutos hasta la entrada del área de conservación, y después otros 30-45 minutos para subir al borde del cráter y bajar por la pista." },
        { q: "¿Es mejor dormir en Karatu o en el borde del cráter?", a: "El borde del cráter está más cerca y las vistas son mejores. Karatu es más barato, más cálido y la noche no implica pagar entrada. Las dos opciones funcionan muy bien." },
      ],
    },
  },
};
