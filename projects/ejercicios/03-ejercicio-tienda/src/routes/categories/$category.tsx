import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { useCartStore } from '../../store/cartStore';
import Spinner from '../../components/LoadingSpinner';
import ErrorMsg from '../../components/ErrorMsg';
import { useEffect, useState } from 'react';
import ComponentFilter, { type PriceFilter } from '../../components/ComponentFilter';

export const Route = createFileRoute('/categories/$category')({
  component: CategoryProductsComponent,
});

function CategoryProductsComponent() {
  const { category } = Route.useParams();
  const addToCart = useCartStore((state) => state.addToCart);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => productsApi.getByCategory(category),
  });

  /* Filtros y ordenamiento */
  const [filter, setFilter] = useState<PriceFilter>({
    searchTerm: '',
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: '',
  });

  /* Paginación */
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  // FILTRO
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

  // --- ORDENO ---
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filter.sortBy === 'price-asc') return a.price - b.price;
    if (filter.sortBy === 'price-desc') return b.price - a.price;
    if (filter.sortBy === 'best-rated') return b.rating.rate - a.rating.rate;
    if (filter.sortBy === 'most-reviews') return b.rating.count - a.rating.count;
    return 0;
  });

  // --- PAGINACIÓN ---
  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Resetear página cuando cambian filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // Si cambio de categoría, reseteo filtros y página
  useEffect(() => {
    setFilter({
      searchTerm: '',
      minPrice: undefined,
      maxPrice: undefined,
      sortBy: '',
    });
    setCurrentPage(1);
  }, [category]);
  
  {/*
  if (isLoading) {
    return <div className="text-center py-8">Cargando productos...</div>;
  }
  */}
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return  <ErrorMsg message="Error al cargar los productos de la categoria seleccionada" />
  }


  return (
    <div>
      <a
        href="/categories"
        className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
      >
        ← Volver a categorías
      </a>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-6 capitalize">
        {category}
      </h1>
        {/* FILTROS */}
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
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </p>

              <button
                onClick={() => addToCart(product)}
                className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg 
                           hover:bg-blue-700 transition-all duration-200 
                           transform hover:scale-105 active:scale-95 font-medium"
              >
                Agregar al carrito
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
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