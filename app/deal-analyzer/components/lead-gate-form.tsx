"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import type { ClientRole, LeadCapture } from "../lib/types";
import { useDealAnalyzer } from "./deal-analyzer-provider";

const roles: ClientRole[] = [
  "Buyer",
  "Agent",
  "Investor",
  "Commercial Client",
];

const referralOptions = [
  "",
  "Agent referral",
  "Client referral",
  "Social media",
  "Google search",
  "The Loan Playbook site",
  "Other",
];

export function LeadGateForm() {
  const router = useRouter();
  const { submitLead, analysis } = useDealAnalyzer();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<LeadCapture>({
    name: "",
    email: "",
    phone: "",
    role: "Buyer",
    notes: "",
    referralSource: "",
    agentName: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = await submitLead(form);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push(`/deal-analyzer/report/${result.slug}`);
  }

  if (!analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Complete your deal details first</CardTitle>
          <CardDescription>
            Run the analyzer with your scenario before unlocking the report.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="gold"
            onClick={() => router.push("/deal-analyzer/analyze")}
          >
            Back to analyzer
          </Button>
        </CardContent>
      </Card>
    );
  }

  const showAgentName = form.role === "Agent";

  return (
    <Card className="border-[#c9a227]/20">
      <CardHeader>
        <p className="font-mono text-[10px] tracking-[0.28em] text-[#c9a227] uppercase">
          Step 2 — Unlock your report
        </p>
        <CardTitle>Almost there</CardTitle>
        <CardDescription>
          Share contact details to generate your Playbook Report and a private
          link you can send to clients.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <p
            className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            role="alert"
          >
            {error}
          </p>
        ) : null}
        <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="lead-name">Name</Label>
            <Input
              id="lead-name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-email">Email</Label>
            <Input
              id="lead-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-phone">Phone</Label>
            <Input
              id="lead-phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="lead-role">I am a</Label>
            <Select
              id="lead-role"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value as ClientRole })
              }
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Select>
          </div>
          {showAgentName ? (
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="lead-agent">Your name (agent)</Label>
              <Input
                id="lead-agent"
                placeholder="Shown on reports you share with clients"
                value={form.agentName ?? ""}
                onChange={(e) =>
                  setForm({ ...form, agentName: e.target.value })
                }
              />
            </div>
          ) : null}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="lead-referral">How did you hear about us?</Label>
            <Select
              id="lead-referral"
              value={form.referralSource ?? ""}
              onChange={(e) =>
                setForm({ ...form, referralSource: e.target.value })
              }
            >
              {referralOptions.map((opt) => (
                <option key={opt || "none"} value={opt}>
                  {opt || "Select…"}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="lead-notes">Notes (optional)</Label>
            <Textarea
              id="lead-notes"
              placeholder="Timeline, property type, or what you want to stress-test..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full sm:w-auto"
              disabled={submitting}
            >
              {submitting ? "Saving report…" : "View Playbook Report"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
