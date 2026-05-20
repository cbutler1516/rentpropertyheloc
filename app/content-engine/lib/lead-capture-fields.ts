import type { LeadCaptureFieldConfig, LeadCaptureFieldKey } from "./types";
import type { LeadCapturePreset } from "./lead-capture-presets";

export const LEAD_CAPTURE_FIELD_META: Record<
  LeadCaptureFieldKey,
  { defaultLabel: string; defaultPlaceholder: string }
> = {
  firstName: { defaultLabel: "First name", defaultPlaceholder: "Jordan" },
  lastName: { defaultLabel: "Last name", defaultPlaceholder: "Smith" },
  email: { defaultLabel: "Email", defaultPlaceholder: "you@email.com" },
  phone: { defaultLabel: "Phone", defaultPlaceholder: "(555) 555-5555" },
  buyerTimeline: {
    defaultLabel: "Buyer timeline",
    defaultPlaceholder: "0–3 months / 3–6 / 6–12 / researching",
  },
  loanTypeInterest: {
    defaultLabel: "Loan type interest",
    defaultPlaceholder: "Purchase / Refinance / HELOC / Other",
  },
  purchasePriceOrLoanAmount: {
    defaultLabel: "Purchase price / loan amount",
    defaultPlaceholder: "$450,000 or $380,000 loan",
  },
  creditRange: {
    defaultLabel: "Credit range",
    defaultPlaceholder: "740+ / 700–739 / 660–699 / below 660",
  },
  agentStatus: {
    defaultLabel: "Agent status",
    defaultPlaceholder: "Have an agent / need a referral / not applicable",
  },
  notes: {
    defaultLabel: "Notes",
    defaultPlaceholder: "Anything we should know before your review?",
  },
  smsCallConsent: {
    defaultLabel: "SMS / call consent",
    defaultPlaceholder: "Checkbox",
  },
  emailOptIn: {
    defaultLabel: "Email opt-in",
    defaultPlaceholder: "Checkbox",
  },
};

const PRESET_FIELD_RULES: Record<
  LeadCapturePreset,
  Partial<
    Record<LeadCaptureFieldKey, { enabled?: boolean; required?: boolean }>
  >
> = {
  "buyer-lead": {
    buyerTimeline: { enabled: true, required: true },
    loanTypeInterest: { enabled: true, required: true },
    purchasePriceOrLoanAmount: { enabled: true, required: true },
    creditRange: { enabled: true, required: false },
    agentStatus: { enabled: true, required: false },
  },
  "refinance-lead": {
    buyerTimeline: { enabled: true, required: true },
    loanTypeInterest: { enabled: true, required: true },
    purchasePriceOrLoanAmount: { enabled: true, required: true },
    creditRange: { enabled: true, required: false },
    agentStatus: { enabled: false, required: false },
  },
  "agent-partner": {
    buyerTimeline: { enabled: false, required: false },
    loanTypeInterest: { enabled: false, required: false },
    purchasePriceOrLoanAmount: { enabled: false, required: false },
    creditRange: { enabled: false, required: false },
    agentStatus: { enabled: true, required: true },
    notes: { enabled: true, required: true },
  },
  "commercial-borrower": {
    loanTypeInterest: { enabled: true, required: true },
    purchasePriceOrLoanAmount: { enabled: true, required: true },
    creditRange: { enabled: true, required: false },
    agentStatus: { enabled: true, required: false },
  },
  "jumbo-borrower": {
    purchasePriceOrLoanAmount: { enabled: true, required: true },
    creditRange: { enabled: true, required: true },
    loanTypeInterest: { enabled: true, required: true },
  },
  "first-time-buyer": {
    buyerTimeline: { enabled: true, required: true },
    purchasePriceOrLoanAmount: { enabled: true, required: false },
    creditRange: { enabled: true, required: false },
    agentStatus: { enabled: true, required: false },
  },
  "seller-concession-lead": {
    buyerTimeline: { enabled: true, required: true },
    loanTypeInterest: { enabled: true, required: true },
    purchasePriceOrLoanAmount: { enabled: true, required: true },
  },
  "market-update-subscriber": {
    buyerTimeline: { enabled: false, required: false },
    loanTypeInterest: { enabled: false, required: false },
    purchasePriceOrLoanAmount: { enabled: false, required: false },
    creditRange: { enabled: false, required: false },
    agentStatus: { enabled: false, required: false },
    notes: { enabled: false, required: false },
  },
};

export function defaultFieldConfigs(
  preset: LeadCapturePreset,
): Record<LeadCaptureFieldKey, LeadCaptureFieldConfig> {
  const rules = PRESET_FIELD_RULES[preset];
  const allKeys = Object.keys(LEAD_CAPTURE_FIELD_META) as LeadCaptureFieldKey[];

  return allKeys.reduce(
    (acc, key) => {
      const meta = LEAD_CAPTURE_FIELD_META[key];
      const rule = rules[key];
      const isConsent = key === "smsCallConsent" || key === "emailOptIn";
      acc[key] = {
        label: meta.defaultLabel,
        placeholder: meta.defaultPlaceholder,
        enabled: rule?.enabled ?? (isConsent ? true : key !== "notes"),
        required:
          rule?.required ??
          (key === "firstName" ||
            key === "lastName" ||
            key === "email" ||
            key === "phone"),
      };
      return acc;
    },
    {} as Record<LeadCaptureFieldKey, LeadCaptureFieldConfig>,
  );
}
