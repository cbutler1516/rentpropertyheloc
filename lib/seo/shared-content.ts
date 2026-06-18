import { SEO_GUIDANCE_TAGLINE } from "@/lib/brand-positioning";
import { INVESTOR_PROCESS_STEPS } from "@/lib/marketing/content";
import type { SeoFaqItem, SeoProcessStep } from "@/lib/seo/types";

export const SEO_COMPLIANCE =
  "Programs may be available for qualifying properties, subject to approval, property eligibility, credit, income, and lender guidelines. Not a commitment to lend.";

export const DEFAULT_SEO_PROCESS_STEPS: SeoProcessStep[] = INVESTOR_PROCESS_STEPS.map(
  ({ title, description }) => ({ title, description }),
);

/** FAQ blocks optimized for Google AI Overviews and conversational search */
export const GEO_HELOC_FAQS = {
  rentalProperty: {
    question: "Can I get a HELOC on a rental property?",
    answer:
      "Yes—revolving HELOC programs on non-owner-occupied rental collateral may be available for qualifying investors, subject to approval, property type, equity, credit, and state-specific lender guidelines. Rental HELOCs are underwritten differently than primary-residence lines.",
  },
  primaryResidence: {
    question: "Can I get a HELOC on a primary residence?",
    answer:
      "Homeowners with sufficient equity in a primary residence may qualify for owner-occupied HELOC programs, subject to approval, combined loan-to-value limits, credit, income documentation, and lender guidelines. Occupancy is verified during underwriting.",
  },
  equityNeeded: {
    question: "How much equity do I need for a HELOC?",
    answer:
      "Combined loan-to-value (CLTV) limits vary by occupancy, property type, credit, and program. Many files require meaningful equity after existing liens—often leaving 10–20% or more equity in the property, but limits are lender-specific and subject to approval.",
  },
  buyAnotherProperty: {
    question: "Can I use a HELOC to buy another property?",
    answer:
      "Investors and homeowners sometimes use HELOC proceeds for down payments, closing costs, or reserves on a next property. Use of funds must align with program rules and your overall financial profile—subject to approval and lender guidelines.",
  },
  helocVsCashOut: {
    question: "HELOC vs cash-out refinance — which is better?",
    answer:
      "A HELOC may preserve an existing first-mortgage rate while providing revolving access. Cash-out refinance replaces the first mortgage with a new lump-sum loan. The better fit depends on your current rate, equity, timeline, and whether you need revolving or one-time funds—compare both in a personalized review.",
  },
  secondHome: {
    question: "Can I get a HELOC on a second home?",
    answer:
      "Second-home and vacation-property HELOC programs may be available separately from primary-residence and rental paths, subject to approval, occupancy verification, equity, and state availability. Guidelines differ from owner-occupied and investor products.",
  },
  bestWayToAccess: {
    question: "What is the best way to access home equity?",
    answer:
      "The best path depends on how you use the property (primary, second home, or rental), your existing mortgage rate, and whether you need revolving or lump-sum access. A HELOC review compares options that may fit your scenario—subject to approval—not a one-size recommendation.",
  },
} as const satisfies Record<string, SeoFaqItem>;

export function withGuidanceTagline(intro: string): string {
  return `${intro} ${SEO_GUIDANCE_TAGLINE}`;
}
