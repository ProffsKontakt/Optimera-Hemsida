"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { SolarPanel } from "./products/SolarPanel";
import { EwayBattery } from "./products/EwayBattery";
import { ZaptecGo2 } from "./products/ZaptecGo2";
import { HeatPump as HeatPumpModel } from "./products/HeatPump";
import { HybridInverter } from "./products/HybridInverter";
import { StudioLights } from "./products/Studio";

/**
 * HeroLab
 *
 * Statisk "showcase project"-scen på startsidan: en hel villa i Bromma
 * med solpaneler, batteri, laddbox, växelriktare och värmepump
 * installerade. Tidigare visade hero tre svävande produkter på en grid,
 * vilket inte gav någon kontext. Nu visar vi vad ett färdigt projekt
 * faktiskt ser ut.
 *
 * Geometrin är medvetet enkel (boxGeometry + shapeGeometry, ingen GLB)
 * så bundle-storleken hålls låg. R3F + Three.js lazy-laddas redan via
 * next/dynamic i Hero.tsx.
 */

// Husmått, samma skala som CalcScene men något mindre för att passa
// hero-card-aspect (4/5 portrait).
const HOUSE = {
  width: 3.0,
  depth: 2.2,
  wallH: 0.95,
  ridgeH: 0.85,
};
const WALL_TOP_Y = HOUSE.wallH / 2;
const SLOPE_RUN = HOUSE.depth / 2;
const SLOPE_ANGLE = Math.atan2(HOUSE.ridgeH, SLOPE_RUN);
const SLOPE_LEN = Math.hypot(SLOPE_RUN, HOUSE.ridgeH);
const SLOPE_Y = WALL_TOP_Y + HOUSE.ridgeH / 2;
const GABLE_X = HOUSE.width / 2 + 0.18;
const GROUND_Y = -HOUSE.wallH / 2;

const WALL_COLOR = "#F4F1EA";
const ROOF_COLOR = "#3F5236";

