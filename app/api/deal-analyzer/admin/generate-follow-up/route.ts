import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/deal-analyzer/lib/admin/auth";
import { insertDealAnalyzerEvent } from "@/app/deal-analyzer/lib/supabase/events";
import { generateAndSaveFollowUp } from "@/app/deal-analyzer/lib/supabase/follow-ups";

type PostBody = {
  reportId: string;
};

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: PostBody;
  try {
    body = (await request.json()) as PostBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.reportId?.trim()) {
    return NextResponse.json({ error: "reportId is required." }, { status: 400 });
  }

  const result = await generateAndSaveFollowUp(body.reportId);

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  void insertDealAnalyzerEvent({
    eventName: "follow_up_generated",
    reportId: result.followUp.reportId,
    leadId: result.followUp.leadId,
    metadata: { source: result.source },
  });

  return NextResponse.json({
    followUp: {
      id: result.followUp.id,
      reportId: result.followUp.reportId,
      leadId: result.followUp.leadId,
      textMessage: result.followUp.textMessage,
      emailSubject: result.followUp.emailSubject,
      emailBody: result.followUp.emailBody,
      agentPartnerMessage: result.followUp.agentPartnerMessage,
      callNotes: result.followUp.callNotes,
      priorityReason: result.followUp.priorityReason,
      recommendedTiming: result.followUp.recommendedTiming,
      status: result.followUp.status,
      lastContactedAt: result.followUp.lastContactedAt,
      nextFollowUpAt: result.followUp.nextFollowUpAt,
      updatedAt: result.followUp.updatedAt,
    },
    source: result.source,
  });
}
