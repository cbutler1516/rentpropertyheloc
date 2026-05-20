import { NextResponse } from "next/server";
import { isCrmProvider } from "@/app/content-engine/lib/crm-providers";
import { appendActivityLog } from "@/app/content-engine/lib/crm-integration-defaults";
import { sanitizeCrmIntegrationForClient } from "@/app/content-engine/lib/crm-integration-parse";
import { pushLeadToCrm } from "@/app/content-engine/lib/crm-push";
import type {
  CrmIntegrationRecord,
  CrmTestLeadPayload,
} from "@/app/content-engine/lib/types";

function isValidLead(lead: unknown): lead is CrmTestLeadPayload {
  if (!lead || typeof lead !== "object") return false;
  const r = lead as Record<string, unknown>;
  return typeof r.email === "string" && r.email.includes("@");
}

export async function POST(request: Request) {
  let body: {
    packageId?: string;
    provider?: string;
    lead?: CrmTestLeadPayload;
    integration?: CrmIntegrationRecord;
    relatedEntryId?: string;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.packageId?.trim() || !body.integration || !isValidLead(body.lead)) {
    return NextResponse.json(
      { error: "packageId, integration, and lead required." },
      { status: 400 },
    );
  }

  const provider =
    body.provider && isCrmProvider(body.provider)
      ? body.provider
      : body.integration.activeProvider;

  const integration = sanitizeCrmIntegrationForClient(body.integration);
  const result = await pushLeadToCrm({
    packageId: body.packageId.trim(),
    provider,
    integration,
    lead: body.lead,
    testMode: false,
  });

  let log = appendActivityLog(integration.activityLog, {
    type: "retry",
    provider,
    message: `Retry: ${result.message}`,
    success: result.success,
    leadEmail: body.lead.email,
    retryable: !result.success,
    relatedEntryId: body.relatedEntryId,
  });

  if (!result.success) {
    log = appendActivityLog(log, {
      type: "error",
      provider,
      message: result.message,
      success: false,
      leadEmail: body.lead.email,
      retryable: true,
      relatedEntryId: body.relatedEntryId,
    });
  }

  return NextResponse.json({
    success: result.success,
    mode: result.mode,
    message: result.message,
    activityLog: log,
  });
}
