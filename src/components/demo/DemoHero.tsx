"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { CanvasErrorBoundary } from "@/components/3d/CanvasErrorBoundary";
import { SceneFallback } from "@/components/3d/SceneFallback";
import { Defer } from "@/components/3d/Defer";
import { useVisitorCity } from "@/lib/use-visitor-city";

/**
 * Hero för landningssidan – två lägen per skärmstorlek:
 *
 * MOBIL (< md):
 *  - Frostad fotobakgrund i fullskärm (bild + frostgrad väljs i /admin/media,
 *    slot demo:hero-landningsida). Utan bild: ren bone-bakgrund.
 *  - BARA stora rubriken högst upp (ingen eyebrow-rad), poster-layout där
 *    brödtext + CTA ligger i nedre delen av första vyn.
 *  - Inga stats, inget 3D-hus.
 *
 * DESKTOP (md+): som tidigare – eyebrow, rubrik, brödtext, CTA, stats-raden
 * och 3D-huset (eller admin-bilden) i högerkolumnen från lg.
 */
const HeroLab = dynamic(
  () => import("@/components/3d/HeroLab").then((m) => m.HeroLab),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-cream" aria-hidden />,
  },
);

export function DemoHero({
  heroImageUrl,
  heroImageAlt,
  heroFrost,
}: {
  heroImageUrl?: string;
  heroImageAlt?: string;
  /** 0–100 från admin. 0 = skarp bild, 100 = kraftigt frostad. Endast mobil. */
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
      {/* Frostad bakgrund – ENDAST mobil. */}
      {heroImageUrl && (
        <div className="absolute inset-0 md:hidden" aria-hidden>
          <Image
            src={heroImageUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blurPx}px)`,
              WebkitBackdropFilter: `blur(${blurPx}px)`,
              backgroundColor: `rgba(244, 241, 234, ${washAlpha})`,
            }}
          />
          {/* Läsbarhets-scrims – ALLTID på, oavsett frostgrad. Ljusa
              bone-toningar bakom text-zonerna (rubrik uppe, brödtext + CTA
              nere) så mörk text alltid är läsbar även på mörka foton,
              medan bilden får synas fritt i mitten. Nedre scrimmen går
              hela vägen till solid bone och sköter även övergången till
              sektionen under. */}
          <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-bone/95 via-bone/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-bone via-bone/85 to-transparent" />
        </div>
      )}

      <div className="container-edge relative">
        <div className="flex min-h-[calc(100svh-8.5rem)] flex-col pt-5 pb-10 md:min-h-0 md:pt-10 md:pb-24 lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
          <div className="relative flex flex-1 flex-col lg:flex-none lg:col-span-7">
            <span
              aria-hidden
              className="hidden md:block brand-stripe absolute -left-4 top-2 h-24"
            />
            {/* Reco-betyget som förtroende-pill (endast desktop) – fyller
                vänsterytan med social proof i stället för luft. */}
            <a
              href="https://www.reco.se/optimera-energi"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex w-fit items-center gap-2 rounded-full border border-ink/12 bg-cream/80 px-4 py-2 mb-7 text-[13px] text-ink/75 hover:border-ink/35 hover:text-ink transition"
            >
              <span className="text-sun tracking-[0.08em]">★★★★★</span>
              <span className="font-medium">4,7 av 5</span>
              <span className="text-ink/50">på Reco</span>
            </a>

            {/* Mobil: bara stora rubriken högst upp. Eyebrow endast desktop. */}
            <div className="eyebrow hidden md:block">
              Optimera Energi · Byggd på kloka tankar · Stockholm 2026
            </div>

            <h1 className="mt-0 md:mt-6 font-display text-[44px] md:text-[64px] lg:text-[76px] leading-[1.02] tracking-display-tight">
              Optimera Energi,
              <br />
              <span className="italic font-serif text-indigo">
                {visitorCity
                  ? `sol och batteri ${visitorCity.preposition} ${visitorCity.name}.`
                  : "sol och batteri i Stockholm."}
              </span>
            </h1>

            {/* Poster-layout på mobil: brödtext + CTA i nedre delen av första
                vyn (mt-auto). Desktop: vanligt flöde. */}
            <div className="mt-auto pt-12 md:mt-0 md:pt-0">
              {/* Mobil: full svärta + mjuk bone-halo (ljus "skugga" åt rätt
                  håll för mörk text på foto). Desktop: dämpad som förut. */}
              <p className="md:mt-6 max-w-lg text-ink md:text-ink/75 text-[17px] leading-relaxed [text-shadow:0_1px_2px_rgba(244,241,234,0.9),0_0_14px_rgba(244,241,234,0.85)] md:[text-shadow:none]">
                Solpaneler, batterier och laddboxar, byggda på kloka tankar och
                installerade av noggrant utvalda installatörer – med
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
                  className="text-[15px] text-ink md:text-ink/75 hover:text-ink underline underline-offset-4 decoration-ink/40 md:decoration-ink/30 hover:decoration-ink/60 transition [text-shadow:0_1px_2px_rgba(244,241,234,0.9)] md:[text-shadow:none]"
                >
                  eller begär hembesök
                </Link>
              </div>

              {/* Stats-raden – endast desktop. */}
              <div className="mt-12 hidden md:grid grid-cols-3 max-w-md gap-2">
                <Stat n="3" label="installationstjänster" />
                <Stat n="4,7/5" label="i betyg på Reco" />
                <Stat n="14d" label="från offert till tak" />
              </div>
            </div>
          </div>

          {/* 3D-huset (eller admin-bilden) – endast desktop (lg+). */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="aspect-[4/5] w-full rounded-[28px] border border-ink/10 overflow-hidden bg-cream relative">
              {heroImageUrl ? (
                <Image
                  src={heroImageUrl}
                  alt={heroImageAlt || "Optimera Energi installation"}
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              ) : (
                <>
                  <Defer
                    idle
                    fallback={<div className="absolute inset-0 bg-cream" aria-hidden />}
                  >
                    <CanvasErrorBoundary fallback={<SceneFallback kind="hero" />}>
                      <HeroLab />
                    </CanvasErrorBoundary>
                  </Defer>
                  <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between">
                    <div className="rounded-2xl bg-bone/85 backdrop-blur px-4 py-3 border border-ink/10">
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                        Live · 3D-förhandsvy
                      </div>
                      <div className="font-display text-lg leading-tight">
                        Hus #048 · Bromma
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="border-l border-ink/15 pl-4 first:border-l-0 first:pl-0">
      <div className="font-display text-2xl tracking-display-tight">{n}</div>
      <div className="text-[12px] text-ink/55 mt-1 leading-tight">{label}</div>
    </div>
  );
}
