"use client";

import { MilestonePath } from "@/components/funnel/gamification/milestone-path";
import { getReviewMilestones } from "@/lib/leads/investor-review-gamification";
import { cn } from "@/lib/cn";

type InvestorReviewProgressProps = {
  className?: string;
  showPriority?: boolean;
  enrichmentComplete?: boolean;
  variant?: "horizontal" | "vertical";
};

export function InvestorReviewProgress({
  className,
  showPriority = false,
  enrichmentComplete = false,
  variant = "horizontal",
}: InvestorReviewProgressProps) {
  const milestones = getReviewMilestones({ showPriority, enrichmentComplete });

  return (
    <MilestonePath
      milestones={milestones}
      className={cn(className)}
      variant={variant}
    />
  );
}