export function HeroLab() {
  return (
    <Canvas
      camera={{ position: [4.6, 3.2, 5.4], fov: 36 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      shadows
      className="!absolute inset-0"
    >
      <color attach="background" args={["#EFE9DC"]} />
      <StudioLights envIntensity={0.45} keyIntensity={1.35} />

      <Grid
        position={[0, GROUND_Y, 0]}
        args={[20, 20]}
        cellSize={0.4}
        cellThickness={0.55}
        cellColor="#9aa590"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#3F5236"
        fadeDistance={11}
        fadeStrength={1}
        infiniteGrid
      />

      <House />
      <RoofPanels />
      <BatteryStack />
      <Charger />
      <HeatPump />
      <Inverter />

      {/* Mild auto-rotate så scenen lever. OrbitControls låter användaren
          ta tag i den om dom vill. */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.6}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}

// ============= HUS =============

function House() {
  const w = HOUSE.width;
  const d = HOUSE.depth;
  const h = HOUSE.wallH;
  const ridge = HOUSE.ridgeH;
  return (
    <group>
      {/* Väggvolym */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.85} />
      </mesh>

      {/* Sadeltakets två gavel-trianglar (öster + väster) */}
      {[1, -1].map((sign) => (
        <mesh
          key={sign}
          position={[(sign * w) / 2 + sign * 0.002, WALL_TOP_Y, 0]}
          rotation={[0, (sign * Math.PI) / 2, 0]}
        >
          <shapeGeometry args={[gableShape(d, ridge)]} />
          <meshStandardMaterial color={WALL_COLOR} roughness={0.85} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Två takfall, sadel */}
      {[1, -1].map((sign) => (
        <mesh
          key={sign}
          position={[0, SLOPE_Y, (sign * d) / 4]}
          rotation={[sign * SLOPE_ANGLE, 0, 0]}
          castShadow
        >
          <boxGeometry args={[w + 0.12, 0.05, SLOPE_LEN + 0.05]} />
          <meshStandardMaterial color={ROOF_COLOR} roughness={0.7} />
        </mesh>
      ))}

      {/* Dörr på +z-fasaden */}
      <mesh position={[0, -0.18, d / 2 + 0.005]}>
        <planeGeometry args={[0.42, 0.62]} />
        <meshStandardMaterial color="#1A1A17" />
      </mesh>
      {/* Trösskel */}
      <mesh position={[0, -0.49, d / 2 + 0.006]}>
        <planeGeometry args={[0.5, 0.04]} />
        <meshStandardMaterial color="#0E0E0C" />
      </mesh>

      {/* Två fönster på +z-fasaden, ett på vardera sida om dörren */}
      <Window position={[-0.92, 0.05, d / 2 + 0.005]} />
      <Window position={[0.92, 0.05, d / 2 + 0.005]} />

      {/* Förstugutak ovan dörren */}
      <mesh position={[0, 0.18, d / 2 + 0.16]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.7, 0.04, 0.32]} />
        <meshStandardMaterial color={ROOF_COLOR} roughness={0.7} />
      </mesh>
    </group>
  );
}

function gableShape(base: number, ridgeHeight: number) {
  const s = new THREE.Shape();
  s.moveTo(-base / 2, 0);
  s.lineTo(base / 2, 0);
  s.lineTo(0, ridgeHeight);
  s.lineTo(-base / 2, 0);
  return s;
}

function Window({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.MeshStandardMaterial>(null);
  // Diskret pulserande inifrån-glow så husets fönster känns levande.
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.emissiveIntensity =
        0.32 + Math.sin(clock.elapsedTime * 0.6) * 0.08;
    }
  });
  return (
    <group position={position}>
      <mesh>
        <planeGeometry args={[0.48, 0.4]} />
        <meshStandardMaterial
          ref={ref}
          color="#E9B949"
          emissive="#E9B949"
          emissiveIntensity={0.35}
        />
      </mesh>
      {/* Spröjs som mörkt kors */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[0.48, 0.012]} />
        <meshStandardMaterial color="#1A1A17" />
      </mesh>
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[0.012, 0.4]} />
        <meshStandardMaterial color="#1A1A17" />
      </mesh>
    </group>
  );
}

// ============= SOLPANELER =============

function RoofPanels() {
  // 3 rader x 4 kolumner = 12 helsvarta JA Solar-paneler på södra takfallet (+z).
  const cols = 4;
  const rows = 3;
  const panelW = (HOUSE.width - 0.6) / cols;
  const panelD = panelW * (1134 / 1953); // standard panel-aspect
  return (
    <group position={[0, SLOPE_Y, HOUSE.depth / 4]} rotation={[SLOPE_ANGLE, 0, 0]}>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((__, c) => {
          const x = (c - (cols - 1) / 2) * panelW;
          const z = (r - (rows - 1) / 2) * panelD;
          return (
            <group key={`${r}-${c}`} position={[x, 0.04, z]} rotation={[0, Math.PI / 2, 0]}>
              <SolarPanel width={panelD * 0.95} length={panelW * 0.96} thickness={0.04} />
            </group>
          );
        }),
      )}
    </group>
  );
}

/** Easyway-batteriet mot gaveln, fronten utåt. */
function BatteryStack() {
  return (
    <group position={[HOUSE.width / 2 + 0.12, GROUND_Y, -0.4]} rotation={[0, Math.PI / 2, 0]}>
      <group scale={0.5}>
        <EwayBattery capacityKWh={23.04} />
      </group>
    </group>
  );
}

/** Zaptec Go 2 på gaveln. */
function Charger() {
  return (
    <group position={[HOUSE.width / 2, GROUND_Y + 0.5, 0.5]} rotation={[0, Math.PI / 2, 0]}>
      <group scale={1.3}>
        <ZaptecGo2 />
      </group>
    </group>
  );
}

/** Luft-vattenvärmepumpens utedel vid gaveln. */
function HeatPump() {
  return (
    <group position={[GABLE_X + 0.55, GROUND_Y, 0.55]}>
      <group scale={0.55}>
        <HeatPumpModel />
      </group>
    </group>
  );
}

/** Hybridväxelriktaren på gaveln. */
function Inverter() {
  return (
    <group position={[HOUSE.width / 2, GROUND_Y + 0.62, -0.05]} rotation={[0, Math.PI / 2, 0]}>
      <group scale={0.45}>
        <HybridInverter />
      </group>
    </group>
  );
}
