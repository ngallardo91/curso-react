import { Link } from "@tanstack/react-router";
import type { Product } from "../types/product";
import { useFavoriteStore } from "../store/favoriteStore";

interface FavoriteProductCardProps {
  product: Product;
}

export function FavoriteProductCard({ product }: FavoriteProductCardProps) {
  const removeFromFavorites = useFavoriteStore((state) => state.removeFromFavorites);

  
  

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 card-hover animate-fadeIn">
      <div className="relative">
        {/* Imagen + link */}
        <Link
          to="/products/$productId"
          params={{ productId: product.id.toString() }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain p-4 bg-white transition-transform duration-300 hover:scale-110"
          />
        </Link>
        <button
          onClick={() => removeFromFavorites(product.id)}
          className="absolute top-3 right-3 bg-red-600 text-white rounded-full px-3 py-1 text-sm shadow hover:bg-red-700 transition"
        >
          Quitar
        </button>
      </div>

      <div className="p-4">
        {/* Título */}
        <Link
          to="/products/$productId"
          params={{ productId: product.id.toString() }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <span className="text-yellow-500">⭐</span>
          <span className="text-sm text-gray-600 ml-1">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>

        {/* Precio */}
        <span className="text-2xl font-bold text-blue-600">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
