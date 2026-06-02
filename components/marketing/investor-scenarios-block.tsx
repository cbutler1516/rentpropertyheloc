"use client";

import { SectionHeader } from "@/components/layout/section";
import { MotionCard } from "@/components/motion/motion-card";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { formatUsd } from "@/lib/equity-calculator";
import {
  INVESTOR_SCENARIO_EXAMPLES,
  SCENARIO_DISCLAIMER,
} from "@/lib/marketing/content";
import { cn } from "@/lib/cn";
import Link from "next/link";

type InvestorScenariosBlockProps = {
  compact?: boolean;
  showViewAll?: boolean;
  className?: string;
};

export function InvestorScenariosBlock({
  compact = false,
  showViewAll = true,
  className,
}: InvestorScenariosBlockProps) {
  return (
    <div className={className}>
      <Reveal>
        <div className={compact ? "mb-6" : undefined}>
          <SectionHeader
            tone="light"
            eyebrow="Scenarios"
            title="Example investor scenarios"
            description="Hypothetical rental equity snapshots—illustrative only, not approval amounts or offers."
          />
        </div>
      </Reveal>

      <p className="mb-5 rounded-xl border border-amber-200/80 bg-amber-50/70 px-4 py-3 text-[11px] leading-relaxed text-amber-950 sm:text-xs">
        {SCENARIO_DISCLAIMER}
      </p>

      <StaggerReveal
        className={cn(
          "grid gap-4",
          compact ? "sm:grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3 lg:gap-5",
        )}
      >
        {INVESTOR_SCENARIO_EXAMPLES.map((scenario) => (
          <StaggerItem key={scenario.id}>
            <MotionCard>
              <Card className={cn("card-surface h-full", compact ? "p-4" : "p-5")}>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900">{scenario.label}</h3>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    Illustrative
                  </span>
                </div>

                <dl className="mt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Property value</dt>
                    <dd className="font-semibold tabular-nums text-slate-900">
                      {formatUsd(scenario.propertyValue)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Existing loan</dt>
                    <dd className="font-semibold tabular-nums text-slate-900">
                      {formatUsd(scenario.existingLoan)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3 border-t border-slate-100 pt-2.5">
                    <dt className="text-slate-500">Potential equity access</dt>
                    <dd className="text-right text-sm font-semibold text-teal-800">
                      {scenario.equityAccessLabel}
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 rounded-lg bg-slate-50 px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    Use case
                  </p>
                  <p className="mt-0.5 text-sm text-slate-700">{scenario.useCase}</p>
                </div>
              </Card>
            </MotionCard>
          </StaggerItem>
        ))}
      </StaggerReveal>

      {showViewAll ? (
        <Reveal delay={0.08} className="mt-6 flex justify-center">
          <Link
            href="/scenarios"
            className="text-sm font-semibold text-teal-700 underline-offset-4 hover:underline"
          >
            View full scenario library →
          </Link>
        </Reveal>
      ) : null}
    </div>
  );
}
