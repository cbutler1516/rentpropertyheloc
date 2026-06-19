import { PLATFORM_EMAIL, PLATFORM_PHONE_DISPLAY } from "@/lib/contact";

/** Branded review dashboard visual (see RequestReviewDashboard) */
export const TEAM_TRUST_IMAGE_ALT =
  "Review process steps showing property submission, review progress, and personalized follow-up";

/** Landscape frame for trust visuals */
export const TEAM_TRUST_IMAGE_FRAME_CLASS = "aspect-[5/3]";

export { BOOK_STRATEGY_CALL_LABEL as HOMEPAGE_TEAM_CTA_PRIMARY } from "@/lib/contact";

export const INVESTOR_SUPPORT_SECTION = {
  sectionLabel: "What happens after you submit",
  headline: "What Happens After You Submit?",
  subheadline:
    "Every request is reviewed by a financing specialist to help evaluate potential home equity and HELOC options for your property.",
  timeline: [
    {
      title: "Property Review",
      description: "Review the submitted property information.",
    },
    {
      title: "Equity & Capital Assessment",
      description: "Evaluate available equity and financing scenarios.",
    },
    {
      title: "Financing Strategy Review",
      description: "Review potential options based on your goals.",
    },
    {
      title: "Team Follow-Up",
      description: "Discuss next steps and answer questions.",
    },
  ],
  benefitsHeadline: "Why property owners start here",
  benefits: [
    "Reviewed by a financing specialist",
    "No full loan application required to start",
    "Explore HELOC and home equity options",
    "Direct access to our team if questions arise",
  ] as const,
} as const;

/** @deprecated Use INVESTOR_SUPPORT_SECTION */
export const COMPANY_TRUST = {
  headline: INVESTOR_SUPPORT_SECTION.headline,
  body: [INVESTOR_SUPPORT_SECTION.subheadline],
  trustPoints: INVESTOR_SUPPORT_SECTION.benefits,
} as const;

export const ABOUT_PLATFORM = {
  headline: "About The Loan Playbook",
  summary:
    "The Loan Playbook is a modern mortgage company built around strategy — Deal Analyzer technology, playbook reports, and education-first guidance for buyers, investors, agents, and commercial clients. Licensed partner network; subject to credit, income, asset, property, and program approval.",
  aboutHref: "/about",
  aboutLinkLabel: "About Chris Butler",
  contactEmail: PLATFORM_EMAIL,
  contactPhone: PLATFORM_PHONE_DISPLAY,
} as const;

export const PLATFORM_COMPARISON = {
  headline: "Why clients use The Loan Playbook",
  description:
    "Rate-quote sites push one product. We combine technology with strategy-first playbook reports.",
  columns: {
    online: "Typical rate sites",
    us: "The Loan Playbook",
  },
  rows: [
    {
      label: "Guidance",
      online: "Automated, product-first flow",
      us: "Financing specialists plus licensed lending partners",
    },
    {
      label: "Options reviewed",
      online: "Often one pre-selected product",
      us: "Multiple equity paths—HELOC, second mortgage & more",
    },
    {
      label: "Investor expertise",
      online: "Generic consumer mortgage focus",
      us: "Built for rental & portfolio strategy",
    },
    {
      label: "Next step",
      online: "Submit and wait",
      us: "Personalized review and partner follow-up",
    },
  ],
} as const;
