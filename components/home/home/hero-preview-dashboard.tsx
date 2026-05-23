"use client";

import { ComplianceNote } from "@/components/layout/compliance-note";
import { cn } from "@/lib/cn";
import { COMPLIANCE_TIMING } from "@/lib/cta";
import { HERO_STATS } from "@/lib/home-content";
import {
  calculateEquity,
  DASHBOARD_DEFAULTS,
  formatUsd,
} from "@/lib/equity-calculator";

export function HeroPreviewDashboard({ className }: { className?: string }) {
  const result = calculateEquity({
    propertyValue: DASHBOARD_DEFAULTS.propertyValue,
    mortgageBalance: DASHBOARD_DEFAULTS.mortgageBalance,
    monthlyRent: DASHBOARD_DEFAULTS.monthlyRent,
    maxLtvPercent: DASHBOARD_DEFAULTS.maxLtvPercent,
  });

  const previewMetrics = [
    { label: "Available equity", value: formatUsd(result.availableEquity, true) },
    { label: "Rental income", value: `${formatUsd(DASHBOARD_DEFAULTS.monthlyRent, true)}/mo` },
    { label: "Status", value: result.statusLabel },
  ] as const;

  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">
          Portfolio preview
        </p>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {result.statusLabel}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {previewMetrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-white/10 bg-navy-950/40 px-4 py-3"
          >
            <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">
              {metric.label}
            </p>
            <p className="mt-1 text-base font-semibold tabular-nums text-white sm:text-lg">
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-navy-950/30 px-4 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
          At a glance
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
        Illustrative only—not an offer. {COMPLIANCE_TIMING}
      </ComplianceNote>
    </div>
  );
}
