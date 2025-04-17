import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ShipmentForm from "@/components/ShipmentForm";
import ResultsSection from "@/components/ResultsSection";
import Footer from "@/components/Footer";
import AIRecommendationBox from "@/components/AIRecommendationBox";
import AIRecommendationSkeleton from "@/components/AIRecommendationSkeleton";
import { useCompare } from "@/hooks/useCompare";
import { useState } from "react";

export default function Home() {
  const {
    compareResults,
    aiRecommendation,
    isLoading,
    isLoadingRecommendation,
    submitCompare,
    sortResults,
    filterResults,
    refreshRecommendation,
    getRecommendedOption,
    selectedSort,
    selectedFilter,
    showResults,
  } = useCompare();
  
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);

  // Handler for selecting the recommended option
  const handleSelectRecommended = () => {
    if (aiRecommendation && aiRecommendation.bestOption) {
      setSelectedOptionId(aiRecommendation.bestOption.id);
      
      // Scroll to the results section
      const resultsSection = document.getElementById('results-section');
      if (resultsSection) {
        window.scrollTo({
          top: resultsSection.offsetTop + 100, // Scroll a bit further down to see the recommended option
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow">
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg border border-purple-400">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-white mb-2">Join Our Logistics Network</h2>
              <p className="text-gray-200">Are you a B2B or logistics company? Partner with Khimat to expand your reach and grow your business.</p>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
              Become a Partner
            </button>
          </div>
        </div>
        <Hero />
        <ShipmentForm onCompare={submitCompare} />
        
        {showResults && (
          <div id="results-area">
            {/* AI Recommendation Section */}
            {isLoadingRecommendation && <AIRecommendationSkeleton />}
            
            {!isLoadingRecommendation && aiRecommendation && (
              <AIRecommendationBox 
                recommendation={aiRecommendation} 
                options={compareResults}
                onSelectRecommended={handleSelectRecommended}
              />
            )}
            
            {/* Results Section */}
            <div id="results-section">
              <ResultsSection
                results={compareResults}
                isLoading={isLoading}
                onSort={sortResults}
                onFilter={filterResults}
                selectedSort={selectedSort}
                selectedFilter={selectedFilter}
                selectedOptionId={selectedOptionId}
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
