import type { SolarQuestion } from "./kb-types";

/**
 * Innehållet i Solcellsfrågor. Redaktionella regler som för nyheterna
 * (se news-content.ts): direkt svar i första meningen, varje sakpåstående
 * källbelagt, partipolitiskt neutralt, och sökfraserna (searchPhrases)
 * ska besvaras på riktigt på sidan.
 */
export const QUESTIONS: SolarQuestion[] = [
  {
    slug: "bidrag-for-solceller",
    category: "kostnad-och-lonsamhet",
    question: "Får man bidrag för solceller 2026?",
    description:
      "Inget bidrag, men grönt avdrag: 15 % av arbete och material (14,55 % av totalpriset) dras direkt på fakturan. Tak 50 000 kr per person och år.",
    shortAnswer:
      "Det finns inget statligt solcellsbidrag 2026, men du kan få grönt avdrag: 15 procent av kostnaden för arbete och material, vilket blir 14,55 procent av totalpriset vid fast pris. Avdraget dras direkt på fakturan och taket är 50 000 kronor per person och år.",
    body: [
      {
        h2: "Så fungerar grönt avdrag för solceller",
        paragraphs: [
          "Sedan 2021 är det grönt avdrag som gäller för solceller – ett skatteavdrag som Skatteverket kallar skattereduktion för installation av grön teknik. Avdraget är 15 procent för solceller och 50 procent för batterier som lagrar egenproducerad el och för laddboxar. Vid fast pris räknas 97 procent av totalpriset som arbete och material, så i praktiken blir avdraget 14,55 procent av fakturan för solceller och 48,5 procent för batteri och laddbox.",
          "Hur mycket får man tillbaka? Kostar anläggningen 100 000 kronor till fast pris blir avdraget 14 550 kronor, och du betalar 85 450 kronor. Installatören drar av beloppet direkt på fakturan och begär sedan pengarna från Skatteverket, så du behöver inte ligga ute med dem. Taket är 50 000 kronor per person och år, så äger ni huset tillsammans har ni varsitt tak.",
        ],
      },
      {
        h2: "Villkor att känna till",
        paragraphs: ["Avdraget gäller bara när vissa villkor är uppfyllda:"],
        bullets: [
          "Du äger småhuset eller ägarlägenheten, eller har bostadsrätten, och installationen görs för ditt eget hushåll eller dina föräldrars. För bostadsrätt ska installationen vara kopplad till just din lägenhet och följa med vid en försäljning.",
          "Anläggningen ska vara nätansluten, och installationen färdigställd och slutbetald.",
          "Bara arbete och material räknas – inte frakt, resor, maskiner eller projektering.",
        ],
      },
    ],
    searchPhrases: [
      "får man bidrag för solceller",
      "får man bidrag för solceller 2026",
      "får man skatteavdrag för solceller",
      "hur mycket får man tillbaka på solceller",
    ],
    sources: [
      {
        title: "Så fungerar skattereduktionen för grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/safungerarskattereduktionenforgronteknik.4.676f4884175c97df4192870.html",
      },
      {
        title: "Godkända arbeten – grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/godkandaarbetengronteknik.4.676f4884175c97df419290e.html",
      },
    ],
    related: [
      "vad-kostar-solceller",
      "lonar-sig-solceller",
      "skatt-pa-sald-solel",
      "vad-kostar-solceller-med-batteri",
    ],
    concepts: ["gront-avdrag-for-batteri"],
    links: [{ href: "/guider/gront-avdrag-2026", label: "Guide: Grönt avdrag 2026" }],
    updatedAt: "2026-10-03",
  },
];
