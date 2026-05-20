import { LAUNCH_CHECKLIST_ITEMS } from "./launch-hub-checklist";
import type { LaunchHubRecord } from "./types";

const FUNNEL_LABELS: { key: keyof LaunchHubRecord["summary"]; label: string }[] =
  [
    { key: "campaignTopic", label: "Campaign topic" },
    { key: "brandVoice", label: "Brand voice" },
    { key: "audience", label: "Audience" },
    { key: "primaryOffer", label: "Primary offer" },
    { key: "landingPageIntent", label: "Landing page intent" },
    { key: "leadMagnetType", label: "Lead magnet type" },
    { key: "recommendedCta", label: "Recommended CTA" },
    { key: "bestPlatforms", label: "Best platforms" },
    { key: "weeklyPublishingPlan", label: "Weekly publishing plan" },
    { key: "followUpSequenceIdea", label: "Follow-up sequence idea" },
  ];

export function launchHubToBrief(hub: LaunchHubRecord): string {
  const lines = [
    "CAMPAIGN LAUNCH BRIEF — THE LOAN PLAYBOOK",
    "=".repeat(48),
    "",
    `Campaign: ${hub.fields.campaignName}`,
    `Goal: ${hub.fields.campaignGoal}`,
    "",
    "FUNNEL SUMMARY",
    "-".repeat(48),
    "",
  ];

  for (const item of FUNNEL_LABELS) {
    lines.push(`${item.label}`, hub.summary[item.key], "");
  }

  lines.push(
    "LAUNCH FIELDS",
    "-".repeat(48),
    "",
    `Primary CTA: ${hub.fields.primaryCta}`,
    `Landing URL: ${hub.fields.landingPageUrl || "—"}`,
    `UTM campaign: ${hub.fields.utmCampaignName}`,
    `CRM tag: ${hub.fields.crmTag}`,
    "",
  );

  if (hub.fields.notes.trim()) {
    lines.push("Notes", hub.fields.notes, "");
  }

  return lines.join("\n");
}

export function launchHubToChecklistText(hub: LaunchHubRecord): string {
  const lines = [
    `LAUNCH CHECKLIST — ${hub.fields.campaignName}`,
    "=".repeat(48),
    "",
  ];

  for (const item of LAUNCH_CHECKLIST_ITEMS) {
    const done = hub.checklist[item.key];
    lines.push(`${done ? "[x]" : "[ ]"} ${item.label}`);
    lines.push(`    ${item.description}`, "");
  }

  const completed = LAUNCH_CHECKLIST_ITEMS.filter(
    (item) => hub.checklist[item.key],
  ).length;

  lines.push(
    `Progress: ${completed} / ${LAUNCH_CHECKLIST_ITEMS.length}`,
    hub.checklist.readyToPublish ? "Status: READY TO PUBLISH" : "Status: In progress",
  );

  return lines.join("\n");
}

export function launchHubToMarkdown(
  hub: LaunchHubRecord,
  packageTitle: string,
): string {
  const lines = [
    `# Launch Hub — ${packageTitle}`,
    "",
    `**Updated:** ${new Date(hub.updatedAt).toLocaleString()}`,
    "",
    "## Campaign",
    "",
    `**Name:** ${hub.fields.campaignName}  `,
    `**Goal:** ${hub.fields.campaignGoal}`,
    "",
    "## Funnel summary",
    "",
  ];

  for (const item of FUNNEL_LABELS) {
    lines.push(`### ${item.label}`, "", hub.summary[item.key], "");
  }

  lines.push(
    "## Launch fields",
    "",
    `**Primary CTA:** ${hub.fields.primaryCta}  `,
    `**Landing URL:** ${hub.fields.landingPageUrl || "—"}  `,
    `**UTM:** ${hub.fields.utmCampaignName}  `,
    `**CRM tag:** ${hub.fields.crmTag}`,
    "",
    "## Checklist",
    "",
  );

  for (const item of LAUNCH_CHECKLIST_ITEMS) {
    lines.push(
      `- [${hub.checklist[item.key] ? "x" : " "}] ${item.label}`,
    );
  }

  if (hub.fields.notes.trim()) {
    lines.push("", "## Notes", "", hub.fields.notes);
  }

  return lines.join("\n");
}
