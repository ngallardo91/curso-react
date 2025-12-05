import { createFileRoute, Link } from '@tanstack/react-router';
import { useFavoritesStore } from '../../store/favoritesStore';
import { ProductCard } from '../../components/ProductCard';

export const Route = createFileRoute('/favorites/')({
  component: FavoritesComponent,
});

function FavoritesComponent() {
  const favorites = useFavoritesStore((state) => state.favorites);

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🤍</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          No tienes productos favoritos aún
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Marca productos con el corazón para guardarlos aquí.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Favoritos
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Estos son los productos que marcaste como favoritos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
