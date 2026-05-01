"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, OrbitControls, Html } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { CalcInput } from "@/lib/calc";
import { PANELS, INVERTERS } from "@/lib/catalog";

export function CalcScene({ input }: { input: CalcInput }) {
  return (
    <Canvas
      camera={{ position: [5.5, 4, 6.5], fov: 36 }}
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#EFE9DC"]} />
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[6, 8, 4]}
        intensity={1.15}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-4, 3, -3]} intensity={0.3} color="#E9B949" />

      <Grid
        position={[0, -1, 0]}
        args={[40, 40]}
        cellSize={0.4}
        cellThickness={0.5}
        cellColor="#9aa590"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#3F5236"
        fadeDistance={18}
        fadeStrength={1}
        infiniteGrid
      />

      <House />
      <PanelArray
        count={input.panelCount}
        glow={
          PANELS.find((p) => p.id === input.panelId)?.efficiency ?? 22
        }
      />
      <Inverter brandId={input.inverterId} />
      {input.batteryId && <Battery />}
      {input.heatPumpId && <HeatPumpUnit />}
      {input.chargerId && <ChargerUnit />}
      {input.turbineId && <TurbineUnit />}

      <FlowLines input={input} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}

function House() {
  return (
    <group position={[0, 0, 0]}>
      {/* base */}
      <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.2, 2.4]} />
        <meshStandardMaterial color="#F4F1EA" roughness={0.85} />
      </mesh>
      {/* roof */}
      <mesh
        position={[0, 0.45, 0]}
        rotation={[0, Math.PI / 4, 0]}
        castShadow
      >
        <coneGeometry args={[2.45, 0.9, 4]} />
        <meshStandardMaterial color="#3F5236" roughness={0.65} />
      </mesh>
      {/* door */}
      <mesh position={[0, -0.55, 1.21]}>
        <planeGeometry args={[0.45, 0.7]} />
        <meshStandardMaterial color="#1A1A17" />
      </mesh>
      {/* window glow */}
      <Window position={[-1, -0.4, 1.21]} />
      <Window position={[1, -0.4, 1.21]} />
      <Window position={[-1, -0.4, -1.21]} flip />
      <Window position={[1, -0.4, -1.21]} flip />
    </group>
  );
}

function Window({
  position,
  flip,
}: {
  position: [number, number, number];
  flip?: boolean;
}) {
  const ref = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.emissiveIntensity =
        0.25 + Math.sin(clock.elapsedTime * 0.6) * 0.1;
    }
  });
  return (
    <mesh position={position} rotation={[0, flip ? Math.PI : 0, 0]}>
      <planeGeometry args={[0.5, 0.4]} />
      <meshStandardMaterial
        ref={ref}
        color="#E9B949"
        emissive="#E9B949"
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

function PanelArray({ count, glow }: { count: number; glow: number }) {
  // dynamiskt antal: två rader, växer så det får plats på taket
  const rows = 2;
  const cols = Math.ceil(count / rows);
  return (
    <group rotation={[-0.55, Math.PI / 4, 0]} position={[0, 0.95, 0]}>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((__, c) => {
          const idx = r * cols + c;
          if (idx >= count) return null;
          const x = (c - (cols - 1) / 2) * 0.42;
          const y = (r - (rows - 1) / 2) * -0.32;
          return (
            <mesh
              key={`${r}-${c}`}
              position={[x, 0, y]}
              castShadow
            >
              <boxGeometry args={[0.4, 0.04, 0.3]} />
              <meshStandardMaterial color="#0E0E0C" />
              <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.36, 0.27]} />
                <meshStandardMaterial
                  color="#0a3a4e"
                  emissive="#0a3a4e"
                  emissiveIntensity={0.15 + (glow - 22) * 0.08}
                  metalness={0.85}
                  roughness={0.15}
                />
              </mesh>
            </mesh>
          );
        }),
      )}
    </group>
  );
}

function Inverter({ brandId }: { brandId: string }) {
  const inv = INVERTERS.find((i) => i.id === brandId) ?? INVERTERS[0];
  const ref = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.emissiveIntensity =
        0.3 + Math.sin(clock.elapsedTime * 2) * 0.2;
    }
  });
  return (
    <group position={[-2.0, -0.55, 1.0]}>
      <mesh castShadow>
        <boxGeometry args={[0.5, 0.7, 0.18]} />
        <meshStandardMaterial color="#1A1A17" />
      </mesh>
      <mesh position={[0, 0.1, 0.1]}>
        <planeGeometry args={[0.28, 0.18]} />
        <meshStandardMaterial
          ref={ref}
          color="#3F5236"
          emissive="#3F5236"
          emissiveIntensity={0.4}
        />
      </mesh>
      <Html position={[0, -0.55, 0]} center>
        <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/65 bg-bone/85 backdrop-blur px-2 py-0.5 rounded-full border border-ink/10 whitespace-nowrap">
          {inv.brand.split(" ")[0]} · {inv.efficiency}%
        </div>
      </Html>
    </group>
  );
}

