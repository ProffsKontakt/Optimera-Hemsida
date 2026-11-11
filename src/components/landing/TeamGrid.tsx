import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TeamMember } from "@/lib/team";
import { SectionHead } from "./shared";

/** Teamet i Solna: porträtt, namn och roll. Datat kommer från /admin/team. */
const NUMBER_WORDS: Record<number, string> = {
  2: "Två",
  3: "Tre",
  4: "Fyra",
  5: "Fem",
  6: "Sex",
  7: "Sju",
  8: "Åtta",
  9: "Nio",
  10: "Tio",
  11: "Elva",
  12: "Tolv",
};

export type TeamCard = TeamMember & { photoUrl: string | null; photoAlt: string };

const COLS = 6;
/** Bredd på utfyllnadsrutan, efter hur många platser som är tomma på sista raden. */
const FILL_SPAN: Record<number, string> = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
};

export function TeamGrid({ team }: { team: TeamCard[] }) {
  const count = NUMBER_WORDS[team.length] ?? String(team.length);
  // Tomma platser på sista raden (sex spalter på bred skärm). Två till fyra
  // tomma fylls med en ruta, så att rutnätet sluter som en hel rektangel.
  const fill = FILL_SPAN[(COLS - (team.length % COLS)) % COLS];
  return (
    <section className="bg-bone py-14 sm:py-20 md:py-28">
      <div className="container-edge">
        <SectionHead
          eyebrow="Teamet i Solna"
          title={
            <>
              {count} människor som <span className="text-indigo">svarar i telefonen.</span>
            </>
          }
          lede="Ingen växel. Ring eller mejla den du vill prata med direkt."
        />

        <ul className="mt-8 grid grid-cols-3 gap-x-2.5 gap-y-6 sm:mt-12 sm:gap-x-4 sm:gap-y-8 md:mt-16 md:gap-x-5 lg:grid-cols-6">
          {team.map((m, i) => (
            <li key={m.id} data-reveal data-stagger>
              <Link href={`/om-oss#person-${m.id}`} className="group block">
                <div
                  className={`relative aspect-[4/5] overflow-hidden rounded-[14px] bg-gradient-to-br sm:rounded-[20px] ${m.color}`}
                >
                  {m.photoUrl && (
                    <Image
                      src={m.photoUrl}
                      alt={m.photoAlt}
                      fill
                      sizes="(min-width: 1024px) 15vw, 30vw"
                      quality={80}
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                    />
                  )}
                  <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="mt-2.5 text-[14px] font-medium leading-tight tracking-[-0.01em] transition-colors duration-300 group-hover:text-indigo sm:mt-3.5 sm:text-[16px] sm:leading-normal">
                  {m.name}
                </div>
                <div className="mt-1 text-[12.5px] leading-snug text-ink/70 sm:mt-0.5 sm:text-[14px] sm:text-ink/60">{m.role}</div>
              </Link>
            </li>
          ))}
          {fill && (
            <li className={`hidden lg:block ${fill}`} data-reveal data-stagger>
              <div className="flex h-full flex-col justify-between gap-8 rounded-[20px] bg-sand p-7 xl:p-8">
                <div>
                  <div className="lp-eyebrow text-ink/70">Hör av dig</div>
                  <p className="lp-h3 mt-4 max-w-[22rem]">Vi svarar inom 24 timmar, alltid en människa.</p>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link href="/om-oss" className="lp-btn-ink">
                    Kontaktuppgifter till var och en <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                  <a
                    href="tel:+46763053732"
                    className="text-[15.5px] font-medium text-ink underline decoration-ink/25 underline-offset-4 transition hover:decoration-ink"
                  >
                    Ring 076&nbsp;305&nbsp;37&nbsp;32
                  </a>
                </div>
              </div>
            </li>
          )}
        </ul>

        <div className={`mt-10 flex flex-wrap items-center gap-3 ${fill ? "lg:hidden" : ""}`} data-reveal>
          <Link href="/om-oss" className="lp-btn-ink">
            Kontaktuppgifter till var och en <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <a
            href="tel:+46763053732"
            className="lp-btn border border-ink/15 text-ink hover:border-ink/40 hover:bg-ink/[0.04]"
          >
            Ring 076&nbsp;305&nbsp;37&nbsp;32
          </a>
        </div>
      </div>
    </section>
  );
}
