"use client";

import { FunnelOptionCard } from "@/components/funnel/funnel-option-card";
import { trackPropertyOccupancySelected } from "@/lib/analytics/conversion-events";
import { AUTO_ADVANCE_DELAY_MS } from "@/lib/leads/funnel-config";
import {
  PROPERTY_OCCUPANCY_OPTIONS,
  type PropertyOccupancyId,
} from "@/lib/leads/property-occupancy";
import type { LeadFunnelData } from "@/lib/leads/types";
import { useEffect, useRef, useState } from "react";

type FunnelPropertyOccupancyStepProps = {
  data: LeadFunnelData;
  onChange: (partial: Partial<LeadFunnelData>) => void;
  onContinue: () => void;
  funnelStep?: number;
};

export function FunnelPropertyOccupancyStep({
  data,
  onChange,
  onContinue,
  funnelStep = 2,
}: FunnelPropertyOccupancyStepProps) {
  const [pendingSelection, setPendingSelection] = useState<string | null>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  function handleSelect(occupancyId: PropertyOccupancyId) {
    onChange({ propertyOccupancy: occupancyId });
    trackPropertyOccupancySelected({
      propertyOccupancy: occupancyId,
      step: funnelStep,
      stepId: "property-use",
    });
    setPendingSelection(occupancyId);
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    advanceTimerRef.current = setTimeout(() => {
      setPendingSelection(null);
      onContinue();
    }, AUTO_ADVANCE_DELAY_MS);
  }

  return (
    <div className="grid gap-2.5 sm:grid-cols-1">
      {PROPERTY_OCCUPANCY_OPTIONS.map((option) => (
        <FunnelOptionCard
          key={option.id}
          label={option.label}
          badge={option.description}
          selected={data.propertyOccupancy === option.id}
          pending={pendingSelection === option.id}
          onSelect={() => handleSelect(option.id)}
        />
      ))}
    </div>
  );
}
