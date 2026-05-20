import type { LandingPageSectionKey } from "./types";

export type LandingPageTabConfig = {
  key: LandingPageSectionKey;
  label: string;
  shortLabel: string;
  description: string;
};

export const LANDING_PAGE_TABS: LandingPageTabConfig[] = [
  {
    key: "heroHeadline",
    label: "Hero headline",
    shortLabel: "Headline",
    description: "Primary above-the-fold hook.",
  },
  {
    key: "heroSubheadline",
    label: "Hero subheadline",
    shortLabel: "Subhead",
    description: "Supporting line under the headline.",
  },
  {
    key: "primaryCta",
    label: "Primary CTA",
    shortLabel: "CTA 1",
    description: "Main button or action text.",
  },
  {
    key: "secondaryCta",
    label: "Secondary CTA",
    shortLabel: "CTA 2",
    description: "Alternate lower-friction action.",
  },
  {
    key: "problemSection",
    label: "Problem section",
    shortLabel: "Problem",
    description: "Pain points your reader recognizes.",
  },
  {
    key: "whyItMattersNow",
    label: "Why it matters now",
    shortLabel: "Urgency",
    description: "Timely reason to act without fear bait.",
  },
  {
    key: "loanPlaybookExplanation",
    label: "Loan Playbook explanation",
    shortLabel: "Playbook",
    description: "How you educate vs. rate spam.",
  },
  {
    key: "keyBenefits",
    label: "3 key benefits",
    shortLabel: "Benefits",
    description: "Numbered value pillars.",
  },
  {
    key: "whoThisIsFor",
    label: "Who this is for",
    shortLabel: "Audience",
    description: "Ideal reader fit.",
  },
  {
    key: "faqSection",
    label: "FAQ section",
    shortLabel: "FAQ",
    description: "4–6 Q&A pairs.",
  },
  {
    key: "complianceDisclaimer",
    label: "Compliance disclaimer",
    shortLabel: "Legal",
    description: "Educational, NMLS-safe footer copy.",
  },
  {
    key: "leadFormFields",
    label: "Lead form fields",
    shortLabel: "Form",
    description: "Fields, labels, and microcopy.",
  },
  {
    key: "thankYouPageCopy",
    label: "Thank-you page",
    shortLabel: "Thanks",
    description: "Post-submit confirmation page.",
  },
  {
    key: "followUpEmailCopy",
    label: "Follow-up email",
    shortLabel: "Email",
    description: "Auto-response after form submit.",
  },
];

export function getLandingPageTab(key: LandingPageSectionKey) {
  return LANDING_PAGE_TABS.find((tab) => tab.key === key);
}
