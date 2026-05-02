"use client";

/**
 * Procedurella 3D-representationer av varje batteri-märke vi säljer.
 *
 * Tänket: varje märke har en igenkännbar siluett baserad på den faktiska
 * produktens proportioner och paneler – nog för att en kund ska känna
 * "ja, det är en Pylontech / Easyway / SAJ / Enershare / Emaldo".
 * Storleken på 3D-modellen växer dessutom med vald kapacitet (fler moduler
 * eller högre skåp), så att kunden ser konsekvensen av sina val.
 *
 * När vi har riktiga GLB/GLTF-filer från leverantörerna kan varje
 * komponent bytas ut mot `<Gltf url="/models/<brand>.glb" scale={...} />`
 * (se README "3D-batterier" för guide).
 */

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Gltf, Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const ANCHOR: [number, number, number] = [0, 0, 0];

// Riktig GLB-modell av Easyway UNIV7600 — byggs av scripts/build-easyway-univ7600.py
useGLTF.preload("/models/batteries/easyway-univ7600.glb");

// Pulsande LED – återanvänds i alla modeller.
function StatusLED({
  position,
  color = "#E9B949",
  size = [0.18, 0.015, 0.04] as [number, number, number],
}: {
  position: [number, number, number];
  color?: string;
  size?: [number, number, number];
}) {
  const ref = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.emissiveIntensity =
        0.4 + Math.sin(clock.elapsedTime * 1.4) * 0.3;
    }
  });
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        ref={ref as never}
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function Label({ text, y = -0.55 }: { text: string; y?: number }) {
  return (
    <Html position={[0.4, y, 0]}>
      <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/65 bg-bone/85 backdrop-blur px-2 py-0.5 rounded-full border border-ink/10 whitespace-nowrap">
        {text}
      </div>
    </Html>
  );
}

// === Pylontech Force H3 =====================================================
// Stapelbar rack-låda, mörkblå/grafit. Antalet moduler ökar med kapacitet.
export function PylontechH3({ capacityKWh }: { capacityKWh: number }) {
  // ~5 kWh per modul – avrunda upp för stack-höjden
  const modules = Math.max(2, Math.round(capacityKWh / 5));
  const moduleH = 0.13;
  const totalH = modules * moduleH + 0.18; // + bottenchassi

  return (
    <group position={ANCHOR}>
      {/* Bottenchassi */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[0.55, 0.1, 0.5]} />
        <meshStandardMaterial color="#0E0E0C" roughness={0.5} />
      </mesh>
      {/* Stapel av moduler */}
      {Array.from({ length: modules }).map((_, i) => (
        <group key={i} position={[0, 0.18 + i * moduleH, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.55, moduleH * 0.92, 0.45]} />
            <meshStandardMaterial color="#1f2a36" roughness={0.55} />
          </mesh>
          {/* Kylgrill längs framsidan */}
          {[-0.12, -0.04, 0.04, 0.12].map((dz) => (
            <mesh key={dz} position={[0.276, 0, dz]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[0.04, moduleH * 0.7]} />
              <meshStandardMaterial color="#0E0E0C" />
            </mesh>
          ))}
        </group>
      ))}
      {/* LED på toppmodulen */}
      <StatusLED position={[0.276, 0.18 + modules * moduleH - 0.04, 0.18]} />
      <Label text={`Pylontech · ${capacityKWh.toFixed(2).replace(".", ",")} kWh`} y={-0.05 - totalH * 0.5} />
    </group>
  );
}

// === Easyway UNIV7600 HP ====================================================
// Riktig GLB-modell (procedurellt byggd i Blender via bpy, se
// scripts/build-easyway-univ7600.py). En GLB = en stack på ~7,6 kWh och
// 0,98 m hög. För större kapacitet sätter vi flera bredvid varandra.
export function EasywayUNIV7600({ capacityKWh }: { capacityKWh: number }) {
  const cabinets = capacityKWh > 38 ? 3 : capacityKWh > 23 ? 2 : 1;
  const spacing = 0.65; // 0,58 m bred + lite luft mellan skåpen
  return (
    <group position={ANCHOR}>
      {Array.from({ length: cabinets }).map((_, i) => (
        <Gltf
          key={i}
          src="/models/batteries/easyway-univ7600.glb"
          position={[(i - (cabinets - 1) / 2) * spacing, 0, 0]}
        />
      ))}
      <Label text={`Easyway · ${capacityKWh.toFixed(2).replace(".", ",")} kWh`} y={-0.05} />
    </group>
  );
}

