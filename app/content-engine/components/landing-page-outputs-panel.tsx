"use client";

import { Button } from "@/app/components/ui/button";
import { CardDescription, CardTitle } from "@/app/components/ui/card";
import { cn } from "@/lib/utils";
import { downloadTextFile } from "../lib/export";
import { getLandingPageIntent } from "../lib/landing-page-intents";
import {
  landingPageToFullCopy,
  landingPageToMarkdown,
  landingPageToPlainText,
} from "../lib/landing-page-export";
import { LANDING_PAGE_TABS } from "../lib/landing-page-tabs";
import type { LandingPageRecord, LandingPageSectionKey } from "../lib/types";
import { CopyButton } from "./copy-button";

type LandingPageOutputsPanelProps = {
  landingPage: LandingPageRecord;
  packageTitle: string;
  activeSection: LandingPageSectionKey;
  onSectionChange: (key: LandingPageSectionKey) => void;
};

export function LandingPageOutputsPanel({
  landingPage,
  packageTitle,
  activeSection,
  onSectionChange,
}: LandingPageOutputsPanelProps) {
  const intent = getLandingPageIntent(landingPage.intent);
  const activeConfig = LANDING_PAGE_TABS.find((tab) => tab.key === activeSection);
  const activeText = landingPage.sections[activeSection];
  const slug = packageTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 40);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 pb-4">
        <div>
          <CardTitle>Landing page</CardTitle>
          <CardDescription>
            {intent.label} — {activeConfig?.description ?? "Lead-capture copy"}
          </CardDescription>
        </div>
        <CopyButton text={activeText} label="Copy section" />
      </div>

      <div className="-mx-2 flex gap-1 overflow-x-auto pb-3" role="tablist">
        {LANDING_PAGE_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeSection === tab.key}
            onClick={() => onSectionChange(tab.key)}
            className={cn(
              "shrink-0 rounded-lg px-2.5 py-2 font-mono text-[8px] tracking-[0.1em] uppercase transition-all",
              activeSection === tab.key
                ? "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-500/40"
                : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300",
            )}
          >
            {tab.shortLabel}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] px-4 py-3">
          <p className="font-mono text-[9px] tracking-[0.2em] text-emerald-300/90 uppercase">
            {activeConfig?.label}
          </p>
          <div className="flex flex-wrap gap-2">
            <CopyButton text={landingPageToFullCopy(landingPage)} label="Copy all" />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() =>
                downloadTextFile(
                  `${slug}-landing.md`,
                  landingPageToMarkdown(landingPage, packageTitle),
                  "text/markdown",
                )
              }
            >
              .md
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() =>
                downloadTextFile(
                  `${slug}-landing.txt`,
                  landingPageToPlainText(landingPage),
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
