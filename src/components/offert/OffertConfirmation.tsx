"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { trackEvent, setEnhancedConversionData } from "@/lib/analytics";

type SavedConfirmation = {
  method?: string;
  services?: string;
  slot?: { weekday: string; dateLabel: string; time: string } | null;
  email?: string;
  phone?: string;
};

// Uppskattat lead-värde per tjänst (SEK) för värdebaserad budgivning i Ads.
// Detta är ett proxy-värde tills CRM:et rapporterar verkligt affärsvärde via
// offline-konverteringar (qualify_lead / close_convert_lead / purchase).
const LEAD_VALUE: Record<string, number> = {
  solpaneler: 800,
  batterier: 600,
  vaermepumpar: 500,
  laddboxar: 200,
};

function estimateValue(services: string): number {
  const v = services
    .split(",")
    .filter(Boolean)
    .reduce((sum, s) => sum + (LEAD_VALUE[s] ?? 300), 0);
  return v || 300;
}

/**
 * Tack-sidans innehåll. Läser bekräftelsedetaljerna som offertformuläret
 * la i sessionStorage, visar ett personligt meddelande och skickar
 * generate_lead-konverteringen till GA4. Navigeringen hit ger dessutom ett
 * eget page_view på /offert/klar som kan användas som Key event i GA4.
 */
export function OffertConfirmation() {
  const [saved, setSaved] = useState<SavedConfirmation | null>(null);

  useEffect(() => {
    let submitted: SavedConfirmation | null = null;
    try {
      const raw = sessionStorage.getItem("oe_offert_confirmation");
      if (raw) {
        submitted = JSON.parse(raw) as SavedConfirmation;
        sessionStorage.removeItem("oe_offert_confirmation");
      }
    } catch {
      // ignorera
    }
    setSaved(submitted ?? {});
    // Skicka generate_lead ENDAST vid en faktisk inskickning (det fanns
    // bekräftelsedata i sessionStorage, satt av formuläret precis innan
    // navigeringen hit). Annars skulle en refresh eller direktnavigering till
    // /offert/klar trigga falska konverteringar i GA4/Ads.
    if (submitted) {
      const fire = () => {
        trackEvent("generate_lead", {
          method: submitted!.method ?? "unknown",
          services: submitted!.services ?? "",
          value: estimateValue(submitted!.services ?? ""),
          currency: "SEK",
        });
        // Meta Pixel Lead-konvertering (för Ads-optimering/retargeting).
        // Consent-gated i pixeln själv – köas tills marknadsförings-
        // samtycke finns, precis som PageView.
        const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void })
          .fbq;
        if (typeof fbq === "function") {
          fbq("track", "Lead", {
            content_category: submitted!.services ?? "",
            value: estimateValue(submitted!.services ?? ""),
            currency: "SEK",
          });
        }
      };
      // Sätt Enhanced Conversions user_data (hashad e-post/telefon) FÖRE
      // eventet så det matchar konverteringen. Consent-gated internt.
      setEnhancedConversionData(submitted.email, submitted.phone)
        .then(fire)
        .catch(fire);
    }
  }, []);

  const slot = saved?.slot;
  const message =
    saved?.method === "hembesok" && slot
      ? `Vi har bokat in ${slot.weekday} ${slot.dateLabel} kl ${slot.time}. Du får en bekräftelse på e-post inom kort, och vi ringer dagen innan för att säga vilken kollega som kommer förbi.`
      : "Vi ringer upp dig under nästa vardag och stämmer av vad du behöver. Du får en bekräftelse på e-post inom kort.";

  return (
    <div className="rounded-[28px] border border-ink/10 bg-cream/70 p-10 md:p-12 max-w-2xl">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-moss text-bone">
        <Check size={20} />
      </div>
      <p className="mt-6 text-ink/70 text-lg leading-relaxed">{message}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-ghost">
          Till startsidan
        </Link>
        <Link href="/guider" className="btn-ghost">
          Läs våra guider <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
