import { DASHBOARD_DATA } from "@/lib/home-content";

/** Illustrative max LTV for estimator — not an offer or approval amount */
export const ILLUSTRATIVE_MAX_LTV = 75;

export const DASHBOARD_DEFAULTS = {
  propertyName: DASHBOARD_DATA.propertyName,
  propertyValue: DASHBOARD_DATA.propertyValue,
  mortgageBalance: DASHBOARD_DATA.mortgageBalance,
  monthlyRent: DASHBOARD_DATA.monthlyRent,
  maxLtvPercent: ILLUSTRATIVE_MAX_LTV,
  /** Default desired cash access for homepage equity snapshot */
  desiredAccess: 100_000,
} as const;

export type EquityStrategy = "rental_property" | "primary_residence";

export const DEFAULT_EQUITY_STRATEGY: EquityStrategy = "rental_property";

/** Illustrative combined-LTV bands — not offers or approval amounts */
const RENTAL_CLTV_LOW = 0.65;
const RENTAL_CLTV_HIGH = 0.7;
const PRIMARY_CLTV_LOW = 0.8;
const PRIMARY_CLTV_HIGH = 0.9;

export type EquitySnapshotInputs = {
  propertyValue: number;
  mortgageBalance: number;
  desiredAccess: number;
  equityStrategy?: EquityStrategy;
};

export type EquitySnapshotResult = {
  estimatedAvailableEquity: number;
  remainingEquity: number;
  helocRangeMin: number;
  helocRangeMax: number;
  equityStrategy: EquityStrategy;
  rangeLabel: string;
  rangeHint: string;
  illustrativeCltv: string;
};

export function isEquityStrategy(value: string | null | undefined): value is EquityStrategy {
  return value === "rental_property" || value === "primary_residence";
}

/** Illustrative equity snapshot — not an offer or approval amount */
export function calculateEquitySnapshot(inputs: EquitySnapshotInputs): EquitySnapshotResult {
  const strategy = inputs.equityStrategy ?? DEFAULT_EQUITY_STRATEGY;
  const safeValue = Math.max(inputs.propertyValue, 0);
  const safeMortgage = Math.min(Math.max(inputs.mortgageBalance, 0), safeValue);
  const remainingEquity = Math.max(0, Math.round(safeValue - safeMortgage));

  const isPrimary = strategy === "primary_residence";
  const cltvLow = isPrimary ? PRIMARY_CLTV_LOW : RENTAL_CLTV_LOW;
  const cltvHigh = isPrimary ? PRIMARY_CLTV_HIGH : RENTAL_CLTV_HIGH;

  const rangeLabel = isPrimary
    ? "Potential primary-residence equity range"
    : "Potential investor HELOC range";
  const rangeHint = isPrimary
    ? "Higher leverage may be available when secured by a primary residence."
    : "Rental property programs commonly use more conservative equity limits.";
  const illustrativeCltv = isPrimary ? "Up to 90% CLTV illustrative" : "~70% CLTV illustrative";

  if (remainingEquity === 0) {
    return {
      estimatedAvailableEquity: 0,
      remainingEquity: 0,
      helocRangeMin: 0,
      helocRangeMax: 0,
      equityStrategy: strategy,
      rangeLabel,
      rangeHint,
      illustrativeCltv,
    };
  }

  const rawMin = Math.max(0, Math.round(safeValue * cltvLow - safeMortgage));
  const rawMax = Math.max(0, Math.round(safeValue * cltvHigh - safeMortgage));
  const helocRangeMax = Math.min(rawMax, remainingEquity);
  const helocRangeMin = Math.min(rawMin, helocRangeMax);

  return {
    estimatedAvailableEquity: remainingEquity,
    remainingEquity,
    helocRangeMin,
    helocRangeMax,
    equityStrategy: strategy,
    rangeLabel,
    rangeHint,
    illustrativeCltv,
  };
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
