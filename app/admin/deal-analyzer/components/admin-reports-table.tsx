"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { CopyButton } from "@/app/content-engine/components/copy-button";
import type { DealAnalyzerReportRow } from "@/app/deal-analyzer/lib/admin/types";
import { formatCurrency } from "@/lib/utils";
import { AdminEmptyState } from "./admin-empty-state";

type AdminReportsTableProps = {
  reports: DealAnalyzerReportRow[];
  siteUrl: string;
  onOpenFollowUp: (row: DealAnalyzerReportRow) => void;
  onCrmPushComplete?: () => void;
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

function scoreVariant(
  label: DealAnalyzerReportRow["leadScoreLabel"],
): "gold" | "purple" | "default" | "warning" {
  if (label === "Hot") return "gold";
  if (label === "Warm") return "purple";
  if (label === "Standard") return "default";
  return "warning";
}

function leadStatusVariant(
  status: DealAnalyzerReportRow["leadStatus"],
): "gold" | "purple" | "default" | "warning" | "success" {
  if (status === "New") return "warning";
  if (status === "Appointment Set") return "success";
  if (status === "Followed Up" || status === "Contacted") return "purple";
  if (status === "Archived" || status === "Not Ready") return "default";
  return "default";
}

function crmStatusVariant(
  status: DealAnalyzerReportRow["crmPushStatus"],
): "success" | "warning" | "default" {
  if (status === "pushed") return "success";
  if (status === "failed") return "warning";
  return "default";
}

function crmStatusLabel(status: DealAnalyzerReportRow["crmPushStatus"]): string {
  if (status === "pushed") return "Pushed";
  if (status === "failed") return "Failed";
  return "Not pushed";
}

export function AdminReportsTable({
  reports,
  siteUrl,
  onOpenFollowUp,
  onCrmPushComplete,
}: AdminReportsTableProps) {
  const [pushingId, setPushingId] = useState<string | null>(null);
  const [pushError, setPushError] = useState<string | null>(null);

  async function pushToCrm(row: DealAnalyzerReportRow) {
    setPushingId(row.id);
    setPushError(null);
    try {
      const res = await fetch("/api/deal-analyzer/admin/crm/push-report", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId: row.id }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setPushError(data.error ?? data.message ?? "CRM push failed.");
        onCrmPushComplete?.();
        return;
      }
      onCrmPushComplete?.();
    } catch {
      setPushError("Could not reach CRM push API.");
    } finally {
      setPushingId(null);
    }
  }

  if (reports.length === 0) {
    return (
      <AdminEmptyState
        title="No reports to show"
        description="Saved Playbook Reports appear here after leads complete the analyzer. Try clearing filters or run a test funnel from Launch readiness."
        action={
          <Link
            href="/admin/deal-analyzer/launch"
            className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-700 px-5 font-mono text-[9px] tracking-[0.16em] text-zinc-300 uppercase hover:border-[#7c3aed]/50"
          >
            Open launch checklist
          </Link>
        }
      />
    );
  }

  return (
    <>
      {pushError ? (
        <p className="mb-3 text-sm text-red-400" role="alert">
          {pushError}
        </p>
      ) : null}
      <div className="hidden overflow-x-auto rounded-2xl border border-white/[0.06] bg-zinc-950/50 lg:block">
        <table className="w-full min-w-[1320px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] font-mono text-[9px] tracking-[0.16em] text-zinc-500 uppercase">
              <th className="px-4 py-3">Lead</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Deal</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Workflow</th>
              <th className="px-4 py-3">CRM</th>
              <th className="px-4 py-3">Consent</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((row) => {
              const reportUrl = `${siteUrl}/deal-analyzer/report/${row.slug}`;
              const isPushing = pushingId === row.id;
              return (
                <tr
                  key={row.id}
                  className="border-b border-white/[0.04] align-top hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{row.leadName}</p>
                    <p className="text-xs text-zinc-500">{row.role}</p>
                    {row.agentName ? (
                      <p className="text-xs text-zinc-600">Agent: {row.agentName}</p>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-zinc-400">
                    <p>{row.email}</p>
                    <p>{row.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-zinc-300">{row.dealTypeLabel}</p>
                    <p className="text-xs text-zinc-500">
                      {formatCurrency(row.loanAmount)} · {row.keyMetric.value}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={scoreVariant(row.leadScoreLabel)}>
                      {row.leadScoreLabel}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1.5">
                      <Badge variant={leadStatusVariant(row.leadStatus)}>
                        {row.leadStatus}
                      </Badge>
                      {row.needsFollowUp ? (
                        <Badge variant="warning">Needs follow-up</Badge>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1.5">
                      <Badge variant={crmStatusVariant(row.crmPushStatus)}>
                        {crmStatusLabel(row.crmPushStatus)}
                      </Badge>
                      {row.crmLastPushedAt ? (
                        <p className="text-[10px] text-zinc-600">
                          {formatDate(row.crmLastPushedAt)}
                        </p>
                      ) : null}
                      {row.crmPushError ? (
                        <p className="max-w-[140px] text-[10px] text-red-400/80">
                          {row.crmPushError}
                        </p>
                      ) : null}
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        disabled={isPushing}
                        onClick={() => void pushToCrm(row)}
                      >
                        {isPushing
                          ? "Pushing…"
                          : row.crmPushStatus === "failed"
                            ? "Retry CRM push"
                            : row.crmPushStatus === "pushed"
                              ? "Push again"
                              : "Push to CRM"}
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {row.smsCallConsent ? (
                      <Badge variant="success">Opted in</Badge>
                    ) : (
                      <Badge variant="warning">No consent</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-500">
                    {formatDate(row.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-2">
                      <Button
                        type="button"
                        variant="gold"
                        size="sm"
                        onClick={() => onOpenFollowUp(row)}
                      >
                        {row.followUpId ? "View follow-up" : "Generate follow-up"}
                      </Button>
                      <Link href={`/deal-analyzer/report/${row.slug}`}>
                        <Button type="button" variant="secondary" size="sm" className="w-full">
                          Open report
                        </Button>
                      </Link>
                      <CopyButton text={reportUrl} label="Copy link" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 lg:hidden">
        {reports.map((row) => {
          const reportUrl = `${siteUrl}/deal-analyzer/report/${row.slug}`;
          const isPushing = pushingId === row.id;
          return (
            <article
              key={row.id}
              className="rounded-2xl border border-white/[0.06] bg-zinc-950/50 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-medium text-white">{row.leadName}</h3>
                  <p className="text-xs text-zinc-500">
                    {row.dealTypeLabel} · {formatCurrency(row.loanAmount)}
                  </p>
                </div>
                <Badge variant={crmStatusVariant(row.crmPushStatus)}>
                  {crmStatusLabel(row.crmPushStatus)}
                </Badge>
              </div>
              {row.crmPushError ? (
                <p className="mt-2 text-xs text-red-400">{row.crmPushError}</p>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  disabled={isPushing}
                  onClick={() => void pushToCrm(row)}
                >
                  {isPushing ? "Pushing…" : "Push to CRM"}
                </Button>
                <Button
                  type="button"
                  variant="gold"
                  size="sm"
                  onClick={() => onOpenFollowUp(row)}
                >
                  Follow-up
                </Button>
                <Link href={`/deal-analyzer/report/${row.slug}`}>
                  <Button type="button" variant="secondary" size="sm">
                    Open report
                  </Button>
                </Link>
                <CopyButton text={reportUrl} label="Copy link" />
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
