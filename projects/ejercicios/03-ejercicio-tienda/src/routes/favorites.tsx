
import { createFileRoute, Link } from '@tanstack/react-router';
import { useFavoritesStore } from '../store/favoritesStore';
import { ProductCard } from '../components/ProductCard';

export const Route = createFileRoute('/favorites')({
  component: FavoritesPage,
});

function FavoritesPage() {
  const favorites = useFavoritesStore((s) => s.favorites);

  const isEmpty = favorites.length === 0;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Favoritos</h1>

      {isEmpty ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">
            No tienes productos en favoritos.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/products/"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Explorar productos
            </Link>
            <Link
              to="/"
                           className="inline-block border border-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}