"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { FONT, useCanvasTexture } from "./textures";
import { usePrefersReducedMotion } from "./Studio";

/**
 * SAJ HS3 (trefas, HS3-5-12K-T2) – allt-i-ett med inbyggd växelriktare,
 * modellerad efter SAJ:s produktblad: växelriktardelen överst med grön
 * statusring och SAJ-loggan, en smal anslutningsdel under den, vita
 * batterimoduler på 5 kWh (1–3 per stack), två fötter med snedskurna
 * innerkanter och kontakter på vänster sida.
 *
 * Mått enligt produktbladet: 695 mm bred, 170 mm djup, växelriktaren
 * 450 mm hög, och stacken är 1 030 / 1 400 / 1 770 mm hög med 1 / 2 / 3
 * moduler – alltså 370 mm per modul. 20 kWh (4 moduler) är en stack med
 * tre moduler plus en separat stack med en modul (520 mm).
 * Origo = golvet mitt under stacken, fronten mot +z.
 */
export const SAJ_MODULE_KWH = 5;
export const SAJ_MAX_PER_STACK = 3;

const W = 0.695;
const D = 0.17;
const INVERTER_H = 0.45;
const JUNCTION_H = 0.14;
const MODULE_H = 0.37;
const FOOT_H = 0.07;
const SIDE_CAP_H = 0.08; // lock på den separata stacken
const GAP = 0.005;

const SHELL = { color: "#F7F7F5", roughness: 0.35, clearcoat: 0.4, clearcoatRoughness: 0.35 } as const;

export function sajModules(capacityKWh: number) {
  return Math.max(1, Math.round(capacityKWh / SAJ_MODULE_KWH));
}

/** Höjd på huvudstacken (den med växelriktaren). */
export function sajHeight(modules: number) {
  return FOOT_H + Math.min(modules, SAJ_MAX_PER_STACK) * MODULE_H + JUNCTION_H + INVERTER_H;
}

export function SajHS3({ capacityKWh }: { capacityKWh: number }) {
  const total = sajModules(capacityKWh);
  const main = Math.min(total, SAJ_MAX_PER_STACK);
  const extra = total - main;
  const gap = 0.08;
  // Huvudstacken centreras; en extra stack hamnar till höger.
  const offset = extra > 0 ? -(W + gap) / 2 : 0;

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

  const jY = FOOT_H + main * MODULE_H;
  const invY = jY + JUNCTION_H;

  return (
    <group>
      <group position={[offset, 0, 0]}>
        <Core height={invY + INVERTER_H} />
        {[-1, 1].map((s) => (
          <Foot key={s} side={s} />
        ))}
        <Modules count={main} />

        {/* Smal anslutningsdel mellan batterierna och växelriktaren */}
        <RoundedBox args={[W, JUNCTION_H - GAP, D]} radius={0.008} smoothness={4} position={[0, jY + JUNCTION_H / 2, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial {...SHELL} />
        </RoundedBox>

        {/* Växelriktardelen */}
        <group position={[0, invY + INVERTER_H / 2, 0]}>
          <RoundedBox args={[W, INVERTER_H - GAP, D]} radius={0.008} smoothness={4} castShadow receiveShadow>
            <meshPhysicalMaterial {...SHELL} />
          </RoundedBox>
          <StatusRing position={[0, INVERTER_H * 0.18, D / 2 + 0.0008]} />
          <mesh position={[0, -INVERTER_H * 0.3, D / 2 + 0.0008]}>
            <planeGeometry args={[0.07, 0.026]} />
            <meshBasicMaterial map={logo} transparent toneMapped={false} />
          </mesh>
        </group>

        {/* Kontakter och kabelgenomföringar på vänster sida */}
        {[invY - 0.02, invY + 0.06, jY + 0.07].map((y, i) => (
          <RoundedBox key={i} args={[0.022, i === 2 ? 0.05 : 0.07, 0.06]} radius={0.004} smoothness={2} position={[-W / 2 - 0.01, y, 0.01]} castShadow>
            <meshStandardMaterial color="#1c1d1f" roughness={0.5} />
          </RoundedBox>
        ))}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * (W / 2 + 0.004), invY - 0.03, 0]} castShadow>
            <boxGeometry args={[0.008, 0.05, 0.03]} />
            <meshStandardMaterial color="#9a9da0" metalness={0.6} roughness={0.35} />
          </mesh>
        ))}
      </group>

      {/* Separat stack för modul 4 och uppåt (t.ex. 20 kWh) */}
      {extra > 0 && (
        <group position={[offset + W + gap, 0, 0]}>
          <Core height={FOOT_H + extra * MODULE_H + SIDE_CAP_H} />
          {[-1, 1].map((s) => (
            <Foot key={s} side={s} />
          ))}
          <Modules count={extra} />
          <RoundedBox args={[W, SIDE_CAP_H - GAP, D]} radius={0.008} smoothness={4} position={[0, FOOT_H + extra * MODULE_H + SIDE_CAP_H / 2, 0]} castShadow receiveShadow>
            <meshPhysicalMaterial {...SHELL} />
          </RoundedBox>
        </group>
      )}
    </group>
  );
}

/** Mörk kärna så att skarvarna blir tunna grå linjer. */
function Core({ height }: { height: number }) {
  return (
    <mesh position={[0, (FOOT_H + height) / 2, 0]}>
      <boxGeometry args={[W - 0.02, height - FOOT_H, D - 0.02]} />
      <meshStandardMaterial color="#7d8083" roughness={0.8} />
    </mesh>
  );
}

function Modules({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
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
    </>
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
