import { NextStep, SectionHead } from "./shared";

/** "Sex steg. Inga genvägar." Samma sex steg som tidigare, som ett rutnät. */
const STEPS = [
  {
    title: "Du hör av dig",
    body: "Mejl, telefon eller offertformulär. Vi svarar inom 24 timmar, alltid en människa.",
  },
  {
    title: "Hembesök",
    body: "Vi kommer hem, tittar på taket, går igenom elskåpet och pratar om vad du faktiskt vill ha.",
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
    body: "Vi visar dig appen, märker upp i skåpet och ringer dig efter 14 dagar och 6 månader för finjustering.",
  },
];

export function ProcessGrid() {
  return (
    <section className="bg-bone py-14 sm:py-20 md:py-28">
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
        {/* Mobil: en numrerad tidslinje (stegen är en ordningsföljd). Från
            640 px: kort i rutnät. */}
        <ol className="mt-8 grid sm:mt-12 sm:grid-cols-2 sm:gap-4 md:mt-16 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} data-reveal data-stagger className="flex">
              {/* Hover-lyftet ligger på ett inre element: skroll-animationen
                  äger transform på yttre elementet. */}
              <div
                className={`group relative w-full max-sm:pl-14 sm:overflow-hidden sm:rounded-[20px] sm:bg-[#FFFDF8] sm:p-6 sm:ring-1 sm:ring-ink/[0.07] sm:transition sm:duration-500 sm:hover:-translate-y-1 sm:hover:ring-indigo/30 md:p-7 ${
                  i < STEPS.length - 1 ? "max-sm:pb-8" : ""
                }`}
              >
              {/* Mobil: lodrät linje ner till nästa steg. */}
              {i < STEPS.length - 1 && (
                <span aria-hidden="true" className="lp-step-rail absolute bottom-0 left-[18px] top-11 w-px bg-ink/15 sm:hidden" />
              )}
              {/* Tunn linje som växer ut i överkanten vid hover. */}
              <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-indigo to-sun transition-transform duration-500 group-hover:scale-x-100 max-sm:hidden" />
              <span className="font-mono text-[12px] tracking-[0.14em] text-indigo max-sm:absolute max-sm:left-0 max-sm:top-0 max-sm:grid max-sm:h-[38px] max-sm:w-[38px] max-sm:place-items-center max-sm:rounded-full max-sm:bg-[#FFFDF8] max-sm:tracking-normal max-sm:ring-1 max-sm:ring-ink/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="lp-h3 max-sm:pt-1 sm:mt-3">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/65">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <NextStep className="mt-12 md:mt-14" note="Hembesöket är kostnadsfritt och utan förpliktelser." />
      </div>
    </section>
  );
}
