import { NextResponse } from "next/server";
import { isCrmProvider } from "@/app/content-engine/lib/crm-providers";
import { appendActivityLog } from "@/app/content-engine/lib/crm-integration-defaults";
import { sanitizeCrmIntegrationForClient } from "@/app/content-engine/lib/crm-integration-parse";
import { pushLeadToCrm } from "@/app/content-engine/lib/crm-push";
import type {
  CrmIntegrationRecord,
  CrmPushLeadRequest,
  CrmTestLeadPayload,
} from "@/app/content-engine/lib/types";

function isValidLead(lead: unknown): lead is CrmTestLeadPayload {
  if (!lead || typeof lead !== "object") return false;
  const r = lead as Record<string, unknown>;
  return (
    typeof r.email === "string" &&
    r.email.includes("@") &&
    typeof r.firstName === "string" &&
    typeof r.lastName === "string"
  );
}

export async function POST(request: Request) {
  let body: CrmPushLeadRequest & { integration?: CrmIntegrationRecord };
  try {
    body = (await request.json()) as CrmPushLeadRequest & {
      integration?: CrmIntegrationRecord;
    };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.packageId?.trim()) {
    return NextResponse.json({ error: "packageId is required." }, { status: 400 });
  }
  if (!isValidLead(body.lead)) {
    return NextResponse.json(
      { error: "Valid lead with email, firstName, lastName required." },
      { status: 400 },
    );
  }
  if (!body.integration) {
    return NextResponse.json({ error: "integration config required." }, { status: 400 });
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
    testMode: body.testMode === true,
  });

  let log = appendActivityLog(integration.activityLog, {
    type: result.success ? "lead_pushed" : "error",
    provider,
    message: result.message,
    success: result.success,
    leadEmail: body.lead.email,
    retryable: !result.success,
  });

  if (result.workflowTriggered && result.success) {
    log = appendActivityLog(log, {
      type: "workflow_triggered",
      provider,
      message: `Workflow/campaign triggered for ${body.lead.email}.`,
      success: true,
      leadEmail: body.lead.email,
    });
  }

  return NextResponse.json({
    success: result.success,
    mode: result.mode,
    message: result.message,
    activityLog: log,
  });
}
