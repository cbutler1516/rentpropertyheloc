"use client";

import { DealAnalyzerShell } from "@/components/deal-analyzer/deal-analyzer-shell";
import { DealInputForm } from "@/components/deal-analyzer/deal-input-form";
import { LocalTestBanner } from "@/components/deal-analyzer/local-test-banner";
import { PathSelection } from "@/components/deal-analyzer/path-selection";
import { StickySummaryPanel } from "@/components/deal-analyzer/sticky-summary-panel";
import { analyzeDeal } from "@/lib/deal-analyzer/analyze";
import { getDefaultInputs } from "@/lib/deal-analyzer/field-config";
import { saveDealAnalyzerSession } from "@/lib/deal-analyzer/session";
import type { DealType } from "@/lib/deal-analyzer/types";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export function AnalyzePageContent() {
  const router = useRouter();
  const [dealType, setDealType] = useState<DealType | null>(null);
  const [inputs, setInputs] = useState<Record<string, number | string | boolean>>({});

  const activeType = dealType ?? "buy-home";
  const analysis = useMemo(() => {
    if (!dealType) return null;
    return analyzeDeal(dealType, inputs);
  }, [dealType, inputs]);

  function handleSelectType(type: DealType) {
    setDealType(type);
    setInputs(getDefaultInputs(type));
  }

  function handleContinue() {
    if (!dealType || !analysis) return;
    saveDealAnalyzerSession({
      dealType,
      inputs,
      analysis,
      createdAt: new Date().toISOString(),
    });
    router.push("/deal-analyzer/preview");
  }

  return (
    <DealAnalyzerShell
      step={1}
      title="Build your scenario"
      subtitle="Choose a financing path and enter your numbers. Estimates are educational only."
    >
      <LocalTestBanner />
      <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-slate-900">1. Choose your path</h2>
            <div className="mt-4">
              <PathSelection selected={dealType} onSelect={handleSelectType} />
            </div>
          </section>

          {dealType ? (
            <section>
              <h2 className="text-lg font-semibold text-slate-900">2. Enter deal details</h2>
              <div className="mt-4">
                <DealInputForm
                  dealType={dealType}
                  values={inputs}
                  onChange={(key, value) => setInputs((prev) => ({ ...prev, [key]: value }))}
                />
              </div>
              <button
                type="button"
                onClick={handleContinue}
                className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-teal-700 px-8 text-sm font-semibold text-white transition hover:bg-teal-800"
              >
                Preview Playbook Report
              </button>
            </section>
          ) : null}
        </div>

        <StickySummaryPanel analysis={analysis} />
      </div>
    </DealAnalyzerShell>
  );
}
