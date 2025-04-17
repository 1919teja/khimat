import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ShipmentForm from "@/components/ShipmentForm";
import ResultsSection from "@/components/ResultsSection";
import Footer from "@/components/Footer";
import { useCompare } from "@/hooks/useCompare";

export default function Home() {
  const {
    compareResults,
    isLoading,
    submitCompare,
    sortResults,
    filterResults,
    selectedSort,
    selectedFilter,
    showResults,
  } = useCompare();

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow">
        <Hero />
        <ShipmentForm onCompare={submitCompare} />
        {showResults && (
          <ResultsSection
            results={compareResults}
            isLoading={isLoading}
            onSort={sortResults}
            onFilter={filterResults}
            selectedSort={selectedSort}
            selectedFilter={selectedFilter}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
