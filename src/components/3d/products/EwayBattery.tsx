"use client";

import { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { FONT, useCanvasTexture } from "./textures";

/**
 * Eway (Easyway) – vår vanligaste batteristapel, modellerad efter
 * produktbilderna på en stapel på 15,36 kWh:
 *
 *   - Breda, låga vita moduler på 7,68 kWh. Långsidan är fronten, med en
 *     ljus kant och tre skruvar i varje skarv.
 *   - Handtagen sitter på KORTSIDORNA: en infälld platta med kromat,
 *     nedfällbart handtag och svart grepp.
 *   - Toppmodulen har ON/OFF-knapp uppe till vänster och EWAY ENERGY-loggan
 *     uppe till höger på fronten, och anslutningspanelen (brytare under
 *     genomskinlig lucka, svart och orange DC-kontakt, IN/OUT-portar) på
 *     högra kortsidan.
 *   - Sockel med fötter i hörnen och snedskurna urtag mellan dem.
 *
 * 53,76 kWh = 7 moduler. Max 8 per stapel – större batterier ritas som
 * flera staplar bredvid varandra. Mått i meter, uppmätta på produktbilden
 * och kalibrerade mot att en full stapel (61,44 kWh, 8 moduler) är 140,5 cm
 * hög: modul 142 mm, toppmodul 169 mm, sockel 102 mm, bredd 650 mm.
 * Origo = golvet mitt under stapeln, fronten (långsidan) mot +z.
 */
export const EWAY_MODULE_KWH = 7.68;
const MAX_PER_STACK = 8;

const W = 0.65; // långsidan (front)
const D = 0.4; // kortsidan
const MODULE_H = 0.142;
const TOP_H = 0.169;
const BAND_H = 0.04;
const FOOT_H = 0.062;
const BASE_H = BAND_H + FOOT_H;
const GAP = 0.005;

const WHITE = "#F2F2EF";
const SHELL = { color: WHITE, roughness: 0.42, clearcoat: 0.3, clearcoatRoughness: 0.45 } as const;
const CHROME = { color: "#ececec", metalness: 1, roughness: 0.15 } as const;

export function ewayModules(capacityKWh: number) {
  return Math.max(2, Math.round(capacityKWh / EWAY_MODULE_KWH));
}

export function ewayStackHeight(modules: number) {
  return BASE_H + Math.min(modules, MAX_PER_STACK) * MODULE_H + TOP_H;
}

export const EWAY_SIZE = { width: W, depth: D };
export const EWAY_MAX_PER_STACK = MAX_PER_STACK;

export function EwayBattery({ capacityKWh }: { capacityKWh: number }) {
  const total = ewayModules(capacityKWh);
  const stacks = Math.ceil(total / MAX_PER_STACK);
  const per = Math.ceil(total / stacks);
  const gap = 0.08;
  const totalW = stacks * W + (stacks - 1) * gap;
  return (
    <group>
      {Array.from({ length: stacks }).map((_, s) => (
        <group key={s} position={[-totalW / 2 + W / 2 + s * (W + gap), 0, 0]}>
          <EwayStack modules={s === stacks - 1 ? total - per * (stacks - 1) : per} />
        </group>
      ))}
    </group>
  );
}

function EwayStack({ modules }: { modules: number }) {
  const topY = BASE_H + modules * MODULE_H;
  return (
    <group>
      {/* Inre kärna så att skarvarna mellan modulerna blir mörka linjer */}
      <mesh position={[0, (BASE_H + topY + TOP_H) / 2, 0]}>
        <boxGeometry args={[W - 0.03, topY + TOP_H - BASE_H, D - 0.03]} />
        <meshStandardMaterial color="#8f9194" roughness={0.8} />
      </mesh>

      <Base />

      {Array.from({ length: modules }).map((_, i) => (
        <group key={i} position={[0, BASE_H + MODULE_H / 2 + i * MODULE_H, 0]}>
          <Module height={MODULE_H} />
          {/* Handtag på båda kortsidorna */}
          <group position={[W / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <Handle />
          </group>
          <group position={[-W / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <Handle />
          </group>
        </group>
      ))}

      <group position={[0, topY + TOP_H / 2, 0]}>
        <Module height={TOP_H} />
        <TopFront />
        <group position={[W / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <ConnectorPanel />
        </group>
      </group>
    </group>
  );
}

/** En modul: vit rundad låda, ljus kant upptill och tre skruvar i fronten. */
function Module({ height }: { height: number }) {
  return (
    <group>
      <RoundedBox args={[W, height - GAP, D]} radius={0.012} smoothness={4} castShadow receiveShadow>
        <meshPhysicalMaterial {...SHELL} />
      </RoundedBox>
      {/* Ljus kant längs överkanten, runt om */}
      <RoundedBox args={[W + 0.002, 0.012, D + 0.002]} radius={0.004} smoothness={2} position={[0, height / 2 - GAP / 2 - 0.009, 0]}>
        <meshPhysicalMaterial {...SHELL} color="#F8F8F6" roughness={0.3} />
      </RoundedBox>
      {/* Skruvar i fronten */}
      {[-0.28, 0.01, 0.3].map((f) => (
        <mesh key={f} position={[f * W, height / 2 - GAP / 2 - 0.022, D / 2 + 0.0008]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.0035, 0.0035, 0.0015, 12]} />
          <meshStandardMaterial color="#cfd0cf" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

/** Sockel: band upptill och fyra fötter med snedskurna inre kanter. */
function Base() {
  const foot = useMemo(() => {
    // Fotens profil i x/y (bredare upptill), extruderas längs z.
    const bottom = W * 0.2;
    const top = W * 0.235;
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(bottom, 0);
    s.lineTo(top, FOOT_H);
    s.lineTo(0, FOOT_H);
    s.closePath();
    return s;
  }, []);
  const footDepth = D * 0.3;
  const extrude = { depth: footDepth, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.004, bevelSegments: 2 };
  return (
    <group>
      <RoundedBox args={[W, BAND_H, D]} radius={0.012} smoothness={3} position={[0, FOOT_H + BAND_H / 2, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial {...SHELL} color="#EDEDEA" />
      </RoundedBox>
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => (
          <mesh
            key={`${sx}${sz}`}
            // Spegla foten i x så att snedkanten alltid vetter inåt.
            scale={[-sx, 1, 1]}
            position={[sx * (W / 2 - 0.004), 0, sz > 0 ? D / 2 - footDepth - 0.004 : -D / 2 + 0.004]}
            castShadow
            receiveShadow
          >
            <extrudeGeometry args={[foot, extrude]} />
            <meshPhysicalMaterial {...SHELL} color="#EAEAE7" side={THREE.DoubleSide} />
          </mesh>
        )),
      )}
    </group>
  );
}

/** Front på toppmodulen: ON/OFF-knapp till vänster, logga till höger. */
function TopFront() {
  const logo = useCanvasTexture("eway-logo-v2", 512, 160, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    // Ikon: cirkel med diagonala ränder (som på produkten)
    const cx = h * 0.42;
    const cy = h * 0.5;
    const r = h * 0.3;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = "#1b1c1e";
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    ctx.strokeStyle = "#F2F2EF";
    ctx.lineWidth = 5;
    for (let i = -3; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(cx - r + i * 14, cy + r);
      ctx.lineTo(cx + r * 0.2 + i * 14, cy - r);
      ctx.stroke();
    }
    ctx.restore();
    ctx.fillStyle = "#1b1c1e";
    ctx.font = `600 76px ${FONT}`;
    ctx.textBaseline = "alphabetic";
    ctx.fillText("EWAY", h * 0.82, h * 0.58);
    ctx.font = `600 27px ${FONT}`;
    ctx.fillText("E N E R G Y", h * 0.86, h * 0.84);
  });
  const onoff = useCanvasTexture("eway-onoff", 128, 48, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#55585c";
    ctx.font = `500 26px ${FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ON/OFF", w / 2, h / 2);
  });
  const z = D / 2 + 0.0008;
  return (
    <group>
      <mesh position={[W * 0.29, 0.02, z]}>
        <planeGeometry args={[0.17, 0.053]} />
        <meshBasicMaterial map={logo} transparent toneMapped={false} />
      </mesh>
      <group position={[-W / 2 + 0.065, 0.035, z]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.009, 0.01, 0.004, 32]} />
          <meshStandardMaterial {...CHROME} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0, 0.0022]}>
          <circleGeometry args={[0.0055, 24]} />
          <meshStandardMaterial color="#9fa3a6" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <planeGeometry args={[0.04, 0.015]} />
          <meshBasicMaterial map={onoff} transparent toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Handtag på kortsidan. Ritas i lokala koordinater där +z pekar ut från
 * sidan och x löper längs sidan.
 */
function Handle() {
  return (
    <group position={[0, 0, 0.0005]}>
      {/* Infälld platta */}
      <RoundedBox args={[0.13, 0.112, 0.004]} radius={0.006} smoothness={3} position={[0, -0.004, -0.0015]}>
        <meshStandardMaterial color="#FAFAF8" roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, -0.004, 0.0006]}>
        <planeGeometry args={[0.124, 0.106]} />
        <meshStandardMaterial color="#E4E5E3" roughness={0.55} />
      </mesh>
      {/* Fäste upptill med skruvar */}
      <mesh position={[0, 0.034, 0.006]} castShadow>
        <boxGeometry args={[0.1, 0.02, 0.008]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>
      {[-0.035, -0.012, 0.012, 0.035].map((x) => (
        <mesh key={x} position={[x, 0.034, 0.0105]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.002, 10]} />
          <meshStandardMaterial color="#8d9093" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {/* Armar */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.045, -0.002, 0.009]} castShadow>
          <boxGeometry args={[0.006, 0.066, 0.005]} />
          <meshStandardMaterial {...CHROME} />
        </mesh>
      ))}
      {/* Svart grepp */}
      <mesh position={[0, -0.038, 0.011]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.0085, 0.0085, 0.088, 20]} />
        <meshStandardMaterial color="#181818" roughness={0.65} />
      </mesh>
    </group>
  );
}

/**
 * Anslutningspanelen på toppmodulens högra kortsida. Lokala koordinater:
 * +z ut från sidan; −x mot stapelns front.
 */
function ConnectorPanel() {
  return (
    <group position={[0, 0, 0.0005]}>
      <RoundedBox args={[D * 0.78, TOP_H * 0.76, 0.004]} radius={0.006} smoothness={3} position={[0.005, -0.004, -0.0015]}>
        <meshStandardMaterial color="#F7F7F5" roughness={0.4} />
      </RoundedBox>
      <mesh position={[0.005, -0.004, 0.0006]}>
        <planeGeometry args={[D * 0.75, TOP_H * 0.72]} />
        <meshStandardMaterial color="#E9EAE8" roughness={0.55} />
      </mesh>
      {/* Brytare under genomskinlig lucka (närmast fronten) */}
      <group position={[-0.085, -0.004, 0.007]}>
        <RoundedBox args={[0.075, 0.105, 0.012]} radius={0.004} smoothness={3} castShadow>
          <meshStandardMaterial color="#2f3235" roughness={0.45} />
        </RoundedBox>
        {[-0.02, 0, 0.02].map((x) => (
          <mesh key={x} position={[x, 0.004, 0.0075]}>
            <boxGeometry args={[0.012, 0.03, 0.006]} />
            <meshStandardMaterial color="#5f6b5d" roughness={0.4} />
          </mesh>
        ))}
        <mesh position={[0, 0, 0.0125]}>
          <planeGeometry args={[0.068, 0.098]} />
          <meshPhysicalMaterial color="#cfd8dc" transparent opacity={0.2} roughness={0.05} clearcoat={1} />
        </mesh>
        <mesh position={[0, -0.06, 0.004]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.012, 16]} />
          <meshStandardMaterial color="#141414" roughness={0.5} />
        </mesh>
      </group>
      {/* DC-kontakter: svart och orange */}
      <mesh position={[-0.01, 0.03, 0.009]} castShadow>
        <boxGeometry args={[0.03, 0.03, 0.018]} />
        <meshStandardMaterial color="#141414" roughness={0.45} />
      </mesh>
      <mesh position={[0.06, 0.03, 0.009]} castShadow>
        <boxGeometry args={[0.032, 0.032, 0.018]} />
        <meshStandardMaterial color="#e2672a" roughness={0.45} />
      </mesh>
      <mesh position={[0.06, 0.03, 0.0185]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.004, 16]} />
        <meshStandardMaterial color="#c4521c" roughness={0.4} />
      </mesh>
      {/* IN/OUT-portar */}
      {[-0.005, 0.03].map((x) => (
        <mesh key={x} position={[x, -0.03, 0.006]}>
          <boxGeometry args={[0.024, 0.024, 0.01]} />
          <meshStandardMaterial color="#141414" roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[0.075, -0.05, 0.004]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.006, 16]} />
        <meshStandardMaterial color="#141414" roughness={0.5} />
      </mesh>
    </group>
  );
}
