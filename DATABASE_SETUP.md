# Database Setup — Neon Serverless PostgreSQL + Drizzle ORM

## 1. Create a Neon Project
1. Sign in to [Neon Console](https://console.neon.tech/).
2. Create a new PostgreSQL project (recommended region: **Asia Pacific (Singapore)** or **Mumbai** if available on your plan).
3. Copy the **Pooled connection string** (`postgres://user:password@ep-...neon.tech/neondb?sslmode=require`).

## 2. Configure Environment Variable
Add the connection string to `.env.local` (never commit `.env.local` to Git):
```env
DATABASE_URL=postgres://...
```

## 3. Apply the Migration
The SQL migration for the `leads` table is pre-generated in `drizzle/0000_create_leads.sql`.
Run:
```bash
npm run db:migrate
```
Alternatively, push the Drizzle schema directly:
```bash
npm run db:push
```

## 4. Table Schema (`leads`)
- `id` (`uuid`, PK, auto-generated)
- `name`, `phone`, `email`, `city`
- `property_type`, `service_required`, `project_stage`
- `approximate_area`, `budget_range`, `project_timeline`, `additional_requirements` (nullable)
- `consent` (`boolean`, required `true`)
- `source_page` (`varchar`)
- `submission_fingerprint` (`varchar(64)`, SHA-256 hash used to prevent duplicate submissions within 10 minutes)
- `created_at`, `updated_at` (`timestamptz`)

## 5. Viewing Submitted Enquiries
- Use **Neon Console → Tables → `leads`** to inspect or export CSV leads securely.
- Or run `npm run db:studio` locally to browse leads in Drizzle Studio.
- **Note**: Because live database credentials were not provided during build, no live Neon insertion was executed in the sandbox. Run a test submission from `/start-project` after setting `DATABASE_URL`.
