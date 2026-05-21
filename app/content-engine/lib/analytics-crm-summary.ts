import type { CrmActivitySummary, CrmIntegrationRecord } from "./types";

export function summarizeCrmActivity(
  crmIntegration?: CrmIntegrationRecord | null,
): CrmActivitySummary {
  if (!crmIntegration?.activityLog?.length) {
    return {
      testLeadsSent: 0,
      liveLeadsPushed: 0,
      pushFailures: 0,
      lastActivityAt: null,
    };
  }

  let testLeadsSent = 0;
  let liveLeadsPushed = 0;
  let pushFailures = 0;
  let lastActivityAt: string | null = null;

  for (const entry of crmIntegration.activityLog) {
    if (!lastActivityAt || entry.at > lastActivityAt) {
      lastActivityAt = entry.at;
    }

    if (entry.type === "error" || (!entry.success && entry.type !== "retry")) {
      pushFailures += 1;
      continue;
    }

    if (entry.type === "lead_pushed" && entry.success) {
      if (entry.message.toLowerCase().includes("demo")) {
        testLeadsSent += 1;
      } else {
        liveLeadsPushed += 1;
      }
    }

    if (entry.type === "workflow_triggered" && entry.success) {
      liveLeadsPushed += 1;
    }
  }

  return {
    testLeadsSent,
    liveLeadsPushed,
    pushFailures,
    lastActivityAt,
  };
}
