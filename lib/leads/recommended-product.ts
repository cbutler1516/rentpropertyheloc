import type { ScoredLeadCreateRequest } from "@/lib/leads/types";

export function resolveRecommendedProduct(lead: ScoredLeadCreateRequest): string {
  switch (lead.routingTier) {
    case "fast_track":
      return "Rental Property HELOC — Fast Track Priority";
    case "standard":
      return lead.secondLienFit === "strong"
        ? "Rental Property HELOC — Standard Review"
        : "Rental Property HELOC / Second Lien — Review";
    case "review":
      return "Rental Property Equity Line — Manual Review";
    case "nurture":
      return "Investor Equity Options — Nurture Sequence";
    default:
      return "Rental Property HELOC";
  }
}
