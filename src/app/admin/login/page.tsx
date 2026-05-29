import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin-auth";
import { LoginForm } from "@/components/admin/LoginForm";

export default function LoginPage() {
  if (!process.env.ADMIN_PASSWORD) {
    return (
      <div className="container-edge py-32 max-w-xl">
        <h1 className="font-display text-4xl tracking-display-tight">
          Admin är inte aktiverad
        </h1>
        <p className="mt-4 text-ink/65 leading-relaxed">
          Sätt <code className="font-mono">ADMIN_PASSWORD</code> i miljön i
          Vercel-projektet och deploya om.
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
