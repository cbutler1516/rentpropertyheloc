import type { LeadFunnelData } from "@/lib/leads/types";

export type ConsentFieldKey = "consent";

export type ConsentFieldErrors = Partial<Record<ConsentFieldKey, string>>;

export type ConsentTouchedFields = Partial<Record<ConsentFieldKey, boolean>>;

export function getConsentFieldErrors(data: LeadFunnelData): ConsentFieldErrors {
  const errors: ConsentFieldErrors = {};

  if (!data.tcpaConsent) {
    errors.consent = "Please check the box to agree to be contacted about your inquiry.";
  }

  return errors;
}

export function getVisibleConsentFieldError(
  field: ConsentFieldKey,
  errors: ConsentFieldErrors,
  touched: ConsentTouchedFields,
  submitAttempted: boolean,
): string | undefined {
  const message = errors[field];
  if (!message) return undefined;
  if (submitAttempted || touched[field]) return message;
  return undefined;
}

export function hasConsentFieldErrors(errors: ConsentFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
