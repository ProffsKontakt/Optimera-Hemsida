"use client";

import { useEffect } from "react";

/**
 * Tänder skroll-animationerna: element med data-reveal får klassen .is-in
 * när de kommer i bild (se globals.css). En enda observatör för hela sidan,
 * i stället för en klientkomponent per animerat element. Det håller
 * startsidans JavaScript litet.
 */
export function RevealObserver() {
  useEffect(() => {
    // Talar om för CSS:en att observatören är igång, så att reservvisningen
    // (som annars tänder allt efter några sekunder) inte behövs.
    document.documentElement.classList.add("reveal-on");
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (!els.length) return;
    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
