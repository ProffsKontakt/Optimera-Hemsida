import Link from "next/link";
import { CITIES } from "@/lib/cities";

export function Footer() {
  return (
    <footer className="mt-32 bg-cream border-t border-ink/10 text-ink">
      {/* Stockholm-kommuner: intern länkning till city-landing-sidor.
          Hjälper Google upptäcka /solceller/[stad]-routes från footer
          och ger besökare en tydlig signal om var vi arbetar. */}
      <div className="border-b border-ink/10">
        <div className="container-edge py-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50 mb-4">
            Vi installerar solpaneler i
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
            {CITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/solceller/${c.slug}`}
                className="text-ink/70 hover:text-ink transition"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="container-edge py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="font-display text-4xl md:text-5xl tracking-display-tight leading-[1.05]">
            Energin är inte bara
            <br />
            ström – den är en hållning.
          </div>
          <p className="mt-6 text-ink/65 max-w-md text-[15px] leading-relaxed">
            Optimera Energi installerar solpaneler, batterier, värmepumpar
            och laddboxar. Vi gör det med kloka tankar bakom varje beslut –
            och med fika, raka besked och ingenjörskonst utan kompromiss.
          </p>
        </div>

        <div className="md:col-span-2">
          <Heading>Tjänster</Heading>
          <FooterLinks
            links={[
              ["/tjanster/solpaneler", "Solpaneler"],
              ["/tjanster/batterier", "Batterier"],
              ["/tjanster/vaermepumpar", "Värmepumpar"],
              ["/tjanster/laddboxar", "Laddboxar"],
            ]}
          />
        </div>

        <div className="md:col-span-2">
          <Heading>Företaget</Heading>
          <FooterLinks
            links={[
              ["/om-oss", "Om oss"],
              ["/kontakt", "Kontakt"],
              ["/kalkylator", "Kalkylator"],
              ["/guider", "Guider"],
              ["/press", "Press"],
              ["/offert", "Begär offert"],
            ]}
          />
        </div>

        <div className="md:col-span-3">
          <Heading>Kontakt</Heading>
          <ul className="space-y-2 text-ink/70 text-[14.5px]">
            <li>
              <a href="mailto:hej@optimeraenergi.se" className="hover:text-ink transition">
                hej@optimeraenergi.se
              </a>
            </li>
            <li>
              <a href="tel:+46763053732" className="hover:text-ink transition">
                076 305 37 32
              </a>
            </li>
            <li className="text-ink/55 pt-3 text-[13px]">
              Vallgatan 9
              <br />
              170 67 Solna
              <br />
              <span className="block pt-2">
                Optimera Energi Sverige AB
              </span>
              <span className="block">Org.nr 559375-2206</span>
            </li>
          </ul>
          <div className="mt-6 flex gap-2">
            <Badge>F-skatt</Badge>
            <Badge>BAS-U</Badge>
            <Badge>SEK</Badge>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
            <a
              href="https://www.linkedin.com/company/optimera-energi-sverige-ab/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/70 hover:text-ink transition"
            >
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/people/Optimera-Energi-Sverige/61589319586638/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/70 hover:text-ink transition"
            >
              Facebook
            </a>
            <a
              href="https://www.allabolag.se/foretag/solpanelsgruppen-i-sverige-ab/oskarstr%C3%B6m/byggm%C3%A4stare/2KIDITQI5YDDT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/70 hover:text-ink transition"
            >
              Allabolag
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="container-edge py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12.5px] text-ink/55">
          <div className="flex items-center gap-3">
            <span className="font-mono">© {new Date().getFullYear()}</span>
            <span>Optimera Energi Sverige AB</span>
          </div>
          <div className="flex gap-5">
            <Link href="/integritet" className="hover:text-ink">
              Integritetspolicy
            </Link>
            <Link href="/villkor" className="hover:text-ink">
              Villkor
            </Link>
            <Link href="/cookies" className="hover:text-ink">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50 mb-4">
      {children}
    </div>
  );
}

function FooterLinks({ links }: { links: [string, string][] }) {
  return (
    <ul className="space-y-2.5">
      {links.map(([href, label]) => (
        <li key={href}>
          <Link
            href={href}
            className="text-ink/75 hover:text-ink transition-colors text-[14.5px]"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-ink/15 px-2.5 py-1 text-[10.5px] font-mono uppercase tracking-[0.16em] text-ink/65">
      {children}
    </span>
  );
}
