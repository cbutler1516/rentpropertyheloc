"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, type FormEvent } from "react";

type FormState = "idle" | "submitted";

export function LeadFormSection() {
  const [status, setStatus] = useState<FormState>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitted");
  }

  return (
    <Section id="apply" muted>
      <SectionHeader
        eyebrow="Get started"
        title="Request an investor HELOC review"
        description="Share your portfolio basics. A licensed loan officer will follow up with program options."
      />
      <div className="mx-auto max-w-xl">
        <Card>
          {status === "submitted" ? (
            <div className="text-center">
              <p className="text-lg font-semibold text-navy-950">Thank you—we received your request.</p>
              <p className="mt-2 text-sm text-slate-600">
                Expect a follow-up within one business day. Connect your CRM or API route when ready for production.
              </p>
            </div>
          ) : (
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
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rentals">Number of rental properties</Label>
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
                <Label htmlFor="goal">Primary goal</Label>
                <Input
                  id="goal"
                  name="goal"
                  placeholder="Acquire, renovate, reserves, refinance..."
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Submit for review
              </Button>
              <p className="text-center text-xs leading-relaxed text-slate-500">
                By submitting, you agree to be contacted about HELOC programs. This is not a loan application.
              </p>
            </form>
          )}
        </Card>
      </div>
    </Section>
  );
}
