import { enrichLeadSubmission } from "@/lib/leads/enrich-lead";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const leadId = typeof body.leadId === "string" ? body.leadId.trim() : "";
  if (!leadId) {
    return NextResponse.json({ success: false, error: "leadId is required." }, { status: 400 });
  }

  const result = await enrichLeadSubmission(leadId, {
    propertyType: typeof body.propertyType === "string" ? body.propertyType : undefined,
    propertyValueRange:
      typeof body.propertyValueRange === "string" ? body.propertyValueRange : undefined,
    mortgageBalanceRange:
      typeof body.mortgageBalanceRange === "string" ? body.mortgageBalanceRange : undefined,
    creditScoreRange:
      typeof body.creditScoreRange === "string" ? body.creditScoreRange : undefined,
    propertyCount: typeof body.propertyCount === "string" ? body.propertyCount : undefined,
    fundingTimeline: typeof body.fundingTimeline === "string" ? body.fundingTimeline : undefined,
  });

  if (!result.success) {
    return NextResponse.json({ success: false, error: result.error }, { status: result.status });
  }

  return NextResponse.json({
    success: true,
    routingTier: result.routingTier,
    routingConfidence: result.routingConfidence,
    qualityScore: result.qualityScore,
    qualityTier: result.qualityTier,
  });
}
