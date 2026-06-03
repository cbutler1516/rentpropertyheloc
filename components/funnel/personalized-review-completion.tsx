"use client";

import { CompletionCtaRow } from "@/components/funnel/completion-cta-row";
import {
  COMPLETION_REVIEW_NOTE,
  COMPLETION_STRATEGY_PATHS,
  COMPLETION_TIMELINE,
  FINANCING_REVIEW_DISCLAIMER,
} from "@/lib/leads/financing-review-content";
import type { FinancingReviewData } from "@/lib/leads/financing-review-document";
import { getReviewScenario, type ReviewScenarioTier } from "@/lib/leads/review-scenario";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

type PersonalizedReviewCompletionProps = {
  data: FinancingReviewData;
  open?: boolean;
  onClose?: () => void;
  embedded?: boolean;
};

const scenarioStyles: Record<
  ReviewScenarioTier,
  { badge: string; ring: string; glow: string }
> = {
  strong: {
    badge: "bg-teal-50 text-teal-800 border-teal-200",
    ring: "ring-teal-100",
    glow: "from-teal-500/10 to-emerald-500/5",
  },
  medium: {
    badge: "bg-sky-50 text-sky-900 border-sky-200",
    ring: "ring-sky-100",
    glow: "from-sky-500/10 to-teal-500/5",
  },
  lower: {
    badge: "bg-amber-50 text-amber-900 border-amber-200",
    ring: "ring-amber-100",
    glow: "from-amber-500/10 to-slate-500/5",
  },
};

export function PersonalizedReviewCompletion({
  data,
  open = true,
  onClose,
  embedded = false,
}: PersonalizedReviewCompletionProps) {
  const reduceMotion = useReducedMotion();
  const scenario = getReviewScenario(data);
  const styles = scenarioStyles[scenario.tier];

  useEffect(() => {
    if (!open || embedded) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, embedded]);

  if (!open) return null;

  const content = (
    <div
      className={cn(
        "relative mx-auto w-full max-w-2xl",
        embedded ? "px-0 py-0" : "px-4 py-6 sm:px-6 sm:py-10",
      )}
    >
      {!embedded && onClose ? (
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            Close
          </button>
        </div>
      ) : null}

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
      >
        <header className="bg-gradient-to-br from-slate-950 via-[#0a1628] to-teal-900 px-6 py-10 text-center sm:px-10 sm:py-12">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/20 ring-4 ring-teal-400/30 sm:h-20 sm:w-20"
            aria-hidden
          >
            <span className="text-3xl text-teal-200 sm:text-4xl">✓</span>
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Review Submitted
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
            Thank you. We&apos;ve received your information and started your financing review.
          </p>
          <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-slate-400 sm:text-sm">
            Your information has been securely submitted and will be reviewed by a financing
            specialist.
          </p>
        </header>

        <div className="space-y-8 px-5 py-8 sm:px-8 sm:py-10">
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
              Review Summary
            </h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <SummaryTile label="Property" value={data.propertyAddress || "On file"} full />
              <SummaryTile label="Requested Funds" value={data.requestedFunds} />
              <SummaryTile label="Profile" value="Complete" highlight />
              <SummaryTile label="Status" value={data.reviewStatus} highlight />
            </dl>
          </section>

          <section
            className={cn(
              "rounded-2xl border bg-gradient-to-br p-5 ring-1 sm:p-6",
              styles.badge,
              styles.ring,
              styles.glow,
            )}
          >
            <span
              className={cn(
                "inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide",
                styles.badge,
              )}
            >
              {scenario.badge}
            </span>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">{scenario.body}</p>
          </section>

          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
              Potential Financing Paths We&apos;ll Review
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {COMPLETION_STRATEGY_PATHS.map((path) => (
                <div
                  key={path.id}
                  className="rounded-xl border border-slate-200/90 bg-slate-50/80 p-4 transition hover:border-teal-200/80 hover:bg-teal-50/30"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl" aria-hidden>
                      {path.icon}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{path.name}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">
                        {path.suitability}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
              What Happens Next
            </h2>
            <ol className="mt-4 space-y-3">
              {COMPLETION_TIMELINE.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                      item.complete
                        ? "bg-teal-600 text-white"
                        : "border-2 border-dashed border-slate-300 bg-white text-slate-400",
                    )}
                    aria-hidden
                  >
                    {item.complete ? "✓" : "○"}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      item.complete ? "text-slate-900" : "text-slate-500",
                    )}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-xs text-slate-500">{COMPLETION_REVIEW_NOTE}</p>
          </section>

          <CompletionCtaRow
            data={data}
            ctaLocation="review-completion"
            className="border-t border-slate-100 pt-6"
          />

          <p className="text-[10px] leading-relaxed text-slate-400">{FINANCING_REVIEW_DISCLAIMER}</p>
        </div>
      </motion.div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-100/95 backdrop-blur-sm">
      {content}
    </div>
  );
}

function SummaryTile({
  label,
  value,
  full = false,
  highlight = false,
}: {
  label: string;
  value: string;
  full?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/90 bg-white px-4 py-3.5 shadow-sm",
        full && "sm:col-span-2",
        highlight && "border-teal-200/80 bg-teal-50/40",
      )}
    >
      <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
      <dd
        className={cn(
          "mt-1 text-sm font-semibold leading-snug",
          highlight ? "text-teal-900" : "text-slate-900",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
