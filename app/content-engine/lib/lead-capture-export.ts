import { getLeadCapturePreset } from "./lead-capture-presets";
import { CRM_SEQUENCE_LABELS } from "./lead-capture-labels";
import { CRM_SEQUENCE_KEYS, type LeadCaptureFieldKey, type LeadCaptureRecord } from "./types";

export function leadCaptureToEmbedFormCopy(record: LeadCaptureRecord): string {
  const preset = getLeadCapturePreset(record.preset);
  const lines = [
    `LEAD FORM — ${preset.label.toUpperCase()}`,
    "=".repeat(48),
    "",
    "Fields (embed-ready):",
    "",
  ];

  for (const [key, config] of Object.entries(record.fields) as [
    LeadCaptureFieldKey,
    (typeof record.fields)[LeadCaptureFieldKey],
  ][]) {
    if (!config.enabled) continue;
    if (key === "smsCallConsent" || key === "emailOptIn") {
      lines.push(
        `[ ] ${config.label}${config.required ? " (required)" : ""}`,
        key === "smsCallConsent"
          ? record.consent.smsCallConsentCopy
          : record.consent.emailOptInCopy,
        "",
      );
      continue;
    }
    lines.push(
      `${config.label}${config.required ? " *" : ""}`,
      `Placeholder: ${config.placeholder}`,
      "",
    );
  }

  lines.push("Submit button:", "Request my strategy review", "");
  return lines.join("\n");
}

export function leadCaptureToCrmSequence(record: LeadCaptureRecord): string {
  const lines = [
    "CRM FOLLOW-UP SEQUENCE — THE LOAN PLAYBOOK",
    "=".repeat(48),
    "",
  ];

  for (const key of CRM_SEQUENCE_KEYS) {
    const label = CRM_SEQUENCE_LABELS[key];
    lines.push(label.toUpperCase(), "-".repeat(40), "", record.crmSequence[key], "", "");
  }

  return lines.join("\n");
}

export function leadCaptureToFollowUpPlan(record: LeadCaptureRecord): string {
  return [
    leadCaptureToCrmSequence(record),
    "",
    "CONSENT LANGUAGE",
    "-".repeat(48),
    "",
    "SMS / Call:",
    record.consent.smsCallConsentCopy,
    "",
    "Email opt-in:",
    record.consent.emailOptInCopy,
  ].join("\n");
}

export function leadCaptureToCrmFieldMap(record: LeadCaptureRecord): string {
  const preset = getLeadCapturePreset(record.preset);
  const lines = [
    "GOHIGHLEVEL / RAD CRM FIELD MAP",
    "=".repeat(48),
    `Preset: ${preset.label}`,
    "",
    "Standard fields:",
    "first_name → firstName",
    "last_name → lastName",
    "email → email",
    "phone → phone",
    "",
    "Custom fields:",
  ];

  const customMap: Partial<Record<LeadCaptureFieldKey, string>> = {
    buyerTimeline: "buyer_timeline",
    loanTypeInterest: "loan_type_interest",
    purchasePriceOrLoanAmount: "purchase_price_or_loan_amount",
    creditRange: "credit_range",
    agentStatus: "agent_status",
    notes: "lead_notes",
  };

  for (const [key, ghlField] of Object.entries(customMap)) {
    const config = record.fields[key as LeadCaptureFieldKey];
    if (!config?.enabled) continue;
    lines.push(`${ghlField} → ${config.label}`);
  }

  lines.push(
    "",
    "Tags:",
    `lead_capture_preset:${record.preset}`,
    record.preset === "agent-partner" ? "pipeline:agent_partner" : "pipeline:borrower",
    "",
    "Workflow triggers:",
    "Form submit → instantText + instantEmail",
    "Day 1 → day1FollowUp",
    "Day 3 → day3FollowUp",
    "Day 7 → day7FollowUp",
    "Day 14 → day14Nurture",
    "agent_status contains agent → agentReferralAlert",
  );

  return lines.join("\n");
}
