import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import React from 'react';
import { useCartStore } from '../store/cartStore';
import { useFavoritesStore } from '../store/favoritesStore';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalFavorites = useFavoritesStore((state) => state.getTotalFavorites());
  const [prevItems, setPrevItems] = React.useState(totalItems);
  const [prevFavorites, setPrevFavorites] = React.useState(totalFavorites);
  const [cartBounce, setCartBounce] = React.useState(false);
  const [favBounce, setFavBounce] = React.useState(false);
  
  React.useEffect(() => {
    if (totalItems !== prevItems && totalItems > prevItems) {
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 600);
    }
    setPrevItems(totalItems);
  }, [totalItems, prevItems]);
  
  React.useEffect(() => {
    if (totalFavorites !== prevFavorites && totalFavorites > prevFavorites) {
      setFavBounce(true);
      setTimeout(() => setFavBounce(false), 600);
    }
    setPrevFavorites(totalFavorites);
  }, [totalFavorites, prevFavorites]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105"
              >
                Mi Tienda
              </Link>
              <div className="flex space-x-4">
                <Link
                  to="/products"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-all duration-300 hover:bg-blue-50 transform hover:scale-105"
                  activeProps={{
                    className: 'text-blue-600 font-semibold bg-blue-50',
                  }}
                >
                  Productos
                </Link>
                <Link
                  to="/categories"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-all duration-300 hover:bg-blue-50 transform hover:scale-105"
                  activeProps={{
                    className: 'text-blue-600 font-semibold bg-blue-50',
                  }}
                >
                  Categorías
                </Link>
                <Link
                  to="/favorites"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-all duration-300 hover:bg-blue-50 transform hover:scale-105"
                  activeProps={{
                    className: 'text-blue-600 font-semibold bg-blue-50',
                  }}
                >
                  Favoritos
                </Link>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-all duration-300 hover:bg-blue-50 transform hover:scale-105"
                  activeProps={{
                    className: 'text-blue-600 font-semibold bg-blue-50',
                  }}
                >
                  Registro
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/favorites"
                className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-110 transform"
              >
                <span className="text-2xl transition-transform duration-300 hover:rotate-12">❤️</span>
                {totalFavorites > 0 && (
                  <span className={`absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg transition-all duration-300 ${favBounce ? 'animate-bounce' : ''}`}>
                    {totalFavorites}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-110 transform"
              >
                <span className="text-2xl transition-transform duration-300 hover:rotate-12">🛒</span>
                {totalItems > 0 && (
                  <span className={`absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg transition-all duration-300 ${cartBounce ? 'animate-bounce' : ''}`}>
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
