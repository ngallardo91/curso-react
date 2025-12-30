import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const itemsEnCarrito = useCartStore((state) => state.getTotalItems());
  const itemsEnWishlist = useWishlistStore((state) => state.contarWishlist());
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo y links principales */}
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="text-xl font-bold text-blue-600 hover:text-blue-700 transition"
              >
                🛍️ MiTienda
              </Link>
              <div className="hidden md:flex gap-1">
                <Link
                  to="/products"
                  className="px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  activeProps={{
                    className: 'text-blue-600 bg-blue-50 font-medium',
                  }}
                >
                  Productos
                </Link>
                <Link
                  to="/categories"
                  className="px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  activeProps={{
                    className: 'text-blue-600 bg-blue-50 font-medium',
                  }}
                >
                  Categorías
                </Link>
                <Link
                  to="/registro"
                  className="px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  activeProps={{
                    className: 'text-blue-600 bg-blue-50 font-medium',
                  }}
                >
                  Registro
                </Link>
              </div>
            </div>

            {/* Iconos de la derecha */}
            <div className="flex items-center gap-4">
              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 text-gray-500 hover:text-red-500 transition-colors"
                title="Lista de deseos"
              >
                <span className="text-xl">♥</span>
                {itemsEnWishlist > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {itemsEnWishlist}
                  </span>
                )}
              </Link>

              {/* Carrito */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-500 hover:text-blue-600 transition-colors"
                title="Carrito de compras"
              >
                <span className="text-xl">🛒</span>
                {itemsEnCarrito > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {itemsEnCarrito}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
