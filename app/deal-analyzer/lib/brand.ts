export const PLAYBOOK_BRAND = {
  siteName: "The Loan Playbook",
  lendingPartner: "Broadview Lending",
  lendingPartnerFull: "Broadview Lending · Powered by Barrett Financial Group",
  strategist: "Chris Butler",
} as const;

export const PDF_DISCLAIMER =
  "Estimates are for educational purposes only and are not a loan estimate, commitment to lend, or guarantee of approval or terms. Programs, rates, and eligibility vary. Confirm all figures with a licensed loan advisor before making financial decisions.";

export function formatReportDate(iso?: string): string {
  if (!iso) {
    return new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
