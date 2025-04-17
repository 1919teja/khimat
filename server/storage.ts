import { CompareRequest, LogisticsProvider, logisticsProviders } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, and, lt } from "drizzle-orm";

// Sample logistics data for database seeding
const LOGISTICS_DATA: LogisticsProvider[] = [
  // Indian logistics providers
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
  },
  
  // International Shipping Providers
  {
    id: 9,
    name: "DHL International",
    provider: "dhl",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/DHL_Logo.svg/2560px-DHL_Logo.svg.png",
    price: 1249,
    minDays: 3,
    maxDays: 5,
    serviceType: "International Express",
    description: "Global delivery service with customs clearance and real-time tracking",
    hasInsurance: true,
    insuranceType: "Global Protection"
  },
  {
    id: 10,
    name: "UPS Worldwide",
    provider: "ups",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/United_Parcel_Service_logo_2014.svg/2560px-United_Parcel_Service_logo_2014.svg.png",
    price: 1399,
    minDays: 2,
    maxDays: 4,
    serviceType: "International Premium",
    description: "Premium international shipping with door-to-door service and guaranteed delivery times",
    hasInsurance: true,
    insuranceType: "Premium Global"
  },
  {
    id: 11,
    name: "FedEx International",
    provider: "fedex",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/FedEx_Ground_logo.svg/2560px-FedEx_Ground_logo.svg.png",
    price: 1499,
    minDays: 1,
    maxDays: 3,
    serviceType: "International Priority",
    description: "Time-definite international delivery with customs clearance and money-back guarantee",
    hasInsurance: true,
    insuranceType: "Global Premium"
  },
  {
    id: 12,
    name: "Aramex International",
    provider: "aramex",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Aramex_logo.svg/2560px-Aramex_logo.svg.png",
    price: 1189,
    minDays: 4,
    maxDays: 7,
    serviceType: "International Standard",
    description: "Reliable international shipping with good coverage in Middle East and Asian countries",
    hasInsurance: true,
    insuranceType: "Standard Protection"
  },
  {
    id: 13,
    name: "TNT Express",
    provider: "tnt",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/TNT_Express_Logo.svg/2560px-TNT_Express_Logo.svg.png",
    price: 1299,
    minDays: 3,
    maxDays: 6,
    serviceType: "International Express",
    description: "International express delivery service with good European coverage",
    hasInsurance: true,
    insuranceType: "Express Protection"
  },
  {
    id: 14,
    name: "DTDC International",
    provider: "dtdc",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/DTDC_logo.svg/2560px-DTDC_logo.svg.png",
    price: 999,
    minDays: 5,
    maxDays: 8,
    serviceType: "International Economy",
    description: "Affordable international shipping option for non-urgent deliveries",
    hasInsurance: false,
    insuranceType: ""
  },
  {
    id: 15,
    name: "DHL Economy Select",
    provider: "dhl",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/DHL_Logo.svg/2560px-DHL_Logo.svg.png",
    price: 949,
    minDays: 6,
    maxDays: 10,
    serviceType: "International Economy",
    description: "Cost-effective international shipping for less time-sensitive deliveries",
    hasInsurance: true,
    insuranceType: "Standard Protection"
  },
  {
    id: 16,
    name: "SF Express International",
    provider: "sf",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/SF_Express_logo.svg/2560px-SF_Express_logo.svg.png",
    price: 1099,
    minDays: 3,
    maxDays: 5,
    serviceType: "International Express",
    description: "Fast international delivery with excellent coverage in China and East Asia",
    hasInsurance: true,
    insuranceType: "Express Protection"
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
  // Helper method to determine if a shipment is international
  private isInternationalShipment(origin: string, destination: string): boolean {
    // List of major Indian cities to check against
    const indianCities = [
      'mumbai', 'delhi', 'bangalore', 'hyderabad', 'chennai', 'kolkata', 
      'pune', 'ahmedabad', 'jaipur', 'lucknow', 'kanpur', 'nagpur', 'indore', 
      'thane', 'bhopal', 'visakhapatnam', 'pimpri-chinchwad', 'patna', 'vadodara', 
      'ghaziabad', 'ludhiana', 'agra', 'nashik', 'faridabad', 'meerut', 'rajkot', 
      'varanasi', 'srinagar', 'aurangabad', 'dhanbad', 'amritsar', 'navi mumbai', 
      'allahabad', 'ranchi', 'howrah', 'coimbatore', 'jabalpur', 'gwalior', 'vijayawada', 
      'jodhpur', 'madurai', 'raipur', 'kota', 'chandigarh', 'guwahati', 'solapur', 
      'hubli', 'dharwad', 'bareilly', 'moradabad', 'mysore', 'gurgaon', 'aligarh', 
      'warangal', 'dehradun'
    ];
    
    // Check if origin and destination are both Indian cities
    const originLower = origin.toLowerCase();
    const destinationLower = destination.toLowerCase();
    
    const isOriginIndian = indianCities.some(city => originLower.includes(city));
    const isDestinationIndian = indianCities.some(city => destinationLower.includes(city));
    
    // If both are Indian cities, it's a domestic shipment
    // Otherwise, it's international
    return !(isOriginIndian && isDestinationIndian);
  }
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
    
    // Check if this is an international shipment
    const isInternational = this.isInternationalShipment(compareRequest.origin, compareRequest.destination);
    
    // Apply pricing algorithm with international consideration
    let results = providers.map(provider => {
      // Make a copy of the provider to modify
      const modifiedProvider = { ...provider };

      // Apply weight-based pricing adjustment
      const weightInKg = compareRequest.weightUnit === "g" 
        ? compareRequest.weight / 1000 
        : compareRequest.weight;
      
      // Base price from the database
      let adjustedPrice = modifiedProvider.price;
      
      // For domestic shipments, filter out international providers
      if (!isInternational && modifiedProvider.serviceType.toLowerCase().includes("international")) {
        modifiedProvider.price = 999999; // Filter out later
        return modifiedProvider;
      }
      
      // For international shipments, filter out domestic-only providers
      if (isInternational && !modifiedProvider.serviceType.toLowerCase().includes("international")) {
        modifiedProvider.price = 999999; // Filter out later
        return modifiedProvider;
      }
      
      // Add appropriate fee per kg above 1kg - higher for international
      if (weightInKg > 1) {
        const perKgRate = isInternational ? 250 : 50; // ₹250 per kg for international, ₹50 for domestic
        adjustedPrice += Math.round((weightInKg - 1) * perKgRate);
      }

      // Apply dimensional weight if provided
      if (compareRequest.dimensions) {
        const { length, width, height, unit } = compareRequest.dimensions;
        // Convert to cubic cm if in inches
        const volumeCm = unit === "in"
          ? length * width * height * 16.39
          : length * width * height;
        
        // Volumetric weight formula: volume (cm³) / 5000 for domestic, /6000 for international
        const divisor = isInternational ? 6000 : 5000;
        const volumetricWeight = volumeCm / divisor;
        
        // Use the greater of actual weight or volumetric weight
        if (volumetricWeight > weightInKg) {
          const perKgRate = isInternational ? 250 : 50;
          adjustedPrice += Math.round((volumetricWeight - weightInKg) * perKgRate);
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
