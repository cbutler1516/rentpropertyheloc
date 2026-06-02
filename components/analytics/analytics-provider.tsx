"use client";

import { AnalyticsPageView } from "@/components/analytics/analytics-page-view";
import { AnalyticsScripts } from "@/components/analytics/analytics-scripts";
import { getTrackingConfig, hasAnyAnalyticsProvider } from "@/lib/analytics/tracking-config";
import { Suspense, type ReactNode } from "react";

type AnalyticsProviderProps = {
  children: ReactNode;
};

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const config = getTrackingConfig();
  const enabled = hasAnyAnalyticsProvider(config);

  return (
    <>
      {enabled ? <AnalyticsScripts config={config} /> : null}
      {children}
      {enabled ? (
        <Suspense fallback={null}>
          <AnalyticsPageView />
        </Suspense>
      ) : null}
    </>
  );
}
