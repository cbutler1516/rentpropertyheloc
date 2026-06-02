export type LastTestAnalyticsResult = {
  success: boolean;
  ranAt: string;
  eventName: string;
  ga4Attempted: boolean;
  metaAttempted: boolean;
  pagePath?: string;
  error?: string;
};

let lastTestAnalytics: LastTestAnalyticsResult | null = null;

export function getLastTestAnalyticsResult(): LastTestAnalyticsResult | null {
  return lastTestAnalytics;
}

export function setLastTestAnalyticsResult(result: LastTestAnalyticsResult): void {
  lastTestAnalytics = result;
}
