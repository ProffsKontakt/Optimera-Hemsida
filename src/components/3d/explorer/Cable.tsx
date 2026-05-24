"use client";

import { useMemo, useState } from "react";
import * as THREE from "three";
import type { CableConfig, InfoPanelContent, PortType } from "./types";

/**
 * Renderar en kabel som TubeGeometry längs en CatmullRomCurve3.
 *
 * Routing-logik:
 * - Om manuella waypoints finns används dom (start, ...waypoints, slut).
 * - Annars genereras default-routing: rakt ner från start till y=0.05, längs
 *   golvet i en rät linje till mål-x/z, och rakt upp till slutpunkten. Detta
 *   ger ett "kabel som ligger på golvet"-utseende som funkar för battery-
 *   och solar-explorerns layouts.
 *
 * Klickbar: vid klick anropas onSelect med kabelns infopanel-content.
 */

const CABLE_COLOR_FALLBACK: Record<PortType, string> = {
  "dc-power": "#ef4444",
  "dc-string": "#f97316",
  "dc-main": "#dc2626",
  comms: "#3b82f6",
  "ac-power": "#1f2937",
  ground: "#10b981",
};

const PORT_TYPE_LABEL: Record<PortType, string> = {
  "dc-power": "DC-effekt",
  "dc-string": "DC-string",
  "dc-main": "DC-huvudkabel",
  comms: "Kommunikation",
  "ac-power": "AC-effekt",
  ground: "Skyddsjord",
};

const PORT_TYPE_DESCRIPTION: Record<PortType, string> = {
  "dc-power":
    "Likström mellan batterimoduler eller mellan solpanel och optimerare. Kort, fet kabel.",
  "dc-string":
    "Seriekopplade solpaneler levererar likström i en sträng. En sträng = en kabel ner till växelriktaren.",
  "dc-main":
    "Huvudkabel från batteriet till växelriktaren. Bär all batterieffekt och behöver fet area.",
  comms:
    "Datakabel (CAN/RS-485) som låter växelriktaren prata med batteriet – laddnivå, larm, börvärden.",
  "ac-power":
    "Växelström från växelriktaren ut till elcentralen. Det är här huset slutligen tar emot energin.",
  ground:
    "Skyddsjord. Säkerhetskrav, ska finnas på allt som kan bli spänningsförande.",
};

export function Cable({
  config,
  fromWorld,
  toWorld,
  onSelect,
}: {
  config: CableConfig;
  fromWorld: [number, number, number];
  toWorld: [number, number, number];
  onSelect?: (content: InfoPanelContent) => void;
}) {
  const [hovered, setHovered] = useState(false);

  const tube = useMemo(() => {
    const points: THREE.Vector3[] = [];
    points.push(new THREE.Vector3(...fromWorld));
    if (config.waypoints && config.waypoints.length > 0) {
      for (const wp of config.waypoints) {
        points.push(new THREE.Vector3(...wp));
      }
    } else {
      const floorY = 0.05;
      points.push(new THREE.Vector3(fromWorld[0], floorY, fromWorld[2]));
      points.push(new THREE.Vector3(toWorld[0], floorY, toWorld[2]));
    }
    points.push(new THREE.Vector3(...toWorld));
    const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5);
    return new THREE.TubeGeometry(curve, 48, config.thickness, 8, false);
  }, [config.thickness, config.waypoints, fromWorld, toWorld]);

  return (
    <mesh
      geometry={tube}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.({
          title: PORT_TYPE_LABEL[config.type],
          subtitle: `${config.fromPort} → ${config.toPort}`,
          body: PORT_TYPE_DESCRIPTION[config.type],
          tags: [config.type],
        });
      }}
    >
      <meshStandardMaterial
        color={config.color || CABLE_COLOR_FALLBACK[config.type]}
        emissive={hovered ? "#ffffff" : "#000000"}
        emissiveIntensity={hovered ? 0.15 : 0}
        roughness={0.5}
        metalness={0.1}
      />
    </mesh>
  );
}
