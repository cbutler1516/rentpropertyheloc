# Final deployment checklist — The Loan Playbook

**Production domain:** `https://theloanplaybook.com`  
**Last updated:** 2026-06-04

Use this checklist before and after promoting a Vercel production deployment. Items marked **(this repo)** reflect what is implemented in the current codebase. Items marked **(planned)** are on your launch roadmap but are **not** in this repository yet.

---

## Quick health check (after deploy)

```bash
curl -s https://theloanplaybook.com/api/leads/health | jq
```

Confirm:

| Field | Production target |
|-------|-------------------|
| `persistenceMode` | `supabase` (not `local-fallback`) |
| `supabaseConfigured` | `true` |
| `hubspotConfigured` | `true` (if using HubSpot) |
| `resendConfigured` | `true` (if using email alerts) |
| `zapierConfigured` | `true` (optional) |

---

## 1. Environment (Vercel)

Copy variables from [`.env.example`](.env.example) into **Vercel → Project → Settings → Environment Variables** (Production + Preview as needed).

### Required for production leads

| Variable | Notes |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only — never expose to client |
| `ADMIN_TEST_TOKEN` | Protects admin/list API routes in production |
| `RESEND_API_KEY` | Internal lead notification emails |
| `RESEND_FROM_EMAIL` | Verified sending domain |
| `INTERNAL_LEAD_NOTIFICATION_RECIPIENTS` | Comma-separated inbox list |

### CRM & integrations

| Variable | Notes |
|----------|--------|
| `HUBSPOT_PRIVATE_APP_TOKEN` | HubSpot contact sync + notes |
| `ZAPIER_WEBHOOK_URL` | Optional Zapier catch hook |

### Public site & conversion

| Variable | Notes |
|----------|--------|
| `NEXT_PUBLIC_BOOKING_URL` | Fallback scheduler when embed unset |
| `NEXT_PUBLIC_STRATEGY_CALL_EMBED_URL` | Enables iframe on `/strategy-call` |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Analytics |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | + conversion label if used |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Clarity |
| `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` | Address autocomplete in funnel |

### Not in this repo yet **(planned)**

| Variable | Status |
|----------|--------|
| `OPENAI_API_KEY` | No OpenAI routes in current codebase |
| `GHL_WEBHOOK_URL` / GoHighLevel | Not implemented — use Zapier/HubSpot today |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | App uses service role server-side only |

### Domain (Vercel)

1. Vercel → **Domains** → add `theloanplaybook.com` and `www` (redirect to apex if desired).
2. Confirm SSL active.
3. `metadataBase` is `https://theloanplaybook.com` in [`lib/site.ts`](lib/site.ts) — update if domain changes.

---

## 2. Supabase

### Migrations 001–007 **(planned)**

This repository does **not** include `supabase/migrations/` files. If your migrations live in another branch or repo, run them in order there before relying on production data features (agents, reports, scenarios, follow-ups).

### Tables used **(this repo)** today

The live app writes to these REST tables when Supabase env vars are set:

| Table | Purpose |
|-------|---------|
| `leads` | Legacy/scored lead rows ([`save-lead.ts`](lib/leads/save-lead.ts)) |
| `lead_submissions` | Primary funnel submissions + HubSpot sync status ([`save-lead-submission.ts`](lib/leads/save-lead-submission.ts)) |
| `partial_leads` | In-progress funnel autosave ([`save-partial-lead.ts`](lib/leads/save-partial-lead.ts)) |

### Tables on your checklist **(planned — not in this repo)**

| Table | Status |
|-------|--------|
| `scenarios` | Not referenced in current app code |
| `reports` | Not referenced — print uses client HTML ([`financing-review-document.ts`](lib/leads/financing-review-document.ts)) |
| `agents` | No `/partners/{slug}` routes |
| `followups` | Not implemented |
| `events` | Analytics via GA/Meta/Clarity, not Supabase events table |

### Verify after Supabase setup

- [ ] Insert test row via funnel submit → row appears in `lead_submissions`
- [ ] Partial funnel progress → `partial_leads` updates
- [ ] RLS policies allow service role inserts (app uses service role, not anon)
- [ ] TCPA fields present: `tcpa_consent`, `tcpa_consent_text`, `tcpa_consent_at` on `lead_submissions`

---

## 3. Branding

Assets: `public/images/branding/`

