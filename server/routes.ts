import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { services, cases } from "@db/schema";
import { eq } from "drizzle-orm";
import { processUserMessage } from "./shopify-mcp";

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

  // Shop Assistant API
  app.post("/api/shop-assistant", async (req, res, next) => {
    try {
      const { message, conversationHistory, cartId } = req.body;
      
      if (!message || typeof message !== 'string') {
        throw new ApiError(400, "Message is required");
      }

      const result = await processUserMessage(
        message,
        conversationHistory || [],
        cartId
      );

      res.json(result);
    } catch (error) {
      console.error("Shop assistant error:", error);
      next(new ApiError(500, "Failed to process message"));
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}