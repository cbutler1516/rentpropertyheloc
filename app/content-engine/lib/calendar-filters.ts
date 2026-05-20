import type { CalendarDayEntry, CalendarFilterId } from "./types";

const PLATFORM_FILTERS: CalendarFilterId[] = [
  "tiktok-reels",
  "facebook",
  "linkedin",
  "email",
  "blog",
];

export const CALENDAR_FILTER_OPTIONS: {
  id: CalendarFilterId;
  label: string;
  group: "platform" | "audience";
}[] = [
  { id: "tiktok-reels", label: "TikTok / Reels", group: "platform" },
  { id: "facebook", label: "Facebook", group: "platform" },
  { id: "linkedin", label: "LinkedIn", group: "platform" },
  { id: "email", label: "Email", group: "platform" },
  { id: "blog", label: "Blog", group: "platform" },
  { id: "agent", label: "Agent audience", group: "audience" },
  { id: "consumer", label: "Consumer audience", group: "audience" },
];

export function filterCalendarDays(
  days: CalendarDayEntry[],
  activeFilters: Set<CalendarFilterId>,
): CalendarDayEntry[] {
  if (activeFilters.size === 0) return days;

  const platformActive = PLATFORM_FILTERS.filter((id) => activeFilters.has(id));
  const agentActive = activeFilters.has("agent");
  const consumerActive = activeFilters.has("consumer");

  return days.filter((day) => {
    const platformMatch =
      platformActive.length === 0 || platformActive.includes(day.platform);
    const audienceMatch =
      (!agentActive && !consumerActive) ||
      (agentActive && day.audienceLens === "agent") ||
      (consumerActive && day.audienceLens === "consumer");
    return platformMatch && audienceMatch;
  });
}
