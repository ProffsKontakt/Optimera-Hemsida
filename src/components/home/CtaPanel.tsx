import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandPanel } from "@/components/site/BrandPanel";

export function CtaPanel() {
  return (
    <BrandPanel>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end">
        <div className="md:col-span-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
            Nästa steg
          </div>
          <h2 className="mt-4 font-display text-4xl md:text-6xl tracking-display-tight leading-[1.02]">
            Boka ett hembesök.
            <br />
            <span className="italic font-serif text-indigo">
              Vi tar med bullarna.
            </span>
          </h2>
          <p className="mt-5 text-ink/70 max-w-xl text-[15.5px] leading-relaxed">
            Berätta lite om ditt hus, så hör vi av oss inom 24 timmar med ett
            förslag på datum. Helt utan kostnad eller förpliktelse, och ja, vi
            tar med bullar (om du inte är allergisk; säg bara till så fixar vi
            något annat).
          </p>
        </div>
        <div className="md:col-span-4 flex flex-col gap-3">
          <Link
            href="/offert"
            className="btn-primary justify-center text-base"
          >
            Begär hembesök <ArrowRight size={16} />
          </Link>
          <Link
            href="/kalkylator"
            className="btn-ghost justify-center text-base"
          >
            Räkna själv först
          </Link>
        </div>
      </div>
    </BrandPanel>
  );
}
