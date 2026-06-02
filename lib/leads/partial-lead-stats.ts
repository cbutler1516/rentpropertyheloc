import type { PartialLeadRecord } from "@/lib/leads/partial-lead-types";

export type PartialLeadStats = {
  total: number;
  abandoned: number;
  inProgress: number;
  averageCompletionPercent: number;
  byStep: Record<string, number>;
};

export function computePartialLeadStats(partials: PartialLeadRecord[]): PartialLeadStats {
  const byStep: Record<string, number> = {};
  let completionSum = 0;
  let completionCount = 0;
  let abandoned = 0;

  for (const row of partials) {
    if (row.isAbandoned) abandoned += 1;

    const stepKey = row.abandonedAtStep
      ? `Abandoned @ step ${row.abandonedAtStep}`
      : row.currentStep
        ? `Step ${row.currentStep}`
        : "Unknown";

    byStep[stepKey] = (byStep[stepKey] ?? 0) + 1;

    if (row.completionPercent != null) {
      completionSum += row.completionPercent;
      completionCount += 1;
    }
  }

  return {
    total: partials.length,
    abandoned,
    inProgress: partials.length - abandoned,
    averageCompletionPercent:
      completionCount > 0 ? Math.round(completionSum / completionCount) : 0,
    byStep,
  };
}
