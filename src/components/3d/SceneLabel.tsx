"use client";

import { useEffect, useId, useRef } from "react";
import { Vector3, type Camera, type Object3D } from "three";
import { Html } from "@react-three/drei";

const v = new Vector3();
const PAD = 8;
const GAP = 4;

type Rect = { left: number; top: number; w: number; h: number };
/** Placerade etiketter per scen (kameran är unik per Canvas), i monteringsordning. */
const placed = new WeakMap<Camera, Map<string, Rect>>();

const overlaps = (a: Rect, b: Rect) =>
  a.left < b.left + b.w + GAP && b.left < a.left + a.w + GAP && a.top < b.top + b.h + GAP && b.top < a.top + a.h + GAP;

/**
 * Etikett som svävar vid ett objekt i 3D-scenen ("EASYWAY · 23,04 KWH").
 *
 * Objekten står vid husets högra gavel, så en etikett som förankras med
 * vänsterkanten vid objektet sticker ut över kortets kant – på telefon med
 * upp till 170px. Här kläms positionen in i canvasen utifrån etikettens
 * uppmätta bredd, och en etikett som då hamnar på en tidigare placerad
 * (batteri + laddbox) flyttas under – eller över – den. drei kör
 * calculatePosition varje bildruta, så allt följer med när man vrider på
 * huset eller texten ändras.
 *
 * `parts` skrivs ihop med " · ". På smala skärmar visas bara de två första
 * delarna (märke + storlek) – resten är detalj som inte får plats.
 */
export function SceneLabel({
  parts,
  position,
  center = false,
}: {
  parts: string[];
  position: [number, number, number];
  center?: boolean;
}) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const scene = useRef<Map<string, Rect>>();
  const [head, rest] = [parts.slice(0, 2), parts.slice(2)];

  useEffect(() => () => void scene.current?.delete(id), [id]);

  function calculatePosition(el: Object3D, camera: Camera, size: { width: number; height: number }) {
    v.setFromMatrixPosition(el.matrixWorld).project(camera);
    const w = ref.current?.offsetWidth ?? 0;
    const h = ref.current?.offsetHeight ?? 0;
    const clamp = (n: number, min: number, max: number) => (max < min ? min : Math.min(Math.max(n, min), max));

    // Vid `center` ligger etikettens mitt på punkten, annars dess övre vänstra hörn.
    let left = (v.x + 1) * (size.width / 2) - (center ? w / 2 : 0);
    let top = (1 - v.y) * (size.height / 2) - (center ? h / 2 : 0);
    left = clamp(left, PAD, size.width - PAD - w);

    if (!placed.has(camera)) placed.set(camera, new Map());
    scene.current = placed.get(camera)!;
    for (const [other, r] of scene.current) {
      if (other === id) break; // bara etiketter som placerats före denna
      if (!overlaps({ left, top, w, h }, r)) continue;
      top = r.top + r.h + GAP + h <= size.height - PAD ? r.top + r.h + GAP : r.top - h - GAP;
    }
    top = clamp(top, PAD, size.height - PAD - h);
    scene.current.set(id, { left, top, w, h });

    return [left + (center ? w / 2 : 0), top + (center ? h / 2 : 0)];
  }

  return (
    <Html position={position} center={center} calculatePosition={calculatePosition}>
      <div
        ref={ref}
        className="font-mono text-[9.5px] uppercase tracking-[0.12em] sm:tracking-[0.18em] text-ink/65 bg-bone/85 backdrop-blur px-2 py-0.5 rounded-full border border-ink/10 whitespace-nowrap"
      >
        {head.join(" · ")}
        {rest.length > 0 && <span className="hidden sm:inline"> · {rest.join(" · ")}</span>}
      </div>
    </Html>
  );
}
