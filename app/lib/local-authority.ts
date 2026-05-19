export type LocalAuthorityAudience = "buyer" | "homeowner" | "agent" | "general";

export const pugetSoundAuthority = {
  region: "Puget Sound & Eastside",
  markets: ["Seattle", "Bellevue", "Kirkland"],
  themes: [
    "jumbo and tech-income documentation",
    "condo warrantability in urban cores",
    "move-up and buy-before-sell timing",
  ],
} as const;

export type LocalAuthorityHighlight = {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  regionLabel: string;
  themes: string[];
};

export const localAuthorityHighlights: Record<string, LocalAuthorityHighlight> = {
  "eastside-move-up": {
    id: "eastside-move-up",
    title: "Eastside move-up & buy-before-sell",
    excerpt:
      "Bellevue and Kirkland move-up buyers often need to secure the next home before the current sale closes—bridge clarity matters early.",
    href: "/guides/buy-before-sell",
    regionLabel: "Eastside",
    themes: ["move-up buyers", "buy-before-sell", "equity timing"],
  },
  "tech-buyer-prep": {
    id: "tech-buyer-prep",
    title: "Tech & RSU buyer preparation",
    excerpt:
      "Seattle and Eastside tech income paths need full documentation—RSUs, bonuses, and employment history before offer week.",
    href: "/guides/self-employed-borrowers",
    regionLabel: "Puget Sound",
    themes: ["tech buyers", "income documentation", "jumbo thresholds"],
  },
  "jumbo-eastside": {
    id: "jumbo-eastside",
    title: "Washington jumbo on the Eastside",
    excerpt:
      "Jumbo is not one-size-fits-all—Bellevue and Seattle inventory rewards early structure conversations, not last-minute letters.",
    href: "/learn/jumbo-loans",
    regionLabel: "Washington",
    themes: ["jumbo", "Bellevue", "Seattle"],
  },
  "washington-depth": {
    id: "washington-depth",
    title: "Washington financing depth",
    excerpt:
      "Statewide licensing with Puget Sound expertise—condos, jumbo, move-up, and tech-income paths in one strategic lens.",
    href: "/washington-mortgage",
    regionLabel: "Washington",
    themes: ["state overview", "local markets"],
  },
};

const audienceSnippets: Record<LocalAuthorityAudience, string> = {
  general:
    "Puget Sound expertise—Seattle, Bellevue, and the Eastside—for jumbo paths, tech income, and move-up timing, alongside multi-state residential and commercial strategy.",
  buyer:
    "In Seattle and on the Eastside, prepared buyers document income, reserves, and structure before offer week—not after they find the home.",
  homeowner:
    "Puget Sound homeowners often compare refinance, HELOC, and hold scenarios against strong equity positions—not just a rate headline.",
  agent:
    "Bellevue and Seattle agents win trust when financing context—jumbo, concessions, buy-before-sell—shows up before the offer.",
};

export function getLocalAuthoritySnippet(audience: LocalAuthorityAudience = "general") {
  return audienceSnippets[audience];
}

export function getLocalAuthorityHighlight(id: string) {
  return localAuthorityHighlights[id];
}

export const washingtonMarketLinks = [
  { href: "/washington-mortgage", label: "Washington" },
  { href: "/markets/seattle", label: "Seattle" },
  { href: "/markets/bellevue", label: "Bellevue" },
  { href: "/markets/kirkland", label: "Kirkland" },
] as const;

export const primaryLocalThemes = [
  "Seattle urban condos & warrantability",
  "Bellevue jumbo & tech-income documentation",
  "Eastside move-up & buy-before-sell sequencing",
] as const;
