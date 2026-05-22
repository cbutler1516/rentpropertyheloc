"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { trackDealAnalyzerEvent, trackDealAnalyzerEventOnce } from "../lib/analytics/track-client";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Select } from "@/app/components/ui/select";
import { defaultFormValues, dealPathMeta } from "../lib/constants";
import type { BuydownType, DealInputs, DealPath } from "../lib/types";
import { useDealAnalyzer } from "./deal-analyzer-provider";
import { useDealAnalyzerBasePath } from "./partner-agent-provider";
import { NumberField } from "./form-field";
import { PathSelector } from "./path-selector";

function buildInputs(path: DealPath, values: typeof defaultFormValues): DealInputs {
  const base = {
    path,
    propertyValue: values.propertyValue,
    interestRate: values.interestRate,
    loanTermYears: values.loanTermYears,
    annualPropertyTax: values.annualPropertyTax,
    annualInsurance: values.annualInsurance,
    monthlyHoa: values.monthlyHoa,
  };

  switch (path) {
    case "buy-home":
      return {
        ...base,
        path: "buy-home",
        downPaymentPercent: values.downPaymentPercent,
        sellerConcession: values.sellerConcession,
        buydownType: values.buydownType,
      };
    case "refinance":
      return {
        ...base,
        path: "refinance",
        currentBalance: values.currentBalance,
        currentRate: values.currentRate,
        cashOutAmount: values.cashOutAmount,
        estimatedClosingCosts: values.estimatedClosingCosts,
      };
    case "investor-dscr":
      return {
        ...base,
        path: "investor-dscr",
        downPaymentPercent: values.downPaymentPercent,
        monthlyRent: values.monthlyRent,
        vacancyRate: values.vacancyRate,
        monthlyManagement: values.monthlyManagement,
        monthlyMaintenance: values.monthlyMaintenance,
      };
    case "commercial":
      return {
        ...base,
        path: "commercial",
        downPaymentPercent: values.downPaymentPercent,
        annualNoi: values.annualNoi,
        annualOtherIncome: values.annualOtherIncome,
        annualOperatingExpenses: values.annualOperatingExpenses,
      };
  }
}

