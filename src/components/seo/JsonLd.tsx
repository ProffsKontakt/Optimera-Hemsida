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

/**
 * Sitewide Organization-schema (läggs i root-layouten).
 *
 * Namnnotis: Bolagsverket-registrerat namn på org.nr 559375-2206 är just nu
 * "Solpanelsgruppen i Sverige AB". Namnändring till "Optimera Energi Sverige
 * AB" är inskickad men inte processad. Allabolag-URLen i sameAs pekar
 * därför på det gamla slug:et "solpanelsgruppen-i-sverige-ab" – det är
 * samma entity och korrekt under övergångsperioden. När namnändringen
 * processats kommer Allabolag uppdatera slug:et automatiskt.
 *
 * alternateName-listan inkluderar både gamla legal namnet och kortform
 * så Googles entity resolution förstår att alla varianter pekar på
 * samma bolag.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE}#organization`,
  name: "Optimera Energi Sverige AB",
  legalName: "Optimera Energi Sverige AB",
  alternateName: [
    "Optimera Energi",
    "Optimera Energi Sverige AB",
    "Optimera",
    "Solpanelsgruppen i Sverige AB",
  ],
  url: BASE,
  logo: `${BASE}/logo.svg`,
  email: "hej@optimeraenergi.se",
  telephone: "+46763053732",
  vatID: "SE559375220601",
  taxID: "5593752206",
  foundingDate: "2026",
  foundingLocation: { "@type": "Place", name: "Solna, Sverige" },
  numberOfEmployees: 3,
  founder: [
    { "@type": "Person", name: "Viktor Tiberg", jobTitle: "Grundare och VD" },
    {
      "@type": "Person",
      name: "Julian Nordgren",
      jobTitle: "Grundare och Operativ Chef",
    },
  ],
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
  // Prisspann i SEK eftersom $$$-notationen är US-marknadens och visas
  // bokstavligt i Googles rich results. SEK-spannet täcker en vanlig
  // installation från liten sol till komplett sol+batteri+laddbox.
  priceRange: "50 000 - 250 000 SEK",
  // Knyt LocalBusiness till Organization-noden så Google ser dem som
  // samma entity, inte två separata bolag.
  parentOrganization: { "@id": `${BASE}#organization` },
  currenciesAccepted: "SEK",
  paymentAccepted: "Faktura, Kort, Swish",
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
    { "@type": "City", name: "Solna" },
    { "@type": "City", name: "Stockholm" },
    { "@type": "City", name: "Sundbyberg" },
    { "@type": "City", name: "Täby" },
    { "@type": "City", name: "Lidingö" },
    { "@type": "City", name: "Sollentuna" },
    { "@type": "City", name: "Nacka" },
    { "@type": "City", name: "Danderyd" },
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

/** VideoObject för homepage-filmen och framtida video-content. */
export function videoObjectSchema(input: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  durationISO: string;
  contentUrl: string;
  embedUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: input.name,
    description: input.description,
    thumbnailUrl: input.thumbnailUrl.startsWith("http")
      ? input.thumbnailUrl
      : `${BASE}${input.thumbnailUrl}`,
    uploadDate: input.uploadDate,
    duration: input.durationISO,
    contentUrl: input.contentUrl.startsWith("http")
      ? input.contentUrl
      : `${BASE}${input.contentUrl}`,
    embedUrl: input.embedUrl ?? BASE,
    inLanguage: "sv-SE",
    publisher: { "@id": `${BASE}#organization` },
    author: { "@id": `${BASE}#organization` },
    isFamilyFriendly: true,
  };
}

/** CollectionPage med ItemList för /guider och liknande hub-sidor. */
export function collectionPageSchema(input: {
  url: string;
  name: string;
  description: string;
  items: { url: string; name: string }[];
}) {
  const absoluteUrl = input.url.startsWith("http")
    ? input.url
    : `${BASE}${input.url}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl}#collectionpage`,
    url: absoluteUrl,
    name: input.name,
    description: input.description,
    inLanguage: "sv-SE",
    isPartOf: { "@id": `${BASE}#website` },
    publisher: { "@id": `${BASE}#organization` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: input.items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: it.url.startsWith("http") ? it.url : `${BASE}${it.url}`,
        name: it.name,
      })),
    },
  };
}

/** WebPage med ReserveAction för /offert (booking-endpoint). */
export const reservePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE}/offert#webpage`,
  url: `${BASE}/offert`,
  name: "Begär offert, boka kostnadsfritt hembesök",
  description:
    "Boka ett kostnadsfritt hembesök direkt i kalendern. Välj dag och tid, så ringer vi dagen innan och bekräftar.",
  inLanguage: "sv-SE",
  isPartOf: { "@id": `${BASE}#website` },
  about: { "@id": `${BASE}#localbusiness` },
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE}/offert`,
      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/MobileWebPlatform",
      ],
    },
    result: {
      "@type": "Reservation",
      name: "Kostnadsfritt hembesök av Optimera Energi",
    },
  },
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
    provider: { "@id": `${BASE}#localbusiness` },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Stockholms län" },
      { "@type": "City", name: "Solna" },
      { "@type": "City", name: "Stockholm" },
      { "@type": "City", name: "Sundbyberg" },
      { "@type": "City", name: "Täby" },
      { "@type": "City", name: "Lidingö" },
      { "@type": "City", name: "Sollentuna" },
      { "@type": "City", name: "Nacka" },
      { "@type": "City", name: "Danderyd" },
    ],
    url: input.url.startsWith("http") ? input.url : `${BASE}${input.url}`,
  };
}
