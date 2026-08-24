"use client";

import { motion } from "framer-motion";

/**
 * "Sex steg, inga genvägar" som en RESA/skattkarta:
 *  - Streckad led som löper genom stegen (vänsterkant på mobil, mitten på
 *    desktop) ovanpå blueprint-rutnätet – kartkänslan.
 *  - Färgade nummer-noder på leden (en accentfärg per steg) och kort som
 *    zigzagar vänster/höger med en liten lutning, som utplacerade lappar.
 *  - Målet markeras med ett X – där ligger skatten.
 * Fika-referenserna är borttagna på kundens begäran.
 */
const steps = [
  {
    n: "01",
    label: "Du hör av dig",
    body: "Mejl, telefon eller offertformulär. Vi svarar inom 24 timmar – alltid en människa, aldrig ett bot-flöde.",
    accent: "bg-indigo text-bone",
    tilt: -1.2,
  },
  {
    n: "02",
    label: "Hembesök",
    body: "Vi kommer hem, tittar på taket, går igenom elskåpet och pratar om vad du faktiskt vill ha.",
    accent: "bg-sun text-ink",
    tilt: 1,
  },
  {
    n: "03",
    label: "Vi räknar på förutsättningarna",
    body: "Vi går igenom takets förutsättningar, din förbrukning och dina mål – och räknar fram vad som faktiskt är mest optimalt för just ditt behov, innan du tackar ja.",
    accent: "bg-moss text-bone",
    tilt: -0.8,
  },
  {
    n: "04",
    label: "Tydlig offert",
    body: "Inga påslag, inga 'från'-priser. Materielspecifikation, märken, garantier, tidplan och totalpris på en sida – och det priset håller hela vägen till fakturan.",
    accent: "bg-amber text-ink",
    tilt: 1.2,
  },
  {
    n: "05",
    label: "Eget montageteam",
    body: "Våra elektriker, våra montörer, våra verktyg. Inget vandrar mellan tre underentreprenörer.",
    accent: "bg-copper text-bone",
    tilt: -1,
  },
  {
    n: "06",
    label: "Driftsättning & uppföljning",
    body: "Vi visar dig appen, märker upp i skåpet, och ringer dig efter 14 dagar och 6 månader för finjustering.",
    accent: "bg-graphite text-bone",
    tilt: 0.8,
  },
];

export function DemoProcess() {
  return (
    <div className="relative blueprint-bg rounded-[28px] border border-ink/10 p-6 py-10 md:p-16 bg-bone overflow-hidden">
      <div className="relative">
        {/* Leden: streckad linje genom hela resan. */}
        <span
          aria-hidden
          className="absolute left-[21px] md:left-1/2 top-3 bottom-0 border-l-2 border-dashed border-ink/25 md:-translate-x-px"
        />

        <ol className="space-y-9 md:space-y-4">
          {steps.map((s, i) => {
            const leftSide = i % 2 === 0;
            return (
              <li key={s.n} className="relative md:grid md:grid-cols-2 md:gap-0">
                {/* Nummer-nod på leden. */}
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, type: "spring", bounce: 0.45 }}
                  className={`absolute left-0 top-1 md:left-1/2 md:top-8 md:-translate-x-1/2 z-10 grid h-11 w-11 place-items-center rounded-full border-4 border-bone font-mono text-[13px] font-medium shadow-sm ${s.accent}`}
                >
                  {s.n}
                </motion.span>

                {/* Kortet – zigzag + liten lutning, som en lapp på kartan. */}
                <motion.div
                  initial={{ opacity: 0, x: leftSide ? -28 : 28, rotate: 0 }}
                  whileInView={{ opacity: 1, x: 0, rotate: s.tilt }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: 0.06 }}
                  className={`ml-16 md:ml-0 rounded-2xl border border-ink/10 bg-bone/90 backdrop-blur p-6 shadow-sm ${
                    leftSide
                      ? "md:col-start-1 md:mr-12"
                      : "md:col-start-2 md:ml-12"
                  }`}
                >
                  <h4 className="font-display text-xl tracking-display-tight">
                    {s.label}
                  </h4>
                  <p className="mt-2 text-ink/65 text-[14.5px] leading-relaxed">
                    {s.body}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>

        {/* X:et markerar skatten. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 mt-10 flex items-center gap-4 md:justify-center"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sun text-ink border-4 border-bone font-display text-xl shadow-sm">
            ✕
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
            Här ligger skatten: en elräkning nära noll
          </span>
        </motion.div>
      </div>
    </div>
  );
}
