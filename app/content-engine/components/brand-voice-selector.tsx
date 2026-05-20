"use client";

import { Label } from "@/app/components/ui/label";
import { Select } from "@/app/components/ui/select";
import { cn } from "@/lib/utils";
import {
  BRAND_VOICE_PRESETS,
  type BrandVoiceId,
} from "../lib/brand-voices";

type BrandVoiceSelectorProps = {
  value: BrandVoiceId;
  onChange: (id: BrandVoiceId) => void;
};

export function BrandVoiceSelector({ value, onChange }: BrandVoiceSelectorProps) {
  const preset = BRAND_VOICE_PRESETS[value];

  return (
    <div className="space-y-3 rounded-xl border border-[#7c3aed]/25 bg-[#0f1a2e]/60 p-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-2">
          <Label htmlFor="brand-voice">Brand voice library</Label>
          <Select
            id="brand-voice"
            value={value}
            onChange={(event) => onChange(event.target.value as BrandVoiceId)}
            className="min-w-[240px]"
          >
            {Object.values(BRAND_VOICE_PRESETS).map((voice) => (
              <option key={voice.id} value={voice.id}>
                {voice.name}
              </option>
            ))}
          </Select>
        </div>
        <span className="font-mono text-[9px] tracking-[0.18em] text-[#c9a227] uppercase">
          Voice preset
        </span>
      </div>
      <p className="text-sm leading-relaxed text-zinc-400">{preset.description}</p>
      <details className="group text-xs text-zinc-500">
        <summary className="cursor-pointer font-mono tracking-[0.14em] text-zinc-400 uppercase hover:text-zinc-300">
          Tone rules & examples
        </summary>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1 font-mono text-[9px] tracking-[0.16em] text-zinc-600 uppercase">
              Tone rules
            </p>
            <ul className="list-inside list-disc space-y-1">
              {preset.tone_rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-1 font-mono text-[9px] tracking-[0.16em] text-zinc-600 uppercase">
              Avoid
            </p>
            <ul className="space-y-1">
              {preset.banned_phrases.map((phrase) => (
                <li key={phrase} className="text-red-300/70">
                  “{phrase}”
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2">
            <p className="mb-1 font-mono text-[9px] tracking-[0.16em] text-zinc-600 uppercase">
              Example lines
            </p>
            <ul className="space-y-2">
              {preset.content_examples.map((ex) => (
                <li
                  key={ex}
                  className={cn(
                    "rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 italic text-zinc-300",
                  )}
                >
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </details>
    </div>
  );
}
