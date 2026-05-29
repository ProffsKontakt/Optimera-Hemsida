import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { isAdminAuthed } from "@/lib/admin-auth";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { PressForm } from "@/components/admin/PressForm";
import { getPressRelease } from "@/lib/press";

export const metadata = {
  title: "Redigera pressmeddelande · Admin",
  robots: { index: false, follow: false },
};

export default function AdminPressEditPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!isAdminAuthed()) {
    redirect("/admin/login");
  }
  const release = getPressRelease(params.slug);
  if (!release) notFound();
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
            Internt · redigera
          </div>
          <h1 className="mt-3 font-display text-[36px] md:text-[48px] tracking-display-tight leading-[1.0]">
            {release.title}
          </h1>
        </div>

        <div className="mt-10">
          <PressForm mode="edit" initial={release} />
        </div>
      </div>
    </>
  );
}
