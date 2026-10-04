import type { SolarQuestion } from "./kb-types";

/**
 * Innehållet i Solcellsfrågor. Redaktionella regler som för nyheterna
 * (se news-content.ts): direkt svar i första meningen, varje sakpåstående
 * källbelagt, partipolitiskt neutralt, och sökfraserna (searchPhrases)
 * ska besvaras på riktigt på sidan.
 */
export const QUESTIONS: SolarQuestion[] = [
  {
    slug: "hur-mycket-sparar-man-pa-solceller",
    category: "kostnad-och-lonsamhet",
    question: "Hur mycket sparar man på solceller?",
    description: "I ett räkneexempel sparar 7 kWp i Stockholm cirka 5 900 kr per år 2026. Egenanvänd el är värd betydligt mer än såld, så egenanvändningen spelar stor roll.",
    shortAnswer: "I ett räkneexempel för en villa i Stockholm sparar en anläggning på 7 kWp cirka 5 900 kronor per år 2026. Besparingen beror främst på hur mycket el anläggningen ger och hur stor del du använder själv, eftersom egenanvänd el är värd mer än såld.",
    body: [
      {
        h2: "Hur mycket pengar sparar man? Räkneexempel för 7 kWp i Stockholm",
        paragraphs: [
          "Antaganden: 7 000 kWh produktion per år, 35 procent egenanvändning och ett spotpris (elbörsens pris) på 55 öre/kWh, samma nivå som Energimyndigheten antar för såld el i sin solelkalkyl."
        ],
        bullets: [
          "Egenanvänd el: 2 450 kWh × cirka 1,40 kronor = cirka 3 420 kronor. Värdet är spotpris med moms plus energiskatt (45 öre inklusive moms 2026) och Ellevios överföringsavgift (26 öre inklusive moms). Andra nätbolag har andra avgifter.",
          "Såld el: 4 550 kWh × cirka 55 öre = cirka 2 500 kronor.",
          "Totalt cirka 5 900 kronor per år. Före 2026 hade skattereduktionen på 60 öre/kWh gett ytterligare cirka 2 700 kronor."
        ]
      },
      {
        h2: "Hur mycket el sparar man?",
        paragraphs: [
          "I exemplet köper du 2 450 kWh mindre el per år, och resten matas ut på nätet. En vanlig villa använder 20–50 procent av solelen själv, enligt Energimyndigheten. Med batteri kan andelen enligt Optimera Energi bli 70–80 procent.",
          "Ersättningen för såld el är inkomst av kapital, men i många fall blir den skattefri tack vare schablonavdraget på 40 000 kronor per år och privatbostad, räknat på alla inkomster från bostaden."
        ]
      }
    ],
    searchPhrases: [
      "hur mycket sparar man på solceller",
      "hur mycket tjänar man på solceller",
      "hur mycket pengar sparar man på solceller",
      "hur mycket el sparar man med solceller",
      "hur mycket kan man spara på solceller",
      "solceller hur mycket sparar man",
      "hur mycket sparar man på solpaneler",
      "hur mycket tjänar man på solpaneler"
    ],
    sources: [
      {
        title: "Skatt på el (skattesats 2026)",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/foretag/skatterochavdrag/punktskatter/energiskatter/skattpael"
      },
      {
        title: "Säkringsabonnemang – priser från 1 juni 2026",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/globalassets/content/priserabonnemang-pdf/2026/sakring/sakringsabonnemang-16-63a_260601.pdf"
      },
      {
        title: "Mikroproduktion av förnybar el – privatbostad",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/inkomsterfranbostad/mikroproduktionavfornybarelprivatbostad.4.12815e4f14a62bc048f41a7.html"
      },
      {
        title: "Solelkalkylen",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vad-kostar-det/solelkalkyl/"
      },
      {
        title: "Löpande intäkter efter installation",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vilka-stod-och-intakter-kan-jag-fa/lopande-intakter-efter-installation/"
      }
    ],
    related: [
      "aterbetalningstid-solceller",
      "ersattning-for-sald-solel",
      "skatt-pa-sald-solel",
      "lonar-sig-solceller",
      "solceller-utan-batteri"
    ],
    concepts: [
      "sjalvforbrukning",
      "spotprisstyrning"
    ],
    links: [
      {
        href: "/kalkylator",
        label: "Räkna på ditt hus i kalkylatorn"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "nar-lonar-sig-solceller-inte",
    category: "kostnad-och-lonsamhet",
    question: "När lönar sig solceller inte?",
    description: "När taket är skuggat eller snart ska läggas om, priset per kWp är högt eller du använder lite el dagtid. Utan 60-öringen är överskottet mindre värt.",
    shortAnswer: "Solceller lönar sig dåligt när taket är skuggat eller vänt långt från söder, när taket snart måste läggas om, när anläggningen är dyr per kWp eller när du använder lite el medan solen lyser. Sedan skattereduktionen för såld el slopades 2026 är överskottet också mindre värt.",
    body: [
      {
        h2: "Varningssignaler i kalkylen",
        paragraphs: [
          "Var särskilt uppmärksam på följande:"
        ],
        bullets: [
          "Skugga och väderstreck. Skuggor kan ha stor påverkan på produktionen, enligt Energimyndigheten. Tak mot syd, sydost eller sydväst ger högre årsproduktion än andra väderstreck.",
          "Gammalt tak. Solceller håller oftast minst 25–30 år, och Energimyndigheten menar att det passar bra att skaffa solceller när taket ändå läggs om. Då kan du få rotavdrag för takarbetet och grönt avdrag för solcellerna.",
          "Högt pris. Priset per kWp skiljer sig mycket mellan leverantörer och slår direkt på återbetalningstiden.",
          "Lite elanvändning dagtid. Överskottet säljs, och sedan skattereduktionen på 60 öre/kWh slopades den 1 januari 2026 ger det mindre. En anläggning som är stor i förhållande till din elanvändning ger då mycket överskott.",
          "Lågt elpris. Tibber räknar med 45–55 öre/kWh i SE1 och SE2 mot 100–110 öre i SE3 och SE4 under oktober–december 2026, så solel sparar mindre i norr.",
          "För lite skatt. Grönt avdrag kräver att du har betalat tillräckligt med skatt under året."
        ]
      }
    ],
    searchPhrases: [
      "när lönar det sig inte med solceller",
      "solceller lönar sig inte",
      "solceller är inte lönsamt"
    ],
    sources: [
      {
        title: "Så undersöker du förutsättningarna för solel",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/sa-undersoker-du-forutsattningarna/"
      },
      {
        title: "Så undersöker du taket",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/sa-undersoker-du-taket/"
      },
      {
        title: "Så fungerar skattereduktionen för grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/safungerarskattereduktionenforgronteknik.4.676f4884175c97df4192870.html"
      },
      {
        title: "Mikroproduktion av förnybar el – privatbostad",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/inkomsterfranbostad/mikroproduktionavfornybarelprivatbostad.4.12815e4f14a62bc048f41a7.html"
      },
      {
        title: "Så blir elpriserna hösten och vintern 2026",
        publisher: "Tibber",
        url: "https://tibber.com/se/magazine/power-hacks/elpriser-host-vinter"
      }
    ],
    related: [
      "lonar-sig-solceller",
      "skugga-pa-solceller",
      "byta-tak-innan-solceller",
      "vaderstreck-och-lutning",
      "aterbetalningstid-solceller"
    ],
    concepts: [
      "sjalvforbrukning"
    ],
    links: [
      {
        href: "/guider/aterbetalningstid-solceller",
        label: "Guide: Återbetalningstid på solceller 2026"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "vad-kostar-solceller-med-batteri",
    category: "kostnad-och-lonsamhet",
    question: "Vad kostar solceller med batteri?",
    description: "Med Optimera Energis priser cirka 86 000–107 000 kr efter avdrag för 7 kWp och 10 kWh batteri. Med Energimyndighetens solpris cirka 147 000–167 000 kr.",
    shortAnswer: "Med Optimera Energis egna priser kostar 14 paneler (cirka 7 kWp) och ett batteri på 10 kWh ungefär 86 000–107 000 kronor efter grönt avdrag. Med Energimyndighetens prisexempel för solcellerna blir samma paket cirka 147 000–167 000 kronor. Båda förutsätter att hela avdraget ryms inom taket.",
    body: [
      {
        h2: "Priser för solceller och batteri till en villa",
        paragraphs: [
          "Optimera Energis riktpriser är 6 300–8 000 kronor per kWp efter avdrag för solceller. Ett batteri på 10 kWh kostar hos företaget cirka 70 000–110 000 kronor och ett på 20–30 kWh cirka 130 000–200 000 kronor, installerat och före avdrag. Installatören Elkontakten anger liknande batteripriser: 70 000–110 000 kronor för 10 kWh och 120 000–180 000 kronor för 20 kWh. Enligt Elkontakten beror spannet bland annat på om batteriet ska kunna ge reservkraft vid strömavbrott.",
          "Exemplet ovan bygger på 50 000 kronor för solcellerna efter avdrag, eller cirka 110 000 kronor med Energimyndighetens prisexempel (92 500 kronor för 5 kW före avdrag, omräknat till 7 kW). Vid fast pris ger batteriet 48,5 procent avdrag och solcellerna 14,55 procent av totalpriset."
        ]
      },
      {
        h2: "Avdragstaket kan höja priset",
        paragraphs: [
          "Grönt avdrag (skattereduktion för grön teknik) är högst 50 000 kronor per person och år, och du behöver ha betalat tillräckligt med skatt. I exemplet med Optimera Energis priser blir avdraget cirka 42 000–62 000 kronor, så en ensam ägare kan slå i taket och få betala mer. Är ni två ägare kan avdraget delas. Batteriet ger bara avdrag om det är kopplat till egen solelproduktion.",
          "Senergia bedömer att risken för stigande priser är större för batterier än för paneler, bland annat eftersom Kinas exportmomsrabatt för batterier avvecklas helt den 1 januari 2027."
        ]
      }
    ],
    searchPhrases: [
      "vad kostar solceller med batteri",
      "hur mycket kostar solceller med batteri",
      "hur mycket kostar solceller och batteri",
      "solceller med batteri pris",
      "solceller batteri kostnad",
      "kostnad solceller med batteri",
      "solpaneler med batteri pris",
      "vad kostar solceller med batteri till villa"
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
        title: "Batterilager villa kostnad 2026",
        publisher: "Elkontakten (elinstallation.nu)",
        url: "https://elinstallation.nu/kunskapsbank/batterilager-villa-kostnad"
      },
      {
        title: "Välj en anläggning som passar dina behov",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/valj-en-anlaggning-som-passar-dina-behov/"
      },
      {
        title: "Vad händer med priset på solpaneler och batterier hösten 2026?",
        publisher: "Senergia",
        url: "https://senergia.se/teknikblogg/vad-hander-med-priset-pa-solpaneler-och-batterier-hosten-2026/"
      }
    ],
    related: [
      "vad-kostar-solceller",
      "bidrag-for-solceller",
      "solceller-utan-batteri",
      "aterbetalningstid-solceller"
    ],
    concepts: [
      "gront-avdrag-for-batteri",
      "dimensionering",
      "batteriets-intaktskallor"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri: pris, storlek och märken"
      },
      {
        href: "/guider/solceller-pris-2026-stockholm",
        label: "Guide: Vad kostar solceller i Stockholm 2026?"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "vad-kostar-solceller",
    category: "kostnad-och-lonsamhet",
    question: "Vad kostar solceller till en villa 2026?",
    description: "Cirka 6 300–21 000 kr per kWp efter grönt avdrag, beroende på leverantör. Energimyndighetens exempel: cirka 79 000 kr för 5 kW. Jämför offerter per kWp.",
    shortAnswer: "En villaanläggning kostar 2026 ungefär 6 300–21 000 kronor per kWp (installerad effekt) efter grönt avdrag, beroende på leverantör. Energimyndighetens prisexempel blir cirka 79 000 kronor efter avdrag för 5 kW, medan Optimera Energis riktpris är cirka 50 000 kronor för 14 paneler (7 kWp).",
    body: [
      {
        h2: "Därför skiljer sig priserna så mycket",
        paragraphs: [
          "Energimyndigheten räknar med ungefär 92 500 kronor inklusive moms, före avdrag, för en anläggning på 5 kW, vilket myndigheten beskriver som rimligt för en vanlig villa. Installatören Elkontakten anger 18 000–25 000 kronor per kW inklusive moms och före avdrag för 2026. Optimera Energis egna riktpriser för Stockholm är 6 300–8 000 kronor per kWp efter avdrag. Det är företagets priser, inte ett marknadssnitt.",
          "Priset påverkas bland annat av anläggningens storlek, vilken leverantör du väljer, typen av solceller och hur svår installationen på taket är. Större anläggningar blir oftast billigare per kW."
        ]
      },
      {
        h2: "Så jämför du offerter",
        paragraphs: [
          "Energimyndigheten rekommenderar att du tar in offerter från minst tre leverantörer och jämför priset per installerad kW. Kontrollera också:"
        ],
        bullets: [
          "Vad som ingår, till exempel montage, byggställning och lyft av material.",
          "Fabrikat och modellnummer för paneler, växelriktare och montagesystem.",
          "Om priset gäller före eller efter grönt avdrag."
        ]
      },
      {
        h2: "Blir det billigare om jag väntar?",
        paragraphs: [
          "Det är osäkert. Grossisten Senergia bedömde i september 2026 att mycket talar för att priserna på solpaneler har slutat falla, bland annat med hänvisning till att Kina tog bort sin exportmomsrabatt för solcellsprodukter den 1 april 2026."
        ]
      }
    ],
    searchPhrases: [
      "vad kostar solceller till villa",
      "hur mycket kostar solceller",
      "vad kostar solceller idag",
      "hur mycket kostar solceller på tak",
      "vad kostar solpaneler",
      "vad kostar solceller 2026",
      "hur mycket kostar solceller till en villa",
      "solceller pris 2026",
      "kostnad solceller villa",
      "hur mycket kostar solpaneler"
    ],
    sources: [
      {
        title: "Välj en anläggning som passar dina behov",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/valj-en-anlaggning-som-passar-dina-behov/"
      },
      {
        title: "Hjälp vid jämförelse av leverantörer och anbud",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vad-ska-jag-tanka-pa-vid-inkop-och-val-av-leverantor/hjalp-vid-jamforelse-av-leverantorer-och-anbud/"
      },
      {
        title: "Solceller villa 2026: så mycket producerar de och lönar det sig?",
        publisher: "Elkontakten (elinstallation.nu)",
        url: "https://elinstallation.nu/kunskapsbank/solceller-villa-guide-2026"
      },
      {
        title: "Vad händer med priset på solpaneler och batterier hösten 2026?",
        publisher: "Senergia",
        url: "https://senergia.se/teknikblogg/vad-hander-med-priset-pa-solpaneler-och-batterier-hosten-2026/"
      }
    ],
    related: [
      "solceller-pris-per-kwp-och-kvadratmeter",
      "vad-kostar-solceller-med-batteri",
      "bidrag-for-solceller",
      "lonar-sig-solceller",
      "hur-manga-solpaneler-behover-jag"
    ],
    concepts: [],
    links: [
      {
        href: "/guider/solceller-pris-2026-stockholm",
        label: "Guide: Vad kostar solceller i Stockholm 2026?"
      },
      {
        href: "/kalkylator",
        label: "Räkna på ditt hus i kalkylatorn"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "aterbetalningstid-solceller",
    category: "kostnad-och-lonsamhet",
    question: "När lönar sig solceller – hur lång är återbetalningstiden?",
    description: "Optimera Energi anger 8–11 år, Elkontakten 10–14 år. I ett räkneexempel tar 7 kWp cirka 8,5 år att betala med lågt pris och 19 år med högt.",
    shortAnswer: "Bedömningarna går isär: Optimera Energi anger 8–11 år för en ren solanläggning i Stockholm och installatören Elkontakten 10–14 år. Priset avgör mycket – i exemplet nedan tar samma anläggning cirka 8,5 år att betala med ett lågt pris och cirka 19 år med ett högt.",
    body: [
      {
        h2: "Räkneexempel: 7 kWp i Stockholm",
        paragraphs: [
          "Exempel med antagandena 7 000 kWh produktion per år, 35 procent egenanvändning (Optimera Energi räknar med 30–40 procent utan batteri) och ett spotpris (elbörsens pris) på 55 öre/kWh, samma nivå som Energimyndigheten antar för såld el. Varje egenanvänd kWh är då värd cirka 1,40 kronor (spotpris med moms, energiskatt 45 öre och Ellevios överföringsavgift 26 öre, båda inklusive moms) och varje såld kWh cirka 55 öre. Det ger cirka 5 900 kronor per år. Nettopriserna nedan är efter grönt avdrag."
        ],
        bullets: [
          "Nettopris 50 000 kronor (Optimera Energis riktpris för 14 paneler): cirka 8,5 år.",
          "Nettopris 110 000 kronor (Energimyndighetens snittpris 2024, 18 400 kronor per kW före avdrag): cirka 19 år."
        ]
      },
      {
        h2: "Med batteri",
        paragraphs: [
          "Optimera Energi anger 4–7,5 år för en helt ny sol- och batterianläggning och 2–5 år för ett batteri till befintliga solceller. Grossisten Senergia beskriver 7–9 år för solceller med batteri som en rimlig arbetskalkyl i ett typfall, men betonar att det är en kalkyl och inte ett löfte."
        ]
      },
      {
        h2: "Går det att räkna hem solceller?",
        paragraphs: [
          "Ja, om återbetalningstiden är klart kortare än livslängden. Panelerna håller i regel 25–30 år, och Energimyndighetens solelkalkyl räknar med 30 års ekonomisk livslängd. Ränta och reparationer förlänger tiden, medan högre elpris och mer egenanvändning kortar den."
        ]
      }
    ],
    searchPhrases: [
      "när lönar sig solceller",
      "när lönar det sig med solceller",
      "går det att räkna hem solceller",
      "solceller återbetalningstid",
      "återbetalningstid solceller 2026",
      "solpaneler återbetalningstid",
      "återbetalningstid solceller med batteri",
      "när är det lönsamt med solceller"
    ],
    sources: [
      {
        title: "Skatt på el (skattesats 2026)",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/foretag/skatterochavdrag/punktskatter/energiskatter/skattpael"
      },
      {
        title: "Säkringsabonnemang – priser från 1 juni 2026",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/globalassets/content/priserabonnemang-pdf/2026/sakring/sakringsabonnemang-16-63a_260601.pdf"
      },
      {
        title: "Solelkalkylen",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vad-kostar-det/solelkalkyl/"
      },
      {
        title: "Solceller villa 2026: så mycket producerar de och lönar det sig?",
        publisher: "Elkontakten (elinstallation.nu)",
        url: "https://elinstallation.nu/kunskapsbank/solceller-villa-guide-2026"
      },
      {
        title: "Vad händer med priset på solpaneler och batterier hösten 2026?",
        publisher: "Senergia",
        url: "https://senergia.se/teknikblogg/vad-hander-med-priset-pa-solpaneler-och-batterier-hosten-2026/"
      }
    ],
    related: [
      "lonar-sig-solceller",
      "hur-mycket-sparar-man-pa-solceller",
      "vad-kostar-solceller",
      "hur-lange-haller-solceller",
      "vad-kostar-solceller-med-batteri"
    ],
    concepts: [
      "batteriets-intaktskallor",
      "sjalvforbrukning"
    ],
    links: [
      {
        href: "/guider/aterbetalningstid-solceller",
        label: "Guide: Återbetalningstid på solceller 2026"
      },
      {
        href: "/kalkylator",
        label: "Räkna på ditt hus i kalkylatorn"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "lonar-sig-solceller",
    category: "kostnad-och-lonsamhet",
    question: "Lönar sig solceller 2026?",
    description: "Det kan löna sig, men marginalerna är mindre 2026 när 60-öringen är borta. Pris per kWp, egenanvändning, elområde och elpris avgör kalkylen.",
    shortAnswer: "Solceller kan fortfarande löna sig 2026, men marginalerna är mindre än tidigare eftersom skattereduktionen på 60 öre/kWh för såld el är borta. Kalkylen avgörs främst av priset per kWp, hur mycket av solelen du använder själv, ditt elområde och elpriset.",
    body: [
      {
        h2: "Det här avgör kalkylen",
        paragraphs: [
          "Fyra faktorer avgör kalkylen:"
        ],
        bullets: [
          "Pris. Efter avdrag varierar priset mellan leverantörer från cirka 6 300 till 21 000 kronor per kWp, och det slår direkt på återbetalningstiden.",
          "Egenanvändning, alltså den del av solelen du använder själv. Den ersätter elpris, energiskatt, nätavgift och moms, medan såld el ger ungefär spotpriset (elbörsens pris). En vanlig villa använder 20–50 procent av solelen själv, enligt Energimyndigheten.",
          "Elområde. Tibbers prognos för oktober–december 2026 är 100–110 öre/kWh i SE3 (Stockholm) och SE4 (Malmö) men 45–55 öre i SE1 (Luleå) och SE2 (Sundsvall). Ju lägre elpris, desto mindre är varje egenanvänd kWh värd.",
          "Regler. Skattereduktionen för såld el slopades den 1 januari 2026, så överskottet är mindre värt än förut."
        ]
      },
      {
        h2: "Bedömningarna skiljer sig",
        paragraphs: [
          "Optimera Energi anger 8–11 års återbetalningstid för en ren solanläggning i Stockholm, medan installatören Elkontakten anger 10–14 år för villor 2026. Panelerna håller i regel 25–30 år. Som investering bör du jämföra med vad pengarna annars kunde ge: Energimyndigheten anger 1–4 procent som rimlig kalkylränta efter inflation för en privatperson.",
          "Sverige har mindre solinstrålning än länder närmare ekvatorn, men södra Sverige har ungefär lika mycket som norra Tyskland. Ett skuggfritt tak i söderläge ger normalt 800–1 100 kWh per kW och år."
        ]
      }
    ],
    searchPhrases: [
      "lönar sig solceller",
      "lönar sig solceller 2026",
      "är det lönt med solceller",
      "ska man ha solceller",
      "är solpaneler en bra investering",
      "lönar sig solceller i sverige",
      "lönar det sig med solceller 2026",
      "är det lönsamt med solceller",
      "solceller lönsamt 2026",
      "lönar sig solpaneler"
    ],
    sources: [
      {
        title: "Mikroproduktion av förnybar el – privatbostad",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/inkomsterfranbostad/mikroproduktionavfornybarelprivatbostad.4.12815e4f14a62bc048f41a7.html"
      },
      {
        title: "Solelkalkylen",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vad-kostar-det/solelkalkyl/"
      },
      {
        title: "Så blir elpriserna hösten och vintern 2026",
        publisher: "Tibber",
        url: "https://tibber.com/se/magazine/power-hacks/elpriser-host-vinter"
      },
      {
        title: "Solceller villa 2026: så mycket producerar de och lönar det sig?",
        publisher: "Elkontakten (elinstallation.nu)",
        url: "https://elinstallation.nu/kunskapsbank/solceller-villa-guide-2026"
      },
      {
        title: "Så undersöker du förutsättningarna för solel",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/sa-undersoker-du-forutsattningarna/"
      }
    ],
    related: [
      "aterbetalningstid-solceller",
      "hur-mycket-sparar-man-pa-solceller",
      "nar-lonar-sig-solceller-inte",
      "vad-kostar-solceller",
      "ersattning-for-sald-solel"
    ],
    concepts: [
      "sjalvforbrukning",
      "batteriets-intaktskallor"
    ],
    links: [
      {
        href: "/guider/aterbetalningstid-solceller",
        label: "Guide: Återbetalningstid på solceller 2026"
      },
      {
        href: "/kalkylator",
        label: "Räkna på ditt hus i kalkylatorn"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solceller-och-direktverkande-el",
    category: "kostnad-och-lonsamhet",
    question: "Passar solceller om man har direktverkande el?",
    description: "Ja, solelen kan driva elementen, men panelerna ger lite el på vintern när värmebehovet är stort. De täcker främst hushållsel och en del vår- och höstvärme.",
    shortAnswer: "Ja. Solcellerna kopplas till husets elcentral, så solelen kan användas av allt i huset, även elementen. Men värmebehovet ligger främst på vintern, när panelerna ger lite el, så solcellerna täcker främst el som används året runt och en del av värmen vår och höst.",
    body: [
      {
        h2: "Mycket el att ersätta – men vid fel tid på året",
        paragraphs: [
          "En villa med elvärme använder cirka 20 000 kWh per år, enligt Energimyndigheten, så det finns gott om köpt el att ersätta. Men bara en mycket liten del av solcellernas årsproduktion kommer under vintern. När panelerna producerar mer än huset använder för stunden går överskottet ut på nätet, eller in i ett batteri om du har ett.",
          "Ett batteri flyttar solel från dag till kväll, men inte från sommar till vinter. Att bli helt självförsörjande skulle enligt Energimyndigheten kräva mycket stor lagringskapacitet och bli mycket kostsamt."
        ]
      },
      {
        h2: "Se över uppvärmningen samtidigt",
        paragraphs: [
          "Funderar du också på att byta uppvärmning kan Boverkets bidrag för energieffektivisering i småhus, den så kallade villaeffekten, ge 30 procent av materialkostnaden, högst 60 000 kronor, för bland annat vattenburen värme och luft-vatten- eller bergvärmepump. Bidraget gäller permanentbostäder med värdeår (ofta byggåret) före 1990 som inte har fjärrvärme. Solceller omfattas inte."
        ]
      }
    ],
    searchPhrases: [
      "kan man ha solceller till direktverkande el",
      "solceller direktverkande el",
      "solceller i hus med direktverkande el"
    ],
    sources: [
      {
        title: "Bättre ekonomi med rätt anläggningsstorlek",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/battre-ekonomi-med-ratt-anlaggningsstorlek/"
      },
      {
        title: "Drift och underhåll av din solcellsanläggning",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/drift-och-underhall-av-din-solcellsanlaggning/"
      },
      {
        title: "Det här ingår i en solcellsanläggning",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/det-har-ingar-i-en-solcellsanlaggning/"
      },
      {
        title: "Koppla batterier till solcellerna",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/batterier-kopplat-till-solceller/"
      },
      {
        title: "Bidrag för energieffektivisering i småhus",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/bidrag--garantier/bidrag-for-energieffektivisering-i-smahus/"
      }
    ],
    related: [
      "solceller-pa-vintern",
      "solceller-och-varmepump",
      "kan-man-bli-sjalvforsorjande-pa-el",
      "lonar-sig-solceller"
    ],
    concepts: [
      "sjalvforbrukning"
    ],
    links: [
      {
        href: "/kalkylator",
        label: "Räkna på ditt hus i kalkylatorn"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "bidrag-for-solceller",
    category: "kostnad-och-lonsamhet",
    question: "Får man bidrag för solceller 2026?",
    description: "Inget bidrag, men grönt avdrag: 15 % av arbete och material (14,55 % av totalpriset) dras direkt på fakturan. Tak 50 000 kr per person och år.",
    shortAnswer: "Det finns inget statligt solcellsbidrag 2026, men du kan få grönt avdrag: 15 procent av kostnaden för arbete och material, vilket blir 14,55 procent av totalpriset vid fast pris. Avdraget dras direkt på fakturan och taket är 50 000 kronor per person och år.",
    body: [
      {
        h2: "Så fungerar grönt avdrag för solceller",
        paragraphs: [
          "Sedan 2021 är det grönt avdrag som gäller för solceller – ett skatteavdrag som Skatteverket kallar skattereduktion för installation av grön teknik. Avdraget är 15 procent för solceller och 50 procent för batterier som lagrar egenproducerad el och för laddboxar. Vid fast pris räknas 97 procent av totalpriset som arbete och material, så i praktiken blir avdraget 14,55 procent av fakturan för solceller och 48,5 procent för batteri och laddbox.",
          "Hur mycket får man tillbaka? Kostar anläggningen 100 000 kronor till fast pris blir avdraget 14 550 kronor, och du betalar 85 450 kronor. Installatören drar av beloppet direkt på fakturan och begär sedan pengarna från Skatteverket, så du behöver inte ligga ute med dem. Taket är 50 000 kronor per person och år, så äger ni huset tillsammans har ni varsitt tak."
        ]
      },
      {
        h2: "Villkor att känna till",
        paragraphs: [
          "Avdraget gäller bara när vissa villkor är uppfyllda:"
        ],
        bullets: [
          "Du äger småhuset eller ägarlägenheten, eller har bostadsrätten, och installationen görs för ditt eget hushåll eller dina föräldrars. För bostadsrätt ska installationen vara kopplad till just din lägenhet och följa med vid en försäljning.",
          "Anläggningen ska vara nätansluten, och installationen färdigställd och slutbetald.",
          "Bara arbete och material räknas – inte frakt, resor, maskiner eller projektering."
        ]
      }
    ],
    searchPhrases: [
      "får man bidrag för solceller",
      "får man bidrag för solceller 2026",
      "får man skatteavdrag för solceller",
      "hur mycket får man tillbaka på solceller"
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
      }
    ],
    related: [
      "vad-kostar-solceller",
      "lonar-sig-solceller",
      "skatt-pa-sald-solel",
      "vad-kostar-solceller-med-batteri"
    ],
    concepts: [
      "gront-avdrag-for-batteri"
    ],
    links: [
      {
        href: "/guider/gront-avdrag-2026",
        label: "Guide: Grönt avdrag 2026"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solceller-pris-per-kwp-och-kvadratmeter",
    category: "kostnad-och-lonsamhet",
    question: "Vad kostar solceller per kWp, kvadratmeter och kWh?",
    description: "Efter avdrag cirka 6 300–21 000 kr per kWp, 1 400–4 800 kr per m² med moderna paneler och 20–70 öre per producerad kWh. Jämför helst per kWp.",
    shortAnswer: "Efter grönt avdrag kostar solceller ungefär 6 300–21 000 kronor per kWp, beroende på leverantör. Med moderna paneler motsvarar det cirka 1 400–4 800 kronor per kvadratmeter, och fördelat på 30 års produktion ungefär 20–70 öre per producerad kWh.",
    body: [
      {
        h2: "Per kWp: så jämför du offerter",
        paragraphs: [
          "kWp är anläggningens installerade toppeffekt. Energimyndigheten rekommenderar att du jämför offerter i kronor per installerad kW, eftersom panelernas verkningsgrad redan ingår i det måttet. Myndighetens prisexempel, 92 500 kronor för 5 kW före avdrag, motsvarar cirka 15 800 kronor per kW efter avdrag. Installatören Elkontakten anger 18 000–25 000 kronor per kW före avdrag, cirka 15 400–21 400 kronor efter. Optimera Energis riktpris i Stockholm är 6 300–8 000 kronor per kWp efter avdrag, lägre per kWp ju större anläggningen är."
        ]
      },
      {
        h2: "Per kvadratmeter",
        paragraphs: [
          "En modern panel på 500 W mäter cirka 1,95 × 1,13 meter, alltså ungefär 2,2 m² per panel och 4,4 m² per kWp. Dela kWp-priset med 4,4 så får du ett ungefärligt pris per m². Med Optimera Energis riktpris blir det cirka 1 400–1 800 kronor per m². Eftersom priset per m² beror på panelernas effekt är kWp ett säkrare jämförelsetal."
        ]
      },
      {
        h2: "Per producerad kWh",
        paragraphs: [
          "Exempel, med antagandet att varje kWp ger 1 000 kWh per år i 30 år: 7 kWp för 50 000 kronor ger cirka 24 öre per kWh, och 7 kWp för 110 000 kronor (ungefär Energimyndighetens prisnivå) cirka 52 öre. Energimyndigheten anger 800–1 100 kWh per kW och år och räknar med 30 års ekonomisk livslängd. Ränta och reparationer, till exempel en ny växelriktare efter omkring 15 år, höjer kostnaden något."
        ]
      }
    ],
    searchPhrases: [
      "vad kostar solceller per kwh",
      "hur mycket kostar solceller per m2",
      "vad kostar solceller per m2",
      "hur mycket kostar solceller per kvadratmeter",
      "solceller pris per kw",
      "solceller kostnad per kw",
      "solceller kostnad per kvadratmeter",
      "solpaneler pris per m2",
      "solceller pris per kwh",
      "vad kostar solceller per kvm"
    ],
    sources: [
      {
        title: "Hjälp vid jämförelse av leverantörer och anbud",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vad-ska-jag-tanka-pa-vid-inkop-och-val-av-leverantor/hjalp-vid-jamforelse-av-leverantorer-och-anbud/"
      },
      {
        title: "Välj en anläggning som passar dina behov",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/valj-en-anlaggning-som-passar-dina-behov/"
      },
      {
        title: "Solceller villa 2026: så mycket producerar de och lönar det sig?",
        publisher: "Elkontakten (elinstallation.nu)",
        url: "https://elinstallation.nu/kunskapsbank/solceller-villa-guide-2026"
      },
      {
        title: "JA Solar JAM60D41-500/LB – produktdata (1 953 × 1 134 mm, 27,3 kg)",
        publisher: "BayWa r.e. Solar Distribution",
        url: "https://solar-distribution.baywa-re.pl/en/pv-modules/ja-solar-jam60d41-500lb-fb-bifacial.html"
      },
      {
        title: "Solelkalkylen",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vad-kostar-det/solelkalkyl/"
      }
    ],
    related: [
      "vad-kostar-solceller",
      "vad-ar-kwp",
      "solpanel-matt-och-vikt",
      "hur-mycket-el-producerar-solceller"
    ],
    concepts: [
      "kw-och-kwh"
    ],
    links: [
      {
        href: "/guider/solceller-pris-2026-stockholm",
        label: "Guide: Vad kostar solceller i Stockholm 2026?"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solceller-med-fjarrvarme",
    category: "kostnad-och-lonsamhet",
    question: "Lönar sig solceller om man har fjärrvärme?",
    description: "Ja, med en mindre anläggning. En villa med fjärrvärme använder cirka 5 000 kWh el per år, så dimensionera efter hushållselen och använd solelen dagtid.",
    shortAnswer: "Ja, det kan löna sig, men anläggningen bör vara mindre än i ett elvärmt hus. Med fjärrvärme går solelen bara till hushållsel och till exempel elbilsladdning, ofta omkring 5 000 kWh per år, och överskottet säljs för ungefär spotpriset.",
    body: [
      {
        h2: "Dimensionera efter elanvändningen",
        paragraphs: [
          "Energimyndigheten anger att en villa med fjärrvärme eller värmepump använder omkring 5 000 kWh el per år, mot cirka 20 000 kWh för en villa med elvärme. Solcellerna påverkar inte fjärrvärmeräkningen, bara elen du köper.",
          "Energimyndigheten nämner en vanlig tumregel: välj en anläggning som producerar nästan lika mycket el som du använder på ett år. För en villa med fjärrvärme blir det runt 5 kW, som i ett bra läge utan skugga ger cirka 4 000–5 500 kWh per år. Är lönsamheten det enda målet bör anläggningen enligt myndigheten inte överproducera i förhållande till användningen."
        ]
      },
      {
        h2: "Använd mer av solelen själv",
        paragraphs: [
          "Solelen används direkt bara när huset förbrukar el samtidigt. Resten går ut på nätet, och sedan skattereduktionen på 60 öre/kWh slopades den 1 januari 2026 är överskottet mindre värt. Därför kan det löna sig att lägga tvätt, disk och elbilsladdning dagtid, eller att komplettera med ett batteri. Tänk också på att små anläggningar ofta kostar mer per kW."
        ]
      }
    ],
    searchPhrases: [
      "lönar sig solceller om man har fjärrvärme"
    ],
    sources: [
      {
        title: "Bättre ekonomi med rätt anläggningsstorlek",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/battre-ekonomi-med-ratt-anlaggningsstorlek/"
      },
      {
        title: "Välj en anläggning som passar dina behov",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/valj-en-anlaggning-som-passar-dina-behov/"
      },
      {
        title: "Fördjupning om löpande intäkter",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vilka-stod-och-intakter-kan-jag-fa/fordjupning-om-lopande-intakter/"
      },
      {
        title: "Mikroproduktion av förnybar el – privatbostad",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/inkomsterfranbostad/mikroproduktionavfornybarelprivatbostad.4.12815e4f14a62bc048f41a7.html"
      }
    ],
    related: [
      "hur-manga-solpaneler-behover-jag",
      "lonar-sig-solceller",
      "solceller-for-att-ladda-elbil",
      "solceller-utan-batteri"
    ],
    concepts: [
      "sjalvforbrukning",
      "dimensionering"
    ],
    links: [
      {
        href: "/kalkylator",
        label: "Räkna på ditt hus i kalkylatorn"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "skugga-pa-solceller",
    category: "produktion-och-teknik",
    question: "Hur påverkar skugga solceller?",
    description: "Skugga kan sänka produktionen mer än den skuggade ytan antyder, eftersom cellerna är seriekopplade. Dioder, optimerare och rätt koppling minskar förlusten.",
    shortAnswer: "Skugga kan sänka produktionen betydligt mer än den skuggade ytan antyder, eftersom cellerna i en panel är seriekopplade. Redan skuggan från en skorsten, ett träd eller en flaggstång märks, så ett skuggfritt läge är det säkraste.",
    body: [
      {
        h2: "Därför slår skugga hårt",
        paragraphs: [
          "I en seriekoppling styrs strömmen av den svagaste länken. Även när panelen bara är delvis skuggad, till exempel över en enda cell, påverkas därför en större del av den, ibland hela panelen. Panelerna har förbikopplingsdioder, så kallade bypassdioder, som leder strömmen förbi en skuggad grupp av celler, men den gruppens el går förlorad. Sitter flera paneler i samma sträng kan en skuggad panel också dra ner de andra.",
          "Skuggor flyttar sig över dagen och året. På vintern står solen lågt och skuggorna blir långa, men då är produktionen liten ändå."
        ]
      },
      {
        h2: "Så minskar du förlusten",
        paragraphs: [
          "Det finns några sätt att begränsa skadan:"
        ],
        bullets: [
          "Lägg panelerna där det är skuggfritt, och lämna hellre en skuggad del av taket tom.",
          "Låt skuggade paneler, eller takfall med olika riktning, gå till egna ingångar på växelriktaren. Varje ingång optimeras då för sig.",
          "Moduloptimerare eller mikroväxelriktare styr varje panel separat, så att en skuggad panel inte drar ner resten. De kostar extra och ger fler komponenter att underhålla, så de passar främst där skugga faktiskt förekommer."
        ]
      }
    ],
    searchPhrases: [
      "solceller skugga",
      "skugga solpaneler",
      "solceller delvis skugga",
      "solceller skugga från träd",
      "solpaneler skugga"
    ],
    sources: [
      {
        title: "Så undersöker du förutsättningarna",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/sa-undersoker-du-forutsattningarna/"
      },
      {
        title: "Solceller växelriktare (test)",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/tester/tester-a-o/solceller-vaxelriktare/"
      },
      {
        title: "Långtidstest av solcellssystem för villatak",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/tester/tester-a-o/langtidstest-av-solcellssystem-for-villatak/"
      },
      {
        title: "Bypass Diodes",
        publisher: "PVEducation",
        url: "https://www.pveducation.org/pvcdrom/modules-and-arrays/bypass-diodes"
      },
      {
        title: "Mismatch Effects",
        publisher: "PVEducation",
        url: "https://www.pveducation.org/pvcdrom/modules-and-arrays/mismatch-effects"
      }
    ],
    related: [
      "vaderstreck-och-lutning",
      "vad-gor-en-vaxelriktare",
      "hur-mycket-el-producerar-solceller",
      "solceller-nar-det-ar-molnigt"
    ],
    links: [
      {
        href: "/tjanster/solpaneler",
        label: "Tjänst: solpaneler"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "vad-gor-en-vaxelriktare",
    category: "produktion-och-teknik",
    question: "Vad gör en växelriktare och hur länge håller den?",
    description: "Växelriktaren gör om panelernas likström till växelström och styr panelerna. Enligt Energimyndigheten bör den hålla 15 år eller mer – räkna med ett byte.",
    shortAnswer: "Växelriktaren gör om solpanelernas likström till växelström som huset och elnätet kan använda, och styr panelerna så att de ger mesta möjliga effekt. Energimyndigheten anger att den bör hålla cirka 15 år eller mer, så räkna med minst ett byte under panelernas livstid.",
    body: [
      {
        h2: "Det här gör växelriktaren",
        paragraphs: [
          "Växelriktaren kallas ofta solcellsanläggningens hjärta. Den har flera funktioner:"
        ],
        bullets: [
          "Omvandlar likström (DC) från panelerna till växelström (AC). Nya växelriktare har en verkningsgrad på omkring 98 procent.",
          "Söker hela tiden den arbetspunkt där panelerna ger mest effekt, så kallad MPPT. Har den flera sådana ingångar kan takfall med olika riktning eller skugga styras var för sig.",
          "Har ett skydd som hindrar anläggningen från att mata ut el på nätet vid strömavbrott. En vanlig anläggning ger därför ingen el vid avbrott; det kräver batteri och särskild styrutrustning.",
          "Visar produktion och eventuella larm, så att du kan följa att anläggningen fungerar."
        ]
      },
      {
        h2: "Typer och livslängd",
        paragraphs: [
          "I villor är en central växelriktare vanligast. Alternativen är mikroväxelriktare på varje panel eller optimerare på panelerna. Till ett batteri kan man använda en hybridväxelriktare, som hanterar både solel och batteri.",
          "Energimyndigheten anger att en växelriktare bör ha minst 5 års produktgaranti och en livslängd på cirka 15 år eller mer, medan panelerna håller 25–30 år. En kostnadsbedömning som Energimyndigheten publicerade 2018 räknar med byte efter typiskt 15 år. Sveriges äldsta solcellsanläggning, från 1984 i Huvudsta, ger i dag något mer el än när den byggdes, eftersom växelriktarna bytts mot effektivare.",
          "Tänk också på placeringen. Växelriktaren kan surra något, och Fraunhofer ISE rekommenderar att den monteras utanför sovrum och vardagsrum."
        ]
      }
    ],
    searchPhrases: [
      "vad är växelriktare solceller",
      "hur länge håller en växelriktare till solceller",
      "solceller växelriktare",
      "växelriktare solceller livslängd",
      "växelriktare solceller funktion",
      "växelriktare solceller vad är det",
      "solceller växelriktare placering"
    ],
    sources: [
      {
        title: "Det här ingår i en solcellsanläggning",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/det-har-ingar-i-en-solcellsanlaggning/"
      },
      {
        title: "Hjälp vid jämförelse av leverantörer och anbud",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vad-ska-jag-tanka-pa-vid-inkop-och-val-av-leverantor/hjalp-vid-jamforelse-av-leverantorer-och-anbud/"
      },
      {
        title: "Teknisk-ekonomisk kostnadsbedömning av solceller i Sverige",
        publisher: "Energimyndigheten (Profu, 2018)",
        url: "https://www.energimyndigheten.se/globalassets/fornybart/solenergi/ovriga-rapporter/teknisk-ekonomisk-kostnadsbedomning-av-solceller-i-sverige.pdf"
      },
      {
        title: "Drift och underhåll av din solcellsanläggning",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/drift-och-underhall-av-din-solcellsanlaggning/"
      },
      {
        title: "Aktuelle Fakten zur Photovoltaik in Deutschland (version 20.8.2026)",
        publisher: "Fraunhofer ISE",
        url: "https://www.ise.fraunhofer.de/content/dam/ise/de/documents/publications/studies/aktuelle-fakten-zur-photovoltaik-in-deutschland.pdf"
      }
    ],
    related: [
      "skugga-pa-solceller",
      "hur-lange-haller-solceller",
      "solceller-vid-stromavbrott",
      "hur-fungerar-solceller",
      "vad-ar-kwp"
    ],
    concepts: [
      "vaxelriktare-hybrid-ac-dc",
      "o-drift-och-backup"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri: pris, storlek och märken"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "hur-mycket-el-producerar-solceller",
    category: "produktion-och-teknik",
    question: "Hur mycket el producerar solceller i Sverige per år?",
    description: "Varje kWp ger 800–1 100 kWh per år i Sverige. 10 kWp i Stockholm ger cirka 9 400 kWh: runt 1 400 kWh i juni men bara cirka 100 kWh i december.",
    shortAnswer: "I Sverige ger solceller i regel 800–1 100 kWh per år för varje installerad kWp, enligt Energimyndigheten. En villaanläggning på 10 kWp producerar alltså ungefär 8 000–11 000 kWh om året, och omkring tre fjärdedelar produceras under månaderna april–september.",
    body: [
      {
        h2: "Var du bor och hur taket ligger avgör",
        paragraphs: [
          "Energimyndighetens intervall gäller paneler mot söder med 30–50 graders lutning och utan skugga. EU:s beräkningsverktyg PVGIS ger för ett tak mot söder med 30 graders lutning cirka 1 040 kWh per kWp i Malmö, 940 i Stockholm och Luleå, 910 i Göteborg och 780 i Kiruna. PVGIS räknar inte med snö, så i norr kan utfallet bli lägre.",
          "Optimera Energis kalkyler utgår från cirka 1 050 kWh per kWp för ett välplacerat tak i Stockholm. Det ligger i den övre delen av intervallet, i nivå med Energimyndighetens rapport från 2018 som anger 1 061 kWh per kW för Stockholms kustområde vid optimal lutning. En svensk utvärdering från 2017 fann dessutom att dåvarande PVGIS med standardinställningar i snitt gav 9–12 procent lägre produktion än verkliga anläggningar uppmätte. Mellan ett sämre och ett bättre solår skiljer det omkring 10 procent."
        ]
      },
      {
        h2: "Per månad och per dag",
        paragraphs: [
          "Exempel: 10 kWp i Stockholm, takmonterat mot söder med 30 graders lutning, utan skugga och med PVGIS standardförluster på 14 procent:"
        ],
        bullets: [
          "Juni: cirka 1 400 kWh, i snitt runt 47 kWh per dag och 60–70 kWh en klar dag.",
          "Mars och september: cirka 830–840 kWh per månad.",
          "December: cirka 100 kWh, i snitt drygt 3 kWh per dag.",
          "Hela året: cirka 9 400 kWh."
        ]
      }
    ],
    searchPhrases: [
      "hur mycket el producerar solceller i sverige per år",
      "hur mycket producerar solceller per dag",
      "hur mycket producerar solceller per månad",
      "hur mycket producerar 10 kw solceller",
      "hur mycket producerar solceller per år",
      "hur mycket el ger solceller",
      "solceller kwh per år",
      "solceller produktion per månad",
      "vilka månader producerar solceller"
    ],
    sources: [
      {
        title: "Välj en anläggning som passar dina behov",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/valj-en-anlaggning-som-passar-dina-behov/"
      },
      {
        title: "PVGIS – Photovoltaic Geographical Information System",
        publisher: "EU-kommissionens gemensamma forskningscentrum (JRC)",
        url: "https://re.jrc.ec.europa.eu/pvg_tools/en/"
      },
      {
        title: "PVGIS data sources & calculation methods",
        publisher: "EU-kommissionens gemensamma forskningscentrum (JRC)",
        url: "https://joint-research-centre.ec.europa.eu/photovoltaic-geographical-information-system-pvgis/getting-started-pvgis/pvgis-data-sources-calculation-methods_en"
      },
      {
        title: "Teknisk-ekonomisk kostnadsbedömning av solceller i Sverige",
        publisher: "Energimyndigheten (Profu, 2018)",
        url: "https://www.energimyndigheten.se/globalassets/fornybart/solenergi/ovriga-rapporter/teknisk-ekonomisk-kostnadsbedomning-av-solceller-i-sverige.pdf"
      }
    ],
    related: [
      "hur-mycket-producerar-en-solpanel",
      "solceller-pa-vintern",
      "vaderstreck-och-lutning",
      "hur-manga-solpaneler-behover-jag",
      "solpaneler-for-10000-och-20000-kwh"
    ],
    concepts: [
      "kw-och-kwh",
      "sjalvforbrukning"
    ],
    links: [
      {
        href: "/kalkylator",
        label: "Räkna på ditt hus i kalkylatorn"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "vaderstreck-och-lutning",
    category: "produktion-och-teknik",
    question: "Vilket väderstreck och vilken lutning är bäst för solceller?",
    description: "Söder, sydost eller sydväst med 30–50 graders lutning ger mest el. Öst eller väst ger cirka 75–85 % av det, ett flackt norrtak omkring 70–75 %.",
    shortAnswer: "Mest el per år ger paneler mot söder, sydost eller sydväst med 30–50 graders lutning. Skillnaderna är dock mindre än många tror: öster eller väster ger ungefär 75–85 procent av ett optimalt läge, och ett flackt norrtak omkring 70–75 procent.",
    body: [
      {
        h2: "Så mycket ger olika lägen",
        paragraphs: [
          "Exempel: beräknat med PVGIS för takmonterade paneler i Stockholm, som andel av bästa läge (söder, cirka 45 graders lutning):"
        ],
        bullets: [
          "Söder, 27–50 grader: 97–100 procent",
          "Sydost eller sydväst, 27 grader: cirka 91–92 procent",
          "Öster eller väster, 10–27 grader: cirka 77–79 procent",
          "Liggande plant: cirka 79 procent",
          "Norr, 10 grader: cirka 70 procent",
          "Norr, 27 grader: drygt hälften"
        ]
      },
      {
        h2: "Riktningen betyder mer än lutningen",
        paragraphs: [
          "Energimyndighetens rapport om solel i Sverige från 2018 landar på liknande nivåer: öst-väst ger 81–84 procent och flacka norrtak 73–77 procent av bästa läge, beroende på ort.",
          "Lutningen är mindre känslig. Enligt Energimyndigheten kostar 10 graders avvikelse från den optimala lutningen bara 1–2 procent av årsproduktionen. Därför följer panelerna oftast takets lutning, vilket är enklast och billigast. På platta tak vinklas de normalt upp 10–20 grader.",
          "Solceller i norrläge är undantaget. På norrsidan av taket spelar lutningen stor roll: i exemplet ovan ger panelerna omkring 70 procent vid 10 graders lutning men bara drygt hälften vid 27 grader.",
          "Läget påverkar också när elen kommer. En brantare vinkel ger mer el tidig vår och sen höst, och snön glider av lättare. Paneler mot öster eller väster ger mer el morgon och kväll, när hushållet ofta använder mest."
        ]
      }
    ],
    searchPhrases: [
      "vilket väderstreck är bäst för solceller",
      "vilken lutning ska solceller ha",
      "solceller öst väst",
      "solceller norrläge",
      "vilken lutning är bäst för solceller",
      "solceller väderstreck",
      "solceller på norrsidan",
      "solceller i öst och väst",
      "vilket väderstreck solceller"
    ],
    sources: [
      {
        title: "Så undersöker du förutsättningarna",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/sa-undersoker-du-forutsattningarna/"
      },
      {
        title: "PVGIS – Photovoltaic Geographical Information System",
        publisher: "EU-kommissionens gemensamma forskningscentrum (JRC)",
        url: "https://re.jrc.ec.europa.eu/pvg_tools/en/"
      },
      {
        title: "Teknisk-ekonomisk kostnadsbedömning av solceller i Sverige",
        publisher: "Energimyndigheten (Profu, 2018)",
        url: "https://www.energimyndigheten.se/globalassets/fornybart/solenergi/ovriga-rapporter/teknisk-ekonomisk-kostnadsbedomning-av-solceller-i-sverige.pdf"
      }
    ],
    related: [
      "hur-mycket-el-producerar-solceller",
      "skugga-pa-solceller",
      "solceller-pa-platt-tak",
      "solceller-pa-vintern",
      "hur-manga-solpaneler-behover-jag"
    ],
    concepts: [
      "sjalvforbrukning"
    ],
    links: [
      {
        href: "/kalkylator",
        label: "Räkna på ditt tak i kalkylatorn"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solceller-pa-vintern",
    category: "produktion-och-teknik",
    question: "Fungerar solceller på vintern?",
    description: "Ja, men de ger lite el. I Stockholm står november–februari för knappt 10 % av årsproduktionen och december för cirka 1 %. Snö behöver sällan skottas.",
    shortAnswer: "Ja, solceller fungerar på vintern, men de producerar lite el. I Stockholm står november–februari för knappt 10 procent av årsproduktionen och december ensam för ungefär 1 procent, medan april–september står för drygt tre fjärdedelar.",
    body: [
      {
        h2: "Därför blir det så lite",
        paragraphs: [
          "Dagarna är korta och solen står lågt. I SMHI:s mätningar i Stockholm 2016–2025 fick marken i snitt cirka 0,2 kWh solinstrålning per kvadratmeter en decemberdag, mot drygt 6 kWh en junidag. Längre norrut är skillnaden större, och i Luleå och Kiruna ger december i praktiken ingen el.",
          "Exempel: 10 kWp i Stockholm, takmonterat mot söder med 30 graders lutning, ger enligt PVGIS cirka 100 kWh i december och 1 400 kWh i juni.",
          "Kylan i sig är bra. Solceller ger mer effekt ju kallare de är, ungefär 0,3–0,4 procent per grad enligt forskningsinstitutet RISE och testlabbet Kiwa PVEL."
        ]
      },
      {
        h2: "Snö på panelerna",
        paragraphs: [
          "På snötäckta solceller stannar produktionen i stort sett av tills snön smälter eller glider av, och på lutande tak hjälper vårsolen till. Enligt Energimyndigheten behövs vanligtvis ingen snöskottning: vintern ger så lite el att kostnaden för att ta bort snön normalt överstiger värdet av elen, och du riskerar att skada panelerna eller falla från taket. Vid mycket stora snömängder kan taket ändå behöva skottas.",
          "Hur mycket snön kostar över ett år beror på ort, lutning och vinter. Där snön ligger länge kan förlusten bli större. RISE anger upp till 20 procent av årsproduktionen under nordliga förhållanden."
        ]
      }
    ],
    searchPhrases: [
      "fungerar solceller på vintern",
      "hur mycket el ger solceller på vintern",
      "hur fungerar solceller på vintern",
      "solceller snö",
      "fungerar solpaneler på vintern",
      "solceller vinter produktion",
      "hur mycket producerar solceller på vintern",
      "solceller snöskottning",
      "snötäckta solceller"
    ],
    sources: [
      {
        title: "PVGIS – Photovoltaic Geographical Information System",
        publisher: "EU-kommissionens gemensamma forskningscentrum (JRC)",
        url: "https://re.jrc.ec.europa.eu/pvg_tools/en/"
      },
      {
        title: "Globalstrålning (mätdata från SMHI:s strålningsstationer)",
        publisher: "SMHI",
        url: "https://www.smhi.se/data/solstralning/globalstralning"
      },
      {
        title: "Drift och underhåll av din solcellsanläggning",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/drift-och-underhall-av-din-solcellsanlaggning/"
      },
      {
        title: "Solar energy in northern conditions",
        publisher: "RISE Research Institutes of Sweden",
        url: "https://www.ri.se/en/story/solar-energy-in-northern-conditions"
      },
      {
        title: "PAN Performance – 2026 PV Module Reliability Scorecard",
        publisher: "Kiwa PVEL",
        url: "https://scorecard.pvel.com/pan-performance"
      }
    ],
    related: [
      "hur-mycket-el-producerar-solceller",
      "solceller-nar-det-ar-molnigt",
      "vaderstreck-och-lutning",
      "rengora-solpaneler",
      "solceller-utan-batteri"
    ],
    concepts: [
      "spotprisstyrning"
    ],
    links: [
      {
        href: "/nyheter/vinterns-elpriser-2026-prognos-dyrare-soder",
        label: "Nyhet: elprisprognosen inför vintern 2026"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "hur-fungerar-solceller",
    category: "produktion-och-teknik",
    question: "Hur fungerar solceller?",
    description: "Solceller gör om ljus till el: ljuset frigör elektroner i kisel så att likström uppstår, och växelriktaren gör om den till växelström för huset.",
    shortAnswer: "Solceller omvandlar ljus direkt till el: när solljuset träffar kiselcellerna frigörs elektroner som ett inbyggt elektriskt fält driver åt ett håll, och då uppstår likström. En växelriktare gör sedan om den till växelström som huset kan använda.",
    body: [
      {
        h2: "En enkel förklaring",
        paragraphs: [
          "Ljuset ger elektronerna i solcellen extra energi. Cellen är byggd så att elektronerna då bara kan ta sig ut åt ett håll, genom en ledning. På vägen lämnar de ifrån sig energin, till exempel i en lampa, och sedan går de tillbaka in i cellen. Det flödet av elektroner är elektrisk ström."
        ]
      },
      {
        h2: "Steg för steg: från solljus till el i huset",
        paragraphs: [
          "Så går det till i en vanlig villaanläggning:"
        ],
        bullets: [
          "Ljuset träffar solcellen, en tunn skiva av kisel. Energin i ljuset lyfter elektroner så att de kan börja röra sig.",
          "Cellen har två skikt med olika egenskaper, en så kallad pn-övergång. Där finns ett elektriskt fält som skiljer laddningarna åt, så att elektronerna flyter ut i en yttre krets som ström.",
          "En enskild cell är liten. Därför seriekopplas många celler och kapslas in bakom glas till en modul, det som i dagligt tal kallas solpanel.",
          "Panelerna ger likström. Växelriktaren gör om den till växelström och styr samtidigt panelerna så att de ger så mycket effekt som möjligt i varje ljusläge.",
          "Elen går via elcentralen ut i huset och används först där. Det som blir över matas ut på elnätet, och elmätaren mäter elen både till och från huset."
        ]
      },
      {
        h2: "Bra att veta",
        paragraphs: [
          "Solceller producerar el så fort det är ljust, även när det är mulet, men mest mitt på dagen och på sommaren. Själva panelerna går inte att stänga av så länge ljus faller på dem, så det kan finnas farlig spänning i anläggningen. Elarbete på den ska göras av ett registrerat elinstallationsföretag.",
          "Solceller ska inte förväxlas med solfångare. En solfångare tar vara på solens värme för uppvärmning och varmvatten, medan solceller gör el."
        ]
      }
    ],
    searchPhrases: [
      "hur fungerar solceller",
      "hur fungerar solceller enkel förklaring",
      "hur fungerar solceller steg för steg",
      "hur gör solceller el",
      "hur omvandlar solceller till el",
      "hur fungerar solpaneler",
      "hur producerar solceller el",
      "hur fungerar solcellsanläggning",
      "solpaneler hur funkar det"
    ],
    sources: [
      {
        title: "Det här ingår i en solcellsanläggning",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/det-har-ingar-i-en-solcellsanlaggning/"
      },
      {
        title: "Bättre ekonomi med rätt anläggningsstorlek",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/battre-ekonomi-med-ratt-anlaggningsstorlek"
      },
      {
        title: "Att tänka på vid avveckling eller flytt",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/att-tanka-pa-vid-avveckling-eller-flytt/"
      },
      {
        title: "Solar Cell Structure",
        publisher: "PVEducation",
        url: "https://www.pveducation.org/pvcdrom/solar-cell-operation/solar-cell-structure"
      },
      {
        title: "Light Generated Current",
        publisher: "PVEducation",
        url: "https://www.pveducation.org/pvcdrom/solar-cell-operation/light-generated-current"
      }
    ],
    related: [
      "vad-gor-en-vaxelriktare",
      "vad-ar-solceller-gjorda-av",
      "hur-mycket-el-producerar-solceller",
      "solceller-nar-det-ar-molnigt",
      "solceller-vid-stromavbrott"
    ],
    concepts: [
      "sjalvforbrukning"
    ],
    links: [
      {
        href: "/tjanster/solpaneler",
        label: "Tjänst: solpaneler"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "hur-mycket-producerar-en-solpanel",
    category: "produktion-och-teknik",
    question: "Hur mycket producerar en solpanel?",
    description: "En modern villapanel har 400–500 W märkeffekt och cirka 22–23 % verkningsgrad. En panel på 450 W ger 360–500 kWh per år i Sverige, beroende på läge.",
    shortAnswer: "En modern villapanel har en märkeffekt på ungefär 400–500 watt och en verkningsgrad kring 22–23 procent. I Sverige ger en panel på 450 watt i regel 360–500 kWh el per år, beroende på var du bor och hur panelen sitter.",
    body: [
      {
        h2: "Hur många watt ger en solpanel?",
        paragraphs: [
          "Effekten mäts under standardiserade testvillkor och anges i watt. Enligt Fraunhofer ISE hade nya kiselpaneler 2025 en verkningsgrad på knappt 23 procent i snitt, vilket ger cirka 230 W per kvadratmeter. Toppmodellerna ligger omkring 10 procent högre. En vanlig villapanel är runt 2 kvadratmeter och hamnar därför oftast på 400–500 W.",
          "Energimyndighetens Solelportalen anger 15–22 procent för monokristallina paneler, ett spann som även omfattar äldre modeller."
        ]
      },
      {
        h2: "Per år, per dag och per kvadratmeter",
        paragraphs: [
          "Varje kWp, alltså 1 000 W panel, ger 800–1 100 kWh per år i ett bra läge i Sverige, enligt Energimyndigheten. För solceller med dagens verkningsgrad motsvarar det ungefär 180–250 kWh per kvadratmeter panel och år.",
          "Exempel: en panel på 450 W i Stockholm, takmonterad mot söder med 30 graders lutning och utan skugga, ger enligt PVGIS cirka 420 kWh per år. En genomsnittlig junidag blir det runt 2 kWh och en decemberdag drygt 0,1 kWh."
        ]
      }
    ],
    searchPhrases: [
      "hur mycket producerar en solpanel",
      "hur mycket el producerar en solpanel per år",
      "hur mycket effekt ger en solpanel",
      "hur mycket ger solceller per m2",
      "hur mycket kwh ger en solpanel",
      "solpanel hur många watt",
      "solceller watt per m2",
      "hur mycket energi ger en solpanel",
      "solceller kwh per m2"
    ],
    sources: [
      {
        title: "Aktuelle Fakten zur Photovoltaik in Deutschland (version 20.8.2026)",
        publisher: "Fraunhofer ISE",
        url: "https://www.ise.fraunhofer.de/content/dam/ise/de/documents/publications/studies/aktuelle-fakten-zur-photovoltaik-in-deutschland.pdf"
      },
      {
        title: "Photovoltaics Report (14 juli 2026)",
        publisher: "Fraunhofer ISE",
        url: "https://www.ise.fraunhofer.de/content/dam/ise/de/documents/publications/studies/Photovoltaics-Report.pdf"
      },
      {
        title: "Välj en anläggning som passar dina behov",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/valj-en-anlaggning-som-passar-dina-behov/"
      },
      {
        title: "Det här ingår i en solcellsanläggning",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/det-har-ingar-i-en-solcellsanlaggning/"
      },
      {
        title: "PVGIS – Photovoltaic Geographical Information System",
        publisher: "EU-kommissionens gemensamma forskningscentrum (JRC)",
        url: "https://re.jrc.ec.europa.eu/pvg_tools/en/"
      }
    ],
    related: [
      "hur-mycket-el-producerar-solceller",
      "vad-ar-kwp",
      "vilka-solpaneler-ar-bast",
      "solpanel-matt-och-vikt",
      "hur-manga-solpaneler-behover-jag"
    ],
    concepts: [
      "kw-och-kwh"
    ],
    links: [
      {
        href: "/kalkylator",
        label: "Räkna på ditt hus i kalkylatorn"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "vad-ar-solceller-gjorda-av",
    category: "produktion-och-teknik",
    question: "Vad är solceller gjorda av?",
    description: "Solpaneler består mest av glas, plast och aluminium; själva solcellerna är av kisel. Ett takmonterat system väger cirka 12–15 kg per kvadratmeter.",
    shortAnswer: "Nästan alla solpaneler i dag har solceller av kisel, inkapslade bakom glas med en plastfilm och oftast en aluminiumram. Räknat i vikt är en panel mest glas; kislet utgör bara omkring 5 procent.",
    body: [
      {
        h2: "Det här finns i en panel",
        paragraphs: [
          "Enligt IRENA och IEA:s solcellsprogram (2016) består en typisk kiselpanel räknat i vikt av ungefär:"
        ],
        bullets: [
          "76 procent glas på framsidan",
          "10 procent plast: inkapslingsfilm och baksidesfolie",
          "8 procent aluminium, främst i ramen",
          "5 procent kisel i solcellerna",
          "1 procent koppar i ledarna, plus under 0,1 procent silver och andra metaller som tenn och bly"
        ]
      },
      {
        h2: "Trender, vikt och återvinning",
        paragraphs: [
          "Andelen glas väntas öka, bland annat för att kiselskivorna blir tunnare; i dag är de cirka 0,14 millimeter. Kiselbaserad teknik stod för omkring 98 procent av världsproduktionen 2025. Tunnfilmspaneler av till exempel kadmiumtellurid eller CIGS finns men är ovanliga.",
          "Ett solcellssystem monterat längs ett lutande tak väger cirka 12–15 kg per kvadratmeter inklusive montage, enligt Energimyndigheten. För en panel på runt 2 kvadratmeter blir det i storleksordningen 25 kg med montage. Villatak är byggda för 150–350 kg snö per kvadratmeter, så vikten är sällan ett problem.",
          "Panelerna innehåller små mängder bly, främst i lödningarna, och ska lämnas till återvinning, inte slängas bland hushållssoporna."
        ]
      }
    ],
    searchPhrases: [
      "vad är solceller gjorda av",
      "vad består solceller av",
      "vad innehåller solceller",
      "vad väger solceller",
      "vad är solpaneler gjorda av"
    ],
    sources: [
      {
        title: "End-of-Life Management: Solar Photovoltaic Panels (2016)",
        publisher: "IRENA och IEA-PVPS",
        url: "https://iea-pvps.org/wp-content/uploads/2020/01/IRENA_IEAPVPS_End-of-Life_Solar_PV_Panels_2016.pdf"
      },
      {
        title: "Photovoltaics Report (14 juli 2026)",
        publisher: "Fraunhofer ISE",
        url: "https://www.ise.fraunhofer.de/content/dam/ise/de/documents/publications/studies/Photovoltaics-Report.pdf"
      },
      {
        title: "Så undersöker du taket",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/sa-undersoker-du-taket/"
      },
      {
        title: "Det här ingår i en solcellsanläggning",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/det-har-ingar-i-en-solcellsanlaggning/"
      },
      {
        title: "Aktuelle Fakten zur Photovoltaik in Deutschland (version 20.8.2026)",
        publisher: "Fraunhofer ISE",
        url: "https://www.ise.fraunhofer.de/content/dam/ise/de/documents/publications/studies/aktuelle-fakten-zur-photovoltaik-in-deutschland.pdf"
      }
    ],
    related: [
      "atervinning-av-solceller",
      "solceller-och-miljon",
      "solpanel-matt-och-vikt",
      "vilka-solpaneler-ar-bast",
      "hur-fungerar-solceller"
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "vad-ar-kwp",
    category: "produktion-och-teknik",
    question: "Vad är kWp?",
    description: "kWp är solpanelernas toppeffekt vid standardtest med 1 000 W ljus per m² och 25 graders paneltemperatur. Varje kWp ger 800–1 100 kWh per år i Sverige.",
    shortAnswer: "kWp, kilowatt peak, är solpanelernas sammanlagda toppeffekt: den effekt de ger vid standardiserade testvillkor med 1 000 watt solljus per kvadratmeter och 25 graders paneltemperatur. Det är måttet på hur stor en solcellsanläggning är, till exempel 20 paneler à 450 W = 9 kWp.",
    body: [
      {
        h2: "kWp är effekt, kWh är energi",
        paragraphs: [
          "kWp säger hur mycket anläggningen kan leverera i ett visst ögonblick under testvillkoren. kWh är den energi den faktiskt producerar över tid. I Sverige ger varje kWp i regel 800–1 100 kWh per år, så 9 kWp blir ungefär 7 200–9 900 kWh.",
          "När du jämför offerter är pris per installerad kWp ett bra mått, eftersom panelernas verkningsgrad då redan är inräknad."
        ]
      },
      {
        h2: "Därför når anläggningen sällan sin toppeffekt",
        paragraphs: [
          "Testvillkoren motsvarar ungefär middagssol en klar dag med panelen riktad rakt mot solen. I verkligheten är ljuset oftast svagare och panelerna varmare än 25 grader, så effekten ligger för det mesta under 70 procent av märkeffekten. I PVGIS beräkning för ett tak i Stockholm, mot söder med 30 graders lutning, är den högsta effekten under en hel timme drygt 0,8 kW per kWp.",
          "Växelriktaren anges i kW och är ofta något mindre än panelernas kWp, eftersom panelerna så sällan når full effekt."
        ]
      }
    ],
    searchPhrases: [
      "vad är kwp solceller",
      "solcellsanläggning effekt",
      "solceller effekt"
    ],
    sources: [
      {
        title: "PVGIS data sources & calculation methods",
        publisher: "EU-kommissionens gemensamma forskningscentrum (JRC)",
        url: "https://joint-research-centre.ec.europa.eu/photovoltaic-geographical-information-system-pvgis/getting-started-pvgis/pvgis-data-sources-calculation-methods_en"
      },
      {
        title: "Aktuelle Fakten zur Photovoltaik in Deutschland (version 20.8.2026)",
        publisher: "Fraunhofer ISE",
        url: "https://www.ise.fraunhofer.de/content/dam/ise/de/documents/publications/studies/aktuelle-fakten-zur-photovoltaik-in-deutschland.pdf"
      },
      {
        title: "Välj en anläggning som passar dina behov",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/valj-en-anlaggning-som-passar-dina-behov/"
      },
      {
        title: "Hjälp vid jämförelse av leverantörer och anbud",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vad-ska-jag-tanka-pa-vid-inkop-och-val-av-leverantor/hjalp-vid-jamforelse-av-leverantorer-och-anbud/"
      },
      {
        title: "PVGIS – Photovoltaic Geographical Information System",
        publisher: "EU-kommissionens gemensamma forskningscentrum (JRC)",
        url: "https://re.jrc.ec.europa.eu/pvg_tools/en/"
      }
    ],
    related: [
      "hur-mycket-producerar-en-solpanel",
      "hur-mycket-el-producerar-solceller",
      "solceller-pris-per-kwp-och-kvadratmeter",
      "hur-manga-solpaneler-behover-jag",
      "vad-gor-en-vaxelriktare"
    ],
    concepts: [
      "kw-och-kwh"
    ],
    links: [
      {
        href: "/guider/solceller-pris-2026-stockholm",
        label: "Guide: solceller – pris 2026 i Stockholm"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solceller-nar-det-ar-molnigt",
    category: "produktion-och-teknik",
    question: "Fungerar solceller när det är molnigt?",
    description: "Ja, solceller ger el även när det är molnigt eftersom de använder spritt ljus. En mörk, mulen dag ger dock bara omkring 10–25 % av en solig dags el.",
    shortAnswer: "Ja, solceller producerar el även när det är molnigt eller mulet, eftersom de också tar vara på ljus som sprids av molnen. Men produktionen följer ljusmängden, så en mörk och mulen dag ger bara en bråkdel av en solig.",
    body: [
      {
        h2: "Spritt ljus räknas också",
        paragraphs: [
          "Solljuset når panelerna dels direkt från solen, dels som diffust ljus som spridits av moln och luft. Solceller kan använda båda. I SMHI:s mätningar i Visby, Norrköping och Kiruna 2015–2024 var 40–55 procent av årets solinstrålning diffus, och under vintermånaderna det mesta.",
          "Svagt ljus sänker inte verkningsgraden särskilt mycket. I testlabbet Kiwa PVEL:s mätningar var verkningsgraden vid 200 watt per kvadratmeter, en femtedel av testvillkorens ljus, i mediantal 3,5–5,4 procent lägre än vid full styrka."
        ]
      },
      {
        h2: "Hur mycket blir det?",
        paragraphs: [
          "Det är ljusmängden som avgör hur stor effekt panelerna ger. I SMHI:s mätningar i Stockholm 2016–2025 fick marken drygt 8 kWh solinstrålning per kvadratmeter en klar junidag, men bara 1–2 kWh de mulnaste dagarna. Eftersom verkningsgraden är nästan densamma ger en sådan dag i storleksordningen 10–25 procent av en solig dags el. Tunna eller spridda moln ger betydligt mer.",
          "Över ett helt år spelar enstaka gråa dagar mindre roll. Enligt SMHI avgörs årets solinstrålning till stor del av hur solig sommaren blir."
        ]
      }
    ],
    searchPhrases: [
      "fungerar solceller när det är molnigt",
      "solceller moln",
      "fungerar solceller när det är mulet",
      "solceller molnigt",
      "hur mycket ger solceller en mulen dag",
      "solceller effekt molnigt",
      "solpaneler molnigt"
    ],
    sources: [
      {
        title: "Långtidstest av solcellssystem för villatak",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/tester/tester-a-o/langtidstest-av-solcellssystem-for-villatak/"
      },
      {
        title: "Solstrålning i Sverige (med månadsvärden för alla stationer)",
        publisher: "SMHI",
        url: "https://www.smhi.se/kunskapsbanken/meteorologi/stralning/solstralning-i-sverige"
      },
      {
        title: "Solstrålning i Sverige sedan 1983",
        publisher: "SMHI",
        url: "https://www.smhi.se/kunskapsbanken/meteorologi/stralning/solstralning-i-sverige-sedan-1983"
      },
      {
        title: "Globalstrålning (mätdata från SMHI:s strålningsstationer)",
        publisher: "SMHI",
        url: "https://www.smhi.se/data/solstralning/globalstralning"
      },
      {
        title: "PAN Performance – 2026 PV Module Reliability Scorecard",
        publisher: "Kiwa PVEL",
        url: "https://scorecard.pvel.com/pan-performance"
      }
    ],
    related: [
      "solceller-pa-vintern",
      "hur-mycket-el-producerar-solceller",
      "skugga-pa-solceller",
      "vaderstreck-och-lutning"
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "vilka-solpaneler-ar-bast",
    category: "produktion-och-teknik",
    question: "Vilka solpaneler är bäst – och vad betyder verkningsgrad?",
    description: "Ingen panel är bäst i allt. Jämför verkningsgrad (i snitt knappt 23 % i dag), garantier, temperaturkoefficient, glas-glas och tillverkarens stabilitet.",
    shortAnswer: "Ingen solpanel är bäst i allt, så jämför egenskaper i stället för märken: verkningsgrad, garantier, temperaturkoefficient, konstruktion och tillverkarens stabilitet. Verkningsgraden anger hur stor del av solljuset panelen gör om till el, och nya kiselpaneler ligger i snitt på knappt 23 procent.",
    body: [
      {
        h2: "Det här jämför du",
        paragraphs: [
          "När du ska välja solpaneler säger fem saker mer än märket:"
        ],
        bullets: [
          "Verkningsgrad. De effektivaste panelerna ligger omkring 10 procent över snittet, alltså runt 25 procent. Hög verkningsgrad ger mer effekt per kvadratmeter och spelar störst roll på ett litet tak. Annars är pris per kWp ett bättre jämförelsemått.",
          "Garantier. Produktgarantin gäller fel på panelen, effektgarantin hur mycket effekt som lovas finnas kvar. Vanliga effektgarantier lovar högst 10–15 procents förlust efter 25–30 år. Energimyndighetens miniminivå är 10 års produktgaranti och 80 procent effekt efter 20 år.",
          "Temperaturkoefficient. Den anger hur mycket effekten sjunker per grad värme, och lägre är bättre. I testlabbet Kiwa PVEL:s mätningar sjönk effekten i mediantal 0,26–0,32 procent per grad beroende på celltyp. Skillnaden betyder mer i varma länder än i Sverige.",
          "Glas-glas. Paneler med glas på båda sidor åldras enligt Fraunhofer ISE långsammare.",
          "Certifiering och tillverkarens stabilitet. Panelerna ska vara CE-märkta och bör vara certifierade enligt IEC 61215 och IEC 61730. Kolla också vem som står bakom garantin: den gör du gällande hos det företaget, så den är bara värd något så länge företaget finns kvar."
        ]
      },
      {
        h2: "Kvaliteten skiljer mellan modeller",
        paragraphs: [
          "Kiwa PVEL bedömer paneler per modell och materialval, inte per märke. Under det senaste året hade 87 procent av de testade tillverkarna minst ett underkänt resultat i labbets förlängda stresstester. Fråga därför efter exakt modell och produktblad, och låt installatörens erfarenhet väga tungt. Installationen har stor betydelse för hur väl anläggningen fungerar."
        ]
      }
    ],
    searchPhrases: [
      "vilka solceller är bäst",
      "vilka solpaneler är effektivast",
      "vilka solceller har högst verkningsgrad",
      "vad har solceller för verkningsgrad",
      "vilka solpaneler är bäst",
      "solceller verkningsgrad",
      "vilka solpaneler ska man välja",
      "mest effektiva solpaneler",
      "vilka solceller är mest effektiva"
    ],
    sources: [
      {
        title: "Aktuelle Fakten zur Photovoltaik in Deutschland (version 20.8.2026)",
        publisher: "Fraunhofer ISE",
        url: "https://www.ise.fraunhofer.de/content/dam/ise/de/documents/publications/studies/aktuelle-fakten-zur-photovoltaik-in-deutschland.pdf"
      },
      {
        title: "Hjälp vid jämförelse av leverantörer och anbud",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vad-ska-jag-tanka-pa-vid-inkop-och-val-av-leverantor/hjalp-vid-jamforelse-av-leverantorer-och-anbud/"
      },
      {
        title: "PAN Performance – 2026 PV Module Reliability Scorecard",
        publisher: "Kiwa PVEL",
        url: "https://scorecard.pvel.com/pan-performance"
      },
      {
        title: "Failures – 2026 PV Module Reliability Scorecard",
        publisher: "Kiwa PVEL",
        url: "https://scorecard.pvel.com/failures"
      },
      {
        title: "Garanti – vad är garanti och när gäller den?",
        publisher: "Konsumentverket (Hallå konsument)",
        url: "https://www.hallakonsument.se/konsumentratt/garanti/"
      }
    ],
    related: [
      "hur-mycket-producerar-en-solpanel",
      "vad-ar-solceller-gjorda-av",
      "hur-lange-haller-solceller",
      "vad-ar-kwp",
      "vad-kostar-solceller"
    ],
    links: [
      {
        href: "/metodik",
        label: "Vår metodik"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solceller-pa-platt-tak",
    category: "planering-tak-och-bygglov",
    question: "Kan man ha solceller på platt tak?",
    description: "Ja. På platta tak lutas panelerna upp på stativ som hålls med ballast eller fästs i taket. Taket måste bära vikten och tätskiktet får inte skadas.",
    shortAnswer: "Ja. På platta och låglutande tak monteras panelerna oftast på stativ som lutar dem uppåt och hålls på plats med ballast (tyngder), med fästen i takkonstruktionen eller med både och. Det viktiga är att taket bär vikten och att tätskiktet inte skadas.",
    body: [
      {
        h2: "Vikt och vind avgör montaget",
        paragraphs: [
          "Paneler längs ett lutande tak väger cirka 12–15 kg/m². Ett ballastsystem på ett större platt tak väger mer: Energimyndigheten anger runt 25 kg/m² solcellsyta och upp mot 50 kg/m² på höga och vindutsatta tak. Stora platta tak kan dessutom vara svagare i konstruktionen. Därför görs alltid en vindlastberäkning, och takets bärighet behöver kontrolleras före montaget."
        ]
      },
      {
        h2: "Krav och rekommendationer för tätskiktet",
        paragraphs: [
          "På platta tak med papp eller duk brukar det här gälla:"
        ],
        bullets: [
          "Rekommendation från Energimyndigheten: på tak med under 6 graders lutning bör panelerna lutas upp minst 10 grader, så att vatten och smuts inte blir liggande. Raderna placeras så att de inte skuggar varandra.",
          "Krav i Tätskiktsgarantiers riktlinjer för tak med deras garanti: en konstruktör gör snö- och vindlastberäkning, panelerna monteras inte över ränndalar och vattnet ska kunna rinna fritt till brunnar och hängrännor.",
          "Rekommendation i samma riktlinjer: undvik takets hörn- och randzoner, håll minst 1 meter till vägg, krön och gavel och lägg ett skyddsskikt mellan tätskiktet och stöden."
        ]
      },
      {
        h2: "Bygglov",
        paragraphs: [
          "På villor, radhus och andra en- och tvåbostadshus, liksom deras garage och förråd, krävs inget bygglov, inte heller för uppvinklade paneler. På andra byggnader inom detaljplan krävs bygglov om taket vetter mot gata, torg eller park och anläggningen är större än 11 kW. På särskilt värdefulla byggnader krävs bygglov oavsett storlek."
        ]
      }
    ],
    searchPhrases: [
      "kan man ha solceller på platt tak",
      "solceller platt tak",
      "solpaneler platt tak"
    ],
    sources: [
      {
        title: "Så undersöker du taket",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/sa-undersoker-du-taket/"
      },
      {
        title: "Checklista förstudie (Solelportalen)",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/globalassets/fornybart/solelportalen/dokument/checklista-forstudie.docx"
      },
      {
        title: "Riktlinjer januari 2026, kapitel 6: Yttertak med solpaneler",
        publisher: "AB Tätskiktsgarantier i Norden",
        url: "https://storagetatskiktsg.blob.core.windows.net/files/media/s0unr3jr/tatskiktsgarantier-riktlinjer-2026-web.pdf"
      },
      {
        title: "Fasadändring – PBL kunskapsbanken",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/PBL-kunskapsbanken/lov--byggande/anmalningsplikt/byggnader/fasadandring/"
      },
      {
        title: "Nya bygglovsregler",
        publisher: "Svensk Solenergi",
        url: "https://svensksolenergi.se/nya-bygglovsregler/"
      }
    ],
    related: [
      "solceller-pa-platt-papp-och-tegeltak",
      "vaderstreck-och-lutning",
      "solpanel-matt-och-vikt",
      "byta-tak-innan-solceller",
      "bygglov-for-solceller"
    ],
    links: [
      {
        href: "/guider/solceller-pris-2026-stockholm",
        label: "Guide: Vad kostar solceller i Stockholm 2026?"
      },
      {
        href: "/tjanster/solpaneler",
        label: "Solpaneler: så går installationen till"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solceller-pa-balkongen",
    category: "planering-tak-och-bygglov",
    question: "Kan man ha solceller på balkongen?",
    description: "Ja, men inte med stickpropp i vägguttaget, det godtar inte Elsäkerhetsverket. Panelerna ska anslutas fast av ett registrerat elinstallationsföretag.",
    shortAnswer: "Ja, men inte med stickpropp i ett vanligt eluttag. Elsäkerhetsverket bedömer att sådan inkoppling inte uppfyller de krav som gäller i Sverige. Solceller på balkongen ska anslutas fast av ett registrerat elinstallationsföretag, och fastighetsägaren och elnätsföretaget ska godkänna installationen innan den görs.",
    body: [
      {
        h2: "Därför stoppas stickproppen",
        paragraphs: [
          "Så kallade balkongkraftverk kopplas in i ett vanligt vägguttag. Enligt den svenska installationsstandarden får en produktionsanläggning som arbetar parallellt med elnätet inte anslutas via stickpropp, och det gäller även en enda solcellspanel. Elsäkerhetsverket pekar på tre risker:"
        ],
        bullets: [
          "Belastningen på ledningarna kan bli högre än säkringen tillåter, eftersom ström även matas in via ett uttag. Det kan leda till brand.",
          "Den som arbetar med elen i huset kan få en elchock om spänning felaktigt matas in när anläggningen är avstängd.",
          "Vanliga stickproppar saknar beröringsskydd, så stiften på en utdragen propp kan vid fel bli strömförande."
        ]
      },
      {
        h2: "Läget hösten 2026",
        paragraphs: [
          "Elsäkerhetsverket har inte ändrat sitt besked. I september 2025 meddelade myndigheten att den gör en djupare analys av drifttemperaturer i olika installationer. Tyskland har en egen standard för stickproppsanslutna solceller, men enligt Elsäkerhetsverket gäller den bara där. Myndigheten beslutade 2022 om försäljningsförbud för solcellspaket med stickpropp."
        ]
      },
      {
        h2: "Så kan du göra i stället",
        paragraphs: [
          "Låt ett elinstallationsföretag registrerat för elproduktionsanläggningar dimensionera och ansluta panelerna fast. Även monteringen av själva panelerna och ihopkopplingen av deras snabbkopplingsdon räknas som elinstallationsarbete. Bor du i lägenhet, som hyresgäst eller bostadsrättshavare, behöver du hyresvärdens eller föreningens godkännande. Bygglov behövs i regel inte för en så liten anläggning, men kan krävas på kulturhistoriskt värdefulla hus. Elsäkerhetsverket föreslår också att du tar upp frågan om solceller på husets tak med fastighetsägaren eller föreningen."
        ]
      }
    ],
    searchPhrases: [
      "kan man ha solceller på balkongen",
      "solceller balkong",
      "solceller balkong lägenhet",
      "solcellspanel balkong",
      "solpaneler balkong",
      "balkong solceller sverige",
      "solceller balkong tyskland"
    ],
    sources: [
      {
        title: "Stickproppsanslutna solceller",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/dina-elprodukter/produkter/stickproppsanslutna-solceller"
      },
      {
        title: "Stickproppsanslutna solceller – därför är de en risk i Sverige",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/om-oss/press/nyheter/2025/stickproppsanslutna-solceller--darfor-ar-de-en-risk-i-sverige/"
      },
      {
        title: "Solel som ansluts med stickpropp kan innebära risker",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/om-oss/press/nyheter/2023/solel-med-stickpropp-kan-innebara-risker/"
      },
      {
        title: "Installera din solcellsanläggning",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-solceller/installera-din-solcellsanlaggning"
      },
      {
        title: "Installera solceller – vad gäller?",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/yrkespersoner/arbeta-med-elinstallationer/att-tanka-pa-vid-elinstallationer/installera-solcellsanlaggningar/installera-solceller-vad-galler/"
      }
    ],
    related: [
      "installera-solceller-sjalv",
      "anmala-solceller-till-natagaren",
      "solceller-radhus-och-brf",
      "bygglov-for-solceller",
      "kan-solceller-borja-brinna"
    ],
    links: [
      {
        href: "/tjanster/solpaneler",
        label: "Solpaneler för villa och bostadsrättsförening"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solceller-pa-platt-papp-och-tegeltak",
    category: "planering-tak-och-bygglov",
    question: "Kan man ha solceller på plåttak, papptak och tegeltak?",
    description: "Ja, alla tre fungerar. Skillnaden är infästningen: klämmor på falsat plåttak, fästen i läkten under tegelpannor och fästen med infästningsplatta på papp.",
    shortAnswer: "Ja, solceller kan monteras på plåttak, papptak och tak med tegel- eller betongpannor. Skillnaden ligger i infästningen: på falsat plåttak kläms fästena på falsarna, på pannor fästs de i läkten under pannorna och på papp monteras de med en infästningsplatta mot tätskiktet.",
    body: [
      {
        h2: "Så fästs panelerna på olika tak",
        paragraphs: [
          "Fästena skiljer sig mellan taktyperna:"
        ],
        bullets: [
          "Falsat plåttak: en klämma monteras på den stående falsen.",
          "Profilerad plåt: fästet monteras direkt i takplåten eller i det bärande underlaget.",
          "Tegel- och betongpannor: fästet monteras i bärande läkt eller i ett undertaksfäste i råsponten.",
          "Papptak: fästet monteras mot tätskiktet tillsammans med en infästningsplatta. På låglutande papp- och duktak används ofta ballast i stället."
        ]
      },
      {
        h2: "Vad som är krav och vad som är råd",
        paragraphs: [
          "Krav: allt elarbete, på både lik- och växelströmssidan, ska göras av ett elinstallationsföretag registrerat för elproduktionsanläggningar. Enligt Elsäkerhetsverket räknas även monteringen av själva panelerna och ihopkopplingen av deras snabbkopplingsdon som elinstallationsarbete, men inte vanliga stativ, fästen och bärläkt utan elsäkerhetsdetaljer. Taket ska också klara den extra lasten. Energimyndigheten bedömer att det sällan är ett problem på småhus: panelerna väger cirka 12–15 kg/m², medan taken är dimensionerade för 150–350 kg/m² snö.",
          "Råd från Boverket: kontrollera att infästningar och genomföringar blir vattentäta, och att taket har minst 25–30 års livslängd kvar. Takpapp har oftast kortare livslängd än takpannor, och har taket kortare tid kvar bör det renoveras samtidigt."
        ]
      }
    ],
    searchPhrases: [
      "kan man ha solceller på plåttak",
      "kan man ha solceller på papptak",
      "solceller tegeltak",
      "solceller på plåttak",
      "solceller på papptak",
      "solpaneler på tegeltak",
      "solceller falsat plåttak",
      "infästning solceller plåttak",
      "infästning solceller tegeltak",
      "montering solceller tegeltak"
    ],
    sources: [
      {
        title: "Solpanelsfäste",
        publisher: "Plannja",
        url: "https://www.plannja.se/konsument/produkter/taksakerhet/solpanelsfaste"
      },
      {
        title: "Så undersöker du taket",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/sa-undersoker-du-taket/"
      },
      {
        title: "Installera din solcellsanläggning",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-solceller/installera-din-solcellsanlaggning"
      },
      {
        title: "Installera solceller – vad gäller?",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/yrkespersoner/arbeta-med-elinstallationer/att-tanka-pa-vid-elinstallationer/installera-solcellsanlaggningar/installera-solceller-vad-galler/"
      },
      {
        title: "Solvärme – Energiguiden",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/energiguiden/energirenovera-smahus/5.valja_atgarder/solvarme/"
      }
    ],
    related: [
      "byta-tak-innan-solceller",
      "solceller-pa-platt-tak",
      "solpanel-matt-och-vikt",
      "installera-solceller-sjalv",
      "hur-lange-haller-solceller"
    ],
    links: [
      {
        href: "/guider/solceller-pris-2026-stockholm",
        label: "Guide: Vad kostar solceller i Stockholm 2026?"
      },
      {
        href: "/tjanster/solpaneler",
        label: "Solpaneler: så går installationen till"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solpanel-matt-och-vikt",
    category: "planering-tak-och-bygglov",
    question: "Vilka mått har en solpanel och hur många får plats på taket?",
    description: "En villapanel på 410–470 W mäter cirka 1,7 × 1,1–1,2 m och väger 21–23 kg. Räkna med 5–8 m² takyta per kW, alltså 11–20 paneler på 40 m².",
    shortAnswer: "En villapanel på 410–470 W är ungefär 1,7 meter lång, 1,1–1,2 meter bred och väger 21–23 kg. Energimyndigheten räknar med 5–8 m² takyta per installerad kW, så ett takfall på 40 m² rymmer ungefär 11–20 paneler.",
    body: [
      {
        h2: "Mått och vikt",
        paragraphs: [
          "Exempel ur tillverkarnas datablad: en panel på 410–420 W mäter 1 722 × 1 134 × 30 mm och väger 20,8 kg. En panel på 450–470 W mäter 1 728 × 1 205 × 30 mm och väger 22,7 kg. Själva panelen väger alltså runt 11 kg per kvadratmeter. Storleken skiljer mellan tillverkare och modeller, så räkna inte med någon standardstorlek utan kontrollera måtten i produktbladet för den panel du får offert på.",
          "Energimyndigheten anger att ett solcellssystem som monteras längs ett lutande tak väger cirka 12–15 kg/m², medan tak är dimensionerade för att bära 150–350 kg/m² snö. Takets hållfasthet är därför sällan ett problem på småhus, men stora platta tak kan vara svagare i konstruktionen."
        ]
      },
      {
        h2: "Hur många solpaneler får plats på mitt tak?",
        paragraphs: [
          "Räkna bara med den yta som går att använda. Skorstenar, takfönster och ventilationshuvar tar plats, skuggade delar ger lite el, och Elsäkerhetsverket påminner om att taket ska vara åtkomligt för skottning, sotning, underhåll och räddningstjänst.",
          "Exempel: med Energimyndighetens tumregel på 5–8 m² per kW ger ett takfall på 40 m² plats för 5–8 kW, alltså cirka 11–20 paneler på 410–470 W. Optimera Energis erfarenhet är att de flesta villatak i Stockholmsområdet rymmer 16–30 paneler."
        ]
      }
    ],
    searchPhrases: [
      "vilka mått har solpaneler",
      "hur många solpaneler får plats på mitt tak",
      "vad väger solceller per m2",
      "solpaneler mått",
      "solceller mått",
      "solpaneler storlek",
      "standard storlek solceller",
      "hur många solceller får jag plats med"
    ],
    sources: [
      {
        title: "Hi-MO 5m – mekaniska parametrar",
        publisher: "LONGi",
        url: "https://www.longi.com/en/products/modules/hi-mo-5m/"
      },
      {
        title: "Datasheet REC Alpha Pure-RX",
        publisher: "REC Group",
        url: "https://www.recgroup.com/sites/default/files/2025-04/Web_DS_REC%20Alpha%20Pure-RX_EN%20US_042025.pdf"
      },
      {
        title: "Så undersöker du taket",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/sa-undersoker-du-taket/"
      },
      {
        title: "Välj en anläggning som passar dina behov",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/valj-en-anlaggning-som-passar-dina-behov/"
      },
      {
        title: "Planera din solcellsanläggning",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-solceller/planera-din-solcellsanlaggning/"
      }
    ],
    related: [
      "hur-manga-solpaneler-behover-jag",
      "solceller-pa-platt-tak",
      "byta-tak-innan-solceller",
      "vad-ar-solceller-gjorda-av",
      "vaderstreck-och-lutning"
    ],
    links: [
      {
        href: "/guider/solceller-pris-2026-stockholm",
        label: "Guide: Solceller pris 2026 i Stockholm"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solceller-radhus-och-brf",
    category: "planering-tak-och-bygglov",
    question: "Får man sätta solceller på radhus eller i en bostadsrättsförening?",
    description: "Ja. Radhus räknas som småhus, så solceller kräver normalt inget bygglov. I en bostadsrättsförening äger föreningen huset och måste godkänna installationen.",
    shortAnswer: "Ja. Ett radhus räknas som ett en- eller tvåbostadshus, så solceller på taket kräver normalt inget bygglov. Bor du i en bostadsrättsförening är det föreningen som äger huset, och den måste godkänna installationen.",
    body: [
      {
        h2: "Radhus med äganderätt",
        paragraphs: [
          "Då gäller samma regler som för en villa. Sedan den 1 december 2025 krävs inget bygglov för solceller på taket, om inte huset eller området är särskilt värdefullt eller detaljplanen har utökad lovplikt. Du kan få grönt avdrag med 15 procent av kostnaden för arbete och material. Solceller på samfälld mark ger däremot inget grönt avdrag."
        ]
      },
      {
        h2: "Bostadsrätt och bostadsrättsförening (brf)",
        paragraphs: [
          "I en brf äger föreningen huset, även när det är ett radhus. Du som medlem har rätt att använda din bostad, men vill du installera solceller på taket behöver du föreningens godkännande. Enligt bostadsrättslagen ska beslut om väsentliga förändringar av föreningens hus fattas på föreningsstämman, om inte stadgarna säger något annat. Läs stadgarna och kontakta styrelsen tidigt.",
          "Som bostadsrättshavare kan du få grönt avdrag, alltså skattereduktion för grön teknik, om installationen är kopplad till din bostadsrätt, avtalet tecknas med dig, nyttan bara går till din bostad och anläggningen följer med vid en försäljning. En gemensam anläggning för hela huset ger inget grönt avdrag: avdraget gäller privatpersoner och ett enskilt hushåll.",
          "På ett flerbostadshus inom detaljplan krävs bygglov om panelerna sitter på ett tak som vetter mot gata, torg eller park och anläggningen är större än 11 kW. Kommunen ska då besluta inom tio veckor och får bara förlänga tiden med högst två veckor."
        ]
      }
    ],
    searchPhrases: [
      "får man sätta solceller på radhus",
      "solceller brf",
      "solceller bostadsrätt",
      "solceller radhus",
      "solceller bostadsrättsförening",
      "solceller brf radhus",
      "installera solceller brf",
      "solceller brf regler",
      "skattereduktion solceller brf"
    ],
    sources: [
      {
        title: "Vad är ett en- eller tvåbostadshus?",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/PBL-kunskapsbanken/lov--byggande/anmalningsplikt/en_tvabostad/"
      },
      {
        title: "Fasadändring – PBL kunskapsbanken",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/PBL-kunskapsbanken/lov--byggande/anmalningsplikt/byggnader/fasadandring/"
      },
      {
        title: "Bostadsrättslag (1991:614)",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/bostadsrattslag-1991614_sfs-1991-614/"
      },
      {
        title: "Så fungerar skattereduktionen för grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/safungerarskattereduktionenforgronteknik.4.676f4884175c97df4192870.html"
      },
      {
        title: "Godkända arbeten – grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/godkandaarbetengronteknik.4.676f4884175c97df419290e.html"
      }
    ],
    related: [
      "bygglov-for-solceller",
      "bidrag-for-solceller",
      "solceller-pa-balkongen",
      "salja-el-fran-solceller",
      "anmala-solceller-till-natagaren"
    ],
    concepts: [
      "gront-avdrag-for-batteri"
    ],
    links: [
      {
        href: "/guider/gront-avdrag-2026",
        label: "Guide: Grönt avdrag 2026"
      },
      {
        href: "/tjanster/solpaneler",
        label: "Solpaneler för villa och bostadsrättsförening"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "bygglov-for-solceller",
    category: "planering-tak-och-bygglov",
    question: "Behöver man bygglov för solceller?",
    description: "Oftast inte. Sedan 1 december 2025 krävs inget bygglov för solceller på villor och radhus. Undantag finns, bland annat för kulturhistoriskt värdefulla hus.",
    shortAnswer: "Oftast inte. Sedan den 1 december 2025 får du sätta upp solceller på tak eller fasad utan bygglov på villor, radhus, fritidshus och andra en- och tvåbostadshus. Undantag finns, bland annat för kulturhistoriskt värdefulla hus och områden.",
    body: [
      {
        h2: "Byggnadstypen avgör, inte hur panelerna sitter",
        paragraphs: [
          "Nya bygglovsregler började gälla den 1 december 2025. Solceller på tak och fasad räknas som en så kallad fasadändring, och enligt Boverket kräver fasadändringar inte bygglov på en- och tvåbostadshus och deras komplementbyggnader, som garage och förråd. Det gäller även uppvinklade paneler. Den äldre regeln att panelerna ska följa byggnadens form gäller inte längre, även om den finns kvar i äldre information.",
          "För flerbostadshus och andra byggnader inom detaljplan krävs bygglov om ändringen görs på ett tak eller en fasad som vetter mot gata, torg eller park. Sedan den 1 juli 2026 är solenergianläggningar på högst 11 kW undantagna. För större anläggningar ska kommunen besluta inom tio veckor och får bara förlänga tiden med högst två veckor. Utanför detaljplan krävs i regel inget bygglov."
        ]
      },
      {
        h2: "När bygglov ändå krävs",
        paragraphs: [
          "Bygglov kan krävas även för en villa eller ett radhus om"
        ],
        bullets: [
          "huset eller området är särskilt värdefullt ur historisk, kulturhistorisk, miljömässig eller konstnärlig synpunkt, eller har skyddsbestämmelser i detaljplanen",
          "detaljplanen eller områdesbestämmelserna kräver bygglov, så kallad utökad lovplikt",
          "huset ligger inom detaljplan i eller nära ett område av riksintresse för totalförsvaret."
        ]
      },
      {
        h2: "Om du är osäker",
        paragraphs: [
          "Fråga kommunens bygglovsenhet (byggnadsnämnden) vad som gäller för din fastighet. Vill du ha ett skriftligt besked kan du söka bygglov frivilligt. Även utan bygglov ska installationen vara varsam mot huset och inte strida mot detaljplanen, och taket ska klara lasten. Påverkas bärande delar som takstolar väsentligt krävs en anmälan.",
          "Bygglovet är inte det enda tillståndet: elarbetet ska göras av ett registrerat elinstallationsföretag, och elnätsföretaget ska godkänna anläggningen innan den tas i drift."
        ]
      }
    ],
    searchPhrases: [
      "behöver man bygglov för solceller",
      "behöver man bygglov för solceller på tak",
      "behöver man tillstånd för solceller",
      "behöver man söka bygglov för solceller",
      "måste man ha bygglov för solceller",
      "får man sätta upp solceller utan bygglov",
      "kräver solpaneler bygglov",
      "solceller bygglov boverket",
      "bygglov solceller på tak",
      "bygglov solceller utanför detaljplan"
    ],
    sources: [
      {
        title: "Ändra fasad eller tak",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/byggande/bygglov-rivningslov-marklov-och-anmalan/vad-far-jag-bygga-utan-bygglov/andra-fasad-eller-tak/"
      },
      {
        title: "Fasadändring – PBL kunskapsbanken",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/PBL-kunskapsbanken/lov--byggande/anmalningsplikt/byggnader/fasadandring/"
      },
      {
        title: "Tidsfrister för handläggning – PBL kunskapsbanken",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/PBL-kunskapsbanken/lov--byggande/handlaggning/tidsfrister-for-handlaggning/"
      },
      {
        title: "Nya bygglovsregler",
        publisher: "Svensk Solenergi",
        url: "https://svensksolenergi.se/nya-bygglovsregler/"
      },
      {
        title: "Solel – Energiguiden",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/energiguiden/energirenovera-smahus/5.valja_atgarder/solel/"
      }
    ],
    related: [
      "solceller-pa-mark",
      "solceller-radhus-och-brf",
      "solceller-pa-platt-tak",
      "anmala-solceller-till-natagaren",
      "installera-solceller-sjalv"
    ],
    links: [
      {
        href: "/tjanster/solpaneler",
        label: "Solpaneler: så går installationen till"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "hur-manga-solpaneler-behover-jag",
    category: "planering-tak-och-bygglov",
    question: "Hur många solpaneler behöver jag?",
    description: "Dela årsförbrukningen med cirka 1 000 kWh per kWp och med panelens effekt. 5 000 kWh om året motsvarar ungefär 11 paneler på 450 W.",
    shortAnswer: "Ett hushåll som använder 5 000 kWh el om året behöver ungefär 11 paneler på 450 W för att producera lika mycket som det förbrukar. Det bygger på att varje kWp ger runt 1 000 kWh per år, inom Energimyndighetens intervall 800–1 100 kWh.",
    body: [
      {
        h2: "Så räknar du ut hur stora solceller du behöver",
        paragraphs: [
          "Dela den årsproduktion du vill ha med produktionen per kWp, alltså per kilowatt paneleffekt, och sedan med panelens effekt i kWp. Energimyndigheten anger att 1 kW solceller i söderläge, med 30–50 graders lutning och utan skugga, ger runt 800–1 100 kWh per år. Optimera Energi räknar med cirka 1 050 kWh per kWp för ett välplacerat tak i Stockholm.",
          "Exempel, med antagandet 450 W per panel och 1 000 kWh per kWp och år: 5 000 kWh, vilket är vanligt i en villa som inte värms med el, kräver 5 kWp, alltså 11 paneler. Till en genomsnittlig villa, som använder runt 20 000 kWh, behövs med samma antaganden 45 paneler, vilket är fler än de flesta villatak rymmer."
        ]
      },
      {
        h2: "Räkna också på när du använder elen",
        paragraphs: [
          "En vanlig tumregel är att anläggningen över året ska producera ungefär lika mycket som hushållet använder, om taket räcker till. Men solcellerna producerar mest dagtid och på sommaren. Energi- och klimatrådgivningen råder därför att utgå från hur mycket el du använder och när, och att inte producera mer än byggnaden behöver. El du använder själv är oftast värd mer än el du säljer, och sedan 2026 finns ingen skattereduktion för såld el."
        ],
        bullets: [
          "Hämta din förbrukning per timme från elnätsbolagets eller elhandlarens kundportal.",
          "Kontrollera skugga, väderstreck och lutning – de påverkar hur mycket varje panel ger.",
          "Kolla huvudsäkringen, eftersom den begränsar hur stor växelriktare, apparaten som gör om solelen till växelström, du kan ansluta."
        ]
      }
    ],
    searchPhrases: [
      "hur många solpaneler behöver jag",
      "hur många solceller behöver jag",
      "hur stor solcellsanläggning ska man ha",
      "hur mycket solceller behöver man",
      "hur många solpaneler behöver man",
      "hur många solcellspaneler behöver jag",
      "hur många solceller behövs till ett hus",
      "hur mycket solceller ska man ha",
      "hur stora solceller behöver jag"
    ],
    sources: [
      {
        title: "Välj en anläggning som passar dina behov",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/valj-en-anlaggning-som-passar-dina-behov/"
      },
      {
        title: "Hur stor anläggning behöver jag?",
        publisher: "Energi- och klimatrådgivningen",
        url: "https://energiochklimatradgivningen.se/hushall/solenergi/hurstoranlaggningbehoverjag.672.html"
      },
      {
        title: "Normal förbrukning och elkostnad för villa",
        publisher: "Konsumenternas Energimarknadsbyrå",
        url: "https://www.energimarknadsbyran.se/el/dina-elavtal-och-kostnader/elhandelsavtalet/elforbrukning/normal-elforbrukning-och-elkostnad-for-villa/"
      },
      {
        title: "Solcellsanläggningars effekt – anmälan till elnätsföretag",
        publisher: "Svensk Solenergi och Energiföretagen Sverige",
        url: "https://www.energiforetagen.se/globalassets/dokument/broschyrer/anmalan-solceller.pdf"
      },
      {
        title: "Funkar mitt tak för solceller?",
        publisher: "Energi- och klimatrådgivningen",
        url: "https://energiochklimatradgivningen.se/hushall/solenergi/funkarmitttakforsolceller.665.html"
      }
    ],
    related: [
      "solpaneler-for-10000-och-20000-kwh",
      "solpanel-matt-och-vikt",
      "hur-stor-solcellsanlaggning-far-man-ha",
      "hur-mycket-el-producerar-solceller",
      "solceller-utan-batteri"
    ],
    concepts: [
      "sjalvforbrukning",
      "kw-och-kwh"
    ],
    links: [
      {
        href: "/kalkylator",
        label: "Räkna på ditt hus i kalkylatorn"
      },
      {
        href: "/guider/solceller-pris-2026-stockholm",
        label: "Guide: Solceller pris 2026 i Stockholm"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solceller-pa-mark",
    category: "planering-tak-och-bygglov",
    question: "Behöver man bygglov för solceller på mark?",
    description: "Nej, solceller på markstativ kräver normalt inget bygglov. De får ändå inte strida mot detaljplanen, och på åkermark prövar länsstyrelsen placeringen.",
    shortAnswer: "Nej, solceller på markstativ, alltså ett stativ på marken, kräver normalt inget bygglov. Anläggningen får ändå inte strida mot detaljplanen, och på åkermark gäller miljöbalkens skydd för jordbruksmark.",
    body: [
      {
        h2: "Därför behövs inget bygglov",
        paragraphs: [
          "Plan- och bygglagen räknar upp vilka anläggningar som kräver bygglov, och solceller finns inte med. Boverket skriver att fristående solenergianläggningar på en ställning på marken inte kräver bygglov eftersom det inte är en fasadändring, och Mark- och miljööverdomstolen har kommit fram till samma sak. En transformatorstation kräver däremot normalt bygglov.",
          "Inom detaljplan är det kommunen som bedömer om anläggningen stämmer med planen, så fråga kommunens bygglovsenhet innan du bygger. Ligger platsen inom strandskydd krävs oftast dispens."
        ]
      },
      {
        h2: "Får man bygga solceller på åkermark?",
        paragraphs: [
          "Ja, men det prövas strängt. Enligt miljöbalken får brukningsvärd jordbruksmark, både åker och betesmark, bara tas i anspråk för anläggningar om det behövs för väsentliga samhällsintressen och behovet inte kan lösas med annan mark. Det är länsstyrelsen som prövar frågan, oftast genom en anmälan om samråd.",
          "Länsstyrelsen i Kalmar län ser fossilfri elproduktion som ett väsentligt samhällsintresse, men kräver att du visar att det saknas lämplig mark som inte är jordbruksmark. Bygger du främst för egna behov ska du redovisa om det finns sådan mark på dina egna fastigheter. Mycket små anläggningar under 0,1 hektar kan enligt länsstyrelsen godtas utan lokaliseringsutredning. Bedömningen görs i varje enskilt fall."
        ]
      },
      {
        h2: "Samråd för större anläggningar",
        paragraphs: [
          "Större solcellsanläggningar på naturmark ses i princip alltid som en åtgärd som väsentligt ändrar naturmiljön och ska anmälas för samråd hos länsstyrelsen. Inom detaljplanerat område krävs ingen sådan anmälan."
        ]
      }
    ],
    searchPhrases: [
      "behöver man bygglov för solceller på mark",
      "får man bygga solceller på åkermark",
      "bygglov solceller på mark",
      "bygglov solpaneler på mark",
      "solceller på marken",
      "solpaneler på marken",
      "solceller markstativ"
    ],
    sources: [
      {
        title: "Utökad lovplikt för totalförsvaret – civil del",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/PBL-kunskapsbanken/lov--byggande/anmalningsplikt/omrade_utokad_lovplikt/totalforsvaret---civil-del/"
      },
      {
        title: "Bygglov för anläggningar",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/PBL-kunskapsbanken/lov--byggande/anmalningsplikt/bygglov-for-anlaggningar/"
      },
      {
        title: "Tillstånd för solcellspark",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/energisystem-och-analys/tillstand-och-provning/tillstandsprocesser/tillstand-for-solcellspark/"
      },
      {
        title: "Solceller på mark",
        publisher: "Länsstyrelsen Västra Götaland",
        url: "https://www.lansstyrelsen.se/vastra-gotaland/miljo-och-vatten/energi--och-klimatomstallning/solceller-pa-mark.html"
      },
      {
        title: "Länsstyrelsen Kalmar läns vägledning om solceller på jordbruksmark 2025",
        publisher: "Länsstyrelsen Kalmar län",
        url: "https://www.lansstyrelsen.se/download/18.2bcb584819a71f46ec72385/1762871446048/L%C3%A4nsstyrelsen-Kalmar-l%C3%A4ns-v%C3%A4gledning-om-solceller-p%C3%A5-jordbruksmark-2025.pdf"
      }
    ],
    related: [
      "bygglov-for-solceller",
      "vaderstreck-och-lutning",
      "hur-stor-solcellsanlaggning-far-man-ha",
      "anmala-solceller-till-natagaren"
    ],
    links: [
      {
        href: "/tjanster/solpaneler",
        label: "Solpaneler: så går installationen till"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "hur-stor-solcellsanlaggning-far-man-ha",
    category: "planering-tak-och-bygglov",
    question: "Hur stor solcellsanläggning får man ha?",
    description: "Ingen fast maxstorlek, men huvudsäkringen begränsar inmatningen: cirka 11 kW vid 16 A och 17,3 kW vid 25 A. Ellagens 63 A och 43,5 kW styr avgifterna.",
    shortAnswer: "Det finns ingen fast maxstorlek, men huvudsäkringen begränsar hur mycket anläggningen får mata in: cirka 11 kW vid 16 A, 13,8 kW vid 20 A och 17,3 kW vid 25 A. Ellagens gränser på 63 A och 43,5 kW avgör i stället vilka avgifter du slipper.",
    body: [
      {
        h2: "Säkringen avgör",
        paragraphs: [
          "Det är effekten hos växelriktaren, som gör om solelen till växelström, som räknas och som anges i föranmälan till nätbolaget, inte panelernas. Enligt Svensk Solenergi och Energiföretagen får växelriktarens ström vara lika stor som, men inte större än, huvudsäkringen. Med trefas motsvarar 35 A cirka 24,2 kW och 63 A cirka 43,5 kW.",
          "Du får alltså installera något mer paneleffekt än säkringen motsvarar, eftersom växelriktaren ofta dimensioneras till 80–90 procent av panelernas effekt. Hur många paneler du kan ha beror därmed på säkringen: med en säkring på 20 ampere räcker det till ungefär 15–17 kWp, eller 30–38 paneler på 450–500 W. Vill du ha mer kan du höja säkringen, vilket kostar, eller begränsa växelriktarens effekt. Vissa nätbolag tillåter också en separat produktionssäkring. Energimyndigheten påpekar att det är tillåtet att överskrida regelverkens gränsvärden, men att du då går miste om förmånerna."
        ]
      },
      {
        h2: "Vad 63 A och 43,5 kW betyder",
        paragraphs: [
          "Enligt ellagen ska den som har högst 63 A och kan mata in högst 43,5 kW inte betala någon avgift för inmatningen, och ingen anslutningsavgift om anläggningen inte överstiger effekten i ditt vanliga elabonnemang. Energimarknadsinspektionen bedömer dock att EU:s elmarknadsförordning går före och att även små producenter ska betala kostnadsriktiga nätavgifter. Ellagens regler upphävs den 1 januari 2027, och när nätbolagen börjar ta betalt varierar. För en mindre villaanläggning med samma säkring för inmatning och uttag bedömer Ei att ökningen kan bli begränsad.",
          "Skatteverkets gräns på 100 A gällde skattereduktionen för såld el, som slopades den 1 januari 2026."
        ]
      }
    ],
    searchPhrases: [
      "hur mycket solceller får man ha",
      "hur stor solcellsanläggning får man ha",
      "hur mycket solpaneler får man ha",
      "hur många solceller får man ha",
      "hur många solpaneler får man ha",
      "hur mycket solceller får man installera",
      "hur mycket solceller kan jag ha",
      "hur många solceller kan man ha på 20 ampere"
    ],
    sources: [
      {
        title: "Ellag (1997:857), 4 kap. 11 och 38 §§",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/ellag-1997857_sfs-1997-857/"
      },
      {
        title: "Frågor och svar om slopad reduktion av nätavgifter för småskaliga produktionsanläggningar",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/bransch/tariffer-nattariffer/fragor-och-svar-om-slopad-reduktion-av-natavgifter-for-smaskaliga-produktionsanlaggningar"
      },
      {
        title: "Solcellsanläggningars effekt – anmälan till elnätsföretag",
        publisher: "Svensk Solenergi och Energiföretagen Sverige",
        url: "https://www.energiforetagen.se/globalassets/dokument/broschyrer/anmalan-solceller.pdf"
      },
      {
        title: "Bättre ekonomi med rätt anläggningsstorlek",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/battre-ekonomi-med-ratt-anlaggningsstorlek/"
      },
      {
        title: "Mikroproduktion av förnybar el – privatbostad",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/inkomsterfranbostad/mikroproduktionavfornybarelprivatbostad.4.12815e4f14a62bc048f41a7.html"
      }
    ],
    related: [
      "sakring-for-solceller",
      "solpaneler-for-10000-och-20000-kwh",
      "natavgift-med-solceller",
      "anmala-solceller-till-natagaren",
      "skatt-pa-sald-solel"
    ],
    concepts: [
      "sakringsabonnemang",
      "kw-och-kwh"
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "installera-solceller-sjalv",
    category: "planering-tak-och-bygglov",
    question: "Får man installera solceller själv?",
    description: "Nej. Att montera och koppla ihop panelerna är elinstallationsarbete för ett registrerat elinstallationsföretag. Enkla stativ och fästen är undantagna.",
    shortAnswer: "Nej, inte hela jobbet. Elsäkerhetsverket räknar både monteringen av själva panelerna och ihopkopplingen av deras kontaktdon som elinstallationsarbete, och allt elinstallationsarbete på likströms- och växelströmssidan ska göras av ett elinstallationsföretag som är registrerat hos Elsäkerhetsverket.",
    body: [
      {
        h2: "Det här är inte elinstallationsarbete",
        paragraphs: [
          "Montage av vanlig bärläkt, stativ och fästen räknas inte som elinstallationsarbete, så länge delarna inte innehåller skydd som behövs för elsäkerheten. Den delen kan alltså göras av någon annan än elinstallationsföretaget. All kabelförläggning är däremot elinstallationsarbete. Undantaget för själva elarbetet är en auktoriserad elinstallatör som arbetar på sin egen anläggning.",
          "Elsäkerhetsverket påpekar också att det inte är tillåtet att mata in el från solceller via en stickpropp i ett vanligt vägguttag."
        ]
      },
      {
        h2: "Vem får installera solceller – måste det vara en elektriker?",
        paragraphs: [
          "Elarbetet får bara göras av personer som omfattas av ett elinstallationsföretags egenkontrollprogram. Det behöver inte vara en elektriker i varje moment: företaget kan till exempel låta snickare eller takläggare koppla ihop panelerna, men då ska de ingå i egenkontrollprogrammet och ha rätt kompetens för uppgiften. Företaget ansvarar för arbetet.",
          "Företaget ska vara registrerat hos Elsäkerhetsverket för verksamhetstypen Elproduktionsanläggningar, vilket du kan kontrollera i e-tjänsten Kolla elföretaget. Någon särskild solcellscertifiering kräver Elsäkerhetsverket däremot inte."
        ]
      },
      {
        h2: "Därför ska du inte chansa",
        paragraphs: [
          "Olagligt elinstallationsarbete är straffbart och kan ge dig problem vid en försäkringsskada eller när du säljer huset. Nätbolaget kräver också behörighet. Hos Ellevio får installationen bara utföras av en behörig elinstallatör, och det är elinstallatören som anmäler anläggningen.",
          "Grönt avdrag går också förlorat. Köper du bara material av ett företag får du ingen skattereduktion för det, enligt Skatteverket."
        ]
      }
    ],
    searchPhrases: [
      "får man installera solceller själv",
      "vem får installera solceller",
      "måste elektriker installera solceller",
      "får man installera solpaneler själv"
    ],
    sources: [
      {
        title: "Installera solceller – vad gäller?",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/yrkespersoner/arbeta-med-elinstallationer/att-tanka-pa-vid-elinstallationer/installera-solcellsanlaggningar/installera-solceller-vad-galler/"
      },
      {
        title: "Installera din solcellsanläggning",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-solceller/installera-din-solcellsanlaggning/"
      },
      {
        title: "Vem får installera solceller?",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/yrkespersoner/arbeta-med-elinstallationer/att-tanka-pa-vid-elinstallationer/installera-solcellsanlaggningar/vem-far-installera-solceller/"
      },
      {
        title: "Solceller – innan installation",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/elnatsanslutning/solceller-steg-for-steg/innan-installation/"
      },
      {
        title: "Så fungerar skattereduktionen för grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/safungerarskattereduktionenforgronteknik.4.676f4884175c97df4192870.html"
      }
    ],
    related: [
      "jorda-solpaneler",
      "anmala-solceller-till-natagaren",
      "solceller-pa-balkongen",
      "besikta-solceller",
      "hur-lang-tid-tar-installationen"
    ],
    links: [
      {
        href: "/guider/gront-avdrag-2026",
        label: "Guide: Grönt avdrag 2026"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "hur-lang-tid-tar-installationen",
    category: "planering-tak-och-bygglov",
    question: "Hur lång tid tar det att installera solceller?",
    description: "Monteringen tar två–tre dagar på en normalvilla, ofta färre. Därtill kommer nätbolagets medgivande och mätarbytet, som hos Ellevio tar cirka två veckor.",
    shortAnswer: "Själva monteringen och inkopplingen tar två–tre arbetsdagar för en normalvilla, oftast färre, enligt Optimera Energis erfarenhet. Hela processen tar längre, eftersom nätbolaget ska ge installationsmedgivande innan arbetet börjar och ofta byter elmätare efteråt.",
    body: [
      {
        h2: "Stegen som tar tid",
        paragraphs: [
          "Från beslut till att anläggningen producerar el går det ungefär så här:"
        ],
        bullets: [
          "Föranmälan: elinstallatören anmäler anläggningen till nätbolaget, som kontrollerar att elnätet klarar effekten. Först efter installationsmedgivandet får arbetet börja. Behöver nätet byggas om kan det dröja.",
          "Montering och inkoppling: några dagar på plats, beroende på anläggningens storlek och taket.",
          "Färdiganmälan och mätarbyte: när anläggningen är färdig och provkörd skickar installatören en färdiganmälan. Hos Ellevio tar ett mätarbyte cirka två veckor därefter. Starta inte anläggningen innan nätbolaget gett klartecken – med en äldre mätare kan överskottet annars registreras som el du köpt.",
          "Bygglov, om det behövs: kommunen ska besluta inom tio veckor från att ansökan är komplett. För solenergianläggningar får tiden sedan den 1 juli 2026 bara förlängas med högst två veckor."
        ]
      },
      {
        h2: "Ett skydd mot långa väntetider",
        paragraphs: [
          "Enligt ellagen får nätbolaget bara avstå från att ansluta en anläggning för förnybar el på högst 43,5 kW om det meddelar dig inom en månad från din begäran. Samma regel finns i elmarknadslagen, som ersätter ellagen den 1 januari 2027."
        ]
      }
    ],
    searchPhrases: [
      "hur lång tid tar det att installera solceller",
      "hur lång tid tar det att installera solpaneler"
    ],
    sources: [
      {
        title: "Solceller – innan installation",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/elnatsanslutning/solceller-steg-for-steg/innan-installation/"
      },
      {
        title: "Solceller – vad händer efter installation?",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/elnatsanslutning/solceller-steg-for-steg/efter-installationen/"
      },
      {
        title: "Plan- och bygglag (2010:900), 9 kap. 99 §",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/plan-och-bygglag-2010900_sfs-2010-900/"
      },
      {
        title: "Ellag (1997:857), 4 kap. 2 §",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/ellag-1997857_sfs-1997-857/"
      },
      {
        title: "Elmarknadslag (2026:1281), 6 kap. 3 §",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/elmarknadslag-20261281_sfs-2026-1281/"
      }
    ],
    related: [
      "anmala-solceller-till-natagaren",
      "bygglov-for-solceller",
      "installera-solceller-sjalv",
      "byta-tak-innan-solceller"
    ],
    links: [
      {
        href: "/tjanster/solpaneler",
        label: "Så går en solcellsinstallation till"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "jorda-solpaneler",
    category: "planering-tak-och-bygglov",
    question: "Måste man jorda solpaneler?",
    description: "Ja, normalt ska panelramar, montage och metallkanaler funktionsjordas så att växelriktaren upptäcker isolationsfel, enligt en riktlinje från 2025.",
    shortAnswer: "Ja, i normalfallet. Panelramar, montagesystem och kabelkanaler av metall behöver funktionsjordas så att växelriktarens isolationsövervakning kan upptäcka skadade kablar. Det slår Elsäkerhetsverket, Svensk Solenergi, Installatörsföretagen och SEK Svensk Elstandard fast i en gemensam riktlinje från december 2025.",
    body: [
      {
        h2: "Därför behövs jordningen",
        paragraphs: [
          "De flesta växelriktare som installeras i Sverige saknar transformator, och likströmssidan är inte jordad. Växelriktaren mäter i stället isolationsresistansen mellan strängarna och jord, oftast en gång per dygn före start. Har montaget dålig kontakt med jord kan ett fel, till exempel en sönderskavd kabel, ligga oupptäckt länge. Uppstår ett andra fel kan de tillsammans orsaka varmgång, ljusbåge och i värsta fall brand.",
          "Det handlar om funktionsjordning, alltså jordning för att övervakningen ska fungera, inte skyddsjordning. Panelerna är dubbelisolerade, och jordledaren ska anslutas till husets jordningssystem och dras tillsammans med strängkablarna. Görs det i samband med installationen blir kostnaden enligt Svensk Solenergi relativt liten."
        ]
      },
      {
        h2: "Undantag och vanliga missförstånd",
        paragraphs: [
          "Frågan var länge omdiskuterad i branschen. Det här gäller nu:"
        ],
        bullets: [
          "Tillverkarens anvisningar för paneler och växelriktare går först. Säger de inget annat gäller Elinstallationsreglerna SS 436 40 00, avsnitt 712.542.103.",
          "Montage som inte är av metall, till exempel komposit, kan vara undantaget.",
          "Funktionsjordningen gör inte panelerna till en åskledare. Elsäkerhetsverkets tekniska expert säger att inget visar att risken för nedslag ökar.",
          "Jordningen är elinstallationsarbete. Den ska utföras av ett registrerat elinstallationsföretag, och dess kontinuitet ska kontrolleras."
        ]
      }
    ],
    searchPhrases: [
      "måste man jorda solpaneler",
      "måste man jorda solceller",
      "solceller jordning"
    ],
    sources: [
      {
        title: "Funktionsjordning/funktionsutjämning i solcellsinstallationer",
        publisher: "Elsäkerhetsverket, Svensk Solenergi, Installatörsföretagen och SEK Svensk Elstandard",
        url: "https://www.elsakerhetsverket.se/contentassets/78fda6bf2a8c4d298067a9c963ba4dbc/funktionsjordningfunktionsutjamning-i-solcellsinstallationer.pdf"
      },
      {
        title: "Gemensamt uttalande om funktionsjordning",
        publisher: "Svensk Solenergi",
        url: "https://svensksolenergi.se/gemensamt-uttalande-om-funktionsjordning/"
      },
      {
        title: "Funktionsjordning av metalldelar",
        publisher: "Svensk Solenergi",
        url: "https://svensksolenergi.se/funktionsjordning-av-metalldelar/"
      },
      {
        title: "Installera solceller – vad gäller?",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/yrkespersoner/arbeta-med-elinstallationer/att-tanka-pa-vid-elinstallationer/installera-solcellsanlaggningar/installera-solceller-vad-galler/"
      },
      {
        title: "Nu ska solcellsanläggningen funktionsjordas – men varför?",
        publisher: "Elinstallatören",
        url: "https://www.elinstallatoren.se/nu-ska-solcellsanlaggningen-funktionsjordas-men-varfor/"
      }
    ],
    related: [
      "installera-solceller-sjalv",
      "kan-solceller-borja-brinna",
      "besikta-solceller",
      "sakring-for-solceller"
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "byta-tak-innan-solceller",
    category: "planering-tak-och-bygglov",
    question: "Måste man byta tak innan man sätter upp solceller?",
    description: "Nej, det är inget krav. Men solceller håller 25–30 år, så taket bör ha minst lika lång livslängd kvar. Annars är det klokt att lägga om taket först.",
    shortAnswer: "Nej, det finns inget krav på att byta tak. Men solceller håller oftast 25–30 år eller mer, och Boverket rekommenderar att taket har minst lika lång livslängd kvar. Har det inte det är det klokt att lägga om taket före eller samtidigt med installationen.",
    body: [
      {
        h2: "Därför spelar takets ålder roll",
        paragraphs: [
          "Måste taket läggas om medan panelerna sitter kvar behöver de monteras ner och upp igen. Det går, men Energimyndigheten beskriver det som relativt kostsamt och något som bör undvikas. Svensk Solenergi skriver att en solcellsanläggning inte ska installeras på ett tak som har betydligt kortare kvarvarande livslängd än anläggningen.",
          "Har du ett gammalt tak kan du låta besiktiga taket och tätskiktet innan du bestämmer dig. Energimyndigheten skriver att det passar bra att skaffa solceller när du ändå lägger om taket, i stället för att lägga dem på ett gammalt. Det finns även solceller som ersätter takmaterialet."
        ]
      },
      {
        h2: "Bra att veta",
        paragraphs: [
          "Några saker som påverkar beslutet:"
        ],
        bullets: [
          "Bärigheten är sällan ett problem på småhus. Panelerna väger cirka 12–15 kg/m² på ett lutande tak, men be en fackman kontrollera taket om du är osäker.",
          "Grönt avdrag gäller bara solcellsinstallationen. Ombyggnad av taket inför installationen ger inget grönt avdrag.",
          "Behöver panelerna monteras ner senare för takarbete ger det arbetet inte grönt avdrag, men det kan räknas som rotarbete."
        ]
      }
    ],
    searchPhrases: [
      "måste man byta tak innan solceller",
      "solceller på gammalt tak",
      "byta tak innan solceller",
      "lägga solceller på gammalt tak"
    ],
    sources: [
      {
        title: "Solel – Energiguiden",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/energiguiden/energirenovera-smahus/5.valja_atgarder/solel/"
      },
      {
        title: "Så undersöker du taket",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/sa-undersoker-du-taket/"
      },
      {
        title: "Checklista förstudie (Solelportalen)",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/globalassets/fornybart/solelportalen/dokument/checklista-forstudie.docx"
      },
      {
        title: "5 tips för säkra solcellsinstallationer",
        publisher: "Svensk Solenergi",
        url: "https://svensksolenergi.se/att-installera-solenergi/fem-tips/"
      },
      {
        title: "Godkända arbeten – grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/godkandaarbetengronteknik.4.676f4884175c97df419290e.html"
      }
    ],
    related: [
      "hur-lange-haller-solceller",
      "solceller-pa-platt-papp-och-tegeltak",
      "solceller-pa-platt-tak",
      "bidrag-for-solceller",
      "besikta-solceller"
    ],
    links: [
      {
        href: "/guider/gront-avdrag-2026",
        label: "Guide: Grönt avdrag 2026"
      },
      {
        href: "/tjanster/solpaneler",
        label: "Solpaneler: så går installationen till"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "kan-man-bli-sjalvforsorjande-pa-el",
    category: "planering-tak-och-bygglov",
    question: "Kan man bli självförsörjande på el med solceller?",
    description: "Inte året runt. Solceller kan ge lika mycket el som huset använder på ett år, men december ger bara 0–2 % av årsproduktionen. Nätet behövs ändå.",
    shortAnswer: "Inte helt, om huset ska klara sig utan elnät året runt. Solceller kan ge lika mycket el som huset använder på ett år, men december står för bara 0–2 procent av årsproduktionen, och ett batteri lagrar el i timmar och dygn, inte från sommar till vinter.",
    body: [
      {
        h2: "Lika mycket per år är inte självförsörjande",
        paragraphs: [
          "Exempel: en anläggning på 10 kWp i Stockholm ger cirka 9 800 kWh per år enligt EU-kommissionens beräkningsverktyg PVGIS, med antagandet söderläge, 35 graders lutning och 14 procents systemförluster. I juni blir det runt 1 400 kWh men i december bara runt 120 kWh, ungefär 4 kWh per dygn. En genomsnittlig villa som använder 20 000 kWh om året förbrukar i snitt cirka 55 kWh per dygn, och mer på vintern om den värms med el.",
          "Hur många solpaneler behövs då? Räknat på exemplet krävs runt 45 paneler på 450 W för att producera 20 000 kWh på ett år. Ska solcellerna driva huset även i december skulle det behövas över 300 paneler, och då är förbrukningen ändå räknad som årssnittet 55 kWh per dygn.",
          "Energimyndigheten skriver att det kräver väldigt stor lagringskapacitet att bli självförsörjande så att du inte behöver el från nätet, och att det därför blir mycket kostsamt. Ett hembatteri jämnar ut dag och natt, men inte årstiderna."
        ]
      },
      {
        h2: "Det här är realistiskt",
        paragraphs: [
          "Energi- och klimatrådgivningen konstaterar att egen solel oftast bara täcker en del av årsbehovet, eftersom den främst produceras dagtid och på sommaren. Ett rimligt mål är att täcka mycket av förbrukningen under vår, sommar och höst och köpa resten från nätet. Med batteri ökar andelen av solelen som du använder själv, enligt Optimera Energis erfarenhet från typiskt 30–40 procent till 70–80 procent.",
          "Vill du ha el vid strömavbrott eller helt stå utanför elnätet ställs andra krav på elinstallationen, till exempel eget jordtag och säker frånskiljning, enligt Elsäkerhetsverket."
        ]
      }
    ],
    searchPhrases: [
      "hur många solpaneler behövs för att bli självförsörjande",
      "hur mycket solceller behövs för att driva ett hus"
    ],
    sources: [
      {
        title: "PVGIS – Photovoltaic Geographical Information System",
        publisher: "EU-kommissionen, Joint Research Centre",
        url: "https://re.jrc.ec.europa.eu/pvg_tools/en/"
      },
      {
        title: "Batterier kopplat till solceller",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/batterier-kopplat-till-solceller/"
      },
      {
        title: "Funkar mitt tak för solceller?",
        publisher: "Energi- och klimatrådgivningen",
        url: "https://energiochklimatradgivningen.se/hushall/solenergi/funkarmitttakforsolceller.665.html"
      },
      {
        title: "Planera din solcellsanläggning",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-solceller/planera-din-solcellsanlaggning/"
      },
      {
        title: "Normal förbrukning och elkostnad för villa",
        publisher: "Konsumenternas Energimarknadsbyrå",
        url: "https://www.energimarknadsbyran.se/el/dina-elavtal-och-kostnader/elhandelsavtalet/elforbrukning/normal-elforbrukning-och-elkostnad-for-villa/"
      }
    ],
    related: [
      "solpaneler-for-10000-och-20000-kwh",
      "solceller-pa-vintern",
      "solceller-vid-stromavbrott",
      "solceller-utan-batteri",
      "hur-manga-solpaneler-behover-jag"
    ],
    concepts: [
      "sjalvforbrukning",
      "o-drift-och-backup",
      "dimensionering"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri: pris, storlek och märken"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solpaneler-for-10000-och-20000-kwh",
    category: "planering-tak-och-bygglov",
    question: "Hur många solpaneler behövs för 10 000 eller 20 000 kWh?",
    description: "Cirka 20–25 paneler ger 10 000 kWh om året och 40–50 paneler ger 20 000 kWh, med 400–500 W per panel och runt 1 000 kWh per kWp och år.",
    shortAnswer: "För 10 000 kWh om året behövs ungefär 20–25 paneler och för 20 000 kWh ungefär 40–50 paneler, om varje panel har 400–500 W och varje kWp ger runt 1 000 kWh per år. Det motsvarar cirka 10 respektive 20 kWp.",
    body: [
      {
        h2: "Räkneexemplet",
        paragraphs: [
          "Exempel, med antagandet 450 W per panel och 1 000 kWh per kWp och år: 10 000 kWh kräver 10 kWp, alltså 23 paneler. 20 000 kWh kräver 20 kWp, alltså 45 paneler. En panel på 450–470 W tar drygt 2 m², så panelytan blir cirka 48 respektive 94 m², plus marginaler mot takkanter och hinder.",
          "Energimyndigheten anger 800–1 100 kWh per kW och år för ett oskuggat tak i söderläge. Ger ditt tak 900 kWh per kWp behövs drygt 10 procent fler paneler."
        ]
      },
      {
        h2: "Säkring och säsong sätter gränser",
        paragraphs: [
          "Växelriktaren, som gör om solelen till växelström, dimensioneras ofta till 80–90 procent av panelernas effekt, och dess ström får inte vara större än huvudsäkringen. 10 kWp ryms därför normalt inom 16 A, som räcker till 11,0 kW. Till 20 kWp hör en växelriktare på 16–18 kW. Upp till 17,3 kW räcker 25 A, men 18 kW kräver 35 A.",
          "Att producera lika mycket som du använder betyder inte att solcellerna täcker förbrukningen. En villa som använder 20 000 kWh värms ofta med el och har sin största förbrukning på vintern, när solcellerna ger minst. Utan batteri använder ett hushåll typiskt 30–40 procent av solelen själv, enligt Optimera Energis erfarenhet, och resten säljs."
        ]
      }
    ],
    searchPhrases: [
      "hur många solpaneler behövs för 20 000 kwh",
      "hur många solpaneler behövs för 10 000 kwh",
      "hur många solceller för 10 000 kwh"
    ],
    sources: [
      {
        title: "Välj en anläggning som passar dina behov",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/valj-en-anlaggning-som-passar-dina-behov/"
      },
      {
        title: "Solcellsanläggningars effekt – anmälan till elnätsföretag",
        publisher: "Svensk Solenergi och Energiföretagen Sverige",
        url: "https://www.energiforetagen.se/globalassets/dokument/broschyrer/anmalan-solceller.pdf"
      },
      {
        title: "Datasheet REC Alpha Pure-RX",
        publisher: "REC Group",
        url: "https://www.recgroup.com/sites/default/files/2025-04/Web_DS_REC%20Alpha%20Pure-RX_EN%20US_042025.pdf"
      },
      {
        title: "Normal förbrukning och elkostnad för villa",
        publisher: "Konsumenternas Energimarknadsbyrå",
        url: "https://www.energimarknadsbyran.se/el/dina-elavtal-och-kostnader/elhandelsavtalet/elforbrukning/normal-elforbrukning-och-elkostnad-for-villa/"
      },
      {
        title: "Funkar mitt tak för solceller?",
        publisher: "Energi- och klimatrådgivningen",
        url: "https://energiochklimatradgivningen.se/hushall/solenergi/funkarmitttakforsolceller.665.html"
      }
    ],
    related: [
      "hur-manga-solpaneler-behover-jag",
      "kan-man-bli-sjalvforsorjande-pa-el",
      "hur-stor-solcellsanlaggning-far-man-ha",
      "solpanel-matt-och-vikt",
      "solceller-och-varmepump"
    ],
    concepts: [
      "sjalvforbrukning",
      "sakringsabonnemang"
    ],
    links: [
      {
        href: "/kalkylator",
        label: "Räkna på ditt hus i kalkylatorn"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "salja-el-fran-solceller",
    category: "elnat-forsaljning-och-skatt",
    question: "Kan man sälja el från solceller?",
    description: "Ja. Överskottet säljs till ett elhandelsföretag med ett särskilt avtal. Utan avtal måste din elhandlare ändå ta emot elen och betala en skälig ersättning.",
    shortAnswer: "Ja. Den solel du inte använder själv matas in på elnätet, och den kan du sälja till ett elhandelsföretag. Bäst betalt får du oftast med ett eget säljavtal, och ersättningen varierar mellan bolagen.",
    body: [
      {
        h2: "Vem köper solelen?",
        paragraphs: [
          "Det är elhandelsföretagen som köper överskottsel från villor. Du väljer själv vem du köper el av och vem du säljer till, men de flesta bolag kräver att du också köper din el av dem. Jämför därför priset både för el du säljer och el du köper, eftersom en stor del av din förbrukning sker när solcellerna inte producerar.",
          "Har du inget säljavtal är det elhandelsföretag som levererar din el skyldigt enligt ellagen att ta emot elen och ge dig en skälig ersättning. Bolaget behöver däremot inte erbjuda dig ett eget avtal, och för att få så bra betalt som möjligt lönar det sig att jämföra erbjudanden och teckna ett."
        ]
      },
      {
        h2: "Så fungerar det i praktiken",
        paragraphs: [
          "Gången ser oftast ut så här:"
        ],
        bullets: [
          "Installatören anmäler anläggningen till nätbolaget. Efter färdiganmälan byter nätbolaget vid behov elmätaren, i dag utan kostnad, så att den kan mäta det du matar in.",
          "Nätbolaget skickar uppgifter om din anläggning, som du anger när du tecknar avtal med elhandlaren.",
          "Har du ett batteri kan du dessutom sälja flexibilitet, till exempel stödtjänster till Svenska kraftnät, via en så kallad aggregator."
        ]
      },
      {
        h2: "Vad du får betalt",
        paragraphs: [
          "Sedan den 1 januari 2026 finns ingen skattereduktion för såld el. Du får elhandlarens ersättning, som oftast följer spotpriset, och en mindre ersättning från nätbolaget för så kallad nätnytta – att din el minskar förlusterna i elnätet. Den 1 januari 2027 ersätts ellagen av en ny elmarknadslag, men både elhandlarens skyldighet att ta emot din el och rätten till nätnytta finns kvar i den."
        ]
      }
    ],
    searchPhrases: [
      "kan man sälja el från solceller",
      "vem köper solel",
      "hur säljer man överskottsel",
      "solceller sälja el",
      "hur funkar solceller sälja el"
    ],
    sources: [
      {
        title: "Mikroproduktion av el",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/konsument/el/mikroproduktion-av-el"
      },
      {
        title: "Rättigheter och skyldigheter vid anslutning till elnätet",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vilka-rattigheter-och-skyldigheter-har-jag-vid-installation/dina-rattigheter-och-skyldigheter-vid-anslutning-till-elnatet/"
      },
      {
        title: "Löpande intäkter efter installation",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vilka-stod-och-intakter-kan-jag-fa/lopande-intakter-efter-installation/"
      },
      {
        title: "El från solen – anslut elproduktion",
        publisher: "Vattenfall Eldistribution",
        url: "https://www.vattenfalleldistribution.se/elnatsanslutning/anslut-elproduktion/el-fran-solen/"
      },
      {
        title: "Elmarknadslag (2026:1281)",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/elmarknadslag-20261281_sfs-2026-1281/"
      }
    ],
    related: [
      "ersattning-for-sald-solel",
      "skatt-pa-sald-solel",
      "maste-man-salja-elen",
      "anmala-solceller-till-natagaren",
      "solceller-vid-minuspris"
    ],
    concepts: [
      "aggregator-och-virtuellt-kraftverk",
      "sjalvforbrukning"
    ],
    links: [
      {
        href: "/tjanster/solpaneler",
        label: "Solpaneler från Optimera Energi"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solceller-vid-minuspris",
    category: "elnat-forsaljning-och-skatt",
    question: "Vad händer med solceller vid minuspris?",
    description: "Solcellerna producerar som vanligt. Egen användning sparar pengar, men för såld el betalar du oftast det negativa spotpriset. Batteri och styrning hjälper.",
    shortAnswer: "Solcellerna fortsätter att producera som vanligt. Den el du använder själv minskar fortfarande dina inköp, men för el du säljer betalar du i regel det negativa spotpriset, eftersom de vanligaste avtalen följer spotpriset även under noll.",
    body: [
      {
        h2: "Varför blir priset negativt?",
        paragraphs: [
          "Minuspris uppstår när det finns mer el än vad som går åt och elen inte kan lagras. Det händer oftast på natten, men också soliga eftermiddagar när mycket solel produceras. Under 2025 var priset negativt i 345 timmar i elområde 3 (Stockholm) och i 679 timmar i elområde 2 (Sundsvall)."
        ]
      },
      {
        h2: "Vad det betyder för din ersättning",
        paragraphs: [
          "I det vanligaste upplägget köper elhandlaren din solel till spotpriset. När spotpriset är negativt betalar du alltså för den el du matar ut. Nätnyttan från nätbolaget, några öre per kWh, betalas fortfarande. Förr behövde priset ned till ungefär minus 65 öre innan det kostade något, tack vare skattereduktionen på 60 öre, men den finns inte för el som matas in från 2026."
        ]
      },
      {
        h2: "Vad kan du göra?",
        paragraphs: [
          "Det här hjälper:"
        ],
        bullets: [
          "Använd mer el själv när priset är negativt, till exempel genom att ladda elbilen.",
          "Med ett batteri och smart styrning kan överskottet laddas in i stället för att säljas.",
          "Att stänga av anläggningen lönar sig sällan. Enligt Skellefteå Kraft behöver minuspriset vara större för att du ska tjäna på det.",
          "Läs ditt avtal, eftersom det är det som avgör om och hur mycket du betalar vid negativa priser."
        ]
      }
    ],
    searchPhrases: [
      "vad händer med solceller vid minuspris",
      "solceller när det är minuspris"
    ],
    sources: [
      {
        title: "Minuspriser kan vara en utmaning",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/press-och-nyheter/temasidor/tema-elmarknad-och-elpriser/minuspriser-kan-vara-en-utmaning/"
      },
      {
        title: "Elåret 2025: rekordbilligt i norr och dyrare i söder",
        publisher: "Energiföretagen Sverige",
        url: "https://www.energiforetagen.se/pressrum/pressmeddelanden/2025/elaret-2025-rekordbilligt-i-norr-och-dyrare-i-soder/"
      },
      {
        title: "Hur påverkar negativa elpriser mig med solceller?",
        publisher: "Mölndal Energi",
        url: "https://www.molndalenergi.se/kunskap/solceller/hur-paverkar-negativa-elpriser-mig-med-solceller"
      },
      {
        title: "Så undviker du att sälja din egenproducerade el till minuspriser",
        publisher: "Vattenfall",
        url: "https://www.vattenfall.se/fokus/tips-rad/mikroproduktion-vid-minuspriser/"
      },
      {
        title: "Minuspriser på el – så funkar det",
        publisher: "Skellefteå Kraft",
        url: "https://www.skekraft.se/privat/elavtal/aktuellt-pa-elmarknaden/minuspriser-pa-el-sa-funkar-det/"
      }
    ],
    related: [
      "ersattning-for-sald-solel",
      "stanga-av-solceller",
      "solceller-utan-batteri",
      "vad-kostar-solceller-med-batteri"
    ],
    concepts: [
      "spotprisstyrning",
      "kvartspris",
      "sjalvforbrukning"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri: pris, storlek och märken"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "ersattning-for-sald-solel",
    category: "elnat-forsaljning-och-skatt",
    question: "Hur mycket får man betalt för såld solel?",
    description: "Oftast spotpriset per kvart eller timme ± några öre, plus några öre i nätnytta. Skattereduktionen på 60 öre finns inte för el som säljs från 2026.",
    shortAnswer: "Oftast får du spotpriset för den kvart eller timme då du matar in elen, plus eller minus några öre beroende på avtal. Nätbolaget betalar dessutom några öre per kWh i nätnytta. Skattereduktionen på 60 öre/kWh gäller inte el som matas in från 2026.",
    body: [
      {
        h2: "Ersättningens två delar",
        paragraphs: [
          "Ersättningen, alltså det pris du får för en såld kWh, består i dag av två delar:"
        ],
        bullets: [
          "Elhandlarens ersättning: vanligtvis spotpriset på elbörsen Nord Pool, med ett litet påslag eller avdrag. Vattenfall betalar till exempel kvartsspotpriset minus rörliga handelskostnader. Har du inget produktionsavtal men köper el av Vattenfall dras ytterligare 6 öre/kWh av.",
          "Nätnytta: nätbolaget ersätter dig för att din el minskar förlusterna i nätet. År 2026 betalar Ellevio 3,30–4,40 öre/kWh i nätområde Stockholm (exkl. moms) och Vattenfall Eldistribution 10,4 öre/kWh på lågspänning, som vanliga villor har."
        ]
      },
      {
        h2: "Det som inte längre ingår",
        paragraphs: [
          "Skattereduktionen på 60 öre/kWh gäller inte el som matas in från den 1 januari 2026. Ursprungsgarantier, elektroniska intyg om elens ursprung som kan säljas, utfärdas bara för anläggningar på minst 50 kW. En vanlig villaanläggning får alltså inga. Hur avgiften för inmatning kan förändras från 2027 tar vi upp i frågan om nätavgiften."
        ]
      },
      {
        h2: "Så mycket tjänar du: ett räkneexempel",
        paragraphs: [
          "Exempel: Du säljer 4 000 kWh från dina solceller under ett år, med antagandet att du i snitt får 35 öre/kWh från elhandlaren och 4 öre/kWh i nätnytta. Det ger 4 000 × 0,39 kronor = 1 560 kronor. Med 60-öringen hade samma försäljning gett 2 400 kronor till.",
          "Som jämförelse låg månadsmedelpriset på elbörsen i elområde 3 mellan 23 och 52 öre/kWh under april–september 2025. Den el du använder själv är oftast minst lika mycket värd, eftersom du då slipper elpris, energiskatt, rörlig nätavgift och moms."
        ]
      }
    ],
    searchPhrases: [
      "hur mycket får man för såld el",
      "hur mycket tjänar man på att sälja el från solceller",
      "solceller sälja el pris",
      "hur mycket kan man sälja el för"
    ],
    sources: [
      {
        title: "Löpande intäkter efter installation",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vilka-stod-och-intakter-kan-jag-fa/lopande-intakter-efter-installation/"
      },
      {
        title: "Mikroproduktion – sälj din överskottsel",
        publisher: "Vattenfall",
        url: "https://www.vattenfall.se/elavtal/elpriser/mikroproduktion/"
      },
      {
        title: "Abonnemang för elproduktion (mikroproduktion)",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/abonnemang/abonnemang-mikroproduktion/"
      },
      {
        title: "Ersättning för egenproducerad el",
        publisher: "Vattenfall Eldistribution",
        url: "https://www.vattenfalleldistribution.se/elnatsanslutning/anslut-elproduktion/ersattning-egen-el/"
      },
      {
        title: "Månadspriser på elbörsen mellan 1996 och 2025",
        publisher: "Konsumenternas energimarknadsbyrå",
        url: "https://www.energimarknadsbyran.se/media/1834/manadspriser-pa-elborsen-mellan-1996-och-2025.pdf"
      }
    ],
    related: [
      "salja-el-fran-solceller",
      "skatt-pa-sald-solel",
      "solceller-vid-minuspris",
      "hur-mycket-sparar-man-pa-solceller",
      "natavgift-med-solceller"
    ],
    concepts: [
      "sjalvforbrukning",
      "kvartspris",
      "spotprisstyrning"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri: pris, storlek och märken"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "skatt-pa-sald-solel",
    category: "elnat-forsaljning-och-skatt",
    question: "Skatt på såld solel – måste man deklarera?",
    description: "Ja, såld el är inkomst av kapital, men 40 000 kr per år och privatbostad dras av som schablon. Skattereduktionen på 60 öre slopades den 1 januari 2026.",
    shortAnswer: "Ja, ersättningen för såld el ska redovisas som inkomst av kapital. Eftersom du får ett schablonavdrag på 40 000 kronor per år och privatbostad blir det i många fall ingen skatt. Skattereduktionen på 60 öre/kWh gäller inte el som matas in från 2026.",
    body: [
      {
        h2: "Så beskattas ersättningen",
        paragraphs: [
          "Ersättningen från elhandlaren räknas som inkomst från din privatbostad, på samma sätt som till exempel uthyrning. Schablonavdraget på 40 000 kronor gäller bostadens samlade inkomster under året. Bara det som överstiger 40 000 kronor beskattas.",
          "Ersättning för nätnytta från nätbolaget räknas in på samma sätt. Har du ett hembatteri som får betalt för stödtjänster, så kallad frekvensreglering, räknas även den ersättningen in bland bostadens inkomster.",
          "Skatteverkets hjälpblankett SKV 2199 hjälper dig att räkna ihop inkomsterna. Den skickas inte in. Blir det ett överskott efter avdraget fyller du i det i deklarationen."
        ]
      },
      {
        h2: "Det här behöver du normalt inte göra",
        paragraphs: [
          "Med solceller på en villa behöver du i regel inte:"
        ],
        bullets: [
          "Momsregistrera dig. Det krävs först om din försäljning blir högre än 120 000 kronor under ett kalenderår.",
          "Betala energiskatt på el du producerar, eftersom anläggningar under 500 kW är undantagna.",
          "Ansöka om F-skatt."
        ]
      },
      {
        h2: "60-öringen är borta",
        paragraphs: [
          "Skattereduktionen för mikroproduktion, 60 öre per inmatad kWh, gällde el som matades in till och med den 31 december 2025. För el som matas in från 2026 finns ingen reduktion, vilket märks första gången i deklarationen 2027."
        ]
      }
    ],
    searchPhrases: [
      "skatt på såld solel",
      "måste man deklarera solel",
      "skattereduktion solel",
      "skattereduktion såld solel",
      "skattereduktion solel 2026",
      "skattereduktion solceller 60 öre"
    ],
    sources: [
      {
        title: "Mikroproduktion av förnybar el – privatbostad",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/inkomsterfranbostad/mikroproduktionavfornybarelprivatbostad.4.12815e4f14a62bc048f41a7.html"
      },
      {
        title: "Ersättning för frekvensreglering",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/inkomsterfranbostad/ersattningforfrekvensreglering.4.17b07b1e194a69bf2769d7.html"
      }
    ],
    related: [
      "ersattning-for-sald-solel",
      "salja-el-fran-solceller",
      "bidrag-for-solceller",
      "lonar-sig-solceller"
    ],
    concepts: [
      "stodtjanster",
      "fcr-d"
    ],
    links: [
      {
        href: "/guider/gront-avdrag-2026",
        label: "Guide: Grönt avdrag 2026"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "maste-man-salja-elen",
    category: "elnat-forsaljning-och-skatt",
    question: "Måste man sälja el och vara ansluten till elnätet?",
    description: "Nej, du måste inte teckna säljavtal, men nätanslutna solceller ska anmälas till nätbolaget. Ö-drift utan elnät kräver batteri och ger inget grönt avdrag.",
    shortAnswer: "Nej, du måste inte teckna något avtal om att sälja el, och solceller kan i princip fungera helt utan elnät. Men en nätansluten anläggning ska anmälas till nätbolaget, och utan nät krävs batteri och en annan installation, och du får inget grönt avdrag.",
    body: [
      {
        h2: "Ansluten men utan säljavtal",
        paragraphs: [
          "När solcellerna producerar mer än huset använder matas överskottet in på nätet. Enligt ellagen ska det elhandelsföretag som levererar din el ta emot den på skäliga villkor, om du inte har avtal med någon annan. Du får alltså betalt även utan eget säljavtal, men det lönar sig att undersöka vilket bolag som ger bäst villkor.",
          "Oavsett om du säljer eller inte ska installatören göra en föranmälan till nätbolaget innan arbetet börjar och en färdiganmälan innan anläggningen tas i drift."
        ]
      },
      {
        h2: "Helt utan elnät",
        paragraphs: [
          "En solcellsanläggning går normalt i parallelldrift med elnätet. I ett hus utan nät måste produktion och förbrukning vara i balans hela tiden, så det krävs batteri, styrelektronik och en annan installation, till exempel eget jordtag och säker frånskiljning.",
          "Grönt avdrag gäller bara nätanslutna solcellssystem. Ett batteri ger avdrag bara om det är kopplat till en nätansluten anläggning för egen produktion av förnybar el."
        ]
      }
    ],
    searchPhrases: [
      "måste man sälja el från solceller",
      "måste man koppla solceller till elnätet",
      "solceller utan att sälja el",
      "solceller utan elnät"
    ],
    sources: [
      {
        title: "Ellag (1997:857)",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/ellag-1997857_sfs-1997-857/"
      },
      {
        title: "Fördjupning om löpande intäkter",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vilka-stod-och-intakter-kan-jag-fa/fordjupning-om-lopande-intakter/"
      },
      {
        title: "Planera din solcellsanläggning",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-solceller/planera-din-solcellsanlaggning"
      },
      {
        title: "Det här ingår i en solcellsanläggning",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/det-har-ingar-i-en-solcellsanlaggning/"
      },
      {
        title: "Godkända arbeten – grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/godkandaarbetengronteknik.4.676f4884175c97df419290e.html"
      }
    ],
    related: [
      "salja-el-fran-solceller",
      "anmala-solceller-till-natagaren",
      "solceller-utan-batteri",
      "kan-man-bli-sjalvforsorjande-pa-el",
      "solceller-vid-stromavbrott"
    ],
    concepts: [
      "o-drift-och-backup",
      "sjalvforbrukning"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri: pris, storlek och märken"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "sakring-for-solceller",
    category: "elnat-forsaljning-och-skatt",
    question: "Vilken säkring behövs för solceller?",
    description: "Oftast räcker din huvudsäkring: 16 A motsvarar cirka 11 kW, och 16–20 A rymmer 10–15 kW solceller. För avgiftsfri inmatning gäller högst 63 A och 43,5 kW.",
    shortAnswer: "Oftast räcker huvudsäkringen du redan har. Växelriktarens effekt får normalt inte vara större än vad huvudsäkringen tillåter, där 16 A motsvarar cirka 11 kW. För avgiftsfri inmatning får säkringen vara högst 63 A och inmatningen högst 43,5 kW.",
    body: [
      {
        h2: "Säkringsstorlek och effekt",
        paragraphs: [
          "Huvudsäkringen sitter vid elmätaren och begränsar hur mycket el huset kan använda samtidigt. Hos Ellevio får växelriktarens effekt inte överstiga det din huvudsäkring tillåter. Ellevio räknar så här:"
        ],
        bullets: [
          "16 A: cirka 11,1 kW",
          "20 A: cirka 13,9 kW",
          "25 A: cirka 17,3 kW",
          "35 A: cirka 24,2 kW",
          "63 A: cirka 43,6 kW"
        ]
      },
      {
        h2: "Räcker min säkring?",
        paragraphs: [
          "Energimyndigheten konstaterar att säkringen sällan begränsar en villaanläggning. En vanlig villa har 16–20 A, vilket räcker för 10–15 kW, och oftast är det takytan som sätter gränsen. Med en separat produktionssäkring kan en villa med 16 eller 20 A hos Ellevio få ha upp till 17,3 kW.",
          "Räcker säkringen inte kan du höja den, men då ökar den årliga nätavgiften. Alternativet är en mindre växelriktare eller ett batteri som tar hand om topparna. Ei påpekar att anläggningar med större säkring för inmatning än för uttag kan få högre avgifter när nätbolagen gör avgifterna kostnadsriktiga.",
          "Utöver huvudsäkringen installeras säkringar i elcentralen och säkerhetsbrytare på båda sidor om växelriktaren. De väljs och installeras av installatörens elektriker. Med högst 63 A och högst 43,5 kW inmatning betalar du enligt ellagen ingen avgift för inmatningen, en regel som upphävs den 1 januari 2027."
        ]
      }
    ],
    searchPhrases: [
      "vilken säkring solceller",
      "solceller säkring",
      "solceller säkringsstorlek"
    ],
    sources: [
      {
        title: "Abonnemang för elproduktion (mikroproduktion)",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/abonnemang/abonnemang-mikroproduktion/"
      },
      {
        title: "Bättre ekonomi med rätt anläggningsstorlek",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/battre-ekonomi-med-ratt-anlaggningsstorlek/"
      },
      {
        title: "Det här ingår i en solcellsanläggning",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/det-har-ingar-i-en-solcellsanlaggning/"
      },
      {
        title: "Ellag (1997:857)",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/ellag-1997857_sfs-1997-857/"
      },
      {
        title: "Frågor och svar om slopad reduktion av nätavgifter för småskaliga produktionsanläggningar",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/bransch/tariffer-nattariffer/fragor-och-svar-om-slopad-reduktion-av-natavgifter-for-smaskaliga-produktionsanlaggningar"
      }
    ],
    related: [
      "natavgift-med-solceller",
      "hur-stor-solcellsanlaggning-far-man-ha",
      "anmala-solceller-till-natagaren",
      "vad-gor-en-vaxelriktare"
    ],
    concepts: [
      "sakringsabonnemang",
      "kw-och-kwh"
    ],
    links: [
      {
        href: "/tjanster/solpaneler",
        label: "Solpaneler från Optimera Energi"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "stanga-av-solceller",
    category: "elnat-forsaljning-och-skatt",
    question: "Går det att stänga av solceller?",
    description: "Ja, via växelriktaren och säkerhetsbrytarna. Men panelerna ger spänning så länge det är ljust, så likströmskablarna kan vara strömförande ändå.",
    shortAnswer: "Ja. Du kan stänga av växelriktaren och bryta med säkerhetsbrytaren, så att anläggningen slutar leverera el till huset och nätet. Panelerna ger däremot spänning så länge det är ljust, så kablarna fram till växelriktaren kan fortfarande vara strömförande.",
    body: [
      {
        h2: "Så stänger du av",
        paragraphs: [
          "En solcellsanläggning har säkerhetsbrytare på båda sidor om växelriktaren, alltså både på likströmssidan från panelerna och på växelströmssidan mot huset. Nätbolag som Vattenfall Eldistribution kräver också en varselmärkt arbetsbrytare vid anläggningen som nätbolagets och räddningstjänstens personal kan nå. Vissa anläggningar har även brandmansbrytare eller nödstopp. Be installatören visa hur just din anläggning stängs av.",
          "Vid strömavbrott kopplar anläggningen automatiskt ned sig, så att den inte matar ut el på ett nät som ska vara strömlöst."
        ]
      },
      {
        h2: "Det här är fortfarande spänningssatt",
        paragraphs: [
          "Solcellerna omvandlar solljus till likström så fort de belyses. Därför kan panelerna och likströmskablarna vara spänningssatta även efter avstängning, och en växelriktare kan ha laddning kvar en stund efter att den stängts av. Har anläggningen optimerare, små enheter vid varje panel, med den funktionen ger panelerna bara likspänning när växelriktaren får växelspänning.",
          "Att koppla isär paneler och kablar, till exempel inför en takrenovering, är elinstallationsarbete som ska göras av ett registrerat elinstallationsföretag, liksom själva installationen."
        ]
      }
    ],
    searchPhrases: [
      "går det att stänga av solceller"
    ],
    sources: [
      {
        title: "Det här ingår i en solcellsanläggning",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/det-har-ingar-i-en-solcellsanlaggning/"
      },
      {
        title: "El från solen – anslut elproduktion",
        publisher: "Vattenfall Eldistribution",
        url: "https://www.vattenfalleldistribution.se/elnatsanslutning/anslut-elproduktion/el-fran-solen/"
      },
      {
        title: "Insatskort för energilagring och solcellsanläggningar",
        publisher: "Brandskyddsföreningen",
        url: "https://www.brandskyddsforeningen.se/globalassets/bilder/forlagsprodukter/komplettering/insatskort-for-energilagring-och-solcellsanlaggningar.pdf"
      },
      {
        title: "Planera din solcellsanläggning",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-solceller/planera-din-solcellsanlaggning"
      },
      {
        title: "Installera din solcellsanläggning",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-solceller/installera-din-solcellsanlaggning"
      }
    ],
    related: [
      "solceller-vid-stromavbrott",
      "kan-solceller-borja-brinna",
      "solceller-vid-minuspris",
      "vad-gor-en-vaxelriktare"
    ],
    concepts: [
      "o-drift-och-backup",
      "brandsakerhet-och-placering"
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "natavgift-med-solceller",
    category: "elnat-forsaljning-och-skatt",
    question: "Hur påverkas nätavgiften när man har solceller?",
    description: "Den fasta nätavgiften är oförändrad, men du betalar för färre kWh. Inmatning är i dag avgiftsfri upp till 63 A och 43,5 kW, men reglerna ändras 2027.",
    shortAnswer: "Den fasta delen av nätavgiften påverkas inte, men delen per kWh minskar när du köper mindre el. Enligt ellagen betalar du i dag ingen avgift för inmatning med högst 63 A och 43,5 kW, men den regeln upphävs 2027.",
    body: [
      {
        h2: "Det du köper från nätet",
        paragraphs: [
          "Nätavgiften består vanligen av en fast del, som beror på din huvudsäkring, och en rörlig överföringsavgift per kWh som du hämtar från nätet. Solel som du använder direkt i huset minskar antalet köpta kWh och därmed överföringsavgiften, energiskatten och momsen på dem.",
          "Har ditt nätbolag en effektavgift, även kallad effekttariff, gör solcellerna ofta liten skillnad för den, eftersom villor ofta använder mest el morgon och kväll, medan solcellerna producerar mest mitt på dagen. Sedan juni 2026 finns inget krav på att nätbolagen ska ha effektavgift, men den är inte heller förbjuden. Energimarknadsinspektionen (Ei) ska föreslå en ny modell senast den 12 april 2027."
        ]
      },
      {
        h2: "Det du matar ut",
        paragraphs: [
          "Enligt ellagen betalar den som har ett abonnemang på högst 63 A och kan mata in högst 43,5 kW ingen avgift för inmatningen. Ellevio tar till exempel inte ut någon inmatningsavgift av mikroproducenter 2026, och betalar nätnytta på 3,30–4,40 öre/kWh i Stockholm (exkl. moms).",
          "Ei bedömer att befrielsen strider mot EU:s krav på kostnadsriktiga avgifter, och ellagens regler om reducerade nätavgifter upphävs den 1 januari 2027. Då ersätts ellagen av en ny elmarknadslag som saknar motsvarande befrielse; hur avgifterna ska utformas kan i stället regleras i föreskrifter. För en villa med samma säkring för inmatning och uttag bedömer Ei att kostnadsökningen kan bli begränsad, men den kommer att variera mellan nätområden. Rätten till nätnytta finns kvar i den nya lagen."
        ]
      }
    ],
    searchPhrases: [
      "hur påverkas nätavgiften med solceller",
      "solceller effektavgift",
      "solceller effekttariff"
    ],
    sources: [
      {
        title: "Frågor och svar om slopad reduktion av nätavgifter för småskaliga produktionsanläggningar",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/bransch/tariffer-nattariffer/fragor-och-svar-om-slopad-reduktion-av-natavgifter-for-smaskaliga-produktionsanlaggningar"
      },
      {
        title: "Effektavgifter",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/konsument/el/elnatsavgiften-och-elnatsreglering/effektavgifter"
      },
      {
        title: "Abonnemang för elproduktion (mikroproduktion)",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/abonnemang/abonnemang-mikroproduktion/"
      },
      {
        title: "Bättre ekonomi med rätt anläggningsstorlek",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/battre-ekonomi-med-ratt-anlaggningsstorlek/"
      },
      {
        title: "Elmarknadslag (2026:1281)",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/elmarknadslag-20261281_sfs-2026-1281/"
      }
    ],
    related: [
      "sakring-for-solceller",
      "ersattning-for-sald-solel",
      "solceller-utan-batteri",
      "anmala-solceller-till-natagaren"
    ],
    concepts: [
      "effektavgift",
      "peak-shaving-och-effektvakt",
      "sakringsabonnemang"
    ],
    links: [
      {
        href: "/nyheter/effektavgifter-2026-stoppat-krav-ny-modell-batteri",
        label: "Effektavgifter 2026: kravet stoppat, ny modell på väg"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "anmala-solceller-till-natagaren",
    category: "elnat-forsaljning-och-skatt",
    question: "Måste man anmäla solceller till nätägaren?",
    description: "Ja. Installatören gör en föranmälan till nätbolaget innan arbetet börjar och en färdiganmälan före start. Sedan byts elmätaren vid behov utan kostnad.",
    shortAnswer: "Ja. En skriftlig föranmälan ska göras till nätbolaget innan installationen börjar, och anläggningen ska färdiganmälas innan den tas i drift. Båda anmälningarna görs normalt av elinstallationsföretaget som installerar solcellerna.",
    body: [
      {
        h2: "Så går det till",
        paragraphs: [
          "Gången ser oftast ut så här:"
        ],
        bullets: [
          "Föranmälan: elinstallationsföretaget skickar in en föranmälan i god tid. Nätbolaget kontrollerar att nätet klarar den effekt du vill mata in och ger installatören klartecken, hos Vattenfall Eldistribution kallat installationsmedgivande.",
          "Installation: arbetet ska göras av ett elinstallationsföretag som är registrerat hos Elsäkerhetsverket för verksamhetstypen Elproduktionsanläggningar. Det kan du kontrollera i e-tjänsten Kolla elföretaget.",
          "Färdiganmälan: när anläggningen är klar och kontrollerad skickar installatören en färdiganmälan till nätbolaget.",
          "Mätarbyte: nätbolaget byter vid behov elmätaren så att den kan mäta både köpt och inmatad el. Hos Vattenfall Eldistribution sker det normalt inom 3–5 veckor efter färdiganmälan.",
          "Start: slå inte på anläggningen innan mätaren är bytt, eftersom produktionen annars kan registreras som förbrukning."
        ]
      },
      {
        h2: "Kostar det något?",
        paragraphs: [
          "I dag är mätarbytet kostnadsfritt. Kräver anläggningen en större huvudsäkring får nätbolaget ta ut en avgift för säkringshöjningen. Ellagens regler om reducerade nätavgifter för små produktionsanläggningar upphävs den 1 januari 2027, så fråga ditt nätbolag vad som gäller om din anläggning ansluts efter årsskiftet."
        ]
      }
    ],
    searchPhrases: [
      "måste man anmäla solceller",
      "anmäla solceller till nätägare"
    ],
    sources: [
      {
        title: "Planera din solcellsanläggning",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-solceller/planera-din-solcellsanlaggning"
      },
      {
        title: "Installera din solcellsanläggning",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-solceller/installera-din-solcellsanlaggning"
      },
      {
        title: "El från solen – anslut elproduktion",
        publisher: "Vattenfall Eldistribution",
        url: "https://www.vattenfalleldistribution.se/elnatsanslutning/anslut-elproduktion/el-fran-solen/"
      },
      {
        title: "Rättigheter och skyldigheter vid anslutning till elnätet",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vilka-rattigheter-och-skyldigheter-har-jag-vid-installation/dina-rattigheter-och-skyldigheter-vid-anslutning-till-elnatet/"
      },
      {
        title: "Frågor och svar om slopad reduktion av nätavgifter för småskaliga produktionsanläggningar",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/bransch/tariffer-nattariffer/fragor-och-svar-om-slopad-reduktion-av-natavgifter-for-smaskaliga-produktionsanlaggningar"
      }
    ],
    related: [
      "installera-solceller-sjalv",
      "salja-el-fran-solceller",
      "sakring-for-solceller",
      "hur-lang-tid-tar-installationen",
      "solceller-och-forsakring"
    ],
    links: [
      {
        href: "/tjanster/solpaneler",
        label: "Solpaneler från Optimera Energi"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "kan-solceller-borja-brinna",
    category: "drift-sakerhet-och-livslangd",
    question: "Kan solceller börja brinna?",
    description: "Ja, men det är ovanligt. Små anläggningar på villor har ungefär samma brandrisk som husets övriga el. De flesta bränder beror troligen på installationsfel.",
    shortAnswer: "Ja, men det är ovanligt. Elsäkerhetsverket bedömer att små solcellsanläggningar på villor har ungefär samma brandrisk som husets övriga elinstallationer. De flesta bränder inträffar under det första driftåret och beror troligen på installationsfel.",
    body: [
      {
        h2: "Så vanligt är det",
        paragraphs: [
          "Elsäkerhetsverket har gått igenom räddningstjänstens händelserapporter, som samlas in av Myndigheten för civilt försvar (tidigare MSB). Under 2018–2024 fanns 155 bränder och brandtillbud med koppling till solceller. År 2025 halverades antalet till 27, samtidigt som antalet anläggningar ökade till 314 600. Elsäkerhetsverket påpekar ändå att brandrisken i ett småhus ungefär fördubblas när solceller tillkommer, eftersom de läggs till husets befintliga el. Den totala risken är fortfarande låg.",
          "Vanliga startpunkter är elcentraler, DC-brytare som har släppt in fukt samt likströmskablar och kontaktdon som är dåligt hopkopplade eller av olika fabrikat."
        ]
      },
      {
        h2: "Så minskar du risken",
        paragraphs: [
          "Anlita ett elinstallationsföretag som är registrerat hos Elsäkerhetsverket, vilket du kan kontrollera i e-tjänsten Kolla elföretaget. Elsäkerhetsverket tipsar också om att villkora slutbetalningen med en oberoende besiktning. Håll koll på larm från växelriktaren; nyare anläggningar ska larma vid isolationsfel på likströmssidan.",
          "Även taket spelar roll. Materialet under panelerna påverkar hur fort en brand sprider sig, och Storstockholms brandförsvar rekommenderar att montagesystem och taktäckning under panelerna är av obrännbart material. På en radhuslänga rekommenderar brandförsvaret dessutom minst 2,5 meter fritt på var sida om gränsen mellan bostäderna, så att räddningstjänsten kan göra hål i taket."
        ]
      },
      {
        h2: "Det här behöver räddningstjänsten veta",
        paragraphs: [
          "Panelerna på taket ger spänning så länge det är ljust. Räddningstjänsten betraktar därför en anläggning som inte kan göras helt spänningslös som farlig och vill tidigt veta att den finns. Storstockholms brandförsvar rekommenderar att brytare, växelriktare och spänningsförande kablar är tydligt märkta.",
          "Om så kallade brandkårsbrytare, DC-brytare som gör delar av kablaget spänningslöst, går bedömningarna isär. Flera räddningstjänster rekommenderar dem, medan Storstockholms brandförsvar främst nämner dem för större byggnader. Branschorganisationen Svensk Solenergi varnar för att brytarna själva kan orsaka brand om de installeras eller underhålls fel. Tänk också på att panelerna och kablarna fram till brytaren fortfarande är spänningssatta."
        ]
      }
    ],
    searchPhrases: [
      "kan solceller börja brinna",
      "solceller brand",
      "solceller brandrisk",
      "solceller tak brandrisk",
      "solceller brandkårsbrytare"
    ],
    sources: [
      {
        title: "Bränder och brandtillbud i solcellsanläggningar – orsaker och trender 2018–2024",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/globalassets/publikationer/rapporter/brander-och-brandtillbud-i-solcellsanlaggningar-orsaker-och-trender-2018-2024_dnr25ev5250.pdf"
      },
      {
        title: "Antalet elrelaterade bränder i solcellsanläggningar minskade kraftigt 2025",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/om-oss/press/nyheter/2026/antalet-elrelaterade-brander-i-solcellsanlaggningar-minskade-kraftigt-2025/"
      },
      {
        title: "Vägledning: Solcellsanläggningar och batterilagersystem (reviderad 2026-03-16)",
        publisher: "Storstockholms brandförsvar",
        url: "https://www.storstockholm.brand.se/globalassets/dokument/vagledningsdokument-och-foreskrifter/2026/vagledning-solcellsanlaggningar-och-batterilagersystem_2026_3426_ssbf.pdf"
      },
      {
        title: "Operativ metodik vid insatser där det finns solcellsanläggningar",
        publisher: "MSB (numera Myndigheten för civilt försvar)",
        url: "https://rib.msb.se/filer/pdf/28805.pdf"
      },
      {
        title: "Brandkårsbrytare kan utgöra risk",
        publisher: "Svensk Solenergi",
        url: "https://svensksolenergi.se/brandkarsbrytare-kan-utgora-risk/"
      }
    ],
    related: [
      "solceller-och-forsakring",
      "besikta-solceller",
      "installera-solceller-sjalv",
      "stanga-av-solceller",
      "solceller-vid-stromavbrott"
    ],
    concepts: [
      "brandsakerhet-och-placering"
    ],
    links: [],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solceller-vid-stromavbrott",
    category: "drift-sakerhet-och-livslangd",
    question: "Vad händer med solceller vid strömavbrott?",
    description: "En vanlig solcellsanläggning stängs av vid strömavbrott och ger ingen el. Reservkraft kräver rätt växelriktare, nätbolagets godkännande och oftast batteri.",
    shortAnswer: "En vanlig nätansluten solcellsanläggning stängs av automatiskt vid strömavbrott, så du får ingen el från den så länge avbrottet pågår, inte ens när solen skiner. Det är en säkerhetsfunktion som hindrar anläggningen från att mata ut el på elnätet.",
    body: [
      {
        h2: "Därför slår växelriktaren av",
        paragraphs: [
          "Ett elnät som är strömlöst får inte bli spänningssatt bakvägen från din anläggning. Därför ska anläggningen ha ett skydd mot så kallad oönskad ö-drift, som kopplar bort den när nätet försvinner. Nätbolaget Eskilstuna Energi och Miljö skriver till exempel att säkerheten går först, bland annat för de elmontörer som kan behöva hantera anläggningen.",
          "Själva solcellerna fungerar ändå, och panelerna på taket ger spänning så länge det är ljust. Det är omvandlingen till el för huset som stannar."
        ]
      },
      {
        h2: "Så kan du få el vid avbrott",
        paragraphs: [
          "Det kallas ö-drift, reservkraft eller backup och kräver särskild utrustning:"
        ],
        bullets: [
          "En växelriktare med reservkraftsfunktion. Alla växelriktare har inte det.",
          "En brytare som säkert skiljer huset från elnätet. Lösningen kräver nätbolagets godkännande.",
          "Oftast ett batteri. Utan batteri ger anläggningen bara el när solen skiner.",
          "Ett jordtag, om mer än en apparat ska drivas under avbrottet."
        ]
      },
      {
        paragraphs: [
          "Bestäm tillsammans med installatören vilka apparater som ska fungera, till exempel värmepump, kyl och belysning. Batteriets och växelriktarens kapacitet avgör vad som räcker och hur länge. Enligt Energimyndigheten är nödströmsfunktionen oftast en tilläggstjänst som kostar extra."
        ]
      }
    ],
    searchPhrases: [
      "vad händer med solceller vid strömavbrott",
      "vad händer med solpaneler vid strömavbrott",
      "hur fungerar solceller vid strömavbrott"
    ],
    sources: [
      {
        title: "För dig som installerat solceller",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/solceller-och-batterilager/skaffa-solceller/for-dig-som-installerat-solceller/"
      },
      {
        title: "Koppla batterier till solcellerna",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/batterier-kopplat-till-solceller/"
      },
      {
        title: "Fem steg till ö-drift",
        publisher: "Svensk Solenergi",
        url: "https://svensksolenergi.se/att-installera-solenergi/fem-steg/"
      },
      {
        title: "Tekniska villkor mikroproduktion & småskaligproduktion",
        publisher: "Eskilstuna Energi och Miljö Elnät",
        url: "https://www.eem.se/media/izpld4dk/tekniska-villkor-mikroproduktion-smaskaligproduktion-eem-2022-02-03-1.pdf"
      },
      {
        title: "Operativ metodik vid insatser där det finns solcellsanläggningar",
        publisher: "MSB (numera Myndigheten för civilt försvar)",
        url: "https://rib.msb.se/filer/pdf/28805.pdf"
      }
    ],
    related: [
      "solceller-utan-batteri",
      "stanga-av-solceller",
      "kan-man-bli-sjalvforsorjande-pa-el",
      "vad-gor-en-vaxelriktare",
      "kan-solceller-borja-brinna"
    ],
    concepts: [
      "o-drift-och-backup",
      "vaxelriktare-hybrid-ac-dc"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri till villa"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "hur-lange-haller-solceller",
    category: "drift-sakerhet-och-livslangd",
    question: "Hur länge håller solceller?",
    description: "Solpaneler håller minst 25–30 år och tappar bara lite effekt per år. Växelriktaren håller kortare tid och kan behöva bytas under panelernas livstid.",
    shortAnswer: "Den tekniska livslängden för solceller är oftast minst 25–30 år enligt Energimyndigheten, och panelerna tappar bara lite effekt per år. Växelriktaren håller kortare tid, så räkna med att den kan behöva bytas någon gång under panelernas livstid.",
    body: [
      {
        h2: "Garantitid och åldrande",
        paragraphs: [
          "Garantitiden skiljer sig mellan olika garantier. Produktgarantin gäller fel på själva panelen, och effektgarantin är ett löfte om hur mycket effekt panelen har kvar efter ett visst antal år. Energimyndighetens miniminivåer är 10 års produktgaranti och minst 80 procent av märkeffekten efter 20 år, och för växelriktaren 5 års produktgaranti.",
          "Vanliga effektgarantier sträcker sig längre än så: enligt Fraunhofer ISE tillåter de ofta högst 10–15 procent lägre effekt efter 25–30 år.",
          "Hur snabbt panelerna faktiskt åldras varierar. Fraunhofer ISE mätte i genomsnitt cirka 0,15 procent lägre effekt per år på 44 kvalitetssäkrade takanläggningar i Tyskland och bedömer att den vanliga kalkylsiffran 0,5 procent per år är försiktig för sådana anläggningar. IEA PVPS, Internationella energiorganets samarbetsprogram för solel, hänvisar till studier som visar 0,5–0,6 procent per år."
        ]
      },
      {
        h2: "Växelriktaren och taket",
        paragraphs: [
          "Växelriktaren, som gör om solcellernas likström till växelström, håller kortare tid än panelerna. IEA PVPS räknar i sina livscykelanalyser med 30 år för panelerna men 15 år för växelriktaren. Sveriges äldsta solcellsanläggning, från 1984 på ett flerbostadshus i Huvudsta, ger enligt Energimyndigheten något mer el i dag än när den byggdes, eftersom växelriktarna har bytts mot effektivare.",
          "Tänk också på taket. Enligt Energimyndigheten är det bra om taket håller lika länge som solcellerna, så att du slipper montera ner dem när taket ska rustas upp."
        ]
      }
    ],
    searchPhrases: [
      "hur länge håller solceller",
      "hur länge håller solpaneler",
      "hur länge håller en solcellsanläggning",
      "vad är livslängden på solpaneler",
      "solceller livslängd",
      "solpaneler livslängd",
      "hur länge håller solceller på tak",
      "solceller teknisk livslängd",
      "garantitid solceller"
    ],
    sources: [
      {
        title: "Så undersöker du taket",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/sa-undersoker-du-taket/"
      },
      {
        title: "Hjälp vid jämförelse av leverantörer och anbud",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vad-ska-jag-tanka-pa-vid-inkop-och-val-av-leverantor/hjalp-vid-jamforelse-av-leverantorer-och-anbud/"
      },
      {
        title: "Det här ingår i en solcellsanläggning",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/det-har-ingar-i-en-solcellsanlaggning/"
      },
      {
        title: "Aktuelle Fakten zur Photovoltaik in Deutschland (version 20.8.2026)",
        publisher: "Fraunhofer ISE",
        url: "https://www.ise.fraunhofer.de/content/dam/ise/de/documents/publications/studies/aktuelle-fakten-zur-photovoltaik-in-deutschland.pdf"
      },
      {
        title: "Environmental Life Cycle Assessment of Electricity from PV systems – 2023 data update (bildspel, maj 2024)",
        publisher: "IEA PVPS Task 12",
        url: "https://iea-pvps.org/wp-content/uploads/2024/05/Slides_IEA-PVPS-T12_Fact-Sheet-update-2023_v2.0.pdf"
      }
    ],
    related: [
      "vad-gor-en-vaxelriktare",
      "byta-tak-innan-solceller",
      "rengora-solpaneler",
      "atervinning-av-solceller",
      "aterbetalningstid-solceller"
    ],
    concepts: [
      "livslangd-och-cykler"
    ],
    links: [
      {
        href: "/guider/aterbetalningstid-solceller",
        label: "Guide: Återbetalningstid för solceller"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "rengora-solpaneler",
    category: "drift-sakerhet-och-livslangd",
    question: "Behöver man rengöra solpaneler – och hur gör man?",
    description: "Oftast inte, regnet sköljer bort smuts och pollen. Vid behov: spola med vatten med lågt tryck eller torka med en fuktad trasa. Gå aldrig på panelerna.",
    shortAnswer: "Oftast behöver du inte rengöra solpanelerna. Energimyndigheten konstaterar att det i Sverige vanligtvis regnar så ofta att smuts och pollen sköljs bort av sig självt. Finns det ett verkligt behov räcker vatten med lågt tryck eller en lätt fuktad trasa.",
    body: [
      {
        h2: "När kan det behövas?",
        paragraphs: [
          "Fraunhofer ISE nämner löv, fågelspillning, damm från byggen och jordbruk, sot från skorstenar och pollen som beläggningar som regnet inte alltid rår på. Paneler med låg lutning, under 15 grader, smutsas ned mest, ofta längs nederkanten. Eftersom cellerna är seriekopplade kan en kraftigt smutsad del sänka produktionen mer än sin andel av ytan. Om en rengöring lönar sig får bedömas från fall till fall.",
          "Ett enkelt sätt att upptäcka problem är att följa produktionen i växelriktarens app eller display och kontakta leverantören om den sjunker utan förklaring."
        ]
      },
      {
        h2: "Så gör du, och det här bör du undvika",
        paragraphs: [
          "Energimyndighetens råd för skötseln:"
        ],
        bullets: [
          "Titta från marken. En översiktlig kontroll därifrån räcker oftast, gärna på våren när snön har smält.",
          "Spola med vatten med lågt tryck, och bara vid verkligt behov. Hårt vatten kan ge kalkavlagringar.",
          "Torka bort alger på platta anläggningar, med under fem graders lutning, med en lätt fuktad trasa.",
          "Gå aldrig på panelerna. Cellerna bakom glaset kan få mikrosprickor.",
          "Skotta normalt inte bort snö. Du riskerar att skada panelerna och att själv falla.",
          "Följ tillverkarens skötselanvisning, som ska lämnas över tillsammans med anläggningen."
        ]
      }
    ],
    searchPhrases: [
      "hur rengör man solpaneler",
      "måste man tvätta solceller",
      "vad tvättar man solpaneler med",
      "hur rengör man solceller",
      "hur tvättar man solpaneler",
      "hur rengöra solceller",
      "solceller rengöring",
      "solpaneler rengöring"
    ],
    sources: [
      {
        title: "Drift och underhåll av din solcellsanläggning",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/drift-och-underhall-av-din-solcellsanlaggning/"
      },
      {
        title: "Aktuelle Fakten zur Photovoltaik in Deutschland (version 20.8.2026)",
        publisher: "Fraunhofer ISE",
        url: "https://www.ise.fraunhofer.de/content/dam/ise/de/documents/publications/studies/aktuelle-fakten-zur-photovoltaik-in-deutschland.pdf"
      }
    ],
    related: [
      "solceller-pa-vintern",
      "besikta-solceller",
      "hur-lange-haller-solceller",
      "solceller-pa-platt-tak",
      "vaderstreck-och-lutning"
    ],
    concepts: [],
    links: [],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solceller-och-miljon",
    category: "drift-sakerhet-och-livslangd",
    question: "Hur påverkar solceller miljön?",
    description: "En typisk villaanläggning i Europa ger cirka 36 g koldioxidekvivalenter per kWh över livscykeln. Energin för tillverkningen tjänas in på ungefär 1–2 år.",
    shortAnswer: "Solceller släpper inte ut koldioxid när de producerar el, men tillverkningen ger utsläpp. Räknat över hela livscykeln ger en typisk villaanläggning i Europa cirka 36 gram koldioxidekvivalenter per kWh, och energin som gick åt till tillverkningen tjänas in på ungefär 1–2 år.",
    body: [
      {
        h2: "Utsläpp och energiåterbetalning",
        paragraphs: [
          "Siffran 36 gram kommer från IEA PVPS, Internationella energiorganets samarbetsprogram för solel, och gäller en takanläggning med monokristallina paneler och 30 års livslängd. Enligt samma beräkning tjänar anläggningen in den icke förnybara energi som gick åt till tillverkningen på ungefär ett år.",
          "Fraunhofer ISE anger cirka 1,1 år för en anläggning som tillverkats i Europa och installerats i Nordeuropa. Paneler från Kina ger längre tid, eftersom elen i tillverkningen där har lägre andel förnybart. För Tyskland redovisar Fraunhofer ISE uppskattningar från under 1,3 upp till 2,1 år, beroende på paneltyp och hur färska produktionsdata som används."
        ]
      },
      {
        h2: "Hur stor är nyttan i Sverige?",
        paragraphs: [
          "Det beror på vilken el solelen antas ersätta, och här går bedömningarna isär. Den nordiska elmixen låg 2021–2023 på cirka 59 gram per kWh enligt IVL Svenska Miljöinstitutet, också räknat över hela livscykeln. Jämfört med den är skillnaden liten. Branschorganisationen Svensk Solenergi pekar i stället på studier där ny svensk solel ökar exporten och tränger undan fossil el i grannländerna, med stora skillnader mellan elområdena.",
          "Panelerna innehåller ofta bly och ska lämnas som elavfall när de är uttjänta."
        ]
      }
    ],
    searchPhrases: [
      "hur påverkar solceller miljön",
      "hur påverkar solpaneler miljön",
      "är solpaneler bra för miljön"
    ],
    sources: [
      {
        title: "Environmental Life Cycle Assessment of Electricity from PV systems – 2023 data update (bildspel, maj 2024)",
        publisher: "IEA PVPS Task 12",
        url: "https://iea-pvps.org/wp-content/uploads/2024/05/Slides_IEA-PVPS-T12_Fact-Sheet-update-2023_v2.0.pdf"
      },
      {
        title: "Photovoltaics Report (14 juli 2026)",
        publisher: "Fraunhofer ISE",
        url: "https://www.ise.fraunhofer.de/content/dam/ise/de/documents/publications/studies/Photovoltaics-Report.pdf"
      },
      {
        title: "Aktuelle Fakten zur Photovoltaik in Deutschland (version 20.8.2026)",
        publisher: "Fraunhofer ISE",
        url: "https://www.ise.fraunhofer.de/content/dam/ise/de/documents/publications/studies/aktuelle-fakten-zur-photovoltaik-in-deutschland.pdf"
      },
      {
        title: "Klimatpåverkan för köpt el har minskat visar nya beräkningar",
        publisher: "IVL Svenska Miljöinstitutet",
        url: "https://www.ivl.se/press/nyheter/2025-09-25-klimatpaverkan-for-kopt-el-har-minskat-visar-nya-berakningar.html"
      },
      {
        title: "Solelens klimatnytta",
        publisher: "Svensk Solenergi",
        url: "https://svensksolenergi.se/om-solenergi/solelens-klimatnytta/"
      }
    ],
    related: [
      "atervinning-av-solceller",
      "hur-lange-haller-solceller",
      "vad-ar-solceller-gjorda-av",
      "lonar-sig-solceller"
    ],
    concepts: [],
    links: [],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solceller-och-huspriset",
    category: "drift-sakerhet-och-livslangd",
    question: "Påverkar solceller huspriset och energideklarationen?",
    description: "Solel som används i huset kan ge bättre energideklaration, men effekten på huspriset är dåligt belagd. Fastighetsavgiften 2026 är högst 10 425 kr per hus.",
    shortAnswer: "Solceller kan förbättra husets energideklaration, men hur mycket de påverkar priset vid en försäljning är dåligt belagt i Sverige. Fastighetsavgiften har ett tak på 10 425 kronor per bostadsbyggnad för 2026, och Skatteverkets vägledning till fastighetsdeklarationen tar inte upp solceller bland standardfrågorna.",
    body: [
      {
        h2: "Energideklarationen",
        paragraphs: [
          "Enligt Boverket får solel räknas av från husets energianvändning bara om den används i huset samtidigt som den produceras, och bara om den fördelas på uppvärmning, varmvatten, komfortkyla eller annan energi som ingår i energiprestandan, inte på hushållsel. Såld överskottsel räknas inte, men solel som lagras i ett batteri i huset kan räknas. Årsproduktionen redovisas i deklarationen, men bara som information."
        ]
      },
      {
        h2: "Solceller vid husförsäljning",
        paragraphs: [
          "Vi har inte hittat någon svensk statistik över hur mycket solceller påverkar slutpriset, och Energimyndigheten konstaterar att kunskapen om hur försäljningar av hus med solceller har gått till är begränsad. Svensk Fastighetsförmedling skriver att ett energisnålt hus är mer attraktivt och att köpare ofta tar hänsyn till energikostnaden.",
          "Vid försäljningen ska det finnas en energideklaration som är högst tio år gammal. Köparen blir ny ägare till anläggningen, så lämna över dokumentation och skötselinstruktioner, och säg upp eller flytta över avtalet om såld el."
        ]
      },
      {
        h2: "Fastighetsavgift, inte fastighetsskatt",
        paragraphs: [
          "För ett färdigbyggt småhus betalar du kommunal fastighetsavgift, inte statlig fastighetsskatt. Avgiften för 2026 är 0,75 procent av taxeringsvärdet, men högst 10 425 kronor per bostadsbyggnad. Taket nås vid ett taxeringsvärde på 1 390 000 kronor, så har huset ett högre värde än så påverkas avgiften inte om värdet stiger. Taxeringsvärdet bygger bland annat på husets storlek, ålder och standardpoäng, och i Skatteverkets vägledning till fastighetsdeklarationen för småhus 2027 nämns inte solceller bland standardfrågorna."
        ]
      }
    ],
    searchPhrases: [
      "påverkar solceller huspriset",
      "hur påverkar solceller energideklaration",
      "solceller vid husförsäljning",
      "solceller och fastighetsskatt",
      "solceller fastighetsdeklaration"
    ],
    sources: [
      {
        title: "Lokalt producerad solel i energideklarationen",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/energideklaration/for-energiexperter/lokalt-producerad-solel-i-energideklarationen/"
      },
      {
        title: "Att tänka på vid avveckling eller flytt",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/att-tanka-pa-vid-avveckling-eller-flytt/"
      },
      {
        title: "Energideklaration – bra att veta",
        publisher: "Svensk Fastighetsförmedling",
        url: "https://www.svenskfast.se/guider/energideklaration/"
      },
      {
        title: "Fastighetsavgift och fastighetsskatt",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/fastighetsavgiftochfastighetsskatt.4.69ef368911e1304a625800013531.html"
      },
      {
        title: "Innehållet i fastighetsdeklarationen",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/fastighetstaxering/deklarerasmahus/innehalletifastighetsdeklarationen.4.515a6be615c637b9aa41532d.html"
      }
    ],
    related: [
      "solceller-och-forsakring",
      "besikta-solceller",
      "lonar-sig-solceller",
      "hur-lange-haller-solceller",
      "skatt-pa-sald-solel"
    ],
    concepts: [
      "sjalvforbrukning"
    ],
    links: [],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solceller-och-forsakring",
    category: "drift-sakerhet-och-livslangd",
    question: "Måste man anmäla solceller till försäkringsbolaget?",
    description: "Oftast inte. Hos If, Folksam och Trygg-Hansa ingår solceller i villaförsäkringen utan anmälan. Åldersavdrag och villkor skiljer sig, så läs ditt villkor.",
    shortAnswer: "Oftast inte. Hos flera stora bolag, bland annat If, Folksam och Trygg-Hansa, ingår solceller i villaförsäkringen utan att du behöver anmäla dem. Villkoren skiljer sig ändå mellan bolagen, så läs ditt eget villkor eller fråga ditt försäkringsbolag.",
    body: [
      {
        h2: "Det här skiljer sig mellan bolagen",
        paragraphs: [
          "Solcellerna räknas i regel som en elinstallation i huset, och skador av till exempel brand, storm, hagel och snötryck kan ersättas. Några skillnader att hålla koll på:"
        ],
        bullets: [
          "Åldersavdrag: If gör inget avdrag de första tio åren och därefter 5 procent per påbörjat år. Trygg-Hansa gör inget avdrag de första fem åren och därefter 8 procent per år.",
          "Leasing: Dina Försäkringar täcker solceller som du äger själv, men inte leasade anläggningar.",
          "Andra byggnader: sitter panelerna på en byggnad som är försäkrad till ett begränsat belopp behöver du enligt Folksam höja beloppet.",
          "Batteri: villkoren kan vara andra. If ersätter till exempel batterier med högst 200 000 kronor."
        ]
      },
      {
        h2: "Installationen spelar roll",
        paragraphs: [
          "Hos If är det en säkerhetsföreskrift att ett batterilager installeras av en behörig installatör, och ersättningen kan sättas ned om installationen är felaktig. Spara faktura, garantibevis och dokumentation. Folksam ber om garantibevis, kvitton och foton när du anmäler en skada.",
          "Energimyndigheten råder dig att stämma av med försäkringsbolaget att anläggningen ingår i din hemförsäkring och om premien påverkas. Det förekommer också att försäkringsbolag kräver en extern besiktning när installationen är klar."
        ]
      }
    ],
    searchPhrases: [
      "måste man anmäla solceller till försäkringsbolag",
      "solceller försäkring",
      "solceller försäkringsbolag",
      "solceller hemförsäkring",
      "if försäkring solceller",
      "folksam försäkring solceller",
      "försäkring solceller trygg hansa",
      "dina försäkringar solceller"
    ],
    sources: [
      {
        title: "Försäkring för solceller",
        publisher: "If",
        url: "https://www.if.se/privat/forsakringar/hemforsakring/villaforsakring/solceller"
      },
      {
        title: "Solceller – så täcker din villaförsäkring",
        publisher: "Folksam",
        url: "https://www.folksam.se/forsakringar/hemforsakring/villaforsakring/solceller"
      },
      {
        title: "Solceller eller solfångare – hur täcker försäkringen?",
        publisher: "Trygg-Hansa",
        url: "https://www.trygghansa.se/forsakringar/hemforsakring/villaforsakring/solceller"
      },
      {
        title: "Bra att tänka på innan du installerar solceller",
        publisher: "Dina Försäkringar",
        url: "https://www.dina.se/forsakringar/hemforsakring/tips-och-rad-om-hemforsakring/bra-att-tanka-pa-innan-du-installerar-solceller.html"
      },
      {
        title: "Så undersöker du taket",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/sa-undersoker-du-taket/"
      }
    ],
    related: [
      "kan-solceller-borja-brinna",
      "besikta-solceller",
      "hur-lange-haller-solceller",
      "solceller-och-huspriset"
    ],
    concepts: [],
    links: [],
    updatedAt: "2026-10-03"
  },
  {
    slug: "atervinning-av-solceller",
    category: "drift-sakerhet-och-livslangd",
    question: "Hur återvinns solceller?",
    description: "Solpaneler omfattas av producentansvar och lämnas som elavfall, oftast via kommunens återvinningscentral. Ram, glas och metaller återvinns, men inte allt.",
    shortAnswer: "Solpaneler räknas som elutrustning och omfattas av producentansvar. Det betyder att tillverkare och importörer ansvarar för att de samlas in och återvinns. Uttjänta paneler lämnas som elavfall, i dag oftast via kommunens återvinningscentral.",
    body: [
      {
        h2: "Så lämnar du gamla paneler",
        paragraphs: [
          "Enligt förordningen om producentansvar för elutrustning ska det finnas mottagningsställen där man gratis kan lämna solpaneler från hushåll, om panelerna släppts ut på EU-marknaden den 13 augusti 2012 eller senare. Återvinningscentralerna skickar elavfallet vidare till ett insamlingssystem som är godkänt av Naturvårdsverket, och återförsäljaren eller producenten ska kunna tala om var panelerna ska lämnas.",
          "Nedmonteringen är elarbete och ska göras av ett registrerat elinstallationsföretag, eftersom panelerna ger spänning så länge de är belysta. Elnätsföretaget ska också informeras."
        ]
      },
      {
        h2: "Vad händer med materialet?",
        paragraphs: [
          "Fraunhofer ISE beskriver processen så här: aluminiumramen, kablarna och kopplingsdosorna tas loss och metallerna återvinns. Sedan separeras glas, kopparledare, kisel och plast mekaniskt. Glaset används till förpackningsglas eller glasull och kislet som råvara i metallindustrin. Silver väger mindre än en promille av panelen men står för nästan halva materialvärdet, och om det tas tillvara beror bland annat på silverpriset.",
          "För stor elutrustning, där solpaneler ingår, är målet att minst 85 procent ska återvinnas och minst 80 procent förberedas för återanvändning eller materialåtervinnas. Fraunhofer ISE påpekar också att panelerna ofta innehåller bly och inte hör hemma bland hushållssoporna, och att återvinningen är tekniskt möjlig men sällan bär sig ekonomiskt med dagens priser."
        ]
      }
    ],
    searchPhrases: [
      "hur återvinns solceller",
      "solceller återvinning",
      "solpaneler återvinning"
    ],
    sources: [
      {
        title: "Solcellspaneler",
        publisher: "El-Kretsen",
        url: "https://www.el-kretsen.se/solcellspaneler"
      },
      {
        title: "Förordning (2022:1276) om producentansvar för elutrustning",
        publisher: "Riksdagen",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/forordning-20221276-om-producentansvar-for_sfs-2022-1276/"
      },
      {
        title: "Producentansvar för elutrustning",
        publisher: "Naturvårdsverket",
        url: "https://www.naturvardsverket.se/vagledning-och-stod/producentansvar/producentansvar-for-elutrustning/"
      },
      {
        title: "Att tänka på vid avveckling eller flytt",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/att-tanka-pa-vid-avveckling-eller-flytt/"
      },
      {
        title: "Aktuelle Fakten zur Photovoltaik in Deutschland (version 20.8.2026)",
        publisher: "Fraunhofer ISE",
        url: "https://www.ise.fraunhofer.de/content/dam/ise/de/documents/publications/studies/aktuelle-fakten-zur-photovoltaik-in-deutschland.pdf"
      }
    ],
    related: [
      "solceller-och-miljon",
      "hur-lange-haller-solceller",
      "vad-ar-solceller-gjorda-av",
      "stanga-av-solceller"
    ],
    concepts: [],
    links: [],
    updatedAt: "2026-10-03"
  },
  {
    slug: "besikta-solceller",
    category: "drift-sakerhet-och-livslangd",
    question: "Måste man besikta solceller?",
    description: "Nej, inget lagkrav. Men Elsäkerhetsverket ser en frivillig besiktning som klok, till exempel efter installationen eller när du köper hus med solceller.",
    shortAnswer: "Nej, det finns inget lagkrav på att besikta en solcellsanläggning. Elsäkerhetsverket menar ändå att en frivillig besiktning är klok, till exempel när anläggningen är nybyggd eller när du köper ett hus med solceller.",
    body: [
      {
        h2: "Det här krävs ändå",
        paragraphs: [
          "Elinstallationsföretaget ska kontrollera anläggningen innan den tas i bruk. Elsäkerhetsverket rekommenderar att du begär att kontrollen dokumenteras och lämnas över till dig, och att du inte låter anläggningen tas i bruk om ingen kontroll görs.",
          "Därefter är du som ägare ansvarig för att anläggningen kontrolleras fortlöpande. Mycket kan du göra själv, till exempel se över larm i växelriktaren och titta efter skadade kablar och paneler. Att kontrollera är dock inte samma sak som att besikta, påpekar Elsäkerhetsverket."
        ]
      },
      {
        h2: "När en besiktning gör nytta",
        paragraphs: [
          "Elsäkerhetsverket tipsar om att villkora slutbetalningen med en oberoende besiktning. Det kan också vara värt att besikta efter några års drift eller när du köper ett hus med solceller. En besiktning kan till exempel innehålla:"
        ],
        bullets: [
          "Mätning med värmekamera av kopplingar och kontaktdon.",
          "Kontroll av kablar, infästningar, fukt och korrosion.",
          "Test av brytare och av växelriktarens skydd mot inkoppling på ett strömlöst nät.",
          "Genomgång av skyltning och dokumentation."
        ]
      },
      {
        paragraphs: [
          "Svensk Solenergi har en lista över registrerade besiktningspersoner. Elsäkerhetsverket kan inte säga vad en besiktning bör kosta, så beskriv uppdraget noga och jämför offerter."
        ]
      }
    ],
    searchPhrases: [
      "måste man besikta solceller"
    ],
    sources: [
      {
        title: "Finns det krav på besiktning vid installation av solceller? Eller är det bara en klok åtgärd?",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/om-oss/press/nyheter/2025/finns-det-krav-pa-besiktning-vid-installation-av-solceller-eller-bara-en-klok-atgard/"
      },
      {
        title: "Antalet elrelaterade bränder i solcellsanläggningar minskade kraftigt 2025",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/om-oss/press/nyheter/2026/antalet-elrelaterade-brander-i-solcellsanlaggningar-minskade-kraftigt-2025/"
      },
      {
        title: "Elsäkerhet",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vilka-rattigheter-och-skyldigheter-har-jag-vid-installation/elsakerhet/"
      },
      {
        title: "Drift och underhåll av din solcellsanläggning",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/drift-och-underhall-av-din-solcellsanlaggning/"
      },
      {
        title: "Besiktningspersoner",
        publisher: "Svensk Solenergi",
        url: "https://svensksolenergi.se/att-installera-solenergi/besiktning/"
      }
    ],
    related: [
      "kan-solceller-borja-brinna",
      "installera-solceller-sjalv",
      "solceller-och-huspriset",
      "rengora-solpaneler",
      "solceller-och-forsakring"
    ],
    concepts: [],
    links: [],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solceller-utan-batteri",
    category: "batteri-elbil-och-varmepump",
    question: "Kan man ha solceller utan batteri?",
    description: "Ja, de flesta anläggningar saknar batteri. Solelen används direkt i huset, överskottet säljs via elnätet och resten köper du som vanligt från nätet.",
    shortAnswer: "Ja, så fungerar de flesta solcellsanläggningar. Solelen används direkt i huset när du behöver den, överskottet matas ut på elnätet och kan säljas, och när solen inte räcker köper du el som vanligt.",
    body: [
      {
        h2: "Så fungerar det",
        paragraphs: [
          "Växelriktaren gör om panelernas likström till växelström som går till husets elcentral. Elen används i första hand i huset. Producerar anläggningen mer än du använder för stunden går överskottet ut på nätet, och elmätaren mäter både det du köper och det du matar in.",
          "Utan batteri använder en villa bara en del av solelen själv. Optimera Energis erfarenhet är att det typiskt rör sig om 30–40 procent, eftersom villor ofta använder mest el morgon och kväll medan solcellerna producerar mest mitt på dagen."
        ]
      },
      {
        h2: "Med eller utan batteri?",
        paragraphs: [
          "Den el du använder själv är oftast värd mer än den du säljer. Du slipper då elpris, energiskatt (45 öre/kWh inklusive moms 2026), rörlig nätavgift och moms, medan såld el ger ungefär spotpriset plus några öre. Med ett batteri kan du spara överskottet och använda det senare. Enligt Optimera Energis erfarenhet stiger andelen solel du använder själv då typiskt till 70–80 procent."
        ],
        bullets: [
          "Flytta förbrukning som kan vänta, som disk, tvätt och elbilsladdning, till dagtid.",
          "Utan batteri ger solcellerna ingen el i huset vid strömavbrott.",
          "Ett batteri kan läggas till senare. Det ger grönt avdrag på 50 procent av kostnaden för arbete och material om det kopplas till din nätanslutna solcellsanläggning."
        ]
      }
    ],
    searchPhrases: [
      "kan man ha solceller utan batteri",
      "hur funkar solceller utan batteri",
      "solceller utan batteri",
      "solceller med eller utan batteri",
      "solcellsanläggning utan batteri"
    ],
    sources: [
      {
        title: "Det här ingår i en solcellsanläggning",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/har-mitt-hus-ratt-forutsattningar/det-har-ingar-i-en-solcellsanlaggning/"
      },
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
        title: "Energiskatt",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/konsument/el/elmarknaden/energiskatt"
      },
      {
        title: "Godkända arbeten – grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/godkandaarbetengronteknik.4.676f4884175c97df419290e.html"
      }
    ],
    related: [
      "vad-kostar-solceller-med-batteri",
      "hur-mycket-sparar-man-pa-solceller",
      "salja-el-fran-solceller",
      "solceller-vid-stromavbrott"
    ],
    concepts: [
      "sjalvforbrukning",
      "sa-fungerar-ett-solcellsbatteri",
      "batteriets-intaktskallor"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri: pris, storlek och märken"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solceller-och-varmepump",
    category: "batteri-elbil-och-varmepump",
    question: "Kan solceller driva en värmepump?",
    description: "Ja, när solen lyser. Över året kan 4 kWp motsvara en värmepump som drar 4 000 kWh, men november–februari ger de bara cirka 360 kWh. Resten tas från nätet.",
    shortAnswer: "Ja, när solen lyser kan solelen driva värmepumpen direkt, och över ett år kan solcellerna producera lika mycket el som pumpen drar. Men värmepumpen arbetar mest på vintern, när solcellerna ger minst, så då kommer det mesta av elen från nätet.",
    body: [
      {
        h2: "Hur många solceller behövs? Ett räkneexempel",
        paragraphs: [
          "Exempel, med antagandet att luft-luftvärmepumpen drar 4 000 kWh el per år, att panelerna sitter i söderläge i Stockholm och att varje panel är på 500 W (produktion enligt EU:s beräkningsverktyg PVGIS):"
        ],
        bullets: [
          "Årsbalans: 4 000 kWh ÷ 980 kWh per kWp ≈ 4 kWp, ungefär 8 paneler.",
          "November–februari: 4 kWp ger bara cirka 360 kWh tillsammans under de fyra månaderna.",
          "Juni: 4 kWp ger cirka 570 kWh på en månad."
        ]
      },
      {
        h2: "Därför matchar de dåligt på vintern",
        paragraphs: [
          "En luft-luftvärmepump hämtar värme ur uteluften, och när det är riktigt kallt finns det mindre värme att hämta. Den behöver alltså mest el just när solcellerna ger minst. Kyler du med pumpen på sommaren sammanfaller den förbrukningen däremot med solens bästa månader.",
          "Vill du kombinera solceller och värmepump, styr värmepumpen och varmvattnet så att de arbetar mer när solen lyser. Ei råder dig att välja en styrtjänst som tar hänsyn till både elpriset, en eventuell effektavgift och din egen solelproduktion. Ett batteri kan flytta solel från dag till kväll, men inte från sommar till vinter. Det skulle kräva mycket stor lagringskapacitet och bli mycket kostsamt."
        ]
      }
    ],
    searchPhrases: [
      "hur många solceller behövs för att driva en luftvärmepump",
      "solceller värmepump",
      "solceller och värmepump",
      "kombinera solceller och värmepump",
      "solceller till värmepump"
    ],
    sources: [
      {
        title: "PVGIS – Photovoltaic Geographical Information System",
        publisher: "EU-kommissionens gemensamma forskningscentrum (JRC)",
        url: "https://re.jrc.ec.europa.eu/pvg_tools/en/"
      },
      {
        title: "Välj rätt värmepump",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/husguiden-for-dig-som-vill-energieffektivisera-ditt-hus/se-over-husets-uppvarmningssystem/valj-ratt-varmepump/"
      },
      {
        title: "Styr din uppvärmning och kyla",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/konsument/anvand-el-smartare/styr-din-elanvandning/styr-din-uppvarmning-och-kyla"
      },
      {
        title: "Koppla batterier till solcellerna",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/batterier-kopplat-till-solceller/"
      }
    ],
    related: [
      "solceller-pa-vintern",
      "solceller-for-att-ladda-elbil",
      "kan-man-bli-sjalvforsorjande-pa-el",
      "solceller-och-direktverkande-el",
      "hur-mycket-el-producerar-solceller"
    ],
    concepts: [
      "sjalvforbrukning",
      "spotprisstyrning",
      "effektavgift"
    ],
    links: [
      {
        href: "/solcellsbatteri",
        label: "Solcellsbatteri: pris, storlek och märken"
      }
    ],
    updatedAt: "2026-10-03"
  },
  {
    slug: "solceller-for-att-ladda-elbil",
    category: "batteri-elbil-och-varmepump",
    question: "Hur många solpaneler behövs för att ladda en elbil?",
    description: "Cirka 3 kWp, 6–7 paneler, ger på ett år lika mycket el som en elbil drar på 1 500 mil. Men i december räcker de bara till en sjundedel av bilens behov.",
    shortAnswer: "Räknat över ett år krävs ungefär 6–7 paneler, cirka 3 kWp, för en elbil som körs 1 500 mil. Men solcellerna producerar nästan allt under sommarhalvåret, så på vintern kommer det mesta av laddningen ändå från elnätet.",
    body: [
      {
        h2: "Så räknar vi",
        paragraphs: [
          "Exempel, med antagandet att bilen körs 1 500 mil per år och drar 2 kWh per mil, att panelerna sitter i söderläge i Stockholm och att varje panel är på 500 W:"
        ],
        bullets: [
          "Bilens behov: 1 500 mil × 2 kWh = 3 000 kWh per år.",
          "Produktion: cirka 980 kWh per kWp och år enligt EU:s beräkningsverktyg PVGIS. Optimera Energis guide räknar med cirka 1 050 kWh för ett välplacerat tak i Stockholm.",
          "Behov av solceller: 3 000 ÷ 980 ≈ 3,1 kWp, alltså 6–7 paneler."
        ]
      },
      {
        h2: "Antagandena",
        paragraphs: [
          "En personbil i Sverige körde i genomsnitt 1 243 mil 2025, och laddbara bilar ungefär 1 700 mil (Trafikanalys). Genomsnittet för elbilsmodellerna i EV Database är cirka 1,9 kWh per mil i verklig körning, men skillnaden mellan modeller är stor."
        ]
      },
      {
        h2: "Sommar och vinter skiljer sig mycket",
        paragraphs: [
          "I juni ger 3 kWp runt 430 kWh, mer än bilen behöver. I december ger samma anläggning bara runt 35 kWh, ungefär en sjundedel av de 250 kWh bilen drar i månaden.",
          "Tidpunkten spelar också roll. Solelen går bara direkt till bilen om den står hemma och laddar när solen lyser. De flesta elbilar kan ladda med 11 kW, långt mer än 3 kWp solceller kan ge, så resten tas från nätet om laddningen inte styrs efter solproduktionen."
        ]
      }
    ],
    searchPhrases: [
      "hur många solpaneler behövs för att ladda elbil",
      "hur många solceller behövs för att ladda en elbil",
      "hur mycket solceller behövs för att ladda elbil",
      "hur många solpaneler krävs för att ladda en elbil",
      "solceller ladda elbil"
    ],
    sources: [
      {
        title: "PVGIS – Photovoltaic Geographical Information System",
        publisher: "EU-kommissionens gemensamma forskningscentrum (JRC)",
        url: "https://re.jrc.ec.europa.eu/pvg_tools/en/"
      },
      {
        title: "Körsträckor 2025",
        publisher: "Trafikanalys",
        url: "https://www.trafa.se/globalassets/statistik/vagtrafik/korstrackor/2025/korstrackor-2025---2026-09-21.pdf"
      },
      {
        title: "Energy consumption of full electric vehicles",
        publisher: "EV Database",
        url: "https://ev-database.org/cheatsheet/energy-consumption-electric-car"
      },
      {
        title: "Styr laddningen av din elbil",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/konsument/anvand-el-smartare/styr-din-elanvandning/styr-laddningen-av-din-elbil"
      }
    ],
    related: [
      "hur-mycket-el-producerar-solceller",
      "solceller-pa-vintern",
      "hur-manga-solpaneler-behover-jag",
      "solceller-och-varmepump",
      "solceller-utan-batteri"
    ],
    concepts: [
      "kw-och-kwh",
      "sjalvforbrukning",
      "spotprisstyrning"
    ],
    links: [
      {
        href: "/tjanster/laddboxar",
        label: "Laddboxar från Optimera Energi"
      }
    ],
    updatedAt: "2026-10-03"
  }
];
