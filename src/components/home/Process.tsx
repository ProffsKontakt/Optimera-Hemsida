"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    label: "Du hör av dig",
    body: "Mejl, telefon eller offertformulär. Vi svarar inom 24 timmar – alltid en människa, aldrig ett bot-flöde.",
  },
  {
    n: "02",
    label: "Hembesök med fika",
    body: "Vi kommer hem, tittar på taket, lyssnar på elskåpet och pratar om vad du faktiskt vill ha. Bullar ingår.",
  },
  {
    n: "03",
    label: "Vi räknar på förutsättningarna",
    body: "Vi går igenom takets förutsättningar, din förbrukning och dina mål – och räknar fram vad som faktiskt är mest optimalt för just ditt behov, innan du tackar ja.",
  },
  {
    n: "04",
    label: "Tydlig offert",
    body: "Inga påslag, inga 'från'-priser. Materielspecifikation, märken, garantier, tidplan och totalpris på en sida – och det priset håller hela vägen till fakturan.",
  },
  {
    n: "05",
    label: "Noggrant utvalda installatörer",
    body: "Certifierade installatörer som vi handplockat och kvalitetssäkrat – samma höga krav på varje jobb, och vi tar fullt ansvar för garantin.",
  },
  {
    n: "06",
    label: "Driftsättning & uppföljning",
    body: "Vi visar dig appen, märker upp i skåpet, och ringer dig efter 14 dagar och 6 månader för finjustering.",
  },
];

export function Process() {
  return (
    <div className="relative blueprint-bg rounded-[28px] border border-ink/10 p-10 md:p-16 bg-bone">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="rounded-2xl border border-ink/10 bg-bone/80 backdrop-blur p-6"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.18em] text-ink/55">
                STEG
              </span>
              <span className="font-display text-2xl tracking-display-tight">
                {s.n}
              </span>
            </div>
            <h4 className="mt-3 font-display text-xl tracking-display-tight">
              {s.label}
            </h4>
            <p className="mt-2 text-ink/65 text-[14.5px] leading-relaxed">
              {s.body}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
