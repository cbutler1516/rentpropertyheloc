"use client";

import { useMemo, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { CardDescription, CardTitle } from "@/app/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CALENDAR_FILTER_OPTIONS,
  filterCalendarDays,
} from "../lib/calendar-filters";
import {
  calendarToCsv,
  calendarToMarkdown,
} from "../lib/calendar-export";
import { getCalendarPlatformLabel } from "../lib/calendar-platforms";
import { downloadTextFile } from "../lib/export";
import type {
  CalendarDayEntry,
  CalendarDayStatus,
  CalendarFilterId,
  CalendarViewMode,
  ContentCalendarRecord,
} from "../lib/types";
import { CALENDAR_PLATFORMS } from "../lib/types";
import { CalendarDayCard } from "./calendar-day-card";
import { CopyButton } from "./copy-button";

type CalendarOutputsPanelProps = {
  calendar: ContentCalendarRecord;
  packageTitle: string;
  regeneratingDayIndex: number | null;
  onCalendarChange: (calendar: ContentCalendarRecord) => void;
  onRegenerateDay: (dayIndex: number) => void;
};

const VIEW_MODES: { id: CalendarViewMode; label: string }[] = [
  { id: "board", label: "Weekly board" },
  { id: "list", label: "List" },
  { id: "platform", label: "By platform" },
];

function updateDayStatus(
  calendar: ContentCalendarRecord,
  dayIndex: number,
  status: CalendarDayStatus,
): ContentCalendarRecord {
  return {
    ...calendar,
    days: calendar.days.map((day) =>
      day.dayIndex === dayIndex ? { ...day, status } : day,
    ),
  };
}

export function CalendarOutputsPanel({
  calendar,
  packageTitle,
  regeneratingDayIndex,
  onCalendarChange,
  onRegenerateDay,
}: CalendarOutputsPanelProps) {
  const [viewMode, setViewMode] = useState<CalendarViewMode>("board");
  const [activeFilters, setActiveFilters] = useState<Set<CalendarFilterId>>(
    new Set(),
  );

  const toggleFilter = (id: CalendarFilterId) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredDays = useMemo(
    () => filterCalendarDays(calendar.days, activeFilters),
    [calendar.days, activeFilters],
  );

  const weekCopyText = useMemo(
    () =>
      filteredDays
        .map((day) => {
          const header = `${day.dayLabel} · ${getCalendarPlatformLabel(day.platform)}`;
          return `${header}\n\n${day.hook}\n\n${day.caption}\n\nCTA: ${day.cta}`;
        })
        .join("\n\n---\n\n"),
    [filteredDays],
  );

  const slug = packageTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 40);

  const handleStatusChange = (dayIndex: number, status: CalendarDayStatus) => {
    onCalendarChange(updateDayStatus(calendar, dayIndex, status));
  };

  const groupedByPlatform = useMemo(() => {
    const groups = new Map<string, CalendarDayEntry[]>();
    for (const platform of CALENDAR_PLATFORMS) {
      const days = filteredDays.filter((d) => d.platform === platform);
      if (days.length > 0) {
        groups.set(platform, days);
      }
    }
    return groups;
  }, [filteredDays]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 pb-4">
        <div>
          <CardTitle>7-day calendar</CardTitle>
          <CardDescription>{calendar.weekTheme}</CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton text={weekCopyText} label="Copy full week" />
          <CopyButton
            text={calendarToMarkdown(calendar, packageTitle)}
            label="Copy Markdown"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() =>
              downloadTextFile(
                `${slug}-calendar.md`,
                calendarToMarkdown(calendar, packageTitle),
                "text/markdown",
              )
            }
          >
            Export .md
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() =>
              downloadTextFile(
                `${slug}-calendar.csv`,
                calendarToCsv(calendar),
                "text/csv;charset=utf-8",
              )
            }
          >
            Export CSV
          </Button>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-1">
        {VIEW_MODES.map((mode) => (
          <button
            key={mode.id}
            type="button"
            onClick={() => setViewMode(mode.id)}
            className={cn(
              "rounded-lg px-3 py-2 font-mono text-[9px] tracking-[0.12em] uppercase transition-all",
              viewMode === mode.id
                ? "bg-sky-500/25 text-sky-200 ring-1 ring-sky-500/40"
                : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300",
            )}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {CALENDAR_FILTER_OPTIONS.map((filter) => {
          const active = activeFilters.has(filter.id);
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => toggleFilter(filter.id)}
              className={cn(
                "rounded-full border px-2.5 py-1 font-mono text-[8px] tracking-[0.1em] uppercase transition-all",
                active
                  ? "border-sky-500/50 bg-sky-500/15 text-sky-200"
                  : "border-white/[0.08] text-zinc-500 hover:border-white/15 hover:text-zinc-300",
              )}
            >
              {filter.label}
            </button>
          );
        })}
        {activeFilters.size > 0 && (
          <button
            type="button"
            onClick={() => setActiveFilters(new Set())}
            className="rounded-full px-2 py-1 font-mono text-[8px] tracking-[0.1em] text-zinc-500 uppercase hover:text-zinc-300"
          >
            Clear filters
          </button>
        )}
      </div>

      {filteredDays.length === 0 ? (
        <p className="py-12 text-center text-sm text-zinc-500">
          No days match the selected filters.
        </p>
      ) : viewMode === "board" ? (
        <div className="grid flex-1 gap-3 overflow-auto sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredDays.map((day) => (
            <CalendarDayCard
              key={day.dayIndex}
              day={day}
              compact
              regenerating={regeneratingDayIndex === day.dayIndex}
              onStatusChange={(status) => handleStatusChange(day.dayIndex, status)}
              onRegenerate={() => onRegenerateDay(day.dayIndex)}
            />
          ))}
        </div>
      ) : viewMode === "list" ? (
        <div className="flex flex-1 flex-col gap-4 overflow-auto">
          {filteredDays.map((day) => (
            <CalendarDayCard
              key={day.dayIndex}
              day={day}
              regenerating={regeneratingDayIndex === day.dayIndex}
              onStatusChange={(status) => handleStatusChange(day.dayIndex, status)}
              onRegenerate={() => onRegenerateDay(day.dayIndex)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-6 overflow-auto">
          {Array.from(groupedByPlatform.entries()).map(([platform, days]) => (
            <section key={platform}>
              <h3 className="mb-3 font-mono text-[10px] tracking-[0.18em] text-sky-300/90 uppercase">
                {getCalendarPlatformLabel(
                  platform as (typeof CALENDAR_PLATFORMS)[number],
                )}
              </h3>
              <div className="grid gap-3 lg:grid-cols-2">
                {days.map((day) => (
                  <CalendarDayCard
                    key={day.dayIndex}
                    day={day}
                    regenerating={regeneratingDayIndex === day.dayIndex}
                    onStatusChange={(status) =>
                      handleStatusChange(day.dayIndex, status)
                    }
                    onRegenerate={() => onRegenerateDay(day.dayIndex)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
