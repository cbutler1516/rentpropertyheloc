import { DASHBOARD_DATA } from "@/lib/home-content";

/** Illustrative max LTV for estimator — not an offer or approval amount */
export const ILLUSTRATIVE_MAX_LTV = 75;

export const DASHBOARD_DEFAULTS = {
  propertyName: DASHBOARD_DATA.propertyName,
  propertyValue: DASHBOARD_DATA.propertyValue,
  mortgageBalance: DASHBOARD_DATA.mortgageBalance,
  monthlyRent: DASHBOARD_DATA.monthlyRent,
  maxLtvPercent: ILLUSTRATIVE_MAX_LTV,
} as const;

export type EquityStrategy = "rental_property" | "primary_residence";

export function isEquityStrategy(value: string | null | undefined): value is EquityStrategy {
  return value === "rental_property" || value === "primary_residence";
}

export type EquityInputs = {
  propertyValue: number;
  mortgageBalance: number;
  monthlyRent: number;
  maxLtvPercent: number;
};

export type EquityResult = {
  availableEquity: number;
  totalEquity: number;
  maxLineCapacity: number;
  utilizationPercent: number;
  statusLabel: string;
  eligibilityLabel: string;
};

export function calculateEquity(inputs: EquityInputs): EquityResult {
  const { propertyValue, mortgageBalance, monthlyRent, maxLtvPercent } = inputs;
  const safeValue = Math.max(propertyValue, 0);
  const safeMortgage = Math.min(Math.max(mortgageBalance, 0), safeValue);
  const totalEquity = Math.max(0, safeValue - safeMortgage);
  const maxLineCapacity = safeValue * (maxLtvPercent / 100);
  const availableEquity = Math.max(0, Math.round(maxLineCapacity - safeMortgage));
  const utilizationPercent =
    totalEquity > 0
      ? Math.min(100, Math.round((availableEquity / totalEquity) * 100))
      : 0;

  const statusLabel =
    availableEquity >= 50_000 && monthlyRent >= 1_200
      ? "Review ready"
      : availableEquity > 0
        ? "Estimate only"
        : "Insufficient equity";

  const eligibilityLabel =
    availableEquity > 0
      ? "Programs may be available"
      : "Programs may be available on other assets";

  return {
    availableEquity,
    totalEquity,
    maxLineCapacity,
    utilizationPercent,
    statusLabel,
    eligibilityLabel,
  };
}

export function formatUsd(value: number, compact = false) {
  if (compact && value >= 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
