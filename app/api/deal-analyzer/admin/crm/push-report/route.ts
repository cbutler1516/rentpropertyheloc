import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/deal-analyzer/lib/admin/auth";
import { pushDealAnalyzerReportToCrm } from "@/app/deal-analyzer/lib/crm/push-report";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { reportId?: string };
  try {
    body = (await request.json()) as { reportId?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.reportId?.trim()) {
    return NextResponse.json({ error: "reportId is required." }, { status: 400 });
  }

  const result = await pushDealAnalyzerReportToCrm({
    reportId: body.reportId.trim(),
    event: "manual_push",
  });

  if (!result.success) {
    return NextResponse.json(result, { status: 502 });
  }

  return NextResponse.json(result);
}
