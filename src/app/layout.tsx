import type { Metadata, Viewport } from "next";
import { Fraunces, Poppins, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { JsonLd, organizationSchema } from "@/components/seo/JsonLd";

// Endast vikter vi faktiskt använder. Tidigare hade vi 5 weights (~50KB
// extra). 400 = brödtext, 500 = knappar/nav, 700 = stora rubriker.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Fraunces används bara för kursiva accent-ord ("under ett tak.", "tar hand
// om dig."). Endast italic + en optical size räcker — den 90+KB-tunga axes-
// definitionen var overkill.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["italic"],
});

// Mono används bara för eyebrows + monospace-små-detaljer. En vikt räcker.
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://optimeraenergi.se";

// Cookiebot Domain Group ID (CBID). Sätts som miljövariabel i Vercel –
// tills den finns laddas ingen Cookiebot-banner alls (inga trasiga script
// i dev). data-blockingmode="auto" gör att Cookiebot själv blockerar
// tredjepartscookies tills besökaren samtyckt.
const COOKIEBOT_CBID = process.env.NEXT_PUBLIC_COOKIEBOT_CBID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Optimera Energi – Solceller, batteri, värmepump och laddbox i Stockholm",
    template: "%s · Optimera Energi",
  },
  description:
    "Optimera Energi installerar solpaneler, batterier, värmepumpar och laddboxar i Stockholm. Hand-plockat sortiment, transparent prissättning, från offert till driftsättning under ett tak.",
  applicationName: "Optimera Energi",
  authors: [{ name: "Optimera Energi Sverige AB", url: SITE_URL }],
  creator: "Optimera Energi Sverige AB",
  publisher: "Optimera Energi Sverige AB",
  keywords: [
    "solceller Stockholm",
    "solpaneler",
    "batterilager",
    "värmepump",
    "laddbox",
    "JA Solar",
    "SAJ HS3",
    "Easyway",
    "Emaldo",
    "grön teknik avdrag",
    "stödtjänster",
    "Optimera Energi",
  ],
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "/",
    siteName: "Optimera Energi",
    title:
      "Optimera Energi – Hela energiomställningen, byggd på kloka tankar",
    description:
      "Solpaneler, batterier, värmepumpar och laddboxar i Stockholm. Hand-plockat sortiment, transparent prissättning, eget montageteam.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Optimera Energi – Hela energiomställningen, byggd på kloka tankar",
    description:
      "Solpaneler, batterier, värmepumpar och laddboxar i Stockholm.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
  category: "energy",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F1EA" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0E0C" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="sv"
      className={`${poppins.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* Cookiebot måste laddas före all annan JS för att auto-blocking
            ska hinna fånga tredjepartscookies. beforeInteractive hoisar
            scriptet till <head> av Next.js. */}
        {COOKIEBOT_CBID && (
          <Script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid={COOKIEBOT_CBID}
            data-blockingmode="auto"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className="min-h-screen bg-bone text-ink antialiased">
        <JsonLd data={organizationSchema} />
        {/* Skip-to-content för tangentbord & screenreader-användare.
            Lighthouse a11y kräver bypass-block och förbättrar score. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bone focus:outline-none focus:ring-2 focus:ring-indigo"
        >
          Hoppa till innehåll
        </a>
        <Navbar />
        <main id="main" className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
