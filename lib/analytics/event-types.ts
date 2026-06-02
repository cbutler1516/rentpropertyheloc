export type ConversionEventName =
  | "page_view"
  | "calculator_viewed"
  | "calculator_interacted"
  | "funnel_started"
  | "funnel_step_completed"
  | "contact_step_viewed"
  | "lead_submitted"
  | "address_completed"
  | "enrichment_completed"
  | "fast_track_lead"
  | "review_lead"
  | "nurture_lead"
  | "seo_page_viewed"
  | "cta_clicked"
  | "analytics_test"
  | "segmented_journey_selected"
  | "dashboard_handoff"
  | "video_played"
  | "address_step_viewed"
  | "address_autocomplete_used"
  | "address_skipped"
  | "partial_lead_started"
  | "partial_lead_updated"
  | "partial_lead_abandoned"
  /** @deprecated Use funnel_started — kept for type compatibility only */
  | "lead_form_started"
  /** @deprecated Use funnel_step_completed */
  | "lead_step_completed"
  /** @deprecated Use calculator_interacted */
  | "calculator_used"
  /** @deprecated Use lead_submitted */
  | "lead_form_submitted"
  /** @deprecated Use address_completed */
  | "address_submitted";

export type ConversionEventPayload = {
  pagePath?: string;
  page_path?: string;
  propertyType?: string;
  property_type?: string;
  equityStrategy?: string;
  equity_strategy?: string;
  routingTier?: string;
  routing_tier?: string;
  estimatedFundsRange?: string;
  estimated_funds_range?: string;
  audience_segment?: string;
  audience_label?: string;
  ctaLocation?: string;
  cta_location?: string;
  href?: string;
  source?: string;
  journey?: string;
  funnelVersion?: string;
  step?: number;
  stepId?: string;
  leadId?: string;
  sessionId?: string;
  test?: boolean;
  [key: string]: string | number | boolean | undefined;
};

export type RoutingTierEvent = "fast_track" | "review" | "nurture" | "standard";
