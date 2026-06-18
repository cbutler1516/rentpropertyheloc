import { MORTGAGE_COMPLIANCE_LINES } from "@/lib/playbook-content";

export type MarketingPageConfig = {
  path: string;
  eyebrow: string;
  title: string;
  lead: string;
  bullets: readonly string[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  seo: {
    title: string;
    description: string;
  };
};

export const BUYERS_PAGE: MarketingPageConfig = {
  path: "/buyers",
  eyebrow: "Buyers",
  title: "Purchase-loan strategy — know your number before you shop",
  lead: "Payment, cash to close, and structure clarity for first-time buyers, move-up buyers, and jumbo scenarios — without a calculator maze.",
  bullets: [
    "Pre-approval strategy and timing",
    "Payment and cash-to-close modeling",
    "Concessions, buydowns, and ARM vs fixed context",
    "Deal Analyzer reports for confident offers",
  ],
  primaryCta: { label: "Build My Loan Playbook", href: "/check-options" },
  secondaryCta: { label: "Explore the Deal Analyzer", href: "/deal-analyzer" },
  seo: {
    title: "Homebuyer Financing Strategy",
    description:
      "Purchase-loan strategy for buyers in Washington and licensed states — payment clarity, pre-approval planning, and playbook reports. Educational estimates only.",
  },
};

export const AGENTS_PAGE: MarketingPageConfig = {
  path: "/agents",
  eyebrow: "Agents",
  title: "Agent partnerships and co-branded financing tools",
  lead: "Give clients a premium financing experience — branded Deal Analyzer, playbook reports, and strategy support that elevates your consults.",
  bullets: [
    "Co-branded Deal Analyzer for your clients",
    "Playbook Reports for listing and buyer meetings",
    "Financing strategy support — not just rate sheets",
    "Partner program with compliance roadmap ahead",
  ],
  primaryCta: { label: "Agent partnerships", href: "/partners" },
  secondaryCta: { label: "Book strategy call", href: "/contact" },
  seo: {
    title: "Agent Mortgage Partnership Tools",
    description:
      "Co-branded mortgage strategy tools for real estate agents — Deal Analyzer, playbook reports, and partner workflows. Not a commitment to lend.",
  },
};

export const INVESTORS_PAGE: MarketingPageConfig = {
  path: "/investors",
  eyebrow: "Investors",
  title: "Investment property financing and portfolio strategy",
  lead: "DSCR, non-QM, HELOC on rentals, and acquisition capital — structured for landlords and operators who need liquidity without noise.",
  bullets: [
    "DSCR and rental income-based paths",
    "HELOC and second-lien on investment property",
    "Portfolio and bridge strategy context",
    "Deal Analyzer for investor scenarios",
  ],
  primaryCta: { label: "Build My Loan Playbook", href: "/check-options" },
  secondaryCta: { label: "Investor scenarios", href: "/scenarios" },
  seo: {
    title: "Investor DSCR & Rental Financing Strategy",
    description:
      "Investor mortgage strategy — DSCR loans, rental HELOC, and portfolio financing paths. Subject to credit, income, asset, property, and program approval.",
  },
};

export const COMMERCIAL_PAGE: MarketingPageConfig = {
  path: "/commercial",
  eyebrow: "Commercial",
  title: "Commercial financing strategy for operators and sponsors",
  lead: "Structure-first context for multifamily, mixed-use, and sponsor scenarios — clarity before capital markets conversations.",
  bullets: [
    "Bridge, agency, and portfolio bank paths",
    "Sponsor and asset clarity upfront",
    "Commercial scenario review — not generic consumer flow",
    "Licensed partner network for execution",
  ],
  primaryCta: { label: "Book strategy call", href: "/contact" },
  secondaryCta: { label: "Build My Loan Playbook", href: "/check-options" },
  seo: {
    title: "Commercial Mortgage Strategy",
    description:
      "Commercial financing strategy for sponsors and operators. Educational guidance only — subject to approval and program guidelines.",
  },
};

export const DEAL_ANALYZER_PAGE: MarketingPageConfig = {
  path: "/deal-analyzer",
  eyebrow: "Deal Analyzer",
  title: "Compare financing options with the Deal Analyzer",
  lead: "The centerpiece of The Loan Playbook — model scenarios, compare paths, and generate playbook-style reports for buyers, investors, and agents.",
  bullets: [
    "Purchase, refi, investor, and equity scenarios",
    "Playbook Reports — shareable, strategy-first output",
    "Built for cold traffic, agents, and repeat clients",
    "Technology + human strategy review on follow-up",
  ],
  primaryCta: { label: "Start analyzing", href: "/check-options" },
  secondaryCta: { label: "Browse scenario library", href: "/scenarios" },
  seo: {
    title: "Mortgage Deal Analyzer",
    description:
      "Compare mortgage and investor financing scenarios with The Loan Playbook Deal Analyzer. Educational estimates only — not a commitment to lend.",
  },
};

export const LEARN_PAGE: MarketingPageConfig = {
  path: "/learn",
  eyebrow: "Learn",
  title: "Mortgage education hub",
  lead: "Guides, explainers, and strategy content for buyers, investors, and agents — built for SEO and real-world consults.",
  bullets: [
    "Financing guides and topic deep-dives",
    "Market and rate explainers",
    "Investor equity and DSCR education",
    "Social and video content from Chris Butler",
  ],
  primaryCta: { label: "Browse topics", href: "/faq" },
  secondaryCta: { label: "Investor scenario library", href: "/scenarios" },
  seo: {
    title: "Mortgage Strategy & Education",
    description:
      "Learn mortgage strategy — homebuyer financing, investor DSCR, HELOC, and agent partnership education from The Loan Playbook.",
  },
};

export const PARTNERS_PAGE: MarketingPageConfig = {
  path: "/partners",
  eyebrow: "Partners",
  title: "Agent partnerships — tools today, compliance platform tomorrow",
  lead: "Partner with a modern mortgage company built around strategy. Co-branded analyzer, playbook reports, and a roadmap toward deeper compliance and partner infrastructure.",
  bullets: [
    "Co-branded Deal Analyzer and sample reports",
    "Listing and buyer consult playbook assets",
    "Recruiting-oriented partner program",
    "Future compliance and partner platform layer",
  ],
  primaryCta: { label: "Book partner call", href: "/contact" },
  secondaryCta: { label: "For agents overview", href: "/agents" },
  seo: {
    title: "Agent Mortgage Partnerships",
    description:
      "Agent mortgage partnership tools — co-branded Deal Analyzer, playbook reports, and partner program from The Loan Playbook.",
  },
};

export const CONTACT_PAGE: MarketingPageConfig = {
  path: "/contact",
  eyebrow: "Contact",
  title: "Book a strategy call",
  lead: "Talk through purchase, equity, investor, or commercial goals with a strategy-first team — not a product pitch.",
  bullets: [
    "Strategy call for buyers, investors, and agents",
    "Washington and multi-state licensed paths",
    "Educational review — not a commitment to lend",
  ],
  primaryCta: { label: "Book strategy call", href: "/contact#book" },
  secondaryCta: { label: "Build My Loan Playbook", href: "/check-options" },
  seo: {
    title: "Contact & Strategy Call",
    description:
      "Book a mortgage strategy call with The Loan Playbook. Seattle and Washington mortgage advisor — subject to approval.",
  },
};

export const ABOUT_CHRIS = {
  title: "Chris Butler — founder & mortgage strategist",
  lead: "Chris built The Loan Playbook to combine modern mortgage technology, playbook-style clarity, and education-first client experiences — for buyers, investors, agents, and commercial operators.",
  body: [
    "The platform centers on the Deal Analyzer, Playbook Reports, and daily market education — so clients understand the numbers before they commit.",
    "Agents partner for co-branded tools; investors access DSCR and equity strategy; buyers get purchase clarity without rate bait.",
  ],
} as const;

export function marketingComplianceFooter() {
  return `${MORTGAGE_COMPLIANCE_LINES.notCommitment} ${MORTGAGE_COMPLIANCE_LINES.subjectToApproval} ${MORTGAGE_COMPLIANCE_LINES.educationalEstimates} ${MORTGAGE_COMPLIANCE_LINES.equalHousing}.`;
}
