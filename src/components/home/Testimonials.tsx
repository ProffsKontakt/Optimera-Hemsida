"use client";

import { useEffect, useRef } from "react";

export type TestimonialItem = {
  id: string;
  author: string;
  place: string;
  text: string;
  rating?: number;
};

/**
 * Recensionskarusell som BÅDE rullar själv och går att ta tag i.
 *
 * Tekniken: en riktig scroll-container (overflow-x-auto) med tre kopior av
 * kortraden. En requestAnimationFrame-loop knuffar scrollLeft långsamt åt
 * höger (dvs minskar värdet) och wrappar sömlöst runt mitt-kopian.
 * Användar-input (drag med mus, svep/scroll på touch, mushjul) pausar
 * autorullningen ett par sekunder och tar sedan vid igen där man släppte.
 * prefers-reduced-motion: ingen autorullning, men karusellen går
 * fortfarande att skrolla manuellt.
 */
const SPEED_PX_PER_S = 28;
const RESUME_AFTER_MS = 2500;

export function Testimonials({ reviews }: { reviews: TestimonialItem[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const firstSet = el.querySelector<HTMLElement>("[data-set='0']");
    let setWidth = 0;
    const measure = () => {
      setWidth = firstSet?.offsetWidth ?? 0;
      // Starta i mitt-kopian så det finns innehåll åt båda hållen direkt.
      if (setWidth > 0 && el.scrollLeft < 2) el.scrollLeft = setWidth;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (firstSet) ro.observe(firstSet);

    let pausedUntil = 0;
    const pause = () => {
      pausedUntil = performance.now() + RESUME_AFTER_MS;
    };

    // Flyt-ackumulator: scrollLeft avrundas av webbläsaren, så vid låg fart
    // (0,5px/frame) skulle ren scrollLeft-aritmetik fastna på heltal.
    let pos = el.scrollLeft;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (setWidth > 0) {
        // Har användaren skrollat själv sedan förra framen? Synka om.
        if (Math.abs(el.scrollLeft - pos) > 1.5) pos = el.scrollLeft;
        if (now > pausedUntil) {
          pos -= (SPEED_PX_PER_S * dt) / 1000; // åt höger = minskande scrollLeft
        }
        // Sömlös wrap runt mitt-kopian, oavsett vem som skrollade.
        if (pos <= 1) pos += setWidth;
        else if (pos >= setWidth * 2) pos -= setWidth;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Mus-drag ("plocka" karusellen på desktop). Touch sköts av native scroll.
    let dragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    const onPointerDown = (e: PointerEvent) => {
      pause();
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      dragStartX = e.clientX;
      dragStartScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      pause();
      el.scrollLeft = dragStartScroll - (e.clientX - dragStartX);
      pos = el.scrollLeft;
    };
    const endDrag = () => {
      dragging = false;
    };
    const onTouchMove = () => pause();
    const onWheel = () => pause();

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("wheel", onWheel);
    };
  }, [reviews.length]);

  if (reviews.length === 0) return null;
  const copies = [0, 1, 2];

  return (
    <div className="-mx-6 sm:-mx-10 lg:-mx-16 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-6 sm:px-10 lg:px-16"
      >
        {copies.map((c) => (
          <div
            key={c}
            data-set={c}
            aria-hidden={c > 0}
            className="flex shrink-0 gap-4 md:gap-5 pr-4 md:pr-5"
          >
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
