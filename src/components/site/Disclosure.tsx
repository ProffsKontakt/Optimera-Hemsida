"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Animerad accordion-disclosure. Använder framer-motion för smooth
 * höjd-animation, både vid open och close. Drop-in ersättning för
 * <details><summary>...</summary>...</details>.
 */
export function Disclosure({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start gap-6 justify-between text-left"
        aria-expanded={open}
      >
        <span className="font-display text-2xl tracking-display-tight max-w-2xl leading-snug">
          {question}
        </span>
        <span
          className={[
            "shrink-0 mt-1 grid h-7 w-7 place-items-center rounded-full border border-ink/15 transition-all duration-300",
            open ? "rotate-45 bg-ink text-bone border-ink" : "text-ink/55",
          ].join(" ")}
          aria-hidden
        >
          <span className="font-mono text-[14px] leading-none">+</span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.32, ease: [0.32, 0.72, 0, 1] },
              opacity: { duration: 0.22, ease: "easeOut" },
            }}
            style={{ overflow: "hidden" }}
          >
            <div className="pt-4 pb-1 max-w-2xl text-ink/70 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
