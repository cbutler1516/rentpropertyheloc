"use client";

import { Card } from "@/components/ui/card";
import type { AnalysisResult } from "@/lib/deal-analyzer/types";

type StickySummaryPanelProps = {
  analysis: AnalysisResult | null;
};

export function StickySummaryPanel({ analysis }: StickySummaryPanelProps) {
  if (!analysis) {
    return (
      <Card className="card-surface p-5 lg:sticky lg:top-24">
        <p className="text-sm text-slate-500">Select a path and enter deal details to see live estimates.</p>
      </Card>
    );
  }

  return (
    <Card className="card-surface p-5 lg:sticky lg:top-24">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700">Live summary</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{analysis.summary}</p>
      <ul className="mt-4 space-y-2">
        {analysis.metrics.slice(0, 5).map((m) => (
          <li key={m.label} className="flex justify-between gap-3 text-sm">
            <span className="text-slate-600">{m.label}</span>
            <span className="font-semibold text-slate-900">{m.value}</span>
          </li>
        ))}
      </ul>
      {analysis.warnings.length > 0 ? (
        <p className="mt-4 text-xs text-amber-700">{analysis.warnings[0]}</p>
      ) : null}
    </Card>
  );
}
