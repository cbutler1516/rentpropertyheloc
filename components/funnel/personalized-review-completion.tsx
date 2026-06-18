"use client";

import { CompletionCtaRow } from "@/components/funnel/completion-cta-row";
import { BRAND, BRAND_ASSETS } from "@/lib/brand";
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
import Image from "next/image";
import { useEffect } from "react";

type PersonalizedReviewCompletionProps = {
  data: FinancingReviewData;
  open?: boolean;
  onClose?: () => void;
  embedded?: boolean;
};

const scenarioStyles: Record<
  ReviewScenarioTier,
  { badge: string; panel: string; accent: string }
> = {
  strong: {
    badge: "border-teal-200 bg-teal-600/10 text-teal-800",
    panel: "border-teal-200/70 bg-gradient-to-br from-teal-50/90 via-white to-emerald-50/40",
    accent: "from-teal-500/12 via-teal-400/5 to-transparent",
  },
  medium: {
    badge: "border-sky-200 bg-sky-600/10 text-sky-900",
    panel: "border-sky-200/70 bg-gradient-to-br from-sky-50/90 via-white to-teal-50/30",
    accent: "from-sky-500/10 via-teal-400/5 to-transparent",
  },
  lower: {
    badge: "border-amber-200 bg-amber-500/10 text-amber-900",
    panel: "border-amber-200/70 bg-gradient-to-br from-amber-50/80 via-white to-slate-50/80",
    accent: "from-amber-500/10 via-slate-400/5 to-transparent",
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
        className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.14)]"
      >
        <header className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-navy to-[#0a3566] px-6 py-10 text-center sm:px-10 sm:py-14">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_20%,rgba(23,212,212,0.2),transparent_68%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent"
            aria-hidden
          />

          <div className="relative mx-auto flex max-w-lg flex-col items-center">
            <div className="relative h-9 w-[160px] max-w-[180px] sm:h-10 sm:w-[200px] sm:max-w-[220px]">
              <Image
                src={BRAND_ASSETS.dark}
                alt={BRAND.name}
                fill
                sizes="220px"
                className="object-contain object-center"
                priority
              />
            </div>

            <div className="relative mt-7 sm:mt-8">
              <div
                className="pointer-events-none absolute -inset-6 rounded-full bg-teal-400/25 blur-2xl"
                aria-hidden
              />
              <div
                className="relative flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border border-teal-300/30 bg-teal-500/15 shadow-[0_0_32px_rgba(23,212,212,0.35)] sm:h-[4.75rem] sm:w-[4.75rem]"
                aria-hidden
              >
                <span className="text-3xl font-bold text-teal-100 sm:text-4xl">✓</span>
              </div>
            </div>

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-white sm:mt-7 sm:text-[1.75rem]">
              Review Submitted
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-200 sm:text-base">
              Thank you. We&apos;ve received your information and started your financing review.
            </p>
            <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-slate-400 sm:text-sm">
              Your information has been securely submitted and will be reviewed by a financing
              specialist.
            </p>
          </div>
        </header>

        <div className="space-y-8 px-5 py-8 sm:px-8 sm:py-10">
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
              Review Summary
            </h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2 sm:auto-rows-fr">
              <SummaryTile label="Property" value={data.propertyAddress || "On file"} full />
              <SummaryTile label="Requested Funds" value={data.requestedFunds} />
              <SummaryTile label="Profile" value="Complete" highlight />
              <SummaryTile label="Status" value={data.reviewStatus} highlight />
            </dl>
          </section>

          <section
            className={cn(
              "relative overflow-hidden rounded-2xl border p-6 sm:p-7",
              styles.panel,
            )}
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80",
                styles.accent,
              )}
              aria-hidden
            />
            <div className="relative">
              <span
                className={cn(
                  "inline-flex rounded-full border px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em]",
                  styles.badge,
                )}
              >
                {scenario.badge}
              </span>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-[0.9375rem]">
                {scenario.body}
              </p>
            </div>
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
        "flex min-h-[5.25rem] flex-col justify-center rounded-xl border px-4 py-4 shadow-sm",
        full && "sm:col-span-2",
        highlight
          ? "border-teal-200/90 bg-gradient-to-br from-teal-50/70 to-white"
          : "border-slate-200/90 bg-white",
      )}
    >
      <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </dt>
      <dd
        className={cn(
          "mt-1.5 text-sm font-semibold leading-snug",
          highlight ? "text-teal-900" : "text-slate-900",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
