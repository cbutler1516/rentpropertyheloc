import type { BrandVoiceId } from "./brand-voices";
import type { LandingPageIntent } from "./landing-page-intents";
import type { CrmProvider } from "./crm-providers";
import type { LeadCapturePreset } from "./lead-capture-presets";
import type { LeadMagnetType } from "./lead-magnet-types";

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

export const CALENDAR_PLATFORMS = [
  "tiktok-reels",
  "facebook",
  "linkedin",
  "email",
  "blog",
] as const;

export type CalendarPlatform = (typeof CALENDAR_PLATFORMS)[number];

export const CALENDAR_DAY_STATUSES = ["draft", "ready", "posted"] as const;

export type CalendarDayStatus = (typeof CALENDAR_DAY_STATUSES)[number];

export const CALENDAR_AUDIENCE_LENSES = ["agent", "consumer"] as const;

export type CalendarAudienceLens = (typeof CALENDAR_AUDIENCE_LENSES)[number];

export const CALENDAR_FILTER_IDS = [
  "tiktok-reels",
  "facebook",
  "linkedin",
  "email",
  "blog",
  "agent",
  "consumer",
] as const;

export type CalendarFilterId = (typeof CALENDAR_FILTER_IDS)[number];

export type CalendarDayEntry = {
  dayIndex: number;
  dayLabel: string;
  platform: CalendarPlatform;
  postType: string;
  audienceLens: CalendarAudienceLens;
  hook: string;
  caption: string;
  cta: string;
  suggestedVisual: string;
  videoPrompt: string;
  landingPageTieIn: string;
  status: CalendarDayStatus;
};

export const CALENDAR_DAY_COUNT = 7;

export type ContentCalendarRecord = {
  days: CalendarDayEntry[];
  weekTheme: string;
  generatedAt: string;
  modelUsed: string;
};

export type CalendarViewMode = "board" | "list" | "platform";

export const LEAD_MAGNET_SECTION_KEYS = [
  "coverTitle",
  "subtitle",
  "executiveSummary",
  "whyItMattersNow",
  "keyTakeaways",
  "mainEducationalSection",
  "mistakesToAvoid",
  "actionChecklist",
  "faq",
  "ctaPage",
  "complianceDisclaimer",
] as const;

export type LeadMagnetSectionKey = (typeof LEAD_MAGNET_SECTION_KEYS)[number];

export type LeadMagnetOutputs = Record<LeadMagnetSectionKey, string>;

export type LeadMagnetRecord = {
  type: LeadMagnetType;
  sections: LeadMagnetOutputs;
  generatedAt: string;
  modelUsed: string;
};

export const LAUNCH_CHECKLIST_KEYS = [
  "contentPackGenerated",
  "landingPageCreated",
  "calendarBuilt",
  "leadMagnetCreated",
  "ctaSelected",
  "trackingLinkAdded",
  "crmFollowUpPlanned",
  "readyToPublish",
] as const;

export type LaunchChecklistKey = (typeof LAUNCH_CHECKLIST_KEYS)[number];

export type LaunchHubEditableFields = {
  campaignName: string;
  campaignGoal: string;
  primaryCta: string;
  landingPageUrl: string;
  utmCampaignName: string;
  crmTag: string;
  notes: string;
};

export type LaunchHubFunnelSummary = {
  campaignTopic: string;
  brandVoice: string;
  audience: string;
  primaryOffer: string;
  landingPageIntent: string;
  leadMagnetType: string;
  recommendedCta: string;
  bestPlatforms: string;
  weeklyPublishingPlan: string;
  followUpSequenceIdea: string;
};

export type LaunchHubRecord = {
  summary: LaunchHubFunnelSummary;
  fields: LaunchHubEditableFields;
  checklist: Record<LaunchChecklistKey, boolean>;
  crmFollowUpPlan: string;
  updatedAt: string;
  modelUsed: string;
};

