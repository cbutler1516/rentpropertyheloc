import type { ConversionEventName, ConversionEventPayload } from "@/lib/analytics/event-types";
import { normalizeEventPayload } from "@/lib/analytics/payload";
import { enrichRetargetingParams } from "@/lib/analytics/retargeting";
import { recordAnalyticsSessionEvent } from "@/lib/analytics/session-tracker";
import { getTrackingConfig } from "@/lib/analytics/tracking-config";
import { trackLeadSubmitConversion } from "@/lib/google-ads";

function sanitizeParams(
  params?: ConversionEventPayload,
): Record<string, string | number | boolean> | undefined {
  if (!params) return undefined;

  const cleaned: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      cleaned[key] = value;
    }
  }

  return Object.keys(cleaned).length > 0 ? cleaned : undefined;
}

function logDevEvent(name: ConversionEventName, params?: ConversionEventPayload) {
  if (process.env.NODE_ENV === "development") {
    console.debug(`[analytics] ${name}`, params ?? {});
  }
}

function trackGa4Event(
  name: ConversionEventName,
  params: Record<string, string | number | boolean> | undefined,
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", name, params);
}

function trackGa4PageView(
  path: string,
  extra?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const config = getTrackingConfig();
  if (!config.ga4MeasurementId) return;

  const pageParams = { page_path: path, pagePath: path, ...extra };
  window.gtag("event", "page_view", pageParams);
  window.gtag("config", config.ga4MeasurementId, { page_path: path });
}

function trackMetaEvent(
  name: ConversionEventName,
  params: Record<string, string | number | boolean> | undefined,
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  const standard = META_STANDARD_EVENTS[name];
  if (standard) {
    window.fbq("track", standard, params);
    return;
  }

  window.fbq("trackCustom", name, params);
}

function trackMetaPageView() {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", "PageView");
}

const META_STANDARD_EVENTS: Partial<Record<ConversionEventName, string>> = {
  page_view: "PageView",
  funnel_started: "ViewContent",
  contact_step_viewed: "ViewContent",
  calculator_interacted: "ViewContent",
  calculator_viewed: "ViewContent",
  seo_page_viewed: "ViewContent",
  cta_clicked: "ViewContent",
  lead_submitted: "Lead",
  fast_track_lead: "Lead",
};

function trackClarityEvent(name: ConversionEventName) {
  if (typeof window === "undefined" || typeof window.clarity !== "function") return;

  try {
    window.clarity("event", name);
  } catch {
    // Clarity not ready — fail silently
  }
}

/**
 * Sends an analytics event to all configured client-side providers.
 * Safe to call without env vars or before scripts load.
 * Each logical action fires exactly one event name (no alias duplicates).
 */
export function dispatchAnalyticsEvent(
  name: ConversionEventName,
  params?: ConversionEventPayload,
): void {
  if (typeof window === "undefined") return;

  const merged = enrichRetargetingParams(name, normalizeEventPayload(params));
  const cleaned = sanitizeParams(merged);

  logDevEvent(name, merged);

  try {
    recordAnalyticsSessionEvent(name);
    const config = getTrackingConfig();

    if (config.ga4MeasurementId) {
      trackGa4Event(name, cleaned);
    }

    if (config.metaPixelId) {
      trackMetaEvent(name, cleaned);
    }

    if (name === "lead_submitted") {
      trackLeadSubmitConversion(cleaned);
    }

    if (config.clarityProjectId) {
      trackClarityEvent(name);
    }
  } catch {
    // Never break UX for analytics failures
  }
}

export function dispatchPageView(path: string, params?: ConversionEventPayload): void {
  const merged = normalizeEventPayload({ ...params, pagePath: path, page_path: path });
  const cleaned = sanitizeParams(merged);

  logDevEvent("page_view", merged);

  try {
    recordAnalyticsSessionEvent("page_view");

    const config = getTrackingConfig();

    if (config.ga4MeasurementId) {
      trackGa4PageView(path, cleaned);
    }

    if (config.metaPixelId) {
      trackMetaPageView();
    }

    if (config.clarityProjectId) {
      trackClarityEvent("page_view");
    }
  } catch {
    // Never break UX for analytics failures
  }
}
