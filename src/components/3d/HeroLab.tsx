"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Grid } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export function HeroLab() {
  return (
    <Canvas
      camera={{ position: [3, 2.4, 4.2], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#EDEFF5"]} />
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[5, 6, 3]}
        intensity={1.05}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-3, 2, -3]} intensity={0.25} color="#E9B949" />

      <Grid
        position={[0, -1.0, 0]}
        args={[24, 24]}
        cellSize={0.4}
        cellThickness={0.6}
        cellColor="#9aa590"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#3F5236"
        fadeDistance={9}
        fadeStrength={1}
        infiniteGrid
      />

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
        <SolarPanel position={[-1.4, 0.3, 0.2]} />
      </Float>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
        <Battery position={[0.6, -0.1, 0.7]} />
      </Float>
      <Float speed={0.9} rotationIntensity={0.25} floatIntensity={0.4}>
        <HeatPump position={[1.6, 0.6, -0.6]} />
      </Float>
      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.5}>
        <WindTurbine position={[-1.2, 1.1, -1.4]} />
      </Float>

      <FlowParticles />
    </Canvas>
  );
}

function SolarPanel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[-0.35, 0.4, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.6, 0.05, 1]} />
        <meshStandardMaterial color="#1a1a17" metalness={0.6} roughness={0.3} />
      </mesh>
      {Array.from({ length: 6 }).map((_, i) =>
        Array.from({ length: 4 }).map((__, j) => (
          <mesh
            key={`${i}-${j}`}
            position={[
              -0.65 + i * 0.26,
              0.03,
              -0.35 + j * 0.235,
            ]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.22, 0.205]} />
            <meshStandardMaterial
              color="#0e1d2c"
              emissive="#0a3a4e"
              emissiveIntensity={0.18}
              metalness={0.85}
              roughness={0.18}
            />
          </mesh>
        )),
      )}
    </group>
  );
}

function Battery({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const m = ref.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity =
        0.25 + Math.sin(clock.elapsedTime * 1.5) * 0.18;
    }
  });
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.55, 0.9, 0.32]} />
        <meshStandardMaterial color="#F4F1EA" roughness={0.7} />
      </mesh>
      <mesh ref={ref} position={[0, 0.05, 0.17]}>
        <planeGeometry args={[0.3, 0.05]} />
        <meshStandardMaterial
          color="#3F5236"
          emissive="#3F5236"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, -0.18, 0.165]}>
        <planeGeometry args={[0.4, 0.18]} />
        <meshStandardMaterial color="#0E0E0C" roughness={0.4} />
      </mesh>
    </group>
  );
}

function HeatPump({ position }: { position: [number, number, number] }) {
  const fan = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (fan.current) fan.current.rotation.z += delta * 4;
  });
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[1.1, 0.7, 0.5]} />
        <meshStandardMaterial color="#2A2A26" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.255]}>
        <ringGeometry args={[0.16, 0.3, 32]} />
        <meshStandardMaterial color="#0E0E0C" />
      </mesh>
      <group ref={fan} position={[0, 0, 0.27]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} rotation={[0, 0, (i / 5) * Math.PI * 2]}>
            <boxGeometry args={[0.04, 0.27, 0.02]} />
            <meshStandardMaterial color="#F4F1EA" />
          </mesh>
        ))}
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 0.06, 24]} />
          <meshStandardMaterial color="#E9B949" />
        </mesh>
      </group>
    </group>
  );
}

function WindTurbine({ position }: { position: [number, number, number] }) {
  const blades = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (blades.current) blades.current.rotation.z += delta * 1.6;
  });
  return (
    <group position={position}>
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 1.2, 16]} />
        <meshStandardMaterial color="#F4F1EA" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.2, 0.05]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#1A1A17" />
      </mesh>
      <group ref={blades} position={[0, 0.2, 0.08]}>
        {[0, 1, 2].map((i) => (
          <group key={i} rotation={[0, 0, (i / 3) * Math.PI * 2]}>
            <mesh position={[0, 0.275, 0]}>
              <boxGeometry args={[0.04, 0.55, 0.02]} />
              <meshStandardMaterial color="#F4F1EA" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

function FlowParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 80;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 5;
    positions[i * 3 + 1] = Math.random() * 2.5 - 0.8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }
  useFrame((_, delta) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= delta * 0.25;
      if (arr[i * 3 + 1] < -1) arr[i * 3 + 1] = 1.7;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#E9B949"
        sizeAttenuation
        transparent
        opacity={0.85}
      />
    </points>
  );
}
