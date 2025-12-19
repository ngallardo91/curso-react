import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';

export const Route = createFileRoute('/products/')({
  component: ProductsComponent,
});

const ITEMS_PER_PAGE = 8;

function ProductsComponent() {
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // Estado para ordenamiento
  const [sortBy, setSortBy] = useState('default');

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      return matchesSearch && matchesPrice;
    });
  }, [products, searchTerm, minPrice, maxPrice]);

  // Ordenar productos
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating.rate - a.rating.rate);
      case 'reviews':
        return sorted.sort((a, b) => b.rating.count - a.rating.count);
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  // Paginación
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  // Resetear página cuando cambian filtros
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMinPrice(0);
    setMaxPrice(1000);
    setSortBy('default');
    setCurrentPage(1);
  };

  if (isLoading) {
    return <LoadingSpinner message="Cargando productos..." size="lg" />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="No pudimos cargar los productos. Por favor, intenta de nuevo."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Todos los Productos
      </h1>

      {/* Filtros y Ordenamiento */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Búsqueda */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleFilterChange();
              }}
              placeholder="Buscar productos..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              onChange={(e) => {
                setMinPrice(Number(e.target.value));
                handleFilterChange();
              }}
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
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
                handleFilterChange();
              }}
              className="w-full"
            />
          </div>

          {/* Ordenar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ordenar por
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="default">Por defecto</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Valorados</option>
              <option value="reviews">Más Reseñas</option>
            </select>
          </div>
        </div>

        {/* Botón limpiar filtros y contador */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">
            Mostrando {paginatedProducts.length} de {sortedProducts.length} productos
          </span>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mensaje si no hay productos */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron productos con esos filtros</p>
          <button
            onClick={clearFilters}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
