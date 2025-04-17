import { LogisticsOption } from '@/types';
import ResultCard from '@/components/ResultCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ResultsSectionProps {
  results: LogisticsOption[];
  isLoading: boolean;
  onSort: (sortBy: string) => void;
  onFilter: (provider: string) => void;
  selectedSort: string;
  selectedFilter: string;
}

export default function ResultsSection({ results, isLoading, onSort, onFilter, selectedSort, selectedFilter }: ResultsSectionProps) {
  const LoadingSkeleton = () => (
    <div className="bg-white rounded-xl shadow mb-4 p-4 animate-pulse">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-24 h-16 bg-gray-200 rounded"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="w-full sm:w-32">
          <div className="h-8 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  const NoResults = () => (
    <div className="bg-white rounded-xl shadow p-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <i className="fas fa-search text-gray-400 text-2xl"></i>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">No shipping options found</h3>
      <p className="text-gray-600 mb-4">Try adjusting your search criteria or changing the package details.</p>
      <button 
        className="text-primary font-medium" 
        onClick={() => document.getElementById('shipment-form')?.scrollIntoView({behavior: 'smooth'})}
      >
        Modify Search
      </button>
    </div>
  );
  
  return (
    <div id="results-section" className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Shipping Options 
          <span id="result-count" className="text-sm font-normal text-gray-500">
            ({results.length} options found)
          </span>
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto">
          <div className="relative">
            <Select value={selectedSort} onValueChange={onSort}>
              <SelectTrigger className="w-full sm:w-48 appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="time_fast">Delivery: Fastest</SelectItem>
                <SelectItem value="time_slow">Delivery: Slowest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="relative">
            <Select value={selectedFilter} onValueChange={onFilter}>
              <SelectTrigger className="w-full sm:w-48 appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                <SelectValue placeholder="Filter providers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                <SelectItem value="delhivery">Delhivery</SelectItem>
                <SelectItem value="bluedart">Blue Dart</SelectItem>
                <SelectItem value="dtdc">DTDC</SelectItem>
                <SelectItem value="fedex">FedEx</SelectItem>
                <SelectItem value="ecom">Ecom Express</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div id="loading-results">
          {[...Array(4)].map((_, i) => (
            <LoadingSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Results Container */}
      {!isLoading && (
        <div id="results-container">
          {results.length > 0 ? (
            results.map((option, index) => (
              <ResultCard key={index} option={option} isBestValue={index === 0} />
            ))
          ) : (
            <NoResults />
          )}
        </div>
      )}
    </div>
  );
}
