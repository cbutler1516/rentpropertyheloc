"use client";

import Link from "next/link";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { CopyButton } from "@/app/content-engine/components/copy-button";
import type { DealAnalyzerReportRow } from "@/app/deal-analyzer/lib/admin/types";
import { formatCurrency } from "@/lib/utils";

type AdminReportsTableProps = {
  reports: DealAnalyzerReportRow[];
  siteUrl: string;
  onOpenFollowUp: (row: DealAnalyzerReportRow) => void;
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

export function AdminReportsTable({
  reports,
  siteUrl,
  onOpenFollowUp,
}: AdminReportsTableProps) {
  if (reports.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-white/[0.08] px-6 py-12 text-center text-sm text-zinc-500">
        No reports match your filters.
      </p>
    );
  }

  return (
    <>
      <div className="hidden overflow-x-auto rounded-2xl border border-white/[0.06] bg-zinc-950/50 lg:block">
        <table className="w-full min-w-[1200px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] font-mono text-[9px] tracking-[0.16em] text-zinc-500 uppercase">
              <th className="px-4 py-3">Lead</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Deal</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Workflow</th>
              <th className="px-4 py-3">Consent</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((row) => {
              const reportUrl = `${siteUrl}/deal-analyzer/report/${row.slug}`;
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
                      {row.followUpId ? (
                        <p className="text-[10px] text-zinc-600">
                          Follow-up · {row.followUpStatus ?? "draft"}
                        </p>
                      ) : (
                        <p className="text-[10px] text-zinc-600">No follow-up yet</p>
                      )}
                      {row.nextFollowUpAt ? (
                        <p className="text-[10px] text-zinc-500">
                          Next: {formatDate(row.nextFollowUpAt)}
                        </p>
                      ) : null}
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
                <Badge variant={leadStatusVariant(row.leadStatus)}>
                  {row.leadStatus}
                </Badge>
              </div>
              {row.needsFollowUp ? (
                <Badge variant="warning" className="mt-2">
                  Needs follow-up
                </Badge>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="gold"
                  size="sm"
                  onClick={() => onOpenFollowUp(row)}
                >
                  {row.followUpId ? "View follow-up" : "Generate follow-up"}
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
