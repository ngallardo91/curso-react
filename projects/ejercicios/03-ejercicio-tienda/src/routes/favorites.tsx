import { createFileRoute } from '@tanstack/react-router';
import { useFavoriteStore } from '../store/favoriteStore';
import { ProductCard } from '../components/ProductCard';

export const Route = createFileRoute('/favorites')({
  component: FavoriteComponent,
});

function FavoriteComponent() {
  const items = useFavoriteStore((state) => state.items);
  
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">❤️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Tu lista de favoritos está vacía
        </h2>
        <p className="text-gray-600 mb-6">
          ¡Guarda productos en favoritos!
        </p>
        <a
          href="/products"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl inline-block"
        >
          Ir a Productos
        </a>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Lista de Favoritos
        </h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItemComponent key={item.product.id} item={item} />
          ))}
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items?.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
      </div>
    </div>
  );
}
