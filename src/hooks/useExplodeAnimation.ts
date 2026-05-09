"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EXPLODE_SPRING } from "@/components/3d/explorer/types";

/**
 * Spring-animerad explode/collapse.
 *
 * Animerar en skalär `progress` mellan 0 (rest) och 1 (exploded) med samma
 * fjäder-konfiguration för alla komponenter (stiffness 120, damping 18 enligt
 * speccen). Konsumenten kan plocka ut current progress via getProgress() och
 * lerpa egna positioner i sin egen useFrame.
 *
 * Vi exponerar också `lerpVec3` som hjälpare för det vanligaste fallet:
 * lerpa mellan rest- och exploded-position.
 */

export function useExplodeAnimation(exploded: boolean) {
  const progressRef = useRef(exploded ? 1 : 0);
  const velocityRef = useRef(0);
  const targetRef = useRef(exploded ? 1 : 0);

  useEffect(() => {
    targetRef.current = exploded ? 1 : 0;
  }, [exploded]);

  useFrame((_, delta) => {
    // Klampa delta för att undvika instabilitet vid stora frame-hopp.
    const dt = Math.min(delta, 1 / 30);
    const k = EXPLODE_SPRING.stiffness;
    const c = EXPLODE_SPRING.damping;
    const x = progressRef.current;
    const v = velocityRef.current;
    const target = targetRef.current;
    const force = -k * (x - target) - c * v;
    const newV = v + force * dt;
    const newX = x + newV * dt;
    velocityRef.current = newV;
    progressRef.current = newX;
  });

  return useMemo(
    () => ({
      getProgress: () => progressRef.current,
      lerpVec3: (
        target: THREE.Vector3,
        rest: THREE.Vector3Tuple,
        exploded: THREE.Vector3Tuple,
      ) => {
        const p = progressRef.current;
        target.set(
          rest[0] + (exploded[0] - rest[0]) * p,
          rest[1] + (exploded[1] - rest[1]) * p,
          rest[2] + (exploded[2] - rest[2]) * p,
        );
      },
    }),
    [],
  );
}
