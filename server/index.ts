import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

  // Global error handling middleware
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // Log the error for debugging
    console.error('Error:', err);

    // Don't expose internal error details in production
    const isProduction = process.env.NODE_ENV === 'production';

    const status = err.status || err.statusCode || 500;
    const message = isProduction && status === 500 
      ? 'Internal Server Error'
      : err.message || 'Internal Server Error';

    // Send error response
    res.status(status).json({
      error: {
        message,
        status,
        // Only include stack trace in development
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