import { delay, SectionHead } from "./shared";

/** "Sex steg. Inga genvägar." Samma sex steg som tidigare, som ett rutnät. */
const STEPS = [
  {
    title: "Du hör av dig",
    body: "Mejl, telefon eller offertformulär. Vi svarar inom 24 timmar, alltid en människa.",
  },
  {
    title: "Hembesök",
    body: "Vi kommer hem, tittar på taket, går igenom elskåpet och pratar om vad du faktiskt vill ha. Bullarna står vi för.",
  },
  {
    title: "Vi räknar på förutsättningarna",
    body: "Tak, förbrukning och mål ger det som är mest optimalt för just ditt behov, innan du tackar ja.",
  },
  {
    title: "Tydlig offert",
    body: "Märken, garantier, tidplan och totalpris på en sida. Inga påslag och inga från-priser, och priset håller hela vägen till fakturan.",
  },
  {
    title: "Utvalda installatörer",
    body: "Certifierade installatörer som vi handplockat och kvalitetssäkrat. Vi tar fullt ansvar för garantin.",
  },
  {
    title: "Driftsättning och uppföljning",
    body: "Vi visar dig appen, märker upp i skåpet och ringer dig efter 14 dagar och 6 månader för finjustering.",
  },
];

export function ProcessGrid() {
  return (
    <section className="bg-bone py-20 md:py-28">
      <div className="container-edge">
        <SectionHead
          eyebrow="Så jobbar vi"
          title={
            <>
              Sex steg. <span className="text-indigo">Inga genvägar.</span>
            </>
          }
          lede="Priset på offerten är priset på fakturan. Allt material, installation och avdrag står på en sida innan du tackar ja."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} data-reveal style={delay((i % 3) * 90)} className="flex">
              {/* Hover-lyftet ligger på ett inre element: skroll-animationen
                  äger transform på yttre elementet. */}
              <div className="group relative w-full overflow-hidden rounded-[26px] bg-[#FFFDF8] p-6 ring-1 ring-ink/[0.07] transition duration-500 hover:-translate-y-1 hover:ring-indigo/30 md:p-7">
              {/* Tunn linje som växer ut i överkanten vid hover. */}
              <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-indigo to-sun transition-transform duration-500 group-hover:scale-x-100" />
              <span className="font-mono text-[12px] tracking-[0.14em] text-indigo">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="lp-h3 mt-3">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/65">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