function Battery() {
  const ref = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.emissiveIntensity =
        0.4 + Math.sin(clock.elapsedTime * 1.4) * 0.3;
    }
  });
  return (
    <group position={[-2.5, -0.6, 1.0]}>
      <mesh castShadow>
        <boxGeometry args={[0.45, 0.85, 0.3]} />
        <meshStandardMaterial color="#F4F1EA" />
      </mesh>
      <mesh ref={ref as never} position={[0.235, 0, 0]}>
        <boxGeometry args={[0.015, 0.7, 0.18]} />
        <meshStandardMaterial
          color="#E9B949"
          emissive="#E9B949"
          emissiveIntensity={0.5}
        />
      </mesh>
      <Html position={[0, -0.65, 0]} center>
        <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/65 bg-bone/85 backdrop-blur px-2 py-0.5 rounded-full border border-ink/10 whitespace-nowrap">
          Batteri
        </div>
      </Html>
    </group>
  );
}

function HeatPumpUnit() {
  const fan = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (fan.current) fan.current.rotation.z += d * 4.5;
  });
  return (
    <group position={[2.4, -0.55, 0.5]}>
      <mesh castShadow>
        <boxGeometry args={[0.95, 0.65, 0.4]} />
        <meshStandardMaterial color="#2A2A26" />
      </mesh>
      <mesh position={[0, 0, 0.21]}>
        <ringGeometry args={[0.13, 0.27, 32]} />
        <meshStandardMaterial color="#0E0E0C" />
      </mesh>
      <group ref={fan} position={[0, 0, 0.23]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} rotation={[0, 0, (i / 5) * Math.PI * 2]}>
            <boxGeometry args={[0.04, 0.24, 0.02]} />
            <meshStandardMaterial color="#F4F1EA" />
          </mesh>
        ))}
      </group>
      <Html position={[0, -0.5, 0]} center>
        <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/65 bg-bone/85 backdrop-blur px-2 py-0.5 rounded-full border border-ink/10 whitespace-nowrap">
          Värmepump
        </div>
      </Html>
    </group>
  );
}

function ChargerUnit() {
  return (
    <group position={[1.7, -0.5, 1.5]}>
      <mesh castShadow>
        <boxGeometry args={[0.22, 0.48, 0.1]} />
        <meshStandardMaterial color="#E9B949" />
      </mesh>
      <mesh position={[0, 0.1, 0.06]}>
        <planeGeometry args={[0.12, 0.16]} />
        <meshStandardMaterial
          color="#0E0E0C"
          emissive="#3F5236"
          emissiveIntensity={0.5}
        />
      </mesh>
      <Html position={[0, -0.4, 0]} center>
        <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/65 bg-bone/85 backdrop-blur px-2 py-0.5 rounded-full border border-ink/10 whitespace-nowrap">
          Laddbox
        </div>
      </Html>
    </group>
  );
}

function TurbineUnit() {
  const blades = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (blades.current) blades.current.rotation.z += d * 1.6;
  });
  return (
    <group position={[2.6, 0.5, -1.3]}>
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 1.6, 16]} />
        <meshStandardMaterial color="#F4F1EA" />
      </mesh>
      <mesh position={[0, 0.35, 0.05]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#1A1A17" />
      </mesh>
      <group ref={blades} position={[0, 0.35, 0.1]}>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            rotation={[0, 0, (i / 3) * Math.PI * 2]}
            position={[0, 0.35, 0]}
          >
            <boxGeometry args={[0.05, 0.7, 0.02]} />
            <meshStandardMaterial color="#F4F1EA" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function FlowLines({ input }: { input: CalcInput }) {
  // Animerade partiklar mellan komponenterna för att illustrera energiflöde.
  const points = useMemo(() => {
    const list: { from: THREE.Vector3; to: THREE.Vector3; color: string }[] = [
      // sol -> växelriktare
      {
        from: new THREE.Vector3(0, 0.95, 0),
        to: new THREE.Vector3(-2, -0.4, 1.0),
        color: "#E9B949",
      },
    ];
    if (input.batteryId) {
      list.push({
        from: new THREE.Vector3(-2, -0.4, 1.0),
        to: new THREE.Vector3(-2.5, -0.6, 1.0),
        color: "#E9B949",
      });
    }
    if (input.heatPumpId) {
      list.push({
        from: new THREE.Vector3(-2, -0.4, 1.0),
        to: new THREE.Vector3(2.4, -0.55, 0.5),
        color: "#3F5236",
      });
    }
    if (input.chargerId) {
      list.push({
        from: new THREE.Vector3(-2, -0.4, 1.0),
        to: new THREE.Vector3(1.7, -0.4, 1.5),
        color: "#B86F3C",
      });
    }
    if (input.turbineId) {
      list.push({
        from: new THREE.Vector3(2.6, 0.7, -1.3),
        to: new THREE.Vector3(-2, -0.4, 1.0),
        color: "#3F5236",
      });
    }
    return list;
  }, [input]);

  return (
    <>
      {points.map((p, i) => (
        <FlowLine key={i} from={p.from} to={p.to} color={p.color} />
      ))}
    </>
  );
}

function FlowLine({
  from,
  to,
  color,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  color: string;
}) {
  const dotRef = useRef<THREE.Mesh>(null);
  const tRef = useRef(Math.random());

  useFrame((_, delta) => {
    tRef.current = (tRef.current + delta * 0.5) % 1;
    if (dotRef.current) {
      const v = new THREE.Vector3().lerpVectors(from, to, tRef.current);
      dotRef.current.position.copy(v);
    }
  });

  // Render line + moving dot
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints([from, to]);
    return g;
  }, [from, to]);

  return (
    <>
      <line>
        <primitive object={geometry} attach="geometry" />
        <lineBasicMaterial color={color} transparent opacity={0.35} />
      </line>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
        />
      </mesh>
    </>
  );
}
