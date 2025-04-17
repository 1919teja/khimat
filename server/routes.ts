import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { compareRequestSchema, signupSchema, signinSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
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

  // Auth endpoints
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const parsed = signupSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
      }

      const { email, password, name } = parsed.data;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({ email, password: hashedPassword, name });
      
      const token = jwt.sign({ userId: user.id }, JWT_SECRET);
      return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
      console.error("Error signing up:", error);
      return res.status(500).json({ error: "Failed to sign up" });
    }
  });

  app.post("/api/auth/signin", async (req, res) => {
    try {
      const parsed = signinSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.message });
      }

      const { email, password } = parsed.data;
      const user = await storage.getUserByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET);
      return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
      console.error("Error signing in:", error);
      return res.status(500).json({ error: "Failed to sign in" });
    }
  });

  // Shipment endpoints
  app.post("/api/shipments", async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "No token provided" });
      }

      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      const shipment = await storage.createShipment({
        ...req.body,
        userId: decoded.userId
      });

      return res.json(shipment);
    } catch (error) {
      console.error("Error creating shipment:", error);
      return res.status(500).json({ error: "Failed to create shipment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
