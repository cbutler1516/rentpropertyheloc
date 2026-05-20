import { NextResponse } from "next/server";
import { buildConsentRecord } from "@/app/deal-analyzer/lib/consent";
import {
  getClientIpFromHeaders,
  getUserAgentFromHeaders,
} from "@/app/deal-analyzer/lib/request-meta";
import { isSupabaseConfigured } from "@/app/deal-analyzer/lib/supabase/env";
import { saveReportToSupabase } from "@/app/deal-analyzer/lib/supabase/save-report";
import type {
  DealAnalysisResult,
  DealInputs,
  LeadCapture,
} from "@/app/deal-analyzer/lib/types";
import type { PlaybookNarrative } from "@/app/deal-analyzer/lib/narrative-types";

type PostBody = {
  slug: string;
  lead: LeadCapture;
  inputs: DealInputs;
  analysis: DealAnalysisResult;
  narrative: PlaybookNarrative;
  agentId?: string | null;
  referralCode?: string | null;
};

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 503 },
    );
  }

  let body: PostBody;
  try {
    body = (await request.json()) as PostBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.slug || !body.lead?.email || !body.inputs || !body.analysis) {
    return NextResponse.json(
      { error: "Missing required report fields." },
      { status: 400 },
    );
  }

  if (!body.lead.smsCallConsent) {
    return NextResponse.json(
      { error: "SMS/call consent is required to unlock the report." },
      { status: 400 },
    );
  }

  const consent = buildConsentRecord({
    smsCallConsent: true,
    consentIp: getClientIpFromHeaders(request.headers),
    consentUserAgent: getUserAgentFromHeaders(request.headers),
  });

  const result = await saveReportToSupabase({
    slug: body.slug,
    lead: body.lead,
    inputs: body.inputs,
    analysis: body.analysis,
    narrative: body.narrative,
    consent,
    agentId: body.agentId ?? null,
    referralCode: body.referralCode ?? null,
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ slug: result.slug });
}
