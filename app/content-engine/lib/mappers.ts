import {
  DEFAULT_BRAND_VOICE_ID,
  isBrandVoiceId,
} from "./brand-voices";
import type { ContentEnginePackageRow } from "./database.types";
import { isLandingPageIntent } from "./landing-page-intents";
import {
  CALENDAR_AUDIENCE_LENSES,
  CALENDAR_DAY_COUNT,
  CALENDAR_DAY_STATUSES,
  CALENDAR_PLATFORMS,
  CAMPAIGN_OUTPUT_TAB_KEYS,
  LANDING_PAGE_SECTION_KEYS,
  OUTPUT_TAB_KEYS,
  type CalendarDayEntry,
  type CampaignOutputs,
  type ContentCalendarRecord,
  type ContentOutputs,
  type ContentPackage,
  type GenerationMode,
  type LandingPageOutputs,
  type LandingPageRecord,
} from "./types";

/** Avoid angle-bracket generics so Turbopack does not parse this file as JSX. */
type UnknownRecord = { [key: string]: unknown };

type PackageRowInsert = {
  [K in keyof ContentEnginePackageRow as K extends "created_at"
    ? never
    : K]: ContentEnginePackageRow[K];
} & { created_at?: string };

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
    landingPage: parseLandingPageJson(row.landing_page_json),
    calendar: parseCalendarJson(row.calendar_json),
    tags: row.tags ?? [],
  };
}

export function packageToRow(pkg: ContentPackage): PackageRowInsert {
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
    landing_page_json: pkg.landingPage
      ? (pkg.landingPage as unknown as ContentEnginePackageRow["landing_page_json"])
      : null,
    calendar_json: pkg.calendar
      ? (pkg.calendar as unknown as ContentEnginePackageRow["calendar_json"])
      : null,
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
    raw && typeof raw === "object" ? (raw as UnknownRecord) : {};

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

function parseCalendarJson(raw: unknown): ContentCalendarRecord | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const record = raw as UnknownRecord;
  const daysRaw = record.days;
  if (!Array.isArray(daysRaw) || daysRaw.length !== CALENDAR_DAY_COUNT) {
    return undefined;
  }

  const days: CalendarDayEntry[] = [];
  for (const item of daysRaw) {
    if (!item || typeof item !== "object") return undefined;
    const day = item as UnknownRecord;
    const dayIndex = typeof day.dayIndex === "number" ? day.dayIndex : null;
    const platform =
      typeof day.platform === "string" &&
      CALENDAR_PLATFORMS.includes(
        day.platform as (typeof CALENDAR_PLATFORMS)[number],
      )
        ? (day.platform as CalendarDayEntry["platform"])
        : null;
    const audienceLens =
      typeof day.audienceLens === "string" &&
      CALENDAR_AUDIENCE_LENSES.includes(
        day.audienceLens as (typeof CALENDAR_AUDIENCE_LENSES)[number],
      )
        ? (day.audienceLens as CalendarDayEntry["audienceLens"])
        : null;
    const status =
      typeof day.status === "string" &&
      CALENDAR_DAY_STATUSES.includes(
        day.status as (typeof CALENDAR_DAY_STATUSES)[number],
      )
        ? (day.status as CalendarDayEntry["status"])
        : "draft";

    const strings = [
      "dayLabel",
      "postType",
      "hook",
      "caption",
      "cta",
      "suggestedVisual",
      "videoPrompt",
      "landingPageTieIn",
    ] as const;

    if (dayIndex === null || !platform || !audienceLens) return undefined;

    const parsed: CalendarDayEntry = {
      dayIndex,
      dayLabel: "",
      platform,
      postType: "",
      audienceLens,
      hook: "",
      caption: "",
      cta: "",
      suggestedVisual: "",
      videoPrompt: "",
      landingPageTieIn: "",
      status,
    };

    for (const key of strings) {
      const value = day[key];
      if (typeof value !== "string") return undefined;
      parsed[key] = value;
    }

    days.push(parsed);
  }

  days.sort((a, b) => a.dayIndex - b.dayIndex);

  return {
    days,
    weekTheme: typeof record.weekTheme === "string" ? record.weekTheme : "",
    generatedAt:
      typeof record.generatedAt === "string"
        ? record.generatedAt
        : new Date().toISOString(),
    modelUsed:
      typeof record.modelUsed === "string" ? record.modelUsed : "demo",
  };
}

function parseLandingPageJson(raw: unknown): LandingPageRecord | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const record = raw as UnknownRecord;
  const intent =
    typeof record.intent === "string" && isLandingPageIntent(record.intent)
      ? record.intent
      : null;
  if (!intent) return undefined;

  const sectionsRaw = record.sections;
  if (!sectionsRaw || typeof sectionsRaw !== "object") return undefined;

  const sections = {} as LandingPageOutputs;
  for (const key of LANDING_PAGE_SECTION_KEYS) {
    const value = (sectionsRaw as UnknownRecord)[key];
    if (typeof value !== "string") return undefined;
    sections[key] = value;
  }

  return {
    intent,
    sections,
    generatedAt:
      typeof record.generatedAt === "string"
        ? record.generatedAt
        : new Date().toISOString(),
    modelUsed:
      typeof record.modelUsed === "string" ? record.modelUsed : "demo",
  };
}

/** Migrate legacy localStorage rows. */
export function normalizeLegacyPackage(raw: unknown): ContentPackage | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as UnknownRecord;
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
      const value = (campaignRaw as UnknownRecord)[key];
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
    landingPage:
      record.landingPage && typeof record.landingPage === "object"
        ? parseLandingPageJson(record.landingPage)
        : undefined,
    calendar:
      record.calendar && typeof record.calendar === "object"
        ? parseCalendarJson(record.calendar)
        : undefined,
    tags: Array.isArray(record.tags)
      ? record.tags.filter((t): t is string => typeof t === "string")
      : [],
  };
}
