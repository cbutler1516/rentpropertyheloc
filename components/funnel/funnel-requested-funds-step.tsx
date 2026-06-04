"use client";

import { FunnelOptionCard } from "@/components/funnel/funnel-option-card";
import { AUTO_ADVANCE_DELAY_MS } from "@/lib/leads/funnel-config";
import { FUNNEL_EQUITY_ACCESS_RANGES } from "@/lib/leads/funnel-ranges";
import { cn } from "@/lib/cn";
import type { LeadFunnelData } from "@/lib/leads/types";
import { useEffect, useRef, useState } from "react";

type FunnelRequestedFundsStepProps = {
  data: LeadFunnelData;
  onChange: (partial: Partial<LeadFunnelData>) => void;
  onContinue: () => void;
};

export function FunnelRequestedFundsStep({
  data,
  onChange,
  onContinue,
}: FunnelRequestedFundsStepProps) {
  const [pendingSelection, setPendingSelection] = useState<string | null>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  function handleSelect(rangeId: (typeof FUNNEL_EQUITY_ACCESS_RANGES)[number]["id"]) {
    onChange({ equityAccessRange: rangeId });
    setPendingSelection(rangeId);
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    advanceTimerRef.current = setTimeout(() => {
      setPendingSelection(null);
      onContinue();
    }, AUTO_ADVANCE_DELAY_MS);
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3">
        {FUNNEL_EQUITY_ACCESS_RANGES.map((option, index) => (
          <FunnelOptionCard
            key={option.id}
            label={option.label}
            selected={data.equityAccessRange === option.id}
            pending={pendingSelection === option.id}
            onSelect={() => handleSelect(option.id)}
            className={cn(
              "lg:col-span-2",
              index === 3 && "lg:col-start-2",
            )}
          />
        ))}
      </div>
    </div>
  );
}
