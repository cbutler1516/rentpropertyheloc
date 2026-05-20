import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/deal-analyzer/lib/admin/auth";
import { fetchFollowUpByReportId } from "@/app/deal-analyzer/lib/supabase/follow-ups";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const reportId = new URL(request.url).searchParams.get("reportId");
  if (!reportId) {
    return NextResponse.json({ error: "reportId is required." }, { status: 400 });
  }

  const result = await fetchFollowUpByReportId(reportId);

  if (result && "error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ followUp: result });
}
