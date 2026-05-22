import {
  collectComplianceText,
  complianceCorpusText,
  type ComplianceTextChunk,
} from "./compliance-collect";
import {
  corpusHasEqualHousing,
  corpusHasNmls,
  runRuleScan,
} from "./compliance-rules";
import type {
  ComplianceApprovalItem,
  ComplianceDisclaimerItem,
  ComplianceIssue,
  ComplianceRecord,
  ComplianceRiskLevel,
  ComplianceScanRequest,
} from "./types";

const DEFAULT_APPROVAL_CHECKLIST: Omit<ComplianceApprovalItem, "checked">[] = [
  { id: "rates", label: "Rates/payments include APR or illustrative disclaimer" },
  { id: "approval", label: "No guaranteed-approval language" },
  { id: "nmls", label: "NMLS and company disclaimer on public-facing copy" },
  { id: "consent", label: "SMS/email consent matches form fields" },
  { id: "fair", label: "Fair lending — no discriminatory targeting" },
  { id: "urgency", label: "Urgency/scarcity reviewed or softened" },
  { id: "crm", label: "CRM follow-up sequence reviewed" },
  { id: "publish", label: "Published campaign page matches approved copy" },
];

function computeRiskScore(issues: ComplianceIssue[]): ComplianceRiskLevel {
  const highs = issues.filter(
    (i) => i.severity === "high" || i.severity === "critical",
  ).length;
  const mediums = issues.filter((i) => i.severity === "medium").length;
  if (highs >= 2 || issues.some((i) => i.severity === "critical")) return "high";
  if (highs >= 1 || mediums >= 3) return "medium";
  if (mediums >= 1 || issues.length >= 2) return "medium";
  return "low";
}

function buildDisclaimerChecklist(
  corpus: string,
  chunks: ComplianceTextChunk[],
  leadCapture?: ComplianceScanRequest["leadCapture"],
): ComplianceDisclaimerItem[] {
  const hasRateTalk = /\b(rate|apr|payment)\b/i.test(corpus);
  const phoneField = leadCapture?.fields.phone?.enabled;
  const emailField = leadCapture?.fields.email?.enabled;

  return [
    {
      id: "nmls",
      label: "NMLS / company disclaimer",
      present: corpusHasNmls(corpus),
      required: true,
    },
    {
      id: "equalHousing",
      label: "Equal Housing Lender",
      present: corpusHasEqualHousing(corpus),
      required: true,
    },
    {
      id: "notCommitment",
      label: "Not a commitment to lend",
      present: /not a commitment|subject to credit|educational only/i.test(corpus),
      required: true,
    },
    {
      id: "aprTerms",
      label: "APR / terms context (when rates cited)",
      present: !hasRateTalk || /\b(apr|annual percentage|terms vary)\b/i.test(corpus),
      required: hasRateTalk,
    },
    {
      id: "smsConsent",
      label: "SMS / call consent language",
      present: Boolean(leadCapture?.consent.smsCallConsentCopy?.trim()),
      required: Boolean(phoneField),
    },
    {
      id: "emailConsent",
      label: "Email opt-in consent language",
      present: Boolean(leadCapture?.consent.emailOptInCopy?.trim()),
      required: Boolean(emailField),
    },
    {
      id: "landingDisclaimer",
      label: "Landing page footer disclaimer",
      present: chunks.some(
        (c) => c.source === "landing:complianceDisclaimer" && c.text.length > 40,
      ),
      required: chunks.some((c) => c.source.startsWith("landing:")),
    },
  ];
}

