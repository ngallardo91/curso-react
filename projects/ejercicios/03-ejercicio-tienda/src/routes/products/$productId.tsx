import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { productsApi } from '../../services/api';
import { useCartStore } from '../../store/cartStore';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailComponent,
});

function ProductDetailComponent() {
  const { productId } = Route.useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productsApi.getById(Number(productId)),
  });
  
  if (isLoading) {
    return <LoadingSpinner message="Cargando producto..." />;
  }
  
  if (error || !product) {
    return (
      <ErrorMessage 
        message="Error al cargar el producto. Por favor, intenta nuevamente."
        onRetry={() => window.location.reload()}
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
      
      <div className="bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
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
            onClick={() => {
              if (product) {
                addToCart(product);
                setShowFeedback(true);
                setTimeout(() => setShowFeedback(false), 2000);
              }
            }}
            className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg ${
              showFeedback
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white animate-pulse'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {showFeedback ? (
                <>
                  <span>✅</span>
                  <span>¡Agregado!</span>
                </>
              ) : (
                <>
                  <span>🛒</span>
                  <span>Agregar al Carrito</span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
