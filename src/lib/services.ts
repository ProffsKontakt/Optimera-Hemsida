export type ServiceSlug =
  | "solpaneler"
  | "batterier"
  | "vaermepumpar"
  | "laddboxar";

export type Service = {
  slug: ServiceSlug;
  name: string;
  short: string;
  oneLiner: string;
  lede: string;
  highlights: string[];
  workflow: { step: string; title: string; body: string }[];
  faq: { q: string; a: string }[];
  bullets: string[];
  badge: string;
  /** Dölj tjänsten i nav/grid/footer/sitemap men behåll all kod. Sätt
   *  false eller ta bort för att aktivera tjänsten igen. */
  hidden?: boolean;
};

export const SERVICES: Service[] = [
  {
    slug: "solpaneler",
    name: "Solpaneler",
    short: "Sol",
    badge: "Producerar",
    oneLiner: "Tysta tak som arbetar varje minut det är ljust ute.",
    lede:
      "Vi designar solanläggningar som faktiskt passar ditt tak – orientering, skuggning, taklutning, infästning och kabeldragning. Inga universalsystem, inga genvägar.",
    highlights: [
      "Glas-glas paneler med 30 års produktgaranti",
      "Optimering per panel där skugga gör skada",
      "Snyggt dolda kabelvägar – vi syr ihop arkitekturen",
    ],
    // "Modulnivå-optimering" borttaget – samma sak som highlight-kortet
    // "Optimering per panel där skugga gör skada" direkt ovanför chipsen.
    bullets: [
      "MID-godkända mätare",
      "Anmälan till nätägare ingår",
      "Drönarbesiktning av tak",
    ],
    workflow: [
      {
        step: "01",
        title: "Hembesök",
        body:
          "Vi tar med kanelbullar, mäter taket på riktigt och pratar med dig – inte sälj-snacket.",
      },
      {
        step: "02",
        title: "Vi räknar på förutsättningarna",
        body:
          "Vi går igenom takets orientering, lutning och skuggning och räknar fram det system som är mest optimalt för just ditt hus.",
      },
      {
        step: "03",
        title: "Installation",
        body:
          "Noggrant utvalda, certifierade installatörer. Två-tre dagar för normalvilla, oftast färre.",
      },
      {
        step: "04",
        title: "Driftsättning",
        body:
          "Vi visar dig appen, går igenom säkringsskåpet och stannar tills du är trygg.",
      },
    ],
    faq: [
      {
        q: "Hur länge håller panelerna?",
        a: "Våra glas-glas paneler har 30 års produktgaranti och en effektgaranti som garanterar minst 87% effekt efter 30 år.",
      },
      {
        q: "Behöver jag bygglov?",
        a: "I de flesta fall nej. Sedan 1 december 2025 krävs inget bygglov för solceller på tak eller fasad på villor, radhus och andra en- och tvåbostadshus. Undantag finns bland annat för kulturhistoriskt värdefulla hus och där detaljplanen kräver lov. Vi kollar din kommun innan vi börjar.",
      },
      {
        q: "Hur lång tid tar installationen?",
        a: "Två-tre dagar för en normalvilla, oftast färre. Exakt tidplan får du i offerten – och priset där är priset på fakturan.",
      },
    ],
  },
  {
    slug: "batterier",
    name: "Batterier",
    short: "Batteri",
    badge: "Lagrar",
    oneLiner: "Spara solen till kvällen – eller sälj den när priset är högt.",
    lede:
      "Ett batteri är inte bara en låda – det är en strategi. Vi dimensionerar utifrån din förbrukning, ditt elavtal och hur du faktiskt lever, inte utifrån ett datablad.",
    highlights: [
      "LFP-kemi: säkrare, längre livslängd, ingen kobolt",
      "Stödtjänster (FCR-D, aFRR) kan ge intäkter ovanpå besparingen",
      "Skalbart från 5 kWh till 50 kWh",
    ],
    // "Skalbart 5–50 kWh" borttaget – highlight-kortet "Skalbart från 5 kWh
    // till 50 kWh" står precis ovanför chipsen på tjänstesidan.
    bullets: [
      "Cykelgaranti 6000+",
      "Smart styrning mot spotpris",
      "Fjärrövervakning från vår jourcentral",
    ],
    workflow: [
      {
        step: "01",
        title: "Lastanalys",
        body:
          "Vi loggar din timförbrukning i 14 dagar för att se hur ditt hushåll faktiskt rör sig genom dygnet.",
      },
      {
        step: "02",
        title: "Dimensionering",
        body: "Rätt storlek – inte störst möjligt. Vi visar återbetalningstid per kWh.",
      },
      {
        step: "03",
        title: "Installation",
        body:
          "Inomhus eller i isolerat skåp. Vi drar nya kretsar och uppgraderar säkringsskåp om det behövs.",
      },
      {
        step: "04",
        title: "Aktivering av smartstyrning",
        body:
          "Vi kopplar upp styrningen mot din förbrukning – batteriet blir hjärnan i systemet och sänker din elkostnad timme för timme.",
      },
    ],
    faq: [
      {
        q: "Är batteriet säkert i hemmet?",
        a: "LFP-kemi (litium-järnfosfat) brinner inte på samma sätt som NMC. Vi installerar enligt SS-EN-IEC 62619 med rätt avstånd och brandklassning.",
      },
      {
        q: "Hur mycket tjänar jag på stödtjänster?",
        a: "Det beror helt på marknadsläget – ersättningsnivåerna har varierat kraftigt mellan åren, så vi lovar hellre för lite än för mycket. Vid hembesöket räknar vi på aktuella nivåer för din batteristorlek och visar vad som är rimligt att förvänta sig.",
      },
      {
        q: "Kan jag ladda från elnätet när det är billigt?",
        a: "Absolut. Vår styrning köper när priset dippar och säljer på topparna – automatiskt.",
      },
    ],
  },
  {
    slug: "vaermepumpar",
    name: "Värmepumpar",
    short: "Värme",
    badge: "Värmer",
    // Lanserad okt 2026. Sätt `hidden: true` här för att pausa tjänsten –
    // då försvinner den samtidigt ur meny, footer, sitemap, indexering,
    // mobilens offertguide (/offert-start) och tjänstelistorna på om-oss.
    oneLiner:
      "Tre kilowatt värme för varje kilowatt el – fysik, inte marknadsföring.",
    lede:
      "Vi installerar luft-vatten, bergvärme och frånluftsvärmepumpar. Det viktiga är inte vilket märke vi sätter – utan att flödet, dimensioneringen och styrningen är rätt för ditt hus.",
    // Highlights/chips: bara sådant som går att stå för oavsett märke.
    // Borttaget okt 2026 i väntan på bekräftelse från teamet: "under 35
    // dB(A)" (luft-vattens utedelar ligger normalt högre, beror på avstånd)
    // och "12 års kompressorgaranti" (varierar per tillverkare).
    highlights: [
      "Årsvärmefaktor (SCOP) upp till 5,2 i nordiskt klimat",
      "Varvtalsstyrd kompressor – jämn värme utan av/på-cykler",
      // (Spotprisstyrning och sol/batteri har egen sektion högre upp på
      // sidan – upprepas inte här.)
      "Värme och varmvatten från samma system",
    ],
    bullets: ["Märkesoberoende", "ROT dras direkt på fakturan"],
    workflow: [
      {
        step: "01",
        title: "Värmebehov",
        body:
          "Vi räknar fram ditt hus effektbehov vid -18°C utifrån väggar, tak, fönster och radiatorer.",
      },
      {
        step: "02",
        title: "Val av pump",
        body:
          "Vi visar 3-5 alternativ med årskostnad, ljudnivå, garantilängd och total ägande-kostnad.",
      },
      {
        step: "03",
        title: "Installation",
        body:
          "Vi byter inte bara pumpen – vi balanserar systemet och ritar om kurvor om det behövs.",
      },
      {
        step: "04",
        title: "Inkörning",
        body:
          "Vi följer upp efter 14 dagar och 6 månader, justerar kurvor och säkerställer optimal drift.",
      },
    ],
    // FAQ: sökanpassad efter vad villaägare frågar. Avdrag/bidrag är
    // källkontrollerade – se lib/heatpump.ts innan något ändras.
    faq: [
      {
        q: "Vad kostar en värmepump?",
        a: "Det beror främst på typ och hus. Bergvärme kostar mest eftersom borrningen ingår, luft-vatten mindre och luft-luft minst. Det exakta priset räknar vi fram efter ett hembesök – och ROT-avdraget på arbetet drar vi direkt på fakturan. Har du redan en offert kan du räkna på avdrag och bidrag i kalkylatorn på den här sidan.",
      },
      {
        q: "Luft-vatten eller bergvärme – vad ska jag välja?",
        a: "Har du vattenburen värme och plats att borra ger bergvärme högst och jämnast verkningsgrad, men kostar mer att installera. Luft-vatten kräver ingen borrning och är billigare, men verkningsgraden sjunker när det är riktigt kallt. Vi räknar på båda för ditt hus innan du bestämmer dig.",
      },
      {
        q: "Hur mycket sparar man med en värmepump?",
        a: "Det beror på vad du värmer med i dag. En värmepump med årsvärmefaktor 3 ger ungefär tre kilowattimmar värme per kilowattimme el. Jämfört med direktverkande el eller elpanna minskar alltså elen för uppvärmningen med ungefär två tredjedelar. Vi räknar på ditt hus och din förbrukning vid hembesöket.",
      },
      {
        q: "Får man ROT-avdrag för värmepump?",
        a: "Ja. ROT-avdraget är 30 procent av arbetskostnaden, max 50 000 kr per person och år. Vid fast pris räknar Skatteverket arbetet som 35 procent av totalkostnaden för bergvärme och 30 procent för luft-vatten, luft-luft och frånluft – avdraget blir alltså ungefär 9–10,5 procent av totalpriset. Vi drar av det direkt på fakturan.",
      },
      {
        q: "Finns det bidrag för värmepump 2026?",
        a: "Ja. Villaeffekten – bidraget för energieffektivisering i småhus – ger 30 procent av materialkostnaden, max 60 000 kr per hus. Det gäller hus med värdeår före 1990 som inte är anslutna till fjärrvärme, där ägaren bor stadigvarande. Bergvärme, luft-vatten och frånluft omfattas, men inte luft-luft. Bidraget söks via Boverkets e-tjänst och kan kombineras med ROT-avdraget på arbetet.",
      },
      {
        q: "Behövs tillstånd för bergvärme?",
        a: "Borrning för bergvärme ska anmälas till kommunen innan den påbörjas, och i vissa områden – till exempel nära vattentäkter – krävs tillstånd. Vi går igenom vad som gäller för din tomt vid hembesöket.",
      },
      {
        q: "Fungerar en luft-vattenvärmepump när det är riktigt kallt?",
        a: "Ja. Moderna luft-vattenvärmepumpar ger värme även vid sträng kyla, men verkningsgraden sjunker ju kallare det blir, och de allra kallaste dagarna hjälper en elpatron till. Därför dimensionerar vi efter husets effektbehov när det är som kallast.",
      },
      {
        q: "Kan jag kombinera värmepump med solel?",
        a: "Ja. Värmepumpen är oftast husets största elförbrukare, så det är där styrningen gör störst skillnad. Med styrning mot spotpris läggs värmen på billiga timmar, solöverskottet kan värma varmvattnet sommartid och ett batteri kan ta effekttopparna. Vi räknar på helheten i samma offert.",
      },
      {
        q: "Hur länge tar installationen?",
        a: "Luft-vatten 1-2 dagar. Bergvärme 3-5 dagar plus borrning som vi koordinerar.",
      },
      {
        q: "Vilka märken jobbar ni med?",
        a: "Vi är märkesoberoende. Vi rekommenderar det som passar ditt hus – oftast NIBE, Bosch, Mitsubishi, Daikin, eller Thermia.",
      },
    ],
  },
  {
    slug: "laddboxar",
    name: "Laddboxar",
    short: "Laddning",
    badge: "Laddar",
    oneLiner: "Hemmaladdning som är lika enkel som att stänga garageporten.",
    lede:
      "Inte bara en kontakt på väggen – ett laddsystem som pratar med din sol, ditt batteri och Nord Pool. Och som inte slår ut säkringen när torktumlaren går.",
    highlights: [
      "Lastbalansering ingår alltid",
      "Solöverskotts-laddning",
      "Smart styrning mot timpris",
      "Stöd för alla bilmärken (typ 2)",
    ],
    bullets: [
      "OCPP 1.6/2.0",
      "Egen separat säkring",
      "Energimätning per laddning",
      "Skalbart upp till 22 kW",
    ],
    workflow: [
      {
        step: "01",
        title: "Förutsättningar",
        body:
          "Vi kollar ditt huvudsäkringsläge, fasläge och avstånd till elcentral.",
      },
      {
        step: "02",
        title: "Val av box",
        body:
          "Easee, Zaptec, Wallbox, Garo – vi förklarar skillnaderna istället för att sälja en.",
      },
      {
        step: "03",
        title: "Installation",
        body:
          "Snygga kabelvägar, ny grupp, jordfelsbrytare typ B – gjort på en halvdag.",
      },
      {
        step: "04",
        title: "Konfiguration",
        body: "Vi kopplar in den i ditt energiöverblick och visar dig appen.",
      },
    ],
    faq: [
      {
        q: "Måste jag ha trefas?",
        a: "Nej, men det är att rekommendera. Med trefas kan du ladda 11 kW istället för 3,7 kW.",
      },
      {
        q: "Får jag ROT-avdrag?",
        a: "Inte på laddbox direkt, men det gröna avdraget täcker 48,5 % av arbets- och materialkostnaden upp till 50 000 kr.",
      },
      {
        q: "Kan jag dela laddbox med grannen?",
        a: "Ja, vi installerar OCPP-baserade boxar med användare och fakturaunderlag per förare.",
      },
    ],
  },
];

