import { NextResponse } from "next/server";
import { CITIES } from "@/lib/cities";

/**
 * Geo-endpoint för försiktig personalisering av copy (t.ex. hero-rubriken).
 *
 * Läser Vercels IP-geo-headers (finns på preview/produktion; saknas i lokal
 * dev → allt blir null och klienten behåller default-copyn).
 *
 * Matchningen görs SERVER-side mot kommunerna i CITIES så att:
 *  1. klientbundlen slipper hela city-datafilen,
 *  2. bara kommuner vi faktiskt arbetar i kan visas ("ren träff"),
 *  3. besökare utanför Sverige (VPN, utland) aldrig får en ortsanpassad
 *     rubrik – de behåller fallbacken (Stockholm-copyn). Det kan alltså
 *     aldrig stå "solpaneler i Bangkok".
 *
 * Svaret cachas inte (private, no-store) – det är per-besökare-data.
 */
export const runtime = "edge";

function normalizeCityName(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/å|ä/g, "a")
    .replace(/ö/g, "o");
}

export async function GET(req: Request) {
  const country = req.headers.get("x-vercel-ip-country");
  const rawCity = req.headers.get("x-vercel-ip-city");
  // Vercel URI-enkodar city-headern ("T%C3%A4by" → "Täby").
  let city: string | null = null;
  try {
    city = rawCity ? decodeURIComponent(rawCity) : null;
  } catch {
    city = rawCity;
  }

  // "Ren träff": endast Sverige + en kommun vi faktiskt installerar i.
  let match: { slug: string; name: string; preposition: "i" | "på" } | null =
    null;
  if (country === "SE" && city) {
    const n = normalizeCityName(city);
    const hit = CITIES.find(
      (c) => normalizeCityName(c.name) === n || c.slug === n,
    );
    if (hit) {
      match = { slug: hit.slug, name: hit.name, preposition: hit.preposition };
    }
  }

  return NextResponse.json(
    { country, city, match },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
