import { processEnrichmentAutosave } from "@/lib/leads/enrichment-autosave";
import { parseEnrichmentFieldUpdate } from "@/lib/leads/enrichment-fields";
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

  const { updates, updatedField, markStarted } = parseEnrichmentFieldUpdate(body);

  const result = await processEnrichmentAutosave({
    leadId,
    updates,
    updatedField,
    markStarted,
  });

  if (!result.success) {
    return NextResponse.json({ success: false, error: result.error }, { status: result.status });
  }

  return NextResponse.json({
    success: true,
    enrichmentStatus: result.enrichmentStatus,
    profileStrength: result.profileStrength,
    enrichmentComplete: result.enrichmentComplete,
    qualityScore: result.qualityScore,
    qualityTier: result.qualityTier,
    salesQualityTier: result.salesQualityTier,
    updatedField: result.updatedField,
    snapshot: result.snapshot,
    fullEnrichmentPayload: result.enrichmentPayload,
    enrichmentLastUpdatedAt: result.enrichmentLastUpdatedAt,
  });
}