export const getService = (slug: ServiceSlug) =>
  SERVICES.find((s) => s.slug === slug);

/** Tjänster som ska visas publikt (nav, grid, footer, sitemap). */
export const VISIBLE_SERVICES = SERVICES.filter((s) => !s.hidden);

/** "a, b och c" – svensk uppräkning. */
export function joinSv(items: string[], conj: "och" | "eller" = "och"): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} ${conj} ${items[items.length - 1]}`;
}

// Kortform i singular för löptext ("Funderar du på sol, batteri eller …?").
const SHORT_SINGULAR: Partial<Record<string, string>> = {
  solpaneler: "sol",
  batterier: "batteri",
  vaermepumpar: "värmepump",
  laddboxar: "laddbox",
};

/**
 * De synliga tjänsterna i löptext. Används där sajten räknar upp vad vi
 * gör (t.ex. om-oss), så att en tjänst som lanseras eller pausas via
 * `hidden` slår igenom överallt utan handpåläggning.
 */
export function visibleServiceText(form: "plural" | "short", conj: "och" | "eller" = "och"): string {
  const words = VISIBLE_SERVICES.map((s) =>
    form === "short" ? SHORT_SINGULAR[s.slug] ?? s.name.toLowerCase() : s.name.toLowerCase(),
  );
  return joinSv(words, conj);
}
