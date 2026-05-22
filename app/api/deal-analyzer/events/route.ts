import { NextResponse } from "next/server";
import { isDealAnalyzerEventName } from "@/app/deal-analyzer/lib/analytics/event-names";
import { insertDealAnalyzerEvent } from "@/app/deal-analyzer/lib/supabase/events";
import { isSupabaseConfigured } from "@/app/deal-analyzer/lib/supabase/env";

type PostBody = {
  eventName: string;
  sessionId?: string | null;
  leadId?: string | null;
  reportId?: string | null;
  agentId?: string | null;
  referralCode?: string | null;
  dealType?: string | null;
  pagePath?: string | null;
  metadata?: Record<string, string | number | boolean | null>;
};

function sanitizeMetadata(
  raw: PostBody["metadata"],
): Record<string, string | number | boolean | null> {
  if (!raw || typeof raw !== "object") return {};
  const out: Record<string, string | number | boolean | null> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (key.length > 64) continue;
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      value === null
    ) {
      if (typeof value === "string" && value.length > 500) continue;
      out[key] = value;
    }
  }
  return out;
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  let body: PostBody;
  try {
    body = (await request.json()) as PostBody;
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  if (!body.eventName || !isDealAnalyzerEventName(body.eventName)) {
    return NextResponse.json({ error: "Invalid event name." }, { status: 400 });
  }

  const sessionId =
    typeof body.sessionId === "string" && body.sessionId.length <= 64
      ? body.sessionId
      : null;

  const result = await insertDealAnalyzerEvent({
    eventName: body.eventName,
    sessionId,
    leadId: body.leadId ?? null,
    reportId: body.reportId ?? null,
    agentId: body.agentId ?? null,
    referralCode: body.referralCode ?? null,
    dealType: body.dealType ?? null,
    pagePath: body.pagePath ?? null,
    metadata: sanitizeMetadata(body.metadata),
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
