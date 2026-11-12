import type { Review } from "@/lib/reviews";
import type { RecoStats } from "@/lib/reco-live";
import { delay, Stars } from "./shared";

/**
 * "Kunderna säger det bäst": omdömen från Reco i tre spalter med olika
 * höjd. Omdömena kureras i /admin/recensioner, betyg och antal hämtas live
 * från Reco.
 */
const MAX_REVIEWS = 9;
/** Längre omdömen än så här kortas till nio rader med en "Läs hela"-knapp. */
const CLAMP_FROM = 430;

/** På mobil är korten smalare, så där kortas omdömen redan från den här längden. */
const CLAMP_FROM_MOBILE = 250;

type Placed = { r: Review; order: number };

/**
 * Fördelar omdömena på tre spalter i den ordning de ligger i
 * /admin/recensioner: nästa omdöme hamnar i den spalt som är kortast. Med
 * fasta spalter (i stället för CSS-spalter som balanseras om) växer bara den
 * egna spalten när ett omdöme fälls ut, och inga kort byter plats.
 *
 * Långa omdömen läggs i de två första spalterna. På surfplatta ligger den
 * tredje spalten under de andra, uppdelad i två, och där ska inget kort
 * kunna växa.
 */
function toColumns(list: Review[]): Placed[][] {
  const cols: Placed[][] = [[], [], []];
  const height = [0, 0, 0];
  list.forEach((r, order) => {
    const long = r.text.length > CLAMP_FROM;
    // Ungefärlig korthöjd: synlig text plus stjärnor, namnrad och luft.
    const weight = Math.min(r.text.length, 330) + 185;
    const candidates = long ? [0, 1] : [0, 1, 2];
    const c = candidates.reduce((best, k) => (height[k] < height[best] ? k : best), candidates[0]);
    cols[c].push({ r, order });
    height[c] += weight;
  });
  return cols;
}

