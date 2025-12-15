import type { Product } from '../types/product';
import { useCartStore } from '../store/cartStore';
import { Link } from '@tanstack/react-router';
import toast from 'react-hot-toast';
import { useFavoritesStore } from '../store/favoritesStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product.id));

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success('Producto agregado al carrito.');
    }
  };

  const handleFavoriteClick = () => {
    if (product) {
      if(isFavorite){ removeFavorite(product.id) } 
      else { addFavorite(product) };
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 card-hover animate-fadeIn">
      <div className="flex justify-end items-center">
        <button
          onClick={handleFavoriteClick}
          className="text-2xl p-2 hover:text-red-600 transition-colors duration-200"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
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
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
