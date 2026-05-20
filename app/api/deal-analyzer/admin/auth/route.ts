import { NextResponse } from "next/server";
import {
  clearAdminSessionCookie,
  isAdminPasswordConfigured,
  setAdminSessionCookie,
  verifyAdminPassword,
} from "@/app/deal-analyzer/lib/admin/auth";

export async function POST(request: Request) {
  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Admin access is not configured on this environment." },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!verifyAdminPassword(body.password ?? "")) {
    return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  }

  await setAdminSessionCookie();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearAdminSessionCookie();
  return NextResponse.json({ ok: true });
}
