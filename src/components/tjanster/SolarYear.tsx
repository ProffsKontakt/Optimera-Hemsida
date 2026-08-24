import { Leaf, Snowflake, Sprout, Sun } from "lucide-react";

/**
 * "Solens år" – solcellernas motsvarighet till Batteriets dygn: en resa
 * över säsongerna längs en streckad led med månadsnoder och lätt lutade
 * kort. Mobil: svepbar rad. Desktop: fyra kolumner. December-kortet
 * bryggar medvetet mot batteri + smart styrning (tvärförsäljning).
 */
const SEASONS = [
  {
    time: "MARS",
    title: "Ljuset vänder",
    body: "Produktionen drar igång på allvar – långa, ljusa dagar väntar runt hörnet.",
    icon: <Sprout size={16} />,
    accent: "bg-moss text-bone",
    tilt: "-rotate-1",
  },
  {
    time: "JUNI",
    title: "Toppsäsong",
    body: "Huset går på egen sol och överskottet säljs – eller lagras i batteriet.",
    icon: <Sun size={16} />,
    accent: "bg-sun text-ink",
    tilt: "rotate-1",
  },
  {
    time: "SEP",
    title: "Skörden räknas hem",
    body: "Sommarens produktion har kapat räkningarna – nu syns det på årskostnaden.",
    icon: <Leaf size={16} />,
    accent: "bg-copper text-bone",
    tilt: "-rotate-[0.7deg]",
  },
  {
    time: "DEC",
    title: "Styrningen tar över",
    body: "När solen vilar jobbar batteriet och smartstyrningen – köper billigt, använder smart.",
    icon: <Snowflake size={16} />,
    accent: "bg-indigo text-bone",
    tilt: "rotate-[0.8deg]",
  },
];

export function SolarYear() {
  return (
    <div>
      <div className="-mx-6 px-6 sm:-mx-10 sm:px-10 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:overflow-visible">
        <div className="relative flex w-max gap-4 pb-2 md:w-auto md:grid md:grid-cols-4 md:gap-5 md:pb-0">
          {/* Årets led: streckad linje genom månadsnoderna. */}
          <span
            aria-hidden
            className="absolute left-0 right-0 top-[21px] border-t-2 border-dashed border-ink/20"
          />
          {SEASONS.map((p) => (
            <div
              key={p.title}
              className="relative w-[70vw] max-w-[270px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink"
            >
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
        Svep genom året →
      </p>
    </div>
  );
}
