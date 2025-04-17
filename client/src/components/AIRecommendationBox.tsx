import { AIRecommendation } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface AIRecommendationBoxProps {
  recommendation: AIRecommendation;
  options: any[];
  onSelectRecommended: () => void;
}

export default function AIRecommendationBox({ 
  recommendation, 
  options, 
  onSelectRecommended 
}: AIRecommendationBoxProps) {
  const [showDetails, setShowDetails] = useState(false);
  
  // Find the recommended option from the list to get its details
  const recommendedOption = options.find(option => 
    option.id === recommendation.bestOption.id && 
    option.provider === recommendation.bestOption.provider
  );

  if (!recommendedOption) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md p-6 mb-6 border border-blue-100">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-primary w-5 h-5"
            >
              <path d="M12 2v1" />
              <path d="M12 21v-1" />
              <path d="M4.2 4.2l.8.8" />
              <path d="M19 19l-.8-.8" />
              <path d="M2 12h1" />
              <path d="M21 12h-1" />
              <path d="M4.2 19.8l.8-.8" />
              <path d="M19 5l-.8.8" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">AI Recommendation</h3>
            <p className="text-sm text-gray-600">Based on your requirements</p>
          </div>
        </div>
        <Badge className="bg-primary text-white">Best Option</Badge>
      </div>

      <div className="mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 rounded-lg">
          <div className="flex-shrink-0 w-16 h-10 bg-gray-50 rounded-md flex items-center justify-center p-2">
            <img 
              src={recommendedOption.logoUrl} 
              alt={recommendedOption.name} 
              className="max-w-full max-h-full object-contain" 
            />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold">{recommendedOption.name}</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-600">
              <span>₹{recommendedOption.price}</span>
              <span>{recommendedOption.minDays}-{recommendedOption.maxDays} days</span>
              <span>{recommendedOption.serviceType}</span>
            </div>
          </div>
          <Button onClick={onSelectRecommended} className="bg-primary hover:bg-primary/90">
            Select
          </Button>
        </div>

        <div className="mt-4">
          <div className="mb-2">
            <p className="text-gray-700">{recommendation.reasoning}</p>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowDetails(!showDetails)}
            className="text-primary hover:text-primary/90 hover:bg-blue-50 p-0 h-auto flex items-center"
          >
            <span>{showDetails ? 'Hide details' : 'Show details'}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className={`ml-1 transition-transform ${showDetails ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </Button>
          
          {showDetails && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded p-3">
                <h5 className="font-medium text-sm mb-1 text-gray-700">Price</h5>
                <p className="text-sm text-gray-600">{recommendation.factors.price}</p>
              </div>
              <div className="bg-white rounded p-3">
                <h5 className="font-medium text-sm mb-1 text-gray-700">Delivery Speed</h5>
                <p className="text-sm text-gray-600">{recommendation.factors.deliverySpeed}</p>
              </div>
              <div className="bg-white rounded p-3">
                <h5 className="font-medium text-sm mb-1 text-gray-700">Reliability</h5>
                <p className="text-sm text-gray-600">{recommendation.factors.reliability}</p>
              </div>
              <div className="bg-white rounded p-3">
                <h5 className="font-medium text-sm mb-1 text-gray-700">Value For Money</h5>
                <p className="text-sm text-gray-600">{recommendation.factors.valueForMoney}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}