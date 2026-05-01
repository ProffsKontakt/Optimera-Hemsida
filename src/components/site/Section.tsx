import { ReactNode } from "react";

export function Section({
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
    <section className={`container-edge py-24 md:py-32 ${className}`}>
      {(eyebrow || title || intro) && (
        <header
          className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
        >
          {eyebrow && <div className="eyebrow mb-5">{eyebrow}</div>}
          {title && (
            <h2 className="font-display text-4xl md:text-6xl tracking-display-tight leading-[1.04]">
              {title}
            </h2>
          )}
          {intro && (
            <p className="mt-6 text-ink/70 text-lg leading-relaxed max-w-2xl">
              {intro}
            </p>
          )}
        </header>
      )}
      {children && <div className="mt-14 md:mt-20">{children}</div>}
    </section>
  );
}
