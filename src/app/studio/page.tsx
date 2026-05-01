import { StudioClient } from "@/components/studio/StudioClient";

export const metadata = {
  title: "Studio · Higgsfield",
  description: "Internt verktyg för att generera marknadsfilmer åt sidan.",
  robots: { index: false, follow: false },
};

const PRESETS = [
  {
    label: "Hembesök · morgon",
    prompt:
      "Slow cinematic dolly forward, golden Swedish morning light, three young installers in dark navy workwear with subtle gold accents, walking up to a Falu-red Stockholm cottage, carrying a tray of cinnamon buns and a tablet, premium documentary feel, anamorphic lens, shallow depth, 4k, no logos.",
    aspectRatio: "16:9" as const,
  },
  {
    label: "Tak / drönare",
    prompt:
      "Aerial drone, 60fps, descending slowly toward a black-roof Stockholm villa with newly installed glass-on-glass solar panels glistening, surrounding pines, calm overcast Nordic sky, photorealistic, cinematic.",
    aspectRatio: "16:9" as const,
  },
  {
    label: "Värmepump / detalj",
    prompt:
      "Macro shot, 35mm lens, slow rotation around a sleek heat-pump fan blade, water condensation glistening, soft ambient light, blueprint motif faintly reflected on the casing, premium engineering aesthetic, photorealistic.",
    aspectRatio: "1:1" as const,
  },
  {
    label: "Fika vid köksbordet",
    prompt:
      "Warm interior, late afternoon, a wide oak Scandinavian kitchen table, cinnamon buns on a ceramic plate, a tablet showing an energy dashboard, hands gesturing softly while explaining, coffee steam rising, cozy familiar tone, cinematic, shallow depth of field.",
    aspectRatio: "9:16" as const,
  },
  {
    label: "Vindsnurra · vinter",
    prompt:
      "A small vertical-axis wind turbine on a snow-dusted Swedish farm, slowly rotating, low winter sun behind, bokeh, cinematic photorealistic, calm sound, subtle blueprint diagram fading in over the frame.",
    aspectRatio: "16:9" as const,
  },
];

export default function StudioPage() {
  return (
    <>
      <section className="container-edge pt-12 md:pt-20 pb-10">
        <div className="max-w-3xl">
          <div className="eyebrow">Studio · internt</div>
          <h1 className="mt-5 font-display text-[44px] md:text-[72px] tracking-display-tight leading-[0.95]">
            Higgsfield-verkstaden.
          </h1>
          <p className="mt-6 max-w-xl text-ink/70 text-lg leading-relaxed">
            Här genererar vi videos som passar Kloka Tankar Els visuella språk.
            Promptar kan användas direkt eller modifieras. Kräver att{" "}
            <code className="font-mono text-ink/80">HIGGSFIELD_API_KEY</code>{" "}
            är satt i miljön.
          </p>
        </div>
      </section>
      <section className="container-edge pb-32">
        <StudioClient presets={PRESETS} />
      </section>
    </>
  );
}
