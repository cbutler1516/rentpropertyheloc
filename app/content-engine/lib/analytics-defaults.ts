import { summarizeCrmActivity } from "./analytics-crm-summary";
import {
  buildAnalyticsInsights,
  computeAnalyticsMetrics,
  emptyCampaignMetrics,
} from "./analytics-compute";
import type {
  AnalyticsRecord,
  ContentPackage,
  CrmIntegrationRecord,
} from "./types";

export function createDefaultAnalytics(input?: {
  crmIntegration?: CrmIntegrationRecord | null;
  packageContext?: Pick<
    ContentPackage,
    "landingPage" | "leadCapture" | "leadMagnet" | "calendar" | "launchHub"
  >;
}): AnalyticsRecord {
  const metrics = emptyCampaignMetrics();
  const computed = computeAnalyticsMetrics(metrics);
  const crmSummary = summarizeCrmActivity(input?.crmIntegration);

  const assets: string[] = [];
  if (input?.packageContext?.landingPage) assets.push("landing page");
  if (input?.packageContext?.leadCapture) assets.push("lead capture form");
  if (input?.packageContext?.leadMagnet) assets.push("lead magnet");
  if (input?.packageContext?.calendar) assets.push("content calendar");
  if (input?.packageContext?.launchHub) assets.push("launch hub");

  const assetNote =
    assets.length > 0
      ? `Active assets: ${assets.join(", ")}. Enter metrics to rank performance.`
      : "Build launch assets, then track views through funded loans.";

  const insights = buildAnalyticsInsights({
    metrics,
    computed,
    crmSummary,
    bestPerformingAssetNotes: assetNote,
    nextRecommendedAction:
      "Enter views, clicks, and spend — then run Get recommendations.",
  });

  return {
    metrics,
    computed,
    crmSummary,
    insights,
    updatedAt: new Date().toISOString(),
    modelUsed: "demo",
  };
}
