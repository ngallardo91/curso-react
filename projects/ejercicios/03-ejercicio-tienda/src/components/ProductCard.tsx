import type { Product } from '../types/product';
import { useCartStore } from '../store/cartStore';
import { useFavoritesStore } from '../store/favoritesStore';
import { Link } from '@tanstack/react-router';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <div className="bg-white dark:bg-gray-900 dark:border dark:border-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 card-hover animate-fadeIn flex flex-col">
      <div className="relative">
        <Link
          to="/products/$productId"
          params={{ productId: product.id.toString() }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain p-4 bg-white dark:bg-gray-900 transition-transform duration-300 hover:scale-110"
          />
        </Link>

        <button
          type="button"
          onClick={() => toggleFavorite(product)}
          className="absolute top-3 right-3 rounded-full p-2 bg-white/90 dark:bg-gray-800/90 shadow-md hover:scale-110 transition-transform duration-200"
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <span
            className={`text-xl ${
              isFavorite ? 'text-red-500' : 'text-gray-300'
            }`}
          >
            ♥
          </span>
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-gray-100">
          {product.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ⭐ {product.rating?.rate?.toFixed
                ? product.rating.rate.toFixed(1)
                : product.rating?.rate}{' '}
              ({product.rating?.count ?? 0} reseñas)
            </span>
            <span className="text-2xl font-bold text-blue-600 mt-1">
              ${product.price}
            </span>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium text-sm"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
