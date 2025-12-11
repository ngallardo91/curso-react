import type { Product } from '../types/product';
import { useFavoriteStore } from '../store/favoriteStore';
import { Heart } from 'lucide-react'; 

interface AddToFavoritesButtonProps {
  product: Product;
}

export const AddToFavoritesButton: React.FC<AddToFavoritesButtonProps> = ({ product }) => {
    const addToFavorites = useFavoriteStore((state) => state.addToFavorites);
    const removeFromFavorites = useFavoriteStore((state) => state.removeFromFavorites);
    const esFavorito = useFavoriteStore((state) => state.isFavorite(product.id));

    const handleToggleFavorite = () => {
          if (esFavorito) { 
                removeFromFavorites(product.id);
          } else {
          addToFavorites(product);
          }
    };

    const baseClasses = 'p-2 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 transform hover:scale-110 active:scale-95';
    const colorClasses = esFavorito
          ? 'text-red-500 hover:text-red-600'
          : 'text-gray-400 hover:text-red-500';

    return (
          <button
                onClick={handleToggleFavorite}
                className={`${baseClasses} ${colorClasses}`}
                aria-label={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
                <Heart 
                      className="size-6"
                      fill={esFavorito ? 'currentColor' : 'none'} 
                      strokeWidth={1.5}
                />
          </button>
    );
};