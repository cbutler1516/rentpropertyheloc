"use client";

import { PhoneLink } from "@/components/trust/phone-link";
import { CALL_OUR_TEAM_LABEL } from "@/lib/contact";
import {
  downloadInvestorSnapshot,
  type InvestorSnapshotData,
} from "@/lib/leads/investor-snapshot-document";
import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import { BOOK_STRATEGY_CALL_LABEL } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

type ProfileSavedStateProps = {
  snapshotData: InvestorSnapshotData;
  className?: string;
};

export function ProfileSavedState({ snapshotData, className }: ProfileSavedStateProps) {
  const reduceMotion = useReducedMotion();

  function handleDownload() {
    downloadInvestorSnapshot({
      ...snapshotData,
      profileComplete: snapshotData.profileComplete ?? true,
    });
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50/50 via-white to-white p-6 sm:p-8",
        className,
      )}
    >
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
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <StrategyCallLink ctaLocation="profile-complete" />
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
        >
          Download Snapshot
        </button>
        <PhoneLink
          showIcon={false}
          label={CALL_OUR_TEAM_LABEL}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 no-underline shadow-sm hover:bg-slate-50"
        />
      </div>
      <p className="mt-3 text-xs text-slate-500">
        {BOOK_STRATEGY_CALL_LABEL} opens scheduling in a new tab.
      </p>
    </motion.div>
  );
}

