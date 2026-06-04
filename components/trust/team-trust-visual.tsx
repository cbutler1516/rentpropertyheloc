import { RequestReviewDashboard } from "@/components/trust/request-review-dashboard";
import { getReviewProcessAriaLabel, type ReviewProcessPhase } from "@/lib/trust/review-process";
import { cn } from "@/lib/cn";

type TeamTrustVisualProps = {
  className?: string;
  frameClassName?: string;
  priority?: boolean;
  sizes?: string;
  compact?: boolean;
  prominent?: boolean;
  phase?: ReviewProcessPhase;
  funnelStep?: number;
};

export function TeamTrustVisual({
  className,
  frameClassName,
  compact = false,
  prominent = false,
  phase = "intro",
  funnelStep = 1,
}: TeamTrustVisualProps) {
  const dashboardVariant = compact ? "compact" : prominent ? "prominent" : "full";

  return (
    <div
      className={cn(
        "relative overflow-hidden shadow-md ring-1 ring-slate-900/10",
        compact ? "rounded-xl" : prominent ? "rounded-2xl lg:rounded-none lg:rounded-l-2xl" : "rounded-2xl lg:rounded-none lg:rounded-l-2xl",
        frameClassName,
        className,
      )}
      role="img"
      aria-label={getReviewProcessAriaLabel(phase)}
    >
      <RequestReviewDashboard
        phase={phase}
        funnelStep={funnelStep}
        variant={dashboardVariant}
        className={cn(
          compact ? "min-h-[160px]" : prominent ? "min-h-[300px] sm:min-h-[340px] lg:min-h-full" : "min-h-[240px] lg:min-h-full",
        )}
      />
    </div>
  );
}
