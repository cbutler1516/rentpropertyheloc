/** Google Ads conversion ID — sitewide base tag (Rent Property HELOC). */
export const GOOGLE_ADS_ID = "AW-17913746238";

/** Replace REPLACE_WITH_CONVERSION_LABEL with your Google Ads conversion action label. */
export const GOOGLE_ADS_LEAD_CONVERSION_SEND_TO =
  "AW-17913746238/REPLACE_WITH_CONVERSION_LABEL";

const CONVERSION_PLACEHOLDER = "REPLACE_WITH_CONVERSION_LABEL";

export function isGoogleAdsLeadConversionConfigured(sendTo: string): boolean {
  return Boolean(sendTo && !sendTo.includes(CONVERSION_PLACEHOLDER));
}

/**
 * Resolves lead conversion send_to from env (label or full send_to) or the placeholder constant.
 * Returns null when not configured.
 */
export function getGoogleAdsLeadConversionSendTo(): string | null {
  const envValue = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL?.trim();
  if (envValue) {
    if (envValue.includes(CONVERSION_PLACEHOLDER)) return null;
    const sendTo = envValue.includes("/") ? envValue : `${GOOGLE_ADS_ID}/${envValue}`;
    return isGoogleAdsLeadConversionConfigured(sendTo) ? sendTo : null;
  }

  return isGoogleAdsLeadConversionConfigured(GOOGLE_ADS_LEAD_CONVERSION_SEND_TO)
    ? GOOGLE_ADS_LEAD_CONVERSION_SEND_TO
    : null;
}

/**
 * Fire a Google Ads conversion event.
 * @param sendTo Full send_to value, e.g. `AW-17913746238/CONVERSION_LABEL`
 */
export function trackGoogleAdsConversion(sendTo: string): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (!isGoogleAdsLeadConversionConfigured(sendTo)) return;

  window.gtag("event", "conversion", { send_to: sendTo });
}

/**
 * Fire Google Ads lead conversion + lead_submit after successful funnel submission only.
 * No-ops when conversion label is still the placeholder.
 */
export function trackLeadSubmitConversion(
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const sendTo = getGoogleAdsLeadConversionSendTo();
  if (!sendTo) return;

  window.gtag("event", "conversion", { send_to: sendTo, ...params });
  window.gtag("event", "lead_submit", params);
}
