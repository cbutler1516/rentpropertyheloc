"use client";

import {
  downPaymentRangeOptions,
  purchasePriceRangeOptions,
} from "../lib/strategy-intake";

export type FinancialRangeValues = {
  purchasePriceRange: string;
  downPaymentRange: string;
};

type IntakeFinancialRangesProps = {
  values: FinancialRangeValues;
  pendingValue?: string | null;
  disabled?: boolean;
  onSelectPurchase: (value: string) => void;
  onSelectDownPayment: (value: string) => void;
};

function RangeGrid({
  label,
  options,
  value,
  pendingValue,
  disabled,
  onSelect,
}: {
  label: string;
  options: readonly string[];
  value: string;
  pendingValue?: string | null;
  disabled?: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
        {label}
      </legend>
      <ul className="grid gap-2 sm:grid-cols-2" role="listbox" aria-label={label}>
        {options.map((option) => {
          const selected = value === option || pendingValue === option;
          return (
            <li key={option} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={selected}
                disabled={disabled}
                onClick={() => onSelect(option)}
                className={`w-full border px-4 py-3 text-left text-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
                  selected
                    ? "intake-option-selected"
                    : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                {option}
              </button>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

export function IntakeFinancialRanges({
  values,
  pendingValue,
  disabled,
  onSelectPurchase,
  onSelectDownPayment,
}: IntakeFinancialRangesProps) {
  return (
    <div className="space-y-8">
      <RangeGrid
        label="Estimated purchase price"
        options={purchasePriceRangeOptions}
        value={values.purchasePriceRange}
        pendingValue={pendingValue}
        disabled={disabled}
        onSelect={onSelectPurchase}
      />
      <RangeGrid
        label="Down payment / equity"
        options={downPaymentRangeOptions}
        value={values.downPaymentRange}
        disabled={disabled}
        onSelect={onSelectDownPayment}
      />
    </div>
  );
}
