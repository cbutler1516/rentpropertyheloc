export const PROPERTY_TYPES = [
  { id: "single-family", label: "Single-family rental" },
  { id: "duplex-triplex", label: "Duplex / triplex" },
  { id: "townhome", label: "Townhome rental" },
  { id: "multifamily", label: "Multi-family (2–4 units)" },
  { id: "str", label: "STR / Airbnb" },
] as const;

export type PropertyTypeId = (typeof PROPERTY_TYPES)[number]["id"];

export const US_STATES = [
  "AL", "AZ", "AR", "CA", "CO", "CT", "FL", "GA", "ID", "IL", "IN", "KS", "KY",
  "LA", "MD", "MA", "MI", "MN", "MO", "NV", "NJ", "NC", "OH", "OK", "OR", "PA",
  "SC", "TN", "TX", "UT", "VA", "WA", "WI",
] as const;

export type LeadFunnelData = {
  propertyType: string;
  propertyState: string;
  propertyValue: number;
  mortgageBalance: number;
  desiredFunds: number;
  monthlyRent: number;
  estimatedEquity: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export const FUNNEL_DEFAULTS: LeadFunnelData = {
  propertyType: "",
  propertyState: "",
  propertyValue: 485_000,
  mortgageBalance: 312_400,
  desiredFunds: 100_000,
  monthlyRent: 3_200,
  estimatedEquity: 124_600,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export const FUNNEL_STEP_COUNT = 8;

export type FunnelQueryParams = Partial<
  Pick<
    LeadFunnelData,
    | "propertyType"
    | "propertyState"
    | "propertyValue"
    | "mortgageBalance"
    | "desiredFunds"
    | "monthlyRent"
    | "estimatedEquity"
  > & { rentalIncome?: number }
>;

export function buildCheckOptionsUrl(params: FunnelQueryParams): string {
  const search = new URLSearchParams();
  if (params.propertyType) search.set("propertyType", params.propertyType);
  if (params.propertyState) search.set("propertyState", params.propertyState);
  if (params.propertyValue != null) search.set("propertyValue", String(params.propertyValue));
  if (params.mortgageBalance != null) search.set("mortgageBalance", String(params.mortgageBalance));
  if (params.desiredFunds != null) search.set("desiredFunds", String(params.desiredFunds));
  const rent = params.monthlyRent ?? params.rentalIncome;
  if (rent != null) {
    search.set("monthlyRent", String(rent));
    search.set("rentalIncome", String(rent));
  }
  if (params.estimatedEquity != null) search.set("estimatedEquity", String(params.estimatedEquity));
  const query = search.toString();
  return query ? `/check-options?${query}` : "/check-options";
}

export function parseFunnelPrefill(searchParams: URLSearchParams): FunnelQueryParams {
  const num = (key: string) => {
    const raw = searchParams.get(key);
    if (!raw) return undefined;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : undefined;
  };

  return {
    propertyType: searchParams.get("propertyType") ?? undefined,
    propertyState: searchParams.get("propertyState") ?? undefined,
    propertyValue: num("propertyValue"),
    mortgageBalance: num("mortgageBalance"),
    desiredFunds: num("desiredFunds"),
    monthlyRent: num("monthlyRent") ?? num("rentalIncome"),
    estimatedEquity: num("estimatedEquity"),
  };
}

export function mergeFunnelPrefill(prefill: FunnelQueryParams): LeadFunnelData {
  return {
    ...FUNNEL_DEFAULTS,
    ...prefill,
    propertyType: prefill.propertyType ?? FUNNEL_DEFAULTS.propertyType,
    propertyState: prefill.propertyState ?? FUNNEL_DEFAULTS.propertyState,
    propertyValue: prefill.propertyValue ?? FUNNEL_DEFAULTS.propertyValue,
    mortgageBalance: prefill.mortgageBalance ?? FUNNEL_DEFAULTS.mortgageBalance,
    desiredFunds: prefill.desiredFunds ?? FUNNEL_DEFAULTS.desiredFunds,
    monthlyRent: prefill.monthlyRent ?? FUNNEL_DEFAULTS.monthlyRent,
    estimatedEquity: prefill.estimatedEquity ?? FUNNEL_DEFAULTS.estimatedEquity,
  };
}
