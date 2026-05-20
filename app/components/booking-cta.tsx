"use client";

import Link from "next/link";
import {
  bookingTypeLabels,
  getBookingUrl,
  isBookingUrlConfigured,
  type BookingType,
} from "../lib/booking-urls";
import { trackBookingCtaClick } from "../lib/analytics-events";
import { cn } from "@/lib/utils";

type BookingCtaProps = {
  type: BookingType;
  location: string;
  label?: string;
  className?: string;
  variant?: "primary" | "ghost" | "inline";
};

export function BookingCta({
  type,
  location,
  label,
  className,
  variant = "ghost",
}: BookingCtaProps) {
  const href = getBookingUrl(type);
  const copy = bookingTypeLabels[type];
  const buttonLabel = label ?? copy.label;

  const variantClass =
    variant === "primary"
      ? "inline-flex h-12 items-center justify-center rounded-full bg-white px-6 font-mono text-[10px] tracking-[0.16em] text-black uppercase transition-colors hover:bg-zinc-100"
      : variant === "inline"
        ? "font-mono text-[10px] tracking-[0.14em] text-[#c4b5fd] uppercase underline-offset-4 transition-colors hover:text-white hover:underline"
        : "inline-flex h-11 items-center justify-center rounded-full border border-zinc-800 px-5 font-mono text-[10px] tracking-[0.14em] text-zinc-300 uppercase transition-colors hover:border-[#7c3aed]/50 hover:text-white";

  return (
    <Link
      href={href}
      className={cn(variantClass, className)}
      onClick={() =>
        trackBookingCtaClick({
          bookingType: type,
          label: buttonLabel,
          href,
          location,
        })
      }
    >
      {buttonLabel}
    </Link>
  );
}

type BookingCtaSectionProps = {
  location: string;
  types: BookingType[];
  title?: string;
  lead?: string;
  className?: string;
};

/** Secondary advisory booking options for audience pages. */
export function BookingCtaSection({
  location,
  types,
  title = "Prefer a live conversation?",
  lead = "Optional strategy sessions—structured, not a sales pitch.",
  className,
}: BookingCtaSectionProps) {
  const available = types.filter((type) => isBookingUrlConfigured(type));
  if (available.length === 0) return null;

  return (
    <section
      className={cn(
        "section-flow relative border-t border-zinc-900/40",
        className,
      )}
      data-analytics-section={`booking_cta_${location}`}
    >
      <div className="relative mx-auto w-full max-w-7xl px-6 py-14 md:px-10 md:py-16">
        <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
          Advisory sessions
        </p>
        <h2 className="mt-4 max-w-xl text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          {title}
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-400 md:text-base">
          {lead}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {available.map((type) => (
            <BookingCta key={type} type={type} location={location} />
          ))}
        </div>
      </div>
    </section>
  );
}

type BookingCtaGroupProps = {
  location: string;
  title?: string;
  lead?: string;
};

/** Intake success: only configured booking URLs; otherwise follow-up copy. */
export function BookingCtaGroup({
  location,
  title = "Want to talk sooner?",
  lead = "Optional sessions if you would like to walk through timing, structure, or next steps live.",
}: BookingCtaGroupProps) {
  const available = (Object.keys(bookingTypeLabels) as BookingType[]).filter(
    (type) => isBookingUrlConfigured(type),
  );

  if (available.length === 0) {
    return (
      <div className="mt-10 border-t border-zinc-900/80 pt-8">
        <p className="font-mono text-[10px] tracking-[0.22em] text-zinc-500 uppercase">
          Next steps
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          We&apos;ll follow up with next steps.
        </p>
      </div>
    );
  }

  return (
    <div
      className="mt-10 border-t border-zinc-900/80 pt-8"
      data-analytics-section={`booking_group_${location}`}
    >
      <p className="font-mono text-[10px] tracking-[0.22em] text-[#7c3aed] uppercase">
        {title}
      </p>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-400">{lead}</p>
      <ul className="mt-6 flex flex-col gap-3">
        {available.map((type) => {
          const href = getBookingUrl(type);
          const copy = bookingTypeLabels[type];
          return (
            <li key={type}>
              <Link
                href={href}
                className="group flex flex-col gap-1 rounded-lg border border-zinc-900/80 bg-[#050505] px-4 py-3 transition-colors hover:border-[#7c3aed]/40"
                onClick={() =>
                  trackBookingCtaClick({
                    bookingType: type,
                    label: copy.label,
                    href,
                    location,
                  })
                }
              >
                <span className="text-sm font-medium text-white group-hover:text-[#e9d5ff]">
                  {copy.label}
                </span>
                <span className="font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase">
                  {copy.description}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
