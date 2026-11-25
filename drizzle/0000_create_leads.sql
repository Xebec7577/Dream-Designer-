CREATE TABLE IF NOT EXISTS "leads" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" varchar(120) NOT NULL,
  "phone" varchar(30) NOT NULL,
  "email" varchar(160) NOT NULL,
  "city" varchar(120) NOT NULL,
  "property_type" varchar(80) NOT NULL,
  "service_required" varchar(120) NOT NULL,
  "project_stage" varchar(120) NOT NULL,
  "approximate_area" varchar(80),
  "budget_range" varchar(100),
  "project_timeline" varchar(100),
  "additional_requirements" text,
  "consent" boolean DEFAULT false NOT NULL,
  "source_page" varchar(200) DEFAULT '/start-project' NOT NULL,
  "submission_fingerprint" varchar(64) NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "leads_fingerprint_created_idx"
  ON "leads" ("submission_fingerprint", "created_at");

CREATE INDEX IF NOT EXISTS "leads_created_at_idx"
  ON "leads" ("created_at");
