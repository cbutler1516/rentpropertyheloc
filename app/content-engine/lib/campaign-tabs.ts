import type { CampaignOutputTabKey } from "./types";

export type CampaignTabConfig = {
  key: CampaignOutputTabKey;
  label: string;
  shortLabel: string;
  description: string;
  icon: string;
};

export const CAMPAIGN_TABS: CampaignTabConfig[] = [
  {
    key: "shortFormVideoIdeas",
    label: "Short-form video ideas",
    shortLabel: "Videos",
    description: "Five filmable short-form concepts.",
    icon: "▶",
  },
  {
    key: "hooks",
    label: "Hooks",
    shortLabel: "Hooks",
    description: "Five scroll-stopping openers.",
    icon: "⚡",
  },
  {
    key: "socialPosts",
    label: "Facebook / LinkedIn posts",
    shortLabel: "Social",
    description: "Five posts for Facebook and LinkedIn.",
    icon: "in",
  },
  {
    key: "emailSubjectLines",
    label: "Email subject lines",
    shortLabel: "Email",
    description: "Three subject line options.",
    icon: "✉",
  },
  {
    key: "seoBlogIdea",
    label: "SEO blog idea",
    shortLabel: "SEO",
    description: "One long-form content angle.",
    icon: "◇",
  },
  {
    key: "soraPromptIdeas",
    label: "Sora prompt ideas",
    shortLabel: "Sora",
    description: "Three cinematic AI video prompts.",
    icon: "◐",
  },
  {
    key: "heygenPromptIdeas",
    label: "HeyGen prompt ideas",
    shortLabel: "HeyGen",
    description: "Three talking-head scene prompts.",
    icon: "◉",
  },
  {
    key: "postingSchedule",
    label: "7-day posting schedule",
    shortLabel: "Schedule",
    description: "Day-by-day channel plan.",
    icon: "📅",
  },
];

export function getCampaignTabConfig(key: CampaignOutputTabKey) {
  return CAMPAIGN_TABS.find((tab) => tab.key === key);
}
