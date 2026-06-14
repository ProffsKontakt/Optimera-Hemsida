/**
 * Guide-hubben på /guider. Varje guide har egen sida som mål för
 * informational long-tail-queries.
 *
 * Status:
 *   "published" – fullskriven, indexeras, ligger i sitemap
 *   "draft"     – placeholder med noindex, exkluderas från sitemap
 *
 * När en draft fylls med innehåll, byt status till "published" och
 * uppdatera updatedAt + sitemap-LAST_MOD.
 */

export type GuideStatus = "published" | "draft";

export type Guide = {
  slug: string;
  status: GuideStatus;
  title: string;
  excerpt: string;
  category: "Solceller" | "Batteri" | "Värmepump" | "Laddbox" | "Ekonomi";
  updatedAt: string;
  /** Estimerad lästid i minuter. */
  readTimeMin: number;
};

export const GUIDES: Guide[] = [
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
      "14,55 % för solceller, 48,5 % för batteri och laddbox, 30 % ROT för värmepump. Avdragstak, regler och fällor du måste känna till.",
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

export function findGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function publishedGuides(): Guide[] {
  return GUIDES.filter((g) => g.status === "published");
}
