// City type for autocomplete
export interface City {
  name: string;
  state: string;
  website?: string; // Add this line - note the ? makes it optional

}


// Shipment form data structure
export interface ShipmentFormData {
  origin: string;
  destination: string;
  serviceType: string;
  weight: number;
  weightUnit: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: string;
  } | null;
  website?: string; // Add this line - note the ? makes it optional

}

// Logistics option structure
export interface LogisticsOption {
  id: number;
  name: string;
  price: number;
  minDays: number;
  maxDays: number;
  serviceType: string;
  description: string;
  hasInsurance: boolean;
  insuranceType?: string;
  logoUrl: string;
  provider: string;
  website?: string; // Add this line - note the ? makes it optional

}

// Compare request structure
export interface CompareRequest {
  origin: string;
  destination: string;
  weight: number;
  weightUnit: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  serviceType?: string;
  website?: string; // Add this line - note the ? makes it optional

}

// AI Recommendation interface
export interface AIRecommendation {
  bestOption: {
    id: number;
    name: string;
    provider: string;
  };
  reasoning: string;
  factors: {
    price: string;
    deliverySpeed: string;
    reliability: string;
    valueForMoney: string;
  };
  website?: string; // Add this line - note the ? makes it optional

}

// Compare response structure
export interface CompareResponse {
  options: LogisticsOption[];
  recommendation?: AIRecommendation | null;
  website?: string; // Add this line - note the ? makes it optional

}
