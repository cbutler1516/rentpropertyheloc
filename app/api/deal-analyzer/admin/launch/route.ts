import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/deal-analyzer/lib/admin/auth";
import { runDealAnalyzerLaunchReadiness } from "@/app/deal-analyzer/lib/admin/launch-readiness";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const report = await runDealAnalyzerLaunchReadiness();
    return NextResponse.json(report);
  } catch (err) {
    console.error("Deal Analyzer launch readiness error", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Launch readiness check failed.",
      },
      { status: 500 },
    );
  }
}
