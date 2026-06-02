"use client";

import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { COMPLIANCE_TIMING } from "@/lib/cta";
import { FUNDING_TIMELINE_STEPS } from "@/lib/marketing/content";
import { cn } from "@/lib/cn";

type FundingTimelineBlockProps = {
  compact?: boolean;
  className?: string;
};

export function FundingTimelineBlock({ compact = false, className }: FundingTimelineBlockProps) {
  return (
    <div className={className}>
      <Reveal>
        <div className={cn("mb-6 max-w-2xl", compact ? "mx-auto text-center" : "text-left")}>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 sm:text-xs">
            Timeline
          </p>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            What to expect
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Typical path from online review to equity access—timelines vary by property and documentation.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <Card className={cn("card-surface", compact ? "p-4 sm:p-5" : "p-5 sm:p-6")}>
          <ol className="space-y-4">
            {FUNDING_TIMELINE_STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-3 sm:gap-4">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-800"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 sm:text-base">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-5 border-t border-slate-100 pt-4 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
            {COMPLIANCE_TIMING} Subject to approval—not a commitment to lend or guarantee of funding
            speed.
          </p>
        </Card>
      </Reveal>
    </div>
  );
}
