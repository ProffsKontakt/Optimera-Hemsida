"use client";

import { motion } from "framer-motion";

const items = [
  {
    eyebrow: "01 · Genuinitet",
    title: "Vi säger nej när vi måste.",
    body:
      "Vi finns inte för att sälja paket. Bra rådgivning är inte alltid bekväm rådgivning. När vi tycker att du borde vänta, dimensionera mindre, eller satsa på värmepump istället för fler paneler, då säger vi det. Det är därför vi finns.",
  },
  {
    eyebrow: "02 · Förståelse först",
    title: "Vi förstår er situation innan vi pratar lösning.",
    body:
      "Innan vi pratar lösning vill vi förstå er situation. Vi räknar på er förbrukning, kartlägger ert hus, och ser om lösningen passar er. Först då lägger vi ett konkret förslag, med en klar förklaring av varför andra alternativ inte når lika långt.",
  },
  {
    eyebrow: "03 · Hand-plockat sortiment",
    title: "Det vi säljer har vi själva valt.",
    body:
      "Vi kan installera vilket märke som helst. Men vi har valt det vi säljer efter hundratals tester. Inte det dyraste. Inte det billigaste. Det som ger mest värde för pengarna utan att tumma på 25-årsperspektivet.",
  },
  {
    eyebrow: "04 · Erfarenhet från branschens bästa",
    title: "Vi vet vad som gör skillnad.",
    body:
      "En kompetent skara elektriker, projektörer, ekonomer och säljare. Vi har rötter i Sveriges mest välrenommerade bolag inom solenergi, batterilager och el, och tar med oss exakt de insikter som avgör skillnaden mellan en bra och en utmärkt installation. Resultatet är ett enkelt löfte: våra kunder ska vara branschens nöjdaste.",
  },
];

export function Manifesto() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
      {items.map((it, i) => (
        <motion.div
          key={it.eyebrow}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: i * 0.08 }}
        >
          <div className="eyebrow">{it.eyebrow}</div>
          <h3 className="font-display text-2xl md:text-[26px] tracking-display-tight mt-4 leading-snug">
            {it.title}
          </h3>
          <p className="mt-4 text-ink/65 text-[14.5px] leading-relaxed">
            {it.body}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
