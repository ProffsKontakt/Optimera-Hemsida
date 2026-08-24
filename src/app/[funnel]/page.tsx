import { notFound } from "next/navigation";
import { FUNNELS, getFunnel } from "@/lib/funnels";
import { FunnelWizard } from "@/components/funnel/FunnelWizard";

/**
 * Kanal-varianter av offert-funneln på egna rot-URL:er, t.ex.
 * /offert-fb (Facebook), /offert-ig (Instagram), /offert-hemsol (Hemsol).
 * Endast slugs i FUNNELS renderas (dynamicParams=false -> allt annat 404).
 *
 * Sidorna är annonslandningssidor: noindex och utanför sitemap så de inte
 * konkurrerar med /offert i sök.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return FUNNELS.map((f) => ({ funnel: f.slug }));
}

export function generateMetadata({ params }: { params: { funnel: string } }) {
  const f = getFunnel(params.funnel);
  if (!f) return {};
  return {
    title: "Begär offert – kostnadsfritt",
    description:
      "Svara på några snabba frågor om vad ditt hus behöver, så återkommer vi med en kostnadsfri offert.",
    robots: { index: false, follow: false },
    alternates: { canonical: "/offert" },
  };
}

export default function FunnelPage({ params }: { params: { funnel: string } }) {
  const funnel = getFunnel(params.funnel);
  if (!funnel) notFound();

  return (
    <section className="container-edge pt-8 md:pt-14 pb-24">
      <FunnelWizard funnel={funnel} />
    </section>
  );
}
