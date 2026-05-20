import type { BrandVoiceId } from "./brand-voices";
import type { LandingPageIntent } from "./landing-page-intents";

export const LANDING_PAGE_SECTION_KEYS = [
  "heroHeadline",
  "heroSubheadline",
  "primaryCta",
  "secondaryCta",
  "problemSection",
  "whyItMattersNow",
  "loanPlaybookExplanation",
  "keyBenefits",
  "whoThisIsFor",
  "faqSection",
  "complianceDisclaimer",
  "leadFormFields",
  "thankYouPageCopy",
  "followUpEmailCopy",
] as const;

export type LandingPageSectionKey = (typeof LANDING_PAGE_SECTION_KEYS)[number];

export type LandingPageOutputs = Record<LandingPageSectionKey, string>;

export type LandingPageRecord = {
  intent: LandingPageIntent;
  sections: LandingPageOutputs;
  generatedAt: string;
  modelUsed: string;
};

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
  landingPage?: LandingPageRecord;
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
  landingPage?: LandingPageRecord;
  tags: string[];
};

export type GenerateLandingPageRequest = {
  intent: LandingPageIntent;
  sourceInput: string;
  topic: string;
  title: string;
  brandVoiceId?: BrandVoiceId;
  generationMode: GenerationMode;
  audience?: ContentAudience;
  tone?: string;
  outputs?: ContentOutputs;
  campaignOutputs?: CampaignOutputs;
};

export type GenerateLandingPageResponse = {
  landingPage: LandingPageRecord;
  mode: "ai" | "demo";
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
