"use client";

import { motion } from "framer-motion";

type Tile = {
  caption: string;
  alt: string;
  ratio: string;
  bg: string;
  hue: string;
};

const tiles: Tile[] = [
  {
    caption: "Bilen lastad i Hammarby – Ronja, Albin & Petter",
    alt: "Tre installatörer lastar materialet i en elbil",
    ratio: "aspect-[4/5]",
    bg: "from-[#3F5236] to-[#1A1A17]",
    hue: "Morgon · 06:42",
  },
  {
    caption: "Kanelbullar från Lillebils i Bromma · 12 st",
    alt: "Bricka med kanelbullar på köksbordet",
    ratio: "aspect-[1/1]",
    bg: "from-[#E9B949] to-[#B86F3C]",
    hue: "Hembesök · 09:10",
  },
  {
    caption: "Tak­besiktning med drönare innan offert",
    alt: "Drönarvy över ett villatak med solpaneler",
    ratio: "aspect-[4/5]",
    bg: "from-[#0a3a4e] to-[#0E0E0C]",
    hue: "Mätning · 14:25",
  },
  {
    caption: "Familjen Eklund vid sin nya laddbox",
    alt: "Familj framför nyinstallerad laddbox",
    ratio: "aspect-[5/4]",
    bg: "from-[#EFE9DC] to-[#9aa590]",
    hue: "Drift · 16:30",
  },
  {
    caption: "Säkringsskåpet – innan & efter",
    alt: "Renoverat elskåp med tydlig märkning",
    ratio: "aspect-[1/1]",
    bg: "from-[#1A1A17] to-[#3F5236]",
    hue: "Detalj · 11:08",
  },
];

export function HousecallStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
      {tiles.map((t, i) => (
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.06 }}
          className={`group relative ${t.ratio} rounded-2xl overflow-hidden border border-ink/10 bg-gradient-to-br ${t.bg}`}
        >
          {/* Stand-in: replace with real photography or Higgsfield-generated frames */}
          <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-grain bg-grain-sm" />
          <div className="absolute top-3 left-3 rounded-full bg-bone/85 backdrop-blur px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70 border border-ink/10">
            {t.hue}
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 p-3 text-bone/95 text-[12.5px] leading-snug bg-gradient-to-t from-ink/65 to-transparent">
            {t.caption}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
