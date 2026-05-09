"use client";

import type { ReactNode } from "react";

/**
 * Brand-panel: stor banner med vertikal indigo→sun-gradient som
 * yttre ram, plus en bone-färgad center-ruta där innehållet sitter.
 * Mönstret ekar logotypens vertikala stapel.
 *
 * Används av CtaPanel och liknande "större fokus-rutor" på sidan.
 */
export function BrandPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "relative rounded-[32px] p-[3px] overflow-hidden",
        "bg-[linear-gradient(180deg,#3648C3_0%,#FFDD6C_100%)]",
        className,
      ].join(" ")}
    >
      <div className="relative rounded-[29px] bg-bone p-8 md:p-14">
        {children}
      </div>
    </div>
  );
}
