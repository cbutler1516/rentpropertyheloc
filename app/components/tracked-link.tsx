"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  trackApplyCtaClick,
  trackFunnelToApplicationClick,
  trackBookingClick,
  trackCtaClick,
  trackEvent,
  trackRelatedGuideClick,
  trackReviewCtaClick,
  trackSocialOutboundClick,
  trackStickyCtaClick,
  trackThumbnailClick,
  trackVideoClick,
} from "../lib/analytics-events";

type TrackableClickType =
  | "apply_cta"
  | "cta"
  | "funnel_apply"
  | "related_guide"
  | "social"
  | "sticky_cta"
  | "thumbnail"
  | "video"
  | "review";

function trackClickByType({
  eventType = "cta",
  href,
  label,
  location,
  platform,
}: {
  eventType?: TrackableClickType;
  href: string;
  label: string;
  location?: string;
  platform?: string;
}) {
  if (eventType === "apply_cta") {
    trackApplyCtaClick({ label, href, location });
    return;
  }

  if (eventType === "funnel_apply") {
    trackFunnelToApplicationClick({ label, href, location });
    return;
  }

  if (eventType === "related_guide") {
    trackRelatedGuideClick({ label, href, location });
    return;
  }

  if (eventType === "social") {
    trackSocialOutboundClick({ platform, label, href, location });
    return;
  }

  if (eventType === "thumbnail") {
    trackThumbnailClick({ label, href, location });
    return;
  }

  if (eventType === "sticky_cta") {
    trackStickyCtaClick({ label, href, location });
    return;
  }

  if (eventType === "video") {
    trackVideoClick({ label, href, location });
    return;
  }

  if (eventType === "review") {
    trackReviewCtaClick({ label, href, location });
    return;
  }

  trackCtaClick({ label, href, location });
}

export function TrackedLink({
  href,
  children,
  className = "",
  location,
  label,
  eventType,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  location?: string;
  label?: string;
  eventType?: TrackableClickType;
  onClick?: () => void;
}) {
  const trackingLabel =
    label ?? (typeof children === "string" ? children : "Link click");

  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        trackClickByType({
          eventType,
          label: trackingLabel,
          href,
          location,
        });
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}

export function TrackedAnchor({
  href,
  children,
  className = "",
  location,
  label,
  target,
  rel,
  eventType,
  platform,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  location?: string;
  label?: string;
  target?: string;
  rel?: string;
  eventType?: TrackableClickType;
  platform?: string;
}) {
  const trackingLabel =
    label ?? (typeof children === "string" ? children : "Link click");

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={() =>
        trackClickByType({
          eventType,
          label: trackingLabel,
          href,
          location,
          platform,
        })
      }
    >
      {children}
    </a>
  );
}

export function TrackedBookingAnchor({
  href,
  children,
  className = "",
  bookingType,
  label,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  bookingType: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={() =>
        trackBookingClick({
          bookingType,
          label,
          href,
        })
      }
    >
      {children}
    </a>
  );
}

export function TrackedButton({
  children,
  className = "",
  eventName,
  payload,
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  eventName: string;
  payload?: Record<string, string | number | boolean | null | undefined>;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      type={type}
      className={className}
      onClick={() => trackEvent(eventName, payload)}
    >
      {children}
    </button>
  );
}
