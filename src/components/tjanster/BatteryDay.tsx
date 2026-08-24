import { Coins, Home, Moon, Sun } from "lucide-react";

/**
 * "Batteriets dygn" – fyra faser som visar hur batteriet jobbar/tjänar
 * pengar över dygnet. Mobil: svepbar kortrad (scroll-snap, kant till kant).
 * Desktop: fyra kolumner. Siffror/påståenden speglar befintlig site-copy
 * (köper billigt/säljer dyrt, stödtjänster) – inga nya sifferlöften.
 */
const PHASES = [
  {
    time: "02:00",
    title: "Natt",
    body: "Batteriet laddar från elnätet när priset är som lägst på dygnet.",
    icon: <Moon size={16} />,
    accent: "bg-graphite text-bone",
  },
  {
    time: "12:00",
    title: "Dag",
    body: "Solen fyller batteriet – och överskottet säljs när priset är bra.",
    icon: <Sun size={16} />,
    accent: "bg-sun text-ink",
  },
  {
    time: "18:00",
    title: "Kväll",
    body: "Middag, tvätt och laddning körs på lagrad el i stället för dyr topp-el.",
    icon: <Home size={16} />,
    accent: "bg-copper text-bone",
  },
  {
    time: "24/7",
    title: "Dygnet runt",
    body: "Stödtjänster mot Svenska kraftnät betalar även när batteriet står still.",
    icon: <Coins size={16} />,
    accent: "bg-moss text-bone",
  },
];

export function BatteryDay() {
  return (
    <div>
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto -mx-6 px-6 sm:-mx-10 sm:px-10 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
        {PHASES.map((p) => (
          <div
            key={p.title}
            className="w-[70vw] max-w-[270px] shrink-0 snap-center rounded-3xl border border-ink/10 bg-cream/60 p-6 md:w-auto md:max-w-none md:shrink"
          >
            <div className="flex items-center justify-between">
              <span className={`grid h-10 w-10 place-items-center rounded-full ${p.accent}`}>
                {p.icon}
              </span>
              <span className="rounded-full border border-ink/12 bg-bone px-2.5 py-1 font-mono text-[10.5px] tracking-[0.14em] text-ink/60">
                {p.time}
              </span>
            </div>
            <h3 className="mt-4 font-display text-xl tracking-display-tight">
              {p.title}
            </h3>
            <p className="mt-2 text-[14px] text-ink/70 leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/40 md:hidden">
        Svep för hela dygnet →
      </p>
    </div>
  );
}
