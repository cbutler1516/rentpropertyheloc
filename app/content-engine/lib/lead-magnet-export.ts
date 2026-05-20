import { getLeadMagnetType } from "./lead-magnet-types";
import { LEAD_MAGNET_TABS } from "./lead-magnet-tabs";
import type { LeadMagnetRecord } from "./types";

export function leadMagnetToFullCopy(leadMagnet: LeadMagnetRecord): string {
  return LEAD_MAGNET_TABS.map(
    (tab) => `${tab.label.toUpperCase()}\n\n${leadMagnet.sections[tab.key]}`,
  ).join("\n\n---\n\n");
}

export function leadMagnetToMarkdown(
  leadMagnet: LeadMagnetRecord,
  packageTitle: string,
): string {
  const typeConfig = getLeadMagnetType(leadMagnet.type);
  const lines = [
    `# Lead Magnet — ${packageTitle}`,
    "",
    `**Type:** ${typeConfig.label}  `,
    `**Generated:** ${new Date(leadMagnet.generatedAt).toLocaleString()}  `,
    `**Model:** ${leadMagnet.modelUsed}`,
    "",
    "---",
    "",
  ];

  for (const tab of LEAD_MAGNET_TABS) {
    lines.push(
      `## ${tab.label}`,
      "",
      leadMagnet.sections[tab.key].trim(),
      "",
      "---",
      "",
    );
  }

  return lines.join("\n");
}

export function leadMagnetToPdfReadyText(
  leadMagnet: LeadMagnetRecord,
  packageTitle: string,
): string {
  const typeConfig = getLeadMagnetType(leadMagnet.type);
  const lines = [
    "THE LOAN PLAYBOOK — LEAD MAGNET REPORT",
    "=".repeat(48),
    "",
    `PACKAGE: ${packageTitle}`,
    `TYPE: ${typeConfig.label}`,
    `GENERATED: ${new Date(leadMagnet.generatedAt).toLocaleString()}`,
    "",
  ];

  for (const tab of LEAD_MAGNET_TABS) {
    lines.push(
      "— PAGE BREAK —",
      "",
      tab.label.toUpperCase(),
      "-".repeat(48),
      "",
      leadMagnet.sections[tab.key].trim(),
      "",
    );
  }

  lines.push(
    "— PAGE BREAK —",
    "",
    "END OF REPORT",
    "The Loan Playbook | Know the move before you make it.",
  );

  return lines.join("\n");
}
