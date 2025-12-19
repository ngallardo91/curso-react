import { createFileRoute, Link } from '@tanstack/react-router';
import { useFavoritesStore } from '../store/favoritesStore';
import { useCartStore } from '../store/cartStore';

export const Route = createFileRoute('/favorites')({
  component: FavoritesComponent,
});

function FavoritesComponent() {
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const addToCart = useCartStore((state) => state.addToCart);

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="text-6xl mb-4 block">💔</span>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No tienes favoritos
        </h2>
        <p className="text-gray-600 mb-6">
          Agrega productos a tus favoritos para verlos aquí
        </p>
        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Mis Favoritos ({favorites.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <Link to="/products/$productId" params={{ productId: product.id.toString() }}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain p-4 bg-white"
              />
            </Link>
            <div className="p-4">
              <Link to="/products/$productId" params={{ productId: product.id.toString() }}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
                  {product.title}
                </h3>
              </Link>
              <div className="flex items-center mb-2">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm text-gray-600 ml-1">
                  {product.rating.rate} ({product.rating.count})
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-600 mb-4">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Agregar al Carrito
                </button>
                <button
                  onClick={() => removeFavorite(product.id)}
                  className="px-4 py-2 rounded-lg border border-red-300 text-red-500 hover:bg-red-50 transition-colors"
                  title="Quitar de favoritos"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
