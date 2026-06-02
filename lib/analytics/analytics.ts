import { dispatchAnalyticsEvent } from "@/lib/analytics/dispatch-event";
import type { ConversionEventName, ConversionEventPayload } from "@/lib/analytics/event-types";

const firedOnceKeys = new Set<string>();

/**
 * Client-only analytics helper. Safe to import from client components.
 * No-ops during SSR when window is undefined (handled in dispatch).
 */
export function trackEvent(name: ConversionEventName, params?: ConversionEventPayload): void {
  dispatchAnalyticsEvent(name, params);
}

/** Fire an event at most once per page session (e.g. funnel_started, calculator_viewed). */
export function trackEventOnce(
  dedupeKey: string,
  name: ConversionEventName,
  params?: ConversionEventPayload,
): void {
  if (typeof window === "undefined") return;
  if (firedOnceKeys.has(dedupeKey)) return;
  firedOnceKeys.add(dedupeKey);
  dispatchAnalyticsEvent(name, params);
}

export function trackRoutingTierLead(
  tier: "fast_track" | "standard" | "review" | "nurture",
  params?: ConversionEventPayload,
): void {
  if (tier === "fast_track") {
    trackEvent("fast_track_lead", params);
  } else if (tier === "review") {
    trackEvent("review_lead", params);
  } else if (tier === "nurture") {
    trackEvent("nurture_lead", params);
  }
}
