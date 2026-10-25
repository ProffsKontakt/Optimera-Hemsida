"use client";

import { RoundedBox } from "@react-three/drei";
import { FONT, useCanvasTexture } from "./textures";

/**
 * Easyway (Eway) – vår vanligaste batteristapel, modellerad efter
 * produktbilden: vita moduler på 7,68 kWh med ett nedfällbart metallhandtag
 * på en infälld platta till höger, en högre toppmodul med EASYWAY-loggan,
 * strömknapp och anslutningspanel (brytare, svarta och orange kontakter)
 * och en sockel med två fötter. 53,76 kWh = 7 moduler, max 8 per stapel –
 * större batterier ritas som flera staplar bredvid varandra.
 *
 * Mått i meter. Origo = golvet mitt under stapeln, fronten mot +z.
 */
export const EWAY_MODULE_KWH = 7.68;
const MAX_PER_STACK = 8;

const W = 0.6;
const D = 0.4;
const MODULE_H = 0.17;
const TOP_H = 0.25;
const BASE_H = 0.11;
const GAP = 0.004;

const WHITE = "#F3F3F0";
const SHELL = { color: WHITE, roughness: 0.4, clearcoat: 0.35, clearcoatRoughness: 0.4 } as const;
const CHROME = { color: "#e9e9e9", metalness: 1, roughness: 0.16 } as const;

export function ewayModules(capacityKWh: number) {
  return Math.max(2, Math.round(capacityKWh / EWAY_MODULE_KWH));
}

export function ewayStackHeight(modules: number) {
  return BASE_H + Math.min(modules, MAX_PER_STACK) * MODULE_H + TOP_H;
}

export function EwayBattery({ capacityKWh }: { capacityKWh: number }) {
  const total = ewayModules(capacityKWh);
  const stacks = Math.ceil(total / MAX_PER_STACK);
  const per = Math.ceil(total / stacks);
  const gap = 0.07;
  const totalW = stacks * W + (stacks - 1) * gap;
  return (
    <group>
      {Array.from({ length: stacks }).map((_, s) => (
        <group key={s} position={[-totalW / 2 + W / 2 + s * (W + gap), 0, 0]}>
          <EwayStack modules={s === stacks - 1 ? total - per * (stacks - 1) : per} />
        </group>
      ))}
    </group>
  );
}

function EwayStack({ modules }: { modules: number }) {
  const logo = useCanvasTexture("eway-logo", 512, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#5a5f66";
    // Ikonen: cirkel med ett stiliserat löv/blixt
    ctx.beginPath();
    ctx.arc(h * 0.42, h * 0.46, h * 0.27, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#F3F3F0";
    ctx.beginPath();
    ctx.moveTo(h * 0.33, h * 0.62);
    ctx.quadraticCurveTo(h * 0.36, h * 0.3, h * 0.56, h * 0.28);
    ctx.quadraticCurveTo(h * 0.5, h * 0.52, h * 0.33, h * 0.62);
    ctx.fill();
    ctx.fillStyle = "#4b5057";
    ctx.font = `600 60px ${FONT}`;
    ctx.textBaseline = "middle";
    ctx.fillText("EASYWAY", h * 0.82, h * 0.44);
    ctx.font = `500 20px ${FONT}`;
    ctx.fillStyle = "#8b9097";
    ctx.fillText("E N E R G Y", h * 1.55, h * 0.84);
  });

  const moduleBase = BASE_H;
  const topY = BASE_H + modules * MODULE_H;

  return (
    <group>
      {/* Inre kärna så att skarvarna mellan modulerna blir mörka linjer */}
      <mesh position={[0, (BASE_H + topY + TOP_H) / 2, 0]}>
        <boxGeometry args={[W - 0.03, topY + TOP_H - BASE_H, D - 0.03]} />
        <meshStandardMaterial color="#9a9c9f" roughness={0.8} />
      </mesh>

      {/* Sockel med två fötter */}
      <RoundedBox args={[W + 0.012, 0.05, D + 0.012]} radius={0.01} smoothness={3} position={[0, BASE_H - 0.03, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial {...SHELL} color="#ECECE9" />
      </RoundedBox>
      {[-1, 1].map((side) => (
        <RoundedBox key={side} args={[0.13, 0.07, D]} radius={0.012} smoothness={3} position={[side * (W / 2 - 0.07), 0.035, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial {...SHELL} color="#E8E8E5" />
        </RoundedBox>
      ))}

      {/* Batterimoduler */}
      {Array.from({ length: modules }).map((_, i) => (
        <group key={i} position={[0, moduleBase + MODULE_H / 2 + i * MODULE_H, 0]}>
          <RoundedBox args={[W, MODULE_H - GAP, D]} radius={0.012} smoothness={4} castShadow receiveShadow>
            <meshPhysicalMaterial {...SHELL} />
          </RoundedBox>
          <Handle />
        </group>
      ))}

      {/* Toppmodul: logga, strömknapp och anslutningspanel */}
      <group position={[0, topY + TOP_H / 2, 0]}>
        <RoundedBox args={[W, TOP_H - GAP, D]} radius={0.014} smoothness={4} castShadow receiveShadow>
          <meshPhysicalMaterial {...SHELL} />
        </RoundedBox>
        <mesh position={[-0.02, TOP_H * 0.2, D / 2 + 0.0008]}>
          <planeGeometry args={[0.25, 0.0625]} />
          <meshBasicMaterial map={logo} transparent toneMapped={false} />
        </mesh>
        {/* Strömknapp uppe till vänster med grön ring */}
        <group position={[-W / 2 + 0.035, TOP_H * 0.26, D / 2 + 0.001]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.011, 0.011, 0.004, 32]} />
            <meshStandardMaterial color="#d9d9d6" roughness={0.3} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.0022]}>
            <torusGeometry args={[0.009, 0.0016, 8, 32]} />
            <meshStandardMaterial color="#5fbf6a" emissive="#5fbf6a" emissiveIntensity={1.2} />
          </mesh>
        </group>
        <ConnectorPanel />
      </group>
    </group>
  );
}

/** Nedfällbart handtag på infälld platta, till höger på varje modul. */
function Handle() {
  const x = 0.205;
  const z = D / 2;
  return (
    <group position={[x, 0, z]}>
      <RoundedBox args={[0.085, 0.12, 0.004]} radius={0.006} smoothness={3} position={[0, 0, -0.0012]}>
        <meshStandardMaterial color="#E1E2E1" roughness={0.5} />
      </RoundedBox>
      {/* Gångjärnsfäste upptill */}
      <mesh position={[0, 0.043, 0.006]} castShadow>
        <boxGeometry args={[0.072, 0.012, 0.01]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>
      {/* Armar */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.033, 0.006, 0.009]} castShadow>
          <boxGeometry args={[0.006, 0.07, 0.006]} />
          <meshStandardMaterial {...CHROME} />
        </mesh>
      ))}
      {/* Grepp */}
      <mesh position={[0, -0.031, 0.011]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.0075, 0.0075, 0.074, 20]} />
        <meshStandardMaterial color="#1c1c1c" roughness={0.6} />
      </mesh>
    </group>
  );
}

