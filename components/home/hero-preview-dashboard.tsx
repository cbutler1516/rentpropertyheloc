"use client";

import { ComplianceNote } from "@/components/layout/compliance-note";
import { cn } from "@/lib/cn";
import { COMPLIANCE_TIMING } from "@/lib/cta";
import { HERO_STATS } from "@/lib/home-content";

const REVIEW_STEPS = [
  { label: "Property address", detail: "Google Places verified intake" },
  { label: "Requested funds", detail: "Your goal on file for review" },
  { label: "Licensed follow-up", detail: "Personalized financing options" },
] as const;

export function HeroPreviewDashboard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">
          Personalized review
        </p>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-teal-400/30 bg-teal-400/10 px-2.5 py-1 text-[10px] font-semibold text-teal-200">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
          ~60 seconds
        </span>
      </div>

      <ul className="mt-5 space-y-3">
        {REVIEW_STEPS.map((step, index) => (
          <li
            key={step.label}
            className="flex gap-3 rounded-xl border border-white/10 bg-navy-950/40 px-4 py-3"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-500/20 text-xs font-bold text-teal-200">
              {index + 1}
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{step.label}</p>
              <p className="mt-0.5 text-xs text-white/55">{step.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 rounded-2xl border border-white/10 bg-navy-950/30 px-4 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
          Why investors start here
        </p>
        <ul className="mt-3 space-y-0 divide-y divide-white/10">
          {HERO_STATS.map((stat) => (
            <li
              key={stat.label}
              className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <span className="text-sm text-white/60">{stat.label}</span>
              <span className="shrink-0 text-right text-sm font-semibold text-white">
                {stat.value}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <ComplianceNote className="mt-4 text-white/45">
        Not a loan application or commitment to lend. {COMPLIANCE_TIMING}
      </ComplianceNote>
    </div>
  );
}
