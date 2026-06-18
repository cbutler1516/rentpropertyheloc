"use client";

import { DEAL_ANALYZER_CONSENT_TEXT } from "@/lib/deal-analyzer/constants";
import { ROLE_OPTIONS } from "@/lib/deal-analyzer/constants";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";

export type LeadFormState = {
  name: string;
  email: string;
  phone: string;
  role: string;
  notes: string;
  smsCallConsent: boolean;
};

type LeadGateFormProps = {
  values: LeadFormState;
  onChange: (patch: Partial<LeadFormState>) => void;
  error?: string;
  submitting?: boolean;
  onSubmit: () => void;
};

export function LeadGateForm({
  values,
  onChange,
  error,
  submitting,
  onSubmit,
}: LeadGateFormProps) {
  return (
    <form
      className="max-w-xl space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-700">Full name</span>
        <Input value={values.name} onChange={(e) => onChange({ name: e.target.value })} required />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-700">Email</span>
        <Input
          type="email"
          value={values.email}
          onChange={(e) => onChange({ email: e.target.value })}
          required
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-700">Phone</span>
        <Input
          type="tel"
          value={values.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-700">Role</span>
        <select
          className={cn(
            "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30",
          )}
          value={values.role}
          onChange={(e) => onChange({ role: e.target.value })}
        >
          <option value="">Select…</option>
          {ROLE_OPTIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-700">Notes (optional)</span>
        <Input value={values.notes} onChange={(e) => onChange({ notes: e.target.value })} />
      </label>

      <label className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
          checked={values.smsCallConsent}
          onChange={(e) => onChange({ smsCallConsent: e.target.checked })}
          required
        />
        <span className="text-xs leading-relaxed text-slate-600">{DEAL_ANALYZER_CONSENT_TEXT}</span>
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-teal-700 px-6 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Generating…" : "Generate my Playbook Report"}
      </button>
    </form>
  );
}
