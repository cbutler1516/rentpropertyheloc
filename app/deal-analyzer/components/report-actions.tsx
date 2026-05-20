"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { STRATEGY_CALL_URL } from "../lib/constants";

type ReportActionsProps = {
  slug: string;
  onNewAnalysis?: () => void;
};

export function ReportActions({ slug, onNewAnalysis }: ReportActionsProps) {
  const [copied, setCopied] = useState(false);
  const [pdfMessage, setPdfMessage] = useState<string | null>(null);

  const reportUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/deal-analyzer/report/${slug}`
      : `/deal-analyzer/report/${slug}`;

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(reportUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }, [reportUrl]);

  const downloadPdfPlaceholder = useCallback(() => {
    setPdfMessage("PDF export is coming soon. Use Copy link to share this report.");
    setTimeout(() => setPdfMessage(null), 4000);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="gold" size="sm" onClick={copyLink}>
          {copied ? "Link copied" : "Copy report link"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={downloadPdfPlaceholder}
        >
          Download PDF
        </Button>
        <Link
          href={STRATEGY_CALL_URL}
          className="inline-flex h-9 items-center justify-center rounded-full border border-[#7c3aed]/40 px-4 font-mono text-[9px] tracking-[0.16em] text-[#c4b5fd] uppercase hover:border-[#7c3aed] hover:bg-[#7c3aed]/10"
        >
          Book strategy call
        </Link>
        <Link
          href="/deal-analyzer/analyze"
          onClick={onNewAnalysis}
          className="inline-flex h-9 items-center justify-center rounded-full px-4 font-mono text-[9px] tracking-[0.16em] text-zinc-500 uppercase hover:text-zinc-300"
        >
          Start another analysis
        </Link>
      </div>
      {pdfMessage ? (
        <p className="text-xs text-zinc-500">{pdfMessage}</p>
      ) : null}
      <p className="font-mono text-[9px] tracking-[0.14em] text-zinc-600 break-all">
        {reportUrl}
      </p>
    </div>
  );
}
