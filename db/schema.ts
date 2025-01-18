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

export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull()
});

export type Service = typeof services.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type GalleryItem = typeof gallery.$inferSelect;

export const insertServiceSchema = createInsertSchema(services);
export const insertBookingSchema = createInsertSchema(bookings);
export const insertGallerySchema = createInsertSchema(gallery);
