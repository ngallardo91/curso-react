export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-shimmer"></div>
        <div className="flex items-center gap-2">
          <div className="h-3 bg-gray-200 rounded w-16 animate-shimmer"></div>
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-20 animate-shimmer"></div>
          <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-24 animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
}
