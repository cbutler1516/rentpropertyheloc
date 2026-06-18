import type { DealType } from "@/lib/deal-analyzer/types";

export type FieldConfig = {
  key: string;
  label: string;
  type: "number" | "text";
  placeholder?: string;
  defaultValue?: number | string;
  step?: string;
};

export const DEAL_INPUT_FIELDS: Record<DealType, FieldConfig[]> = {
  "buy-home": [
    { key: "purchasePrice", label: "Purchase price", type: "number", defaultValue: 550000 },
    { key: "downPayment", label: "Down payment", type: "number", defaultValue: 110000 },
    { key: "interestRate", label: "Interest rate (%)", type: "number", defaultValue: 6.5, step: "0.01" },
    { key: "loanTermYears", label: "Loan term (years)", type: "number", defaultValue: 30 },
    { key: "monthlyTaxes", label: "Monthly taxes", type: "number", defaultValue: 450 },
    { key: "monthlyInsurance", label: "Monthly insurance", type: "number", defaultValue: 125 },
    { key: "sellerConcession", label: "Seller concession ($)", type: "number", defaultValue: 0 },
    { key: "buydownRate", label: "Buydown rate (%)", type: "number", defaultValue: 6.25, step: "0.01" },
  ],
  refinance: [
    { key: "currentBalance", label: "Current loan balance", type: "number", defaultValue: 380000 },
    { key: "currentRate", label: "Current rate (%)", type: "number", defaultValue: 7.25, step: "0.01" },
    { key: "remainingTermYears", label: "Remaining term (years)", type: "number", defaultValue: 28 },
    { key: "newRate", label: "New rate (%)", type: "number", defaultValue: 6.25, step: "0.01" },
    { key: "newTermYears", label: "New term (years)", type: "number", defaultValue: 30 },
    { key: "closingCosts", label: "Closing costs", type: "number", defaultValue: 6000 },
    { key: "propertyValue", label: "Property value", type: "number", defaultValue: 520000 },
    { key: "cashOutAmount", label: "Cash-out amount (optional)", type: "number", defaultValue: 0 },
    { key: "helocRate", label: "HELOC rate (%)", type: "number", defaultValue: 8, step: "0.01" },
    { key: "cashOutRate", label: "Cash-out rate (%)", type: "number", defaultValue: 6.5, step: "0.01" },
  ],
  "investor-dscr": [
    { key: "propertyValue", label: "Property value", type: "number", defaultValue: 425000 },
    { key: "downPayment", label: "Down payment", type: "number", defaultValue: 85000 },
    { key: "monthlyRent", label: "Monthly rent", type: "number", defaultValue: 3200 },
    { key: "monthlyExpenses", label: "Monthly expenses", type: "number", defaultValue: 650 },
    { key: "interestRate", label: "Interest rate (%)", type: "number", defaultValue: 7.5, step: "0.01" },
    { key: "loanTermYears", label: "Loan term (years)", type: "number", defaultValue: 30 },
  ],
  commercial: [
    { key: "propertyValue", label: "Property value", type: "number", defaultValue: 1200000 },
    { key: "downPayment", label: "Down payment", type: "number", defaultValue: 300000 },
    { key: "annualNOI", label: "Annual NOI", type: "number", defaultValue: 96000 },
    { key: "interestRate", label: "Interest rate (%)", type: "number", defaultValue: 7.25, step: "0.01" },
    { key: "loanTermYears", label: "Loan term (years)", type: "number", defaultValue: 25 },
  ],
};

export function getDefaultInputs(dealType: DealType): Record<string, number | string> {
  const fields = DEAL_INPUT_FIELDS[dealType];
  const inputs: Record<string, number | string> = {};
  for (const field of fields) {
    if (field.defaultValue !== undefined) inputs[field.key] = field.defaultValue;
  }
  return inputs;
}
