"use client";

import { Input } from "@/components/ui/input";
import { DEAL_INPUT_FIELDS } from "@/lib/deal-analyzer/field-config";
import type { DealType } from "@/lib/deal-analyzer/types";

type DealInputFormProps = {
  dealType: DealType;
  values: Record<string, number | string | boolean>;
  onChange: (key: string, value: number | string) => void;
};

export function DealInputForm({ dealType, values, onChange }: DealInputFormProps) {
  const fields = DEAL_INPUT_FIELDS[dealType];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((field) => (
        <label key={field.key} className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">{field.label}</span>
          <Input
            type={field.type}
            step={field.step}
            value={String(values[field.key] ?? "")}
            onChange={(e) => {
              const v = field.type === "number" ? parseFloat(e.target.value) || 0 : e.target.value;
              onChange(field.key, v);
            }}
            placeholder={field.placeholder}
          />
        </label>
      ))}
    </div>
  );
}
