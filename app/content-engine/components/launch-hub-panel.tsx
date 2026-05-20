"use client";

import { Button } from "@/app/components/ui/button";
import { CardDescription, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { cn } from "@/lib/utils";
import { downloadTextFile } from "../lib/export";
import { LAUNCH_CHECKLIST_ITEMS } from "../lib/launch-hub-checklist";
import {
  launchHubToBrief,
  launchHubToChecklistText,
} from "../lib/launch-hub-export";
import type {
  LaunchChecklistKey,
  LaunchHubEditableFields,
  LaunchHubRecord,
} from "../lib/types";
import { CopyButton } from "./copy-button";

const SUMMARY_ROWS: {
  key: keyof LaunchHubRecord["summary"];
  label: string;
}[] = [
  { key: "campaignTopic", label: "Campaign topic" },
  { key: "brandVoice", label: "Brand voice" },
  { key: "audience", label: "Audience" },
  { key: "primaryOffer", label: "Primary offer" },
  { key: "landingPageIntent", label: "Landing page intent" },
  { key: "leadMagnetType", label: "Lead magnet type" },
  { key: "recommendedCta", label: "Recommended CTA" },
  { key: "bestPlatforms", label: "Best platforms" },
  { key: "weeklyPublishingPlan", label: "Weekly publishing plan" },
  { key: "followUpSequenceIdea", label: "Follow-up sequence" },
];

type LaunchHubPanelProps = {
  launchHub: LaunchHubRecord;
  packageTitle: string;
  syncing: boolean;
  onLaunchHubChange: (hub: LaunchHubRecord) => void;
  onRefresh: () => void;
};

export function LaunchHubPanel({
  launchHub,
  packageTitle,
  syncing,
  onLaunchHubChange,
  onRefresh,
}: LaunchHubPanelProps) {
  const slug = packageTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 40);

  const updateField = (key: keyof LaunchHubEditableFields, value: string) => {
    onLaunchHubChange({
      ...launchHub,
      fields: { ...launchHub.fields, [key]: value },
      updatedAt: new Date().toISOString(),
    });
  };

  const toggleChecklist = (key: LaunchChecklistKey) => {
    onLaunchHubChange({
      ...launchHub,
      checklist: {
        ...launchHub.checklist,
        [key]: !launchHub.checklist[key],
      },
      updatedAt: new Date().toISOString(),
    });
  };

  const completedCount = LAUNCH_CHECKLIST_ITEMS.filter(
    (item) => launchHub.checklist[item.key],
  ).length;

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-auto">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <CardTitle>Launch hub</CardTitle>
          <CardDescription>
            Full-funnel launch brief — {completedCount}/
            {LAUNCH_CHECKLIST_ITEMS.length} checklist items
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={syncing}
            onClick={onRefresh}
          >
            {syncing ? "Syncing…" : "Refresh brief"}
          </Button>
          <CopyButton text={launchHubToBrief(launchHub)} label="Copy launch brief" />
          <CopyButton
            text={launchHub.crmFollowUpPlan}
            label="Copy CRM plan"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() =>
              downloadTextFile(
                `${slug}-launch-checklist.txt`,
                launchHubToChecklistText(launchHub),
              )
            }
          >
            Download checklist
          </Button>
        </div>
      </div>

      <section className="rounded-xl border border-[#7c3aed]/25 bg-[#7c3aed]/[0.04] p-4">
        <p className="mb-4 font-mono text-[9px] tracking-[0.18em] text-[#c4b5fd] uppercase">
          Funnel summary
        </p>
        <dl className="grid gap-4 sm:grid-cols-2">
          {SUMMARY_ROWS.map((row) => (
            <div key={row.key}>
              <dt className="font-mono text-[8px] tracking-[0.12em] text-zinc-500 uppercase">
                {row.label}
              </dt>
              <dd className="mt-1 whitespace-pre-wrap text-sm text-zinc-300">
                {launchHub.summary[row.key]}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="mb-4 font-mono text-[9px] tracking-[0.18em] text-[#c9a227] uppercase">
            Launch checklist
          </p>
          <ul className="space-y-3">
            {LAUNCH_CHECKLIST_ITEMS.map((item) => {
              const checked = launchHub.checklist[item.key];
              return (
                <li key={item.key}>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleChecklist(item.key)}
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-black/40 accent-[#c9a227]"
                    />
                    <span>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          checked ? "text-[#e8c547]" : "text-zinc-300",
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-zinc-500">
                        {item.description}
                      </span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="mb-4 font-mono text-[9px] tracking-[0.18em] text-[#c9a227] uppercase">
            Editable launch fields
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="launch-campaign-name">Campaign name</Label>
              <Input
                id="launch-campaign-name"
                value={launchHub.fields.campaignName}
                onChange={(e) => updateField("campaignName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="launch-campaign-goal">Campaign goal</Label>
              <Textarea
                id="launch-campaign-goal"
                value={launchHub.fields.campaignGoal}
                onChange={(e) => updateField("campaignGoal", e.target.value)}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="launch-primary-cta">Primary CTA</Label>
              <Input
                id="launch-primary-cta"
                value={launchHub.fields.primaryCta}
                onChange={(e) => updateField("primaryCta", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="launch-landing-url">Landing page URL</Label>
              <Input
                id="launch-landing-url"
                value={launchHub.fields.landingPageUrl}
                onChange={(e) => updateField("landingPageUrl", e.target.value)}
                placeholder="https://"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="launch-utm">UTM campaign name</Label>
                <Input
                  id="launch-utm"
                  value={launchHub.fields.utmCampaignName}
                  onChange={(e) => updateField("utmCampaignName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="launch-crm-tag">CRM tag</Label>
                <Input
                  id="launch-crm-tag"
                  value={launchHub.fields.crmTag}
                  onChange={(e) => updateField("crmTag", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="launch-notes">Notes</Label>
              <Textarea
                id="launch-notes"
                value={launchHub.fields.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                rows={3}
                placeholder="Launch notes, partner promos, compliance reminders…"
              />
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
        <p className="mb-3 font-mono text-[9px] tracking-[0.18em] text-zinc-500 uppercase">
          CRM follow-up plan
        </p>
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-zinc-400">
          {launchHub.crmFollowUpPlan}
        </pre>
      </section>
    </div>
  );
}
