import { createFileRoute } from '@tanstack/react-router';
import { useFavoritesStore } from '../../store/favoritesStore';
import { ProductCard } from '../../components/ProductCard';

export const Route = createFileRoute('/favorites/')({
  component: FavoritesComponent,
});

function FavoritesComponent() {
  const favorites = useFavoritesStore((state) => state.favorites);

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          No tenés favoritos
        </h2>
        <p className="text-gray-500">
          Marcá productos con el corazón ❤️ para verlos acá
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Mis Favoritos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}