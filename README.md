# Dream Designers — Digital Flagship & 3D Showroom (Vercel Production Repository)

Production-ready Next.js 14 (App Router) + TypeScript + Tailwind CSS + Neon Serverless PostgreSQL + Drizzle ORM + Zod + Resend repository built for **Dream Designers** (Ambala City, Haryana).

## Quick Deploy to Vercel (3 Steps)
1. **Unzip & Push to GitHub**:
   ```bash
   unzip dream-designers-vercel.zip
   cd dream-designers-vercel
   git init && git add . && git commit -m "Initial Dream Designers Digital Flagship"
   ```
   Push to a GitHub repository.
2. **Import into Vercel**:
   - Open [vercel.com/new](https://vercel.com/new), import your repository, and keep the auto-detected **Next.js** preset (`vercel.json` is pre-configured for Mumbai `bom1`).
   - Add environment variables from `.env.example`:
     - `DATABASE_URL` (Neon Serverless PostgreSQL pooled connection string)
     - `NEXT_PUBLIC_SITE_URL` (your Vercel or custom domain, no trailing slash)
     - Optional: `RESEND_API_KEY`, `LEADS_NOTIFICATION_EMAIL`, `EMAIL_FROM`
3. **Run Database Migration**:
   ```bash
   npm install
   npm run db:migrate
   ```
   (Or execute `drizzle/0000_create_leads.sql` directly inside the Neon SQL Editor.)

## Project Structure
- `src/app/` — All 9 App Router pages (`/`, `/showroom`, `/projects`, `/projects/[slug]`, `/services`, `/reels`, `/studio`, `/process`, `/start-project`) + `/api/enquiries`, `sitemap.ts`, `robots.ts`, `not-found.tsx`
- `src/components/` — Modular UI (`AirGlassIntro`, `Navigation`, `HomeExperience`, `ShowroomConfigurator`, `SpatialTourWindow`, `ServicesShowcase`, `ReelsGallery`, `ProjectEnquiryWizard`, `Footer`)
- `src/data/catalog.ts` — Single data-driven file for swapping in owner-approved photography
- `src/db/` & `drizzle/` — Neon PostgreSQL Drizzle schema & SQL migration
- `public/images/concepts/` — 16 high-resolution progressive JPEG architectural assets
