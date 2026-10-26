"use client";

import { Canvas } from "@react-three/fiber";
import { Bounds, PresentationControls, RoundedBox } from "@react-three/drei";
import type { ServiceSlug } from "@/lib/services";
import { SceneLabel } from "./SceneLabel";
import { ZaptecGo2 } from "./products/ZaptecGo2";
import { EwayBattery, ewayModules, ewayStackHeight } from "./products/EwayBattery";
import { SolarPanel, PANEL_W } from "./products/SolarPanel";
import { HeatPump } from "./products/HeatPump";
import { StudioFloor, StudioLights, Sway } from "./products/Studio";
import { makeCanvasTexture } from "./products/textures";
import { useMemo } from "react";

/**
 * Produktscenen på tjänstekorten och tjänstesidorna. Visar de produkter vi
 * faktiskt installerar, modellerade efter produktbilderna (se ./products),
 * i ett ljust produktfotoljus. Kameran anpassas automatiskt till kortets
 * format (Bounds) så samma scen fungerar i 4:5 och 16:10.
 */
const BATTERY_KWH = 53.76; // 7 Easyway-moduler, som på produktbilden

export function ServiceVignette({ kind }: { kind: ServiceSlug }) {
  return (
    <Canvas
      shadows
      camera={{ position: [2.4, 1.3, 3.6], fov: 30 }}
      dpr={[1, 2]}
      className="!absolute inset-0"
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={[backgroundFor(kind)]} />
      <StudioLights />
      <PresentationControls
        global={false}
        cursor
        snap
        speed={1.4}
        polar={[-0.12, 0.2]}
        azimuth={[-0.7, 0.7]}
      >
        <Bounds fit clip observe margin={kind === "solpaneler" ? 1.02 : 1.08}>
          {kind === "laddboxar" && <ChargerScene />}
          {kind === "batterier" && <BatteryScene />}
          {kind === "solpaneler" && <SolarScene />}
          {kind === "vaermepumpar" && <HeatPumpScene />}
        </Bounds>
      </PresentationControls>
      {/* Golvskuggan ligger utanför Bounds så att den inte räknas in när
          kameran anpassas till produkten. */}
      <StudioFloor {...FLOOR[kind]} />
    </Canvas>
  );
}

const FLOOR: Record<ServiceSlug, { y: number; scale: number; opacity: number }> = {
  laddboxar: { y: -0.9, scale: 3.2, opacity: 0.35 },
  batterier: { y: -0.775, scale: 3, opacity: 0.5 },
  solpaneler: { y: -0.6, scale: 4, opacity: 0.3 },
  vaermepumpar: { y: -0.45, scale: 3.2, opacity: 0.45 },
};

function backgroundFor(kind: ServiceSlug) {
  // Varma cream-toner som matchar korten på sajten.
  switch (kind) {
    case "solpaneler":
      return "#EFE6CF";
    case "batterier":
      return "#ECE6D8";
    case "vaermepumpar":
      return "#E6E1D5";
    case "laddboxar":
      return "#EBE5D7";
  }
}

/** Zaptec Go 2 på en väggskiva – laddboxen som den sitter hemma. */
function ChargerScene() {
  const s = 4.2;
  const wallW = 1.25;
  const wallH = 1.7;
  const chargerY = 0.12;
  return (
    <Sway amplitude={0.3} baseYaw={-0.42}>
      <group position={[0, -0.05, 0]}>
        <RoundedBox args={[wallW, wallH, 0.08]} radius={0.02} smoothness={3} position={[0, 0, -0.04]} receiveShadow castShadow>
          <meshStandardMaterial color="#E3DCCD" roughness={0.92} />
        </RoundedBox>
        <group position={[0, chargerY, 0]} scale={s}>
          <ZaptecGo2 />
        </group>
      </group>
    </Sway>
  );
}

