"use client";

import { RoundedBox } from "@react-three/drei";
import { FONT, useCanvasTexture } from "./textures";

/**
 * Enershare Energy Core – högspänningsstack i ljusgrått, modellerad efter
 * produktbilden på 16 kWh: en BMS-del överst med LCD-display och den gröna
 * ENERSHARE-loggan, batterimoduler på 3,2 kWh med ett ventilationsgaller
 * till vänster, en låg sockel med fyra justerbara fötter och kontakter på
 * vänster sida. Ett torn rymmer 3–8 moduler (9,6–25,6 kWh); större batterier
 * ritas som flera torn bredvid varandra.
 *
 * Mått i meter: 650 × 260 mm i fotavtryck och 175 mm per modul enligt
 * återförsäljarnas datablad (5 moduler = 1 150 mm). Origo = golvet mitt
 * under tornet, fronten mot +z.
 */
export const ENERSHARE_MODULE_KWH = 3.2;
export const ENERSHARE_MAX_PER_TOWER = 8;

const W = 0.65;
const D = 0.26;
const MODULE_H = 0.175;
const BMS_H = 0.17;
const PLINTH_H = 0.065;
const FEET_H = 0.025;
const BASE_H = PLINTH_H + FEET_H;
const GAP = 0.004;

const GREY = { color: "#E3E4E5", roughness: 0.5, metalness: 0.15, clearcoat: 0.2, clearcoatRoughness: 0.5 } as const;

export function enershareModules(capacityKWh: number) {
  return Math.max(3, Math.round(capacityKWh / ENERSHARE_MODULE_KWH));
}

export function enershareTowerHeight(modules: number) {
  return BASE_H + Math.min(modules, ENERSHARE_MAX_PER_TOWER) * MODULE_H + BMS_H;
}

export function EnershareCore({ capacityKWh }: { capacityKWh: number }) {
  const total = enershareModules(capacityKWh);
  const towers = Math.ceil(total / ENERSHARE_MAX_PER_TOWER);
  const per = Math.ceil(total / towers);
  const gap = 0.08;
  const totalW = towers * W + (towers - 1) * gap;
  return (
    <group>
      {Array.from({ length: towers }).map((_, t) => (
        <group key={t} position={[-totalW / 2 + W / 2 + t * (W + gap), 0, 0]}>
          <Tower modules={t === towers - 1 ? total - per * (towers - 1) : per} />
        </group>
      ))}
    </group>
  );
}

