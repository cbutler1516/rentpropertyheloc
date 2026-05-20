"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import { getCalendarPlatformLabel } from "../lib/calendar-platforms";
import { calendarDayToCopyText } from "../lib/calendar-export";
import type { CalendarDayEntry, CalendarDayStatus } from "../lib/types";
import { CopyButton } from "./copy-button";

const STATUS_STYLES: Record<
  CalendarDayStatus,
  { badge: "default" | "warning" | "success"; label: string }
> = {
  draft: { badge: "default", label: "Draft" },
  ready: { badge: "warning", label: "Ready" },
  posted: { badge: "success", label: "Posted" },
};

type CalendarDayCardProps = {
  day: CalendarDayEntry;
  compact?: boolean;
  regenerating?: boolean;
  onStatusChange: (status: CalendarDayStatus) => void;
  onRegenerate: () => void;
};

export function CalendarDayCard({
  day,
  compact = false,
  regenerating = false,
  onStatusChange,
  onRegenerate,
}: CalendarDayCardProps) {
  const statusMeta = STATUS_STYLES[day.status];

  return (
    <article
      className={cn(
        "flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.02]",
        compact ? "p-3" : "p-4",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-mono text-[9px] tracking-[0.16em] text-sky-300/90 uppercase">
            {day.dayLabel}
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-200">
            {getCalendarPlatformLabel(day.platform)}
          </p>
          <p className="text-xs text-zinc-500">
            {day.postType} · {day.audienceLens}
          </p>
        </div>
        <Badge variant={statusMeta.badge}>{statusMeta.label}</Badge>
      </div>

      {!compact && (
        <div className="mt-3 space-y-3 text-sm text-zinc-300">
          <section>
            <p className="font-mono text-[8px] tracking-[0.14em] text-zinc-500 uppercase">
              Hook
            </p>
            <p className="mt-1 whitespace-pre-wrap">{day.hook}</p>
          </section>
          <section>
            <p className="font-mono text-[8px] tracking-[0.14em] text-zinc-500 uppercase">
              Caption
            </p>
            <p className="mt-1 whitespace-pre-wrap text-zinc-400">{day.caption}</p>
          </section>
          <section>
            <p className="font-mono text-[8px] tracking-[0.14em] text-zinc-500 uppercase">
              CTA
            </p>
            <p className="mt-1">{day.cta}</p>
          </section>
          <section>
            <p className="font-mono text-[8px] tracking-[0.14em] text-zinc-500 uppercase">
              Suggested visual
            </p>
            <p className="mt-1 text-zinc-400">{day.suggestedVisual}</p>
          </section>
          {day.videoPrompt.trim() && (
            <section>
              <p className="font-mono text-[8px] tracking-[0.14em] text-zinc-500 uppercase">
                Sora / HeyGen
              </p>
              <p className="mt-1 text-zinc-400">{day.videoPrompt}</p>
            </section>
          )}
          <section>
            <p className="font-mono text-[8px] tracking-[0.14em] text-zinc-500 uppercase">
              Landing tie-in
            </p>
            <p className="mt-1 text-zinc-400">{day.landingPageTieIn}</p>
          </section>
        </div>
      )}

      {compact && (
        <p className="mt-2 line-clamp-2 text-xs text-zinc-400">{day.hook}</p>
      )}

      <div className="mt-3 flex flex-wrap gap-2 border-t border-white/[0.04] pt-3">
        <CopyButton text={calendarDayToCopyText(day)} label="Copy day" />
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={regenerating}
          onClick={onRegenerate}
        >
          {regenerating ? "…" : "Regenerate"}
        </Button>
        {day.status !== "ready" && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onStatusChange("ready")}
          >
            Mark ready
          </Button>
        )}
        {day.status !== "posted" && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onStatusChange("posted")}
          >
            Mark posted
          </Button>
        )}
        {day.status !== "draft" && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onStatusChange("draft")}
          >
            Draft
          </Button>
        )}
      </div>
    </article>
  );
}
