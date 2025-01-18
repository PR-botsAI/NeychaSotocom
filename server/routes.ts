import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { services, bookings, gallery } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Services
  app.get("/api/services", async (_req, res) => {
    const allServices = await db.select().from(services);
    res.json(allServices);
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

  // Gallery
  app.get("/api/gallery", async (req, res) => {
    const category = req.query.category as string;
    let query = db.select().from(gallery);
    
    if (category) {
      query = query.where(eq(gallery.category, category));
    }
    
    const items = await query;
    res.json(items);
  });

  const httpServer = createServer(app);
  return httpServer;
}
