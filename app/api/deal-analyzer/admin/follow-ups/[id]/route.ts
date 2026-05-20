import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/deal-analyzer/lib/admin/auth";
import type { FollowUpStatus, LeadStatus } from "@/app/deal-analyzer/lib/follow-up-types";
import { updateFollowUpWorkflow } from "@/app/deal-analyzer/lib/supabase/follow-ups";

type RouteContext = { params: Promise<{ id: string }> };

type PatchBody = {
  leadId: string;
  textMessage?: string;
  emailSubject?: string;
  emailBody?: string;
  agentPartnerMessage?: string;
  callNotes?: string[];
  priorityReason?: string;
  recommendedTiming?: string;
  status?: FollowUpStatus;
  leadStatus?: LeadStatus;
  lastContactedAt?: string | null;
  nextFollowUpAt?: string | null;
};

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;

  let body: PatchBody;
  try {
    body = (await request.json()) as PatchBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.leadId) {
    return NextResponse.json({ error: "leadId is required." }, { status: 400 });
  }

  const followUp: PatchBody = body;
  const result = await updateFollowUpWorkflow({
    followUpId: id,
    leadId: body.leadId,
    followUp: {
      ...(followUp.textMessage !== undefined
        ? { textMessage: followUp.textMessage }
        : {}),
      ...(followUp.emailSubject !== undefined
        ? { emailSubject: followUp.emailSubject }
        : {}),
      ...(followUp.emailBody !== undefined ? { emailBody: followUp.emailBody } : {}),
      ...(followUp.agentPartnerMessage !== undefined
        ? { agentPartnerMessage: followUp.agentPartnerMessage }
        : {}),
      ...(followUp.callNotes !== undefined ? { callNotes: followUp.callNotes } : {}),
      ...(followUp.priorityReason !== undefined
        ? { priorityReason: followUp.priorityReason }
        : {}),
      ...(followUp.recommendedTiming !== undefined
        ? { recommendedTiming: followUp.recommendedTiming }
        : {}),
    },
    status: body.status,
    leadStatus: body.leadStatus,
    lastContactedAt: body.lastContactedAt,
    nextFollowUpAt: body.nextFollowUpAt,
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ followUp: result.followUp });
}
