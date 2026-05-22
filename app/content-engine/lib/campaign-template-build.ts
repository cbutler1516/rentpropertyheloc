import { buildLaunchHubFromPackage, mergeLaunchHub } from "./build-launch-hub";
import type { CampaignTemplate } from "./campaign-templates";
import {
  applyTemplateToLaunchHub,
  buildAnalyticsFromTemplate,
  buildCrmIntegrationFromTemplate,
} from "./campaign-template-metadata";
import { inferTags, inferTone, inferTopic } from "./metadata";
import type {
  CampaignOutputs,
  ContentCalendarRecord,
  CrmIntegrationRecord,
  AnalyticsRecord,
  LaunchHubRecord,
  LandingPageRecord,
  LeadCaptureRecord,
  LeadMagnetRecord,
  ContentAudience,
  GenerationMode,
} from "./types";
import type { BrandVoiceId } from "./brand-voices";

export const CAMPAIGN_BUILD_STEP_IDS = [
  "setup",
  "content",
  "landing",
  "calendar",
  "leadMagnet",
  "launchHub",
  "leadCapture",
  "metadata",
  "save",
] as const;

export type CampaignBuildStepId = (typeof CAMPAIGN_BUILD_STEP_IDS)[number];

export type CampaignBuildStepStatus = "pending" | "running" | "done" | "error";

export type CampaignBuildStepState = {
  id: CampaignBuildStepId;
  label: string;
  status: CampaignBuildStepStatus;
  message?: string;
};

export const CAMPAIGN_BUILD_STEP_LABELS: Record<CampaignBuildStepId, string> = {
  setup: "Apply template",
  content: "Content pack",
  landing: "Landing page",
  calendar: "7-day calendar",
  leadMagnet: "Lead magnet",
  launchHub: "Launch hub",
  leadCapture: "Lead capture",
  metadata: "CRM & analytics",
  save: "Save package",
};

export function initialBuildSteps(): CampaignBuildStepState[] {
  return CAMPAIGN_BUILD_STEP_IDS.map((id) => ({
    id,
    label: CAMPAIGN_BUILD_STEP_LABELS[id],
    status: "pending" as const,
  }));
}

export type FullCampaignBuildResult = {
  sourceInput: string;
  title: string;
  topic: string;
  audience: ContentAudience;
  tone: string;
  tags: string[];
  brandVoiceId: BrandVoiceId;
  generationMode: GenerationMode;
  modelUsed: string;
  mode: "ai" | "demo";
  campaignOutputs: CampaignOutputs;
  landingPage: LandingPageRecord;
  calendar: ContentCalendarRecord;
  leadMagnet: LeadMagnetRecord;
  launchHub: LaunchHubRecord;
  leadCapture: LeadCaptureRecord;
  crmIntegration: CrmIntegrationRecord;
  analytics: AnalyticsRecord;
};

type StepUpdater = (
  id: CampaignBuildStepId,
  patch: Partial<Pick<CampaignBuildStepState, "status" | "message">>,
) => void;

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      (data as { error?: string }).error ?? `Request failed: ${url}`,
    );
  }
  return data as T;
}

