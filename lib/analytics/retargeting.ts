import type { ConversionEventName, ConversionEventPayload } from "@/lib/analytics/event-types";

/**
 * Audience labels for Meta / Google Ads custom audiences.
 * Map these event parameters in ad platforms — no ads are fired from this module.
 */
export const RETARGETING_AUDIENCES = {
  funnel_started_no_submit: {
    label: "Started funnel but no submit",
    triggerEvents: ["funnel_started", "partial_lead_abandoned"] as const,
    description:
      "User began the options review or saved partial progress without a full lead submission.",
  },
  calculator_interaction_only: {
    label: "Calculator interaction only",
    triggerEvents: ["calculator_interacted", "calculator_viewed"] as const,
    description: "Engaged with the equity estimator without submitting a lead (pair with absence of lead_submitted).",
  },
  lead_submitted: {
    label: "Submitted lead",
    triggerEvents: ["lead_submitted"] as const,
    description: "Completed the contact step and submitted the lead form.",
  },
  enrichment_completed: {
    label: "Completed enrichment",
    triggerEvents: ["enrichment_completed"] as const,
    description: "Submitted optional post-lead portfolio / timeline answers.",
  },
  fast_track_lead: {
    label: "Fast-track lead",
    triggerEvents: ["fast_track_lead"] as const,
    description: "High-priority routing tier on submit.",
  },
} as const;

export type RetargetingAudienceKey = keyof typeof RETARGETING_AUDIENCES;

const EVENT_AUDIENCE_MAP: Partial<Record<ConversionEventName, RetargetingAudienceKey>> = {
  funnel_started: "funnel_started_no_submit",
  partial_lead_abandoned: "funnel_started_no_submit",
  partial_lead_started: "funnel_started_no_submit",
  calculator_viewed: "calculator_interaction_only",
  calculator_interacted: "calculator_interaction_only",
  lead_submitted: "lead_submitted",
  enrichment_completed: "enrichment_completed",
  fast_track_lead: "fast_track_lead",
};

export function getRetargetingAudienceForEvent(
  name: ConversionEventName,
): RetargetingAudienceKey | undefined {
  return EVENT_AUDIENCE_MAP[name];
}

export function enrichRetargetingParams(
  name: ConversionEventName,
  params?: ConversionEventPayload,
): ConversionEventPayload | undefined {
  const audience = getRetargetingAudienceForEvent(name);
  if (!audience) return params;

  return {
    ...params,
    audience_segment: audience,
    audience_label: RETARGETING_AUDIENCES[audience].label,
  };
}
