import type { Review } from "@/lib/reviews";
import type { RecoStats } from "@/lib/reco-live";
import { delay, Stars } from "./shared";

/**
 * "Kunderna säger det bäst": omdömen från Reco i tre spalter med olika
 * höjd. Omdömena kureras i /admin/recensioner, betyg och antal hämtas live
 * från Reco.
 */
const MAX_REVIEWS = 9;

/**
 * Lägger de längsta omdömena en bit in i spalterna i stället för överst, så
 * att väggen får en jämnare rytm. Urvalet är detsamma, bara ordningen ändras.
 */
function arrange(list: Review[]): Review[] {
  if (list.length < 5) return list;
  const byLength = [...list].sort((a, b) => a.text.length - b.text.length);
  const longest = byLength.pop()!;
  const second = byLength.pop()!;
  const out = [...byLength];
  out.splice(1, 0, longest);
  out.splice(Math.min(5, out.length), 0, second);
  return out;
}

export function ReviewWall({ reviews, reco }: { reviews: Review[]; reco: RecoStats }) {
  const shown = arrange(reviews.slice(0, MAX_REVIEWS));
  return (
    <section className="bg-bone py-20 md:py-28">
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
              <span className="block font-mono text-[11.5px] uppercase tracking-[0.2em] text-ink/55">
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

        <ul className="mt-12 gap-5 [column-fill:_balance] sm:columns-2 md:mt-14 lg:columns-3">
          {shown.map((r, i) => (
            <li
              key={r.id}
              data-reveal
              style={delay((i % 3) * 90)}
              className="mb-5 break-inside-avoid rounded-[24px] bg-[#FFFDF8] p-6 ring-1 ring-ink/[0.07] transition duration-500 hover:-translate-y-1 hover:shadow-[0_26px_50px_-34px_rgba(20,22,42,0.55)]"
            >
              {r.rating ? <Stars rating={r.rating} className="text-[19px] text-amber-deep" /> : null}
              <blockquote className="mt-3.5 text-[16px] leading-[1.6] text-ink/85">”{r.text}”</blockquote>
              <footer className="mt-5 flex items-center justify-between gap-3 rounded-2xl px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60 ring-1 ring-inset ring-ink/10">
                <span>{r.author}</span>
                <span className="text-right">{r.place}</span>
              </footer>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-[15px] text-ink/60" data-reveal>
          <a
            href={reco.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo underline-offset-4 hover:underline"
          >
            Läs alla {reco.count} omdömen på Reco
          </a>
        </p>
      </div>
    </section>
  );
}