function Tower({ modules }: { modules: number }) {
  const vent = useCanvasTexture("enershare-vent", 128, 128, (ctx, w, h) => {
    ctx.fillStyle = "#d9dadb";
    ctx.fillRect(0, 0, w, h);
    for (let x = 5; x < w; x += 8) {
      ctx.fillStyle = "#9c9fa2";
      ctx.fillRect(x, 8, 3, h - 16);
      ctx.fillStyle = "#f1f2f3";
      ctx.fillRect(x + 3, 8, 1, h - 16);
    }
  });
  const logo = useCanvasTexture("enershare-logo", 512, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    // Svepande båge över texten
    ctx.strokeStyle = "#3d9a52";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.ellipse(w * 0.36, h * 0.6, w * 0.3, h * 0.38, 0, Math.PI * 1.08, Math.PI * 1.75);
    ctx.stroke();
    ctx.fillStyle = "#3d9a52";
    ctx.font = `700 60px ${FONT}`;
    ctx.textBaseline = "middle";
    ctx.fillText("ENERSHARE", 10, h * 0.62);
  });
  const screen = useCanvasTexture("enershare-lcd", 256, 200, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#1f4fb8");
    g.addColorStop(1, "#16388a");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // Batterisymbol
    ctx.strokeStyle = "#e9f1ff";
    ctx.lineWidth = 5;
    ctx.strokeRect(34, 40, 52, 104);
    ctx.fillStyle = "#e9f1ff";
    ctx.fillRect(48, 30, 24, 10);
    ctx.fillStyle = "#58d36e";
    ctx.fillRect(42, 70, 36, 66);
    ctx.fillStyle = "#e9f1ff";
    ctx.font = `600 22px ${FONT}`;
    ctx.fillText("SOC 82%", 108, 80);
    ctx.font = `500 18px ${FONT}`;
    ctx.fillText("320.4 V", 108, 112);
    ctx.fillText("Standby", 108, 140);
  });

  const topY = BASE_H + modules * MODULE_H;
  const z = D / 2 + 0.0008;

  return (
    <group>
      <mesh position={[0, (BASE_H + topY + BMS_H) / 2, 0]}>
        <boxGeometry args={[W - 0.02, topY + BMS_H - BASE_H, D - 0.02]} />
        <meshStandardMaterial color="#8b8e91" roughness={0.8} />
      </mesh>

      {/* Sockel och justerbara fötter */}
      <RoundedBox args={[W, PLINTH_H, D]} radius={0.006} smoothness={3} position={[0, FEET_H + PLINTH_H / 2, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial {...GREY} color="#d6d7d8" />
      </RoundedBox>
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => (
          <mesh key={`${sx}${sz}`} position={[sx * (W / 2 - 0.05), FEET_H / 2, sz * (D / 2 - 0.045)]} castShadow>
            <cylinderGeometry args={[0.014, 0.018, FEET_H, 16]} />
            <meshStandardMaterial color="#6f7377" metalness={0.6} roughness={0.4} />
          </mesh>
        )),
      )}

      {/* Batterimoduler med ventilationsgaller till vänster */}
      {Array.from({ length: modules }).map((_, i) => (
        <group key={i} position={[0, BASE_H + MODULE_H / 2 + i * MODULE_H, 0]}>
          <RoundedBox args={[W, MODULE_H - GAP, D]} radius={0.006} smoothness={3} castShadow receiveShadow>
            <meshPhysicalMaterial {...GREY} />
          </RoundedBox>
          <mesh position={[-W / 2 + W * 0.18, 0, z]}>
            <planeGeometry args={[W * 0.3, MODULE_H * 0.82]} />
            <meshStandardMaterial map={vent} roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* BMS med display och logga */}
      <group position={[0, topY + BMS_H / 2, 0]}>
        <RoundedBox args={[W, BMS_H - GAP, D]} radius={0.006} smoothness={3} castShadow receiveShadow>
          <meshPhysicalMaterial {...GREY} color="#e7e8e9" />
        </RoundedBox>
        <mesh position={[-W / 2 + W * 0.18, 0, z]}>
          <planeGeometry args={[W * 0.3, BMS_H * 0.82]} />
          <meshStandardMaterial map={vent} roughness={0.6} />
        </mesh>
        {/* LCD i svart ram */}
        <RoundedBox args={[0.1, 0.09, 0.008]} radius={0.004} smoothness={2} position={[-W / 2 + W * 0.14, 0.012, D / 2]}>
          <meshStandardMaterial color="#141516" roughness={0.4} />
        </RoundedBox>
        <mesh position={[-W / 2 + W * 0.14, 0.018, D / 2 + 0.0045]}>
          <planeGeometry args={[0.084, 0.064]} />
          <meshBasicMaterial map={screen} toneMapped={false} />
        </mesh>
        {[-0.022, 0, 0.022].map((x) => (
          <mesh key={x} position={[-W / 2 + W * 0.14 + x, -0.024, D / 2 + 0.0045]}>
            <circleGeometry args={[0.004, 12]} />
            <meshStandardMaterial color="#cfd2d6" />
          </mesh>
        ))}
        <mesh position={[W * 0.26, BMS_H * 0.22, z]}>
          <planeGeometry args={[0.15, 0.0375]} />
          <meshBasicMaterial map={logo} transparent toneMapped={false} />
        </mesh>
        {/* Kontakter på vänster sida */}
        {[0.03, -0.01].map((y) => (
          <mesh key={y} position={[-W / 2 - 0.008, y, 0.03]} castShadow>
            <boxGeometry args={[0.016, 0.026, 0.026]} />
            <meshStandardMaterial color="#1b1c1e" roughness={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
