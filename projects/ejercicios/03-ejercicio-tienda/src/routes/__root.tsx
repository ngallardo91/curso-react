import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useCartStore } from '../store/cartStore';
import { useFavoritesStore } from '../store/favoritesStore';
import { useThemeStore } from '../store/themeStore'; 

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const favoriteCount = useFavoritesStore((state) => state.favorites.length);
  
  // traigo el estado y la función del tema
  const { isDark, toggleTheme } = useThemeStore();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 dark:text-white transition-colors duration-300">
      
      {/* Navbar con soporte Dark Mode */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50 dark:bg-gray-900/95 dark:border-b dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-xl font-bold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
              >
                Mi Tienda
              </Link>
              <div className="flex space-x-4">
                <Link
                  to="/products"
                  search={{ page: 1, search: '', minPrice: '', maxPrice: '', sortBy: '' }}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-all duration-200 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                  activeProps={{ className: 'text-blue-600 font-semibold bg-blue-50 dark:bg-gray-800 dark:text-blue-400' }}
                >
                  Productos
                </Link>
                <Link
                  to="/categories"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-all duration-200 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                  activeProps={{ className: 'text-blue-600 font-semibold bg-blue-50 dark:bg-gray-800 dark:text-blue-400' }}
                >
                  Categorías
                </Link>
                
                <Link
                  to="/favorites"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md transition-all duration-200 hover:bg-red-50 relative dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-red-400"
                  activeProps={{ className: 'text-red-600 font-semibold bg-red-50 dark:bg-gray-800 dark:text-red-400' }}
                >
                  Favoritos ❤️
                  {favoriteCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                      {favoriteCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/register"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md transition-all duration-200 hover:bg-purple-50 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-purple-400"
                  activeProps={{ className: 'text-purple-600 font-semibold bg-purple-50 dark:bg-gray-800 dark:text-purple-400' }}
                >
                  Registro 👤
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* BOTÓN INTERRUPTOR SOL/LUNA */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xl"
                title={isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
              >
                {isDark ? '☀️' : '🌙'}
              </button>

              <Link
                to="/cart"
                className="relative text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-110 dark:text-gray-300 dark:hover:text-blue-400"
              >
                <span className="text-2xl">🛒</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
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