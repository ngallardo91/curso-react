import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ProductSkeleton } from '../../components/ProductSkeleton';
import { z } from 'zod';

const productSearchSchema = z.object({
  page: z.number().optional().default(1),
  search: z.string().optional().default(''),
  minPrice: z.string().optional().default(''),
  maxPrice: z.string().optional().default(''),
  sortBy: z.string().optional().default(''),
});

export const Route = createFileRoute('/products/')({
  validateSearch: (search) => productSearchSchema.parse(search),
  component: ProductsComponent,
});

const ITEMS_PER_PAGE = 8;

function ProductsComponent() {
  const { page, search, minPrice, maxPrice, sortBy } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const { data: products, isLoading, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  const updateParams = (updates: Partial<z.infer<typeof productSearchSchema>>) => {
    navigate({
      search: (prev) => ({ ...prev, ...updates, page: 1 }),
      replace: true,
    });
  };

  const setPage = (newPage: number) => {
    navigate({
      search: (prev) => ({ ...prev, page: newPage }),
    });
  };

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const price = product.price;
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : Infinity;
    const matchesPrice = price >= min && price <= max;

    return matchesSearch && matchesPrice;
  });

  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating.rate - a.rating.rate;
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToNextPage = () => setPage(Math.min(page + 1, totalPages));
  const goToPrevPage = () => setPage(Math.max(page - 1, 1));

  const clearFilters = () => {
    navigate({
      search: { page: 1, search: '', minPrice: '', maxPrice: '', sortBy: '' },
    });
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Todos los Productos</h1>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-8 h-32 animate-pulse mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return <ErrorMessage retry={refetch} />;
  }
  
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">
        Todos los Productos
      </h1>

      {/* --- PANEL DE FILTROS --- */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-8 border border-gray-200 dark:border-gray-700 transition-colors">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">🔍 Filtros y Orden</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          
          {/* Buscador */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">Buscar</label>
            <input 
              type="text" 
              placeholder="Ej: Jacket..." 
              value={search}
              onChange={(e) => updateParams({ search: e.target.value })}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
            />
          </div>

          {/* Precio Mín */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">Precio Mín.</label>
            <input 
              type="number" 
              placeholder="0" 
              value={minPrice}
              onChange={(e) => updateParams({ minPrice: e.target.value })}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Precio Máx */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">Precio Máx.</label>
            <input 
              type="number" 
              placeholder="1000" 
              value={maxPrice}
              onChange={(e) => updateParams({ maxPrice: e.target.value })}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Ordenar */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">Ordenar por</label>
            <select 
              value={sortBy}
              onChange={(e) => updateParams({ sortBy: e.target.value })}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white h-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Relevancia</option>
              <option value="price-asc">Precio: Menor a Mayor 📉</option>
              <option value="price-desc">Precio: Mayor a Menor 📈</option>
              <option value="rating">Mejor Valorados ⭐</option>
            </select>
          </div>

          {/* Botón Limpiar */}
          <button 
            onClick={clearFilters}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 transition-colors h-10"
          >
            Limpiar 🗑️
          </button>
        </div>
      </div>

      {/* --- GRILLA --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {paginatedProducts.length === 0 ? (
           <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
             No hay productos que coincidan con tu búsqueda. 🐢
           </p>
        ) : (
          paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {/* --- PAGINACIÓN --- */}
      {sortedProducts.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center items-center gap-4 py-8 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={goToPrevPage}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg border font-medium transition-colors
              ${page === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600 dark:border-gray-700' 
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600'}`}
          >
            ← Anterior
          </button>
          
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            Página <span className="text-blue-600 dark:text-blue-400">{page}</span> de {totalPages}
          </span>
          
          <button
            onClick={goToNextPage}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-lg border font-medium transition-colors
              ${page === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600 dark:border-gray-700' 
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600'}`}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}