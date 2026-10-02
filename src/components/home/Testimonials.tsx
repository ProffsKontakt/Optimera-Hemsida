"use client";

import { useEffect, useRef, useState } from "react";

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
// Recensioner längre än så här klampas till ett standardformat med
// "Läs mer" – annars blir korten meterlånga på mobil.
const CLAMP_CHARS = 170;

export function Testimonials({ reviews }: { reviews: TestimonialItem[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  // Utfällda recensioner (per id – gäller alla tre marquee-kopiorna så
  // set-bredderna hålls lika och wrappen förblir sömlös).
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const anyExpandedRef = useRef(false);
  anyExpandedRef.current = Object.values(expanded).some(Boolean);

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
        // Står stilla så länge någon recension är utfälld – annars rullar
        // texten i väg medan man läser.
        if (now > pausedUntil && !anyExpandedRef.current) {
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
    //
    // OBS pointer capture: den får INTE sättas redan på pointerdown. När
    // capture är aktiv vid pointerup omdirigerar webbläsaren click-eventet
    // till capture-elementet (scrollern) i stället för det man faktiskt
    // tryckte på – vilket gjorde att "Läs mer" aldrig gick att klicka med
    // mus, medan touch fungerade (touch tar early return nedan och sätter
    // aldrig capture). Därför: vänta tills pekaren rört sig förbi
    // DRAG_THRESHOLD, först då är det ett drag och först då tas capture.
    const DRAG_THRESHOLD = 4;
    let armed = false; // musknapp nere, men ännu inte ett drag
    let dragging = false; // drag pågår, capture tagen
    let movedDuringPress = false;
    let pointerId = -1;
    let dragStartX = 0;
    let dragStartScroll = 0;

    const onPointerDown = (e: PointerEvent) => {
      pause();
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      armed = true;
      dragging = false;
      movedDuringPress = false;
      pointerId = e.pointerId;
      dragStartX = e.clientX;
      dragStartScroll = el.scrollLeft;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!armed) return;
      const dx = e.clientX - dragStartX;
      if (!dragging) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        dragging = true;
        movedDuringPress = true;
        // Capture först nu, så draget följer med utanför elementet.
        try {
          el.setPointerCapture(pointerId);
        } catch {
          /* pekaren kan redan vara släppt */
        }
      }
      pause();
      el.scrollLeft = dragStartScroll - dx;
      pos = el.scrollLeft;
    };

    const endDrag = () => {
      if (dragging) {
        try {
          el.releasePointerCapture(pointerId);
        } catch {
          /* redan släppt */
        }
      }
      armed = false;
      dragging = false;
    };

    // Svälj klicket om användaren faktiskt draggade, så att ett drag som
    // råkar sluta ovanpå "Läs mer" inte fäller ut recensionen.
    const onClickCapture = (e: MouseEvent) => {
      if (!movedDuringPress) return;
      movedDuringPress = false;
      e.preventDefault();
      e.stopPropagation();
    };

    const onTouchMove = () => pause();
    const onWheel = () => pause();

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("click", onClickCapture, true);
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("click", onClickCapture, true);
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
                      className="text-[#47c645] text-[15px] tracking-[0.1em] pt-1"
                      aria-label={`${q.rating} av 5 stjärnor`}
                    >
                      {"★".repeat(q.rating)}
                      <span className="text-ink/15">{"★".repeat(5 - q.rating)}</span>
                    </span>
                  ) : null}
                </div>
                {/* Citat + ev. "Läs mer" i ett block, så signaturen kan
                    skjutas ner med mt-auto. Korten sträcks till samma höjd
                    (flex-raden stretchar), och utan mt-auto flöt signaturen
                    upp på korta recensioner och lämnade ett tomrum under. */}
                <div className="mb-6">
                  <blockquote
                    className={`mt-2 font-display text-[20px] tracking-display-tight leading-snug ${
                      q.text.length > CLAMP_CHARS && !expanded[q.id]
                        ? "line-clamp-5"
                        : ""
                    }`}
                  >
                    {q.text}
                  </blockquote>
                  {q.text.length > CLAMP_CHARS && (
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded((e) => ({ ...e, [q.id]: !e[q.id] }))
                      }
                      className="mt-2 text-[13px] text-indigo underline underline-offset-4 decoration-indigo/40 hover:decoration-indigo transition"
                    >
                      {expanded[q.id] ? "Visa mindre" : "Läs mer"}
                    </button>
                  )}
                </div>
                <figcaption className="mt-auto pt-4 border-t border-ink/10 flex items-center justify-between gap-3 text-[13px]">
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
