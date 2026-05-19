export const founderProfile = {
  name: "Chris Butler",
  title: "Mortgage advisor",
  brand: "The Loan Playbook",
  lendingPartner: "Broadview Lending",
  lendingPartnerPoweredBy: "Barrett Financial Group",
  region: "Washington roots · multi-state licensing",
  focus:
    "Residential and commercial financing strategy—education-first, not rate-quote theater.",
  bullets: [
    "Puget Sound buyer and move-up expertise—jumbo, tech income, and buy-before-sell timing.",
    "Residential and commercial strategy with a capital-markets mindset.",
    "Clear guidance through Broadview Lending—licensing and products vary by state.",
  ],
  aboutHref: "/about",
} as const;

export type FounderAudience = "general" | "buyer" | "homeowner" | "agent";

const audienceLeads: Record<FounderAudience, string> = {
  general:
    "Strategy-first mortgage guidance for buyers, homeowners, agents, and partners—licensed in multiple states, with Puget Sound depth where it matters.",
  buyer:
    "Helps Washington buyers prepare before the search—payment, documentation, and offer-ready structure.",
  homeowner:
    "Frames refinance, HELOC, and equity decisions around timing and household ROI—not headlines.",
  agent:
    "Gives agents financing context they can use early—before the offer window gets tight.",
};

export function getFounderLead(audience: FounderAudience = "general") {
  return audienceLeads[audience];
}
