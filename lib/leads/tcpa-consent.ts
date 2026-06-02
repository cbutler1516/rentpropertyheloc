/**
 * TCPA consent copy variants for the check-options funnel.
 * Have compliance review before changing ACTIVE_TCPA_CONSENT_VARIANT.
 *
 * Switch variant: set ACTIVE_TCPA_CONSENT_VARIANT to the desired id.
 */

export type TcpaConsentVariantId = "minimal" | "plain-brand" | "short-with-detail";

export type TcpaConsentVariant = {
  id: TcpaConsentVariantId;
  label: string;
  /** Checkbox label — keep concise for mobile */
  text: string;
  /** Optional expandable fine print (privacy-policy-aligned) */
  detail?: string;
};

export const TCPA_CONSENT_VARIANTS: Record<TcpaConsentVariantId, TcpaConsentVariant> = {
  minimal: {
    id: "minimal",
    label: "Minimal",
    text: "I agree to receive calls, texts, and emails about my inquiry. Consent isn't required for service. Msg/data rates may apply. Opt out anytime.",
  },
  "plain-brand": {
    id: "plain-brand",
    label: "Plain language + brand",
    text: "I agree RentPropertyHELOC.com and its partners may call, text, and email me about my HELOC inquiry. Consent isn't required to get service. Msg/data rates may apply.",
    detail:
      "You agree we and our lending or marketing partners may contact you at the number and email provided using automated or manual technology regarding financing options. Reply STOP to opt out of texts where applicable.",
  },
  "short-with-detail": {
    id: "short-with-detail",
    label: "Short label + expandable detail",
    text: "I agree to be contacted about my financing options.",
    detail:
      "By submitting this form, you agree that Rent Property LLC and its lending partners may contact you by phone call, text message, or email regarding your financing request and available financing options. Consent is not required as a condition of obtaining financing. Message and data rates may apply. Message frequency may vary.",
  },
};

/** Change this after compliance selects a variant. */
export const ACTIVE_TCPA_CONSENT_VARIANT: TcpaConsentVariantId = "short-with-detail";

export const TCPA_CONSENT_VARIANT = TCPA_CONSENT_VARIANTS[ACTIVE_TCPA_CONSENT_VARIANT];

export const TCPA_CONSENT_TEXT = TCPA_CONSENT_VARIANT.text;

export const TCPA_CONSENT_DETAIL = TCPA_CONSENT_VARIANT.detail;
