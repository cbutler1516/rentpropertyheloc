"use client";

import { FunnelOptionCard } from "@/components/funnel/funnel-option-card";
import { AUTO_ADVANCE_DELAY_MS } from "@/lib/leads/funnel-config";
import { CREDIT_SCORE_RANGES, type CreditScoreRangeId } from "@/lib/leads/funnel-ranges";
import type { LeadFunnelData } from "@/lib/leads/types";
import { useEffect, useRef, useState } from "react";

type FunnelCreditScoreStepProps = {
  data: LeadFunnelData;
  onChange: (partial: Partial<LeadFunnelData>) => void;
  onContinue: () => void;
};

export function FunnelCreditScoreStep({
  data,
  onChange,
  onContinue,
}: FunnelCreditScoreStepProps) {
  const [pendingSelection, setPendingSelection] = useState<string | null>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  function handleSelect(rangeId: CreditScoreRangeId) {
    onChange({ creditScoreRange: rangeId });
    setPendingSelection(rangeId);
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    advanceTimerRef.current = setTimeout(() => {
      setPendingSelection(null);
      onContinue();
    }, AUTO_ADVANCE_DELAY_MS);
  }

  return (
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3">
      {CREDIT_SCORE_RANGES.map((option) => (
        <FunnelOptionCard
          key={option.id}
          label={option.label}
          selected={data.creditScoreRange === option.id}
          pending={pendingSelection === option.id}
          onSelect={() => handleSelect(option.id)}
        />
      ))}
    </div>
  );
}
