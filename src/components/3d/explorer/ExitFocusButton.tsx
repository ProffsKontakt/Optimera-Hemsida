"use client";

import { motion, AnimatePresence } from "framer-motion";

/**
 * "Tillbaka till hus"-knapp som syns endast i focus mode.
 *
 * Renderas absolut i top-left av canvas-overlay. Animerar in/ut tillsammans
 * med focus-state. Klick triggar exitFocus() från useFocusMode.
 */

export function ExitFocusButton({
  visible,
  onClick,
  label = "Tillbaka till hus",
}: {
  visible: boolean;
  onClick: () => void;
  label?: string;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          onClick={onClick}
          type="button"
          className="absolute top-4 left-4 z-30 inline-flex items-center gap-2 rounded-full bg-bone/90 backdrop-blur border border-ink/15 hover:border-ink/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/80 hover:text-ink transition-colors shadow-sm"
        >
          <span aria-hidden>←</span>
          {label}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
