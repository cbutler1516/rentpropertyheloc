# Analytics Notes

The Loan Playbook uses lightweight, event-focused analytics. Tracking is anonymous and should never include form field values, email addresses, phone numbers, names, or message text.

## Providers

Configured in `.env` with public environment variables:

- `NEXT_PUBLIC_GA_ID` for Google Analytics 4
- `NEXT_PUBLIC_GTM_ID` for Google Tag Manager
- `NEXT_PUBLIC_META_PIXEL_ID` for Meta Pixel
- `NEXT_PUBLIC_TIKTOK_PIXEL_ID` for TikTok Pixel
- `NEXT_PUBLIC_CLARITY_ID` for Microsoft Clarity

If an env var is missing, that provider is not loaded.

## Behavioral Events

Central event helpers live in `app/lib/analytics-events.ts`.

Current events:

- `apply_page_view`
- `apply_cta_click`
- `page_view`
- `scroll_depth` at 25, 50, 75, and 100 percent
- `section_view` for marked sections
- `cta_click`
- `booking_click`
- `form_start`
- `funnel_to_application_click`
- `micro_conversion`
- `lead_submit`
- `video_click`
- `thumbnail_click`
- `social_outbound_click`
- `sticky_cta_click`
- `related_guide_click`

Scroll and section behavior is handled by `app/components/behavior-analytics.tsx`. Section visibility only tracks elements marked with `data-analytics-section`.

## Extending Tracking

Use `TrackedLink`, `TrackedAnchor`, and `TrackedBookingAnchor` for clickable UI. Prefer the `eventType` prop when a click is more specific than a general CTA:

- `apply_cta`
- `funnel_apply`
- `video`
- `thumbnail`
- `social`
- `sticky_cta`
- `related_guide`
- `cta`

For new visibility tracking, add a concise `data-analytics-section` value to the section. Keep values stable and generic, such as `featured_video`, `lead_capture`, `booking_cta`, `featured_guides`, or `social_lanes`.

Use `MicroOptIn` for email-only micro-conversions such as buyer prep tips, market updates, homeowner strategy updates, or agent financing insights. Keep the payload limited to the destination endpoint and analytics limited to intent/type metadata.
