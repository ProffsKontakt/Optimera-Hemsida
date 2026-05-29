"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * AdminHotkey
 *
 * Globalt tangentbordsgenväg som triggas av Ctrl+Shift+A (eller
 * Cmd+Shift+A på Mac) och navigerar till admin-sektionen. Inget visuellt
 * spår på sajten, ingen länk i nav eller footer — bara tangenter.
 *
 * Hidden trigger-pattern: passive listener på document, inga side-effects
 * för alla andra tangenttryckningar.
 */
export function AdminHotkey() {
  const router = useRouter();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const modifier = isMac ? e.metaKey : e.ctrlKey;
      if (modifier && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        router.push("/admin");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);
  return null;
}
