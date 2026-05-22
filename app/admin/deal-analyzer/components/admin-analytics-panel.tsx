"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import type { DealAnalyzerAnalyticsPayload } from "@/app/deal-analyzer/lib/analytics/types";

function FunnelBar({
  label,
  count,
  max,
}: {
  label: string;
  count: number;
  max: number;
}) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-300">{label}</span>
        <span className="font-mono text-xs text-zinc-500">
          {count.toLocaleString()}
          {max > 0 && label !== "Landing views" ? ` · ${pct}% of views` : ""}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#c9a227] transition-all"
          style={{ width: `${max > 0 ? Math.max(4, pct) : 0}%` }}
        />
      </div>
    </div>
  );
}

export function AdminAnalyticsPanel() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<DealAnalyzerAnalyticsPayload | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (rangeDays: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/deal-analyzer/admin/analytics?days=${rangeDays}`,
        { credentials: "include" },
      );
      const json = (await res.json()) as DealAnalyzerAnalyticsPayload;
      if (res.ok) setData(json);
      else setData(null);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(days);
  }, [days, load]);

  const maxFunnel = data?.funnel.views ?? 0;

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium text-white">Conversion analytics</h2>
          <p className="text-sm text-zinc-500">
            Anonymous session funnel — last {days} days. Consent events are tracked
            separately from marketing page views.
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-400">
          Range
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-white"
          >
            <option value={7}>7 days</option>
            <option value={30}>30 days</option>
            <option value={90}>90 days</option>
          </select>
        </label>
      </div>

      {!data?.configured ? (
        <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          Connect Supabase and run migration{" "}
          <code className="text-amber-200">007_deal_analyzer_events.sql</code> to
          record events.
        </p>
      ) : null}

      {data?.error ? (
        <p className="text-sm text-red-400" role="alert">
          {data.error}
        </p>
      ) : null}

      {loading && !data ? (
        <p className="text-sm text-zinc-500">Loading analytics…</p>
      ) : null}

      {data ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Funnel</CardTitle>
              <CardDescription>
                Unique sessions per stage (views → starts → previews → lead form →
                submit → report)
              </CardDescription>
            </CardHeader>
            <div className="space-y-4 px-6 pb-6">
              <FunnelBar label="Landing views" count={data.funnel.views} max={maxFunnel} />
              <FunnelBar label="Analyzer started" count={data.funnel.starts} max={maxFunnel} />
              <FunnelBar label="Preview viewed" count={data.funnel.previews} max={maxFunnel} />
              <FunnelBar
                label="Lead form viewed"
                count={data.funnel.leadForms}
                max={maxFunnel}
              />
              <FunnelBar label="Lead submitted" count={data.funnel.leads} max={maxFunnel} />
              <FunnelBar
                label="Report generated"
                count={data.funnel.reports}
                max={maxFunnel}
              />
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">By deal type</CardTitle>
              <CardDescription>Starts vs reports</CardDescription>
            </CardHeader>
            <div className="overflow-x-auto px-6 pb-6">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500">
                    <th className="pb-2 font-medium">Path</th>
                    <th className="pb-2 font-medium">Starts</th>
                    <th className="pb-2 font-medium">Reports</th>
                    <th className="pb-2 font-medium">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {data.conversionByDealType.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-4 text-zinc-500">
                        No path data yet.
                      </td>
                    </tr>
                  ) : (
                    data.conversionByDealType.map((row) => (
                      <tr key={row.dealType} className="border-b border-zinc-800/60">
                        <td className="py-2 text-zinc-200">{row.label}</td>
                        <td className="py-2 text-zinc-400">{row.starts}</td>
                        <td className="py-2 text-zinc-400">{row.reports}</td>
                        <td className="py-2 font-mono text-xs text-[#c9a227]">
                          {row.leadRate}%
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">By partner agent</CardTitle>
              <CardDescription>Attributed leads and reports</CardDescription>
            </CardHeader>
            <div className="overflow-x-auto px-6 pb-6">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500">
                    <th className="pb-2 font-medium">Agent</th>
                    <th className="pb-2 font-medium">Leads</th>
                    <th className="pb-2 font-medium">Reports</th>
                  </tr>
                </thead>
                <tbody>
                  {data.conversionByAgent.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-4 text-zinc-500">
                        No partner attribution yet.
                      </td>
                    </tr>
                  ) : (
                    data.conversionByAgent.map((row) => (
                      <tr key={row.agentId} className="border-b border-zinc-800/60">
                        <td className="py-2 text-zinc-200">{row.agentName}</td>
                        <td className="py-2 text-zinc-400">{row.leads}</td>
                        <td className="py-2 text-zinc-400">{row.reports}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top SEO landing pages</CardTitle>
              <CardDescription>Page views (all sessions)</CardDescription>
            </CardHeader>
            <ul className="space-y-2 px-6 pb-6 text-sm">
              {data.topSeoLandingPages.length === 0 ? (
                <li className="text-zinc-500">No SEO landing views yet.</li>
              ) : (
                data.topSeoLandingPages.map((row) => (
                  <li
                    key={row.pagePath}
                    className="flex justify-between gap-4 border-b border-zinc-800/40 py-2"
                  >
                    <span className="truncate font-mono text-xs text-zinc-400">
                      {row.pagePath}
                    </span>
                    <span className="shrink-0 text-zinc-200">{row.views}</span>
                  </li>
                ))
              )}
            </ul>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Report engagement</CardTitle>
              <CardDescription>Share, copy, and PDF/print</CardDescription>
            </CardHeader>
            <dl className="grid grid-cols-3 gap-4 px-6 pb-6 text-center">
              <div>
                <dt className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                  Link copied
                </dt>
                <dd className="mt-1 text-2xl font-medium text-white">
                  {data.reportEngagement.linkCopied}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                  Message copied
                </dt>
                <dd className="mt-1 text-2xl font-medium text-white">
                  {data.reportEngagement.messageCopied}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                  PDF / print
                </dt>
                <dd className="mt-1 text-2xl font-medium text-white">
                  {data.reportEngagement.pdfPrinted}
                </dd>
              </div>
            </dl>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">CRM push</CardTitle>
              <CardDescription>Webhook success vs failure events</CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <p className="text-3xl font-medium text-white">
                {data.crmPush.successRate}%
                <span className="ml-2 text-sm font-normal text-zinc-500">success rate</span>
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                {data.crmPush.succeeded} succeeded · {data.crmPush.failed} failed
              </p>
            </div>
          </Card>
        </div>
      ) : null}
    </section>
  );
}
