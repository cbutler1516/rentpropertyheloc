"use client";

import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import {
  DOWNLOAD_REVIEW_SUMMARY_LABEL,
  TALK_THROUGH_OPTIONS_LABEL,
} from "@/lib/leads/financing-review-content";
import type { FinancingReviewData } from "@/lib/leads/financing-review-document";
import {
  canGenerateReviewSummaryPdf,
  printFinancingReviewPdf,
} from "@/lib/leads/financing-review-document";
import { cn } from "@/lib/cn";

type CompletionCtaRowProps = {
  data: FinancingReviewData;
  ctaLocation?: string;
  className?: string;
  size?: "md" | "lg";
};

export function CompletionCtaRow({
  data,
  ctaLocation = "review-completion",
  className,
  size = "lg",
}: CompletionCtaRowProps) {
  const showPdf = canGenerateReviewSummaryPdf(data);
  const heightClass = size === "lg" ? "min-h-[48px]" : "min-h-[44px]";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        showPdf ? "sm:flex-row sm:items-stretch" : "items-stretch",
        className,
      )}
    >
      <StrategyCallLink
        size={size}
        ctaLocation={`${ctaLocation}-primary`}
        className={cn("w-full justify-center", showPdf ? "sm:flex-1" : "mx-auto sm:max-w-md")}
      >
        {TALK_THROUGH_OPTIONS_LABEL}
      </StrategyCallLink>
      {showPdf ? (
        <ReviewSummaryDownloadButton data={data} className={cn("w-full sm:flex-1", heightClass)} />
      ) : null}
    </div>
  );
}

type ReviewSummaryDownloadButtonProps = {
  data: FinancingReviewData;
  className?: string;
};

export function ReviewSummaryDownloadButton({ data, className }: ReviewSummaryDownloadButtonProps) {
  if (!canGenerateReviewSummaryPdf(data)) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => printFinancingReviewPdf(data)}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 shadow-sm transition",
        "hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600",
        className,
      )}
    >
      <DownloadIcon className="h-4 w-4 shrink-0 text-slate-600" aria-hidden />
      {DOWNLOAD_REVIEW_SUMMARY_LABEL}
    </button>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 3v9m0 0l3.5-3.5M10 12 6.5 8.5M4 14v1.5A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5V14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
