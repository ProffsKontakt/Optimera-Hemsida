import Link from "next/link";
import { FlaskConical } from "lucide-react";

/**
 * Tydlig markör överst på demo-sidor så ingen förväxlar dem med den publika
 * sajten. Länkar till live (för jämförelse) och tillbaka till demo-listan.
 */
export function DemoBanner({ label }: { label: string }) {
  return (
    <div className="bg-indigo text-bone">
      <div className="container-edge py-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
        <span className="inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.18em] text-[10.5px] bg-bone/15 rounded-full px-2.5 py-1">
          <FlaskConical size={12} /> Demo
        </span>
        <span className="font-medium">{label}</span>
        <span className="text-bone/70 hidden sm:inline">
          Internt utkast – ej publikt, ej indexerat.
        </span>
        <span className="ml-auto flex gap-4">
          <Link
            href="/"
            target="_blank"
            className="underline underline-offset-2 hover:text-bone/80"
          >
            Jämför med live ↗
          </Link>
          <Link
            href="/admin/demo"
            className="underline underline-offset-2 hover:text-bone/80"
          >
            Alla demos
          </Link>
        </span>
      </div>
    </div>
  );
}
