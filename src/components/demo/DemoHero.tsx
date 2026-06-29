"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { CanvasErrorBoundary } from "@/components/3d/CanvasErrorBoundary";
import { SceneFallback } from "@/components/3d/SceneFallback";
import { Defer } from "@/components/3d/Defer";

/**
 * DEMO-variant av Hero. Skillnader mot live-hero (declutter):
 *  - EN primär CTA; "begär hembesök" blir en lugn textlänk istället för en
 *    andra knapp av samma vikt.
 *  - Den animerade 13-märkes-marqueen är borttagen från hero (flyttas till en
 *    lugn statisk rad längre ner via DemoBrandRow) så första vyn är tystare.
 *  - Allt annat (3D-scen, stats, brand-stripe) behålls oförändrat.
 * Live-Hero (/) är orörd – detta är en separat komponent.
 */
const HeroLab = dynamic(
  () => import("@/components/3d/HeroLab").then((m) => m.HeroLab),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-cream" aria-hidden />,
  },
);

export function DemoHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-edge pt-6 md:pt-10 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7 relative">
            <span
              aria-hidden
              className="hidden md:block brand-stripe absolute -left-4 top-2 h-24"
            />
            <div className="eyebrow">
              Optimera Energi · Byggd på kloka tankar · Stockholm 2026
            </div>

            <h1 className="mt-6 font-display text-[42px] md:text-[64px] leading-[1.02] tracking-display-tight">
              Optimera Energi,
              <br />
              <span className="italic font-serif text-indigo">
                sol och batteri i Stockholm.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-ink/70 text-[17px] leading-relaxed">
              Solpaneler, batterier och laddboxar, byggda på kloka tankar och
              installerade av samma gäng från Solna som dyker upp med
              kanelbullar och respekt för ditt hem.
            </p>

            {/* EN primär handling. Sekundär blir lugn textlänk. */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/kalkylator" className="btn-primary">
                Räkna på din besparing
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/offert"
                className="text-[15px] text-ink/70 hover:text-ink underline underline-offset-4 decoration-ink/25 hover:decoration-ink/60 transition"
              >
                eller begär hembesök
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 max-w-md gap-2">
              <Stat n="3" label="installationstjänster" />
              <Stat n="100%" label="eget montageteam" />
              <Stat n="14d" label="från offert till tak" />
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] w-full rounded-[28px] border border-ink/10 overflow-hidden bg-cream relative">
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
                <div className="rounded-2xl bg-bone/95 text-ink backdrop-blur px-4 py-3 border border-ink/10">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    Årsvärmefaktor
                  </div>
                  <div className="font-display text-lg leading-tight">4,92</div>
                </div>
              </div>
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
