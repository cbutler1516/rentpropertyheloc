"use client";

import { cn } from "@/lib/utils";
import type { CampaignBuildStepState } from "../lib/campaign-template-build";

type CampaignBuildProgressProps = {
  steps: CampaignBuildStepState[];
  active?: boolean;
};

export function CampaignBuildProgress({
  steps,
  active = false,
}: CampaignBuildProgressProps) {
  if (!active && steps.every((s) => s.status === "pending")) return null;

  return (
    <div className="rounded-xl border border-[#7c3aed]/30 bg-[#7c3aed]/10 p-4">
      <p className="font-mono text-[9px] tracking-[0.2em] text-[#c4b5fd] uppercase">
        Campaign build progress
      </p>
      <ul className="mt-3 space-y-2">
        {steps.map((step) => (
          <li
            key={step.id}
            className="flex items-start justify-between gap-3 text-sm"
          >
            <div className="flex items-center gap-2">
              <StepIcon status={step.status} />
              <span
                className={cn(
                  step.status === "done"
                    ? "text-zinc-200"
                    : step.status === "running"
                      ? "text-[#e9d5ff]"
                      : step.status === "error"
                        ? "text-red-300"
                        : "text-zinc-500",
                )}
              >
                {step.label}
              </span>
            </div>
            {step.message && (
              <span className="max-w-[50%] truncate text-right text-[10px] text-zinc-500">
                {step.message}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepIcon({ status }: { status: CampaignBuildStepState["status"] }) {
  if (status === "done") {
    return (
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/30 text-[10px] text-emerald-200">
        ✓
      </span>
    );
  }
  if (status === "running") {
    return (
      <span className="flex h-4 w-4 items-center justify-center">
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#7c3aed] border-t-transparent" />
      </span>
    );
  }
  if (status === "error") {
    return (
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500/30 text-[10px] text-red-200">
        !
      </span>
    );
  }
  return (
    <span className="flex h-4 w-4 items-center justify-center rounded-full border border-zinc-600 text-[8px] text-zinc-600">
      ·
    </span>
  );
}
