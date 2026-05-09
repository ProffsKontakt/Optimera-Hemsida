import type { ReactNode } from "react";

/**
 * Standardlayout för juridiska sidor (integritet, villkor, cookies).
 * Centrerad textspalt, prose-stilar via Tailwind.
 */
export function LegalLayout({
  eyebrow,
  title,
  updatedAt,
  children,
}: {
  eyebrow: string;
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <article className="container-edge py-16 md:py-24">
      <header className="max-w-3xl">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="mt-5 font-display text-[40px] md:text-[64px] tracking-display-tight leading-[1] mb-3">
          {title}
        </h1>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
          Senast uppdaterad: {updatedAt}
        </p>
      </header>

      <div className="mt-10 max-w-3xl space-y-7 text-[15.5px] leading-relaxed text-ink/80">
        {children}
      </div>
    </article>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-2xl md:text-3xl tracking-display-tight leading-snug mt-10 mb-3 text-ink">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-lg md:text-xl tracking-display-tight mt-6 mb-2 text-ink">
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-ink/75 leading-relaxed">{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 text-ink/75 leading-relaxed marker:text-indigo">
      {children}
    </ul>
  );
}
