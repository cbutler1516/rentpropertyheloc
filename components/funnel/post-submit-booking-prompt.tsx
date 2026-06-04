import { PlatformPhoneLink } from "@/components/trust/platform-phone-link";
import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import { QUESTIONS_CALL_TEAM_LABEL } from "@/lib/contact";

export function PostSubmitBookingPrompt() {
  return (
    <div className="mb-5 rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 py-3 sm:px-5">
      <p className="text-sm leading-relaxed text-slate-600">
        Need help sooner?{" "}
        <PlatformPhoneLink
          size="sm"
          className="text-sm"
          label={QUESTIONS_CALL_TEAM_LABEL}
        />{" "}
        or{" "}
        <StrategyCallLink
          variant="inline"
          className="text-sm"
          ctaLocation="post-submit-booking-prompt"
        />
      </p>
    </div>
  );
}
