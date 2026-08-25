"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Meta Pixel PageView vid klient-navigering. Next App Router laddar inte
 * om sidan mellan routes, så baskodens PageView fyrar bara en gång –
 * den här komponenten fyller på vid varje route-byte (första renderingen
 * hoppas över eftersom baskoden redan täckt den).
 */
export function MetaPixelPageView() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
    if (typeof fbq === "function") fbq("track", "PageView");
  }, [pathname]);

  return null;
}
