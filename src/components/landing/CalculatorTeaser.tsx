import { PAYBACK_BANDS } from "@/lib/payback";
import { LazyCalculator, type PaybackSpans } from "./LazyCalculator";
import { SectionHead } from "./shared";

// Samma spann som räknemotorn använder (lib/payback.ts).
const SPANS: PaybackSpans = {
  existingSolarBattery: [PAYBACK_BANDS.existingSolarBattery.lo, PAYBACK_BANDS.existingSolarBattery.hi],
  solarAndBattery: [PAYBACK_BANDS.solarAndBattery.lo, PAYBACK_BANDS.solarAndBattery.hi],
  batteryOnly: [PAYBACK_BANDS.batteryOnly.lo, PAYBACK_BANDS.batteryOnly.hi],
};

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
          <LazyCalculator spans={SPANS} />
        </div>
      </div>
    </section>
  );
}
