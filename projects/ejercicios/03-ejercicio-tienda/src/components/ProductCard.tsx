import type { Product } from '../types/product';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { Link } from '@tanstack/react-router';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const agregarAlCarrito = useCartStore((state) => state.addToCart);
  const alternarWishlist = useWishlistStore((state) => state.alternarWishlist);
  const enWishlist = useWishlistStore((state) => state.estaEnWishlist(product.id));
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 relative group">
      {/* Botón de wishlist */}
      <button
        onClick={() => alternarWishlist(product)}
        className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
          enWishlist
            ? 'bg-red-50 text-red-500 scale-110'
            : 'bg-white/80 text-gray-400 hover:text-red-400 hover:bg-red-50'
        }`}
        title={enWishlist ? 'Quitar de lista de deseos' : 'Guardar en lista de deseos'}
      >
        {enWishlist ? '♥' : '♡'}
      </button>

      <Link to="/products/$productId" params={{ productId: product.id.toString() }}>
        <div className="p-4 bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-44 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link to="/products/$productId" params={{ productId: product.id.toString() }}>
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition min-h-[48px]">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-sm text-gray-500">
            {product.rating.rate} ({product.rating.count} opiniones)
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => agregarAlCarrito(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium text-sm"
          >
            + Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
