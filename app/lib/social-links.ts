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
  status?: "active" | "todo";
};

export const socialLinks: SocialLink[] = [
  {
    platform: "TikTok",
    label: "TikTok",
    href: "https://www.tiktok.com/@TODO-theloanplaybook",
    description: "Short-form mortgage plays, buyer education, and creative tests.",
    status: "todo",
  },
  {
    platform: "Instagram",
    label: "Instagram",
    href: "https://www.instagram.com/TODO-theloanplaybook",
    description: "Reels, carousels, agent education, and visual strategy content.",
    status: "todo",
  },
  {
    platform: "Facebook",
    label: "Facebook",
    href: "https://www.facebook.com/TODO-theloanplaybook",
    description: "Facebook Reels and educational reposts for buyer audiences.",
    status: "todo",
  },
  {
    platform: "YouTube",
    label: "YouTube",
    href: "https://www.youtube.com/@TODO-theloanplaybook",
    description: "Shorts, explainers, market updates, and long-form breakdowns.",
    status: "todo",
  },
  {
    platform: "LinkedIn",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/TODO-the-loan-playbook",
    description: "Professional education for agents, partners, and operators.",
    status: "todo",
  },
  {
    platform: "Broadview Lending",
    label: "Broadview Lending",
    href: "https://www.broadviewlending.com",
    description: "Lending partner site, blog, and broader mortgage resources.",
    status: "active",
  },
];