| Check | Path / location |
|-------|-----------------|
| Header logo (dark wordmark) | `tlp-logo-dark.png` → [`BRAND_ASSETS.dark`](lib/brand.ts) |
| Footer logo (light wordmark) | `tlp-logo-light.png` |
| Favicon | Run `node scripts/generate-favicons.mjs` after updating `tlp-icon.png` |
| OG / social preview | `tlp-og-image.png` (1200×630) via [`lib/og.ts`](lib/og.ts) |
| Print / review PDF chrome | Dark logo in [`financing-review-document.ts`](lib/leads/financing-review-document.ts) |
| Email alerts | From name: **The Loan Playbook** ([`notify-lead-received.ts`](lib/leads/notify-lead-received.ts)) |

Regenerate placeholders: `node scripts/generate-tlp-brand-assets.mjs`

See also: [`docs/branding-audit.md`](branding-audit.md)

---

## 4. Core smoke test **(this repo)**

What you can verify on the **current** deployment:

| Step | URL / action | Expected |
|------|----------------|----------|
| Homepage | `/` | Hero, Mortgage Solutions, Deal Analyzer section, CTAs |
| Deal Analyzer landing | `/deal-analyzer` | Marketing page → CTAs to `/check-options` |
| Start funnel | `/check-options?step=1` | Funnel loads, TCPA consent visible |
| Complete funnel | Submit with consent | 200 from `POST /api/leads`, confirmation UI |
| Print review | Post-submit “review summary” | Browser print dialog / HTML download |
| Lead persistence | Supabase dashboard | Row in `lead_submissions` |
| Health API | `/api/leads/health` | `persistenceMode: "supabase"` |
| List leads (admin) | `GET /api/leads/list` with `Authorization: Bearer $ADMIN_TEST_TOKEN` | JSON list |
| HubSpot | HubSpot app | Contact created/updated (if token set) |
| Zapier | Zap history | Event if `ZAPIER_WEBHOOK_URL` set |
| Strategy call | `/strategy-call` | Embed if env set, else placeholder |

### Not available in this repo yet **(planned)**

- Full in-app Deal Analyzer with locked report + shareable report link
- Admin UI at `/admin/*` (routes listed in [`PUBLIC_ROUTE_CHECKLIST`](lib/site.ts) but no pages)
- CRM “follow-up generation” automation
- PDF server generation (only client print/HTML today)

---

## 5. Partner smoke test **(planned)**

| Step | Status |
|------|--------|
| Add test agent | **Not implemented** — no `agents` table wiring / admin UI |
| `/partners/{slug}` branded page | **Not implemented** — only `/partners` marketing page |
| Branded calculator per agent | **Not implemented** |
| Agent attribution in report/CRM | Partial — UTM/query params captured on submissions |

**Today:** use `/partners` + `/agents` marketing pages and UTM links (`?utm_source=agent-name`) until partner slug product ships.

---

## 6. SEO

| Check | URL |
|-------|-----|
| Sitemap | `https://theloanplaybook.com/sitemap.xml` |
| Robots | `https://theloanplaybook.com/robots.txt` |
| Product pages | `/conventional-loans`, `/fha-loans`, `/va-loans`, `/jumbo-loans`, `/dscr-loans`, `/bank-statement-loans`, `/heloc`, `/cash-out-refinance`, `/commercial-loans` |
| Strategy call | `/strategy-call` |
| Resources hub | `/mortgage-resources` |
| OG preview | Share homepage in Slack/iMessage — should show `tlp-og-image.png` |

Optional: run [Google Rich Results Test](https://search.google.com/test/rich-results) on a product page (FAQ schema).

---

## 7. Launch (go-to-market)

Operational checklist (not code):

- [ ] Add first 10 agents (CRM or spreadsheet until agent portal exists)
- [ ] Prepare Launch Pack (Deal Analyzer link, `/strategy-call`, `/check-options`)
- [ ] Each agent sends to 3 buyers with tracked UTM links
- [ ] After 25–50 visits: review GA4, Meta, Clarity, HubSpot, `/api/leads/health` analytics block
- [ ] Compliance: TCPA active variant reviewed ([`lib/leads/tcpa-consent.ts`](lib/leads/tcpa-consent.ts))
- [ ] Legal pages live: privacy, terms, licensing/disclosures

---

## Vercel deploy commands

```bash
# Preview
npx vercel

# Production (after checklist)
npx vercel --prod
```

Or connect GitHub → Vercel auto-deploy on `main`.

---

## Rollback

Vercel → Deployments → previous production deployment → **Promote to Production**.

---

## Related docs

- [Branding audit](branding-audit.md)
- [README launch checklist](../README.md)
