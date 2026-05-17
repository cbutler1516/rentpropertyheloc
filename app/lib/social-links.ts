export type SocialPlatform =
  | "TikTok"
  | "Instagram"
  | "Facebook"
  | "YouTube"
  | "LinkedIn"
  | "Broadview Lending";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
  description: string;
};

export const socialLinks: SocialLink[] = [
  {
    platform: "TikTok",
    label: "TikTok",
    href: "https://www.tiktok.com/@theloanplaybook",
    description: "Short-form mortgage plays, buyer education, and creative tests.",
  },
  {
    platform: "Instagram",
    label: "Instagram",
    href: "https://www.instagram.com/theloanplaybook/",
    description: "Reels, carousels, agent education, and visual strategy content.",
  },
  {
    platform: "Facebook",
    label: "Facebook",
    href: "https://www.facebook.com/theloanplaybook/",
    description: "Facebook Reels and educational reposts for buyer audiences.",
  },
  {
    platform: "YouTube",
    label: "YouTube",
    href: "https://www.youtube.com/@TheLoanPlaybook",
    description: "Shorts, explainers, market updates, and long-form breakdowns.",
  },
  {
    platform: "LinkedIn",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/the-loan-playbook/",
    description: "Professional education for agents, partners, and operators.",
  },
  {
    platform: "Broadview Lending",
    label: "Broadview Lending",
    href: "https://www.broadviewlending.com",
    description: "Lending partner site, blog, and broader mortgage resources.",
  },
];
