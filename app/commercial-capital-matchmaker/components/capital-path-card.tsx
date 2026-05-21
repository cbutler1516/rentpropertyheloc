import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { CAPITAL_PATH_META } from "../lib/form-options";
import type { CapitalPathId, CapitalPathRecommendation } from "../lib/types";

const confidenceStyles = {
  high: "text-[#c9a227]",
  medium: "text-[#7c3aed]",
  exploratory: "text-zinc-400",
} as const;

type CapitalPathCardProps = {
  pathId: CapitalPathId;
  variant?: "primary" | "alternate";
  recommendation?: CapitalPathRecommendation;
};

export function CapitalPathCard({
  pathId,
  variant = "alternate",
  recommendation,
}: CapitalPathCardProps) {
  const meta = CAPITAL_PATH_META[pathId];
  const isPrimary = variant === "primary";

  return (
    <Card
      className={
        isPrimary
          ? "border-[#c9a227]/30 bg-gradient-to-b from-zinc-900/90 to-[#0a0a0a]"
          : undefined
      }
    >
      <CardHeader>
        <p className="font-mono text-[9px] tracking-[0.24em] text-zinc-500 uppercase">
          {isPrimary ? "Primary path" : "Alternate path"}
        </p>
        <CardTitle className="text-xl">{meta.label}</CardTitle>
        <CardDescription>{meta.tagline}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-zinc-400">
        <p>{meta.typicalUse}</p>
        {isPrimary && recommendation ? (
          <>
            <p className={confidenceStyles[recommendation.confidence]}>
              Confidence: {recommendation.confidence}
            </p>
            <ul className="list-disc space-y-1 pl-5 text-zinc-500">
              {recommendation.rationale.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