export const LEAD_CAPTURE_FIELD_KEYS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "buyerTimeline",
  "loanTypeInterest",
  "purchasePriceOrLoanAmount",
  "creditRange",
  "agentStatus",
  "notes",
  "smsCallConsent",
  "emailOptIn",
] as const;

export type LeadCaptureFieldKey = (typeof LEAD_CAPTURE_FIELD_KEYS)[number];

export type LeadCaptureFieldConfig = {
  label: string;
  placeholder: string;
  enabled: boolean;
  required: boolean;
};

export const CRM_SEQUENCE_KEYS = [
  "instantText",
  "instantEmail",
  "day1FollowUp",
  "day3FollowUp",
  "day7FollowUp",
  "day14Nurture",
  "agentReferralAlert",
  "internalTaskList",
] as const;

export type CrmSequenceKey = (typeof CRM_SEQUENCE_KEYS)[number];

export type LeadCaptureCrmSequence = Record<CrmSequenceKey, string>;

export type LeadCaptureConsentCopy = {
  smsCallConsentCopy: string;
  emailOptInCopy: string;
};

export type LeadCaptureRecord = {
  preset: LeadCapturePreset;
  fields: Record<LeadCaptureFieldKey, LeadCaptureFieldConfig>;
  crmSequence: LeadCaptureCrmSequence;
  consent: LeadCaptureConsentCopy;
  generatedAt: string;
  modelUsed: string;
};

export type CrmFieldMapping = {
  leadCaptureField: LeadCaptureFieldKey;
  crmFieldId: string;
  enabled: boolean;
};

export type CrmAutomationSettings = {
  pushFromLandingPage: boolean;
  autoTags: string[];
  createOpportunity: boolean;
  opportunityPipeline: string;
  opportunityStage: string;
  assignedLoanOfficer: string;
  triggerWorkflowId: string;
  triggerCampaignId: string;
  createTasks: boolean;
  taskReminderDays: number;
  pushUtmSource: boolean;
};

export type CrmConnectionPublic = {
  provider: CrmProvider;
  connected: boolean;
  credentialHint?: string;
  lastVerifiedAt?: string;
};

export const CRM_ACTIVITY_TYPES = [
  "lead_pushed",
  "workflow_triggered",
  "error",
  "retry",
] as const;

export type CrmActivityType = (typeof CRM_ACTIVITY_TYPES)[number];

export type CrmActivityLogEntry = {
  id: string;
  at: string;
  type: CrmActivityType;
  provider: CrmProvider;
  message: string;
  success: boolean;
  leadEmail?: string;
  retryable?: boolean;
  relatedEntryId?: string;
};

export type CrmIntegrationRecord = {
  activeProvider: CrmProvider;
  fieldMappings: CrmFieldMapping[];
  automations: CrmAutomationSettings;
  connections: CrmConnectionPublic[];
  activityLog: CrmActivityLogEntry[];
  updatedAt: string;
};

export type CrmTestLeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  buyerTimeline?: string;
  loanTypeInterest?: string;
  purchasePriceOrLoanAmount?: string;
  creditRange?: string;
  agentStatus?: string;
  notes?: string;
  smsCallConsent?: boolean;
  emailOptIn?: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export type CampaignMetricsInput = {
  views: number;
  clicks: number;
  leads: number;
  appointments: number;
  applications: number;
  funded_loans: number;
  ad_spend: number;
  estimated_revenue: number;
};

export type AnalyticsComputed = {
  clickThroughRate: number;
  leadConversionRate: number;
  costPerLead: number | null;
  costPerAppointment: number | null;
  costPerFundedLoan: number | null;
  estimatedRoi: number | null;
  revenuePerLead: number | null;
};

export type CrmActivitySummary = {
  testLeadsSent: number;
  liveLeadsPushed: number;
  pushFailures: number;
  lastActivityAt: string | null;
};

export type FunnelStageMetric = {
  stage: string;
  count: number;
  rateFromPrevious: number | null;
};

