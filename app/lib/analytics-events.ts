"use client";

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

export const analyticsEvents = {
  applyCtaClick: "apply_cta_click",
  applyPageView: "apply_page_view",
  bookingClick: "booking_click",
  ctaClick: "cta_click",
  formStart: "form_start",
  funnelToApplicationClick: "funnel_to_application_click",
  microConversion: "micro_conversion",
  leadSubmit: "lead_submit",
  mediaClick: "media_click",
  pageView: "page_view",
  relatedGuideClick: "related_guide_click",
  scrollDepth: "scroll_depth",
  sectionView: "section_view",
  socialOutboundClick: "social_outbound_click",
  stickyCtaClick: "sticky_cta_click",
  thumbnailClick: "thumbnail_click",
  videoClick: "video_click",
  videoEngagement: "video_engagement",
  formAbandonment: "form_abandonment",
  reviewCtaClick: "review_cta_click",
  intakeFunnelStart: "intake_funnel_start",
  intakeFunnelStep: "intake_funnel_step",
  intakeFunnelSubmit: "intake_funnel_submit",
  intakeFunnelAbandon: "intake_funnel_abandon",
} as const;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      page?: () => void;
      track?: (eventName: string, payload?: AnalyticsPayload) => void;
    };
  }
}

function cleanPayload(payload: AnalyticsPayload = {}) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  );
}

export function trackEvent(eventName: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  const eventPayload = cleanPayload({
    ...payload,
    page_location: window.location.href,
    page_path: window.location.pathname,
  });

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: eventName,
    ...eventPayload,
  });

  window.gtag?.("event", eventName, eventPayload);
  window.fbq?.("trackCustom", eventName, eventPayload);
  window.ttq?.track?.(eventName, eventPayload);
}

export function trackPageView(path: string) {
  if (typeof window === "undefined") return;

  const pageLocation = `${window.location.origin}${path}`;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: analyticsEvents.pageView,
    page_path: path,
    page_location: pageLocation,
  });

  window.gtag?.("event", analyticsEvents.pageView, {
    page_path: path,
    page_location: pageLocation,
  });

  window.fbq?.("track", "PageView");
  window.ttq?.page?.();
}

export function trackLeadSubmit(payload: {
  formType: string;
  leadIntent?: string;
  role?: string;
  page?: string;
}) {
  trackEvent(analyticsEvents.leadSubmit, {
    form_type: payload.formType,
    lead_intent: payload.leadIntent,
    role: payload.role,
    source_page: payload.page,
  });
}

export function trackLeadFormStart(payload: {
  formType: string;
  leadIntent?: string;
  page?: string;
}) {
  trackEvent(analyticsEvents.formStart, {
    form_type: payload.formType,
    lead_intent: payload.leadIntent,
    source_page: payload.page,
  });
}

export function trackMicroConversion(payload: {
  optInType: string;
  leadIntent: string;
  location?: string;
}) {
  trackEvent(analyticsEvents.microConversion, {
    opt_in_type: payload.optInType,
    lead_intent: payload.leadIntent,
    cta_location: payload.location,
  });
}

export function trackApplyPageView() {
  trackEvent(analyticsEvents.applyPageView);
}

export function trackApplyCtaClick(payload: {
  label: string;
  href: string;
  location?: string;
}) {
  trackEvent(analyticsEvents.applyCtaClick, {
    cta_label: payload.label,
    destination: payload.href,
    cta_location: payload.location,
  });
}

export function trackFunnelToApplicationClick(payload: {
  label: string;
  href: string;
  location?: string;
}) {
  trackEvent(analyticsEvents.funnelToApplicationClick, {
    cta_label: payload.label,
    destination: payload.href,
    cta_location: payload.location,
  });
}

export function trackBookingClick(payload: {
  bookingType: string;
  label: string;
  href: string;
}) {
  trackEvent(analyticsEvents.bookingClick, {
    booking_type: payload.bookingType,
    cta_label: payload.label,
    destination: payload.href,
  });
}

export function trackCtaClick(payload: {
  label: string;
  href: string;
  location?: string;
}) {
  trackEvent(analyticsEvents.ctaClick, {
    cta_label: payload.label,
    destination: payload.href,
    cta_location: payload.location,
  });
}

