import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHead } from "./shared";

/**
 * "Fyra delar": ett bildkort per tjänst. Hela kortet är en länk till
 * tjänstesidan. Bilden zoomar lugnt och kortet lyfter vid hover.
 */
const PARTS = [
  {
    tag: "Producerar",
    title: "Solpaneler",
    body: "Glas-glas-paneler med 30 års produktgaranti, dimensionerade efter takets riktning, lutning och skugga. Typvillan landar runt 50 000 kr inkl. moms efter avdrag.",
    cta: "Om solpaneler",
    href: "/tjanster/solpaneler",
    img: "/start/kort-sol.jpg",
    alt: "Rött trähus med svarta solpaneler i två jämna rader på taket",
    pos: "object-[50%_32%]",
  },
  {
    tag: "Lagrar",
    title: "Batterier",
    body: "Sparar solen till kvällen och köper el när den är billig. Med solceller betalar sig batteriet typiskt på 3–7 år.",
    cta: "Om batterier",
    href: "/tjanster/batterier",
    img: "/start/kort-batteri.jpg",
    alt: "Fox ESS-batteri, en vit stapel med moduler på justerbara fötter",
    pos: "object-[50%_80%]",
  },
  {
    tag: "Värmer",
    title: "Värmepumpar",
    body: "Berg, luft-vatten och frånluft. Rätt flöde och rätt styrning betyder mer än märket på pumpen.",
    cta: "Om värmepumpar",
    href: "/tjanster/vaermepumpar",
    img: "/start/kort-varmepump.jpg",
    alt: "Vit luft-vatten-värmepump på betongplintar vid en gul trävilla",
    pos: "object-[50%_40%] sm:object-[50%_50%]",
  },
  {
    tag: "Laddar",
    title: "Laddboxar",
    body: "Laddar på nattens billigaste timmar eller på ditt solöverskott, med lastbalansering som alltid ingår.",
    cta: "Om laddboxar",
    href: "/tjanster/laddboxar",
    img: "/start/kort-laddbox.jpg",
    alt: "Elbil som laddar från en laddbox på en röd garagevägg",
    pos: "object-[50%_12%]",
  },
];

export function FourParts() {
  return (
    <section className="bg-bone py-14 sm:py-20 md:py-28">
      <div className="container-edge">
        <SectionHead
          eyebrow="Det vi installerar"
          title={
            <>
              Fyra delar. <span className="text-indigo">En kalkyl</span> för hela huset.
            </>
          }
          lede="Vi kan installera vilket märke som helst, men säljer det vi själva valt efter hundratals tester: det som ger mest värde över 25 år, varken det dyraste eller det billigaste."
        />

        <ul className="mt-8 grid gap-5 sm:mt-12 sm:grid-cols-2 md:mt-16 xl:grid-cols-4">
          {PARTS.map((p, i) => (
            <li key={p.href} data-reveal data-stagger>
              <Link
                href={p.href}
                className="group flex h-full flex-col overflow-hidden rounded-[30px] bg-[#FFFDF8] shadow-[0_1px_0_rgba(14,14,12,0.04)] ring-1 ring-ink/[0.06] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_rgba(20,22,42,0.45)]"
              >
                <div className="relative aspect-square overflow-hidden sm:aspect-[5/6]">
                  <Image
                    src={p.img}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 92vw"
                    quality={80}
                    className={`object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07] ${p.pos}`}
                  />
                  <span className="absolute left-3.5 top-3.5 rounded-full bg-bone/90 px-3 py-1.5 font-mono text-[11.5px] uppercase tracking-[0.18em] text-ink/75 backdrop-blur">
                    {p.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="lp-h3">{p.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink/65">{p.body}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[15.5px] font-medium text-ink transition-colors duration-300 group-hover:text-indigo">
                    {p.cta}
                    <ArrowRight
                      size={17}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
