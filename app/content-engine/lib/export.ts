import { getBrandVoice } from "./brand-voices";
import { CAMPAIGN_TABS } from "./campaign-tabs";
import { calendarToMarkdown } from "./calendar-export";
import { landingPageToMarkdown } from "./landing-page-export";
import { OUTPUT_TABS } from "./tabs";
import type { ContentPackage } from "./types";

function packageMetaLines(pkg: ContentPackage): string[] {
  const voice = getBrandVoice(pkg.brandVoiceId);
  return [
    `**Topic:** ${pkg.topic}  `,
    `**Audience:** ${pkg.audience}  `,
    `**Tone:** ${pkg.tone}  `,
    `**Brand voice:** ${voice.name}  `,
    `**Mode:** ${pkg.generationMode === "campaign" ? "Campaign" : "Single pack"}  `,
    `**Model:** ${pkg.modelUsed}  `,
    `**Tags:** ${pkg.tags.join(", ") || "—"}  `,
    `**Saved:** ${new Date(pkg.createdAt).toLocaleString()}`,
  ];
}

export function packageToMarkdown(pkg: ContentPackage): string {
  const lines = [
    `# ${pkg.title}`,
    "",
    ...packageMetaLines(pkg),
    "",
    pkg.generationMode === "campaign"
      ? "## Campaign topic"
      : "## Source material",
    "",
    pkg.sourceInput.trim(),
    "",
    "---",
    "",
  ];

  if (pkg.generationMode === "campaign" && pkg.campaignOutputs) {
    for (const tab of CAMPAIGN_TABS) {
      lines.push(
        `## ${tab.label}`,
        "",
        pkg.campaignOutputs[tab.key].trim(),
        "",
        "---",
        "",
      );
    }
  } else {
    for (const tab of OUTPUT_TABS) {
      lines.push(`## ${tab.label}`, "", pkg.outputs[tab.key].trim(), "", "---", "");
    }
  }

  if (pkg.landingPage) {
    lines.push(
      "",
      "# Landing page",
      "",
      landingPageToMarkdown(pkg.landingPage, pkg.title).replace(
        `# Landing Page — ${pkg.title}`,
        "",
      ),
    );
  }

  if (pkg.calendar) {
    lines.push(
      "",
      calendarToMarkdown(pkg.calendar, pkg.title).replace(
        `# 7-Day Content Calendar — ${pkg.title}`,
        "",
      ),
    );
  }

  lines.push(
    "",
    "_Generated with The Loan Playbook AI Content Engine — educational only._",
  );

  return lines.join("\n");
}

export function packageToPdfReadyText(pkg: ContentPackage): string {
  const voice = getBrandVoice(pkg.brandVoiceId);
  const lines = [
    "THE LOAN PLAYBOOK — CONTENT PACKAGE",
    "=".repeat(48),
    "",
    `TITLE: ${pkg.title}`,
    `TOPIC: ${pkg.topic}`,
    `AUDIENCE: ${pkg.audience}`,
    `TONE: ${pkg.tone}`,
    `BRAND VOICE: ${voice.name}`,
    `MODE: ${pkg.generationMode}`,
    `MODEL: ${pkg.modelUsed}`,
    `TAGS: ${pkg.tags.join(", ") || "—"}`,
    `DATE: ${new Date(pkg.createdAt).toLocaleString()}`,
    "",
    "— PAGE BREAK —",
    "",
    pkg.generationMode === "campaign" ? "CAMPAIGN TOPIC" : "SOURCE MATERIAL",
    "-".repeat(48),
    "",
    pkg.sourceInput.trim(),
    "",
  ];

  if (pkg.generationMode === "campaign" && pkg.campaignOutputs) {
    for (const tab of CAMPAIGN_TABS) {
      lines.push(
        "— PAGE BREAK —",
        "",
        tab.label.toUpperCase(),
        "-".repeat(48),
        "",
        pkg.campaignOutputs[tab.key].trim(),
        "",
      );
    }
  } else {
    for (const tab of OUTPUT_TABS) {
      lines.push(
        "— PAGE BREAK —",
        "",
        tab.label.toUpperCase(),
        "-".repeat(48),
        "",
        pkg.outputs[tab.key].trim(),
        "",
      );
    }
  }

  lines.push(
    "— PAGE BREAK —",
    "",
    "DISCLAIMER: Educational content only. Not a commitment to lend.",
    "The Loan Playbook | Know the move before you make it.",
  );

  return lines.join("\n");
}

export function downloadTextFile(
  filename: string,
  content: string,
  mime = "text/plain;charset=utf-8",
) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
