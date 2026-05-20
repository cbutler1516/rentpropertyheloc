# Deal Analyzer setup (v2 + v3)

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
2. Lead gate calls `POST /api/deal-analyzer/generate-narrative` (OpenAI or static fallback)
3. `POST /api/deal-analyzer/reports` saves lead, scenario, and narrative
4. User lands on `/deal-analyzer/report/[slug]` — shareable link

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
