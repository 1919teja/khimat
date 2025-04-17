import { AIRecommendation } from '@/types';
import { Button } from '@/components/ui/button';

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
  return (
    <div className="mb-6">
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white rounded-xl p-6 shadow-lg border border-purple-400">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-0">AI Suggestion</h2>
            <p className="text-sm text-purple-200">Based on your preferences, we suggest:</p>
          </div>
        </div>
        
        <div className="bg-purple-900/30 p-4 rounded-lg mb-4 border border-purple-500/20">
          <p className="mb-0 text-purple-100">{recommendation.reasoning}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-sm font-medium text-purple-200">AI-powered recommendation</span>
          </div>
          <Button 
            onClick={onSelectRecommended}
            className="bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 text-white font-medium"
          >
            Select Recommended Option
          </Button>
        </div>
      </div>
    </div>
  );
}