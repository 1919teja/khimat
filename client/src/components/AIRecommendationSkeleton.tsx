import { Skeleton } from "@/components/ui/skeleton";

export default function AIRecommendationSkeleton() {
  return (
    <div className="mb-6">
      <div className="bg-black text-white rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold mb-1">AI Suggestion</h2>
        <p className="text-sm text-gray-300 mb-4">Analyzing your preferences...</p>
        
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-gray-700" />
          <Skeleton className="h-4 w-3/4 bg-gray-700" />
          <Skeleton className="h-4 w-5/6 bg-gray-700" />
        </div>
        
        <div className="flex justify-end mt-4">
          <Skeleton className="h-9 w-44 bg-gray-700" />
        </div>
      </div>
    </div>
  );
}