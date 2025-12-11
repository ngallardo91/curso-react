import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { useProductFilters } from '../../services/useProductsFilters';
import { useMemo, useState } from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { PaginationControls } from '../../components/PaginationControls';

export const Route = createFileRoute('/products/')({
  component: ProductsComponent,
});

function ProductsComponent() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });
  const [sortBy, setSortBy] = useState('none')
  
  const productsToFilter = products || [];

  const { 
        filteredProducts,
        minPrice, setMinPrice,
        maxPrice, setMaxPrice,
        searchTerm, setSearchTerm,
        resetFilters
    } = useProductFilters(productsToFilter);

  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'mejor-valorados') return b.rating.rate - a.rating.rate
    if (sortBy === 'mas-resenias') return b.rating.count - a.rating.count
    return 0;
  });

  const PRODUCTS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedProducts = useMemo(() => {
        const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
        const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
        
        // Retorna solo la porción del array que corresponde a la página actual
        return sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    }, [sortedProducts, currentPage]); // Se recalcula cuando la lista ordenada o la página cambian
    
    // CALCULA EL TOTAL DE PÁGINAS
    const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);



  if (isLoading) {
    return <LoadingSpinner className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-4" />;
    // return (
    //   <div className="flex justify-center items-center min-h-[400px]">
    //     <div className="text-xl text-gray-600">Cargando productos...</div>
    //   </div>
    // );
  }
  
  if (error) {
    return (
            <div className="p-4 max-w-xl mx-auto mt-10">
                <ErrorMessage 
                    // El error contiene el mensaje del servidor o de TanStack Query
                    message={`Error al cargar los productos`} 
                />
            </div>
        );
    // return (
    //   <div className="text-center text-red-600 py-8">
    //     Error al cargar los productos
    //   </div>
    // );
  }

  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Todos los Productos
      </h1>
      <div>
        <input 
            type="number" 
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="Precio Mínimo"
        />
        <input 
            type="number" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="Precio Máximo"
        />
        <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Buscar por Título"
        />
        <button
                    onClick={resetFilters}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Resetear Filtros
                </button>
      </div>
      <div>
            {/* Componente que cambia el estado sortBy */}
            <select onChange={(e) => setSortBy(e.target.value)}>
                <option value="none">Ordenar por...</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="mejor-valorados">Mejor valorados</option>
                <option value="mas-resenias">Más comentarios</option>
            </select>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <PaginationControls 
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
    </div>
  );
}
