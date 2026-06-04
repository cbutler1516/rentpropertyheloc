"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PRIMARY_CTA_LABEL } from "@/lib/cta";
import { useState, type FormEvent } from "react";

type FormState = "idle" | "submitted";

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<FormState>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <Card className={compact ? "p-6" : undefined}>
        <div className="text-center">
          <p className="text-lg font-semibold text-navy-950">Request received</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            A financing specialist will follow up with program options that may be available,
            subject to approval.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={compact ? "p-6" : undefined}>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" name="firstName" required autoComplete="given-name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" name="lastName" required autoComplete="family-name" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rentals">Rental properties owned</Label>
          <Input
            id="rentals"
            name="rentals"
            type="number"
            min={1}
            placeholder="e.g. 3"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="goal">Primary objective</Label>
          <Input
            id="goal"
            name="goal"
            placeholder="Acquire, renovate, reserves, debt reposition..."
            required
          />
        </div>
        <Button type="submit" size="lg" className="w-full">
          {PRIMARY_CTA_LABEL}
        </Button>
        <p className="text-center text-xs leading-relaxed text-slate-500">
          By submitting, you agree to be contacted about HELOC options. Not a loan application.
          Programs subject to approval.
        </p>
      </form>
    </Card>
  );
}
