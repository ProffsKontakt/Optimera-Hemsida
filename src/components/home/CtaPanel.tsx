import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaPanel() {
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-ink text-bone p-10 md:p-20">
      <div className="absolute inset-0 opacity-[0.06] bg-blueprint bg-blueprint-md pointer-events-none" />
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/50">
            Nästa steg
          </div>
          <h2 className="mt-5 font-display text-5xl md:text-7xl tracking-display-tight leading-[1.02]">
            Boka ett hembesök.
            <br />
            <span className="italic text-amber">Vi tar med bullarna.</span>
          </h2>
          <p className="mt-6 text-bone/70 max-w-xl text-[15.5px] leading-relaxed">
            Berätta lite om ditt hus, så hör vi av oss inom 24 timmar med ett
            förslag på datum. Helt utan kostnad eller förpliktelse — och ja, vi
            tar med bullar (om du inte är allergisk; säg bara till så fixar vi
            något annat).
          </p>
        </div>
        <div className="md:col-span-4 flex flex-col gap-3">
          <Link
            href="/offert"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber px-7 py-4 text-base font-medium text-ink transition-all hover:bg-amber-deep hover:scale-[1.02]"
          >
            Begär hembesök <ArrowRight size={16} />
          </Link>
          <Link
            href="/kalkylator"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-bone/20 px-7 py-4 text-base font-medium text-bone hover:border-bone/50 hover:bg-bone/5 transition-all"
          >
            Räkna själv först
          </Link>
        </div>
      </div>
    </div>
  );
}
