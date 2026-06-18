import type { ScoredLeadCreateRequest } from "@/lib/leads/types";

function productPrefix(lead: ScoredLeadCreateRequest): string {
  switch (lead.propertyOccupancy) {
    case "primary_residence":
      return "Primary Residence HELOC";
    case "second_home":
      return "Second Home HELOC";
    case "rental_property":
    default:
      return "Rental Property HELOC";
  }
}

export function resolveRecommendedProduct(lead: ScoredLeadCreateRequest): string {
  const prefix = productPrefix(lead);

  switch (lead.routingTier) {
    case "fast_track":
      return `${prefix} — Fast Track Priority`;
    case "standard":
      return lead.secondLienFit === "strong"
        ? `${prefix} — Standard Review`
        : `${prefix} / Second Lien — Review`;
    case "review":
      return `${prefix} — Manual Review`;
    case "nurture":
      return lead.propertyOccupancy === "rental_property"
        ? "Investor Equity Options — Nurture Sequence"
        : "Home Equity Options — Nurture Sequence";
    default:
      return prefix;
  }
}
