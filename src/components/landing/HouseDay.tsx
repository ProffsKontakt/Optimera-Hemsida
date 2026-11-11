"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { delay, SectionHead } from "./shared";

/**
 * "Husets dygn": välj en tid och se vad anläggningen gör just då.
 *
 * Sektionen växlar själv mellan lägena tills besökaren klickar på en tid.
 * Den står still när den inte syns i bild och för besökare som valt
 * reducerad rörelse. Varje läge har sin egen bild, och bilderna tonar över
 * i varandra.
 */
type DayState = {
  tab: string;
  big: string;
  sub: string;
  /** Timme som markeras i spotprisdiagrammet (null = hela dygnet). */
  hour: number | null;
  /** Bild för läget. Bilderna tonar över i varandra när läget byts. */
  img: string;
  alt: string;
  /** Ruta: namn, vad den gör just nu, och om den är aktiv (gul) eller vilar. */
  tiles: [string, string, boolean][];
  title: string;
  body: string;
};

const STATES: DayState[] = [
  {
    tab: "02:00",
    big: "02:00",
    sub: "Natt",
    hour: 2,
    img: "/kb/guide-laddbox.jpg",
    alt: "Elbil som laddar utanför ett rött hus i skymningen",
    tiles: [
      ["Solpaneler", "Vilar", false],
      ["Batteri", "Laddar billigt", true],
      ["Huset", "Går på nätet", false],
      ["Elbilen", "Laddar", true],
    ],
    title: "Natten är billigast",
    body: "På natten är elen oftast som billigast. Då laddas bilen, och batteriet fylls på inför morgonens dyrare timmar.",
  },
  {
    tab: "07:00",
    big: "07:00",
    sub: "Morgon",
    hour: 7,
    img: "/kb/guide-ekonomi.jpg",
    alt: "Gult hus i lågt morgonljus",
    tiles: [
      ["Solpaneler", "Vaknar", false],
      ["Batteri", "Driver huset", true],
      ["Huset", "Går på batteri", true],
      ["Elbilen", "Fulladdad", false],
    ],
    title: "Morgontoppen tas ur batteriet",
    body: "När alla vaknar samtidigt stiger elpriset. Huset går då på det batteriet laddade under natten i stället för dyr el från nätet.",
  },
  {
    tab: "12:00",
    big: "12:00",
    sub: "Dag",
    hour: 12,
    img: "/kb/sol-produktion-och-teknik.jpg",
    alt: "Solpaneler under en ljus himmel",
    tiles: [
      ["Solpaneler", "Full produktion", true],
      ["Batteri", "Fylls av solen", true],
      ["Huset", "Går på egen sol", true],
      ["Elbilen", "Solöverskott", true],
    ],
    title: "Taket producerar",
    body: "Solelen går först till huset, sedan till batteriet. Överskottet säljs, eller laddar bilen på ditt eget solöverskott.",
  },
  {
    tab: "18:00",
    big: "18:00",
    sub: "Kväll",
    hour: 18,
    img: "/kb/bat-elnat.jpg",
    alt: "Kraftledningar mot kvällshimlen över en sjö",
    tiles: [
      ["Solpaneler", "Ger lite", false],
      ["Batteri", "Driver huset", true],
      ["Huset", "Går på sparad sol", true],
      ["Elbilen", "Väntar på natten", false],
    ],
    title: "Kvällen går på sparad sol",
    body: "När solen går ner och elen är som dyrast använder huset det batteriet sparade under dagen.",
  },
  {
    tab: "24/7",
    big: "24/7",
    sub: "Dygnet runt",
    hour: null,
    img: "/kb/guide-gront-avdrag.jpg",
    alt: "Batteri och växelriktare monterade i ett ljust garage",
    tiles: [
      ["Solpaneler", "Följs i appen", true],
      ["Batteri", "Prisstyrs", true],
      ["Huset", "Optimeras", true],
      ["Elbilen", "Schemaläggs", true],
    ],
    title: "Smart styrning hela tiden",
    body: "Styrningen följer förbrukningen och spotpriset timme för timme. När nätet behöver det kan batteriet också sälja stödtjänster.",
  },
];

// Ett exempel på hur spotpriset brukar röra sig över dygnet: lågt på natten,
// en topp på morgonen och en högre topp på kvällen. Staplarna är relativa
// och visar formen, inte faktiska priser.
const PRICE_SHAPE = [
  22, 20, 18, 17, 17, 21, 34, 50, 58, 47, 38, 31, 27, 25, 27, 33, 44, 58, 70, 62, 49, 38, 30, 25,
];

// Varje läge har rubrik, två rader text och fyra rutor: det tar en stund att läsa.
const STEP_MS = 7000;

