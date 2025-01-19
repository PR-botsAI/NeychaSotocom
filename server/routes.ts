import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { services, cases } from "@db/schema";
import { eq } from "drizzle-orm";

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export function registerRoutes(app: Express): Server {
  // Test endpoint for error handling
  app.get("/api/test-error", (_req, res) => {
    res.json({ message: "Test endpoint working" });
  });

  // Services
  app.get("/api/services", async (_req, res, next) => {
    try {
      const allServices = await db.select().from(services);
      res.json(allServices);
    } catch (error) {
      console.error('Error fetching services:', error);
      next(new ApiError(500, "Failed to fetch services"));
    }
  });

  // Cases (Before/After Gallery)
  app.get("/api/cases", async (req, res, next) => {
    try {
      const category = req.query.category as string;

      // Validate category if provided
      if (category && typeof category !== 'string') {
        throw new ApiError(400, "Invalid category parameter");
      }

      const query = db.select().from(cases);
      const results = category 
        ? await query.where(eq(cases.category, category))
        : await query;

      // Check if we got any results
      if (results.length === 0 && category) {
        return res.status(404).json({
          error: {
            message: `No cases found for category: ${category}`,
            status: 404
          }
        });
      }

      res.json(results);
    } catch (error) {
      console.error('Error fetching cases:', error);

      if (error instanceof ApiError) {
        next(error);
      } else {
        next(new ApiError(500, "Failed to fetch cases"));
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}