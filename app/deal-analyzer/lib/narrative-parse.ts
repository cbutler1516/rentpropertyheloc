import type { PlaybookNarrative } from "./narrative-types";

const NARRATIVE_KEYS = [
  "executiveSummary",
  "recommendedStrategy",
  "coachNotes",
  "risks",
  "opportunities",
  "nextSteps",
  "clientFriendlyExplanation",
  "agentShareMessage",
] as const;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean)
    .slice(0, 8);
}

export function isCompleteNarrative(raw: unknown): raw is PlaybookNarrative {
  if (!raw || typeof raw !== "object") return false;
  const o = raw as Record<string, unknown>;
  return NARRATIVE_KEYS.every((key) => {
    if (key === "coachNotes" || key === "risks" || key === "opportunities" || key === "nextSteps") {
      return asStringArray(o[key]).length >= 1;
    }
    return asString(o[key]).length > 0;
  });
}

/** Legacy v1/v2 shape */
export function isLegacyNarrative(raw: unknown): boolean {
  if (!raw || typeof raw !== "object") return false;
  const o = raw as Record<string, unknown>;
  return (
    typeof o.recommendedStrategy === "string" &&
    (typeof o.coachNotes === "string" || Array.isArray(o.coachNotes)) &&
    Array.isArray(o.risks)
  );
}

export function parseAiNarrative(raw: unknown): PlaybookNarrative | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;

  const coachNotes = Array.isArray(o.coachNotes)
    ? asStringArray(o.coachNotes)
    : asString(o.coachNotes)
      ? [asString(o.coachNotes)]
      : [];

  const narrative: PlaybookNarrative = {
    executiveSummary: asString(o.executiveSummary),
    recommendedStrategy: asString(o.recommendedStrategy),
    coachNotes,
    risks: asStringArray(o.risks),
    opportunities: asStringArray(o.opportunities),
    nextSteps: asStringArray(o.nextSteps),
    clientFriendlyExplanation: asString(o.clientFriendlyExplanation),
    agentShareMessage: asString(o.agentShareMessage),
    source: "ai",
  };

  return isCompleteNarrative(narrative) ? narrative : null;
}

export function upgradeLegacyNarrative(
  legacy: Record<string, unknown>,
  staticFallback: PlaybookNarrative,
): PlaybookNarrative {
  const coachNotes = Array.isArray(legacy.coachNotes)
    ? asStringArray(legacy.coachNotes)
    : asString(legacy.coachNotes)
      ? [asString(legacy.coachNotes)]
      : staticFallback.coachNotes;

  return {
    ...staticFallback,
    recommendedStrategy:
      asString(legacy.recommendedStrategy) || staticFallback.recommendedStrategy,
    coachNotes: coachNotes.length ? coachNotes : staticFallback.coachNotes,
    risks: asStringArray(legacy.risks).length
      ? asStringArray(legacy.risks)
      : staticFallback.risks,
    opportunities: asStringArray(legacy.opportunities).length
      ? asStringArray(legacy.opportunities)
      : staticFallback.opportunities,
    source: "static",
  };
}
