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

  const httpServer = createServer(app);
  return httpServer;
}