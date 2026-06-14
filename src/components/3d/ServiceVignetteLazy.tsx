"use client";

import dynamic from "next/dynamic";
import type { ServiceSlug } from "@/lib/services";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { SceneFallback } from "./SceneFallback";
import { Defer } from "./Defer";

/**
 * Lazy-laddad ServiceVignette. Three.js + R3F är tung (~200 KB) och vi
 * vill inte att home- och tjänster-sidornas första HTML innehåller bundlen.
 * SSR avstängt eftersom canvas ändå inte fungerar utan window/WebGL.
 *
 * Placeholder är samma aspect-ratio som canvas så ingen layout shift sker.
 */
const ServiceVignetteInner = dynamic(
  () => import("./ServiceVignette").then((m) => m.ServiceVignette),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-cream/70" aria-hidden />
    ),
  },
);

export function ServiceVignetteLazy({ kind }: { kind: ServiceSlug }) {
  // ServiceSlug och SceneFallbackKind delar samma 4 strängar för tjänsterna.
  // Vinjetterna ligger under vecket, så vi monterar three.js-scenen först när
  // kortet är på väg in i bild. Det håller startsidans laddfönster fritt från
  // fyra parallella WebGL-init och kapar Total Blocking Time rejält.
  return (
    <Defer
      fallback={<div className="absolute inset-0 bg-cream/70" aria-hidden />}
    >
      <CanvasErrorBoundary fallback={<SceneFallback kind={kind} />}>
        <ServiceVignetteInner kind={kind} />
      </CanvasErrorBoundary>
    </Defer>
  );
}
