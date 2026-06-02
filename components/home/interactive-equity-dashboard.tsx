"use client";

import { RangeField } from "@/components/ui/range-field";
import { CtaLink } from "@/components/ui/cta-link";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import {
  calculateEquity,
  DASHBOARD_DEFAULTS,
  formatUsd,
  ILLUSTRATIVE_MAX_LTV,
} from "@/lib/equity-calculator";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export function InteractiveEquityDashboard() {
  const reduceMotion = useReducedMotion();
  const [propertyValue, setPropertyValue] = useState<number>(DASHBOARD_DEFAULTS.propertyValue);
  const [mortgageBalance, setMortgageBalance] = useState<number>(DASHBOARD_DEFAULTS.mortgageBalance);
  const [monthlyRent, setMonthlyRent] = useState<number>(DASHBOARD_DEFAULTS.monthlyRent);
  const [maxLtvPercent, setMaxLtvPercent] = useState<number>(DASHBOARD_DEFAULTS.maxLtvPercent);

  useEffect(() => {
    if (mortgageBalance > propertyValue) {
      setMortgageBalance(propertyValue);
    }
  }, [propertyValue, mortgageBalance]);

  const safeMortgage = Math.min(mortgageBalance, propertyValue);

  const result = useMemo(
    () =>
      calculateEquity({
        propertyValue,
        mortgageBalance: safeMortgage,
        monthlyRent,
        maxLtvPercent,
      }),
    [propertyValue, safeMortgage, monthlyRent, maxLtvPercent],
  );

  const Bar = reduceMotion ? "div" : motion.div;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/15 bg-white shadow-[0_32px_100px_rgba(0,0,0,0.45)]">
      <div className="border-b border-slate-200/80 bg-slate-50 px-5 py-4 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Property</p>
            <p className="text-lg font-semibold text-navy-950">
              {DASHBOARD_DEFAULTS.propertyName}
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {result.statusLabel}
          </span>
        </div>
      </div>

      <div className="grid gap-8 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:p-8">
        <div className="space-y-6 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5">
          <div>
            <p className="text-sm font-semibold text-navy-950">Adjust your scenario</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Illustrative estimator only. Available equity may be available on qualifying
              rentals—subject to approval. Not a commitment to lend.
            </p>
          </div>

          <RangeField
            id="propertyValue"
            label="Property value"
            value={propertyValue}
            min={150_000}
            max={2_000_000}
            step={5_000}
            displayValue={formatUsd(propertyValue)}
            onChange={setPropertyValue}
          />
          <RangeField
            id="mortgageBalance"
            label="Mortgage balance"
            value={safeMortgage}
            min={0}
            max={propertyValue}
            step={5_000}
            displayValue={formatUsd(safeMortgage)}
            onChange={setMortgageBalance}
          />
          <RangeField
            id="monthlyRent"
            label="Monthly rental income"
            value={monthlyRent}
            min={500}
            max={15_000}
            step={100}
            displayValue={`${formatUsd(monthlyRent)}/mo`}
            onChange={setMonthlyRent}
            hint="Income supports underwriting context—not a guarantee of approval."
          />
          <RangeField
            id="maxLtv"
            label="Illustrative max LTV"
            value={maxLtvPercent}
            min={60}
            max={80}
            step={1}
            displayValue={`${maxLtvPercent}%`}
            onChange={setMaxLtvPercent}
            hint={`Default illustrative cap ${ILLUSTRATIVE_MAX_LTV}%—actual programs vary.`}
          />
        </div>

        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricTile label="Property value" value={formatUsd(propertyValue)} />
            <MetricTile label="Mortgage balance" value={formatUsd(safeMortgage)} />
            <MetricTile
              label="Est. available equity"
              value={formatUsd(result.availableEquity)}
              highlight
              sub="May be available · subject to approval"
            />
            <MetricTile
              label="Rental income"
              value={`${formatUsd(monthlyRent)}/mo`}
            />
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-navy-950">Equity utilization</p>
              <p className="text-sm font-bold tabular-nums text-accent">
                {result.utilizationPercent}%
              </p>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
              <Bar
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-bright"
                {...(reduceMotion
                  ? { style: { width: `${result.utilizationPercent}%` } }
                  : {
                      initial: { width: 0 },
                      animate: { width: `${result.utilizationPercent}%` },
                      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                    })}
              />
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Illustrative capacity of {formatUsd(result.maxLineCapacity)} at {maxLtvPercent}% LTV
              minus lien— not an offer or approval amount.
            </p>
          </div>

          <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-navy-950 to-navy-900 p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-bright">
              Eligibility snapshot
            </p>
            <p className="mt-3 text-lg font-semibold">{result.eligibilityLabel}</p>
            <p className="mt-2 text-sm text-white/65">
              Funding possible in as little as 7 days may be available when documentation is
              complete. Subject to approval.
            </p>
            <CtaLink href={PRIMARY_CTA_HREF} size="md" className="mt-5 w-full">
              {PRIMARY_CTA_LABEL}
            </CtaLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricTile({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        highlight
          ? "rounded-xl border border-accent/30 bg-accent/5 p-4"
          : "rounded-xl border border-slate-200/60 bg-white p-4"
      }
    >
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-bold tabular-nums text-navy-950">{value}</p>
      {sub ? <p className="mt-1 text-xs text-slate-500">{sub}</p> : null}
    </div>
  );
}
