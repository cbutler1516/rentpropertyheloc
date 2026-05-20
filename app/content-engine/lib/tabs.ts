import type { OutputTabKey } from "./types";

export type OutputTabConfig = {
  key: OutputTabKey;
  label: string;
  shortLabel: string;
  description: string;
  icon: string;
};

export const OUTPUT_TABS: OutputTabConfig[] = [
  {
    key: "tiktokHooks",
    label: "TikTok / Reels Hooks",
    shortLabel: "Hooks",
    description: "Scroll-stopping openers for short-form video.",
    icon: "▶",
  },
  {
    key: "youtubeTitles",
    label: "YouTube Shorts Titles",
    shortLabel: "Shorts",
    description: "Search-friendly titles with curiosity and clarity.",
    icon: "YT",
  },
  {
    key: "linkedinPost",
    label: "LinkedIn Post",
    shortLabel: "LinkedIn",
    description: "Professional thought-leadership for your network.",
    icon: "in",
  },
  {
    key: "facebookCaption",
    label: "Facebook Caption",
    shortLabel: "Facebook",
    description: "Community-friendly caption with soft CTA.",
    icon: "f",
  },
  {
    key: "emailNewsletter",
    label: "Email Newsletter",
    shortLabel: "Email",
    description: "Subject line + body for your list.",
    icon: "✉",
  },
  {
    key: "seoBlogOutline",
    label: "SEO Blog Outline",
    shortLabel: "SEO",
    description: "H1, sections, and keywords for long-form.",
    icon: "◇",
  },
  {
    key: "instagramCarousel",
    label: "Instagram Carousel",
    shortLabel: "Carousel",
    description: "Slide-by-slide copy for swipe posts.",
    icon: "◎",
  },
  {
    key: "soraPrompt",
    label: "Sora Video Prompt",
    shortLabel: "Sora",
    description: "Cinematic scene direction for AI video.",
    icon: "◐",
  },
  {
    key: "heygenPrompt",
    label: "HeyGen Scene Prompt",
    shortLabel: "HeyGen",
    description: "Talking-head script + scene notes.",
    icon: "◉",
  },
  {
    key: "thumbnailIdeas",
    label: "Thumbnail Ideas",
    shortLabel: "Thumbs",
    description: "Text overlays, expressions, and frames.",
    icon: "▣",
  },
  {
    key: "agentVersion",
    label: "Agent Version",
    shortLabel: "Agent",
    description: "Realtor-facing talking points and shareables.",
    icon: "A",
  },
  {
    key: "consumerVersion",
    label: "Consumer Version",
    shortLabel: "Consumer",
    description: "Borrower-friendly explainer without jargon.",
    icon: "C",
  },
];

export function getTabConfig(key: OutputTabKey) {
  return OUTPUT_TABS.find((tab) => tab.key === key);
}
