/**
 * Batteri-landningssidor per kommun i Stockholmsområdet.
 *
 * Genererar /batteri/[stad]-sidor som rankar på "batteri {stad}",
 * "batterilager {stad}", "solcellsbatteri {stad}" och "hemmabatteri {stad}".
 *
 * Skiljt från solceller-sidorna (/solceller/[stad]): där handlar copyn om
 * takförutsättningar och panelinstallation, här om lagringsekonomi,
 * stödtjänster (FCR-D / aFRR), effekttoppar och backup. Det gör sidorna
 * tematiskt unika, inte dubbletter.
 *
 * Strukturell data (namn, preposition, region, grannar) återanvänds från
 * CITIES så att en kommun bara underhålls på ett ställe.
 */
import { CITIES, type CityFact } from "./cities";

export type BatteryCityContent = {
  slug: string;
  /** Kort intro under H1 (en mening). */
  oneLiner: string;
  /** Hero-intro, 80–120 ord, batteri-fokuserad och kommun-specifik. */
  intro: string;
  /** Fakta-bullets, batteri-relevanta. */
  facts: CityFact[];
  /** Lokala förutsättningar, 2 stycken. */
  localContext: { title: string; body: string }[];
};

const CONTENT: BatteryCityContent[] = [
  {
    slug: "solna",
    oneLiner:
      "Batterilager installerat i Solna av elektriker från Vallgatan 9.",
    intro:
      "Solna är vår hemmakommun, och batteri är ofta det som gör en solanläggning här lönsam. Takytorna i Råsunda, Huvudsta och Hagalund är sällan jättestora, så istället för att jaga fler paneler lagrar vi den el du redan producerar och kapar dina dyraste timmar. Med batteriet aktiverat för stödtjänster (FCR-D) tjänar det dessutom pengar när det står stilla. Vi sitter 0 minuter bort och driftsätter, mäter och justerar batteriet själva, ingen underentreprenör.",
    facts: [
      { k: "Nätägare", v: "Ellevio" },
      { k: "Elområde", v: "SE3" },
      { k: "Grönt avdrag batteri", v: "48,5 %" },
      { k: "Vårt lager", v: "Vallgatan 9" },
    ],
    localContext: [
      {
        title: "Stödtjänster nära balansansvariga",
        body:
          "Solna ligger gynnsamt för FCR-D och aFRR, de frekvensreglerande stödtjänster där Svenska kraftnät betalar för att ditt batteri stabiliserar elnätet. Vi aktiverar dem via Energy IQ eller Enequi Core och ser i praktiken 8 000–20 000 kr per år tillbaka beroende på batteriets storlek, utöver det du sparar på egen förbrukning.",
      },
      {
        title: "Rätt storlek, dimensionerad ur förbrukningen",
        body:
          "Vi dimensionerar batteriet efter din faktiska förbrukning, inte efter en broschyr. Tumregeln: årsförbrukningen i kWh delad med 200–275 kalla dygn – en villa med 15 000 kWh per år landar på cirka 55–75 kWh (Easyway byggs ut modulärt, SAJ HS3 i kaskad). Vi mäter ditt dygnsmönster innan vi rekommenderar kapacitet, så att batteriet täcker ett helt dygns förbrukning utan att du betalar för kWh du aldrig använder.",
      },
    ],
  },
  {
    slug: "stockholm",
    oneLiner:
      "Batterilager och hemmabatteri installerat i Stockholm av elektriker med eget montageteam.",
    intro:
      "I Stockholm är det sällan takytan som avgör om en investering lönar sig, det är hur du använder elen. Ett batteri lagrar dagens solel till kvällens topp och kapar de dyra effekttimmarna när hela staden förbrukar samtidigt. I villaområden som Bromma, Hägersten, Älvsjö, Enskede och Farsta installerar vi batterier både till nya solanläggningar och som fristående lager för hus utan paneler. Vi gör en lastanalys av ditt hus innan vi rekommenderar kapacitet, och vi aktiverar batteriet för stödtjänster så att det genererar intäkt, inte bara sparar.",
    facts: [
      { k: "Nätägare", v: "Ellevio + Stockholm Exergi" },
      { k: "Elområde", v: "SE3" },
      { k: "Grönt avdrag batteri", v: "48,5 %" },
      { k: "Vanlig kapacitet", v: "10–30 kWh" },
    ],
    localContext: [
      {
        title: "Effekttariffer gör batteriet lönsamt",
        body:
          "Ellevio i Stockholm har effektbaserad nättariff, du betalar för dina högsta effekttoppar, inte bara för antal kWh. Ett rätt dimensionerat batteri kapar de topparna automatiskt och sänker nätavgiften månad för månad. Vi programmerar batteriet att ladda ur exakt när din effekt skulle ha toppat, vilket de flesta installatörer hoppar över.",
      },
      {
        title: "Batteri utan solceller fungerar också",
        body:
          "Du behöver inte ha solpaneler för att ett batteri ska löna sig i Stockholm. Med dagens spotprisspridning laddar du batteriet på natten när elen är billig och använder den på dagen, så kallad prisarbitrage. Kombinerat med stödtjänster (FCR-D) blir återbetalningstiden för ett rent lager ofta 4–6 år.",
      },
    ],
  },
  {
    slug: "sundbyberg",
    oneLiner:
      "Batterilager installerat i Sundbyberg av elektriker från grannkommunen Solna.",
    intro:
      "Sundbyberg är tätt och husen ofta små, vilket gör batteriet extra värt: när takytan inte räcker för en stor solanläggning får du istället ut maximal nytta av den el du producerar genom att lagra den. I Bromsten, Ör och centrala Sundbyberg installerar vi kompakta väggmonterade batterier (SAJ HS3, Pixii) som tar minimal plats i garaget eller förrådet. Vi mäter din förbrukning innan vi väljer storlek, så att batteriet matchar huset.",
    facts: [
      { k: "Nätägare", v: "Ellevio" },
      { k: "Elområde", v: "SE3" },
      { k: "Grönt avdrag batteri", v: "48,5 %" },
      { k: "Vanlig kapacitet", v: "8–15 kWh" },
    ],
    localContext: [
      {
        title: "Kompakta lager för små utrymmen",
        body:
          "I Sundbyberg är platsen för batteriet ofta den begränsande faktorn, inte ekonomin. Väggmonterade och modulära enheter får plats i garage, tvättstuga eller förråd, och storleken dimensionerar vi ur din årsförbrukning (tumregel: årsförbrukning delad med 200–275 kalla dygn) så att kapaciteten täcker ett dygns förbrukning. Vi tar med oss allt material från lagret i Solna och drar kabeln dolt där det går.",
      },
      {
        title: "Maximera självförbrukningen",
        body:
          "När takytan är liten blir varje producerad kilowattimme dyrbar. Ett batteri höjer din självförbrukning från typiska 30–40 % till 70–80 %, vilket betyder att du köper mindre el från nätet och säljer mindre överskott till lågt pris. Det är där batteriet tjänar in sig snabbast för ett Sundbyberg-hus.",
      },
    ],
  },
  {
    slug: "taby",
    oneLiner:
      "Batterilager installerat i Täby av elektriker som tar med drönaren själv.",
    intro:
      "Täby är villasverige med stora tak och hög elförbrukning, och det gör kommunen till en av de mest lönsamma för batterilager i hela Storstockholm. När solanläggningen ligger på 12–20 kW producerar den mer än huset hinner använda mitt på dagen, och då är batteriet skillnaden mellan att sälja överskott billigt och att använda det själv på kvällen. I Näsbypark, Viggbyholm och Gribbylund installerar vi ofta 20–40 kWh kombinerat med stödtjänster.",
    facts: [
      { k: "Nätägare", v: "Ellevio" },
      { k: "Elområde", v: "SE3" },
      { k: "Grönt avdrag batteri", v: "48,5 %" },
      { k: "Vanlig kapacitet", v: "20–40 kWh" },
    ],
    localContext: [
      {
        title: "Stödtjänster som ger riktig intäkt",
        body:
          "Med en större batteribank i Täby är stödtjänster inte en bonus utan en huvudintäkt. Ett batteri på 20–40 kWh aktiverat för FCR-D ger ofta 15 000–25 000 kr per år tillbaka, samtidigt som det kapar effekttoppar och lagrar solel. Vi aktiverar och övervakar tjänsterna via Energy IQ eller Enequi Core.",
      },
      {
        title: "Dimensionerat för helheten",
        body:
          "Täby-hus har ofta både solceller, värmepump och laddbox. Vi dimensionerar batteriet tillsammans med de andra lasterna så att kapaciteten räcker för kvällens topp när bilen laddar och värmepumpen går. Easyway 46–61 kWh och SAJ HS3 i kaskad är vanliga val för de större husen.",
      },
    ],
  },
  {
    slug: "lidingo",
    oneLiner:
      "Batterilager installerat på Lidingö av elektriker som klarar både villa och fritidshus.",
    intro:
      "På Lidingö handlar batteri ofta lika mycket om trygghet som om ekonomi. Som ö i Stockholms inlopp har delar av Lidingö känsligare nät, och ett batteri med backup-funktion håller frysen, värmen och belysningen igång vid strömavbrott. I Skärsätra, Brevik och Bodal installerar vi batterier som både kapar elkostnaden till vardags och fungerar som reservkraft när det behövs. Vi dimensionerar efter husets förbrukning och om du vill ha backup eller inte.",
    facts: [
      { k: "Nätägare", v: "Ellevio" },
      { k: "Elområde", v: "SE3" },
      { k: "Grönt avdrag batteri", v: "48,5 %" },
      { k: "Vanlig kapacitet", v: "10–25 kWh" },
    ],
    localContext: [
      {
        title: "Backup vid strömavbrott",
        body:
          "Alla batterier ger inte backup, det kräver en växelriktare med ö-driftsfunktion och rätt inkoppling vid elcentralen. Vi installerar batterier som automatiskt kopplar över till ö-drift inom millisekunder vid avbrott, så att hushållet märker minimalt. På Lidingö, där väder och nät ibland prövas, är det en funktion många efterfrågar.",
      },
      {
        title: "Fritidshus och villa",
        body:
          "Vi installerar batterilager både i åretruntbostäder och fritidshus på Lidingö. För hus som står tomma perioder programmerar vi batteriet att underhållsladda och prioritera egenförbrukning när någon är hemma. LFP-celler (järnfosfat) klarar svenska temperaturväxlingar bättre och är vårt standardval här.",
      },
    ],
  },
  {
    slug: "sollentuna",
    oneLiner:
      "Batterilager installerat i Sollentuna av elektriker med eget lager i Solna.",
    intro:
      "I Sollentuna ser vi oftast batteriet som en del av ett helhetsprojekt, sol, batteri och värmepump i samma installation. Edsberg, Helenelund, Häggvik och Rotebro har en mix av äldre 70-talsvillor och nybyggda hus, och i båda fallen är det kombinationen som ger ekonomi. Batteriet lagrar solelen, jämnar ut värmepumpens elbehov och kapar effekttopparna. Vi dimensionerar alla delar tillsammans så att de spelar med varandra istället för att slåss om samma kilowatt.",
    facts: [
      { k: "Nätägare", v: "Ellevio" },
      { k: "Elområde", v: "SE3" },
      { k: "Grönt avdrag batteri", v: "48,5 %" },
      { k: "Vanlig kapacitet", v: "15–30 kWh" },
    ],
    localContext: [
      {
        title: "Batteri + värmepump i samklang",
        body:
          "En värmepump är husets största enskilda ellast på vintern. Ett batteri som är rätt dimensionerat lagrar billig el och driver pumpen under de dyraste timmarna. Vi räknar på elbehovet tillsammans, så att batterikapaciteten täcker kvällstoppen när både värme och hushåll går för fullt.",
      },
      {
        title: "Ett projekt, ett ansvar",
        body:
          "Att ta sol, batteri och laddbox i samma installation är billigare än att dela upp i etapper, en föranmälan, en driftsättning, en kontakt. Vi sköter all kommunikation med Ellevio och kommunen och driftsätter hela systemet samtidigt så att delarna är optimerade mot varandra från dag ett.",
      },
    ],
  },
  {
    slug: "nacka",
    oneLiner:
      "Batterilager installerat i Nacka av elektriker med drönarbesiktning på varje tak.",
    intro:
      "Nacka är stort och varierat, från radhus i Sickla till stora villor i Saltsjöbaden och Boo, och batteribehovet varierar lika mycket. Här är Vattenfall nätägare (inte Ellevio), vilket påverkar både tariff och anmälan, och vi kan deras rutiner utan och innan. Ett batteri i Nacka lagrar solelen, kapar effekttoppar och kan aktiveras för stödtjänster. För de större husen i Saltsjöbaden installerar vi ofta batteribanker på 20–40 kWh.",
    facts: [
      { k: "Nätägare", v: "Vattenfall Eldistribution" },
      { k: "Elområde", v: "SE3" },
      { k: "Grönt avdrag batteri", v: "48,5 %" },
      { k: "Vanlig kapacitet", v: "15–40 kWh" },
    ],
    localContext: [
      {
        title: "Vattenfall som nätägare",
        body:
          "Nacka avviker från flertalet Storstockholm-kommuner genom att Vattenfall Eldistribution är nätägare. Vi har full erfarenhet av Vattenfalls installatörsportal och deras effekttariff, vilket avgör hur batteriet ska programmeras för att kapa rätt toppar. Kunden märker ingen skillnad, vi sköter all kommunikation.",
      },
      {
        title: "Skogsnära nät och backup",
        body:
          "Stora delar av Nacka är skogsnära med luftledningar, där strömavbrott är vanligare än i innerstaden. Ett batteri med ö-driftsfunktion ger backup för de viktigaste lasterna. Vi installerar LFP-batterier med automatisk överkoppling så att hushållet klarar avbrott utan reservaggregat.",
      },
    ],
  },
  {
    slug: "danderyd",
    oneLiner:
      "Batterilager installerat i Danderyd av elektriker som tar premiuminstallationer på allvar.",
    intro:
      "Danderyd-villor har ofta hög elförbrukning, gott om plats och ägare som vill ha en genomtänkt lösning, vilket gör kommunen till en av de bästa för större batterilager i Stockholm. I Stocksund, Djursholm och Enebyberg installerar vi batteribanker på 20–60 kWh som både kapar de dyra effekttopparna och genererar stödtjänstintäkt. Med FCR-D aktiverat kommer återbetalningstiden för batteriet ofta under tre år för de hus som har förbrukningen att matcha.",
    facts: [
      { k: "Nätägare", v: "Ellevio" },
      { k: "Elområde", v: "SE3" },
      { k: "Grönt avdrag batteri", v: "48,5 %" },
      { k: "Vanlig kapacitet", v: "20–60 kWh" },
    ],
    localContext: [
      {
        title: "Stödtjänster ger snabb återbetalning",
        body:
          "Easyway 46–61 kWh och SAJ HS3 i kaskad är vanliga val i Danderyd. Med en batteribank av den storleken aktiverad för FCR-D ser vi stödtjänstintäkter på 20 000–35 000 kr per år, vilket tillsammans med kapade effekttoppar och egen solel pressar ner återbetalningstiden under tre år för hus med hög förbrukning.",
      },
      {
        title: "Diskret installation",
        body:
          "Danderyd-kunder bryr sig om hur installationen ser ut. Vi placerar batterierna i teknikrum eller garage, drar kablage dolt och dokumenterar systemet så att det går att följa upp. En större batteribank ska vara lika prydlig som resten av huset, inte en rad lådor på en vägg.",
      },
    ],
  },
];

export type BatteryCity = {
  slug: string;
  name: string;
  preposition: "i" | "på";
  region: string;
  neighbors: string[];
} & BatteryCityContent;

/** Slår ihop strukturell stadsdata med batteri-specifik copy. */
export const BATTERY_CITIES: BatteryCity[] = CONTENT.map((c) => {
  const base = CITIES.find((city) => city.slug === c.slug);
  if (!base) {
    throw new Error(`battery-cities: okänd stad-slug "${c.slug}"`);
  }
  return {
    ...c,
    name: base.name,
    preposition: base.preposition,
    region: base.region,
    neighbors: base.neighbors,
  };
});

export function findBatteryCity(slug: string): BatteryCity | undefined {
  return BATTERY_CITIES.find((c) => c.slug === slug);
}
