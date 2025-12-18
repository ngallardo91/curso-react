
// src/routes/products/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
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
  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  })

  // Estados de filtros (Tarea 3)
  const [searchTerm, setSearchTerm] = useState('')
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')

  // Estado de ordenamiento (Tarea 5)
  const [sortBy, setSortBy] = useState<SortBy>('price_asc')

  // 🆕 Estados de paginación (Tarea 7)
  const [itemsPerPage, setItemsPerPage] = useState<number>(12)
  const [currentPage, setCurrentPage] = useState<number>(1)

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

  // 🆕 Paginación (Tarea 7 - cálculo)
  const totalItems = sortedProducts.length
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))

  // Resetear a página 1 cuando cambian filtros/orden/tamaño de página
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, minPrice, maxPrice, sortBy, itemsPerPage])

  // Ajustar currentPage si queda fuera de rango (por ejemplo, al filtrar)
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  // ✅ Calcular qué productos mostrar según la página
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return sortedProducts.slice(start, end)
  }, [sortedProducts, currentPage, itemsPerPage])

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

          {/* Selector de orden (Tarea 5 - Paso 2) */}
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

        {/* Selector de tamaño de página */}
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="text-gray-600">Mostrar por página:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Cantidad de productos por página"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>
      </div>

      {/* Grid de productos */}
      {sortedProducts.length === 0 ? (
        <div className="text-center text-gray-600 py-12">
          No se encontraron productos con los filtros seleccionados.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Controles de paginación */}
          <nav
            className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
            aria-label="Navegación de páginas"
          >
            {/* Info de página */}
            <div className="text-sm text-gray-600">
              Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong> •{' '}
              Mostrando {paginatedProducts.length} de {totalItems}
            </div>

            {/* Botones y números */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`rounded-md border px-3 py-2 text-sm ${
                  currentPage === 1
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                ← Anterior
              </button>

              {/* Números de página (compacto, con elipsis) */}
              <PageNumbers
                currentPage={currentPage}
                totalPages={totalPages}
                onSelect={(n) => setCurrentPage(n)}
              />

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`rounded-md border px-3 py-2 text-sm ${
                  currentPage === totalPages
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Siguiente →
              </button>
            </div>
          </nav>
        </>
      )}
    </div>
  )
}

/**
 * Componente auxiliar para números de página con elipsis.
 * Muestra: 1 … prev current next … last
 */
function PageNumbers({
  currentPage,
  totalPages,
  onSelect,
}: {
  currentPage: number
  totalPages: number
  onSelect: (page: number) => void
}) {
  if (totalPages <= 1) return null

  // Construimos una lista compacta de páginas a mostrar
  const pages: (number | 'ellipsis')[] = []

  const add = (p: number) => {
    if (p >= 1 && p <= totalPages && !pages.includes(p)) pages.push(p)
  }

  add(1)

  // Páginas alrededor de la actual
  add(currentPage - 1)
  add(currentPage)
  add(currentPage + 1)

  add(totalPages)

  // Ordenamos y metemos elipsis
  const sorted = [...pages].sort((a, b) => {
    const na = typeof a === 'number' ? a : 0
    const nb = typeof b === 'number' ? b : 0
    return na - nb
  })

  const display: (number | 'ellipsis')[] = []
  for (let i = 0; i < sorted.length; i++) {
    const curr = sorted[i]
    const prev = sorted[i - 1]
    if (i > 0 && typeof curr === 'number' && typeof prev === 'number') {
      if (curr - prev > 1) {
        display.push('ellipsis')
      }
    }
    display.push(curr)
  }

  return (
    <ul className="flex items-center gap-1" role="list">
      {display.map((item, idx) =>
        item === 'ellipsis' ? (
          <li key={`el-${idx}`} className="px-2 text-gray-400 select-none">
            …
          </li>
        ) : (
          <li key={`pg-${item}`}>
            <button
              type="button"
              onClick={() => onSelect(item)}
              aria-current={item === currentPage ? 'page' : undefined}
              className={`min-w-[2.25rem] rounded-md border px-3 py-2 text-sm ${
                item === currentPage
                  ? 'border-blue-600 text-blue-700 font-semibold bg-blue-50'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item}
            </button>
          </li>
        )
      )}
    </ul>
  )
}
``
