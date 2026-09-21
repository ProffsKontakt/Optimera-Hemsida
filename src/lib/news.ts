/**
 * Nyhetssektionen på /nyheter – kunskapsbas för energinyheter som påverkar
 * villaägare: valet 2026, elpriser, stöd och avdrag.
 *
 * Status:
 *   "published" – indexeras, ligger i sitemap, visas klickbar på hubben
 *   "draft"     – noindex, exkluderas från sitemap, "Snart" på hubben
 *
 * Publiceringsflöde: ny artikel var tredje dag. Utkastet går ut för
 * godkännande (Viktor/Julian) via draft-PR + mejl innan merge – inget
 * publiceras på sajten utan godkännande.
 *
 * Metadata här, brödtext i news-content.ts – samma mönster som guides.ts.
 */

export type NewsStatus = "published" | "draft";

export type NewsSource = {
  title: string;
  publisher: string;
  url: string;
};

export type NewsCategory =
  | "Valet 2026"
  | "Elpriser"
  | "Stöd & avdrag"
  | "Energipolitik"
  | "Marknad";

export type NewsArticle = {
  slug: string;
  status: NewsStatus;
  title: string;
  excerpt: string;
  category: NewsCategory;
  /** Första publiceringsdatum (ISO). Styr sorteringen på hubben. */
  publishedAt: string;
  /** Bumpas bara när innehållet faktiskt ändras (lastmod i sitemap). */
  updatedAt: string;
  /** Estimerad lästid i minuter. */
  readTimeMin: number;
  /**
   * Hero-bild som visas ovanför rubriken på kortet och artikeln, samt som
   * OG-/schema-bild. Ligger versionshanterad i public/news/ så att bilden
   * granskas i samma PR som texten. Kan ersättas via media-CMS:en
   * (slot "news:<slug>") utan kodändring.
   */
  image?: { src: string; alt: string };
  /**
   * Källorna artikeln bygger på. Visas i artikelns källblock och läggs i
   * NewsArticle-schemats citation – trovärdighetssignal för läsare,
   * Google och AI-search.
   */
  sources: NewsSource[];
};

