import type { MetadataRoute } from "next";

// AI-search-crawlers tillåts explicit så att Optimera Energi syns i Google
// AI Overviews / AI Mode, ChatGPT Search, Perplexity, Bing Copilot, Claude
// Search, Gemini m.fl. Default "allow all" kompletteras med per-crawler-regler
// så att inga AI-bots tolkar default-policyn som restriktiv.
//
// Två sorters bots per motor:
//   • index-/tränings-bot (GPTBot, ClaudeBot, Google-Extended …) hämtar sidor
//     i bakgrunden för att bygga kunskap.
//   • answer-/user-bot (OAI-SearchBot, Claude-User, ChatGPT-User …) hämtar en
//     sida i realtid när en användare ställer en fråga och sidan kan citeras.
// Vi tillåter båda för alla stora motorer.
const AI_CRAWLERS = [
  // Sökmotorer
  "Googlebot",
  "Bingbot",
  // OpenAI / ChatGPT
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic / Claude (nya user-agent-namnen 2024–2025)
  "ClaudeBot",
  "Claude-Web",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google Gemini / AI Overviews (Google-Extended styr Gemini-träning +
  // grounding; Googlebot ovan sköter AI Overviews-indexeringen)
  "Google-Extended",
  "GoogleOther",
  // Övriga answer engines
  "FacebookBot",
  "Meta-ExternalAgent",
  "Amazonbot",
  "DuckAssistBot",
  "Applebot-Extended",
  "Bytespider",
  "cohere-ai",
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
