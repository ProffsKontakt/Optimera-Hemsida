import Link from "next/link";
import { delay, SectionHead } from "./shared";

/**
 * Vanliga frågor som kort med <details>. Ingen JavaScript behövs, och
 * svaren finns alltid i HTML:en (för sökmotorer och AI-sök). Frågorna är
 * desamma som i FAQ-schemat på sidan.
 */
export function HomeFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="container-edge">
        <SectionHead
          eyebrow="Vanliga frågor"
          title={
            <>
              Raka svar <span className="text-indigo">innan hembesöket.</span>
            </>
          }
        />
        <div className="lp-faq mt-10 max-w-[62rem] space-y-3 md:mt-12">
          {items.map((it, i) => (
            <details
              key={it.q}
              data-reveal
              style={delay(i * 60)}
              className="group rounded-[20px] bg-[#FFFDF8] ring-1 ring-ink/[0.06] transition-shadow duration-300 open:shadow-[0_18px_40px_-26px_rgba(20,22,42,0.5)] hover:ring-ink/15"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-6 px-5 py-5 text-[17px] font-semibold tracking-[-0.01em] md:px-6">
                {it.q}
                <span
                  className="lp-faq-plus grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-[18px] leading-none text-ink transition duration-300"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-6 text-[15.5px] leading-relaxed text-ink/70 md:px-6 md:pr-20">{it.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-[15px] leading-relaxed text-ink/60" data-reveal>
          Fler frågor? Läs våra{" "}
          <Link href="/fragor-och-svar" className="font-medium text-indigo underline-offset-2 hover:underline">
            samlade frågor och svar
          </Link>
          . Funderar du på batteri? Läs guiden{" "}
          <Link href="/solcellsbatteri" className="font-medium text-indigo underline-offset-2 hover:underline">
            solcellsbatteri till villa – pris, storlek och grönt avdrag
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
