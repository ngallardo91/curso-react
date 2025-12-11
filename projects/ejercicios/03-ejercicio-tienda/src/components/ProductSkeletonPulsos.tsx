import React from 'react';

/**
 * Componente que simula la tarjeta de un producto en estado de carga.
 */
export function ProductSkeletonPulso() {
  return (
    // Contenedor principal: usa 'animate-pulse' para el efecto visual
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      
      {/* 1. Placeholder de la Imagen */}
      <div className="w-full h-48 bg-gray-200"></div>
      
      <div className="p-4">
        {/* 2. Placeholder del Título (línea más ancha) */}
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        
        {/* 3. Placeholder de la Descripción (línea más corta) */}
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        
        {/* 4. Precio y Botón de Acción (Placeholders) */}
        <div className="flex justify-between items-center">
          {/* Precio */}
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          {/* Botón */}
          <div className="h-10 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}

// ⭐️ Componente Contenedor para la Lista ⭐️
// Este es el componente que realmente usarás en tu página de productos
interface ProductSkeletonListProps {
  /** Número de esqueletos a mostrar (debe coincidir con PRODUCTS_PER_PAGE). */
  count?: number;
  /** Clases CSS de Tailwind para definir la cuadrícula. */
  className?: string;
}

export const ProductSkeletonList: React.FC<ProductSkeletonListProps> = ({ 
    count = 8, 
    // Usamos una cuadrícula responsiva estándar para la lista
    className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6" 
}) => {
  return (
    <div className={className}>
      {/* Mapea y renderiza el número de esqueletos deseado */}
      {[...Array(count)].map((_, index) => (
        <ProductSkeletonPulso key={index} />
      ))}
    </div>
  );
};