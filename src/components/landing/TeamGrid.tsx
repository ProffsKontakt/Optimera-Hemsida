import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TeamMember } from "@/lib/team";
import { delay, SectionHead } from "./shared";

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

export function TeamGrid({ team }: { team: TeamCard[] }) {
  const count = NUMBER_WORDS[team.length] ?? String(team.length);
  return (
    <section className="bg-bone py-20 md:py-28">
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

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:mt-16 md:gap-x-5 lg:grid-cols-6">
          {team.map((m, i) => (
            <li key={m.id} data-reveal style={delay((i % 6) * 70)}>
              <Link href={`/om-oss#person-${m.id}`} className="group block">
                <div
                  className={`relative aspect-[4/5] overflow-hidden rounded-[24px] bg-gradient-to-br ${m.color}`}
                >
                  {m.photoUrl && (
                    <Image
                      src={m.photoUrl}
                      alt={m.photoAlt}
                      fill
                      sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 46vw"
                      quality={70}
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                    />
                  )}
                  <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="mt-3.5 text-[16px] font-semibold tracking-[-0.01em] transition-colors duration-300 group-hover:text-indigo">
                  {m.name}
                </div>
                <div className="mt-0.5 text-[14px] leading-snug text-ink/60">{m.role}</div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10" data-reveal>
          <Link href="/om-oss" className="lp-btn-ink">
            Kontaktuppgifter till var och en <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
