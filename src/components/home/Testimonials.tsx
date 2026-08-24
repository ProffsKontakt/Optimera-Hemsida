export type TestimonialItem = {
  id: string;
  author: string;
  place: string;
  text: string;
  rating?: number;
};

/**
 * Recensionskorten som en långsam marquee som driver åt höger (60s/varv).
 * Innehållet kureras i /admin/recensioner (Reco) och skickas in server-side.
 *
 * Tekniken: tre kopior av kortraden i ett flex-track som translateX:as
 * exakt en kopias bredd -> sömlös loop oavsett skärmbredd. Pausar vid
 * hover/fokus (CSS i globals: .marquee-right) och stängs av helt vid
 * prefers-reduced-motion. Dubblett-kopiorna är aria-hidden så skärmläsare
 * bara läser recensionerna en gång.
 */
export function Testimonials({ reviews }: { reviews: TestimonialItem[] }) {
  if (reviews.length === 0) return null;
  const copies = [0, 1, 2];
  return (
    <div className="overflow-hidden -mx-6 sm:-mx-10 lg:-mx-16 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className="marquee-right flex w-max">
        {copies.map((c) => (
          <div key={c} aria-hidden={c > 0} className="flex gap-4 md:gap-5 pr-4 md:pr-5">
            {reviews.map((q) => (
              <figure
                key={`${c}-${q.id}`}
                className="w-[82vw] max-w-[340px] md:w-[400px] md:max-w-none shrink-0 rounded-3xl border border-ink/10 bg-cream/70 p-7 md:p-8 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="font-display text-5xl text-indigo leading-none">"</div>
                  {q.rating ? (
                    <span
                      className="text-sun text-[15px] tracking-[0.1em] pt-1"
                      aria-label={`${q.rating} av 5 stjärnor`}
                    >
                      {"★".repeat(q.rating)}
                      <span className="text-ink/15">{"★".repeat(5 - q.rating)}</span>
                    </span>
                  ) : null}
                </div>
                <blockquote className="mt-2 font-display text-[20px] tracking-display-tight leading-snug">
                  {q.text}
                </blockquote>
                <figcaption className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between gap-3 text-[13px]">
                  <span className="font-medium">{q.author}</span>
                  <span className="text-ink/55 font-mono text-[11px] uppercase tracking-[0.16em] text-right">
                    {q.place}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
