"use client";

import { RoundedBox } from "@react-three/drei";

/**
 * Hybridväxelriktare (t.ex. Solis S6 eller Solinteg) – vit väggmonterad
 * enhet med mörk glasfront, display, statuslampor, kylflänsar på sidorna
 * och kabelgenomföringar i botten.
 *
 * Mått i meter (ca 480 × 620 × 220 mm). Origo = mitt på baksidan (mot
 * väggen), fronten mot +z.
 */
const W = 0.48;
const H = 0.62;
const D = 0.22;

export function HybridInverter() {
  return (
    <group>
      <RoundedBox args={[W, H, D]} radius={0.025} smoothness={4} position={[0, 0, D / 2]} castShadow receiveShadow>
        <meshPhysicalMaterial color="#F2F2EF" roughness={0.4} clearcoat={0.3} />
      </RoundedBox>
      {/* Mörk glasfront */}
      <RoundedBox args={[W * 0.78, H * 0.42, 0.01]} radius={0.012} smoothness={3} position={[0, H * 0.14, D + 0.002]}>
        <meshPhysicalMaterial color="#141619" roughness={0.12} clearcoat={1} metalness={0.2} />
      </RoundedBox>
      {/* Display */}
      <mesh position={[-W * 0.12, H * 0.17, D + 0.0075]}>
        <planeGeometry args={[W * 0.3, H * 0.12]} />
        <meshStandardMaterial color="#0d2b3a" emissive="#2d7fa6" emissiveIntensity={0.55} roughness={0.2} />
      </mesh>
      {/* Statuslampor */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[W * 0.18 + i * 0.03, H * 0.17, D + 0.0078]}>
          <circleGeometry args={[0.007, 20]} />
          <meshStandardMaterial color="#5fbf6a" emissive="#5fbf6a" emissiveIntensity={i === 2 ? 0.2 : 1.3} />
        </mesh>
      ))}
      {/* Kylflänsar på sidorna */}
      {[-1, 1].map((s) =>
        Array.from({ length: 7 }).map((_, i) => (
          <mesh key={`${s}${i}`} position={[s * (W / 2 + 0.006), -H * 0.3 + i * H * 0.1, D * 0.45]} castShadow>
            <boxGeometry args={[0.012, H * 0.05, D * 0.7]} />
            <meshStandardMaterial color="#c9cbcc" metalness={0.5} roughness={0.4} />
          </mesh>
        )),
      )}
      {/* Kabelgenomföringar */}
      {[-0.15, -0.08, 0, 0.08, 0.15].map((x) => (
        <mesh key={x} position={[x, -H / 2 - 0.012, D * 0.55]} castShadow>
          <cylinderGeometry args={[0.012, 0.014, 0.03, 16]} />
          <meshStandardMaterial color="#1b1b1b" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export const HYBRID_INVERTER_SIZE = { width: W, height: H, depth: D };
