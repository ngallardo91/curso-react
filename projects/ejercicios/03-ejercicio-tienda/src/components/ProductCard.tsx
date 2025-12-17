// src/components/ProductCard.tsx

import type { Product } from '../types/product';
import { useCartStore } from '../store/cartStore'; 
import { useFavoritesStore } from '../store/favoritesStore'; // Importar el store
// use emoji for heart to avoid external icon dependency

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartStore();
  
  // Obtener funciones y estado del store de favoritos
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const isProdFavorite = isFavorite(product.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que el clic active la navegación al detalle
    if (isProdFavorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return (
    // ... (div principal con card-hover)
    <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover relative">
      
      {/* Botón de Favoritos (TAMAÑO MÁS PEQUEÑO) */}
      <button 
        onClick={handleToggleFavorite}
        className="absolute top-2 right-2 p-2 rounded-full bg-white/70 backdrop-blur-sm z-10 transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <span
          className={isProdFavorite ? "text-red-500 text-lg" : "text-gray-400 text-lg"}
          aria-hidden
        >
          ❤️
        </span>
      </button>

      {/* ... (Imagen y cuerpo del producto) */}
      
      {/* Botón de Agregar al Carrito */}
      <button 
        onClick={() => addToCart(product)}
        className="mt-4 w-full bg-blue-600 text-white py-2 hover:bg-blue-700 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
      >
        🛒 Agregar al Carrito
      </button>
    </div>
  );
};

export default ProductCard;