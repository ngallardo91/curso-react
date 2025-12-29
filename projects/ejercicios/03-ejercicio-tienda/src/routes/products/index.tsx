import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import { ProductSkeleton } from '../../components/ProductSkeleton';


export const Route = createFileRoute('/products/')({
  component: ProductsComponent,
});

function ProductsComponent() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 8;

    // 🔹 Estados de filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);

    //Para ordenamiento
    const [sortBy, setSortBy] = useState('');

   

  //Filtro
  const filteredProducts = products
  ? products.filter((product) => {
      const matchesPrice =
        product.price >= minPrice && product.price <= maxPrice;

      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesPrice && matchesSearch;
    })
  : [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating.rate - a.rating.rate;
    if (sortBy === 'reviews') return b.rating.count - a.rating.count;
    return 0;
  });

  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(
    totalProducts / PRODUCTS_PER_PAGE
  );
  
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  //const endIndex = startIndex + PRODUCTS_PER_PAGE;
  
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    //endIndex
    startIndex + PRODUCTS_PER_PAGE
  );
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, minPrice, maxPrice, sortBy]);

// if (isLoading) {
//   return (
//     <div className="flex justify-center items-center min-h-[400px]">
//       {/* <div className="text-xl text-gray-600">Cargando productos...</div> */}
//       <LoadSpinner/>
//     </div>
//   );
// }
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

if (error) {
  return (
    <div className="text-center text-red-600 py-8">
      {/* Error al cargar los productos */}
      <ErrorMessage message="Error al cargar los productos." />
    </div>
  );
}

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Todos los Productos
      </h1>
        {/* ordenamiento */}
        <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Ordenar por...</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="rating">Mejor valorados</option>
            <option value="reviews">Más reseñas</option>
      </select>
      
     
      <div className="bg-white p-4 rounded-lg shadow mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2"
        />

      <input
          type="number"
          placeholder="Precio mínimo"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="border rounded px-3 py-2"
        />

        <input
          type="number"
          placeholder="Precio máximo"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="border rounded px-3 py-2"
        />

        <button
          onClick={() => {
            setSearchTerm('');
            setMinPrice(0);
            setMaxPrice(100000);
          }}
          className="bg-gray-200 hover:bg-gray-300 rounded px-4 py-2 font-semibold transition"
        >
          Limpiar filtros
        </button>
      </div>
      Mostrando {paginatedProducts.length} de {sortedProducts.length} productos
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))
            } */}
            {/* {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))} */}
             {paginatedProducts.length > 0 ? (
               paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-lg text-center">
            No se encontraron productos.
          </p>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-2">

</p>
      {/* Listado de productos
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 mt-12">
          No se encontraron productos.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )} */}

       {/* PAGINACION */}
       {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          <span className="font-medium">
            Página {currentPage} de {totalPages}
          </span>
          <button
            className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente 
          </button>
        </div>
      )}
     
  

    </div>
  );
}
