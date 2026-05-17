"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  trackBookingClick,
  trackCtaClick,
  trackEvent,
} from "../lib/analytics-events";

export function TrackedLink({
  href,
  children,
  className = "",
  location,
  label,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  location?: string;
  label?: string;
}) {
  const trackingLabel =
    label ?? (typeof children === "string" ? children : "Link click");

  return (
    <Link
      href={href}
      className={className}
      onClick={() =>
        trackCtaClick({
          label: trackingLabel,
          href,
          location,
        })
      }
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
}: {
  href: string;
  children: ReactNode;
  className?: string;
  location?: string;
  label?: string;
  target?: string;
  rel?: string;
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
        trackCtaClick({
          label: trackingLabel,
          href,
          location,
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
