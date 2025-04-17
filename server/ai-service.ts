import { GoogleGenerativeAI } from "@google/generative-ai";
import { LogisticsProvider } from "@shared/schema";

// Initialize the Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// Get the generative model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface AIRecommendation {
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
}

/**
 * Generate an AI recommendation based on the given logistics options
 */
export async function generateRecommendation(
  options: LogisticsProvider[],
  origin: string,
  destination: string,
  weight: number,
  weightUnit: string
): Promise<AIRecommendation | null> {
  try {
    if (!options || options.length === 0) {
      return null;
    }

    // Create a prompt for the AI
    const prompt = `
      I need your expert recommendation for shipping a package in India.
      
      SHIPMENT DETAILS:
      - Origin: ${origin}
      - Destination: ${destination}
      - Package weight: ${weight} ${weightUnit}
      
      AVAILABLE OPTIONS:
      ${options.map((option, index) => `
        Option ${index + 1}: ${option.name} (${option.provider})
        - Price: ₹${option.price}
        - Delivery time: ${option.minDays}-${option.maxDays} days
        - Service type: ${option.serviceType}
        - Insurance: ${option.hasInsurance ? 'Yes' : 'No'}${option.hasInsurance && option.insuranceType ? ` (${option.insuranceType})` : ''}
        - Description: ${option.description}
      `).join('\n')}
      
      Based on these options, please recommend the best choice and explain your reasoning. 
      Consider factors like price, delivery speed, reliability based on the service description, and overall value for money.
      Format your response as JSON with the following structure:
      {
        "bestOption": {
          "id": number,
          "name": string,
          "provider": string
        },
        "reasoning": string,
        "factors": {
          "price": string,
          "deliverySpeed": string,
          "reliability": string,
          "valueForMoney": string
        }
      }
    `;

    // Generate content from the model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract the JSON object from the response
    // The response might contain markdown formatting or additional text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const jsonText = jsonMatch[0];
      const recommendation = JSON.parse(jsonText) as AIRecommendation;
      return recommendation;
    }
    
    return null;
  } catch (error) {
    console.error("Error generating AI recommendation:", error);
    return null;
  }
}