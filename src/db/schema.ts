import { pgTable, uuid, varchar, text, boolean, timestamp, index } from "drizzle-orm/pg-core";

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    phone: varchar("phone", { length: 30 }).notNull(),
    email: varchar("email", { length: 160 }).notNull(),
    city: varchar("city", { length: 120 }).notNull(),
    propertyType: varchar("property_type", { length: 80 }).notNull(),
    serviceRequired: varchar("service_required", { length: 120 }).notNull(),
    projectStage: varchar("project_stage", { length: 120 }).notNull(),
    approximateArea: varchar("approximate_area", { length: 80 }),
    budgetRange: varchar("budget_range", { length: 100 }),
    projectTimeline: varchar("project_timeline", { length: 100 }),
    additionalRequirements: text("additional_requirements"),
    consent: boolean("consent").notNull().default(false),
    sourcePage: varchar("source_page", { length: 200 }).notNull().default("/start-project"),
    submissionFingerprint: varchar("submission_fingerprint", { length: 64 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    fingerprintCreatedIdx: index("leads_fingerprint_created_idx").on(
      table.submissionFingerprint,
      table.createdAt
    ),
    createdAtIdx: index("leads_created_at_idx").on(table.createdAt),
  })
);

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
