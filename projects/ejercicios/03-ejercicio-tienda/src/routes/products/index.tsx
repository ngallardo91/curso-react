import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo, useEffect } from 'react';
import { z } from 'zod';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ProductSkeleton } from '../../components/ProductSkeleton';

const productsSearchSchema = z.object({
  page: z.number().min(1).optional().catch(1),
});

export const Route = createFileRoute('/products/')({
  component: ProductsComponent,
  validateSearch: productsSearchSchema,
});

const PRODUCTS_PER_PAGE = 8;

function ProductsComponent() {
  const navigate = useNavigate();
  const { page = 1 } = Route.useSearch();
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const currentPage = page;

  const maxProductPrice = useMemo(() => {
    if (!products || products.length === 0) return 1000;
    return Math.ceil(Math.max(...products.map((p) => p.price)));
  }, [products]);

  useEffect(() => {
    if (maxProductPrice > 0 && maxPrice === 1000) {
      setMaxPrice(maxProductPrice);
    }
  }, [maxProductPrice, maxPrice]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter((product) => {
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesPrice && matchesSearch;
    });
  }, [products, minPrice, maxPrice, searchTerm]);

  const sortedProducts = useMemo(() => {
    const productsToSort = [...filteredProducts];
    
    return productsToSort.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating-desc') return b.rating.rate - a.rating.rate;
      if (sortBy === 'reviews-desc') return b.rating.count - a.rating.count;
      return 0;
    });
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      navigate({
        search: { page: 1 },
        replace: true,
      });
    }
  }, [currentPage, totalPages, navigate]);

  useEffect(() => {
    if (currentPage !== 1 && totalPages > 0) {
      navigate({
        search: { page: 1 },
        replace: true,
      });
    }
  }, [minPrice, maxPrice, searchTerm, sortBy]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      navigate({
        search: { page: newPage },
        replace: true,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClearFilters = () => {
    setMinPrice(0);
    setMaxPrice(maxProductPrice);
    setSearchTerm('');
    navigate({
      search: { page: 1 },
      replace: true,
    });
  };

  const hasActiveFilters = minPrice > 0 || maxPrice < maxProductPrice || searchTerm !== '';

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Todos los Productos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <ErrorMessage 
        message="Error al cargar los productos. Por favor, intenta nuevamente."
        onRetry={() => window.location.reload()}
      />
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Todos los Productos
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar por título
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar por
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
            >
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating-desc">Mejor Valorados</option>
              <option value="reviews-desc">Más Reseñas</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio mínimo: ${minPrice.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max={maxProductPrice}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$0</span>
              <span>${maxProductPrice.toFixed(2)}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio máximo: ${maxPrice.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max={maxProductPrice}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$0</span>
              <span>${maxProductPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="mb-4 text-gray-600">
        {sortedProducts.length === 0 ? (
          <p>No se encontraron productos con los filtros aplicados.</p>
        ) : (
          <p>
            Mostrando {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)} de {sortedProducts.length} productos
            {sortedProducts.length !== products?.length && ` (filtrados de ${products?.length || 0} total)`}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              Anterior
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  pageNum === currentPage - 2 ||
                  pageNum === currentPage + 2
                ) {
                  return (
                    <span key={pageNum} className="px-2 text-gray-500">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              Siguiente
            </button>
          </div>

          <p className="text-sm text-gray-600">
            Página {currentPage} de {totalPages}
          </p>
        </div>
      )}
    </div>
  );
}