/** Easyway 53,76 kWh, fristående på golvet. */
function BatteryScene() {
  const h = ewayStackHeight(ewayModules(BATTERY_KWH));
  return (
    <group position={[0, -h / 2, 0]}>
      {/* Fronten (logga, ON/OFF) mot kameran och högra kortsidan med
          handtag och anslutningspanel synlig – som på produktbilden. */}
      <Sway amplitude={0.25} baseYaw={-0.2}>
        <EwayBattery capacityKWh={BATTERY_KWH} />
      </Sway>
      <SceneLabel parts={["Eway", "53,76 kWh", "7 moduler"]} position={[0.5, 0.05, 0.25]} />
    </group>
  );
}

/** Tre helsvarta JA Solar-paneler på ett tegeltak. */
function SolarScene() {
  const tiles = useMemo(
    () =>
      makeCanvasTexture(256, 256, (ctx, w, h) => {
        ctx.fillStyle = "#2c2f33";
        ctx.fillRect(0, 0, w, h);
        const rows = 6;
        const cols = 4;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = (c + (r % 2) * 0.5) * (w / cols);
            const y = r * (h / rows);
            const g = ctx.createLinearGradient(0, y, 0, y + h / rows);
            g.addColorStop(0, "#41454a");
            g.addColorStop(0.7, "#33363a");
            g.addColorStop(1, "#1d1f22");
            ctx.fillStyle = g;
            ctx.fillRect(x + 1, y + 1, w / cols - 2, h / rows - 2);
            ctx.fillRect(x + 1 - w, y + 1, w / cols - 2, h / rows - 2);
          }
        }
      }, { repeat: [5, 4] }),
    [],
  );
  const roofW = 4.6;
  const roofD = 2.9;
  const pitch = 0.47; // ~27°
  const gap = 0.025;
  return (
    <Sway amplitude={0.22} baseYaw={-0.3} speed={0.25}>
      <group rotation={[pitch, 0, 0]} scale={0.62}>
        {/* Takyta */}
        <mesh receiveShadow castShadow position={[0, -0.06, 0]}>
          <boxGeometry args={[roofW, 0.1, roofD]} />
          <meshStandardMaterial color="#2c2f32" roughness={0.85} />
        </mesh>
        <mesh position={[0, -0.009, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[roofW, roofD]} />
          <meshStandardMaterial map={tiles} roughness={0.8} />
        </mesh>
        {/* Skenor */}
        {[-0.55, 0.55].map((z) => (
          <mesh key={z} position={[0, 0.03, z]} castShadow>
            <boxGeometry args={[PANEL_W * 3 + 0.16, 0.04, 0.045]} />
            <meshStandardMaterial color="#9aa0a6" metalness={0.8} roughness={0.35} />
          </mesh>
        ))}
        {/* Paneler */}
        {[-1, 0, 1].map((i) => (
          <group key={i} position={[i * (PANEL_W + gap), 0.085, 0]}>
            <SolarPanel />
          </group>
        ))}
        {/* Klämmor mellan panelerna */}
        {[-1.5, -0.5, 0.5, 1.5].map((i) =>
          [-0.55, 0.55].map((z) => (
            <mesh key={`${i}${z}`} position={[i * (PANEL_W + gap), 0.11, z]} castShadow>
              <boxGeometry args={[0.04, 0.025, 0.07]} />
              <meshStandardMaterial color="#121314" metalness={0.5} roughness={0.4} />
            </mesh>
          )),
        )}
      </group>
    </Sway>
  );
}

/** Luft-vattenvärmepump på betongplintar. */
function HeatPumpScene() {
  return (
    <group position={[0, -0.45, 0]}>
      <Sway amplitude={0.32} baseYaw={-0.45}>
        <mesh position={[0, 0.03, 0]} receiveShadow castShadow>
          <boxGeometry args={[1.35, 0.06, 0.62]} />
          <meshStandardMaterial color="#bdb9b0" roughness={0.95} />
        </mesh>
        <group position={[0, 0.06, 0]}>
          <HeatPump />
        </group>
      </Sway>
    </group>
  );
}

