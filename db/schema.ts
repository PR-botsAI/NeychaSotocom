import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
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

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  serviceId: integer("service_id").references(() => services.id),
  date: timestamp("date").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow()
});

export type Service = typeof services.$inferSelect;
export type Case = typeof cases.$inferSelect;
export type Booking = typeof bookings.$inferSelect;

export const insertServiceSchema = createInsertSchema(services);
export const insertCaseSchema = createInsertSchema(cases);
export const insertBookingSchema = createInsertSchema(bookings);

export type InsertService = typeof services.$inferInsert;
export type InsertCase = typeof cases.$inferInsert;
export type InsertBooking = typeof bookings.$inferInsert;