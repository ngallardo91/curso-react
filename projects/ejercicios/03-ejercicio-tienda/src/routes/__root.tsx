import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useCartStore } from '../store/cartStore';
import { useFavoriteStore } from '../store/favoriteStore';
import { Heart } from 'lucide-react';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalFavorites = useFavoriteStore((state) => state.quantity);
  
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
                  search={{
                    page: 1,
                    min: -1,
                    max: -1,
                    desc: "",
                    itemsQty: 8,
                    sort: "best-rated"
                  }}
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
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-all duration-200 hover:bg-blue-50"
                  activeProps={{
                    className: 'text-blue-600 font-semibold bg-blue-50',
                  }}
                >
                  
                </Link>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-center">
             <Link
              to="/favorites"
              className="relative text-gray-700 hover:text-red-500 transition-all duration-100 hover:scale-110"
            >
              <Heart className="w-7.5 h-7.5"/>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalFavorites}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-blue-600 transition-all duration-100 hover:scale-110"
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
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
