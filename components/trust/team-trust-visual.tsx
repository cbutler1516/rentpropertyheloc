import { RequestReviewDashboard } from "@/components/trust/request-review-dashboard";
import { TEAM_TRUST_IMAGE_ALT } from "@/lib/trust-content";
import { cn } from "@/lib/cn";

type TeamTrustVisualProps = {
  className?: string;
  frameClassName?: string;
  priority?: boolean;
  sizes?: string;
  compact?: boolean;
};

export function TeamTrustVisual({
  className,
  frameClassName,
  compact = false,
}: TeamTrustVisualProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden shadow-md ring-1 ring-slate-900/10",
        compact ? "rounded-xl" : "rounded-2xl lg:rounded-none lg:rounded-r-2xl",
        frameClassName,
        className,
      )}
      role="img"
      aria-label={TEAM_TRUST_IMAGE_ALT}
    >
      <RequestReviewDashboard
        variant={compact ? "compact" : "full"}
        className={cn(compact ? "min-h-[160px]" : "min-h-[240px] lg:min-h-full")}
      />
    </div>
  );
}
