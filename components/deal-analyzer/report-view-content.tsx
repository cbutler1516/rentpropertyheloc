"use client";

import {
  FullPlaybookReport,
  printPlaybookReport,
} from "@/components/deal-analyzer/full-playbook-report";
import { DealAnalyzerShell } from "@/components/deal-analyzer/deal-analyzer-shell";
import { LocalTestBanner } from "@/components/deal-analyzer/local-test-banner";
import { CtaLink } from "@/components/ui/cta-link";
import { getLocalReport } from "@/lib/deal-analyzer/session";
import type { FullDealAnalyzerReport } from "@/lib/deal-analyzer/types";
import { useEffect, useState } from "react";

type ReportViewContentProps = {
  slug: string;
};

export function ReportViewContent({ slug }: ReportViewContentProps) {
  const [data, setData] = useState<FullDealAnalyzerReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const local = getLocalReport(slug);
      if (local) {
        if (!cancelled) {
          setData(local);
          setLoading(false);
        }
        return;
      }

      try {
        const res = await fetch(`/api/deal-analyzer/reports/${encodeURIComponent(slug)}`);
        const json = (await res.json()) as {
          success?: boolean;
          error?: string;
          report?: FullDealAnalyzerReport;
        };
        if (!cancelled) {
          if (res.ok && json.success && json.report) {
            setData(json.report);
          } else {
            setError(json.error ?? "Report not found.");
          }
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load report.");
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <DealAnalyzerShell step={4} title="Loading your Playbook Report…">
        <p className="text-sm text-slate-500">Loading…</p>
      </DealAnalyzerShell>
    );
  }

  if (error || !data) {
    return (
      <DealAnalyzerShell step={4} title="Report not found">
        <p className="text-sm text-slate-600">{error ?? "This report could not be loaded."}</p>
        <CtaLink href="/deal-analyzer/analyze" size="md" className="mt-6" ctaLocation="da-report-missing">
          Start a new analysis
        </CtaLink>
      </DealAnalyzerShell>
    );
  }

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/deal-analyzer/report/${slug}`
      : `/deal-analyzer/report/${slug}`;

  return (
    <DealAnalyzerShell
      step={4}
      title="Your Playbook Report"
      subtitle="Educational estimates only — share, print, or book a strategy call to pressure-test the plan."
    >
      <LocalTestBanner />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => printPlaybookReport()}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-teal-700 px-6 text-sm font-semibold text-white transition hover:bg-teal-800"
        >
          Print / save PDF
        </button>
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(shareUrl)}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
        >
          Copy report link
        </button>
        <CtaLink href="/strategy-call" variant="secondary" size="md" ctaLocation="da-report-strategy">
          Book strategy call
        </CtaLink>
      </div>

      <FullPlaybookReport data={data} />
    </DealAnalyzerShell>
  );
}
