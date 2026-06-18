"use client";

import { Card } from "@/components/ui/card";
import { DEAL_PATH_OPTIONS } from "@/lib/deal-analyzer/constants";
import type { DealType } from "@/lib/deal-analyzer/types";
import { cn } from "@/lib/cn";

type PathSelectionProps = {
  selected: DealType | null;
  onSelect: (type: DealType) => void;
};

export function PathSelection({ selected, onSelect }: PathSelectionProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {DEAL_PATH_OPTIONS.map((path) => (
        <button
          key={path.id}
          type="button"
          onClick={() => onSelect(path.id)}
          className={cn(
            "rounded-2xl border p-5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600",
            selected === path.id
              ? "border-teal-500 bg-teal-50/80 shadow-sm ring-1 ring-teal-200"
              : "border-slate-200 bg-white hover:border-teal-200 hover:bg-slate-50/80",
          )}
        >
          <Card className="border-0 bg-transparent p-0 shadow-none">
            <h3 className="font-semibold text-slate-900">{path.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{path.description}</p>
          </Card>
        </button>
      ))}
    </div>
  );
}
