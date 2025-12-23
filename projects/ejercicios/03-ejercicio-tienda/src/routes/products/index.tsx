import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../../services/api";
import { ProductCard } from "../../components/ProductCard";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { ErrorMessage } from "../../components/ErrorMessage";
import { ProductSkeleton } from "../../components/ProductSkeleton";
import { useProductStore } from "../../store/productStore";

export const Route = createFileRoute("/products/")({
  component: ProductsComponent,
});

function ProductsComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const addProducts = useProductStore((state) => state.addProducts);
  const getTotalPages = useProductStore((state) => state.getTotalPages);
  const getTotalQuantity = useProductStore((state) => state.getTotalQuantity);
  const getPageProducts = useProductStore((state) => state.getPageProducts);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: productsApi.getAll,
  });

  addProducts(products || []);

  const filteredProducts = getPageProducts(pageSize, currentPage)?.filter(
    (product) => {
      const matchesPrice =
        product.price >= minPrice && product.price <= maxPrice;
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesPrice && matchesSearch;
    }
  );

  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating.rate - a.rating.rate;
    if (sortBy === "reviews") return b.rating.count - a.rating.count;
    return 0;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setMinPrice(0);
    setMaxPrice(1000);
    setSortBy("default");
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    minPrice !== 0 ||
    maxPrice !== 1000 ||
    sortBy !== "default";

  if (isLoading)
    return (
      <>
        <LoadingSpinner /> <ProductSkeleton />
      </>
    );
  if (isError) return <ErrorMessage />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Todos los Productos
      </h1>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscar por título
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="w-32">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio mín.
            </label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              min={0}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="w-32">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio máx.
            </label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              min={0}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ordenar por
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="default">Por defecto</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Valorados</option>
              <option value="reviews">Más Reseñas</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        <div className="mt-3 text-sm text-gray-600">
          Mostrando {sortedProducts?.length || 0} de {getTotalQuantity() || 0}{" "}
          productos
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {sortedProducts?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron productos con los filtros seleccionados.
        </div>
      )}

      <div className="flex justify-center items-center gap-4 mt-8">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Mostrar:</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
          </select>
          <span className="text-sm text-gray-600">por página</span>
        </div>

        {getTotalPages(pageSize) > 1 && (
          <>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Anterior
            </button>

            <div className="flex gap-1">
              {Array.from(
                { length: getTotalPages(pageSize) },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, getTotalPages(pageSize))
                )
              }
              disabled={currentPage === getTotalPages(pageSize)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </>
        )}
      </div>
    </div>
  );
}
