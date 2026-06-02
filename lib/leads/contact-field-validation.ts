import { isValidPhone } from "@/lib/leads/validation";
import type { LeadFunnelData } from "@/lib/leads/types";

export type ContactFieldKey = "firstName" | "lastName" | "email" | "phone" | "consent";

export type ContactFieldErrors = Partial<Record<ContactFieldKey, string>>;

export type ContactTouchedFields = Partial<Record<ContactFieldKey, boolean>>;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function getContactFieldErrors(data: LeadFunnelData): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = "Enter your first name.";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Enter your last name.";
  }

  if (!data.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Enter your phone number.";
  } else if (!isValidPhone(data.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!data.tcpaConsent) {
    errors.consent = "Please check the box to agree to be contacted about your inquiry.";
  }

  return errors;
}

export function getContactSubmitBlockReason(data: LeadFunnelData): string | null {
  const errors = getContactFieldErrors(data);
  const first = errors.firstName ?? errors.lastName ?? errors.email ?? errors.phone ?? errors.consent;
  return first ?? null;
}

export function getVisibleContactFieldError(
  field: ContactFieldKey,
  errors: ContactFieldErrors,
  touched: ContactTouchedFields,
  submitAttempted: boolean,
): string | undefined {
  const message = errors[field];
  if (!message) return undefined;
  if (submitAttempted || touched[field]) return message;
  return undefined;
}

export function hasContactFieldErrors(errors: ContactFieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
