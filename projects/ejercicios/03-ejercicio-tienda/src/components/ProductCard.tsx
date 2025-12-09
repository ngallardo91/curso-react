import type { Product } from '../types/product';
import { useCartStore } from '../store/cartStore';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { CustomAlert, type CustomAlertProps } from './CustomAlert';
import { useFavoriteStore } from '../store/favoriteStore';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  alert?: CustomAlertProps;
}

export function ProductCard({ product, alert }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [showAlert, setShowAlert] = useState(false);

  const { addToFavorites, removeFavorite, isFavorite } = useFavoriteStore();
  const favorite = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false)
    }, 3000);
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (favorite) {
      removeFavorite(product.id)
    } else {
      addToFavorites(product)
    }
  }
  
  return (
    <>
      {showAlert && (
        <CustomAlert description={alert?.description ?? "Producto agregado desde la lista"} color={alert?.color} />
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 card-hover animate-fadeIn h-full flex flex-col">
        <div className="relative">
          <button 
            onClick={toggleFavorite}
            className="absolute top-2 right-2 z-10 "
          >
            <Heart 
              className={`w-6 h-6 transition-colors duration-300 ${favorite ? "fill-red-600 text-red-600" : "text-gray-800"}`}
            />
          </button>

          <Link to="/products/$productId" params={{ productId: product.id.toString() }}>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain p-4 bg-white transition-transform duration-300 hover:scale-110"
            />
          </Link>
        </div>
        
        <div className="p-4 flex flex-col grow">
          <Link to="/products/$productId" params={{ productId: product.id.toString() }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
              {product.title}
            </h3>
          </Link>
          <div className="mt-auto">
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
      </div>
    </>
  );
}
