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
  LEAD_MAGNET_TYPE_CONFIG,
  LEAD_MAGNET_TYPES,
  type LeadMagnetType,
} from "../lib/lead-magnet-types";

type LeadMagnetGeneratorCardProps = {
  type: LeadMagnetType;
  onTypeChange: (type: LeadMagnetType) => void;
  onGenerate: () => void;
  loading: boolean;
  hasLeadMagnet: boolean;
};

export function LeadMagnetGeneratorCard({
  type,
  onTypeChange,
  onGenerate,
  loading,
  hasLeadMagnet,
}: LeadMagnetGeneratorCardProps) {
  const config = LEAD_MAGNET_TYPE_CONFIG[type];

  return (
    <Card className="border-[#c9a227]/30 bg-[#c9a227]/[0.05]">
      <CardHeader>
        <CardTitle className="text-base">Lead magnet / PDF report</CardTitle>
        <CardDescription>
          Turn your package, landing page, and calendar into a polished
          downloadable guide—ready for PDF export or email gate.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <Label htmlFor="lead-magnet-type">Report type</Label>
          <Select
            id="lead-magnet-type"
            value={type}
            onChange={(event) =>
              onTypeChange(event.target.value as LeadMagnetType)
            }
          >
            {LEAD_MAGNET_TYPES.map((id) => (
              <option key={id} value={id}>
                {LEAD_MAGNET_TYPE_CONFIG[id].label}
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
            ? "Building report…"
            : hasLeadMagnet
              ? "Regenerate lead magnet"
              : "Create lead magnet"}
        </Button>
      </CardContent>
    </Card>
  );
}