export function DealForm({ initialPath }: { initialPath?: DealPath }) {
  const router = useRouter();
  const basePath = useDealAnalyzerBasePath();
  const { setInputs } = useDealAnalyzer();
  const [path, setPath] = useState<DealPath>(initialPath ?? "buy-home");
  const [values, setValues] = useState(defaultFormValues);

  const meta = dealPathMeta[path];

  useEffect(() => {
    trackDealAnalyzerEventOnce("analyzer_started", {
      eventName: "analyzer_started",
    });
  }, []);

  useEffect(() => {
    if (initialPath) {
      trackDealAnalyzerEventOnce(`path:url:${initialPath}`, {
        eventName: "path_selected",
        dealType: initialPath,
        metadata: { source: "url" },
      });
    }
  }, [initialPath]);

  const update = <K extends keyof typeof defaultFormValues>(
    key: K,
    value: (typeof defaultFormValues)[K],
  ) => setValues((prev) => ({ ...prev, [key]: value }));

  const preview = useMemo(() => buildInputs(path, values), [path, values]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setInputs(preview);
    router.push(`${basePath}/analyze?step=preview`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <section className="space-y-4">
        <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
          Step 1 — Choose your path
        </p>
        <PathSelector
          selected={path}
          onSelect={(next) => {
            setPath(next);
            trackDealAnalyzerEvent({
              eventName: "path_selected",
              dealType: next,
            });
          }}
        />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>{meta.label} details</CardTitle>
          <CardDescription>
            Enter your scenario. All figures are illustrative for strategy framing.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <NumberField
            label="Property value"
            prefix="$"
            value={values.propertyValue}
            onChange={(v) => update("propertyValue", v)}
          />
          <NumberField
            label="Interest rate"
            value={values.interestRate}
            step={0.125}
            onChange={(v) => update("interestRate", v)}
            hint="Annual rate %"
          />
          <NumberField
            label="Loan term (years)"
            value={values.loanTermYears}
            onChange={(v) => update("loanTermYears", v)}
          />
          <NumberField
            label="Annual property tax"
            prefix="$"
            value={values.annualPropertyTax}
            onChange={(v) => update("annualPropertyTax", v)}
          />
          <NumberField
            label="Annual insurance"
            prefix="$"
            value={values.annualInsurance}
            onChange={(v) => update("annualInsurance", v)}
          />
          <NumberField
            label="Monthly HOA"
            prefix="$"
            value={values.monthlyHoa}
            onChange={(v) => update("monthlyHoa", v)}
          />

          {path === "buy-home" && (
            <>
              <NumberField
                label="Down payment %"
                value={values.downPaymentPercent}
                step={1}
                onChange={(v) => update("downPaymentPercent", v)}
              />
              <NumberField
                label="Seller concession"
                prefix="$"
                value={values.sellerConcession}
                onChange={(v) => update("sellerConcession", v)}
              />
              <div className="space-y-2 md:col-span-2">
                <label className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
                  Buydown type
                </label>
                <Select
                  value={values.buydownType}
                  onChange={(e) =>
                    update("buydownType", e.target.value as BuydownType)
                  }
                >
                  <option value="none">None</option>
                  <option value="2-1">2-1 buydown</option>
                  <option value="1-0">1-0 buydown</option>
                </Select>
              </div>
            </>
          )}

          {path === "refinance" && (
            <>
              <NumberField
                label="Current loan balance"
                prefix="$"
                value={values.currentBalance}
                onChange={(v) => update("currentBalance", v)}
              />
              <NumberField
                label="Current rate %"
                value={values.currentRate}
                step={0.125}
                onChange={(v) => update("currentRate", v)}
              />
              <NumberField
                label="Cash-out amount"
                prefix="$"
                value={values.cashOutAmount}
                onChange={(v) => update("cashOutAmount", v)}
              />
              <NumberField
                label="Estimated closing costs"
                prefix="$"
                value={values.estimatedClosingCosts}
                onChange={(v) => update("estimatedClosingCosts", v)}
              />
            </>
          )}

          {(path === "investor-dscr" || path === "commercial") && (
            <NumberField
              label="Down payment %"
              value={values.downPaymentPercent}
              onChange={(v) => update("downPaymentPercent", v)}
            />
          )}

          {path === "investor-dscr" && (
            <>
              <NumberField
                label="Monthly rent"
                prefix="$"
                value={values.monthlyRent}
                onChange={(v) => update("monthlyRent", v)}
              />
              <NumberField
                label="Vacancy rate %"
                value={values.vacancyRate}
                onChange={(v) => update("vacancyRate", v)}
              />
              <NumberField
                label="Monthly management"
                prefix="$"
                value={values.monthlyManagement}
                onChange={(v) => update("monthlyManagement", v)}
              />
              <NumberField
                label="Monthly maintenance reserve"
                prefix="$"
                value={values.monthlyMaintenance}
                onChange={(v) => update("monthlyMaintenance", v)}
              />
            </>
          )}

          {path === "commercial" && (
            <>
              <NumberField
                label="Annual NOI"
                prefix="$"
                value={values.annualNoi}
                onChange={(v) => update("annualNoi", v)}
              />
              <NumberField
                label="Other annual income"
                prefix="$"
                value={values.annualOtherIncome}
                onChange={(v) => update("annualOtherIncome", v)}
              />
              <NumberField
                label="Annual operating expenses"
                prefix="$"
                value={values.annualOperatingExpenses}
                onChange={(v) => update("annualOperatingExpenses", v)}
              />
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-zinc-500">
          Next: preview your Playbook Report, then unlock full numbers with contact
          info.
        </p>
        <Button type="submit" variant="gold" size="lg">
          Preview Playbook Report
        </Button>
      </div>
    </form>
  );
}
