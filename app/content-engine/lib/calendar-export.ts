import { getCalendarPlatformLabel } from "./calendar-platforms";
import type { CalendarDayEntry, ContentCalendarRecord } from "./types";

function dayToMarkdown(day: CalendarDayEntry): string[] {
  return [
    `### ${day.dayLabel}`,
    "",
    `**Platform:** ${getCalendarPlatformLabel(day.platform)}  `,
    `**Post type:** ${day.postType}  `,
    `**Audience:** ${day.audienceLens}  `,
    `**Status:** ${day.status}`,
    "",
    "**Hook**",
    "",
    day.hook.trim(),
    "",
    "**Caption**",
    "",
    day.caption.trim(),
    "",
    "**CTA**",
    "",
    day.cta.trim(),
    "",
    "**Suggested visual**",
    "",
    day.suggestedVisual.trim(),
    "",
    ...(day.videoPrompt.trim()
      ? ["**Sora / HeyGen prompt**", "", day.videoPrompt.trim(), ""]
      : []),
    "**Landing page tie-in**",
    "",
    day.landingPageTieIn.trim(),
    "",
    "---",
    "",
  ];
}

export function calendarDayToCopyText(day: CalendarDayEntry): string {
  const lines = [
    day.dayLabel,
    `Platform: ${getCalendarPlatformLabel(day.platform)}`,
    `Post type: ${day.postType}`,
    `Audience: ${day.audienceLens}`,
    `Status: ${day.status}`,
    "",
    "HOOK",
    day.hook.trim(),
    "",
    "CAPTION",
    day.caption.trim(),
    "",
    "CTA",
    day.cta.trim(),
    "",
    "SUGGESTED VISUAL",
    day.suggestedVisual.trim(),
  ];

  if (day.videoPrompt.trim()) {
    lines.push("", "VIDEO PROMPT", day.videoPrompt.trim());
  }

  lines.push("", "LANDING PAGE TIE-IN", day.landingPageTieIn.trim());
  return lines.join("\n");
}

export function calendarToMarkdown(
  calendar: ContentCalendarRecord,
  packageTitle: string,
): string {
  const lines = [
    `# 7-Day Content Calendar — ${packageTitle}`,
    "",
    `**Week theme:** ${calendar.weekTheme}  `,
    `**Generated:** ${new Date(calendar.generatedAt).toLocaleString()}  `,
    `**Model:** ${calendar.modelUsed}`,
    "",
    "---",
    "",
  ];

  for (const day of calendar.days) {
    lines.push(...dayToMarkdown(day));
  }

  return lines.join("\n");
}

export function calendarToCsv(calendar: ContentCalendarRecord): string {
  const headers = [
    "day_index",
    "day_label",
    "platform",
    "post_type",
    "audience_lens",
    "status",
    "hook",
    "caption",
    "cta",
    "suggested_visual",
    "video_prompt",
    "landing_page_tie_in",
  ];

  const escape = (value: string) => {
    const normalized = value.replace(/\r?\n/g, " ").replace(/"/g, '""');
    return `"${normalized}"`;
  };

  const rows = calendar.days.map((day) =>
    [
      day.dayIndex,
      day.dayLabel,
      day.platform,
      day.postType,
      day.audienceLens,
      day.status,
      day.hook,
      day.caption,
      day.cta,
      day.suggestedVisual,
      day.videoPrompt,
      day.landingPageTieIn,
    ]
      .map((cell) => escape(String(cell)))
      .join(","),
  );

  return [headers.join(","), ...rows].join("\n");
}
