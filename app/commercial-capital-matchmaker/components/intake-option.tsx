"use client";

import { cn } from "@/lib/utils";

type IntakeOptionProps = {
  label: string;
  description?: string;
  selected: boolean;
  disabled?: boolean;
  onSelect: () => void;
};

export function IntakeOption({
  label,
  description,
  selected,
  disabled,
  onSelect,
}: IntakeOptionProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "w-full rounded-2xl bg-white/[0.03] px-5 py-4 text-left ring-1 ring-white/[0.06] transition-all duration-[var(--duration-hover)] hover:bg-white/[0.05] hover:ring-[#7c3aed]/30",
        selected &&
          "intake-option-selected bg-[#7c3aed]/10 ring-[#7c3aed]/40",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <span className="block text-sm font-medium text-white">{label}</span>
      {description ? (
        <span className="mt-1 block text-xs leading-relaxed text-zinc-500">
          {description}
        </span>
      ) : null}
    </button>
  );
}
