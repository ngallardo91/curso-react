import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { ProductSkeleton } from '../../components/ProductSkeleton';
import { ErrorMessage } from '../../components/ErrorMessage';

export const Route = createFileRoute('/products/')({
  component: ProductsComponent,
});

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'reviews';

const PRODUCTS_PER_PAGE = 8;

function ProductsComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: products, isLoading, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  // Filtrar productos
  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchesSearch && matchesPrice;
  });

  // Ordenar productos
  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating.rate - a.rating.rate;
      case 'reviews':
        return b.rating.count - a.rating.count;
      default:
        return 0;
    }
  });

  // Paginación
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMinPrice(0);
    setMaxPrice(1000);
    setSortBy('default');
    setCurrentPage(1);
  };

  // Resetear página al cambiar filtros
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleMinPriceChange = (value: number) => {
    setMinPrice(value);
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (value: number) => {
    setMaxPrice(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm !== '' || minPrice > 0 || maxPrice < 1000 || sortBy !== 'default';
  
  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Todos los Productos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <ErrorMessage
        title="Error al cargar productos"
        message="No pudimos obtener la lista de productos. Verificá tu conexión e intentá de nuevo."
        onRetry={() => refetch()}
      />
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Todos los Productos
      </h1>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          {/* Búsqueda */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar producto
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Buscar por título..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Precio mínimo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio mín: ${minPrice}
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              value={minPrice}
              onChange={(e) => handleMinPriceChange(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Precio máximo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio máx: ${maxPrice}
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Ordenar por */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ordenar por
            </label>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="default">Por defecto</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Valorados</option>
              <option value="reviews">Más Reseñas</option>
            </select>
          </div>
        </div>

        {/* Limpiar filtros */}
        {hasActiveFilters && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {sortedProducts.length} producto(s) encontrado(s)
            </span>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              ✕ Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Lista de productos */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No se encontraron productos con los filtros seleccionados.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {/* Botón Anterior */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                ← Anterior
              </button>

              {/* Números de página */}
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              {/* Botón Siguiente */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Siguiente →
              </button>
            </div>
          )}

          {/* Info de paginación */}
          {totalPages > 1 && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Mostrando {startIndex + 1}-{Math.min(startIndex + PRODUCTS_PER_PAGE, sortedProducts.length)} de {sortedProducts.length} productos
            </p>
          )}
        </>
      )}
    </div>
  );
}
