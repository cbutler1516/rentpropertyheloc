import type { ReactNode } from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";

export function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {hint ? <p className="text-xs text-zinc-600">{hint}</p> : null}
    </div>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  hint,
  prefix,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
  prefix?: string;
  step?: number;
}) {
  return (
    <FormField label={label} hint={hint}>
      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
            {prefix}
          </span>
        ) : null}
        <Input
          type="number"
          step={step}
          className={prefix ? "pl-8" : undefined}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
        />
      </div>
    </FormField>
  );
}
