import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowRight,
  Ban,
  Mail,
  MapPin,
  Phone,
  Receipt,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { Section } from "@/components/site/Section";
import { BrandPanel } from "@/components/site/BrandPanel";
import { RecoBadge } from "@/components/site/RecoBadge";
import { FounderVideo } from "@/components/about/FounderVideo";
import {
  ContactRouter,
  type ResolvedRoute,
  type RoutePerson,
} from "@/components/about/ContactRouter";
import {
  AvatarStack,
  displayPhone,
  telHref,
} from "@/components/about/people";
import { getVisibleTeam, type TeamMember } from "@/lib/team";
import { getMedia, getInstallationPhotos } from "@/lib/media";
import { CONTACT_ROUTES } from "@/lib/contact-routes";
import { RECO } from "@/lib/reco";
import { VISIBLE_SERVICES, visibleServiceText } from "@/lib/services";
import {
  JsonLd,
  localBusinessSchema,
  aboutPageSchema,
  breadcrumbSchema,
} from "@/components/seo/JsonLd";

/*
 * /om-oss – strukturerad för förtroende (okt 2026):
 *  1. Hero + "Vem ska du höra av dig till?"  – rätt person direkt
 *  2. Teamet                                  – ansikten, roller, nummer
 *  3. Så började det                          – grundarfilmen (eller
 *                                               grundarnas porträtt)
 *  4. Det här kan du räkna med                – fyra konkreta löften
 *  5. Installationsbilder (när de finns)
 *  6. Bolagsresan
 *  7. Besök oss + bolagsfakta
 *
 * Borttaget: "9/10 – Mål: kunder rekommenderar oss" (statsraden och
 * tidslinjens 2030-steg), samt alla omnämnanden av värmepumpar – tjänsten
 * är dold på resten av sajten.
 */

// Rubriker räknas från teamlistan så de aldrig ljuger när teamet ändras.
const COUNT_WORDS = [
  "Noll", "En", "Två", "Tre", "Fyra", "Fem", "Sex", "Sju", "Åtta", "Nio",
  "Tio", "Elva", "Tolv", "Tretton", "Fjorton", "Femton",
];
function countWord(n: number): string {
  return COUNT_WORDS[n] ?? String(n);
}

export function generateMetadata(): Metadata {
  const n = getVisibleTeam().length;
  const word = countWord(n).toLowerCase();
  return {
    title: "Om oss · Optimera Energi – elfirman som tar hand om dig",
    description: `Möt de ${word} personerna bakom Optimera Energilösningar i Mälardalen AB – med namn, roll och direktnummer, och se direkt vem du ska kontakta. Vi installerar ${visibleServiceText("plural")}.`,
    alternates: { canonical: "/om-oss" },
    openGraph: {
      title: "Om oss – Optimera Energi",
      description: `${countWord(n)} personer med kontor i Solna som installerar ${visibleServiceText("short")} – och som finns kvar dagen efter att kontraktet är skrivet.`,
      url: "/om-oss",
      type: "website",
    },
  };
}

const TIMELINE = [
  {
    year: "2026",
    title: "Vi grundades på rak ärlighet.",
    body:
      "Tre personer från branschens största bolag bestämde sig för att göra det vi själva saknade: en installatör som tar hand om kunden hela vägen.",
  },
  {
    year: "2026",
    title: "Kvalitetssäkrade installationer.",
    body:
      "Varje jobb utförs av noggrant utvalda, certifierade installatörer som vi tar fullt ansvar för. Ringer du oss tre år efter installationen är det fortfarande vi som svarar.",
  },
  {
    year: "2027",
    title: "Mälardalen och fasta avtal med tillverkare.",
    body:
      "Vi har redan skaffat oss djupa relationer med leverantörerna vi tror på. Det betyder bättre garantier och snabbare service när något krånglar.",
  },
  {
    year: "2028",
    title: "Egen energihandel utan dolda påslag.",
    body:
      "När vi blir balansansvarig partner kan vi ge våra kunder spotpris utan påslag och en transparent ekonomi i din egen produktion.",
  },
];