/** Anslutningspanelen uppe till höger: brytare, nätverksportar, DC-kontakter. */
function ConnectorPanel() {
  const z = D / 2;
  return (
    <group position={[0.205, -TOP_H * 0.04, z]}>
      <RoundedBox args={[0.15, 0.17, 0.006]} radius={0.006} smoothness={3} position={[0, 0, -0.002]}>
        <meshStandardMaterial color="#E6E7E6" roughness={0.55} />
      </RoundedBox>
      {/* Brytare med genomskinlig lucka */}
      <group position={[-0.03, 0.032, 0.006]}>
        <RoundedBox args={[0.068, 0.085, 0.012]} radius={0.004} smoothness={3} castShadow>
          <meshStandardMaterial color="#3a3d40" roughness={0.45} />
        </RoundedBox>
        {[-0.018, 0, 0.018].map((x) => (
          <mesh key={x} position={[x, 0.004, 0.0075]}>
            <boxGeometry args={[0.009, 0.024, 0.006]} />
            <meshStandardMaterial color="#111" roughness={0.4} />
          </mesh>
        ))}
        <mesh position={[0, 0, 0.0115]}>
          <planeGeometry args={[0.062, 0.078]} />
          <meshPhysicalMaterial color="#cfd8dc" transparent opacity={0.18} roughness={0.05} clearcoat={1} />
        </mesh>
      </group>
      {/* Nätverksportar */}
      {[-0.045, -0.015].map((x) => (
        <mesh key={x} position={[x, -0.052, 0.004]}>
          <boxGeometry args={[0.022, 0.02, 0.008]} />
          <meshStandardMaterial color="#141414" roughness={0.5} />
        </mesh>
      ))}
      {/* DC-kontakter: orange (+) och svart (−) */}
      <mesh position={[0.045, 0.052, 0.008]} castShadow>
        <boxGeometry args={[0.03, 0.028, 0.016]} />
        <meshStandardMaterial color="#e2672a" roughness={0.45} />
      </mesh>
      <mesh position={[0.02, 0.052, 0.008]} castShadow>
        <boxGeometry args={[0.018, 0.028, 0.016]} />
        <meshStandardMaterial color="#151515" roughness={0.45} />
      </mesh>
      <mesh position={[0.045, 0.005, 0.008]} castShadow>
        <boxGeometry args={[0.024, 0.026, 0.016]} />
        <meshStandardMaterial color="#151515" roughness={0.45} />
      </mesh>
    </group>
  );
}
