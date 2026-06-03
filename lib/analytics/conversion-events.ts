import { dispatchAnalyticsEvent, dispatchPageView } from "@/lib/analytics/dispatch-event";
import { trackEvent, trackEventOnce, trackRoutingTierLead } from "@/lib/analytics/analytics";
import type { ConversionEventPayload } from "@/lib/analytics/event-types";
import { normalizeEventPayload } from "@/lib/analytics/payload";
import type { RoutingTier } from "@/lib/leads/types";

export type { ConversionEventName, ConversionEventPayload } from "@/lib/analytics/event-types";

export function trackPageView(payload?: ConversionEventPayload) {
  const path =
    typeof payload?.pagePath === "string"
      ? payload.pagePath
      : typeof payload?.page_path === "string"
        ? payload.page_path
        : typeof window !== "undefined"
          ? window.location.pathname
          : "/";

  dispatchPageView(path, payload);
}

export function trackLeadFormStarted(payload?: ConversionEventPayload) {
  trackFunnelStarted(payload);
}

export function trackFunnelStarted(payload?: ConversionEventPayload) {
  const normalized = normalizeEventPayload(payload);
  const dedupeKey = `funnel_started_${normalized?.journey ?? normalized?.source ?? "default"}`;
  trackEventOnce(dedupeKey, "funnel_started", normalized);
}

export function trackLeadStepCompleted(
  step: number,
  stepId: string,
  payload?: ConversionEventPayload,
) {
  dispatchAnalyticsEvent(
    "funnel_step_completed",
    normalizeEventPayload({ step, stepId, ...payload }),
  );
}

export function trackContactStepViewed(payload?: ConversionEventPayload) {
  trackEventOnce("contact_step_viewed", "contact_step_viewed", normalizeEventPayload(payload));
}

export function trackLeadFormSubmitted(payload?: ConversionEventPayload) {
  trackLeadSubmitted(payload);
}

export function trackLeadSubmitted(payload?: ConversionEventPayload) {
  dispatchAnalyticsEvent("lead_submitted", normalizeEventPayload(payload));
}

export function trackLeadSubmittedWithRouting(
  routingTier: RoutingTier | undefined,
  payload?: ConversionEventPayload,
) {
  trackLeadSubmitted({ ...payload, routingTier });
  if (routingTier) {
    trackRoutingTierLead(routingTier, payload);
  }
}

export function trackCalculatorViewed(payload?: ConversionEventPayload) {
  trackEventOnce("calculator_viewed", "calculator_viewed", normalizeEventPayload(payload));
}

export function trackCalculatorUsed(payload?: ConversionEventPayload) {
  trackCalculatorInteracted(payload);
}

export function trackCalculatorInteracted(payload?: ConversionEventPayload) {
  dispatchAnalyticsEvent("calculator_interacted", normalizeEventPayload(payload));
}

export function trackVideoPlayed(payload?: ConversionEventPayload) {
  dispatchAnalyticsEvent("video_played", normalizeEventPayload(payload));
}

export function trackSegmentedJourneySelected(payload?: ConversionEventPayload) {
  dispatchAnalyticsEvent("segmented_journey_selected", normalizeEventPayload(payload));
}

export function trackDashboardHandoff(payload?: ConversionEventPayload) {
  dispatchAnalyticsEvent("dashboard_handoff", normalizeEventPayload(payload));
}

export function trackAddressStepViewed(payload?: ConversionEventPayload) {
  dispatchAnalyticsEvent("address_step_viewed", normalizeEventPayload(payload));
}

export function trackAddressAutocompleteUsed(payload?: ConversionEventPayload) {
  dispatchAnalyticsEvent("address_autocomplete_used", normalizeEventPayload(payload));
}

export function trackAddressSubmitted(payload?: ConversionEventPayload) {
  trackAddressCompleted(payload);
}

export function trackAddressCompleted(payload?: ConversionEventPayload) {
  dispatchAnalyticsEvent("address_completed", normalizeEventPayload(payload));
}

export function trackAddressSkipped(payload?: ConversionEventPayload) {
  dispatchAnalyticsEvent("address_skipped", normalizeEventPayload(payload));
}

export function trackEnrichmentFieldSaved(payload?: ConversionEventPayload) {
  dispatchAnalyticsEvent("enrichment_field_saved", normalizeEventPayload(payload));
}

export function trackEnrichmentCompleted(payload?: ConversionEventPayload) {
  dispatchAnalyticsEvent("enrichment_completed", normalizeEventPayload(payload));
}

export function trackSeoPageViewed(payload?: ConversionEventPayload) {
  const normalized = normalizeEventPayload(payload);
  const path = normalized?.pagePath ?? "/";
  trackEventOnce(`seo_page_viewed_${path}`, "seo_page_viewed", normalized);
}

export function trackCtaClicked(payload?: ConversionEventPayload) {
  dispatchAnalyticsEvent("cta_clicked", normalizeEventPayload(payload));
}

export function trackPartialLeadStarted(payload?: ConversionEventPayload) {
  trackEventOnce(
    `partial_started_${payload?.sessionId ?? "default"}`,
    "partial_lead_started",
    normalizeEventPayload(payload),
  );
}

export function trackPartialLeadUpdated(payload?: ConversionEventPayload) {
  dispatchAnalyticsEvent("partial_lead_updated", normalizeEventPayload(payload));
}

export function trackPartialLeadAbandoned(payload?: ConversionEventPayload) {
  dispatchAnalyticsEvent("partial_lead_abandoned", normalizeEventPayload(payload));
}

export function trackAnalyticsTest(payload?: ConversionEventPayload) {
  dispatchAnalyticsEvent(
    "analytics_test",
    normalizeEventPayload({ test: true, source: "admin_health_check", ...payload }),
  );
}
