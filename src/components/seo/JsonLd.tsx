/**
 * Liten server-komponent som dumpar ett JSON-LD-objekt i en
 * <script type="application/ld+json">-tagg. Används för Schema.org-
 * structured data (Organization, LocalBusiness, FAQPage, etc).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // dangerouslySetInnerHTML är standardpraxis för JSON-LD i Next.js;
      // innehållet är vår egen serialiserade data, inte användarinput.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://optimeraenergi.se";

/** Sitewide Organization-schema (läggs i root-layouten). */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE}#organization`,
  name: "Optimera Energi Sverige AB",
  legalName: "Optimera Energi Sverige AB",
  alternateName: "Optimera Energi",
  url: BASE,
  logo: `${BASE}/logo.svg`,
  email: "hej@optimeraenergi.se",
  telephone: "+46763053732",
  vatID: "SE559447958501",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Vallgatan 9",
    postalCode: "170 67",
    addressLocality: "Solna",
    addressRegion: "Stockholms län",
    addressCountry: "SE",
  },
  sameAs: [],
};

/** LocalBusiness för /kontakt och /om-oss (mer rich-snippet-vänlig). */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ElectricalContractor"],
  "@id": `${BASE}#localbusiness`,
  name: "Optimera Energi Sverige AB",
  image: `${BASE}/opengraph-image`,
  url: BASE,
  email: "hej@optimeraenergi.se",
  telephone: "+46763053732",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Vallgatan 9",
    postalCode: "170 67",
    addressLocality: "Solna",
    addressRegion: "Stockholms län",
    addressCountry: "SE",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Stockholms län" },
    { "@type": "Country", name: "SE" },
  ],
  serviceType: [
    "Solpaneler",
    "Batterilager",
    "Värmepump",
    "Laddbox för elbil",
    "Energihantering",
  ],
  knowsAbout: [
    "Solceller",
    "Solpanelsinstallation",
    "Batterilager",
    "Värmepumpar",
    "Laddboxar",
    "Grön teknik-avdrag",
    "Stödtjänster",
    "FCR-D",
    "aFRR",
  ],
};

/** Bygg en FAQPage från en lista frågor + svar. */
export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };
}

/** Brödsmulor från en path-array. */
export function breadcrumbSchema(
  items: { name: string; href: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.href.startsWith("http") ? it.href : `${BASE}${it.href}`,
    })),
  };
}

/** Schema för en enskild tjänst. */
export function serviceSchema(input: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    provider: { "@id": `${BASE}#organization` },
    areaServed: { "@type": "AdministrativeArea", name: "Stockholms län" },
    url: input.url.startsWith("http") ? input.url : `${BASE}${input.url}`,
  };
}
