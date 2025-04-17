import { pgTable, text, serial, integer, boolean, jsonb, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Shipments table
export const shipments = pgTable("shipments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  providerId: integer("provider_id").references(() => logisticsProviders.id),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  status: text("status").notNull().default("pending"),
  weight: real("weight").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Auth schemas
export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2)
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

// Logistics provider table
export const logisticsProviders = pgTable("logistics_providers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  provider: text("provider").notNull(),
  logoUrl: text("logo_url").notNull(),
  price: integer("price").notNull(),
  minDays: integer("min_days").notNull(),
  maxDays: integer("max_days").notNull(),
  serviceType: text("service_type").notNull(),
  description: text("description").notNull(),
  hasInsurance: boolean("has_insurance").default(false),
  insuranceType: text("insurance_type").notNull().default(""),
});

// Compare Request Schema
export const compareRequestSchema = z.object({
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  weight: z.number().positive("Weight must be positive"),
  weightUnit: z.enum(["kg", "g"]),
  dimensions: z
    .object({
      length: z.number().nonnegative(),
      width: z.number().nonnegative(),
      height: z.number().nonnegative(),
      unit: z.enum(["cm", "in"]),
    })
    .nullable()
    .optional(),
  serviceType: z.string().optional(),
});

export const insertProviderSchema = createInsertSchema(logisticsProviders);

export type LogisticsProvider = typeof logisticsProviders.$inferSelect;
export type InsertProvider = typeof logisticsProviders.$inferInsert;
export type CompareRequest = z.infer<typeof compareRequestSchema>;
