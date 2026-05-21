"use client";

import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select } from "@/app/components/ui/select";
import { dealPathMeta } from "@/app/deal-analyzer/lib/constants";
import {
  defaultAdminFilters,
  type DealAnalyzerAdminFilters,
} from "@/app/deal-analyzer/lib/admin/types";
import type { ClientRole, DealPath } from "@/app/deal-analyzer/lib/types";

const ROLES: Array<ClientRole | "all"> = [
  "all",
  "Buyer",
  "Agent",
  "Investor",
  "Commercial Client",
];

const DEAL_TYPES: Array<DealPath | "all"> = [
  "all",
  "buy-home",
  "refinance",
  "investor-dscr",
  "commercial",
];

type AdminFiltersProps = {
  filters: DealAnalyzerAdminFilters;
  onChange: (filters: DealAnalyzerAdminFilters) => void;
  resultCount: number;
};

export function AdminFilters({ filters, onChange, resultCount }: AdminFiltersProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-white/[0.06] bg-zinc-950/50 p-4 md:p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
            Filters
          </p>
          <p className="text-sm text-zinc-400">{resultCount} reports matching</p>
        </div>
        <button
          type="button"
          className="font-mono text-[9px] tracking-[0.16em] text-zinc-500 uppercase hover:text-zinc-300"
          onClick={() => onChange({ ...defaultAdminFilters })}
        >
          Clear all
        </button>
      </div>

      <Input
        type="search"
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        placeholder="Search name, email, phone, agent, slug…"
        aria-label="Search reports"
      />

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["all", "All"],
            ["Buyer", "Buyer"],
            ["Agent", "Agent"],
            ["Investor", "Investor"],
            ["Commercial Client", "Commercial"],
          ] as const
        ).map(([role, label]) => (
          <button
            key={role}
            type="button"
            className={
              filters.role === role
                ? "rounded-full border border-[#7c3aed]/50 bg-[#7c3aed]/20 px-3 py-1 font-mono text-[9px] tracking-[0.14em] text-[#c4b5fd] uppercase"
                : "rounded-full border border-white/[0.08] px-3 py-1 font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase hover:border-white/[0.15] hover:text-zinc-300"
            }
            onClick={() => onChange({ ...filters, role })}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          className={
            filters.needsFollowUp
              ? "rounded-full border border-amber-500/50 bg-amber-500/15 px-3 py-1 font-mono text-[9px] tracking-[0.14em] text-amber-200 uppercase"
              : "rounded-full border border-white/[0.08] px-3 py-1 font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase hover:border-white/[0.15] hover:text-zinc-300"
          }
          onClick={() =>
            onChange({ ...filters, needsFollowUp: !filters.needsFollowUp })
          }
        >
          Needs follow-up
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="w-full font-mono text-[9px] tracking-[0.16em] text-zinc-600 uppercase">
          CRM status
        </span>
        {(
          [
            ["all", "All CRM"],
            ["not_pushed", "Not pushed"],
            ["failed", "Failed"],
            ["pushed", "Pushed"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={
              filters.crmPush === value
                ? "rounded-full border border-[#7c3aed]/50 bg-[#7c3aed]/20 px-3 py-1 font-mono text-[9px] tracking-[0.14em] text-[#c4b5fd] uppercase"
                : "rounded-full border border-white/[0.08] px-3 py-1 font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase hover:border-white/[0.15] hover:text-zinc-300"
            }
            onClick={() => onChange({ ...filters, crmPush: value })}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5">
          <Label>Lead role</Label>
          <Select
            value={filters.role}
            onChange={(e) =>
              onChange({ ...filters, role: e.target.value as ClientRole | "all" })
            }
          >
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role === "all" ? "All roles" : role}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Deal type</Label>
          <Select
            value={filters.dealType}
            onChange={(e) =>
              onChange({ ...filters, dealType: e.target.value as DealPath | "all" })
            }
          >
            {DEAL_TYPES.map((dt) => (
              <option key={dt} value={dt}>
                {dt === "all" ? "All deal types" : dealPathMeta[dt].label}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
          <Label>Date range</Label>
          <Select
            value={filters.datePreset}
            onChange={(e) =>
              onChange({
                ...filters,
                datePreset: e.target.value as DealAnalyzerAdminFilters["datePreset"],
              })
            }
          >
            <option value="all">All time</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="custom">Custom range</option>
          </Select>
        </div>
      </div>

      {filters.datePreset === "custom" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="date-from">From</Label>
            <Input
              id="date-from"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="date-to">To</Label>
            <Input
              id="date-to"
              type="date"
              value={filters.dateTo}
              onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
