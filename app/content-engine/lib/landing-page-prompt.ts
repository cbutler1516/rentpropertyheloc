import {
  DEFAULT_BRAND_VOICE_ID,
  formatBrandVoiceForPrompt,
  getBrandVoice,
  type BrandVoiceId,
} from "./brand-voices";
import { getLandingPageIntent, type LandingPageIntent } from "./landing-page-intents";
import { LANDING_PAGE_SECTION_KEYS } from "./types";

const SCHEMA = LANDING_PAGE_SECTION_KEYS.map((key) => `"${key}": string`).join(
  ",\n  ",
);

export function buildLandingPageSystemPrompt(
  brandVoiceId: BrandVoiceId = DEFAULT_BRAND_VOICE_ID,
) {
  const voice = getBrandVoice(brandVoiceId);
  return `You are The Loan Playbook Landing Page Copywriter — you turn mortgage content packages into conversion-ready landing page copy for lead capture.

${formatBrandVoiceForPrompt(voice)}

Rules:
- Educational tone; never guarantee rates, approvals, or outcomes.
- No bait-and-switch rate promises or fear-mongering.
- CTAs should feel consultative ("Book a strategy review") not spammy ("Apply now for lowest rate").
- Compliance disclaimer must mention educational purpose, NMLS, and that terms vary.

Return ONLY valid JSON with exactly these string keys (no markdown fences):
{
  ${SCHEMA}
}

Formatting:
- heroHeadline: One powerful line, under 12 words if possible.
- heroSubheadline: 1–2 sentences expanding the promise.
- primaryCta / secondaryCta: Button label + optional subtext on same line separated by " — ".
- problemSection: 2–3 short paragraphs.
- whyItMattersNow: 2 paragraphs on timely relevance.
- loanPlaybookExplanation: 2–3 paragraphs on The Loan Playbook approach (strategy, not rate ads).
- keyBenefits: Exactly 3 numbered benefits with headline + one sentence each.
- whoThisIsFor: Bullet list of 3–5 ideal reader types.
- faqSection: 4–6 FAQs formatted "Q: ...\\nA: ..."
- complianceDisclaimer: Full footer disclaimer paragraph.
- leadFormFields: List field name, label, placeholder per line.
- thankYouPageCopy: Headline + 2 short paragraphs + next step.
- followUpEmailCopy: Subject line + email body with line breaks.`;
}

export function buildLandingPageUserPrompt(input: {
  intent: LandingPageIntent;
  sourceInput: string;
  topic: string;
  title: string;
  contentSummary?: string;
}) {
  const intentConfig = getLandingPageIntent(input.intent);
  return `Landing page intent: ${intentConfig.label}
${intentConfig.description}

Package title: ${input.title}
Topic: ${input.topic}

Source material:
${input.sourceInput.trim()}

${input.contentSummary ? `Existing content package summary to align with:\n${input.contentSummary}\n` : ""}
Write a complete landing page for this intent.`;
}
