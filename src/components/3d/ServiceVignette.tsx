"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import type { ServiceSlug } from "@/lib/services";
import { Easyway } from "@/components/3d/BatteryModels";

export function ServiceVignette({ kind }: { kind: ServiceSlug }) {
  // Solpaneler får högre kameravinkel så panelens framsida syns istället för
  // bara kanten. Batterier zoomas ut lite så hela Easyway-stacken syns
  // bekvämt utan att kännas inträngd.
  const camera =
    kind === "solpaneler"
      ? { position: [2.4, 2.4, 2.8] as [number, number, number], fov: 40 }
      : kind === "batterier"
      ? { position: [3.0, 1.9, 3.2] as [number, number, number], fov: 40 }
      : kind === "laddboxar"
      ? { position: [2.4, 1.6, 2.6] as [number, number, number], fov: 40 }
      : { position: [2.4, 1.8, 2.8] as [number, number, number], fov: 40 };

  return (
    <Canvas
      camera={camera}
      dpr={[1, 2]}
      className="!absolute inset-0"
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={[backgroundFor(kind)]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 2]} intensity={1.05} />
      <directionalLight position={[-2, 2, -2]} intensity={0.25} color="#E9B949" />
      <gridHelper
        args={[20, 40, "#3F5236", "#9aa590"]}
        position={[0, -0.85, 0]}
      />
      {kind === "solpaneler" && <PanelArray />}
      {kind === "batterier" && (
        <group position={[0, -0.55, 0]}>
          <Easyway capacityKWh={30.72} />
        </group>
      )}
      {kind === "laddboxar" && <ChargerUnit />}
      {kind === "vaermepumpar" && <HeatPumpUnit />}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.05}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </Canvas>
  );
}

function backgroundFor(kind: ServiceSlug) {
  // Subtila varma cream-varianter (Aesop/Byredo). Matchar logo-kortet.
  switch (kind) {
    case "solpaneler":
      return "#EFE3C7";
    case "batterier":
      return "#EAE3D2";
    case "vaermepumpar":
      return "#E3DED1";
    case "laddboxar":
      return "#E9E3D3";
  }
}

function PanelArray() {
  // Tre paneler i en rad, tiltade ~30° framåt mot kameran så glasytan syns
  // i stället för att bara visa kanterna. Lite Y-rotation ger djup.
  // Cellrutnät ovanpå glaset gör det tydligt att det är solceller.
  const tiltX = Math.PI / 6; // 30° framåt-tilt
  const yawY = -0.35;
  return (
    <group rotation={[tiltX, yawY, 0]} position={[0, 0.1, 0]}>
      {[-0.92, 0, 0.92].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          {/* Aluminiumram (svart) */}
          <mesh castShadow>
            <boxGeometry args={[0.85, 0.05, 1.4]} />
            <meshStandardMaterial color="#0E0E0C" metalness={0.4} roughness={0.5} />
          </mesh>
          {/* Glasyta med solceller */}
          <mesh position={[0, 0.026, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.78, 1.32]} />
            <meshStandardMaterial
              color="#0a2a44"
              emissive="#0a2a44"
              emissiveIntensity={0.18}
              metalness={0.85}
              roughness={0.18}
            />
          </mesh>
          {/* Cellrutnät – fina ljusa linjer som visar att det är celler */}
          {[-0.5, -0.25, 0, 0.25, 0.5].map((z) => (
            <mesh
              key={`h${z}`}
              position={[0, 0.027, z]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[0.78, 0.005]} />
              <meshStandardMaterial color="#1f3a55" />
            </mesh>
          ))}
          {[-0.26, 0, 0.26].map((xc) => (
            <mesh
              key={`v${xc}`}
              position={[xc, 0.027, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[0.005, 1.32]} />
              <meshStandardMaterial color="#1f3a55" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function HeatPumpUnit() {
  const fan = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (fan.current) fan.current.rotation.z += d * 4;
  });
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[1.4, 0.95, 0.6]} />
        <meshStandardMaterial color="#2A2A26" />
      </mesh>
      <mesh position={[0, 0, 0.31]}>
        <ringGeometry args={[0.22, 0.42, 32]} />
        <meshStandardMaterial color="#0E0E0C" />
      </mesh>
      <group ref={fan} position={[0, 0, 0.33]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} rotation={[0, 0, (i / 5) * Math.PI * 2]}>
            <boxGeometry args={[0.05, 0.38, 0.025]} />
            <meshStandardMaterial color="#F4F1EA" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function ChargerUnit() {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.5, 1.05, 0.18]} />
        <meshStandardMaterial color="#E9B949" />
      </mesh>
      <mesh position={[0, 0.15, 0.1]}>
        <planeGeometry args={[0.32, 0.32]} />
        <meshStandardMaterial
          color="#0E0E0C"
          emissive="#3F5236"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0.42, -0.4, 0]}>
        <torusKnotGeometry args={[0.18, 0.04, 80, 12]} />
        <meshStandardMaterial color="#0E0E0C" />
      </mesh>
    </group>
  );
}

