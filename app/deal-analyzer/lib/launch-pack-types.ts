export type OutreachStatus =
  | "not_started"
  | "link_copied"
  | "invited"
  | "live"
  | "needs_followup";

export type OutreachRow = {
  id: string;
  agentName: string;
  agentSlug: string;
  status: OutreachStatus;
  linkCopied: boolean;
  invitedDate: string;
  notes: string;
};

export type LaunchPackPersistedState = {
  launchNotes: string;
  outreach: OutreachRow[];
  testLinksChecked: Record<string, boolean>;
  updatedAt: string;
};

export type LaunchPackCopySection = {
  id: string;
  title: string;
  description?: string;
  body: string;
};

export type LaunchPackContent = {
  siteUrl: string;
  dealAnalyzerUrl: string;
  partnerHubTemplate: string;
  sections: LaunchPackCopySection[];
  testLinks: { id: string; label: string; href: string }[];
  qrSheetText: string;
  qrImageUrl: string;
};
