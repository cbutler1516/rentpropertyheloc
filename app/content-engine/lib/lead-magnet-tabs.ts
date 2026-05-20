import type { LeadMagnetSectionKey } from "./types";

export type LeadMagnetTabConfig = {
  key: LeadMagnetSectionKey;
  label: string;
  shortLabel: string;
  description: string;
};

export const LEAD_MAGNET_TABS: LeadMagnetTabConfig[] = [
  {
    key: "coverTitle",
    label: "Cover title",
    shortLabel: "Cover",
    description: "Report title on the cover page.",
  },
  {
    key: "subtitle",
    label: "Subtitle",
    shortLabel: "Subtitle",
    description: "Supporting line under the cover title.",
  },
  {
    key: "executiveSummary",
    label: "Executive summary",
    shortLabel: "Summary",
    description: "One-page overview for busy readers.",
  },
  {
    key: "whyItMattersNow",
    label: "Why this matters now",
    shortLabel: "Urgency",
    description: "Timely context without fear bait.",
  },
  {
    key: "keyTakeaways",
    label: "Key takeaways",
    shortLabel: "Takeaways",
    description: "Bulleted highlights readers can skim.",
  },
  {
    key: "mainEducationalSection",
    label: "Main educational section",
    shortLabel: "Education",
    description: "Core playbook content and frameworks.",
  },
  {
    key: "mistakesToAvoid",
    label: "Mistakes to avoid",
    shortLabel: "Mistakes",
    description: "Common pitfalls and how to sidestep them.",
  },
  {
    key: "actionChecklist",
    label: "Action checklist",
    shortLabel: "Checklist",
    description: "Step-by-step next actions.",
  },
  {
    key: "faq",
    label: "FAQ",
    shortLabel: "FAQ",
    description: "4–6 educational Q&A pairs.",
  },
  {
    key: "ctaPage",
    label: "CTA page",
    shortLabel: "CTA",
    description: "Closing call-to-action page copy.",
  },
  {
    key: "complianceDisclaimer",
    label: "Compliance disclaimer",
    shortLabel: "Legal",
    description: "Educational, NMLS-safe footer copy.",
  },
];

export function getLeadMagnetTab(key: LeadMagnetSectionKey) {
  return LEAD_MAGNET_TABS.find((tab) => tab.key === key);
}
