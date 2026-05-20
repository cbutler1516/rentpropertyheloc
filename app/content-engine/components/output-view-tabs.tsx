"use client";

import { cn } from "@/lib/utils";

export type OutputView =
  | "content"
  | "landing"
  | "calendar"
  | "leadMagnet"
  | "launchHub"
  | "leadCapture";

type OutputViewTabsProps = {
  showLanding?: boolean;
  showCalendar?: boolean;
  showLeadMagnet?: boolean;
  showLaunchHub?: boolean;
  showLeadCapture?: boolean;
  activeView: OutputView;
  onViewChange: (view: OutputView) => void;
  contentLabel?: string;
};

export function OutputViewTabs({
  showLanding = false,
  showCalendar = false,
  showLeadMagnet = false,
  showLaunchHub = false,
  showLeadCapture = false,
  activeView,
  onViewChange,
  contentLabel = "Content",
}: OutputViewTabsProps) {
  if (
    !showLanding &&
    !showCalendar &&
    !showLeadMagnet &&
    !showLaunchHub &&
    !showLeadCapture
  ) {
    return null;
  }

  const tabs: { id: OutputView; label: string; activeClass: string }[] = [
    {
      id: "content",
      label: contentLabel,
      activeClass: "bg-[#7c3aed]/25 text-[#e9d5ff]",
    },
  ];

  if (showLaunchHub) {
    tabs.push({
      id: "launchHub",
      label: "Launch hub",
      activeClass: "bg-[#7c3aed]/35 text-white ring-1 ring-[#7c3aed]/50",
    });
  }

  if (showLeadCapture) {
    tabs.push({
      id: "leadCapture",
      label: "Lead capture",
      activeClass: "bg-rose-500/25 text-rose-200",
    });
  }

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

  if (showLeadMagnet) {
    tabs.push({
      id: "leadMagnet",
      label: "Lead magnet",
      activeClass: "bg-[#c9a227]/25 text-[#e8c547]",
    });
  }

  return (
    <div className="mb-4 flex gap-1 overflow-x-auto rounded-lg border border-white/[0.06] bg-black/20 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onViewChange(tab.id)}
          className={cn(
            "shrink-0 rounded-md px-3 py-2 font-mono text-[9px] tracking-[0.14em] uppercase transition-all",
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
