import type { Product } from '../types/product';
import { useCartStore } from '../store/cartStore';
import { useFavoritesStore } from '../store/favoritesStore';
import { Link } from '@tanstack/react-router';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product.id));
  
  return (
    <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 card-hover animate-fadeIn relative group border border-gray-100">
      
      {/* Botón Favoritos */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(product);
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 shadow-sm transition-transform hover:scale-110 active:scale-95 text-xl"
        title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      <Link to="/products/$productId" params={{ productId: product.id.toString() }}>
        <div className="overflow-hidden p-4 bg-white dark:bg-white/90 transition-colors">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-110"
            />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to="/products/$productId" params={{ productId: product.id.toString() }}>
          {/* Texto del título: Negro en light, Blanco en dark */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center mb-2">
          <span className="text-yellow-500">⭐</span>
          <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={(e) => {
                e.preventDefault();
                addToCart(product);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium shadow-sm hover:shadow-md"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}