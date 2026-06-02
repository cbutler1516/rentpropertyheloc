"use client";

import { cn } from "@/lib/cn";
import { formatUsd } from "@/lib/equity-calculator";
import { useEffect, useState } from "react";

type FunnelCurrencyInputProps = {
  id: string;
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  hint?: string;
  required?: boolean;
};

export function FunnelCurrencyInput({
  id,
  label,
  value,
  onChange,
  hint,
  required,
}: FunnelCurrencyInputProps) {
  const [display, setDisplay] = useState(value != null ? String(value) : "");

  useEffect(() => {
    setDisplay(value != null ? String(value) : "");
  }, [value]);

  function handleChange(raw: string) {
    const digits = raw.replace(/[^\d]/g, "");
    setDisplay(digits);
    if (!digits) {
      onChange(null);
      return;
    }
    const parsed = Number(digits);
    if (Number.isFinite(parsed)) onChange(parsed);
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-900">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base font-medium text-slate-400">
          $
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          required={required}
          value={display}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="0"
          className={cn(
            "h-12 w-full rounded-xl border border-slate-200 bg-white pl-8 pr-4 text-base font-semibold tabular-nums text-slate-900",
            "placeholder:text-slate-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20",
          )}
        />
      </div>
      {value != null && value > 0 ? (
        <p className="text-xs text-teal-700">{formatUsd(value)}</p>
      ) : null}
      {hint ? <p className="text-xs leading-relaxed text-slate-500">{hint}</p> : null}
    </div>
  );
}
