
import type { Product } from '../types/product';
import { useCartStore } from '../store/cartStore';
import { Link } from '@tanstack/react-router';
import { useFavoritesStore } from '../store/favoritesStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  // ✅ Selectores simples para Zustand
  const isFav = useFavoritesStore((s) => s.favorites.some((p) => p.id === product.id));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 card-hover animate-fadeIn">
      <Link to="/products/$productId" params={{ productId: product.id.toString() }}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain p-4 bg-white transition-transform duration-300 hover:scale-110"
        />
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to="/products/$productId" params={{ productId: product.id.toString() }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
              {product.title}
            </h3>
          </Link>

          {/* ❤️ Botón de Favoritos: sólo actualiza estado al hacer click */}
          <button
            type="button"
            onClick={() => toggleFavorite(product)}
            aria-pressed={isFav}
            aria-label={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            className={[
              'shrink-0 rounded-md p-2 transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              isFav
                ? 'bg-pink-100 text-pink-600 hover:bg-pink-200 focus:ring-pink-300'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 focus:ring-gray-300',
            ].join(' ')}
          >
            <span className="text-xl" role="img" aria-hidden="true">❤️</span>
          </button>
        </div>

        <div className="flex items-center mb-2">
          <span className="text-yellow-500">⭐</span>
          <span className="text-sm text-gray-600 ml-1">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
``
