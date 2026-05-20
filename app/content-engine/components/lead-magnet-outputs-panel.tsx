"use client";

import { Button } from "@/app/components/ui/button";
import { CardDescription, CardTitle } from "@/app/components/ui/card";
import { cn } from "@/lib/utils";
import { downloadTextFile } from "../lib/export";
import { getLeadMagnetType } from "../lib/lead-magnet-types";
import {
  leadMagnetToFullCopy,
  leadMagnetToMarkdown,
  leadMagnetToPdfReadyText,
} from "../lib/lead-magnet-export";
import { LEAD_MAGNET_TABS } from "../lib/lead-magnet-tabs";
import type { LeadMagnetRecord, LeadMagnetSectionKey } from "../lib/types";
import { CopyButton } from "./copy-button";

type LeadMagnetOutputsPanelProps = {
  leadMagnet: LeadMagnetRecord;
  packageTitle: string;
  activeSection: LeadMagnetSectionKey;
  onSectionChange: (key: LeadMagnetSectionKey) => void;
};

export function LeadMagnetOutputsPanel({
  leadMagnet,
  packageTitle,
  activeSection,
  onSectionChange,
}: LeadMagnetOutputsPanelProps) {
  const typeConfig = getLeadMagnetType(leadMagnet.type);
  const activeConfig = LEAD_MAGNET_TABS.find((tab) => tab.key === activeSection);
  const activeText = leadMagnet.sections[activeSection];
  const slug = packageTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 40);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 pb-4">
        <div>
          <CardTitle>Lead magnet report</CardTitle>
          <CardDescription>
            {typeConfig.label} — {activeConfig?.description ?? "PDF-ready report"}
          </CardDescription>
        </div>
        <CopyButton text={activeText} label="Copy section" />
      </div>

      <div className="-mx-2 flex gap-1 overflow-x-auto pb-3" role="tablist">
        {LEAD_MAGNET_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeSection === tab.key}
            onClick={() => onSectionChange(tab.key)}
            className={cn(
              "shrink-0 rounded-lg px-2.5 py-2 font-mono text-[8px] tracking-[0.1em] uppercase transition-all",
              activeSection === tab.key
                ? "bg-[#c9a227]/20 text-[#e8c547] ring-1 ring-[#c9a227]/40"
                : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300",
            )}
          >
            {tab.shortLabel}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-[#c9a227]/25 bg-[#c9a227]/[0.03]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] px-4 py-3">
          <p className="font-mono text-[9px] tracking-[0.2em] text-[#e8c547]/90 uppercase">
            {activeConfig?.label}
          </p>
          <div className="flex flex-wrap gap-2">
            <CopyButton text={leadMagnetToFullCopy(leadMagnet)} label="Copy full report" />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() =>
                downloadTextFile(
                  `${slug}-lead-magnet.md`,
                  leadMagnetToMarkdown(leadMagnet, packageTitle),
                  "text/markdown",
                )
              }
            >
              Markdown
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() =>
                downloadTextFile(
                  `${slug}-lead-magnet-print.txt`,
                  leadMagnetToPdfReadyText(leadMagnet, packageTitle),
                )
              }
            >
              PDF-ready
            </Button>
          </div>
        </div>
        <pre className="flex-1 overflow-auto whitespace-pre-wrap px-4 py-5 font-sans text-sm leading-relaxed text-zinc-200">
          {activeText}
        </pre>
      </div>
    </div>
  );
}
