"use client";

import { motion } from "framer-motion";

const quotes = [
  {
    quote:
      "En jättetrevlig och kunnig kille kom faktiskt över med kanelbullar och stannade i två timmar för att få fram vilken lösning som var bäst för oss. Han pitchade inget utan var genuin och hjälpte oss. Han och hans kollega tog ett varv runt huset och ritade senare upp en lösning som faktiskt funkar för vårt skogshem. Två år senare är vi helt självgående på vår- och sommarhalvåret, med riktigt låga räkningar på höst- och vinterhalvåret. Kan varmt rekommendera Dexter och hans gäng.",
    author: "Familjen Lindh",
    place: "Vaxholm · Sol + batteri",
  },
  {
    quote:
      "Det är första gången jag känt att en elfirma faktiskt bryr sig om hela huset. De ville se min radiatorkurva innan de pratade pump.",
    author: "Anna Berglund",
    place: "Saltsjöbaden · Bergvärme",
  },
  {
    quote:
      "Petter borrade nya kabelvägar i en dag bara för att det skulle se snyggt ut. Det är en sån sak man inte vet att man vill ha förrän man får det.",
    author: "Hassan & Erik",
    place: "Bromma · Sol + laddbox",
  },
];

export function Testimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {quotes.map((q, i) => (
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: i * 0.08 }}
          className="rounded-3xl border border-ink/10 bg-cream/70 p-8 flex flex-col"
        >
          <div className="font-display text-5xl text-indigo leading-none">"</div>
          <blockquote className="mt-2 font-display text-[20px] tracking-display-tight leading-snug">
            {q.quote}
          </blockquote>
          <figcaption className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between text-[13px]">
            <span className="font-medium">{q.author}</span>
            <span className="text-ink/55 font-mono text-[11px] uppercase tracking-[0.16em]">
              {q.place}
            </span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
