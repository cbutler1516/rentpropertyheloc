"use client";

import type { DealAnalysisResult, DealInputs, LeadCapture } from "../lib/types";
import type { PlaybookNarrative } from "../lib/report-content";
import { dealPathMeta } from "../lib/constants";
import { PlaybookMetricsPrint } from "./playbook-metrics-print";
import { PlaybookReportPrintChrome } from "./playbook-report-print-chrome";
import { PlaybookReport, type ReportMeta } from "./playbook-report";

type PlaybookReportDocumentProps = {
  slug: string;
  inputs: DealInputs;
  analysis: DealAnalysisResult;
  narrative: PlaybookNarrative | unknown;
  lead: LeadCapture;
  createdAt: string;
  agentName: string | null;
  referralSource: string | null;
};

export function PlaybookReportDocument({
  slug,
  inputs,
  analysis,
  narrative,
  lead,
  createdAt,
  agentName,
  referralSource,
}: PlaybookReportDocumentProps) {
  const pathLabel = dealPathMeta[inputs.path].label;
  const reportUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/deal-analyzer/report/${slug}`
      : `https://theloanplaybook.com/deal-analyzer/report/${slug}`;

  const reportMeta: ReportMeta = {
    slug,
    createdAt,
    lead,
    agentName,
    referralSource,
    isSharedView: true,
  };

  return (
    <div
      id="playbook-report-print-root"
      className="playbook-report-document"
    >
      <PlaybookReportPrintChrome
        pathLabel={pathLabel}
        clientName={lead.name}
        agentName={agentName ?? lead.agentName}
        createdAt={createdAt}
        reportUrl={reportUrl}
        slug={slug}
      />
      <div className="playbook-report-content space-y-8 md:space-y-10">
        <PlaybookMetricsPrint analysis={analysis} />
        <PlaybookReport
          inputs={inputs}
          analysis={analysis}
          narrative={narrative}
          reportMeta={reportMeta}
          showFooterCta
        />
      </div>
    </div>
  );
}
