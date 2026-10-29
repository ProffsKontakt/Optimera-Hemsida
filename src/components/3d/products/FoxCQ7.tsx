"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { FONT, roundRect, roundedRectShape, useCanvasTexture } from "./textures";

/**
 * Fox ESS CQ7 – högspänningsbatteri i en vit stack med mjukt rundade
 * hörn, modellerad efter produktbilderna: masterenheten överst (CQ7-M med
 * BMS) har FOX ESS-loggan, ett fönster med brytare uppe till vänster och en
 * kolumn med sex lysdioder. Under den sitter slavmodulerna (CQ7-S) med
 * tunna skarvar, och stacken står på fyra justerbara fötter.
 *
 * Mått enligt Fox ESS produktblad (CQ7, EU): 660 × 360 mm (B × D), 420 mm
 * hög med 2 moduler och 155 mm till per modul, upp till 14 moduler och
 * 2 280 mm. 7,02 kWh per modul, alltså 14,04–98,28 kWh i en stack.
 * Masterenhetens höjd och fötternas längd är satta så att summan stämmer
 * med produktbladet. Origo = golvet mitt under stacken, fronten mot +z.
 */
export const FOX_MODULE_KWH = 7.02;
export const FOX_MIN_MODULES = 2;
export const FOX_MAX_MODULES = 14;

const W = 0.66;
const D = 0.36;
const FEET_H = 0.045;
const MASTER_H = 0.22;
const SLAVE_H = 0.155;
const GAP = 0.003;
const CORNER = 0.035; // hörnradie sett uppifrån

const WHITE = { color: "#EEEEEC", roughness: 0.36, clearcoat: 0.35, clearcoatRoughness: 0.35 } as const;

export function foxModules(capacityKWh: number) {
  return Math.min(FOX_MAX_MODULES, Math.max(FOX_MIN_MODULES, Math.round(capacityKWh / FOX_MODULE_KWH)));
}

/** Total höjd i meter för n moduler (master + n − 1 slavar), med fötter. */
export function foxStackHeight(modules: number) {
  const n = Math.min(FOX_MAX_MODULES, Math.max(FOX_MIN_MODULES, modules));
  return FEET_H + MASTER_H + (n - 1) * SLAVE_H;
}

/** Vertikal kropp med rundade hörn sett uppifrån och lätt avfasade kanter. */
function useBlockGeometry(h: number, bevel: number) {
  return useMemo(() => {
    const shape = roundedRectShape(W - bevel * 2, D - bevel * 2, CORNER);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: h - bevel * 2,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 4,
      curveSegments: 12,
    });
    // Formen ligger i XY-planet och extruderas längs +z: vrid så att den
    // står upp och låt botten ligga på y = 0.
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, bevel, 0);
    geo.computeVertexNormals();
    return geo;
  }, [h, bevel]);
}

