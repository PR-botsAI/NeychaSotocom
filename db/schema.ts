import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  duration: integer("duration").notNull(), // in minutes
  image: text("image"),
  category: text("category").notNull()
});

export const cases = pgTable("cases", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  beforeImage: text("before_image").notNull(),
  afterImage: text("after_image").notNull(),
  collageImage: text("collage_image").notNull(),
  serviceId: integer("service_id").references(() => services.id),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export type Service = typeof services.$inferSelect;
export type Case = typeof cases.$inferSelect;

export const insertServiceSchema = createInsertSchema(services);
export const insertCaseSchema = createInsertSchema(cases);

export type InsertService = typeof services.$inferInsert;
export type InsertCase = typeof cases.$inferInsert;