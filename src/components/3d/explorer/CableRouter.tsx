"use client";

import { Cable } from "./Cable";
import type { CableConfig, Component3D, InfoPanelContent } from "./types";

/**
 * Router som tar en lista av komponenter (med deras världs-position och
 * lokala port-positioner) plus en lista av CableConfig och renderar en
 * <Cable /> för varje config.
 *
 * Världsposition för en port räknas ut som:
 *   componentWorldPos + portLocalPos
 *
 * Komponenter kan ligga på rest- eller exploded-position; CableRouter får
 * den faktiska world-positionen som input så att kablar följer med när
 * batteriet "exploderas" (vi vill att kablarna sträcks ut i takt med
 * modulerna).
 */

export type ComponentWorldState = {
  component: Component3D;
  worldPosition: [number, number, number];
};

function findPortWorld(
  states: ComponentWorldState[],
  portId: string,
): [number, number, number] | null {
  for (const s of states) {
    const port = s.component.ports.find((p) => p.id === portId);
    if (port) {
      return [
        s.worldPosition[0] + port.position[0],
        s.worldPosition[1] + port.position[1],
        s.worldPosition[2] + port.position[2],
      ];
    }
  }
  return null;
}

export function CableRouter({
  cables,
  components,
  onSelect,
}: {
  cables: CableConfig[];
  components: ComponentWorldState[];
  onSelect?: (content: InfoPanelContent) => void;
}) {
  return (
    <group>
      {cables.map((c) => {
        const from = findPortWorld(components, c.fromPort);
        const to = findPortWorld(components, c.toPort);
        if (!from || !to) return null;
        return (
          <Cable
            key={c.id}
            config={c}
            fromWorld={from}
            toWorld={to}
            onSelect={onSelect}
          />
        );
      })}
    </group>
  );
}
