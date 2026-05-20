import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/app/deal-analyzer/lib/supabase/env";
import { fetchReportFromSupabase } from "@/app/deal-analyzer/lib/supabase/save-report";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;

  if (!slug?.trim()) {
    return NextResponse.json({ error: "Missing report slug." }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 503 },
    );
  }

  const result = await fetchReportFromSupabase(slug);

  if ("error" in result) {
    const status = result.error === "Report not found." ? 404 : 500;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({
    slug: result.slug,
    createdAt: result.createdAt,
    lead: result.lead,
    inputs: result.inputs,
    analysis: result.analysis,
    narrative: result.narrative,
    referralSource: result.referralSource,
    agentName: result.agentName,
  });
}
