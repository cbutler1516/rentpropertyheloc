"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { CardDescription, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { summarizeCrmActivity } from "../lib/analytics-crm-summary";
import { refreshAnalyticsRecord } from "../lib/analytics-compute";
import type {
  AnalyticsRecord,
  CampaignMetricsInput,
  CrmIntegrationRecord,
} from "../lib/types";

const METRIC_FIELDS: {
  key: keyof CampaignMetricsInput;
  label: string;
  prefix?: string;
}[] = [
  { key: "views", label: "Views" },
  { key: "clicks", label: "Clicks" },
  { key: "leads", label: "Leads" },
  { key: "appointments", label: "Appointments" },
  { key: "applications", label: "Applications" },
  { key: "funded_loans", label: "Funded loans" },
  { key: "ad_spend", label: "Ad spend", prefix: "$" },
  { key: "estimated_revenue", label: "Est. revenue", prefix: "$" },
];

type AnalyticsPanelProps = {
  analytics: AnalyticsRecord;
  packageTitle: string;
  topic: string;
  audience: string;
  crmIntegration?: CrmIntegrationRecord | null;
  assetFlags: {
    hasLandingPage: boolean;
    hasLeadCapture: boolean;
    hasLeadMagnet: boolean;
    hasCalendar: boolean;
    hasLaunchHub: boolean;
    hasCrmHub: boolean;
  };
  onAnalyticsChange: (record: AnalyticsRecord) => void;
};

