import { getLandingPageIntent } from "./landing-page-intents";
import { LANDING_PAGE_TABS } from "./landing-page-tabs";
import type { LandingPageRecord } from "./types";

export function landingPageToMarkdown(
  landing: LandingPageRecord,
  packageTitle: string,
): string {
  const intent = getLandingPageIntent(landing.intent);
  const lines = [
    `# Landing Page — ${packageTitle}`,
    "",
    `**Intent:** ${intent.label}  `,
    `**Generated:** ${new Date(landing.generatedAt).toLocaleString()}  `,
    `**Model:** ${landing.modelUsed}`,
    "",
    "---",
    "",
  ];

  for (const tab of LANDING_PAGE_TABS) {
    lines.push(
      `## ${tab.label}`,
      "",
      landing.sections[tab.key].trim(),
      "",
      "---",
      "",
    );
  }

  return lines.join("\n");
}

export function landingPageToPlainText(landing: LandingPageRecord): string {
  const intent = getLandingPageIntent(landing.intent);
  const lines = [
    "LANDING PAGE COPY — THE LOAN PLAYBOOK",
    "=".repeat(48),
    `INTENT: ${intent.label}`,
    "",
  ];

  for (const tab of LANDING_PAGE_TABS) {
    lines.push(
      tab.label.toUpperCase(),
      "-".repeat(48),
      "",
      landing.sections[tab.key].trim(),
      "",
      "— PAGE BREAK —",
      "",
    );
  }

  return lines.join("\n");
}

export function landingPageToFullCopy(landing: LandingPageRecord): string {
  return LANDING_PAGE_TABS.map(
    (tab) => `${tab.label}\n\n${landing.sections[tab.key]}`,
  ).join("\n\n---\n\n");
}
