import { LazyCalculator } from "./LazyCalculator";
import { SectionHead } from "./shared";

export function CalculatorTeaser() {
  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="container-edge">
        <SectionHead
          eyebrow="Kalkyl"
          title={
            <>
              Hur snabbt <span className="text-indigo">betalar det sig</span> i ditt hus?
            </>
          }
          lede="Kalkylen bygger på en simulering med verkliga kvartspriser i ditt elområde och våra egna priser. Var i spannet du hamnar avgörs av elområde, förbrukning och storlek."
        />
        <div className="mt-12 md:mt-16" data-reveal>
          <LazyCalculator />
        </div>
      </div>
    </section>
  );
}
