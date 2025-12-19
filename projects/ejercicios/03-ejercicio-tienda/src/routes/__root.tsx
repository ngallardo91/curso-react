
import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useCartStore } from '../store/cartStore';

import { useFavoritesStore } from '../store/favoritesStore';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  
  const favoritesCount = useFavoritesStore((s) => s.favorites.length);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <nav className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-xl font-bold text-gray-900 hover:text-blue-600"
              >
                Mi Tienda
              </Link>

              <div className="flex space-x-4">
                <Link
                  to="/products"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-all duration-200 hover:bg-blue-50"
                  activeProps={{
                    className: 'text-blue-600 font-semibold bg-blue-50',
                  }}
                >
                  Productos
                </Link>

                <Link
                  to="/categories"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-all duration-200 hover:bg-blue-50"
                  activeProps={{
                    className: 'text-blue-600 font-semibold bg-blue-50',
                  }}
                >
                  Categorías
                </Link>

                
                <Link
                  to="/favorites"
                  className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md transition-all duration-200 hover:bg-pink-50 flex items-center gap-2"
                  activeProps={{
                    className: 'text-pink-600 font-semibold bg-pink-50',
                  }}
                  title="Ver favoritos"
                >
                  <span className="text-lg" role="img" aria-hidden="true">❤️</span>
                  <span>Favoritos</span>
                  {favoritesCount > 0 && (
                    <span
                      aria-label="Cantidad de favoritos"
                      className="ml-1 bg-pink-100 text-pink-600 rounded-full px-2 py-0.5 text-xs font-bold"
                    >
                      {favoritesCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-110"
            >
              <span className="text-2xl">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
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