function formatMoney(value: number | null) {
  if (value === null) return "—";
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function formatPct(value: number) {
  return `${value.toFixed(2)}%`;
}

function healthVariant(score: number): "success" | "gold" | "warning" {
  if (score >= 70) return "success";
  if (score >= 40) return "gold";
  return "warning";
}

export function AnalyticsPanel({
  analytics,
  packageTitle,
  topic,
  audience,
  crmIntegration,
  assetFlags,
  onAnalyticsChange,
}: AnalyticsPanelProps) {
  const [recommendLoading, setRecommendLoading] = useState(false);
  const [recommendError, setRecommendError] = useState<string | null>(null);
  const [mode, setMode] = useState<"ai" | "demo" | null>(null);

  const crmSummary = useMemo(
    () => summarizeCrmActivity(crmIntegration),
    [crmIntegration],
  );

  useEffect(() => {
    const lastAt = crmSummary.lastActivityAt;
    const prevAt = analytics.crmSummary.lastActivityAt;
    if (
      crmSummary.testLeadsSent === analytics.crmSummary.testLeadsSent &&
      crmSummary.liveLeadsPushed === analytics.crmSummary.liveLeadsPushed &&
      crmSummary.pushFailures === analytics.crmSummary.pushFailures &&
      lastAt === prevAt
    ) {
      return;
    }
    const refreshed = refreshAnalyticsRecord(
      {
        metrics: analytics.metrics,
        crmSummary,
        insights: analytics.insights,
      },
      true,
    );
    onAnalyticsChange({
      ...refreshed,
      updatedAt: new Date().toISOString(),
      modelUsed: analytics.modelUsed,
    });
  }, [
    analytics.crmSummary,
    analytics.insights,
    analytics.metrics,
    analytics.modelUsed,
    crmSummary,
    onAnalyticsChange,
  ]);

  const updateMetric = (key: keyof CampaignMetricsInput, raw: string) => {
    const value = Math.max(0, Number(raw) || 0);
    const metrics = { ...analytics.metrics, [key]: value };
    const refreshed = refreshAnalyticsRecord(
      {
        metrics,
        crmSummary,
        insights: analytics.insights,
      },
      true,
    );
    onAnalyticsChange({
      ...refreshed,
      updatedAt: new Date().toISOString(),
      modelUsed: analytics.modelUsed,
    });
  };

  const handleRecommend = async () => {
    setRecommendLoading(true);
    setRecommendError(null);
    try {
      const snapshot = refreshAnalyticsRecord(
        {
          metrics: analytics.metrics,
          crmSummary,
          insights: analytics.insights,
        },
        true,
      );
      const response = await fetch("/api/content-engine/analytics/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: packageTitle,
          topic,
          audience,
          analytics: { ...snapshot, crmSummary },
          ...assetFlags,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Recommendations failed.");
      }
      setMode(data.mode === "ai" ? "ai" : "demo");
      onAnalyticsChange({
        ...snapshot,
        crmSummary,
        insights: {
          ...snapshot.insights,
          ...data.insights,
        },
        updatedAt: new Date().toISOString(),
        modelUsed: data.modelUsed ?? data.mode,
      });
    } catch (err) {
      setRecommendError(
        err instanceof Error ? err.message : "Recommendations failed.",
      );
    } finally {
      setRecommendLoading(false);
    }
  };

  const { computed, insights } = analytics;
  const score = insights.campaignHealthScore;

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>
            Attribution dashboard — manual metrics, funnel, ROI, and CRM activity
          </CardDescription>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={healthVariant(score)}>
            Health {score}/100
          </Badge>
          {mode && (
            <Badge variant={mode === "ai" ? "purple" : "gold"}>
              {mode === "ai" ? "AI insights" : "Demo insights"}
            </Badge>
          )}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={recommendLoading}
            onClick={() => void handleRecommend()}
          >
            {recommendLoading ? "Analyzing…" : "Get recommendations"}
          </Button>
        </div>
      </div>

      {recommendError && (
        <p className="text-sm text-red-400" role="alert">
          {recommendError}
        </p>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="space-y-3 rounded-lg border border-white/[0.06] bg-black/20 p-4">
            <p className="font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase">
              Campaign metrics (manual)
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {METRIC_FIELDS.map(({ key, label, prefix }) => (
                <div key={key}>
                  <Label htmlFor={`metric-${key}`}>{label}</Label>
                  <div className="relative mt-1">
                    {prefix && (
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                        {prefix}
                      </span>
                    )}
                    <Input
                      id={`metric-${key}`}
                      type="number"
                      min={0}
                      className={prefix ? "pl-7" : undefined}
                      value={analytics.metrics[key] || ""}
                      onChange={(e) => updateMetric(key, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3 rounded-lg border border-white/[0.06] bg-black/20 p-4">
            <p className="font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase">
              Calculated rates
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <MetricTile label="CTR" value={formatPct(computed.clickThroughRate)} />
              <MetricTile
                label="Lead conv."
                value={formatPct(computed.leadConversionRate)}
              />
              <MetricTile label="Cost / lead" value={formatMoney(computed.costPerLead)} />
              <MetricTile
                label="Cost / appt"
                value={formatMoney(computed.costPerAppointment)}
              />
              <MetricTile
                label="Cost / funded"
                value={formatMoney(computed.costPerFundedLoan)}
              />
              <MetricTile
                label="Est. ROI"
                value={
                  computed.estimatedRoi !== null
                    ? formatPct(computed.estimatedRoi)
                    : "—"
                }
              />
              <MetricTile
                label="Rev / lead"
                value={formatMoney(computed.revenuePerLead)}
              />
            </div>
          </section>
        </div>

        <section className="mt-4 rounded-lg border border-white/[0.06] bg-black/20 p-4">
          <p className="font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase">
            Funnel
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[10px] text-zinc-500 uppercase">
                  <th className="pb-2 pr-4">Stage</th>
                  <th className="pb-2 pr-4">Count</th>
                  <th className="pb-2">From previous</th>
                </tr>
              </thead>
              <tbody>
                {insights.funnelMetrics.map((row) => (
                  <tr
                    key={row.stage}
                    className="border-t border-white/[0.04] text-zinc-300"
                  >
                    <td className="py-2 pr-4">{row.stage}</td>
                    <td className="py-2 pr-4 font-medium text-zinc-100">
                      {row.count.toLocaleString()}
                    </td>
                    <td className="py-2 text-zinc-400">
                      {row.rateFromPrevious !== null
                        ? formatPct(row.rateFromPrevious)
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <section className="rounded-lg border border-[#7c3aed]/20 bg-[#7c3aed]/5 p-4">
            <p className="font-mono text-[9px] tracking-[0.14em] text-[#c4b5fd] uppercase">
              ROI summary
            </p>
            <p className="mt-2 text-sm text-zinc-200">{insights.roiSummary}</p>
          </section>

          <section className="rounded-lg border border-white/[0.06] bg-black/20 p-4">
            <p className="font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase">
              CRM activity (from hub)
            </p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-300">
              <li>Test leads sent: {crmSummary.testLeadsSent}</li>
              <li>Live leads pushed: {crmSummary.liveLeadsPushed}</li>
              <li>Push failures: {crmSummary.pushFailures}</li>
              <li>
                Last activity:{" "}
                {crmSummary.lastActivityAt
                  ? new Date(crmSummary.lastActivityAt).toLocaleString()
                  : "—"}
              </li>
            </ul>
          </section>
        </div>

        <section className="mt-4 space-y-3 rounded-lg border border-[#c9a227]/20 bg-[#c9a227]/5 p-4">
          <p className="font-mono text-[9px] tracking-[0.14em] text-[#e8c547] uppercase">
            Best-performing assets
          </p>
          <p className="text-sm text-zinc-200">
            {insights.bestPerformingAssetNotes}
          </p>
        </section>

        <section className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="font-mono text-[9px] tracking-[0.14em] text-emerald-200 uppercase">
            Next recommended action
          </p>
          <p className="mt-2 text-sm text-zinc-200">
            {insights.nextRecommendedAction}
          </p>
        </section>
      </div>
    </div>
  );
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/[0.06] bg-black/30 px-3 py-2">
      <p className="text-[10px] text-zinc-500 uppercase">{label}</p>
      <p className="mt-0.5 font-medium text-zinc-100">{value}</p>
    </div>
  );
}
