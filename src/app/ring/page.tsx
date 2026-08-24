import Link from "next/link";
import { ArrowRight, Clock, Phone } from "lucide-react";

/**
 * Lättviktig "Ring oss"-sida. Numret visas MEDVETET bara här (inte direkt
 * i knappar/menyer) så samtalen kommer från folk som aktivt valt att
 * ringa. Noindex – ren funktionssida, inget sök-innehåll.
 */
export const metadata = {
  title: "Ring oss",
  description: "Slå oss en signal – du pratar alltid med en människa.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/ring" },
};

export default function RingPage() {
  return (
    <section className="container-edge pt-14 md:pt-24 pb-24">
      <div className="mx-auto max-w-lg text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-indigo text-bone">
          <Phone size={22} />
        </span>
        <h1 className="mt-6 font-display text-[40px] md:text-[56px] tracking-display-tight leading-[1.02]">
          Slå oss{" "}
          <span className="italic font-serif text-indigo">en signal.</span>
        </h1>
        <p className="mt-4 text-ink/70 text-[16px] leading-relaxed">
          Du pratar alltid med en människa hos oss – aldrig en växel eller ett
          knappval.
        </p>

        <a
          href="tel:+46701946967"
          className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-indigo px-8 py-5 text-xl md:text-2xl font-medium text-bone hover:bg-indigo/90 transition shadow-lg shadow-indigo/20"
        >
          <Phone size={20} />
          070-194 69 67
        </a>

        <p className="mt-5 flex items-center justify-center gap-2 text-[13.5px] text-ink/55">
          <Clock size={14} />
          Vardagar 08–17. Övrig tid – lämna ett meddelande så ringer vi upp.
        </p>

        <div className="mt-12 rounded-3xl border border-ink/10 bg-cream/50 p-6 text-left">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/50">
            Hellre skriva?
          </div>
          <div className="mt-3 flex flex-col gap-2.5 text-[14.5px]">
            <Link
              href="/offert-start"
              className="inline-flex items-center gap-2 text-indigo hover:underline underline-offset-4"
            >
              Svara på några snabba frågor – få en kostnadsfri offert
              <ArrowRight size={14} />
            </Link>
            <a
              href="mailto:hej@optimeraenergi.se"
              className="inline-flex items-center gap-2 text-ink/70 hover:text-ink transition"
            >
              hej@optimeraenergi.se
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
