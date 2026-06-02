import type { EquityStrategy } from "@/lib/equity-calculator";

export type PartialLeadRecord = {
  id: string;
  sessionId: string;
  status: "partial";
  funnelVersion: string;
  propertyType?: string;
  propertyValue?: number;
  mortgageBalance?: number;
  desiredCashAmount?: number;
  creditScoreRange?: string;
  equityStrategy?: EquityStrategy;
  propertyValueRange?: string;
  mortgageBalanceRange?: string;
  equityAccessRange?: string;
  currentStep?: number;
  journey?: string;
  source?: string;
  sourceUrl?: string;
  utm?: Record<string, string>;
  completionPercent?: number;
  abandonedAtStep?: number;
  isAbandoned?: boolean;
  updatedAt: string;
  createdAt: string;
};

export type PartialLeadUpsertInput = {
  sessionId: string;
  funnelVersion: string;
  propertyType?: string;
  propertyValue?: number | null;
  mortgageBalance?: number | null;
  desiredCashAmount?: number | null;
  creditScoreRange?: string;
  equityStrategy?: EquityStrategy;
  propertyValueRange?: string;
  mortgageBalanceRange?: string;
  equityAccessRange?: string;
  currentStep?: number;
  journey?: string;
  sourceUrl?: string;
  utm?: Record<string, string>;
  queryParams?: Record<string, string>;
  completionPercent?: number;
  abandonedAtStep?: number;
  isAbandoned?: boolean;
};
