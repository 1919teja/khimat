import { LogisticsOption } from '@/types';
import { Button } from '@/components/ui/button';

interface ResultCardProps {
  option: LogisticsOption;
  isBestValue: boolean;
  isRecommended?: boolean;
}

export default function ResultCard({ option, isBestValue, isRecommended = false }: ResultCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-md mb-4 overflow-hidden transition-all hover:shadow-lg ${
      isRecommended 
        ? 'border-2 border-indigo-500 relative ring-2 ring-indigo-200' 
        : isBestValue 
          ? 'border-2 border-pink-500 relative' 
          : 'border border-gray-100'
    }`}>
      {isRecommended ? (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-3 h-3 mr-1"
          >
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="M20 12h2"></path>
            <path d="M2 12h2"></path>
          </svg>
          AI RECOMMENDED
        </div>
      ) : isBestValue && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          BEST VALUE
        </div>
      )}
      
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Logo Area */}
          <div className="flex-shrink-0 w-24 h-12 bg-gray-50 rounded-md flex items-center justify-center p-2">
            <img src={option.logoUrl} alt={option.name} className="max-w-full max-h-full object-contain" />
          </div>
          
          {/* Details Area */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">{option.name}</h3>
            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1">
              <span className="text-sm text-gray-600 flex items-center">
                <i className={`fas fa-${option.serviceType === 'Express' || option.serviceType === 'Premium Express' ? 'truck-fast' : 'truck'} text-primary mr-1.5`}></i> {option.serviceType}
              </span>
              <span className="text-sm text-gray-600 flex items-center">
                <i className="fas fa-clock text-primary mr-1.5"></i> {option.minDays}-{option.maxDays} days
              </span>
              {option.hasInsurance && (
                <span className="text-sm text-gray-600 flex items-center">
                  <i className="fas fa-shield-alt text-primary mr-1.5"></i> {option.insuranceType || 'Shipment Protection'}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">{option.description}</p>
          </div>
          
          {/* Price & Action Area */}
          <div className="w-full md:w-auto flex flex-col items-start md:items-end mt-3 md:mt-0">
            <div className="text-2xl font-bold text-gray-800">₹{option.price}</div>
            <div className="text-xs text-gray-500 mb-3">incl. all taxes</div>
            <Button 
              variant={isRecommended || isBestValue ? "default" : "outline"} 
              className={`${
                isRecommended 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md' 
                  : isBestValue 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-md' 
                    : 'bg-white hover:bg-gray-50 text-primary border border-primary'
              } font-medium py-2 px-6 rounded-lg transition duration-150 ease-in-out w-full md:w-auto`}
            >
              {isRecommended ? 'Select Recommended' : 'Select'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
