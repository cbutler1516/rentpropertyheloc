import type { AnalyticsInsights } from "./types";

export function parseAnalyticsRecommendPayload(
  raw: unknown,
): Pick<
  AnalyticsInsights,
  "bestPerformingAssetNotes" | "nextRecommendedAction" | "roiSummary"
> | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (
    typeof r.bestPerformingAssetNotes !== "string" ||
    typeof r.nextRecommendedAction !== "string" ||
    typeof r.roiSummary !== "string"
  ) {
    return null;
  }
  return {
    bestPerformingAssetNotes: r.bestPerformingAssetNotes.trim(),
    nextRecommendedAction: r.nextRecommendedAction.trim(),
    roiSummary: r.roiSummary.trim(),
  };
}
