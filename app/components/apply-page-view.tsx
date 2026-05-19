"use client";

import { useEffect } from "react";
import { trackApplyPageView } from "../lib/analytics-events";

export function ApplyPageView() {
  useEffect(() => {
    trackApplyPageView();
  }, []);

  return null;
}
