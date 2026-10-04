import type { BatteryConcept } from "./kb-types";

/**
 * Innehållet i Batteriskolan. Redaktionella regler som för nyheterna
 * (se news-content.ts): varje sakpåstående källbelagt, partipolitiskt
 * neutralt, företagets egna schabloner attribueras som deras.
 */
export const CONCEPTS: BatteryConcept[] = [
  {
    slug: "sa-fungerar-ett-solcellsbatteri",
    group: "grunder",
    term: "Solcellsbatteri",
    title: "Hur fungerar ett solcellsbatteri?",
    description: "Ett solcellsbatteri lagrar solel och billig el till senare. Styrsystemet väljer när det laddar och laddar ur, och växelriktaren gör om elen åt huset.",
    shortAnswer: "Ett solcellsbatteri lagrar el när solcellerna ger överskott, eller när elen är billig, och levererar den när huset behöver den, till exempel på kvällen. Ett styrsystem bestämmer när batteriet laddar och laddar ur, och en växelriktare omvandlar batteriets likström till växelström som huset kan använda.",
    sections: [
      {
        h2: "Vad är ett solcellsbatteri?",
        paragraphs: [
          "Solcellsbatteri, hembatteri och batterilager är olika namn på samma sak: ett fast monterat batteri som lagrar el i bostaden. Batterierna som säljs till hushåll är i huvudsak litiumjonbatterier, och bland stationära batterier dominerar varianten LFP (litiumjärnfosfat). Enligt IEA stod LFP för över 90 procent av världens nyinstallerade stationära batterilager 2025.",
          "Svensk Solenergis brandskyddsriktlinje utgår från att villabatterier i huvudsak ligger på omkring 5–20 kWh, men större förekommer."
        ]
      },
      {
        h2: "Så arbetar batteriet under ett dygn",
        paragraphs: [
          "Mitt på dagen producerar solcellerna ofta mer än huset använder. I stället för att allt överskott säljs laddas batteriet, och på kvällen tar huset el från batteriet i stället för från elnätet. Med prisstyrning kan många system också ladda från elnätet när priset är lågt och leverera när det är högt, men alla system klarar inte det fullt ut.",
          "Inne i battericellerna vandrar litiumjoner mellan två elektroder när batteriet laddas och laddas ur. Ett batteristyrsystem (BMS) övervakar varje cell och håller spänning, ström och laddnivå inom säkra gränser."
        ]
      },
      {
        h2: "Delarna i systemet",
        paragraphs: [
          "Ett komplett batterisystem består av flera delar:"
        ],
        bullets: [
          "Batterimoduler med celler och BMS. Kapaciteten anges i kWh.",
          "En växelriktare som omvandlar mellan likström och växelström. Det kan vara en hybridväxelriktare som även sköter solcellerna, eller en separat batteriväxelriktare.",
          "Mätare och energistyrning som följer husets förbrukning och avgör när batteriet ska ladda eller ladda ur.",
          "En installation av ett elinstallationsföretag som är registrerat hos Elsäkerhetsverket, med föranmälan till elnätsbolaget."
        ]
      },
      {
        h2: "Vad batteriet kan göra för dig",
        paragraphs: [
          "Elsäkerhetsverket beskriver tre användningar: att flytta solel från dag till natt, att kapa effekttoppar som kan påverka elkostnaden kraftigt och att stötta elnätet med nättjänster, ofta via en aggregator. Optimera Energi bedömer att ett batteri typiskt höjer självförbrukningen av solelen från 30–40 procent till 70–80 procent. Hur mycket varje del ger beror på din förbrukning, ditt elnätsbolags avgifter och hur batteriet styrs."
        ]
      },
      {
        h2: "Begränsningar att känna till",
        paragraphs: [],
        bullets: [
          "Batteriet producerar ingen el, och en del av elen går förlorad i batteri och växelriktare.",
          "Ett batteri som bara styrs efter solelen gör få fulla cykler vintertid. Då kan nyttan i stället komma från prisstyrning och kapade effekttoppar.",
          "Ett nätanslutet batteri ger inte automatiskt el vid strömavbrott. Det kräver en växelriktare med backup-funktion och en särskild installation.",
          "Batterier på sammanlagt mer än 20 kWh i samma utrymme omfattas av Boverkets brandskyddskrav, bland annat egen brandcell."
        ]
      }
    ],
    misconceptions: [
      {
        myth: "Har jag ett solcellsbatteri har jag alltid el vid strömavbrott.",
        fact: "Bara om systemet är byggt för det. En vanlig nätansluten anläggning kopplar ner sig när elnätet försvinner, och backup kräver rätt växelriktare, omkopplare och i regel eget jordtag."
      }
    ],
    faq: [
      {
        q: "Vad är skillnaden på hembatteri, solcellsbatteri och batterilager?",
        a: "I praktiken ingen. Alla tre betecknar ett stationärt batteri som lagrar el i bostaden. Ordet solcellsbatteri betonar att batteriet ofta kombineras med solceller."
      },
      {
        q: "Hur länge räcker batteriet en kväll?",
        a: "Det beror på kapaciteten och hur mycket huset drar. Ett batteri med 10 kWh användbar kapacitet räcker ungefär tio timmar om huset drar 1 kW i snitt, men bara runt två timmar vid 5 kW, före förluster."
      }
    ],
    searchPhrases: [
      "batteri solceller hur fungerar det",
      "hur fungerar solcellsbatteri",
      "vad är solcellsbatteri",
      "vad är batterilager",
      "vad är hembatteri",
      "hur fungerar batterilagring",
      "hur fungerar batteri till solceller",
      "hur funkar batteri till solceller",
      "hur fungerar hembatteri",
      "hur fungerar batterilager",
      "hur fungerar solceller med batteri",
      "hembatteri vad är det"
    ],
    sources: [
      {
        title: "Installation av batterilager",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-batterilager/"
      },
      {
        title: "Säkerhetsrisker med batterilager",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-batterilager/sakerhetsrisker-med-batterilager/"
      },
      {
        title: "Global EV Outlook 2026",
        publisher: "IEA (publicerad via Clean Energy Ministerial)",
        url: "https://www.cleanenergyministerial.org/content/uploads/2026/05/globalevoutlook2026.pdf"
      },
      {
        title: "Batteries and Secure Energy Transitions",
        publisher: "IEA",
        url: "https://iea.blob.core.windows.net/assets/cb39c1bf-d2b3-446d-8c35-aae6b1f3a4a0/BatteriesandSecureEnergyTransitions.pdf"
      },
      {
        title: "Riktlinje för brandskydd av stationära batterier (SSE.R8)",
        publisher: "Svensk Solenergi",
        url: "https://svensksolenergi.se/ny-riktlinje-for-brandskydd-av-batterilager/"
      },
      {
        title: "Planera ditt batterilager",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-batterilager/planera-ditt-batterilager/"
      },
      {
        title: "Stromspeicher-Inspektion 2026",
        publisher: "HTW Berlin och aquu",
        url: "https://solar.htw-berlin.de/wp-content/uploads/HTW-aquu-Stromspeicher-Inspektion-2026.pdf"
      },
      {
        title: "Multi-year field measurements of home storage systems and their use in capacity estimation",
        publisher: "Nature Energy (Figgener m.fl., RWTH Aachen)",
        url: "https://www.nature.com/articles/s41560-024-01620-9"
      }
    ],
    related: [
      "kw-och-kwh",
      "dimensionering",
      "vaxelriktare-hybrid-ac-dc",
      "sjalvforbrukning",
      "o-drift-och-backup"
    ],
    questions: [
      "solceller-utan-batteri",
      "vad-kostar-solceller-med-batteri",
      "solceller-vid-stromavbrott"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri till villa – pris, storlek och grönt avdrag"
      },
      {
        href: "/tjanster/batterier",
        label: "Batterilager – så installerar vi"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "kw-och-kwh",
    group: "grunder",
    term: "kW och kWh",
    title: "Vad är skillnaden mellan kW och kWh?",
    description: "kW är effekt, hur mycket el som används just nu. kWh är energi, hur mycket el som används över tid. För ett batteri är kWh kapacitet och kW laddtakt.",
    shortAnswer: "kW (kilowatt) är effekt: hur mycket el som används eller levereras i varje ögonblick. kWh (kilowattimme) är energi: hur mycket el som används under en viss tid. För ett batteri anger kWh hur mycket el det rymmer och kW hur snabbt det kan ladda och ladda ur.",
    sections: [
      {
        h2: "Effekt och energi – två olika mått",
        paragraphs: [
          "Tänk på en vattenkran. Effekten i kW är hur mycket vatten som rinner just nu, energin i kWh är hur mycket som har hamnat i hinken. En apparat som drar 1 kW i en timme använder 1 kWh. Drar den 2 kW i en halvtimme blir det också 1 kWh.",
          "På elräkningen betalar du överföringsavgift och elpris per kWh. Vissa elnätsbolag tar dessutom ut en avgift baserad på effekt, alltså hur mycket el du använder samtidigt."
        ]
      },
      {
        h2: "Så läser du ett batteris kWh och kW",
        paragraphs: [
          "Kapaciteten i kWh säger hur mycket el batteriet kan lagra. Jämför helst användbar kapacitet. Tillverkare håller ofta undan en reserv för att skydda cellerna: i ett exempel i HTW Berlins test 2026 blev 16 kWh på databladet 14,4 kWh användbart, eftersom batteriet bara laddas ur till 90 procent.",
          "Effekten i kW säger hur snabbt batteriet kan ladda och leverera. Ett system med 11,9 kWh kan till exempel ha en maxeffekt på 7 kW. Det klarar då inte laster över 7 kW på egen hand och töms på knappt två timmar vid full effekt."
        ]
      },
      {
        h2: "Hur många kWh drar ett hus per dag?",
        paragraphs: [
          "En genomsnittlig villa i Sverige använder ungefär 20 000 kWh per år, enligt Konsumenternas Energimarknadsbyrå. Det blir i snitt cirka 55 kWh per dygn. En villa som inte värms med el använder ofta omkring 5 000 kWh per år, runt 14 kWh per dygn.",
          "Snittet döljer stora säsongsskillnader. Energimarknadsbyråns månadsexempel för en villa med 20 000 kWh per år motsvarar ungefär 90 kWh per dygn i januari och knappt 20 kWh per dygn i juli."
        ]
      },
      {
        h2: "Därför spelar båda roll för batteriet",
        paragraphs: [
          "Vill du flytta solel till kvällen behöver batteriet tillräckligt många kWh för kvällens förbrukning. Vill du kapa effekttoppar är det i stället effekten i kW som avgör. Ett batteri med stor kapacitet men låg effekt klarar inte en kort, hög topp, och ett litet batteri med hög effekt töms snabbt. Även stödtjänster räknas i effekt: Optimera Energis kalkylator räknar ersättningen per kW växelriktareffekt."
        ]
      }
    ],
    example: {
      title: "Exempel: så länge räcker 10 kWh",
      lines: [
        "Användbar kapacitet: 10 kWh",
        "Huset drar 1 kW i snitt: 10 kWh ÷ 1 kW ≈ 10 timmar",
        "Huset drar 5 kW i snitt: 10 kWh ÷ 5 kW ≈ 2 timmar",
        "Med 10 procents förluster: cirka 9 respektive 1,8 timmar"
      ],
      note: "Förenklat räkneexempel med antagandet att lasten är jämn och att batteriets och växelriktarens effekt räcker för lasten. Verklig förbrukning varierar över dygnet."
    },
    misconceptions: [
      {
        myth: "Ett 10 kW-batteri och ett 10 kWh-batteri är samma sak.",
        fact: "Nej. 10 kW är hur mycket effekt batteriet kan leverera, 10 kWh är hur mycket energi det rymmer. Ett batteri kan till exempel ha 11,9 kWh men bara 7 kW effekt."
      }
    ],
    faq: [
      {
        q: "Hur många kWh drar ett normalt hus per dag?",
        a: "En genomsnittlig svensk villa använder cirka 20 000 kWh per år, vilket blir runt 55 kWh per dygn. Utan elvärme är det ofta omkring 14 kWh per dygn. En villa med elvärme kan dra runt 90 kWh per dygn i januari."
      },
      {
        q: "Hur många kWh har ett solcellsbatteri?",
        a: "Svensk Solenergis riktlinje utgår från att villabatterier i huvudsak ligger på omkring 5–20 kWh. Optimera Energi dimensionerar ofta större batterier till hus med elvärme och hög förbrukning."
      }
    ],
    searchPhrases: [
      "kw och kwh skillnad",
      "solcellsbatteri kwh",
      "hur många kwh drar ett hus per dag",
      "hur många kwh drar ett hus per dygn",
      "hur många kwh drar ett hus per år",
      "hur många kwh drar ett normalt hus",
      "hembatteri kwh",
      "batterilager kwh"
    ],
    sources: [
      {
        title: "Normal elförbrukning och elkostnad för villa",
        publisher: "Konsumenternas Energimarknadsbyrå",
        url: "https://www.energimarknadsbyran.se/el/dina-elavtal-och-kostnader/elhandelsavtalet/elforbrukning/normal-elforbrukning-och-elkostnad-for-villa/"
      },
      {
        title: "Vad är nätavgifter – och varför betalar du dem?",
        publisher: "Konsumenternas Energimarknadsbyrå",
        url: "https://www.energimarknadsbyran.se/el/dina-elavtal-och-kostnader/elnatsavtalet/natavgifter/"
      },
      {
        title: "Stromspeicher-Inspektion 2026",
        publisher: "HTW Berlin och aquu",
        url: "https://solar.htw-berlin.de/wp-content/uploads/HTW-aquu-Stromspeicher-Inspektion-2026.pdf"
      },
      {
        title: "LUNA2000-S1 User Manual (Issue 06, 2025-09-30)",
        publisher: "Huawei Digital Power",
        url: "https://solar.huawei.com/admin/asset/v1/pro/view/7fa828aede004fb1b1658929a49d6242.pdf"
      },
      {
        title: "Riktlinje för brandskydd av stationära batterier (SSE.R8)",
        publisher: "Svensk Solenergi",
        url: "https://svensksolenergi.se/ny-riktlinje-for-brandskydd-av-batterilager/"
      }
    ],
    related: [
      "dimensionering",
      "sa-fungerar-ett-solcellsbatteri",
      "effektavgift",
      "peak-shaving-och-effektvakt",
      "verkningsgrad"
    ],
    questions: [
      "vad-ar-kwp",
      "hur-mycket-el-producerar-solceller",
      "solpaneler-for-10000-och-20000-kwh"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri till villa – pris, storlek och grönt avdrag"
      },
      {
        href: "/kalkylator",
        label: "Kalkylator för sol och batteri"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "dimensionering",
    group: "grunder",
    term: "Dimensionering",
    title: "Hur stort batteri behöver jag? Så dimensioneras ett hembatteri",
    description: "Batteristorleken styrs av dygnsförbrukning, effektbehov och användning. Optimera Energis tumregel: årsförbrukning i kWh delat med 200–275.",
    shortAnswer: "Hur stort batteri du behöver beror på hur mycket el du vill flytta per dygn, hur hög effekt batteriet ska klara och vad det ska användas till. Optimera Energis tumregel är årsförbrukningen i kWh delad med 200–275, vilket ger 55–75 kWh för en villa som använder 15 000 kWh per år. Andra bedömare varnar för att överdimensionera, så räkna på din egen förbrukning.",
    sections: [
      {
        h2: "Utgå från dygnsförbrukningen",
        paragraphs: [
          "Batteriets kapacitet i kWh ska stå i proportion till den el du faktiskt vill flytta i tid. Förbrukningen varierar kraftigt över året. Konsumenternas Energimarknadsbyrås månadsexempel för en villa med 20 000 kWh per år motsvarar runt 90 kWh per dygn i januari men knappt 20 kWh i juli. En mätning av timförbrukningen ger därför en bättre grund än årssiffran."
        ]
      },
      {
        h2: "Effekten avgör vad batteriet klarar på en gång",
        paragraphs: [
          "Titta också på effekten i kW. Den sätter gränsen för hur stora laster batteriet kan driva samtidigt, hur mycket det kan kapa effekttoppar och hur mycket det kan erbjuda i stödtjänster. Effekten begränsas av både batteriet och växelriktaren."
        ]
      },
      {
        h2: "Användningen styr storleken",
        paragraphs: [
          "Elsäkerhetsverket råder dig att tänka igenom hur anläggningen ska användas innan du väljer kapacitet:"
        ],
        bullets: [
          "Mer egen solel: storleken styrs av sommarens överskott och kvällens förbrukning. I tyska fältmätningar gjorde sådana batterier knappt några fulla cykler vintertid.",
          "Prisstyrning och effekttoppar: storleken styrs av hur mycket av dygnets förbrukning som ska flyttas från dyra till billiga timmar. Den nyttan kan finnas även på vintern, när solcellerna ger lite.",
          "Backup vid strömavbrott: storleken styrs av vilka laster som ska drivas och hur länge."
        ]
      },
      {
        h2: "Optimera Energis tumregel – och andra bedömningar",
        paragraphs: [
          "Optimera Energi dimensionerar efter årsförbrukningen i kWh delad med 200–275, ungefär så många dygn per år som elen är dyr och batteriet gör full nytta. Tanken är att kapaciteten ska räcka för ett helt dygns förbrukning. Företaget loggar kundens timförbrukning, i regel i 14 dagar, innan det föreslår en storlek.",
          "Bedömningarna varierar. HTW Berlin, som testar hembatterier, skriver att kapaciteten ska anpassas efter den egna förbrukningen och att överdimensionering varken är ekonomiskt eller ekologiskt meningsfull, eftersom omvandlings- och standbyförluster äter upp nyttan. HTW utgår från tyska solcellshushåll. Optimera Energis tumregel bygger i stället på hur många dygn per år elen är dyr, och företaget dimensionerar ofta större till hus med elvärme."
        ]
      },
      {
        h2: "Gränser att känna till",
        paragraphs: [],
        bullets: [
          "Mer än 20 kWh i samma utrymme kräver enligt Boverket som utgångspunkt egen brandcell och brandgasventilation. Det påverkar var ett stort batteri kan stå.",
          "Energilagret ska föranmälas till elnätsbolaget, som kan behöva utreda hur det påverkar nätet.",
          "Grönt avdrag är högst 50 000 kr per person och år. Vid fast pris når en ensam ägare taket vid ett installerat batteripris runt 103 000 kr.",
          "De flesta tillverkare tillåter fler moduler i efterhand, men vissa har tidsgränser för utbyggnaden."
        ]
      }
    ],
    example: {
      title: "Exempel: tumregeln för tre hus",
      lines: [
        "5 000 kWh per år (utan elvärme): 5 000 ÷ 275–200 ≈ 18–25 kWh",
        "15 000 kWh per år: 15 000 ÷ 275–200 ≈ 55–75 kWh",
        "20 000 kWh per år (genomsnittlig villa): 20 000 ÷ 275–200 ≈ 73–100 kWh"
      ],
      note: "Räkneexempel enligt Optimera Energis tumregel, med antagandet att årsförbrukningen är känd. Tumregeln är en startpunkt som stäms av mot uppmätt timförbrukning. HTW Berlin varnar för att överdimensionera."
    },
    misconceptions: [
      {
        myth: "Ju större batteri, desto bättre.",
        fact: "Inte nödvändigtvis. Ett överdimensionerat batteri har större förluster och standbyförbrukning i förhållande till nyttan, och över 20 kWh tillkommer Boverkets brandskyddskrav."
      }
    ],
    faq: [
      {
        q: "Hur stort batteri behövs till solceller?",
        a: "Det beror på hur mycket solel du vill flytta till kvällen och vad batteriet mer ska göra, till exempel prisstyrning eller backup. Optimera Energis egen tumregel är årsförbrukningen i kWh delad med 200–275, men stäm alltid av mot din uppmätta förbrukning. HTW Berlin avråder från att överdimensionera."
      },
      {
        q: "Hur stort solcellsbatteri får man ha?",
        a: "Boverkets regler sätter ingen övre gräns, men har utrymmet mer än 20 kWh sammanlagt ska det som utgångspunkt vara en egen brandcell med möjlighet till brandgasventilation. Energilagret ska också föranmälas till elnätsbolaget, som kan behöva utreda hur det påverkar nätet."
      },
      {
        q: "Räcker ett 10 kWh-batteri?",
        a: "Det beror på användningen. För att flytta solel till kvällen i ett hus utan elvärme kan det räcka långt. Optimera Energis bedömning är att ett hus som drar 70 kWh per dygn har liten nytta av 10 kWh om målet är att verkligen få ner elkostnaden."
      },
      {
        q: "Kan jag bygga ut batteriet senare?",
        a: "Ofta ja. Enligt HTW Berlin tillåter de flesta tillverkare fler batterimoduler i efterhand, men vissa kräver att det sker inom en viss tid efter driftstarten."
      }
    ],
    searchPhrases: [
      "hur stort batteri behövs till solceller",
      "solcellsbatteri storlek",
      "hur stort hembatteri behöver jag",
      "hur stort solcellsbatteri får man ha",
      "hur stort batteri till solceller",
      "hur stort batteri kan man ha till solceller",
      "dimensionera solcellsbatteri",
      "hembatteri storlek",
      "batterilager storlek",
      "hur stort hembatteri får man ha"
    ],
    sources: [
      {
        title: "Normal elförbrukning och elkostnad för villa",
        publisher: "Konsumenternas Energimarknadsbyrå",
        url: "https://www.energimarknadsbyran.se/el/dina-elavtal-och-kostnader/elhandelsavtalet/elforbrukning/normal-elforbrukning-och-elkostnad-for-villa/"
      },
      {
        title: "Planera ditt batterilager",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-batterilager/planera-ditt-batterilager/"
      },
      {
        title: "Stromspeicher-Inspektion 2026",
        publisher: "HTW Berlin och aquu",
        url: "https://solar.htw-berlin.de/wp-content/uploads/HTW-aquu-Stromspeicher-Inspektion-2026.pdf"
      },
      {
        title: "Multi-year field measurements of home storage systems and their use in capacity estimation",
        publisher: "Nature Energy (Figgener m.fl., RWTH Aachen)",
        url: "https://www.nature.com/articles/s41560-024-01620-9"
      },
      {
        title: "Brandcellsindelning",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/PBL-kunskapsbanken/regler-om-byggande/brandskydd/spridning-inom-byggnad/brandcellsindelning/"
      },
      {
        title: "Så fungerar skattereduktionen för grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/safungerarskattereduktionenforgronteknik.4.676f4884175c97df4192870.html"
      }
    ],
    related: [
      "kw-och-kwh",
      "sjalvforbrukning",
      "spotprisstyrning",
      "brandsakerhet-och-placering",
      "batteriets-intaktskallor"
    ],
    questions: [
      "vad-kostar-solceller-med-batteri",
      "hur-manga-solpaneler-behover-jag",
      "kan-man-bli-sjalvforsorjande-pa-el"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri till villa – pris, storlek och grönt avdrag"
      },
      {
        href: "/kalkylator",
        label: "Testa olika batteristorlekar i kalkylatorn"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "lfp-nmc-och-natriumjon",
    group: "grunder",
    term: "Batterikemi",
    title: "LFP eller NMC – vilken batterikemi passar i hemmet?",
    description: "LFP dominerar bland hembatterier: stabilare kemi, fler cykler och ingen kobolt, men lägre energitäthet än NMC. Natriumjon säljs sedan 2026 men är ny.",
    shortAnswer: "För hembatterier är LFP (litiumjärnfosfat) det dominerande valet: kemin är stabilare, tål fler laddcykler och innehåller varken kobolt eller nickel, men rymmer mindre energi per kilo än NMC. NMC (nickel-mangan-kobolt) används främst i elbilar. Natriumjonbatterier har börjat säljas för villor 2026 men är fortfarande dyrare och nya på marknaden.",
    sections: [
      {
        h2: "Två sorters litiumjonbatterier",
        paragraphs: [
          "LFP och NMC är båda litiumjonbatterier. Namnen kommer från materialet i katoden, en av batteriets två elektroder: litiumjärnfosfat respektive nickel, mangan och kobolt. Enligt IEA stod LFP för över 90 procent av världens nyinstallerade stationära batterilager 2025. NMC och liknande nickelrika kemier är fortfarande vanliga i elbilar, där vikten spelar större roll."
        ]
      },
      {
        h2: "Skillnaderna som märks i hemmet",
        paragraphs: [],
        bullets: [
          "Energitäthet: de senaste LFP-cellerna når upp till cirka 205 Wh/kg och NMC upp till 265 Wh/kg, enligt IEA. Ett LFP-batteri väger därför mer per kWh.",
          "Livslängd: IEA beskriver LFP som stabilare och med längre cykellivslängd. I en tysk fältstudie med 21 hembatterier tappade LFP-systemen 2,2 procentenheter kapacitet per år och NMC-systemen 3,2.",
          "Pris: LFP-batteripaket var i snitt mer än 40 procent billigare per kWh än NMC 2025, delvis för att stationära batterier inte kräver lika hög energitäthet.",
          "Material: LFP innehåller varken kobolt eller nickel."
        ]
      },
      {
        h2: "Säkerhet: lägre risk, inte ingen risk",
        paragraphs: [
          "LFP är en stabil kemi med något lägre brandrisk än andra litiumbatterier, skriver Svensk Solenergi. Men både LFP och NMC har brandfarlig elektrolyt och kan gå i termisk rusning, en okontrollerad uppvärmning där cellen avger brännbara gaser. En rapport från Brandforsk (2025:5) sammanfattar forskningen så här: LFP-celler avger mindre gas än NMC men med högre andel vätgas, och forskningen visar inte entydigt att den ena kemin har lägre explosionsrisk än den andra. Boverkets krav för batterier över 20 kWh gäller alla litiumjonbatterier."
        ]
      },
      {
        h2: "Natriumjon – läget 2026",
        paragraphs: [
          "Natriumjonbatterier använder natrium i stället för litium. Enligt IEA är tekniken på väg in i uppskalningsfasen hos stora tillverkare. Fördelarna är goda egenskaper i kyla, där de senaste cellerna behåller omkring 90 procent av kapaciteten ner till −40 °C, och att råvarorna är vanliga. Nackdelarna är lägre energitäthet, upp till cirka 175 Wh/kg, och en tillverkningskapacitet som är drygt 1 procent av litiumjonbatteriernas.",
          "I Sverige började det första natriumbaserade hembatteriet säljas i februari 2026. Enligt branschtidningen Elinstallatören kostade det då ungefär dubbelt så mycket per kWh som LFP. Eftersom produkterna är nya finns ännu inga flerårsdata från svenska hem. Boverket påpekar att andra batterityper än litiumjon kan ha lägre brandrisk, men att det måste visas med en särskild analys innan man avviker från kraven."
        ]
      }
    ],
    misconceptions: [
      {
        myth: "LFP-batterier kan inte brinna.",
        fact: "LFP har lägre brandrisk än många andra litiumkemier men kan gå i termisk rusning och avge brännbara gaser. Därför gäller samma placeringsregler som för andra litiumjonbatterier."
      }
    ],
    faq: [
      {
        q: "LFP vs NMC – vilken kemi passar som batteri till solceller?",
        a: "För ett stationärt hembatteri är LFP i dag det normala valet, eftersom kemin är stabilare, håller fler cykler och är billigare per kWh. NMC:s fördel, högre energitäthet, väger enligt IEA lätt för batterier som står still."
      },
      {
        q: "Klarar LFP-batterier kyla?",
        a: "Laddning under fryspunkten kan skada litiumjonceller, enligt Elsäkerhetsverket, som också råder dig att hålla temperaturen i batteriutrymmet någorlunda stabil. Placera därför batteriet där tillverkaren tillåter det. Enligt IEA klarar natriumjon kyla betydligt bättre än litiumjon, särskilt jämfört med LFP."
      },
      {
        q: "Ska jag vänta på natriumjonbatterier?",
        a: "Det beror på dina behov. Natriumjon är i dag dyrare per kWh, tar mer plats och saknar lång fälterfarenhet, medan LFP är beprövat. Ingen vet ännu hur snabbt priserna på natriumjon faller."
      }
    ],
    searchPhrases: [
      "lfp eller nmc batteri",
      "lfp batteri",
      "natrium batteri solceller",
      "lfp eller nmc",
      "lfp vs nmc",
      "lfp batteri solceller",
      "lfp batteri fördelar",
      "lfp batteri nackdelar",
      "lfp batteri brand",
      "solcellsbatteri natrium"
    ],
    sources: [
      {
        title: "Global EV Outlook 2026",
        publisher: "IEA (publicerad via Clean Energy Ministerial)",
        url: "https://www.cleanenergyministerial.org/content/uploads/2026/05/globalevoutlook2026.pdf"
      },
      {
        title: "Batteries and Secure Energy Transitions",
        publisher: "IEA",
        url: "https://iea.blob.core.windows.net/assets/cb39c1bf-d2b3-446d-8c35-aae6b1f3a4a0/BatteriesandSecureEnergyTransitions.pdf"
      },
      {
        title: "Riktlinje för brandskydd av stationära batterier (SSE.R8)",
        publisher: "Svensk Solenergi",
        url: "https://svensksolenergi.se/ny-riktlinje-for-brandskydd-av-batterilager/"
      },
      {
        title: "Batterienergilagring i litiumjonbatterier – konsekvensbedömning av explosion och spridning av toxiska förbränningsprodukter (Brandforsk 2025:5)",
        publisher: "Brandforsk",
        url: "https://www.brandforsk.se/wp-content/uploads/2026/01/Brandforsk_Batterilagring_Rapport-1.pdf"
      },
      {
        title: "Multi-year field measurements of home storage systems and their use in capacity estimation",
        publisher: "Nature Energy (Figgener m.fl., RWTH Aachen)",
        url: "https://www.nature.com/articles/s41560-024-01620-9"
      },
      {
        title: "Full effekt i minus 20 – natriumbatteri lanseras i Sverige",
        publisher: "Elinstallatören",
        url: "https://www.elinstallatoren.se/full-effekt-i-minus-20-natriumbatteri-lanseras-i-sverige/"
      },
      {
        title: "Brandcellsindelning",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/PBL-kunskapsbanken/regler-om-byggande/brandskydd/spridning-inom-byggnad/brandcellsindelning/"
      },
      {
        title: "Kontrollera och underhåll ditt batterilager",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-batterilager/kontrollera-och-underhall-ditt-batterilager/"
      }
    ],
    related: [
      "livslangd-och-cykler",
      "brandsakerhet-och-placering",
      "verkningsgrad",
      "sa-fungerar-ett-solcellsbatteri"
    ],
    questions: [
      "kan-solceller-borja-brinna",
      "solceller-och-miljon"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri till villa – pris, storlek och grönt avdrag"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "livslangd-och-cykler",
    group: "grunder",
    term: "Livslängd och cykler",
    title: "Hur länge håller ett solcellsbatteri? Cykler, urladdningsdjup och garanti",
    description: "Hembatterier har ofta 10 års garanti, ibland 15. Fältmätningar visar ett kapacitetstapp på 2–3 procentenheter per år. Så läser du cykler och garanti.",
    shortAnswer: "Ett hembatteri till solceller har i regel 10 års garanti, ibland 15, och en tysk fältstudie visar att batterierna i snitt tappar 2–3 procentenheter av sin användbara kapacitet per år. Garantin gäller ofta ett visst antal år eller en viss mängd levererad energi i MWh, det som inträffar först, så läs villkoren noga.",
    sections: [
      {
        h2: "Cykler och urladdningsdjup",
        paragraphs: [
          "En full cykel är när batteriet har laddats ur motsvarande hela sin användbara kapacitet, även om det sker i flera omgångar. Urladdningsdjupet (DoD, depth of discharge) anger hur stor del av den nominella kapaciteten som används. Tillverkare håller ofta undan en reserv: i ett exempel i HTW Berlins test 2026 gav 16 kWh nominellt 14,4 kWh användbart vid 90 procents urladdningsdjup. Jämför därför batterier på användbar kapacitet."
        ]
      },
      {
        h2: "Vad säger fältmätningarna?",
        paragraphs: [
          "Forskare vid RWTH Aachen följde 21 hembatterier i Tyskland i upp till åtta år. Batterierna tappade i snitt 2–3 procentenheter av den användbara kapaciteten per år, LFP-systemen 2,2 och NMC-systemen 3,2. Enskilda batterier nådde 80 procent av sin nominella kapacitet efter 5–7 år, medan andra höll bättre. Forskarna bedömer att garantierna i de flesta fall klaras, eftersom tillverkarna lägger in en åldringsreserv. De mätta batterierna var av en tidig generation och gjorde omkring 200–250 fulla cykler per år."
        ]
      },
      {
        h2: "Så läser du garantin",
        paragraphs: [],
        bullets: [
          "Tid: 10 år är vanligt, och vissa tillverkare ger 15 år.",
          "Kvarvarande kapacitet: tillverkarna lovar att kapaciteten inte sjunker under 60–85 procent inom garantitiden, enligt HTW Berlins genomgång av 20 tillverkares villkor.",
          "Genomströmning: många garantier gäller ett visst antal år eller en viss mängd levererad energi i MWh, det som inträffar först.",
          "Villkor: vissa garantier kräver att batteriet är uppkopplat för uppdateringar. För Huaweis LUNA2000-S1 upphör den utökade garantin om batteriet varit frånkopplat i mer än sex månader."
        ]
      },
      {
        h2: "Det här påverkar livslängden",
        paragraphs: [
          "Laddning vid höga temperaturer förkortar livslängden och laddning under fryspunkten kan skada cellerna, enligt Elsäkerhetsverket. Huawei anger 15–30 °C som optimal drifttemperatur. Antalet cykler spelar också in: ett batteri som både lagrar solel och styrs mot spotpris varje dag cyklar oftare och når garantins MWh-gräns tidigare."
        ]
      }
    ],
    example: {
      title: "Exempel: när tar garantins MWh-gräns slut?",
      lines: [
        "Användbar kapacitet 10,24 kWh, garanti 10 år eller 30,82 MWh, det som inträffar först",
        "30 820 kWh ÷ 10,24 kWh ≈ 3 000 fulla cykler",
        "200 cykler per år: 3 000 ÷ 200 = 15 år, så tidsgränsen på 10 år gäller först",
        "365 cykler per år: 3 000 ÷ 365 ≈ 8 år, så MWh-gränsen nås före 10 år"
      ],
      note: "Siffrorna är hämtade ur BYD:s europeiska garanti för Battery-Box Premium HVS 10.2 och används som exempel, inte som rekommendation. Antagandet är lika många fulla cykler varje år."
    },
    misconceptions: [
      {
        myth: "Många cykler i databladet betyder lika många cykler i garantin.",
        fact: "Det är garantivillkoren som gäller. I till exempel BYD:s och Huaweis garantier anges gränsen i år och MWh, vilket motsvarar ungefär 3 000–5 300 fulla cykler beroende på modell."
      },
      {
        myth: "Ett åldrat batteri blir farligt.",
        fact: "Elsäkerhetsverket skriver att ett åldrande energilager inte blir farligt bara för att det tappar kapacitet. Var däremot uppmärksam på larm och på stickande lukt i batteriutrymmet."
      }
    ],
    faq: [
      {
        q: "Hur länge håller solcellsbatterier?",
        a: "Garantin gäller i regel 10 år, och fältdata tyder på att de flesta batterier klarar garantitiden. Tappar batteriet 2,2 procentenheter per år, som LFP-systemen i den tyska fältstudien, återstår cirka 78 procent efter tio år om åldrandet är jämnt. Enskilda batterier åldras snabbare."
      },
      {
        q: "Vad är urladdningsdjup?",
        a: "Urladdningsdjupet (DoD) anger hur stor del av batteriets nominella kapacitet som faktiskt används. Ett batteri på 16 kWh med 90 procents urladdningsdjup ger 14,4 kWh användbar energi."
      },
      {
        q: "Hur många cykler gör ett hembatteri per år?",
        a: "I den tyska fältstudien gjorde batterierna omkring 200–250 fulla cykler per år. Ett batteri som även styrs mot spotpris eller kapar effekttoppar kan cykla oftare."
      }
    ],
    searchPhrases: [
      "hur länge håller solcellsbatterier",
      "batteri solceller livslängd",
      "batteri cykler",
      "solcellsbatteri garanti",
      "urladdningsdjup",
      "hur länge håller ett hembatteri",
      "hembatteri livslängd",
      "batterilager livslängd",
      "hembatteri garanti",
      "antal cykler batteri"
    ],
    sources: [
      {
        title: "Multi-year field measurements of home storage systems and their use in capacity estimation",
        publisher: "Nature Energy (Figgener m.fl., RWTH Aachen)",
        url: "https://www.nature.com/articles/s41560-024-01620-9"
      },
      {
        title: "Stromspeicher-Inspektion 2026",
        publisher: "HTW Berlin och aquu",
        url: "https://solar.htw-berlin.de/wp-content/uploads/HTW-aquu-Stromspeicher-Inspektion-2026.pdf"
      },
      {
        title: "BYD Battery-Box Premium HVS & HVM Limited Warranty – Europe",
        publisher: "BYD",
        url: "https://www.bydbatterybox.com/uploads/downloads/BCU2.0_BYD%20Battery-Box%20Premium%20HVS&HVM%20Limited%20Warranty-Europe-EN-V1.0-67eb5bb39ed39.pdf"
      },
      {
        title: "Residential Smart PV Warranty Policy (Global), Issue 04",
        publisher: "Huawei Digital Power",
        url: "https://solar.huawei.com/admin/asset/v1/pro/view/d373d9834172413b85d346e1f691915d.pdf"
      },
      {
        title: "Kontrollera och underhåll ditt batterilager",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-batterilager/kontrollera-och-underhall-ditt-batterilager/"
      }
    ],
    related: [
      "lfp-nmc-och-natriumjon",
      "verkningsgrad",
      "spotprisstyrning",
      "batteriets-intaktskallor",
      "dimensionering"
    ],
    questions: [
      "hur-lange-haller-solceller",
      "aterbetalningstid-solceller"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri till villa – pris, storlek och grönt avdrag"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "verkningsgrad",
    group: "grunder",
    term: "Verkningsgrad",
    title: "Hur stora är förlusterna i ett batteri? Verkningsgrad förklarad",
    description: "Batteriet förlorar ofta bara några procent, men växelriktare, låg last och vänteläge ökar förlusterna. Med goda komponenter får du tillbaka knappt 90 %.",
    shortAnswer: "Verkningsgraden anger hur stor del av den lagrade elen du får tillbaka. Själva batteriet förlorar ofta bara några procent, men växelriktarens omvandlingar, låg last och vänteläge drar ner helheten. I ett räkneexempel med goda komponenter får du tillbaka knappt 90 procent av solelen du lagrar.",
    sections: [
      {
        h2: "Vad menas med verkningsgrad?",
        paragraphs: [
          "Verkningsgraden för batterilagring är den energi du får ut delat med den energi du stoppade in. Den kan anges för bara battericellerna eller för hela kedjan från solpanel eller elnät till husets uttag, och siffrorna går därför inte alltid att jämföra. HTW Berlin påpekar att växelriktarnas angivna verkningsgrad oftast gäller omvandlingen från solpanel till elnät, medan förlusterna vid urladdning av batteriet sällan redovisas."
        ]
      },
      {
        h2: "Var försvinner elen?",
        paragraphs: [
          "HTW Berlins laboratorietest av tolv hembatterisystem 2026 visar var förlusterna uppstår:"
        ],
        bullets: [
          "I batteriet: batteriernas verkningsgrad låg mellan 87,9 och 97,1 procent, och hälften av systemen låg över 95,7 procent.",
          "I växelriktaren: snittverkningsgraden vid urladdning varierade mellan 91,2 och 97,8 procent.",
          "Vid låg last: i ett system var växelriktarens verkningsgrad 66 procent vid 100 W men 90 procent vid 500 W.",
          "I vänteläge: systemen drog 4–64 W, vilket blir cirka 35–560 kWh per år om batteriet står i vänteläge hela tiden.",
          "I kyla: batterier med inbyggd värme använder lagrad el för att värma cellerna, vilket sänker verkningsgraden vintertid."
        ]
      },
      {
        h2: "AC- eller DC-koppling påverkar",
        paragraphs: [
          "I ett DC-kopplat system laddas batteriet direkt med solcellernas likström via en hybridväxelriktare. I ett AC-kopplat system omvandlas solelen först till växelström och sedan tillbaka till likström, alltså ett steg till. Produkten betyder ändå mycket: i HTW:s test 2026 vann ett AC-kopplat system klassen för 5 kW."
        ]
      },
      {
        h2: "Vad förlusterna betyder för kalkylen",
        paragraphs: [
          "Lagrar du solel som annars hade sålts billigt kostar förlusterna lite. Laddar du från elnätet för att använda elen senare måste prisskillnaden täcka förlusterna. HTW visar att lönsamheten för laddning från nätet hänger på systemets verkningsgrad vid den låga effekt som batterier oftast laddar ur med, och att inte alla testade system nådde den nivå som krävdes i deras räkneexempel."
        ]
      }
    ],
    example: {
      title: "Exempel: från solpanel till kvällslampa",
      lines: [
        "Solel in: 10 kWh",
        "Laddning via hybridväxelriktare, 97 %: 9,7 kWh i batteriet",
        "Batteriets verkningsgrad, 95 %: 9,2 kWh ut ur batteriet",
        "Urladdning genom växelriktaren, 96 %: 8,8 kWh till huset, alltså cirka 88 procent",
        "Laddar du i stället från nätet för 100 öre/kWh, med ungefär samma förluster, behöver elen du ersätter kosta minst cirka 114 öre/kWh för att täcka förlusterna"
      ],
      note: "Räkneexempel med antagna verkningsgrader inom de intervall HTW Berlin mätte upp 2026. Priserna är valda för exemplets skull. Vänteläge, låg last, kyla och batteriets slitage ingår inte och gör kalkylen sämre i praktiken."
    },
    misconceptions: [
      {
        myth: "Verkningsgraden i databladet är vad jag får i praktiken.",
        fact: "Databladets siffra gäller ofta bara en del av kedjan, under gynnsamma förhållanden. Låg last, vänteläge och kyla gör att den verkliga verkningsgraden blir lägre."
      }
    ],
    faq: [
      {
        q: "Hur hög verkningsgrad har ett hembatteri?",
        a: "Själva batteriet ligger ofta runt 95–97 procent; ett datablad anger till exempel minst 96 procent. I HTW Berlins test spände batteriernas verkningsgrad från 87,9 till 97,1 procent. Genom hela systemet, med växelriktare, blir det lägre."
      },
      {
        q: "Drar batteriet el när det står still?",
        a: "Ja. Styrning, kommunikation och växelriktare förbrukar el även i vänteläge. I HTW Berlins test drog systemen mellan 4 och 64 W, vilket kan bli flera hundra kWh per år för de mindre effektiva."
      },
      {
        q: "Är verkningsgraden sämre på vintern?",
        a: "Den kan bli det. Batterier med inbyggd värme, som Huaweis, använder lagrad el för att värma cellerna när det är kallt, vilket sänker verkningsgraden. Står batteriet i ett tempererat utrymme minskar den förlusten."
      }
    ],
    searchPhrases: [
      "verkningsgrad batterilagring",
      "verkningsgrad batteri"
    ],
    sources: [
      {
        title: "Stromspeicher-Inspektion 2026",
        publisher: "HTW Berlin och aquu",
        url: "https://solar.htw-berlin.de/wp-content/uploads/HTW-aquu-Stromspeicher-Inspektion-2026.pdf"
      },
      {
        title: "Battery-Box Premium HVS, datablad (V1.0, 2024)",
        publisher: "BYD",
        url: "https://bydbatterybox.com/uploads/downloads/BBOX_HVS_Datasheet_EN_V1.0_240626_L-668f92b10b0a6.pdf"
      },
      {
        title: "LUNA2000-S1 User Manual (Issue 06, 2025-09-30)",
        publisher: "Huawei Digital Power",
        url: "https://solar.huawei.com/admin/asset/v1/pro/view/7fa828aede004fb1b1658929a49d6242.pdf"
      }
    ],
    related: [
      "vaxelriktare-hybrid-ac-dc",
      "spotprisstyrning",
      "livslangd-och-cykler",
      "dimensionering"
    ],
    questions: [
      "vilka-solpaneler-ar-bast",
      "vad-gor-en-vaxelriktare"
    ],
    links: [
      {
        href: "/kalkylator",
        label: "Kalkylator för sol och batteri"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "vaxelriktare-hybrid-ac-dc",
    group: "grunder",
    term: "Växelriktare och koppling",
    title: "Hybridväxelriktare, AC- eller DC-kopplat batteri – vad är skillnaden?",
    description: "En hybridväxelriktare styr både solceller och batteri (DC-kopplat). Ett AC-kopplat batteri har egen växelriktare och passar till befintliga solceller.",
    shortAnswer: "En hybridväxelriktare sköter både solcellerna och batteriet i samma apparat, och batteriet laddas då direkt med solcellernas likström. Det kallas DC-kopplat. Ett AC-kopplat batteri har en egen växelriktare och ansluts på husets växelströmssida, vilket gör att du kan lägga till ett batteri utan att byta solcellernas växelriktare.",
    sections: [
      {
        h2: "Varför behövs en växelriktare?",
        paragraphs: [
          "Solpaneler och batterier arbetar med likström (DC), medan huset och elnätet använder växelström (AC). Växelriktaren omvandlar mellan de två. I ett batterisystem finns minst en växelriktare som kan både ladda och ladda ur batteriet, och dess effekt i kW sätter gränsen för hur snabbt det går."
        ]
      },
      {
        h2: "DC-kopplat: hybridväxelriktare",
        paragraphs: [
          "En hybridväxelriktare kombinerar solcellsväxelriktare och batteriväxelriktare i en apparat, och solelen går till batteriet på likströmssidan utan att först bli växelström. Har du redan solceller med en vanlig växelriktare behöver den i regel bytas mot en hybridväxelriktare om batteriet ska DC-kopplas."
        ]
      },
      {
        h2: "AC-kopplat: egen batteriväxelriktare",
        paragraphs: [
          "I ett AC-kopplat system har solcellerna och batteriet var sin växelriktare, och batteriet laddas via husets växelströmssida. Fördelen är att befintliga solceller och växelriktare kan sitta kvar, så du kan alltså ha batteri utan hybridväxelriktare. Solel som lagras omvandlas ett steg extra, men produktens kvalitet väger tungt: i HTW Berlins test 2026 vann ett AC-kopplat system klassen för 5 kW."
        ]
      },
      {
        h2: "Batteri med inbyggd växelriktare",
        paragraphs: [
          "Vissa batterier har växelriktaren inbyggd, så att batteri och växelriktare blir en kompakt enhet. Kontrollera om den inbyggda växelriktaren kan ta emot solpaneler direkt eller bara kopplas in på husets växelströmssida, och hur stor effekt den klarar."
        ]
      },
      {
        h2: "Det här ska du kontrollera",
        paragraphs: [],
        bullets: [
          "Kompatibilitet: många batterier får bara användas med växelriktare som tillverkaren har godkänt, och bara vissa växelriktare fungerar med andra märkens batterier.",
          "Effekt: växelriktarens kW sätter gränsen för laddning, urladdning och hur mycket huset kan dra vid strömavbrott. Överstiger lasten gränsen kan systemet slå ifrån.",
          "Backup: inte alla växelriktare stödjer drift vid strömavbrott.",
          "Styrning: alla system kan inte ladda från nätet efter elpriset fullt ut, så kontrollera att växelriktaren fungerar med den energistyrning du vill använda.",
          "Anmälan: energilagret ska föranmälas till elnätsbolaget innan installationen påbörjas."
        ]
      }
    ],
    misconceptions: [
      {
        myth: "Man måste byta växelriktare för att kunna skaffa batteri.",
        fact: "Inte om batteriet är AC-kopplat. Då har batteriet en egen växelriktare och solcellernas befintliga växelriktare kan sitta kvar."
      }
    ],
    faq: [
      {
        q: "Kan man ha batteri till solceller utan hybridväxelriktare?",
        a: "Ja. Ett AC-kopplat batteri har en egen växelriktare och kopplas in på husets elsystem, så att den befintliga solcellsväxelriktaren kan sitta kvar."
      },
      {
        q: "Ska jag välja AC- eller DC-kopplat batteri?",
        a: "Det beror på läget. DC-koppling har ett omvandlingssteg mindre för solel till batteriet, medan AC-koppling gör det enklare att komplettera en befintlig anläggning. Mätningar visar att både AC- och DC-kopplade system kan vara mycket effektiva."
      },
      {
        q: "Klarar en hybridväxelriktare ödrift?",
        a: "Bara om den har en funktion för backup, ofta kallad ”back up power” eller ”standalone mode”, och installationen byggs för ödrift med bland annat omkopplare och i regel eget jordtag. Enligt Svensk Solenergi har de flesta solcellsinstallationer med batteri en växelriktare som är redo för det, men fråga efter funktionen innan du väljer växelriktare."
      }
    ],
    searchPhrases: [
      "hybridväxelriktare",
      "ac kopplat batteri",
      "solcellsbatteri med inbyggd växelriktare",
      "batteri till solceller utan hybridväxelriktare",
      "solcellsbatteri utan hybridväxelriktare",
      "ac batteri solceller",
      "solceller växelriktare batteri",
      "hybridväxelriktare ödrift"
    ],
    sources: [
      {
        title: "Stromspeicher-Inspektion 2026",
        publisher: "HTW Berlin och aquu",
        url: "https://solar.htw-berlin.de/wp-content/uploads/HTW-aquu-Stromspeicher-Inspektion-2026.pdf"
      },
      {
        title: "Battery-Box Premium HVS & HVM Operating Manual V1.8",
        publisher: "BYD",
        url: "https://www.bydbatterybox.com/uploads/downloads/BYD%20Battery-Box%20Premium%20HVS&HVM%20Operating%20Manual-V1.8-628b4dd2db7e2.pdf"
      },
      {
        title: "Fem steg till ö-drift",
        publisher: "Svensk Solenergi",
        url: "https://svensksolenergi.se/att-installera-solenergi/fem-steg/"
      },
      {
        title: "Planera ditt batterilager",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-batterilager/planera-ditt-batterilager/"
      },
      {
        title: "Planera din solcellsanläggning",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-solceller/planera-din-solcellsanlaggning/"
      },
      {
        title: "Batteri tar över vid strömavbrott: ”Du kan driva hela huset”",
        publisher: "Elinstallatören",
        url: "https://www.elinstallatoren.se/batteri-tar-over-vid-stromavbrott-du-kan-driva-hela-huset/"
      }
    ],
    related: [
      "verkningsgrad",
      "o-drift-och-backup",
      "sa-fungerar-ett-solcellsbatteri",
      "stodtjanster",
      "dimensionering"
    ],
    questions: [
      "vad-gor-en-vaxelriktare",
      "anmala-solceller-till-natagaren",
      "solceller-vid-stromavbrott"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri till villa – pris, storlek och grönt avdrag"
      },
      {
        href: "/tjanster/batterier",
        label: "Batterilager – så installerar vi"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "sjalvforbrukning",
    group: "ekonomi",
    term: "Självförbrukning",
    title: "Vad är självförbrukning av solel – och hur höjer ett batteri den?",
    description: "Självförbrukning är den del av solelen du använder själv. Den är värd mer än såld el, och ett batteri flyttar dagens överskott till kvällen.",
    shortAnswer: "Självförbrukning, eller egenanvändning, är den del av solcellernas el som du använder i huset i stället för att sälja. Varje sådan kilowattimme ersätter köpt el med elpris, energiskatt, nätavgift och moms, medan såld el oftast bara ger ungefär spotpriset. Ett batteri höjer självförbrukningen genom att spara dagens överskott till kvällen.",
    sections: [
      {
        h2: "Vad är självförbrukning?",
        paragraphs: [
          "Självförbrukning, som Energimyndigheten kallar egenanvändning, är solel som används bakom din elmätare och aldrig matas ut på elnätet. Den anges ofta som andel av årsproduktionen. Använder du 3 500 av 10 500 producerade kWh själv är självförbrukningen ungefär 33 procent.",
          "Utan åtgärder blir andelen sällan hög. En villa använder ofta mest el morgon och kväll, medan solcellerna producerar mest mitt på dagen. Det som inte används direkt matas automatiskt ut på nätet."
        ]
      },
      {
        h2: "Därför är egen solel värd mer än såld",
        paragraphs: [
          "En kilowattimme som du slipper köpa sparar hela det rörliga priset: elhandelspris, energiskatt, rörlig överföringsavgift och moms. Energiskatten är 45 öre/kWh inklusive moms 2026, och hos Ellevio är överföringsavgiften 26 öre/kWh.",
          "Såld el ger normalt spotpriset plus eller minus ett litet påslag, och några öre per kWh i nätnytta från elnätsföretaget. Skattereduktionen på 60 öre/kWh för såld el försvann den 1 januari 2026. Solelen säljs dessutom när den är som billigast. I elområde SE3 låg spotpriset april–september 2026 i snitt på cirka 43 öre/kWh klockan 10–15, mot cirka 98 öre klockan 17–21, exklusive moms, enligt vår beräkning på elbörsens dagen före-priser."
        ]
      },
      {
        h2: "Så höjer batteriet självförbrukningen",
        paragraphs: [
          "Batteriet laddas med överskottet mitt på dagen och laddar ur när huset drar mer än solcellerna ger. Optimera Energi anger att ett batteri typiskt höjer självförbrukningen från 30–40 procent till 70–80 procent. Hur mycket det blir hos dig beror på batteriets storlek i förhållande till solcellerna och på hur mycket el du använder på kvällen.",
          "Du kan också flytta förbrukning till soltimmarna, till exempel genom att ladda elbilen mitt på dagen. Energimyndigheten kallar det laststyrning, och det fungerar med eller utan batteri."
        ]
      },
      {
        h2: "Begränsningar och vanliga fel",
        paragraphs: [
          "Det här är bra att veta innan du räknar hem ett batteri på självförbrukning:"
        ],
        bullets: [
          "När solcellerna ger lite, som en mulen vinterdag, finns inget överskott att lagra. Då gör batteriet mer nytta med spotprisstyrning.",
          "En del av energin går förlorad vid laddning och urladdning, så varje lagrad kilowattimme blir lite mindre.",
          "Säljer batteriet samtidigt stödtjänster används enligt CheckWatt typiskt bara 20–45 procent av energin till solel och arbitrage.",
          "Att klara sig helt utan elnätet kräver mycket stor lagring och blir mycket kostsamt, enligt Energimyndigheten."
        ]
      }
    ],
    example: {
      title: "Exempel: vad är en flyttad kilowattimme värd?",
      lines: [
        "Köpt el en sommarkväll: spotpris cirka 0,98 kr plus 5 öre påslag och 25 procent moms ≈ 1,29 kr/kWh.",
        "Plus energiskatt 0,45 kr och Ellevios överföringsavgift 0,26 kr ≈ 2,00 kr/kWh.",
        "Såld solel mitt på dagen: spotpris cirka 0,43 kr plus några öre i nätnytta ≈ 0,45 kr/kWh.",
        "Skillnad: cirka 1,55 kr för varje kWh som flyttas från försäljning till egen användning.",
        "Ett 10 kWh-batteri som fylls med solöverskott 150 dagar per år och lämnar 9 kWh per gång flyttar cirka 1 350 kWh. Med förlusterna inräknade är det värt runt 2 000 kr per år."
      ],
      note: "Antaganden: elområde SE3, snittpriser april–september 2026 enligt vår beräkning på dagen före-priser, 5 öre i påslag, energiskatt 2026, Ellevios överföringsavgift från 1 juni 2026 och cirka 10 procents förluster. Elavtal, nätbolag, solcellernas storlek och din kvällsförbrukning ändrar resultatet."
    },
    misconceptions: [
      {
        myth: "Såld solel är lika mycket värd som solel du använder själv.",
        fact: "Nej. Använd solel ersätter köpt el med skatt, nätavgift och moms. Såld el ger ungefär spotpriset, och sedan 2026 ingen skattereduktion."
      },
      {
        myth: "Med ett batteri blir man självförsörjande på el.",
        fact: "Sällan. När solcellerna ger lite räcker inte lagret, och att lagra för långa perioder kräver mycket stor kapacitet och blir mycket kostsamt enligt Energimyndigheten."
      }
    ],
    faq: [
      {
        q: "Är egenanvändning och självförbrukning samma sak?",
        a: "Ja. Båda orden betyder den del av solelen som används i huset i stället för att matas ut på elnätet. Energimyndigheten använder ordet egenanvändning."
      },
      {
        q: "Hur hög självförbrukning har man utan batteri?",
        a: "Optimera Energi anger typiskt 30–40 procent för en villa utan batteri. Andelen blir högre om någon är hemma dagtid eller om elbilen laddas mitt på dagen, och lägre om solcellsanläggningen är stor i förhållande till förbrukningen."
      },
      {
        q: "Lönar det sig mer att använda solelen själv nu när 60-öringen är borta?",
        a: "Ja. Sedan 1 januari 2026 ger såld el ingen skattereduktion, så skillnaden mellan använd och såld solel har ökat jämfört med när såld el kunde ge 60 öre/kWh extra."
      }
    ],
    searchPhrases: [
      "egenanvändning solel",
      "självförbrukning solel"
    ],
    sources: [
      {
        title: "Bättre ekonomi med rätt anläggningsstorlek",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/battre-ekonomi-med-ratt-anlaggningsstorlek/"
      },
      {
        title: "Löpande intäkter efter installation",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vilka-stod-och-intakter-kan-jag-fa/lopande-intakter-efter-installation/"
      },
      {
        title: "Koppla batterier till solcellerna",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/batterier-kopplat-till-solceller/"
      },
      {
        title: "Mikroproduktion av förnybar el – privatbostad",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/inkomsterfranbostad/mikroproduktionavfornybarelprivatbostad.4.12815e4f14a62bc048f41a7.html"
      },
      {
        title: "Energiskatt för dig som privatkund",
        publisher: "Vattenfall Eldistribution",
        url: "https://www.vattenfalleldistribution.se/abonnemang-och-avgifter/avtal-och-avgifter/energiskatt/"
      },
      {
        title: "Elnätskostnad för hus – priser och exempel",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/abonnemang/elnatspriser/hus/"
      },
      {
        title: "Day-ahead prices (dagen före-priser per kvart, bl.a. SE3)",
        publisher: "Energinet, Energi Data Service",
        url: "https://www.energidataservice.dk/tso-electricity/DayAheadPrices"
      },
      {
        title: "Vanliga frågor",
        publisher: "CheckWatt",
        url: "https://checkwatt.com/sv/faq-vanliga-fragor/"
      }
    ],
    related: [
      "spotprisstyrning",
      "dimensionering",
      "verkningsgrad",
      "batteriets-intaktskallor"
    ],
    questions: [
      "solceller-utan-batteri",
      "hur-mycket-sparar-man-pa-solceller",
      "kan-man-bli-sjalvforsorjande-pa-el"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri till villa – pris och storlek"
      },
      {
        href: "/kalkylator",
        label: "Räkna på sol och batteri i kalkylatorn"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "spotprisstyrning",
    group: "ekonomi",
    term: "Spotprisstyrning",
    title: "Spotprisstyrning: så laddar batteriet när elen är billig",
    description: "Spotprisstyrning betyder att batteriet laddas när elen är billig och används när den är dyr. Vinsten styrs av prisskillnaden över dygnet.",
    shortAnswer: "Spotprisstyrning innebär att batteriet laddas när elen är billig, ofta på natten eller mitt på dagen, och laddar ur när den är dyr. Det kräver ett elavtal som följer spotpriset, i dag i praktiken kvartspris. Vinsten bestäms av prisskillnaden mellan billiga och dyra timmar, minus förlusterna i batteriet.",
    sections: [
      {
        h2: "Vad är spotprisstyrning?",
        paragraphs: [
          "Spotpriset är elpriset på elbörsen. Sedan den 1 oktober 2025 sätts det per kvart, och priserna för nästa dygn publiceras klockan 13.00 dagen före. Batteriets styrsystem, ofta kallat EMS (energy management system), läser in priserna och planerar när batteriet ska ladda och ladda ur.",
          "Att köpa billigt och använda dyrt kallas arbitrage. För ett hushåll handlar det främst om att täcka husets egen förbrukning under dyra timmar med el som köpts in billigare."
        ]
      },
      {
        h2: "Hur mycket skiljer det över dygnet?",
        paragraphs: [
          "Under oktober 2025–september 2026 låg spotpriset i SE3 i snitt på cirka 73 öre/kWh exklusive moms. Mellan dygnets fem billigaste och fem dyraste timmar skilde det i snitt cirka 75 öre, och mellan de tre billigaste och tre dyraste cirka 85 öre, enligt vår beräkning på elbörsens dagen före-priser.",
          "Skillnaden varierar mycket. Vissa dygn är priskurvan nästan platt, andra dygn skiljer det flera kronor per kWh mellan dyraste och billigaste kvart."
        ]
      },
      {
        h2: "Ladda på natten – fungerar det med solceller?",
        paragraphs: [
          "Ja. När solcellerna ger lite kan batteriet laddas från nätet under billiga nattimmar och användas morgon och kväll, och när solen lyser fylls det i stället med solel. Har du Vattenfall Eldistributions tidstariff är överföringsavgiften dessutom 76,5 öre/kWh vardagar klockan 06–22 i januari–mars och november–december, mot 30,5 öre övrig tid. Det gör nattladdning mer värd.",
          "Det gröna avdraget påverkas inte. Skatteverket godtar sedan juli 2024 att batteriet delvis används för elprisarbitrage, så länge det också lagrar egen solel."
        ]
      },
      {
        h2: "Begränsningar och vanliga fel",
        paragraphs: [
          "Fem saker som minskar vinsten:"
        ],
        bullets: [
          "Elavtalet. Med fast pris eller rörligt månadspris ger flyttad förbrukning ingen besparing. Enligt Ei behöver du ett avtal som följer spotpriset, ett kvartsprisavtal.",
          "Förluster. En del av energin försvinner i batteriet, så prisskillnaden måste vara större än förlusten.",
          "Att sälja tillbaka. Såld el ger ungefär spotpriset, medan köpt el belastas med energiskatt, nätavgift och moms. Arbitrage lönar sig därför främst när batteriet täcker husets egen förbrukning.",
          "Slitage. Varje laddcykel förbrukar en liten del av batteriets livslängd. Optimera Energi anger cirka 6 000–6 500 cykler för batterierna i sitt sortiment.",
          "Konkurrens. Kapacitet som hålls i reserv för stödtjänster eller effektvakt kan inte samtidigt användas till arbitrage."
        ]
      }
    ],
    example: {
      title: "Exempel: arbitrage med ett 10 kWh-batteri",
      lines: [
        "Laddning: 10 kWh under dygnets fem billigaste timmar, i snitt 38,5 öre/kWh ≈ 3,85 kr.",
        "Urladdning: 9 kWh efter cirka 10 procents förluster, under de fem dyraste timmarna, i snitt 113,7 öre/kWh ≈ 10,23 kr.",
        "Vinst: cirka 6,40 kr per dygn exklusive moms. Under 250 dygn per år blir det cirka 1 600 kr.",
        "Med moms cirka 2 000 kr. Den förlorade kilowattimmen kostar också energiskatt och nätavgift, runt 0,70 kr per dygn med Ellevios överföringsavgift, så netto cirka 1 800 kr per år.",
        "Teoretiskt tak med perfekt framförhållning och flera cykler per dygn (10 kWh, 5 kW): cirka 3 800 kr exklusive moms."
      ],
      note: "Antaganden: kvartsprisavtal, batteriet täcker husets egen förbrukning under dyra timmar, SE3-priser oktober 2025–september 2026 enligt vår beräkning på dagen före-priser omräknade med Riksbankens eurokurs. Verklig styrning når inte perfekt utfall, och dagar då batteriet används till solel eller stödtjänster ger mindre utrymme."
    },
    misconceptions: [
      {
        myth: "Batteriet tjänar pengar på att sälja el tillbaka till nätet varje kväll.",
        fact: "Oftast inte. Såld el ger ungefär spotpriset, medan köpt el kostar energiskatt, nätavgift och moms. Värdet uppstår främst när batteriet ersätter el du annars hade köpt."
      },
      {
        myth: "Spotprisstyrning ger ungefär samma vinst varje dag.",
        fact: "Nej. Vissa dygn är priskurvan nästan platt, andra dygn skiljer det flera kronor per kWh."
      }
    ],
    faq: [
      {
        q: "Kan man ladda solcellsbatteriet från elnätet på natten?",
        a: "Ja, med styrning och ett elavtal som följer spotpriset. Det är mest värt när solcellerna ger lite. Grönt avdrag påverkas inte, enligt Skatteverket, så länge batteriet också lagrar egen solel."
      },
      {
        q: "Vad är skillnaden mellan timpris och kvartspris?",
        a: "Spotpriset sätts sedan 1 oktober 2025 per kvart. Med kvartspris betalar du varje kvarts pris. Med timpris får du ett pris per timme som räknas fram ur kvartspriserna enligt elhandlarens villkor. För ett batteri som laddar under flera timmar är skillnaden liten."
      },
      {
        q: "Hur mycket kan man tjäna på arbitrage med ett batteri?",
        a: "I vårt exempel ger ett 10 kWh-batteri cirka 1 800 kr per år netto i SE3, och med perfekt framförhållning högst omkring 3 800 kr exklusive moms. Större batterier och mer svängiga priser ger mer."
      }
    ],
    searchPhrases: [
      "spotpris batteri",
      "solceller batteri ladda på natten",
      "arbitrage el batteri",
      "timpris el",
      "timpris eller kvartspris"
    ],
    sources: [
      {
        title: "Elhandelsavtal med kvartspris",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/konsument/anvand-el-smartare/elhandelsavtal-med-kvartspris"
      },
      {
        title: "Elbörserna går över till att handla el per kvart",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/om-oss/nyheter/2025/2025-09-29-elborserna-gar-over-till-att-handla-el-per-kvart"
      },
      {
        title: "Day-ahead prices (dagen före-priser per kvart, bl.a. SE3)",
        publisher: "Energinet, Energi Data Service",
        url: "https://www.energidataservice.dk/tso-electricity/DayAheadPrices"
      },
      {
        title: "Sök räntor och valutakurser (EUR/SEK)",
        publisher: "Sveriges riksbank",
        url: "https://www.riksbank.se/sv/statistik/rantor-och-valutakurser/sok-rantor-och-valutakurser/"
      },
      {
        title: "Säkringsabonnemang 2026, privat (prislista)",
        publisher: "Vattenfall Eldistribution",
        url: "https://www.vattenfalleldistribution.se/globalassets/1.-privat/abonnemang-och-avgifter/om-avtal-och-avgifter/elnatsavgifter/sakringsabonnemang/prislista-sakringsabonnemang-privat-2026-01-01.pdf"
      },
      {
        title: "Grönt avdrag för batterier (nytt ställningstagande 4 juli 2024)",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/omoss/pressochmedia/nyheter/2024/nyheter/grontavdragforbatterier.5.5dc1d8b31903014b1bf172d.html"
      },
      {
        title: "Löpande intäkter efter installation",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vilka-stod-och-intakter-kan-jag-fa/lopande-intakter-efter-installation/"
      }
    ],
    related: [
      "kvartspris",
      "sjalvforbrukning",
      "verkningsgrad",
      "batteriets-intaktskallor",
      "batteri-utan-solceller"
    ],
    questions: [
      "solceller-vid-minuspris",
      "ersattning-for-sald-solel"
    ],
    links: [
      {
        href: "/kalkylator",
        label: "Räkna på batteriet i kalkylatorn"
      },
      {
        href: "/nyheter/vinterns-elpriser-2026-prognos-dyrare-soder",
        label: "Nyhet: Vinterns elpriser 2026"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "kvartspris",
    group: "ekonomi",
    term: "Kvartspris",
    title: "Vad är kvartspris på el – och vad betyder det för batteriet?",
    description: "Sedan 1 oktober 2025 sätts elpriset per kvart. Med kvartspris ändras ditt pris var 15:e minut, vilket passar dig som kan styra förbrukningen.",
    shortAnswer: "Kvartspris är ett elavtal där du betalar elbörsens pris för varje kvart, plus elhandlarens påslag och moms. Den nordiska dagen före-marknaden gick över till 15-minuterspriser med första leveransdag 1 oktober 2025. För ett batteri ger det mer exakta prissignaler, men skillnaden mot timpris är oftast liten.",
    sections: [
      {
        h2: "Vad är kvartspris?",
        paragraphs: [
          "Spotpriset sätts på elbörsens dagen före-marknad, där el för nästa dygn handlas. Den 30 september 2025 började de europeiska elbörserna handla per kvart i stället för per timme, och första leveransdag var 1 oktober 2025. Det ger 96 priser per dygn i stället för 24.",
          "Priserna för nästa dygns kvartar publiceras klockan 13.00 dagen före. Elhandlare med fler än 200 000 kunder måste sedan 1 oktober 2025 erbjuda kvartsprisavtal. Att el ska handlas och mätas per kvart är ett EU-krav, och kvartsmätningen sköts automatiskt av elnätsföretaget."
        ]
      },
      {
        h2: "Kvartspris, timpris eller månadspris?",
        paragraphs: [
          "Vilket avtal som passar beror på hur mycket förbrukning du kan flytta. Ei räknar med att den som flyttar hälften av en eluppvärmd villas förbrukning från de dyraste tiderna kan sänka energikostnaden med 10–20 procent, exklusive elnät och skatter.",
          "Så skiljer sig de vanligaste avtalen åt:"
        ],
        bullets: [
          "Kvartspris: du betalar varje kvarts spotpris. Ger mest att vinna om du kan flytta förbrukning, men kan bli dyrare om mycket el används när priset är högt.",
          "Timpris: erbjuds fortfarande av vissa elhandlare, men räknas inte längre som ett dynamiskt elavtal enligt Ei.",
          "Rörligt månadspris: samma pris per kWh hela månaden, ett snitt av månadens priser. Påverkas inte direkt av övergången.",
          "Fast pris: ett förutbestämt pris per kWh under hela avtalstiden."
        ]
      },
      {
        h2: "Vad betyder kvartspris för batteriet?",
        paragraphs: [
          "Ett batteri ändrar effekt på sekunder, så 15-minutersupplösningen passar det bra. Styrsystemet kan ladda under de billigaste kvartarna och ladda ur under de dyraste, även inom samma timme.",
          "Vinsten jämfört med timpris är ändå måttlig. Under oktober 2025–september 2026 skilde det i SE3 i snitt cirka 16 öre/kWh mellan timmens dyraste och billigaste kvart, och i hälften av timmarna mindre än 9 öre. För ett batteri som laddar och laddar ur under flera timmar ökade prisskillnaden bara med några öre per kWh, enligt vår beräkning. Den stora skillnaden finns mellan dygnets timmar, inte inom dem."
        ]
      },
      {
        h2: "Begränsningar och vanliga fel",
        paragraphs: [
          "Tre saker att hålla koll på:"
        ],
        bullets: [
          "Kvartspris utan styrning kan bli dyrare än månadspris om du inte kan minska förbrukningen när priset är högt, enligt Konsumenternas Energimarknadsbyrå.",
          "Har ditt nätbolag effektavgift måste du ta hänsyn till den också, påpekar Ei. Billig el hjälper inte om många apparater går samtidigt och skapar en dyr effekttopp.",
          "Kvartspriser visas ofta i kronor per MWh. Flytta decimalen ett steg åt vänster för öre per kWh: 230,45 motsvarar 23,045 öre/kWh."
        ]
      }
    ],
    misconceptions: [
      {
        myth: "Kvartspris gör elen dyrare.",
        fact: "Inte i sig. Priset sätts på samma marknad som förut, bara med finare upplösning. Vad du betalar beror på när du använder elen."
      }
    ],
    faq: [
      {
        q: "Kvartspris eller rörligt – vad ska jag välja?",
        a: "Med rörligt menas oftast månadspris. Kvartspris lönar sig om du kan flytta en betydande del av förbrukningen till billiga tider, till exempel med batteri, styrd värmepump eller elbilsladdning. Kan du inte styra något är månadspris enklare och ger mindre risk."
      },
      {
        q: "Kvartspris eller timpris – vad är skillnaden?",
        a: "Med kvartspris betalar du priset för varje kvart. Med timpris får du ett pris per timme som räknas fram ur kvartspriserna enligt elhandlarens villkor. I SE3 skilde det i snitt cirka 16 öre/kWh mellan timmens dyraste och billigaste kvart under det första året, så det är främst den som kan styra korta laster som vinner på kvartspris."
      },
      {
        q: "Måste jag byta elmätare för att få kvartspris?",
        a: "Nej. Elnätsföretaget sköter kvartsmätningen och den sker automatiskt."
      },
      {
        q: "När infördes kvartspris på el?",
        a: "Elbörserna började handla per kvart på dagen före-marknaden den 30 september 2025, med första leveransdag 1 oktober 2025."
      }
    ],
    searchPhrases: [
      "kvartspris el",
      "kvartspris eller rörligt",
      "kvartspris eller månadspris",
      "15 minuters pris el",
      "kvartspris eller timpris",
      "kvartspris på el"
    ],
    sources: [
      {
        title: "15 minuters handelsperiod på Dagen före-marknaden för el införs 30 september",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/press-och-nyheter/nyheter/elmarknad-allmant/2025/15-minuters-handelsperiod-pa-dagen-fore-marknaden-for-el-infors-30-september/"
      },
      {
        title: "Transition to 15-minute Market Time Unit (MTU)",
        publisher: "Nord Pool",
        url: "https://www.nordpoolgroup.com/en/trading/transition-to-15-minute-market-time-unit-mtu/"
      },
      {
        title: "Elbörserna går över till att handla el per kvart",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/om-oss/nyheter/2025/2025-09-29-elborserna-gar-over-till-att-handla-el-per-kvart"
      },
      {
        title: "När införs kvartsprisavtal och hur påverkar det dig som är kund?",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/om-oss/nyheter/2025/2025-02-21-nar-infors-kvartsprisavtal-och-hur-paverkar-det-dig-som-ar-kund"
      },
      {
        title: "Kan kvartsprisavtal vara bra för dig?",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/konsument/el/elavtal/olika-avtalstyper/kan-kvartsprisavtal-vara-bra-for-dig"
      },
      {
        title: "Kvartprisavtal",
        publisher: "Konsumenternas Energimarknadsbyrå",
        url: "https://www.energimarknadsbyran.se/el/dina-elavtal-och-kostnader/elhandelsavtalet/valja-elavtal/olika-avtalstyper/kvartprisavtal/"
      },
      {
        title: "Kvartsmätning",
        publisher: "Konsumenternas Energimarknadsbyrå",
        url: "https://www.energimarknadsbyran.se/el/dina-elavtal-och-kostnader/elnatsavtalet/kvartsmatning/"
      },
      {
        title: "Day-ahead prices (dagen före-priser per kvart, bl.a. SE3)",
        publisher: "Energinet, Energi Data Service",
        url: "https://www.energidataservice.dk/tso-electricity/DayAheadPrices"
      }
    ],
    related: [
      "spotprisstyrning",
      "effektavgift",
      "batteriets-intaktskallor"
    ],
    questions: [
      "ersattning-for-sald-solel",
      "solceller-vid-minuspris"
    ],
    links: [
      {
        href: "/kalkylator",
        label: "Räkna på batteriet i kalkylatorn"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "effektavgift",
    group: "ekonomi",
    term: "Effektavgift",
    title: "Vad är effektavgift – och kan ett batteri sänka den?",
    description: "Effektavgift är en nätavgift efter din högsta effekt i kW. Kravet på effektavgift i alla nät upphävdes i juni 2026, men avgiften är fortfarande tillåten.",
    shortAnswer: "En effektavgift, även kallad effekttariff, är den del av elnätsavgiften som beräknas på hur många kilowatt du tar ut som mest, ofta ett snitt av månadens högsta timmar. Kravet på att alla elnätsföretag skulle ha effektavgift senast 2027 upphävdes i juni 2026, men avgiften är fortfarande tillåten och nätbolagen väljer själva. Har du effektavgift kan ett batteri med effektvakt sänka den.",
    sections: [
      {
        h2: "Vad är en effektavgift?",
        paragraphs: [
          "Elnätsavgiften består oftast av en fast avgift och en avgift per kWh. En effektavgift lägger till en del som baseras på din högsta effekt, alltså hur mycket el du använder samtidigt. Tanken är att du ska sprida ut användningen så att nätet inte behöver byggas ut för korta toppar.",
          "Modellerna skiljer sig mellan nätbolagen. Sollentuna Energi & Miljö räknar till exempel snittet av månadens tre högsta timmar, högst en per dygn, och bara helgfria vardagar klockan 07–19. Priset är 145 kr per kW och månad i november–mars och 72,5 kr i april–oktober, inklusive moms.",
          "Avgiften ger inte nätbolaget mer pengar totalt. Enligt Ei får elnätsföretagen inte ta ut mer av sina kunder än vad intäktsramen tillåter, så en effektavgift omfördelar kostnaderna mellan kunderna."
        ]
      },
      {
        h2: "Vad har hänt med effektavgifterna 2026?",
        paragraphs: [
          "Ei:s föreskrifter (EIFS 2022:1) krävde att alla elnätsföretag skulle införa effektavgifter senast den 1 januari 2027. Den 13 mars 2026 gav regeringen Ei i uppdrag att upphäva föreskrifterna senast den 30 juni 2026 och att utreda och föreslå en ny modell för hur effektavgifter ska utformas. Modellen ska enligt uppdraget vara transparent, icke-diskriminerande och proportionerligt utformad, och förslaget ska lämnas till regeringen senast den 12 april 2027.",
          "Föreskrifterna upphävdes i juni 2026. Ei skriver att det inte innebär något förbud mot effektavgifter. Nätbolagen får ha kvar eller införa en sådan avgift, så länge den följer de allmänna reglerna för nätavgifter i ellagen och EU:s elmarknadsförordning. Därför ser det olika ut hösten 2026:"
        ],
        bullets: [
          "Ellevio tog bort effektavgiften den 1 juni 2026 för villa, radhus, fritidshus och företag med säkring upp till 63 A. Nu gäller en fast avgift efter säkringsstorlek plus 26 öre/kWh inklusive moms. Ändringen berör omkring 440 000 hushåll, enligt SVT.",
          "Mälarenergi Elnät gick den 1 juli 2026 tillbaka till en prismodell utan effektavgift för kunder med säkring upp till och med 63 A.",
          "Vattenfall Eldistribution har pausat det införande som var planerat till hösten 2026, i väntan på nya föreskrifter från Ei.",
          "Sollentuna Energi & Miljö har haft effektavgift länge och har den kvar."
        ]
      },
      {
        h2: "Kan ett batteri sänka effektavgiften?",
        paragraphs: [
          "Ja, om du har en. Batteriet får en gräns för uttaget från nätet. När huset drar mer än gränsen täcker batteriet mellanskillnaden, så att toppen som mäts stannar vid gränsen. Det kallas peak shaving eller effektvakt.",
          "Har du ingen effektavgift ger peak shaving ingen besparing på nätfakturan. Så är det i dag till exempel för villakunder hos Ellevio, Mälarenergi och Vattenfall Eldistribution. Däremot kan en jämnare last ibland göra det möjligt att sänka huvudsäkringen. Vilken modell som gäller för dig framgår av ditt nätbolags prislista."
        ]
      }
    ],
    example: {
      title: "Exempel: vad en kapad topp är värd i Sollentuna",
      lines: [
        "Sollentuna Energi & Miljö tar 145 kr per kW och månad i november–mars och 72,5 kr i april–oktober, inklusive moms.",
        "Batteri och effektvakt sänker snittet av månadens tre högsta vardagstimmar mellan 07 och 19 från 8 till 5 kW, alltså 3 kW.",
        "Vinter: 3 kW × 145 kr = 435 kr per månad. Sommar: 3 kW × 72,5 kr ≈ 218 kr per månad.",
        "Fem vintermånader och sju sommarmånader ger cirka 3 700 kr per år.",
        "Hos ett nätbolag utan effektavgift, som Ellevio sedan 1 juni 2026, ger samma kapade topp 0 kr på nätfakturan."
      ],
      note: "Räkneexempel med antagandet att batteriet håller nere topparna varje månad, vilket kräver att det är laddat dagtid på vardagar. Kontrollera ditt eget nätbolags tariff: pris per kW, vilka timmar som räknas och hur många toppar som ingår."
    },
    misconceptions: [
      {
        myth: "Effekttarifferna är borttagna i hela landet.",
        fact: "Nej. Det är kravet som är borttaget. Ei:s föreskrifter upphävdes i juni 2026, men effektavgifter är fortfarande tillåtna och vissa nätbolag har kvar dem."
      },
      {
        myth: "Nätbolagen tjänar mer pengar på effektavgifter.",
        fact: "Enligt Ei får nätbolagens samlade avgifter inte överstiga intäktsramen, så effektavgiften omfördelar kostnaderna mellan kunderna. Ellevio skriver på samma sätt att bytet tillbaka varken ökar eller minskar bolagets intäkter."
      }
    ],
    faq: [
      {
        q: "Har Ellevio effektavgift 2026?",
        a: "Nej, inte längre för villa, radhus och fritidshus. Ellevio tog bort effektavgiften den 1 juni 2026 och gick tillbaka till en fast avgift efter säkringsstorlek plus en överföringsavgift per kWh."
      },
      {
        q: "Vad är effektavgift på elräkningen?",
        a: "Det är den del av elnätsavgiften som tas ut i kronor per kW och beräknas på din högsta effekt enligt nätbolagets regler, till exempel ett snitt av månadens tre högsta timmar. Hur din elnätsavgift är uppbyggd framgår av nätbolagets prislista eller Mina sidor."
      },
      {
        q: "Tas effekttarifferna bort?",
        a: "Kravet är borttaget, men inte avgifterna i sig. Ei upphävde i juni 2026 föreskrifterna som krävde effekttariffer i alla nät senast 2027. Nätbolagen bestämmer nu själva: Ellevio och Mälarenergi har tagit bort sina, Vattenfall Eldistribution har pausat sitt införande och till exempel Sollentuna Energi & Miljö har kvar sin."
      },
      {
        q: "Kommer effektavgifterna tillbaka?",
        a: "Det är inte bestämt. Ei ska lämna förslag på en ny utformning av effektavgifter till regeringen senast den 12 april 2027 och vill göra avgifterna mer enhetliga och begripliga. Vad som händer efter förslaget vet inte heller Ei i dag."
      }
    ],
    searchPhrases: [
      "vad är effektavgift",
      "effektavgift 2026",
      "effekttariff",
      "effektavgift ellevio",
      "vad är effektavgift på elräkningen",
      "effekttariffer tas bort",
      "vattenfall effektavgift 2026",
      "mälarenergi effektavgift"
    ],
    sources: [
      {
        title: "Effektavgifter",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/konsument/el/elnatsavgiften-och-elnatsreglering/effektavgifter"
      },
      {
        title: "Ei har fått i uppdrag att ta fram en ny modell för effektavgifter och upphäva befintliga föreskrifter",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/om-oss/nyheter/2026/2026-03-13-ei-har-fatt-i-uppdrag-att-ta-fram-en-ny-modell-for-effektavgifter-och-upphava-befintliga-foreskrifter"
      },
      {
        title: "Ellevio återinför en prismodell utan effektavgift (pressmeddelande 20 april 2026)",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/nyheter/pressmeddelanden/ellevio-aterinfor-en-prismodell-utan-effektavgift/"
      },
      {
        title: "Elnätskostnad för hus – priser och exempel",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/abonnemang/elnatspriser/hus/"
      },
      {
        title: "Ellevio tar bort effektavgiften (20 april 2026)",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/lokalt/varmland/ellevio-tar-bort-effektavgiften"
      },
      {
        title: "Effektguiden",
        publisher: "Vattenfall Eldistribution",
        url: "https://www.vattenfalleldistribution.se/abonnemang-och-avgifter/avtal-och-avgifter/effektguiden/"
      },
      {
        title: "Prismodell för elnätsavgiften",
        publisher: "Mälarenergi",
        url: "https://www.malarenergi.se/elnat/effektsmart/prismodellen/"
      },
      {
        title: "Så funkar effektavgiften",
        publisher: "Sollentuna Energi & Miljö",
        url: "https://www.seom.se/elnat/priser-och-villkor/sa-funkar-effektavgiften/"
      }
    ],
    related: [
      "peak-shaving-och-effektvakt",
      "sakringsabonnemang",
      "kvartspris",
      "batteriets-intaktskallor"
    ],
    questions: [
      "natavgift-med-solceller"
    ],
    links: [
      {
        href: "/nyheter/effektavgifter-2026-stoppat-krav-ny-modell-batteri",
        label: "Nyhet: Effektavgifterna 2026 – kravet stoppat, ny modell dröjer"
      },
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri till villa"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "peak-shaving-och-effektvakt",
    group: "ekonomi",
    term: "Peak shaving och effektvakt",
    title: "Peak shaving: så kapar du effekttopparna med batteri och effektvakt",
    description: "Peak shaving betyder att batteri eller effektvakt håller husets uttag under en gräns. Det sänker effektavgiften där den finns och skyddar huvudsäkringen.",
    shortAnswer: "Peak shaving betyder att du kapar effekttopparna, alltså de stunder då huset tar ut mest el samtidigt. Ett batteri gör det genom att leverera mellanskillnaden när uttaget når en satt gräns, och en effektvakt genom att tillfälligt dra ner eller pausa laster. Det lönar sig främst om ditt nätbolag har effektavgift eller om du vill klara dig med en mindre huvudsäkring.",
    sections: [
      {
        h2: "Vad är peak shaving och effektvakt?",
        paragraphs: [
          "En effekttopp uppstår när flera stora förbrukare går samtidigt, till exempel elbilsladdning, ugn och värmepump. Att kapa toppen kallas peak shaving. Två verktyg används, ofta tillsammans:"
        ],
        bullets: [
          "Batteri: styrningen får en maxgräns för uttaget från nätet. När huset drar mer täcker batteriet resten.",
          "Effektvakt eller laststyrning: en mätare följer husets uttag och sänker tillfälligt effekten på till exempel laddboxen. Ei beskriver samma princip för laddboxar som lastbalansering."
        ]
      },
      {
        h2: "Varför kapa topparna?",
        paragraphs: [
          "Det finns fyra skäl, men det första gäller bara om ditt nätbolag har effektavgift. Ellevio tog bort sin den 1 juni 2026 och Vattenfall Eldistribution har pausat sitt införande, så för deras villakunder ger peak shaving i dag ingen direkt besparing på nätfakturan. De andra skälen finns kvar:"
        ],
        bullets: [
          "Lägre effektavgift, om ditt nätbolag har en. Den beräknas ofta på månadens högsta timmar, till exempel hos Sollentuna Energi & Miljö.",
          "Skydd för huvudsäkringen. En elbil som laddar med 11 kW tar ungefär allt som ett hus med 16 A kan få från nätet, enligt Ei.",
          "Möjlighet att sänka huvudsäkringen och därmed den fasta nätavgiften.",
          "Lokal flexibilitet. I vissa nät köper nätbolaget flexibilitet de mest ansträngda timmarna, via aggregatorer som CheckWatt."
        ]
      },
      {
        h2: "Så mycket batteri behövs",
        paragraphs: [
          "Batteriets effekt i kW avgör hur stor del av toppen det kan ta, och energin i kWh hur länge det orkar. Effektavgifter beräknas ofta på timvärden, som hos Sollentuna Energi & Miljö, så batteriet behöver klara hela timmen. Räkneexemplet nedan visar hur du uppskattar behovet."
        ]
      },
      {
        h2: "Begränsningar och vanliga fel",
        paragraphs: [
          "Fyra fallgropar:"
        ],
        bullets: [
          "Ett par missar räcker. Enligt CheckWatt kan några tillfällen i månaden då batteriet inte klarar en topp göra att besparingen minskar kraftigt eller uteblir.",
          "Kapaciteten konkurrerar. Energi som reserveras för peak shaving kan inte användas till stödtjänster. Emaldo skriver att för snäva effektgränser minskar intäkterna från stödtjänster.",
          "Billig el kan lura. Styr du efter spotpriset kan ett lågt pris under nätbolagets höglasttid ge en hög effekttopp, påpekar Ei.",
          "Faserna. Uttaget fördelas på elnätets tre faser, och det finns teknik för att jämna ut uttaget mellan dem, enligt Energimyndigheten."
        ]
      }
    ],
    example: {
      title: "Exempel: kapa en kvällstopp från 15 till 8 kW",
      lines: [
        "Huset behöver 15 kW en vinterkväll och gränsen mot nätet är satt till 8 kW.",
        "Batteriet levererar mellanskillnaden, 7 kW, så länge toppen varar.",
        "Varar toppen en hel timme går det åt 7 kWh, och så mycket måste finnas laddat när toppen kommer.",
        "Pausar effektvakten samtidigt en laddbox på 4 kW behöver batteriet bara ge 3 kW, alltså 3 kWh på en timme."
      ],
      note: "Siffrorna följer exemplet i Optimera Energis nyhetsartikel om effektavgifter. Verkliga toppar varierar, och hur de mäts beror på ditt nätbolag."
    },
    misconceptions: [
      {
        myth: "Peak shaving sparar alltid pengar.",
        fact: "Bara om nätavgiften påverkas av toppar eller om du kan sänka säkringen. Ellevio och Vattenfall Eldistribution har i dag ingen effektavgift för villakunder."
      }
    ],
    faq: [
      {
        q: "Vad är en effektvakt?",
        a: "En effektvakt mäter husets uttag och sänker eller pausar tillfälligt vissa laster, till exempel laddboxen, när uttaget närmar sig en gräns. Den skyddar huvudsäkringen och håller nere effekttoppar."
      },
      {
        q: "Behöver man batteri för att kapa effekttoppar?",
        a: "Nej. Lastbalansering i laddboxen och att inte köra stora förbrukare samtidigt räcker långt. Batteriet behövs när topparna inte går att flytta."
      },
      {
        q: "Vad är laststyrning?",
        a: "Laststyrning betyder att elanvändningen flyttas eller dras ner automatiskt, till exempel efter elpris, effektgräns eller egen solproduktion. En effektvakt är en form av laststyrning."
      }
    ],
    searchPhrases: [
      "peak shaving",
      "kapa effekttoppar med batteri",
      "effektvakt",
      "laststyrning el",
      "kapa effekttoppar",
      "effektvakt villa"
    ],
    sources: [
      {
        title: "Styr laddningen av din elbil",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/konsument/anvand-el-smartare/styr-din-elanvandning/styr-laddningen-av-din-elbil"
      },
      {
        title: "Elnätsavtal med effektavgift",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/konsument/anvand-el-smartare/elnatsavtal-med-effektavgift"
      },
      {
        title: "Vanliga frågor",
        publisher: "CheckWatt",
        url: "https://checkwatt.com/sv/faq-vanliga-fragor/"
      },
      {
        title: "Grid Rewards Earnings Calculator och vanliga frågor",
        publisher: "Emaldo",
        url: "https://emaldo.com/home/grid-rewards/calculator"
      },
      {
        title: "Koppla batterier till solcellerna",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/batterier-kopplat-till-solceller/"
      },
      {
        title: "Elnätskostnad för hus – priser och exempel",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/abonnemang/elnatspriser/hus/"
      },
      {
        title: "Effektguiden",
        publisher: "Vattenfall Eldistribution",
        url: "https://www.vattenfalleldistribution.se/abonnemang-och-avgifter/avtal-och-avgifter/effektguiden/"
      },
      {
        title: "Så funkar effektavgiften",
        publisher: "Sollentuna Energi & Miljö",
        url: "https://www.seom.se/elnat/priser-och-villkor/sa-funkar-effektavgiften/"
      }
    ],
    related: [
      "effektavgift",
      "sakringsabonnemang",
      "kw-och-kwh",
      "batteriets-intaktskallor"
    ],
    questions: [
      "natavgift-med-solceller",
      "solceller-for-att-ladda-elbil",
      "solceller-och-varmepump"
    ],
    links: [
      {
        href: "/nyheter/effektavgifter-2026-stoppat-krav-ny-modell-batteri",
        label: "Nyhet: Effektavgifterna 2026 och batteriet som effektvakt"
      },
      {
        href: "/tjanster/laddboxar",
        label: "Laddbox med lastbalansering"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "sakringsabonnemang",
    group: "ekonomi",
    term: "Säkringsabonnemang",
    title: "Kan man sänka säkringen med ett batteri?",
    description: "Ibland. Batteri och effektvakt kan hålla uttaget under en mindre huvudsäkring. Hos Ellevio kostar 20 A 150 kr mindre per månad än 25 A.",
    shortAnswer: "Ibland. Med säkringsabonnemang betalar du en fast nätavgift efter huvudsäkringens storlek, och ett batteri med effektvakt kan hålla uttaget så lågt att en mindre säkring räcker. Det kräver att topparna går att kapa även kalla dagar, och bytet görs av en behörig elinstallatör.",
    sections: [
      {
        h2: "Vad är ett säkringsabonnemang?",
        paragraphs: [
          "Huvudsäkringen skyddar husets elanläggning och begränsar hur mycket ström du kan ta ut samtidigt. Med säkringsabonnemang betalar du en fast avgift efter säkringens storlek i ampere (A) och en avgift per kWh. Sedan 1 juni 2026 gäller det åter för Ellevios villakunder, och det är också modellen för villor hos Vattenfall Eldistribution.",
          "Priserna nedan är inklusive moms. Energiskatt tillkommer."
        ],
        bullets: [
          "Ellevio från 1 juni 2026: 16 A 450 kr, 20 A 590 kr, 25 A 740 kr och 35 A 1 130 kr per månad, plus 26 öre/kWh.",
          "Vattenfall Eldistribution 2026: 16 A 5 775 kr, 20 A 8 085 kr, 25 A 10 125 kr och 35 A 13 890 kr per år, plus överföringsavgift per kWh."
        ]
      },
      {
        h2: "Hur stor säkring behöver huset?",
        paragraphs: [
          "Vattenfall Eldistribution anger ungefärligt maximalt uttag per säkring: 16 A cirka 11 kW, 20 A cirka 14 kW, 25 A cirka 17 kW och 35 A cirka 24 kW. De flesta med enbart hushållsel klarar sig med 16 A, men elvärme, värmepump och många apparater samtidigt kan kräva mer.",
          "Det som avgör är husets högsta samtidiga uttag. En elbil som laddar med 11 kW tar ungefär allt ett hus med 16 A kan få från nätet, enligt Ei."
        ]
      },
      {
        h2: "Så kan batteriet hjälpa",
        paragraphs: [
          "Ett batteri kan reglera uttaget från nätet och på så sätt möjligen göra en mindre säkring möjlig, skriver Energimyndigheten. Batteriet täcker toppen när huset drar mer än säkringen tillåter.",
          "Kombinera med en effektvakt eller lastbalansering som drar ner laster om batteriet är tomt eller ur drift, annars kan säkringen lösa ut. En mindre säkring begränsar också hur snabbt batteri och elbil kan ladda från nätet, och enligt CheckWatt även hur mycket effekt batteriet kan sälja som stödtjänst."
        ]
      },
      {
        h2: "Regler och begränsningar",
        paragraphs: [
          "Det här gäller när du byter säkring:"
        ],
        bullets: [
          "Bytet görs av ett auktoriserat elföretag som anmäler ändringen till nätbolaget.",
          "Hos Vattenfall Eldistribution kostar det inget hos nätbolaget att sänka säkringen, men ändringen ska gälla i minst ett år.",
          "Vill du senare höja över den storlek du betalat anslutning för kan det bli en anslutningsavgift.",
          "Uttaget fördelas på elnätets tre faser. Det finns teknik för att jämna ut uttaget mellan faserna, enligt Energimyndigheten."
        ]
      }
    ],
    example: {
      title: "Exempel: från 25 till 20 A",
      lines: [
        "Ellevio: 740 − 590 = 150 kr per månad, 1 800 kr per år.",
        "Vattenfall Eldistribution: 10 125 − 8 085 = 2 040 kr per år.",
        "Gränsen sjunker från cirka 17 till cirka 14 kW enligt Vattenfalls tabell. Toppar över 14 kW måste kapas av batteri eller effektvakt."
      ],
      note: "Priser inklusive moms enligt nätbolagens prislistor för 2026. Elinstallatörens arbete tillkommer. Räkna bara med besparingen om dina vintertoppar säkert går att hålla under den nya gränsen."
    },
    misconceptions: [
      {
        myth: "Med batteri kan man alltid ha en mindre säkring.",
        fact: "Bara om topparna går att kapa även när batteriet är urladdat eller ur drift. Därför behövs en effektvakt som reserv."
      }
    ],
    faq: [
      {
        q: "Vad kostar säkringsabonnemang hos Ellevio?",
        a: "Från 1 juni 2026 kostar det 450 kr per månad för 16 A, 590 kr för 20 A, 740 kr för 25 A och 1 130 kr för 35 A, plus 26 öre/kWh i överföringsavgift. Priserna är inklusive moms och energiskatt tillkommer."
      },
      {
        q: "Hur sänker man säkringen?",
        a: "Du anlitar ett auktoriserat elföretag som byter säkringen och anmäler ändringen till nätbolaget. Därefter får du den nya avgiften. Hos Vattenfall Eldistribution får säkringen ändras en gång per tolvmånadersperiod."
      },
      {
        q: "Hur stor säkring behöver jag med elbil?",
        a: "Det beror på laddeffekten och resten av husets förbrukning. Laddar bilen med 11 kW tar den ungefär allt en 16 A-säkring klarar, så då behövs lastbalansering eller större säkring, enligt Ei."
      }
    ],
    searchPhrases: [
      "säkringsabonnemang",
      "sänka säkring",
      "säkringsabonnemang ellevio",
      "elnät säkringsabonnemang"
    ],
    sources: [
      {
        title: "Säkringsabonnemang 16–63 A, priser från 1 juni 2026",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/globalassets/content/priserabonnemang-pdf/2026/sakring/sakringsabonnemang-16-63a_260601.pdf"
      },
      {
        title: "Elnätskostnad för hus – priser och exempel",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/abonnemang/elnatspriser/hus/"
      },
      {
        title: "Säkringsabonnemang 2026, privat (prislista)",
        publisher: "Vattenfall Eldistribution",
        url: "https://www.vattenfalleldistribution.se/globalassets/1.-privat/abonnemang-och-avgifter/om-avtal-och-avgifter/elnatsavgifter/sakringsabonnemang/prislista-sakringsabonnemang-privat-2026-01-01.pdf"
      },
      {
        title: "Välj rätt huvudsäkring",
        publisher: "Vattenfall Eldistribution",
        url: "https://www.vattenfalleldistribution.se/elnatsanslutning/min-elanlaggning/valj-ratt-huvudsakring/"
      },
      {
        title: "Ändra huvudsäkring",
        publisher: "Vattenfall Eldistribution",
        url: "https://www.vattenfalleldistribution.se/elnatsanslutning/min-elanlaggning/andra-huvudsakring/"
      },
      {
        title: "Koppla batterier till solcellerna",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/batterier-kopplat-till-solceller/"
      },
      {
        title: "Styr laddningen av din elbil",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/konsument/anvand-el-smartare/styr-din-elanvandning/styr-laddningen-av-din-elbil"
      },
      {
        title: "Vanliga frågor",
        publisher: "CheckWatt",
        url: "https://checkwatt.com/sv/faq-vanliga-fragor/"
      }
    ],
    related: [
      "peak-shaving-och-effektvakt",
      "effektavgift",
      "kw-och-kwh",
      "batteriets-intaktskallor"
    ],
    questions: [
      "sakring-for-solceller",
      "natavgift-med-solceller"
    ],
    links: [
      {
        href: "/tjanster/laddboxar",
        label: "Laddbox med lastbalansering"
      },
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri till villa"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "batteri-utan-solceller",
    group: "ekonomi",
    term: "Batteri utan solceller",
    title: "Lönar sig ett batteri utan solceller?",
    description: "Utan solceller ger batteriet inget grönt avdrag. Intäkterna kommer från spotprisstyrning, stödtjänster och ibland lägre nätavgift – räkna försiktigt.",
    shortAnswer: "Det kan gå ihop i vissa fall, men räkna försiktigt. Utan egen solel får du inget grönt avdrag, och intäkterna måste komma från spotprisstyrning, stödtjänster och i vissa nät lägre effekt- eller säkringskostnad. Med 2026 års priser blir återbetalningstiden ofta lång.",
    sections: [
      {
        h2: "Kan man ha hembatteri utan solceller?",
        paragraphs: [
          "Ja. Ett batteri kan installeras utan solceller och laddas från elnätet. Installationen ska göras av ett elinstallationsföretag som är registrerat hos Elsäkerhetsverket, precis som för solceller.",
          "Skillnaden är ekonomin. Skatteverket godkänner inte grönt avdrag för ”installation av system för lagring av el utan egen elproduktion”. Batteriet ska vara kopplat till en nätansluten anläggning för egen förnybar el, till exempel solceller, och lagra egenproducerad el."
        ]
      },
      {
        h2: "Var kommer intäkterna ifrån?",
        paragraphs: [
          "Utan solceller finns fyra möjliga intäkter. De går inte att lägga ihop rakt av: när batteriet säljer stödtjänster måste en del av laddningen hållas i reserv, och då blir det mindre kvar till arbitrage."
        ],
        bullets: [
          "Spotprisstyrning: batteriet laddas när elen är billig och täcker husets förbrukning när den är dyr. I SE3 skilde det i snitt cirka 75–85 öre/kWh mellan dygnets dyraste och billigaste timmar under oktober 2025–september 2026, enligt vår beräkning.",
          "Stödtjänster: via en aggregator kan batteriet sälja till exempel FCR-D till Svenska kraftnät. Årsmedelpriset för FCR-D har fallit med över 90 procent från toppnivåerna 2022–2023, och ersättningen varierar från månad till månad.",
          "Effektavgift: ger bara något om ditt nätbolag har en. Ellevio och Vattenfall Eldistribution har ingen för villakunder i dag.",
          "Säkring: i vissa fall kan batteri och effektvakt göra en mindre huvudsäkring möjlig."
        ]
      },
      {
        h2: "Skillnaden mot batteri med solceller",
        paragraphs: [
          "Med solceller ger batteriet grönt avdrag på 50 procent av arbete och material, i praktiken 48,5 procent av totalpriset vid fast pris. Det kan också lagra egen solel, som är värd mer än såld el. Utan solceller saknas båda delarna, något Optimera Energi också påpekar på sin sida om solcellsbatteri.",
          "Bedömningarna varierar. Optimera Energi skriver att ett batteri lönar sig även utan solpaneler genom prisarbitrage och stödtjänster. Vårt räkneexempel nedan, med 2025–2026 års priser och faktiska utbetalningar från en aggregator, ger en längre återbetalningstid. Avgörande är vad stödtjänsterna betalar framöver, och det vet ingen."
        ]
      }
    ],
    example: {
      title: "Exempel: 10 kWh-batteri utan solceller i SE3",
      lines: [
        "Pris: cirka 90 000 kr installerat, mitt i Optimera Energis spann 70 000–110 000 kr för 10 kWh. Inget grönt avdrag.",
        "Stödtjänster med 10 kW: Mölndal Energi betalade sina kunder i snitt 52 kr per kW och månad 2025 och cirka 33 kr under januari–juni 2026, exklusive moms. Det ger cirka 4 000–6 200 kr per år.",
        "Optimera Energis kalkylator räknar med 65 kr per kW och månad, vilket skulle ge 7 800 kr per år. Det är en schablon och ligger över de utbetalningar Mölndal Energi redovisat.",
        "Arbitrage vid sidan av stödtjänsterna: cirka 500 kr per år, eftersom bara en del av batteriet är ledigt. Effektavgift: 0 kr hos Ellevio och Vattenfall Eldistribution.",
        "Summa med Mölndal Energis nivåer: cirka 4 500–6 700 kr per år, återbetalningstid cirka 13–20 år. Med kalkylatorns schablon: cirka 8 300 kr per år och knappt 11 år."
      ],
      note: "Räkneexempel, inget löfte. Antaganden: 10 kW växelriktare, batteriet levererar FCR-D större delen av tiden, arbitrage uppskattat från vår beräkning på SE3-priser oktober 2025–september 2026, inga extra avgifter för styrsystem och ingen sänkt säkring. Stödtjänstpriserna varierar och kan både stiga och falla."
    },
    misconceptions: [
      {
        myth: "Man får grönt avdrag för batteri även utan solceller.",
        fact: "Nej. Skatteverket kräver att batteriet är kopplat till en nätansluten anläggning för egen förnybar elproduktion och lagrar egenproducerad el."
      }
    ],
    faq: [
      {
        q: "Får man grönt avdrag för batteri utan solceller?",
        a: "Nej. Installation av system för lagring av el utan egen elproduktion ger inte rätt till skattereduktion för grön teknik, enligt Skatteverket."
      },
      {
        q: "Vad gör ett batterilager i en villa utan solceller?",
        a: "Det flyttar förbrukning från dyra till billiga timmar, kan sälja stödtjänster via en aggregator och kan kapa effekttoppar där det lönar sig. Med nödströmsfunktion kan det också ge el vid strömavbrott."
      },
      {
        q: "Hur lång återbetalningstid har ett batteri utan solceller?",
        a: "I vårt exempel cirka 13–20 år för ett 10 kWh-batteri i SE3 med de stödtjänstnivåer Mölndal Energi redovisat för 2025–2026, och knappt 11 år med Optimera Energis kalkylatorschablon på 65 kr. Effektavgift, en lägre säkring eller högre stödtjänstpriser kortar tiden."
      }
    ],
    searchPhrases: [
      "batteri utan solceller lönsamt",
      "kan man ha hembatteri utan solceller",
      "batterilager villa utan solceller",
      "hembatteri utan solceller",
      "batterilager utan solceller",
      "solcellsbatteri utan solceller"
    ],
    sources: [
      {
        title: "Godkända arbeten – grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/godkandaarbetengronteknik.4.676f4884175c97df419290e.html"
      },
      {
        title: "Så fungerar skattereduktionen för grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/safungerarskattereduktionenforgronteknik.4.676f4884175c97df4192870.html"
      },
      {
        title: "Koppla batterier till solcellerna",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/batterier-kopplat-till-solceller/"
      },
      {
        title: "Vad är stödtjänster – allt du behöver veta (utbetalningar via FlexME)",
        publisher: "Mölndal Energi",
        url: "https://www.molndalenergi.se/kunskap/vad-ar-stodtjanster"
      },
      {
        title: "Mimer – priser och volymer för FCR (primärreglering)",
        publisher: "Svenska kraftnät",
        url: "https://mimer.svk.se/PrimaryRegulation/PrimaryRegulationIndex"
      },
      {
        title: "Day-ahead prices (dagen före-priser per kvart, bl.a. SE3)",
        publisher: "Energinet, Energi Data Service",
        url: "https://www.energidataservice.dk/tso-electricity/DayAheadPrices"
      },
      {
        title: "Elnätskostnad för hus – priser och exempel",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/abonnemang/elnatspriser/hus/"
      },
      {
        title: "Effektguiden",
        publisher: "Vattenfall Eldistribution",
        url: "https://www.vattenfalleldistribution.se/abonnemang-och-avgifter/avtal-och-avgifter/effektguiden/"
      }
    ],
    related: [
      "gront-avdrag-for-batteri",
      "spotprisstyrning",
      "fcr-d",
      "batteriets-intaktskallor",
      "o-drift-och-backup"
    ],
    questions: [
      "solceller-utan-batteri",
      "vad-kostar-solceller-med-batteri"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri till villa"
      },
      {
        href: "/guider/gront-avdrag-2026",
        label: "Guide: Grönt avdrag 2026"
      },
      {
        href: "/kalkylator",
        label: "Räkna på batteriet i kalkylatorn"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "batteriets-intaktskallor",
    group: "ekonomi",
    term: "Intäktskällor",
    title: "Lönar sig ett solcellsbatteri? Så räknar man på de fyra intäktskällorna",
    description: "Ett solcellsbatteri tjänar på självförbrukning, spotprisstyrning, effekttoppar och stödtjänster. De delar på samma kapacitet och kalkylen är känslig.",
    shortAnswer: "Ett solcellsbatteri kan ge intäkter på fyra sätt: högre självförbrukning av solel, spotprisstyrning, lägre effektavgift och stödtjänster till elnätet. De delar på samma batterikapacitet och går därför inte att lägga ihop rakt av. Om det lönar sig avgörs mest av stödtjänsternas ersättning, ditt nätbolags tariff och priset efter grönt avdrag.",
    sections: [
      {
        h2: "De fyra intäktskällorna",
        paragraphs: [
          "Ett batteri kan tjäna pengar på fyra sätt:"
        ],
        bullets: [
          "Självförbrukning: solel som lagras till kvällen ersätter köpt el med skatt och nätavgift, i stället för att säljas för ungefär spotpriset.",
          "Spotprisstyrning: batteriet laddas när elen är billig och används när den är dyr. Kräver ett elavtal som följer spotpriset.",
          "Effektavgift och peak shaving: sänker nätavgiften om ditt nätbolag tar betalt för toppar. Ellevio har till exempel tagit bort sin effektavgift för villakunder.",
          "Stödtjänster: en aggregator säljer batteriets beredskap till Svenska kraftnät, oftast som FCR-D. Du får ersättning enligt aggregatorns avtal, och den varierar med marknadspriset."
        ]
      },
      {
        h2: "De konkurrerar om samma batteri",
        paragraphs: [
          "Ett batteri kan inte vara fullt, tomt och halvladdat samtidigt. För stödtjänsten FCR-D måste det kunna både ladda och ladda ur i 20 minuter. Svenska kraftnäts räkneexempel visar att ett batteri på 1 MW och 1 MWh kan sälja 0,83 MW åt båda hållen om laddningen hålls mellan 28 och 72 procent.",
          "Styrsystemet måste därför prioritera. CheckWatt anger att ett villabatteri som samtidigt levererar stödtjänster typiskt använder 20–45 procent av sin energi till solel och arbitrage, med cirka 1–2 kW i effekt. Samma sak gäller peak shaving: energi som hålls i reserv för att kapa toppar kan inte samtidigt säljas som stödtjänst."
        ]
      },
      {
        h2: "Vad avgör kalkylen?",
        paragraphs: [
          "Fyra faktorer väger tyngst:"
        ],
        bullets: [
          "Stödtjänstpriset. Årsmedelpriset för FCR-D har fallit med över 90 procent från toppnivåerna 2022–2023, enligt vår beräkning på Svenska kraftnäts prisdata, och ersättningen varierar från månad till månad. Mölndal Energi redovisar utbetalningar till sina kunder på i snitt 52 kr per kW och månad 2025 och 17–43 kr per månad under januari–juni 2026, exklusive moms. Optimera Energis kalkylator räknar med 65 kr per kW växelriktareffekt och månad, vilket är en schablon och högre än de nivåerna.",
          "Nätbolaget. Effektavgift eller tidstariff gör peak shaving och nattladdning mer värda.",
          "Priset efter avdrag. Grönt avdrag för batteri är 48,5 procent av totalpriset vid fast pris, högst 50 000 kr per person och år.",
          "Storlek och förbrukning. Hus med hög kvällsförbrukning, till exempel med elvärme, får ut mer av varje kWh."
        ]
      },
      {
        h2: "Bedömningarna varierar",
        paragraphs: [
          "Optimera Energi anger 2–5 års återbetalning för batteri till befintliga solceller och 4–7,5 år för helt ny sol och batteri. Senergia bedömer cirka 7–9 år för solceller med batteri i ett väl dimensionerat typfall. Vårt exempel nedan ger en återbetalningstid på cirka 5–15 år, där den kortaste förutsätter kalkylatorns stödtjänstschablon. Skillnaderna beror nästan helt på antagandena om stödtjänster, prisskillnader och batteristorlek.",
          "Räkna därför på ditt eget hus i kalkylatorn, och be alltid om antagandena bakom en kalkyl."
        ]
      }
    ],
    example: {
      title: "Exempel: 10 kWh-batteri till befintliga solceller i SE3",
      lines: [
        "Pris 90 000 kr, efter grönt avdrag på 48,5 procent cirka 46 400 kr.",
        "Självförbrukning: cirka 1 350 kWh per år flyttas från försäljning till egen användning, värt cirka 2 000 kr.",
        "Spotprisstyrning vintertid: cirka 1 000 kr. Effektavgift: 0 kr med Ellevios nuvarande prismodell.",
        "Utan stödtjänster: cirka 3 000 kr per år, återbetalningstid cirka 15 år.",
        "Med FCR-D på 10 kW och Mölndal Energis utbetalningsnivåer, 33–52 kr per kW och månad: 4 000–6 200 kr per år, men solel och arbitrage krymper till cirka 1 000 kr. Totalt 5 000–7 200 kr per år, återbetalningstid cirka 6,5–9 år.",
        "Med Optimera Energis kalkylatorschablon på 65 kr per kW och månad: cirka 8 800 kr per år och drygt 5 år."
      ],
      note: "Räkneexempel, inget löfte. Antaganden: 10 kWp solceller, 10 kW växelriktare, 150 dagar per år med fullt solöverskott, SE3-priser oktober 2025–september 2026 enligt vår beräkning, energiskatt 2026, Ellevios överföringsavgift, inga avgifter för styrsystem och oförändrade priser. Stödtjänstnivåerna är Mölndal Energis utbetalningar exklusive moms 2025 och januari–juni 2026; andra aggregatorer har andra villkor. Ändras ett antagande ändras resultatet mycket, framför allt stödtjänstpriset."
    },
    misconceptions: [
      {
        myth: "Man kan lägga ihop alla fyra intäkterna.",
        fact: "Nej. De använder samma batterikapacitet. När batteriet står redo för stödtjänster finns mindre kvar till solel, arbitrage och toppkapning."
      },
      {
        myth: "Stödtjänster ger en fast ersättning per kW och månad.",
        fact: "Nej. Priset sätts i dagliga auktioner per MW och timme, och din ersättning bestäms av aggregatorns avtal."
      }
    ],
    faq: [
      {
        q: "Lönar sig ett solcellsbatteri 2026?",
        a: "Det kan göra det, men marginalerna är mindre än för några år sedan. I vårt exempel blir återbetalningstiden cirka 6,5–9 år med grönt avdrag och stödtjänster på de nivåer Mölndal Energi betalat ut 2025–2026, och runt 15 år utan stödtjänster. Effektavgift, hög kvällsförbrukning och större prisskillnader förbättrar kalkylen."
      },
      {
        q: "Vilken intäktskälla är störst?",
        a: "I vårt exempel stödtjänsterna, om batteriet levererar FCR-D. Det är också den mest osäkra posten: årsmedelpriset för FCR-D har fallit med över 90 procent från toppnivåerna 2022–2023, och ersättningen varierar från månad till månad."
      },
      {
        q: "Varför skiljer sig olika kalkyler så mycket?",
        a: "De bygger på olika antaganden om stödtjänstpris, prisskillnader på elbörsen, batteristorlek och nätavgift. Två seriösa kalkyler kan därför landa flera år isär."
      }
    ],
    searchPhrases: [
      "lönar sig solcellsbatteri",
      "är solcellsbatteri lönsamt",
      "solcellsbatteri återbetalningstid",
      "lönar sig batterilagring",
      "lönar sig hembatteri",
      "lönar sig batteri till solceller",
      "lönar det sig med batteri till solceller"
    ],
    sources: [
      {
        title: "Exempel: LER-resurs, kapacitetsberäkning för FCR",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/4ae189/siteassets/aktorsportalen/bidra-med-reserver/fragor-och-svar-reserver/exempel-ler-kapacitetsberakning-231130.pdf"
      },
      {
        title: "Vanliga frågor",
        publisher: "CheckWatt",
        url: "https://checkwatt.com/sv/faq-vanliga-fragor/"
      },
      {
        title: "Vad är stödtjänster – allt du behöver veta (utbetalningar via FlexME)",
        publisher: "Mölndal Energi",
        url: "https://www.molndalenergi.se/kunskap/vad-ar-stodtjanster"
      },
      {
        title: "Mimer – priser och volymer för FCR (primärreglering)",
        publisher: "Svenska kraftnät",
        url: "https://mimer.svk.se/PrimaryRegulation/PrimaryRegulationIndex"
      },
      {
        title: "Så fungerar skattereduktionen för grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/safungerarskattereduktionenforgronteknik.4.676f4884175c97df4192870.html"
      },
      {
        title: "Vad händer med priset på solpaneler och batterier hösten 2026?",
        publisher: "Senergia",
        url: "https://senergia.se/teknikblogg/vad-hander-med-priset-pa-solpaneler-och-batterier-hosten-2026/"
      },
      {
        title: "Day-ahead prices (dagen före-priser per kvart, bl.a. SE3)",
        publisher: "Energinet, Energi Data Service",
        url: "https://www.energidataservice.dk/tso-electricity/DayAheadPrices"
      },
      {
        title: "Elnätskostnad för hus – priser och exempel",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/abonnemang/elnatspriser/hus/"
      }
    ],
    related: [
      "sjalvforbrukning",
      "spotprisstyrning",
      "effektavgift",
      "fcr-d",
      "dimensionering"
    ],
    questions: [
      "vad-kostar-solceller-med-batteri",
      "aterbetalningstid-solceller",
      "lonar-sig-solceller"
    ],
    links: [
      {
        href: "/kalkylator",
        label: "Räkna på ditt hus i kalkylatorn"
      },
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri till villa – pris och storlek"
      },
      {
        href: "/guider/aterbetalningstid-solceller",
        label: "Guide: Återbetalningstid för solceller"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "stodtjanster",
    group: "elnat",
    term: "Stödtjänster",
    title: "Vad är stödtjänster? FCR, aFRR och mFRR förklarade",
    description: "Stödtjänster är reserver som Svenska kraftnät köper för att hålla frekvensen nära 50 Hz. Så fungerar FFR, FCR, aFRR och mFRR – och så sätts priset.",
    shortAnswer: "Stödtjänster är reserver som Svenska kraftnät köper för att hålla balansen mellan produktion och förbrukning, vilket syns i att frekvensen ligger nära 50 Hz. De viktigaste är FCR, aFRR och mFRR, plus den snabba reserven FFR. Ett hembatteri kan delta via en aggregator, oftast i FCR-D, men ersättningen sätts på en marknad, varierar och har fallit kraftigt.",
    sections: [
      {
        h2: "Frekvensen visar balansen",
        paragraphs: [
          "Elnätet i Sverige ingår i det nordiska synkronområdet, där Svenska kraftnät balanserar mot frekvensen 50,00 Hz. Är förbrukningen högre än produktionen sjunker frekvensen, och är produktionen högre stiger den.",
          "För att rätta till avvikelser köper Svenska kraftnät reserver av aktörer på elmarknaden, till exempel elproducenter, elanvändare och energilager. De kallas stödtjänster."
        ]
      },
      {
        h2: "Stödtjänsterna i korthet",
        paragraphs: [
          "Svenska kraftnäts reserver i korthet:"
        ],
        bullets: [
          "FFR, snabb frekvensreserv: dämpar snabba och djupa frekvensfall när det finns lite rotationsenergi i systemet. Upphandlas på årsbasis.",
          "FCR-N: stabiliserar frekvensen vid små avvikelser, mellan 49,90 och 50,10 Hz, åt båda hållen. Ska klara en timme.",
          "FCR-D upp och FCR-D ned: aktiveras automatiskt vid störningar, när frekvensen ligger 0,1–0,5 Hz från 50 Hz.",
          "aFRR: återställer frekvensen till 50 Hz via en automatisk styrsignal och ska ge full effekt inom 5 minuter.",
          "mFRR: avlastar de snabbare reserverna och återställer frekvensen. Sedan 4 mars 2025 aktiveras den automatiskt per kvart utifrån prognoser, med full effekt inom 12,5 minuter."
        ]
      },
      {
        h2: "Så upphandlas och prissätts de",
        paragraphs: [
          "FCR, aFRR och mFRR köps på kapacitetsmarknader dagen före leverans, och mFRR dessutom på en marknad för aktiverad energi. FCR handlas i två auktioner som stänger klockan 00.30 och 18.00 dagen före. För FCR och aFRR är priset ett marginalpris, alltså priset för det dyraste antagna budet, i euro per MW och timme.",
          "Ersättningen är i första hand en betalning för att stå redo: pris gånger såld kapacitet. Aktiverad energi ersätts för FCR-N, aFRR och mFRR, men inte för FCR-D. Minsta bud är 0,1 MW för FCR och 1 MW för aFRR och mFRR, och därför deltar villabatterier via en aggregator."
        ]
      },
      {
        h2: "Prisläget 2026",
        paragraphs: [
          "I augusti 2026 låg månadsmedlet enligt Svenska kraftnät på 18,6 euro per MW och timme för FCR-N, 8,5 euro för FCR-D upp och 2,6 euro för FCR-D ned. aFRR-kapacitet i SE3 kostade 12,3 euro uppåt och 14,2 euro nedåt, men marknaden är nordisk och nästan ingen aFRR-volym avropades i SE3 och SE4 den månaden.",
          "Svenska kraftnät betalar den aktör som lämnat budet, inte villaägaren direkt. Vad du får beror på marknadspriset och aggregatorns villkor, och nivåerna har sjunkit: Mölndal Energi redovisar att deras kunder i snitt fick 52 kr per kW och månad 2025 och 17–43 kr per månad under januari–juni 2026, exklusive moms. Optimera Energis kalkylator räknar med 65 kr per kW växelriktareffekt och månad. Det är företagets schablon, inte ett marknadspris."
        ]
      }
    ],
    misconceptions: [
      {
        myth: "Svenska kraftnät betalar en fast ersättning direkt till batteriägare.",
        fact: "Nej. Priset sätts i auktioner och betalas till den aktör som lämnat budet. Vad du får beror på avtalet med din aggregator."
      }
    ],
    faq: [
      {
        q: "Vad är frekvensen i elnätet?",
        a: "50 Hz. Den sjunker när förbrukningen är större än produktionen och stiger när produktionen är större. Svenska kraftnät använder stödtjänster för att hålla den nära 50,00 Hz."
      },
      {
        q: "Vad är skillnaden mellan aFRR och mFRR?",
        a: "Båda återställer frekvensen till 50 Hz. aFRR styrs automatiskt av en signal från Svenska kraftnät och ska ge full effekt inom 5 minuter. mFRR aktiveras per kvart utifrån prognoser för obalansen och ska ge full effekt inom 12,5 minuter."
      },
      {
        q: "Kan en privatperson sälja stödtjänster till Svenska kraftnät?",
        a: "Inte direkt, eftersom minsta bud är 100 kW och resurserna måste förkvalificeras. Privatpersoner deltar via en aggregator som samlar många batterier."
      },
      {
        q: "Betalar Svenska kraftnät per kW och månad?",
        a: "Nej. Svenska kraftnät betalar ett pris per MW och timme till den aktör som lämnat budet. Vad du som batteriägare får bestäms av aggregatorns avtal."
      }
    ],
    searchPhrases: [
      "vad är stödtjänster",
      "stödtjänster batteri",
      "stödtjänster svenska kraftnät",
      "afrr",
      "mfrr",
      "fcr-n",
      "frekvens elnät",
      "vad är stödtjänster el",
      "stödtjänster batteri ersättning",
      "svenska kraftnät stödtjänster privatperson",
      "frekvens elnät sverige"
    ],
    sources: [
      {
        title: "Om olika reserver",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/aktorsportalen/bidra-med-reserver/om-olika-reserver/"
      },
      {
        title: "Kontrollrummet – frekvensen och balansen i kraftsystemet",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/om-kraftsystemet/kontrollrummet/"
      },
      {
        title: "Frekvenshållningsreserv normaldrift (FCR-N)",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/aktorsportalen/bidra-med-reserver/om-olika-reserver/fcr-n/"
      },
      {
        title: "Automatisk frekvensåterställningsreserv (aFRR)",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/aktorsportalen/bidra-med-reserver/om-olika-reserver/afrr/"
      },
      {
        title: "Automatiserad manuell frekvensåterställningsreserv (mFRR)",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/aktorsportalen/bidra-med-reserver/om-olika-reserver/mfrr/"
      },
      {
        title: "Handel och prissättning av reserver",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/aktorsportalen/bidra-med-reserver/handel-prissattning/"
      },
      {
        title: "Månadsrapport balansmarknader augusti 2026",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/4a736e/siteassets/aktorsportalen/bidra-med-reserver/handel-och-prissattning/marknadsanalys-balanstjanster/manadsrapport-balansmarknader-augusti-2026.pdf"
      },
      {
        title: "Vad är stödtjänster – allt du behöver veta (utbetalningar via FlexME)",
        publisher: "Mölndal Energi",
        url: "https://www.molndalenergi.se/kunskap/vad-ar-stodtjanster"
      }
    ],
    related: [
      "fcr-d",
      "aggregator-och-virtuellt-kraftverk",
      "batteriets-intaktskallor",
      "spotprisstyrning"
    ],
    questions: [],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri och stödtjänster"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "fcr-d",
    group: "elnat",
    term: "FCR-D",
    title: "Vad är FCR-D? Så får batteriet betalt för att stötta elnätet",
    description: "FCR-D är en reserv som aktiveras vid störningar i elnätet. Batterier får betalt för att stå redo, men priset har fallit över 90 % från toppåren 2022–2023.",
    shortAnswer: "FCR-D är en frekvenshållningsreserv som Svenska kraftnät köper för att stabilisera elnätet vid störningar, till exempel när ett kärnkraftverk eller en utlandskabel plötsligt faller bort. Batteriet får betalt för att stå redo att automatiskt ladda ur (FCR-D upp) eller ladda (FCR-D ned) när frekvensen avviker. Ersättningen sätts på en marknad, betalas ut via en aggregator och har fallit med över 90 procent från toppnivåerna 2022–2023, i takt med att många batterier anslutits.",
    sections: [
      {
        h2: "Vad är FCR-D?",
        paragraphs: [
          "FCR-D står för Frequency Containment Reserve – Disturbance, frekvenshållningsreserv vid störning. Reserven aktiveras automatiskt och ska klara minst 20 minuter vid full aktivering. Behovet styrs av det största fel som kan inträffa: för FCR-D upp ett fullt drivet Oskarshamn 3, 1 450 MW i Norden, och för FCR-D ned någon av utlandskablarna NSL eller Nordlink, 1 400 MW.",
          "FCR-D aktiveras när frekvensen avviker mer än 0,1 Hz från 50 Hz:"
        ],
        bullets: [
          "FCR-D upp aktiveras när frekvensen faller till mellan 49,90 och 49,50 Hz. Batteriet laddar ur och matar ut el.",
          "FCR-D ned aktiveras när frekvensen stiger till mellan 50,10 och 50,50 Hz. Batteriet laddar och tar upp el."
        ]
      },
      {
        h2: "FCR-D vs FCR-N – vad är skillnaden?",
        paragraphs: [
          "FCR-N används vid normal drift mellan 49,90 och 50,10 Hz och regleras åt båda hållen. Den ska klara en timme, och aktiverad energi ersätts utöver kapaciteten. FCR-D används betydligt mindre: Svenska kraftnät anger en genomsnittlig aktiveringsgrad under 0,1 procent för FCR-D, mot cirka 15 procent för FCR-N. FCR-D ger bara kapacitetsersättning."
        ]
      },
      {
        h2: "Prisutvecklingen för FCR-D",
        paragraphs: [
          "FCR-D köps i två auktioner dagen före leverans som stänger klockan 00.30 och 18.00. Sedan februari 2024 får alla antagna bud marginalpriset, priset för det dyraste antagna budet, i euro per MW och timme. Sverige och östra Danmark (DK2) har en gemensam FCR-marknad.",
          "Priserna har fallit kraftigt. Svenska kraftnät förklarar prispressen med marginalprissättningen och att marknaden fått betydligt fler aktörer, där energilager spelat en avgörande roll. Den 1 juli 2026 var energilager med 1 590 MW förkvalificerade för FCR-D upp, medan det under januari–september 2026 i snitt handlades knappt 600 MW FCR-D upp per timme på den svensk-danska marknaden.",
          "Så har årsmedelpriset utvecklats, enligt vår beräkning på Svenska kraftnäts priser i Mimer. Före februari 2024 är siffrorna snitt av betalda budpriser:"
        ],
        bullets: [
          "FCR-D upp: cirka 63 euro per MW och timme 2022, 38 euro 2023, 10 euro 2024, 6 euro 2025 och 5 euro januari–september 2026.",
          "FCR-D ned: cirka 71 euro 2023, 27 euro 2024, 6 euro 2025 och 3 euro januari–september 2026."
        ]
      },
      {
        h2: "Vad får du som batteriägare?",
        paragraphs: [
          "Du säljer inte själv utan via en aggregator, och Svenska kraftnät betalar den aktör som lämnat budet. Mölndal Energi, som aggregerar sina kunders batterier, redovisar att kunderna i snitt fick 52 kr per kW batterieffekt och månad 2025, exklusive moms, och 17–43 kr per månad under januari–juni 2026. Ersättningen varierar alltså från månad till månad, och ingen kan lova en viss nivå.",
          "Optimera Energis kalkylator räknar med 65 kr per kW växelriktareffekt och månad via EMS-plattformarna Energy IQ eller Enequi Core. Det är företagets schablon, inte ett marknadspris, och den ligger över de nivåer Mölndal Energi betalat ut 2025–2026. Faktisk ersättning beror på marknadspriset och på aggregatorns avgifter och villkor.",
          "Batteriet måste hela tiden ha energi för 20 minuters full leverans åt det håll det sålt, och reservera 20 procent extra kapacitet i motsatt riktning. Därför kan det inte samtidigt användas fullt ut till solel och arbitrage."
        ]
      }
    ],
    example: {
      title: "Exempel: vad 10 kW FCR-D kan ge per år",
      lines: [
        "Med Mölndal Energis snitt 2025: 10 kW × 52 kr × 12 ≈ 6 200 kr.",
        "Med Mölndal Energis snitt januari–juni 2026, cirka 33 kr: 10 kW × 33 kr × 12 ≈ 4 000 kr.",
        "Med Optimera Energis kalkylatorschablon: 10 kW × 65 kr × 12 = 7 800 kr."
      ],
      note: "Räkneexempel, inget löfte. Ersättningen gäller den effekt som aggregatorn faktiskt kan sälja. Mölndal Energis siffror är exklusive moms och gäller deras kunder; andra aggregatorer har andra avgifter och villkor, och priserna varierar."
    },
    misconceptions: [
      {
        myth: "Svenska kraftnät betalar en fast summa per kW och månad.",
        fact: "Nej. Priset sätts i auktioner varje dag, per MW och timme, och betalas till den aktör som lämnat budet. Din ersättning bestäms av aggregatorns avtal."
      },
      {
        myth: "FCR-D gör att batteriet laddas upp och ur hela tiden.",
        fact: "Nej. Svenska kraftnät anger en genomsnittlig aktiveringsgrad under 0,1 procent för FCR-D. Batteriet står mest redo."
      }
    ],
    faq: [
      {
        q: "Vad är skillnaden mellan FCR-D upp och ned?",
        a: "FCR-D upp aktiveras när frekvensen sjunker under 49,90 Hz, och batteriet laddar då ur. FCR-D ned aktiveras när frekvensen stiger över 50,10 Hz, och batteriet laddar. Produkterna köps och prissätts var för sig."
      },
      {
        q: "Hur mycket får man för FCR-D 2026?",
        a: "Det varierar med marknadspriset och aggregatorns villkor. Mölndal Energi betalade sina kunder 17–43 kr per kW och månad, exklusive moms, under januari–juni 2026, mot i snitt 52 kr under 2025. Optimera Energis kalkylator räknar med 65 kr, men det är en schablon och inget marknadspris."
      },
      {
        q: "Varför har priserna på FCR-D sjunkit?",
        a: "Svenska kraftnät pekar på marginalprissättningen från februari 2024 och på att marknaden fått betydligt fler aktörer, framför allt energilager. Den 1 juli 2026 var energilagren som förkvalificerats för FCR-D upp nästan tre gånger så stora som den volym som i snitt handlas per timme."
      },
      {
        q: "Vilka krav ställs på ett batteri för FCR-D?",
        a: "Det ska vara förkvalificerat hos Svenska kraftnät, klara 20 minuters full leverans och reservera 20 procent extra kapacitet i motsatt riktning. Förkvalificering och budgivning sköts av aggregatorn och den balansansvariga, inte av dig."
      }
    ],
    searchPhrases: [
      "vad är fcr d",
      "fcr-d batteri",
      "fcr-d ersättning",
      "fcr d upp och ned",
      "fcr d vs fcr n",
      "prisutveckling fcr d",
      "fcr d ersättning 2025",
      "fcr d pris",
      "fcr d svenska kraftnät",
      "fcr d krav",
      "fcr-d upp",
      "fcr d ned"
    ],
    sources: [
      {
        title: "Frekvenshållningsreserv störning uppreglering (FCR-D upp)",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/aktorsportalen/bidra-med-reserver/om-olika-reserver/fcr-d-upp/"
      },
      {
        title: "Frekvenshållningsreserv störning nedreglering (FCR-D ned)",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/aktorsportalen/bidra-med-reserver/om-olika-reserver/fcr-d-ned/"
      },
      {
        title: "Frekvenshållningsreserv normaldrift (FCR-N)",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/aktorsportalen/bidra-med-reserver/om-olika-reserver/fcr-n/"
      },
      {
        title: "Delta på FCR-marknaderna med resurser med begränsad energireserv (LER)",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/aktorsportalen/bidra-med-reserver/bli-leverantor-av-reserver/bidra-med-fcr-afrr-eller-mfrr/delta-pa-fcr--marknaderna-med-resurser-med-begransad-energireserv--ler/"
      },
      {
        title: "Mimer – priser och volymer för FCR (primärreglering)",
        publisher: "Svenska kraftnät",
        url: "https://mimer.svk.se/PrimaryRegulation/PrimaryRegulationIndex"
      },
      {
        title: "Månadsrapport FCR – december 2024 (med summering av 2024)",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/4a9a37/siteassets/aktorsportalen/bidra-med-reserver/handel-och-prissattning/marknadsanalys-balanstjanster/manadsrapport-fcr---december-2024.pdf"
      },
      {
        title: "Utbud på marknaderna för reserver",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/aktorsportalen/bidra-med-reserver/behov-av-reserver-nu-och-i-framtiden/utbud-pa-marknaderna-for-reserver/"
      },
      {
        title: "Vad är stödtjänster – allt du behöver veta (utbetalningar via FlexME)",
        publisher: "Mölndal Energi",
        url: "https://www.molndalenergi.se/kunskap/vad-ar-stodtjanster"
      }
    ],
    related: [
      "stodtjanster",
      "aggregator-och-virtuellt-kraftverk",
      "batteriets-intaktskallor",
      "batteri-utan-solceller",
      "gront-avdrag-for-batteri"
    ],
    questions: [
      "vad-kostar-solceller-med-batteri"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri och stödtjänster"
      },
      {
        href: "/kalkylator",
        label: "Räkna på batteriet i kalkylatorn"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "aggregator-och-virtuellt-kraftverk",
    group: "elnat",
    term: "Aggregator",
    title: "Vad är en aggregator och ett virtuellt kraftverk?",
    description: "En aggregator samlar många batterier och styr dem som ett virtuellt kraftverk. Så når villabatterier upp till kraven för att sälja stödtjänster som FCR-D.",
    shortAnswer: "En aggregator är ett företag som samlar flexibilitet från många hushåll och företag, till exempel hembatterier, och säljer den på elmarknaden. När resurserna styrs tillsammans som en stor enhet kallas det ett virtuellt kraftverk. Det är så ett villabatteri kan sälja stödtjänster som FCR-D, där minsta bud är 100 kW.",
    sections: [
      {
        h2: "Vad gör en aggregator?",
        paragraphs: [
          "Ett villabatteri är för litet för att handla själv på Svenska kraftnäts marknader. Minsta bud är 100 kW för FCR-D och 1 MW för mFRR, och resurserna måste testas och förkvalificeras. Aggregatorn kopplar ihop många batterier, sköter förkvalificeringen och ser till att hela gruppen budas in på marknaden, i Sverige i dag via den balansansvariga i din anslutningspunkt. För FCR-D räcker det enligt CheckWatt med 10–20 villasystem under samma balansansvariga i ett elområde.",
          "I Sverige infördes rollen i ellagen 2023 under namnet leverantör av aggregeringstjänster. Innan aggregatorn börjar leverera i din anslutningspunkt ska den anmäla det till ditt elnätsföretag."
        ]
      },
      {
        h2: "Vad är ett virtuellt kraftverk?",
        paragraphs: [
          "Ett virtuellt kraftverk är många små resurser, som batterier, som styrs tillsammans och därför kan leverera tjänster som annars kräver en större anläggning: stödtjänster till Svenska kraftnät, flexibilitet till lokala nätbolag och handel på elmarknaden.",
          "Lokal flexibilitet finns än så länge bara i vissa nät. CheckWatt uppger att ungefär 10 procent av deras kunder bor där nätbolaget köper flexibilitet, och att cirka 500 kunder i Göteborg och Mölndal deltog på marknaden Effekthandel Väst vintern 2024/2025."
        ]
      },
      {
        h2: "Så fungerar det för dig",
        paragraphs: [
          "Det här brukar gälla när du ansluter batteriet till en aggregator:"
        ],
        bullets: [
          "Du tecknar avtal med en aggregator, ofta via installatören. En styrenhet kopplas till batteriet och internet.",
          "Aggregatorn tar över styrningen. Hos CheckWatt kan du inte styra batteriet själv när det är anslutet.",
          "Elhandlaren spelar roll. I dag måste den som säljer stödtjänsterna, leverantören av balanstjänster (BSP), också vara balansansvarig (BRP) i din anslutningspunkt. Därför kan du behöva byta elhandlare för att kunna delta.",
          "Ersättningen delas och varierar. Har aggregatorn fler batterier än den är förkvalificerad för att sälja, späds ersättningen ut, förklarar Mölndal Energi. Priserna sätts dessutom på marknader, så intäkterna varierar från månad till månad och över tid, skriver CheckWatt."
        ]
      },
      {
        h2: "Så jämför du aggregatorer",
        paragraphs: [
          "Det finns ingen samlad förteckning över aggregatorer, och valet påverkar både tjänster och ersättning, enligt Ei. Kontrollera:"
        ],
        bullets: [
          "Vilka marknader de säljer på, till exempel FCR-D, FCR-N, mFRR eller lokal flexibilitet, och om de även styr efter elpris, effektavgift och solel.",
          "Hur ersättningen beräknas och vilka avgifter som dras. Hos CheckWatt går till exempel 20 procent av ersättningen till CheckWatt och företaget som sköter supporten, och de balansansvariga tar i regel 5–10 procent av intäkterna från stödtjänster.",
          "Hur stor del av batteriet som reserveras. CheckWatt anger att typiskt 20–45 procent av energin används för solel och arbitrage när batteriet samtidigt säljer stödtjänster.",
          "Vad som gäller om du flyttar eller byter elhandlare.",
          "Att företaget faktiskt betalar för flexibilitet. Alla som erbjuder styrning gör inte det, påpekar Ei."
        ]
      }
    ],
    misconceptions: [
      {
        myth: "Med en aggregator bestämmer du själv när batteriet laddar.",
        fact: "Oftast inte. För att kunna lova leverans tar aggregatorn över styrningen, och en del av kapaciteten hålls i reserv."
      }
    ],
    faq: [
      {
        q: "Hur fungerar FCR-D med CheckWatt?",
        a: "CheckWatt är en aggregator som kopplar ihop batterier i ett virtuellt kraftverk. Från villabatterier säljer företaget främst FCR-D och mFRR, och det har börjat förkvalificera villasystem även för FCR-N. En installatör kopplar in en styrenhet, och sedan styr CheckWatt batteriet, medan budgivningen i Sverige sköts av elhandlarens balansansvariga. Det kräver att din elhandlare och dess balansansvariga har avtal med CheckWatt."
      },
      {
        q: "Är aggregator och elhandlare samma sak?",
        a: "Inte nödvändigtvis. En aggregator kan vara fristående eller en del av ett elhandelsföretag, och elhandlare kan samarbeta med en eller flera aggregatorer, enligt Ei."
      },
      {
        q: "Vad betyder virtuella kraftverk för villaägare?",
        a: "Att ditt batteri styrs tillsammans med många andra och säljer tjänster till elsystemet. Du får ersättning enligt aggregatorns avtal och den varierar med marknadspriserna, men du lämnar ifrån dig en del av kontrollen över batteriet."
      }
    ],
    searchPhrases: [
      "aggregator el",
      "virtuellt kraftverk",
      "checkwatt fcr d",
      "aggregator el sverige",
      "virtuella kraftverk för villaägare",
      "aggregator elmarknad"
    ],
    sources: [
      {
        title: "Nya flexibilitetsaktörer på elmarknaderna",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/bransch/flexibilitet-i-elsystemet/effektiva-marknader/nya-flexibilitetsaktorer-pa-elmarknaderna"
      },
      {
        title: "Sälj din flexibilitet",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/konsument/anvand-el-smartare/styr-din-elanvandning/salj-din-flexibilitet"
      },
      {
        title: "Leverantör av balanstjänster (BSP)",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/aktorsportalen/leverantor-av-balanstjanster-bsp/"
      },
      {
        title: "Öka värdet på dina flexibla energiresurser",
        publisher: "CheckWatt",
        url: "https://checkwatt.com/sv/"
      },
      {
        title: "Vanliga frågor",
        publisher: "CheckWatt",
        url: "https://checkwatt.com/sv/faq-vanliga-fragor/"
      },
      {
        title: "Vad är stödtjänster – allt du behöver veta (utbetalningar via FlexME)",
        publisher: "Mölndal Energi",
        url: "https://www.molndalenergi.se/kunskap/vad-ar-stodtjanster"
      }
    ],
    related: [
      "stodtjanster",
      "fcr-d",
      "batteriets-intaktskallor",
      "spotprisstyrning"
    ],
    questions: [],
    links: [
      {
        href: "/tjanster/batterier",
        label: "Batterilager – så installerar och styr vi"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "o-drift-och-backup",
    group: "trygghet",
    term: "Ö-drift och backup",
    title: "Fungerar batteriet vid strömavbrott? Ö-drift och backup förklarat",
    description: "Ett solcellsbatteri ger bara el vid strömavbrott om anläggningen är byggd för ödrift: växelriktare med backupfunktion, omkoppling och i regel eget jordtag.",
    shortAnswer: "Ett solcellsbatteri ger bara el vid strömavbrott om anläggningen är byggd för det, eftersom en vanlig nätansluten anläggning kopplar ner sig automatiskt när elnätet försvinner. Ödrift, som också skrivs ö-drift, kräver en växelriktare med backupfunktion, en omkopplare som skiljer huset från nätet och i regel ett eget jordtag. Det ingår inte automatiskt i alla system.",
    sections: [
      {
        h2: "Därför stängs anläggningen av vid strömavbrott",
        paragraphs: [
          "En solcellsanläggning går normalt i parallelldrift med elnätet. Enligt Elsäkerhetsverket ska den automatiskt koppla ner sig när strömmen går, för att inte felaktigt mata ut ström på elnätet. Vill du använda solceller och batteri som reservkraft ställs andra krav på installationen, till exempel eget jordtag och säker frånskiljning från nätet. Svensk Solenergi skriver att utan en växelriktare som stödjer beredskapsdrift kan varken solcellerna eller batteriet leverera el vid elavbrott."
        ]
      },
      {
        h2: "Ödrift med solceller, batteri och hybridväxelriktare",
        paragraphs: [
          "Ödrift, eller beredskapsdrift, betyder att huset drivs frånskilt från elnätet med el från solceller och batteri. Det är växelriktaren som avgör om det går. Har du en hybridväxelriktare, som sköter både solcellerna och batteriet, är det den som ska ha en funktion för backup, ofta kallad ”back up power” eller ”standalone mode”. Enligt Svensk Solenergi har de flesta solcellsinstallationer med batteri en växelriktare som är redo för beredskapsdrift, men elsystemet behöver ändå byggas om för det.",
          "Utan batteri ger solcellerna i ödrift bara el när solen skiner. Med ett solcellsbatteri kan solelen sparas och användas oavsett när på dygnet avbrottet sker."
        ]
      },
      {
        h2: "Backup-uttag, fullhusbackup och automatisk omkoppling",
        paragraphs: [
          "I praktiken finns tre nivåer:"
        ],
        bullets: [
          "Backup-uttag: ett särskilt uttag eller en säkrad krets som får el vid avbrott. Vissa växelriktare har det inbyggt och kan då ge el till enfasiga apparater när solen skiner, även utan batteri.",
          "Fullhusbackup med manuell omkopplare: du kopplar själv bort elnätet och kopplar in batteri och solceller med ett vred.",
          "Automatisk backup: en styrenhet känner av avbrottet och växlar själv, även när ingen är hemma. Omkopplingstiden varierar mellan produkter. En leverantör anger till exempel under 20 millisekunder, så kallad UPS-funktion, där de flesta apparater inte hinner märka avbrottet."
        ]
      },
      {
        h2: "Det här krävs",
        paragraphs: [],
        bullets: [
          "En växelriktare med funktion för backup eller ödrift.",
          "En omkopplare eller automatik som säkert skiljer huset från elnätet.",
          "Eget jordtag. Bergig mark kan göra det svårare och dyrare.",
          "Elnätsbolaget ska godkänna installationen av ödrift och jordtag, och installatören färdiganmäler anläggningen.",
          "En inställd reserv i batteriet, så att det finns laddning kvar när avbrottet kommer."
        ]
      },
      {
        h2: "Begränsningar",
        paragraphs: [
          "Hur länge batteriet räcker beror på kapaciteten, växelriktarens effekt och vad som är inkopplat. Välj tillsammans med installatören vilka laster som ska gå på backup, till exempel kyl, frys, belysning och värmepump. I ödrift blir kortslutningsströmmen lägre än från elnätet, vilket installatören måste ta hänsyn till så att säkringarna löser ut som de ska. Tillverkare som Huawei avråder också från att använda batteribackup för medicinsk utrustning som är livsviktig."
        ]
      }
    ],
    example: {
      title: "Exempel: så länge räcker reserven",
      lines: [
        "Reserv i batteriet: 10 kWh",
        "Inkopplade laster drar i snitt 1 kW: cirka 10 timmar",
        "Med värmepumpen igång och i snitt 3 kW: drygt 3 timmar",
        "Solceller som laddar under dagen förlänger tiden, om växelriktaren klarar det i ödrift"
      ],
      note: "Förenklat räkneexempel med antagandet att lasten är jämn och att förluster och vintersol bortses från. Faktisk förbrukning beror på hus, väder och vilka laster som är inkopplade."
    },
    misconceptions: [
      {
        myth: "Har jag solceller har jag el vid strömavbrott, åtminstone när solen skiner.",
        fact: "Nej. Utan funktion för ödrift stängs växelriktaren av när elnätet försvinner, även mitt på dagen."
      }
    ],
    faq: [
      {
        q: "Vad är skillnaden på ödrift och UPS?",
        a: "Ödrift betyder att huset drivs frånskilt från elnätet, efter manuell eller automatisk omkoppling. UPS betyder att omkopplingen sker så snabbt att apparaterna i princip inte märker avbrottet."
      },
      {
        q: "Kan jag ha solceller och batteri helt utan elnät (off grid)?",
        a: "Det går, men då ställs andra krav på elinstallationen. En bostad som inte är ansluten till elnätet ger inte heller rätt till grönt avdrag för solceller eller batteri."
      },
      {
        q: "Måste elnätsbolaget godkänna ödrift?",
        a: "Ja. Installationen av ödrift och jordtag ska godkännas av elnätsbolaget, och installatören färdiganmäler att anläggningen fungerar vid elavbrott."
      }
    ],
    searchPhrases: [
      "solcellsbatteri strömavbrott",
      "ödrift solceller",
      "batterilagring strömavbrott",
      "batteri solceller off grid",
      "hembatteri strömavbrott",
      "solcellsbatteri ödrift",
      "solcellsbatteri vid strömavbrott",
      "backup batteri strömavbrott",
      "batteri backup solceller",
      "solceller med batteri off grid",
      "hybridväxelriktare med ödrift"
    ],
    sources: [
      {
        title: "Planera din solcellsanläggning",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-solceller/planera-din-solcellsanlaggning/"
      },
      {
        title: "Fem steg till ö-drift",
        publisher: "Svensk Solenergi",
        url: "https://svensksolenergi.se/att-installera-solenergi/fem-steg/"
      },
      {
        title: "Backup power solutions",
        publisher: "Fronius",
        url: "https://www.fronius.com/en/solar-energy/solar-solutions/backup-power"
      },
      {
        title: "”Många vill ha automatisk ödrift” – 4 råd till elektriker",
        publisher: "Elinstallatören",
        url: "https://www.elinstallatoren.se/manga-vill-ha-automatisk-odrift-4-rad-till-elektriker/"
      },
      {
        title: "Batteri tar över vid strömavbrott: ”Du kan driva hela huset”",
        publisher: "Elinstallatören",
        url: "https://www.elinstallatoren.se/batteri-tar-over-vid-stromavbrott-du-kan-driva-hela-huset/"
      },
      {
        title: "Tänker du på kortslutningsströmmen vid ödrift?",
        publisher: "Elinstallatören",
        url: "https://www.elinstallatoren.se/tanker-du-pa-kortslutningsstrommen-vid-odrift/"
      },
      {
        title: "LUNA2000-S1 User Manual (Issue 06, 2025-09-30)",
        publisher: "Huawei Digital Power",
        url: "https://solar.huawei.com/admin/asset/v1/pro/view/7fa828aede004fb1b1658929a49d6242.pdf"
      },
      {
        title: "Godkända arbeten – grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/godkandaarbetengronteknik.4.676f4884175c97df419290e.html"
      }
    ],
    related: [
      "vaxelriktare-hybrid-ac-dc",
      "dimensionering",
      "kw-och-kwh",
      "brandsakerhet-och-placering"
    ],
    questions: [
      "solceller-vid-stromavbrott",
      "maste-man-salja-elen",
      "stanga-av-solceller"
    ],
    links: [
      {
        href: "/tjanster/batterier",
        label: "Batterilager – så installerar vi"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "brandsakerhet-och-placering",
    group: "trygghet",
    term: "Brandsäkerhet och placering",
    title: "Är hembatterier brandfarliga – och var ska batteriet stå?",
    description: "Rätt installerade hembatterier anses säkra. Över 20 kWh kräver Boverket egen brandcell; för mindre batterier gäller tillverkarens krav och branschens råd.",
    shortAnswer: "Ett hembatteri till solceller som uppfyller regelverket och är rätt installerat anses säkert och börjar sällan brinna, men om ett litiumjonbatteri väl brinner kan branden bli intensiv och svår att släcka. Enligt Boverkets byggregler ska batterier på sammanlagt mer än 20 kWh i samma utrymme som utgångspunkt stå i en egen brandcell. För mindre batterier finns inget brandcellskrav, men tillverkarens anvisningar och branschens rekommendationer gäller.",
    sections: [
      {
        h2: "Hur stor är risken?",
        paragraphs: [
          "Elsäkerhetsverket skriver att energilager som uppfyller gällande regelverk och standarder och som installeras och underhålls rätt anses säkra, och att det ska mycket till innan de börjar brinna. Vid överladdning eller höga temperaturer kan en cell däremot gå i termisk rusning, en okontrollerad frigörelse av energi som kan leda till bränder som är svåra att släcka.",
          "Myndigheten för civilt försvar (tidigare MSB) konstaterar att litiumjonbatterier inte brinner eller exploderar särskilt ofta, men att konsekvenserna kan bli stora när det händer. LFP-batterier har något lägre brandrisk än andra litiumbatterier, men alla litiumbatterier med brandfarlig elektrolyt kan ge allvarliga bränder, skriver Svensk Solenergi."
        ]
      },
      {
        h2: "Brandkrav: Boverkets regler över 20 kWh",
        paragraphs: [
          "Enligt Boverkets brandskyddsregler, BFS 2024:7 5 kap. 26 §, ska energilager med batterier med en kapacitet större än 20 kWh vara utformade som egen brandcell. Gränsen gäller den sammanlagda kapaciteten i utrymmet, inte varje enskilt batteri. Utrymmet ska också ha brandgasventilation, oavsett hur litet det är. Har det dörr mot en invändig utrymningsväg som också används av andra utrymmen ska dörren dessutom vara en brandsluss. Reglerna gäller sedan 1 juli 2025.",
          "Kraven gäller vid nybyggnad och vid ändring av en byggnad, oavsett om åtgärden kräver bygglov, anmälan eller inget av det, men vid ändring av en befintlig byggnad får de anpassas. Ett energilager kan stå i samma brandcell som andra utrymmen om en brand bara får begränsade konsekvenser för utrymningen. Boverket ger exempel: i ett småhus i samma brandcell som garaget, där kravet mot bostaden normalt är EI 30, utomhus på fasaden med hänsyn till fönster och dörrar men helst inte på brännbar fasad, eller i en egen byggnad på avstånd från bostaden."
        ]
      },
      {
        h2: "Upp till 20 kWh: inget brandcellskrav, men tydliga råd",
        paragraphs: [
          "För batterier på högst 20 kWh finns inget krav på brandcell i byggreglerna. Branschorganisationen Svensk Solenergi rekommenderar ändå följande för ett batteri i en villa:"
        ],
        bullets: [
          "Utomhus om tillverkaren tillåter det, väderskyddat och skyddat mot påkörning.",
          "Inomhus helst i fristående byggnad eller avskild del, som förråd eller garage, i markplan och med dörr eller fönster direkt till det fria.",
          "Inte i rum där man vistas länge, som sovrum eller vardagsrum, och med hänsyn till utrymningsvägar.",
          "Cirka 2 meter till brännbart material, eller obrännbar skiva emellan.",
          "Brandvarnare i batteriutrymmet, gärna sammankopplad med husets övriga, och en handbrandsläckare i närheten."
        ]
      },
      {
        h2: "Tillverkarens krav och försäkringen",
        paragraphs: [
          "Enligt Svensk Solenergi går tillverkarens installationsanvisning före riktlinjer och standarder. Huawei anger till exempel att batteriet ska hållas borta från bland annat sovrum, vardagsrum, kök, badrum, tvättstuga och vind, inte får stå i ett instängt och oventilerat utrymme och i garage ska sitta utanför bilens väg. Elsäkerhetsverket anger att litiumjonceller bör hållas inom cirka 5–40 °C, och färdiga produkter kan därför ha inbyggd värme och kyla.",
          "Installationen ska göras av ett elinstallationsföretag som är registrerat för elproduktionsanläggningar, och energilagret ska föranmälas till elnätsbolaget. Försäkringsbolaget If skriver att installation av batterilager ska göras av en behörig installatör eller firma och att ersättningen vid en skada kan sättas ned om installationen är felaktig. Kontrollera villkoren i din egen försäkring."
        ]
      }
    ],
    misconceptions: [
      {
        myth: "20 kWh-gränsen gäller per batteri.",
        fact: "Gränsen gäller den sammanlagda kapaciteten i utrymmet. Två batterier på 15 kWh i samma garage räknas som 30 kWh."
      },
      {
        myth: "Det är förbjudet att ha hembatteri inomhus.",
        fact: "Nej. Inomhus är tillåtet om tillverkaren medger det och placeringen följer reglerna. Över 20 kWh krävs egen brandcell eller någon av de lösningar Boverket anvisar."
      }
    ],
    faq: [
      {
        q: "Kan man ha solcellsbatteri inomhus?",
        a: "Ja, om tillverkaren tillåter det och placeringen följer reglerna. Undvik rum där man vistas länge, välj helst garage eller förråd med dörr till det fria och sätt en brandvarnare i utrymmet."
      },
      {
        q: "Kan solcellsbatteriet stå utomhus?",
        a: "Ja, om batteriet är godkänt för utomhusbruk och klarar temperaturerna. Svensk Solenergi rekommenderar utomhusplacering när tillverkaren tillåter det. Tänk på avståndet till fönster och dörrar och undvik brännbar fasad."
      },
      {
        q: "Vad gör jag om batteriet luktar konstigt eller börjar ryka?",
        a: "En stickande lukt som påminner om nagellack eller epoxi tyder på att celler har släppt ut gas och att batteriet inte längre är säkert. Vädra och kontakta genast ett elinstallationsföretag. Ryker eller brinner det: se till att alla lämnar huset, håll avstånd och ring 112. Huawei rekommenderar till exempel cirka 20 meters avstånd, och farliga gaser kan bildas även när ett batteri bara ryker. Försök inte hantera batteriet själv."
      }
    ],
    searchPhrases: [
      "batteri solceller brandcell",
      "solcellsbatteri brandrisk",
      "solcellsbatteri utomhus",
      "kan man ha solcellsbatteri inomhus",
      "solcellsbatteri placering",
      "batterilager brandskydd",
      "solcellsbatteri inomhus eller utomhus",
      "batterilager brandcell",
      "brandkrav batterilager",
      "hembatteri brandrisk",
      "solcellsbatteri garage",
      "batterilager villa utomhus",
      "batteri solceller försäkring"
    ],
    sources: [
      {
        title: "Brandcellsindelning (BFS 2024:7, 5 kap. 26 §)",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/PBL-kunskapsbanken/regler-om-byggande/brandskydd/spridning-inom-byggnad/brandcellsindelning/"
      },
      {
        title: "Brandgasventilation",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/PBL-kunskapsbanken/regler-om-byggande/brandskydd/raddningspersonalens-sakerhet/brandgasventilation/"
      },
      {
        title: "Säkerhetsrisker med batterilager",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-batterilager/sakerhetsrisker-med-batterilager/"
      },
      {
        title: "Planera ditt batterilager",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-batterilager/planera-ditt-batterilager/"
      },
      {
        title: "Elfordon och litiumjonbatterier",
        publisher: "Myndigheten för civilt försvar (tidigare MSB)",
        url: "https://www.mcf.se/sv/amnesomraden/skydd-mot-olyckor-och-farliga-amnen/stod-till-kommunal-raddningstjanst/raddningstjanst-och-raddningsinsatser/elfordon-och-litiumjonbatterier/"
      },
      {
        title: "Riktlinje för brandskydd av stationära batterier (SSE.R8)",
        publisher: "Svensk Solenergi",
        url: "https://svensksolenergi.se/ny-riktlinje-for-brandskydd-av-batterilager/"
      },
      {
        title: "LUNA2000-S1 User Manual (Issue 06, 2025-09-30)",
        publisher: "Huawei Digital Power",
        url: "https://solar.huawei.com/admin/asset/v1/pro/view/7fa828aede004fb1b1658929a49d6242.pdf"
      },
      {
        title: "Försäkring för solceller",
        publisher: "If Skadeförsäkring",
        url: "https://www.if.se/privat/forsakringar/hemforsakring/villaforsakring/solceller"
      }
    ],
    related: [
      "lfp-nmc-och-natriumjon",
      "dimensionering",
      "o-drift-och-backup",
      "sa-fungerar-ett-solcellsbatteri"
    ],
    questions: [
      "kan-solceller-borja-brinna",
      "solceller-och-forsakring",
      "installera-solceller-sjalv"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri till villa – pris, storlek och grönt avdrag"
      },
      {
        href: "/tjanster/batterier",
        label: "Batterilager – så installerar vi"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "gront-avdrag-for-batteri",
    group: "trygghet",
    term: "Grönt avdrag för batteri",
    title: "Grönt avdrag för batteri 2026 – regler och villkor",
    description: "Batteri till egna solceller ger 50 % grönt avdrag på arbete och material, 48,5 % av totalpriset vid fast pris. Tak 50 000 kr per person och år.",
    shortAnswer: "Ett batteri som lagrar el från dina egna nätanslutna solceller ger 2026 grönt avdrag på 50 procent av kostnaden för arbete och material, vilket blir 48,5 procent av totalpriset vid fast pris. Taket är 50 000 kronor per person och år. Utan egen elproduktion blir det inget avdrag för batteriet.",
    sections: [
      {
        h2: "Så räknas avdraget",
        paragraphs: [
          "Grönt avdrag heter formellt skattereduktion för installation av grön teknik. För system som lagrar egenproducerad el är avdraget 50 procent av arbete och material. Vid fast pris räknar Skatteverket 97 procent av totalpriset som arbete och material, så avdraget blir 48,5 procent av fakturan.",
          "Installatören drar av beloppet direkt på fakturan och begär pengarna från Skatteverket, senast 31 januari året efter att du slutbetalat. Taket på 50 000 kronor per person och år delas med solceller och laddbox. Är ni två ägare har ni varsitt tak, men var och en behöver ha betalat tillräckligt med skatt för att kunna använda avdraget."
        ]
      },
      {
        h2: "Villkoren för batteriet",
        paragraphs: [
          "Enligt inkomstskattelagen och Skatteverket gäller bland annat:"
        ],
        bullets: [
          "Batteriet ska vara kopplat till en nätansluten anläggning för egen produktion av förnybar el, till exempel solceller, och installeras på samma fastighet som bostaden. Installationer på till exempel samfälld mark godkänns inte.",
          "Batteriet ska helt eller delvis lagra egenproducerad el för senare användning och öka andelen egen el som du använder själv.",
          "Det ska bara komma ditt eller dina föräldrars hushåll till del och höra till ett småhus eller en ägarlägenhet som du äger, eller en bostadsrätt som du innehar. För bostadsrätt ska avtalet tecknas med dig, nyttan enbart tillfalla din lägenhet och installationen följa med lägenheten vid en försäljning.",
          "Installationen ska vara färdig och slutbetald, och betalningen elektronisk.",
          "Frakt, resor, maskiner, projektering samt reparation och underhåll ger inget avdrag. Avdraget kan inte kombineras med rotavdrag, försäkringsersättning eller bidrag för samma åtgärd."
        ]
      },
      {
        h2: "Batteri i efterhand till befintliga solceller",
        paragraphs: [
          "Lagen kräver att batteriet är kopplat till en nätansluten anläggning för egen elproduktion, inte att allt installeras samtidigt. Skatteverkets rättsliga expert sa till Elinstallatören i januari 2024 att avdrag ges om solcellerna redan finns eller om de sätts in samtidigt som batteriet. Att komplettera en befintlig solcellsanläggning med batteri ger alltså avdrag på samma villkor. Den som bara installerar ett batteri har däremot inte rätt till avdraget."
        ]
      },
      {
        h2: "Finns det bidrag för batteri 2026?",
        paragraphs: [
          "Nej. Det tidigare statliga bidraget för lagring av egenproducerad el gällde åtgärder som slutfördes senast den 30 juni 2021, och i dag är grönt avdrag stödet för hembatterier. Får du bidrag från stat, kommun eller region för installationen kan du inte samtidigt få grönt avdrag. Eventuella ändringar inför 2027 avgörs i budgeten för 2027."
        ]
      }
    ],
    example: {
      title: "Exempel: batteri för 120 000 kr till fast pris",
      lines: [
        "Arbete och material: 97 % av 120 000 kr = 116 400 kr",
        "Grönt avdrag 50 %: 58 200 kr, alltså 48,5 % av totalpriset",
        "En ägare: avdraget stannar vid taket 50 000 kr, du betalar 70 000 kr",
        "Två ägare: 29 100 kr var, ni betalar 61 800 kr"
      ],
      note: "Räkneexempel med antagandet att ingen av ägarna har använt grönt avdrag för något annat samma år och att båda har betalat tillräckligt med skatt. Priset är valt för exemplets skull och är ingen prisuppgift."
    },
    misconceptions: [
      {
        myth: "Avdraget gäller bara om batteri och solceller köps samtidigt.",
        fact: "Nej. Ett batteri som kopplas till nätanslutna solceller du redan har ger avdrag på samma villkor."
      },
      {
        myth: "Med spotprisstyrning går det bra med grönt avdrag för batteri utan solceller.",
        fact: "Nej. Skatteverket godkänner inte lagringssystem utan egen elproduktion, oavsett hur batteriet styrs."
      }
    ],
    faq: [
      {
        q: "Får man grönt avdrag för batteri utan solceller?",
        a: "Nej. Skatteverket godkänner inte installation av system för lagring av el utan egen elproduktion. Batteriet måste vara kopplat till en nätansluten anläggning för egen förnybar el."
      },
      {
        q: "Hur mycket grönt avdrag får man för batteri 2026?",
        a: "50 procent av arbete och material, vilket blir 48,5 procent av totalpriset vid fast pris. Avdraget är högst 50 000 kronor per person och år, sammanlagt för solceller, batteri och laddbox."
      },
      {
        q: "Kan batteriet användas till stödtjänster och ändå ge avdrag?",
        a: "Ja, så länge batteriet också lagrar din egen solel. Sedan den 4 juli 2024 godtar Skatteverket, efter ett beslut i Skatterättsnämnden, att batteriet delvis används för stödtjänster eller elprisarbitrage. Ett batteri utan egen elproduktion ger däremot inget avdrag."
      }
    ],
    searchPhrases: [
      "batteri solceller grönt avdrag",
      "solcellsbatteri grönt avdrag",
      "grönt avdrag batteri utan solceller",
      "bidrag batteri solceller 2026",
      "hembatteri grönt avdrag",
      "batterilager grönt avdrag",
      "solcellsbatteri bidrag 2026",
      "hembatteri bidrag 2026",
      "grönt avdrag solceller batteri 2026",
      "solcellsbatteri avdrag"
    ],
    sources: [
      {
        title: "Så fungerar skattereduktionen för grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/safungerarskattereduktionenforgronteknik.4.676f4884175c97df4192870.html"
      },
      {
        title: "Godkända arbeten – grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/godkandaarbetengronteknik.4.676f4884175c97df419290e.html"
      },
      {
        title: "Grönt avdrag för batterier (nytt ställningstagande 4 juli 2024)",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/omoss/pressochmedia/nyheter/2024/nyheter/grontavdragforbatterier.5.5dc1d8b31903014b1bf172d.html"
      },
      {
        title: "Inkomstskattelag (1999:1229), 67 kap. 36–45 §§",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/inkomstskattelag-19991229_sfs-1999-1229/"
      },
      {
        title: "Lag (2020:1066) om förfarandet vid skattereduktion för installation av grön teknik",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-20201066-om-forfarandet-vid-skattereduktion_sfs-2020-1066/"
      },
      {
        title: "Förordning (2016:899) om bidrag till lagring av egenproducerad elenergi",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/forordning-2016899-om-bidrag-till-lagring-av_sfs-2016-899/"
      },
      {
        title: "Batteri utan solceller – 4 frågor om hur du undviker återbetalningskrav",
        publisher: "Elinstallatören",
        url: "https://www.elinstallatoren.se/batteri-utan-solceller-4-fragor-om-hur-du-undviker-aterbetalningskrav/"
      }
    ],
    related: [
      "batteri-utan-solceller",
      "batteriets-intaktskallor",
      "dimensionering",
      "stodtjanster"
    ],
    questions: [
      "bidrag-for-solceller",
      "vad-kostar-solceller-med-batteri",
      "solceller-utan-batteri"
    ],
    links: [
      {
        href: "/guider/gront-avdrag-2026",
        label: "Guide: Grönt avdrag 2026"
      },
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri till villa – pris, storlek och grönt avdrag"
      },
      {
        href: "/nyheter/regeringsbildningen-last-budgeten-12-november-elstoden",
        label: "Budgeten 12 november och grönt avdrag 2027"
      }
    ],
    updatedAt: "2026-10-03"
  }
];
