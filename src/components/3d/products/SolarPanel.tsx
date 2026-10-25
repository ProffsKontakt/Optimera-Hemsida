"use client";

import * as THREE from "three";
import { makeCanvasTexture } from "./textures";

/**
 * JA Solar helsvart glas-glas-panel (1953 × 1134 mm, halvcellsteknik).
 * Svarta celler med knappt synliga busbars bakom glas, svart aluminiumram.
 * Ligger i lokal XZ-plan (glaset uppåt, +y), panelens långsida längs z.
 * Origo = panelens mitt. Skala med `width`/`length` (meter eller scenenheter).
 */
export const PANEL_W = 1.134;
export const PANEL_L = 1.953;

let cellTexture: THREE.Texture | null = null;
/** Delas av alla paneler på sidan – ritas en gång. */
function getCellTexture() {
  if (cellTexture) return cellTexture;
  cellTexture = makeCanvasTexture(384, 660, (ctx, w, h) => {
    ctx.fillStyle = "#050607";
    ctx.fillRect(0, 0, w, h);
    const cols = 6;
    const rows = 22; // halvceller: 2 × 11
    const padX = 6;
    const padY = 6;
    const midGap = 8;
    const cw = (w - padX * 2) / cols;
    const ch = (h - padY * 2 - midGap) / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = padX + c * cw;
        const y = padY + r * ch + (r >= rows / 2 ? midGap : 0);
        const g = ctx.createLinearGradient(x, y, x + cw, y + ch);
        g.addColorStop(0, "#14171c");
        g.addColorStop(1, "#0d0f13");
        ctx.fillStyle = g;
        ctx.fillRect(x + 1.2, y + 1.2, cw - 2.4, ch - 2.4);
        // Knappt synliga busbars (helsvart panel)
        ctx.fillStyle = "rgba(60,66,76,0.35)";
        for (let b = 1; b <= 4; b++) ctx.fillRect(x + (cw * b) / 5 - 0.5, y + 1.2, 1, ch - 2.4);
      }
    }
  });
  return cellTexture;
}

export function SolarPanel({
  width = PANEL_W,
  length = PANEL_L,
  thickness = 0.035,
  castShadow = true,
}: {
  width?: number;
  length?: number;
  thickness?: number;
  castShadow?: boolean;
}) {
  const frame = Math.min(width, length) * 0.022;
  return (
    <group>
      {/* Ram */}
      <mesh castShadow={castShadow} receiveShadow>
        <boxGeometry args={[width, thickness, length]} />
        <meshStandardMaterial color="#111214" metalness={0.6} roughness={0.42} />
      </mesh>
      {/* Glas med celler */}
      <mesh position={[0, thickness / 2 + 0.0004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width - frame * 2, length - frame * 2]} />
        <meshPhysicalMaterial
          map={getCellTexture()}
          color="#ffffff"
          roughness={0.32}
          metalness={0.05}
          clearcoat={0.6}
          clearcoatRoughness={0.08}
          envMapIntensity={0.35}
        />
      </mesh>
    </group>
  );
}
