"use client";

import { PhoneLink } from "@/components/trust/phone-link";
import { CALL_OUR_TEAM_LABEL } from "@/lib/contact";
import { useFinancingReviewActions } from "@/components/funnel/financing-review-experience";
import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import { BOOK_STRATEGY_CALL_LABEL } from "@/lib/contact";
import { FINANCING_REVIEW_DISCLAIMER } from "@/lib/leads/financing-review-content";
import type { FinancingReviewData } from "@/lib/leads/financing-review-document";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

type ProfileSavedStateProps = {
  snapshotData: FinancingReviewData;
  className?: string;
  autoOpenReviewModal?: boolean;
};

export function ProfileSavedState({
  snapshotData,
  className,
  autoOpenReviewModal = false,
}: ProfileSavedStateProps) {
  const reduceMotion = useReducedMotion();
  const profileComplete = snapshotData.profileComplete ?? true;
  const { experience, openViewer, downloadPdf } = useFinancingReviewActions(
    snapshotData,
    autoOpenReviewModal && profileComplete,
  );

  return (
    <>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50/50 via-white to-white p-6 sm:p-8",
          className,
        )}
      >
        {profileComplete ? (
          <>
            <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800">
              <span aria-hidden>✓</span> Profile Complete
            </p>
            <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Your review has been submitted.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Our team will review your information and contact you regarding available financing
              options.
            </p>
          </>
        ) : (
          <>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-700">
              Investor Profile Saved
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Thanks — our team now has the details needed to continue your review.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              A licensed financing specialist will use your profile to evaluate paths that may fit your
              scenario. This is not a loan approval or commitment to lend.
            </p>
          </>
        )}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <StrategyCallLink ctaLocation="profile-complete" />
          {profileComplete ? (
            <>
              <button
                type="button"
                onClick={openViewer}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
              >
                View Financing Review
              </button>
              <button
                type="button"
                onClick={downloadPdf}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
              >
                Download PDF
              </button>
            </>
          ) : null}
          <PhoneLink
            showIcon={false}
            label={CALL_OUR_TEAM_LABEL}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 no-underline shadow-sm hover:bg-slate-50"
          />
        </div>
        {profileComplete ? (
          <p className="mt-3 text-[10px] leading-relaxed text-slate-400">{FINANCING_REVIEW_DISCLAIMER}</p>
        ) : (
          <p className="mt-3 text-xs text-slate-500">
            {BOOK_STRATEGY_CALL_LABEL} opens scheduling in a new tab.
          </p>
        )}
      </motion.div>
      {experience}
    </>
  );
}
