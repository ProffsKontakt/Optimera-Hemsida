import type { MetadataRoute } from "next";
import { VISIBLE_SERVICES } from "@/lib/services";
import { CITIES } from "@/lib/cities";
import { BATTERY_CITIES } from "@/lib/battery-cities";
import { publishedGuides } from "@/lib/guides";
import { publishedNews } from "@/lib/news";

// Per-route hardcoded ISO-datum. Tidigare användes new Date() vid build vilket
// gjorde att alla URLer fick samma timestamp varje deploy – det signalerar
// "everything updated" till crawlers och devalverar lastmod-värdet.
// Bumpa endast när innehållet faktiskt ändras.
const LAST_MOD = {
  home: "2026-05-24",
  kalkylator: "2026-07-07",
  offert: "2026-05-19",
  omOss: "2026-07-08",
  kontakt: "2026-05-09",
  tankar: "2026-05-09",
  tjanster: "2026-05-19",
  legal: "2026-05-09",
  cities: "2026-05-24",
  guiderHub: "2026-05-24",
  press: "2026-05-24",
  easyway: "2026-07-01",
  // AI-search-pelarsidor (2026-07 upgrade). Bumpade 07-08 när
  // dimensioneringsmetodiken (årsförbrukning ÷ 200–275) skrevs in.
  solcellsbatteri: "2026-07-08",
  metodik: "2026-07-08",
  faq: "2026-07-08",
  // Nyhetshubben (valbevakning + energinyheter) lanserad 2026-09-06.
  nyheterHub: "2026-09-06",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://optimeraenergi.se";

  return [
    { url: base, lastModified: LAST_MOD.home },
    // Solcellsbatteri-pelarsidan – kommersiellt viktigaste AI-search-sidan.
    { url: `${base}/solcellsbatteri`, lastModified: LAST_MOD.solcellsbatteri },
    { url: `${base}/kalkylator`, lastModified: LAST_MOD.kalkylator },
    { url: `${base}/offert`, lastModified: LAST_MOD.offert },
    { url: `${base}/om-oss`, lastModified: LAST_MOD.omOss },
    { url: `${base}/metodik`, lastModified: LAST_MOD.metodik },
    { url: `${base}/fragor-och-svar`, lastModified: LAST_MOD.faq },
    // Nyhetshubben + publicerade nyhetsartiklar. Drafts exkluderas via
    // publishedNews() – de har noindex i metadata också.
    { url: `${base}/nyheter`, lastModified: LAST_MOD.nyheterHub },
    ...publishedNews().map((n) => ({
      url: `${base}/nyheter/${n.slug}`,
      lastModified: n.updatedAt,
    })),
    { url: `${base}/kontakt`, lastModified: LAST_MOD.kontakt },
    { url: `${base}/tankar`, lastModified: LAST_MOD.tankar },
    { url: `${base}/guider`, lastModified: LAST_MOD.guiderHub },
    { url: `${base}/press`, lastModified: LAST_MOD.press },
    ...VISIBLE_SERVICES.map((s) => ({
      url: `${base}/tjanster/${s.slug}`,
      lastModified: LAST_MOD.tjanster,
    })),
    // Förklaringssida för varför vi rekommenderar Easyway-batterier.
    {
      url: `${base}/tjanster/batterier/easyway`,
      lastModified: LAST_MOD.easyway,
    },
    // City-landingssidor för Stockholm-områdets kommuner.
    ...CITIES.map((c) => ({
      url: `${base}/solceller/${c.slug}`,
      lastModified: LAST_MOD.cities,
    })),
    // Batteri-landningssidor per kommun (/batteri/[stad]).
    ...BATTERY_CITIES.map((c) => ({
      url: `${base}/batteri/${c.slug}`,
      lastModified: LAST_MOD.cities,
    })),
    // Publicerade guide-artiklar. Drafts (status="draft") exkluderas
    // automatiskt via publishedGuides() – de har noindex i metadata också.
    ...publishedGuides().map((g) => ({
      url: `${base}/guider/${g.slug}`,
      lastModified: g.updatedAt,
    })),
    { url: `${base}/integritet`, lastModified: LAST_MOD.legal },
    { url: `${base}/villkor`, lastModified: LAST_MOD.legal },
    { url: `${base}/cookies`, lastModified: LAST_MOD.legal },
  ];
}
