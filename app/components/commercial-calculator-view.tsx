"use client";

import { useEffect } from "react";
import { trackEvent } from "../lib/analytics-events";

export function CommercialCalculatorView() {
  useEffect(() => {
    trackEvent("commercial_calculator_view");
  }, []);

  return null;
}