export type AnalyticsInsights = {
  campaignHealthScore: number;
  funnelMetrics: FunnelStageMetric[];
  roiSummary: string;
  bestPerformingAssetNotes: string;
  nextRecommendedAction: string;
};

export type AnalyticsRecord = {
  metrics: CampaignMetricsInput;
  computed: AnalyticsComputed;
  crmSummary: CrmActivitySummary;
  insights: AnalyticsInsights;
  updatedAt: string;
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
  calendar?: ContentCalendarRecord;
  leadMagnet?: LeadMagnetRecord;
  launchHub?: LaunchHubRecord;
  leadCapture?: LeadCaptureRecord;
  crmIntegration?: CrmIntegrationRecord;
  analytics?: AnalyticsRecord;
  compliance?: ComplianceRecord;
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
  calendar?: ContentCalendarRecord;
  leadMagnet?: LeadMagnetRecord;
  launchHub?: LaunchHubRecord;
  leadCapture?: LeadCaptureRecord;
  crmIntegration?: CrmIntegrationRecord;
  analytics?: AnalyticsRecord;
  compliance?: ComplianceRecord;
  tags: string[];
};

export type ComplianceRiskLevel = "low" | "medium" | "high";

export type ComplianceIssueSeverity = "low" | "medium" | "high" | "critical";

export type ComplianceIssueCategory =
  | "guaranteedApproval"
  | "misleadingRates"
  | "missingAprTerms"
  | "triggerTerms"
  | "overpromising"
  | "unsupportedSuperlatives"
  | "fairLending"
  | "missingDisclaimer"
  | "missingConsent"
  | "urgencyScarcity";

export type ComplianceIssue = {
  id: string;
  severity: ComplianceIssueSeverity;
  category: ComplianceIssueCategory;
  source: string;
  excerpt: string;
  message: string;
  suggestedRewrite: string;
  saferVersion?: string;
  applied?: boolean;
};

export type ComplianceDisclaimerItem = {
  id: string;
  label: string;
  present: boolean;
  required: boolean;
};

export type ComplianceApprovalItem = {
  id: string;
  label: string;
  checked: boolean;
};

export type ComplianceRecord = {
  riskScore: ComplianceRiskLevel;
  issues: ComplianceIssue[];
  missingDisclaimers: ComplianceDisclaimerItem[];
  finalApprovalChecklist: ComplianceApprovalItem[];
  reviewerNotes: string;
  reviewed: boolean;
  reviewedAt: string | null;
  scannedAt: string;
  modelUsed: string;
};

export type ComplianceScanRequest = {
  title: string;
  topic: string;
  generationMode: GenerationMode;
  outputs?: ContentOutputs;
  campaignOutputs?: CampaignOutputs;
  landingPage?: LandingPageRecord;
  leadMagnet?: LeadMagnetRecord;
  leadCapture?: LeadCaptureRecord;
  publishedStatus?: PublishedPageStatus | null;
};

export type ComplianceScanResponse = {
  compliance: ComplianceRecord;
  mode: "ai" | "demo";
};

export type AnalyticsRecommendRequest = {
  title: string;
  topic: string;
  audience?: ContentAudience;
  analytics: AnalyticsRecord;
  hasLandingPage?: boolean;
  hasLeadCapture?: boolean;
  hasLeadMagnet?: boolean;
  hasCalendar?: boolean;
  hasLaunchHub?: boolean;
  hasCrmHub?: boolean;
};

export type AnalyticsRecommendResponse = {
  insights: Pick<
    AnalyticsInsights,
    "bestPerformingAssetNotes" | "nextRecommendedAction" | "roiSummary"
  >;
  mode: "ai" | "demo";
};

export type PublishedPageStatus = {
  slug: string;
  isPublished: boolean;
  publishedAt: string | null;
  unpublishedAt: string | null;
  publishedUrl: string;
};

