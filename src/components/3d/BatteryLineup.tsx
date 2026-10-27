"use client";

import { Canvas } from "@react-three/fiber";
import { Bounds, PresentationControls } from "@react-three/drei";
import { EwayBattery, ewayModules, ewayStackHeight } from "./products/EwayBattery";
import { SajHS3, sajHeight, sajModules } from "./products/SajHS3";
import { EnershareCore, enershareModules, enershareTowerHeight } from "./products/EnershareCore";
import { SigenStor, sigenModules, sigenStackHeight } from "./products/SigenStor";
import { StudioFloor, StudioLights } from "./products/Studio";

/**
 * De fyra batterierna i sortimentet sida vid sida, i samma skala och vid
 * ungefär samma kapacitet (cirka 20 kWh), så att besökaren ser hur olika
 * stora de blir. Modellerna är i meter och byggda efter tillverkarnas mått
 * där sådana finns, annars efter produktbilderna. Namn och kapacitet står
 * i en vanlig HTML-rad under scenen (LINEUP), inte som etiketter i 3D.
 */
export const LINEUP = [
  { id: "eway", name: "Eway", kWh: 23.04, modules: ewayModules(23.04), height: ewayStackHeight(ewayModules(23.04)), width: 0.65, Model: EwayBattery },
  { id: "saj", name: "SAJ HS3", kWh: 20, modules: sajModules(20), height: sajHeight(sajModules(20)), width: 0.695, Model: SajHS3 },
  { id: "enershare", name: "Enershare", kWh: 19.2, modules: enershareModules(19.2), height: enershareTowerHeight(enershareModules(19.2)), width: 0.65, Model: EnershareCore },
  { id: "sigen", name: "SigenStor", kWh: 18, modules: sigenModules(18), height: sigenStackHeight(sigenModules(18)), width: 0.767, Model: SigenStor },
] as const;

const GAP = 0.32;

export function BatteryLineup() {
  const total = LINEUP.reduce((s, b) => s + b.width, 0) + GAP * (LINEUP.length - 1);
  let x = -total / 2;
  const placed = LINEUP.map((b) => {
    const cx = x + b.width / 2;
    x += b.width + GAP;
    return { ...b, cx };
  });
  return (
    <Canvas shadows camera={{ position: [0.4, 0.9, 5.2], fov: 24 }} dpr={[1, 2]} className="!absolute inset-0" gl={{ antialias: true, alpha: true }}>
      <color attach="background" args={["#ECE6D8"]} />
      <StudioLights />
      <PresentationControls global={false} cursor snap speed={1.2} polar={[-0.08, 0.15]} azimuth={[-0.5, 0.5]}>
        <Bounds fit clip observe margin={0.98}>
          <group position={[0, -1, 0]} rotation={[0, -0.18, 0]}>
            {placed.map((b) => (
              <group key={b.id} position={[b.cx, 0, 0]}>
                <b.Model capacityKWh={b.kWh} />
              </group>
            ))}
          </group>
        </Bounds>
      </PresentationControls>
      <StudioFloor y={-1} scale={6} opacity={0.4} />
    </Canvas>
  );
}
