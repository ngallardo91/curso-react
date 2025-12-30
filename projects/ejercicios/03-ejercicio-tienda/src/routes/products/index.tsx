import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { Cargando } from '../../components/Cargando';
import { MensajeError } from '../../components/MensajeError';

export const Route = createFileRoute('/products/')({
  component: ProductsComponent,
});

const PRODUCTOS_POR_PAGINA = 6;

type OrdenTipo = 'ninguno' | 'precio-menor' | 'precio-mayor' | 'mejor-puntuacion' | 'mas-vendidos';

function ProductsComponent() {
  // Filtros
  const [busqueda, setBusqueda] = useState('');
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(500);
  
  // Ordenamiento
  const [ordenar, setOrdenar] = useState<OrdenTipo>('ninguno');
  
  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);

  const { data: productos, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });

  // Aplicar filtros
  const productosFiltrados = useMemo(() => {
    if (!productos) return [];
    
    return productos.filter((p) => {
      const coincideBusqueda = p.title.toLowerCase().includes(busqueda.toLowerCase());
      const dentroDeRango = p.price >= precioMin && p.price <= precioMax;
      return coincideBusqueda && dentroDeRango;
    });
  }, [productos, busqueda, precioMin, precioMax]);

  // Aplicar ordenamiento
  const productosOrdenados = useMemo(() => {
    const copia = [...productosFiltrados];
    
    switch (ordenar) {
      case 'precio-menor':
        return copia.sort((a, b) => a.price - b.price);
      case 'precio-mayor':
        return copia.sort((a, b) => b.price - a.price);
      case 'mejor-puntuacion':
        return copia.sort((a, b) => b.rating.rate - a.rating.rate);
      case 'mas-vendidos':
        return copia.sort((a, b) => b.rating.count - a.rating.count);
      default:
        return copia;
    }
  }, [productosFiltrados, ordenar]);

  // Calcular paginación
  const totalPaginas = Math.ceil(productosOrdenados.length / PRODUCTOS_POR_PAGINA);
  
  const productosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    const fin = inicio + PRODUCTOS_POR_PAGINA;
    return productosOrdenados.slice(inicio, fin);
  }, [productosOrdenados, paginaActual]);

  // Limpiar todos los filtros
  const limpiarFiltros = () => {
    setBusqueda('');
    setPrecioMin(0);
    setPrecioMax(500);
    setOrdenar('ninguno');
    setPaginaActual(1);
  };

  // Cambiar página
  const irAPagina = (pagina: number) => {
    setPaginaActual(pagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <Cargando texto="Cargando catálogo..." />;
  }

  if (error) {
    return (
      <MensajeError
        texto="No se pudo cargar el catálogo de productos"
        onReintentar={() => window.location.reload()}
      />
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Catálogo de Productos
      </h1>

      {/* Panel de filtros */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Campo de búsqueda */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              🔍 Buscar producto
            </label>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setPaginaActual(1);
              }}
              placeholder="Escribe para buscar..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Rango de precio */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              💰 Precio: ${precioMin} - ${precioMax}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                value={precioMin}
                onChange={(e) => {
                  setPrecioMin(Number(e.target.value));
                  setPaginaActual(1);
                }}
                className="w-1/2 px-2 py-2 border border-gray-200 rounded-lg text-sm"
                placeholder="Min"
              />
              <input
                type="number"
                min="0"
                value={precioMax}
                onChange={(e) => {
                  setPrecioMax(Number(e.target.value));
                  setPaginaActual(1);
                }}
                className="w-1/2 px-2 py-2 border border-gray-200 rounded-lg text-sm"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Ordenar */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              📊 Ordenar
            </label>
            <select
              value={ordenar}
              onChange={(e) => setOrdenar(e.target.value as OrdenTipo)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="ninguno">Sin ordenar</option>
              <option value="precio-menor">Más baratos primero</option>
              <option value="precio-mayor">Más caros primero</option>
              <option value="mejor-puntuacion">Mejor puntuados</option>
              <option value="mas-vendidos">Más reseñas</option>
            </select>
          </div>
        </div>

        {/* Info y limpiar */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Mostrando {productosPaginados.length} de {productosOrdenados.length} productos
          </p>
          <button
            onClick={limpiarFiltros}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline"
          >
            ✕ Limpiar filtros
          </button>
        </div>
      </div>

      {/* Grid de productos */}
      {productosPaginados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productosPaginados.map((producto) => (
            <ProductCard key={producto.id} product={producto} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <p className="text-gray-400 text-lg mb-4">😕 No hay productos que coincidan</p>
          <button
            onClick={limpiarFiltros}
            className="text-blue-600 hover:underline font-medium"
          >
            Quitar filtros
          </button>
        </div>
      )}

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex justify-center items-center gap-1 mt-10">
          <button
            onClick={() => irAPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            ‹ Anterior
          </button>

          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => irAPagina(num)}
              className={`w-10 h-10 rounded-lg font-medium transition ${
                paginaActual === num
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => irAPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Siguiente ›
          </button>
        </div>
      )}
    </div>
  );
}
