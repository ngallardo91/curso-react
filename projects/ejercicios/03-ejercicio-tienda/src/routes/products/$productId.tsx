import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { useCartStore } from '../../store/cartStore';

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailComponent,
});

function ProductDetailComponent() {
  const { productId } = Route.useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productsApi.getById(Number(productId)), // Asegúrate de que tu API devuelve el producto completo
  });

  const addToCart = useCartStore((state) => state.addToCart);

  // Si está cargando, mostramos el spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center text-red-600 py-8">
        <ErrorMessage />
      </div>
    );
  }

  const product = data;

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
            src={product.image} // Usamos 'product' para acceder a los datos completos
            alt={product.title}
            className="max-h-96 object-contain"
          />
        </div>

        {/* Detalle del producto */}
        <div>
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4 capitalize">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.title}
          </h1>

          {/* Rating  */}
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 text-xl">⭐</span>
            <span className="text-lg text-gray-700 ml-2">
              {product.rating?.rate || 'No rating'} <span className="text-gray-500">({product.rating?.count || 0} reviews)</span>
            </span>
          </div>

          {/* Precio */}
          <p className="text-4xl font-bold text-blue-600 mb-6">
            ${product.price.toFixed(2)}
          </p>

          {/* Descripción */}
          <p className="text-gray-700 mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Botón para agregar al carrito */}
          <button
            onClick={() => addToCart(product)} // Pasamos el producto completo al carrito
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}