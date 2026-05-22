import { RULE_CATEGORY_PATTERNS } from "./compliance-rules";
import type {
  CampaignOutputs,
  ComplianceIssue,
  ContentOutputs,
  GenerationMode,
  LandingPageRecord,
  LeadCaptureRecord,
  LeadMagnetRecord,
} from "./types";

export type ComplianceApplyResult = {
  outputs: ContentOutputs | null;
  campaignOutputs: CampaignOutputs | null;
  landingPage: LandingPageRecord | null;
  leadMagnet: LeadMagnetRecord | null;
  leadCapture: LeadCaptureRecord | null;
  appliedIssueIds: string[];
};

function softenText(text: string, issue: ComplianceIssue): string {
  const pattern = RULE_CATEGORY_PATTERNS[issue.category];
  if (pattern) {
    const next = text.replace(pattern, issue.suggestedRewrite);
    if (next !== text) return next;
  }
  if (issue.saferVersion && text.length < 200 && issue.excerpt !== "(empty)") {
    return issue.saferVersion;
  }
  if (issue.excerpt === "(empty)" || issue.excerpt === "(not found in corpus)") {
    return issue.saferVersion ?? issue.suggestedRewrite;
  }
  return `${text}\n\n${issue.suggestedRewrite}`;
}

function parseSource(source: string): { realm: string; key: string; subKey?: string } {
  const parts = source.split(":");
  return { realm: parts[0] ?? "", key: parts[1] ?? "", subKey: parts[2] };
}

function setBySource(
  source: string,
  text: string,
  state: ComplianceApplyResult,
): boolean {
  const { realm, key, subKey } = parseSource(source);
  if (realm === "content" && state.outputs && key in state.outputs) {
    state.outputs = { ...state.outputs, [key]: text };
    return true;
  }
  if (realm === "campaign" && state.campaignOutputs && key in state.campaignOutputs) {
    state.campaignOutputs = { ...state.campaignOutputs, [key]: text };
    return true;
  }
  if (realm === "landing" && state.landingPage && key in state.landingPage.sections) {
    state.landingPage = {
      ...state.landingPage,
      sections: { ...state.landingPage.sections, [key]: text },
    };
    return true;
  }
  if (realm === "leadMagnet" && state.leadMagnet && key in state.leadMagnet.sections) {
    state.leadMagnet = {
      ...state.leadMagnet,
      sections: { ...state.leadMagnet.sections, [key]: text },
    };
    return true;
  }
  if (realm === "leadCapture" && state.leadCapture && key === "consent") {
    if (subKey === "smsCallConsentCopy") {
      state.leadCapture = {
        ...state.leadCapture,
        consent: {
          ...state.leadCapture.consent,
          smsCallConsentCopy: text,
        },
      };
      return true;
    }
    if (subKey === "emailOptInCopy") {
      state.leadCapture = {
        ...state.leadCapture,
        consent: {
          ...state.leadCapture.consent,
          emailOptInCopy: text,
        },
      };
      return true;
    }
  }
  if (realm === "crmSequence" && state.leadCapture && key in state.leadCapture.crmSequence) {
    state.leadCapture = {
      ...state.leadCapture,
      crmSequence: { ...state.leadCapture.crmSequence, [key]: text },
    };
    return true;
  }
  if (realm === "package" && state.landingPage) {
    state.landingPage = {
      ...state.landingPage,
      sections: {
        ...state.landingPage.sections,
        complianceDisclaimer: text,
      },
    };
    return true;
  }
  return false;
}

function getTextBySource(source: string, state: ComplianceApplyResult): string | null {
  const { realm, key, subKey } = parseSource(source);
  if (realm === "content" && state.outputs) return state.outputs[key as keyof ContentOutputs] ?? null;
  if (realm === "campaign" && state.campaignOutputs) {
    return state.campaignOutputs[key as keyof CampaignOutputs] ?? null;
  }
  if (realm === "landing" && state.landingPage) {
    return state.landingPage.sections[key as keyof LandingPageRecord["sections"]] ?? null;
  }
  if (realm === "leadMagnet" && state.leadMagnet) {
    return state.leadMagnet.sections[key as keyof LeadMagnetRecord["sections"]] ?? null;
  }
  if (realm === "leadCapture" && key === "consent") {
    if (subKey === "smsCallConsentCopy") {
      return state.leadCapture?.consent.smsCallConsentCopy ?? null;
    }
    if (subKey === "emailOptInCopy") {
      return state.leadCapture?.consent.emailOptInCopy ?? null;
    }
  }
  if (realm === "crmSequence" && state.leadCapture) {
    return state.leadCapture.crmSequence[key as keyof LeadCaptureRecord["crmSequence"]] ?? null;
  }
  if (realm === "package" && state.landingPage) {
    return state.landingPage.sections.complianceDisclaimer;
  }
  return null;
}

export function applyComplianceRewrites(input: {
  issues: ComplianceIssue[];
  generationMode: GenerationMode;
  outputs: ContentOutputs | null;
  campaignOutputs: CampaignOutputs | null;
  landingPage: LandingPageRecord | null;
  leadMagnet: LeadMagnetRecord | null;
  leadCapture: LeadCaptureRecord | null;
  onlyIssueId?: string;
}): ComplianceApplyResult {
  const state: ComplianceApplyResult = {
    outputs: input.outputs ? { ...input.outputs } : null,
    campaignOutputs: input.campaignOutputs ? { ...input.campaignOutputs } : null,
    landingPage: input.landingPage ? { ...input.landingPage, sections: { ...input.landingPage.sections } } : null,
    leadMagnet: input.leadMagnet ? { ...input.leadMagnet, sections: { ...input.leadMagnet.sections } } : null,
    leadCapture: input.leadCapture
      ? {
          ...input.leadCapture,
          consent: { ...input.leadCapture.consent },
          crmSequence: { ...input.leadCapture.crmSequence },
        }
      : null,
    appliedIssueIds: [],
  };

  const targets = input.onlyIssueId
    ? input.issues.filter((i) => i.id === input.onlyIssueId)
    : input.issues.filter((i) => !i.applied);

  for (const issue of targets) {
    const current = getTextBySource(issue.source, state);
    const nextText = softenText(current ?? "", issue);
    if (setBySource(issue.source, nextText, state)) {
      state.appliedIssueIds.push(issue.id);
    }
  }

  return state;
}
