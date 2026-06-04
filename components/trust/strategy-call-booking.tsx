"use client";

import { PlatformPhoneLink } from "@/components/trust/platform-phone-link";
import { PlatformEmailLink } from "@/components/trust/platform-email-link";
import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import { BOOK_STRATEGY_CALL_LABEL, QUESTIONS_CALL_TEAM_LABEL } from "@/lib/contact";
import { cn } from "@/lib/cn";

type StrategyCallBookingProps = {
  className?: string;
};

export function StrategyCallBooking({ className }: StrategyCallBookingProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50/90 to-white p-4 sm:p-5",
        className,
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-700">
            Prefer to talk now?
          </p>
          <h3 className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
            {BOOK_STRATEGY_CALL_LABEL}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            Walk through your rental property scenario with a financing specialist—HELOC, second
            mortgage, and other paths subject to approval.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Or <PlatformPhoneLink size="sm" className="inline font-semibold" label={QUESTIONS_CALL_TEAM_LABEL} />{" "}
            · <PlatformEmailLink size="sm" className="inline font-semibold" />
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <StrategyCallLink
            size="md"
            className="w-full sm:w-auto"
            ctaLocation="strategy-call-booking"
          />
          <p className="text-center text-[10px] text-slate-500 sm:text-right">
            Opens scheduling in a new tab
          </p>
        </div>
      </div>
    </div>
  );
}
