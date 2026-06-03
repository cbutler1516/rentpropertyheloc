"use client";

import { Button } from "@/components/ui/button";
import { FINANCING_REVIEW_DISCLAIMER } from "@/lib/leads/financing-review-content";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

type FinancingReviewModalProps = {
  open: boolean;
  onClose: () => void;
  onViewReview: () => void;
  onDownloadPdf: () => void;
};

export function FinancingReviewModal({
  open,
  onClose,
  onViewReview,
  onDownloadPdf,
}: FinancingReviewModalProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
            aria-label="Close dialog"
            onClick={onClose}
          />

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="financing-review-modal-title"
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-teal-200/80 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.22)]"
          >
            <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 px-6 py-7 sm:px-8">
              <p
                id="financing-review-modal-title"
                className="flex items-center gap-2 text-lg font-bold text-white sm:text-xl"
              >
                <span
                  aria-hidden
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-base"
                >
                  ✓
                </span>
                Your Review Is Complete
              </p>
            </div>

            <div className="px-6 py-6 sm:px-8">
              <p className="text-sm leading-relaxed text-slate-600">
                We&apos;ve completed a preliminary review based on the information provided.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                View your personalized financing review below.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button type="button" size="lg" className="rounded-xl sm:flex-1" onClick={onViewReview}>
                  View Financing Review
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="ghost"
                  className="rounded-xl border border-slate-200 sm:flex-1"
                  onClick={onDownloadPdf}
                >
                  Download PDF
                </Button>
              </div>

              <p className="mt-4 text-[10px] leading-relaxed text-slate-400">
                {FINANCING_REVIEW_DISCLAIMER}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
