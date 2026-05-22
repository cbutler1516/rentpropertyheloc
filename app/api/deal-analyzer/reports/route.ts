import { NextResponse } from "next/server";
import { buildConsentRecord } from "@/app/deal-analyzer/lib/consent";
import {
  getClientIpFromHeaders,
  getUserAgentFromHeaders,
} from "@/app/deal-analyzer/lib/request-meta";
import { isCrmAutoPushEnabled } from "@/app/deal-analyzer/lib/crm/env";
import type { DealAnalyzerUtm } from "@/app/deal-analyzer/lib/analytics/types";
import { pushDealAnalyzerReportAfterCreate } from "@/app/deal-analyzer/lib/crm/push-report";
import { insertDealAnalyzerEvent } from "@/app/deal-analyzer/lib/supabase/events";
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
  sessionId?: string | null;
  utm?: DealAnalyzerUtm | null;
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
    sessionId: body.sessionId ?? null,
    utm: body.utm ?? null,
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  const eventBase = {
    sessionId: body.sessionId ?? null,
    leadId: result.leadId,
    reportId: result.reportId,
    agentId: body.agentId ?? null,
    referralCode: body.referralCode ?? null,
    dealType: body.inputs.path,
    pagePath: "/deal-analyzer/analyze",
  };

  void insertDealAnalyzerEvent({
    ...eventBase,
    eventName: "lead_submitted",
  });
  void insertDealAnalyzerEvent({
    ...eventBase,
    eventName: "report_generated",
  });

  if (isCrmAutoPushEnabled()) {
    void pushDealAnalyzerReportAfterCreate(result.reportId);
  }

  return NextResponse.json({
    slug: result.slug,
    reportId: result.reportId,
    leadId: result.leadId,
  });
}
