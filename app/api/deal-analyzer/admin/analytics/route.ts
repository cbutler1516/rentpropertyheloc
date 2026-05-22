import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/deal-analyzer/lib/admin/auth";
import { fetchDealAnalyzerAnalytics } from "@/app/deal-analyzer/lib/supabase/events";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const daysRaw = searchParams.get("days");
  const days = daysRaw ? Math.min(90, Math.max(7, Number(daysRaw) || 30)) : 30;

  const analytics = await fetchDealAnalyzerAnalytics(days);
  return NextResponse.json(analytics);
}
