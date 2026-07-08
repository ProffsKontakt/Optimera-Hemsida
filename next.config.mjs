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
    return [{ source: "/favicon.ico", destination: "/icon" }];
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
    ];
  },
  // Säkerhetshuvuden globalt. Google rankar säkra sidor bättre och vissa
  // browsers / scanners (Mozilla Observatory, Lighthouse) ger fail om de
  // saknas. HSTS-värdet följer preload-listans rekommendation (2 år).
  async headers() {
    return [
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
