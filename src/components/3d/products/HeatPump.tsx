"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { makeCanvasTexture } from "./textures";

/**
 * Luft-vattenvärmepump, utedel – en modern enhet i stil med de märken vi
 * installerar (NIBE, Bosch, Daikin, Mitsubishi, Thermia): ljusgrå rundad
 * kropp med antracitfärgat lock, stort runt fläktgaller med en snurrande
 * fläkt bakom, ventilationsgaller till höger, fötter och köldmedierör.
 *
 * Mått i meter (ca 1 050 × 820 × 420 mm). Origo = golvet mitt under
 * enheten, fronten (fläkten) mot +z.
 */
const W = 1.05;
const H = 0.82;
const D = 0.42;
const FOOT = 0.06;

let grille: THREE.Texture | null = null;
function getGrilleTexture() {
  if (grille) return grille;
  grille = makeCanvasTexture(512, 512, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    ctx.strokeStyle = "#2b2d30";
    ctx.lineWidth = 5;
    for (let r = 26; r < w / 2 - 4; r += 19) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.lineWidth = 6;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * 22, cy + Math.sin(a) * 22);
      ctx.lineTo(cx + Math.cos(a) * (w / 2 - 6), cy + Math.sin(a) * (w / 2 - 6));
      ctx.stroke();
    }
    ctx.fillStyle = "#2b2d30";
    ctx.beginPath();
    ctx.arc(cx, cy, 30, 0, Math.PI * 2);
    ctx.fill();
  });
  return grille;
}

let louver: THREE.Texture | null = null;
function getLouverTexture() {
  if (louver) return louver;
  louver = makeCanvasTexture(128, 256, (ctx, w, h) => {
    ctx.fillStyle = "#dcdcd8";
    ctx.fillRect(0, 0, w, h);
    for (let y = 6; y < h; y += 12) {
      ctx.fillStyle = "#9c9e9f";
      ctx.fillRect(6, y, w - 12, 5);
      ctx.fillStyle = "#f2f2ef";
      ctx.fillRect(6, y + 5, w - 12, 2);
    }
  });
  return louver;
}

export function HeatPump({ spin = true }: { spin?: boolean }) {
  const fan = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (spin && fan.current) fan.current.rotation.z -= d * 5;
  });
  const fanX = -W * 0.17;
  const fanY = FOOT + H * 0.48;
  const fanR = H * 0.36;
  const front = D / 2;

  return (
    <group>
      {/* Fötter */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * W * 0.36, FOOT / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.07, FOOT, D * 1.05]} />
          <meshStandardMaterial color="#2f3236" roughness={0.6} />
        </mesh>
      ))}
      {/* Kropp */}
      <RoundedBox args={[W, H - 0.04, D]} radius={0.03} smoothness={4} position={[0, FOOT + (H - 0.04) / 2, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial color="#E9E9E5" roughness={0.45} clearcoat={0.3} clearcoatRoughness={0.5} />
      </RoundedBox>
      {/* Lock */}
      <RoundedBox args={[W + 0.02, 0.05, D + 0.03]} radius={0.02} smoothness={3} position={[0, FOOT + H - 0.03, 0]} castShadow>
        <meshPhysicalMaterial color="#3a3d41" roughness={0.5} clearcoat={0.2} />
      </RoundedBox>

      {/* Fläkt: mörk fördjupning, blad och galler */}
      <group position={[fanX, fanY, front]}>
        <mesh position={[0, 0, 0.001]}>
          <circleGeometry args={[fanR * 1.04, 64]} />
          <meshStandardMaterial color="#cfcfcb" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.002]}>
          <circleGeometry args={[fanR, 64]} />
          <meshStandardMaterial color="#121315" roughness={0.8} />
        </mesh>
        <group ref={fan} position={[0, 0, 0.012]}>
          {[0, 1, 2].map((i) => (
            <group key={i} rotation={[0, 0, (i / 3) * Math.PI * 2]}>
              <mesh position={[0, fanR * 0.48, 0]} rotation={[0.35, 0, 0.25]}>
                <boxGeometry args={[fanR * 0.42, fanR * 0.82, 0.006]} />
                <meshStandardMaterial color="#3a3c40" roughness={0.5} />
              </mesh>
            </group>
          ))}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[fanR * 0.16, fanR * 0.16, 0.03, 32]} />
            <meshStandardMaterial color="#2a2c2f" roughness={0.5} />
          </mesh>
        </group>
        <mesh position={[0, 0, 0.03]}>
          <circleGeometry args={[fanR, 64]} />
          <meshStandardMaterial map={getGrilleTexture()} transparent alphaTest={0.3} roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.004]}>
          <torusGeometry args={[fanR * 1.02, 0.008, 12, 96]} />
          <meshStandardMaterial color="#d5d5d1" roughness={0.4} />
        </mesh>
      </group>

      {/* Ventilationsgaller till höger */}
      <mesh position={[W * 0.33, FOOT + H * 0.47, front + 0.001]}>
        <planeGeometry args={[W * 0.2, H * 0.62]} />
        <meshStandardMaterial map={getLouverTexture()} roughness={0.6} />
      </mesh>

      {/* Isolerade rör ut från högra sidan och ner i marken */}
      {[0, 1].map((i) => {
        const y = FOOT + 0.16 + i * 0.09;
        const z = -0.06 - i * 0.07;
        return (
          <group key={i}>
            <mesh position={[W / 2 + 0.045, y, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.022, 0.022, 0.09, 20]} />
              <meshStandardMaterial color="#1d1e20" roughness={0.75} />
            </mesh>
            <mesh position={[W / 2 + 0.09, y / 2, z]} castShadow>
              <cylinderGeometry args={[0.022, 0.022, y, 20]} />
              <meshStandardMaterial color="#1d1e20" roughness={0.75} />
            </mesh>
            <mesh position={[W / 2 + 0.09, y, z]} castShadow>
              <sphereGeometry args={[0.022, 16, 12]} />
              <meshStandardMaterial color="#1d1e20" roughness={0.75} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export const HEAT_PUMP_SIZE = { width: W, height: H + FOOT, depth: D };
