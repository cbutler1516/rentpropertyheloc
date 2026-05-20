import {
  DEFAULT_BRAND_VOICE_ID,
  formatBrandVoiceForPrompt,
  getBrandVoice,
  type BrandVoiceId,
} from "./brand-voices";
import { getLeadMagnetType, type LeadMagnetType } from "./lead-magnet-types";
import { LEAD_MAGNET_SECTION_KEYS } from "./types";

const SCHEMA = LEAD_MAGNET_SECTION_KEYS.map((key) => `"${key}": string`).join(
  ",\n  ",
);

export function buildLeadMagnetSystemPrompt(
  brandVoiceId: BrandVoiceId = DEFAULT_BRAND_VOICE_ID,
) {
  const voice = getBrandVoice(brandVoiceId);
  return `You are The Loan Playbook Lead Magnet Writer — you turn content packages into polished PDF-ready lead magnet reports.

${formatBrandVoiceForPrompt(voice)}

Rules:
- Educational tone; never guarantee rates, approvals, or outcomes.
- Write for print/PDF: clear headings, scannable bullets, complete sentences.
- Synthesize package, landing page, and calendar context when provided.
- No rate bait, fear-mongering, or bait-and-switch promises.
- complianceDisclaimer must mention educational purpose, NMLS placeholder, Equal Housing.

Return ONLY valid JSON with exactly these string keys (no markdown fences):
{
  ${SCHEMA}
}

Formatting:
- coverTitle: Bold report title (under 12 words).
- subtitle: One line promise under the title.
- executiveSummary: 2–3 short paragraphs.
- whyItMattersNow: 2 paragraphs on timely relevance.
- keyTakeaways: 5–7 bullet points.
- mainEducationalSection: 3–5 subsections with headers; deepest content block.
- mistakesToAvoid: 4–6 numbered mistakes with brief fixes.
- actionChecklist: Checkbox-style list (use ☐ prefix per line).
- faq: 4–6 pairs formatted "Q: ...\\nA: ..."
- ctaPage: Headline + 2 paragraphs + clear next step.
- complianceDisclaimer: Full footer paragraph.`;
}

export function buildLeadMagnetUserPrompt(input: {
  type: LeadMagnetType;
  sourceInput: string;
  topic: string;
  title: string;
  contentSummary?: string;
  landingSummary?: string;
  calendarSummary?: string;
}) {
  const typeConfig = getLeadMagnetType(input.type);
  return `Lead magnet type: ${typeConfig.label}
${typeConfig.description}

Package title: ${input.title}
Topic: ${input.topic}

Source material:
${input.sourceInput.trim()}

${input.contentSummary ? `Content package:\n${input.contentSummary}\n` : ""}
${input.landingSummary ? `Landing page:\n${input.landingSummary}\n` : ""}
${input.calendarSummary ? `7-day calendar:\n${input.calendarSummary}\n` : ""}
Write a complete downloadable lead magnet report for this type.`;
}
