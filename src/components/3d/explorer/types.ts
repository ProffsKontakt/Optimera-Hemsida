/**
 * Delade typdefinitioner för Battery- och Solar Component Explorer.
 * Matchar speccens "3.2 Shared Type Definitions".
 */

export type Component3D = {
  id: string;
  displayName: string; // svenska, kund-vänlig
  shortLabel: string; // för hover-tooltip
  description: string; // 1-2 meningar
  modelUrl?: string; // GLB asset path (undefined → procedurell fallback)
  restPosition: [number, number, number];
  explodedPosition: [number, number, number];
  explodeAxis: "x" | "y-up" | "y-down" | "z-out" | "layered-up";
  hotspots?: Hotspot[];
  ports: Port[];
};

export type Hotspot = {
  id: string;
  label: string;
  description: string;
  /** Lokal position relativt parent-komponenten. */
  position: [number, number, number];
};

export type PortType =
  | "dc-power"
  | "dc-string"
  | "dc-main"
  | "comms"
  | "ac-power"
  | "ground";

export type Port = {
  id: string;
  type: PortType;
  /** Lokal position relativt parent-komponenten. */
  position: [number, number, number];
};

export type CableConfig = {
  id: string;
  fromPort: string;
  toPort: string;
  type: PortType;
  color: string;
  thickness: number;
  /**
   * Optional manuella waypoints i världsrymd. Om null används default-routing
   * (rakt ner längs Y, längs Y=0,05 till mål-X/Z, sen upp).
   */
  waypoints?: [number, number, number][];
};

/**
 * Innehåll som visas i InfoPanel. Kan komma från en Component3D, en Hotspot,
 * eller en kabel (när användaren klickar på den).
 */
export type InfoPanelContent = {
  title: string;
  subtitle?: string;
  body: string;
  /** Valfri lista av tags (t.ex. för en port-typ eller kabel-typ). */
  tags?: string[];
};

/** Spring-konfiguration enligt speccen. */
export const EXPLODE_SPRING = {
  stiffness: 120,
  damping: 18,
} as const;

/** Kameraövergångar (800ms enligt speccen). */
export const CAMERA_TRANSITION_MS = 800;

/** Mobilbreakpoint för bottom-sheet vs desktop side-panel. */
export const MOBILE_BREAKPOINT_PX = 768;
