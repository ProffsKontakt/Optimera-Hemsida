import { ReactNode } from "react";

/**
 * DEMO: lättare variant av Section. Mindre rubriker (42px mot live:s 60px),
 * smalare introtext och mer generös luft mellan header och innehåll. Används
 * bara i demon – live:s Section är orörd.
 */
export function DemoSection({
  eyebrow,
  title,
  intro,
  children,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <section className={`container-edge py-20 md:py-28 ${className}`}>
      {(eyebrow || title || intro) && (
        <header
          className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
        >
          {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
          {title && (
            <h2 className="font-display text-[28px] md:text-[40px] tracking-display-tight leading-[1.12]">
              {title}
            </h2>
          )}
          {intro && (
            <p className="mt-5 text-ink/65 text-[16.5px] leading-relaxed max-w-xl">
              {intro}
            </p>
          )}
        </header>
      )}
      {children && <div className="mt-12 md:mt-16">{children}</div>}
    </section>
  );
}
