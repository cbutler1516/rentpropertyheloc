import {
  DEFAULT_BRAND_VOICE_ID,
  isBrandVoiceId,
} from "./brand-voices";
import type { ContentEnginePackageRow } from "./database.types";
import {
  CAMPAIGN_OUTPUT_TAB_KEYS,
  OUTPUT_TAB_KEYS,
  type CampaignOutputs,
  type ContentOutputs,
  type ContentPackage,
  type GenerationMode,
} from "./types";

export function rowToPackage(row: ContentEnginePackageRow): ContentPackage {
  const generationMode = normalizeGenerationMode(row.generation_mode);
  const parsed = parseOutputsJson(row.outputs_json, generationMode);

  return {
    id: row.id,
    createdAt: row.created_at,
    title: row.title,
    sourceInput: row.source_input,
    audience: normalizeAudience(row.audience),
    tone: row.tone,
    topic: row.topic,
    modelUsed: row.model_used,
    brandVoiceId: normalizeBrandVoiceId(row.brand_voice_id),
    generationMode,
    outputs: parsed.single,
    campaignOutputs:
      generationMode === "campaign" ? parsed.campaign : undefined,
    tags: row.tags ?? [],
  };
}

export function packageToRow(
  pkg: ContentPackage,
): Omit<ContentEnginePackageRow, "created_at"> & { created_at?: string } {
  const outputs_json =
    pkg.generationMode === "campaign" && pkg.campaignOutputs
      ? (pkg.campaignOutputs as unknown as ContentEnginePackageRow["outputs_json"])
      : (pkg.outputs as unknown as ContentEnginePackageRow["outputs_json"]);

  return {
    id: pkg.id,
    created_at: pkg.createdAt,
    title: pkg.title,
    source_input: pkg.sourceInput,
    audience: pkg.audience,
    tone: pkg.tone,
    topic: pkg.topic,
    model_used: pkg.modelUsed,
    brand_voice_id: pkg.brandVoiceId,
    generation_mode: pkg.generationMode,
    outputs_json,
    tags: pkg.tags,
  };
}

export function serializeOutputsForStorage(pkg: {
  generationMode: GenerationMode;
  outputs: ContentOutputs;
  campaignOutputs?: CampaignOutputs;
}): ContentEnginePackageRow["outputs_json"] {
  if (pkg.generationMode === "campaign" && pkg.campaignOutputs) {
    return pkg.campaignOutputs as unknown as ContentEnginePackageRow["outputs_json"];
  }
  return pkg.outputs as unknown as ContentEnginePackageRow["outputs_json"];
}

function parseOutputsJson(
  raw: unknown,
  generationMode: GenerationMode,
): { single: ContentOutputs; campaign?: CampaignOutputs } {
  const record =
    raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};

  const single = {} as ContentOutputs;
  for (const key of OUTPUT_TAB_KEYS) {
    const value = record[key];
    single[key] = typeof value === "string" ? value : "";
  }

  if (generationMode !== "campaign") {
    return { single };
  }

  const campaign = {} as CampaignOutputs;
  for (const key of CAMPAIGN_OUTPUT_TAB_KEYS) {
    const value = record[key];
    campaign[key] = typeof value === "string" ? value : "";
  }

  return { single, campaign };
}

function normalizeAudience(value: string): ContentPackage["audience"] {
  const allowed = ["buyer", "homeowner", "agent", "commercial", "general"];
  return allowed.includes(value)
    ? (value as ContentPackage["audience"])
    : "general";
}

function normalizeGenerationMode(value: string): GenerationMode {
  return value === "campaign" ? "campaign" : "single";
}

function normalizeBrandVoiceId(value: string): ContentPackage["brandVoiceId"] {
  return isBrandVoiceId(value) ? value : DEFAULT_BRAND_VOICE_ID;
}

/** Migrate legacy localStorage rows. */
export function normalizeLegacyPackage(raw: unknown): ContentPackage | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const id = typeof record.id === "string" ? record.id : null;
  const sourceInput =
    typeof record.sourceInput === "string" ? record.sourceInput : "";
  if (!id || !sourceInput) return null;

  const createdAt =
    typeof record.createdAt === "string"
      ? record.createdAt
      : new Date().toISOString();

  const generationMode = normalizeGenerationMode(
    typeof record.generationMode === "string" ? record.generationMode : "single",
  );

  const parsed = parseOutputsJson(record.outputs, generationMode);
  const campaignRaw = record.campaignOutputs;
  if (generationMode === "campaign" && campaignRaw && typeof campaignRaw === "object") {
    for (const key of CAMPAIGN_OUTPUT_TAB_KEYS) {
      const value = (campaignRaw as Record<string, unknown>)[key];
      if (typeof value === "string") parsed.campaign![key] = value;
    }
  }

  const mode = record.mode === "ai" ? "ai" : "demo";
  const modelUsed =
    typeof record.modelUsed === "string"
      ? record.modelUsed
      : mode === "ai"
        ? "gpt-4o-mini"
        : "demo";

  return {
    id,
    createdAt,
    title: typeof record.title === "string" ? record.title : "Untitled package",
    sourceInput,
    audience: normalizeAudience(
      typeof record.audience === "string" ? record.audience : "general",
    ),
    tone: typeof record.tone === "string" ? record.tone : "strategic",
    topic: typeof record.topic === "string" ? record.topic : "Mortgage strategy",
    modelUsed,
    brandVoiceId: normalizeBrandVoiceId(
      typeof record.brandVoiceId === "string" ? record.brandVoiceId : DEFAULT_BRAND_VOICE_ID,
    ),
    generationMode,
    outputs: parsed.single,
    campaignOutputs: parsed.campaign,
    tags: Array.isArray(record.tags)
      ? record.tags.filter((t): t is string => typeof t === "string")
      : [],
  };
}