export function trackScrollDepth(depth: 25 | 50 | 75 | 100) {
  trackEvent(analyticsEvents.scrollDepth, {
    scroll_depth: depth,
  });
}

export function trackSectionView(sectionId: string) {
  trackEvent(analyticsEvents.sectionView, {
    section_id: sectionId,
  });
}

export function trackVideoClick(payload: {
  label: string;
  href: string;
  location?: string;
}) {
  trackEvent(analyticsEvents.videoClick, {
    media_label: payload.label,
    destination: payload.href,
    media_location: payload.location,
  });
}

export function trackThumbnailClick(payload: {
  label: string;
  href: string;
  location?: string;
}) {
  trackEvent(analyticsEvents.thumbnailClick, {
    media_label: payload.label,
    destination: payload.href,
    media_location: payload.location,
  });
}

export function trackSocialOutboundClick(payload: {
  platform?: string;
  label: string;
  href: string;
  location?: string;
}) {
  trackEvent(analyticsEvents.socialOutboundClick, {
    platform: payload.platform,
    cta_label: payload.label,
    destination: payload.href,
    cta_location: payload.location,
  });
}

export function trackRelatedGuideClick(payload: {
  label: string;
  href: string;
  location?: string;
}) {
  trackEvent(analyticsEvents.relatedGuideClick, {
    guide_label: payload.label,
    destination: payload.href,
    cta_location: payload.location,
  });
}

export function trackStickyCtaClick(payload: {
  label: string;
  href: string;
  location?: string;
}) {
  trackEvent(analyticsEvents.stickyCtaClick, {
    cta_label: payload.label,
    destination: payload.href,
    cta_location: payload.location,
  });
}

export function trackFormAbandonment(payload: {
  formType: string;
  leadIntent?: string;
  fieldsStarted?: number;
  page?: string;
}) {
  trackEvent(analyticsEvents.formAbandonment, {
    form_type: payload.formType,
    lead_intent: payload.leadIntent,
    fields_started: payload.fieldsStarted,
    source_page: payload.page,
  });
}

export function trackReviewCtaClick(payload: {
  label: string;
  href: string;
  location?: string;
}) {
  trackEvent(analyticsEvents.reviewCtaClick, {
    cta_label: payload.label,
    destination: payload.href,
    cta_location: payload.location,
  });
}

export function trackIntakeFunnelStart(payload: {
  goalId?: string;
  page?: string;
}) {
  trackEvent(analyticsEvents.intakeFunnelStart, {
    intake_goal: payload.goalId,
    source_page: payload.page,
  });
}

export function trackIntakeFunnelStep(payload: {
  stepId: string;
  stepIndex: number;
  goalId?: string;
  page?: string;
}) {
  trackEvent(analyticsEvents.intakeFunnelStep, {
    step_id: payload.stepId,
    step_index: payload.stepIndex,
    intake_goal: payload.goalId,
    source_page: payload.page,
  });
}

export function trackIntakeFunnelSubmit(payload: {
  goalId: string;
  leadIntent: string;
  formType: string;
  page?: string;
}) {
  trackEvent(analyticsEvents.intakeFunnelSubmit, {
    intake_goal: payload.goalId,
    lead_intent: payload.leadIntent,
    form_type: payload.formType,
    source_page: payload.page,
  });
}

export function trackIntakeFunnelAbandon(payload: {
  goalId?: string;
  stepId?: string;
  stepIndex?: number;
  page?: string;
}) {
  trackEvent(analyticsEvents.intakeFunnelAbandon, {
    intake_goal: payload.goalId,
    step_id: payload.stepId,
    step_index: payload.stepIndex,
    source_page: payload.page,
  });
}

export function trackVideoEngagement(payload: {
  action: "play" | "pause" | "progress" | "complete";
  label: string;
  progressPercent?: number;
  location?: string;
  videoSrc?: string;
}) {
  trackEvent(analyticsEvents.videoEngagement, {
    engagement_action: payload.action,
    media_label: payload.label,
    progress_percent: payload.progressPercent,
    media_location: payload.location,
    video_src: payload.videoSrc,
  });
}
