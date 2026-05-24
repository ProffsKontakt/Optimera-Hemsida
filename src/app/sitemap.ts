import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";

// Per-route hardcoded ISO-datum. Tidigare användes new Date() vid build vilket
// gjorde att alla URLer fick samma timestamp varje deploy — det signalerar
// "everything updated" till crawlers och devalverar lastmod-värdet.
// Bumpa endast när innehållet faktiskt ändras.
const LAST_MOD = {
  home: "2026-05-24",
  kalkylator: "2026-05-24",
  offert: "2026-05-19",
  omOss: "2026-05-19",
  kontakt: "2026-05-09",
  tankar: "2026-05-09",
  tjanster: "2026-05-19",
  legal: "2026-05-09",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://optimeraenergi.se";

  return [
    { url: base, lastModified: LAST_MOD.home },
    { url: `${base}/kalkylator`, lastModified: LAST_MOD.kalkylator },
    { url: `${base}/offert`, lastModified: LAST_MOD.offert },
    { url: `${base}/om-oss`, lastModified: LAST_MOD.omOss },
    { url: `${base}/kontakt`, lastModified: LAST_MOD.kontakt },
    { url: `${base}/tankar`, lastModified: LAST_MOD.tankar },
    ...SERVICES.map((s) => ({
      url: `${base}/tjanster/${s.slug}`,
      lastModified: LAST_MOD.tjanster,
    })),
    { url: `${base}/integritet`, lastModified: LAST_MOD.legal },
    { url: `${base}/villkor`, lastModified: LAST_MOD.legal },
    { url: `${base}/cookies`, lastModified: LAST_MOD.legal },
  ];
}
