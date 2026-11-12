import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { RecoStats } from "@/lib/reco-live";
import type { StartImage } from "@/lib/start-images";
import { Stars } from "./shared";

/** Avslutande bokningsruta: mörkt kort med vinterbild. */
export function BookingCta({ reco, image }: { reco: RecoStats; image: StartImage }) {
  return (
    <section className="bg-bone pb-0 pt-10 md:pt-12">
      <div className="container-edge">
        <div
          data-reveal="scale"
          className="lp-parallax-box relative isolate overflow-hidden rounded-[30px] bg-night px-7 py-14 text-white sm:px-12 md:py-20 lg:px-20 lg:py-24"
        >
          <Image
            src={image.src}
            alt=""
            fill
            sizes="(min-width: 1480px) 1350px, (min-width: 640px) 92vw, 170vw"
            quality={80}
            className={`lp-parallax -z-10 object-cover ${image.uploaded ? "object-[75%_center]" : "object-[90%_10%]"}`}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 via-night/55 to-night/5" />

          <div className="max-w-[40rem]">
            <div className="lp-eyebrow text-white/75">Nästa steg</div>
            <h2 className="lp-h2 mt-5 text-white">
              Boka ett hembesök. <span className="block">Vi tar med bullarna.</span>
            </h2>
            <p className="lp-lede mt-5 text-white/80">
              Välj dag och tid direkt i kalendern, så ringer vi dagen innan och bekräftar vem som
              kommer. Hembesöket är kostnadsfritt och utan förpliktelser. Är du allergisk mot kanel,
              säg till så tar vi med något annat.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/offert" className="lp-btn-sun">
                Boka hembesök <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a href="tel:+46763053732" className="lp-btn-glass">
                Ring 076 305 37 32
              </a>
            </div>
            <a
              href={reco.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 text-[15px] text-white/85 underline-offset-4 hover:underline"
            >
              <Stars decorative className="text-[16px] text-sun" />
              <span>
                <strong className="font-medium text-white">{reco.average} av 5</strong> på Reco,{" "}
                {reco.count} omdömen
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
