import { createFileRoute, Link } from '@tanstack/react-router';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';

export const Route = createFileRoute('/wishlist')({
  component: WishlistComponent,
});

function WishlistComponent() {
  const listaDeseos = useWishlistStore((state) => state.lista);
  const quitarProducto = useWishlistStore((state) => state.quitarDeWishlist);
  const agregarAlCarrito = useCartStore((state) => state.addToCart);

  if (listaDeseos.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="text-6xl block mb-4">📋</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Tu lista de deseos está vacía
        </h2>
        <p className="text-gray-500 mb-6">
          Guarda productos que te interesen para verlos después
        </p>
        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Explorar Productos
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Mi Lista de Deseos
        </h1>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {listaDeseos.length} producto{listaDeseos.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {listaDeseos.map((producto) => (
          <div
            key={producto.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link to="/products/$productId" params={{ productId: producto.id.toString() }}>
              <div className="p-4 bg-gray-50">
                <img
                  src={producto.image}
                  alt={producto.title}
                  className="w-full h-40 object-contain"
                />
              </div>
            </Link>
            <div className="p-4">
              <Link to="/products/$productId" params={{ productId: producto.id.toString() }}>
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition">
                  {producto.title}
                </h3>
              </Link>
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                <span className="text-yellow-400">★</span>
                {producto.rating.rate} ({producto.rating.count})
              </div>
              <p className="text-xl font-bold text-blue-600 mb-4">
                ${producto.price.toFixed(2)}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => agregarAlCarrito(producto)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                >
                  🛒 Al carrito
                </button>
                <button
                  onClick={() => quitarProducto(producto.id)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition"
                  title="Eliminar de la lista"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
