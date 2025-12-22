import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';

import ComponentFilter from '../../components/ComponentFilter';
import type { PriceFilter } from '../../components/ComponentFilter';
import { useEffect, useState } from 'react';
import { ProductSkeleton } from '../../components/ProductSkeleton';
import ErrorMsg from '../../components/ErrorMsg';

export const Route = createFileRoute('/products/')({
  component: ProductsComponent,
});

function ProductsComponent() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  /* Filtros */
  const [filter, setFilter] = useState<PriceFilter>({
    searchTerm: '',
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredProducts = (products ?? []).filter((p) => {
    const matchesSearch =
      !filter.searchTerm ||
      p.title.toLowerCase().includes(filter.searchTerm.toLowerCase());

    const matchesMin =
      filter.minPrice === undefined || p.price >= filter.minPrice;

    const matchesMax =
      filter.maxPrice === undefined || p.price <= filter.maxPrice;

    return matchesSearch && matchesMin && matchesMax;
  });

  /* El ordenamiento */
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filter.sortBy === "price-asc") return a.price - b.price;
    if (filter.sortBy === "price-desc") return b.price - a.price;
    if (filter.sortBy === "best-rated") return b.rating.rate - a.rating.rate;
    if (filter.sortBy === "most-reviews") return b.rating.count - a.rating.count;
    return 0;
  });


  {/*
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-gray-600">Cargando productos...</div>
      </div>
    );
  }
*/}

  // realizo la paginaacion 
  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Si modifca un filtro, vuelve a la primera página
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Todos los Productos
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  {/*
  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        Error al cargar los productos
      </div>
    );
  }
*/}
  if (error) {
    return <ErrorMsg message="Error al cargar los productos" />
  }


  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Todos los Productos
      </h1>
      <div className="flex justify-end mb-6">
        <ComponentFilter
          value={filter}
          onChange={setFilter}
          debounce={true}
          debounceMs={300}
          className="flex gap-4"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-lg text-center">
            No se encontraron productos con los filtros seleccionados.
          </p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            ← Anterior
          </button>

          <span className="font-medium">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}
