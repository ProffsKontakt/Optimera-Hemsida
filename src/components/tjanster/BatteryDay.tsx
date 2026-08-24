import { Coins, Home, Moon, Sun } from "lucide-react";

/**
 * "Batteriets dygn" som en RESA över dagen: en horisontell streckad led
 * med tids-noder (02:00 -> 12:00 -> 18:00 -> 24/7) och lätt lutade kort
 * under – samma kart-/resekänsla som startsidans "Sex steg".
 * Mobil: svepbar rad (leden följer med genom hela spåret).
 * Desktop: fyra kolumner. Påståendena speglar befintlig site-copy.
 */
const PHASES = [
  {
    time: "02:00",
    title: "Natt",
    body: "Batteriet laddar från elnätet när priset är som lägst på dygnet.",
    icon: <Moon size={16} />,
    accent: "bg-graphite text-bone",
    tilt: "-rotate-1",
  },
  {
    time: "12:00",
    title: "Dag",
    body: "Solen fyller batteriet – och överskottet säljs när priset är bra.",
    icon: <Sun size={16} />,
    accent: "bg-sun text-ink",
    tilt: "rotate-1",
  },
  {
    time: "18:00",
    title: "Kväll",
    body: "Middag, tvätt och laddning körs på lagrad el i stället för dyr topp-el.",
    icon: <Home size={16} />,
    accent: "bg-copper text-bone",
    tilt: "-rotate-[0.7deg]",
  },
  {
    time: "24/7",
    title: "Dygnet runt",
    body: "Smartstyrningen har koll på förbrukningen och sänker elkostnaden timme för timme.",
    icon: <Coins size={16} />,
    accent: "bg-moss text-bone",
    tilt: "rotate-[0.8deg]",
  },
];

export function BatteryDay() {
  return (
    <div>
      <div className="-mx-6 px-6 sm:-mx-10 sm:px-10 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:overflow-visible">
        <div className="relative flex w-max gap-4 pb-2 md:w-auto md:grid md:grid-cols-4 md:gap-5 md:pb-0">
          {/* Dygnets led: streckad linje genom alla tids-noder. */}
          <span
            aria-hidden
            className="absolute left-0 right-0 top-[21px] border-t-2 border-dashed border-ink/20"
          />
          {PHASES.map((p) => (
            <div
              key={p.title}
              className="relative w-[70vw] max-w-[270px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink"
            >
              {/* Nod på leden: ikon + klockslag. */}
              <div className="relative z-10 flex items-center gap-2.5">
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border-4 border-bone shadow-sm ${p.accent}`}
                >
                  {p.icon}
                </span>
                <span className="rounded-full border border-ink/12 bg-bone px-2.5 py-1 font-mono text-[10.5px] tracking-[0.14em] text-ink/60">
                  {p.time}
                </span>
              </div>
              {/* Kortet – som en lapp längs resan. */}
              <div
                className={`mt-4 rounded-3xl border border-ink/10 bg-bone p-5 shadow-sm ${p.tilt}`}
              >
                <h3 className="font-display text-xl tracking-display-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-[14px] text-ink/70 leading-relaxed">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/40 md:hidden">
        Svep genom dygnet →
      </p>
    </div>
  );
}
