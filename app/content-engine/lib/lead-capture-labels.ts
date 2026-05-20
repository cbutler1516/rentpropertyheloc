import type { CrmSequenceKey } from "./types";

export const CRM_SEQUENCE_LABELS: Record<CrmSequenceKey, string> = {
  instantText: "Instant text",
  instantEmail: "Instant email",
  day1FollowUp: "Day 1 follow-up",
  day3FollowUp: "Day 3 follow-up",
  day7FollowUp: "Day 7 follow-up",
  day14Nurture: "Day 14 nurture",
  agentReferralAlert: "Agent referral alert",
  internalTaskList: "Internal task list",
};
