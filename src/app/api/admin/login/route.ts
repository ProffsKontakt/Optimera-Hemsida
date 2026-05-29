import { NextResponse } from "next/server";
import { adminCookieOptions } from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD är inte satt i miljön." },
      { status: 503 },
    );
  }
  const { password } = (await req.json().catch(() => ({}))) as {
    password?: string;
  };
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Fel lösenord." }, { status: 401 });
  }
  const opts = adminCookieOptions();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(opts.name, password, opts);
  return res;
}

export async function DELETE() {
  const opts = adminCookieOptions();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(opts.name, "", { ...opts, maxAge: 0 });
  return res;
}
