import type { Product } from '../types/product';
import { useCartStore } from '../store/cartStore';
import { useFavoritesStore } from '../store/favoritesStore';
import { Link } from '@tanstack/react-router';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);
  const isFav = useFavoritesStore((s) => s.favorites.some((p) => p.id === product.id));
  
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
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => {
              addToCart(product);
              toast.success(`${product.title} agregado al carrito`);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium"
          >
            Agregar
          </button>
          <button
            onClick={() => {
              if (isFav) {
                removeFavorite(product.id);
                toast(`${product.title} removido de favoritos`);
              } else {
                addFavorite(product);
                toast.success(`${product.title} agregado a favoritos`);
              }
            }}
            aria-label="Favorito"
            className={`ml-2 px-3 py-2 rounded-md transition-colors ${isFav ? 'text-red-500' : 'text-gray-400'}`}
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
}
