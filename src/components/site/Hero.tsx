"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroLab } from "@/components/3d/HeroLab";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-edge pt-12 md:pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="eyebrow"
            >
              Optimera Energi · Byggd på kloka tankar · Stockholm 2026
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05 }}
              className="mt-6 font-display text-[58px] md:text-[92px] leading-[0.95] tracking-display-tight"
            >
              Hela
              <br />
              energi&shy;omställningen
              <br />
              <span className="italic text-moss">under ett tak.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 max-w-xl text-ink/70 text-lg leading-relaxed"
            >
              Solpaneler, batterier, värmepumpar, laddboxar och vindkraft –
              byggda på kloka tankar och installerade av samma gäng som dyker
              upp med kanelbullar och respekt för ditt hem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link href="/kalkylator" className="btn-primary">
                Räkna på din besparing
                <ArrowRight size={16} />
              </Link>
              <Link href="/offert" className="btn-ghost">
                Begär hembesök
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-14 grid grid-cols-3 max-w-md"
            >
              <Stat n="5" label="installationstjänster" />
              <Stat n="100%" label="eget montageteam" />
              <Stat n="14d" label="från offert till tak" />
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] w-full rounded-[28px] border border-ink/10 overflow-hidden bg-cream relative">
              <HeroLab />
              <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between">
                <div className="rounded-2xl bg-bone/85 backdrop-blur px-4 py-3 border border-ink/10">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    Live · 1:1-modell av huset
                  </div>
                  <div className="font-display text-lg leading-tight">
                    Hus #048 · Bromma
                  </div>
                </div>
                <div className="rounded-2xl bg-ink/90 text-bone backdrop-blur px-4 py-3 border border-bone/10">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/55">
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
    "SolarEdge",
    "Huawei",
    "Easee",
    "Zaptec",
    "BYD",
    "Pylontech",
    "SMA",
    "Thermia",
  ];
  return (
    <div className="relative border-y border-ink/10 bg-cream/60 ticker-mask">
      <div className="flex gap-12 overflow-hidden py-5 animate-[shimmer_22s_linear_infinite]">
        {[...items, ...items, ...items].map((it, i) => (
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
