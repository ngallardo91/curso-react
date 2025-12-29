import { useState } from 'react';
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
  const [isAdding, setIsAdding] = useState(false);
  const [favAnimation, setFavAnimation] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 300);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    setFavAnimation(true);
    setTimeout(() => setFavAnimation(false), 300);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden card-hover animate-fadeIn relative group">
      {/* Botón de favoritos */}
      <button
        onClick={handleToggleFavorite}
        className={`absolute top-3 right-3 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110 ${
          favAnimation ? 'animate-softBounce' : ''
        }`}
        title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        <span className={`text-xl transition-transform duration-200 ${isFavorite ? 'scale-110' : 'scale-100'}`}>
          {isFavorite ? '❤️' : '🤍'}
        </span>
      </button>

      {/* Badge de descuento (ejemplo visual) */}
      {product.price > 100 && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
          HOT 🔥
        </div>
      )}

      <Link to="/products/$productId" params={{ productId: product.id.toString() }}>
        <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain p-4 img-zoom"
          />
          {/* Overlay en hover */}
          <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-all duration-300" />
        </div>
      </Link>

      <div className="p-4">
        <Link to="/products/$productId" params={{ productId: product.id.toString() }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.round(product.rating.rate)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">
            ({product.rating.count})
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className={`bg-blue-600 text-white px-4 py-2 rounded-lg font-medium btn-ripple transition-all duration-200 ${
              isAdding 
                ? 'scale-95 bg-green-500' 
                : 'hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5'
            }`}
          >
            {isAdding ? '✓' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
}
