"use client";

import { motion } from "framer-motion";

export type TestimonialItem = {
  id: string;
  author: string;
  place: string;
  text: string;
  rating?: number;
};

/**
 * Recensionskort. Innehållet kureras i /admin/recensioner (Reco-recensioner)
 * och skickas in server-side från sidan.
 */
export function Testimonials({ reviews }: { reviews: TestimonialItem[] }) {
  if (reviews.length === 0) return null;
  return (
    <div>
      {/* Mobil: horisontell svep-karusell (scroll-snap, kant-till-kant med
          "peek" av nästa kort så svepbarheten syns). Negativa marginaler
          matchar container-edge (px-6/sm:px-10). Desktop: 3-kolumns-grid
          som förut. */}
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto -mx-6 px-6 sm:-mx-10 sm:px-10 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
      {reviews.map((q, i) => (
        <motion.figure
          key={q.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: i * 0.08 }}
          className="w-[82vw] max-w-[340px] shrink-0 snap-center rounded-3xl border border-ink/10 bg-cream/70 p-7 md:p-8 flex flex-col md:w-auto md:max-w-none md:shrink"
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
        </motion.figure>
      ))}
      </div>
      {/* Svep-hint – bara mobil, och bara när det finns fler än ett kort. */}
      {reviews.length > 1 && (
        <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/40 md:hidden">
          Svep för fler recensioner →
        </p>
      )}
    </div>
  );
}
