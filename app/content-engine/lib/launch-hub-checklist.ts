import type { LaunchChecklistKey } from "./types";

export type LaunchChecklistItemConfig = {
  key: LaunchChecklistKey;
  label: string;
  description: string;
};

export const LAUNCH_CHECKLIST_ITEMS: LaunchChecklistItemConfig[] = [
  {
    key: "contentPackGenerated",
    label: "Content pack generated",
    description: "12-channel pack or campaign outputs are ready.",
  },
  {
    key: "landingPageCreated",
    label: "Landing page created",
    description: "Lead-capture landing copy is built.",
  },
  {
    key: "calendarBuilt",
    label: "Calendar built",
    description: "7-day publishing plan is scheduled.",
  },
  {
    key: "leadMagnetCreated",
    label: "Lead magnet created",
    description: "PDF-ready lead magnet report is ready.",
  },
  {
    key: "ctaSelected",
    label: "CTA selected",
    description: "Primary call-to-action is defined for the funnel.",
  },
  {
    key: "trackingLinkAdded",
    label: "Tracking link added",
    description: "Landing URL and UTM campaign are set.",
  },
  {
    key: "crmFollowUpPlanned",
    label: "CRM follow-up planned",
    description: "Tags and follow-up sequence are documented.",
  },
  {
    key: "readyToPublish",
    label: "Ready to publish",
    description: "All launch assets reviewed and approved.",
  },
];
