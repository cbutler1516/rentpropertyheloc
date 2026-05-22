import { NextResponse } from "next/server";
import { runQaHealthReport } from "@/app/content-engine/lib/admin/qa-checks";

export async function GET() {
  try {
    const report = await runQaHealthReport();
    return NextResponse.json(report);
  } catch (err) {
    console.error("QA health check error", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Health check failed." },
      { status: 500 },
    );
  }
}