export type PublishedPageRecord = {
  id: string;
  packageId: string;
  slug: string;
  packageTitle: string;
  landingPage: LandingPageRecord;
  leadCapture?: LeadCaptureRecord;
  crmIntegration?: CrmIntegrationRecord;
  isPublished: boolean;
  publishedAt: string;
  updatedAt: string;
  unpublishedAt?: string;
};

export type CampaignLeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  buyerTimeline?: string;
  loanTypeInterest?: string;
  purchasePriceOrLoanAmount?: string;
  creditRange?: string;
  agentStatus?: string;
  notes?: string;
  smsCallConsent?: boolean;
  emailOptIn?: boolean;
};

export type CampaignUtmParams = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
};

export type PublishCampaignRequest = {
  packageId: string;
  slug: string;
  packageTitle: string;
  landingPage: LandingPageRecord;
  leadCapture?: LeadCaptureRecord;
  crmIntegration?: CrmIntegrationRecord;
};

export type SaveCrmCredentialsRequest = {
  packageId: string;
  provider: CrmProvider;
  credentials: Record<string, string>;
};

export type CrmConnectionStatusResponse = {
  connections: CrmConnectionPublic[];
};

export type CrmPushLeadRequest = {
  packageId: string;
  provider?: CrmProvider;
  lead: CrmTestLeadPayload;
  testMode?: boolean;
};

export type CrmPushLeadResponse = {
  success: boolean;
  mode: "live" | "demo";
  message: string;
  activityLog: CrmActivityLogEntry[];
};

export type GenerateLeadCaptureRequest = {
  preset: LeadCapturePreset;
  sourceInput: string;
  topic: string;
  title: string;
  brandVoiceId?: BrandVoiceId;
  generationMode: GenerationMode;
  audience?: ContentAudience;
  tone?: string;
  landingPage?: LandingPageRecord;
  launchHub?: LaunchHubRecord;
  leadMagnet?: LeadMagnetRecord;
};

export type GenerateLeadCaptureResponse = {
  leadCapture: LeadCaptureRecord;
  mode: "ai" | "demo";
};

export type SyncLaunchHubRequest = {
  title: string;
  topic: string;
  audience: ContentAudience;
  brandVoiceId?: BrandVoiceId;
  generationMode: GenerationMode;
  hasContentOutputs: boolean;
  outputs?: ContentOutputs;
  campaignOutputs?: CampaignOutputs;
  landingPage?: LandingPageRecord;
  calendar?: ContentCalendarRecord;
  leadMagnet?: LeadMagnetRecord;
  existingLaunchHub?: LaunchHubRecord;
};

export type SyncLaunchHubResponse = {
  launchHub: LaunchHubRecord;
  mode: "ai" | "demo";
};

export type GenerateLeadMagnetRequest = {
  type: LeadMagnetType;
  sourceInput: string;
  topic: string;
  title: string;
  brandVoiceId?: BrandVoiceId;
  generationMode: GenerationMode;
  audience?: ContentAudience;
  tone?: string;
  outputs?: ContentOutputs;
  campaignOutputs?: CampaignOutputs;
  landingPage?: LandingPageRecord;
  calendar?: ContentCalendarRecord;
};

export type GenerateLeadMagnetResponse = {
  leadMagnet: LeadMagnetRecord;
  mode: "ai" | "demo";
};

export type GenerateCalendarRequest = {
  sourceInput: string;
  topic: string;
  title: string;
  brandVoiceId?: BrandVoiceId;
  generationMode: GenerationMode;
  audience?: ContentAudience;
  tone?: string;
  outputs?: ContentOutputs;
  campaignOutputs?: CampaignOutputs;
  landingPage?: LandingPageRecord;
};

export type GenerateCalendarResponse = {
  calendar: ContentCalendarRecord;
  mode: "ai" | "demo";
};

export type RegenerateCalendarDayRequest = GenerateCalendarRequest & {
  dayIndex: number;
  calendar: ContentCalendarRecord;
};

export type RegenerateCalendarDayResponse = {
  day: CalendarDayEntry;
  mode: "ai" | "demo";
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
