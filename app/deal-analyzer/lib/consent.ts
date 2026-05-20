export const SMS_CALL_CONSENT_TEXT =
  "I agree to be contacted by Broadview Lending / The Loan Playbook by call, text, or email about my financing scenario. Message and data rates may apply. Consent is not required to obtain financing.";

export type LeadConsentRecord = {
  smsCallConsent: boolean;
  consentText: string | null;
  consentTimestamp: string | null;
  consentIp: string | null;
  consentUserAgent: string | null;
};

export function buildConsentRecord(input: {
  smsCallConsent: boolean;
  consentIp?: string | null;
  consentUserAgent?: string | null;
  at?: Date;
}): LeadConsentRecord {
  if (!input.smsCallConsent) {
    return {
      smsCallConsent: false,
      consentText: null,
      consentTimestamp: null,
      consentIp: null,
      consentUserAgent: null,
    };
  }

  return {
    smsCallConsent: true,
    consentText: SMS_CALL_CONSENT_TEXT,
    consentTimestamp: (input.at ?? new Date()).toISOString(),
    consentIp: input.consentIp ?? null,
    consentUserAgent: input.consentUserAgent ?? null,
  };
}
