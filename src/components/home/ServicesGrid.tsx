import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { ArrowUpRight } from "lucide-react";
import { ServiceVignette } from "@/components/3d/ServiceVignette";

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {SERVICES.map((s, i) => (
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
              <h3 className="font-display text-2xl tracking-display-tight">
                {s.name}
              </h3>
              <span className="font-mono text-[11px] text-ink/50">
                0{i + 1}
              </span>
            </div>
            <p className="mt-3 text-ink/65 text-[14.5px] leading-relaxed">
              {s.oneLiner}
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {s.bullets.slice(0, 3).map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-ink/10 px-2.5 py-1 text-[11.5px] text-ink/65"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
