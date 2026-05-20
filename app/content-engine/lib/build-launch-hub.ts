import { getBrandVoice, type BrandVoiceId } from "./brand-voices";
import { getCalendarPlatformLabel } from "./calendar-platforms";
import { getLandingPageIntent } from "./landing-page-intents";
import { getLeadMagnetType } from "./lead-magnet-types";
import {
  CAMPAIGN_OUTPUT_TAB_KEYS,
  LAUNCH_CHECKLIST_KEYS,
  OUTPUT_TAB_KEYS,
  type ContentAudience,
  type ContentCalendarRecord,
  type ContentOutputs,
  type CampaignOutputs,
  type GenerationMode,
  type LandingPageRecord,
  type LaunchHubEditableFields,
  type LaunchHubFunnelSummary,
  type LaunchHubRecord,
  type LeadMagnetRecord,
} from "./types";

export type LaunchHubPackageContext = {
  title: string;
  topic: string;
  audience: ContentAudience;
  brandVoiceId: BrandVoiceId;
  generationMode: GenerationMode;
  hasContentOutputs: boolean;
  outputs?: ContentOutputs | null;
  campaignOutputs?: CampaignOutputs | null;
  landingPage?: LandingPageRecord | null;
  calendar?: ContentCalendarRecord | null;
  leadMagnet?: LeadMagnetRecord | null;
};

function defaultFields(ctx: LaunchHubPackageContext): LaunchHubEditableFields {
  const voice = getBrandVoice(ctx.brandVoiceId);
  const cta =
    ctx.landingPage?.sections.primaryCta ??
    voice.preferred_ctas[0] ??
    "Book your strategy review — know the move first.";
  const slug = (ctx.title || ctx.topic)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 32);

  return {
    campaignName: ctx.title || ctx.topic,
    campaignGoal: `Educate ${ctx.audience} prospects on ${ctx.topic} and drive strategy-review requests.`,
    primaryCta: cta,
    landingPageUrl: "",
    utmCampaignName: slug || "loan-playbook-campaign",
    crmTag: `playbook-${slug || "campaign"}`,
    notes: "",
  };
}

function deriveBestPlatforms(ctx: LaunchHubPackageContext): string {
  if (ctx.calendar?.days.length) {
    const platforms = [
      ...new Set(ctx.calendar.days.map((d) => getCalendarPlatformLabel(d.platform))),
    ];
    return platforms.join(" · ");
  }
  if (ctx.audience === "agent") return "LinkedIn · Email · Facebook";
  if (ctx.audience === "commercial") return "LinkedIn · Email · Blog";
  return "TikTok / Reels · LinkedIn · Facebook · Email";
}

function deriveWeeklyPlan(ctx: LaunchHubPackageContext): string {
  if (ctx.calendar) {
    return [
      ctx.calendar.weekTheme,
      ...ctx.calendar.days.map(
        (d) =>
          `${d.dayLabel}: ${getCalendarPlatformLabel(d.platform)} — ${d.hook.slice(0, 60)}…`,
      ),
    ].join("\n");
  }
  if (ctx.campaignOutputs?.postingSchedule) {
    return ctx.campaignOutputs.postingSchedule.slice(0, 800);
  }
  return "Generate a 7-day calendar to unlock a day-by-day publishing plan.";
}

function derivePrimaryOffer(ctx: LaunchHubPackageContext): string {
  if (ctx.leadMagnet) {
    return getLeadMagnetType(ctx.leadMagnet.type).label;
  }
  if (ctx.landingPage) {
    return ctx.landingPage.sections.heroHeadline;
  }
  return `Strategy review on ${ctx.topic}`;
}

function deriveFollowUpSequence(ctx: LaunchHubPackageContext): string {
  const topic = ctx.topic;
  return `Day 0: Deliver lead magnet + thank-you (immediate)
Day 1: "Did you get the ${topic} guide?" — one helpful tip, no rate quote
Day 3: Agent-forwardable paragraph or buyer checklist reminder
Day 7: Invite to 20-min strategy review — ${ctx.audience === "agent" ? "offer partner call" : "confirm timeline"}
Day 14: Market pulse update tied to ${topic} (educational only)`;
}

function deriveCrmFollowUpPlan(ctx: LaunchHubPackageContext): string {
  const fields = defaultFields(ctx);
  return `CRM FOLLOW-UP PLAN — ${fields.campaignName}

Tag: ${fields.crmTag}
Audience: ${ctx.audience}
Offer: ${derivePrimaryOffer(ctx)}

Sequence:
1. Form submit → auto-send lead magnet + calendar link (if built)
2. Day 1 email: recap executive summary + primary CTA
3. Day 3 task: LO calls if high-intent (timeline < 90 days)
4. Day 7: share best-performing social post + strategy review invite
5. Day 14: newsletter segment — "${ctx.topic}" follow-up

Notes field for LO: payment target, agent partner, must-move-by date.`;
}

