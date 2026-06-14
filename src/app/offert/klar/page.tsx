import { OffertConfirmation } from "@/components/offert/OffertConfirmation";

export const metadata = {
  title: "Tack för din förfrågan",
  description:
    "Vi har tagit emot din förfrågan och återkommer inom kort.",
  // Tack-sidan ska inte indexeras, men dess page_view används som
  // konvertering (Key event) i GA4 och Google Ads.
  robots: { index: false, follow: true },
  alternates: { canonical: "/offert/klar" },
};

export default function OffertKlarPage() {
  return (
    <section className="container-edge pt-12 md:pt-20 pb-32">
      <div className="max-w-3xl">
        <div className="eyebrow">Offert · mottagen</div>
        <h1 className="mt-5 font-display text-[56px] md:text-[88px] tracking-display-tight leading-[0.95]">
          Tack, vi
          <br />
          <span className="italic font-serif text-indigo">hörs snart.</span>
        </h1>
      </div>
      <div className="mt-10">
        <OffertConfirmation />
      </div>
    </section>
  );
}
