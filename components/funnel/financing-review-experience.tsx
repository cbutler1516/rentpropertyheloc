"use client";

import { PersonalizedReviewCompletion } from "@/components/funnel/personalized-review-completion";
import type { FinancingReviewData } from "@/lib/leads/financing-review-document";
import { printFinancingReviewPdf } from "@/lib/leads/financing-review-document";
import { useCallback, useEffect, useRef, useState } from "react";

export function useFinancingReviewActions(
  reviewData: FinancingReviewData,
  autoShowCompletion = false,
) {
  const [completionOpen, setCompletionOpen] = useState(false);
  const autoOpenedRef = useRef(false);

  const downloadPdf = useCallback(() => printFinancingReviewPdf(reviewData), [reviewData]);
  const openCompletion = useCallback(() => setCompletionOpen(true), []);
  const closeCompletion = useCallback(() => setCompletionOpen(false), []);

  useEffect(() => {
    if (!autoShowCompletion || autoOpenedRef.current) return;
    autoOpenedRef.current = true;
    setCompletionOpen(true);
  }, [autoShowCompletion]);

  const experience = (
    <PersonalizedReviewCompletion
      data={reviewData}
      open={completionOpen}
      onClose={closeCompletion}
    />
  );

  return { experience, openCompletion, closeCompletion, downloadPdf, completionOpen };
}