const PROMISES = [
  {
    icon: <Receipt size={18} />,
    title: "Fast pris",
    body: "Priset på offerten är priset på fakturan. Inga dolda påslag.",
  },
  {
    icon: <UserCheck size={18} />,
    title: "En fast kontaktperson",
    body: "Samma person från första mejl till sista uppföljning.",
  },
  {
    icon: <Ban size={18} />,
    title: "Ärliga råd",
    body: "Vi säger nej till installationer som inte passar dig.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "25 års garanti",
    body: "Garantin på installationen följer med huset om du säljer.",
  },
];

// LocalBusiness berikat med founder + employee + foundingDate-data
// specifikt för /om-oss. Byggs från getVisibleTeam() så admin-redigeringar
// (/admin/team) slår igenom – och dolda personer aldrig hamnar i schemat.
function teamLocalBusinessSchema(team: TeamMember[]) {
  const person = (m: TeamMember) => ({
    "@type": "Person",
    name: m.name,
    jobTitle: m.role,
    email: m.email,
    ...(m.phone ? { telephone: telHref(m.phone) } : {}),
  });
  return {
    ...localBusinessSchema,
    founder: team.filter((m) => /grundare/i.test(m.role)).map(person),
    employee: team.map(person),
    foundingDate: "2026",
    foundingLocation: { "@type": "Place", name: "Solna, Sverige" },
    numberOfEmployees: team.length,
  };
}

