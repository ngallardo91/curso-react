import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { useState } from 'react';
import type { Product } from '../../types/product';

export const Route = createFileRoute('/products/')({
  component: ProductsComponent,
});

function ProductsComponent() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  const filteredProducts = products?.filter((product: Product) => {
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPrice && matchesSearch;
  });

  const handleClearFilters = () => {
    setMinPrice(0);
    setMaxPrice(1000);
    setSearchTerm('');
  };

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

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Filtros</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar por título
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio mínimo: ${minPrice.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              step="1"
              value={minPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio máximo: ${maxPrice.toFixed(2)}
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              step="1"
              value={maxPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
        >
          Limpiar filtros
        </button>
      </div>

      <div className="mb-4 text-gray-600">
        Mostrando {filteredProducts?.length || 0} de {products?.length || 0} productos
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No se encontraron productos con los filtros seleccionados.
          </div>
        )}
      </div>
    </div>
  );
}
