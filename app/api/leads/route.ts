import { processLeadSubmission } from "@/lib/leads/process-lead-submission";
import { extractLeadSubmissionContext } from "@/lib/leads/submission-context";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const sourceUrl =
    body && typeof body === "object" && typeof (body as Record<string, unknown>).sourceUrl === "string"
      ? ((body as Record<string, unknown>).sourceUrl as string)
      : undefined;

  const context = extractLeadSubmissionContext(request, sourceUrl);
  console.log("[leads] POST /api/leads received");
  const result = await processLeadSubmission(body, context);

  if (!result.success) {
    return NextResponse.json({ success: false, error: result.error }, { status: result.status });
  }

  return NextResponse.json({
    success: true,
    id: result.storedLead.id,
    submissionId: result.submissionId,
    routingTier: result.storedLead.routingTier,
  });
}