export function ReviewWall({ reviews, reco }: { reviews: Review[]; reco: RecoStats }) {
  const shown = reviews.slice(0, MAX_REVIEWS);
  const columns = toColumns(shown);
  return (
    <section className="bg-bone py-14 sm:py-20 md:py-28">
      <div className="container-edge">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <a
            href={reco.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-5 md:col-span-5"
            data-reveal
            data-reco-source={reco.live ? "live" : "fallback"}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/reco-badge-2026.svg"
              alt="Rekommenderat företag 2026 på Reco"
              width={92}
              height={92}
              loading="lazy"
              className="h-[92px] w-[92px] shrink-0 -rotate-6 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105"
            />
            <span>
              <span className="block font-mono text-[11.5px] uppercase tracking-[0.2em] text-ink/70">
                Omdömen via Reco
              </span>
              <span className="mt-1 block font-display text-[clamp(2.6rem,5vw,3.9rem)] font-medium leading-none tracking-[-0.04em]">
                {reco.average} av 5
              </span>
              <span className="mt-2 block text-[16px] text-ink/60">{reco.count} omdömen på Reco</span>
            </span>
          </a>
          <h2 className="lp-h2 md:col-span-7 md:text-right" data-reveal style={delay(100)}>
            Kunderna säger det bäst.
          </h2>
        </div>

        {/* Mobil: en svepbar rad i stället för nio kort på höjden. Alla
            omdömen finns i sidan; från 640 px visas de som en vägg. */}
        <p
          aria-hidden="true"
          className="mt-8 flex items-center justify-between font-mono text-[12px] uppercase tracking-[0.14em] text-ink/60 sm:hidden"
        >
          <span>
            {shown.length} av {reco.count} omdömen
          </span>
          <span>Svep →</span>
        </p>
        <div className="lp-snap mt-3 gap-3 max-sm:-mx-6 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:px-6 max-sm:pb-2 sm:mt-12 sm:grid sm:grid-cols-2 sm:items-start sm:gap-5 md:mt-14 lg:grid-cols-3">
          {columns.map((col, ci) => (
            // Mobil: listorna "löses upp" så att alla kort ligger i samma
            // svepbara rad, i ordningen från admin (order). Från 640 px är
            // varje lista en spalt; den tredje ligger under de andra på
            // surfplatta och bredvid dem från 1024 px.
            <ul
              key={ci}
              className={`max-sm:contents ${
                ci === 2 ? "sm:col-span-2 sm:columns-2 sm:gap-5 lg:col-span-1 lg:columns-1" : ""
              }`}
            >
              {col.map(({ r, order }) => {
                const long = r.text.length > CLAMP_FROM;
                const longMobile = !long && r.text.length > CLAMP_FROM_MOBILE;
                const clamp = long || longMobile;
                // Omdömen som bara kortas på mobil har ingen knapp från 640 px.
                const onlyMobile = longMobile ? "sm:!hidden" : "";
                return (
                  <li
                    key={r.id}
                    data-reveal
                    data-stagger
                    style={{ order }}
                    className="break-inside-avoid max-sm:w-[84%] max-sm:shrink-0 max-sm:snap-center sm:mb-5 sm:last:mb-0"
                  >
                    {/* Hover-lyftet ligger på ett inre element: skroll-animationen
                        äger transform på yttre elementet. Kortet är "relative" så
                        att den dolda kryssrutan stannar inne i kortet och inte
                        gör sidan bredare när korten ligger i en svepbar rad. */}
                    <div className="relative rounded-[20px] bg-[#FFFDF8] p-6 ring-1 ring-ink/[0.07] transition duration-500 hover:-translate-y-1 hover:shadow-[0_26px_50px_-34px_rgba(20,22,42,0.55)]">
                      {r.rating ? <Stars rating={r.rating} className="text-[19px] text-amber-deep" /> : null}
                      {/* Hela omdömet finns alltid i sidan. Kryssrutan (osynlig men
                          nåbar med tangentbord) tar bort radbegränsningen. */}
                      {clamp && (
                        <input
                          type="checkbox"
                          id={`omdome-${r.id}`}
                          className={`peer sr-only ${onlyMobile}`}
                          aria-label={`Läs hela omdömet från ${r.author}`}
                        />
                      )}
                      <blockquote
                        className={`mt-3.5 text-[16px] leading-[1.6] text-ink/85 ${
                          long
                            ? "line-clamp-[9] peer-checked:line-clamp-none"
                            : longMobile
                              ? "max-sm:line-clamp-[9] max-sm:peer-checked:line-clamp-none"
                              : ""
                        }`}
                      >
                        ”{r.text}”
                      </blockquote>
                      {clamp && (
                        <>
                          <label
                            htmlFor={`omdome-${r.id}`}
                            className={`-mb-2 mt-1 cursor-pointer py-2 text-[14.5px] font-medium text-indigo underline-offset-4 hover:underline peer-focus-visible:rounded peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-indigo inline-block peer-checked:hidden ${onlyMobile}`}
                          >
                            Läs hela omdömet
                          </label>
                          <label
                            htmlFor={`omdome-${r.id}`}
                            aria-hidden="true"
                            className={`-mb-2 mt-1 cursor-pointer py-2 text-[14.5px] font-medium text-indigo underline-offset-4 hover:underline peer-focus-visible:rounded peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-indigo hidden peer-checked:inline-block ${onlyMobile}`}
                          >
                            Visa mindre
                          </label>
                        </>
                      )}
                      {/* Mobil: fyller ut kortet så att namnraden hamnar i nederkant. */}
                      <div className="max-sm:grow" aria-hidden="true" />
                      <footer className="mt-5 flex items-center justify-between gap-3 rounded-[14px] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60 ring-1 ring-inset ring-ink/10 max-sm:flex-col max-sm:items-start max-sm:gap-0.5">
                        <span className="whitespace-nowrap">{r.author}</span>
                        <span className="text-right max-sm:text-left">{r.place}</span>
                      </footer>
                    </div>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>

        <p className="mt-4 text-[15px] text-ink/60 sm:mt-6" data-reveal>
          <a
            href={reco.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-2 font-medium text-indigo underline-offset-4 hover:underline"
          >
            Läs alla {reco.count} omdömen på Reco
          </a>
        </p>
      </div>
    </section>
  );
}
