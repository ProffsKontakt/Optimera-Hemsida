"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useVisitorCity } from "@/lib/use-visitor-city";

/**
 * Hero för landningssidan.
 *
 * Design (2026-07): frostad fotobakgrund i stället för 3D-huset.
 *  - Bakgrundsbilden laddas upp i /admin/media (slot demo:hero-landningsida)
 *    och frostningsgraden (blur + ljus wash) styrs där per bild (0–100).
 *  - Utan uppladdad bild: ren bone-bakgrund, ingen 3D.
 *  - Mobil: BARA den stora rubriken högst upp (eyebrow-raden dold), och
 *    poster-layout där brödtext + CTA ligger i nedre delen av första vyn.
 *  - Stats-raden (3 tjänster / 100% eget team / 14d) är borttagen.
 */
export function DemoHero({
  heroImageUrl,
  heroImageAlt,
  heroFrost,
}: {
  heroImageUrl?: string;
  heroImageAlt?: string;
  /** 0–100 från admin. 0 = skarp bild, 100 = kraftigt frostad. */
  heroFrost?: number;
} = {}) {
  // Ortsanpassad rubrik – ENDAST vid verifierad träff på en svensk kommun vi
  // installerar i (vitlista via /api/geo). Utland/VPN/okänd ort → fallback
  // "i Stockholm." (samma text som i server-HTML:en, dvs det crawlers ser).
  const visitorCity = useVisitorCity();

  const frost = Math.min(100, Math.max(0, heroFrost ?? 50));
  // 0–20px blur + wash i bone-tonen som skalar med frostningen så texten
  // alltid har tillräcklig kontrast utan att döda bilden.
  const blurPx = Math.round(frost * 2) / 10;
  const washAlpha = 0.12 + frost * 0.004;

  return (
    <section className="relative overflow-hidden">
      {heroImageUrl && (
        <>
          <Image
            src={heroImageUrl}
            alt={heroImageAlt || ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blurPx}px)`,
              WebkitBackdropFilter: `blur(${blurPx}px)`,
              backgroundColor: `rgba(244, 241, 234, ${washAlpha})`,
            }}
          />
          {/* Mjuk övergång till bone-bakgrunden i sektionen under. */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bone"
          />
        </>
      )}

      <div className="container-edge relative">
        <div className="flex min-h-[calc(100svh-8.5rem)] flex-col pt-5 pb-10 md:min-h-0 md:pt-14 md:pb-24">
          <div className="relative max-w-3xl">
            <span
              aria-hidden
              className="hidden md:block brand-stripe absolute -left-4 top-2 h-24"
            />
            {/* Mobil: bara stora rubriken högst upp. Eyebrow endast desktop. */}
            <div className="eyebrow hidden md:block">
              Optimera Energi · Byggd på kloka tankar · Stockholm 2026
            </div>

            <h1 className="mt-0 md:mt-6 font-display text-[44px] md:text-[64px] leading-[1.02] tracking-display-tight">
              Optimera Energi,
              <br />
              <span className="italic font-serif text-indigo">
                {visitorCity
                  ? `sol och batteri ${visitorCity.preposition} ${visitorCity.name}.`
                  : "sol och batteri i Stockholm."}
              </span>
            </h1>
          </div>

          {/* Poster-layout på mobil: brödtext + CTA i nedre delen av första
              vyn (mt-auto), vanligt flöde på desktop. */}
          <div className="mt-auto pt-12 md:mt-0 md:pt-8 max-w-3xl">
            <p className="max-w-lg text-ink/75 text-[17px] leading-relaxed">
              Solpaneler, batterier och laddboxar, byggda på kloka tankar och
              installerade av samma gäng från Solna som dyker upp med
              kanelbullar och respekt för ditt hem.
            </p>

            {/* EN primär handling. Sekundär blir lugn textlänk. */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href="/kalkylator" className="btn-primary">
                Räkna på din besparing
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/offert"
                className="text-[15px] text-ink/75 hover:text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-ink/60 transition"
              >
                eller begär hembesök
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
