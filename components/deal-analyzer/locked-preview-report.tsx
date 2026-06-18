"use client";

import { DEAL_ANALYZER_DISCLAIMER } from "@/lib/deal-analyzer/constants";
import type { AnalysisResult } from "@/lib/deal-analyzer/types";
import { CtaLink } from "@/components/ui/cta-link";

type LockedPreviewReportProps = {
  analysis: AnalysisResult;
};

export function LockedPreviewReport({ analysis }: LockedPreviewReportProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-gradient-to-r from-brand-navy to-slate-900 px-6 py-5 text-white sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal-300/90">Playbook Report</p>
        <h2 className="mt-2 text-xl font-bold">Preview — unlock your full report</h2>
        <p className="mt-2 text-sm text-white/75">{analysis.summary}</p>
      </div>

      <div className="p-6 sm:p-8">
        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Key metrics</h3>
        <ul className="mt-4 space-y-3">
          {analysis.metrics.map((metric) => (
            <li
              key={metric.label}
              className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
            >
              <span className="text-sm text-slate-600">{metric.label}</span>
              <span className="select-none font-semibold text-slate-900 blur-[5px]">{metric.value}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-xl border border-dashed border-teal-200 bg-teal-50/50 px-4 py-4 text-center">
          <p className="text-sm font-semibold text-slate-800">Unlock Coach&apos;s Notes, strategy, and shareable link</p>
          <p className="mt-1 text-xs text-slate-600">Share contact info and consent to generate your full Playbook Report.</p>
          <CtaLink href="/deal-analyzer/lead" size="lg" className="mt-4 w-full sm:w-auto" ctaLocation="da-preview-unlock">
            Continue to unlock
          </CtaLink>
        </div>

        <p className="mt-6 text-[11px] leading-relaxed text-slate-500">{DEAL_ANALYZER_DISCLAIMER}</p>
      </div>
    </div>
  );
}
