# Deployment Guide — Vercel

## 1. Import Repository
1. Push this repository to a private GitHub, GitLab, or Bitbucket repository.
2. Open [Vercel](https://vercel.com/) → **Add New Project** → select the repository.
3. Framework preset is automatically detected as **Next.js** (`vercel.json` pins serverless functions to `bom1` Mumbai for low latency in North India).

## 2. Configure Environment Variables in Vercel
Under **Project Settings → Environment Variables**, add:
- `DATABASE_URL` (Required) — Neon PostgreSQL pooled connection string
- `NEXT_PUBLIC_SITE_URL` (Required) — Production domain, e.g. `https://dreamdesigners.in` (no trailing slash)
- `RESEND_API_KEY` (Optional) — Resend API key for instant email alerts
- `LEADS_NOTIFICATION_EMAIL` (Optional) — Studio inbox receiving enquiry alerts
- `EMAIL_FROM` (Optional) — Verified sender address in Resend

## 3. Post-Deployment Verification
1. Visit `/sitemap.xml` and `/robots.txt` to confirm canonical URLs resolve to your production domain.
2. Submit a test enquiry on `/start-project` and confirm the row appears in Neon `leads` and (if configured) an email arrives via Resend.
3. Verify WhatsApp links (`https://wa.me/917206557887`) open with contextual prefilled messages on mobile.
4. Submit your sitemap in Google Search Console once the custom domain is live.
