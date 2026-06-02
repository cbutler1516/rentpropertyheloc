import { NMLS_LABEL } from "@/lib/legal/nmls";

/** Single positioning line — show once per page section, not as repeated badges. */
export const POSITIONING_LINE =
  "Technology-powered. Investor-focused. Human-guided.";

export const BRAND_SUPPORTING_COPY =
  "Get personalized guidance from a licensed mortgage professional who understands real estate investing—not just an automated approval engine.";

export const HERO_HEADLINE = "Access Equity. Build Your Portfolio.";

export const HERO_SUPPORTING_COPY =
  "Enter your rental property address to start a fast review—about 60 seconds, no obligation.";

export const SEO_GUIDANCE_TAGLINE =
  "Compare investor equity options with guidance from a licensed mortgage professional.";

export const WHY_INVESTORS_CHOOSE = {
  headline: "Built for Rental Property Investors",
  cards: [
    {
      icon: "⚡",
      title: "Real Human Guidance",
      description: "Licensed professionals who understand investing.",
    },
    {
      icon: "🏠",
      title: "Investor-Focused",
      description: "Built for rental owners and portfolio strategy.",
    },
    {
      icon: "🎯",
      title: "Multiple Financing Strategies",
      description: "HELOC, second mortgage, and other equity paths.",
    },
    {
      icon: "📈",
      title: "Technology + Experience",
      description: "Modern tools backed by real expertise.",
    },
  ],
} as const;

export const PLATFORM_STATEMENT =
  "More than an online form — real guidance from a licensed mortgage professional.";

export const CREDIBILITY_ITEMS = [
  NMLS_LABEL,
  "Equal Housing Lender",
  "Secure online process",
] as const;

export const FUNNEL_INTRO_COPY = "Let's check your options.";
