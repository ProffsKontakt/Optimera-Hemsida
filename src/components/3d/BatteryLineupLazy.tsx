"use client";

import dynamic from "next/dynamic";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { SceneFallback } from "./SceneFallback";
import { Defer } from "./Defer";

/**
 * Lazy-laddad BatteryLineup: three.js laddas först när scenen är på väg in i
 * bild, och inte alls utan WebGL (då visas SceneFallback).
 */
const Inner = dynamic(() => import("./BatteryLineup").then((m) => m.BatteryLineup), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-cream/70" aria-hidden />,
});

export function BatteryLineupLazy() {
  return (
    <Defer fallback={<div className="absolute inset-0 bg-cream/70" aria-hidden />}>
      <CanvasErrorBoundary fallback={<SceneFallback kind="batterier" />}>
        <Inner />
      </CanvasErrorBoundary>
    </Defer>
  );
}
