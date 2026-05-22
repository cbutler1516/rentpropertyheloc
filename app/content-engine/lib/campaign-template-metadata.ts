import { createDefaultAnalytics } from "./analytics-defaults";
import { createDefaultCrmIntegration } from "./crm-integration-defaults";
import type { CampaignTemplate } from "./campaign-templates";
import type {
  AnalyticsRecord,
  CrmIntegrationRecord,
  LaunchHubRecord,
  LeadCaptureRecord,
  ContentCalendarRecord,
  LandingPageRecord,
  LeadMagnetRecord,
} from "./types";

export function applyTemplateToLaunchHub(
  launchHub: LaunchHubRecord,
  template: CampaignTemplate,
): LaunchHubRecord {
  return {
    ...launchHub,
    fields: {
      ...launchHub.fields,
      campaignName: template.title,
      primaryCta: template.suggestedCta,
      crmTag: template.suggestedCrmTag,
      utmCampaignName: template.suggestedUtmCampaign,
      campaignGoal: `Drive ${template.targetAudience} leads for ${template.title} via ${template.recommendedPlatforms.join(", ")}.`,
    },
    summary: {
      ...launchHub.summary,
      recommendedCta: template.suggestedCta,
      bestPlatforms: template.recommendedPlatforms.join(" · "),
    },
  };
}

export function buildCrmIntegrationFromTemplate(
  template: CampaignTemplate,
  leadCapture?: LeadCaptureRecord | null,
  launchHub?: LaunchHubRecord | null,
): CrmIntegrationRecord {
  const base = createDefaultCrmIntegration({
    leadCapture,
    launchHub,
  });
  const tags = [
    template.suggestedCrmTag,
    "content_engine",
    template.suggestedUtmCampaign,
  ].filter((t, i, arr) => t && arr.indexOf(t) === i);

  return {
    ...base,
    automations: {
      ...base.automations,
      autoTags: tags,
      pushFromLandingPage: true,
      pushUtmSource: true,
      triggerCampaignId: template.suggestedUtmCampaign,
    },
  };
}

export function buildAnalyticsFromTemplate(
  template: CampaignTemplate,
  ctx: {
    landingPage?: LandingPageRecord | null;
    leadCapture?: LeadCaptureRecord | null;
    leadMagnet?: LeadMagnetRecord | null;
    calendar?: ContentCalendarRecord | null;
    launchHub?: LaunchHubRecord | null;
    crmIntegration?: CrmIntegrationRecord | null;
  },
): AnalyticsRecord {
  const base = createDefaultAnalytics({
    crmIntegration: ctx.crmIntegration,
    packageContext: {
      landingPage: ctx.landingPage ?? undefined,
      leadCapture: ctx.leadCapture ?? undefined,
      leadMagnet: ctx.leadMagnet ?? undefined,
      calendar: ctx.calendar ?? undefined,
      launchHub: ctx.launchHub ?? undefined,
    },
  });

  return {
    ...base,
    insights: {
      ...base.insights,
      bestPerformingAssetNotes: `Template: ${template.title}. Primary surfaces: ${template.recommendedPlatforms.join(", ")}. UTM campaign: ${template.suggestedUtmCampaign}.`,
      nextRecommendedAction: `Publish landing page with UTM ${template.suggestedUtmCampaign}, then run week-one posts on ${template.recommendedPlatforms[0] ?? "LinkedIn"}.`,
      roiSummary: base.insights.roiSummary,
    },
  };
}
