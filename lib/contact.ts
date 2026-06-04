/** Platform inquiries — not displayed as a personal advisor email */
export const PLATFORM_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "support@rentpropertyheloc.com";

/** @deprecated Use PLATFORM_EMAIL */
export const CONTACT_EMAIL = PLATFORM_EMAIL;

/** Display format for site-wide click-to-call */
export const PLATFORM_PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "(206) 487-1728";

/** E.164 tel link — tel:+12064871728 */
export const PLATFORM_PHONE_TEL =
  process.env.NEXT_PUBLIC_CONTACT_PHONE_TEL ??
  `+1${PLATFORM_PHONE_DISPLAY.replace(/\D/g, "")}`;

/** @deprecated Use PLATFORM_PHONE_DISPLAY */
export const CONTACT_PHONE_DISPLAY = PLATFORM_PHONE_DISPLAY;

/** @deprecated Use PLATFORM_PHONE_TEL */
export const CONTACT_PHONE_TEL = PLATFORM_PHONE_TEL;

export const LICENSED_STATES = ["AZ", "CA", "CO", "FL", "IL", "MI", "OR", "TX", "WA"] as const;

export const LICENSED_STATES_LABEL = LICENSED_STATES.join(" · ");

/** Investor financing consultation scheduling (third-party booking) */
export const BOOKING_URL =
  "https://link.theradcrm.com/widget/bookings/investor-heloc";

export const BOOK_STRATEGY_CALL_LABEL = "Speak With Our Team";
export const DISCUSS_FINANCING_LABEL = "Discuss Your Financing Options";
export const CALL_OUR_TEAM_LABEL = "Call Our Team";
export const QUESTIONS_CALL_TEAM_LABEL = "Questions? Call Our Team";
export const SPEAK_WITH_TEAM_LABEL = "Speak With Our Team";

export const EMAIL_OUR_TEAM_LABEL = "Email Our Team";

/** @deprecated Use BOOKING_URL */
export function getSchedulingUrl(): string {
  return BOOKING_URL;
}
