# Analytics Notes

The Loan Playbook uses lightweight, event-focused analytics. Tracking is anonymous and should never include form field values, email addresses, phone numbers, names, or message text.

## Providers

Configured in `.env` with public environment variables:

- `NEXT_PUBLIC_GA_ID` for Google Analytics 4
- `NEXT_PUBLIC_GTM_ID` for Google Tag Manager
- `NEXT_PUBLIC_META_PIXEL_ID` for Meta Pixel
- `NEXT_PUBLIC_TIKTOK_PIXEL_ID` for TikTok Pixel
- `NEXT_PUBLIC_CLARITY_ID` for Microsoft Clarity
- `NEXT_PUBLIC_GOOGLE_REVIEW_URL` for proof-layer review CTA (optional)

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
- `form_abandonment` when a lead form was started but left without submit
- `funnel_to_application_click`
- `micro_conversion`
- `lead_submit`
- `video_click`
- `video_engagement` (play, pause, progress milestones, complete)
- `thumbnail_click`
- `social_outbound_click`
- `sticky_cta_click`
- `review_cta_click` for Google review links (`eventType="review"` on tracked anchors)
- `related_guide_click`

Scroll and section behavior is handled by `app/components/behavior-analytics.tsx` on audience hubs, guides, learn, markets, videos, and the homepage. Section visibility only tracks elements marked with `data-analytics-section`.

## Reporting hooks (GTM / GA4)

Suggested custom dimensions or parameters to map from the dataLayer:

| Parameter | Use |
|-----------|-----|
| `scroll_depth` | Engagement quality by page |
| `section_id` | Which blocks drive depth (e.g. `proof_layer`, `lead_capture`) |
| `cta_location` | CTA placement tests |
| `form_type` / `lead_intent` | Funnel segmentation |
| `fields_started` | Form abandonment friction |
| `engagement_action` | Hero video completion rate |

## Extending Tracking

Use `TrackedLink`, `TrackedAnchor`, and `TrackedBookingAnchor` for clickable UI. Prefer the `eventType` prop when a click is more specific than a general CTA.

For new visibility tracking, add a concise `data-analytics-section` value to the section. Keep values stable: `homepage_hero`, `proof_layer`, `founder_advisor`, `trust_stack`, `lead_capture`, `featured_video`.

Use `MicroOptIn` for email-only micro-conversions. Keep payloads limited to intent/type metadata.
