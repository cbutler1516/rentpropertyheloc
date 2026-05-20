import { isLeadMagnetType } from "./lead-magnet-types";
import {
  LEAD_MAGNET_SECTION_KEYS,
  type LeadMagnetOutputs,
  type LeadMagnetRecord,
} from "./types";

export function parseLeadMagnetSections(raw: unknown): LeadMagnetOutputs | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const sections = {} as LeadMagnetOutputs;
  for (const key of LEAD_MAGNET_SECTION_KEYS) {
    const value = record[key];
    if (typeof value !== "string" || !value.trim()) return null;
    sections[key] = value.trim();
  }
  return sections;
}

export function parseLeadMagnetResponse(
  raw: unknown,
  type: string,
): LeadMagnetRecord | null {
  if (!isLeadMagnetType(type)) return null;
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;

  const sections =
    record.sections && typeof record.sections === "object"
      ? parseLeadMagnetSections(record.sections)
      : parseLeadMagnetSections(record);

  if (!sections) return null;

  return {
    type,
    sections,
    generatedAt: new Date().toISOString(),
    modelUsed: "gpt-4o-mini",
  };
}
