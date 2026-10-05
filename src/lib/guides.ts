/**
 * Guide-hubben på /guider – kunskapsbankens fördjupningar. Här ligger
 * det som inte hör hemma i Solcellsfrågor eller Batteriskolan: värmepump,
 * laddbox, elpris och elområden, stöd och avdrag, pris och återbetalning.
 *
 * Nya guider skrivs i AI-sökformatet (se guide-content.ts): kort svar
 * först, faktaruta, H2:or som frågor, källor. Äldre guider utan källor
 * visas som "Uppdaterad" i stället för "Faktagranskad" tills de gåtts
 * igenom.
 *
 * Status:
 *   "published" – fullskriven, indexeras, ligger i sitemap
 *   "draft"     – placeholder med noindex, exkluderas från sitemap
 *
 * När en draft fylls med innehåll, byt status till "published" och
 * uppdatera updatedAt + sitemap-LAST_MOD.
 */

import type { KbSource } from "./kb-types";
import type { ServiceSlug } from "./services";

export type GuideStatus = "published" | "draft";

export type Guide = {
  slug: string;
  status: GuideStatus;
  /** Gärna frågan som folk söker på. */
  title: string;
  excerpt: string;
  category: "Solceller" | "Batteri" | "Värmepump" | "Laddbox" | "Elpris" | "Ekonomi";
  /** Saknas på de äldsta guiderna – då gäller updatedAt. */
  publishedAt?: string;
  /** Senast uppdaterad eller faktagranskad. */
  updatedAt: string;
  /** Estimerad lästid i minuter. */
  readTimeMin: number;
  /** Sökfraser guiden besvarar – keywords i schemat och underlag för kb-check. */
  searchPhrases?: string[];
  /** Tjänstesidor guiden länkar vidare till. */
  services?: ServiceSlug[];
  /** Källorna guiden bygger på – visas under texten och blir citation i schemat. */
  sources?: KbSource[];
};

