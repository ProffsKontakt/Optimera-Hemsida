"use client";

import { motion } from "framer-motion";

const items = [
  {
    eyebrow: "01 · Hela ansvaret",
    title: "Ett team – från ritning till driftsättning",
    body:
      "Vi anlitar inte underentreprenörer för det vi inte förstår. Sol, batteri, värmepump, laddbox och vind: vi kan dem alla, och vi installerar dem alla. När något krånglar tre år senare ringer du oss – inte fyra olika leverantörer.",
  },
  {
    eyebrow: "02 · Förstklassig ingenjörskonst",
    title: "Vi optimerar för 25 år, inte för budgeten i nästa kvartal",
    body:
      "Glas-glas-paneler. LFP-batterier. Modulerande växelriktare. Marina kontaktdon. Det syns inte på offerten, men du märker det när det första snöovädret kommer – och det andra, och det tjugofjärde.",
  },
  {
    eyebrow: "03 · Familjär service",
    title: "Vi kommer hem till dig – med kanelbullar",
    body:
      "Vi tror att energiomställningen är ett samtal vid köksbordet, inte ett 47-sidigt PDF-dokument. Vi tar oss tid. Vi tar av oss skorna. Och vi har alltid med oss en burk bullar – för att det är så vi är uppfostrade.",
  },
];

export function Manifesto() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14">
      {items.map((it, i) => (
        <motion.div
          key={it.eyebrow}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: i * 0.08 }}
        >
          <div className="eyebrow">{it.eyebrow}</div>
          <h3 className="font-display text-2xl md:text-[28px] tracking-display-tight mt-4 leading-snug">
            {it.title}
          </h3>
          <p className="mt-4 text-ink/65 text-[15px] leading-relaxed">
            {it.body}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
