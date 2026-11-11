import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Avslutande bokningsruta: mörkt kort med vinterbild. */
export function BookingCta() {
  return (
    <section className="bg-bone pb-14 pt-10 md:pb-20 md:pt-12">
      <div className="container-edge">
        <div
          data-reveal="scale"
          className="group relative isolate overflow-hidden rounded-[34px] bg-night px-7 py-14 text-white sm:px-12 md:py-20 lg:px-20 lg:py-24"
        >
          <Image
            src="/kb/bat-trygghet.jpg"
            alt=""
            fill
            sizes="(min-width: 1480px) 1350px, 92vw"
            quality={66}
            className="-z-10 object-cover object-[72%_center] brightness-[1.35] saturate-[1.15] transition-transform duration-[2400ms] ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 via-night/55 to-night/5" />

          <div className="max-w-[40rem]">
            <div className="lp-eyebrow text-white/75">Nästa steg</div>
            <h2 className="lp-h2 mt-5 text-white">
              Boka ett hembesök. <span className="block">Vi tar med bullarna.</span>
            </h2>
            <p className="lp-lede mt-5 text-white/80">
              Berätta lite om ditt hus, så hör vi av oss inom 24 timmar med förslag på datum. Utan
              kostnad och utan förpliktelse. Är du allergisk, säg till så tar vi med något annat.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/offert" className="lp-btn-sun">
                Begär hembesök <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a href="tel:+46763053732" className="lp-btn-glass">
                Ring 076 305 37 32
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
