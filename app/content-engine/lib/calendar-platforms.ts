import type { CalendarPlatform } from "./types";

export const CALENDAR_PLATFORM_LABELS: Record<CalendarPlatform, string> = {
  "tiktok-reels": "TikTok / Reels",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  email: "Email",
  blog: "Blog / SEO",
};

export function getCalendarPlatformLabel(platform: CalendarPlatform): string {
  return CALENDAR_PLATFORM_LABELS[platform];
}
