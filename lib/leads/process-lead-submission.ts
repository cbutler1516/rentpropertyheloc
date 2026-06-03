import { syncLeadToHubSpotDetailed } from "@/lib/crm/hubspot";
import { SUBMIT_ERROR_MESSAGE } from "@/lib/leads/constants";
import { notifyLeadReceived, type NotificationResult } from "@/lib/leads/notify-lead-received";
import { notifyZapierLeadWebhook, type ZapierWebhookResult } from "@/lib/leads/notify-zapier-webhook";
import {
  getPersistenceMode,
  isHubSpotConfigured,
  isResendConfigured,
  isZapierWebhookConfigured,
} from "@/lib/leads/pipeline-health";
import { applyLeadQualification } from "@/lib/leads/score-lead";
import {
  leadSubmissionToStoredLead,
  saveLeadSubmission,
  updateLeadSubmissionHubSpotSync,
} from "@/lib/leads/save-lead-submission";
import type { LeadSubmissionContext } from "@/lib/leads/submission-context";
import type { LeadCreateRequest, StoredLead } from "@/lib/leads/types";
import { validateLeadCreateRequest } from "@/lib/leads/validation";

export type ProcessLeadSuccess = {
  success: true;
  storedLead: StoredLead;
  submissionId: string;
  persistenceMode: ReturnType<typeof getPersistenceMode>;
  hubspotConfigured: boolean;
  hubspotSynced: boolean;
  hubspotSyncStatus: "pending" | "synced" | "failed" | "skipped";
  resendConfigured: boolean;
  notification: NotificationResult;
  zapierConfigured: boolean;
  zapierWebhook: ZapierWebhookResult;
};

export type ProcessLeadFailure = {
  success: false;
  error: string;
  status: 400 | 500;
};

export type ProcessLeadResult = ProcessLeadSuccess | ProcessLeadFailure;

export async function processLeadSubmission(
  body: unknown,
  context: LeadSubmissionContext = {},
): Promise<ProcessLeadResult> {
  const validation = validateLeadCreateRequest(body);
  if (!validation.valid) {
    return { success: false, error: validation.error, status: 400 };
  }

  return processValidatedLead(validation.data, context);
}

export async function processValidatedLead(
  lead: LeadCreateRequest,
  context: LeadSubmissionContext = {},
): Promise<ProcessLeadResult> {
  try {
    const scoredLead = applyLeadQualification(lead);

    const submission = await saveLeadSubmission(scoredLead, context);
    const storedLead = leadSubmissionToStoredLead(submission, scoredLead);

    const hubspotConfigured = isHubSpotConfigured();
    let hubspotSynced = false;
    let hubspotSyncStatus: ProcessLeadSuccess["hubspotSyncStatus"] = "skipped";

    if (hubspotConfigured) {
      const hubspotResult = await syncLeadToHubSpotDetailed(storedLead);
      hubspotSynced = hubspotResult.success;
      hubspotSyncStatus = hubspotResult.success ? "synced" : "failed";

      await updateLeadSubmissionHubSpotSync(submission.id, {
        status: hubspotSyncStatus,
        contactId: hubspotResult.contactId,
        error: hubspotResult.error,
      });
    } else {
      await updateLeadSubmissionHubSpotSync(submission.id, {
        status: "skipped",
        error: "HubSpot not configured",
      });
    }

    let notification: NotificationResult;
    try {
      notification = await notifyLeadReceived(storedLead);
    } catch (notifyError) {
      console.error("[leads] notification failed unexpectedly", notifyError);
      notification = {
        sent: false,
        recipients: [],
        fromAddress: "",
        error: notifyError instanceof Error ? notifyError.message : "Unknown error",
      };
    }

    let zapierWebhook: ZapierWebhookResult = { sent: false, skipped: true };
    try {
      console.log("[leads/zapier] invoking webhook handler", {
        leadId: storedLead.id,
        submissionId: submission.submissionId,
        configured: isZapierWebhookConfigured(),
      });
      zapierWebhook = await notifyZapierLeadWebhook(storedLead, submission.submissionId);
    } catch (zapierError) {
      console.error("[leads] zapier webhook failed unexpectedly", zapierError);
      zapierWebhook = {
        sent: false,
        error: zapierError instanceof Error ? zapierError.message : "Unknown error",
      };
    }

    return {
      success: true,
      storedLead,
      submissionId: submission.submissionId,
      persistenceMode: getPersistenceMode(),
      hubspotConfigured,
      hubspotSynced,
      hubspotSyncStatus,
      resendConfigured: isResendConfigured(),
      notification,
      zapierConfigured: isZapierWebhookConfigured(),
      zapierWebhook,
    };
  } catch (error) {
    console.error("[leads] pipeline failed", error);
    return { success: false, error: SUBMIT_ERROR_MESSAGE, status: 500 };
  }
}
