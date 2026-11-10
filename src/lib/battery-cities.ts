/**
 * Batteri-landningssidor per kommun i Stockholmsområdet.
 *
 * Genererar /batteri/[stad]-sidor som rankar på "batteri {stad}",
 * "batterilager {stad}", "solcellsbatteri {stad}" och "hemmabatteri {stad}".
 *
 * Skiljt från solceller-sidorna (/solceller/[stad]): där handlar copyn om
 * takförutsättningar och panelinstallation, här om lagringsekonomi,
 * prisstyrning och nätbolagets effektavgift. Det gör sidorna
 * tematiskt unika, inte dubbletter.
 *
 * Regler för innehållet: inga intäktsbelopp för stödtjänster och inga
 * "vanliga kapaciteter" eller installationsvolymer utan belägg. Nätägare
 * och effektavgift hämtas från CITIES (`grid`), där källorna står.
 *
 * Strukturell data (namn, preposition, region, grannar) återanvänds från
 * CITIES så att en kommun bara underhålls på ett ställe.
 */
import { CITIES, type CityFact, type CityGrid, type CitySource } from "./cities";

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

const SIZING =
  "Tumregeln är årsförbrukningen i kWh delad med 200–275. En villa med 15 000 kWh per år landar då på cirka 55–75 kWh.";

const NO_TARIFF_VALUE =
  "Utan effektavgift ger kapade effekttoppar ingen besparing på nätfakturan. Batterikalkylen vilar därför på prisstyrning mot spotpriset och på att du använder mer av din egen solel.";

