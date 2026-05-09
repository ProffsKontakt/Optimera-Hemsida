"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MOBILE_BREAKPOINT_PX, type InfoPanelContent } from "./types";

/**
 * InfoPanel
 *
 * Desktop (≥ 768px): höger sidopanel som glider in från höger.
 * Mobile (< 768px): bottom-sheet som glider upp underifrån.
 *
 * Dessa två varianter delar samma innehåll, men olika animations-axel och
 * positionering. Vi använder en lyssnare på window.innerWidth för att avgöra
 * vilken variant som ska renderas.
 */

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT_PX);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export function InfoPanel({
  content,
  onClose,
}: {
  content: InfoPanelContent | null;
  onClose: () => void;
}) {
  const isMobile = useIsMobile();
  const open = !!content;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key={isMobile ? "mobile" : "desktop"}
          initial={
            isMobile ? { y: "100%", opacity: 0 } : { x: 40, opacity: 0 }
          }
          animate={
            isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }
          }
          exit={
            isMobile ? { y: "100%", opacity: 0 } : { x: 40, opacity: 0 }
          }
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className={
            isMobile
              ? "fixed inset-x-3 bottom-3 z-30 rounded-2xl border border-ink/10 bg-bone/95 backdrop-blur shadow-xl p-5"
              : "absolute top-4 right-4 z-30 w-[340px] max-h-[calc(100%-2rem)] overflow-y-auto rounded-2xl border border-ink/10 bg-bone/95 backdrop-blur shadow-xl p-5"
          }
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {content?.subtitle && (
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-1">
                  {content.subtitle}
                </div>
              )}
              <h3 className="font-display text-[22px] leading-tight text-ink">
                {content?.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Stäng"
              className="shrink-0 rounded-full border border-ink/15 hover:border-ink/40 w-8 h-8 grid place-items-center text-ink/70 hover:text-ink transition-colors"
            >
              ×
            </button>
          </div>

          <p className="mt-4 text-[14px] leading-relaxed text-ink/75">
            {content?.body}
          </p>

          {content?.tags && content.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {content.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-ink/8 border border-ink/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
