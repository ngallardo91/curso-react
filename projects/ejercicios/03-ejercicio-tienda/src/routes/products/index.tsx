import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ProductSkeleton } from '../../components/ProductSkeleton';

export const Route = createFileRoute('/products/')({
  component: ProductsComponent,
});

function ProductsComponent() {
  const { data: products, isLoading, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Todos los Productos</h1>
        <LoadingSpinner message="Cargando productos..." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return <ErrorMessage title="Error al cargar productos" message="No pudimos cargar los productos. Por favor intenta de nuevo." onRetry={() => refetch()} />;
  }
  
  const filteredProducts = products?.filter((product) => {
    const matchesPrice =
      (minPrice === '' || product.price >= Number(minPrice)) &&
      (maxPrice === '' || product.price <= Number(maxPrice));
    const matchesSearch =
      searchTerm.trim() === '' || product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPrice && matchesSearch;
  });

  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating.rate - a.rating.rate;
    if (sortBy === 'reviews') return b.rating.count - a.rating.count;
    return 0;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Todos los Productos</h1>

      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-3 items-center">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border rounded-md"
        />

        <input
          type="number"
          placeholder="Precio mínimo"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-1/2 md:w-1/6 px-3 py-2 border rounded-md"
        />

        <input
          type="number"
          placeholder="Precio máximo"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-1/2 md:w-1/6 px-3 py-2 border rounded-md"
        />

        <div className="flex gap-2 ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white"
          >
            <option value="">Ordenar por...</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="rating">Mejor Valorados</option>
            <option value="reviews">Más Reseñas</option>
          </select>
          <button
            onClick={() => {
              setMinPrice('');
              setMaxPrice('');
              setSearchTerm('');
              toast.success('Filtros limpiados');
            }}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts && sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600 py-8">
            No se encontraron productos con esos filtros
          </div>
        )}
      </div>
    </div>
  );
}

