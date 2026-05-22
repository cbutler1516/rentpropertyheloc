import type { MarketMood, MarketTrend } from "@/app/lib/market-center/types";
import { MARKET_MOOD_LABELS } from "@/app/lib/market-center/types";

export function DirectionArrow({ direction }: { direction: MarketTrend }) {
  const symbol =
    direction === "up" ? "↑" : direction === "down" ? "↓" : direction === "flat" ? "→" : "◆";
  const className =
    direction === "up"
      ? "brief-dir-up"
      : direction === "down"
        ? "brief-dir-down"
        : direction === "flat"
          ? "brief-dir-flat"
          : "brief-dir-neutral";

  return (
    <span className={`brief-direction ${className}`} aria-hidden>
      {symbol}
    </span>
  );
}

export function MoodBadge({ mood }: { mood: MarketMood }) {
  return (
    <span className={`brief-mood-badge brief-mood-${mood}`}>
      {MARKET_MOOD_LABELS[mood]}
    </span>
  );
}

export function CollapsibleDetail({
  label,
  children,
}: {
  label: string;
  children: string;
}) {
  if (!children?.trim()) return null;

  return (
    <details className="brief-details mt-4">
      <summary className="brief-details-summary">{label}</summary>
      <p className="brief-details-body">{children}</p>
    </details>
  );
}
