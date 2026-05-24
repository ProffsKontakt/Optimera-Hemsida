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
  vatID: "SE559375220601",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Vallgatan 9",
    postalCode: "170 67",
    addressLocality: "Solna",
    addressRegion: "Stockholms län",
    addressCountry: "SE",
  },
  sameAs: [
    "https://www.linkedin.com/company/optimera-energi-sverige-ab/",
    "https://www.facebook.com/people/Optimera-Energi-Sverige/61589319586638/",
    "https://www.allabolag.se/foretag/solpanelsgruppen-i-sverige-ab/oskarstr%C3%B6m/byggm%C3%A4stare/2KIDITQI5YDDT",
  ],
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
  geo: {
    "@type": "GeoCoordinates",
    // Vallgatan 9, 170 67 Solna. Justera om kontoret byter adress.
    latitude: 59.3637,
    longitude: 17.9986,
  },
  hasMap: "https://www.google.com/maps/search/?api=1&query=Vallgatan+9%2C+170+67+Solna",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
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

/** WebSite + potentiella SearchAction. Läggs på startsidan. */
export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE}#website`,
  url: BASE,
  name: "Optimera Energi",
  inLanguage: "sv-SE",
  publisher: { "@id": `${BASE}#organization` },
};

/** AboutPage-wrapper för /om-oss. */
export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${BASE}/om-oss#aboutpage`,
  url: `${BASE}/om-oss`,
  name: "Om Optimera Energi",
  isPartOf: { "@id": `${BASE}#website` },
  about: { "@id": `${BASE}#organization` },
  mainEntity: { "@id": `${BASE}#localbusiness` },
};

/** ContactPage för /kontakt. */
export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${BASE}/kontakt#contactpage`,
  url: `${BASE}/kontakt`,
  name: "Kontakta Optimera Energi",
  isPartOf: { "@id": `${BASE}#website` },
  mainEntity: { "@id": `${BASE}#localbusiness` },
};

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
