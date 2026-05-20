import {
  DEFAULT_BRAND_VOICE_ID,
  formatBrandVoiceForPrompt,
  getBrandVoice,
  type BrandVoiceId,
} from "./brand-voices";
import { getLeadCapturePreset, type LeadCapturePreset } from "./lead-capture-presets";
import { CRM_SEQUENCE_KEYS } from "./types";

const CRM_SCHEMA = CRM_SEQUENCE_KEYS.map((key) => `"${key}": string`).join(
  ",\n  ",
);

export function buildLeadCaptureSystemPrompt(
  brandVoiceId: BrandVoiceId = DEFAULT_BRAND_VOICE_ID,
) {
  const voice = getBrandVoice(brandVoiceId);
  return `You are The Loan Playbook Lead Capture & CRM Architect.

${formatBrandVoiceForPrompt(voice)}

Rules:
- Educational, consultative tone — never guarantee rates or approvals.
- SMS/email must be compliant; include opt-out language where appropriate.
- internalTaskList: bullet tasks for LO/ops (not borrower-facing).
- agentReferralAlert: only if preset is agent-related or agentStatus captured.

Return ONLY valid JSON (no markdown fences):
{
  ${CRM_SCHEMA},
  "smsCallConsentCopy": string,
  "emailOptInCopy": string
}`;
}

export function buildLeadCaptureUserPrompt(input: {
  preset: LeadCapturePreset;
  topic: string;
  title: string;
  sourceInput: string;
  landingSummary?: string;
  launchSummary?: string;
}) {
  const presetConfig = getLeadCapturePreset(input.preset);
  return `Lead capture preset: ${presetConfig.label}
${presetConfig.description}

Package: ${input.title}
Topic: ${input.topic}

Source:
${input.sourceInput.trim()}

${input.landingSummary ? `Landing page:\n${input.landingSummary}\n` : ""}
${input.launchSummary ? `Launch hub:\n${input.launchSummary}\n` : ""}
Write CRM follow-up sequence and compliance-safe consent language for this preset.`;
}
