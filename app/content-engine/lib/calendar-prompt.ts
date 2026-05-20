import {
  DEFAULT_BRAND_VOICE_ID,
  formatBrandVoiceForPrompt,
  getBrandVoice,
  type BrandVoiceId,
} from "./brand-voices";
import { CALENDAR_DAY_COUNT } from "./types";

const DAY_SCHEMA = `{
  "dayIndex": number (1-${CALENDAR_DAY_COUNT}),
  "dayLabel": string (e.g. "Monday — Day 1"),
  "platform": "tiktok-reels" | "facebook" | "linkedin" | "email" | "blog",
  "postType": string,
  "audienceLens": "agent" | "consumer",
  "hook": string,
  "caption": string,
  "cta": string,
  "suggestedVisual": string,
  "videoPrompt": string (Sora/HeyGen prompt when platform is tiktok-reels; empty string otherwise),
  "landingPageTieIn": string,
  "status": "draft"
}`;

export function buildCalendarSystemPrompt(
  brandVoiceId: BrandVoiceId = DEFAULT_BRAND_VOICE_ID,
) {
  const voice = getBrandVoice(brandVoiceId);
  return `You are The Loan Playbook Content Calendar Strategist — you turn mortgage content packages into a 7-day publishing plan.

${formatBrandVoiceForPrompt(voice)}

Rules:
- Educational tone; never guarantee rates, approvals, or outcomes.
- Mix platforms across the week: TikTok/Reels, Facebook, LinkedIn, Email, Blog.
- Alternate agent-forwardable posts and consumer education.
- Hooks must stop the scroll; captions are platform-appropriate length.
- CTAs consultative ("Book a strategy review", "Comment PLAYBOOK") not spammy.
- landingPageTieIn references how the post drives to a lead magnet or strategy review.
- status is always "draft" for new days.

Return ONLY valid JSON (no markdown fences):
{
  "weekTheme": string,
  "days": [ ${DAY_SCHEMA}, ... exactly ${CALENDAR_DAY_COUNT} days ]
}`;
}

export function buildCalendarUserPrompt(input: {
  sourceInput: string;
  topic: string;
  title: string;
  contentSummary?: string;
  landingSummary?: string;
}) {
  return `Package title: ${input.title}
Topic: ${input.topic}

Source material:
${input.sourceInput.trim()}

${input.contentSummary ? `Content package summary:\n${input.contentSummary}\n` : ""}
${input.landingSummary ? `Landing page angle to tie posts to:\n${input.landingSummary}\n` : ""}
Build a complete 7-day content calendar with varied platforms and post types.`;
}

export function buildRegenerateDaySystemPrompt(
  brandVoiceId: BrandVoiceId = DEFAULT_BRAND_VOICE_ID,
) {
  const voice = getBrandVoice(brandVoiceId);
  return `You are The Loan Playbook Content Calendar Strategist. Regenerate ONE calendar day.

${formatBrandVoiceForPrompt(voice)}

Return ONLY valid JSON (no markdown fences) — a single day object:
${DAY_SCHEMA}`;
}

export function buildRegenerateDayUserPrompt(input: {
  dayIndex: number;
  sourceInput: string;
  topic: string;
  title: string;
  weekTheme: string;
  siblingSummary?: string;
}) {
  return `Regenerate day ${input.dayIndex} only for calendar: "${input.title}"
Week theme: ${input.weekTheme}
Topic: ${input.topic}

Source material:
${input.sourceInput.trim()}

${input.siblingSummary ? `Other days in this week (do not duplicate):\n${input.siblingSummary}\n` : ""}
Write a fresh day ${input.dayIndex} entry that fits the week but stands alone.`;
}
