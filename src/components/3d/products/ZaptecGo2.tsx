"use client";

import { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import { FONT, pillShape, useCanvasTexture } from "./textures";

/**
 * Zaptec Go 2 – laddboxen vi oftast installerar, modellerad efter
 * produktbilden: matt svart kropp, en upphöjd blank "pill" på fronten med
 * rund display och ljusring upptill och ett typ 2-uttag med fällbar lucka
 * nedtill, räfflade sidor och Zaptec-loggan i nedre högra hörnet.
 *
 * Mått i meter (ca 186 × 256 × 115 mm). Origo = mitt på baksidan (mot
 * väggen), fronten pekar mot +z. Skala med en omslutande <group scale>.
 */
const W = 0.186;
const H = 0.256;
const D = 0.112;

const BODY = "#151515";

export function ZaptecGo2() {
  const pill = useMemo(() => pillShape(W * 0.58, H * 0.8), []);
  const pillGroove = useMemo(() => pillShape(W * 0.6, H * 0.815), []);
  const pillY = -H * 0.01;
  const displayY = H * 0.295;
  const lidY = -H * 0.227;
  const lidR = W * 0.2;
  const front = D;

  const display = useCanvasTexture("zaptec-display", 256, 256, (ctx, w, h) => {
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, w, h);
    // Z-loggan
    ctx.strokeStyle = "#f4f4f4";
    ctx.lineWidth = 9;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(w * 0.43, h * 0.33);
    ctx.lineTo(w * 0.57, h * 0.33);
    ctx.lineTo(w * 0.45, h * 0.53);
    ctx.lineTo(w * 0.59, h * 0.53);
    ctx.stroke();
    ctx.fillStyle = "#d8d8d8";
    ctx.font = `500 21px ${FONT}`;
    ctx.textAlign = "center";
    ctx.fillText("Σ 4291.3 kWh", w / 2, h * 0.7);
  });

  const logo = useCanvasTexture("zaptec-logo", 256, 64, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "#e8e8e8";
    ctx.fillStyle = "#e8e8e8";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(h / 2, h / 2, h * 0.36, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(h * 0.38, h * 0.36);
    ctx.lineTo(h * 0.62, h * 0.36);
    ctx.lineTo(h * 0.38, h * 0.64);
    ctx.lineTo(h * 0.62, h * 0.64);
    ctx.stroke();
    ctx.font = `500 34px ${FONT}`;
    ctx.textBaseline = "middle";
    ctx.fillText("Zaptec", h * 1.05, h * 0.54);
  });

  const extrude = { depth: 0.003, bevelEnabled: true, bevelThickness: 0.0015, bevelSize: 0.0015, bevelSegments: 3, curveSegments: 48 };

  return (
    <group>
      {/* Väggfäste */}
      <mesh position={[0, 0, 0.004]} receiveShadow>
        <boxGeometry args={[W * 0.8, H * 0.86, 0.008]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.7} />
      </mesh>

      {/* Kroppen */}
      <RoundedBox args={[W, H, D - 0.008]} radius={0.016} smoothness={5} position={[0, 0, 0.008 + (D - 0.008) / 2]} castShadow receiveShadow>
        <meshPhysicalMaterial color={BODY} roughness={0.62} metalness={0.05} clearcoat={0.15} clearcoatRoughness={0.6} />
      </RoundedBox>

      {/* Räfflade sidor – trappstegsprofilen som syns på produktbilden */}
      {[-1, 1].map((side) =>
        Array.from({ length: 6 }).map((_, i) => {
          const y = H * 0.38 - i * (H * 0.76) / 5;
          return (
            <mesh key={`${side}-${i}`} position={[side * (W / 2 - 0.0004), y, D * 0.52]} rotation={[0, 0, side * 0.14]} castShadow>
              <boxGeometry args={[0.003, H * 0.115, D * 0.74]} />
              <meshStandardMaterial color="#1b1b1b" roughness={0.55} />
            </mesh>
          );
        }),
      )}

      {/* Spår runt pillret + själva pillret i blank svart */}
      <mesh position={[0, pillY, front - 0.0002]}>
        <shapeGeometry args={[pillGroove, 48]} />
        <meshStandardMaterial color="#060606" roughness={0.8} />
      </mesh>
      <mesh position={[0, pillY, front - 0.0012]} castShadow>
        <extrudeGeometry args={[pill, extrude]} />
        <meshPhysicalMaterial color="#060606" roughness={0.3} metalness={0.1} clearcoat={0.7} clearcoatRoughness={0.18} envMapIntensity={0.55} />
      </mesh>

      {/* Display med ljusring */}
      <group position={[0, displayY, front + 0.0036]}>
        <mesh>
          <circleGeometry args={[W * 0.168, 64]} />
          <meshStandardMaterial color="#020202" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.0008]}>
          <torusGeometry args={[W * 0.152, W * 0.0075, 16, 96]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.4} roughness={0.2} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.0012]}>
          <circleGeometry args={[W * 0.142, 64]} />
          <meshPhysicalMaterial color="#000000" emissive="#ffffff" emissiveMap={display} emissiveIntensity={0.9} roughness={0.08} clearcoat={1} />
        </mesh>
      </group>

      {/* Gångjärn mellan display och lucka */}
      <RoundedBox args={[W * 0.13, W * 0.07, 0.009]} radius={0.003} smoothness={3} position={[0, lidY + lidR + W * 0.028, front + 0.006]} castShadow>
        <meshPhysicalMaterial color="#0d0d0d" roughness={0.35} clearcoat={0.8} />
      </RoundedBox>

      {/* Lucka över typ 2-uttaget */}
      <group position={[0, lidY, front + 0.0055]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[lidR, lidR, 0.008, 72]} />
          <meshPhysicalMaterial color="#101010" roughness={0.38} clearcoat={0.7} clearcoatRoughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.0042]}>
          <torusGeometry args={[lidR * 0.9, 0.0012, 8, 72]} />
          <meshStandardMaterial color="#050505" roughness={0.6} />
        </mesh>
        {/* Greppflik nedtill */}
        <RoundedBox args={[W * 0.11, W * 0.05, 0.012]} radius={0.002} smoothness={3} position={[0, -lidR - W * 0.01, 0.002]} castShadow>
          <meshPhysicalMaterial color="#0d0d0d" roughness={0.35} clearcoat={0.8} />
        </RoundedBox>
      </group>

      {/* Zaptec-loggan nere till höger */}
      <mesh position={[W * 0.27, -H * 0.43, front + 0.0006]}>
        <planeGeometry args={[W * 0.34, W * 0.085]} />
        <meshBasicMaterial map={logo} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

export const ZAPTEC_GO2_SIZE = { width: W, height: H, depth: D };
