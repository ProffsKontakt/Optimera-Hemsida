import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-32 bg-ink text-bone">
      <div className="container-edge py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="font-display text-4xl md:text-5xl tracking-display-tight leading-[1.05]">
            Energin är inte bara
            <br />
            ström — den är en hållning.
          </div>
          <p className="mt-6 text-bone/65 max-w-md text-[15px] leading-relaxed">
            Vi installerar solpaneler, batterier, värmepumpar, laddboxar och
            vindsnurror. Men vi gör det familjärt — med fika, raka besked och
            ingenjörskonst utan kompromiss.
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
              ["/tjanster/vindsnurror", "Vindsnurror"],
            ]}
          />
        </div>

        <div className="md:col-span-2">
          <Heading>Företaget</Heading>
          <FooterLinks
            links={[
              ["/om-oss", "Om oss"],
              ["/kalkylator", "Kalkylator"],
              ["/offert", "Begär offert"],
              ["/tankar", "Tankar (blogg)"],
            ]}
          />
        </div>

        <div className="md:col-span-3">
          <Heading>Kontakt</Heading>
          <ul className="space-y-2 text-bone/70 text-[14.5px]">
            <li>hej@klokatankar.se</li>
            <li>+46 (0)8 123 45 67</li>
            <li className="text-bone/50 pt-3 text-[13px]">
              Hammarby Sjöstad, Stockholm
              <br />
              Org.nr 559500-0000
            </li>
          </ul>
          <div className="mt-6 flex gap-2">
            <Badge>F-skatt</Badge>
            <Badge>BAS-U</Badge>
            <Badge>SEK</Badge>
          </div>
        </div>
      </div>

      <div className="border-t border-bone/10">
        <div className="container-edge py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12.5px] text-bone/50">
          <div className="flex items-center gap-3">
            <span className="font-mono">© {new Date().getFullYear()}</span>
            <span>Kloka Tankar El AB</span>
          </div>
          <div className="flex gap-5">
            <Link href="/integritet" className="hover:text-bone">
              Integritetspolicy
            </Link>
            <Link href="/villkor" className="hover:text-bone">
              Villkor
            </Link>
            <Link href="/cookies" className="hover:text-bone">
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
    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/45 mb-4">
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
            className="text-bone/75 hover:text-bone transition-colors text-[14.5px]"
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
    <span className="inline-flex items-center rounded-full border border-bone/15 px-2.5 py-1 text-[10.5px] font-mono uppercase tracking-[0.16em] text-bone/65">
      {children}
    </span>
  );
}
