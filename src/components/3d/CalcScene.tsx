"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, OrbitControls, Html } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { computeCalc, type CalcInput, type CalcResult } from "@/lib/calc";
import { PANELS } from "@/lib/catalog";
import { BatteryByBrand } from "./BatteryModels";

// ----- Hus-mått (metaforisk skala). Allt 3D-arbete utgår från dessa.
const HOUSE = {
  width: 3.4, // x-led (gavel-till-gavel = nockens längd)
  depth: 2.6, // z-led (takfot-till-takfot)
  wallH: 1.0,
  ridgeH: 0.95, // höjd från vägg-toppen upp till nocken
  wallY: 0, // mittpunkt på väggen (centrum y)
};
const wallTopY = HOUSE.wallY + HOUSE.wallH / 2; // y där taket börjar
const ridgeY = wallTopY + HOUSE.ridgeH; // y för nocken
const slopeRun = HOUSE.depth / 2;
const slopeAngle = Math.atan2(HOUSE.ridgeH, slopeRun); // taklutning

export function CalcScene({ input }: { input: CalcInput }) {
  const en = input.enabled;
  const result = useMemo<CalcResult>(() => computeCalc(input), [input]);
  return (
    <Canvas
      camera={{ position: [5.5, 3.4, 6.5], fov: 36 }}
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#EDEFF5"]} />
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
        position={[0, HOUSE.wallY - HOUSE.wallH / 2, 0]}
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

      {en.sol && (
        <PanelArray
          count={input.panelCount}
          glow={
            PANELS.find((p) => p.id === input.panelId)?.efficiency ?? 22
          }
        />
      )}
      {/* Växelriktare visas bara som separat enhet om den är extern – inbyggda
          växelriktare (t.ex. SAJ HS3, Emaldo Power Store) ritas in i batteriet. */}
      {(en.sol || en.batteri) && result.inverter.kind === "external" && (
        <Inverter assignment={result.inverter} />
      )}
      {en.batteri && input.batteryId && (
        <BatteryModel
          brandId={input.batteryId}
          capacityKWh={result.batteryKWh}
        />
      )}
      {en.värmepump && <HeatPumpUnit />}
      {en.laddbox && <ChargerUnit />}

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

// ============= HUS (sadeltak) =============

function House() {
  const w = HOUSE.width;
  const d = HOUSE.depth;
  const h = HOUSE.wallH;
  const ridge = HOUSE.ridgeH;

  // Sadeltakets två fall som sneda lådor
  const slopeLength = Math.hypot(slopeRun, ridge);
  const slopeY = wallTopY + ridge / 2;

  return (
    <group>
      {/* Vägg-volym */}
      <mesh position={[0, HOUSE.wallY, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color="#F4F1EA" roughness={0.85} />
      </mesh>

      {/* Sadeltakets gavel-trianglar – på kortsidorna (gavlarna), inte på
          långsidorna där dörren sitter. Triangeln har basen = husets djup
          och peak = nockhöjden. Roteras 90° runt y så normalen pekar utåt. */}
      <mesh
        position={[w / 2 + 0.002, wallTopY, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <shapeGeometry args={[gableShape(d, ridge)]} />
        <meshStandardMaterial
          color="#F4F1EA"
          roughness={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        position={[-w / 2 - 0.002, wallTopY, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <shapeGeometry args={[gableShape(d, ridge)]} />
        <meshStandardMaterial
          color="#F4F1EA"
          roughness={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Två takfall (sadel). Möts vid nocken (höga y) och faller mot
          takfoten (låga y vid z = ±d/2). */}
      {[1, -1].map((sign) => (
        <mesh
          key={sign}
          position={[0, slopeY, (sign * d) / 4]}
          rotation={[sign * slopeAngle, 0, 0]}
          castShadow
        >
          <boxGeometry args={[w + 0.1, 0.05, slopeLength + 0.05]} />
          <meshStandardMaterial color="#3F5236" roughness={0.7} />
        </mesh>
      ))}

      {/* Dörr + två fönster på samma långsida (+z) */}
      <mesh position={[0, HOUSE.wallY - 0.15, d / 2 + 0.005]}>
        <planeGeometry args={[0.45, 0.7]} />
        <meshStandardMaterial color="#1A1A17" />
      </mesh>
      <Window position={[-1.05, HOUSE.wallY + 0.05, d / 2 + 0.005]} />
      <Window position={[1.05, HOUSE.wallY + 0.05, d / 2 + 0.005]} />
    </group>
  );
}

function gableShape(base: number, ridgeHeight: number) {
  // base = husets djup (=z-dimensionen vid gavelväggen). Triangeln ligger
  // i lokal XY-plan med basen från (-base/2, 0) till (+base/2, 0) och peak
  // i (0, ridgeHeight). Position och y-rotation appliceras av meshen.
  const s = new THREE.Shape();
  s.moveTo(-base / 2, 0);
  s.lineTo(base / 2, 0);
  s.lineTo(0, ridgeHeight);
  s.lineTo(-base / 2, 0);
  return s;
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

// ============= SOLPANELER på takfallet =============

function PanelArray({ count, glow }: { count: number; glow: number }) {
  // Upp till 24 paneler placeras på södra takfallet (+z). Över 24 fortsätter
  // vi på norra takfallet (-z) så att vi täcker båda sidorna.
  const cols = 6;
  const rowsPerSlope = 4; // 6×4 = 24 paneler per takfall
  const southCount = Math.min(count, cols * rowsPerSlope);
  const northCount = Math.max(0, count - southCount);
  return (
    <>
      <SlopePanels
        count={southCount}
        cols={cols}
        rows={rowsPerSlope}
        glow={glow}
        sign={1}
      />
      {northCount > 0 && (
        <SlopePanels
          count={northCount}
          cols={cols}
          rows={rowsPerSlope}
          glow={glow}
          sign={-1}
        />
      )}
    </>
  );
}

function SlopePanels({
  count,
  cols,
  rows,
  glow,
  sign,
}: {
  count: number;
  cols: number;
  rows: number;
  glow: number;
  sign: 1 | -1;
}) {
  const panelW = (HOUSE.width - 0.2) / cols;
  const panelD = panelW * (1134 / 1953);
  const offsetY = wallTopY + HOUSE.ridgeH / 2;
  return (
    <group
      position={[0, offsetY, (sign * HOUSE.depth) / 4]}
      rotation={[sign * slopeAngle, 0, 0]}
    >
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((__, c) => {
          const idx = r * cols + c;
          if (idx >= count) return null;
          const x = (c - (cols - 1) / 2) * panelW;
          const z = (r - (rows - 1) / 2) * panelD;
          return (
            <group key={`${r}-${c}`} position={[x, 0.035, z]}>
              <mesh castShadow>
                <boxGeometry args={[panelW * 0.92, 0.04, panelD * 0.92]} />
                <meshStandardMaterial color="#0E0E0C" />
              </mesh>
              <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[panelW * 0.85, panelD * 0.85]} />
                <meshStandardMaterial
                  color="#0a3a4e"
                  emissive="#0a3a4e"
                  emissiveIntensity={0.15 + (glow - 22) * 0.08}
                  metalness={0.85}
                  roughness={0.15}
                />
              </mesh>
            </group>
          );
        }),
      )}
    </group>
  );
}

// ============= GAVEL-SIDAN: alla utomhusenheter ligger på samma sida =============
// Vi använder höger gavel (x = +HOUSE.width/2). Batteriet sätts inomhus mot
// väggen och visas till höger om huset. Värmepumpen står utanpå höger gavel.
const GABLE_X = HOUSE.width / 2 + 0.3;
const GABLE_GROUND_Y = HOUSE.wallY - HOUSE.wallH / 2;

function Inverter({
  assignment,
}: {
  assignment: Extract<CalcResult["inverter"], { kind: "external" }>;
}) {
  const ref = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.emissiveIntensity =
        0.3 + Math.sin(clock.elapsedTime * 2) * 0.2;
    }
  });
  return (
    <group position={[GABLE_X, GABLE_GROUND_Y + 0.55, -0.95]}>
      <mesh castShadow>
        <boxGeometry args={[0.18, 0.5, 0.4]} />
        <meshStandardMaterial color="#1A1A17" />
      </mesh>
      <mesh position={[0.095, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.22, 0.14]} />
        <meshStandardMaterial
          ref={ref}
          color="#3F5236"
          emissive="#3F5236"
          emissiveIntensity={0.4}
        />
      </mesh>
      <Html position={[0.4, -0.25, 0]}>
        <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/65 bg-bone/85 backdrop-blur px-2 py-0.5 rounded-full border border-ink/10 whitespace-nowrap">
          {assignment.brand} · {assignment.kw} kW
        </div>
      </Html>
    </group>
  );
}

function BatteryModel({
  brandId,
  capacityKWh,
}: {
  brandId: string;
  capacityKWh: number;
}) {
  // Vi placerar batteriet vid gavelns nedre kant och roterar -90° runt y så
  // att fronten av modellen pekar UTÅT från fasaden (mot betraktaren) istället
  // för att stå vänd mot väggen.
  return (
    <group
      position={[GABLE_X + 0.05, GABLE_GROUND_Y, -0.15]}
      rotation={[0, -Math.PI / 2, 0]}
    >
      <BatteryByBrand brandId={brandId} capacityKWh={capacityKWh} />
    </group>
  );
}

function HeatPumpUnit() {
  const fan = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (fan.current) fan.current.rotation.x += d * 4.5;
  });
  return (
    <group position={[GABLE_X + 0.05, GABLE_GROUND_Y + 0.45, 0.7]}>
      <mesh castShadow>
        <boxGeometry args={[0.4, 0.65, 0.95]} />
        <meshStandardMaterial color="#2A2A26" />
      </mesh>
      {/* Fläkten sitter på gavelsidan (lokal +x) och pekar utåt */}
      <mesh position={[0.205, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[0.13, 0.27, 32]} />
        <meshStandardMaterial color="#0E0E0C" />
      </mesh>
      <group ref={fan} position={[0.215, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} rotation={[0, 0, (i / 5) * Math.PI * 2]}>
            <boxGeometry args={[0.04, 0.24, 0.02]} />
            <meshStandardMaterial color="#F4F1EA" />
          </mesh>
        ))}
      </group>
      <Html position={[0.5, -0.4, 0]}>
        <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/65 bg-bone/85 backdrop-blur px-2 py-0.5 rounded-full border border-ink/10 whitespace-nowrap">
          Värmepump
        </div>
      </Html>
    </group>
  );
}

function ChargerUnit() {
  // Laddbox sätts på framsidan (z+) men nära höger gavel
  return (
    <group position={[HOUSE.width / 2 - 0.15, GABLE_GROUND_Y + 0.45, HOUSE.depth / 2 + 0.07]}>
      <mesh castShadow>
        <boxGeometry args={[0.22, 0.5, 0.1]} />
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

// ============= ENERGIFLÖDEN =============

function FlowLines({ input }: { input: CalcInput }) {
  const en = input.enabled;
  const points = useMemo(() => {
    const list: { from: THREE.Vector3; to: THREE.Vector3; color: string }[] =
      [];

    const inverterPos = new THREE.Vector3(GABLE_X, GABLE_GROUND_Y + 0.55, -0.7);
    const batteryPos = new THREE.Vector3(GABLE_X, GABLE_GROUND_Y + 0.45, -0.05);
    const heatPos = new THREE.Vector3(GABLE_X + 0.05, GABLE_GROUND_Y + 0.45, 0.7);
    const chargerPos = new THREE.Vector3(
      HOUSE.width / 2 - 0.15,
      GABLE_GROUND_Y + 0.45,
      HOUSE.depth / 2 + 0.07,
    );

    const roofCenter = new THREE.Vector3(
      0,
      wallTopY + HOUSE.ridgeH / 2,
      HOUSE.depth / 4,
    );

    if (en.sol) {
      list.push({ from: roofCenter, to: inverterPos, color: "#E9B949" });
    }
    if (en.batteri) {
      list.push({ from: inverterPos, to: batteryPos, color: "#E9B949" });
    }
    if (en.värmepump) {
      list.push({ from: inverterPos, to: heatPos, color: "#3F5236" });
    }
    if (en.laddbox) {
      list.push({ from: inverterPos, to: chargerPos, color: "#B86F3C" });
    }
    return list;
  }, [en.sol, en.batteri, en.värmepump, en.laddbox]);

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
