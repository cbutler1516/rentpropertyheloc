"use client";

import type { ReactNode } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { cn } from "@/lib/utils";
import { getBrandVoice } from "../lib/brand-voices";
import { getLandingPageIntent } from "../lib/landing-page-intents";
import { getLeadMagnetType } from "../lib/lead-magnet-types";
import { getLeadCapturePreset } from "../lib/lead-capture-presets";
import {
  CAMPAIGN_TEMPLATES,
  type CampaignTemplate,
  type CampaignTemplateId,
} from "../lib/campaign-templates";
import { CampaignBuildProgress } from "./campaign-build-progress";
import type { CampaignBuildStepState } from "../lib/campaign-template-build";

type CampaignTemplatesPanelProps = {
  selectedId: CampaignTemplateId | null;
  onSelect: (id: CampaignTemplateId) => void;
  onBuild: (template: CampaignTemplate) => void;
  building: boolean;
  buildSteps: CampaignBuildStepState[];
};

export function CampaignTemplatesPanel({
  selectedId,
  onSelect,
  onBuild,
  building,
  buildSteps,
}: CampaignTemplatesPanelProps) {
  const selected = selectedId
    ? CAMPAIGN_TEMPLATES.find((t) => t.id === selectedId)
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium tracking-tight text-white">
          Campaign templates
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-zinc-400">
          One-click builder runs content pack, landing page, calendar, lead
          magnet, launch hub, lead capture, and CRM/analytics prefill — then
          saves your package.
        </p>
      </div>

      <CampaignBuildProgress steps={buildSteps} active={building} />

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-3 sm:grid-cols-2">
          {CAMPAIGN_TEMPLATES.map((template) => (
            <button
              key={template.id}
              type="button"
              disabled={building}
              onClick={() => onSelect(template.id)}
              className={cn(
                "rounded-xl border p-4 text-left transition-all",
                selectedId === template.id
                  ? "border-[#7c3aed]/50 bg-[#7c3aed]/15 ring-1 ring-[#7c3aed]/40"
                  : "border-white/[0.06] bg-black/20 hover:border-white/15 hover:bg-white/[0.03]",
                building && "pointer-events-none opacity-60",
              )}
            >
              <p className="font-medium text-zinc-100">{template.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {template.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                <Badge variant="purple">{template.targetAudience}</Badge>
                <Badge variant="default">
                  {getBrandVoice(template.brandVoiceId).name.split("/")[0].trim()}
                </Badge>
              </div>
            </button>
          ))}
        </div>

        <Card className="h-fit border-[#c9a227]/20 bg-[#0f1a2e]/80">
          <CardHeader>
            <CardTitle className="text-base">
              {selected ? selected.title : "Select a template"}
            </CardTitle>
            <CardDescription>
              {selected
                ? selected.description
                : "Choose a preset to preview settings."}
            </CardDescription>
          </CardHeader>
          {selected && (
            <CardContent className="space-y-4">
              <DetailRow label="Brand voice">
                {getBrandVoice(selected.brandVoiceId).name}
              </DetailRow>
              <DetailRow label="Landing intent">
                {getLandingPageIntent(selected.landingPageIntent).label}
              </DetailRow>
              <DetailRow label="Lead magnet">
                {getLeadMagnetType(selected.leadMagnetType).label}
              </DetailRow>
              <DetailRow label="Lead capture">
                {getLeadCapturePreset(selected.leadCapturePreset).label}
              </DetailRow>
              <DetailRow label="CRM tag">{selected.suggestedCrmTag}</DetailRow>
              <DetailRow label="UTM campaign">
                {selected.suggestedUtmCampaign}
              </DetailRow>
              <DetailRow label="Platforms">
                {selected.recommendedPlatforms.join(" · ")}
              </DetailRow>
              <div>
                <p className="font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase">
                  Source prompt starter
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                  {selected.sourcePromptStarter}
                </p>
              </div>
              <div>
                <p className="font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase">
                  Suggested CTA
                </p>
                <p className="mt-1 text-sm text-[#e8c547]">{selected.suggestedCta}</p>
              </div>
              <Button
                type="button"
                className="w-full"
                disabled={building}
                onClick={() => onBuild(selected)}
              >
                {building ? "Building campaign…" : "Build full campaign from template"}
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase">
        {label}
      </p>
      <p className="mt-0.5 text-sm text-zinc-200">{children}</p>
    </div>
  );
}
