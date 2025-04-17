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
      <div className="bg-black text-white rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold mb-1">AI Suggestion</h2>
        <p className="text-sm text-gray-300 mb-4">Based on your preferences, we suggest:</p>
        
        <p className="mb-4">{recommendation.reasoning}</p>
        
        <div className="flex justify-end">
          <Button 
            onClick={onSelectRecommended}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Select Recommended Option
          </Button>
        </div>
      </div>
    </div>
  );
}