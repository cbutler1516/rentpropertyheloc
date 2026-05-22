import type {
  ComplianceIssue,
  ComplianceIssueCategory,
  ComplianceIssueSeverity,
} from "./types";
import type { ComplianceTextChunk } from "./compliance-collect";

type RuleHit = {
  category: ComplianceIssueCategory;
  severity: ComplianceIssueSeverity;
  pattern: RegExp;
  message: string;
  rewrite: string;
};

const RULES: RuleHit[] = [
  {
    category: "guaranteedApproval",
    severity: "high",
    pattern:
      /\b(guaranteed approval|everyone (is )?approved|pre-?approved for all|100% approval|approval guaranteed)\b/i,
    message: "Language may imply guaranteed approval.",
    rewrite:
      "Subject to credit approval and program guidelines. Pre-qualification does not guarantee final approval.",
  },
  {
    category: "misleadingRates",
    severity: "high",
    pattern:
      /\b(payments from \$|rates as low as|lock in this rate|payment guaranteed)\b/i,
    message: "Specific payment or rate claim may need APR/terms context.",
    rewrite:
      "Illustrative payment examples only; actual rate, APR, and payment depend on credit, loan amount, and terms.",
  },
  {
    category: "unsupportedSuperlatives",
    severity: "medium",
    pattern: /\b(best lender|lowest rate(s)? in|#1 lender|cheapest mortgage)\b/i,
    message: "Unsupported superlative or ranking claim.",
    rewrite:
      "Compare programs and structure with a licensed loan officer — terms vary by borrower and property.",
  },
  {
    category: "overpromising",
    severity: "high",
    pattern:
      /\b(instant approval|same-?day funding|guaranteed savings|no risk|can't lose)\b/i,
    message: "Overpromises speed, savings, or certainty.",
    rewrite:
      "Timelines vary by file completeness, underwriting, and third-party conditions.",
  },
  {
    category: "triggerTerms",
    severity: "medium",
    pattern:
      /\b(limited time only|act now|last chance|don't wait|before it's too late)\b/i,
    message: "Urgency trigger term — pair with clear disclosures.",
    rewrite:
      "If you're exploring options this season, request a strategy review to compare scenarios.",
  },
  {
    category: "urgencyScarcity",
    severity: "medium",
    pattern: /\b(only \d+ spots|expires tonight|hurry|while supplies last)\b/i,
    message: "Scarcity/urgency language can inflate compliance risk.",
    rewrite: "Schedule a review when ready — educational content, not a limited-time guarantee.",
  },
  {
    category: "fairLending",
    severity: "high",
    pattern:
      /\b(only for (white|black|hispanic)|no (bad|poor) credit|perfect credit only)\b/i,
    message: "Language may raise fair lending concerns.",
    rewrite:
      "Programs vary by credit, income, and property — ask which options fit your profile.",
  },
];

function excerptAround(text: string, match: string, max = 120): string {
  const idx = text.toLowerCase().indexOf(match.toLowerCase());
  if (idx < 0) return text.slice(0, max);
  const start = Math.max(0, idx - 40);
  return text.slice(start, start + max).trim();
}

export function runRuleScan(chunks: ComplianceTextChunk[]): ComplianceIssue[] {
  const issues: ComplianceIssue[] = [];
  let id = 0;

  for (const chunk of chunks) {
    for (const rule of RULES) {
      const match = chunk.text.match(rule.pattern);
      if (!match) continue;
      issues.push({
        id: `issue-${id++}`,
        severity: rule.severity,
        category: rule.category,
        source: chunk.source,
        excerpt: excerptAround(chunk.text, match[0]),
        message: rule.message,
        suggestedRewrite: rule.rewrite,
        saferVersion: rule.rewrite,
        applied: false,
      });
    }

    const hasRateTalk = /\b(rate|apr|payment|%\s*down)\b/i.test(chunk.text);
    const hasAprContext = /\b(apr|annual percentage|terms apply|subject to credit)\b/i.test(
      chunk.text,
    );
    if (hasRateTalk && !hasAprContext && chunk.source.includes("landing")) {
      issues.push({
        id: `issue-${id++}`,
        severity: "medium",
        category: "missingAprTerms",
        source: chunk.source,
        excerpt: chunk.text.slice(0, 100),
        message: "Rate/payment mentioned without APR or terms context nearby.",
        suggestedRewrite:
          "Add: 'APR, payment, and terms vary. Not a commitment to lend. Educational only.'",
        saferVersion:
          "Rates and payments shown are illustrative; APR and terms depend on credit, loan amount, and program guidelines.",
        applied: false,
      });
    }
  }

  return issues;
}

export function corpusHasNmls(corpus: string): boolean {
  return /\bNMLS\b/i.test(corpus) || /\bNMLS\s*#/i.test(corpus);
}

export function corpusHasEqualHousing(corpus: string): boolean {
  return /equal housing/i.test(corpus);
}

export const RULE_CATEGORY_PATTERNS: Partial<
  Record<ComplianceIssueCategory, RegExp>
> = {
  guaranteedApproval:
    /\b(guaranteed approval|everyone (is )?approved|pre-?approved for all|100% approval|approval guaranteed)\b/i,
  misleadingRates:
    /\b(payments from \$|rates as low as|lock in this rate|payment guaranteed)\b/i,
  unsupportedSuperlatives:
    /\b(best lender|lowest rate(s)? in|#1 lender|cheapest mortgage)\b/i,
  overpromising:
    /\b(instant approval|same-?day funding|guaranteed savings|no risk|can't lose)\b/i,
  triggerTerms:
    /\b(limited time only|act now|last chance|don't wait|before it's too late)\b/i,
  urgencyScarcity: /\b(only \d+ spots|expires tonight|hurry|while supplies last)\b/i,
  fairLending:
    /\b(only for (white|black|hispanic)|no (bad|poor) credit|perfect credit only)\b/i,
};
