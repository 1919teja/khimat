export default function AIRecommendationSkeleton() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md p-6 mb-6 border border-blue-100 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-200 mr-4"></div>
          <div>
            <div className="h-5 bg-blue-200 rounded w-40 mb-2"></div>
            <div className="h-4 bg-blue-200 rounded w-32"></div>
          </div>
        </div>
        <div className="h-6 w-24 bg-blue-200 rounded-full"></div>
      </div>

      <div className="mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 rounded-lg">
          <div className="w-16 h-10 bg-gray-200 rounded-md"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="h-9 w-20 bg-blue-200 rounded"></div>
        </div>

        <div className="mt-4">
          <div className="h-4 bg-blue-100 rounded w-full mb-2"></div>
          <div className="h-4 bg-blue-100 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-blue-100 rounded w-4/6"></div>
          
          <div className="mt-3 h-5 w-28 bg-blue-100 rounded"></div>
        </div>
      </div>
    </div>
  );
}