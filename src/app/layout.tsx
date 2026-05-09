import type { Metadata, Viewport } from "next";
import { Fraunces, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { JsonLd, organizationSchema } from "@/components/seo/JsonLd";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://optimeraenergi.se";

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
      <body className="min-h-screen bg-bone text-ink antialiased">
        <JsonLd data={organizationSchema} />
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
