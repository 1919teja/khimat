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
    selectedSort,
    selectedFilter,
    showResults,
  } = useCompare();
  
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);

  // Handler for selecting the recommended option
  const handleSelectRecommended = () => {
    if (aiRecommendation && aiRecommendation.bestOption) {
      setSelectedOptionId(aiRecommendation.bestOption.id);
      // You can add additional logic here for handling the selection
      // For example, scrolling to the option or highlighting it
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow">
        <Hero />
        <ShipmentForm onCompare={submitCompare} />
        {showResults && (
          <>
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
            <ResultsSection
              results={compareResults}
              isLoading={isLoading}
              onSort={sortResults}
              onFilter={filterResults}
              selectedSort={selectedSort}
              selectedFilter={selectedFilter}
              selectedOptionId={selectedOptionId}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
