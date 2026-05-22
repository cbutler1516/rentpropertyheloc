import { CRM_SEQUENCE_KEYS } from "./types";
import { OUTPUT_TAB_KEYS, CAMPAIGN_OUTPUT_TAB_KEYS } from "./types";
import { LANDING_PAGE_SECTION_KEYS } from "./types";
import { LEAD_MAGNET_SECTION_KEYS } from "./types";
import type {
  CampaignOutputs,
  ContentOutputs,
  GenerationMode,
  LandingPageRecord,
  LeadCaptureRecord,
  LeadMagnetRecord,
  PublishedPageStatus,
} from "./types";

export type ComplianceTextChunk = {
  source: string;
  label: string;
  text: string;
};

export function collectComplianceText(input: {
  generationMode: GenerationMode;
  outputs?: ContentOutputs | null;
  campaignOutputs?: CampaignOutputs | null;
  landingPage?: LandingPageRecord | null;
  leadMagnet?: LeadMagnetRecord | null;
  leadCapture?: LeadCaptureRecord | null;
  publishedStatus?: PublishedPageStatus | null;
}): ComplianceTextChunk[] {
  const chunks: ComplianceTextChunk[] = [];

  if (input.generationMode === "campaign" && input.campaignOutputs) {
    for (const key of CAMPAIGN_OUTPUT_TAB_KEYS) {
      const text = input.campaignOutputs[key]?.trim();
      if (text) {
        chunks.push({
          source: `campaign:${key}`,
          label: `Campaign · ${key}`,
          text,
        });
      }
    }
  } else if (input.outputs) {
    for (const key of OUTPUT_TAB_KEYS) {
      const text = input.outputs[key]?.trim();
      if (text) {
        chunks.push({
          source: `content:${key}`,
          label: `Content · ${key}`,
          text,
        });
      }
    }
  }

  if (input.landingPage) {
    for (const key of LANDING_PAGE_SECTION_KEYS) {
      const text = input.landingPage.sections[key]?.trim();
      if (text) {
        chunks.push({
          source: `landing:${key}`,
          label: `Landing · ${key}`,
          text,
        });
      }
    }
  }

  if (input.leadMagnet) {
    for (const key of LEAD_MAGNET_SECTION_KEYS) {
      const text = input.leadMagnet.sections[key]?.trim();
      if (text) {
        chunks.push({
          source: `leadMagnet:${key}`,
          label: `Lead magnet · ${key}`,
          text,
        });
      }
    }
  }

  if (input.leadCapture) {
    if (input.leadCapture.consent.smsCallConsentCopy) {
      chunks.push({
        source: "leadCapture:consent:smsCallConsentCopy",
        label: "Lead capture · SMS/call consent",
        text: input.leadCapture.consent.smsCallConsentCopy,
      });
    }
    if (input.leadCapture.consent.emailOptInCopy) {
      chunks.push({
        source: "leadCapture:consent:emailOptInCopy",
        label: "Lead capture · Email opt-in",
        text: input.leadCapture.consent.emailOptInCopy,
      });
    }
    for (const key of CRM_SEQUENCE_KEYS) {
      const text = input.leadCapture.crmSequence[key]?.trim();
      if (text) {
        chunks.push({
          source: `crmSequence:${key}`,
          label: `CRM sequence · ${key}`,
          text,
        });
      }
    }
  }

  if (input.publishedStatus?.isPublished && input.landingPage) {
    chunks.push({
      source: "publicCampaign:summary",
      label: "Public campaign page",
      text: [
        input.landingPage.sections.heroHeadline,
        input.landingPage.sections.heroSubheadline,
        input.landingPage.sections.primaryCta,
        input.landingPage.sections.problemSection,
        input.landingPage.sections.complianceDisclaimer,
      ]
        .filter(Boolean)
        .join("\n\n"),
    });
  }

  return chunks;
}

export function complianceCorpusText(chunks: ComplianceTextChunk[]): string {
  return chunks.map((c) => `[${c.source}]\n${c.text}`).join("\n\n---\n\n");
}
