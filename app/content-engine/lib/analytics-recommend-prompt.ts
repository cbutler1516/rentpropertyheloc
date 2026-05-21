import type { AnalyticsRecommendRequest } from "./types";

export function buildAnalyticsRecommendSystemPrompt(): string {
  return `You are a mortgage marketing analytics strategist. Given campaign metrics and asset flags, return JSON only:
{
  "bestPerformingAssetNotes": "2-4 sentences on which asset (landing, lead capture, lead magnet, calendar, launch hub) is performing best and why",
  "nextRecommendedAction": "1-2 sentences, specific next step for the loan officer marketing team",
  "roiSummary": "1 sentence ROI interpretation using their numbers"
}
Be direct, use their metrics, no hype.`;
}

export function buildAnalyticsRecommendUserPrompt(
  input: AnalyticsRecommendRequest,
): string {
  const a = input.analytics;
  return [
    `Campaign: ${input.title}`,
    `Topic: ${input.topic}`,
    `Audience: ${input.audience ?? "general"}`,
    "",
    "Manual metrics:",
    `views=${a.metrics.views}, clicks=${a.metrics.clicks}, leads=${a.metrics.leads}`,
    `appointments=${a.metrics.appointments}, applications=${a.metrics.applications}`,
    `funded_loans=${a.metrics.funded_loans}, ad_spend=${a.metrics.ad_spend}`,
    `estimated_revenue=${a.metrics.estimated_revenue}`,
    "",
    "Computed:",
    `CTR=${a.computed.clickThroughRate.toFixed(2)}%`,
    `lead_conv=${a.computed.leadConversionRate.toFixed(2)}%`,
    `CPL=${a.computed.costPerLead ?? "n/a"}`,
    `ROI=${a.computed.estimatedRoi ?? "n/a"}%`,
    `health_score=${a.insights.campaignHealthScore}`,
    "",
    "CRM activity:",
    `test_leads=${a.crmSummary.testLeadsSent}`,
    `live_pushed=${a.crmSummary.liveLeadsPushed}`,
    `failures=${a.crmSummary.pushFailures}`,
    "",
    "Assets:",
    `landing=${input.hasLandingPage}`,
    `lead_capture=${input.hasLeadCapture}`,
    `lead_magnet=${input.hasLeadMagnet}`,
    `calendar=${input.hasCalendar}`,
    `launch_hub=${input.hasLaunchHub}`,
    `crm_hub=${input.hasCrmHub}`,
  ].join("\n");
}
