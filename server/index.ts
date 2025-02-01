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

// Rate limiting - increased for healthcare platform needs
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Increased limit for healthcare platform
  message: { error: "Demasiadas solicitudes. Por favor, inténtalo más tarde." }
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
      if (capturedJsonResponse?.error) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse.error)}`;
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = registerRoutes(app);

  // Enhanced error handling middleware with Spanish messages
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const isProduction = process.env.NODE_ENV === 'production';
    let status = err.status || 500;
    let message = err.message || 'Error interno del servidor';

    if (err instanceof z.ZodError) {
      status = 400;
      message = `Error de validación: ${err.errors[0].message}`;
    } else if (err.code === '23505') { // PostgreSQL unique violation
      status = 409;
      message = 'El recurso ya existe';
    }

    res.status(status).json({
      error: {
        message: isProduction && status === 500 ? 'Error interno del servidor' : message,
        status
      }
    });
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const PORT = 5000;
  server.listen(PORT, "0.0.0.0", () => {
    log(`Servidor ejecutándose en el puerto ${PORT}`);
  });
})();