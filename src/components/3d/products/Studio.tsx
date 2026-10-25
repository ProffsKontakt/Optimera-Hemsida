"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/**
 * Produktfotostudio för 3D-scenerna: mjukt nyckelljus med skuggor,
 * ljusbanker som speglas i lack, glas och krom (byggs i scenen – ingen
 * HDRI att ladda ner) och en mjuk kontaktskugga under produkten.
 */
export function StudioLights({
  shadowSize = 1024,
  envIntensity = 1,
  keyIntensity = 1.5,
}: {
  shadowSize?: number;
  /** Hur starkt ljusbankerna lyser upp/speglas (1 = produktfoto). */
  envIntensity?: number;
  keyIntensity?: number;
}) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[3.5, 5, 4]}
        intensity={keyIntensity}
        castShadow
        shadow-mapSize-width={shadowSize}
        shadow-mapSize-height={shadowSize}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      />
      <directionalLight position={[-4, 2.5, 2]} intensity={0.45} color="#fff4e0" />
      <directionalLight position={[0, 3, -5]} intensity={0.35} />
      <Environment resolution={256} frames={1} environmentIntensity={envIntensity}>
        <Lightformer form="rect" intensity={2.2} position={[0, 5, 2]} rotation-x={Math.PI / 2} scale={[8, 4, 1]} />
        <Lightformer form="rect" intensity={1.6} position={[-5, 1.5, 3]} rotation-y={Math.PI / 2.5} scale={[4, 3, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[5, 1.5, 2]} rotation-y={-Math.PI / 2.5} scale={[4, 3, 1]} />
        <Lightformer form="ring" intensity={0.8} color="#ffe8c0" position={[0, 1, -6]} scale={3} />
        <mesh scale={30}>
          <sphereGeometry />
          <meshBasicMaterial color="#d9d4c7" side={THREE.BackSide} />
        </mesh>
      </Environment>
    </>
  );
}

export function StudioFloor({ y = 0, scale = 6, opacity = 0.45 }: { y?: number; scale?: number; opacity?: number }) {
  return <ContactShadows position={[0, y + 0.001, 0]} scale={scale} opacity={opacity} blur={2.6} far={2.5} resolution={512} color="#3b3426" frames={1} />;
}

/** Långsam pendling runt y-axeln – som ett vridbord i en produktfilm. */
export function Sway({
  children,
  amplitude = 0.38,
  speed = 0.32,
  baseYaw = -0.35,
}: {
  children: ReactNode;
  amplitude?: number;
  speed?: number;
  baseYaw?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const reduced = usePrefersReducedMotion();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = baseYaw + (reduced ? 0 : Math.sin(clock.elapsedTime * speed) * amplitude);
  });
  return (
    <group ref={ref} rotation={[0, baseYaw, 0]}>
      {children}
    </group>
  );
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduced;
}
