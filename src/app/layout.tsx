import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://klokatankar.se",
  ),
  title: {
    default: "Kloka Tankar El — Hela energiomställningen under ett tak",
    template: "%s · Kloka Tankar El",
  },
  description:
    "Solpaneler, batterier, värmepumpar, laddboxar och vindsnurror — installerade av samma team som dyker upp med bullar och respekt för ditt hem.",
  openGraph: {
    title: "Kloka Tankar El",
    description:
      "Hela energiomställningen under ett tak. Familjär service, kompromisslös ingenjörskonst.",
    type: "website",
    locale: "sv_SE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="sv"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen bg-bone text-ink antialiased">
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
