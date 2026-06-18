# The Loan Playbook

Modern mortgage company and financing strategy platform — built with Next.js App Router, TypeScript, and Tailwind CSS.

**Site:** [theloanplaybook.com](https://theloanplaybook.com)

## Develop

```bash
npm install
cp .env.example .env.local   # optional — configure embeds and analytics
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Brand asset placeholders

```bash
node scripts/generate-tlp-brand-assets.mjs   # tlp-logo-*, tlp-icon, tlp-og-image
node scripts/generate-favicons.mjs           # requires sharp + png-to-ico
```

Assets live in `public/images/branding/`:

| File | Use |
|------|-----|
| `tlp-logo-light.png` | Light backgrounds, footer |
| `tlp-logo-dark.png` | Navy header, print/PDF chrome |
| `tlp-icon.png` | Favicon source |
| `tlp-og-image.png` | Default Open Graph (1200×630) |

## Deploy

Deploy to [Vercel](https://vercel.com) with the default Next.js preset.

## Pre-launch checklist

- [ ] Domain `theloanplaybook.com` on production deployment
- [ ] Replace placeholder logos with final Loan Playbook artwork in `public/images/branding/`
- [ ] Set `RESEND_FROM_EMAIL` on verified domain
- [ ] Set `NEXT_PUBLIC_STRATEGY_CALL_EMBED_URL` (or confirm `NEXT_PUBLIC_BOOKING_URL` fallback)
- [ ] Set `NEXT_PUBLIC_DEAL_ANALYZER_SCREENSHOT_URL` when product screenshot is ready
- [ ] Configure analytics env vars (GA4, Meta, Clarity, Google Ads)
- [ ] Compliance review of TCPA active variant (`lib/leads/tcpa-consent.ts`)
- [ ] Legal pages: NMLS, licensing, EHO disclosures current
- [ ] Run `npm run build` and smoke-test key routes (home, `/strategy-call`, `/check-options`, product pages)
- [ ] Verify `sitemap.xml` and `robots.txt` in production

See [`docs/branding-audit.md`](docs/branding-audit.md) for branding migration status.

**Production deploy:** [`docs/deployment-checklist.md`](docs/deployment-checklist.md) — env vars, Supabase, smoke tests, SEO, launch steps.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
