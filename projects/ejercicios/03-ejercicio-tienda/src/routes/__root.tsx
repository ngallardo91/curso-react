import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useCartStore } from '../store/cartStore';
import { useFavoritesStore } from '../store/favoritesStore';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalFavorites = useFavoritesStore((state) => state.getTotalFavorites());

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <nav className="bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Mi Tienda
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link
                  to="/products"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-800"
                  activeProps={{
                    className:
                      'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-gray-800 px-3 py-2 rounded-md',
                  }}
                >
                  Productos
                </Link>
                <Link
                  to="/categories"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-800"
                  activeProps={{
                    className:
                      'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-gray-800 px-3 py-2 rounded-md',
                  }}
                >
                  Categorías
                </Link>
                <Link
                  to="/favorites"
                  className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-800"
                  activeProps={{
                    className:
                      'flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-gray-800 px-3 py-2 rounded-md',
                  }}
                >
                  <span>Favoritos</span>
                  {totalFavorites > 0 && (
                    <span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-200">
                      {totalFavorites}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-yellow-500 dark:text-blue-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                aria-label="Cambiar tema"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>

              <Link
                to="/register"
                className="hidden sm:inline-flex text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-200"
                activeProps={{
                  className:
                    'hidden sm:inline-flex text-sm font-semibold text-blue-600 dark:text-blue-400 px-3 py-2 rounded-md bg-blue-50 dark:bg-gray-800',
                }}
              >
                Registrarse
              </Link>

              <Link
                to="/cart"
                className="relative inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
                activeProps={{
                  className:
                    'relative inline-flex items-center px-3 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-blue-700',
                }}
              >
                🛒
                <span className="ml-2">Carrito</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full animate-bounce">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-900 dark:text-gray-100">
        <Outlet />
      </main>

      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
