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
    bullets: [
      "Modulnivå-optimering",
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
        a: "I de flesta fall nej – paneler som följer takets lutning är bygglovsbefriade på en- och tvåbostadshus. Vi kollar din kommun innan vi börjar.",
      },
      {
        q: "Vad händer vid strömavbrott?",
        a: "Med en hybrid-växelriktare och batteri kan vi konfigurera nödström så att utvalda kretsar fortsätter funka även när nätet är nere.",
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
      "Stödtjänster (FCR-D, aFRR) gör batteriet betalt på 4–6 år",
      "Skalbart från 5 kWh till 50 kWh",
    ],
    bullets: [
      "Reservkraftsbrytare ingår",
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
        title: "Aktivering av stödtjänster",
        body:
          "Vi kopplar batteriet mot Svenska Kraftnät så det börjar tjäna pengar redan dag ett.",
      },
    ],
    faq: [
      {
        q: "Är batteriet säkert i hemmet?",
        a: "LFP-kemi (litium-järnfosfat) brinner inte på samma sätt som NMC. Vi installerar enligt SS-EN-IEC 62619 med rätt avstånd och brandklassning.",
      },
      {
        q: "Hur mycket tjänar jag på stödtjänster?",
        a: "Mellan 25 000 och 60 000 kr per år för en 15 kWh-anläggning, beroende på balansläget. Vi visar realistiska siffror i kalkylatorn.",
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
    // Dold just nu (visas ej i nav/grid/footer/sitemap). Koden behålls –
    // ta bort denna rad för att lansera värmepumpar igen.
    hidden: true,
    oneLiner:
      "Tre kilowatt värme för varje kilowatt el – fysik, inte marknadsföring.",
    lede:
      "Vi installerar luft-vatten, bergvärme och frånluftsvärmepumpar. Det viktiga är inte vilket märke vi sätter – utan att flödet, dimensioneringen och styrningen är rätt för ditt hus.",
    highlights: [
      "Årsvärmefaktor (SCOP) upp till 5,2 i nordiskt klimat",
      "Tysta utomhusenheter – under 35 dB(A)",
      "Modulerande växelriktare – inga av/på-cykler",
    ],
    bullets: [
      "Lasttest av huset på riktigt",
      "Returtemperatur-optimering",
      "Smart styrning mot spotpris",
      "12 års kompressorgaranti",
    ],
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
    faq: [
      {
        q: "Kan jag kombinera värmepump med solel?",
        a: "Ja, och det är just då magin händer. Värmepumpen drar mest ström under den årstid då solen producerar minst – men kombineras de med batteri och smart styrning kan du höja självförbrukningen till 65–80%.",
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
