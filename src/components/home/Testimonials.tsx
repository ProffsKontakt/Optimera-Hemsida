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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {reviews.map((q, i) => (
        <motion.figure
          key={q.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: i * 0.08 }}
          className="rounded-3xl border border-ink/10 bg-cream/70 p-8 flex flex-col"
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
  );
}
