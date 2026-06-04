import {
  calculateEquitySnapshot,
  formatUsd,
  type EquitySnapshotResult,
} from "@/lib/equity-calculator";

export type InvestorScenarioInput = {
  id: string;
  title: string;
  propertyType: string;
  propertyValue: number;
  existingLoan: number;
  useCase: string;
  summary: string;
  relatedPath?: string;
};

export type InvestorScenario = InvestorScenarioInput & {
  estimatedEquity: number;
  helocRangeMin: number;
  helocRangeMax: number;
  helocRangeLabel: string;
  snapshot: EquitySnapshotResult;
};

const SCENARIO_INPUTS: InvestorScenarioInput[] = [
  {
    id: "rental-equity-access",
    title: "Accessing equity from a rental",
    propertyType: "Single-family rental",
    propertyValue: 485_000,
    existingLoan: 312_400,
    useCase:
      "Draw selectively for reserves, maintenance, or a value-add scope without replacing the existing first mortgage.",
    summary:
      "A stabilized long-term rental with meaningful equity behind the first lien—typical of investors who want revolving access rather than a full refinance.",
    relatedPath: "/rental-property-heloc",
  },
  {
    id: "down-payment-bridge",
    title: "Using equity for a down payment",
    propertyType: "Townhome rental",
    propertyValue: 395_000,
    existingLoan: 248_000,
    useCase:
      "Bridge down payment and closing costs on the next acquisition while permanent financing is lined up.",
    summary:
      "Investors often tap non-owner-occupied equity to fund the next purchase without selling a cash-flowing asset.",
    relatedPath: "/use-equity-to-buy-another-rental",
  },
  {
    id: "brrrr-example",
    title: "BRRRR investor example",
    propertyType: "Single-family rental (value-add)",
    propertyValue: 320_000,
    existingLoan: 256_000,
    useCase:
      "Finance rehab draws during the hold period, then recycle capital after stabilization or refinance.",
    summary:
      "Illustrative buy-rehab-rent-refinance path where a second-position line supports renovation before permanent exit.",
    relatedPath: "/heloc-on-investment-property",
  },
  {
    id: "condo-investor",
    title: "Condo investor example",
    propertyType: "Condo · non-owner-occupied",
    propertyValue: 275_000,
    existingLoan: 178_500,
    useCase:
      "Maintain liquidity for HOA assessments, turnover costs, or a down payment on a second condo unit.",
    summary:
      "Condos may qualify under investor programs when occupancy, HOA, and lender guidelines align—subject to approval.",
    relatedPath: "/condo-investor-heloc",
  },
  {
    id: "duplex-example",
    title: "Duplex example",
    propertyType: "Duplex · 2-unit rental",
    propertyValue: 520_000,
    existingLoan: 341_000,
    useCase:
      "Fund unit turnover, roof reserves, or acquisition earnest money across a small multi-family portfolio.",
    summary:
      "Two-unit collateral with rental income from both sides—often reviewed with combined loan-to-value and cash-flow documentation.",
    relatedPath: "/2-4-unit-rental-heloc",
  },
  {
    id: "four-plex-example",
    title: "4-plex example",
    propertyType: "Fourplex · 4-unit rental",
    propertyValue: 780_000,
    existingLoan: 512_000,
    useCase:
      "Access equity for portfolio reserves, a value-add scope on one unit, or bridge capital for a larger multifamily deal.",
    summary:
      "Small multifamily investors may explore second-position lines when equity and rental performance support the file.",
    relatedPath: "/2-4-unit-rental-heloc",
  },
];

function enrichScenario(input: InvestorScenarioInput): InvestorScenario {
  const snapshot = calculateEquitySnapshot({
    propertyValue: input.propertyValue,
    mortgageBalance: input.existingLoan,
    desiredAccess: 0,
    equityStrategy: "rental_property",
  });

  const helocRangeLabel =
    snapshot.helocRangeMax > 0
      ? `${formatUsd(snapshot.helocRangeMin)}–${formatUsd(snapshot.helocRangeMax)} illustrative`
      : "Insufficient equity for illustrative range";

  return {
    ...input,
    estimatedEquity: snapshot.remainingEquity,
    helocRangeMin: snapshot.helocRangeMin,
    helocRangeMax: snapshot.helocRangeMax,
    helocRangeLabel,
    snapshot,
  };
}

export const INVESTOR_SCENARIOS: InvestorScenario[] = SCENARIO_INPUTS.map(enrichScenario);

export const SCENARIO_LIBRARY_DISCLAIMER =
  "All scenarios on this page are illustrative examples for educational purposes only. Property values, loan balances, equity estimates, and potential line ranges are hypothetical and not based on any actual borrower, property, or transaction. They do not constitute an offer, commitment to lend, guarantee of terms, or financial advice. Actual amounts depend on appraisal, credit, income or cash-flow review, lien position, occupancy, and lender guidelines.";
