import { StrategyCallLink } from "@/components/trust/strategy-call-link";

export function PostSubmitBookingPrompt() {
  return (
    <div className="mb-5 rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 py-3 sm:px-5">
      <p className="text-sm leading-relaxed text-slate-600">
        Need help sooner?{" "}
        <StrategyCallLink
          variant="inline"
          className="text-sm"
          ctaLocation="post-submit-booking-prompt"
        />
      </p>
    </div>
  );
}
