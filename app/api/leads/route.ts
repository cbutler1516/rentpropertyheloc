import { NextResponse } from "next/server";
import type { LeadFunnelData } from "@/lib/lead-funnel";

/** Placeholder API route — wire Supabase, Resend, CRM webhook here. */
export async function POST(request: Request) {
  const data = (await request.json()) as LeadFunnelData;

  if (process.env.NODE_ENV === "development") {
    console.debug("[api/leads]", data);
  }

  return NextResponse.json({
    ok: true,
    message: "Lead endpoint ready for integration.",
  });
}
