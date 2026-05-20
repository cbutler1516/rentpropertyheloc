import type { BrandVoiceId } from "./brand-voices";

export const OUTPUT_TAB_KEYS = [
  "tiktokHooks",
  "youtubeTitles",
  "linkedinPost",
  "facebookCaption",
  "emailNewsletter",
  "seoBlogOutline",
  "instagramCarousel",
  "soraPrompt",
  "heygenPrompt",
  "thumbnailIdeas",
  "agentVersion",
  "consumerVersion",
] as const;

export type OutputTabKey = (typeof OUTPUT_TAB_KEYS)[number];

export type ContentOutputs = Record<OutputTabKey, string>;

export const CAMPAIGN_OUTPUT_TAB_KEYS = [
  "shortFormVideoIdeas",
  "hooks",
  "socialPosts",
  "emailSubjectLines",
  "seoBlogIdea",
  "soraPromptIdeas",
  "heygenPromptIdeas",
  "postingSchedule",
] as const;

export type CampaignOutputTabKey = (typeof CAMPAIGN_OUTPUT_TAB_KEYS)[number];

export type CampaignOutputs = Record<CampaignOutputTabKey, string>;

export type GenerationMode = "single" | "campaign";

export const CONTENT_AUDIENCES = [
  "buyer",
  "homeowner",
  "agent",
  "commercial",
  "general",
] as const;

export type ContentAudience = (typeof CONTENT_AUDIENCES)[number];

export const CONTENT_TONES = [
  "strategic",
  "conversational",
  "witty",
  "educational",
  "urgent",
] as const;

export type ContentTone = (typeof CONTENT_TONES)[number];

/** App-level package (camelCase). Maps to `content_engine_packages` row. */
export type ContentPackage = {
  id: string;
  createdAt: string;
  title: string;
  sourceInput: string;
  audience: ContentAudience;
  tone: string;
  topic: string;
  modelUsed: string;
  brandVoiceId: BrandVoiceId;
  generationMode: GenerationMode;
  outputs: ContentOutputs;
  campaignOutputs?: CampaignOutputs;
  tags: string[];
  mode?: "ai" | "demo";
};

export type PackageDraft = {
  title: string;
  sourceInput: string;
  audience: ContentAudience;
  tone: string;
  topic: string;
  modelUsed: string;
  brandVoiceId: BrandVoiceId;
  generationMode: GenerationMode;
  outputs: ContentOutputs;
  campaignOutputs?: CampaignOutputs;
  tags: string[];
};

export type GenerateRequest = {
  input: string;
  mode?: GenerationMode;
  brandVoiceId?: BrandVoiceId;
  audience?: ContentAudience;
  tone?: string;
};

export type GenerateResponse = {
  generationMode: GenerationMode;
  brandVoiceId: BrandVoiceId;
  outputs?: ContentOutputs;
  campaignOutputs?: CampaignOutputs;
  mode: "ai" | "demo";
  modelUsed: string;
  title: string;
  topic: string;
  audience: ContentAudience;
};

export type SavePackageRequest = PackageDraft & {
  id?: string;
};

export type DateFilterPreset = "all" | "7d" | "30d" | "90d";

export type PackageFilters = {
  search: string;
  audience: ContentAudience | "all";
  topic: string;
  datePreset: DateFilterPreset;
};
