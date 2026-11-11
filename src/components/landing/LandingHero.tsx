import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { RecoStats } from "@/lib/reco-live";
import { delay, Stars } from "./shared";

/**
 * Startsidans hjälte: helbild som går ända upp bakom menyn, rubrik och
 * knappar nere till vänster och en förtroenderuta till höger.
 *
 * Animationerna är ren CSS och startar direkt vid laddning. Bilden tonas
 * inte in (den är sidans största element och ska synas så fort den laddat),
 * den zoomas bara långsamt.
 */
const STATS = [
  { n: "0 kr", label: "för hembesök och offert" },
  { n: "14 dagar", label: "från offert till tak" },
  { n: "48,5 %", label: "grönt avdrag på batteri" },
  { n: "25 år", label: "garanti som följer huset" },
];

export function LandingHero({ reco }: { reco: RecoStats }) {
  return (
    <section className="relative -mt-20 flex min-h-[100svh] flex-col justify-end overflow-hidden bg-night text-white">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/kb/sol-batteri-elbil-och-varmepump.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={70}
          className="lp-kenburns object-cover object-[64%_center]"
        />
        {/* Mörkare nertill och till vänster så att texten alltid går att läsa. */}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-night/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/80 via-night/25 to-transparent" />
      </div>

      <div className="container-edge relative z-10 pb-10 pt-36 md:pb-14 lg:pb-16">
        <div className="grid gap-9 xl:grid-cols-12 xl:items-end xl:gap-8">
          <div className="xl:col-span-8">
            <h1>
              {/* Sökordsraden ligger i h1 som en liten etikett ovanför rubriken. */}
              <span className="lp-eyebrow lp-rise text-white/85" style={delay(80)}>
                Solna · Solceller, batteri, värmepump, laddbox
              </span>
              <span className="lp-h1 lp-rise mt-5 block" style={delay(160)}>
                Ditt hus kan göra <br className="hidden sm:block" />
                mer än att <span className="text-sun">köpa el.</span>
              </span>
            </h1>
            <p className="lp-lede lp-rise mt-6 max-w-[46rem] text-white/85" style={delay(280)}>
              Vi mäter din förbrukning först och dimensionerar sedan sol, batteri och laddbox efter hur
              ni bor. Fast pris, grönt avdrag direkt på fakturan och en fast kontaktperson från hembesök
              till uppföljning.
            </p>
            <div className="lp-rise mt-8 flex flex-wrap gap-3" style={delay(400)}>
              <Link href="/offert" className="lp-btn-sun">
                Boka kostnadsfritt hembesök <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/kalkylator" className="lp-btn-glass">
                Räkna på ditt hus
              </Link>
            </div>
          </div>

          <aside
            className="lp-slide-left rounded-[28px] border border-white/20 bg-white/[0.11] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6 md:max-w-[46rem] xl:col-span-4 xl:max-w-none"
            style={delay(520)}
            aria-label="Omdömen och villkor i korthet"
          >
            <a
              href={reco.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4"
              data-reco-source={reco.live ? "live" : "fallback"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/reco-badge-2026.svg"
                alt="Rekommenderat företag 2026 på Reco"
                width={66}
                height={66}
                className="h-[66px] w-[66px] shrink-0 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105"
              />
              <span>
                <Stars className="text-[18px] text-sun" />
                <span className="mt-1 block text-[16.5px] text-white/90">
                  <strong className="font-semibold text-white">{reco.average} av 5</strong> på Reco,{" "}
                  {reco.count} omdömen
                </span>
              </span>
            </a>
            <dl className="mt-5 grid grid-cols-2 gap-2.5 md:grid-cols-4 xl:grid-cols-2">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="lp-pop flex flex-col-reverse justify-end rounded-2xl bg-white/[0.09] px-4 py-3.5 ring-1 ring-inset ring-white/10 transition-colors duration-300 hover:bg-white/[0.16]"
                  style={delay(700 + i * 90)}
                >
                  <dt className="mt-1 text-[12.5px] leading-snug text-white/70">{s.label}</dt>
                  <dd className="font-display text-[23px] font-medium leading-tight tracking-[-0.02em]">
                    {s.n}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
