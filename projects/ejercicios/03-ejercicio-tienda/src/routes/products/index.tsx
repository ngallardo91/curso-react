
// src/routes/products/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { productsApi } from '../../services/api'
import { ProductCard } from '../../components/ProductCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'
import type { Product } from '../../types/product'




// Criterios de orden disponibles (actualizados)
type SortBy = 'price_asc' | 'price_desc' | 'rating_desc' | 'rating_count_desc'

export const Route = createFileRoute('/products/')({
  component: ProductsComponent,
})

function ProductsComponent() {
  const { data: products = [], isLoading, isError, error, refetch, isFetching } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  })

  // Estados de filtros (Tarea 3)
  const [searchTerm, setSearchTerm] = useState('')
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')

  // 🆕 Estado de ordenamiento (Tarea 5 - Paso 1)
  const [sortBy, setSortBy] = useState<SortBy>('price_asc')

  // Preparación de filtros
  const min = minPrice.trim() === '' ? NaN : Number(minPrice)
  const max = maxPrice.trim() === '' ? NaN : Number(maxPrice)

  // Filtro client-side (Tarea 3 - Paso 2)
  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()

    return products.filter((p) => {
      const matchesTitle = q === '' ? true : p.title.toLowerCase().includes(q)
      const matchesMin = Number.isNaN(min) ? true : p.price >= min
      const matchesMax = Number.isNaN(max) ? true : p.price <= max
      return matchesTitle && matchesMin && matchesMax
    })
  }, [products, searchTerm, min, max])

  // 🧭 Ordenamiento client-side (Tarea 5 - Paso 3)
  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts] // no mutar el original

    const cmpTitleAsc = (a: Product, b: Product) => a.title.localeCompare(b.title)
    const getRate = (p: Product) => p.rating?.rate ?? 0
    const getCount = (p: Product) => p.rating?.count ?? 0

    switch (sortBy) {
      case 'price_asc':
        return arr.sort((a, b) => {
          const byPrice = a.price - b.price
          if (byPrice !== 0) return byPrice
          // tie-breaker: título A→Z
          return cmpTitleAsc(a, b)
        })

      case 'price_desc':
        return arr.sort((a, b) => {
          const byPrice = b.price - a.price
          if (byPrice !== 0) return byPrice
          // tie-breaker: título A→Z
          return cmpTitleAsc(a, b)
        })

      case 'rating_desc':
        return arr.sort((a, b) => {
          const byRate = getRate(b) - getRate(a)
          if (byRate !== 0) return byRate
          // tie-breaker: más reseñas primero
          const byCount = getCount(b) - getCount(a)
          if (byCount !== 0) return byCount
          // último desempate: título A→Z
          return cmpTitleAsc(a, b)
        })

      case 'rating_count_desc':
        return arr.sort((a, b) => {
          const byCount = getCount(b) - getCount(a)
          if (byCount !== 0) return byCount
          // tie-breaker: mejor rating primero
          const byRate = getRate(b) - getRate(a)
          if (byRate !== 0) return byRate
          // último desempate: título A→Z
          return cmpTitleAsc(a, b)
        })

      default:
        return arr
    }
  }, [filteredProducts, sortBy])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <ErrorMessage />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Todos los Productos
      </h1>

      {/* Panel de filtros + control de orden */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Buscar */}
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Buscar por título
            </label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ej: mochila, reloj, camiseta…"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Precio mínimo */}
          <div>
            <label
              htmlFor="priceMin"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Precio mínimo
            </label>
            <input
              id="priceMin"
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Ej: 100"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Precio máximo */}
          <div>
            <label
              htmlFor="priceMax"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Precio máximo
            </label>
            <input
              id="priceMax"
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Ej: 500"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Resumen + limpiar filtros + selector de orden */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Resultados: {sortedProducts.length}</span>
            {(searchTerm || minPrice || maxPrice) && (
              <>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('')
                    setMinPrice('')
                    setMaxPrice('')
                  }}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Limpiar filtros
                </button>
              </>
            )}
          </div>

          {/* 🆕 Selector de orden (Tarea 5 - Paso 2) */}
          <label className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Ordenar productos"
            >
              <option value="price_asc">Precio: Menor a Mayor</option>
              <option value="price_desc">Precio: Mayor a Menor</option>
              <option value="rating_desc">Mejor Valorados</option>
              <option value="rating_count_desc">Más Reseñas</option>
            </select>
          </label>
        </div>
      </div>

      {/* Grid de productos */}
      {sortedProducts.length === 0 ? (
        <div className="text-center text-gray-600 py-12">
          No se encontraron productos con los filtros seleccionados.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