export default function AboutPage() {
  // Dolda personer filtreras bort SERVER-SIDE – de renderas aldrig, så
  // varken korten, kontaktvägarna, siffrorna eller JSON-LD:n röjer dem.
  const team = getVisibleTeam();
  const n = team.length;
  const installationPhotos = getInstallationPhotos();
  const film = getMedia("om-oss:grundarfilm");
  const filmPoster = getMedia("om-oss:grundarfilm-omslag");

  const lite = (m: TeamMember): RoutePerson => ({
    id: m.id,
    name: m.name,
    role: m.role,
    phone: m.phone,
    email: m.email,
    color: m.color,
    photo: getMedia(`team:${m.id}`)?.url,
  });
  const people = team.map(lite);
  const founders = people.filter((p) => /grundare/i.test(p.role));
  const routes: ResolvedRoute[] = CONTACT_ROUTES.map((r) => ({
    id: r.id,
    // Nya kunder: frågan räknar upp de tjänster som faktiskt är lanserade.
    question:
      r.id === "ny-kund"
        ? `Funderar du på ${visibleServiceText("short", "eller")}?`
        : r.question,
    groupTitle: r.groupTitle,
    groupNote: r.groupNote,
    people: team.filter((m) => m.contactFor?.includes(r.id)).map(lite),
  }));
  // Kortens etikett ("Kontakt för: Pågående installation"). Inte för nya
  // kunder – det gäller alla rådgivare och säger inget utöver rollen.
  const routeLabel = (m: TeamMember) =>
    CONTACT_ROUTES.filter(
      (r) => r.id !== "ny-kund" && m.contactFor?.includes(r.id),
    )
      .map((r) => r.cardLabel)
      .join(" · ");

  return (
    <>
      <JsonLd data={aboutPageSchema} />
      <JsonLd data={teamLocalBusinessSchema(team)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Hem", href: "/" },
          { name: "Om oss", href: "/om-oss" },
        ])}
      />

      {/* 1. Hero + vem ska du höra av dig till */}
      <section className="container-edge pt-10 md:pt-16 pb-12 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6">
            <div className="eyebrow">Om Optimera Energi</div>
            <h1 className="mt-5 font-display text-[44px] md:text-[72px] lg:text-[76px] tracking-display-tight leading-[1.15]">
              En elfirma som
              <span className="block italic font-serif text-indigo">
                tar hand om dig.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-ink/70 text-lg leading-relaxed">
              Vi är {countWord(n).toLowerCase()} personer med kontor i Solna
              som installerar {visibleServiceText("plural")} – och som finns
              kvar dagen efter att kontraktet är skrivet. Här ser du
              vilka vi är, och vem du ska prata med.
            </p>

            {/* Förtroenderad: ansiktena + Reco. whitespace-nowrap håller
                varje del hel; raden bryts hellre mellan delarna. */}
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="#teamet"
                className="group inline-flex items-center gap-3 whitespace-nowrap"
              >
                <AvatarStack people={people} max={5} size={40} />
                <span className="inline-flex items-center gap-1.5 text-[14px] text-ink/70 group-hover:text-ink transition">
                  Möt teamet <ArrowDown size={14} />
                </span>
              </a>
              <a
                href={RECO.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-col gap-0.5 whitespace-nowrap text-[13.5px] leading-tight text-ink/70 hover:text-ink transition"
              >
                <span className="text-amber-deep tracking-[0.1em]" aria-hidden>
                  ★★★★★
                </span>
                <span>
                  <span className="font-medium text-ink">{RECO.average} av 5</span> på
                  Reco · {RECO.count} omdömen
                </span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <ContactRouter routes={routes} />
          </div>
        </div>
      </section>

      {/* 2. Teamet */}
      <Section
        eyebrow="Teamet"
        title={<span id="teamet" className="scroll-mt-28">{countWord(n)} människor som svarar i telefonen.</span>}
        intro="Ingen växel och ingen chattbot. Vi har rötter i några av Sveriges mest välrenommerade bolag inom solenergi och el – ring eller mejla den du vill prata med direkt."
        className="!pt-4 md:!pt-8 !pb-16 md:!pb-24"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {team.map((m) => {
            const photo = getMedia(`team:${m.id}`);
            const label = routeLabel(m);
            return (
              <article
                key={m.id}
                id={`person-${m.id}`}
                className="scroll-mt-28 rounded-3xl border border-ink/10 overflow-hidden bg-bone flex flex-col target:ring-2 target:ring-indigo target:ring-offset-4 target:ring-offset-bone"
              >
                <div className={`aspect-[4/5] bg-gradient-to-br ${m.color} relative`}>
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photo.url}
                      alt={photo.alt || m.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 mix-blend-overlay opacity-25 bg-grain bg-grain-sm" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {label && (
                    <span className="absolute left-2.5 top-2.5 md:left-4 md:top-4 inline-flex max-w-[calc(100%-1.25rem)] items-center gap-1.5 rounded-full bg-bone/90 backdrop-blur px-2.5 py-1 text-[10.5px] md:text-[12px] font-medium text-ink/85">
                      <Phone size={11} className="shrink-0 text-indigo" />
                      <span className="truncate">{label}</span>
                    </span>
                  )}
                  <div className="absolute bottom-0 inset-x-0 p-3 md:p-5 text-bone">
                    <div className="font-mono text-[9px] md:text-[10.5px] uppercase tracking-[0.14em] md:tracking-[0.18em] text-bone/80 truncate">
                      {m.role}
                    </div>
                    <div className="font-display text-base md:text-2xl tracking-display-tight mt-0.5 md:mt-1 leading-tight">
                      {m.name}
                    </div>
                  </div>
                </div>
                <div className="p-3.5 md:p-7 flex flex-col gap-3 md:gap-4 flex-1">
                  {/* Bion döljs i mobilens tvåkolumnsläge – annars blir det
                      ett jäkla skrollande. */}
                  <p className="hidden md:block text-ink/70 text-[14.5px] leading-relaxed">
                    {m.bio}
                  </p>
                  <div className="mt-auto md:pt-4 md:border-t md:border-ink/10">
                    {/* Mobil: kompakta ikon-knappar. */}
                    <div className="flex gap-2 md:hidden">
                      <a
                        href={`mailto:${m.email}`}
                        aria-label={`Mejla ${m.name}`}
                        className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink/70 active:bg-ink/5"
                      >
                        <Mail size={14} />
                      </a>
                      {m.phone && (
                        <a
                          href={`tel:${telHref(m.phone)}`}
                          aria-label={`Ring ${m.name}`}
                          className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink/70 active:bg-ink/5"
                        >
                          <Phone size={14} />
                        </a>
                      )}
                    </div>
                    {/* Desktop: fulla kontaktrader. */}
                    <div className="hidden md:block space-y-2 text-[13.5px]">
                      <a
                        href={`mailto:${m.email}`}
                        className="flex items-center gap-2 text-ink/70 hover:text-indigo transition break-all"
                      >
                        <Mail size={13} className="shrink-0" />
                        {m.email}
                      </a>
                      {m.phone && (
                        <a
                          href={`tel:${telHref(m.phone)}`}
                          className="flex items-center gap-2 text-ink/70 hover:text-indigo transition"
                        >
                          <Phone size={13} className="shrink-0" />
                          {displayPhone(m.phone)}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* 3. Så började det – grundarfilmen, eller grundarnas porträtt tills
          en film laddats upp i /admin/media → "Om oss". */}
      <div className="bg-cream/45 border-y border-ink/5">
        <Section
          eyebrow="Så började det"
          title={
            <>
              Den varma kanelbullen
              <span className="block italic font-serif text-indigo">
                i en kall vinterstorm.
              </span>
            </>
          }
          className="!py-16 md:!py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {(film || founders.length > 0) && (
              <div className="lg:col-span-7">
                {film ? (
                  <FounderVideo
                    url={film.url}
                    poster={filmPoster?.url}
                    title={film.alt || "Så började Optimera Energi"}
                  />
                ) : (
                  <div className={`grid gap-3 md:gap-4 ${founders.length > 1 ? "grid-cols-2" : "grid-cols-1 max-w-sm"}`}>
                    {founders.slice(0, 2).map((f) => (
                      <figure
                        key={f.id}
                        className={`relative aspect-[4/5] overflow-hidden rounded-[28px] bg-gradient-to-br ${f.color}`}
                      >
                        {f.photo && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={f.photo}
                            alt={f.name}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <figcaption className="absolute bottom-0 inset-x-0 p-4 md:p-6 text-bone">
                          <div className="font-mono text-[9.5px] md:text-[10.5px] uppercase tracking-[0.16em] text-bone/80">
                            {f.role}
                          </div>
                          <div className="mt-1 font-display text-lg md:text-2xl tracking-display-tight leading-tight">
                            {f.name}
                          </div>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div
              className={`space-y-5 text-ink/75 text-[16px] md:text-[17px] leading-relaxed ${
                film || founders.length > 0 ? "lg:col-span-5" : "lg:col-span-8"
              }`}
            >
              <p>
                Efter att ha jobbat i solcells- och energibranschen länge har
                vi sett samma sak gång på gång: bolag som fular sig med
                installationer och säljer på så mycket som möjligt för att
                maxa marginalen, oavsett om kunden faktiskt behöver det.
                Människor som vill göra något för miljön förtjänar bättre än
                så.
              </p>
              <p>
                Vår vision är att vara installatören som tar hand om dig.
                Allt ska kännas bra från första kontakt till sista inkopplade
                kontakt. Vi ringer dagen innan, vi förklarar varje siffra på
                offerten, vi finns kvar år efter installationen.
              </p>
              <p>
                Solcells- och batteribranschen har länge varit som en kall
                vinterstorm man slänger sig ut i när man vill göra något för
                sig själv eller miljön. Vi ska vara känslan av en varm
                kanelbulle mitt i den stormen. Familjär service kombinerat
                med ingenjörskonst som håller i 25 år.
              </p>
            </div>
          </div>
        </Section>
      </div>

      {/* 4. Det här kan du räkna med */}
      <Section
        eyebrow="Det här kan du räkna med"
        title={<>Fyra saker vi aldrig tummar på.</>}
        className="!py-16 md:!py-24"
      >
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {PROMISES.map((p) => (
            <li
              key={p.title}
              className="rounded-3xl border border-ink/10 bg-bone p-6 md:p-7"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-indigo text-bone">
                {p.icon}
              </span>
              <h3 className="mt-5 font-display text-xl tracking-display-tight leading-snug">
                {p.title}
              </h3>
              <p className="mt-2 text-[14.5px] text-ink/65 leading-relaxed">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 5. Bilder från installationer. Fylls från /admin/media → gruppen
          "Installationer (om-oss)"; alt-texten blir bildtext. Utan foton
          renderas inte sektionen alls. */}
      {installationPhotos.length > 0 && (
        <Section
          eyebrow="En vanlig vecka"
          title={<>Färdiga batteriinstallationer hos våra kunder.</>}
          intro="Vi dokumenterar varje arbete vi släpper ifrån oss. När vi är klara ska elskåpet vara snyggare än när vi kom."
          className="!pt-0 !pb-16 md:!pb-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {installationPhotos.map((photo) => (
              <figure
                key={photo.slotId}
                className="aspect-[4/5] rounded-2xl overflow-hidden border border-ink/10 bg-cream relative"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={photo.alt || "Installation av Optimera Energi"}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {photo.alt && (
                  <figcaption className="absolute inset-x-0 bottom-0 p-3 pt-8 text-[12.5px] text-bone leading-snug bg-gradient-to-t from-ink/75 via-ink/40 to-transparent">
                    {photo.alt}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </Section>
      )}

      {/* 6. Bolagsresan */}
      <div className="bg-cream/45 border-y border-ink/5">
        <Section
          eyebrow="Bolagsresan"
          title={<>Vår väg mot den kompletta energileverantören.</>}
          intro="Hur vi byggs år för år. Allt i tjänst av att förtjäna ditt förtroende."
          className="!py-16 md:!py-24"
        >
          <ol className="relative border-l-2 border-ink/10 ml-3 md:ml-6 space-y-10">
            {TIMELINE.map((step, i) => (
              <li key={i} className="pl-6 md:pl-10 relative">
                <span
                  className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full ring-4 ring-cream bg-indigo"
                  aria-hidden
                />
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                  {step.year}
                </div>
                <h3 className="mt-2 font-display text-2xl md:text-3xl tracking-display-tight leading-snug">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-2xl text-ink/70 leading-relaxed">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      {/* 7. Besök oss + bolagsfakta */}
      <Section className="!py-16 md:!py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-stretch">
          <div className="lg:col-span-7">
            <BrandPanel className="h-full">
              <div className="flex h-full flex-col">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
                  Kom förbi
                </div>
                <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-display-tight leading-[1.15]">
                  Vallgatan 9, Solna.
                </h2>
                <p className="mt-5 max-w-md text-ink/70 leading-relaxed">
                  Säg till om du vill titta in. Vi öppnar gärna upp kontoret
                  för en kopp kaffe och ett rakt samtal om vad du funderar på.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:mt-auto sm:pt-8">
                  <Link href="/offert" className="btn-primary justify-center">
                    Boka hembesök <ArrowRight size={16} />
                  </Link>
                  <Link href="/kontakt" className="btn-ghost justify-center">
                    <MapPin size={15} /> Hitta hit
                  </Link>
                </div>
              </div>
            </BrandPanel>
          </div>

          <aside className="lg:col-span-5 rounded-3xl border border-ink/10 bg-bone p-7 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/55">
                Bolagsfakta
              </div>
              <RecoBadge size={64} />
            </div>
            <dl className="mt-4 space-y-3.5 text-[14px]">
              <FactRow k="Juridiskt namn" v="Optimera Energilösningar i Mälardalen AB" />
              <FactRow k="Org.nummer" v="559375-2206" />
              <FactRow k="Säte" v="Vallgatan 9, Solna" />
              <FactRow k="Grundat" v="2026" />
              <FactRow k="Medarbetare" v={String(n)} />
              <FactRow k="Auktorisation" v="F-skatt · BAS-U · SEK" />
            </dl>
            <div className="mt-6 pt-5 border-t border-ink/10 flex flex-wrap gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-ink/65">
              {VISIBLE_SERVICES.map((sv) => (
                <Tag key={sv.slug}>{sv.name}</Tag>
              ))}
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function FactRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink/8 pb-3 last:border-b-0 last:pb-0">
      <dt className="text-ink/55 shrink-0">{k}</dt>
      <dd className="text-ink/85 text-right">{v}</dd>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-ink/15 bg-cream/60 px-2.5 py-1">
      {children}
    </span>
  );
}
