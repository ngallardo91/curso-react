import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { ProductSkeleton } from '../../components/ProductSkeleton';
import { ErrorMessage } from '../../components/ErrorMessage';

export const Route = createFileRoute('/products/')({
  component: ProductsComponent,
});

type SortOption =
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'reviews-desc'
  | '';

const PRODUCTS_PER_PAGE = 8;

function ProductsComponent() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  /* Filtros */
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  /* Ordenamiento */
  const [sortBy, setSortBy] = useState<SortOption>('');

  /* Paginación */
  const [currentPage, setCurrentPage] = useState(1);

  /* Reset página cuando cambian filtros u orden */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, minPrice, maxPrice, sortBy]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message="Error al cargar los productos" />;
  }

  /* 1️⃣ Filtrado */
  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesPrice =
      product.price >= minPrice && product.price <= maxPrice;

    return matchesSearch && matchesPrice;
  }) || [];

  /* 2️⃣ Ordenamiento */
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating-desc') return b.rating.rate - a.rating.rate;
    if (sortBy === 'reviews-desc') return b.rating.count - a.rating.count;
    return 0;
  });

  /* 3️⃣ Paginación */
  const totalPages = Math.ceil(
    sortedProducts.length / PRODUCTS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const clearFilters = () => {
    setSearchTerm('');
    setMinPrice(0);
    setMaxPrice(10000);
    setSortBy('');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Todos los Productos
      </h1>

      {/* Filtros + Orden */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Precio mínimo"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Precio máximo"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Ordenar por</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="rating-desc">Mejor valorados</option>
          <option value="reviews-desc">Más reseñas</option>
        </select>

        <button
          onClick={clearFilters}
          className="bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2 transition-all duration-200"
        >
          Limpiar
        </button>
      </div>

      {/* Productos */}
      {paginatedProducts.length === 0 ? (
        <div className="text-center text-gray-600 py-8">
          No se encontraron productos
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
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Anterior
              </button>

              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}