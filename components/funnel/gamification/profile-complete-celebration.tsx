"use client";

import { PersonalizedReviewCompletion } from "@/components/funnel/personalized-review-completion";
import type { FinancingReviewData } from "@/lib/leads/financing-review-document";
import { cn } from "@/lib/cn";

type ProfileCompleteCelebrationProps = {
  snapshotData: FinancingReviewData;
  className?: string;
};

/** @deprecated Use PersonalizedReviewCompletion directly */
export function ProfileCompleteCelebration({
  snapshotData,
  className,
}: ProfileCompleteCelebrationProps) {
  return (
    <div className={cn(className)}>
      <PersonalizedReviewCompletion data={snapshotData} embedded open />
    </div>
  );
}
