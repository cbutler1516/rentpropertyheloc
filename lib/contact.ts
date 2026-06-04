/** Platform inquiries — not displayed as a personal advisor email */
export const PLATFORM_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "support@rentpropertyheloc.com";

/** @deprecated Use PLATFORM_EMAIL */
export const CONTACT_EMAIL = PLATFORM_EMAIL;

export const LICENSED_STATES = ["AZ", "CA", "CO", "FL", "IL", "MI", "OR", "TX", "WA"] as const;

export const LICENSED_STATES_LABEL = LICENSED_STATES.join(" · ");

/** Investor financing consultation scheduling (third-party booking) */
export const BOOKING_URL =
  "https://link.theradcrm.com/widget/bookings/investor-heloc";

export const BOOK_STRATEGY_CALL_LABEL = "Schedule a Consultation";

export const EMAIL_OUR_TEAM_LABEL = "Email Our Team";

/** @deprecated Use EMAIL_OUR_TEAM_LABEL */
export const CALL_OUR_TEAM_LABEL = EMAIL_OUR_TEAM_LABEL;

/** @deprecated Use BOOKING_URL */
export function getSchedulingUrl(): string {
  return BOOKING_URL;
}
