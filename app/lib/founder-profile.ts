export const founderProfile = {
  name: "Chris Butler",
  title: "Mortgage advisor",
  brand: "The Loan Playbook",
  lendingPartner: "Broadview Lending",
  lendingPartnerPoweredBy: "Barrett Financial Group",
  region: "Washington roots · multi-state licensing",
  focus:
    "Operator and strategist across residential, investor, and commercial paths—education-first, not rate-quote theater.",
  operatorNote:
    "Background in real estate operations through Butler Property Group informs how deals are read—not just how they are priced.",
  bullets: [
    "Puget Sound buyer and move-up expertise—jumbo, tech income, and buy-before-sell timing.",
    "Investor, DSCR, bridge, and builder/development scenarios framed as capital strategy.",
    "Clear guidance through Broadview Lending—licensing and products vary by state.",
  ],
  aboutHref: "/about",
} as const;

export type FounderAudience =
  | "general"
  | "buyer"
  | "homeowner"
  | "agent"
  | "commercial";

const audienceLeads: Record<FounderAudience, string> = {
  general:
    "Strategy-first mortgage guidance for buyers, homeowners, agents, and partners—licensed in multiple states, with Puget Sound depth where it matters.",
  buyer:
    "Helps buyers prepare before the search—payment, documentation, and offer-ready structure.",
  homeowner:
    "Frames refinance, HELOC, and equity decisions around timing and household ROI—not headlines.",
  agent:
    "Gives agents financing context they can use early—before the offer window gets tight.",
  commercial:
    "Positions sponsor, asset, and capital stack for investors, operators, and builders—before terms become noise.",
};

export function getFounderLead(audience: FounderAudience = "general") {
  return audienceLeads[audience];
}
