// AddToCartButton.tsx

import React from 'react';
import type { Product } from '../types/product';
import { useCartStore } from '../store/cartStore';

interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      onClick={() => addToCart(product)}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium"
    >
      Agregar
    </button>
  );
};