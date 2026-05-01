import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-edge py-32 md:py-48 text-center">
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
        404 · ingen sida här
      </div>
      <h1 className="mt-5 font-display text-[64px] md:text-[120px] tracking-display-tight leading-[0.9]">
        Strömmen gick.
      </h1>
      <p className="mt-6 max-w-xl mx-auto text-ink/65">
        Sidan du letade efter finns inte längre, eller har inte byggts än.
      </p>
      <div className="mt-10 flex justify-center gap-3">
        <Link href="/" className="btn-primary">
          Tillbaka till startsidan
        </Link>
        <Link href="/offert" className="btn-ghost">
          Begär offert
        </Link>
      </div>
    </section>
  );
}
