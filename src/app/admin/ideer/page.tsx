import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin-auth";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { IdeaBoard } from "@/components/admin/IdeaBoard";

export const metadata = {
  title: "Idé-hörnan · Admin",
  robots: { index: false, follow: false },
};

export default function IdeaCornerPage() {
  if (!process.env.ADMIN_PASSWORD || !isAdminAuthed()) {
    redirect("/admin/login");
  }
  return (
    <>
      <AdminTopbar />
      <div className="container-edge pt-10 pb-32">
        <div className="max-w-3xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
            Internt · ideapool
          </div>
          <h1 className="mt-3 font-display text-[44px] md:text-[64px] tracking-display-tight leading-[0.95]">
            Idé-hörnan.
          </h1>
          <p className="mt-4 text-ink/65 max-w-2xl leading-relaxed">
            En plats för kloka tankar – om sälj, CRM-utbyggnad, drift och
            marknad. Skriv ner det när det är färskt; flytta till
            <em> bearbetas</em> när någon plockat upp det; markera <em>klar</em>
            {" "}när vi byggt eller lanserat det.
          </p>
        </div>

        <div className="mt-10">
          <IdeaBoard />
        </div>
      </div>
    </>
  );
}
