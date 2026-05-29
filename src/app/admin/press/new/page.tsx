import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { isAdminAuthed } from "@/lib/admin-auth";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { PressForm } from "@/components/admin/PressForm";

export const metadata = {
  title: "Nytt pressmeddelande · Admin",
  robots: { index: false, follow: false },
};

export default function AdminPressNewPage() {
  if (!process.env.ADMIN_PASSWORD || !isAdminAuthed()) {
    redirect("/admin/login");
  }
  return (
    <>
      <AdminTopbar />
      <div className="container-edge pt-10 pb-32">
        <div className="max-w-3xl">
          <Link
            href="/admin/press"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55 hover:text-ink transition mb-8"
          >
            <ArrowLeft size={12} /> Press
          </Link>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
            Internt · nytt pressmeddelande
          </div>
          <h1 className="mt-3 font-display text-[40px] md:text-[56px] tracking-display-tight leading-[0.95]">
            Skriv något värt att läsa.
          </h1>
        </div>

        <div className="mt-10">
          <PressForm mode="new" />
        </div>
      </div>
    </>
  );
}
