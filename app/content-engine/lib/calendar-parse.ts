import {
  CALENDAR_AUDIENCE_LENSES,
  CALENDAR_DAY_COUNT,
  CALENDAR_PLATFORMS,
  type CalendarDayEntry,
  type ContentCalendarRecord,
} from "./types";

function parseDay(raw: unknown): CalendarDayEntry | null {
  if (!raw || typeof raw !== "object") return null;
  const day = raw as Record<string, unknown>;

  const dayIndex = typeof day.dayIndex === "number" ? day.dayIndex : null;
  const platform =
    typeof day.platform === "string" &&
    CALENDAR_PLATFORMS.includes(day.platform as (typeof CALENDAR_PLATFORMS)[number])
      ? (day.platform as CalendarDayEntry["platform"])
      : null;
  const audienceLens =
    typeof day.audienceLens === "string" &&
    CALENDAR_AUDIENCE_LENSES.includes(
      day.audienceLens as (typeof CALENDAR_AUDIENCE_LENSES)[number],
    )
      ? (day.audienceLens as CalendarDayEntry["audienceLens"])
      : null;

  const strings = [
    "dayLabel",
    "postType",
    "hook",
    "caption",
    "cta",
    "suggestedVisual",
    "videoPrompt",
    "landingPageTieIn",
  ] as const;

  if (dayIndex === null || !platform || !audienceLens) return null;

  const parsed: CalendarDayEntry = {
    dayIndex,
    dayLabel: "",
    platform,
    postType: "",
    audienceLens,
    hook: "",
    caption: "",
    cta: "",
    suggestedVisual: "",
    videoPrompt: "",
    landingPageTieIn: "",
    status: "draft",
  };

  for (const key of strings) {
    const value = day[key];
    if (typeof value !== "string") return null;
    parsed[key] = value.trim();
  }

  const status = day.status;
  if (status === "ready" || status === "posted" || status === "draft") {
    parsed.status = status;
  }

  return parsed;
}

export function parseCalendarResponse(raw: unknown): ContentCalendarRecord | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const daysRaw = record.days;
  if (!Array.isArray(daysRaw) || daysRaw.length !== CALENDAR_DAY_COUNT) {
    return null;
  }

  const days: CalendarDayEntry[] = [];
  for (const item of daysRaw) {
    const day = parseDay(item);
    if (!day) return null;
    days.push(day);
  }

  days.sort((a, b) => a.dayIndex - b.dayIndex);

  return {
    days,
    weekTheme:
      typeof record.weekTheme === "string" ? record.weekTheme.trim() : "",
    generatedAt: new Date().toISOString(),
    modelUsed: "gpt-4o-mini",
  };
}

export function parseCalendarDayResponse(raw: unknown): CalendarDayEntry | null {
  return parseDay(raw);
}
