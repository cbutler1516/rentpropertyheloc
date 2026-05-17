"use client";

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

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
    event: "page_view",
    page_path: path,
    page_location: pageLocation,
  });

  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: pageLocation,
  });

  window.fbq?.("track", "PageView");
  window.ttq?.page?.();
}

export function trackLeadSubmit(payload: {
  formType: string;
  role?: string;
  page?: string;
}) {
  trackEvent("lead_submit", {
    form_type: payload.formType,
    role: payload.role,
    source_page: payload.page,
  });
}

export function trackBookingClick(payload: {
  bookingType: string;
  label: string;
  href: string;
}) {
  trackEvent("booking_click", {
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
  trackEvent("cta_click", {
    cta_label: payload.label,
    destination: payload.href,
    cta_location: payload.location,
  });
}