export const GUIDES: Guide[] = [
  {
    slug: "installera-laddbox-hemma",
    status: "published",
    title: "Vad kostar det att installera en laddbox hemma 2026, och vad krävs?",
    excerpt: "En laddbox kostar cirka 5 000–12 000 kr plus installation (2024). Här är vad som höjer priset, vem som får installera och vad grönt avdrag ger 2026.",
    category: "Laddbox",
    publishedAt: "2026-10-05",
    updatedAt: "2026-10-05",
    readTimeMin: 8,
    searchPhrases: [
      "installera laddbox",
      "installation laddbox",
      "installera laddbox hemma pris",
      "vad kostar laddbox med installation",
      "vad kostar en laddbox",
      "installera laddbox själv",
      "bidrag laddbox",
      "laddbox dubbla uttag",
    ],
    services: [
      "laddboxar",
    ],
    sources: [
      {
        title: "Installera din laddningspunkt",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-elbilsladdare/installera-din-laddningspunkt/",
      },
      {
        title: "Laddstationer – frågor och svar",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/dina-elprodukter/produkter/laddstationer/",
      },
      {
        title: "Säker utbyggnad och användning av laddinfrastruktur för laddbara fordon (vägledning MSB2559, maj 2025)",
        publisher: "MSB, Boverket och Elsäkerhetsverket",
        url: "https://rib.msb.se/filer/pdf/31090.pdf",
      },
      {
        title: "Så fungerar skattereduktion för grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/safungerarskattereduktionenforgronteknik.4.676f4884175c97df4192870.html",
      },
      {
        title: "Godkända arbeten – grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/godkandaarbetengronteknik.4.676f4884175c97df419290e.html",
      },
      {
        title: "Ökade möjligheter till hemmaladdning av elfordon (prop. 2025/26:148, antagen av riksdagen)",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/proposition/okade-mojligheter-till-hemmaladdning-av-elfordon_hd03148/",
      },
      {
        title: "Ladda bilen för föreningar och boendeorganisationer",
        publisher: "Naturvårdsverket",
        url: "https://www.naturvardsverket.se/amnesomraden/klimatomstallningen/ladda-bilen/ladda-bilen-for-foreningar-och-boendeorganisationer/",
      },
      {
        title: "Installera laddplats hemma – så gör du",
        publisher: "Energi- och klimatrådgivningen",
        url: "https://energiochklimatradgivningen.se/hushall/resahallbart/laddaelbilenhemma.852.html",
      },
      {
        title: "Goda råd: Ladda din elbil säkert! (reviderad juni 2026)",
        publisher: "Brandskyddsföreningen",
        url: "https://www.brandskyddsforeningen.se/globalassets/artikelsidor/sakra-hemmet/goda-rad-blad/goda-rad-blad-pdf/goda_rad_elbilar-revidering-20260603.pdf",
      },
    ],
  },
  {
    slug: "villaeffekten-bidrag",
    status: "published",
    title: "Vad är Villaeffekten och vem kan söka bidraget 2026?",
    excerpt: "Villaeffekten ger 30 % av materialkostnaden, högst 60 000 kr, för energiåtgärder i småhus med värdeår före 1990. Så söker du hos Boverket och Länsstyrelsen.",
    category: "Ekonomi",
    publishedAt: "2026-10-04",
    updatedAt: "2026-10-04",
    readTimeMin: 7,
    searchPhrases: [
      "villaeffekten",
      "villaeffekten bidrag 2026",
      "bidrag för energieffektivisering i småhus",
      "villaeffekten hur söker man",
      "villaeffekten värmepump",
      "villaeffekten luft luft",
      "villaeffekten rotavdrag",
      "villaeffekten söka före eller efter",
    ],
    services: [
      "vaermepumpar",
    ],
    sources: [
      {
        title: "Bidrag för energieffektivisering i småhus",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/bidrag--garantier/bidrag-for-energieffektivisering-i-smahus/",
      },
      {
        title: "Möjliga åtgärder vid ansökan om bidrag för energieffektivisering i småhus",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/bidrag--garantier/bidrag-for-energieffektivisering-i-smahus/mojliga-energieffektiviseringsatgarder/",
      },
      {
        title: "Förordning (2023:402) om bidrag för energieffektivisering i småhus",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/forordning-2023402-om-bidrag-for_sfs-2023-402/",
      },
      {
        title: "Bidrag för energieffektivisering i småhus",
        publisher: "Länsstyrelsen Stockholm",
        url: "https://www.lansstyrelsen.se/stockholm/samhalle/planera-bygga-och-bo/bidrag-for-bostader/bidrag-for-energieffektivisering-i-smahus.html",
      },
      {
        title: "Frågor och svar om bidraget för energieffektivisering i småhus",
        publisher: "Regeringen",
        url: "https://www.regeringen.se/regeringens-politik/energi/fragor-och-svar-om-bidraget-for-energieffektivisering-i-smahus/",
      },
      {
        title: "Så fungerar rotavdraget",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/rotarbeteochrutarbete/safungerarrotavdraget.4.5947400c11f47f7f9dd80004014.html",
      },
    ],
  },
  {
    slug: "ladda-elbil-hemma-kostnad",
    status: "published",
    title: "Vad kostar det att ladda elbilen hemma – och behöver man en laddbox?",
    excerpt: "Att ladda elbilen hemma kostar cirka 4 kr per mil vid 2 kr/kWh och 2 kWh/mil. Elsäkerhetsverket avråder från vanligt vägguttag. Laddbox ger 50 % avdrag 2026.",
    category: "Laddbox",
    publishedAt: "2026-10-04",
    updatedAt: "2026-10-04",
    readTimeMin: 7,
    searchPhrases: [
      "vad kostar det att ladda elbil hemma",
      "ladda elbil hemma kostnad per mil",
      "behöver man laddbox",
      "ladda elbil i vanligt uttag",
      "laddbox 11 kW eller 22 kW",
      "grönt avdrag laddbox 2026",
      "laddbox bostadsrätt avdrag",
      "lastbalansering laddbox",
    ],
    services: [
      "laddboxar",
    ],
    sources: [
      {
        title: "PM Vägtrafikens utsläpp 2025 (tabell 4, nya personbilars förbrukning enligt WLTP)",
        publisher: "Trafikverket",
        url: "https://bransch.trafikverket.se/contentassets/bdc6eaecf796497dbf5720a71e607fd1/pm-vagtrafikens-utslapp-2025.pdf",
      },
      {
        title: "Installation av elbilsladdare",
        publisher: "Elsäkerhetsverket",
        url: "https://www.elsakerhetsverket.se/privatpersoner/din-elanlaggning/bygga-och-renovera/installation-av-elbilsladdare/",
      },
      {
        title: "Säker utbyggnad och användning av laddinfrastruktur för laddbara fordon (vägledning MSB2559, maj 2025)",
        publisher: "MSB, Boverket och Elsäkerhetsverket",
        url: "https://rib.msb.se/filer/pdf/31090.pdf",
      },
      {
        title: "Godkända arbeten – grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/godkandaarbetengronteknik.4.676f4884175c97df419290e.html",
      },
      {
        title: "Så fungerar skattereduktion för grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/safungerarskattereduktionenforgronteknik.4.676f4884175c97df4192870.html",
      },
      {
        title: "Säkringsabonnemang för privatkunder villa eller radhus – prislista 2026",
        publisher: "Vattenfall Eldistribution",
        url: "https://www.vattenfalleldistribution.se/abonnemang-och-avgifter/avtal-och-avgifter/elnatsavgifter/sakringsabonnemang-16-63a/",
      },
    ],
  },
  {
    slug: "spotpris-och-elomraden",
    status: "published",
    title: "Vad är spotpris och elområden (SE1–SE4)?",
    excerpt: "Spotpriset är elbörsens pris i ditt elområde, satt per kvart sedan 1 oktober 2025. Så funkar SE1–SE4, varför söder ofta är dyrare och vad mer du betalar.",
    category: "Elpris",
    publishedAt: "2026-10-04",
    updatedAt: "2026-10-04",
    readTimeMin: 6,
    searchPhrases: [
      "vad är spotpris",
      "vilket elområde bor jag i",
      "elområde stockholm",
      "varför är elen dyrare i södra sverige",
      "energiskatt el 2026",
      "vad består elräkningen av",
      "skillnad kvartspris månadspris fast pris",
    ],
    services: [
      "batterier",
    ],
    sources: [
      {
        title: "Elområden",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/konsument/el/elmarknaden/elomraden",
      },
      {
        title: "Elområden och prisskillnader",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/om-kraftsystemet/om-elmarknaden/elomraden/elomraden-och-prisskillnader/",
      },
      {
        title: "15 Minute MTU Implemented in SDAC",
        publisher: "Nord Pool",
        url: "https://www.nordpoolgroup.com/en/message-center-container/newsroom/exchange-message-list/2025/q4/15-minute-mtu-in-sdac-was-implemented/",
      },
      {
        title: "Sänkt skatt på el 1 januari 2026",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/foretag/skatterochavdrag/punktskatter/nyheterinompunktskatter/2025/nyheterinompunktskatter/sanktskattpael1januari2026.5.1522bf3f19aea8075ba96f.html",
      },
      {
        title: "Energiskatt",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/konsument/el/elmarknaden/energiskatt",
      },
      {
        title: "Olika avtalstyper",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/konsument/el/elavtal/olika-avtalstyper",
      },
    ],
  },
  {
    slug: "luft-vatten-eller-bergvarme",
    status: "published",
    title: "Luft-vatten eller bergvärme – vilken värmepump passar mitt hus?",
    excerpt: "Bergvärme har högre årsvärmefaktor och påverkas inte av kyla men kostar mer. Luft-vatten är billigare men tappar i kyla. Kostnad, krav, ROT och bidrag 2026.",
    category: "Värmepump",
    publishedAt: "2026-10-04",
    updatedAt: "2026-10-04",
    readTimeMin: 7,
    searchPhrases: [
      "luft vatten eller bergvärme",
      "skillnad bergvärme och luft vatten värmepump",
      "vad kostar bergvärme",
      "luft vatten värmepump kallt klimat",
      "scop bergvärme luft vatten",
      "anmälan bergvärme kommun",
      "rotavdrag bergvärme 2026",
    ],
    services: [
      "vaermepumpar",
    ],
    sources: [
      {
        title: "Välj rätt värmepump",
        publisher: "Energimyndigheten",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/husguiden-for-dig-som-vill-energieffektivisera-ditt-hus/se-over-husets-uppvarmningssystem/valj-ratt-varmepump/",
      },
      {
        title: "Värmepumpar – en guide från energi- och klimatrådgivningen (ET 2025:05)",
        publisher: "Energimyndigheten",
        url: "https://energiochklimatradgivningen.se/download/18.5e9a579b195c021e865e6618/1742900645694/V%C3%A4rmepumpar_en%20guide%20fr%C3%A5n%20energi-%20och%20klimatr%C3%A5dgivningen%202025.pdf.pdf",
      },
      {
        title: "Berg-, jord-, eller sjövärmepump",
        publisher: "Energi- och klimatrådgivningen",
        url: "https://energiochklimatradgivningen.se/hushall/uppvarmning/olikavarmesystem/varmepumpar/bergjordellersjovarmepump.845.html",
      },
      {
        title: "Luft-vattenvärmepump",
        publisher: "Energi- och klimatrådgivningen",
        url: "https://energiochklimatradgivningen.se/hushall/uppvarmning/olikavarmesystem/varmepumpar/luftvattenvarmepump.858.html",
      },
      {
        title: "Ger arbetet rätt till rotavdrag?",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/foretag/skatterochavdrag/rotochrut/gerarbetetratttillrotavdrag.4.5c1163881590be297b5173bf.html",
      },
      {
        title: "Bidrag för energieffektivisering i småhus",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/bidrag--garantier/bidrag-for-energieffektivisering-i-smahus/",
      },
    ],
  },
  {
    slug: "aterbetalningstid-solceller",
    status: "published",
    title: "Hur räknar man ut återbetalningstiden för solceller 2026?",
    excerpt: "Nettopris delat med årlig nytta. Räkneexempel 2026 steg för steg: egenanvändning, SE3 mot SE4, med och utan batteri och vad slopade 60-öringen betydde.",
    category: "Ekonomi",
    publishedAt: "2026-05-24",
    updatedAt: "2026-10-05",
    readTimeMin: 9,
    searchPhrases: [
      "hur räknar man ut återbetalningstid på solceller",
      "räkna på återbetalningstid solceller",
      "återbetalningstid solceller kalkyl",
      "återbetalningstid solceller räkneexempel",
      "återbetalningstid solceller utan 60 öre",
      "kalkyl solceller med batteri",
      "energimyndigheten solceller kalkyl",
    ],
    services: [
      "solpaneler",
      "batterier",
    ],
    sources: [
      {
        title: "Så fungerar skattereduktion för grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/safungerarskattereduktionenforgronteknik.4.676f4884175c97df4192870.html",
      },
      {
        title: "Mikroproduktion av förnybar el – privatbostad",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/inkomsterfranbostad/mikroproduktionavfornybarelprivatbostad.4.12815e4f14a62bc048f41a7.html",
      },
      {
        title: "Skatt på el (skattesats 2026)",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/foretag/skatterochavdrag/punktskatter/energiskatter/skattpael",
      },
      {
        title: "Solelkalkylen (förifyllda antaganden för privatperson)",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/vad-kostar-det/solelkalkyl/",
      },
      {
        title: "Koppla batterier till solcellerna",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/batterier-kopplat-till-solceller/",
      },
      {
        title: "Säkringsabonnemang – priser från 1 juni 2026",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/globalassets/content/priserabonnemang-pdf/2026/sakring/sakringsabonnemang-16-63a_260601.pdf",
      },
      {
        title: "Dagen före-priser, års- och dagsmedel för SE1–SE4 i SEK",
        publisher: "Nord Pool",
        url: "https://data.nordpoolgroup.com/auction/day-ahead/prices?deliveryDate=latest&currency=SEK&aggregation=Yearly&deliveryAreas=SE1,SE2,SE3,SE4",
      },
      {
        title: "Day-ahead prices (kvartspriser för SE3 och SE4)",
        publisher: "Energinet, Energi Data Service",
        url: "https://www.energidataservice.dk/tso-electricity/DayAheadPrices",
      },
      {
        title: "PVGIS – beräkning av solelproduktion (Stockholm och Malmö)",
        publisher: "EU-kommissionens forskningscentrum JRC",
        url: "https://re.jrc.ec.europa.eu/pvg_tools/en/",
      },
      {
        title: "Vad är stödtjänster – allt du behöver veta (utbetalningar via FlexME)",
        publisher: "Mölndal Energi",
        url: "https://www.molndalenergi.se/kunskap/vad-ar-stodtjanster",
      },
    ],
  },
  {
    slug: "gront-avdrag-2026",
    status: "published",
    title: "Hur mycket grönt avdrag får man 2026 – och vad gäller 2027?",
    excerpt: "Grönt avdrag 2026: 15 % för solceller, 50 % för batteri och laddbox, högst 50 000 kr per person och år. Villkor, vad som ingår, värmepump och läget inför 2027.",
    category: "Ekonomi",
    publishedAt: "2026-05-24",
    updatedAt: "2026-10-05",
    readTimeMin: 8,
    searchPhrases: [
      "grönt avdrag 2026",
      "grönt avdrag 2027",
      "grönt avdrag skatteverket",
      "skattereduktion grön teknik",
      "grön teknik avdrag",
      "grönt avdrag per person",
      "grönt avdrag värmepump",
      "grönt avdrag och rotavdrag",
    ],
    services: [
      "solpaneler",
      "batterier",
      "laddboxar",
      "vaermepumpar",
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
      {
        title: "Grön teknik – med vanliga frågor om växelriktare, elcentral och batteri",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik.4.676f4884175c97df4192860.html",
      },
      {
        title: "Grön teknik i deklarationen",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/gronteknikideklarationen.4.676f4884175c97df419292e.html",
      },
      {
        title: "Grönt avdrag för batterier (nytt ställningstagande 4 juli 2024)",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/omoss/pressochmedia/nyheter/2024/nyheter/grontavdragforbatterier.5.5dc1d8b31903014b1bf172d.html",
      },
      {
        title: "Ger arbetet rätt till rotavdrag?",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/foretag/skatterochavdrag/rotochrut/gerarbetetratttillrotavdrag.4.5c1163881590be297b5173bf.html",
      },
      {
        title: "Betänkande 2024/25:SkU17 Förändrade skattesubventioner för solceller och mikroproduktion av el",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/betankande/forandrade-skattesubventioner-for-solceller-och_hc01sku17/",
      },
      {
        title: "Skatteförslag som remitterats inför höstbudgeten 2027",
        publisher: "Regeringen",
        url: "https://www.regeringen.se/regeringens-politik/skatt-och-tull/skatteforslag-som-remitterats-infor-hostbudgeten-2027/",
      },
      {
        title: "Proposition 2025/26:282 Effektivare kontrollmöjligheter i systemen för rot, rut, grön teknik och personalliggare",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/proposition/effektivare-kontrollmojligheter-i-systemen-for-rot_hd03282/",
      },
    ],
  },
  {
    slug: "solceller-pris-2026-stockholm",
    status: "published",
    title: "Vad kostar solceller i Stockholm 2026?",
    excerpt: "Energimyndighetens prisexempel: 92 500 kr för 5 kW före avdrag. Så påverkar grönt avdrag, bygglov, nätbolag och elområde SE3 solcellspriset i Stockholm.",
    category: "Solceller",
    publishedAt: "2026-06-14",
    updatedAt: "2026-10-05",
    readTimeMin: 8,
    searchPhrases: [
      "vad kostar solceller i stockholm",
      "solceller pris stockholm",
      "solceller stockholm 2026",
      "solceller stockholm bygglov",
      "hur mycket el ger solceller i stockholm",
      "nätnytta ellevio",
    ],
    services: [
      "solpaneler",
      "batterier",
    ],
    sources: [
      {
        title: "Välj en anläggning som passar dina behov (prisexempel 5 och 15 kW)",
        publisher: "Energimyndigheten (Solelportalen)",
        url: "https://www.energimyndigheten.se/effektiv-energianvandning/guider/solelportalen/hur-stor-anlaggning-passar-mig/valj-en-anlaggning-som-passar-dina-behov/",
      },
      {
        title: "Så fungerar skattereduktionen för grön teknik",
        publisher: "Skatteverket",
        url: "https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik/safungerarskattereduktionenforgronteknik.4.676f4884175c97df4192870.html",
      },
      {
        title: "Ändra fasad eller tak",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/byggande/bygglov-rivningslov-marklov-och-anmalan/vad-far-jag-bygga-utan-bygglov/andra-fasad-eller-tak/",
      },
      {
        title: "Ellag (1997:857), 4 kap. 11 och 38 §§ – lagen upphävs 1 januari 2027",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/ellag-1997857_sfs-1997-857/",
      },
      {
        title: "Elområden",
        publisher: "Svenska kraftnät",
        url: "https://www.svk.se/om-kraftsystemet/om-elmarknaden/elomraden/",
      },
      {
        title: "Solenergianläggningar – solceller och solfångare",
        publisher: "Stockholms stad",
        url: "https://bygglov.stockholm/nar-behovs-bygglov/bygga-nytt-och-bygga-till/solenergianlaggningar--solceller-och-solfangare/",
      },
      {
        title: "Taxa för stadsbyggnadsnämnden, prisjusterad för 2024 (tabell 1a, en- och tvåbostadshus)",
        publisher: "Stockholms stad",
        url: "https://start.stockholm/globalassets/start/om-stockholms-stad/organisation/fackforvaltningar/stadsbyggnadskontoret/taxa/faststalld-taxa-for-stadsbyggnadsnamnden-prisjusterad-for-2024-ta.pdf",
      },
      {
        title: "Solceller och solfångare",
        publisher: "Solna stad",
        url: "https://www.solna.se/bygga-bo--miljo/bygga/vanliga-byggatgarder/solceller-och-solfangare",
      },
      {
        title: "Abonnemang för elproduktion (mikroproduktion under 63 A)",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/abonnemang/abonnemang-mikroproduktion/",
      },
      {
        title: "Mikroproduktion 16–25 A: ersättning för överskottsproduktion från 1 januari 2026",
        publisher: "Ellevio",
        url: "https://www.ellevio.se/globalassets/content/priserabonnemang-pdf/2026/produktion/prislista_mikro_16-25a_260101.pdf",
      },
      {
        title: "Ersättning för egenproducerad el 2026",
        publisher: "Vattenfall Eldistribution",
        url: "https://www.vattenfalleldistribution.se/elnatsanslutning/anslut-elproduktion/ersattning-egen-el/",
      },
      {
        title: "PVGIS 5.3: Stockholm (59,33° N, 18,07° E), 1 kWp, söder respektive öster/väster, 30° lutning, 14 % förluster, soldata 2005–2023",
        publisher: "EU-kommissionens gemensamma forskningscentrum (JRC)",
        url: "https://re.jrc.ec.europa.eu/pvg_tools/en/",
      },
      {
        title: "Månadspriser på elbörsen mellan 1996 och 2025",
        publisher: "Konsumenternas energimarknadsbyrå",
        url: "https://www.energimarknadsbyran.se/media/1834/manadspriser-pa-elborsen-mellan-1996-och-2025.pdf",
      },
    ],
  },
  {
    slug: "solcellsbatteri-pris",
    status: "draft",
    title: "Solcellsbatteri pris 2026: Easyway, SAJ HS3 och Emaldo jämförda",
    excerpt:
      "Vad ett batteri faktiskt kostar inklusive moms, hårdvara, växelriktare, installation och vår marginal. Inga dolda påslag.",
    category: "Batteri",
    updatedAt: "2026-05-24",
    readTimeMin: 9,
  },
  {
    slug: "solceller-bast-i-test-2026",
    status: "draft",
    title: "Bästa solpaneler för villa 2026: vår handplockning",
    excerpt:
      "Vi installerar JA Solar 500 W och 455 W. Här går vi igenom varför, och vad du ska titta på när du jämför med andra varumärken.",
    category: "Solceller",
    updatedAt: "2026-05-24",
    readTimeMin: 6,
  },
];

/** "Faktagranskad" kräver källor att granska mot. */
export function guideReviewLabel(g: Guide): string {
  return g.sources?.length ? "Faktagranskad" : "Uppdaterad";
}

export function findGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function publishedGuides(): Guide[] {
  return GUIDES.filter((g) => g.status === "published");
}
