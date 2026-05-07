import { CalcStudio } from "@/components/calc/CalcStudio";

export const metadata = {
  title: "Kalkylator – räkna på er helhet",
  description:
    "Designa hela energilösningen i en levande 1:1-modell av huset. Byt växelriktare, batteri, värmepump och paneler – siffrorna räknas om i realtid.",
};

export default function CalculatorPage() {
  return (
    <>
      <section className="container-edge pt-12 md:pt-20 pb-10">
        <div className="max-w-3xl">
          <div className="eyebrow">Kalkylator · 1:1-modell av huset</div>
          <h1 className="mt-5 font-display text-[56px] md:text-[88px] tracking-display-tight leading-[0.95]">
            Räkna på din
            <br />
            <span className="italic font-serif text-indigo">helhet</span> – i 3D.
          </h1>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg leading-relaxed">
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
