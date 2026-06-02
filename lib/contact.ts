import { NMLS_NUMBER } from "@/lib/legal/nmls";

/** Display format for site-wide click-to-call */
export const CONTACT_PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "(206) 558-3048";

/** E.164 tel link — tel:+12065583048 */
export const CONTACT_PHONE_TEL = `+1${CONTACT_PHONE_DISPLAY.replace(/\D/g, "")}`;

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "cbutler@barrettfinancial.com";

export const NMLS_CONSUMER_ACCESS_URL = `https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/${NMLS_NUMBER}`;

export const LICENSED_STATES = ["AZ", "CA", "CO", "FL", "IL", "MI", "OR", "TX", "WA"] as const;

export const LICENSED_STATES_LABEL = LICENSED_STATES.join(" · ");

/** Chris Butler — Investor HELOC strategy call (RAD CRM) */
export const BOOKING_URL =
  "https://link.theradcrm.com/widget/bookings/investor-heloc";

export const BOOK_STRATEGY_CALL_LABEL = "Book A Strategy Call";

export const CALL_OUR_TEAM_LABEL = "Call Our Team";

/** @deprecated Use BOOKING_URL */
export function getSchedulingUrl(): string {
  return BOOKING_URL;
}
