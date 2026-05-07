"use client";

/**
 * Procedurella 3D-representationer av varje batteri-märke.
 *
 *   Pylontech Force H3   – grå topp-modul med logobalk + 1–5 vita
 *                          batterimoduler under (max 30,72 kWh / stapel).
 *   Easyway              – vit stapel av kvadratiska moduler, max 8 / stapel.
 *                          Större kapaciteter spawn:ar fler stackar bredvid.
 *   SAJ HS3              – tunn vit batteristack med integrerad sleek vit
 *                          växelriktare ovanpå med en grön ring-indikator.
 *   Enershare Energy Core – vit kabinettstack med display, max 25,6 kWh per
 *                          stack. Två stackar bredvid varandra för >25,6.
 *   Emaldo Power Store   – placeholder (uppdateras nästa prompt).
 */

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const ANCHOR: [number, number, number] = [0, 0, 0];

function StatusLED({
  position,
  color = "#3F5236",
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

// === Pylontech Force H3 ====================================================
// Standardrack: 1 grå topp-modul med logobalk + n vita batterimoduler under.
// 5,12 kWh per modul. Max 30,72 kWh per stack (= 6 moduler).
export function PylontechH3({ capacityKWh }: { capacityKWh: number }) {
  const modules = Math.min(6, Math.max(2, Math.round(capacityKWh / 5.12)));
  const moduleH = 0.16;
  const headH = 0.18; // grå topp med BMS / logo
  const bottomH = 0.05;
  const w = 0.6;
  const d = 0.42;

  return (
    <group position={ANCHOR}>
      {/* Bottenchassi */}
      <mesh position={[0, bottomH / 2, 0]} castShadow>
        <boxGeometry args={[w, bottomH, d]} />
        <meshStandardMaterial color="#5b6a82" roughness={0.5} />
      </mesh>
      {/* Vita batterimoduler */}
      {Array.from({ length: modules }).map((_, i) => (
        <group
          key={i}
          position={[0, bottomH + moduleH / 2 + i * moduleH, 0]}
        >
          <mesh castShadow>
            <boxGeometry args={[w, moduleH * 0.96, d]} />
            <meshStandardMaterial color="#F4F1EA" roughness={0.55} />
          </mesh>
          {/* Tunt mörkt streck mellan modulerna */}
          <mesh position={[0, -moduleH / 2 + 0.005, d / 2 + 0.001]}>
            <planeGeometry args={[w, 0.012]} />
            <meshStandardMaterial color="#5b6a82" />
          </mesh>
        </group>
      ))}
      {/* Grå topp-modul med logobalk */}
      <group
        position={[
          0,
          bottomH + modules * moduleH + headH / 2,
          0,
        ]}
      >
        <mesh castShadow>
          <boxGeometry args={[w, headH, d]} />
          <meshStandardMaterial color="#5b6a82" roughness={0.5} />
        </mesh>
        {/* Litet display-fönster */}
        <mesh position={[-w / 2 + 0.08, 0, d / 2 + 0.001]}>
          <planeGeometry args={[0.1, 0.1]} />
          <meshStandardMaterial color="#0E0E0C" />
        </mesh>
        {/* Logo-text yta */}
        <mesh position={[0.05, 0, d / 2 + 0.001]}>
          <planeGeometry args={[0.32, 0.05]} />
          <meshStandardMaterial color="#F4F1EA" />
        </mesh>
      </group>
      <Label
        text={`Pylontech · ${capacityKWh.toFixed(2).replace(".", ",")} kWh`}
        y={-0.05}
      />
    </group>
  );
}

// === Easyway =================================================================
// Vit stapel av kvadratiska moduler. 1,92 kWh/modul. Max 8 moduler/stapel.
// För >8 moduler: spawn:a fler staplar bredvid (höger).
export function Easyway({ capacityKWh }: { capacityKWh: number }) {
  const totalModules = Math.max(1, Math.round(capacityKWh / 1.92));
  const maxPerStack = 8;
  const numStacks = Math.ceil(totalModules / maxPerStack);
  const moduleH = 0.13;
  const w = 0.42;
  const d = 0.4;
  const stackGap = 0.06;
  const totalWidth = numStacks * w + (numStacks - 1) * stackGap;

  return (
    <group position={ANCHOR}>
      {Array.from({ length: numStacks }).map((_, s) => {
        const modulesInStack = Math.min(
          maxPerStack,
          totalModules - s * maxPerStack,
        );
        const xOffset = -totalWidth / 2 + w / 2 + s * (w + stackGap);
        return (
          <group key={s} position={[xOffset, 0, 0]}>
            {/* Bottenchassi */}
            <mesh position={[0, 0.04, 0]} castShadow>
              <boxGeometry args={[w + 0.04, 0.08, d + 0.04]} />
              <meshStandardMaterial color="#dde2ec" roughness={0.6} />
            </mesh>
            {/* Topp-modul (BMS) */}
            <mesh
              position={[0, 0.08 + modulesInStack * moduleH + 0.05, 0]}
              castShadow
            >
              <boxGeometry args={[w, 0.1, d]} />
              <meshStandardMaterial color="#F4F1EA" roughness={0.55} />
            </mesh>
            {/* Status LED på topp-modulen */}
            <StatusLED
              position={[
                -w / 2 + 0.05,
                0.08 + modulesInStack * moduleH + 0.05,
                d / 2 + 0.005,
              ]}
              color="#E0BC44"
              size={[0.04, 0.04, 0.005]}
            />
            {/* Batterimoduler */}
            {Array.from({ length: modulesInStack }).map((_, i) => (
              <group
                key={i}
                position={[0, 0.08 + moduleH / 2 + i * moduleH, 0]}
              >
                <mesh castShadow>
                  <boxGeometry args={[w, moduleH * 0.93, d]} />
                  <meshStandardMaterial color="#F4F1EA" roughness={0.6} />
                </mesh>
                {/* Smal handle på sidan */}
                <mesh position={[w / 2 + 0.008, 0, 0]}>
                  <boxGeometry args={[0.015, moduleH * 0.45, 0.07]} />
                  <meshStandardMaterial color="#1A1A17" />
                </mesh>
              </group>
            ))}
          </group>
        );
      })}
      <Label
        text={`Easyway · ${capacityKWh.toFixed(2).replace(".", ",")} kWh · ${numStacks} stack${numStacks > 1 ? "ar" : ""}`}
        y={-0.05}
      />
    </group>
  );
}

// === SAJ HS3 =================================================================
// Tunn vit batteristack med integrerad sleek vit växelriktare ovanpå.
// Inverter har en grön ring-indikator. ~5 kWh per modul.
export function SajHS3({ capacityKWh }: { capacityKWh: number }) {
  const modules = Math.max(2, Math.round(capacityKWh / 5));
  const moduleH = 0.13;
  const w = 0.36;
  const d = 0.32;
  const inverterH = 0.34;
  const baseH = 0.06;

  return (
    <group position={ANCHOR}>
      {/* Bas */}
      <mesh position={[0, baseH / 2, 0]} castShadow>
        <boxGeometry args={[w + 0.04, baseH, d + 0.04]} />
        <meshStandardMaterial color="#cdd3df" roughness={0.6} />
      </mesh>
      {/* Batterimoduler (tunna, vita, separerade med tunt streck) */}
      {Array.from({ length: modules }).map((_, i) => (
        <group key={i} position={[0, baseH + moduleH / 2 + i * moduleH, 0]}>
          <mesh castShadow>
            <boxGeometry args={[w, moduleH * 0.94, d]} />
            <meshStandardMaterial color="#F4F1EA" roughness={0.55} />
          </mesh>
          <mesh position={[0, -moduleH / 2 + 0.003, d / 2 + 0.001]}>
            <planeGeometry args={[w, 0.008]} />
            <meshStandardMaterial color="#cdd3df" />
          </mesh>
        </group>
      ))}
      {/* Sleek vit växelriktare ovanpå */}
      <group
        position={[0, baseH + modules * moduleH + inverterH / 2, 0]}
      >
        <mesh castShadow>
          <boxGeometry args={[w * 1.05, inverterH, d * 1.02]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
        </mesh>
        {/* Grön ring-indikator */}
        <RingIndicator position={[0, 0.04, d / 2 + 0.005]} />
        {/* Tunn rand under inverter */}
        <mesh position={[0, -inverterH / 2 + 0.003, d / 2 + 0.005]}>
          <planeGeometry args={[w * 1.05, 0.012]} />
          <meshStandardMaterial color="#cdd3df" />
        </mesh>
      </group>
      <Label
        text={`SAJ HS3 · ${capacityKWh} kWh · inbyggd 12 kW växelriktare`}
        y={-0.05}
      />
    </group>
  );
}

function RingIndicator({
  position,
}: {
  position: [number, number, number];
}) {
  const ref = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.emissiveIntensity =
        0.5 + Math.sin(clock.elapsedTime * 1.3) * 0.35;
    }
  });
  return (
    <mesh position={position}>
      <ringGeometry args={[0.05, 0.07, 32]} />
      <meshStandardMaterial
        ref={ref as never}
        color="#3F5236"
        emissive="#3F5236"
        emissiveIntensity={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// === Enershare Energy Core ===================================================
// Vit kabinettstack med display. 3,2 kWh per modul. Max 25,6 kWh / stack
// (= 8 moduler). >25,6 → en andra stack bredvid.
export function EnershareCore({ capacityKWh }: { capacityKWh: number }) {
  const totalModules = Math.max(3, Math.round(capacityKWh / 3.2));
  const maxPerStack = 8;
  const numStacks = totalModules > maxPerStack ? 2 : 1;
  const perStack = Math.ceil(totalModules / numStacks);
  const moduleH = 0.16;
  const w = 0.5;
  const d = 0.4;
  const headH = 0.16;
  const baseH = 0.08;
  const stackGap = 0.08;
  const totalW = numStacks * w + (numStacks - 1) * stackGap;

  return (
    <group position={ANCHOR}>
      {Array.from({ length: numStacks }).map((_, s) => {
        const modulesInThisStack =
          s === 0 ? perStack : totalModules - perStack;
        const xOffset = -totalW / 2 + w / 2 + s * (w + stackGap);
        return (
          <group key={s} position={[xOffset, 0, 0]}>
            {/* Bas */}
            <mesh position={[0, baseH / 2, 0]} castShadow>
              <boxGeometry args={[w + 0.04, baseH, d + 0.04]} />
              <meshStandardMaterial color="#dde2ec" roughness={0.6} />
            </mesh>
            {/* Batteri-moduler */}
            {Array.from({ length: modulesInThisStack }).map((_, i) => (
              <mesh
                key={i}
                castShadow
                position={[0, baseH + moduleH / 2 + i * moduleH, 0]}
              >
                <boxGeometry args={[w, moduleH * 0.95, d]} />
                <meshStandardMaterial color="#EFEFEC" roughness={0.55} />
              </mesh>
            ))}
            {/* Topp-modul med display */}
            <group
              position={[
                0,
                baseH + modulesInThisStack * moduleH + headH / 2,
                0,
              ]}
            >
              <mesh castShadow>
                <boxGeometry args={[w, headH, d]} />
                <meshStandardMaterial color="#F4F1EA" roughness={0.55} />
              </mesh>
              {/* Liten display */}
              <mesh position={[0, 0.02, d / 2 + 0.002]}>
                <planeGeometry args={[0.14, 0.08]} />
                <meshStandardMaterial
                  color="#0a3a4e"
                  emissive="#0a3a4e"
                  emissiveIntensity={0.5}
                />
              </mesh>
            </group>
          </group>
        );
      })}
      <Label
        text={`Enershare · ${capacityKWh.toString().replace(".", ",")} kWh · ${numStacks} stack${numStacks > 1 ? "ar" : ""}`}
        y={-0.05}
      />
    </group>
  );
}

// === Emaldo Power Store (placeholder, uppdateras nästa prompt) ==============
export function EmaldoPowerStore({ capacityKWh }: { capacityKWh: number }) {
  const heights: Record<number, number> = {
    15.36: 0.95,
    30.72: 1.35,
    46.08: 1.7,
  };
  const totalH = heights[capacityKWh] ?? 1.05;
  return (
    <group position={ANCHOR}>
      <mesh castShadow position={[0, totalH / 2, 0]}>
        <boxGeometry args={[0.4, totalH * 0.92, 0.3]} />
        <meshStandardMaterial color="#F4F1EA" roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0, totalH * 0.92, 0]}>
        <sphereGeometry args={[0.2, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#F4F1EA" roughness={0.5} />
      </mesh>
      <mesh position={[0, totalH * 0.5, 0.151]}>
        <planeGeometry args={[0.05, totalH * 0.7]} />
        <meshStandardMaterial
          color="#FFDD6C"
          emissive="#FFDD6C"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0, totalH * 0.92, 0.151]}>
        <planeGeometry args={[0.18, 0.06]} />
        <meshStandardMaterial color="#1A1A17" />
      </mesh>
      <Label
        text={`Emaldo · ${capacityKWh.toFixed(2).replace(".", ",")} kWh + inbyggd växelriktare`}
        y={-0.05}
      />
    </group>
  );
}

// =============================== DISPATCHER ================================
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
      return <Easyway capacityKWh={capacityKWh} />;
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
