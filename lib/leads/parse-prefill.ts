import { isValidPropertyType } from "@/lib/leads/funnel-config";
import type {
  CreditScoreRangeId,
  EquityAccessRangeId,
  MortgageBalanceRangeId,
  PropertyValueRangeId,
} from "@/lib/leads/funnel-ranges";
import {
  computeEstimatedEquity,
  CREDIT_SCORE_RANGES,
  EQUITY_ACCESS_RANGES,
  getCreditScoreEstimate,
  getEquityAccessEstimate,
  getMortgageBalanceEstimate,
  getPropertyValueEstimate,
  inferEquityAccessRange,
  inferMortgageBalanceRange,
  inferPropertyValueRange,
  MORTGAGE_BALANCE_RANGES,
  PROPERTY_VALUE_RANGES,
} from "@/lib/leads/funnel-ranges";
import { isEquityStrategy } from "@/lib/equity-calculator";
import type { CheckOptionsPrefill, EquityStrategy, LeadFunnelData } from "@/lib/leads/types";
import { DEFAULT_FUNNEL_DATA } from "@/lib/leads/funnel-config";

function parsePositiveNumber(value: string | null): number | null {
  if (!value) return null;
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function isValidRangeId<T extends string>(value: string | null, options: { id: T }[]): value is T {
  return Boolean(value && options.some((o) => o.id === value));
}

export function parseCheckOptionsPrefill(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
): CheckOptionsPrefill {
  const get = (key: string): string | null => {
    if (params instanceof URLSearchParams) {
      return params.get(key);
    }
    const raw = params[key];
    if (Array.isArray(raw)) return raw[0] ?? null;
    return raw ?? null;
  };

  const propertyTypeRaw = get("propertyType");
  const prefill: CheckOptionsPrefill = {
    propertyValue: parsePositiveNumber(get("propertyValue")),
    mortgageBalance: parsePositiveNumber(get("mortgageBalance")),
    desiredCashAmount: parsePositiveNumber(get("desiredFunds")),
    estimatedEquity: parsePositiveNumber(get("estimatedEquity")),
  };

  if (propertyTypeRaw && isValidPropertyType(propertyTypeRaw)) {
    prefill.propertyType = propertyTypeRaw;
  }

  const equityStrategyRaw = get("equityStrategy");
  if (isEquityStrategy(equityStrategyRaw)) {
    prefill.equityStrategy = equityStrategyRaw;
  }


  const propertyValueRangeRaw = get("propertyValueRange");
  if (isValidRangeId(propertyValueRangeRaw, PROPERTY_VALUE_RANGES)) {
    prefill.propertyValueRange = propertyValueRangeRaw;
    prefill.propertyValue = getPropertyValueEstimate(propertyValueRangeRaw);
  }

  const mortgageRangeRaw = get("mortgageBalanceRange");
  if (isValidRangeId(mortgageRangeRaw, MORTGAGE_BALANCE_RANGES)) {
    prefill.mortgageBalanceRange = mortgageRangeRaw;
    prefill.mortgageBalance = getMortgageBalanceEstimate(mortgageRangeRaw);
  }

  const equityRangeRaw = get("equityAccessRange");
  if (isValidRangeId(equityRangeRaw, EQUITY_ACCESS_RANGES)) {
    prefill.equityAccessRange = equityRangeRaw;
    prefill.desiredCashAmount = getEquityAccessEstimate(equityRangeRaw);
  }

  const creditRangeRaw = get("creditScoreRange");
  if (isValidRangeId(creditRangeRaw, CREDIT_SCORE_RANGES)) {
    prefill.creditScoreRange = creditRangeRaw;
  }

  if (prefill.propertyValue != null && !prefill.propertyValueRange) {
    prefill.propertyValueRange = inferPropertyValueRange(prefill.propertyValue);
  }

  if (prefill.mortgageBalance != null && !prefill.mortgageBalanceRange) {
    prefill.mortgageBalanceRange = inferMortgageBalanceRange(prefill.mortgageBalance);
  }

  if (prefill.desiredCashAmount != null && !prefill.equityAccessRange) {
    prefill.equityAccessRange = inferEquityAccessRange(prefill.desiredCashAmount);
  }

  if (prefill.propertyValue != null && prefill.mortgageBalance != null) {
    prefill.estimatedEquity = computeEstimatedEquity(
      prefill.propertyValue,
      prefill.mortgageBalance,
    );
  }

  return prefill;
}

export function getEquityStrategyFromParams(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
): EquityStrategy {
  const get = (key: string): string | null => {
    if (params instanceof URLSearchParams) {
      return params.get(key);
    }
    const raw = params[key];
    if (Array.isArray(raw)) return raw[0] ?? null;
    return raw ?? null;
  };
  const raw = get("equityStrategy");
  return isEquityStrategy(raw) ? raw : "rental_property";
}

export function mergePrefillIntoFunnelData(prefill: CheckOptionsPrefill): LeadFunnelData {
  const propertyValue = prefill.propertyValue ?? null;
  const mortgageBalance = prefill.mortgageBalance ?? null;

  return {
    ...DEFAULT_FUNNEL_DATA,
    propertyType: prefill.propertyType ?? "",
    propertyValueRange: prefill.propertyValueRange ?? "",
    mortgageBalanceRange: prefill.mortgageBalanceRange ?? "",
    equityAccessRange: prefill.equityAccessRange ?? "",
    creditScoreRange: prefill.creditScoreRange ?? "",
    propertyValue,
    mortgageBalance,
    desiredCashAmount: prefill.desiredCashAmount ?? null,
    estimatedEquity:
      prefill.estimatedEquity ??
      (propertyValue != null && mortgageBalance != null
        ? computeEstimatedEquity(propertyValue, mortgageBalance)
        : null),
    creditScoreEstimate: prefill.creditScoreRange
      ? getCreditScoreEstimate(prefill.creditScoreRange)
      : null,
  };
}

export function getInitialFunnelStep(data: LeadFunnelData): number {
  if (
    !data.propertyStreet?.trim() ||
    !data.propertyCity?.trim() ||
    !data.propertyState?.trim() ||
    !data.propertyZip?.trim()
  ) {
    return 1;
  }
  if (!data.equityAccessRange) return 2;
  if (!data.firstName?.trim() || !data.email?.trim() || !data.tcpaConsent) return 3;
  return 1;
}

export function applyRangeSelection(
  data: LeadFunnelData,
  partial: Partial<LeadFunnelData>,
): LeadFunnelData {
  const next = { ...data, ...partial };

  if (partial.propertyValueRange) {
    next.propertyValue = getPropertyValueEstimate(partial.propertyValueRange as PropertyValueRangeId);
  }
  if (partial.mortgageBalanceRange) {
    next.mortgageBalance = getMortgageBalanceEstimate(
      partial.mortgageBalanceRange as MortgageBalanceRangeId,
    );
  }
  if (partial.equityAccessRange) {
    next.desiredCashAmount = getEquityAccessEstimate(partial.equityAccessRange as EquityAccessRangeId);
  }
  if (partial.creditScoreRange) {
    next.creditScoreEstimate = getCreditScoreEstimate(partial.creditScoreRange as CreditScoreRangeId);
  }

  if (next.propertyValue != null && next.mortgageBalance != null) {
    next.estimatedEquity = computeEstimatedEquity(next.propertyValue, next.mortgageBalance);
  }

  return next;
}

export {
  getContactFieldErrors,
  getContactSubmitBlockReason,
  getVisibleContactFieldError,
  hasContactFieldErrors,
  type ContactFieldKey,
  type ContactFieldErrors,
  type ContactTouchedFields,
} from "@/lib/leads/contact-field-validation";
