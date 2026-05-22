# Deal Analyzer setup (v2 + v3 + v4 + v5 + preview gate)

## Environment variables

Copy `.env.example` to `.env.local`:

```env
# Supabase — leads, scenarios, shareable reports
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# OpenAI — Chris-style Playbook narratives (v3)
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini

# CRM push (v9) — server-only
GHL_WEBHOOK_URL=
ZAPIER_WEBHOOK_URL=
CRM_PUSH_SECRET=
CRM_AUTO_PUSH=false
```

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_*` | No* | Persist leads & shareable `/deal-analyzer/report/[slug]` |
| `SUPABASE_SERVICE_ROLE_KEY` | Recommended | Reliable server writes from API routes |
| `OPENAI_API_KEY` | No | AI narratives; falls back to static copy if missing |
| `OPENAI_MODEL` | No | Defaults to `gpt-4o-mini` |

\*Without Supabase, reports save to **localStorage** (same browser only).

## Database

Run in Supabase SQL editor:

`supabase/migrations/001_deal_analyzer.sql`

## Flow

1. User models a deal at `/deal-analyzer/analyze`
2. **Preview gate** at `/deal-analyzer/analyze?step=preview` or `/deal-analyzer/preview` — teases strategy headlines; metrics/charts/notes are locked
3. **Lead + consent** at `/deal-analyzer/analyze?step=lead` — contact form with required SMS/call opt-in
4. Lead gate calls `POST /api/deal-analyzer/generate-narrative` (OpenAI or static fallback)
5. `POST /api/deal-analyzer/reports` saves lead (with consent metadata), scenario, and narrative
6. User lands on `/deal-analyzer/report/[slug]` — full shareable report

### Consent fields (migration `002_deal_analyzer_consent.sql`)

Run after `001_deal_analyzer.sql`. Adds to `deal_analyzer_leads`:

- `sms_call_consent` (boolean)
- `consent_text`, `consent_timestamp`, `consent_ip`, `consent_user_agent`

Consent text is stored verbatim; IP and user agent are captured server-side from the reports API request headers.

## Narrative API

`POST /api/deal-analyzer/generate-narrative`

Body: `dealType`, `leadRole`, `inputs`, `analysis`, plus optional `leadName`, `agentName`, `referralSource`, `notes`.

Returns JSON:

```json
{
  "narrative": {
    "executiveSummary": "",
    "recommendedStrategy": "",
    "coachNotes": [],
    "risks": [],
    "opportunities": [],
    "nextSteps": [],
    "clientFriendlyExplanation": "",
    "agentShareMessage": ""
  },
  "source": "ai"
}
```

Compliance is enforced in the system prompt: educational estimates only, no approval guarantees, recommend licensed advisor review.

## v3 report sections

- Executive summary hero (Chris’s read)
- Plain-language client explanation
- Coach’s Notes (premium bullets)
- Recommended strategy
- What I’d look at next
- Send this to your client (agents)
- Risks & opportunities
- Charts and deal metrics

## v4 — PDF export & sharing

On `/deal-analyzer/report/[slug]`:

- **Download PDF** — opens the browser print dialog; choose “Save as PDF”. Nav, actions, and site chrome are hidden via print CSS (`deal-analyzer-print.css`).
- **Copy report link** — copies the full shareable URL.
- **Copy client message** — copies the agent share blurb plus report URL (when narrative includes `agentShareMessage`).

Print layout includes branded header (The Loan Playbook / Broadview Lending), footer disclaimer, prepared-for / shared-by lines, report date, slug URL, key metrics grid, narrative sections, charts, and contact CTA.

**Social previews:** `generateMetadata` on the slug page uses Supabase when configured. Reports stored only in localStorage do not get server-side Open Graph tags.

No extra npm packages — v4 uses `@media print` and `window.print()` for production-safe PDF export.

## v5 — Admin dashboard

Internal route: `/admin/deal-analyzer`

Set in `.env.local`:

```env
ADMIN_DEAL_ANALYZER_PASSWORD=your-secure-password
```

Requires Supabase (`SUPABASE_SERVICE_ROLE_KEY` recommended). Sign in with the password; a httpOnly session cookie is set server-side (service role key is never exposed to the browser).

**Dashboard includes:** total reports, new leads this week, lead/deal type breakdowns, highest-value opportunities (lead score), agent-sourced leads, missing contact flags, searchable/filterable recent reports table, open report + copy link actions.

**Supabase helpers** (`app/deal-analyzer/lib/supabase/dashboard.ts`):

- `fetchDealAnalyzerDashboardStats()`
- `fetchRecentDealAnalyzerReports(limit?)`
- `fetchDealAnalyzerReportBySlug(slug)` — alias of `fetchReportFromSupabase`

**API routes** (cookie auth required):

- `POST /api/deal-analyzer/admin/auth` — login
- `DELETE /api/deal-analyzer/admin/auth` — logout
- `GET /api/deal-analyzer/admin/dashboard` — stats + filtered reports
- `POST /api/deal-analyzer/admin/generate-follow-up` — AI/static follow-up draft (body: `{ reportId }`)
- `GET /api/deal-analyzer/admin/follow-ups?reportId=` — load saved follow-up
- `PATCH /api/deal-analyzer/admin/follow-ups/[id]` — save workflow edits + lead status

## v6 — Follow-up workflow

Run migration `003_deal_analyzer_followups.sql` after `002`.

**Tables:** `deal_analyzer_followups` (one row per report) plus `lead_status`, `last_contacted_at`, `next_follow_up_at` on `deal_analyzer_leads`.

**Admin** (`/admin/deal-analyzer`): Generate Follow-Up opens a drawer with text, email, agent message, call notes, priority, timing; copy buttons; lead status dropdown; next follow-up date; **Needs Follow-Up** filter.

Lead statuses: New, Followed Up, Contacted, Appointment Set, Not Ready, Archived.

## v7 — Agent partner system

Run migration `004_deal_analyzer_agents.sql` after `003`.

**Table:** `deal_analyzer_agents` (name, email, phone, company, slug, referral_code).

**Attribution on leads/reports:** `agent_id`, `referral_code` (set automatically when a buyer uses a partner link).

### Public routes (read-only agent lookup)

| Route | Purpose |
|-------|---------|
| `/partners/[agentSlug]` | Agent-branded landing + CTA |
| `/partners/[agentSlug]/deal-analyzer` | Redirects to analyze |
| `/partners/[agentSlug]/deal-analyzer/analyze` | Full analyzer funnel under partner context |
| Invalid slug | Redirects to `/deal-analyzer` |

Reports still live at `/deal-analyzer/report/[slug]` globally. Reports show **Shared by [Agent Name]** when referred.

### Admin

| Route | Purpose |
|-------|---------|
| `/admin/deal-analyzer/agents` | Add/edit agents, copy partner link, view reports/leads/appointments/conversion |

**API routes:**

- `GET /api/deal-analyzer/agents/[slug]` — public agent profile (read-only)
- `GET|POST /api/deal-analyzer/admin/agents` — list + stats, create (admin auth)
- `PATCH|DELETE /api/deal-analyzer/admin/agents/[id]` — update/delete (admin auth)

Partner link format: `{SITE_URL}/partners/{slug}` → analyze at `{SITE_URL}/partners/{slug}/deal-analyzer/analyze`.

## v8 — Agent co-branding

Run migration `005_deal_analyzer_agent_branding.sql` after `004`.

**New agent fields:** `headshot_url`, `logo_url`, `bio`, `brokerage`, `cta_phone`, `cta_email`, `brand_color`.

**Partner landing** (`/partners/{slug}`): co-branded hero with headshot/logo, agent CTA card, “Powered by The Loan Playbook + Broadview Lending”.

**Reports:** co-branded header (Prepared for / Shared by / Financing strategy by Chris Butler), agent contact card, print/PDF chrome includes agent logo and partner lines.

**Admin** (`/admin/deal-analyzer/agents`): branding fields, preview partner page, preview sample report (`/partners/{slug}/sample-report`), Agent Invite Kit (text, email, social, video script, QR placeholder).

## v9 — CRM push (GHL / Zapier)

Run migration `006_deal_analyzer_crm_push.sql` after `005`.

**Report columns:** `crm_push_status` (`not_pushed` | `pushed` | `failed`), `crm_last_pushed_at`, `crm_push_error`, `crm_external_id`.

**Environment** (server-only — never exposed to the browser):

```env
GHL_WEBHOOK_URL=https://your-ghl-or-rad-inbound-webhook
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/...
CRM_PUSH_SECRET=your-shared-secret
CRM_AUTO_PUSH=false
```

| Variable | Purpose |
|----------|---------|
| `GHL_WEBHOOK_URL` | Primary GoHighLevel / RAD CRM inbound webhook |
| `ZAPIER_WEBHOOK_URL` | Fallback if GHL fails or is unset |
| `CRM_PUSH_SECRET` | Optional `Authorization` / `X-Deal-Analyzer-CRM-Secret` header on outbound posts |
| `CRM_AUTO_PUSH` | `true` pushes automatically after each new report is saved |

**Admin** (`/admin/deal-analyzer`): CRM setup panel (config status + test push), CRM status column, Push / Retry buttons, filters (Not pushed / Failed / Pushed).

**API routes** (admin auth):

- `GET /api/deal-analyzer/admin/crm/test` — integration status (no webhook URLs)
- `POST /api/deal-analyzer/admin/crm/test` — send sample test payload
- `POST /api/deal-analyzer/admin/crm/push-report` — body `{ reportId }`

Webhook JSON includes lead, consent, deal type, inputs, analysis, report URL, agent attribution, lead score, follow-up copy, lead status, and created date.

## v10 — SEO calculator landing pages

Educational, compliance-safe landing pages for each calculator strategy. No migration required.

### Routes

| URL | Analyzer path (`?path=`) |
|-----|---------------------------|
| `/deal-analyzer/homebuyer` | `buy-home` |
| `/deal-analyzer/refinance` | `refinance` |
| `/deal-analyzer/investor-dscr` | `investor-dscr` |
| `/deal-analyzer/commercial` | `commercial` |
| `/deal-analyzer/seller-concessions` | `buy-home` |
| `/deal-analyzer/rate-buydown` | `buy-home` |
| `/deal-analyzer/heloc-vs-cash-out` | `refinance` |
| `/deal-analyzer/wait-vs-buy` | `buy-home` |

Strategy pages (seller concessions, rate buydown, HELOC vs cash-out, wait vs buy) use the buy-home or refinance analyzer path with educational framing; CTAs open `/deal-analyzer/analyze?path=…` with the path preselected.

### Implementation

| File | Purpose |
|------|---------|
| `app/deal-analyzer/lib/seo-landing-content.ts` | Copy, metadata, FAQ, related links per slug |
| `app/deal-analyzer/lib/seo-landing-route.tsx` | `createSeoLandingPage` + `createSeoLandingGenerateMetadata` |
| `app/deal-analyzer/components/deal-analyzer-seo-landing.tsx` | Shared landing layout (hero, problem/solution, FAQ, disclaimer) |
| `app/deal-analyzer/{slug}/page.tsx` | Thin route files per slug |
| `app/lib/sitemap-inventory.ts` | All SEO slugs in sitemap (priority `0.75`) |

Each page exports `generateMetadata` and renders FAQ **FAQPage** JSON-LD via `JsonLd`. Main hub `/deal-analyzer` links to all calculator guides.

Copy is educational only—no promises of approval, savings, or specific loan terms.

## v11 — Conversion analytics

Run migration `007_deal_analyzer_events.sql` after `006`.

**Table:** `deal_analyzer_events` — product funnel events (anonymous `session_id`, optional `lead_id` / `report_id` / `agent_id`, `metadata` jsonb).

**UTM on leads/reports:** `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, plus `session_id`. Captured from URL on first visit (sessionStorage) and stored when a report is saved.

