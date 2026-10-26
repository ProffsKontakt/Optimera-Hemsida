"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { FONT, useCanvasTexture } from "./textures";
import { usePrefersReducedMotion } from "./Studio";

/**
 * SAJ HS3 – allt-i-ett med inbyggd växelriktare, modellerad efter
 * produktbilden på 10 kWh: en hög vit växelriktardel överst med grön
 * statusring och SAJ-loggan, vita batterimoduler på 5 kWh under (2–4 per
 * stack, 10–20 kWh), två fötter med snedskurna innerkanter, en svart
 * kontaktlåda på vänster sida och små fästen på sidorna.
 *
 * Mått i meter: 695 mm bred och 170 mm djup enligt SAJ:s datablad,
 * höjderna efter produktbildens proportioner. Origo = golvet mitt under
 * stacken, fronten mot +z.
 */
export const SAJ_MODULE_KWH = 5;
export const SAJ_MAX_PER_STACK = 4;

const W = 0.695;
const D = 0.17;
const TOP_H = 0.45;
const MODULE_H = 0.375;
const FOOT_H = 0.06;
const GAP = 0.005;

const SHELL = { color: "#F7F7F5", roughness: 0.35, clearcoat: 0.4, clearcoatRoughness: 0.35 } as const;

export function sajModules(capacityKWh: number) {
  return Math.min(SAJ_MAX_PER_STACK, Math.max(2, Math.round(capacityKWh / SAJ_MODULE_KWH)));
}

export function sajHeight(modules: number) {
  return FOOT_H + modules * MODULE_H + TOP_H;
}

export function SajHS3({ capacityKWh }: { capacityKWh: number }) {
  const modules = sajModules(capacityKWh);
  const topY = FOOT_H + modules * MODULE_H;

  const logo = useCanvasTexture("saj-logo", 128, 48, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#b9bcbf";
    ctx.fillRect(4, 6, w - 8, h - 12);
    ctx.fillStyle = "#ffffff";
    ctx.font = `700 30px ${FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SAJ", w / 2, h / 2 + 1);
  });

  return (
    <group>
      {/* Mörk kärna så att skarvarna blir tunna grå linjer */}
      <mesh position={[0, (FOOT_H + topY + TOP_H) / 2, 0]}>
        <boxGeometry args={[W - 0.02, topY + TOP_H - FOOT_H, D - 0.02]} />
        <meshStandardMaterial color="#7d8083" roughness={0.8} />
      </mesh>

      {/* Fötter */}
      {[-1, 1].map((s) => (
        <Foot key={s} side={s} />
      ))}

      {/* Batterimoduler */}
      {Array.from({ length: modules }).map((_, i) => (
        <RoundedBox
          key={i}
          args={[W, MODULE_H - GAP, D]}
          radius={0.008}
          smoothness={4}
          position={[0, FOOT_H + MODULE_H / 2 + i * MODULE_H, 0]}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial {...SHELL} />
        </RoundedBox>
      ))}

      {/* Växelriktardelen */}
      <group position={[0, topY + TOP_H / 2, 0]}>
        <RoundedBox args={[W, TOP_H - GAP, D]} radius={0.008} smoothness={4} castShadow receiveShadow>
          <meshPhysicalMaterial {...SHELL} />
        </RoundedBox>
        <StatusRing position={[0, TOP_H * 0.2, D / 2 + 0.0008]} />
        <mesh position={[0, -TOP_H * 0.37, D / 2 + 0.0008]}>
          <planeGeometry args={[0.07, 0.026]} />
          <meshBasicMaterial map={logo} transparent toneMapped={false} />
        </mesh>
        {/* Kontaktlåda på vänster sida */}
        <RoundedBox args={[0.02, 0.07, 0.06]} radius={0.004} smoothness={2} position={[-W / 2 - 0.009, -TOP_H * 0.04, 0.01]} castShadow>
          <meshStandardMaterial color="#1c1d1f" roughness={0.5} />
        </RoundedBox>
        {/* Väggfästen på sidorna */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * (W / 2 + 0.004), -TOP_H * 0.43, 0]} castShadow>
            <boxGeometry args={[0.008, 0.05, 0.03]} />
            <meshStandardMaterial color="#9a9da0" metalness={0.6} roughness={0.35} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** Vit fot med snedskuren innerkant (som på produktbilden). */
function Foot({ side }: { side: number }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(W * 0.43, 0);
    s.lineTo(W * 0.27, 0);
    s.lineTo(W * 0.2, FOOT_H);
    s.lineTo(W * 0.43, FOOT_H);
    s.closePath();
    return s;
  }, []);
  return (
    <mesh scale={[side, 1, 1]} position={[0, 0, -D / 2 + 0.01]} castShadow receiveShadow>
      <extrudeGeometry args={[shape, { depth: D - 0.02, bevelEnabled: false }]} />
      <meshPhysicalMaterial {...SHELL} color="#F2F2F0" side={THREE.DoubleSide} />
    </mesh>
  );
}

/** Grön statusring som andas långsamt. */
function StatusRing({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.MeshStandardMaterial>(null);
  const reduced = usePrefersReducedMotion();
  useFrame(({ clock }) => {
    if (ref.current && !reduced) ref.current.emissiveIntensity = 1.1 + Math.sin(clock.elapsedTime * 1.3) * 0.35;
  });
  return (
    <group position={position}>
      <mesh>
        <ringGeometry args={[0.042, 0.054, 64]} />
        <meshStandardMaterial ref={ref} color="#8ef59a" emissive="#5be36f" emissiveIntensity={1.1} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, -0.0002]}>
        <circleGeometry args={[0.042, 48]} />
        <meshStandardMaterial color="#f1f1ef" roughness={0.3} />
      </mesh>
    </group>
  );
}
