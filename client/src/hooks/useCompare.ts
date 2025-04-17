import { useState } from 'react';
import { ShipmentFormData, LogisticsOption, AIRecommendation } from '@/types';
import { apiRequest } from '@/lib/queryClient';

export function useCompare() {
  const [compareResults, setCompareResults] = useState<LogisticsOption[]>([]);
  const [aiRecommendation, setAiRecommendation] = useState<AIRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedSort, setSelectedSort] = useState('price_low');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [lastQuery, setLastQuery] = useState<ShipmentFormData | null>(null);

  const submitCompare = async (formData: ShipmentFormData) => {
    setIsLoading(true);
    setIsLoadingRecommendation(true);
    setShowResults(true);
    setLastQuery(formData);
    setAiRecommendation(null);
    
    try {
      // Scroll to results section
      setTimeout(() => {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
          window.scrollTo({
            top: resultsSection.offsetTop - 20,
            behavior: 'smooth'
          });
        }
      }, 100);

      // Include recommendation=true to get AI recommendation with the results
      const response = await apiRequest('POST', '/api/compare?recommendation=true', formData);
      const data = await response.json();
      
      if (data.options) {
        // Sort the results based on currently selected sort option
        const sortedResults = sortResultsBy(data.options, selectedSort);
        setCompareResults(sortedResults);
      } else {
        setCompareResults([]);
      }

      // Set the AI recommendation if available
      if (data.recommendation) {
        setAiRecommendation(data.recommendation);
      }
    } catch (error) {
      console.error('Error fetching comparison results:', error);
      setCompareResults([]);
    } finally {
      setIsLoading(false);
      setIsLoadingRecommendation(false);
    }
  };

  const sortResultsBy = (results: LogisticsOption[], sortBy: string) => {
    const sortedResults = [...results];
    
    switch (sortBy) {
      case 'price_low':
        return sortedResults.sort((a, b) => a.price - b.price);
      case 'price_high':
        return sortedResults.sort((a, b) => b.price - a.price);
      case 'time_fast': 
        return sortedResults.sort((a, b) => (a.minDays + a.maxDays)/2 - (b.minDays + b.maxDays)/2);
      case 'time_slow':
        return sortedResults.sort((a, b) => (b.minDays + b.maxDays)/2 - (a.minDays + a.maxDays)/2);
      default:
        return sortedResults;
    }
  };

  const sortResults = async (sortBy: string) => {
    setSelectedSort(sortBy);
    setIsLoading(true);
    
    try {
      if (lastQuery) {
        const response = await apiRequest('POST', `/api/compare?sort=${sortBy}&filter=${selectedFilter}`, lastQuery);
        const data = await response.json();
        if (data.options) {
          setCompareResults(data.options);
        } else {
          setCompareResults(data);
        }
      } else {
        // If there's no previous query, just sort the current results
        setCompareResults(sortResultsBy(compareResults, sortBy));
      }
    } catch (error) {
      console.error('Error sorting results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterResults = async (provider: string) => {
    setSelectedFilter(provider);
    setIsLoading(true);
    
    try {
      if (lastQuery) {
        const response = await apiRequest('POST', `/api/compare?sort=${selectedSort}&filter=${provider}`, lastQuery);
        const data = await response.json();
        if (data.options) {
          setCompareResults(data.options);
        } else {
          setCompareResults(data);
        }
      }
    } catch (error) {
      console.error('Error filtering results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get a new AI recommendation
  const refreshRecommendation = async () => {
    if (!lastQuery) return;
    
    setIsLoadingRecommendation(true);
    
    try {
      const response = await apiRequest('POST', '/api/recommend', lastQuery);
      const data = await response.json();
      
      if (data.recommendation) {
        setAiRecommendation(data.recommendation);
      }
    } catch (error) {
      console.error('Error fetching AI recommendation:', error);
    } finally {
      setIsLoadingRecommendation(false);
    }
  };

  // Find the recommended option in the results list
  const getRecommendedOption = () => {
    if (!aiRecommendation) return null;
    
    return compareResults.find(option => 
      option.id === aiRecommendation.bestOption.id && 
      option.provider === aiRecommendation.bestOption.provider
    );
  };

  return {
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
    showResults
  };
}
