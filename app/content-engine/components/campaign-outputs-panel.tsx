"use client";

import { CardDescription, CardTitle } from "@/app/components/ui/card";
import { cn } from "@/lib/utils";
import { CAMPAIGN_TABS } from "../lib/campaign-tabs";
import type { CampaignOutputs, CampaignOutputTabKey } from "../lib/types";
import { CopyButton } from "./copy-button";

type CampaignOutputsPanelProps = {
  outputs: CampaignOutputs | null;
  activeTab: CampaignOutputTabKey;
  onTabChange: (tab: CampaignOutputTabKey) => void;
};

export function CampaignOutputsPanel({
  outputs,
  activeTab,
  onTabChange,
}: CampaignOutputsPanelProps) {
  const activeConfig = CAMPAIGN_TABS.find((tab) => tab.key === activeTab);
  const activeOutput = outputs?.[activeTab] ?? "";

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 pb-4">
        <div>
          <CardTitle>Campaign outputs</CardTitle>
          <CardDescription>
            {activeConfig?.description ??
              "Enter a topic and build your 7-day campaign."}
          </CardDescription>
        </div>
        {outputs && <CopyButton text={activeOutput} label="Copy tab" />}
      </div>
      <div
        className="-mx-2 flex gap-1 overflow-x-auto pb-3"
        role="tablist"
      >
        {CAMPAIGN_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => onTabChange(tab.key)}
            disabled={!outputs}
            className={cn(
              "shrink-0 rounded-lg px-3 py-2 font-mono text-[9px] tracking-[0.12em] uppercase transition-all",
              activeTab === tab.key
                ? "bg-[#c9a227]/20 text-[#e8c547] ring-1 ring-[#c9a227]/40"
                : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300 disabled:opacity-40",
            )}
          >
            <span className="mr-1 opacity-60">{tab.icon}</span>
            {tab.shortLabel}
          </button>
        ))}
      </div>
      {!outputs ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#c9a227]/30 bg-[#c9a227]/10 font-mono text-lg text-[#e8c547]">
            7D
          </div>
          <p className="max-w-sm text-sm text-zinc-500">
            One topic becomes video ideas, hooks, social posts, email subjects,
            SEO angle, AI prompts, and a full week schedule.
          </p>
        </div>
      ) : (
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-6 py-3">
            <p className="font-mono text-[9px] tracking-[0.2em] text-[#c9a227] uppercase">
              {activeConfig?.label}
            </p>
            <CopyButton text={activeOutput} label="Copy" />
          </div>
          <pre className="flex-1 overflow-auto whitespace-pre-wrap px-6 py-5 font-sans text-sm leading-relaxed text-zinc-200">
            {activeOutput}
          </pre>
        </div>
      )}
    </div>
  );
}
