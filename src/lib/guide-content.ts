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
          "Säkerställ att installatören har F-skatt och är registrerad för grönt avdrag hos Skatteverket. Optimera Energilösningar i Mälardalen AB (org.nr 559375-2206) är båda. Vi visar avdraget separat på offerten så du ser exakt vad du betalar netto.",
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

  "solceller-pris-2026-stockholm": {
    tldr: [
      "Solceller i Stockholm 2026 kostar cirka 6 300–8 000 kr per kWp netto efter grönt avdrag, beroende på anläggningens storlek.",
      "En typisk villa med 14 paneler (7 kWp) landar runt 50 000 kr efter det gröna avdraget på 14,55 %.",
      "Priset styrs mest av takets förutsättningar (lutning, skuggning, infästning) och om du lägger till batteri, inte av panelmärket.",
    ],
    sections: [
      {
        h2: "Vad solceller kostar i Stockholm 2026",
        body: [
          "Vi prissätter solceller efter en enkel modell: ett baspris för ställning, infästning och elarbete (10 000–22 500 kr beroende på jobbets storlek) plus 2 500 kr per JA Solar-panel. Ovanpå det drar vi av grönt avdrag på 14,55 % direkt på fakturan, så du ser nettopriset på offerten.",
          "I Stockholm (elområde SE3) landar de flesta villaanläggningar mellan 35 000 och 95 000 kr netto. Spannet låter brett, men det handlar nästan helt om hur många paneler taket rymmer och hur krångligt det är att montera dem, inte om vilket märke du väljer.",
        ],
      },
      {
        h2: "Pris per kWp: exempel på 5, 10 och 15 kW i Stockholm",
        body: [
          "En JA Solar-panel på 500 W motsvarar 0,5 kWp, så 10 paneler = 5 kWp. Ju större anläggning, desto lägre pris per kWp eftersom baspris och resvägar slås ut på fler paneler. Riktpriser för Stockholm 2026, netto efter grönt avdrag:",
        ],
        bullets: [
          "5 kWp (10 paneler): cirka 40 000 kr netto, runt 8 000 kr/kWp. Passar radhus och mindre villatak.",
          "10 kWp (20 paneler): cirka 68 000 kr netto, runt 6 800 kr/kWp. Den vanligaste storleken i Stockholms villaområden.",
          "15 kWp (30 paneler): cirka 95 000 kr netto, runt 6 300 kr/kWp. Stora sadeltak i Täby, Danderyd och Nacka.",
          "Lägg till batteri och priset per nyttjad kilowattimme sjunker ytterligare, eftersom du då slipper sälja överskott billigt till nätet.",
        ],
      },
      {
        h2: "Vad som påverkar priset på ditt tak",
        body: [
          "Två likadana villor i Bromma kan få olika pris, och det är takets förutsättningar som avgör. Det här rör nålen mest:",
        ],
        bullets: [
          "Taklutning och orientering: söderläge med 30–45 graders lutning ger mest el per panel. Platta tak kräver ställning som vinklar panelerna, vilket kostar lite mer.",
          "Skuggning: skuggar en skorsten eller ett träd delar av taket använder vi effektoptimerare eller mikroväxelriktare så att en skuggad panel inte drar ner hela strängen. Det är en post på offerten.",
          "Infästning: tegel, betongpannor och plåt kräver olika montagebleck. Äldre tak i Stockholms innerstad kan behöva extra arbete.",
          "Växelriktare och batteri: storleken på växelriktaren och om du vill ha batterilager påverkar totalpriset mer än valet av panel.",
        ],
      },
      {
        h2: "Grönt avdrag drar ner priset med 14,55 %",
        body: [
          "Grönt teknik-avdrag för solceller är 14,55 % av hela installationskostnaden, material och arbete. Du behöver inte ansöka, vi som installatör drar av summan direkt på fakturan och rapporterar till Skatteverket.",
          "Avdragstaket är 50 000 kr per fastighetsägare och år. Lägger du till batteri (48,5 % avdrag) i samma projekt kan ett par komma upp i betydligt högre total avdragssumma samma år. Vi visar avdraget separat på offerten så du ser exakt vad du betalar netto.",
        ],
      },
      {
        h2: "Lönar sig solceller i Stockholm?",
        body: [
          "Ja. I SE3 ligger spotpriset runt 1,45 kr/kWh i snitt och ett välplacerat tak i Stockholm producerar cirka 1 050 kWh per kWp och år. En ren solanläggning betalar sig på 8–11 år och har sedan minst 15 år kvar av sin 25-åriga effektgaranti, det är där den riktiga vinsten ligger.",
          "Med batterilager och stödtjänster (FCR-D / aFRR) kommer återbetalningstiden ner mot 3–5 år för hus med högre förbrukning, eftersom du då använder mer av din egen el och batteriet dessutom tjänar pengar åt dig när det står stilla.",
        ],
      },
      {
        h2: "Så får du ett exakt pris för ditt hus",
        body: [
          "Räkna på din egen anläggning i vår kalkylator innan du bokar hembesök, den använder samma prismodell och samma siffror som vi använder vid offert. Byt antal paneler, lägg till batteri och se priset och återbetalningstiden ändras i realtid.",
          "Vid hembesöket gör vi en drönarbesiktning av taket och justerar siffrorna efter de faktiska förutsättningarna. Inget pris är slutgiltigt förrän vi har sett taket, vi säljer hellre rätt anläggning än störst.",
        ],
      },
    ],
    faq: [
      {
        q: "Vad kostar solceller till en villa i Stockholm?",
        a: "En typisk Stockholmsvilla med 14 paneler (7 kWp) landar runt 50 000 kr netto efter grönt avdrag på 14,55 %. Mindre anläggningar på 5 kWp ligger runt 40 000 kr och större på 15 kWp runt 95 000 kr. Priset beror främst på antal paneler och takets förutsättningar.",
      },
      {
        q: "Hur många solpaneler får plats på ett villatak i Stockholm?",
        a: "De flesta villatak i Stockholms villaområden rymmer 16–30 paneler, alltså 8–15 kWp. Stora sadeltak i Täby, Danderyd och Nacka tar ofta fler. Vi gör en drönarbesiktning innan offert för att veta exakt hur många paneler som ryms utan att gissa.",
      },
      {
        q: "Är solceller värt det i Stockholm?",
        a: "Ja. Trots att Stockholm ligger i mellersta Sverige producerar ett välplacerat tak cirka 1 050 kWh per kWp och år, och med SE3-spotpris runt 1,45 kr/kWh betalar sig en ren solanläggning på 8–11 år. Med batteri och stödtjänster kommer tiden ner mot 3–5 år.",
      },
      {
        q: "Behöver jag bygglov för solceller i Stockholm, och kostar det extra?",
        a: "Inom detaljplan krävs oftast inget bygglov om panelerna följer takfallet. För kulturskyddade fastigheter eller fasadmontage kan ansökan behövas. Vi tar dialogen med Stadsbyggnadskontoret åt dig och kan ofta avgöra inom en arbetsdag, det tillkommer ingen dold kostnad för det.",
      },
    ],
  },
};

export function getGuideContent(slug: string): GuideContent | null {
  return CONTENT[slug] ?? null;
}
