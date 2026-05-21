import type {
  AnalyticsComputed,
  AnalyticsInsights,
  CampaignMetricsInput,
  CrmActivitySummary,
  FunnelStageMetric,
} from "./types";

export function emptyCampaignMetrics(): CampaignMetricsInput {
  return {
    views: 0,
    clicks: 0,
    leads: 0,
    appointments: 0,
    applications: 0,
    funded_loans: 0,
    ad_spend: 0,
    estimated_revenue: 0,
  };
}

function safeDivide(numerator: number, denominator: number): number | null {
  if (!denominator || denominator <= 0) return null;
  return numerator / denominator;
}

export function computeAnalyticsMetrics(
  metrics: CampaignMetricsInput,
): AnalyticsComputed {
  const ctr = safeDivide(metrics.clicks, metrics.views);
  const leadConversionRate = safeDivide(metrics.leads, metrics.clicks);
  const costPerLead = safeDivide(metrics.ad_spend, metrics.leads);
  const costPerAppointment = safeDivide(metrics.ad_spend, metrics.appointments);
  const costPerFundedLoan = safeDivide(metrics.ad_spend, metrics.funded_loans);
  const revenuePerLead = safeDivide(metrics.estimated_revenue, metrics.leads);

  let estimatedRoi: number | null = null;
  if (metrics.ad_spend > 0) {
    estimatedRoi =
      ((metrics.estimated_revenue - metrics.ad_spend) / metrics.ad_spend) * 100;
  }

  return {
    clickThroughRate: ctr !== null ? ctr * 100 : 0,
    leadConversionRate: leadConversionRate !== null ? leadConversionRate * 100 : 0,
    costPerLead,
    costPerAppointment,
    costPerFundedLoan,
    estimatedRoi,
    revenuePerLead,
  };
}

export function buildFunnelMetrics(metrics: CampaignMetricsInput): FunnelStageMetric[] {
  const stages: { stage: string; count: number; previous: number | null }[] = [
    { stage: "Views", count: metrics.views, previous: null },
    { stage: "Clicks", count: metrics.clicks, previous: metrics.views },
    { stage: "Leads", count: metrics.leads, previous: metrics.clicks },
    { stage: "Appointments", count: metrics.appointments, previous: metrics.leads },
    {
      stage: "Applications",
      count: metrics.applications,
      previous: metrics.appointments,
    },
    {
      stage: "Funded loans",
      count: metrics.funded_loans,
      previous: metrics.applications,
    },
  ];

  return stages.map(({ stage, count, previous }) => ({
    stage,
    count,
    rateFromPrevious:
      previous && previous > 0 ? (count / previous) * 100 : null,
  }));
}

export function computeCampaignHealthScore(
  metrics: CampaignMetricsInput,
  computed: AnalyticsComputed,
  crmSummary: CrmActivitySummary,
): number {
  let score = 0;

  if (metrics.views >= 100) score += 10;
  else if (metrics.views > 0) score += 5;

  if (computed.clickThroughRate >= 2) score += 15;
  else if (computed.clickThroughRate >= 0.5) score += 8;

  if (metrics.leads >= 5) score += 20;
  else if (metrics.leads >= 1) score += 12;

  if (metrics.appointments >= 2) score += 15;
  else if (metrics.appointments >= 1) score += 8;

  if (metrics.funded_loans >= 1) score += 20;

  if (computed.estimatedRoi !== null && computed.estimatedRoi > 0) score += 15;
  else if (computed.estimatedRoi !== null && computed.estimatedRoi > -25)
    score += 5;

  if (crmSummary.liveLeadsPushed > 0) score += 5;
  if (crmSummary.pushFailures === 0 && crmSummary.testLeadsSent > 0) score += 5;

  return Math.min(100, Math.max(0, score));
}

export function buildDefaultRoiSummary(
  metrics: CampaignMetricsInput,
  computed: AnalyticsComputed,
): string {
  if (metrics.ad_spend <= 0 && metrics.estimated_revenue <= 0) {
    return "Add ad spend and estimated revenue to calculate ROI.";
  }
  if (computed.estimatedRoi === null) {
    return `Spend $${metrics.ad_spend.toLocaleString()} — add revenue to see ROI.`;
  }
  const sign = computed.estimatedRoi >= 0 ? "+" : "";
  return `Estimated ROI ${sign}${computed.estimatedRoi.toFixed(1)}% on $${metrics.ad_spend.toLocaleString()} spend and $${metrics.estimated_revenue.toLocaleString()} projected revenue.`;
}

export function buildAnalyticsInsights(input: {
  metrics: CampaignMetricsInput;
  computed: AnalyticsComputed;
  crmSummary: CrmActivitySummary;
  bestPerformingAssetNotes?: string;
  nextRecommendedAction?: string;
  roiSummary?: string;
}): AnalyticsInsights {
  const funnelMetrics = buildFunnelMetrics(input.metrics);
  const campaignHealthScore = computeCampaignHealthScore(
    input.metrics,
    input.computed,
    input.crmSummary,
  );

  return {
    campaignHealthScore,
    funnelMetrics,
    roiSummary:
      input.roiSummary ?? buildDefaultRoiSummary(input.metrics, input.computed),
    bestPerformingAssetNotes:
      input.bestPerformingAssetNotes ??
      "Run Get recommendations after entering metrics to identify top assets.",
    nextRecommendedAction:
      input.nextRecommendedAction ??
      "Enter campaign metrics, then refresh recommendations.",
  };
}

export function refreshAnalyticsRecord(
  record: {
    metrics: CampaignMetricsInput;
    crmSummary: CrmActivitySummary;
    insights: Pick<
      AnalyticsInsights,
      "bestPerformingAssetNotes" | "nextRecommendedAction" | "roiSummary"
    >;
  },
  preserveAiNotes = true,
): {
  metrics: CampaignMetricsInput;
  computed: AnalyticsComputed;
  crmSummary: CrmActivitySummary;
  insights: AnalyticsInsights;
} {
  const computed = computeAnalyticsMetrics(record.metrics);
  const base = buildAnalyticsInsights({
    metrics: record.metrics,
    computed,
    crmSummary: record.crmSummary,
    bestPerformingAssetNotes: preserveAiNotes
      ? record.insights.bestPerformingAssetNotes
      : undefined,
    nextRecommendedAction: preserveAiNotes
      ? record.insights.nextRecommendedAction
      : undefined,
    roiSummary: preserveAiNotes ? record.insights.roiSummary : undefined,
  });

  return {
    metrics: record.metrics,
    computed,
    crmSummary: record.crmSummary,
    insights: {
      ...base,
      roiSummary: preserveAiNotes && record.insights.roiSummary
        ? record.insights.roiSummary
        : base.roiSummary,
    },
  };
}
