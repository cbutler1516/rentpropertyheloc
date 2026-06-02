import { isAdminTestAuthorized } from "@/lib/leads/admin-auth";
import { buildTestLeadPayload } from "@/lib/leads/build-test-lead";
import { setLastTestLeadResult } from "@/lib/leads/last-test-lead";
import { getLeadPipelineHealth } from "@/lib/leads/pipeline-health";
import { processValidatedLead } from "@/lib/leads/process-lead-submission";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!isAdminTestAuthorized(request)) {
    return NextResponse.json(
      {
        success: false,
        error:
          process.env.NODE_ENV === "production"
            ? "Unauthorized. Set ADMIN_TEST_TOKEN and pass Authorization: Bearer <token> or x-admin-test-token."
            : "Test lead endpoint is disabled.",
      },
      { status: 403 },
    );
  }

  const testLead = buildTestLeadPayload();
  const result = await processValidatedLead(testLead);
  const ranAt = new Date().toISOString();

  if (!result.success) {
    const failure = {
      success: false as const,
      ranAt,
      error: result.error,
      persistenceMode: getLeadPipelineHealth().persistenceMode,
      hubspotConfigured: getLeadPipelineHealth().hubspotConfigured,
      hubspotSynced: false,
      resendConfigured: getLeadPipelineHealth().resendConfigured,
      notificationSent: false,
      notificationError: "Pipeline failed before notification step",
    };
    setLastTestLeadResult(failure);
    return NextResponse.json(failure, { status: result.status });
  }

  const { storedLead, notification } = result;
  const success = {
    success: true as const,
    ranAt,
    leadId: storedLead.id,
    qualityScore: storedLead.qualityScore,
    qualityTier: storedLead.qualityTier,
    recommendedFollowUp: storedLead.recommendedFollowUp,
    keyReasons: storedLead.keyReasons,
    persistenceMode: result.persistenceMode,
    hubspotConfigured: result.hubspotConfigured,
    hubspotSynced: result.hubspotSynced,
    resendConfigured: result.resendConfigured,
    notificationSent: notification.sent,
    notificationRecipients: notification.recipients,
    notificationError: notification.error ?? null,
    testEmail: storedLead.email,
    message: "Synthetic test lead processed through the full pipeline (including notification email).",
  };

  setLastTestLeadResult({
    success: true,
    ranAt,
    leadId: storedLead.id,
    qualityScore: storedLead.qualityScore,
    qualityTier: storedLead.qualityTier,
    recommendedFollowUp: storedLead.recommendedFollowUp,
    persistenceMode: result.persistenceMode,
    hubspotConfigured: result.hubspotConfigured,
    hubspotSynced: result.hubspotSynced,
    resendConfigured: result.resendConfigured,
  });

  return NextResponse.json(success);
}
