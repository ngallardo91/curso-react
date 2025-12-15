import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { useEffect, useRef, useState } from 'react';
import { ProductSkeleton } from '../../components/ProductSkeleton';
import ErrorMessage from '../../components/ErrorMessage';
import Pagination from '../../components/Pagination';

export const Route = createFileRoute('/products/')({
  component: ProductsComponent,
  validateSearch: (search: { page?: number }) => ({
    page: Number(search.page) || 1,
  }),
});

function ProductsComponent() {
  const search = useSearch({ from: '/products/' });
  const navigate = useNavigate({ from: '/products' });
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const ITEMS_PER_PAGE = 8;
  const currentPage = search.page;

  const filteredProducts = products?.filter((product) => {
    const matchesPrice = (!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice);
    const matchesSearch = product.title.toLowerCase().includes(searchTerm?.toLowerCase() || '');
    return matchesPrice && matchesSearch;
  });

  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating-desc') return b.rating.rate - a.rating.rate;
    if (sortBy === 'reviews-desc') return b.rating.count - a.rating.count;
    return 0;
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleClearFilters = () => {
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSearchTerm(undefined);
    setSortBy(undefined);
  }

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    navigate({
      search: prev => ({ ...prev, page: 1 }),
    });
  }, [sortBy, minPrice, maxPrice, searchTerm]);

  const handlePageChange = (page: number) => {
    navigate({
      search: (prev: { page?: number }) => ({ ...prev, page })
    });
  }

  if (isLoading) {
    return (
      <ProductSkeleton />
    );
  }

  if (error) {
    return (
      <ErrorMessage message="Error al cargar los productos" />
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Todos los Productos
      </h1>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="number"
          placeholder="Precio Mínimo"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4"
          value={minPrice ?? ''}
          onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
        />
        <input
          type="number"
          placeholder="Precio Máximo"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4"
          value={maxPrice ?? ''}
          onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
        />
        <input
          type="text"
          placeholder="Buscar productos"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2"
          value={searchTerm ?? ''}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2"
          value={sortBy ?? ''}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Ordenar por</option>
          <option value="price-asc">Precio: Menor a mayor</option>
          <option value="price-desc">Precio: Mayor a menor</option>
          <option value="rating-desc">Mejor valorados</option>
          <option value="reviews-desc">Mas reseñas</option>
        </select>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded-lg 
            hover:transition-all duration-200 transform hover:scale-105 active:scale-95 
            font-medium w-full md:w-1/4"
          onClick={handleClearFilters}
        >
          Limpiar Filtros
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={sortedProducts?.length || 0}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
