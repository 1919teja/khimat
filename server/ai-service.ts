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
      console.log("No options provided for AI recommendation");
      return null;
    }
    
    console.log(`API Key available: ${process.env.GOOGLE_API_KEY ? 'Yes' : 'No'}`);
    console.log(`Available options for AI: ${options.length}`);
    console.log(`Using Gemini model: gemini-1.5-flash`);

    // Create a prompt for the AI
    const prompt = `
      I need your expert recommendation for shipping a package globally from ${origin} to ${destination}.
      
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
      Consider factors like price, delivery speed, reliability based on the service description, customs expertise for international shipments, and overall value for money.
      If the shipping appears to be international, give preference to carriers with international expertise.
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
    console.log("Sending request to Google Gemini AI...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("Received response from Gemini AI");
    console.log("Response text length:", text.length);
    
    // Extract the JSON object from the response
    // The response might contain markdown formatting or additional text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      console.log("Found JSON in AI response");
      const jsonText = jsonMatch[0];
      
      try {
        const recommendation = JSON.parse(jsonText) as AIRecommendation;
        console.log("Successfully parsed AI recommendation:", recommendation.bestOption.name);
        return recommendation;
      } catch (jsonError) {
        console.error("Error parsing JSON from AI response:", jsonError);
        console.log("JSON text:", jsonText);
        return null;
      }
    } else {
      console.log("No JSON found in AI response");
      console.log("AI response text (truncated):", text.substring(0, 200) + "...");
    }
    
    return null;
  } catch (error) {
    console.error("Error generating AI recommendation:", error);
    return null;
  }
}