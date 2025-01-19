import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import rateLimit from "express-rate-limit";
import { z } from "zod";

const app = express();

// Trust proxy - required for proper rate limiting behind a proxy
app.set('trust proxy', 1);

// Basic security and performance middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: { message: "Too many requests, please try again later", status: 429 } }
});
app.use("/api", limiter);

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = registerRoutes(app);

  // Enhanced error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    // Log error for debugging
    console.error('Error:', {
      name: err.name,
      message: err.message,
      stack: err.stack,
      status: err.status
    });

    // Don't expose internal error details in production
    const isProduction = process.env.NODE_ENV === 'production';

    let status = err.status || 500;
    let message = err.message || 'Internal Server Error';

    // Handle specific error types
    if (err instanceof z.ZodError) {
      status = 400;
      message = `Validation error: ${err.errors[0].message}`;
    } else if (err.name === 'ApiError') {
      status = err.status;
      message = err.message;
    } else if (err.code === '23505') { // PostgreSQL unique violation
      status = 409;
      message = 'Resource already exists';
    }

    // Send error response
    res.status(status).json({
      error: {
        message: isProduction && status === 500 ? 'Internal Server Error' : message,
        status,
        ...((!isProduction && err.stack) ? { stack: err.stack } : {})
      }
    });
  });

  // Setup vite or static file serving
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Start server
  const PORT = 5000;
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
  });
})();