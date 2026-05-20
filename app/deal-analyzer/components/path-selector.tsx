"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { dealPathMeta } from "../lib/constants";
import type { DealPath } from "../lib/types";
import { Badge } from "@/app/components/ui/badge";

const paths: DealPath[] = [
  "buy-home",
  "refinance",
  "investor-dscr",
  "commercial",
];

export function PathSelector({
  selected,
  onSelect,
  linkMode = false,
}: {
  selected?: DealPath;
  onSelect?: (path: DealPath) => void;
  linkMode?: boolean;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {paths.map((path) => {
        const meta = dealPathMeta[path];
        const active = selected === path;
        const className = cn(
          "group relative overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300",
          active
            ? "border-[#7c3aed]/60 bg-[#7c3aed]/10 shadow-[0_0_40px_rgba(124,58,237,0.15)]"
            : "border-white/[0.08] bg-zinc-900/40 hover:border-[#7c3aed]/30 hover:bg-zinc-900/70",
        );

        const inner = (
          <>
            <Badge variant={active ? "purple" : "default"}>{meta.eyebrow}</Badge>
            <h3 className="mt-4 text-lg font-medium text-white">{meta.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {meta.description}
            </p>
            <span className="mt-5 inline-block font-mono text-[9px] tracking-[0.2em] text-[#c9a227] uppercase opacity-0 transition-opacity group-hover:opacity-100">
              {active ? "Selected" : "Select path →"}
            </span>
          </>
        );

        if (linkMode) {
          return (
            <Link
              key={path}
              href={`/deal-analyzer/analyze?path=${path}`}
              className={className}
            >
              {inner}
            </Link>
          );
        }

        return (
          <button
            key={path}
            type="button"
            className={className}
            onClick={() => onSelect?.(path)}
          >
            {inner}
          </button>
        );
      })}
    </div>
  );
}

