import type { GeneratedFollowUp } from "./follow-up-types";

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

export function parseGeneratedFollowUp(raw: unknown): GeneratedFollowUp | null {
  if (!raw || typeof raw !== "object") return null;

  const obj = raw as Record<string, unknown>;
  const textMessage = asString(obj.textMessage);
  const emailSubject = asString(obj.emailSubject);
  const emailBody = asString(obj.emailBody);

  if (!textMessage && !emailBody) return null;

  return {
    textMessage,
    emailSubject: emailSubject || "Your Playbook Report — next steps",
    emailBody,
    agentPartnerMessage: asString(obj.agentPartnerMessage),
    callNotes: asStringArray(obj.callNotes),
    priorityReason: asString(
      obj.priorityReason,
      "Fresh Playbook Report — good moment to connect while context is top of mind.",
    ),
    recommendedTiming: asString(obj.recommendedTiming, "Within 24–48 hours"),
  };
}
