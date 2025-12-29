import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
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
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(Number(productId)));
  
  const { data: product, isLoading, error, refetch } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productsApi.getById(Number(productId)),
  });
  
  if (isLoading) {
    return <LoadingSpinner message="Cargando producto..." size="lg" />;
  }
  
  if (error || !product) {
    return (
      <ErrorMessage
        title="Producto no encontrado"
        message="No pudimos cargar este producto. Puede que no exista o haya un problema de conexión."
        onRetry={() => refetch()}
      />
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto">
      <a
        href="/products"
        className="text-blue-600 hover:text-blue-700 mb-6 inline-block transition-all duration-200 hover:-translate-x-1"
      >
        ← Volver a productos
      </a>
      
      <div className="bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn relative">
        {/* Botón de favoritos */}
        <button
          onClick={() => toggleFavorite(product)}
          className="absolute top-4 right-4 p-3 rounded-full bg-gray-100 hover:bg-gray-200 shadow-md transition-all duration-200 hover:scale-110 z-10"
          title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <span className={`text-2xl ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}>
            {isFavorite ? '❤️' : '🤍'}
          </span>
        </button>

        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 object-contain"
          />
        </div>
        
        <div>
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4 capitalize">
            {product.category}
          </span>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.title}
          </h1>
          
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 text-xl">⭐</span>
            <span className="text-lg text-gray-700 ml-2">
              {product.rating.rate} <span className="text-gray-500">({product.rating.count} reviews)</span>
            </span>
          </div>
          
          <p className="text-4xl font-bold text-blue-600 mb-6">
            ${product.price.toFixed(2)}
          </p>
          
          <p className="text-gray-700 mb-8 leading-relaxed">
            {product.description}
          </p>
          
          <button
            onClick={() => addToCart(product)}
            className="w-full py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
