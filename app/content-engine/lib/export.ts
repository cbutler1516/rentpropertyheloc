import { OUTPUT_TABS } from "./tabs";
import type { ContentPackage } from "./types";

export function packageToMarkdown(pkg: ContentPackage): string {
  const lines = [
    `# ${pkg.title}`,
    "",
    `**Topic:** ${pkg.topic}  `,
    `**Audience:** ${pkg.audience}  `,
    `**Tone:** ${pkg.tone}  `,
    `**Model:** ${pkg.modelUsed}  `,
    `**Tags:** ${pkg.tags.join(", ") || "—"}  `,
    `**Saved:** ${new Date(pkg.createdAt).toLocaleString()}`,
    "",
    "## Source material",
    "",
    pkg.sourceInput.trim(),
    "",
    "---",
    "",
  ];

  for (const tab of OUTPUT_TABS) {
    lines.push(`## ${tab.label}`, "", pkg.outputs[tab.key].trim(), "", "---", "");
  }

  lines.push(
    "",
    "_Generated with The Loan Playbook AI Content Engine — educational only._",
  );

  return lines.join("\n");
}

/** Plain text with explicit page breaks for PDF paste / print workflows. */
export function packageToPdfReadyText(pkg: ContentPackage): string {
  const lines = [
    "THE LOAN PLAYBOOK — CONTENT PACKAGE",
    "=".repeat(48),
    "",
    `TITLE: ${pkg.title}`,
    `TOPIC: ${pkg.topic}`,
    `AUDIENCE: ${pkg.audience}`,
    `TONE: ${pkg.tone}`,
    `MODEL: ${pkg.modelUsed}`,
    `TAGS: ${pkg.tags.join(", ") || "—"}`,
    `DATE: ${new Date(pkg.createdAt).toLocaleString()}`,
    "",
    "— PAGE BREAK —",
    "",
    "SOURCE MATERIAL",
    "-".repeat(48),
    "",
    pkg.sourceInput.trim(),
    "",
  ];

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
