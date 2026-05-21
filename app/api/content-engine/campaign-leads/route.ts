import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/app/deal-analyzer/lib/supabase/env";
import { submitCampaignLead } from "@/app/content-engine/lib/submit-campaign-lead";
import type {
  CampaignLeadPayload,
  CampaignUtmParams,
} from "@/app/content-engine/lib/types";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Lead capture requires Supabase." },
      { status: 503 },
    );
  }

  let body: {
    slug?: string;
    lead?: CampaignLeadPayload;
    utm?: CampaignUtmParams;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.slug?.trim() || !body.lead) {
    return NextResponse.json(
      { error: "slug and lead are required." },
      { status: 400 },
    );
  }

  const result = await submitCampaignLead({
    slug: body.slug.trim(),
    lead: body.lead,
    utm: body.utm ?? {},
  });

  if (!result.success) {
    return NextResponse.json(
      { error: result.error ?? "Submission failed." },
      { status: 400 },
    );
  }

  return NextResponse.json({
    success: true,
    leadId: result.leadId,
    crmPushStatus: result.crmPushStatus,
    crmPushMessage: result.crmPushMessage,
  });
}
