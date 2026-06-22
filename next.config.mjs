/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.higgsfield.ai" },
      { protocol: "https", hostname: "*.higgsfield.ai" },
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
