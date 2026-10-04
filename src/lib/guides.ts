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
    title: "Återbetalningstid på solceller 2026: så räknar du",
    excerpt:
      "Spotpris, självförbrukning, batterilager och stödtjänster. Vi går igenom varje variabel som faktiskt påverkar din återbetalningstid – med riktiga räkneexempel från Stockholm.",
    category: "Ekonomi",
    updatedAt: "2026-05-24",
    readTimeMin: 8,
  },
  {
    slug: "gront-avdrag-2026",
    status: "published",
    title: "Grönt avdrag 2026: solpaneler, batteri, laddbox och värmepump",
    excerpt:
      "14,55 % för solceller, 48,5 % för batteri och laddbox, ROT på arbetskostnaden för värmepump. Avdragstak, regler och fällor du måste känna till.",
    category: "Ekonomi",
    updatedAt: "2026-05-24",
    readTimeMin: 6,
  },
  {
    slug: "solceller-pris-2026-stockholm",
    status: "published",
    title: "Vad kostar solceller i Stockholm 2026?",
    excerpt:
      "Riktiga priser från en installatör som inte vill sälja dig en lösning du inte behöver. Kr/kWp-tabell, exempel på 5/10/15 kW-installationer.",
    category: "Solceller",
    updatedAt: "2026-06-14",
    readTimeMin: 7,
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
