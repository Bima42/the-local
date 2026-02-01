import { pgTable, pgEnum, uuid, text, timestamp, real, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sessions } from "./sessions";

export const painTypeEnum = pgEnum("pain_type", [
  "sharp",
  "dull",
  "burning",
  "tingling",
  "throbbing",
  "cramping",
  "shooting",
  "other",
]);

export const painPoints = pgTable("pain_points", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: uuid("session_id")
    .references(() => sessions.id, { onDelete: "cascade" })
    .notNull(),

  posX: real("pos_x").notNull(),
  posY: real("pos_y").notNull(),
  posZ: real("pos_z").notNull(),

  meshName: text("mesh_name"),

  // Content
  label: text("label").notNull().default(""),
  type: painTypeEnum("type").notNull().default("other"),
  notes: text("notes"),
  rating: integer("rating").notNull().default(5),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const painPointsRelations = relations(painPoints, ({ one }) => ({
  session: one(sessions, {
    fields: [painPoints.sessionId],
    references: [sessions.id],
  }),
}));

export type PainPoint = typeof painPoints.$inferSelect;
export type NewPainPoint = typeof painPoints.$inferInsert;
export type PainType = (typeof painTypeEnum.enumValues)[number];