export function HouseDay() {
  const [active, setActive] = useState(2);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  // Pekaren vilar över sektionen: växlingen (och förloppslinjen) pausas.
  const [hover, setHover] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Bilder som hunnit behövas. Startbilden laddas direkt; övriga monteras
  // när deras läge visas (och nästa läge i förväg), så att sektionen inte
  // hämtar fem bilder på en gång.
  const [seen, setSeen] = useState<number[]>([2]);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setSeen((cur) => {
      const next = new Set(cur);
      next.add(active);
      if (inView) next.add((active + 1) % STATES.length);
      return next.size === cur.length ? cur : [...next];
    });
  }, [active, inView]);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Växlingen drivs av förloppslinjens CSS-animation (onAnimationEnd längre
  // ner), inte av en egen timer. Då kan linjen och växlingen aldrig gå i
  // otakt, och allt som pausar linjen (pekaren över sektionen, "minska
  // rörelse") pausar också växlingen.
  const next = () => setActive((i) => (i + 1) % STATES.length);

  /** Piltangenter, Home och End flyttar mellan tiderna, som i en flikrad. */
  const onTabKey = (e: React.KeyboardEvent) => {
    const n = STATES.length;
    const to =
      e.key === "ArrowRight"
        ? (active + 1) % n
        : e.key === "ArrowLeft"
          ? (active - 1 + n) % n
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? n - 1
              : -1;
    if (to < 0) return;
    e.preventDefault();
    setActive(to);
    setAuto(false);
    tabRefs.current[to]?.focus();
  };

  const s = STATES[active];

  return (
    <section
      ref={ref}
      className="lp-night bg-night py-14 text-white sm:py-20 md:py-28"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <div className="container-edge">
        <SectionHead
          tone="dark"
          eyebrow="Husets dygn"
          title={
            <>
              Sol, batteri och laddbox. <span className="text-sun">Ett system</span> som jobbar dygnet
              runt.
            </>
          }
          lede="Välj en tid på dygnet och se vad anläggningen gör just då. Batteriet är hjärnan: det sparar solen till kvällen och köper el när den är billig. Laddboxen laddar bilen på nattens lägsta priser."
        />

        <div className="mt-8 grid gap-5 sm:mt-12 md:mt-16 md:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          {/* Bild per läge med tid och fyra lägesrutor */}
          <div data-reveal="left" className="lg:h-full">
            <div className="relative aspect-square overflow-hidden rounded-[30px] bg-night-soft ring-1 ring-white/10 sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[520px]">
              {STATES.map(
                (st, i) =>
                  seen.includes(i) && (
                    <Image
                      key={st.img}
                      src={st.img}
                      alt={i === active ? st.alt : ""}
                      aria-hidden={i !== active}
                      fill
                      sizes="(min-width: 1024px) 46vw, 92vw"
                      quality={68}
                      className={`object-cover transition-opacity duration-[900ms] ease-out motion-reduce:transition-none ${
                        i === active ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ),
              )}
              <div
                className="absolute inset-0 bg-gradient-to-b from-night/55 via-transparent to-night/70"
                aria-hidden="true"
              />

              <div className="absolute left-5 top-4 md:left-7 md:top-6">
                <div
                  key={`t-${active}`}
                  className="lp-swap font-mono text-[46px] leading-none tracking-[-0.04em] tabular-nums [text-shadow:0_2px_24px_rgba(20,22,42,0.6)] md:text-[62px]"
                >
                  {s.big}
                </div>
                <div
                  key={`s-${active}`}
                  className="lp-swap mt-2 inline-block rounded-full bg-night/55 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur-sm"
                >
                  {s.sub}
                </div>
              </div>

              {/* Rutorna ligger kvar när läget byts. Bara texten och färgen
                  ändras: gul ruta arbetar, ljus ruta vilar. */}
              <ul className="absolute inset-x-3 bottom-3 grid grid-cols-2 gap-2 sm:grid-cols-4 md:inset-x-5 md:bottom-5 lg:grid-cols-2 xl:grid-cols-4">
                {s.tiles.map(([k, v, on]) => (
                  <li
                    key={k}
                    className={`rounded-[14px] px-3.5 py-3 text-ink shadow-lg shadow-black/20 transition-colors duration-500 ${
                      on ? "bg-sun" : "bg-[#FAF8F2]/90"
                    }`}
                  >
                    <div className="text-[13.5px] font-medium leading-tight">{k}</div>
                    <div key={v} className="lp-swap mt-1 text-[13px] leading-tight text-ink/75">
                      {v}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tidsval, förklaring och spotprisexempel */}
          <div data-reveal="right" style={delay(100)} className="flex flex-col">
            {/* Tangentbordsfokus i flikraden stoppar den automatiska växlingen. */}
            <div
              role="tablist"
              aria-label="Tid på dygnet"
              className="lp-dygn-tabs relative grid grid-cols-5 gap-2"
              onKeyDown={onTabKey}
              onFocus={() => setAuto(false)}
            >
              {/* Gul markering som glider till vald tid. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-[calc((100%-2rem)/5)] rounded-[14px] bg-sun shadow-[0_10px_30px_-12px_rgba(255,221,108,0.8)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{ transform: `translate3d(calc(${active} * (100% + 0.5rem)), 0, 0)` }}
              />
              {STATES.map((st, i) => {
                const on = i === active;
                return (
                  <button
                    key={st.tab}
                    type="button"
                    role="tab"
                    id={`dygn-flik-${i}`}
                    aria-controls="dygn-panel"
                    aria-selected={on}
                    tabIndex={on ? 0 : -1}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    onClick={() => {
                      setActive(i);
                      setAuto(false);
                    }}
                    className={`relative z-10 min-h-[44px] rounded-[14px] px-1 py-3.5 font-mono text-[13px] tracking-[0.06em] transition-colors duration-300 sm:text-[14px] ${
                      on
                        ? "text-ink"
                        : "text-white/85 ring-1 ring-inset ring-white/20 hover:bg-white/10 hover:ring-white/40"
                    }`}
                  >
                    {st.tab}
                  </button>
                );
              })}
            </div>

            {/* Förloppslinje: fylls medan sektionen växlar själv. */}
            <div className="lp-dygn-tabs mt-4 h-[5px] overflow-hidden rounded-full bg-white/10 md:mt-6">
              {auto && inView ? (
                <div
                  key={`p-${active}`}
                  className={`lp-progress h-full rounded-full bg-gradient-to-r from-indigo to-sun ${
                    hover ? "lp-progress-paused" : ""
                  }`}
                  style={{ "--dur": `${STEP_MS}ms` } as React.CSSProperties}
                  onAnimationEnd={next}
                />
              ) : (
                <div className="h-full rounded-full bg-gradient-to-r from-indigo to-sun" />
              )}
            </div>

            {/* Alla fem lägen ligger i samma ruta, så att höjden styrs av den
                längsta texten och sidan inte hoppar när läget byts. */}
            <div
              role="tabpanel"
              id="dygn-panel"
              aria-labelledby={`dygn-flik-${active}`}
              className="lp-dygn-panels mt-5 grid md:mt-8"
              aria-live={auto ? "off" : "polite"}
            >
              {STATES.map((st, i) => (
                <div
                  key={st.tab}
                  aria-hidden={i !== active}
                  // Den gamla texten tonar ut fort och den nya väntar in det,
                  // så att två texter aldrig syns ovanpå varandra.
                  className={`lp-dygn-panel col-start-1 row-start-1 transition-[opacity,transform] ease-out motion-reduce:transition-none ${
                    i === active
                      ? "opacity-100 delay-150 duration-500"
                      : "pointer-events-none translate-y-2 opacity-0 duration-150"
                  }`}
                >
                  {/* Syns bara utan JavaScript, då alla lägen visas under
                      varandra (se globals.css, .lp-dygn-nojs). */}
                  <div className="lp-dygn-nojs mb-2 hidden font-mono text-[12px] uppercase tracking-[0.16em] text-sun">
                    {st.hour === null ? st.sub : `Klockan ${st.tab}`}
                  </div>
                  <h3 className="font-display text-[1.75rem] font-medium leading-tight tracking-[-0.02em] text-white">
                    {st.title}
                  </h3>
                  <p className="mt-3 text-[17px] leading-relaxed text-white/75">{st.body}</p>
                  {/* Lägesrutornas text finns här för alla fem lägen, så att
                      den står i sidans HTML även för de lägen som inte visas
                      i bilden just nu. */}
                  <ul className="lp-dygn-nojs mt-3 hidden text-[15px] leading-relaxed text-white/70">
                    {st.tiles.map(([k, v]) => (
                      <li key={k}>
                        {k}: {v}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 lg:mt-auto lg:pt-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
                Spotpris över dygnet, exempel
              </div>
              <div className="mt-4 flex h-[86px] items-end gap-[3px]" aria-hidden="true">
                {PRICE_SHAPE.map((v, h) => {
                  const on = s.hour === null || Math.abs(h - s.hour) <= 0;
                  const near = s.hour !== null && Math.abs(h - s.hour) === 1;
                  return (
                    <span
                      key={h}
                      className={`lp-bar block flex-1 rounded-[4px] ${s.hour === null && inView ? "lp-bar-sweep" : ""}`}
                      style={
                        {
                          height: `${v}%`,
                          "--i": h,
                          backgroundColor:
                            s.hour === null
                              ? undefined
                              : on
                                ? "#FFDD6C"
                                : near
                                  ? "rgba(255,221,108,0.45)"
                                  : "rgba(255,255,255,0.17)",
                        } as React.CSSProperties
                      }
                    />
                  );
                })}
              </div>
              <div className="mt-2 flex justify-between font-mono text-[11.5px] text-white/60" aria-hidden="true">
                <span>00</span>
                <span>06</span>
                <span>12</span>
                <span>18</span>
                <span>24</span>
              </div>
            </div>

            <p className="mt-7 text-[14px] leading-relaxed text-white/60">
              Det mesta av lönsamheten kommer från prisstyrning och egen användning av solelen.
              Stödtjänster kan ge lite extra, men nivåerna har sjunkit och varierar med marknaden.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
