"use client";

import { PhoneLink } from "@/components/trust/phone-link";
import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import { AdvisorImage } from "@/components/trust/advisor-image";
import { ADVISOR } from "@/lib/trust-content";
import { cn } from "@/lib/cn";

type AdvisorTrustStripProps = {
  className?: string;
};

export function AdvisorTrustStrip({ className }: AdvisorTrustStripProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/90 bg-slate-50/80 px-4 py-3",
        className,
      )}
    >
      <div className="flex items-center gap-3.5">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-200 ring-2 ring-teal-100/90 sm:h-14 sm:w-14">
          <AdvisorImage variant="avatar" sizes="56px" />
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm font-semibold leading-tight text-slate-900">{ADVISOR.name}</p>
          <p className="text-xs leading-snug text-slate-600">{ADVISOR.titleLine}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 pt-0.5 text-xs">
            <StrategyCallLink
              variant="inline"
              className="text-xs"
              ctaLocation="advisor-trust-strip"
            />
            <PhoneLink size="sm" showIcon={false} className="font-semibold leading-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

