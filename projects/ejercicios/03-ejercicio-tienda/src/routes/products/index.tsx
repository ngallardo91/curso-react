import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { ProductSkeleton } from '../../components/ProductSkeleton';
import { ErrorMessage } from '../../components/ErrorMessage';

export const Route = createFileRoute('/products/')({
  component: ProductsComponent,
});

const PRODUCTS_PER_PAGE = 8;

function ProductsComponent() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('price-asc');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, minPrice, maxPrice, sortBy]);

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Todos los Productos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="No se pudieron cargar los productos"
        message="Verifica tu conexión e intenta nuevamente."
      />
    );
  }

  const numericMin = minPrice ? Number(minPrice) : undefined;
  const numericMax = maxPrice ? Number(maxPrice) : undefined;

  const filteredProducts = (products ?? []).filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const price = product.price;
    const matchesMin =
      numericMin === undefined ? true : price >= numericMin;
    const matchesMax =
      numericMax === undefined ? true : price <= numericMax;

    return matchesSearch && matchesMin && matchesMax;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-desc':
        return b.rating.rate - a.rating.rate;
      case 'reviews-desc':
        return b.rating.count - a.rating.count;
      default:
        return 0;
    }
  });

  const totalPages = Math.max(
    1,
    Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE)
  );
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const handleClearFilters = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('price-asc');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Todos los Productos
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Filtra, ordena y navega por los productos disponibles.
      </p>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Buscar por título
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ej: shirt, bag..."
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Rango de precio
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Mín"
              className="w-1/2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              min={0}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Máx"
              className="w-1/2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Ordenar por
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="rating-desc">Mejor valorados</option>
            <option value="reviews-desc">Más reseñas</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleClearFilters}
          className="mt-2 md:mt-0 inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
        >
          Limpiar filtros
        </button>
      </div>

      {currentProducts.length === 0 ? (
        <div className="text-center py-16 text-gray-600 dark:text-gray-300">
          No se encontraron productos con los filtros seleccionados.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-md border text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
            >
              Anterior
            </button>

            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-md text-sm ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'border hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-md border text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}
