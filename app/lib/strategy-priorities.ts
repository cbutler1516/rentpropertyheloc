export const strategyPriorityOptions = [
  "Lower monthly payment",
  "Preserve cash reserves",
  "Buy before selling",
  "Use equity strategically",
  "Scale investment portfolio",
  "Faster closing",
  "Jumbo financing",
  "Investment property",
  "Builder/developer project",
  "Reduce out-of-pocket costs",
  "Keep low first mortgage",
  "Explore DSCR options",
  "Not sure yet",
] as const;

export type StrategyPriority = (typeof strategyPriorityOptions)[number];
