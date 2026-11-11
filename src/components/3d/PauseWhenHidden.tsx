"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

/**
 * Pausar 3D-scenens renderingsloop när den inte syns: när canvasen har
 * skrollats ur bild eller fliken ligger i bakgrunden.
 *
 * Scenerna roterar av sig själva och ritas därför om 60 gånger i sekunden.
 * Det är onödigt arbete när ingen ser dem, och på långa sidor (tjänste-
 * sidorna) tävlar det med skroll och klick om processorn. Läggs inuti
 * <Canvas>. Utseendet påverkas inte: loopen startar igen så fort scenen är
 * på väg in i bild.
 */
export function PauseWhenHidden() {
  const gl = useThree((s) => s.gl);
  const setFrameloop = useThree((s) => s.setFrameloop);

  useEffect(() => {
    const el = gl.domElement;
    if (typeof IntersectionObserver === "undefined") return;
    let onScreen = true;
    const apply = () => setFrameloop(onScreen && !document.hidden ? "always" : "never");
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        apply();
      },
      { rootMargin: "120px" },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", apply);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", apply);
      setFrameloop("always");
    };
  }, [gl, setFrameloop]);

  return null;
}
