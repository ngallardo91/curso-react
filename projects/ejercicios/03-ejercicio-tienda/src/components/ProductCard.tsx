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
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };
  
  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 card-hover animate-fadeIn relative">
      <button
        onClick={handleToggleFavorite}
        className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 ${
          isFavorite
            ? 'bg-red-500 text-white shadow-lg animate-pulse'
            : 'bg-white text-gray-400 hover:text-red-500 shadow-md group-hover:bg-red-50'
        }`}
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        <span className="text-xl transition-transform duration-200 hover:scale-125">{isFavorite ? '❤️' : '🤍'}</span>
      </button>
      
      <Link to="/products/$productId" params={{ productId: product.id.toString() }} className="block overflow-hidden">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>
      <div className="p-4">
        <Link to="/products/$productId" params={{ productId: product.id.toString() }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 transition-colors duration-200 group-hover:text-blue-600">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 transition-transform duration-200 group-hover:scale-110">⭐</span>
          <span className="text-sm text-gray-600 ml-1">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent transition-transform duration-200 group-hover:scale-105">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium shadow-md hover:shadow-lg"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
