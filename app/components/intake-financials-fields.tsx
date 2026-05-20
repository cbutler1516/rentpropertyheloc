"use client";

import { useId, useState } from "react";
import {
  calculateLoanAmountDigits,
  formatCurrencyDisplay,
  parseCurrencyDigits,
  parsePercentInput,
} from "../lib/intake-currency";

const fieldClass =
  "input-glow h-14 w-full border border-zinc-800 bg-[#050505] px-5 text-white transition-all duration-[var(--duration-hover)] placeholder:text-zinc-600 outline-none focus:border-[#7c3aed]/60";

export type FinancialsValues = {
  purchasePrice: string;
  downPaymentPercent: string;
  loanAmount: string;
};

type IntakeFinancialsFieldsProps = {
  idPrefix: string;
  values: FinancialsValues;
  onChange: (values: FinancialsValues) => void;
};

export function IntakeFinancialsFields({
  idPrefix,
  values,
  onChange,
}: IntakeFinancialsFieldsProps) {
  const baseId = useId();
  const [loanAutoEstimated, setLoanAutoEstimated] = useState(false);

  function apply(next: FinancialsValues, source: "purchase" | "down" | "loan") {
    if (source === "loan") {
      setLoanAutoEstimated(false);
      onChange(next);
      return;
    }

    const purchaseDigits = parseCurrencyDigits(next.purchasePrice);
    const downRaw = parsePercentInput(next.downPaymentPercent);

    if (purchaseDigits && downRaw) {
      const loanDigits = calculateLoanAmountDigits(
        purchaseDigits,
        next.downPaymentPercent,
      );
      setLoanAutoEstimated(Boolean(loanDigits));
      onChange({
        ...next,
        loanAmount: loanDigits ? formatCurrencyDisplay(loanDigits) : next.loanAmount,
      });
      return;
    }

    setLoanAutoEstimated(false);
    onChange(next);
  }

  function handlePurchaseChange(raw: string) {
    const digits = parseCurrencyDigits(raw);
    apply(
      {
        ...values,
        purchasePrice: formatCurrencyDisplay(digits),
      },
      "purchase",
    );
  }

  function handleDownPaymentChange(raw: string) {
    apply(
      {
        ...values,
        downPaymentPercent: parsePercentInput(raw),
      },
      "down",
    );
  }

  function handleLoanChange(raw: string) {
    const digits = parseCurrencyDigits(raw);
    apply(
      {
        ...values,
        loanAmount: formatCurrencyDisplay(digits),
      },
      "loan",
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <CurrencyField
        id={`${idPrefix}-${baseId}-price`}
        label="Estimated Purchase Price"
        value={values.purchasePrice}
        placeholder="750,000"
        onChange={handlePurchaseChange}
      />
      <PercentField
        id={`${idPrefix}-${baseId}-down`}
        label="Down Payment %"
        value={values.downPaymentPercent}
        placeholder="20"
        onChange={handleDownPaymentChange}
      />
      <div>
        <CurrencyField
          id={`${idPrefix}-${baseId}-loan`}
          label="Estimated Loan Amount"
          value={values.loanAmount}
          placeholder="600,000"
          onChange={handleLoanChange}
        />
        {loanAutoEstimated ? (
          <p className="mt-2 text-xs leading-relaxed text-zinc-600">
            Auto-estimated from purchase price and down payment.
          </p>
        ) : null}
      </div>
    </div>
  );
}

function CurrencyField({
  id,
  label,
  value,
  placeholder,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (raw: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase"
      >
        {label}
      </label>
      <div className="relative">
        <span
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 font-mono text-sm text-zinc-500"
          aria-hidden
        >
          $
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${fieldClass} pl-8`}
        />
      </div>
    </div>
  );
}

function PercentField({
  id,
  label,
  value,
  placeholder,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (raw: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${fieldClass} pr-8`}
        />
        <span
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 font-mono text-sm text-zinc-500"
          aria-hidden
        >
          %
        </span>
      </div>
    </div>
  );
}
