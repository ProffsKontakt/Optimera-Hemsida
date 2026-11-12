import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { StartImage } from "@/lib/start-images";
import { delay } from "./shared";

/**
 * "Så började det": bild till vänster, berättelsen och tre nyckeltal till
 * höger. Bakgrunden byter ton en bit ner, så att bilden kliver över kanten.
 */
export function OriginStory({ teamCount, image }: { teamCount: number; image: StartImage }) {
  return (
    <section className="bg-[linear-gradient(to_bottom,#F4F1EA_36vw,#EAE4D6_36vw)] lg:bg-[linear-gradient(to_bottom,#F4F1EA_0%,#F4F1EA_34%,#EAE4D6_34%,#EAE4D6_100%)] pb-14 pt-4 sm:pb-20 md:pb-28">
      <div className="container-edge grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-6" data-reveal="left">
          <div className="lp-parallax-box group relative aspect-[4/3] overflow-hidden rounded-[30px] shadow-[0_40px_80px_-50px_rgba(20,22,42,0.7)]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              // Bilden ritas bredare än rutan (beskärning plus parallax).
              sizes="(min-width: 1024px) 58vw, 116vw"
              quality={80}
              className={`lp-parallax object-cover ${image.uploaded ? "object-center" : "object-right"}`}
            />
          </div>
        </div>

        <div className="lg:col-span-6" data-reveal="right" style={delay(120)}>
          <div className="lp-eyebrow text-ink/70">Så började det</div>
          <h2 className="lp-h2 mt-5">En varm kanelbulle i en kall vinterstorm.</h2>
          <p className="lp-lede mt-5 text-ink/70">
            Efter många år i solcells- och energibranschen har vi sett samma sak gång på gång: bolag som
            säljer på så mycket som möjligt, oavsett vad kunden behöver. Vi gör tvärtom. Vi ringer dagen
            innan, förklarar varje siffra på offerten och finns kvar år efter installationen.
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-4 md:gap-6">
            <div className="flex flex-col-reverse justify-end border-t-2 border-ink pt-4" data-reveal style={delay(200)}>
              <dt className="mt-1.5 text-[13.5px] leading-snug text-ink/60">personer i Solna</dt>
              <dd className="font-display text-[2rem] font-medium tabular-nums leading-none tracking-[-0.03em]">
                {teamCount}
              </dd>
            </div>
            <div className="flex flex-col-reverse justify-end border-t-2 border-ink pt-4" data-reveal style={delay(300)}>
              <dt className="mt-1.5 text-[13.5px] leading-snug text-ink/60">svar på din förfrågan</dt>
              <dd className="font-display text-[2rem] font-medium tabular-nums leading-none tracking-[-0.03em]">
                24&nbsp;h
              </dd>
            </div>
            <div className="flex flex-col-reverse justify-end border-t-2 border-ink pt-4" data-reveal style={delay(400)}>
              <dt className="mt-1.5 text-[13.5px] leading-snug text-ink/60">
                dagar och månader till uppföljning
              </dt>
              <dd className="font-display text-[2rem] font-medium tabular-nums leading-none tracking-[-0.03em]">
                14 + 6
              </dd>
            </div>
          </dl>

          <Link href="/om-oss" className="lp-btn-ink mt-9">
            Möt teamet <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
