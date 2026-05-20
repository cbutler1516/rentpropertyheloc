export const LEAD_STATUSES = [
  "New",
  "Followed Up",
  "Contacted",
  "Appointment Set",
  "Not Ready",
  "Archived",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const FOLLOW_UP_STATUSES = ["draft", "active", "completed"] as const;

export type FollowUpStatus = (typeof FOLLOW_UP_STATUSES)[number];

export type GeneratedFollowUp = {
  textMessage: string;
  emailSubject: string;
  emailBody: string;
  agentPartnerMessage: string;
  callNotes: string[];
  priorityReason: string;
  recommendedTiming: string;
};

export type DealAnalyzerFollowUpRecord = GeneratedFollowUp & {
  id: string;
  reportId: string;
  leadId: string;
  scenarioId: string;
  status: FollowUpStatus;
  lastContactedAt: string | null;
  nextFollowUpAt: string | null;
  createdAt: string;
  updatedAt: string;
};
