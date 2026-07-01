import Link from "next/link";
import { VISIBLE_SERVICES } from "@/lib/services";
import { ArrowUpRight } from "lucide-react";
import { ServiceVignetteLazy as ServiceVignette } from "@/components/3d/ServiceVignetteLazy";

/**
 * DEMO-variant av ServicesGrid. Skillnad mot live: de 3 tag-pillsen per kort
 * är borttagna så korten läses snabbare (3D-vignett + namn + one-liner räcker).
 * Live-ServicesGrid är orörd.
 */
// Endast synliga tjänster (värmepump är dold via hidden-flaggan i services.ts).
const DEMO_SERVICES = VISIBLE_SERVICES;

export function DemoServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {DEMO_SERVICES.map((s, i) => (
        <Link
          key={s.slug}
          href={`/tjanster/${s.slug}`}
          className="group relative block rounded-3xl border border-ink/10 bg-cream/70 hover:bg-cream transition-all overflow-hidden"
        >
          <div className="aspect-[16/10] relative overflow-hidden">
            <ServiceVignette kind={s.slug} />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="rounded-full bg-bone/85 backdrop-blur px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70 border border-ink/10">
                {s.badge}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-bone group-hover:rotate-45 transition-transform">
                <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
          <div className="p-7">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-xl tracking-display-tight">
                {s.name}
              </h3>
              <span className="font-mono text-[11px] text-ink/50">0{i + 1}</span>
            </div>
            <p className="mt-3 text-ink/65 text-[14.5px] leading-relaxed">
              {s.oneLiner}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
