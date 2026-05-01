"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import type { ServiceSlug } from "@/lib/services";

export function ServiceVignette({ kind }: { kind: ServiceSlug }) {
  return (
    <Canvas
      camera={{ position: [2.4, 1.6, 3], fov: 38 }}
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
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        {kind === "solpaneler" && <PanelArray />}
        {kind === "batterier" && <BatteryStack />}
        {kind === "vaermepumpar" && <HeatPumpUnit />}
        {kind === "laddboxar" && <ChargerUnit />}
        {kind === "vindsnurror" && <Turbine />}
      </Float>
    </Canvas>
  );
}

function backgroundFor(kind: ServiceSlug) {
  switch (kind) {
    case "solpaneler":
      return "#EFE3C7";
    case "batterier":
      return "#E1E6DA";
    case "vaermepumpar":
      return "#E3DED1";
    case "laddboxar":
      return "#E9E3D3";
    case "vindsnurror":
      return "#DCE0D5";
  }
}

function PanelArray() {
  return (
    <group rotation={[-0.3, 0.4, 0]}>
      {[-0.9, 0, 0.9].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} castShadow>
          <boxGeometry args={[0.85, 0.04, 1]} />
          <meshStandardMaterial color="#0E0E0C" />
          <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.78, 0.93]} />
            <meshStandardMaterial
              color="#0a3a4e"
              emissive="#0a3a4e"
              emissiveIntensity={0.25}
              metalness={0.85}
              roughness={0.15}
            />
          </mesh>
        </mesh>
      ))}
    </group>
  );
}

function BatteryStack() {
  return (
    <group>
      {[0, 0.45, 0.9].map((y, i) => (
        <mesh key={i} position={[0, y - 0.4, 0]} castShadow>
          <boxGeometry args={[0.9, 0.32, 0.45]} />
          <meshStandardMaterial color="#F4F1EA" roughness={0.6} />
        </mesh>
      ))}
      <PulseStrip />
    </group>
  );
}

function PulseStrip() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const m = ref.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity =
        0.4 + Math.sin(clock.elapsedTime * 1.6) * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={[0.46, 0.05, 0]}>
      <boxGeometry args={[0.02, 1.1, 0.2]} />
      <meshStandardMaterial
        color="#E9B949"
        emissive="#E9B949"
        emissiveIntensity={0.5}
      />
    </mesh>
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

function Turbine() {
  const blades = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (blades.current) blades.current.rotation.z += d * 2;
  });
  return (
    <group>
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 1.6, 16]} />
        <meshStandardMaterial color="#F4F1EA" />
      </mesh>
      <mesh position={[0, 0.4, 0.06]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#1A1A17" />
      </mesh>
      <group ref={blades} position={[0, 0.4, 0.1]}>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            rotation={[0, 0, (i / 3) * Math.PI * 2]}
            position={[0, 0.4, 0]}
          >
            <boxGeometry args={[0.05, 0.85, 0.025]} />
            <meshStandardMaterial color="#F4F1EA" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
