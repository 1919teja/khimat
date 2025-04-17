import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { compareRequestSchema } from "@shared/schema";
import { z } from "zod";
import { generateRecommendation } from "./ai-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize database and seed with initial data if needed
  try {
    await storage.initializeDatabase();
    console.log("Database initialization completed successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
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
      
      // Generate AI recommendation if requested
      const includeRecommendation = req.query.recommendation === "true";
      let recommendation = null;
      
      console.log("Include AI recommendation:", includeRecommendation);
      
      if (includeRecommendation) {
        try {
          console.log("Generating AI recommendation for", compareRequest.origin, "to", compareRequest.destination);
          
          recommendation = await generateRecommendation(
            results,
            compareRequest.origin,
            compareRequest.destination,
            compareRequest.weight,
            compareRequest.weightUnit
          );
          
          console.log("AI recommendation result:", recommendation ? "Success" : "Null");
        } catch (aiError) {
          console.error("Error generating AI recommendation:", aiError);
          // Continue without recommendation if there's an error
        }
      }
      
      return res.json({
        options: results,
        recommendation
      });
    } catch (error) {
      console.error("Error comparing options:", error);
      return res.status(500).json({ error: "Failed to compare shipping options" });
    }
  });

  // AI Recommendation endpoint
  app.post("/api/recommend", async (req, res) => {
    try {
      // Validate the request body using the schema
      const parsedBody = compareRequestSchema.safeParse(req.body);
      
      if (!parsedBody.success) {
        return res.status(400).json({ error: parsedBody.error.message });
      }
      
      // Get the comparison results
      const compareRequest = parsedBody.data;
      const results = await storage.compareOptions(compareRequest);
      
      // Generate AI recommendation
      const recommendation = await generateRecommendation(
        results,
        compareRequest.origin,
        compareRequest.destination,
        compareRequest.weight,
        compareRequest.weightUnit
      );
      
      return res.json({ recommendation });
    } catch (error) {
      console.error("Error generating recommendation:", error);
      return res.status(500).json({ error: "Failed to generate AI recommendation" });
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
