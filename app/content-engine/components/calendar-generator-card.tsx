"use client";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

type CalendarGeneratorCardProps = {
  onGenerate: () => void;
  loading: boolean;
  hasCalendar: boolean;
};

export function CalendarGeneratorCard({
  onGenerate,
  loading,
  hasCalendar,
}: CalendarGeneratorCardProps) {
  return (
    <Card className="border-sky-500/25 bg-sky-500/[0.04]">
      <CardHeader>
        <CardTitle className="text-base">7-day content calendar</CardTitle>
        <CardDescription>
          Turn this package into a weekly publishing plan—hooks, captions, CTAs,
          visuals, and landing page tie-ins for each day.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          type="button"
          variant="gold"
          size="lg"
          disabled={loading}
          onClick={onGenerate}
          className="w-full sm:w-auto"
        >
          {loading
            ? "Building calendar…"
            : hasCalendar
              ? "Rebuild 7-day calendar"
              : "Build 7-day calendar"}
        </Button>
      </CardContent>
    </Card>
  );
}
