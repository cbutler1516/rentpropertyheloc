"use client";

import { cn } from "@/lib/utils";

export type OutputView = "content" | "landing" | "calendar";

type OutputViewTabsProps = {
  showLanding?: boolean;
  showCalendar?: boolean;
  activeView: OutputView;
  onViewChange: (view: OutputView) => void;
  contentLabel?: string;
};

export function OutputViewTabs({
  showLanding = false,
  showCalendar = false,
  activeView,
  onViewChange,
  contentLabel = "Content",
}: OutputViewTabsProps) {
  if (!showLanding && !showCalendar) return null;

  const tabs: { id: OutputView; label: string; activeClass: string }[] = [
    {
      id: "content",
      label: contentLabel,
      activeClass: "bg-[#7c3aed]/25 text-[#e9d5ff]",
    },
  ];

  if (showLanding) {
    tabs.push({
      id: "landing",
      label: "Landing page",
      activeClass: "bg-emerald-500/25 text-emerald-200",
    });
  }

  if (showCalendar) {
    tabs.push({
      id: "calendar",
      label: "Calendar",
      activeClass: "bg-sky-500/25 text-sky-200",
    });
  }

  return (
    <div className="mb-4 flex gap-1 rounded-lg border border-white/[0.06] bg-black/20 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onViewChange(tab.id)}
          className={cn(
            "flex-1 rounded-md px-3 py-2 font-mono text-[9px] tracking-[0.14em] uppercase transition-all",
            activeView === tab.id
              ? tab.activeClass
              : "text-zinc-500 hover:text-zinc-300",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
