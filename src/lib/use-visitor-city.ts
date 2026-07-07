"use client";

import { useEffect, useState } from "react";

/**
 * Ortsträff för försiktig copy-personalisering (t.ex. hero-rubriken).
 *
 * Returnerar en verifierad kommun-träff ({name, preposition, slug}) ENDAST om
 * besökaren enligt IP-geo är i Sverige OCH i en kommun vi installerar i
 * (vitlistan i CITIES, matchad server-side i /api/geo). I alla andra fall –
 * utland/VPN, okänd ort, svensk ort utanför vårt område, lokal dev, fetch-fel
 * – returneras null och anroparen behåller sin default-copy (Stockholm).
 *
 * Viktigt för SEO/AI-search: personaliseringen sker efter hydration som en
 * progressiv förbättring. Server-HTML:en (det crawlers läser och citerar)
 * innehåller ALLTID den kanoniska Stockholm-copyn – ingen cloaking-risk och
 * inga geo-varianter i index.
 *
 * Ingen cookie sätts; svaret cachas per flik i sessionStorage (funktionellt,
 * ingen spårning) så vi inte hämtar om vid varje navigering.
 */
export type VisitorCity = {
  slug: string;
  name: string;
  preposition: "i" | "på";
};

const SESSION_KEY = "oe_geo_v1";

type GeoResponse = {
  country: string | null;
  city: string | null;
  match: VisitorCity | null;
};

export function useVisitorCity(): VisitorCity | null {
  const [city, setCity] = useState<VisitorCity | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      try {
        const cached = window.sessionStorage.getItem(SESSION_KEY);
        if (cached) {
          const data = JSON.parse(cached) as GeoResponse;
          if (!cancelled && data.match) setCity(data.match);
          return;
        }
        const res = await fetch("/api/geo", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as GeoResponse;
        try {
          window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
        } catch {
          // sessionStorage kan kasta i privat läge – oskadligt.
        }
        if (!cancelled && data.match) setCity(data.match);
      } catch {
        // Nätverksfel → behåll default-copyn.
      }
    }

    resolve();
    return () => {
      cancelled = true;
    };
  }, []);

  return city;
}
