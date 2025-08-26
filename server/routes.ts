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
  // Health check endpoint for deployment
  app.get("/health", (_req, res) => {
    res.status(200).json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // Root endpoint
  app.get("/api/health", (_req, res) => {
    res.status(200).json({ 
      status: "ok", 
      message: "API is running",
      timestamp: new Date().toISOString()
    });
  });

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

      if (category && typeof category !== 'string') {
        throw new ApiError(400, "Invalid category parameter");
      }

      const query = db.select().from(cases);
      const results = category 
        ? await query.where(eq(cases.category, category))
        : await query;

      if (results.length === 0 && category) {
        throw new ApiError(404, `No cases found for category: ${category}`);
      }

      res.json(results);
    } catch (error) {
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