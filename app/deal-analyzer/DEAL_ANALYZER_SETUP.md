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
