"use client";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Select } from "@/app/components/ui/select";
import {
  LANDING_PAGE_INTENT_CONFIG,
  LANDING_PAGE_INTENTS,
  type LandingPageIntent,
} from "../lib/landing-page-intents";

type LandingPageGeneratorCardProps = {
  intent: LandingPageIntent;
  onIntentChange: (intent: LandingPageIntent) => void;
  onGenerate: () => void;
  loading: boolean;
  hasLandingPage: boolean;
};

export function LandingPageGeneratorCard({
  intent,
  onIntentChange,
  onGenerate,
  loading,
  hasLandingPage,
}: LandingPageGeneratorCardProps) {
  const config = LANDING_PAGE_INTENT_CONFIG[intent];

  return (
    <Card className="border-emerald-500/25 bg-emerald-500/[0.04]">
      <CardHeader>
        <CardTitle className="text-base">Landing page generator</CardTitle>
        <CardDescription>
          Turn this package into lead-capture copy—hero, benefits, form fields,
          thank-you page, and follow-up email.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <Label htmlFor="landing-intent">Landing page intent</Label>
          <Select
            id="landing-intent"
            value={intent}
            onChange={(event) =>
              onIntentChange(event.target.value as LandingPageIntent)
            }
          >
            {LANDING_PAGE_INTENTS.map((id) => (
              <option key={id} value={id}>
                {LANDING_PAGE_INTENT_CONFIG[id].label}
              </option>
            ))}
          </Select>
          <p className="text-xs text-zinc-500">{config.description}</p>
        </div>
        <Button
          type="button"
          variant="gold"
          size="lg"
          disabled={loading}
          onClick={onGenerate}
          className="shrink-0"
        >
          {loading
            ? "Building page…"
            : hasLandingPage
              ? "Regenerate landing page"
              : "Turn into landing page"}
        </Button>
      </CardContent>
    </Card>
  );
}
