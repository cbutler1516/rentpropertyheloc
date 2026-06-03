export type OwnershipTypeId = "personal" | "llc-entity" | "not-sure";

export const OWNERSHIP_TYPE_OPTIONS: { id: OwnershipTypeId; label: string }[] = [
  { id: "personal", label: "Personal name" },
  { id: "llc-entity", label: "LLC / entity" },
  { id: "not-sure", label: "Not sure" },
];

export function isValidOwnershipType(value: string): value is OwnershipTypeId {
  return OWNERSHIP_TYPE_OPTIONS.some((option) => option.id === value);
}

export function getOwnershipTypeLabel(id: OwnershipTypeId | ""): string {
  if (!id) return "Not specified";
  return OWNERSHIP_TYPE_OPTIONS.find((option) => option.id === id)?.label ?? id;
}