function buildSummary(ctx: LaunchHubPackageContext): LaunchHubFunnelSummary {
  const voice = getBrandVoice(ctx.brandVoiceId);
  const fields = defaultFields(ctx);

  return {
    campaignTopic: ctx.topic,
    brandVoice: voice.name,
    audience: ctx.audience,
    primaryOffer: derivePrimaryOffer(ctx),
    landingPageIntent: ctx.landingPage
      ? getLandingPageIntent(ctx.landingPage.intent).label
      : "Not built yet",
    leadMagnetType: ctx.leadMagnet
      ? getLeadMagnetType(ctx.leadMagnet.type).label
      : "Not built yet",
    recommendedCta: fields.primaryCta,
    bestPlatforms: deriveBestPlatforms(ctx),
    weeklyPublishingPlan: deriveWeeklyPlan(ctx),
    followUpSequenceIdea: deriveFollowUpSequence(ctx),
  };
}

function autoChecklist(ctx: LaunchHubPackageContext, fields: LaunchHubEditableFields) {
  return {
    contentPackGenerated: ctx.hasContentOutputs,
    landingPageCreated: Boolean(ctx.landingPage),
    calendarBuilt: Boolean(ctx.calendar),
    leadMagnetCreated: Boolean(ctx.leadMagnet),
    ctaSelected: Boolean(fields.primaryCta.trim()),
    trackingLinkAdded:
      Boolean(fields.landingPageUrl.trim()) &&
      Boolean(fields.utmCampaignName.trim()),
    crmFollowUpPlanned:
      Boolean(fields.crmTag.trim()) && Boolean(fields.campaignGoal.trim()),
    readyToPublish: false,
  };
}

export function buildLaunchHubFromPackage(
  ctx: LaunchHubPackageContext,
): LaunchHubRecord {
  const fields = defaultFields(ctx);
  const checklist = LAUNCH_CHECKLIST_KEYS.reduce(
    (acc, key) => {
      acc[key] = autoChecklist(ctx, fields)[key];
      return acc;
    },
    {} as LaunchHubRecord["checklist"],
  );

  return {
    summary: buildSummary(ctx),
    fields,
    checklist,
    crmFollowUpPlan: deriveCrmFollowUpPlan(ctx),
    updatedAt: new Date().toISOString(),
    modelUsed: "demo",
  };
}

/** Merge auto-derived data while preserving user edits and manual checklist toggles. */
export function mergeLaunchHub(
  existing: LaunchHubRecord | null,
  fresh: LaunchHubRecord,
): LaunchHubRecord {
  if (!existing) return fresh;

  const manualReady = existing.checklist.readyToPublish;
  const mergedChecklist = { ...fresh.checklist };
  for (const key of LAUNCH_CHECKLIST_KEYS) {
    if (key === "readyToPublish") {
      mergedChecklist.readyToPublish = manualReady;
    } else if (
      key === "trackingLinkAdded" ||
      key === "crmFollowUpPlanned" ||
      key === "ctaSelected"
    ) {
      mergedChecklist[key] =
        existing.checklist[key] || fresh.checklist[key];
    }
  }

  return {
    summary: fresh.summary,
    fields: { ...fresh.fields, ...stripEmptyOverrides(existing.fields) },
    checklist: mergedChecklist,
    crmFollowUpPlan: existing.crmFollowUpPlan || fresh.crmFollowUpPlan,
    updatedAt: new Date().toISOString(),
    modelUsed: existing.modelUsed || fresh.modelUsed,
  };
}

function stripEmptyOverrides(
  fields: LaunchHubEditableFields,
): Partial<LaunchHubEditableFields> {
  const out: Partial<LaunchHubEditableFields> = {};
  for (const [key, value] of Object.entries(fields) as [
    keyof LaunchHubEditableFields,
    string,
  ][]) {
    if (value.trim()) out[key] = value;
  }
  return out;
}

export function packageHasLaunchAssets(ctx: {
  generationMode: GenerationMode;
  outputs?: ContentOutputs | null;
  campaignOutputs?: CampaignOutputs | null;
  landingPage?: LandingPageRecord | null;
  calendar?: ContentCalendarRecord | null;
  leadMagnet?: LeadMagnetRecord | null;
}): boolean {
  if (ctx.landingPage || ctx.calendar || ctx.leadMagnet) return true;
  if (ctx.generationMode === "campaign" && ctx.campaignOutputs) {
    return CAMPAIGN_OUTPUT_TAB_KEYS.some((key) =>
      Boolean(ctx.campaignOutputs![key]?.trim()),
    );
  }
  if (ctx.outputs) {
    return OUTPUT_TAB_KEYS.some((key) => Boolean(ctx.outputs![key]?.trim()));
  }
  return false;
}
