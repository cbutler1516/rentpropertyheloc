"use client";

import { FinancingPathsSection } from "@/components/funnel/gamification/financing-paths-section";
import { ProfileStrengthMeter } from "@/components/funnel/gamification/profile-strength-meter";
import { useFinancingReviewActions } from "@/components/funnel/financing-review-experience";
import { Button } from "@/components/ui/button";
import { MAX_PROFILE_STRENGTH } from "@/lib/leads/investor-review-gamification";
import { FINANCING_REVIEW_DISCLAIMER } from "@/lib/leads/financing-review-content";
import type { FinancingReviewData } from "@/lib/leads/financing-review-document";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

type ProfileCompleteCelebrationProps = {
  profileStrength?: number;
  showPriority?: boolean;
  snapshotData: FinancingReviewData;
  className?: string;
  autoOpenReviewModal?: boolean;
};

export function ProfileCompleteCelebration({
  profileStrength = MAX_PROFILE_STRENGTH,
  showPriority = false,
  snapshotData,
  className,
  autoOpenReviewModal = false,
}: ProfileCompleteCelebrationProps) {
  const reduceMotion = useReducedMotion();
  const reviewData = {
    ...snapshotData,
    profileStrength,
    profileComplete: true,
  };
  const { experience, openViewer, downloadPdf } = useFinancingReviewActions(
    reviewData,
    autoOpenReviewModal,
  );

  return (
    <>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-teal-200/90 bg-gradient-to-br from-teal-50 via-white to-emerald-50/40 p-5 shadow-[0_12px_40px_rgba(13,148,136,0.12)] sm:p-6 lg:rounded-3xl lg:p-8",
          className,
        )}
      >
        {!reduceMotion ? (
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.15),transparent_55%)]"
            aria-hidden
          />
        ) : null}

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-teal-800">
              <span aria-hidden>✓</span> Profile Complete
            </span>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Your personalized financing review is ready.
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
              We&apos;ve completed a preliminary review based on your profile. View potential
              financing paths our team may discuss with you.
            </p>
            {showPriority ? (
              <p className="mt-2 text-xs font-medium text-amber-800">
                ⚡ Priority review remains active for your request.
              </p>
            ) : null}

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button type="button" size="lg" className="rounded-xl" onClick={openViewer}>
                View Financing Review
              </Button>
              <Button
                type="button"
                size="lg"
                variant="ghost"
                className="rounded-xl border border-slate-200"
                onClick={downloadPdf}
              >
                Download PDF
              </Button>
            </div>
            <p className="mt-3 text-[10px] leading-relaxed text-slate-400">{FINANCING_REVIEW_DISCLAIMER}</p>
          </div>

          <div className="flex shrink-0 flex-col items-center gap-3 lg:items-end">
            <div className="rounded-2xl bg-gradient-to-br from-teal-700 to-teal-900 p-4 shadow-lg">
              <ProfileStrengthMeter strength={profileStrength} size="lg" celebrate />
            </div>
          </div>
        </div>

        <div className="relative mt-6 border-t border-teal-100 pt-5">
          <FinancingPathsSection profileStrength={profileStrength} />
        </div>
      </motion.div>
      {experience}
    </>
  );
}
