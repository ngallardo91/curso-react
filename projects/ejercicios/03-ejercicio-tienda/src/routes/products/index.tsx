import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { useState } from 'react';
import { CircleX, DollarSign, ListOrdered, Search } from "lucide-react";
import { ProductSkeleton } from '../../components/ProductSkeleton';

export const Route = createFileRoute('/products/')({
  component: ProductsComponent,
});

function ProductsComponent() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  const [sortBy, setSortBy] = useState("best-rated");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(99999);
  const [searchItem, setSearchItem] = useState("");
  
  if (isLoading) {
    return (
      // <div className="flex justify-center items-center min-h-[400px]">
      //   <div className="text-xl text-gray-600">Cargando productos...</div>
      // </div>
      <ProductSkeleton />
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

      <div className="flex flex-row h-10 gap-4 flex-nowrap">
        <div className="flex flex-row gap-2 w-1/4">
          <div className="flex flex-row gap-2 text-md items-center">
            <Search className="text-gray-800"/> Filtros: 
          </div>

          <input 
            type="text"
            placeholder="Descripción..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="border border-gray-400 rounded-lg p-2 w-full h-10 focus:ring-2 focus:ring-blue-700 outline-none"
          />
        </div>

        <div className="flex flex-row gap-2 text-md items-center">
          <DollarSign className="text-gray-800"/> Precio Mínimo: 
        </div>

        <input 
          type="text"
          placeholder="Precio Mínimo"
          value={minPrice}
          onChange={(e) => {
            const value = e.target.value
            
            if (/^\d*$/.test(value)) {
              setMinPrice(Number(e.target.value))
            }
          }}
          className="border border-gray-400 rounded-lg p-2 w-1/12 text-right focus:ring-2 focus:ring-blue-700 outline-none"
        />

        <div className="flex flex-row gap-2 text-md items-center">
          <DollarSign className="text-gray-800"/> Precio Máximo: 
        </div>

        <input 
          type="text"
          placeholder="Precio Máximo"
          value={maxPrice}
          onChange={(e) => {
            const value = e.target.value
            
            if (/^\d*$/.test(value)) {
              setMaxPrice(Number(e.target.value))
            }
          }}
          className="border border-gray-400 rounded-lg p-2 w-1/12 text-right focus:ring-2 focus:ring-blue-700 outline-none"
        />

        <div className="flex items-center relative group">
          <CircleX 
            role="button" 
            onClick={() => {
              setMinPrice(0)
              setMaxPrice(99999)
              setSearchItem("")
            }} 
            className="text-red-500 w-6 h-6 cursor-pointer" 
          />

          <span className="absolute top-9 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap">
            Limpiar Filtros
          </span>
        </div>

        <div className="flex flex-row gap-2 w-fit border border-gray-400 rounded-lg px-2 focus:ring-2 focus:ring-blue-700 outline-none ml-auto">
          <div className="flex flex-row gap-2 text-md items-center">
            <ListOrdered className="text-gray-800"/> 
          </div>

          <select
            className="px-2 outline-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "best-rated" | "more-reviews" | "price-asc" | "price-desc")}
          >
            <option value="best-rated">Mejor Valorados</option>
            <option value="more-reviews">Más Reseñas</option>
            <option value="price-asc">Menor Precio</option>
            <option value="price-desc">Mayor Precio</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {products?.filter((x) => x.price >= minPrice && x.price <= maxPrice && x.title.toLowerCase().includes(searchItem.toLowerCase()))
                  .sort((a, b) => {
                    if (sortBy === "best-rated") return b.rating.rate - a.rating.rate;
                    if (sortBy === "more-reviews") return b.rating.count - a.rating.count;
                    if (sortBy === "price-asc") return a.price - b.price;
                    if (sortBy === "price-desc") return b.price - a.price;
                    return 0;
                  })
                  .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
