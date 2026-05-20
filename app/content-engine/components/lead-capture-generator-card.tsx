"use client";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Select } from "@/app/components/ui/select";
import {
  LEAD_CAPTURE_PRESET_CONFIG,
  LEAD_CAPTURE_PRESETS,
  type LeadCapturePreset,
} from "../lib/lead-capture-presets";

type LeadCaptureGeneratorCardProps = {
  preset: LeadCapturePreset;
  onPresetChange: (preset: LeadCapturePreset) => void;
  onGenerate: () => void;
  loading: boolean;
  hasLeadCapture: boolean;
};

export function LeadCaptureGeneratorCard({
  preset,
  onPresetChange,
  onGenerate,
  loading,
  hasLeadCapture,
}: LeadCaptureGeneratorCardProps) {
  const config = LEAD_CAPTURE_PRESET_CONFIG[preset];

  return (
    <Card className="border-rose-500/25 bg-rose-500/[0.04]">
      <CardHeader>
        <CardTitle className="text-base">Lead capture + CRM follow-up</CardTitle>
        <CardDescription>
          Build an embed-ready form, compliance consent copy, and a full CRM
          sequence for GoHighLevel or RAD CRM.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <Label htmlFor="lead-capture-preset">Form preset</Label>
          <Select
            id="lead-capture-preset"
            value={preset}
            onChange={(event) =>
              onPresetChange(event.target.value as LeadCapturePreset)
            }
          >
            {LEAD_CAPTURE_PRESETS.map((id) => (
              <option key={id} value={id}>
                {LEAD_CAPTURE_PRESET_CONFIG[id].label}
              </option>
            ))}
          </Select>
          <p className="text-xs text-zinc-500">{config.description}</p>
        </div>
        <Button
          type="button"
          variant="gold"
          size="lg"
          disabled={loading}
          onClick={onGenerate}
          className="shrink-0"
        >
          {loading
            ? "Building capture…"
            : hasLeadCapture
              ? "Rebuild lead capture"
              : "Build lead capture"}
        </Button>
      </CardContent>
    </Card>
  );
}
