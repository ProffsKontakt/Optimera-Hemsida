/**
 * Innehåll för publicerade guide-artiklar. Hålls separat från guides.ts
 * (metadata) så att artikel-listan är lätt att skanna och artikelinnehåll
 * är lätt att redigera utan att röra rendering-koden.
 *
 * Struktur per artikel:
 *   tldr      – 3 punkter, citerbara av AI-search
 *   sections  – H2-rubriker + brödtext + valfria bullets
 *   faq       – frågor/svar för FAQPage-schema och utfällbara block
 */

export type GuideSection = {
  h2: string;
  body: string[];
  bullets?: string[];
};

export type GuideContent = {
  tldr: string[];
  sections: GuideSection[];
  faq: { q: string; a: string }[];
};

const CONTENT: Record<string, GuideContent> = {
  "aterbetalningstid-solceller": {
    tldr: [
      "En ren solanläggning i Stockholm (SE3) har återbetalningstid på 8–11 år vid dagens spotpris.",
      "Med batteri och stödtjänster (FCR-D / aFRR) via Energy IQ eller Enequi Core kommer återbetalningstiden ner mot 3–5 år för hus med högre förbrukning.",
      "Elområde, självförbrukningsgrad och om du använder en EMS-plattform påverkar mer än vilket panelmärke du väljer.",
    ],
    sections: [
      {
        h2: "Vad återbetalningstid faktiskt betyder",
        body: [
          "Återbetalningstid är antal år tills besparingen och eventuella intäkter har täckt din nettoinvestering. Nettoinvestering = bruttopris minus grönt avdrag (14,55 % för sol, 48,5 % för batteri och laddbox).",
          "Det är inte samma sak som livslängd. JA Solar-paneler har 25 års effektgaranti, så efter återbetalning fortsätter anläggningen att tjäna pengar i minst 15 år till. Det är där den riktiga vinsten ligger.",
        ],
      },
      {
        h2: "Räkneexempel: 20 paneler i Solna, ren solanläggning",
        body: [
          "20 st JA Solar 500 W = 10 kWp installerat. Pris efter grönt avdrag landar på cirka 55 500 kr.",
          "Med Stockholm-snitt (1 050 kWh/kWp/år, spotpris 1,45 kr/kWh, feed-in 0,85 kr/kWh) och 32 % självförbrukning utan batteri ger anläggningen ungefär 9 200 kr i årlig besparing.",
          "Återbetalningstid: 55 500 / 9 200 = 6 år. Det är bra, men inte fantastiskt – och hela uppsidan ligger i åren efter återbetalning.",
        ],
      },
      {
        h2: "Räkneexempel: samma anläggning plus 23 kWh Easyway",
        body: [
          "Lägg till en Easyway 23 kWh-batteri med Solis 10 kW växelriktare och Energy IQ som EMS. Bruttopris för batteripaketet 118 146 kr, nettopris efter 48,5 % grönt avdrag cirka 60 845 kr.",
          "Självförbrukningsgraden hoppar från 32 % till 60 %, vilket gör att solbesparingen växer till 12 000 kr. Plus 7 800 kr i stödtjänstintäkt från FCR-D (Solis 10 kW × 65 kr/månad × 12). Plus 13 800 kr i batteri-arbitrage som EMS-en löper.",
          "Total årlig nettonytta: cirka 30 000–38 000 kr. Återbetalningstid för helhetspaketet: 116 000 / 35 000 = drygt 3 år.",
        ],
        bullets: [
          "Solanläggning ensam: 6 års återbetalning, 9 200 kr/år.",
          "Solanläggning + batteri + EMS: 3,3 års återbetalning, 35 000 kr/år.",
          "Skillnaden ligger i självförbrukning och stödtjänster, inte i hårdvarans märke.",
        ],
      },
      {
        h2: "Variablerna som faktiskt rör nålen",
        body: [
          "Vi har räknat på tusentals scenarier. Tre variabler påverkar mer än alla andra tillsammans:",
        ],
        bullets: [
          "Spotpris och elområde. SE3 (Stockholm) ger 1,45 kr/kWh i snitt, SE4 (Skåne) 1,85, SE1/SE2 (norr) 0,55–0,65. Norra Sverige har dubbelt så lång återbetalningstid.",
          "Självförbrukning. Ju mer av din producerade el du själv använder, desto mer värd är varje kWh. Batteri lyfter självförbrukningen från 32 % till 60–92 %.",
          "Stödtjänster. Enequi Core eller Energy IQ ger access till FCR-D och aFRR – 65 kr per kW växelriktare per månad i ren intäkt. Inga andra EMS:er erbjuder detta i Sverige idag.",
        ],
      },
      {
        h2: "Vad vi rekommenderar",
        body: [
          "Räkna på din egen anläggning i vår kalkylator innan du bokar hembesök. Den använder samma motor och samma siffror som vi använder vid offert – byt panelmärke, batteri, EMS och se hur återbetalningstiden ändras i realtid.",
          "Vid hembesöket går vi igenom takets faktiska förutsättningar (orientering, lutning, skuggning) och justerar siffrorna efter det. Inget är slutgiltigt förrän vi har sett taket med drönaren.",
        ],
      },
    ],
    faq: [
      {
        q: "Hur lång återbetalningstid får jag om jag bor i SE4?",
        a: "I SE4 (Skåne och södra Götaland) är spotpriset cirka 28 % högre än i SE3, vilket sänker återbetalningstiden för sol med ungefär ett år. Med Emaldo Power Store kvalificerar du dig dessutom för Grid Rewards (1 370 kr/månad garanterat) – det ger ytterligare 16 440 kr i årlig intäkt på batteridelen.",
      },
      {
        q: "Vad händer med ekonomin om jag redan har solpaneler?",
        a: "Om du har befintlig solanläggning behöver du inte räkna med solinvesteringen igen – då är det batteripaketet som ska betala sig självt. Med 23 kWh Easyway, Solis 10 kW och Energy IQ ligger nettoinvesteringen på cirka 60 000 kr och årlig nettonytta 30 000–38 000 kr. Återbetalningstid 1,6–2 år.",
      },
      {
        q: "Räknar ni med elprisstegring i återbetalningstiden?",
        a: "Nej, vi räknar konservativt med dagens spotpriser och feed-in-priser. Verklig återbetalningstid blir nästan alltid kortare än vad kalkylatorn visar eftersom elpriset historiskt stigit 4-6 % per år. Vi vill hellre överraska dig positivt än sälja på framtidssiffror.",
      },
      {
        q: "Hur räknar grön teknik-avdraget mot återbetalningstiden?",
        a: "Avdraget hanteras automatiskt av installatören i fakturan, så du betalar redan ditt nettopris. Avdragstaket är 50 000 kr per fastighetsägare och år. För ett par ägare och en kombinerad sol-, batteri- och laddboxinstallation kan ni komma upp i hela 100 000 kr i avdrag samma år.",
      },
    ],
  },

  "gront-avdrag-2026": {
    tldr: [
      "Grönt teknik-avdrag 2026: 14,55 % för solpaneler, 48,5 % för batteri och laddbox, 30 % ROT för värmepump.",
      "Avdragstaket är 50 000 kr per fastighetsägare och år. Två ägare ger 100 000 kr.",
      "Avdraget dras direkt på fakturan av installatören. Du betalar nettopriset, vi sköter rapporteringen till Skatteverket.",
    ],
    sections: [
      {
        h2: "Vad är grönt teknik-avdrag?",
        body: [
          "Grönt teknik-avdrag är ett skatteavdrag som infördes 2021 för att accelerera energiomställningen i svenska hem. Det funkar som ROT- och RUT-avdraget – installatören drar av en procent av arbets- och materialkostnaden direkt på din faktura och fakturerar Skatteverket separat.",
          "Du behöver inte själv ansöka, vi sköter all administration. Det enda kravet på dig är att du har en taxerad inkomst som motsvarar avdraget.",
        ],
      },
      {
        h2: "Procentsatser per tjänst 2026",
        body: ["Aktuella satser för året:"],
        bullets: [
          "Solpaneler: 14,55 % av hela installationskostnaden (material + arbete).",
          "Batterilager: 48,5 %. Förutsättning är att huset har en sol-anläggning (befintlig eller ny).",
          "Laddbox för elbil: 48,5 %. Gäller hela installationen inklusive nya säkringar.",
          "Värmepump: 30 % via ROT-avdraget (inte grönt avdrag). Räknas mot ROT-taket, inte grönt-taket.",
        ],
      },
      {
        h2: "Avdragstak och hur det räknas",
        body: [
          "Grönt avdrag har ett tak på 50 000 kr per fastighetsägare och kalenderår. Om ni är två ägare på fastigheten är taket 100 000 kr.",
          "ROT-avdraget för värmepump har ett separat tak på 50 000 kr per person och år. Du kan alltså i samma år ta ut maximalt grönt avdrag PLUS maximalt ROT-avdrag.",
          "Praktiskt exempel: ett par investerar i ett sol+batteri-paket på 200 000 kr. Avdraget blir cirka 70 000 kr fördelat på de två ägarna. Båda kommer under 50 000 kr-taket. Skulle samma par lägga till en värmepump dras dessa 30 % via ROT-avdraget separat.",
        ],
      },
      {
        h2: "Vanliga missförstånd",
        body: [
          "Vi möter samma missförstånd om och om igen. Här är de tre vanligaste:",
        ],
        bullets: [
          "Du behöver inte ansöka i förväg. Installatören sköter rapporteringen efter att jobbet är klart.",
          "Batteriavdraget kräver att huset har sol. Skatteverket godkänner inte 48,5 % på batterier i hus utan solanläggning. Vi installerar alltid batteri ihop med sol (befintlig eller ny).",
          "Avdraget gäller på material PLUS arbete. Det är inte ett ROT-avdrag som bara gäller arbete – hela installationskostnaden inkluderas.",
        ],
      },
      {
        h2: "Räkneexempel: full installation hos Optimera Energi",
        body: [
          "Ett par i Solna bygger ut: 20 paneler, 23 kWh Easyway, Easee laddbox, ingen värmepump.",
        ],
        bullets: [
          "Solpaneler: bruttopris 65 000 kr, avdrag 9 458 kr (14,55 %).",
          "Batteri inkl Solis växelriktare: bruttopris 118 146 kr, avdrag 57 301 kr (48,5 %).",
          "Laddbox + installation: bruttopris 16 500 kr, avdrag 8 003 kr (48,5 %).",
          "Totalt grönt avdrag: 74 762 kr fördelat på 2 ägare. Båda långt under 50 000 kr-taket.",
          "Nettopris efter avdrag: 124 884 kr.",
        ],
      },
      {
        h2: "Vad du behöver veta innan du tecknar avtal",
        body: [
          "Säkerställ att installatören har F-skatt och är registrerad för grönt avdrag hos Skatteverket. Optimera Energi Sverige AB (org.nr 559375-2206) är båda. Vi visar avdraget separat på offerten så du ser exakt vad du betalar netto.",
          "Vi rekommenderar att du loggar in på skatteverket.se efter installation och bekräftar att avdraget bokförts mot din person. Det är samma princip som ROT-avdrag – tar normalt 4-8 veckor från fakturadatum.",
        ],
      },
    ],
    faq: [
      {
        q: "Kan jag få grönt avdrag om jag bor i bostadsrätt?",
        a: "Ja, om du som bostadsrättshavare bekostar installationen och den sker inom din lägenhet eller på dina egna installationer. För gemensamma anläggningar (t.ex. solpaneler på taket i en BRF) är det föreningen som äger anläggningen och avdragsreglerna blir andra. Vi tar diskussionen med er styrelse om ni är osäkra.",
      },
      {
        q: "Vad händer om min inkomst inte räcker till avdraget?",
        a: "Avdraget kräver att du har en taxerad inkomst som motsvarar minst avdragsbeloppet. Saknar du tillräcklig inkomst kan du inte få avdraget. För par är det dock möjligt att fördela avdraget mellan ägarna så att den med högre inkomst tar mer av det.",
      },
      {
        q: "Räknas Emaldo Grid Rewards mot avdraget?",
        a: "Nej, Emaldo Grid Rewards är en intäkt från Emaldo (inte ett avdrag på installationspriset). Du får både grönt avdrag på 48,5 % på batteripaketet OCH månadsutbetalningarna från Emaldo, om du bor i SE3 eller SE4.",
      },
      {
        q: "Kan jag kombinera grönt avdrag med ROT?",
        a: "Ja, men inte på samma åtgärd. Grönt avdrag och ROT har separata tak (50 000 kr vardera per person och år). En sol- och batteriinstallation tar grönt avdrag, en värmepump tar ROT. Du kan alltså få båda samma år om du installerar olika åtgärder.",
      },
    ],
  },
};

export function getGuideContent(slug: string): GuideContent | null {
  return CONTENT[slug] ?? null;
}
