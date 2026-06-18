/** Google Ads conversion ID — sitewide base tag (The Loan Playbook). */
export const GOOGLE_ADS_ID = "AW-17913746238";

/**
 * Fire a Google Ads conversion event.
 * @param sendTo Full send_to value, e.g. `AW-17913746238/CONVERSION_LABEL`
 */
export function trackGoogleAdsConversion(sendTo: string): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", "conversion", { send_to: sendTo });
}
