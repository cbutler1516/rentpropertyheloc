# Branding Audit — The Loan Playbook

**Last updated:** 2026-06-04 (pre-launch final pass)  
**Scope:** Transition from legacy Rent Property HELOC / RentPropertyHELOC branding to **The Loan Playbook** (`theloanplaybook.com`).

---

## Final status

| Area | Status |
|------|--------|
| Package name | `the-loan-playbook` |
| Site URL / metadata | `theloanplaybook.com` |
| Logo paths | `tlp-logo-light`, `tlp-logo-dark`, `tlp-icon`, `tlp-og-image` |
| Legacy `rph-logo-*` | Removed from repo; code references eliminated |
| OG image default | `tlp-og-image.png` (1200×630) via `lib/og.ts` |
| Funnel journey `metaTitle` | Aligned with `\| The Loan Playbook` suffix |
| Strategy call embed | `NEXT_PUBLIC_STRATEGY_CALL_EMBED_URL` supported |
| Deal Analyzer screenshot | `NEXT_PUBLIC_DEAL_ANALYZER_SCREENSHOT_URL` supported |
| Sitemap / robots | `app/sitemap.ts`, `app/robots.ts` |
| Build | `npm run build` passing |

---

## Asset map (`public/images/branding/`)

| File | Purpose | Code reference |
|------|---------|----------------|
| `tlp-logo-light.png` | Light sections, org schema logo | `BRAND_ASSETS.light` |
| `tlp-logo-dark.png` | Header, funnel completion, print PDF hero | `BRAND_ASSETS.dark` |
| `tlp-icon.png` | Favicon generation source | `BRAND_ASSETS.icon` |
| `tlp-og-image.png` | Default Open Graph / Twitter card | `BRAND_ASSETS.og` |

Regenerate placeholders: `node scripts/generate-tlp-brand-assets.mjs`

---

## What was updated (final pass)

### Branding & assets

- [x] `lib/brand.ts` — canonical `tlp-*` naming (`light`, `dark`, `icon`, `og`)
- [x] `lib/og.ts` — shared default OG metadata for layout and SEO pages
- [x] Header/footer logo components → `tlp-logo-dark` / `tlp-logo-light`
- [x] Print report (`financing-review-document.ts`) — dark logo in hero
- [x] Funnel completion UI — `BRAND_ASSETS.dark`
- [x] Lead notification email — The Loan Playbook from/subject (prior pass)
- [x] Removed legacy `rph-logo-*.png` files

### Environment-driven launch toggles

- [x] `NEXT_PUBLIC_STRATEGY_CALL_EMBED_URL` → iframe on `/strategy-call`
- [x] `NEXT_PUBLIC_DEAL_ANALYZER_SCREENSHOT_URL` → `DealAnalyzerScreenshotPlaceholder`
- [x] `.env.example` documented

### SEO & funnel copy

- [x] Investor journey `metaTitle` strings include The Loan Playbook
- [x] Default OG on homepage, layout, and `buildSeoMetadata()`

---

## Manual review before go-live

1. **Final logo artwork** — Replace placeholder PNGs with production wordmark (files already named correctly).
2. **Favicon refresh** — After icon update: `node scripts/generate-favicons.mjs`
3. **Production email** — `RESEND_FROM_EMAIL` on verified sending domain.
4. **Live calendar embed** — Set `NEXT_PUBLIC_STRATEGY_CALL_EMBED_URL` in Vercel.
5. **Deal Analyzer screenshot** — Set env or keep premium mockup.
6. **Analytics IDs** — Production measurement containers.
7. **Legal / compliance** — TCPA variant, NMLS, state licensing pages.

---

## Verification

```bash
npm run build
rg -i "rph-logo|rentpropertyheloc|RentPropertyHELOC" --glob "!node_modules" --glob "!.next" --glob "!docs"
```

Expected: no matches outside historical notes in this doc.

---

## Intentionally retained

- **HELOC education URLs** (`/rental-property-heloc`, etc.) — product content, not legacy site brand
- **HubSpot CRM field names** (`rental_property_type`, etc.) — integration stability
- **Investor funnel HELOC copy** — accurate product language for equity journeys

---

## Related

- [Deployment checklist](deployment-checklist.md) — Vercel env, Supabase, smoke tests, launch
