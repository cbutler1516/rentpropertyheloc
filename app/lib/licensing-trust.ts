import { licensedStates } from "./licensing";

const featuredStateNames = [
  "Washington",
  "Arizona",
  "California",
  "Texas",
  "Florida",
] as const;

export const licensingTrustShort =
  `Licensed in multiple states including ${featuredStateNames.join(", ")}, and more.`;

export const licensingTrustDetail =
  "Mortgage strategy and education through The Loan Playbook. Loan availability, licensing, and program eligibility vary by state and borrower scenario.";

export function isStateLicensed(stateName: string) {
  return licensedStates.some(
    (state) => state.name.toLowerCase() === stateName.toLowerCase(),
  );
}

export function getLicensedStateAbbreviation(stateName: string) {
  return licensedStates.find(
    (state) => state.name.toLowerCase() === stateName.toLowerCase(),
  )?.abbreviation;
}
