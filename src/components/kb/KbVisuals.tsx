import Image from "next/image";
import Link from "next/link";
import { KB_TONES, type KbImage, type KbTone } from "@/lib/kb-visuals";

/**
 * Bilder och färg i kunskapsbanken – se lib/kb-visuals.ts för färgerna per
 * databas och vilket foto som hör till vilken kategori.
 */

/** Bildband överst på en sida, med kategorin som färgad etikett. */
export function KbHeroImage({
  image,
  tone,
  label,
}: {
  image: KbImage;
  tone: KbTone;
  label?: string;
}) {
  return (
    <figure className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-ink/10 bg-cream aspect-[16/9] sm:aspect-[21/9]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="(min-width: 800px) 768px, 100vw"
        className="object-cover"
      />
      {label && (
        <figcaption
          className={`absolute bottom-3 left-3 md:bottom-4 md:left-4 rounded-full px-3 py-1 font-mono text-[10px] md:text-[10.5px] uppercase tracking-[0.16em] shadow-sm ${KB_TONES[tone].chip}`}
        >
          {label}
        </figcaption>
      )}
    </figure>
  );
}

/** Hubbens huvudbild bredvid rubriken (bara stora skärmar – på mobil tar bildrutorna över). */
export function KbHubImage({ image, tone }: { image: KbImage; tone: KbTone }) {
  return (
    <div className="relative hidden lg:block overflow-hidden rounded-[28px] border border-ink/10 bg-cream aspect-[4/3]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="(min-width: 1024px) 40vw, 0px"
        className="object-cover"
      />
      <span aria-hidden className={`absolute inset-x-0 top-0 h-1.5 ${KB_TONES[tone].bar}`} />
    </div>
  );
}

export type KbTile = {
  href: string;
  title: string;
  /** Liten rad ovanför titeln, t.ex. "10 frågor". */
  meta?: string;
  image: KbImage;
};

/** Bildrutor för kategorier – foto, mörk toning och vit text, med databasens färg som list överst. */
export function KbTiles({
  tiles,
  tone,
  columns = 3,
}: {
  tiles: KbTile[];
  tone: KbTone;
  columns?: 3 | 4;
}) {
  return (
    <ul className={`grid grid-cols-2 gap-3 md:gap-4 ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {tiles.map((t) => (
        <li key={t.href}>
          <Link
            href={t.href}
            className="group relative block aspect-[4/3] overflow-hidden rounded-2xl md:rounded-3xl bg-cream"
          >
            <Image
              src={t.image.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 30vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/5" />
            <span aria-hidden className={`absolute inset-x-0 top-0 h-1 ${KB_TONES[tone].bar}`} />
            <span className="absolute inset-x-0 bottom-0 p-3.5 md:p-5">
              {t.meta && (
                <span className="block font-mono text-[9.5px] md:text-[10.5px] uppercase tracking-[0.16em] text-bone/75">
                  {t.meta}
                </span>
              )}
              <span className="mt-1 block font-display text-[15.5px] md:text-[21px] leading-snug tracking-display-tight text-bone [text-wrap:balance]">
                {t.title}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
