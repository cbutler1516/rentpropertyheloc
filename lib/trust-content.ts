import { PLATFORM_EMAIL } from "@/lib/contact";

/** Branded review dashboard visual (see RequestReviewDashboard) */
export const TEAM_TRUST_IMAGE_ALT =
  "Review process steps showing property submission, review progress, and personalized follow-up";

/** Landscape frame for trust visuals */
export const TEAM_TRUST_IMAGE_FRAME_CLASS = "aspect-[5/3]";

export { BOOK_STRATEGY_CALL_LABEL as HOMEPAGE_TEAM_CTA_PRIMARY } from "@/lib/contact";

export const COMPANY_TRUST = {
  headline: "Real People. Real Guidance.",
  body: [
    "Every request is reviewed by a financing specialist — not just an automated system.",
    "If questions come up, our team is available to help you understand your options and next steps.",
  ],
  trustPoints: [
    "Personalized Review",
    "Financing Strategy Support",
    "Direct Access To Our Team",
  ] as const,
} as const;

export const ABOUT_PLATFORM = {
  headline: "About This Platform",
  summary:
    "Rent Property HELOC is a lead generation and information platform built for rental property investors. We combine a fast online review with financing specialists and licensed lending partners who may help you explore HELOC, second mortgage, and other equity paths—subject to qualification, underwriting, property eligibility, and applicable guidelines.",
  aboutHref: "/about",
  aboutLinkLabel: "Learn more about us",
  contactEmail: PLATFORM_EMAIL,
} as const;

export const PLATFORM_COMPARISON = {
  headline: "Why Investors Use This Platform",
  description:
    "Online platforms automate one product. We combine technology with licensed lending partner expertise.",
  columns: {
    online: "Online Platforms",
    us: "Rent Property HELOC",
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
