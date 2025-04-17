import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { compareRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Compare API endpoint
  app.post("/api/compare", async (req, res) => {
    try {
      // Validate the request body using the schema
      const parsedBody = compareRequestSchema.safeParse(req.body);
      
      if (!parsedBody.success) {
        return res.status(400).json({ error: parsedBody.error.message });
      }
      
      // Extract query parameters
      const sortBy = req.query.sort as string || "price_low";
      const filterProvider = req.query.filter as string || "all";
      
      // Get the comparison results
      const compareRequest = parsedBody.data;
      const results = await storage.compareOptions(compareRequest, sortBy, filterProvider);
      
      return res.json(results);
    } catch (error) {
      console.error("Error comparing options:", error);
      return res.status(500).json({ error: "Failed to compare shipping options" });
    }
  });

  // Return all providers (for testing/debugging)
  app.get("/api/providers", async (req, res) => {
    try {
      const providers = await storage.getAllProviders();
      return res.json(providers);
    } catch (error) {
      console.error("Error fetching providers:", error);
      return res.status(500).json({ error: "Failed to fetch providers" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
