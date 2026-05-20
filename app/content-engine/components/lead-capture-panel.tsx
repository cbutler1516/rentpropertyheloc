"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { CardDescription, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { cn } from "@/lib/utils";
import { downloadTextFile } from "../lib/export";
import { LEAD_CAPTURE_FIELD_META } from "../lib/lead-capture-fields";
import { getLeadCapturePreset } from "../lib/lead-capture-presets";
import {
  leadCaptureToCrmFieldMap,
  leadCaptureToCrmSequence,
  leadCaptureToEmbedFormCopy,
  leadCaptureToFollowUpPlan,
} from "../lib/lead-capture-export";
import { CRM_SEQUENCE_LABELS } from "../lib/lead-capture-labels";
import {
  CRM_SEQUENCE_KEYS,
  LEAD_CAPTURE_FIELD_KEYS,
  type CrmSequenceKey,
  type LeadCaptureFieldKey,
  type LeadCaptureRecord,
} from "../lib/types";
import { CopyButton } from "./copy-button";

type LeadCapturePanelProps = {
  leadCapture: LeadCaptureRecord;
  packageTitle: string;
  onLeadCaptureChange: (record: LeadCaptureRecord) => void;
};

type PanelSection = "form" | "sequence" | "consent";

export function LeadCapturePanel({
  leadCapture,
  packageTitle,
  onLeadCaptureChange,
}: LeadCapturePanelProps) {
  const [section, setSection] = useState<PanelSection>("form");
  const preset = getLeadCapturePreset(leadCapture.preset);
  const slug = packageTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 40);

  const updateField = (
    key: LeadCaptureFieldKey,
    patch: Partial<(typeof leadCapture.fields)[LeadCaptureFieldKey]>,
  ) => {
    onLeadCaptureChange({
      ...leadCapture,
      fields: {
        ...leadCapture.fields,
        [key]: { ...leadCapture.fields[key], ...patch },
      },
    });
  };

  const updateSequence = (key: CrmSequenceKey, value: string) => {
    onLeadCaptureChange({
      ...leadCapture,
      crmSequence: { ...leadCapture.crmSequence, [key]: value },
    });
  };

  const updateConsent = (
    key: keyof LeadCaptureRecord["consent"],
    value: string,
  ) => {
    onLeadCaptureChange({
      ...leadCapture,
      consent: { ...leadCapture.consent, [key]: value },
    });
  };

  const sections: { id: PanelSection; label: string }[] = [
    { id: "form", label: "Form builder" },
    { id: "sequence", label: "CRM sequence" },
    { id: "consent", label: "Consent" },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <CardTitle>Lead capture</CardTitle>
          <CardDescription>
            {preset.label} — form, follow-up sequence, and CRM field map
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton
            text={leadCaptureToEmbedFormCopy(leadCapture)}
            label="Copy form copy"
          />
          <CopyButton
            text={leadCaptureToCrmSequence(leadCapture)}
            label="Copy CRM sequence"
          />
          <CopyButton
            text={leadCaptureToCrmFieldMap(leadCapture)}
            label="Copy CRM map"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() =>
              downloadTextFile(
                `${slug}-follow-up-plan.txt`,
                leadCaptureToFollowUpPlan(leadCapture),
              )
            }
          >
            Download plan
          </Button>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto rounded-lg border border-white/[0.06] bg-black/20 p-1">
        {sections.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSection(tab.id)}
            className={cn(
              "shrink-0 rounded-md px-3 py-2 font-mono text-[9px] tracking-[0.14em] uppercase transition-all",
              section === tab.id
                ? "bg-rose-500/25 text-rose-200"
                : "text-zinc-500 hover:text-zinc-300",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-rose-500/20 bg-rose-500/[0.03] p-4">
        {section === "form" && (
          <div className="space-y-4">
            {LEAD_CAPTURE_FIELD_KEYS.map((key) => {
              const config = leadCapture.fields[key];
              const meta = LEAD_CAPTURE_FIELD_META[key];
              const isConsent =
                key === "smsCallConsent" || key === "emailOptIn";
              return (
                <div
                  key={key}
                  className="rounded-lg border border-white/[0.06] bg-black/20 p-3"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <label className="flex items-center gap-2 text-sm text-zinc-300">
                      <input
                        type="checkbox"
                        checked={config.enabled}
                        onChange={(e) =>
                          updateField(key, { enabled: e.target.checked })
                        }
                        className="h-4 w-4 rounded accent-rose-500"
                      />
                      {meta.defaultLabel}
                    </label>
                    {!isConsent && (
                      <label className="flex items-center gap-2 text-xs text-zinc-500">
                        <input
                          type="checkbox"
                          checked={config.required}
                          disabled={!config.enabled}
                          onChange={(e) =>
                            updateField(key, { required: e.target.checked })
                          }
                          className="h-3 w-3 rounded accent-rose-500"
                        />
                        Required
                      </label>
                    )}
                  </div>
                  {config.enabled && !isConsent && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Label</Label>
                        <Input
                          value={config.label}
                          onChange={(e) =>
                            updateField(key, { label: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Placeholder</Label>
                        <Input
                          value={config.placeholder}
                          onChange={(e) =>
                            updateField(key, { placeholder: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {section === "sequence" && (
          <div className="space-y-4">
            {CRM_SEQUENCE_KEYS.map((key) => (
              <div key={key} className="space-y-2">
                <Label className="font-mono text-[9px] tracking-[0.12em] text-rose-300/90 uppercase">
                  {CRM_SEQUENCE_LABELS[key]}
                </Label>
                <Textarea
                  value={leadCapture.crmSequence[key]}
                  onChange={(e) => updateSequence(key, e.target.value)}
                  rows={key === "internalTaskList" ? 5 : 4}
                  className="font-sans text-sm"
                />
              </div>
            ))}
          </div>
        )}

        {section === "consent" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sms-consent">SMS / call consent copy</Label>
              <Textarea
                id="sms-consent"
                value={leadCapture.consent.smsCallConsentCopy}
                onChange={(e) =>
                  updateConsent("smsCallConsentCopy", e.target.value)
                }
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-opt-in">Email opt-in copy</Label>
              <Textarea
                id="email-opt-in"
                value={leadCapture.consent.emailOptInCopy}
                onChange={(e) =>
                  updateConsent("emailOptInCopy", e.target.value)
                }
                rows={3}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