function buildApprovalChecklist(
  issues: ComplianceIssue[],
  disclaimers: ComplianceDisclaimerItem[],
): ComplianceApprovalItem[] {
  const missingRequired = disclaimers.filter((d) => d.required && !d.present);
  return DEFAULT_APPROVAL_CHECKLIST.map((item) => {
    let checked = issues.length === 0;
    if (item.id === "nmls") {
      checked = !missingRequired.some((d) => d.id === "nmls");
    } else if (item.id === "rates") {
      checked = !issues.some((i) => i.category === "missingAprTerms");
    } else if (item.id === "approval") {
      checked = !issues.some((i) => i.category === "guaranteedApproval");
    } else if (item.id === "consent") {
      checked = !missingRequired.some(
        (d) => d.id === "smsConsent" || d.id === "emailConsent",
      );
    } else if (item.id === "fair") {
      checked = !issues.some((i) => i.category === "fairLending");
    } else if (item.id === "urgency") {
      checked = !issues.some(
        (i) =>
          i.category === "urgencyScarcity" || i.category === "triggerTerms",
      );
    } else if (item.id === "crm") {
      checked = !issues.some((i) => i.source.startsWith("crmSequence:"));
    }
    return { ...item, checked };
  });
}

export function runComplianceScan(
  request: ComplianceScanRequest,
  modelUsed = "demo",
): ComplianceRecord {
  const chunks = collectComplianceText({
    generationMode: request.generationMode,
    outputs: request.outputs,
    campaignOutputs: request.campaignOutputs,
    landingPage: request.landingPage,
    leadMagnet: request.leadMagnet,
    leadCapture: request.leadCapture,
    publishedStatus: request.publishedStatus ?? undefined,
  });

  const corpus = complianceCorpusText(chunks);
  const issues = runRuleScan(chunks);

  if (request.leadCapture) {
    const phoneOn = request.leadCapture.fields.phone?.enabled;
    const emailOn = request.leadCapture.fields.email?.enabled;
    if (phoneOn && !request.leadCapture.consent.smsCallConsentCopy?.trim()) {
      issues.push({
        id: `issue-consent-sms-${issues.length}`,
        severity: "high",
        category: "missingConsent",
        source: "leadCapture:consent:smsCallConsentCopy",
        excerpt: "(empty)",
        message: "Phone field enabled without SMS/call consent copy.",
        suggestedRewrite:
          "By submitting, you agree to receive calls and texts about your inquiry. Message/data rates may apply. Reply STOP to opt out.",
        saferVersion:
          "By submitting, you agree to receive calls and texts about your inquiry. Message/data rates may apply. Reply STOP to opt out.",
        applied: false,
      });
    }
    if (emailOn && !request.leadCapture.consent.emailOptInCopy?.trim()) {
      issues.push({
        id: `issue-consent-email-${issues.length}`,
        severity: "medium",
        category: "missingConsent",
        source: "leadCapture:consent:emailOptInCopy",
        excerpt: "(empty)",
        message: "Email field enabled without opt-in consent language.",
        suggestedRewrite:
          "You may receive educational emails about mortgage strategy. Unsubscribe anytime.",
        saferVersion:
          "You may receive educational emails about mortgage strategy. Unsubscribe anytime.",
        applied: false,
      });
    }
  }

  if (!corpusHasNmls(corpus)) {
    issues.push({
      id: `issue-nmls-${issues.length}`,
      severity: "medium",
      category: "missingDisclaimer",
      source: "package:footer",
      excerpt: "(not found in corpus)",
      message: "NMLS or company disclaimer not detected across scanned assets.",
      suggestedRewrite:
        "NMLS # [Your NMLS] | [Company Name] | Equal Housing Lender. Educational only — not a commitment to lend.",
      saferVersion:
        "NMLS # [Your NMLS] | [Company Name] | Equal Housing Lender. Educational only — not a commitment to lend.",
      applied: false,
    });
  }

  const missingDisclaimers = buildDisclaimerChecklist(
    corpus,
    chunks,
    request.leadCapture,
  );
  const riskScore = computeRiskScore(issues);
  const finalApprovalChecklist = buildApprovalChecklist(issues, missingDisclaimers);

  return {
    riskScore,
    issues,
    missingDisclaimers,
    finalApprovalChecklist,
    reviewerNotes: "",
    reviewed: false,
    reviewedAt: null,
    scannedAt: new Date().toISOString(),
    modelUsed,
  };
}
