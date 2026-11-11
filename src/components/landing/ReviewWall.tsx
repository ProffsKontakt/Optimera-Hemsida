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

/**
 * Lägger de längsta omdömena en bit in i spalterna i stället för överst, så
 * att väggen får en jämnare rytm. Urvalet och den kurerade ordningen från
 * admin är desamma; bara de två längsta flyttas.
 */
function arrange(list: Review[]): Review[] {
  if (list.length < 5) return list;
  const [longest, second] = [...list].sort((a, b) => b.text.length - a.text.length);
  // Ordningen från /admin/recensioner behålls för alla utom de två längsta.
  const out = list.filter((r) => r !== longest && r !== second);
  out.splice(1, 0, longest);
  out.splice(Math.min(5, out.length), 0, second);
  return out;
}

export function ReviewWall({ reviews, reco }: { reviews: Review[]; reco: RecoStats }) {
  const shown = arrange(reviews.slice(0, MAX_REVIEWS));
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
        <ul className="lp-snap mt-3 gap-3 [column-fill:_balance] max-sm:-mx-6 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:items-start max-sm:overflow-x-auto max-sm:px-6 max-sm:pb-2 sm:mt-12 sm:columns-2 sm:gap-5 md:mt-14 lg:columns-3">
          {shown.map((r) => {
            const long = r.text.length > CLAMP_FROM;
            return (
            <li key={r.id} data-reveal data-stagger className="break-inside-avoid max-sm:w-[84%] max-sm:shrink-0 max-sm:snap-center sm:mb-5">
              {/* Hover-lyftet ligger på ett inre element: skroll-animationen
                  äger transform på yttre elementet. */}
              <div className="relative rounded-[20px] bg-[#FFFDF8] p-6 ring-1 ring-ink/[0.07] transition duration-500 hover:-translate-y-1 hover:shadow-[0_26px_50px_-34px_rgba(20,22,42,0.55)]">
              {r.rating ? <Stars rating={r.rating} className="text-[19px] text-amber-deep" /> : null}
              {/* Hela omdömet finns alltid i sidan. Kryssrutan (osynlig men
                  nåbar med tangentbord) tar bort radbegränsningen. Kortet är
                  "relative" så att den dolda rutan stannar inne i kortet och
                  inte gör sidan bredare när korten ligger i en svepbar rad. */}
              {long && <input type="checkbox" id={`omdome-${r.id}`} className="peer sr-only" />}
              <blockquote
                className={`mt-3.5 text-[16px] leading-[1.6] text-ink/85 ${
                  long ? "line-clamp-[9] peer-checked:line-clamp-none" : ""
                }`}
              >
                ”{r.text}”
              </blockquote>
              {long && (
                <label
                  htmlFor={`omdome-${r.id}`}
                  className="-mb-2 mt-1 inline-block cursor-pointer py-2 text-[14.5px] font-medium text-indigo underline-offset-4 hover:underline peer-checked:hidden peer-focus-visible:rounded peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-indigo"
                >
                  Läs hela omdömet
                </label>
              )}
              <footer className="mt-5 flex items-center justify-between gap-3 rounded-[14px] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60 ring-1 ring-inset ring-ink/10">
                <span>{r.author}</span>
                <span className="text-right">{r.place}</span>
              </footer>
              </div>
            </li>
            );
          })}
        </ul>

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
