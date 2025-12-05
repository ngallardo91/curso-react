import type { CartItem } from '../types/product';
import { useCartStore } from '../store/cartStore';

interface CartItemProps {
  item: CartItem;
}

export function CartItemComponent({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4 animate-fadeIn hover:shadow-lg transition-shadow duration-300">
      <img
        src={item.product.image}
        alt={item.product.title}
        className="w-24 h-24 object-contain transition-transform duration-200 hover:scale-110"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {item.product.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {item.product.description}
        </p>
        <p className="text-xl font-bold text-blue-600">
          ${item.product.price.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 font-bold transition-all duration-200 transform hover:scale-110 active:scale-95"
        >
          -
        </button>
        <span className="text-lg font-semibold w-8 text-center transition-all duration-200">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 font-bold transition-all duration-200 transform hover:scale-110 active:scale-95"
        >
          +
        </button>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold text-gray-900 mb-2">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeFromCart(item.product.id)}
          className="text-red-600 hover:text-red-700 text-sm font-semibold transition-all duration-200 hover:scale-105"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
