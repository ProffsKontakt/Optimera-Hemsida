"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";
import { SceneLabel } from "./SceneLabel";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { computeCalc, type CalcInput, type CalcResult } from "@/lib/calc";
import { type RoofType } from "@/lib/catalog";
import { BatteryByBrand } from "./BatteryModels";
import { SolarPanel } from "./products/SolarPanel";
import { HybridInverter } from "./products/HybridInverter";
import { HeatPump, HEAT_PUMP_SIZE } from "./products/HeatPump";
import { ZaptecGo2 } from "./products/ZaptecGo2";
import { StudioLights } from "./products/Studio";

// ----- Hus-mått (metaforisk skala). Allt 3D-arbete utgår från dessa.
const HOUSE = {
  width: 3.4, // x-led (gavel-till-gavel = nockens längd)
  depth: 2.6, // z-led (takfot-till-takfot)
  wallH: 1.0,
  ridgeH: 0.95, // höjd från vägg-toppen upp till nocken
  wallY: 0, // mittpunkt på väggen (centrum y)
};
const wallTopY = HOUSE.wallY + HOUSE.wallH / 2; // y där taket börjar
const ridgeY = wallTopY + HOUSE.ridgeH; // y för nocken (sadeltak/mansard/valmat)
const slopeRun = HOUSE.depth / 2;
const slopeAngle = Math.atan2(HOUSE.ridgeH, slopeRun); // sadel-taklutning

// Valmat-takets nocklängd (kortare än husets bredd, men längre än ren pyramid).
// 0,7 × bredden ger realistiskt hip-utseende: trapezerna dominerar, hip-end-
// trianglarna är små. Påverkar både roof-meshen och solpanelernas widthM.
const HIP_RIDGE_LEN = HOUSE.width * 0.7;

// =============== SOLPANEL-SURFACES per taktyp ===============
// En SolarSurface beskriver ett rektangulärt område där paneler kan placeras.
// Panelens grid byggs i lokal XY-plan med (0,0) i centrum, sedan flyttas
// gruppen via position och roteras via rotation.
type SolarSurface = {
  position: [number, number, number];
  rotation: [number, number, number];
  /** Bredd (lokal X) och djup (lokal Z) i meter. */
  widthM: number;
  depthM: number;
  /** Hur många paneler får plats max på denna yta. */
  capacity: number;
  /**
   * True om lokal +Z går mot toppen av taket (norra slope-konvention med
   * rotation [-α, 0, 0]). Default false: lokal +Z går mot eave (södra
   * slope, rotation [+α, 0, 0]). Styr panelplaceringen så att rad 0 alltid
   * landar i toppen av taket – paneler byggs uppifrån-ner.
   */
  topAtPositiveZ?: boolean;
};

