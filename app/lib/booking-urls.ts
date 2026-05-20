export type BookingType = "strategy" | "residential" | "investor" | "commercial";

const BOOKING_ENV_KEYS: Record<BookingType, string> = {
  strategy: "NEXT_PUBLIC_BOOKING_STRATEGY_URL",
  residential: "NEXT_PUBLIC_BOOKING_RESIDENTIAL_URL",
  investor: "NEXT_PUBLIC_BOOKING_INVESTOR_URL",
  commercial: "NEXT_PUBLIC_BOOKING_COMMERCIAL_URL",
};

export const bookingTypeLabels: Record<
  BookingType,
  { label: string; description: string }
> = {
  strategy: {
    label: "Book Strategy Call",
    description: "Quick Strategy Call (15 min)",
  },
  residential: {
    label: "Schedule Residential Review",
    description: "Residential Purchase / Refinance Review (30 min)",
  },
  investor: {
    label: "Schedule Investor Session",
    description: "Investor / Builder Strategy Session (30 min)",
  },
  commercial: {
    label: "Schedule Commercial Review",
    description: "Commercial Asset Review (30 min)",
  },
};

export function getBookingUrl(type: BookingType): string {
  const key = BOOKING_ENV_KEYS[type];
  const value = process.env[key]?.trim();
  return value || "/strategy-review";
}

export function isBookingUrlConfigured(type: BookingType): boolean {
  const key = BOOKING_ENV_KEYS[type];
  return Boolean(process.env[key]?.trim());
}
