import { CalcStudio } from "@/components/calc/CalcStudio";

export const metadata = {
  title: "Kalkylator – räkna på er energilösning i 3D",
  description:
    "Designa solpaneler, batteri, värmepump och laddbox i en levande 1:1-modell av huset. Sätt antal paneler, batterimärke och kapacitet, och se investering, grönt avdrag, årlig besparing och återbetalningstid räknas om i realtid.",
  alternates: { canonical: "/kalkylator" },
  openGraph: {
    title: "Kalkylator – Optimera Energi",
    description:
      "Designa er energilösning i 3D. Få investering, grönt avdrag och återbetalningstid på sekunden.",
    url: "/kalkylator",
    type: "website",
  },
};

export default function CalculatorPage() {
  return (
    <>
      <section className="container-edge pt-12 md:pt-20 pb-10">
        <div className="max-w-3xl">
          <div className="eyebrow">Kalkylator · 1:1-modell av huset</div>
          <h1 className="mt-5 font-display text-[44px] sm:text-[56px] md:text-[88px] tracking-display-tight leading-[0.95]">
            Räkna på din
            <br />
            <span className="italic font-serif text-indigo">helhet</span> – i 3D.
          </h1>
          <p className="mt-5 sm:mt-6 max-w-2xl text-ink/70 text-base sm:text-lg leading-relaxed">
            Byt panelmärke, växelriktare, batteristorlek, värmepump och laddbox.
            Modellen ovan uppdaterar sig – och så gör siffrorna. Det här är
            samma motor som vi använder vid våra hembesök.
          </p>
        </div>
      </section>

      <section className="container-edge pb-32">
        <CalcStudio />
      </section>
    </>
  );
}
