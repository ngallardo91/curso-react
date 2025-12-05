import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { productsApi } from '../../services/api';
import { useCartStore } from '../../store/cartStore';
import { useFavoritesStore } from '../../store/favoritesStore';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailComponent,
});

function ProductDetailComponent() {
  const { productId } = Route.useParams();
  const numericId = Number(productId);

  const addToCart = useCartStore((state) => state.addToCart);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(numericId));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const [added, setAdded] = useState(false);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productsApi.getById(numericId),
  });

  if (isLoading) {
    return <LoadingSpinner message="Cargando producto..." />;
  }

  if (error || !product) {
    return (
      <ErrorMessage
        title="No se pudo cargar el producto"
        message="Intenta nuevamente más tarde."
      />
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 flex items-center justify-center relative border border-gray-100 dark:border-gray-800">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-96 object-contain"
        />
        <button
          type="button"
          onClick={handleToggleFavorite}
          className="absolute top-4 right-4 rounded-full p-2 bg-white/90 dark:bg-gray-800/90 shadow-md hover:scale-110 transition-transform duration-200"
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <span
            className={`text-2xl ${
              isFavorite ? 'text-red-500' : 'text-gray-300'
            }`}
          >
            ♥
          </span>
        </button>
      </div>

      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {product.title}
          </h1>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center gap-4 mb-6">
          <span className="text-3xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
            {product.category}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <span className="text-yellow-500 text-xl">
            ⭐ {product.rating.rate.toFixed(1)}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            ({product.rating.count} reseñas)
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg"
        >
          {added ? '¡Agregado al carrito!' : 'Agregar al Carrito'}
        </button>
      </div>
    </div>
  );
}
