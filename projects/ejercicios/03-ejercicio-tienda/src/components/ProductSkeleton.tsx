export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Imagen */}
      <div className="w-full h-48 animate-shimmer"></div>
      
      <div className="p-4">
        {/* Título */}
        <div className="h-4 animate-shimmer rounded mb-2"></div>
        <div className="h-4 animate-shimmer rounded w-3/4 mb-4"></div>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="h-4 w-4 animate-shimmer rounded-full"></div>
          <div className="h-3 animate-shimmer rounded w-16 ml-2"></div>
        </div>
        
        {/* Precio y botón */}
        <div className="flex justify-between items-center">
          <div className="h-7 animate-shimmer rounded w-20"></div>
          <div className="h-10 animate-shimmer rounded-lg w-24"></div>
        </div>
      </div>
    </div>
  );
}
