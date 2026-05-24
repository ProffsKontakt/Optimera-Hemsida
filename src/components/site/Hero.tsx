"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { CanvasErrorBoundary } from "@/components/3d/CanvasErrorBoundary";
import { SceneFallback } from "@/components/3d/SceneFallback";

// Three.js + R3F är ~200 KB minified och påverkar LCP/TBT på mobil rejält.
// Hero-canvasen är dekorativ – inte LCP-element – så vi dynamic-importerar
// med ssr:false och en cream-placeholder så det inte blir layout shift.
const HeroLab = dynamic(
  () => import("@/components/3d/HeroLab").then((m) => m.HeroLab),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-cream" aria-hidden />,
  },
);

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-edge pt-12 md:pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7 relative">
            {/* Vertikal brand-stripe (blå topp, gul botten) som ekar
                logotypens lodräta staplar. Decorativ. */}
            <span
              aria-hidden
              className="hidden md:block brand-stripe absolute -left-4 top-2 h-24"
            />
            <div className="eyebrow">
              Optimera Energi · Byggd på kloka tankar · Stockholm 2026
            </div>

            {/* H1 är LCP-elementet. Renderas SYNKRONT utan framer-motion-
                gating så LCP fires direkt vid första paint istället för
                efter hydration. Innehåller brand + service + city för
                Google ranking på "optimera energi" + lokala intent-termer. */}
            <h1 className="mt-6 font-display text-[58px] md:text-[92px] leading-[0.95] tracking-display-tight">
              Optimera Energi
              <br />
              <span className="italic font-serif text-indigo">
                — sol, batteri och värme i Stockholm.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-ink/70 text-lg leading-relaxed">
              Solpaneler, batterier, värmepumpar och laddboxar – byggda på
              kloka tankar och installerade av samma gäng från Solna som
              dyker upp med kanelbullar och respekt för ditt hem.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/kalkylator" className="btn-primary">
                Räkna på din besparing
                <ArrowRight size={16} />
              </Link>
              <Link href="/offert" className="btn-ghost">
                Begär hembesök
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 max-w-md">
              <Stat n="5" label="installationstjänster" />
              <Stat n="100%" label="eget montageteam" />
              <Stat n="14d" label="från offert till tak" />
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] w-full rounded-[28px] border border-ink/10 overflow-hidden bg-cream relative">
              <CanvasErrorBoundary fallback={<SceneFallback kind="hero" />}>
                <HeroLab />
              </CanvasErrorBoundary>
              <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between">
                <div className="rounded-2xl bg-bone/85 backdrop-blur px-4 py-3 border border-ink/10">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    Live · 1:1-modell av huset
                  </div>
                  <div className="font-display text-lg leading-tight">
                    Hus #048 · Bromma
                  </div>
                </div>
                <div className="rounded-2xl bg-bone/95 text-ink backdrop-blur px-4 py-3 border border-ink/10">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    Årsvärmefaktor
                  </div>
                  <div className="font-display text-lg leading-tight">
                    4,92
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="border-l border-ink/15 pl-4 first:border-l-0 first:pl-0">
      <div className="font-display text-3xl tracking-display-tight">{n}</div>
      <div className="text-[12px] text-ink/55 mt-1 leading-tight">{label}</div>
    </div>
  );
}

function Marquee() {
  const items = [
    "NIBE",
    "Bosch",
    "Mitsubishi",
    "Daikin",
    "Easyway",
    "Emaldo",
    "Easee",
    "Zaptec",
    "Charge Amps",
    "Solis",
    "SAJ",
    "Thermia",
  ];
  return (
    <div className="relative border-y border-ink/10 bg-cream/60 ticker-mask">
      <div className="flex gap-12 overflow-hidden py-5 animate-[shimmer_22s_linear_infinite] motion-reduce:animate-none">
        {[...items, ...items].map((it, i) => (
          <span
            key={i}
            className="font-mono text-[12.5px] uppercase tracking-[0.22em] text-ink/55 whitespace-nowrap"
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
