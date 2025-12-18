// Cleaned products index page: single component with filtering, sorting and pagination
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAll } from '../../services/api';
import ProductCard from '../../components/ProductCard';
import ProductSkeleton from '../../components/ProductSkeleton';
import ErrorMessage from '../../components/ErrorMessage';

export default function ProductsIndexPage() {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getAll,
  });

  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating' | 'reviews'>('default');

  const filtered = products.filter((p: any) => {
    const withinMin = minPrice === '' ? true : p.price >= (minPrice as number);
    const withinMax = maxPrice === '' ? true : p.price <= (maxPrice as number);
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    return withinMin && withinMax && matchesSearch;
  });

  const sorted = [...filtered].sort((a: any, b: any) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating?.rate || 0) - (a.rating?.rate || 0);
    if (sortBy === 'reviews') return (b.rating?.count || 0) - (a.rating?.count || 0);
    return 0;
  });

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE));
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = sorted.slice(start, start + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isLoading) return <ProductSkeleton count={8} />;
  if (error) return <ErrorMessage message="Error al cargar la lista de productos. Intenta de nuevo." />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Todos los Productos</h2>

      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-inner flex flex-wrap gap-4 items-end">
        <label className="flex flex-col flex-1 min-w-[150px]">
          Buscar por Título:
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="p-2 border rounded-md" />
        </label>

        <label className="flex flex-col w-28">
          Min Precio:
          <input type="number" value={minPrice as any} onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))} className="p-2 border rounded-md" />
        </label>

        <label className="flex flex-col w-28">
          Max Precio:
          <input type="number" value={maxPrice as any} onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))} className="p-2 border rounded-md" />
        </label>

        <label className="flex flex-col w-40">
          Ordenar por:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="p-2 border rounded-md">
            <option value="default">Relevancia</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="rating">Mejor Valorados</option>
            <option value="reviews">Más Reseñas</option>
          </select>
        </label>

        <button onClick={() => { setMinPrice(''); setMaxPrice(''); setSearchTerm(''); setSortBy('default'); }} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors">
          Limpiar Filtros
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginated.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50">Anterior</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button key={page} onClick={() => goToPage(page)} className={`px-4 py-2 rounded-md ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>{page}</button>
          ))}
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50">Siguiente</button>
        </div>
      )}
    </div>
  );
}