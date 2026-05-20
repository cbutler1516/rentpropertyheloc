import { NextResponse } from "next/server";
import { resolveReportNarrative } from "@/app/deal-analyzer/lib/generate-narrative";
import type { DealAnalysisResult, DealInputs } from "@/app/deal-analyzer/lib/types";

type PostBody = {
  dealType: string;
  leadRole: string;
  leadName?: string;
  referralSource?: string;
  agentName?: string;
  partnerAgentName?: string;
  notes?: string;
  inputs: DealInputs;
  analysis: DealAnalysisResult;
};

export async function POST(request: Request) {
  let body: PostBody;
  try {
    body = (await request.json()) as PostBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.inputs || !body.analysis || !body.dealType || !body.leadRole) {
    return NextResponse.json(
      { error: "Missing required fields for narrative generation." },
      { status: 400 },
    );
  }

  const narrative = await resolveReportNarrative({
    dealType: body.dealType,
    leadRole: body.leadRole,
    leadName: body.leadName,
    referralSource: body.referralSource,
    agentName: body.agentName,
    partnerAgentName: body.partnerAgentName,
    notes: body.notes,
    inputs: body.inputs,
    analysis: body.analysis,
  });

  return NextResponse.json({
    narrative,
    source: narrative.source ?? "static",
  });
}