**Client tracking:** `POST /api/deal-analyzer/events` (no PII in metadata; consent events are separate from page-view events).

| Event | When |
|-------|------|
| `seo_landing_view` | SEO calculator landing page |
| `partner_landing_view` | `/partners/{slug}` |
| `analyzer_started` | Deal form first load |
| `path_selected` | Path change |
| `preview_viewed` | Preview gate |
| `lead_form_viewed` | Lead gate |
| `consent_checked` | SMS/call checkbox checked |
| `lead_submitted` | Lead saved (server + local fallback) |
| `report_generated` | Report saved |
| `report_link_copied` / `report_message_copied` / `report_pdf_printed` | Report actions |
| `crm_push_succeeded` / `crm_push_failed` | CRM webhooks |
| `follow_up_generated` | Admin follow-up AI |

**Admin** (`/admin/deal-analyzer`): Conversion analytics panel — funnel, by deal type, by agent, top SEO pages, report engagement, CRM push rate. API: `GET /api/deal-analyzer/admin/analytics?days=30`.

Session id: `localStorage` + cookie `da_session_id` (30-day). No browser fingerprinting.

## v12 — Partner-branded SEO calculator pages

No new migration. Reuses v10 SEO content, v8 co-branding, and v11 analytics.

### Partner routes

