import { FUNNEL_QUESTION_COUNT } from "@/lib/leads/funnel-config";
import type { LeadFunnelData } from "@/lib/leads/types";

const TRACKED_FIELDS: (keyof LeadFunnelData)[] = ["propertyStreet", "equityAccessRange", "email"];

/** Completion % for partial funnel progress (0–100, pre-contact). */
export function computePartialCompletionPercent(
  data: LeadFunnelData,
  currentStep: number,
): number {
  const filled = TRACKED_FIELDS.filter((key) => Boolean(data[key])).length;
  const fieldPct = Math.round((filled / TRACKED_FIELDS.length) * 100);
  const stepPct = Math.round(
    (Math.min(Math.max(currentStep, 1), FUNNEL_QUESTION_COUNT) / FUNNEL_QUESTION_COUNT) * 100,
  );
  return Math.min(100, Math.max(fieldPct, stepPct));
}

export function getPartialStepLabel(step: number | undefined): string {
  if (!step || step < 1) return "Not started";
  if (step >= FUNNEL_QUESTION_COUNT) return "Contact step";
  const labels = ["Property address", "Property use", "Credit score", "Requested funds", "Contact info"];
  return labels[Math.min(step - 1, labels.length - 1)] ?? `Step ${step}`;
}
