// Produktblad och andra dokument ligger i Supabase-lagringen. De visas
// under sajtens egen domän i stället för azlloxmrudplfsfajlqq.supabase.co:
// /produktblad/<namn>.pdf för produktbladen vi länkar till, och
// /storage/<sökväg> för allt annat i samma bucket.
const STORAGE =
  "https://azlloxmrudplfsfajlqq.supabase.co/storage/v1/object/public/product-images";
const DATASHEETS = {
  "eway-univ7600": "documents/1f8c6dd3-95b8-4607-b02b-8ee1cf47045a.pdf",
  "saj-hs3": "docs/wp-migrering/2026/03/HS3-5-12K-T2_datasheet_en_North_EU-1.pdf",
  "enershare-battery-core": "docs/wp-migrering/2025/08/Enershare-Battery-core-2508.pdf",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.higgsfield.ai" },
      { protocol: "https", hostname: "*.higgsfield.ai" },
      // Vercel Blob – admin-uppladdade bilder via media-CMS:en.
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "@react-three/drei"],
  },
  // Browsers begär /favicon.ico oavsett vad HTML:s <link rel="icon"> säger.
  // Utan en fil där 404:ar requesten och en del browsers visar då vad de råkar
  // ha i favicon-cachen (i vårt fall ibland Loopia-parkeringens ikon från innan
  // domänen flippades till Vercel). Vi rewriter därför /favicon.ico till /icon
  // (PNG genererad av src/app/icon.tsx) så det alltid finns en korrekt
  // märkesfavicon på den routen.
  async rewrites() {
    return [
      { source: "/favicon.ico", destination: "/icon" },
      ...Object.entries(DATASHEETS).map(([name, path]) => ({
        source: `/produktblad/${name}.pdf`,
        destination: `${STORAGE}/${path}`,
      })),
      { source: "/storage/:path*", destination: `${STORAGE}/:path*` },
    ];
  },
  // Host-konsolidering: www -> apex med permanent 308.
  //
  // Bakgrund (GSC-diagnos 2026-07-08): Google indexerade sajten på
  // www.optimeraenergi.se i maj (och valde www som canonical trots
  // canonical-taggarna), varpå indexeringen kraschade när www började
  // redirecta vid Vercel-flytten. Sedan dess ligger apex-URL:erna okrawlade
  // i "Discovered - currently not indexed". All metadata, sitemap, schema
  // och canonical pekar på apex (https://optimeraenergi.se) - denna regel
  // garanterar på app-nivå att www aldrig kan servera innehåll igen,
  // oavsett hur domänerna är konfigurerade i Vercel-dashboarden.
  // (Är Vercels domän-redirect redan aktiv träffar regeln aldrig; den är
  // ett skyddsnät, inte en dubblering.)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.optimeraenergi.se" }],
        destination: "https://optimeraenergi.se/:path*",
        permanent: true,
      },
      // Bloggsidan "Tankar" togs bort (okt 2026) – kunskapsbanken har tagit
      // dess roll. Permanent redirect så att gamla länkar landar rätt.
      { source: "/tankar", destination: "/kunskapsbank", permanent: true },
    ];
  },
  // Säkerhetshuvuden globalt. Google rankar säkra sidor bättre och vissa
  // browsers / scanners (Mozilla Observatory, Lighthouse) ger fail om de
  // saknas. HSTS-värdet följer preload-listans rekommendation (2 år).
  async headers() {
    return [
      // Lagringens råa filer ska inte indexeras som egna sidor.
      {
        source: "/storage/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
