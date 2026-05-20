import { DealForm } from "../components/deal-form";
import { LeadGateForm } from "../components/lead-gate-form";
import { PreviewReportGate } from "../components/preview-report-gate";
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

export default async function DealAnalyzerAnalyzePage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string; step?: string }>;
}) {
  const params = await searchParams;
  const step =
    params.step === "lead"
      ? "lead"
      : params.step === "preview"
        ? "preview"
        : "form";
  const initialPath = parsePath(params.path);

  if (step === "preview") {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <PreviewReportGate />
      </div>
    );
  }

  if (step === "lead") {
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
