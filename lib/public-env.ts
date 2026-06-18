/** Client-safe public environment variables (NEXT_PUBLIC_*). */

export const STRATEGY_CALL_EMBED_URL =
  process.env.NEXT_PUBLIC_STRATEGY_CALL_EMBED_URL?.trim() ?? "";

export const DEAL_ANALYZER_SCREENSHOT_URL =
  process.env.NEXT_PUBLIC_DEAL_ANALYZER_SCREENSHOT_URL?.trim() ?? "";

export function hasStrategyCallEmbed(): boolean {
  return STRATEGY_CALL_EMBED_URL.length > 0;
}

export function hasDealAnalyzerScreenshot(): boolean {
  return DEAL_ANALYZER_SCREENSHOT_URL.length > 0;
}