function getSolarSurfaces(roofType: RoofType): SolarSurface[] {
  const w = HOUSE.width;
  const d = HOUSE.depth;
  const ridge = HOUSE.ridgeH;

  switch (roofType) {
    case "sadeltak": {
      // Två symmetriska takfall, södra (+z) prioriteras.
      const slopeY = wallTopY + ridge / 2;
      const slopeLen = Math.hypot(slopeRun, ridge);
      return [
        {
          position: [0, slopeY, d / 4],
          rotation: [slopeAngle, 0, 0],
          widthM: w - 0.2,
          depthM: slopeLen - 0.15,
          capacity: 24,
        },
        {
          position: [0, slopeY, -d / 4],
          rotation: [-slopeAngle, 0, 0],
          widthM: w - 0.2,
          depthM: slopeLen - 0.15,
          capacity: 24,
          topAtPositiveZ: true,
        },
      ];
    }

    case "pulpettak": {
      // Ett enda takfall över hela djupet. Lågpunkt vid +z, högpunkt vid -z.
      const angle = Math.atan2(ridge, d);
      const slopeLen = Math.hypot(d, ridge);
      const cy = wallTopY + ridge / 2;
      return [
        {
          position: [0, cy, 0],
          rotation: [angle, 0, 0],
          widthM: w - 0.2,
          depthM: slopeLen - 0.15,
          capacity: 36,
        },
      ];
    }

    case "mansardtak": {
      // Mansardtak: lägre brant del + övre flackare del. Paneler placeras
      // alltid på den övre flackare delen (södra + norra).
      const inset = slopeRun * 0.36; // hur långt in brytpunkten ligger
      const breakY = ridge * 0.5;
      const upperRun = slopeRun - inset;
      const upperRise = ridge - breakY;
      const upperAngle = Math.atan2(upperRise, upperRun);
      const upperLen = Math.hypot(upperRun, upperRise);
      const cyUpper = wallTopY + breakY + upperRise / 2;
      const czUpper = (slopeRun - inset) / 2; // mittpunkt i z
      return [
        {
          position: [0, cyUpper, czUpper],
          rotation: [upperAngle, 0, 0],
          widthM: w - 0.2,
          depthM: upperLen - 0.1,
          capacity: 18,
        },
        {
          position: [0, cyUpper, -czUpper],
          rotation: [-upperAngle, 0, 0],
          widthM: w - 0.2,
          depthM: upperLen - 0.1,
          capacity: 18,
          topAtPositiveZ: true,
        },
      ];
    }

    case "valmat": {
      // Hipped roof: 4 takfall, södra långsida (+z) är en trapez. Vi placerar
      // paneler i en rektangel som ryms inom trapezet (begränsad av nockens
      // längd så panelerna inte sticker ut över hip-kanterna).
      const ridgeLen = HIP_RIDGE_LEN;
      const slopeY = wallTopY + ridge / 2;
      const slopeLen = Math.hypot(slopeRun, ridge);
      return [
        {
          position: [0, slopeY, d / 4],
          rotation: [slopeAngle, 0, 0],
          widthM: ridgeLen,
          depthM: slopeLen - 0.2,
          capacity: 24,
        },
        {
          position: [0, slopeY, -d / 4],
          rotation: [-slopeAngle, 0, 0],
          widthM: ridgeLen,
          depthM: slopeLen - 0.2,
          capacity: 24,
          topAtPositiveZ: true,
        },
      ];
    }
  }
}

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
      <color attach="background" args={["#EFE9DC"]} />
      {/* Samma produktljus som tjänstescenerna: skuggor + ljusbanker som
          speglas i panelglas, lack och krom. */}
      <StudioLights shadowSize={2048} envIntensity={0.45} keyIntensity={1.35} />

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

      <House roofType={input.roofType} />

      {en.sol && (
        <PanelArray count={input.panelCount} roofType={input.roofType} />
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

// ============= HUS =============

const WALL_COLOR = "#F4F1EA";
const ROOF_COLOR = "#3F5236";

function House({ roofType }: { roofType: RoofType }) {
  const w = HOUSE.width;
  const d = HOUSE.depth;
  const h = HOUSE.wallH;

  return (
    <group>
      {/* Vägg-volym (alltid samma) */}
      <mesh position={[0, HOUSE.wallY, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={WALL_COLOR} roughness={0.85} />
      </mesh>

      {/* Tak + gavel-fyllning per taktyp */}
      {roofType === "sadeltak" && <SaddleRoof />}
      {roofType === "mansardtak" && <MansardRoof />}
      {roofType === "valmat" && <HipRoof />}
      {roofType === "pulpettak" && <ShedRoof />}

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

// ---- Sadeltak (klassisk gavel + nock) ----
function SaddleRoof() {
  const w = HOUSE.width;
  const d = HOUSE.depth;
  const ridge = HOUSE.ridgeH;
  const slopeLen = Math.hypot(slopeRun, ridge);
  const slopeY = wallTopY + ridge / 2;
  return (
    <>
      <mesh
        position={[w / 2 + 0.002, wallTopY, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <shapeGeometry args={[gableShape(d, ridge)]} />
        <meshStandardMaterial
          color={WALL_COLOR}
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
          color={WALL_COLOR}
          roughness={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>
      {[1, -1].map((sign) => (
        <mesh
          key={sign}
          position={[0, slopeY, (sign * d) / 4]}
          rotation={[sign * slopeAngle, 0, 0]}
          castShadow
        >
          <boxGeometry args={[w + 0.1, 0.05, slopeLen + 0.05]} />
          <meshStandardMaterial color={ROOF_COLOR} roughness={0.7} />
        </mesh>
      ))}
    </>
  );
}

// ---- Mansardtak (brant lägre + flack övre del) ----
function MansardRoof() {
  const w = HOUSE.width;
  const d = HOUSE.depth;
  const ridge = HOUSE.ridgeH;
  const inset = slopeRun * 0.36;
  const breakY = ridge * 0.5;

  const lowerRun = inset;
  const lowerRise = breakY;
  const lowerAngle = Math.atan2(lowerRise, lowerRun);
  const lowerLen = Math.hypot(lowerRun, lowerRise);
  const lowerCy = wallTopY + breakY / 2;
  const lowerCz = (slopeRun + (slopeRun - inset)) / 2; // mittpunkt z

  const upperRun = slopeRun - inset;
  const upperRise = ridge - breakY;
  const upperAngle = Math.atan2(upperRise, upperRun);
  const upperLen = Math.hypot(upperRun, upperRise);
  const upperCy = wallTopY + breakY + upperRise / 2;
  const upperCz = (slopeRun - inset) / 2;

  return (
    <>
      {/* Gavel-fyllning (5-hörnig) på östra och västra kortsidan */}
      <mesh
        position={[w / 2 + 0.002, wallTopY, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <shapeGeometry args={[mansardGableShape(d, ridge, inset, breakY)]} />
        <meshStandardMaterial
          color={WALL_COLOR}
          roughness={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        position={[-w / 2 - 0.002, wallTopY, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <shapeGeometry args={[mansardGableShape(d, ridge, inset, breakY)]} />
        <meshStandardMaterial
          color={WALL_COLOR}
          roughness={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Lägre branta takfall (södra + norra) */}
      {[1, -1].map((sign) => (
        <mesh
          key={`lo${sign}`}
          position={[0, lowerCy, sign * lowerCz]}
          rotation={[sign * lowerAngle, 0, 0]}
          castShadow
        >
          <boxGeometry args={[w + 0.1, 0.05, lowerLen + 0.05]} />
          <meshStandardMaterial color={ROOF_COLOR} roughness={0.7} />
        </mesh>
      ))}
      {/* Övre flackare takfall (södra + norra) */}
      {[1, -1].map((sign) => (
        <mesh
          key={`up${sign}`}
          position={[0, upperCy, sign * upperCz]}
          rotation={[sign * upperAngle, 0, 0]}
          castShadow
        >
          <boxGeometry args={[w + 0.1, 0.05, upperLen + 0.05]} />
          <meshStandardMaterial color={ROOF_COLOR} roughness={0.7} />
        </mesh>
      ))}
    </>
  );
}

// ---- Valmat tak (4 takfall, kort nock på toppen) ----
function HipRoof() {
  const w = HOUSE.width;
  const d = HOUSE.depth;
  const ridge = HOUSE.ridgeH;
  const ridgeLen = HIP_RIDGE_LEN;

  // Definiera de fyra takfallens hörn i världskoordinater och bygg
  // BufferGeometry per face. Alla faces är plana = giltiga ytor.
  const eaveSE: [number, number, number] = [w / 2, wallTopY, d / 2];
  const eaveSW: [number, number, number] = [-w / 2, wallTopY, d / 2];
  const eaveNE: [number, number, number] = [w / 2, wallTopY, -d / 2];
  const eaveNW: [number, number, number] = [-w / 2, wallTopY, -d / 2];
  const ridgeE: [number, number, number] = [ridgeLen / 2, wallTopY + ridge, 0];
  const ridgeW: [number, number, number] = [-ridgeLen / 2, wallTopY + ridge, 0];

  return (
    <>
      {/* Södra trapez (z = +d/2 → nock) */}
      <FlatFace verts={[eaveSW, eaveSE, ridgeE, ridgeW]} color={ROOF_COLOR} />
      {/* Norra trapez (z = -d/2 → nock) */}
      <FlatFace verts={[eaveNE, eaveNW, ridgeW, ridgeE]} color={ROOF_COLOR} />
      {/* Östra triangel (x = +w/2 → östra nockände) */}
      <FlatFace verts={[eaveSE, eaveNE, ridgeE]} color={ROOF_COLOR} />
      {/* Västra triangel (x = -w/2 → västra nockände) */}
      <FlatFace verts={[eaveNW, eaveSW, ridgeW]} color={ROOF_COLOR} />
    </>
  );
}

// ---- Pulpettak (en enda lutning) ----
function ShedRoof() {
  const w = HOUSE.width;
  const d = HOUSE.depth;
  const ridge = HOUSE.ridgeH;
  const angle = Math.atan2(ridge, d);
  const slopeLen = Math.hypot(d, ridge);
  return (
    <>
      {/* Trapezoidala gavlar (kortsidorna). Lågpunkt vid +z, högpunkt vid -z. */}
      <mesh
        position={[w / 2 + 0.002, wallTopY, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <shapeGeometry args={[shedGableShape(d, ridge, false)]} />
        <meshStandardMaterial
          color={WALL_COLOR}
          roughness={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        position={[-w / 2 - 0.002, wallTopY, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <shapeGeometry args={[shedGableShape(d, ridge, true)]} />
        <meshStandardMaterial
          color={WALL_COLOR}
          roughness={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Ett enda takfall över hela djupet */}
      <mesh
        position={[0, wallTopY + ridge / 2, 0]}
        rotation={[angle, 0, 0]}
        castShadow
      >
        <boxGeometry args={[w + 0.1, 0.05, slopeLen + 0.05]} />
        <meshStandardMaterial color={ROOF_COLOR} roughness={0.7} />
      </mesh>
    </>
  );
}

// ---- Hjälpkomponent: en plan polygon-yta från world-vertices ----
function FlatFace({
  verts,
  color,
}: {
  verts: [number, number, number][];
  color: string;
}) {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    // Triangulera fan från första hörnet (works för konvexa polygoner).
    const tris: number[] = [];
    for (let i = 1; i < verts.length - 1; i++) {
      tris.push(...verts[0], ...verts[i], ...verts[i + 1]);
    }
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(tris), 3),
    );
    g.computeVertexNormals();
    return g;
  }, [verts]);
  return (
    <mesh geometry={geometry} castShadow>
      <meshStandardMaterial
        color={color}
        roughness={0.7}
        side={THREE.DoubleSide}
      />
    </mesh>
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

/**
 * Mansardtak-gavel: 5-hörnig polygon. Bas i botten, två branta sidor upp till
 * brytpunkterna, sedan flackare lutning upp till nocken.
 */
function mansardGableShape(
  base: number,
  ridgeHeight: number,
  inset: number,
  breakHeight: number,
) {
  const s = new THREE.Shape();
  s.moveTo(-base / 2, 0);
  s.lineTo(base / 2, 0);
  s.lineTo(base / 2 - inset, breakHeight);
  s.lineTo(0, ridgeHeight);
  s.lineTo(-base / 2 + inset, breakHeight);
  s.lineTo(-base / 2, 0);
  return s;
}

/**
 * Pulpettak-gavel: rätvinklig triangel där ena sidan är låg (höjd 0) och
 * andra sidan är hög (höjd ridgeHeight). `flip` speglar shape-x så båda
 * gavlar pekar utåt korrekt efter rotation.
 */
function shedGableShape(base: number, ridgeHeight: number, flip: boolean) {
  const s = new THREE.Shape();
  if (flip) {
    s.moveTo(-base / 2, 0);
    s.lineTo(base / 2, 0);
    s.lineTo(-base / 2, ridgeHeight);
    s.lineTo(-base / 2, 0);
  } else {
    s.moveTo(-base / 2, 0);
    s.lineTo(base / 2, 0);
    s.lineTo(base / 2, ridgeHeight);
    s.lineTo(-base / 2, 0);
  }
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

function PanelArray({
  count,
  roofType,
}: {
  count: number;
  roofType: RoofType;
}) {
  const surfaces = useMemo(() => getSolarSurfaces(roofType), [roofType]);
  // Distribuera paneler i prio-ordning över ytorna. Södra prio över norra.
  let remaining = count;
  return (
    <>
      {surfaces.map((surface, i) => {
        const c = Math.min(remaining, surface.capacity);
        if (c <= 0) return null;
        remaining -= c;
        return (
          <SurfacePanels key={i} surface={surface} count={c} />
        );
      })}
    </>
  );
}

function SurfacePanels({
  surface,
  count,
}: {
  surface: SolarSurface;
  count: number;
}) {
  // Bestäm grid (cols × rows) som ger högst paneltäckning på ytan utan att
  // gå utanför kanterna. Standardpanel är ~1953×1134 mm = ratio 0,58.
  const aspect = 1134 / 1953;
  const cols = surface.widthM > surface.depthM ? 6 : 4;
  // Beräkna panelbredd och se om grid-djup passar; annars öka rows.
  const panelW = surface.widthM / cols;
  const panelD = panelW * aspect;
  const rowsFit = Math.max(1, Math.floor(surface.depthM / panelD));
  // För surfaces där lokal +Z går mot toppen (norra slope-konvention) flippar
  // vi z-tecknet så att rad 0 alltid landar i toppen av taket.
  const dirZ = surface.topAtPositiveZ ? -1 : 1;
  return (
    <group position={surface.position} rotation={surface.rotation}>
      {Array.from({ length: rowsFit }).map((_, r) =>
        Array.from({ length: cols }).map((__, c) => {
          const idx = r * cols + c;
          if (idx >= count) return null;
          const x = (c - (cols - 1) / 2) * panelW;
          const z = dirZ * (r - (rowsFit - 1) / 2) * panelD;
          return (
            // Liggande panel: långsidan längs x. SolarPanel ritas stående
            // (långsidan längs z) och vrids därför 90°.
            <group key={`${r}-${c}`} position={[x, 0.035, z]} rotation={[0, Math.PI / 2, 0]}>
              <SolarPanel width={panelD * 0.95} length={panelW * 0.96} thickness={0.04} />
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
  // Väggmonterad på gaveln med fronten utåt (+x).
  return (
    <group position={[HOUSE.width / 2, GABLE_GROUND_Y + 0.62, -0.95]} rotation={[0, Math.PI / 2, 0]}>
      <group scale={0.75}>
        <HybridInverter />
      </group>
      <SceneLabel parts={[assignment.brand, `${assignment.kw} kW`]} position={[0.4, -0.3, 0.2]} />
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
  // Batteriet står mot gaveln, vridet +90° runt y så att fronten (handtag,
  // logga, kontaktpanel) pekar UTÅT från fasaden.
  return (
    <group
      position={[HOUSE.width / 2 + 0.2, GABLE_GROUND_Y, -0.15]}
      rotation={[0, Math.PI / 2, 0]}
    >
      <BatteryByBrand brandId={brandId} capacityKWh={capacityKWh} />
    </group>
  );
}

function HeatPumpUnit() {
  // Utedelen står vid gaveln med fläkten utåt (+x).
  const scale = 0.62;
  return (
    <group
      position={[HOUSE.width / 2 + (HEAT_PUMP_SIZE.depth / 2) * scale + 0.14, GABLE_GROUND_Y, 0.75]}
      rotation={[0, Math.PI / 2, 0]}
    >
      <group scale={scale}>
        <HeatPump />
      </group>
      <SceneLabel parts={["Värmepump"]} position={[0, -0.12, 0.45]} />
    </group>
  );
}

function ChargerUnit() {
  // Zaptec Go 2 på husets framsida, mellan dörren och högra fönstret.
  return (
    <group position={[0.55, GABLE_GROUND_Y + 0.5, HOUSE.depth / 2]}>
      <group scale={1.65}>
        <ZaptecGo2 />
      </group>
      <SceneLabel parts={["Laddbox"]} position={[0, -0.36, 0.1]} center />
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
