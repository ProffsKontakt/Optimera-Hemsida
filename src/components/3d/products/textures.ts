"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";

/**
 * Små canvas-texturer för produktdetaljer: logotyper, displayer, solcells-
 * mönster och fläktgaller. Ritas en gång i webbläsaren – inga bildfiler,
 * inga typsnitt att ladda ner och ingenting extra i bundlen.
 */

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

export function makeCanvasTexture(w: number, h: number, draw: Draw, opts?: { repeat?: [number, number] }) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (ctx) draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  if (opts?.repeat) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(opts.repeat[0], opts.repeat[1]);
  }
  return tex;
}

/** useMemo + dispose. `key` styr när texturen ritas om. */
export function useCanvasTexture(key: string, w: number, h: number, draw: Draw, opts?: { repeat?: [number, number] }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tex = useMemo(() => makeCanvasTexture(w, h, draw, opts), [key, w, h]);
  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
}

export const FONT = `"Helvetica Neue", Helvetica, Arial, sans-serif`;

/** Rundad rektangel som path. */
export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Stadium (piller) som THREE.Shape, centrerad i origo. */
export function pillShape(w: number, h: number) {
  const r = w / 2;
  const s = new THREE.Shape();
  const top = h / 2 - r;
  s.moveTo(-r, -top);
  s.lineTo(-r, top);
  s.absarc(0, top, r, Math.PI, 0, true);
  s.lineTo(r, -top);
  s.absarc(0, -top, r, 0, Math.PI, true);
  return s;
}

/** Rundad rektangel som THREE.Shape, centrerad i origo. */
export function roundedRectShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}
