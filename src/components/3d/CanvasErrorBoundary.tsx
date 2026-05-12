"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

/**
 * Error boundary för 3D-canvas-komponenter.
 *
 * Three.js kastar synkront om WebGL inte kan skapas (sandboxade browsers,
 * Linux utan GPU-acceleration, mobila browsers i lågström-läge etc).
 * Utan en boundary bubblar felet upp till React-roten och kraschar hela
 * sidan ("Application error: a client-side exception has occurred").
 *
 * Vi catchar felet, visar en lugn cream-fallback, och loggar till console
 * så att vi kan följa upp i vår analytics längre fram.
 */
export class CanvasErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.warn("[3D] WebGL/Canvas-rendering misslyckades:", error.message, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="absolute inset-0 bg-cream" aria-hidden />
        )
      );
    }
    return this.props.children;
  }
}
