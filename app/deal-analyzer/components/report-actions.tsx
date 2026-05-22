"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { trackDealAnalyzerEvent } from "../lib/analytics/track-client";
import { STRATEGY_CALL_URL } from "../lib/constants";

type ReportActionsProps = {
  slug: string;
  reportId?: string | null;
  dealType?: string | null;
  agentShareMessage?: string;
  reportTitle?: string;
  onNewAnalysis?: () => void;
};

export function ReportActions({
  slug,
  reportId,
  dealType,
  agentShareMessage,
  reportTitle,
  onNewAnalysis,
}: ReportActionsProps) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [printing, setPrinting] = useState(false);

  const reportUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/deal-analyzer/report/${slug}`
      : `/deal-analyzer/report/${slug}`;

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(reportUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
      void trackDealAnalyzerEvent({
        eventName: "report_link_copied",
        reportId: reportId ?? undefined,
        dealType: dealType ?? undefined,
        metadata: { slug },
      });
    } catch {
      setLinkCopied(false);
    }
  }, [reportUrl]);

  const copyAgentMessage = useCallback(async () => {
    if (!agentShareMessage?.trim()) return;
    try {
      const text = `${agentShareMessage.trim()}\n\nView report: ${reportUrl}`;
      await navigator.clipboard.writeText(text);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
      void trackDealAnalyzerEvent({
        eventName: "report_message_copied",
        reportId: reportId ?? undefined,
        dealType: dealType ?? undefined,
        metadata: { slug },
      });
    } catch {
      setShareCopied(false);
    }
  }, [agentShareMessage, reportUrl]);

  const downloadPdf = useCallback(() => {
    setPrinting(true);
    const previousTitle = document.title;
    if (reportTitle) {
      document.title = reportTitle;
    }
    document.documentElement.classList.add("printing-playbook-report");

    const cleanup = () => {
      document.documentElement.classList.remove("printing-playbook-report");
      document.title = previousTitle;
      setPrinting(false);
      window.removeEventListener("afterprint", cleanup);
    };

    window.addEventListener("afterprint", cleanup);
    void trackDealAnalyzerEvent({
      eventName: "report_pdf_printed",
      reportId: reportId ?? undefined,
      dealType: dealType ?? undefined,
      metadata: { slug },
    });

    window.setTimeout(() => {
      window.print();
    }, 150);
  }, [reportTitle, reportId, dealType, slug]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button
          type="button"
          variant="gold"
          size="sm"
          className="w-full sm:w-auto"
          onClick={downloadPdf}
          disabled={printing}
        >
          {printing ? "Opening print…" : "Download PDF"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="w-full sm:w-auto"
          onClick={copyLink}
        >
          {linkCopied ? "Link copied" : "Copy report link"}
        </Button>
        {agentShareMessage?.trim() ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="w-full sm:w-auto"
            onClick={copyAgentMessage}
          >
            {shareCopied ? "Message copied" : "Copy client message"}
          </Button>
        ) : null}
        <Link
          href={STRATEGY_CALL_URL}
          className="inline-flex h-9 w-full items-center justify-center rounded-full border border-[#7c3aed]/40 px-4 font-mono text-[9px] tracking-[0.16em] text-[#c4b5fd] uppercase hover:border-[#7c3aed] hover:bg-[#7c3aed]/10 sm:w-auto"
        >
          Book strategy call
        </Link>
        <Link
          href="/deal-analyzer/analyze"
          onClick={onNewAnalysis}
          className="inline-flex h-9 w-full items-center justify-center rounded-full px-4 font-mono text-[9px] tracking-[0.16em] text-zinc-500 uppercase hover:text-zinc-300 sm:w-auto"
        >
          Start another analysis
        </Link>
      </div>
      <p className="text-xs text-zinc-500">
        PDF uses your browser&apos;s print dialog — choose &quot;Save as PDF&quot;. Charts
        and colors are optimized for export.
      </p>
      <p className="break-all font-mono text-[9px] tracking-[0.14em] text-zinc-600">
        {reportUrl}
      </p>
    </div>
  );
}
