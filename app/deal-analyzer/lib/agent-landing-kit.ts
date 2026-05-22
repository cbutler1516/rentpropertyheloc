import {
  SEO_LANDING_SLUGS,
  getSeoLandingContent,
  type SeoLandingSlug,
} from "./seo-landing-content";
import {
  partnerCalculatorLandingLink,
  partnerDealAnalyzerBase,
  partnerLink,
  type PartnerAgent,
} from "./agent-types";

export type AgentLandingPageKit = {
  partnerLink: string;
  analyzeLink: string;
  calculatorLinks: { slug: SeoLandingSlug; label: string; url: string }[];
  fullKit: string;
};

export function generateAgentLandingPageKit(
  agent: Pick<PartnerAgent, "name" | "slug">,
  siteUrl: string,
): AgentLandingPageKit {
  const base = siteUrl.replace(/\/$/, "");
  const partner = partnerLink(siteUrl, agent.slug);
  const analyzeLink = `${base}${partnerDealAnalyzerBase(agent.slug)}/analyze`;

  const calculatorLinks = SEO_LANDING_SLUGS.map((slug) => ({
    slug,
    label: getSeoLandingContent(slug).navLabel,
    url: partnerCalculatorLandingLink(siteUrl, agent.slug, slug),
  }));

  const lines = [
    `BRANDED CALCULATOR LANDING KIT — ${agent.name}`,
    `Partner hub: ${partner}`,
    `Analyze: ${analyzeLink}`,
    "",
    "--- CALCULATOR LANDING PAGES ---",
    ...calculatorLinks.map(
      (c) => `${c.label}: ${c.url}`,
    ),
    "",
    "Financing strategy by Chris Butler · Broadview Lending · The Loan Playbook",
    "Educational estimates only — not a loan commitment.",
  ];

  return {
    partnerLink: partner,
    analyzeLink,
    calculatorLinks,
    fullKit: lines.join("\n"),
  };
}
