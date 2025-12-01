import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';

import ComponentFilter from '../../components/ComponentFilter';
import type { PriceFilter } from '../../components/ComponentFilter';
import { useState } from 'react';

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
  });

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



  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-gray-600">Cargando productos...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        Error al cargar los productos
      </div>
    );
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
          {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-lg text-center">
            No se encontraron productos con los filtros seleccionados.
          </p>
        )}
      </div>
    </div>
  );
}
