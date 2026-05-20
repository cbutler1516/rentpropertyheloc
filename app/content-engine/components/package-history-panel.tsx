"use client";

import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Select } from "@/app/components/ui/select";
import { cn } from "@/lib/utils";
import { filterPackages, uniqueTopics } from "../lib/filters";
import {
  CONTENT_AUDIENCES,
  type ContentAudience,
  type ContentPackage,
  type DateFilterPreset,
  type PackageFilters,
} from "../lib/types";

type PackageHistoryPanelProps = {
  packages: ContentPackage[];
  filters: PackageFilters;
  activePackageId: string | null;
  onFiltersChange: (filters: PackageFilters) => void;
  onSelect: (pkg: ContentPackage) => void;
  onDelete: (id: string) => void;
  onDuplicate: (pkg: ContentPackage) => void;
  onRegenerate: (pkg: ContentPackage) => void;
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function PackageHistoryPanel({
  packages,
  filters,
  activePackageId,
  onFiltersChange,
  onSelect,
  onDelete,
  onDuplicate,
  onRegenerate,
}: PackageHistoryPanelProps) {
  const topics = ["all", ...uniqueTopics(packages)];
  const filtered = filterPackages(packages, filters);

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="search"
        value={filters.search}
        onChange={(event) =>
          onFiltersChange({ ...filters, search: event.target.value })
        }
        placeholder="Search title, tags, topic…"
        aria-label="Search packages"
      />

      <div className="grid gap-2">
        <Select
          value={filters.audience}
          onChange={(event) =>
            onFiltersChange({
              ...filters,
              audience: event.target.value as ContentAudience | "all",
            })
          }
          aria-label="Filter by audience"
        >
          <option value="all">All audiences</option>
          {CONTENT_AUDIENCES.map((audience) => (
            <option key={audience} value={audience}>
              {audience}
            </option>
          ))}
        </Select>

        <Select
          value={filters.topic}
          onChange={(event) =>
            onFiltersChange({ ...filters, topic: event.target.value })
          }
          aria-label="Filter by topic"
        >
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic === "all" ? "All topics" : topic}
            </option>
          ))}
        </Select>

        <Select
          value={filters.datePreset}
          onChange={(event) =>
            onFiltersChange({
              ...filters,
              datePreset: event.target.value as DateFilterPreset,
            })
          }
          aria-label="Filter by date"
        >
          <option value="all">All dates</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </Select>
      </div>

      <p className="font-mono text-[9px] tracking-[0.16em] text-zinc-500 uppercase">
        {filtered.length} package{filtered.length === 1 ? "" : "s"}
      </p>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <p className="px-2 py-6 text-center text-xs text-zinc-500">
            No packages match your filters.
          </p>
        ) : (
          filtered.map((pkg) => (
            <div
              key={pkg.id}
              className={cn(
                "group w-full rounded-xl border transition-all",
                activePackageId === pkg.id
                  ? "border-[#7c3aed]/50 bg-[#7c3aed]/10"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]",
              )}
            >
              <button
                type="button"
                onClick={() => onSelect(pkg)}
                className="w-full px-3 py-3 text-left"
              >
                <p className="line-clamp-2 text-sm font-medium text-zinc-200">
                  {pkg.title}
                </p>
                <p className="mt-1 line-clamp-1 text-[11px] text-zinc-500">
                  {pkg.topic}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] text-zinc-500">
                    {formatDate(pkg.createdAt)}
                  </span>
                  <Badge variant="purple">{pkg.audience}</Badge>
                  {pkg.generationMode === "campaign" && (
                    <Badge variant="gold">campaign</Badge>
                  )}
                  {pkg.landingPage && (
                    <Badge variant="success">landing</Badge>
                  )}
                  {pkg.calendar && (
                    <Badge variant="default">calendar</Badge>
                  )}
                  {pkg.leadMagnet && (
                    <Badge variant="gold">magnet</Badge>
                  )}
                  {pkg.launchHub && (
                    <Badge variant="purple">launch</Badge>
                  )}
                  {pkg.leadCapture && (
                    <Badge variant="warning">capture</Badge>
                  )}
                  {pkg.crmIntegration && (
                    <Badge variant="purple">crm</Badge>
                  )}
                  <Badge variant={pkg.modelUsed === "demo" ? "gold" : "purple"}>
                    {pkg.modelUsed === "demo" ? "demo" : "ai"}
                  </Badge>
                </div>
              </button>
              <div className="flex border-t border-white/[0.04]">
                <button
                  type="button"
                  onClick={() => onDuplicate(pkg)}
                  className="flex-1 px-2 py-1.5 font-mono text-[8px] tracking-[0.12em] text-zinc-500 uppercase hover:text-[#c9a227]"
                >
                  Duplicate
                </button>
                <button
                  type="button"
                  onClick={() => onRegenerate(pkg)}
                  className="flex-1 border-x border-white/[0.04] px-2 py-1.5 font-mono text-[8px] tracking-[0.12em] text-zinc-500 uppercase hover:text-[#c4b5fd]"
                >
                  Regenerate
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(pkg.id)}
                  className="flex-1 px-2 py-1.5 font-mono text-[8px] tracking-[0.12em] text-zinc-500 uppercase hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
