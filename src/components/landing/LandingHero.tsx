import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { RecoStats } from "@/lib/reco-live";
import type { StartImage } from "@/lib/start-images";
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

export function LandingHero({ reco, image }: { reco: RecoStats; image: StartImage }) {
  return (
    <section
      data-hero
      className="relative -mt-20 flex min-h-[100svh] flex-col justify-end overflow-hidden bg-night text-white"
    >
      {/* Bilden täcker hela hjälten, även på mobil. En bild som fyller hela
          skärmen räknas som bakgrund, så sidans största element (LCP) blir
          rubriken och texten, som syns direkt. Kapa eller maska inte bilden:
          då blir den LCP-element och måste ritas om för varje bildruta. */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={image.src}
          alt=""
          fill
          priority
          fetchPriority="high"
          // På en stående mobilskärm beskärs den liggande bilden hårt och
          // förstoras, så där begärs en större fil för att hålla skärpan
          // (170vw håller mobilen under den allra största filen).
          sizes="(max-width: 767px) 170vw, 100vw"
          quality={82}
          // Standardbildens utsnitt är inpassat för hand; ett uppladdat foto centreras.
          className={`lp-kenburns object-cover ${image.uploaded ? "object-center" : "object-[55%_30%]"}`}
        />
        {/* En enda skuggning i neutral svart: mörk där texten står, öppen
            över huset och himlen så att bilden behåller sin värme. */}
        <div className="lp-hero-shade absolute inset-0" />
      </div>

      <div className="container-edge relative z-10 pb-8 pt-[6.5rem] sm:pb-10 sm:pt-36 md:pb-14 lg:pb-20">
        <div className="grid gap-6 sm:gap-9 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,0.95fr)] xl:items-end xl:gap-12">
          <div>
            <h1>
              {/* Sökordsraden ligger i h1 som en liten etikett ovanför rubriken. */}
              <span className="lp-eyebrow lp-rise text-white/85" style={delay(80)}>
                Solna · Solceller, batteri, värmepump och laddbox i Stockholm
              </span>{" "}
              {/* Från 640 px är raderna egna block som glider upp bakom sin
                  kant. På smalare skärm flödar texten fritt och stiger som
                  resten av hjälten. */}
              <span className="lp-h1 lp-headline mt-4 block sm:mt-5" style={delay(160)}>
                <span className="lp-line">
                  <span style={delay(160)}>Ditt hus kan göra </span>
                </span>
                <span className="lp-line">
                  <span style={delay(250)}>
                    mer än att <span className="text-sun">köpa el.</span>
                  </span>
                </span>
              </span>
            </h1>
            <p className="lp-lede lp-rise mt-4 max-w-[46rem] text-white/85 sm:mt-6" style={delay(280)}>
              Vi mäter din förbrukning först och dimensionerar sedan sol, batteri och laddbox efter hur
              ni bor. Fast pris, grönt avdrag direkt på fakturan och samma kontaktperson från hembesök
              till uppföljning.
            </p>
            {/* Mobil: betyget står före knapparna, så att det syns på första
                skärmen. Från 640 px står det i rutan till höger. */}
            <a
              href={reco.url}
              target="_blank"
              rel="noopener noreferrer"
              className="lp-rise mt-5 flex items-center gap-2.5 text-[14.5px] text-white/90 sm:hidden"
              style={delay(340)}
            >
              <Stars decorative className="text-[15px] text-sun" />
              <span>
                <strong className="font-medium text-white">{reco.average} av 5</strong> på Reco ·{" "}
                {reco.count} omdömen
              </span>
            </a>
            <div className="lp-rise mt-5 flex flex-wrap gap-3 sm:mt-8" style={delay(400)}>
              <Link href="/offert" className="lp-btn-sun">
                Boka kostnadsfritt hembesök <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/kalkylator" className="lp-btn-glass">
                Räkna på ditt hus
              </Link>
            </div>
          </div>

          <aside
            className="lp-slide-left rounded-3xl border border-white/25 bg-white/[0.12] p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-lg backdrop-saturate-150 sm:p-6 md:max-w-[46rem] xl:max-w-none"
            style={delay(520)}
            aria-label="Omdömen och villkor i korthet"
          >
            <a
              href={reco.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 max-sm:hidden"
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
                <Stars decorative className="text-[18px] text-sun" />
                <span className="mt-1 block text-[16.5px] text-white/90">
                  <strong className="font-medium text-white">{reco.average} av 5</strong> på Reco,{" "}
                  {reco.count} omdömen
                </span>
              </span>
            </a>
            <dl className="grid grid-cols-2 gap-2.5 sm:mt-5 md:grid-cols-4 xl:grid-cols-2">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="lp-pop flex flex-col-reverse justify-end rounded-[14px] bg-white/10 px-4 py-3.5 transition-colors duration-300 hover:bg-white/[0.17]"
                  style={delay(700 + i * 90)}
                >
                  <dt className="mt-1 text-[13px] leading-snug text-white/85 xl:whitespace-nowrap">{s.label}</dt>
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
