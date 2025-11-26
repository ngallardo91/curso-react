import { createFileRoute } from '@tanstack/react-router';
import { useFavoritesStore } from '../../store/favoritesStore';
import { ProductCard } from '../../components/ProductCard';

export const Route = createFileRoute('/favorites/')({
  component: FavoritesComponent,
});

function FavoritesComponent() {
  // Inyecta el nuevo store
  const favorites = useFavoritesStore((state) => state.favorites);

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">💔</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No tienes favoritos aún
        </h2>
        <p className="text-gray-600 mb-6">
          Guarda lo que te gusta para verlo después.
        </p>
        <a
          href="/products"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg inline-block"
        >
          Explorar Productos
        </a>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Mis Favoritos ❤️
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}