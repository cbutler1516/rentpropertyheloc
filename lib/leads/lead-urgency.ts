import type { RoutingTier } from "@/lib/leads/types";

export type LeadUrgencyLevel = "critical" | "high" | "medium" | "low" | "muted";

export type LeadUrgency = {
  level: LeadUrgencyLevel;
  ageLabel: string;
  ageMinutes: number;
  urgencyLabel: string;
  badgeClass: string;
  rowClass: string;
};

const URGENCY_BADGE: Record<LeadUrgencyLevel, string> = {
  critical: "bg-red-600 text-white",
  high: "bg-orange-500 text-white",
  medium: "bg-amber-100 text-amber-950",
  low: "bg-teal-100 text-teal-900",
  muted: "bg-slate-100 text-slate-600",
};

const URGENCY_ROW: Record<LeadUrgencyLevel, string> = {
  critical: "bg-red-50/80 border-l-4 border-l-red-500",
  high: "bg-orange-50/60 border-l-4 border-l-orange-400",
  medium: "bg-amber-50/40 border-l-4 border-l-amber-300",
  low: "border-l-4 border-l-teal-200",
  muted: "border-l-4 border-l-slate-200",
};

export function formatLeadAge(createdAt: string): { label: string; minutes: number } {
  const created = new Date(createdAt).getTime();
  if (!Number.isFinite(created)) {
    return { label: "Unknown", minutes: 0 };
  }

  const minutes = Math.max(0, Math.floor((Date.now() - created) / 60_000));

  if (minutes < 1) return { label: "Just now", minutes: 0 };
  if (minutes < 60) return { label: `${minutes}m ago`, minutes };
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return { label: `${hours}h ago`, minutes };
  const days = Math.floor(hours / 24);
  if (days === 1) return { label: "1d ago", minutes };
  return { label: `${days}d ago`, minutes };
}

export function getLeadUrgency(routingTier: RoutingTier, createdAt: string): LeadUrgency {
  const { label: ageLabel, minutes } = formatLeadAge(createdAt);

  if (routingTier === "fast_track") {
    if (minutes < 5) {
      return buildUrgency("critical", ageLabel, minutes, "New — respond now");
    }
    if (minutes < 15) {
      return buildUrgency("critical", ageLabel, minutes, "Over 5 min — urgent");
    }
    if (minutes < 60) {
      return buildUrgency("high", ageLabel, minutes, "Over 15 min — follow up");
    }
    if (minutes < 240) {
      return buildUrgency("high", ageLabel, minutes, "Over 1 hour — overdue");
    }
    return buildUrgency("medium", ageLabel, minutes, "Stale fast-track");
  }

  if (routingTier === "standard") {
    if (minutes < 60) {
      return buildUrgency("low", ageLabel, minutes, "Standard — new");
    }
    if (minutes < 1440) {
      return buildUrgency("medium", ageLabel, minutes, "Standard — same day");
    }
    return buildUrgency("muted", ageLabel, minutes, "Standard — aging");
  }

  if (routingTier === "review") {
    return buildUrgency("muted", ageLabel, minutes, "Review queue");
  }

  return buildUrgency("muted", ageLabel, minutes, "Nurture");
}

function buildUrgency(
  level: LeadUrgencyLevel,
  ageLabel: string,
  ageMinutes: number,
  urgencyLabel: string,
): LeadUrgency {
  return {
    level,
    ageLabel,
    ageMinutes,
    urgencyLabel,
    badgeClass: URGENCY_BADGE[level],
    rowClass: URGENCY_ROW[level],
  };
}

export const ROUTING_TIER_PRIORITY: Record<RoutingTier, number> = {
  fast_track: 0,
  standard: 1,
  review: 2,
  nurture: 3,
};

export const ROUTING_TIER_LABELS: Record<RoutingTier, string> = {
  fast_track: "Fast track",
  standard: "Standard",
  review: "Review",
  nurture: "Nurture",
};

export const ROUTING_TIER_BADGE: Record<RoutingTier, string> = {
  fast_track: "bg-red-100 text-red-900 ring-1 ring-red-200",
  standard: "bg-teal-100 text-teal-900 ring-1 ring-teal-200",
  review: "bg-amber-100 text-amber-900 ring-1 ring-amber-200",
  nurture: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
};
