# Deal Analyzer v2 — Supabase setup

## 1. Environment variables

Copy `.env.example` to `.env.local` and set:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # recommended for API routes
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Without these variables, the analyzer falls back to **localStorage** for reports (same device only).

## 2. Run the migration

In the Supabase SQL editor, run:

`supabase/migrations/001_deal_analyzer.sql`

This creates:

- `deal_analyzer_leads`
- `deal_analyzer_scenarios`
- `deal_analyzer_reports`

## 3. Flow

1. User completes `/deal-analyzer/analyze`
2. Lead gate saves lead + scenario + report via `POST /api/deal-analyzer/reports`
3. User is redirected to `/deal-analyzer/report/[slug]`
4. Shareable link works for anyone with the slug

## 4. Tables

| Table | Purpose |
|-------|---------|
| `deal_analyzer_leads` | Contact + role + referral / agent |
| `deal_analyzer_scenarios` | `inputs_json`, `analysis_json`, `deal_type` |
| `deal_analyzer_reports` | Unique `report_slug`, narrative, denormalized agent fields |
