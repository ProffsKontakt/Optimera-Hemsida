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
   * Källorna artikeln bygger på. Visas i artikelns källblock och läggs i
   * NewsArticle-schemats citation – trovärdighetssignal för läsare,
   * Google och AI-search.
   */
  sources: NewsSource[];
};

export const NEWS: NewsArticle[] = [
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
