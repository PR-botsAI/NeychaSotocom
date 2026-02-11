import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@db/schema";

if (!process.env.DATABASE_URL) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provision a database?",
    );
  } else {
    console.warn(
      "Warning: DATABASE_URL is not set. The app will run without a database connection in development mode.",
    );
  }
}

export const db = process.env.DATABASE_URL
  ? drizzle({
    connection: process.env.DATABASE_URL,
    schema,
    ws: ws,
  })
  : null;
