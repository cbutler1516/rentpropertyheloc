import {
  type CreditScoreRangeId,
  type EquityAccessRangeId,
} from "@/lib/leads/funnel-ranges";

export function getStepEncouragement(
  stepId: string,
  context: {
    equityAccessRange?: EquityAccessRangeId | "";
    creditScoreRange?: CreditScoreRangeId | "";
  },
): string | null {
  if (stepId === "requested-funds") {
    if (
      context.equityAccessRange === "100k-250k" ||
      context.equityAccessRange === "250k-500k" ||
      context.equityAccessRange === "500k-plus" ||
      context.equityAccessRange === "500k-750k" ||
      context.equityAccessRange === "750k-1m" ||
      context.equityAccessRange === "1m-plus"
    ) {
      return "Popular for portfolio growth";
    }
    return null;
  }

  return null;
}

export function getMilestoneMomentumMessage(step: number, totalSteps: number): string {
  if (step <= 1) return "Great start.";
  if (step >= totalSteps) return "Final step.";
  if (step === totalSteps - 1) return "You're almost there.";
  return `Step ${step} of ${totalSteps}`;
}

export function getStepUnlockMessage(completedStep: number): string | null {
  switch (completedStep) {
    case 1:
      return "Property saved — how much would you like to access?";
    case 2:
      return "Amount saved — one step left.";
    default:
      return null;
  }
}

export function getLateFlowInsight(_context: {
  propertyValue: number | null;
  mortgageBalance: number | null;
  desiredCashAmount: number | null;
}): string | null {
  return null;
}
