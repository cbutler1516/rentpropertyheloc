export const SUBMIT_ERROR_MESSAGE =
  "Something went wrong submitting your review. Please try again.";

export const LEAD_SOURCE = "check-options-funnel" as const;

export const UTM_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export const LEAD_NUMERIC_LIMITS = {
  propertyValue: { min: 1_000, max: 50_000_000 },
  mortgageBalance: { min: 0, max: 50_000_000 },
  desiredFunds: { min: 1, max: 50_000_000 },
} as const;

export {
  ACTIVE_TCPA_CONSENT_VARIANT,
  TCPA_CONSENT_DETAIL,
  TCPA_CONSENT_TEXT,
  TCPA_CONSENT_VARIANT,
  TCPA_CONSENT_VARIANTS,
} from "@/lib/leads/tcpa-consent";

export const FUNNEL_SUBMIT_LABEL = "Submit My Review";
