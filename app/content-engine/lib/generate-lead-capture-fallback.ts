import { getBrandVoice, type BrandVoiceId } from "./brand-voices";
import { defaultFieldConfigs } from "./lead-capture-fields";
import { getLeadCapturePreset, type LeadCapturePreset } from "./lead-capture-presets";
import type {
  LaunchHubRecord,
  LandingPageRecord,
  LeadCaptureRecord,
} from "./types";

function excerpt(text: string, max = 80) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1)}…`;
}

export function generateDemoLeadCapture(input: {
  preset: LeadCapturePreset;
  sourceInput: string;
  topic: string;
  title: string;
  brandVoiceId: BrandVoiceId;
  landingPage?: LandingPageRecord;
  launchHub?: LaunchHubRecord;
}): LeadCaptureRecord {
  const voice = getBrandVoice(input.brandVoiceId);
  const presetConfig = getLeadCapturePreset(input.preset);
  const cta =
    input.launchHub?.fields.primaryCta ??
    input.landingPage?.sections.primaryCta ??
    voice.preferred_ctas[0] ??
    "Book your strategy review";
  const topic = input.topic || excerpt(input.sourceInput, 60);
  const campaignName = input.launchHub?.fields.campaignName ?? input.title;

  const crmSequence = {
    instantText: `Hi — Chris from The Loan Playbook. Got your ${presetConfig.label.toLowerCase()} request on ${topic}. Reply YES to confirm or call us back. Reply STOP to opt out.`,
    instantEmail: `Subject: Your ${topic} playbook — next step\n\nHi —\n\nThanks for raising your hand. We received your info for "${campaignName}".\n\nNext step: a short strategy review (about 20 minutes) — ${cta}\n\nEducational only. Not a commitment to lend.\n\n— The Loan Playbook`,
    day1FollowUp: `Email: Quick check-in on ${topic}\n\nShare one takeaway from the guide + confirm your comfortable payment range before your next showing.\n\nCTA: ${cta}`,
    day3FollowUp: `Email: The one question to ask your lender about ${topic}\n\nThree moves buyers miss when headlines shift. No rate quote — just structure clarity.\n\nOffer: reply TIMELINE if you want a 15-min call this week.`,
    day7FollowUp: `Email: Still planning your move on ${topic}?\n\nIf timing opened up, we can map payment path + agent language in one call.\n\n${cta}`,
    day14Nurture: `Newsletter segment: ${topic} — what changed / what didn't\n\nSoft CTA to strategy review. Tag: ${input.launchHub?.fields.crmTag ?? "playbook-nurture"}`,
    agentReferralAlert:
      input.preset === "agent-partner"
        ? `Internal: New agent partner lead — ${campaignName}. Assign to partner development. Schedule intro within 24h.`
        : `Internal: If agentStatus = "Have an agent", notify partner LO to loop agent on intro email.`,
    internalTaskList: `☐ Verify lead source + UTM\n☐ Send lead magnet link if applicable\n☐ Schedule strategy review (20 min)\n☐ Log target payment + timeline in CRM\n☐ Add agent partner note if referral\n☐ Set Day 3 task reminder`,
  };

  const consent = {
    smsCallConsentCopy: `By checking this box, I agree to receive calls and text messages from The Loan Playbook at the number provided about my mortgage inquiry. Message frequency varies. Message and data rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase.`,
    emailOptInCopy: `I'd like to receive educational emails about mortgage strategy, market updates, and resources from The Loan Playbook. I can unsubscribe at any time.`,
  };

  return {
    preset: input.preset,
    fields: defaultFieldConfigs(input.preset),
    crmSequence,
    consent,
    generatedAt: new Date().toISOString(),
    modelUsed: "demo",
  };
}
