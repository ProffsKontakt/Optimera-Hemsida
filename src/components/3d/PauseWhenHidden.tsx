"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

/**
 * Styr när 3D-scenen ritas om, så att den inte arbetar i onödan:
 *
 *  - Scenen ritas en gång när den laddats och står sedan still tills
 *    besökaren rör sidan första gången (pekar, skrollar, trycker). Då
 *    startar den långsamma rotationen. Under själva sidladdningen tävlar
 *    scenen därför inte med resten av sidan om processorn.
 *  - När canvasen skrollats ur bild, eller fliken ligger i bakgrunden,
 *    ritas ingenting. Rotationen fortsätter när scenen syns igen.
 *
 * Kräver att <Canvas> har frameloop="demand" och, för scener som roterar
 * av sig själva, att <OrbitControls> har makeDefault (så att rotationen kan
 * stängas av här). Komponenten begär en ny bildruta per skärmuppdatering
 * så länge scenen ska röra sig, och slutar begära när den inte ska det.
 * (Att växla Canvas frameloop mellan "always" och "never" fungerar inte:
 * Canvas återställer läget vid nästa omrendering, och växlingen nollställer
 * scenens klocka.)
 */
type RotatingControls = { autoRotate?: boolean };

const WAKE_EVENTS = ["pointerdown", "pointermove", "touchstart", "keydown", "scroll", "wheel"] as const;

// Har besökaren rört sidan? Delas av alla scener, så att en scen som
// monteras senare (längre ner på sidan) börjar röra sig direkt.
let visitorHasInteracted = false;

export function PauseWhenHidden() {
  const gl = useThree((s) => s.gl);
  const invalidate = useThree((s) => s.invalidate);
  const controls = useThree((s) => s.controls) as RotatingControls | null;

  useEffect(() => {
    const el = gl.domElement;
    const wantsRotation = controls?.autoRotate === true;
    let awake = visitorHasInteracted;
    let onScreen = true;
    let running = false;
    let raf = 0;

    const shouldRun = () => awake && onScreen && !document.hidden;
    const sync = () => {
      // Stäng av egenrotationen när scenen inte ska röra sig. Annars håller
      // kontrollerna själva igång renderingen genom att begära nya bildrutor.
      if (controls && wantsRotation) controls.autoRotate = shouldRun();
      if (shouldRun()) start();
    };
    const loop = () => {
      if (!shouldRun()) {
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

    const opts: AddEventListenerOptions = { passive: true, capture: true };
    const wake = () => {
      if (awake) return;
      awake = true;
      visitorHasInteracted = true;
      WAKE_EVENTS.forEach((e) => window.removeEventListener(e, wake, opts));
      sync();
    };
    WAKE_EVENTS.forEach((e) => window.addEventListener(e, wake, opts));

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              onScreen = entry.isIntersecting;
              sync();
            },
            { rootMargin: "120px" },
          )
        : null;
    io?.observe(el);
    document.addEventListener("visibilitychange", sync);

    sync();
    // En bildruta direkt, så att scenen syns även innan besökaren rört sidan.
    invalidate();

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      document.removeEventListener("visibilitychange", sync);
      WAKE_EVENTS.forEach((e) => window.removeEventListener(e, wake, opts));
      if (controls && wantsRotation) controls.autoRotate = true;
    };
  }, [gl, invalidate, controls]);

  return null;
}
