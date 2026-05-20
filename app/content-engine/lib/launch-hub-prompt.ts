import {
  DEFAULT_BRAND_VOICE_ID,
  formatBrandVoiceForPrompt,
  getBrandVoice,
  type BrandVoiceId,
} from "./brand-voices";

export function buildLaunchHubSystemPrompt(
  brandVoiceId: BrandVoiceId = DEFAULT_BRAND_VOICE_ID,
) {
  const voice = getBrandVoice(brandVoiceId);
  return `You are The Loan Playbook Campaign Launch Strategist.

${formatBrandVoiceForPrompt(voice)}

Return ONLY valid JSON (no markdown fences):
{
  "followUpSequenceIdea": string (5-step day-by-day sequence, line breaks as \\n),
  "crmFollowUpPlan": string (CRM tags, tasks, emails — operational plan)
}

Educational tone. No rate guarantees.`;
}

export function buildLaunchHubUserPrompt(input: {
  topic: string;
  audience: string;
  campaignName: string;
  campaignGoal: string;
  primaryOffer: string;
  funnelSummary: string;
}) {
  return `Campaign: ${input.campaignName}
Goal: ${input.campaignGoal}
Topic: ${input.topic}
Audience: ${input.audience}
Primary offer: ${input.primaryOffer}

Funnel context:
${input.funnelSummary}

Write a follow-up sequence idea and CRM follow-up plan for this launch.`;
}
