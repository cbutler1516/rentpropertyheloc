import { getDealAnalyzerReportBySlug } from "@/lib/deal-analyzer/storage";
import { NextResponse } from "next/server";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  if (!slug?.trim()) {
    return NextResponse.json({ success: false, error: "Slug required." }, { status: 400 });
  }

  const full = await getDealAnalyzerReportBySlug(slug.trim());
  if (!full) {
    return NextResponse.json({ success: false, error: "Report not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true, report: full });
}
