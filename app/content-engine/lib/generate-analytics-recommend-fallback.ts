import type {
  AnalyticsInsights,
  AnalyticsRecord,
  AnalyticsRecommendRequest,
} from "./types";

export function generateDemoAnalyticsRecommend(
  input: AnalyticsRecommendRequest,
): Pick<
  AnalyticsInsights,
  "bestPerformingAssetNotes" | "nextRecommendedAction" | "roiSummary"
> {
  const { metrics, computed, crmSummary, insights } = input.analytics;
  const assets: string[] = [];
  if (input.hasLandingPage) assets.push("landing page");
  if (input.hasLeadCapture) assets.push("lead capture");
  if (input.hasLeadMagnet) assets.push("lead magnet");
  if (input.hasCalendar) assets.push("7-day calendar");
  if (input.hasLaunchHub) assets.push("launch hub");

  let bestAsset = assets[0] ?? "content pack";
  if (metrics.leads > 0 && input.hasLeadCapture) {
    bestAsset = "lead capture form";
  } else if (metrics.clicks > metrics.views * 0.02 && input.hasLandingPage) {
    bestAsset = "landing page";
  } else if (input.hasLeadMagnet && metrics.clicks > 0) {
    bestAsset = "lead magnet";
  }

  const bestPerformingAssetNotes = [
    `Top asset for ${input.title}: ${bestAsset}.`,
    assets.length > 1
      ? `Supporting assets live: ${assets.join(", ")}.`
      : null,
    computed.clickThroughRate > 0
      ? `CTR ${computed.clickThroughRate.toFixed(2)}% — ${
          computed.clickThroughRate >= 2
            ? "strong top-of-funnel engagement"
            : "room to improve hooks and CTAs"
        }.`
      : null,
    crmSummary.liveLeadsPushed > 0
      ? `${crmSummary.liveLeadsPushed} live CRM push(es) logged.`
      : crmSummary.testLeadsSent > 0
        ? `${crmSummary.testLeadsSent} test lead(s) in CRM — connect live push when ready.`
        : null,
  ]
    .filter(Boolean)
    .join(" ");

  let nextRecommendedAction =
    "Enter views and clicks, then refresh recommendations.";
  if (metrics.views === 0) {
    nextRecommendedAction =
      "Launch traffic to the landing page and log views to start attribution.";
  } else if (metrics.leads === 0 && metrics.clicks > 0) {
    nextRecommendedAction =
      "Tighten lead capture above the fold and retest form fields — clicks without leads signal friction.";
  } else if (metrics.appointments === 0 && metrics.leads > 0) {
    nextRecommendedAction =
      "Trigger day-1 CRM follow-up and book discovery calls — leads need speed-to-contact.";
  } else if (metrics.funded_loans === 0 && metrics.applications > 0) {
    nextRecommendedAction =
      "Focus loan officer nurture on in-process applications; pipeline is warm.";
  } else if (
    computed.estimatedRoi !== null &&
    computed.estimatedRoi < 0 &&
    metrics.ad_spend > 0
  ) {
    nextRecommendedAction =
      "Pause underperforming ad sets, reallocate spend to best CTR asset, and retest creative.";
  } else if (crmSummary.pushFailures > 0) {
    nextRecommendedAction =
      "Fix CRM push errors in CRM hub before scaling paid traffic.";
  } else if (insights.campaignHealthScore >= 70) {
    nextRecommendedAction =
      "Scale winning creative — duplicate landing + lead capture into a second audience test.";
  } else {
    nextRecommendedAction =
      "A/B test headline on landing page and add social proof block to lift click-to-lead rate.";
  }

  const roiSummary =
    computed.estimatedRoi !== null
      ? `Campaign ROI ${computed.estimatedRoi >= 0 ? "+" : ""}${computed.estimatedRoi.toFixed(1)}% on $${metrics.ad_spend.toLocaleString()} spend — ${
          computed.estimatedRoi >= 50
            ? "efficient acquisition for mortgage campaigns"
            : computed.estimatedRoi >= 0
              ? "profitable but optimize CPL before scaling"
              : "negative ROI — cut spend or improve lead quality"
        }.`
      : insights.roiSummary;

  return {
    bestPerformingAssetNotes,
    nextRecommendedAction,
    roiSummary,
  };
}
