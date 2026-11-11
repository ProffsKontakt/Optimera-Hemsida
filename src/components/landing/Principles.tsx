import { delay, NextStep, SectionHead } from "./shared";

/** Mörk sektion: "Vi säger nej när vi måste." Fyra principer. */
const ITEMS = [
  {
    label: "Genuinitet",
    title: "Vi säljer inte paket.",
    body: "När du borde vänta, dimensionera mindre eller välja batteri före fler paneler, säger vi det. Det är därför vi finns.",
  },
  {
    label: "Förståelse först",
    title: "Huset före lösningen.",
    body: "Vi räknar på förbrukningen och kartlägger huset. Först då lägger vi ett konkret förslag, och förklarar varför andra alternativ inte når lika långt.",
  },
  {
    label: "Handplockat sortiment",
    title: "Det vi säljer har vi valt.",
    body: "Valt efter hundratals tester för mest värde över 25 år. LFP-celler är vårt standardval för batteri, för säkerhet och livslängd.",
  },
  {
    label: "Erfarenhet",
    title: "Vi vet vad som gör skillnad.",
    body: "Elektriker, projektörer, ekonomer och rådgivare med rötter i välrenommerade bolag inom sol, batteri och el. Löftet är enkelt: våra kunder ska vara branschens nöjdaste.",
  },
];

export function Principles() {
  return (
    <section className="lp-night bg-night py-14 text-white sm:py-20 md:py-28">
      <div className="container-edge">
        <SectionHead
          tone="dark"
          eyebrow="Därför finns vi"
          title={
            <>
              Vi säger nej <span className="text-sun">när vi måste.</span>
            </>
          }
          lede="Bra rådgivning är inte alltid bekväm rådgivning. Ska du vänta, dimensionera mindre eller lägga pengarna på batteri i stället för fler paneler, så säger vi det."
        />
        <ul className="mt-8 grid gap-x-8 gap-y-10 sm:mt-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {ITEMS.map((it, i) => (
            <li key={it.label} className="relative pt-6">
              <span
                className="absolute inset-x-0 top-0 block h-px bg-white/25"
                data-reveal="line"
                style={delay(i * 140)}
              />
              <div data-reveal style={delay(120 + i * 140)}>
                <div className="font-mono text-[11.5px] tracking-[0.14em] text-sun">
                  {String(i + 1).padStart(2, "0")} · {it.label}
                </div>
                <h3 className="lp-h3 mt-3 text-[#ECEDF5]">{it.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/65">{it.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <NextStep
          tone="dark"
          className="mt-14 md:mt-16"
          note="Vi räknar ärligt på ditt hus och säger nej om det inte går ihop."
        />
      </div>
    </section>
  );
}