const CONTENT: BatteryCityContent[] = [
  {
    slug: "solna",
    oneLiner: "Batterilager i Solna, installerat från vårt kontor på Vallgatan 9.",
    intro:
      "Solna är vår hemmakommun. Ett batteri sparar solelen till kvällen, laddar när elen är billig och används när den är dyr. Det mesta av lönsamheten kommer från prisstyrning och egen användning av solelen, och stödtjänster ger mindre. Kontoret ligger på Vallgatan 9, så vi är nära vid driftsättning och uppföljning.",
    facts: [
      { k: "Nätägare", v: "Vattenfall Eldistribution" },
      { k: "Elområde", v: "SE3" },
      { k: "Grönt avdrag batteri", v: "48,5 %" },
      { k: "Effektavgift", v: "Nej, införandet pausat" },
    ],
    localContext: [
      {
        title: "Ingen effektavgift hos Vattenfall",
        body: `Vattenfall äger det lokala elnätet i hela Solna och har pausat det planerade införandet av effektavgift hösten 2026. ${NO_TARIFF_VALUE}`,
      },
      {
        title: "Rätt storlek, dimensionerad ur förbrukningen",
        body: `Vi dimensionerar batteriet efter din faktiska förbrukning, inte efter en broschyr. ${SIZING} Eway byggs ut modulärt och SAJ HS3 kopplas i kaskad. Vi mäter ditt dygnsmönster innan vi rekommenderar kapacitet, så att du inte betalar för kilowattimmar du aldrig använder.`,
      },
    ],
  },
  {
    slug: "stockholm",
    oneLiner: "Batterilager och hemmabatteri i Stockholm, installerat av certifierade elektriker.",
    intro:
      "I Stockholm avgör sällan takytan om ett batteri lönar sig, utan hur du använder elen. Batteriet lagrar dagens solel till kvällen och laddar när spotpriset är lågt. Vi installerar i hela kommunen, till exempel i Bromma, Hägersten, Älvsjö, Enskede och Farsta, både till nya solanläggningar och som fristående lager för hus utan paneler. Vi gör en lastanalys av huset innan vi rekommenderar kapacitet.",
    facts: [
      { k: "Nätägare", v: "Ellevio" },
      { k: "Elområde", v: "SE3" },
      { k: "Grönt avdrag batteri", v: "48,5 %" },
      { k: "Effektavgift", v: "Nej, borttagen 1 juni 2026" },
    ],
    localContext: [
      {
        title: "Ellevio har tagit bort effektavgiften",
        body: `Ellevio äger elnätet i Stockholms stad och tog bort effektavgiften den 1 juni 2026 för villa, radhus och fritidshus. Nu gäller en fast avgift efter säkringsstorlek plus en överföringsavgift per kWh. ${NO_TARIFF_VALUE}`,
      },
      {
        title: "Batteri utan solceller fungerar också",
        body:
          "Du behöver inte ha solpaneler för att ha batteri i Stockholm. Då laddar batteriet på natten när elen är billig och används när den är dyr, så kallad prisarbitrage. Ett batteri utan solceller betalar sig på ungefär 5–9 år, och med solceller på 3–7 år.",
      },
    ],
  },
  {
    slug: "sundbyberg",
    oneLiner: "Batterilager i Sundbyberg, installerat från grannkommunen Solna.",
    intro:
      "Sundbyberg är tätt bebyggt och många hus har små tak. När solanläggningen inte kan bli större får du ut mer av den genom att lagra överskottet. I radhus och småhus väljer vi kompakta batterier som får plats i garage, tvättstuga eller förråd, och vi mäter förbrukningen innan vi väljer storlek.",
    facts: [
      { k: "Nätägare", v: "Vattenfall Eldistribution" },
      { k: "Elområde", v: "SE3" },
      { k: "Grönt avdrag batteri", v: "48,5 %" },
      { k: "Effektavgift", v: "Nej, införandet pausat" },
    ],
    localContext: [
      {
        title: "Kompakta lager för små utrymmen",
        body: `I ett radhus är platsen för batteriet ofta den begränsande faktorn. Väggmonterade och modulära enheter får plats i garage, tvättstuga eller förråd. Storleken dimensionerar vi ur din årsförbrukning. ${SIZING}`,
      },
      {
        title: "Maximera självförbrukningen",
        body: `När takytan är liten blir varje producerad kilowattimme dyrbar. Ett batteri sparar dagens överskott till kvällen. I kunskapsbankens räkneexempel höjer ett 10 kWh-batteri egenanvändningen från cirka 35 till drygt 50 %, och varje kWh du använder själv är värd ungefär 2,5 gånger mer än en såld. Vattenfall Eldistribution har lokalnätet i Sundbyberg och har ingen effektavgift i dag.`,
      },
    ],
  },
  {
    slug: "taby",
    oneLiner: "Batterilager i Täby, dimensionerat efter husets förbrukning.",
    intro:
      "På ett stort villatak producerar solanläggningen ofta mer mitt på dagen än huset hinner använda. Då avgör batteriet om överskottet säljs billigt eller används på kvällen. Vi installerar i hela Täby, till exempel i Näsbypark, Viggbyholm och Gribbylund, och dimensionerar batteriet tillsammans med solceller, värmepump och laddbox.",
    facts: [
      { k: "Nätägare", v: "Ellevio" },
      { k: "Elområde", v: "SE3" },
      { k: "Grönt avdrag batteri", v: "48,5 %" },
      { k: "Effektavgift", v: "Nej, borttagen 1 juni 2026" },
    ],
    localContext: [
      {
        title: "Stödtjänster: räkna försiktigt",
        body:
          "Ett hembatteri kan säljas som stödtjänst (FCR-D) via en aggregator, men ersättningen sätts på en marknad och har fallit med över 90 % från toppåren 2022–2023. Vi räknar därför alltid kalkylen både med och utan stödtjänster. Det mesta av lönsamheten kommer från prisstyrning och egen användning av solelen.",
      },
      {
        title: "Dimensionerat för helheten",
        body: `Har huset både solceller, värmepump och laddbox dimensionerar vi batteriet tillsammans med de andra lasterna, så att kapaciteten räcker för kvällens topp när bilen laddar och värmepumpen går. För större hus finns Eway upp till 61 kWh och SAJ HS3 i kaskad. Ellevio, som äger elnätet i Täby, tog bort effektavgiften den 1 juni 2026.`,
      },
    ],
  },
  {
    slug: "lidingo",
    oneLiner: "Batterilager på Lidingö, för villa och radhus.",
    intro:
      "På Lidingö handlar batteriet om att få ut mer av varje kilowattimme: det laddar när elen är billig, sparar solelen till kvällen och låter styrningen sköta resten. Vi installerar på hela ön och dimensionerar efter husets faktiska förbrukning och elavtal, inte efter ett datablad.",
    facts: [
      { k: "Nätägare", v: "Ellevio" },
      { k: "Elområde", v: "SE3" },
      { k: "Grönt avdrag batteri", v: "48,5 %" },
      { k: "Effektavgift", v: "Nej, borttagen 1 juni 2026" },
    ],
    localContext: [
      {
        title: "Rätt storlek för huset",
        body: `Vi dimensionerar batteriet efter din timförbrukning så att det gör nytta året runt. Rätt storlek slår störst möjliga. ${SIZING}`,
      },
      {
        title: "Ingen effektavgift hos Ellevio",
        body: `Lidingö ingår i Ellevios nätområde Stockholm, och Ellevio tog bort effektavgiften den 1 juni 2026 för villa, radhus och fritidshus. ${NO_TARIFF_VALUE}`,
      },
    ],
  },
  {
    slug: "sollentuna",
    oneLiner: "Batterilager i Sollentuna, där effektavgiften ger batteriet en uppgift till.",
    intro:
      "I Sollentuna äger Sollentuna Energi & Miljö elnätet, och nätavgiften har en effektavgift. Här kan ett batteri därför göra nytta på tre sätt: lagra solelen, flytta köp till billiga timmar och kapa effekttoppar. I Edsberg, Helenelund, Häggvik och Rotebro finns både äldre villor och nybyggda hus, och vi dimensionerar batteriet tillsammans med solceller och värmepump.",
    facts: [
      { k: "Nätägare", v: "Sollentuna Energi & Miljö" },
      { k: "Elområde", v: "SE3" },
      { k: "Grönt avdrag batteri", v: "48,5 %" },
      { k: "Effektavgift", v: "Ja" },
    ],
    localContext: [
      {
        title: "Effektavgift som går att kapa",
        body:
          "Sollentuna Energi & Miljö har haft effektavgift länge och har den kvar. Avgiften beror på hur mycket el du använder samtidigt och när på dygnet. Ett batteri med effektvakt laddar ur när husets effekt annars skulle toppa, och sänker på så sätt den delen av nätfakturan. I batteriskolan finns ett räkneexempel för Sollentuna.",
      },
      {
        title: "Batteri och värmepump i samma projekt",
        body:
          "En värmepump är husets största enskilda ellast på vintern. Vi räknar på elbehovet tillsammans, så att batterikapaciteten täcker kvällstoppen när både värme och hushåll går för fullt. Föranmälan och färdiganmälan gör vi till Sollentuna Energi & Miljö, och vi driftsätter hela systemet samtidigt.",
      },
    ],
  },
  {
    slug: "nacka",
    oneLiner: "Batterilager i Nacka, anpassat efter vilket nätbolag du har.",
    intro:
      "Nacka är stort och varierat, från radhus i Sickla till villor i Saltsjöbaden, Älta och Boo. Elnätet är delat mellan Nacka Energi och Boo Energi, och det påverkar batterikalkylen: Nacka Energi har effektavgift, Boo Energi har det inte. Batteriet lagrar solelen, flyttar köp till billiga timmar och kan kapa effekttoppar där det finns en effektavgift.",
    facts: [
      { k: "Nätägare", v: "Nacka Energi och Boo Energi" },
      { k: "Elområde", v: "SE3" },
      { k: "Grönt avdrag batteri", v: "48,5 %" },
      { k: "Effektavgift", v: "Nacka Energi: ja · Boo Energi: nej" },
    ],
    localContext: [
      {
        title: "Två nätbolag, två kalkyler",
        body:
          "Nacka Energi har elnätet från Henriksdal till Skurusundet samt i Älta och Saltsjöbaden, och har haft effektavgift sedan 2020. Där kan ett batteri med effektvakt sänka nätfakturan. Boo Energi har Saltsjö-Boo, har pausat sitt införande och tar ut en fast avgift efter säkringsstorlek. Vi gör föranmälan och färdiganmälan till rätt bolag och ställer in batteriet efter den prismodell som gäller dig.",
      },
      {
        title: "Smart styrning i SE3",
        body:
          "Nacka ligger i elområde SE3. Batteriet laddar när elen är billig och används när den är dyr, och styrningen sköter det automatiskt varje dag.",
      },
    ],
  },
  {
    slug: "danderyd",
    oneLiner: "Batterilager i Danderyd, prydligt installerat i teknikrum eller garage.",
    intro:
      "Har villan hög elförbrukning kan ett större batteri göra nytta varje dag. Vi installerar i Stocksund, Djursholm, Enebyberg och Danderyd, med batterier som prisstyr och flyttar solelen till kvällen. Med solceller betalar sig ett batteri på ungefär 3–7 år.",
    facts: [
      { k: "Nätägare", v: "E.ON Energidistribution" },
      { k: "Elområde", v: "SE3" },
      { k: "Grönt avdrag batteri", v: "48,5 %" },
      { k: "Med solceller", v: "3–7 år" },
    ],
    localContext: [
      {
        title: "Stora batterier i hus med hög förbrukning",
        body:
          "Ett stort batteri lönar sig bäst i hus med hög förbrukning, där mer av kapaciteten används varje dag. För sådana hus finns Eway upp till 61 kWh och SAJ HS3 i flera stackar. Med solceller betalar sig batteriet på ungefär 3–7 år.",
      },
      {
        title: "Diskret installation",
        body:
          "Vi placerar batteriet i teknikrum eller garage, drar kablage dolt där det går och dokumenterar systemet så att det går att följa upp. E.ON ansvarar för elnätet i Danderyd, och dit gör vi föranmälan och färdiganmälan.",
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
  /** Nätägare och effektavgift, från CITIES. */
  grid: CityGrid;
  /** Källor för uppgifterna på sidan, från CITIES. */
  sources: CitySource[];
  /** Datum då uppgifterna senast kontrollerades (ISO), från CITIES. */
  checkedAt: string;
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
    grid: base.grid,
    sources: base.sources.filter((s) => s.publisher !== "SCB" && s.publisher !== "Boverket"),
    checkedAt: base.checkedAt,
  };
});

export function findBatteryCity(slug: string): BatteryCity | undefined {
  return BATTERY_CITIES.find((c) => c.slug === slug);
}