// === SAJ HS3 ================================================================
// Vit, kompakt allt-i-ett: batteri + inbyggd växelriktare i samma chassi.
// Större kupol överst där växelriktaren sitter.
export function SajHS3({ capacityKWh }: { capacityKWh: number }) {
  const baseH = 0.3 + (capacityKWh / 40) * 0.6; // 0.3–0.9 m
  return (
    <group position={ANCHOR}>
      {/* Batteridel */}
      <mesh castShadow position={[0, baseH / 2, 0]}>
        <boxGeometry args={[0.42, baseH, 0.35]} />
        <meshStandardMaterial color="#F4F1EA" roughness={0.55} />
      </mesh>
      {/* Inbyggd växelriktare (smalare, ovanpå) */}
      <mesh castShadow position={[0, baseH + 0.18, 0]}>
        <boxGeometry args={[0.48, 0.36, 0.27]} />
        <meshStandardMaterial color="#1A1A17" roughness={0.4} />
      </mesh>
      {/* Display */}
      <mesh position={[0, baseH + 0.22, 0.14]}>
        <planeGeometry args={[0.22, 0.12]} />
        <meshStandardMaterial
          color="#3F5236"
          emissive="#3F5236"
          emissiveIntensity={0.55}
        />
      </mesh>
      {/* Logobalk */}
      <mesh position={[0, baseH * 0.6, 0.181]}>
        <planeGeometry args={[0.32, 0.025]} />
        <meshStandardMaterial color="#E9B949" />
      </mesh>
      <StatusLED position={[0, baseH + 0.04, 0.14]} />
      <Label text={`SAJ HS3 · ${capacityKWh} kWh + inbyggd växelriktare`} y={-0.05} />
    </group>
  );
}

// === Enershare Energy Core ==================================================
// Modulärt – Lego-liknande staplade kuber. Antalet kuber = kWh / 3,2.
export function EnershareCore({ capacityKWh }: { capacityKWh: number }) {
  const cubes = Math.max(3, Math.round(capacityKWh / 3.2));
  const cubeSide = 0.22;
  const cols = Math.min(cubes, 4);
  const rows = Math.ceil(cubes / cols);
  return (
    <group position={ANCHOR}>
      {Array.from({ length: cubes }).map((_, idx) => {
        const r = Math.floor(idx / cols);
        const c = idx % cols;
        const x = (c - (cols - 1) / 2) * cubeSide;
        const y = 0.15 + r * cubeSide;
        return (
          <group key={idx} position={[x, y, 0]}>
            <mesh castShadow>
              <boxGeometry args={[cubeSide * 0.9, cubeSide * 0.9, cubeSide * 0.9]} />
              <meshStandardMaterial color="#2A3823" roughness={0.5} />
            </mesh>
            {/* Liten kärnindikator i centrum */}
            <mesh position={[0, 0, cubeSide * 0.45]}>
              <circleGeometry args={[0.022, 16]} />
              <meshStandardMaterial
                color="#E9B949"
                emissive="#E9B949"
                emissiveIntensity={0.6}
              />
            </mesh>
          </group>
        );
      })}
      {/* Bottenplatta */}
      <mesh position={[0, 0.04, 0]} castShadow>
        <boxGeometry args={[cols * cubeSide + 0.06, 0.06, cubeSide * 1.2]} />
        <meshStandardMaterial color="#0E0E0C" />
      </mesh>
      <Label text={`Enershare · ${capacityKWh.toString().replace(".", ",")} kWh · ${cubes} celler`} y={-0.05} />
    </group>
  );
}

// === Emaldo Power Store =====================================================
// Hög, vit, rundad i toppen – nästan en monolit. Inbyggd växelriktare.
export function EmaldoPowerStore({ capacityKWh }: { capacityKWh: number }) {
  const heights: Record<number, number> = {
    15.36: 0.95,
    30.72: 1.35,
    46.08: 1.7,
  };
  const totalH = heights[capacityKWh] ?? 1.05;
  return (
    <group position={ANCHOR}>
      {/* Huvudkropp */}
      <mesh castShadow position={[0, totalH / 2, 0]}>
        <boxGeometry args={[0.4, totalH * 0.92, 0.3]} />
        <meshStandardMaterial color="#F4F1EA" roughness={0.5} />
      </mesh>
      {/* Rundad topp (halvklot) */}
      <mesh castShadow position={[0, totalH * 0.92, 0]}>
        <sphereGeometry
          args={[0.2, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        <meshStandardMaterial color="#F4F1EA" roughness={0.5} />
      </mesh>
      {/* Vertikalt amber-spår längst fram */}
      <mesh position={[0, totalH * 0.5, 0.151]}>
        <planeGeometry args={[0.05, totalH * 0.7]} />
        <meshStandardMaterial
          color="#E9B949"
          emissive="#E9B949"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Logoplakett */}
      <mesh position={[0, totalH * 0.92, 0.151]}>
        <planeGeometry args={[0.18, 0.06]} />
        <meshStandardMaterial color="#1A1A17" />
      </mesh>
      <Label text={`Emaldo · ${capacityKWh.toFixed(2).replace(".", ",")} kWh + inbyggd växelriktare`} y={-0.05} />
    </group>
  );
}

// === Dispatcher =============================================================
export function BatteryByBrand({
  brandId,
  capacityKWh,
}: {
  brandId: string;
  capacityKWh: number;
}) {
  switch (brandId) {
    case "pylontech-h3":
      return <PylontechH3 capacityKWh={capacityKWh} />;
    case "easyway-univ7600":
      return <EasywayUNIV7600 capacityKWh={capacityKWh} />;
    case "saj-hs3":
      return <SajHS3 capacityKWh={capacityKWh} />;
    case "enershare-core":
      return <EnershareCore capacityKWh={capacityKWh} />;
    case "emaldo-store":
      return <EmaldoPowerStore capacityKWh={capacityKWh} />;
    default:
      return <PylontechH3 capacityKWh={capacityKWh} />;
  }
}
