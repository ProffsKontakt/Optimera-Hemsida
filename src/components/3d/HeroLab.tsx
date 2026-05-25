"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

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
const TRIM_COLOR = "#cdd3df";

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
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[5, 6, 3]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-3, 2, -3]} intensity={0.25} color="#E9B949" />

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
  // 3 rader x 4 kolumner = 12 paneler på södra takfallet (+z).
  const cols = 4;
  const rows = 3;
  const panelW = (HOUSE.width - 0.6) / cols;
  const panelD = panelW * (1134 / 1953); // standard panel-aspect
  return (
    <group
      position={[0, SLOPE_Y, HOUSE.depth / 4]}
      rotation={[SLOPE_ANGLE, 0, 0]}
    >
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((__, c) => {
          const x = (c - (cols - 1) / 2) * panelW;
          const z = (r - (rows - 1) / 2) * panelD;
          return (
            <group key={`${r}-${c}`} position={[x, 0.04, z]}>
              <mesh castShadow>
                <boxGeometry args={[panelW * 0.92, 0.04, panelD * 0.92]} />
                <meshStandardMaterial color="#0E0E0C" />
              </mesh>
              <mesh position={[0, 0.026, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[panelW * 0.85, panelD * 0.85]} />
                <meshStandardMaterial
                  color="#0a2a44"
                  emissive="#0a3a4e"
                  emissiveIntensity={0.16}
                  metalness={0.85}
                  roughness={0.18}
                />
              </mesh>
              {/* Cellrutnät */}
              <mesh position={[0, 0.027, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[panelW * 0.85, 0.005]} />
                <meshStandardMaterial color="#1f3a55" />
              </mesh>
              <mesh position={[0, 0.027, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.005, panelD * 0.85]} />
                <meshStandardMaterial color="#1f3a55" />
              </mesh>
            </group>
          );
        }),
      )}
    </group>
  );
}

// ============= BATTERI (Easyway-stack mot östra gaveln) =============

function BatteryStack() {
  const modules = 3;
  const moduleH = 0.16;
  const w = 0.42;
  const d = 0.34;
  const baseH = 0.07;
  return (
    <group position={[GABLE_X + 0.16, GROUND_Y + 0.02, -0.4]}>
      {/* Bottenchassi */}
      <mesh position={[0, baseH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w + 0.06, baseH, d + 0.06]} />
        <meshStandardMaterial color={TRIM_COLOR} roughness={0.6} />
      </mesh>
      {/* 3 batterimoduler */}
      {Array.from({ length: modules }).map((_, i) => (
        <group key={i} position={[0, baseH + moduleH / 2 + i * moduleH, 0]}>
          <mesh castShadow>
            <boxGeometry args={[w, moduleH * 0.94, d]} />
            <meshStandardMaterial color="#F4F1EA" roughness={0.6} />
          </mesh>
          {i % 2 === 0 && (
            <mesh position={[w / 4, -moduleH / 6, d / 2 + 0.003]}>
              <boxGeometry args={[w * 0.28, 0.035, 0.02]} />
              <meshStandardMaterial color="#1A1A17" />
            </mesh>
          )}
        </group>
      ))}
      {/* Topp-modul (BMS) */}
      <group position={[0, baseH + modules * moduleH + 0.06, 0]}>
        <mesh castShadow>
          <boxGeometry args={[w, 0.12, d]} />
          <meshStandardMaterial color="#F4F1EA" roughness={0.55} />
        </mesh>
        <mesh position={[0, 0, d / 2 + 0.003]}>
          <planeGeometry args={[w * 0.55, 0.07]} />
          <meshStandardMaterial color="#0E0E0C" />
        </mesh>
        <StatusLED />
      </group>
    </group>
  );
}

function StatusLED() {
  const ref = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.emissiveIntensity =
        0.5 + Math.sin(clock.elapsedTime * 1.6) * 0.3;
    }
  });
  return (
    <mesh position={[-0.12, 0.012, 0.18]}>
      <boxGeometry args={[0.025, 0.025, 0.005]} />
      <meshStandardMaterial
        ref={ref}
        color="#3F5236"
        emissive="#3F5236"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

// ============= LADDBOX (Easee-stil på östra gaveln) =============

function Charger() {
  return (
    <group position={[GABLE_X - 0.04, 0.18, 0.45]}>
      <mesh castShadow>
        <boxGeometry args={[0.04, 0.36, 0.22]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.5} />
      </mesh>
      <mesh position={[0.022, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.18, 0.32]} />
        <meshStandardMaterial color="#0E0E0C" />
      </mesh>
      <ChargerLED />
      {/* Kabel-spiral */}
      <mesh position={[0.05, -0.22, 0]} rotation={[0, 0, 0.4]} castShadow>
        <torusGeometry args={[0.06, 0.012, 8, 24]} />
        <meshStandardMaterial color="#1A1A17" roughness={0.5} />
      </mesh>
    </group>
  );
}

function ChargerLED() {
  const ref = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.emissiveIntensity =
        0.6 + Math.sin(clock.elapsedTime * 2.2) * 0.25;
    }
  });
  return (
    <mesh position={[0.024, 0.08, 0]} rotation={[0, Math.PI / 2, 0]}>
      <circleGeometry args={[0.018, 16]} />
      <meshStandardMaterial
        ref={ref}
        color="#3648C3"
        emissive="#3648C3"
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}

// ============= VÄRMEPUMP (utomhusdel bredvid huset) =============

function HeatPump() {
  const fan = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (fan.current) fan.current.rotation.z += delta * 3.5;
  });
  return (
    <group position={[GABLE_X + 0.55, GROUND_Y + 0.32, 0.55]}>
      <mesh position={[0, -0.3, 0]} castShadow>
        <boxGeometry args={[0.5, 0.04, 0.32]} />
        <meshStandardMaterial color="#1A1A17" />
      </mesh>
      <mesh castShadow>
        <boxGeometry args={[0.62, 0.46, 0.36]} />
        <meshStandardMaterial color="#2A2A26" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.181]}>
        <ringGeometry args={[0.13, 0.21, 32]} />
        <meshStandardMaterial color="#0E0E0C" />
      </mesh>
      <group ref={fan} position={[0, 0, 0.19]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} rotation={[0, 0, (i / 5) * Math.PI * 2]}>
            <boxGeometry args={[0.04, 0.2, 0.018]} />
            <meshStandardMaterial color="#F4F1EA" />
          </mesh>
        ))}
        <mesh>
          <cylinderGeometry args={[0.035, 0.035, 0.04, 24]} />
          <meshStandardMaterial color="#E9B949" />
        </mesh>
      </group>
    </group>
  );
}

// ============= VÄXELRIKTARE (Solis-stil på gavelväggen) =============

function Inverter() {
  return (
    <group position={[GABLE_X - 0.02, 0.32, -0.05]}>
      <mesh castShadow>
        <boxGeometry args={[0.04, 0.28, 0.22]} />
        <meshStandardMaterial color="#1A1A17" roughness={0.5} />
      </mesh>
      <mesh position={[0.022, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.16, 0.04]} />
        <meshStandardMaterial color="#0E0E0C" />
      </mesh>
      <mesh position={[0.022, -0.06, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.16, 0.04]} />
        <meshStandardMaterial color="#0E0E0C" />
      </mesh>
    </group>
  );
}
