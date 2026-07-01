import Link from "next/link";
import { redirect } from "next/navigation";
import { FlaskConical, ArrowRight } from "lucide-react";
import { isAdminAuthed } from "@/lib/admin-auth";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export const metadata = {
  title: "Demo · Admin",
  robots: { index: false, follow: false },
};

// Auth-gate måste köras per request (cookie-koll), aldrig prerenderas.
export const dynamic = "force-dynamic";

// Registret över demo-experiment. Lägg till fler här när vi vill testa
// varianter av andra sidor (t.ex. en tjänste-sida eller kalkylatorn).
const DEMOS = [
  {
    href: "/admin/demo/landningsida",
    label: "Landningsida (demo)",
    body: "Avskalad variant av startsidan – konsoliderad 'Så jobbar vi', social proof tidigare, lättare sektioner, kortad FAQ. Live är orörd.",
  },
  {
    href: "/admin/demo/kalkylator",
    label: "Kalkylator (demo)",
    body: "Avskalad kalkylator utan exakta kronor – klicka i vad du vill ha, få ärliga riktnings-spann och lotsas mot att begära offert. Live /kalkylator är orörd.",
  },
];

export default function AdminDemoPage() {
  if (!process.env.ADMIN_PASSWORD || !isAdminAuthed()) {
    redirect("/admin/login");
  }
  return (
    <>
      <AdminTopbar />
      <div className="container-edge pt-10 pb-32">
        <div className="max-w-4xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
            Internt · demo
          </div>
          <h1 className="mt-3 font-display text-[44px] md:text-[64px] tracking-display-tight leading-[0.95]">
            Demo.
          </h1>
          <p className="mt-4 text-ink/65 max-w-2xl leading-relaxed">
            Sandlåda för att testa och visa varianter internt utan att röra den
            publika sajten. Demo-sidorna är inloggningsskyddade och noindex – dela
            admin-lösenordet med teamet som ska få titta, eller visa via skärmdelning.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            {DEMOS.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="group rounded-3xl border border-ink/10 bg-bone p-7 hover:border-ink/40 transition flex flex-col gap-3"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-indigo text-bone">
                  <FlaskConical size={18} />
                </span>
                <h2 className="font-display text-2xl tracking-display-tight mt-2">
                  {d.label}
                </h2>
                <p className="text-[14.5px] text-ink/65 leading-relaxed">{d.body}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-[13.5px] text-indigo">
                  Öppna demo{" "}
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
