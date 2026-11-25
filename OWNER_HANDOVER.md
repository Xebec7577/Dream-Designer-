# Owner Handover Guide — Dream Designers Digital Flagship

## What This Website Does
Your new platform acts as a **digital architectural showroom and structured client enquiry system**. Instead of receiving vague messages like *"I need interior design"*, prospective residential and commercial clients explore your design philosophy, services, and process first, then complete a guided 6-step project brief (property type, service needed, city, area, stage, optional budget/timeline, and contact details).

## How Enquiries Are Received
1. **Database Storage (Neon PostgreSQL)**: Every validated submission is stored securely in your private `leads` table with a unique Reference ID and timestamp.
2. **Email Alerts (Optional via Resend)**: When `RESEND_API_KEY` and `LEADS_NOTIFICATION_EMAIL` are configured, your studio receives an instant structured email with the client's brief and direct reply-to address.
3. **Contextual WhatsApp Follow-Up**: After submitting, the visitor is offered a one-click WhatsApp button prefilled with their Reference ID and project summary, directed to `+91 72065 57887`.

## How to Add or Update Projects
All portfolio entries live in a single data file: `src/data/concept-studies.ts`.
1. Place approved high-resolution JPG/WebP photographs in `public/images/projects/<project-slug>/`.
2. Add or update an entry in `src/data/concept-studies.ts` (title, typology, verified location, overview, materials, and image paths) and set `isConceptVisual: false`.
3. Push the change to Git — Vercel automatically rebuilds and publishes the updated portfolio and dynamic case study page.

## Typical Recurring Expenses
- **Custom Domain** (e.g., `.in` or `.com`): ~₹800–₹1,500/year.
- **Vercel Hosting**: Free Hobby tier or ~USD $20/month Pro tier (recommended for commercial studio sites).
- **Neon PostgreSQL**: Free tier covers thousands of monthly enquiries; paid plans start around USD $19/month if traffic scales.
- **Resend Email**: Free tier covers up to 3,000 notification emails/month.

## Ongoing Maintenance Scope
- Quarterly dependency updates (`npm update`) and security patches.
- Uploading new completed project case studies and photography.
- Periodic backup/export of leads from Neon Console.
