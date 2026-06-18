import type { EquityStrategy } from "@/lib/leads/types";

export type PropertyOccupancyId = "primary_residence" | "rental_property" | "second_home";

export type LeadCategory =
  | "owner_occupied_heloc"
  | "investor_heloc"
  | "second_home_heloc";

export const PROPERTY_OCCUPANCY_OPTIONS: {
  id: PropertyOccupancyId;
  label: string;
  description: string;
}[] = [
  {
    id: "primary_residence",
    label: "Primary Residence",
    description: "The home you live in most of the time",
  },
  {
    id: "rental_property",
    label: "Rental Property",
    description: "An investment or income-producing property",
  },
  {
    id: "second_home",
    label: "Second Home / Vacation Home",
    description: "A secondary residence you own but do not rent full-time",
  },
];

export function isPropertyOccupancyId(value: string): value is PropertyOccupancyId {
  return PROPERTY_OCCUPANCY_OPTIONS.some((option) => option.id === value);
}

export function resolveLeadCategory(
  occupancy: PropertyOccupancyId | "",
): LeadCategory | "" {
  switch (occupancy) {
    case "primary_residence":
      return "owner_occupied_heloc";
    case "rental_property":
      return "investor_heloc";
    case "second_home":
      return "second_home_heloc";
    default:
      return "";
  }
}

export function getPropertyOccupancyLabel(occupancy: PropertyOccupancyId | ""): string {
  if (!occupancy) return "";
  return PROPERTY_OCCUPANCY_OPTIONS.find((option) => option.id === occupancy)?.label ?? "";
}

export function getPostSubmitReviewHeadline(occupancy: PropertyOccupancyId | ""): string {
  switch (occupancy) {
    case "primary_residence":
      return "Your home equity review has started.";
    case "rental_property":
      return "Your investor equity review has started.";
    case "second_home":
      return "Your second-home equity review has started.";
    default:
      return "Your equity review has started.";
  }
}

export function mapEquityStrategyToOccupancy(
  strategy: EquityStrategy | undefined,
): PropertyOccupancyId | "" {
  if (strategy === "primary_residence") return "primary_residence";
  if (strategy === "rental_property") return "rental_property";
  return "";
}

export function mapOccupancyToEquityStrategy(
  occupancy: PropertyOccupancyId | "",
): EquityStrategy | undefined {
  if (occupancy === "primary_residence") return "primary_residence";
  if (occupancy === "rental_property") return "rental_property";
  return undefined;
}