export const NEWS: NewsArticle[] = [
  {
    slug: "valresultatet-faststallt-176-173-vad-hander-nu-elen",
    status: "published",
    title:
      "Valresultatet är fastställt: 176–173. Nu avgörs allt i riksdagen – det här betyder det för din el",
    excerpt:
      "Valmyndigheten fastställde valresultatet den 19 september: S, MP, V och C samlar 176 mandat mot Tidöpartiernas 173, och valdeltagandet steg till 84,9 procent. Men mandat är inte en regering – avgörandet flyttar nu till riksdagen. Vi går igenom tidsplanen och vad som gäller för dina stöd och din elräkning under tiden.",
    category: "Valet 2026",
    publishedAt: "2026-09-21",
    updatedAt: "2026-09-21",
    readTimeMin: 5,
    image: {
      src: "/news/valresultatet-faststallt-176-173-vad-hander-nu-elen.jpg",
      alt: "Röd svensk stuga i frostig höstmorgon med solpaneler i lågt gyllene ljus",
    },
    sources: [
      {
        title: "Valresultat fastställt i 2026 års riksdagsval",
        publisher: "Valmyndigheten",
        url: "https://www.val.se/servicelankar/servicelankar/pressrum/nyheter--pressmeddelanden/pressmeddelande-nya/2026-09-19-valresultat-faststallt-i-2026-ars-riksdagsval",
      },
      {
        title: "Den nya riksdagen efter valet",
        publisher: "Sveriges riksdag",
        url: "https://www.riksdagen.se/sv/aktuellt/aktuelltnotiser/2026/sep/19/den-nya-riksdagen-efter-valet_cmsad780a37-f1ae-4d47-a4a7-b6ea2a69a21esv/",
      },
      {
        title: "Valmyndigheten: Resultatet fastställt",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/senaste-nytt-om-val-2026?inlagg=e61012eb5d0beccaf28656645890dcc6",
      },
      {
        title: "Valresultat 2026",
        publisher: "SVT Nyheter",
        url: "https://valresultat.svt.se/2026/",
      },
      {
        title: "Valresultatet för riksdagsvalet fastställt",
        publisher: "Kuriren/TT",
        url: "https://www.kuriren.nu/nyheter/sverige/artikel/valresultatet-for-riksdagsvalet-faststallt/l61z3gvj",
      },
      {
        title: "Senaste nytt om valet 2026",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/senaste-nytt-om-val-2026",
      },
    ],
  },
  {
    slug: "effektavgifter-2026-stoppat-krav-ny-modell-batteri",
    status: "published",
    title:
      "Effektavgifterna är i limbo: kravet stoppat, ny modell dröjer – och nätbolagen kör ändå",
    excerpt:
      "Kravet på effekttariffer i alla elnät stoppades i våras och Energimarknadsinspektionen tar fram en ny modell – klar tidigast våren 2027, på en ny regerings bord. Samtidigt får nätbolag som redan infört effektavgifter fortsätta. Vi reder ut vad som gäller för din nätfaktura och varför batteriet blivit det säkraste skyddet.",
    category: "Elpriser",
    publishedAt: "2026-09-18",
    updatedAt: "2026-09-18",
    readTimeMin: 6,
    image: {
      src: "/news/effektavgifter-2026-stoppat-krav-ny-modell-batteri.jpg",
      alt: "Gul svensk trävilla i skymning med solcellstak och varmt ljus i fönstren",
    },
    sources: [
      {
        title: "Krav på införande av effektavgifter stoppas",
        publisher: "Regeringen",
        url: "https://www.regeringen.se/pressmeddelanden/2026/03/krav-pa-inforande-av-effektavgifter-stoppas/",
      },
      {
        title:
          "Uppdrag till Energimarknadsinspektionen att upphäva föreskrifter och lämna förslag om en ny utformning av effektavgifterna",
        publisher: "Regeringen",
        url: "https://www.regeringen.se/regeringsuppdrag/2026/03/uppdrag-till-energimarknadsinspektionen-att-upphava-foreskrifter-och-lamna-forslag-om-en-ny-utformning-av-effektavgifterna/",
      },
      {
        title:
          "Ei har fått i uppdrag att ta fram en ny modell för effektavgifter och upphäva befintliga föreskrifter",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/om-oss/nyheter/2026/2026-03-13-ei-har-fatt-i-uppdrag-att-ta-fram-en-ny-modell-for-effektavgifter-och-upphava-befintliga-foreskrifter",
      },
      {
        title: "Effektavgifter",
        publisher: "Energimarknadsinspektionen",
        url: "https://ei.se/konsument/el/elnatsavgiften-och-elnatsreglering/effektavgifter",
      },
      {
        title: "Nya effekttariffer väcker oro",
        publisher: "Fastighetstidningen",
        url: "https://fastighetstidningen.se/nyhet/nya-effekttariffer-vacker-oro/",
      },
      {
        title: "Kommentar: krav på införande av effekttariffer stoppas",
        publisher: "Energiföretagen Sverige",
        url: "https://www.energiforetagen.se/pressrum/nyheter/2026/mars/kommentar-krav-pa-inforande-av-effekttariffer-stoppas",
      },
      {
        title: "Senaste nytt om valet 2026",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/senaste-nytt-om-val-2026",
      },
    ],
  },
  {
    slug: "efter-valet-2026-rysarjamnt-vad-hander-med-elen",
    status: "published",
    title:
      "Rysarjämnt efter valet: regeringsfrågan öppen – det här gäller för din el nu",
    excerpt:
      "Rödgröna 176 mandat mot Tidöpartiernas 173 i den preliminära räkningen, slutresultatet dröjer och talman väljs först den 28 september. Vi reder ut vad det ovissa läget faktiskt betyder för avdrag, elpriser och dig som funderar på solceller eller batteri.",
    category: "Valet 2026",
    publishedAt: "2026-09-15",
    updatedAt: "2026-09-15",
    readTimeMin: 6,
    image: {
      src: "/news/efter-valet-2026-rysarjamnt-vad-hander-med-elen.jpg",
      alt: "Svensk villagata i skymning med solpaneler på taken och varmt ljus i fönstren",
    },
    sources: [
      {
        title: "Rysarjämnt i valet – oppositionen leder knappt",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/rysarjamnt-i-valet-oppositionen-leder-knappt",
      },
      {
        title: "Senaste nytt om valet 2026",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/senaste-nytt-om-val-2026",
      },
      {
        title: "Valresultat 2026 – riksdag, region och kommun",
        publisher: "Valmyndigheten",
        url: "https://www.val.se/english/election-results/elections-to-the-riksdag-and-regional-and-municipal-councils/election-results-2026",
      },
      {
        title: "Valresultat 2026",
        publisher: "SVT Nyheter",
        url: "https://valresultat.svt.se/2026/",
      },
      {
        title:
          "Sveriges val – tryggare och högre eller lägre och mer varierande elpriser",
        publisher: "Energiforsk",
        url: "https://energiforsk.se/nyheter/sveriges-val-tryggare-och-hogre-eller-lagre-och-mer-varierande-elpriser/",
      },
      {
        title:
          "Bidrag för energieffektivisering i småhus kan sökas från 1 september",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/om-boverket/nyheter-aktuellt/nyheter/bidrag-for-energieffektivisering-fran-1-september/",
      },
      {
        title: "Senaste nytt om svenska valet 2026",
        publisher: "Sveriges Radio",
        url: "https://www.sverigesradio.se/artikel/senaste-nytt-om-svenska-valet-2026",
      },
    ],
  },
  {
    slug: "valet-2026-solceller-elpriser-en-vecka-kvar",
    status: "published",
    title:
      "En vecka till valet: det här avgörs för dina solceller och din elräkning",
    excerpt:
      "Söndag den 13 september är det riksdagsval, och energin är en av valrörelsens hetaste frågor. Vi går igenom sakläget för dig som har eller funderar på solceller och batteri: avdragen som gäller, striden om solstödet, kärnkraftslinjerna och vinterns elpriser.",
    category: "Valet 2026",
    publishedAt: "2026-09-06",
    updatedAt: "2026-09-06",
    readTimeMin: 7,
    image: {
      src: "/news/valet-2026-solceller-elpriser-en-vecka-kvar.jpg",
      alt: "Faluröd svensk villa med solpaneler på taket i gyllene septemberljus",
    },
    sources: [
      {
        title: "Senaste nytt om valet 2026",
        publisher: "SVT Nyheter",
        url: "https://www.svt.se/nyheter/inrikes/senaste-nytt-om-val-2026",
      },
      {
        title: "Elpriserna 2026: Så drivs kostnaden upp",
        publisher: "Villaägarna",
        url: "https://www.villaagarna.se/debatt/energikostnader/elpriserna-2026-sa-drivs-kostnaden-upp/",
      },
      {
        title:
          "Bidrag för energieffektivisering i småhus kan sökas från 1 september",
        publisher: "Boverket",
        url: "https://www.boverket.se/sv/om-boverket/nyheter-aktuellt/nyheter/bidrag-for-energieffektivisering-fran-1-september/",
      },
      {
        title: "Valet 2026: Vilka partier är för och emot kärnkraft?",
        publisher: "Nyheter24",
        url: "https://nyheter24.se/nyheter/politik/1504671-valet-2026-vilka-partier-ar-for-och-emot-karnkraft",
      },
      {
        title: "Partiernas energipolitik inför valet 2026",
        publisher: "Elbruk",
        url: "https://www.elbruk.se/blogg/partiernas-energipolitik-2026",
      },
      {
        title: "Energipolitik inför riksdagsvalet 2026",
        publisher: "Elbyte",
        url: "https://elbyte.se/energipolitik-valet%202026",
      },
      {
        title:
          "Förändringar i skattereduktion för solceller – detta behöver du veta",
        publisher: "Höganäs kommun",
        url: "https://www.hoganas.se/arkiv/nyheter---hoganas-kommun/nyheter/2025-06-03-forandringar-i-skattereduktion-for-solceller---detta-behover-du-veta.html",
      },
    ],
  },
];

export function findNewsArticle(slug: string): NewsArticle | undefined {
  return NEWS.find((n) => n.slug === slug);
}

/** Publicerade artiklar, nyast först. */
export function publishedNews(): NewsArticle[] {
  return NEWS.filter((n) => n.status === "published").sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
}

/** "2026-09-06" -> "6 september 2026". */
export function formatNewsDate(iso: string): string {
  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
