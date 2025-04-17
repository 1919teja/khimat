import { CompareRequest, LogisticsProvider, logisticsProviders } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, and, lt } from "drizzle-orm";

// Sample logistics data for database seeding
const LOGISTICS_DATA: LogisticsProvider[] = [
  {
    id: 1,
    name: "Delhivery",
    provider: "delhivery",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Delhivery_logo.svg/2560px-Delhivery_logo.svg.png",
    price: 349,
    minDays: 2,
    maxDays: 3,
    serviceType: "Express Delivery",
    description: "Doorstep pickup and delivery with real-time tracking",
    hasInsurance: true,
    insuranceType: "Shipment Protection"
  },
  {
    id: 2,
    name: "Blue Dart",
    provider: "bluedart",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Blue_Dart_logo.svg/2560px-Blue_Dart_logo.svg.png",
    price: 389,
    minDays: 3,
    maxDays: 4,
    serviceType: "Standard Delivery",
    description: "Reliable delivery with package insurance up to ₹10,000",
    hasInsurance: true,
    insuranceType: "Shipment Protection"
  },
  {
    id: 3,
    name: "DTDC",
    provider: "dtdc",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/DTDC_logo.svg/2560px-DTDC_logo.svg.png",
    price: 299,
    minDays: 3,
    maxDays: 5,
    serviceType: "Standard Delivery",
    description: "Economical shipping option with wide coverage across India",
    hasInsurance: false,
    insuranceType: ""
  },
  {
    id: 4,
    name: "FedEx",
    provider: "fedex",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/FedEx_Ground_logo.svg/2560px-FedEx_Ground_logo.svg.png",
    price: 549,
    minDays: 1,
    maxDays: 2,
    serviceType: "Premium Express",
    description: "Priority handling with guaranteed delivery and comprehensive insurance",
    hasInsurance: true,
    insuranceType: "Premium Insurance"
  },
  {
    id: 5,
    name: "Ecom Express",
    provider: "ecom",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Ecom_Express_Logo.svg/2560px-Ecom_Express_Logo.svg.png",
    price: 329,
    minDays: 3,
    maxDays: 4,
    serviceType: "Standard Delivery",
    description: "Cost-effective delivery solution with good coverage in tier 2 and 3 cities",
    hasInsurance: false,
    insuranceType: ""
  },
  {
    id: 6,
    name: "Delhivery",
    provider: "delhivery",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Delhivery_logo.svg/2560px-Delhivery_logo.svg.png",
    price: 479,
    minDays: 1,
    maxDays: 2,
    serviceType: "Premium Express",
    description: "Ultra-fast delivery with priority handling and real-time tracking",
    hasInsurance: true,
    insuranceType: "Premium Insurance"
  },
  {
    id: 7,
    name: "Professional Couriers",
    provider: "professional",
    logoUrl: "https://seeklogo.com/images/T/the-professional-couriers-logo-70A8E88AC5-seeklogo.com.png",
    price: 279,
    minDays: 4,
    maxDays: 6,
    serviceType: "Economy",
    description: "Low-cost delivery for non-urgent shipments",
    hasInsurance: false,
    insuranceType: ""
  },
  {
    id: 8,
    name: "Ekart Logistics",
    provider: "ekart",
    logoUrl: "https://cutshort.io/blog/wp-content/uploads/2023/09/Ekart-Logo.png",
    price: 309,
    minDays: 3,
    maxDays: 5,
    serviceType: "Standard Delivery",
    description: "Reliable delivery service with extensive reach in India",
    hasInsurance: true,
    insuranceType: "Basic Protection"
  }
];

export interface IStorage {
  getAllProviders(): Promise<LogisticsProvider[]>;
  compareOptions(
    compareRequest: CompareRequest,
    sortBy?: string,
    filterProvider?: string
  ): Promise<LogisticsProvider[]>;
  initializeDatabase(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async initializeDatabase(): Promise<void> {
    // Check if we already have data in the database
    const existingProviders = await db.select().from(logisticsProviders);
    
    // Only seed if there's no data
    if (existingProviders.length === 0) {
      console.log("Seeding database with initial logistics providers data...");
      // Insert the sample data
      await db.insert(logisticsProviders).values(LOGISTICS_DATA);
      console.log("Database seeding complete.");
    } else {
      console.log(`Database already contains ${existingProviders.length} providers.`);
    }
  }

  async getAllProviders(): Promise<LogisticsProvider[]> {
    return await db.select().from(logisticsProviders);
  }

  async compareOptions(
    compareRequest: CompareRequest,
    sortBy: string = "price_low",
    filterProvider: string = "all"
  ): Promise<LogisticsProvider[]> {
    // First, get all providers
    let providers = await this.getAllProviders();
    
    // Apply the same pricing algorithm as before
    let results = providers.map(provider => {
      // Make a copy of the provider to modify
      const modifiedProvider = { ...provider };

      // Apply weight-based pricing adjustment
      const weightInKg = compareRequest.weightUnit === "g" 
        ? compareRequest.weight / 1000 
        : compareRequest.weight;
      
      // Base price from the database
      let adjustedPrice = modifiedProvider.price;
      
      // Add 50 rupees per kg above 1kg
      if (weightInKg > 1) {
        adjustedPrice += Math.round((weightInKg - 1) * 50);
      }

      // Apply dimensional weight if provided
      if (compareRequest.dimensions) {
        const { length, width, height, unit } = compareRequest.dimensions;
        // Convert to cubic cm if in inches
        const volumeCm = unit === "in"
          ? length * width * height * 16.39
          : length * width * height;
        
        // Volumetric weight formula: volume (cm³) / 5000
        const volumetricWeight = volumeCm / 5000;
        
        // Use the greater of actual weight or volumetric weight
        if (volumetricWeight > weightInKg) {
          adjustedPrice += Math.round((volumetricWeight - weightInKg) * 50);
        }
      }

      // Apply service type filter if specified
      if (compareRequest.serviceType && compareRequest.serviceType !== 'all') {
        // Simple matching based on service type contains the requested type
        if (!modifiedProvider.serviceType.toLowerCase().includes(compareRequest.serviceType.toLowerCase())) {
          // Mark with very high price to filter out later
          modifiedProvider.price = 999999;
        }
      }
      
      // Set the adjusted price
      modifiedProvider.price = adjustedPrice;
      
      return modifiedProvider;
    });

    // Filter by provider if specified
    if (filterProvider && filterProvider !== 'all') {
      results = results.filter(provider => 
        provider.provider.toLowerCase() === filterProvider.toLowerCase()
      );
    }

    // Filter out any providers that were marked with very high price
    results = results.filter(provider => provider.price < 999999);

    // Sort results based on the sort criteria
    switch (sortBy) {
      case 'price_low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'time_fast':
        results.sort((a, b) => (a.minDays + a.maxDays) / 2 - (b.minDays + b.maxDays) / 2);
        break;
      case 'time_slow':
        results.sort((a, b) => (b.minDays + b.maxDays) / 2 - (a.minDays + a.maxDays) / 2);
        break;
      default:
        results.sort((a, b) => a.price - b.price);
    }

    return results;
  }
}

export const storage = new DatabaseStorage();
