"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Fångar annons-attribution (gclid/UTM) på första landningen. Renderar inget.
 * Mountas i layouten så den körs på alla ingångssidor.
 */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
