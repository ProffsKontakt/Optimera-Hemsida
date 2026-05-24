import type { MetadataRoute } from "next";

// AI-search-crawlers tillåts explicit så att Optimera Energi syns i Google
// AI Overviews, ChatGPT-search, Perplexity, Bing Copilot, Gemini m.fl.
// Default "allow all" kompletteras med per-crawler-regler så att inga
// AI-bots tolkar default-policyn som restriktiv.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "FacebookBot",
  "Bingbot",
  "Amazonbot",
  "DuckAssistBot",
  "Applebot-Extended",
] as const;

const DISALLOW = ["/admin", "/admin/", "/api/", "/studio"];

export default function robots(): MetadataRoute.Robots {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://optimeraenergi.se";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
