"use client";

import { Button } from "@/components/ui/button";
import { useFinancingReviewActions } from "@/components/funnel/financing-review-experience";
import {
  BASE_PROFILE_STRENGTH,
  getProfileStrengthLabel,
  MAX_PROFILE_STRENGTH,
} from "@/lib/leads/investor-review-gamification";
import { FINANCING_REVIEW_DISCLAIMER } from "@/lib/leads/financing-review-content";
import type { FinancingReviewData } from "@/lib/leads/financing-review-document";
import { cn } from "@/lib/cn";

type InvestorEquitySnapshotCardProps = {
  propertyAddress: string;
  requestedFunds: string;
  submissionDate: string;
  reviewStatus?: string;
  showPriority?: boolean;
  profileStrength?: number;
  profileComplete?: boolean;
  compact?: boolean;
  className?: string;
};

export function InvestorEquitySnapshotCard({
  propertyAddress,
  requestedFunds,
  submissionDate,
  reviewStatus = "Review Started",
  showPriority = false,
  profileStrength = BASE_PROFILE_STRENGTH,
  profileComplete = false,
  compact = false,
  className,
}: InvestorEquitySnapshotCardProps) {
  const strengthLabel = getProfileStrengthLabel(profileStrength);
  const isComplete = profileComplete || profileStrength >= MAX_PROFILE_STRENGTH;

  const reviewData: FinancingReviewData = {
    propertyAddress,
    requestedFunds,
    submissionDate,
    reviewStatus,
    profileStrength,
    priorityReviewActive: showPriority,
    profileComplete: isComplete,
  };

  const { experience, openViewer, downloadPdf } = useFinancingReviewActions(reviewData);

  if (compact) {
    return (
      <div className={cn("space-y-2 text-sm", className)}>
        <SnapshotField label="Property" value={propertyAddress || "On file"} compact />
        <SnapshotField label="Requested funds" value={requestedFunds} compact />
        <SnapshotField label="Submitted" value={submissionDate} compact />
        {isComplete ? (
          <button
            type="button"
            onClick={openViewer}
            className="mt-2 w-full rounded-lg bg-teal-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-teal-800"
          >
            View financing review
          </button>
        ) : null}
        {experience}
      </div>
    );
  }

  return (
    <>
      <div className={cn("flex h-full flex-col", className)}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Personalized financing review
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">Preliminary review summary</p>
          </div>
          <div
            className={cn(
              "shrink-0 rounded-xl border px-2.5 py-2 text-center",
              isComplete
                ? "border-amber-200 bg-gradient-to-br from-amber-50 to-teal-50"
                : "border-teal-100 bg-teal-50",
            )}
          >
            <p className="text-[9px] font-semibold uppercase tracking-wide text-teal-700">Strength</p>
            <p
              className={cn(
                "text-lg font-bold tabular-nums leading-none",
                isComplete ? "text-amber-800" : "text-teal-900",
              )}
            >
              {profileStrength}%
            </p>
          </div>
        </div>

        <p className={cn("mt-2 text-xs font-medium", isComplete ? "text-amber-800" : "text-teal-800")}>
          {strengthLabel}
        </p>

        <dl className="mt-4 grid flex-1 gap-2.5">
          <SnapshotField label="Property address" value={propertyAddress || "On file"} />
          <SnapshotField label="Requested funds" value={requestedFunds} />
          <SnapshotField label="Submission date" value={submissionDate} />
          <SnapshotField label="Review status" value={reviewStatus} highlight />
          <SnapshotField
            label="Priority review"
            value={showPriority ? "Activated" : "Standard queue"}
            highlight={showPriority}
          />
        </dl>

        {isComplete ? (
          <div className="mt-4 border-t border-slate-200/80 pt-4">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button type="button" size="sm" className="rounded-xl" onClick={openViewer}>
                View Financing Review
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-xl border border-slate-200"
                onClick={downloadPdf}
              >
                Download PDF
              </Button>
            </div>
            <p className="mt-2 text-[10px] leading-relaxed text-slate-500">
              {FINANCING_REVIEW_DISCLAIMER}
            </p>
          </div>
        ) : null}
      </div>
      {experience}
    </>
  );
}

function SnapshotField({
  label,
  value,
  highlight = false,
  compact = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="flex justify-between gap-2 text-xs">
        <dt className="text-slate-500">{label}</dt>
        <dd className="max-w-[58%] text-right font-medium text-slate-800">{value}</dd>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 shadow-sm">
      <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
      <dd
        className={cn(
          "mt-0.5 text-sm font-medium leading-snug",
          highlight ? "font-semibold text-teal-800" : "text-slate-900",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
