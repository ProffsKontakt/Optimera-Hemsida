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
  // Kanonisk värd: non-www. Sajten svarade tidigare 200 på BÅDE
  // www.optimeraenergi.se och optimeraenergi.se utan omdirigering, vilket
  // skapade dubbletter och fick Google att indexera www-varianter trots att
  // sidornas canonical pekar på non-www. Resultat: 0/12 sitemap-URLer
  // indexerade. Denna 301 konsoliderar trafik och länkkraft till non-www så
  // att canonical, sitemap och index pekar åt samma håll.
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
