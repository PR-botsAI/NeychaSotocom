import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { services, cases } from "@db/schema";
import { eq } from "drizzle-orm";
import { processUserMessage } from "./shopify-mcp";
import { processUserMessageWithMCP } from "./mcp-client";

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

  // Shop Assistant API with MCP Integration
  app.post("/api/shop-assistant", async (req, res, next) => {
    try {
      const { message, conversationHistory } = req.body;
      
      if (!message || typeof message !== 'string') {
        throw new ApiError(400, "Message is required");
      }

      console.log('[API] Processing message with MCP integration');
      const result = await processUserMessageWithMCP(
        message,
        conversationHistory || []
      );

      res.json(result);
    } catch (error) {
      console.error("Shop assistant error:", error);
      
      // Fallback to old system if MCP fails
      try {
        console.log('[API] MCP failed, falling back to basic system');
        const fallbackResult = await processUserMessage(
          req.body.message,
          req.body.conversationHistory || [],
          req.body.cartId
        );
        res.json(fallbackResult);
      } catch (fallbackError) {
        console.error("Fallback also failed:", fallbackError);
        next(new ApiError(500, "Failed to process message"));
      }
    }
  });

  // MCP Server control endpoint
  app.post("/api/mcp/start", async (req, res, next) => {
    try {
      console.log('[MCP] Starting Python MCP server for OpenAI integration...');
      
      // Start the Python MCP server
      const { spawn } = await import('child_process');
      const mcpProcess = spawn('python3', ['mcp_server.py'], {
        stdio: 'pipe',
        env: { ...process.env, PYTHONUNBUFFERED: '1' }
      });
      
      mcpProcess.stdout?.on('data', (data) => {
        console.log('[MCP Server]', data.toString());
      });
      
      mcpProcess.stderr?.on('data', (data) => {
        console.log('[MCP Server Error]', data.toString());
      });
      
      res.json({ 
        success: true, 
        message: "MCP Server started successfully",
        endpoint: "http://localhost:8000/sse",
        tools: ["search", "fetch"],
        integration: "Connect this URL in OpenAI ChatGPT MCP settings"
      });
    } catch (error) {
      console.error("MCP server start error:", error);
      next(new ApiError(500, "Failed to start MCP server"));
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}