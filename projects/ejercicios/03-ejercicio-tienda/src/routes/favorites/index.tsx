import { createFileRoute } from "@tanstack/react-router";
import { useFavoritesStore } from "../../store/favoritesStore";
import { ProductCard } from "../../components/ProductCard";

export const Route = createFileRoute("/favorites/")({
  component: FavoritesComponent,
});

function FavoritesComponent() {
  const favorites = useFavoritesStore((state) => state.items);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Favoritos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {favorites?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {favorites?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No se encontraron favoritos.
          </div>
        )}
      </div>
    </div>
  );
}
