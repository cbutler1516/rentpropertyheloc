import { DealForm } from "../components/deal-form";
import { LeadGateForm } from "../components/lead-gate-form";
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
  const step = params.step === "lead" ? "lead" : "form";
  const initialPath = parsePath(params.path);

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
