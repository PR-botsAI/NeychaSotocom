import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { services, bookings, cases } from "@db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// Validation schemas
const bookingSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string(),
  serviceId: z.number(),
  date: z.string().datetime(),
  status: z.string().optional().default("pending")
});

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export function registerRoutes(app: Express): Server {
  // Services
  app.get("/api/services", async (_req, res, next) => {
    try {
      const allServices = await db.select().from(services);
      res.json(allServices);
    } catch (error) {
      next(new ApiError(500, "Failed to fetch services"));
    }
  });

  // Cases (Before/After Gallery)
  app.get("/api/cases", async (req, res, next) => {
    try {
      const category = req.query.category as string;
      const query = db.select().from(cases);

      const results = category 
        ? await query.where(eq(cases.category, category))
        : await query;

      res.json(results);
    } catch (error) {
      next(new ApiError(500, "Failed to fetch cases"));
    }
  });

  // Bookings
  app.post("/api/bookings", async (req, res, next) => {
    try {
      const validatedData = bookingSchema.parse(req.body);
      const booking = await db.insert(bookings).values({
        ...validatedData,
        date: new Date(validatedData.date), // Convert string to Date object
        createdAt: new Date()
      }).returning();
      res.json(booking[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ApiError(400, `Invalid booking data: ${error.errors[0].message}`));
      } else {
        next(new ApiError(500, "Failed to create booking"));
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}