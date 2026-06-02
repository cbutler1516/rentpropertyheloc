import type { ConversionEventPayload } from "@/lib/analytics/event-types";

/** Normalize common metadata fields for GA4 / Meta custom parameters. */
export function normalizeEventPayload(
  params?: ConversionEventPayload,
): ConversionEventPayload | undefined {
  if (!params) {
    if (typeof window === "undefined") return undefined;
    return { pagePath: window.location.pathname };
  }

  const pagePath =
    (typeof params.pagePath === "string" && params.pagePath) ||
    (typeof params.page_path === "string" && params.page_path) ||
    (typeof window !== "undefined" ? window.location.pathname : undefined);

  const normalized: ConversionEventPayload = { ...params };

  if (pagePath) {
    normalized.pagePath = pagePath;
    normalized.page_path = pagePath;
  }

  if (params.propertyType !== undefined) {
    normalized.property_type = String(params.propertyType);
  }

  if (params.equityStrategy !== undefined) {
    normalized.equity_strategy = String(params.equityStrategy);
  }

  if (params.routingTier !== undefined) {
    normalized.routing_tier = String(params.routingTier);
  }

  if (params.estimatedFundsRange !== undefined) {
    normalized.estimated_funds_range = String(params.estimatedFundsRange);
  }

  return normalized;
}