`/partners/{agentSlug}/deal-analyzer/{calculatorSlug}` for each v10 slug (`homebuyer`, `refinance`, `investor-dscr`, `commercial`, `seller-concessions`, `rate-buydown`, `heloc-vs-cash-out`, `wait-vs-buy`).

- Co-branded header (headshot, logo, agent CTA when set)
- Financing strategy by Chris Butler · The Loan Playbook + Broadview Lending
- CTA → `/partners/{slug}/deal-analyzer/analyze?path=...`
- FAQ JSON-LD + partner-aware metadata
- `seo_landing_view` events with `agent_id` and `metadata.landingSlug`

### Admin (`/admin/deal-analyzer/agents`)

- **Copy full landing page kit** — all branded calculator URLs
- Per-calculator **Copy** links in the landing kit table
- **Landing views / Landing leads** columns (90-day event rollup)
- Edit agent to see per-page views and leads breakdown

## v13 — Production launch readiness

No new migration.

### Launch admin

**Route:** `/admin/deal-analyzer/launch`

**API:** `GET /api/deal-analyzer/admin/launch` (admin auth)

Includes:
- Required / optional env var matrix
- Supabase migration probes for `001`–`007`
- OpenAI, CRM webhook, sitemap inventory, robots.txt checks
- Manual checklists: report share, PDF print, event tracking
- Test funnel links (standard + partner when an agent exists)
- CRM test push button
- Go-live checklist + known limitations

### UX hardening

- Report slug: loading skeleton, clearer 404 vs error states
- Invalid partner slug: friendly fallback (no redirect) with links to public analyzer
- Admin empty states for filtered reports table
- Preview gate empty state copy

## Launch pack (admin)

**Route:** `/admin/deal-analyzer/launch-pack`

Chris-facing rollout hub: client + agent copy, social posts, email/text templates, QR download, first-10 agent outreach tracker (saved in browser localStorage), test link checklist, and editable launch notes.