export function FoxCQ7({ capacityKWh }: { capacityKWh: number }) {
  const n = foxModules(capacityKWh);
  const slaves = n - 1;
  const masterY = FEET_H + slaves * SLAVE_H;
  const height = foxStackHeight(n);

  const slaveGeo = useBlockGeometry(SLAVE_H - GAP, 0.004);
  const masterGeo = useBlockGeometry(MASTER_H, 0.012);

  const logo = useCanvasTexture("fox-logo", 512, 192, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#3a3a3c";
    ctx.font = `700 112px ${FONT}`;
    ctx.textBaseline = "alphabetic";
    ctx.fillText("FOX", 40, 128);
    const fw = ctx.measureText("FOX").width;
    // Märket: en rundad triangel med spetsen nedåt och en tunnare
    // inre ögla, lite högre än bokstäverna.
    const tri = (r: number, round: number) => {
      const pts = [-150, -30, 90].map((deg) => {
        const a = (deg * Math.PI) / 180;
        return [Math.cos(a) * r, Math.sin(a) * r] as const;
      });
      ctx.beginPath();
      const mid = (i: number) => {
        const [x1, y1] = pts[i];
        const [x2, y2] = pts[(i + 1) % 3];
        return [(x1 + x2) / 2, (y1 + y2) / 2] as const;
      };
      const [sx, sy] = mid(2);
      ctx.moveTo(sx, sy);
      for (let i = 0; i < 3; i++) {
        const [mx2, my2] = mid(i);
        ctx.arcTo(pts[i][0], pts[i][1], mx2, my2, round);
      }
      ctx.closePath();
    };
    ctx.save();
    ctx.translate(40 + fw + 74, 74);
    ctx.rotate(-0.3);
    ctx.strokeStyle = "#3a3a3c";
    ctx.lineJoin = "round";
    ctx.lineWidth = 12;
    tri(64, 18);
    ctx.stroke();
    // Inre svep
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.ellipse(-2, -4, 22, 16, 0.5, Math.PI * 0.75, Math.PI * 1.95);
    ctx.stroke();
    ctx.restore();
    ctx.font = `400 30px ${FONT}`;
    ctx.fillStyle = "#4a4a4c";
    const ess = "E S S";
    ctx.fillText(ess, 40 + fw - ctx.measureText(ess).width + 4, 170);
  });

  const windowTex = useCanvasTexture("fox-window", 160, 180, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    // Ram och genomskinlig lucka
    ctx.fillStyle = "#c9cacc";
    roundRect(ctx, 0, 0, w, h, 18);
    ctx.fill();
    ctx.fillStyle = "#2c2f33";
    roundRect(ctx, 12, 12, w - 24, h - 24, 12);
    ctx.fill();
    // Brytare och kontakter bakom luckan
    ctx.fillStyle = "#5b5f64";
    ctx.fillRect(40, 44, 80, 92);
    ctx.fillStyle = "#1d1f22";
    ctx.fillRect(66, 64, 28, 52);
    ctx.fillStyle = "#e9a23b";
    ctx.fillRect(70, 70, 20, 16);
    // Reflex i luckan
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "rgba(255,255,255,0.35)");
    g.addColorStop(0.45, "rgba(255,255,255,0.05)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    roundRect(ctx, 12, 12, w - 24, h - 24, 12);
    ctx.fill();
  });

  const z = D / 2 + 0.0008;
  const mx = -W / 2; // vänsterkant

  return (
    <group>
      {/* Fyra justerbara fötter: stång och bred fot */}
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => (
          <group key={`${sx}${sz}`} position={[sx * (W / 2 - 0.045), 0, sz * (D / 2 - 0.06)]}>
            <mesh position={[0, FEET_H / 2 + 0.006, 0]} castShadow>
              <cylinderGeometry args={[0.011, 0.011, FEET_H - 0.006, 16]} />
              <meshStandardMaterial color="#c9cbce" metalness={0.6} roughness={0.35} />
            </mesh>
            <mesh position={[0, 0.006, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.024, 0.03, 0.012, 24]} />
              <meshStandardMaterial color="#d8d9db" metalness={0.4} roughness={0.4} />
            </mesh>
          </group>
        )),
      )}

      {/* Mörk kärna bakom skarvarna */}
      <mesh position={[0, (FEET_H + height) / 2, 0]}>
        <boxGeometry args={[W - 0.03, height - FEET_H - 0.01, D - 0.03]} />
        <meshStandardMaterial color="#9b9da0" roughness={0.8} />
      </mesh>

      {/* Slavmoduler */}
      {Array.from({ length: slaves }).map((_, i) => (
        <mesh key={i} geometry={slaveGeo} position={[0, FEET_H + i * SLAVE_H, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial {...WHITE} />
        </mesh>
      ))}

      {/* Masterenhet med logga, fönster och lysdioder */}
      <group position={[0, masterY, 0]}>
        <mesh geometry={masterGeo} castShadow receiveShadow>
          <meshPhysicalMaterial {...WHITE} color="#F1F1EF" />
        </mesh>
        <mesh position={[0.02, MASTER_H * 0.56, z]}>
          <planeGeometry args={[0.2, 0.075]} />
          <meshBasicMaterial map={logo} transparent toneMapped={false} />
        </mesh>
        <mesh position={[mx + 0.085, MASTER_H * 0.6, z]}>
          <planeGeometry args={[0.08, 0.09]} />
          <meshStandardMaterial map={windowTex} roughness={0.2} metalness={0.1} />
        </mesh>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[mx + 0.15, MASTER_H * 0.78 - i * 0.017, z]}>
            <circleGeometry args={[0.0028, 12]} />
            <meshBasicMaterial color={i < 5 ? "#3fdc7a" : "#b9e8c8"} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