export async function runFullCampaignBuild(
  template: CampaignTemplate,
  onStep: StepUpdater,
): Promise<FullCampaignBuildResult> {
  const sourceInput = template.sourcePromptStarter.trim();
  const title = template.title;
  const audience = template.targetAudience;
  const topic = inferTopic(sourceInput);
  const tone = inferTone(sourceInput);
  const tags = inferTags(sourceInput, topic, audience);
  const brandVoiceId = template.brandVoiceId;
  const generationMode: GenerationMode = "campaign";

  onStep("setup", { status: "running", message: "Applying template…" });
  onStep("setup", { status: "done", message: title });

  onStep("content", { status: "running" });
  const contentData = await postJson<{
    campaignOutputs: CampaignOutputs;
    mode: "ai" | "demo";
    modelUsed: string;
  }>("/api/content-engine/generate", {
    input: sourceInput,
    mode: "campaign",
    brandVoiceId,
    audience,
    tone,
  });
  const campaignOutputs = contentData.campaignOutputs;
  const modelUsed = contentData.modelUsed ?? contentData.mode ?? "demo";
  const mode = contentData.mode === "ai" ? "ai" : "demo";
  onStep("content", { status: "done", message: `${mode === "ai" ? "AI" : "Demo"} pack ready` });

  const basePayload = {
    sourceInput,
    topic,
    title,
    brandVoiceId,
    generationMode,
    audience,
    tone,
    campaignOutputs,
  };

  onStep("landing", { status: "running" });
  const landingData = await postJson<{ landingPage: LandingPageRecord }>(
    "/api/content-engine/landing-page",
    {
      intent: template.landingPageIntent,
      ...basePayload,
    },
  );
  const landingPage = landingData.landingPage;
  onStep("landing", { status: "done" });

  onStep("calendar", { status: "running" });
  const calendarData = await postJson<{ calendar: ContentCalendarRecord }>(
    "/api/content-engine/calendar",
    {
      ...basePayload,
      landingPage,
    },
  );
  const calendar = calendarData.calendar;
  onStep("calendar", { status: "done", message: "7 days scheduled" });

  onStep("leadMagnet", { status: "running" });
  const magnetData = await postJson<{ leadMagnet: LeadMagnetRecord }>(
    "/api/content-engine/lead-magnet",
    {
      type: template.leadMagnetType,
      ...basePayload,
      landingPage,
      calendar,
    },
  );
  const leadMagnet = magnetData.leadMagnet;
  onStep("leadMagnet", { status: "done" });

  onStep("launchHub", { status: "running" });
  let launchHub: LaunchHubRecord;
  try {
    const hubData = await postJson<{ launchHub: LaunchHubRecord }>(
      "/api/content-engine/launch-hub",
      {
        title,
        topic,
        audience,
        brandVoiceId,
        generationMode,
        hasContentOutputs: true,
        campaignOutputs,
        landingPage,
        calendar,
        leadMagnet,
      },
    );
    launchHub = applyTemplateToLaunchHub(hubData.launchHub, template);
  } catch {
    const local = buildLaunchHubFromPackage({
      title,
      topic,
      audience,
      brandVoiceId,
      generationMode,
      hasContentOutputs: true,
      campaignOutputs,
      landingPage,
      calendar,
      leadMagnet,
    });
    launchHub = applyTemplateToLaunchHub(mergeLaunchHub(null, local), template);
  }
  onStep("launchHub", { status: "done" });

  onStep("leadCapture", { status: "running" });
  const captureData = await postJson<{ leadCapture: LeadCaptureRecord }>(
    "/api/content-engine/lead-capture",
    {
      preset: template.leadCapturePreset,
      ...basePayload,
      landingPage,
      launchHub,
      leadMagnet,
    },
  );
  const leadCapture = captureData.leadCapture;
  onStep("leadCapture", { status: "done" });

  onStep("metadata", { status: "running" });
  const crmIntegration = buildCrmIntegrationFromTemplate(
    template,
    leadCapture,
    launchHub,
  );
  const analytics = buildAnalyticsFromTemplate(template, {
    landingPage,
    leadCapture,
    leadMagnet,
    calendar,
    launchHub,
    crmIntegration,
  });
  onStep("metadata", {
    status: "done",
    message: `CRM tag ${template.suggestedCrmTag}`,
  });

  return {
    sourceInput,
    title,
    topic,
    audience,
    tone,
    tags,
    brandVoiceId,
    generationMode,
    modelUsed,
    mode,
    campaignOutputs,
    landingPage,
    calendar,
    leadMagnet,
    launchHub,
    leadCapture,
    crmIntegration,
    analytics,
  };
}
