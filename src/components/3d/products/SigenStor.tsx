"use client";

import { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import { FONT, roundedRectShape, useCanvasTexture } from "./textures";

/**
 * Sigenergy SigenStor – modellerad efter produktbilden på 36 kWh: en vit
 * stack med mjukt rundade, ljusgrå sidopaneler, Energy Controller
 * (inbyggd hybridväxelriktare) överst med SIGENERGY-loggan och den runda
 * displayen med blå/lila ljusring, batterimoduler på 9 kWh under (1–6 per
 * stack, upp till 54 kWh) med en liten indikator på den översta modulen,
 * och en låg sockel.
 *
 * Mått i meter: modul 767 × 270 × 265 mm (B × H × D) enligt Sigenergys
 * datablad, Energy Controller och sockel efter produktbildens proportioner.
 * Origo = golvet mitt under stacken, fronten mot +z.
 */
export const SIGEN_MODULE_KWH = 9;
export const SIGEN_MAX_PER_STACK = 6;

const W = 0.767;
const D = 0.265;
const MODULE_H = 0.27;
const EC_H = 0.31;
const BASE_H = 0.047;
const GAP = 0.004;
const SIDE = 0.04; // sidopanelernas tjocklek

const WHITE = { color: "#F6F6F4", roughness: 0.32, clearcoat: 0.45, clearcoatRoughness: 0.3 } as const;

export function sigenModules(capacityKWh: number) {
  return Math.max(1, Math.round(capacityKWh / SIGEN_MODULE_KWH));
}

export function sigenStackHeight(modules: number) {
  return BASE_H + Math.min(modules, SIGEN_MAX_PER_STACK) * MODULE_H + EC_H;
}

export function SigenStor({ capacityKWh }: { capacityKWh: number }) {
  const total = sigenModules(capacityKWh);
  const stacks = Math.ceil(total / SIGEN_MAX_PER_STACK);
  const per = Math.ceil(total / stacks);
  const gap = 0.08;
  const totalW = stacks * W + (stacks - 1) * gap;
  return (
    <group>
      {Array.from({ length: stacks }).map((_, s) => (
        <group key={s} position={[-totalW / 2 + W / 2 + s * (W + gap), 0, 0]}>
          <Stack modules={s === stacks - 1 ? total - per * (stacks - 1) : per} />
        </group>
      ))}
    </group>
  );
}

function Stack({ modules }: { modules: number }) {
  const height = BASE_H + modules * MODULE_H + EC_H;
  const topY = BASE_H + modules * MODULE_H;
  const innerW = W - SIDE * 2;

  // Sidopanelens profil (sedd från sidan): rundade hörn upptill och nedtill
  // mot fronten – det som ger SigenStor sin mjuka siluett.
  const sideShape = useMemo(() => roundedRectShape(D, height, 0.05), [height]);

  const logo = useCanvasTexture("sigen-logo", 512, 96, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#4f5459";
    ctx.font = `400 54px ${FONT}`;
    ctx.textBaseline = "middle";
    const letters = "SIGENERGY".split("");
    let x = 8;
    for (const l of letters) {
      ctx.fillText(l, x, h / 2 + 2);
      x += ctx.measureText(l).width + 9;
    }
  });
  const display = useCanvasTexture("sigen-display", 256, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    // Konisk gradient där den finns (alla moderna webbläsare), annars linjär.
    const ring =
      typeof ctx.createConicGradient === "function"
        ? ctx.createConicGradient(0, cx, cy)
        : ctx.createLinearGradient(0, 0, w, h);
    ring.addColorStop(0, "#4fd1ff");
    ring.addColorStop(0.35, "#7b6cff");
    ring.addColorStop(0.65, "#c06bff");
    ring.addColorStop(1, "#4fd1ff");
    ctx.fillStyle = "#e8e9ec";
    ctx.beginPath();
    ctx.arc(cx, cy, 124, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = ring;
    ctx.beginPath();
    ctx.arc(cx, cy, 112, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#07090c";
    ctx.beginPath();
    ctx.arc(cx, cy, 96, 0, Math.PI * 2);
    ctx.fill();
    // Fyra ikoner i grönt
    ctx.strokeStyle = "#3fe08a";
    ctx.lineWidth = 4;
    const icon = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.stroke();
    };
    icon(cx, cy - 46);
    icon(cx - 42, cy - 8);
    icon(cx + 42, cy - 8);
    icon(cx - 24, cy + 38);
    icon(cx + 24, cy + 38);
  });

  return (
    <group>
      {/* Sidopaneler i ljusgrått med rundade hörn */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (W / 2 - SIDE / 2) - SIDE / 2, height / 2, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
          <extrudeGeometry args={[sideShape, { depth: SIDE, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 3, curveSegments: 16 }]} />
          <meshPhysicalMaterial color="#dcdddf" roughness={0.38} clearcoat={0.3} />
        </mesh>
      ))}

      {/* Mörk kärna bakom skarvarna */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[innerW, height - 0.01, D - 0.02]} />
        <meshStandardMaterial color="#9a9c9e" roughness={0.8} />
      </mesh>

      {/* Sockel */}
      <RoundedBox args={[innerW, BASE_H - GAP, D - 0.004]} radius={0.006} smoothness={3} position={[0, BASE_H / 2, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial {...WHITE} color="#efefed" />
      </RoundedBox>

      {/* Batterimoduler */}
      {Array.from({ length: modules }).map((_, i) => (
        <group key={i} position={[0, BASE_H + MODULE_H / 2 + i * MODULE_H, 0]}>
          <RoundedBox args={[innerW, MODULE_H - GAP, D - 0.004]} radius={0.006} smoothness={3} castShadow receiveShadow>
            <meshPhysicalMaterial {...WHITE} />
          </RoundedBox>
          {i === modules - 1 && (
            // Liten indikator på översta modulen
            <mesh position={[innerW * 0.26, MODULE_H * 0.27, D / 2 - 0.0012]}>
              <shapeGeometry args={[roundedRectShape(0.05, 0.026, 0.006)]} />
              <meshStandardMaterial color="#cfd1d4" roughness={0.4} />
            </mesh>
          )}
        </group>
      ))}

      {/* Energy Controller */}
      <group position={[0, topY + EC_H / 2, 0]}>
        <RoundedBox args={[innerW, EC_H - GAP, D - 0.004]} radius={0.006} smoothness={3} castShadow receiveShadow>
          <meshPhysicalMaterial {...WHITE} />
        </RoundedBox>
        <mesh position={[-innerW * 0.17, EC_H * 0.17, D / 2 - 0.0012]}>
          <planeGeometry args={[0.24, 0.045]} />
          <meshBasicMaterial map={logo} transparent toneMapped={false} />
        </mesh>
        <mesh position={[innerW * 0.27, EC_H * 0.2, D / 2 - 0.0012]}>
          <planeGeometry args={[0.09, 0.09]} />
          <meshBasicMaterial map={display} transparent toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

