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
