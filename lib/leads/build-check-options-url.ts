import type { CheckOptionsPrefill, PropertyTypeId } from "@/lib/leads/types";

function appendPrefillQuery(base: string, input: CheckOptionsPrefill): string {
  const params = new URLSearchParams();

  if (input.propertyType) params.set("propertyType", input.propertyType);
  if (input.propertyValueRange) params.set("propertyValueRange", input.propertyValueRange);
  if (input.mortgageBalanceRange) params.set("mortgageBalanceRange", input.mortgageBalanceRange);
  if (input.equityAccessRange) params.set("equityAccessRange", input.equityAccessRange);
  if (input.creditScoreRange) params.set("creditScoreRange", input.creditScoreRange);
  if (input.propertyValue != null) params.set("propertyValue", String(input.propertyValue));
  if (input.mortgageBalance != null) params.set("mortgageBalance", String(input.mortgageBalance));
  if (input.desiredCashAmount != null) params.set("desiredFunds", String(input.desiredCashAmount));
  if (input.estimatedEquity != null) params.set("estimatedEquity", String(input.estimatedEquity));
  if (input.equityStrategy) params.set("equityStrategy", input.equityStrategy);

  const query = params.toString();
  return query ? `${base}?${query}` : base;
}

export function buildCheckOptionsUrl(input: CheckOptionsPrefill = {}): string {
  return appendPrefillQuery("/check-options", input);
}

export function buildPropertyTypeFunnelUrl(propertyType: PropertyTypeId): string {
  return buildCheckOptionsUrl({ propertyType });
}

/** @deprecated Journey URLs redirect to unified funnel — use buildCheckOptionsUrl */
export function buildJourneyUrl(
  _slug: string,
  input: CheckOptionsPrefill = {},
): string {
  return buildCheckOptionsUrl(input);
}
