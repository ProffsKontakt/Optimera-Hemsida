"use client";

import { useCallback, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { CAMERA_TRANSITION_MS } from "@/components/3d/explorer/types";

/**
 * Focus mode för Battery- och Solar Component Explorer.
 *
 * När en användare klickar på batteriet eller solpanelerna animerar vi kameran
 * från sin nuvarande "huset"-position till en närmare focus-position. Vi sparar
 * den föregående positionen + targeten så att exit-knappen kan animera tillbaka
 * till exakt samma vy.
 *
 * Animationen är ease-in-out över CAMERA_TRANSITION_MS (800ms enligt speccen).
 */

export type FocusTarget = {
  /** Världsposition kameran ska flyttas till. */
  position: [number, number, number];
  /** Punkt kameran ska titta på (orbit-target). */
  lookAt: [number, number, number];
};

type Snapshot = {
  position: THREE.Vector3;
  target: THREE.Vector3;
};

type Animation = {
  startMs: number;
  fromPosition: THREE.Vector3;
  fromTarget: THREE.Vector3;
  toPosition: THREE.Vector3;
  toTarget: THREE.Vector3;
};

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Returnerar { isFocused, enterFocus, exitFocus } samt driver animationen
 * via useFrame. Måste anropas från en komponent inuti <Canvas>.
 *
 * `orbitControlsRef` är referens till drei OrbitControls; vi läser/skriver
 * .target och kallar .update() för att hålla orbit-state i sync.
 */
export function useFocusMode(orbitControlsRef: React.RefObject<{
  target: THREE.Vector3;
  update: () => void;
  enabled: boolean;
}>) {
  const { camera } = useThree();
  const [isFocused, setIsFocused] = useState(false);
  const previousRef = useRef<Snapshot | null>(null);
  const animationRef = useRef<Animation | null>(null);

  const enterFocus = useCallback(
    (target: FocusTarget) => {
      const controls = orbitControlsRef.current;
      if (!controls) return;
      previousRef.current = {
        position: camera.position.clone(),
        target: controls.target.clone(),
      };
      animationRef.current = {
        startMs: performance.now(),
        fromPosition: camera.position.clone(),
        fromTarget: controls.target.clone(),
        toPosition: new THREE.Vector3(...target.position),
        toTarget: new THREE.Vector3(...target.lookAt),
      };
      controls.enabled = false;
      setIsFocused(true);
    },
    [camera, orbitControlsRef],
  );

  const exitFocus = useCallback(() => {
    const controls = orbitControlsRef.current;
    const prev = previousRef.current;
    if (!controls || !prev) {
      setIsFocused(false);
      return;
    }
    animationRef.current = {
      startMs: performance.now(),
      fromPosition: camera.position.clone(),
      fromTarget: controls.target.clone(),
      toPosition: prev.position.clone(),
      toTarget: prev.target.clone(),
    };
    setIsFocused(false);
  }, [camera, orbitControlsRef]);

  useFrame(() => {
    const anim = animationRef.current;
    const controls = orbitControlsRef.current;
    if (!anim || !controls) return;
    const elapsed = performance.now() - anim.startMs;
    const t = Math.min(1, elapsed / CAMERA_TRANSITION_MS);
    const k = easeInOutCubic(t);
    camera.position.lerpVectors(anim.fromPosition, anim.toPosition, k);
    controls.target.lerpVectors(anim.fromTarget, anim.toTarget, k);
    controls.update();
    if (t >= 1) {
      animationRef.current = null;
      // Återaktivera orbit endast i unfocused state
      controls.enabled = !isFocused;
    }
  });

  return { isFocused, enterFocus, exitFocus };
}
