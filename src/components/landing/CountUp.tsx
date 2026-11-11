"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Räknar upp ett heltal från noll när det kommer i bild. Slutvärdet står i
 * sidan ända tills dess, så siffran är rätt även utan JavaScript, för
 * sökmotorer och för den som aldrig skrollar dit.
 * Används bara för siffror en bit ner på sidan (inte i hjälten), så att
 * värdet inte hoppar till synligt vid sidladdning.
 */
export function CountUp({ value, duration = 1100 }: { value: number; duration?: number }) {
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Syns siffran redan när sidan laddas låter vi den vara.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        // Nollställs först här, när siffran är på väg in i bild. Fram till
        // dess står slutvärdet kvar i sidan (för sökmotorer, utskrift och
        // verktyg som läser sidan utan att skrolla).
        setShown(0);
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(Math.round(value * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
    </span>
  );
}
