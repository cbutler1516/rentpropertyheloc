import {
  buildAnalyticsInsights,
  computeAnalyticsMetrics,
  emptyCampaignMetrics,
} from "./analytics-compute";
import type {
  AnalyticsInsights,
  AnalyticsRecord,
  CampaignMetricsInput,
  CrmActivitySummary,
} from "./types";

function parseMetrics(raw: unknown): CampaignMetricsInput {
  const defaults = emptyCampaignMetrics();
  if (!raw || typeof raw !== "object") return defaults;
  const r = raw as Record<string, unknown>;
  const num = (key: keyof CampaignMetricsInput) => {
    const v = r[key];
    return typeof v === "number" && Number.isFinite(v) ? Math.max(0, v) : defaults[key];
  };
  return {
    views: num("views"),
    clicks: num("clicks"),
    leads: num("leads"),
    appointments: num("appointments"),
    applications: num("applications"),
    funded_loans: num("funded_loans"),
    ad_spend: num("ad_spend"),
    estimated_revenue: num("estimated_revenue"),
  };
}

function parseCrmSummary(raw: unknown): CrmActivitySummary {
  const empty = {
    testLeadsSent: 0,
    liveLeadsPushed: 0,
    pushFailures: 0,
    lastActivityAt: null as string | null,
  };
  if (!raw || typeof raw !== "object") return empty;
  const r = raw as Record<string, unknown>;
  return {
    testLeadsSent:
      typeof r.testLeadsSent === "number" ? Math.max(0, r.testLeadsSent) : 0,
    liveLeadsPushed:
      typeof r.liveLeadsPushed === "number" ? Math.max(0, r.liveLeadsPushed) : 0,
    pushFailures:
      typeof r.pushFailures === "number" ? Math.max(0, r.pushFailures) : 0,
    lastActivityAt:
      typeof r.lastActivityAt === "string" ? r.lastActivityAt : null,
  };
}

function parseInsights(raw: unknown): AnalyticsInsights | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const funnel = Array.isArray(r.funnelMetrics)
    ? r.funnelMetrics
        .map((item): AnalyticsInsights["funnelMetrics"][number] | null => {
          if (!item || typeof item !== "object") return null;
          const row = item as Record<string, unknown>;
          if (typeof row.stage !== "string") return null;
          return {
            stage: row.stage,
            count: typeof row.count === "number" ? row.count : 0,
            rateFromPrevious:
              typeof row.rateFromPrevious === "number"
                ? row.rateFromPrevious
                : null,
          };
        })
        .filter((x): x is AnalyticsInsights["funnelMetrics"][number] => x !== null)
    : [];

  if (typeof r.campaignHealthScore !== "number") return null;

  return {
    campaignHealthScore: Math.min(100, Math.max(0, r.campaignHealthScore)),
    funnelMetrics: funnel,
    roiSummary: typeof r.roiSummary === "string" ? r.roiSummary : "",
    bestPerformingAssetNotes:
      typeof r.bestPerformingAssetNotes === "string"
        ? r.bestPerformingAssetNotes
        : "",
    nextRecommendedAction:
      typeof r.nextRecommendedAction === "string"
        ? r.nextRecommendedAction
        : "",
  };
}

export function parseAnalyticsJson(raw: unknown): AnalyticsRecord | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const record = raw as Record<string, unknown>;
  const metrics = parseMetrics(record.metrics);
  const computed = computeAnalyticsMetrics(metrics);
  const crmSummary = parseCrmSummary(record.crmSummary);
  const insights =
    parseInsights(record.insights) ??
    buildAnalyticsInsights({ metrics, computed, crmSummary });

  return {
    metrics,
    computed,
    crmSummary,
    insights,
    updatedAt:
      typeof record.updatedAt === "string"
        ? record.updatedAt
        : new Date().toISOString(),
    modelUsed: typeof record.modelUsed === "string" ? record.modelUsed : "demo",
  };
}
