// src/routes/__root.tsx
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { useCartStore } from '../store/cartStore';
import { useFavoritesStore } from '../store/favoritesStore'; // Importar el store de favoritos

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  // const totalFavorites = useFavoritesStore((state) => state.getTotalFavorites()); // TODO: Uncomment when /favorites route is created

  return (
    <>
      <div className="p-4 flex justify-between items-center bg-gray-800 text-white">
        {/* ... Logo y Links principales ... */}
        <nav className="flex items-center space-x-4">
            {/* Link a Favoritos - TODO: Create /favorites route */}
            {/* <Link to="/favorites" className="relative hover:text-red-400 transition-colors">
              <span aria-hidden className="text-xl">❤️</span>
              {totalFavorites > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-xs text-white rounded-full h-4 w-4 flex items-center justify-center animate-bounce">
                  {totalFavorites}
                </span>
              )}
            </Link> */}
            {/* Link al Carrito */}
            <Link to="/cart" className="relative hover:text-yellow-400 transition-colors">
                🛒 Carrito
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-2 bg-yellow-500 text-xs text-black rounded-full h-4 w-4 flex items-center justify-center animate-bounce">
                        {totalItems}
                    </span>
                )}
            </Link>
        </nav>
      </div>
      <Outlet />
    </>
  );
}