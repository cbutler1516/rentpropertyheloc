"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackPageView } from "../lib/analytics-events";

export function AnalyticsPageView() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(`${pathname}${window.location.search}`);
  }, [pathname]);

  return null;
}
