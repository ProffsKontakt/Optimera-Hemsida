"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

/**
 * Ritar 3D-scenen bara när den syns: inte när canvasen har skrollats ur
 * bild eller fliken ligger i bakgrunden.
 *
 * Scenerna roterar av sig själva och ritades tidigare om 60 gånger i
 * sekunden hela tiden. Det är onödigt arbete när ingen ser dem, och på
 * långa sidor tävlar det med skroll och klick om processorn.
 *
 * Kräver att <Canvas> har frameloop="demand". Komponenten begär då en ny
 * bildruta per skärmuppdatering så länge scenen syns, och slutar begära
 * när den inte gör det. (Att i stället växla Canvas frameloop mellan
 * "always" och "never" fungerar inte: Canvas återställer läget vid nästa
 * omrendering, och växlingen nollställer scenens klocka.)
 */
export function PauseWhenHidden() {
  const gl = useThree((s) => s.gl);
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    const el = gl.domElement;
    let onScreen = true;
    let running = false;
    let raf = 0;

    const loop = () => {
      if (!onScreen || document.hidden) {
        running = false;
        return;
      }
      invalidate();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              onScreen = entry.isIntersecting;
              if (onScreen) start();
            },
            { rootMargin: "120px" },
          )
        : null;
    io?.observe(el);
    const onVisibility = () => {
      if (!document.hidden) start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [gl, invalidate]);

  return null;
}
