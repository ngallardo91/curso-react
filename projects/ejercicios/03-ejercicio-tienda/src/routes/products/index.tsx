import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
// import { useState } from 'react';
import { CircleX, DollarSign, List, ListOrdered, Search } from "lucide-react";
import { ProductSkeleton } from '../../components/ProductSkeleton';
import { CustomAlert } from '../../components/CustomAlert';

type ProductsSearch = {
  page?: string | number;
  min?: string | number;
  max?: string | number;
  desc?: string;
  itemsQty?: string | number;
  sort?: string;
};

export const Route = createFileRoute('/products/')({
  component: ProductsComponent,
  validateSearch: (search: ProductsSearch) => ({
    page: Number(search.page ?? 1),
    min: Number(search.min ?? -1),
    max: Number(search.max ?? -1),
    desc: search.desc ?? "",
    itemsQty: Number(search.itemsQty ?? 8),
    sort: search.sort ?? "best-rated"
  })
});

function ProductsComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  // const [sortBy, setSortBy] = useState("best-rated");
  // const [minPrice, setMinPrice] = useState(-1);
  // const [maxPrice, setMaxPrice] = useState(-1);
  // const [description, setSearchItem] = useState("");
  // const [currentPage, setCurrentPage] = useState(page);
  // const [itemsPerPage, setItemsPerPage] = useState(8);
  const sortBy = search.sort;
  const minPrice = search.min;
  const maxPrice = search.max;
  const description = search.desc;
  const currentPage = search.page;
  const itemsPerPage = search.itemsQty;

  const filteredProducts = products?.filter((x) => x.price >= (minPrice === -1 ? 0 : minPrice) && x.price <= (maxPrice === -1 ? Infinity : maxPrice) && x.title.toLowerCase().includes(description.toLowerCase()))
  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    if (sortBy === "best-rated") return b.rating.rate - a.rating.rate;
    if (sortBy === "more-reviews") return b.rating.count - a.rating.count;
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  })

  const totalItems = filteredProducts?.length ?? 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage

  const paginatedProducts = sortedProducts.slice(startIndex, endIndex)
  
  if (isLoading) {
    return (
      <ProductSkeleton />
    );
  }
  
  if (error) {
    return (
      <CustomAlert description="Error al cargar el producto desde la lista" color="red" error={true}/>
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
            value={description}
            onChange={(e) => {
              // setSearchItem(e.target.value)
              // setCurrentPage(1)
              navigate({
                search: {
                  ...search,
                  desc: e.target.value,
                  page: 1
                }
              })
            }}
            className="border border-gray-400 rounded-lg p-2 w-full h-10 focus:ring-2 focus:ring-blue-700 outline-none"
          />
        </div>

        <div className="flex flex-row gap-2 text-md items-center">
          <DollarSign className="text-gray-800"/> Precio: 
        </div>

        <input 
          type="text"
          placeholder="Mínimo"
          value={minPrice === -1 ? "" : minPrice}
          onChange={(e) => {
            const value = e.target.value
            
            if (/^\d*$/.test(value)) {
              // setMinPrice(e.target.value === "" ? -1 : Number(e.target.value))
              // setCurrentPage(1)
              navigate({
                search: {
                  ...search,
                  min: (e.target.value === "" ? -1 : Number(e.target.value)),
                  page: 1
                }
              })
            }
          }}
          className="border border-gray-400 rounded-lg p-2 w-1/12 text-right focus:ring-2 focus:ring-blue-700 outline-none"
        />

        <div className="flex flex-row gap-2 text-md items-center">
          <DollarSign className="text-gray-800"/> 
        </div>

        <input 
          type="text"
          placeholder="Máximo"
          value={maxPrice === -1 ? "" : maxPrice}
          onChange={(e) => {
            const value = e.target.value
            
            if (/^\d*$/.test(value)) {
              // setMaxPrice(e.target.value === "" ? -1 : Number(e.target.value))
              // setCurrentPage(1)
              navigate({
                search: {
                  ...search,
                  max: (e.target.value === "" ? -1 : Number(e.target.value)),
                  page: 1
                }
              })
            }
          }}
          className="border border-gray-400 rounded-lg p-2 w-1/12 text-right focus:ring-2 focus:ring-blue-700 outline-none"
        />

        <div className="flex items-center relative group">
          <CircleX 
            role="button" 
            onClick={() => {
              // setCurrentPage(1)
              // setMinPrice(-1)
              // setMaxPrice(-1)
              // setSearchItem("")
              navigate({
                search: {
                  ...search,
                  min: -1,
                  max: -1,
                  desc: "",
                  page: 1
                }
              })
            }} 
            className="text-red-500 w-6 h-6 cursor-pointer" 
          />

          <span className="absolute top-9 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap">
            Limpiar Filtros
          </span>
        </div>

        <div className="flex flex-row gap-2 w-fit border border-gray-400 rounded-lg px-2 focus:ring-2 focus:ring-blue-700 outline-none ml-auto">
          <div className="flex flex-row gap-2 text-md items-center">
            <List className="text-gray-800"/> 
          </div>

          <select
            className="px-2 outline-none"
            value={itemsPerPage}
            onChange={(e) => {
              // setCurrentPage(1)
              // setItemsPerPage(Number(e.target.value as "8" | "12" | "12"))
              navigate({
                search: {
                  ...search,
                  itemsQty: (Number(e.target.value as "8" | "12" | "12")),
                  page: 1
                }
              })
            }}
          >
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="20">20</option>
          </select>
        </div>
        <div className="flex flex-row gap-2 w-fit border border-gray-400 rounded-lg px-2 focus:ring-2 focus:ring-blue-700 outline-none">
          <div className="flex flex-row gap-2 text-md items-center">
            <ListOrdered className="text-gray-800"/> 
          </div>

          <select
            className="px-2 outline-none"
            value={sortBy}
            onChange={(e) => {
              // setSortBy(e.target.value as "best-rated" | "more-reviews" | "price-asc" | "price-desc")
              navigate({
                search: {
                  ...search,
                  sort: (e.target.value as "best-rated" | "more-reviews" | "price-asc" | "price-desc"),
                  page: 1
                }
              })
            }}
          >
            <option value="best-rated">Mejor Valorados</option>
            <option value="more-reviews">Más Reseñas</option>
            <option value="price-asc">Menor Precio</option>
            <option value="price-desc">Mayor Precio</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {paginatedProducts.map((product) => 
          <ProductCard key={product.id} product={product} />
        )}
      </div>
      <div className="flex justify-center items-center gap-4 mt-6">
        {totalPages > 0 &&
          <button
            className={`px-4 py-2 rounded-lg border ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 hover:border-blue-500"
            }`}
            disabled={currentPage === 1}
            onClick={() => { 
              // setCurrentPage((p) => p - 1)
              navigate({
                search: {
                  ...search,
                  page: currentPage - 1
                }
              })
            }}
          >
            Anterior
          </button>
        }
        
        <span className="text-lg font-semibold">
          {totalPages === 0 ? "No se encontraron productos" : `${currentPage} / ${totalPages}`}
        </span>

        {totalPages > 0 &&
          <button
            className={`px-4 py-2 rounded-lg border ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 hover:border-blue-500"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => { 
              // setCurrentPage((p) => p + 1)
              navigate({
                search: {
                  ...search,
                  page: currentPage + 1
                }
              })
            }}
          >
            Siguiente
          </button>
        }
      </div>
    </div>
  );
}
