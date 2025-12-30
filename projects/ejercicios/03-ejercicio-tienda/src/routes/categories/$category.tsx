import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { useCartStore } from '../../store/cartStore';
import { useState } from 'react';
import type { Product } from '../../types/product';

export const Route = createFileRoute('/categories/$category')({
  component: CategoryProductsComponent,
});

function CategoryProductsComponent() {
  const { category } = Route.useParams();
  const agregarProducto = useCartStore((state) => state.addToCart);
  const [productoAgregado, setProductoAgregado] = useState<number | null>(null);
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => productsApi.getByCategory(category),
  });

  const manejarAgregarCarrito = (producto: Product) => {
    agregarProducto(producto);
    setProductoAgregado(producto.id);
    setTimeout(() => setProductoAgregado(null), 1200);
  };
  
  if (isLoading) {
    return <div className="text-center py-8">Cargando productos...</div>;
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
              {product.title}
            </h3>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-500">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
            <p className="text-2xl font-bold text-blue-600 mb-3">
              ${product.price.toFixed(2)}
            </p>
            <button
              onClick={() => manejarAgregarCarrito(product)}
              className={`w-full py-2 rounded-lg font-medium transition-all ${
                productoAgregado === product.id
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {productoAgregado === product.id ? '✓ Agregado!' : 'Agregar al carrito'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
