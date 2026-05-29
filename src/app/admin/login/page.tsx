import { redirect } from "next/navigation";
import { isAdminAuthed, isAdminAuthConfigured } from "@/lib/admin-auth";
import { LoginForm } from "@/components/admin/LoginForm";

export default function LoginPage() {
  if (!isAdminAuthConfigured()) {
    return (
      <div className="container-edge py-32 max-w-xl">
        <h1 className="font-display text-4xl tracking-display-tight">
          Admin är inte aktiverad
        </h1>
        <p className="mt-4 text-ink/65 leading-relaxed">
          Sätt <code className="font-mono">ADMIN_AUTH_SECRET</code> (random
          string, minst 32 tecken) och <code className="font-mono">RESEND_API_KEY</code>{" "}
          i Vercel-projektet och deploya om. Engångskoden mejlas till{" "}
          <code className="font-mono">ADMIN_OTP_RECIPIENT</code> (default
          info@optimeraenergi.se).
        </p>
      </div>
    );
  }
  if (isAdminAuthed()) {
    redirect("/admin");
  }
  return (
    <div className="container-edge min-h-[80vh] grid place-items-center py-20">
      <LoginForm />
    </div>
  );
}
