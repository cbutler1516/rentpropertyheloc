import { DealForm } from "./deal-form";
import { LeadGateForm } from "./lead-gate-form";
import { PreviewReportGate } from "./preview-report-gate";
import type { DealPath } from "../lib/types";

const validPaths: DealPath[] = [
  "buy-home",
  "refinance",
  "investor-dscr",
  "commercial",
];

function parsePath(value: string | undefined): DealPath | undefined {
  if (value && validPaths.includes(value as DealPath)) {
    return value as DealPath;
  }
  return undefined;
}

export function DealAnalyzerAnalyzeView({
  step,
  path,
}: {
  step?: string;
  path?: string;
}) {
  const resolvedStep =
    step === "lead" ? "lead" : step === "preview" ? "preview" : "form";
  const initialPath = parsePath(path);

  if (resolvedStep === "preview") {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <PreviewReportGate />
      </div>
    );
  }

  if (resolvedStep === "lead") {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
            Deal Analyzer
          </p>
          <h1 className="mt-2 text-3xl font-medium text-white">
            Unlock Playbook Report
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Step 3 — Contact info & consent to view your full numbers and strategy.
          </p>
        </div>
        <LeadGateForm />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
          Deal Analyzer
        </p>
        <h1 className="mt-2 text-3xl font-medium text-white">Build your scenario</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Select a path and enter deal details. Your Playbook Report generates on submit.
        </p>
      </div>
      <DealForm initialPath={initialPath} />
    </div>
  );
}
