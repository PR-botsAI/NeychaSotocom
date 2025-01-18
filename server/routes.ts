import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { services, bookings, cases } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Services
  app.get("/api/services", async (_req, res) => {
    const allServices = await db.select().from(services);
    res.json(allServices);
  });

  // Cases (Before/After Gallery)
  app.get("/api/cases", async (req, res) => {
    try {
      const category = req.query.category as string;
      const query = db.select().from(cases);

      const results = category 
        ? await query.where(eq(cases.category, category))
        : await query;

      res.json(results);
    } catch (error) {
      console.error('Error fetching cases:', error);
      res.status(500).json({ error: "Failed to fetch cases" });
    }
  });

  // Bookings
  app.post("/api/bookings", async (req, res) => {
    try {
      const booking = await db.insert(bookings).values(req.body).returning();
      res.json(booking[0]);
    } catch (error) {
      res.status(400).json({ error: "Invalid booking data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}