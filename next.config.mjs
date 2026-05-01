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
};

export default nextConfig;
