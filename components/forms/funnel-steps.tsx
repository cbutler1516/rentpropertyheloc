"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export const FUNNEL_GHOST =
  "text-navy-950 hover:bg-slate-100 hover:text-navy-950 focus-visible:outline-accent";

export const FUNNEL_SECONDARY =
  "mt-6 w-full border border-slate-200 bg-slate-50 text-navy-950 hover:border-accent/30 hover:bg-slate-100";

export function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function StepShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-navy-950 sm:text-2xl">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

export function OptionButton({
  children,
  selected,
  onClick,
}: {
  children: ReactNode;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-[52px] rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        selected
          ? "border-accent bg-cyan-50 text-navy-950 shadow-sm"
          : "border-slate-200 bg-white text-navy-950 hover:border-accent/40 hover:bg-slate-50",
      )}
    >
      {children}
    </button>
  );
}

export function MoneyStep({
  title,
  subtitle,
  value,
  onChange,
  onBack,
  onNext,
  hint,
  suffix,
  min = 0,
  max,
}: {
  title: string;
  subtitle: string;
  value: number;
  onChange: (v: number) => void;
  onBack: () => void;
  onNext: () => void;
  hint?: string;
  suffix?: string;
  min?: number;
  max?: number;
}) {
  const display = suffix ? `${formatUsd(value)}${suffix}` : formatUsd(value);

  return (
    <StepShell title={title} subtitle={subtitle}>
      <div className="space-y-3">
        <Label htmlFor="money">Amount</Label>
        <Input
          id="money"
          type="number"
          min={min}
          max={max}
          step={1000}
          className="text-lg font-semibold tabular-nums sm:text-xl"
          value={value || ""}
          onChange={(e) => {
            let next = Number(e.target.value) || 0;
            if (max != null) next = Math.min(next, max);
            if (min != null) next = Math.max(next, min);
            onChange(next);
          }}
        />
        <p className="text-sm font-medium text-slate-600">{display}</p>
        {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
      </div>
      <StepNav onBack={onBack} onNext={onNext} nextDisabled={value <= 0} />
    </StepShell>
  );
}

export function StepNav({
  onBack,
  onNext,
  nextDisabled,
}: {
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
}) {
  return (
    <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-between">
      <Button type="button" variant="ghost" size="lg" className={FUNNEL_GHOST} onClick={onBack}>
        Back
      </Button>
      <Button
        type="button"
        size="lg"
        className="min-h-[48px] flex-1 sm:flex-none sm:px-10"
        onClick={onNext}
        disabled={nextDisabled}
      >
        Continue
      </Button>
    </div>
  );
}

export function TrustBullets() {
  return (
    <ul className="rounded-xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-600">
      <li>Programs may be available for qualifying rental properties.</li>
      <li>Not a commitment to lend. Subject to approval.</li>
      <li>Funding possible in as little as 7 days when documentation is complete.</li>
    </ul>
  );
}
