import { NextResponse } from "next/server";
import { buildTestLeadPayload } from "@/app/content-engine/lib/crm-test-lead";
import type { CrmIntegrationRecord } from "@/app/content-engine/lib/types";

/** Returns a safe test payload; actual push uses push-lead with testMode. */
export async function POST(request: Request) {
  let body: { integration?: CrmIntegrationRecord };
  try {
    body = (await request.json()) as { integration?: CrmIntegrationRecord };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  return NextResponse.json({
    lead: buildTestLeadPayload(),
    integration: body.integration ?? null,
  });
}
