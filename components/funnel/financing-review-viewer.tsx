"use client";

import { Button } from "@/components/ui/button";
import { PhoneLink } from "@/components/trust/phone-link";
import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import { CALL_OUR_TEAM_LABEL } from "@/lib/contact";
import {
  FINANCING_REVIEW_CONTACT,
  FINANCING_REVIEW_DISCLAIMER,
  FINANCING_REVIEW_NEXT_STEPS,
  FINANCING_REVIEW_PATHS,
} from "@/lib/leads/financing-review-content";
import type { FinancingReviewData } from "@/lib/leads/financing-review-document";
import { cn } from "@/lib/cn";
import { SITE_NAME } from "@/lib/site";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

type FinancingReviewViewerProps = {
  open: boolean;
  onClose: () => void;
  data: FinancingReviewData;
  onDownloadPdf: () => void;
};

export function FinancingReviewViewer({
  open,
  onClose,
  data,
  onDownloadPdf,
}: FinancingReviewViewerProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-slate-950/60 backdrop-blur-sm"
          role="presentation"
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-0 flex-1 flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="financing-review-title"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-slate-950 px-4 py-3 sm:px-6">
              <p className="text-sm font-semibold text-white">{SITE_NAME}</p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:px-6 sm:py-6">
              <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200/80">
                <div className="bg-gradient-to-br from-slate-950 via-[#0a1628] to-teal-900 px-6 py-8 sm:px-8 sm:py-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-300">
                    Personalized Financing Review
                  </p>
                  <h1
                    id="financing-review-title"
                    className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl"
                  >
                    Preliminary Review Summary
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
                    Based on the information you provided, these are potential financing paths our
                    team may review with you. This is not a lending decision.
                  </p>
                </div>

                <div className="space-y-8 px-6 py-8 sm:px-8">
                  <ReviewSection title="1. Review Summary">
                    <dl className="grid gap-3 sm:grid-cols-2">
                      <SummaryField label="Property" value={data.propertyAddress || "On file"} full />
                      <SummaryField label="Funding goal discussed" value={data.requestedFunds} />
                      <SummaryField label="Submission date" value={data.submissionDate} />
                      <SummaryField label="Review status" value={data.reviewStatus} />
                      <SummaryField
                        label="Review type"
                        value="Preliminary review — financing options to discuss"
                      />
                      <SummaryField
                        label="Queue"
                        value={
                          data.priorityReviewActive ? "Priority review queue" : "Standard review queue"
                        }
                      />
                    </dl>
                  </ReviewSection>

                  <ReviewSection title="2. Financing Paths We May Review">
                    <div className="grid gap-3">
                      {FINANCING_REVIEW_PATHS.map((path) => (
                        <div
                          key={path.id}
                          className="flex gap-3 rounded-xl border border-slate-200/90 bg-slate-50/80 p-4"
                        >
                          <span className="text-xl" aria-hidden>
                            {path.icon}
                          </span>
                          <div>
                            <h3 className="text-sm font-semibold text-slate-900">{path.name}</h3>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600">
                              {path.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ReviewSection>

                  <ReviewSection title="3. What Happens Next">
                    <ol className="space-y-4">
                      {FINANCING_REVIEW_NEXT_STEPS.map((item) => (
                        <li key={item.step} className="flex gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
                            {item.step}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                            <p className="mt-0.5 text-sm leading-relaxed text-slate-600">
                              {item.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </ReviewSection>

                  <ReviewSection title="4. Contact Information">
                    <div className="rounded-xl border border-teal-200/80 bg-gradient-to-br from-teal-50 to-cyan-50/50 p-5">
                      <p className="font-semibold text-slate-900">{FINANCING_REVIEW_CONTACT.siteName}</p>
                      <p className="mt-1 text-sm text-slate-600">{FINANCING_REVIEW_CONTACT.company}</p>
                      <p className="mt-2 text-sm text-slate-700">
                        {FINANCING_REVIEW_CONTACT.advisorName} · {FINANCING_REVIEW_CONTACT.advisorTitle}
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        {FINANCING_REVIEW_CONTACT.phone} · {FINANCING_REVIEW_CONTACT.email}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {FINANCING_REVIEW_CONTACT.nmls} · {FINANCING_REVIEW_CONTACT.companyNmls}
                      </p>
                    </div>
                  </ReviewSection>

                  <p className="text-xs leading-relaxed text-slate-500">{FINANCING_REVIEW_DISCLAIMER}</p>
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/80 px-6 py-5 sm:flex-row sm:flex-wrap sm:items-center sm:px-8">
                  <StrategyCallLink ctaLocation="financing-review-viewer" />
                  <PhoneLink
                    showIcon={false}
                    label={CALL_OUR_TEAM_LABEL}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 no-underline shadow-sm hover:bg-slate-50"
                  />
                  <Button type="button" variant="ghost" size="sm" className="rounded-xl" onClick={onDownloadPdf}>
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function SummaryField({
  label,
  value,
  full = false,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/90 bg-white px-4 py-3",
        full && "sm:col-span-2",
      )}
    >
      <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-slate-900">{value}</dd>
    </div>
  );
}
