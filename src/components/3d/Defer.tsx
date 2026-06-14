"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Skjuter upp montering av tunga klientkomponenter (t.ex. WebGL-canvas med
 * three.js/R3F) tills de faktiskt syns i viewporten, och valfritt tills
 * webbläsaren är idle.
 *
 * Bakgrund: startsidan monterade 5 separata three.js-scener (hero + 4
 * tjänste-vinjetter). Även med dynamic(ssr:false) laddas och initieras hela
 * bundlen direkt vid hydration, vilket gav ~27 s Total Blocking Time på
 * mobil. Genom att bara montera när elementet är på väg in i bild (och hero,
 * som ligger ovanför vecket, först när tråden är ledig) flyttas tunga
 * exekveringen ut ur det kritiska laddfönstret. Utseendet är oförändrat,
 * scenen dyker bara upp en aning senare med samma cream-placeholder.
 */
export function Defer({
  children,
  fallback = null,
  rootMargin = "300px",
  idle = false,
}: {
  children: ReactNode;
  fallback?: ReactNode;
  /** Hur långt innan elementet syns vi börjar montera. */
  rootMargin?: string;
  /** Vänta dessutom på requestIdleCallback (för element ovanför vecket). */
  idle?: boolean;
}) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // Ingen IO (gammal browser / SSR-edge): visa direkt så inget tappas.
      setShow(true);
      return;
    }
    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setShow(true);
    };
    const onVisible = () => {
      const ric = (
        window as unknown as {
          requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        }
      ).requestIdleCallback;
      if (idle && typeof ric === "function") {
        ric(reveal, { timeout: 2500 });
      } else if (idle) {
        window.setTimeout(reveal, 200);
      } else {
        reveal();
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          onVisible();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [idle, rootMargin]);

  return (
    <div ref={ref} className="absolute inset-0">
      {show ? children : fallback}
    </div>
  );
}
