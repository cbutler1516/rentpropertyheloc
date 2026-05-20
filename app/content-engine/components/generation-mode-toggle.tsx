"use client";

import { cn } from "@/lib/utils";
import type { GenerationMode } from "../lib/types";

type GenerationModeToggleProps = {
  value: GenerationMode;
  onChange: (mode: GenerationMode) => void;
};

export function GenerationModeToggle({
  value,
  onChange,
}: GenerationModeToggleProps) {
  return (
    <div
      className="inline-flex rounded-xl border border-white/[0.08] bg-[#07111f]/80 p-1"
      role="tablist"
      aria-label="Generation mode"
    >
      {(
        [
          ["single", "Single content pack"],
          ["campaign", "Campaign mode"],
        ] as const
      ).map(([mode, label]) => (
        <button
          key={mode}
          type="button"
          role="tab"
          aria-selected={value === mode}
          onClick={() => onChange(mode)}
          className={cn(
            "rounded-lg px-4 py-2 font-mono text-[9px] tracking-[0.14em] uppercase transition-all",
            value === mode
              ? mode === "campaign"
                ? "bg-[#c9a227]/20 text-[#e8c547] ring-1 ring-[#c9a227]/40"
                : "bg-[#7c3aed]/25 text-[#e9d5ff] ring-1 ring-[#7c3aed]/40"
              : "text-zinc-500 hover:text-zinc-300",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
