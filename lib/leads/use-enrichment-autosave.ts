"use client";

import {
  trackEnrichmentCompleted,
  trackEnrichmentFieldSaved,
} from "@/lib/analytics/conversion-events";
import type { EnrichmentFieldKey } from "@/lib/leads/enrichment-fields";
import { useCallback, useEffect, useRef, useState } from "react";

type AutosaveResponse = {
  success?: boolean;
  snapshot?: Record<string, string>;
  profileStrength?: number;
  enrichmentStatus?: string;
  enrichmentComplete?: boolean;
  qualityScore?: number;
  qualityTier?: string;
};

export function useEnrichmentAutosave(leadId: string) {
  const [savedField, setSavedField] = useState<EnrichmentFieldKey | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const debounceTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const startedRef = useRef(false);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const markSaved = useCallback((field: EnrichmentFieldKey) => {
    setSavedField(field);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setSavedField(null), 1800);
  }, []);

  const postAutosave = useCallback(
    async (body: Record<string, unknown>) => {
      setIsSaving(true);
      setLastError(null);
      try {
        const response = await fetch("/api/leads/enrich/autosave", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ leadId, ...body }),
        });
        const result = (await response.json()) as AutosaveResponse;
        if (!response.ok || !result.success) {
          setLastError("Save failed — we'll retry when you're online.");
          return null;
        }
        if (result.enrichmentComplete) {
          trackEnrichmentCompleted({ leadId });
        }
        return result;
      } catch {
        setLastError("Save failed — we'll retry when you're online.");
        return null;
      } finally {
        setIsSaving(false);
      }
    },
    [leadId],
  );

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    void postAutosave({ markStarted: true });
  }, [postAutosave]);

  useEffect(() => {
    return () => {
      debounceTimers.current.forEach((timer) => clearTimeout(timer));
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, []);

  const saveField = useCallback(
    async (field: EnrichmentFieldKey, value: string, options?: { debounceMs?: number }) => {
      const debounceMs = options?.debounceMs ?? 0;
      const run = async () => {
        const result = await postAutosave({
          [field]: value,
          updatedField: field,
        });
        if (result) {
          markSaved(field);
          trackEnrichmentFieldSaved({ leadId, field, value });
        }
        return result;
      };

      if (debounceMs > 0) {
        const existing = debounceTimers.current.get(field);
        if (existing) clearTimeout(existing);
        return new Promise<AutosaveResponse | null>((resolve) => {
          const timer = setTimeout(() => {
            debounceTimers.current.delete(field);
            void run().then(resolve);
          }, debounceMs);
          debounceTimers.current.set(field, timer);
        });
      }

      return run();
    },
    [leadId, markSaved, postAutosave],
  );

  return {
    saveField,
    savedField,
    isSaving,
    lastError,
  };
}

export type EnrichmentAutosaveField = EnrichmentFieldKey;
