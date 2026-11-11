"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { delay, SectionHead } from "./shared";

/**
 * "Husets dygn": välj en tid och se vad anläggningen gör just då.
 *
 * Sektionen växlar själv mellan lägena tills besökaren klickar på en tid.
 * Den står still när den inte syns i bild och för besökare som valt
 * reducerad rörelse.
 */
type DayState = {
  tab: string;
  big: string;
  sub: string;
  /** Timme som markeras i spotprisdiagrammet (null = hela dygnet). */
  hour: number | null;
  /** Färgton som läggs över bilden för att antyda tid på dygnet. */
  tint: string;
  tiles: [string, string][];
  title: string;
  body: string;
};

const STATES: DayState[] = [
  {
    tab: "02:00",
    big: "02:00",
    sub: "Natt",
    hour: 2,
    tint: "rgba(9, 13, 46, 0.62)",
    tiles: [
      ["Solpaneler", "Vilar"],
      ["Batteri", "Laddar billigt"],
      ["Huset", "Går på nätet"],
      ["Elbilen", "Laddar"],
    ],
    title: "Natten är billigast",
    body: "På natten är elen oftast som billigast. Då laddas bilen, och batteriet fylls på inför morgonens dyrare timmar.",
  },
  {
    tab: "07:00",
    big: "07:00",
    sub: "Morgon",
    hour: 7,
    tint: "rgba(255, 176, 96, 0.2)",
    tiles: [
      ["Solpaneler", "Vaknar"],
      ["Batteri", "Driver huset"],
      ["Huset", "Går på batteri"],
      ["Elbilen", "Fulladdad"],
    ],
    title: "Morgontoppen tas ur batteriet",
    body: "När alla vaknar samtidigt stiger elpriset. Huset går då på det batteriet laddade under natten i stället för dyr el från nätet.",
  },
  {
    tab: "12:00",
    big: "12:00",
    sub: "Dag",
    hour: 12,
    tint: "rgba(255, 255, 255, 0)",
    tiles: [
      ["Solpaneler", "Full produktion"],
      ["Batteri", "Fylls av solen"],
      ["Huset", "Går på egen sol"],
      ["Elbilen", "Solöverskott"],
    ],
    title: "Taket producerar",
    body: "Solelen går först till huset, sedan till batteriet. Överskottet säljs, eller laddar bilen på ditt eget solöverskott.",
  },
  {
    tab: "18:00",
    big: "18:00",
    sub: "Kväll",
    hour: 18,
    tint: "rgba(214, 92, 30, 0.26)",
    tiles: [
      ["Solpaneler", "Ger lite"],
      ["Batteri", "Driver huset"],
      ["Huset", "Går på sparad sol"],
      ["Elbilen", "Väntar på natten"],
    ],
    title: "Kvällen går på sparad sol",
    body: "När solen går ner och elen är som dyrast använder huset det batteriet sparade under dagen.",
  },
  {
    tab: "24/7",
    big: "24/7",
    sub: "Dygnet runt",
    hour: null,
    tint: "rgba(255, 255, 255, 0)",
    tiles: [
      ["Solpaneler", "Följs i appen"],
      ["Batteri", "Prisstyrs"],
      ["Huset", "Optimeras"],
      ["Elbilen", "Schemaläggs"],
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

const STEP_MS = 5200;

export function HouseDay() {
  const [active, setActive] = useState(2);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % STATES.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [auto, inView]);

  const s = STATES[active];

  return (
    <section ref={ref} className="bg-night py-20 text-white md:py-28">
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
          lede="Välj en tid på dygnet och se vad anläggningen gör just då. Batteriet är hjärnan: det sparar solen till kvällen, köper el när den är billig och laddar bilen på nattens lägsta priser."
        />

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-2 lg:gap-16">
          {/* Bild med tid, färgton och fyra lägesrutor */}
          <div data-reveal="left">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] bg-night-soft ring-1 ring-white/10">
              <Image
                src="/kb/guide-gront-avdrag.jpg"
                alt="Batteri och växelriktare monterade i ett ljust garage"
                fill
                sizes="(min-width: 1024px) 46vw, 92vw"
                quality={70}
                className="object-cover"
              />
              <div
                className="absolute inset-0 transition-[background-color] duration-1000 ease-out"
                style={{ backgroundColor: s.tint, mixBlendMode: s.hour === 2 ? "multiply" : "soft-light" }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-night/45 via-transparent to-night/55" aria-hidden="true" />

              <div key={`t-${active}`} className="lp-pop absolute left-5 top-4 md:left-7 md:top-6">
                <div className="font-display text-[54px] font-medium leading-none tracking-[-0.04em] [text-shadow:0_2px_24px_rgba(20,22,42,0.55)] md:text-[68px]">
                  {s.big}
                </div>
                <div className="mt-2 inline-block rounded-full bg-night/55 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                  {s.sub}
                </div>
              </div>

              <ul className="absolute inset-x-3 bottom-3 grid grid-cols-2 gap-2 sm:grid-cols-4 md:inset-x-5 md:bottom-5">
                {s.tiles.map(([k, v], i) => (
                  <li
                    key={`${active}-${k}`}
                    className="lp-pop rounded-2xl bg-sun px-3.5 py-3 text-ink shadow-lg shadow-black/20"
                    style={delay(i * 70)}
                  >
                    <div className="text-[13.5px] font-semibold leading-tight">{k}</div>
                    <div className="mt-1 text-[13px] leading-tight text-ink/75">{v}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tidsval, förklaring och spotprisexempel */}
          <div data-reveal="right" style={delay(100)}>
            <div role="tablist" aria-label="Tid på dygnet" className="grid grid-cols-5 gap-2">
              {STATES.map((st, i) => {
                const on = i === active;
                return (
                  <button
                    key={st.tab}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => {
                      setActive(i);
                      setAuto(false);
                    }}
                    className={`rounded-2xl px-1 py-3.5 font-mono text-[13px] tracking-[0.06em] transition duration-300 sm:text-[14px] ${
                      on
                        ? "bg-sun text-ink shadow-[0_10px_30px_-12px_rgba(255,221,108,0.8)]"
                        : "bg-white/[0.03] text-white/85 ring-1 ring-inset ring-white/20 hover:bg-white/10 hover:ring-white/40"
                    }`}
                  >
                    {st.tab}
                  </button>
                );
              })}
            </div>

            {/* Förloppslinje: fylls medan sektionen växlar själv. */}
            <div className="mt-6 h-[5px] overflow-hidden rounded-full bg-white/10">
              {auto && inView ? (
                <div
                  key={`p-${active}`}
                  className="lp-progress h-full rounded-full bg-gradient-to-r from-indigo to-sun"
                  style={{ "--dur": `${STEP_MS}ms` } as React.CSSProperties}
                />
              ) : (
                <div className="h-full rounded-full bg-gradient-to-r from-indigo to-sun" />
              )}
            </div>

            {/* Alla fem lägen ligger i samma ruta, så att höjden styrs av den
                längsta texten och sidan inte hoppar när läget byts. */}
            <div className="mt-8 grid" aria-live={auto ? "off" : "polite"}>
              {STATES.map((st, i) => (
                <div
                  key={st.tab}
                  aria-hidden={i !== active}
                  className={`col-start-1 row-start-1 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
                    i === active ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
                  }`}
                >
                  <h3 className="font-display text-[1.75rem] font-medium leading-tight tracking-[-0.02em] text-white">
                    {st.title}
                  </h3>
                  <p className="mt-3 text-[17px] leading-relaxed text-white/75">{st.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
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
                      className={`lp-bar block flex-1 rounded-[4px] ${s.hour === null ? "lp-bar-sweep" : ""}`}
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
              <div className="mt-2 flex justify-between font-mono text-[10.5px] text-white/45" aria-hidden="true">
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
