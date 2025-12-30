import { createFileRoute } from '@tanstack/react-router';
import { useFavoritesStore } from '../../store/favoritesStore';
import { ProductCard } from '../../components/ProductCard';

export const Route = createFileRoute('/favorites/')({
  component: FavoritesComponent,
});

function FavoritesComponent() {
  const favorites = useFavoritesStore((s) => s.favorites);

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">💖</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No tienes favoritos</h2>
        <p className="text-gray-600 mb-6">Guarda productos que te gusten para revisarlos después.</p>
        <a
          href="/products"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 inline-block"
        >
          Ir a Productos
        </a>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Tus Favoritos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
