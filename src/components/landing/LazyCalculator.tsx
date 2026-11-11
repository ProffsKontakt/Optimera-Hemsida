"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export type PaybackSpans = {
  existingSolarBattery: [number, number];
  solarAndBattery: [number, number];
  batteryOnly: [number, number];
};

/**
 * Det som står i kalkylens ställe tills den laddats: de tre vanliga fallen
 * med sina återbetalningsspann och länkar vidare. Renderas på servern, så
 * sektionen har riktigt innehåll även utan JavaScript, för sökmotorer och
 * om kalkylens kod inte går att hämta.
 */
function CalculatorFallback({ spans }: { spans: PaybackSpans }) {
  const rows: [string, [number, number]][] = [
    ["Batteri till befintliga solceller", spans.existingSolarBattery],
    ["Solceller och batteri", spans.solarAndBattery],
    ["Batteri utan solceller", spans.batteryOnly],
  ];
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="rounded-[30px] bg-[#FFFDF8] p-6 ring-1 ring-ink/[0.06] md:p-8 lg:min-h-[560px]">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
          Tre vanliga fall
        </div>
        <dl className="mt-5 divide-y divide-ink/10">
          {rows.map(([label, [lo, hi]]) => (
            <div key={label} className="flex items-baseline justify-between gap-6 py-5">
              <dt className="text-[16px] text-ink/75">{label}</dt>
              <dd className="whitespace-nowrap font-display text-[1.5rem] font-medium tracking-[-0.02em] text-indigo">
                {lo}–{hi} år
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-[14.5px] leading-relaxed text-ink/60">
          Var i spannet du hamnar avgörs av elområde, förbrukning och batteriets storlek och pris.
        </p>
      </div>
      <div className="flex flex-col rounded-[30px] bg-night p-6 text-white md:p-8 lg:min-h-[560px]">
        <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/50">Din kalkyl</div>
        <p className="mt-6 font-display text-[1.75rem] font-medium leading-tight tracking-[-0.02em]">
          Räkna på ditt eget hus.
        </p>
        <p className="mt-4 text-[15.5px] leading-relaxed text-white/75">
          I kalkylatorn väljer du tak, paneler, batteri och elområde och ser den uppskattade
          återbetalningen för just ditt hus. Exakt pris tar vi fram i offerten.
        </p>
        <div className="mt-auto flex flex-col gap-3 pt-8">
          <Link href="/offert" className="lp-btn-sun w-full">
            Få ett fast pris för ditt hus <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link
            href="/kalkylator"
            className="text-center text-[14.5px] text-white/70 underline decoration-white/25 underline-offset-4 transition hover:text-white hover:decoration-white/60"
          >
            Öppna kalkylatorn
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Kalkylens kod hämtas först när sektionen närmar sig bild, så att den inte
 * tynger sidans första laddning. Tills den är inne, och om den inte går att
 * hämta (dålig uppkoppling, eller en ny version har just lagts ut), står
 * det statiska innehållet kvar i stället för att sektionen blir tom eller
 * sidan kraschar.
 */
export function LazyCalculator({ spans }: { spans: PaybackSpans }) {
  const [near, setNear] = useState(false);
  const [Calculator, setCalculator] = useState<React.ComponentType | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setNear(true);
      },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    let alive = true;
    import("./HomeCalculator")
      .then((m) => {
        if (alive) setCalculator(() => m.default);
      })
      .catch(() => {
        /* det statiska innehållet står kvar */
      });
    return () => {
      alive = false;
    };
  }, [near]);

  return <div ref={ref}>{Calculator ? <Calculator /> : <CalculatorFallback spans={spans} />}</div>;
}
