import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { useCartStore } from '../../store/cartStore';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';

export const Route = createFileRoute('/categories/$category')({
  component: CategoryProductsComponent,
});

function CategoryProductsComponent() {
  const { category } = Route.useParams();
  const addToCart = useCartStore((state) => state.addToCart);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => productsApi.getByCategory(category),
  });

  if (isLoading) {
    return <LoadingSpinner message="Cargando productos..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="No se pudieron cargar los productos"
        message="Intenta nuevamente más tarde."
      />
    );
  }

  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div>
      <Link
        to="/categories"
        className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
      >
        ← Volver a categorías
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {formattedCategory}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Productos dentro de la categoría seleccionada.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-900 dark:border dark:border-gray-800 rounded-lg shadow-md overflow-hidden card-hover animate-fadeIn"
          >
            <Link
              to="/products/$productId"
              params={{ productId: product.id.toString() }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain p-4 bg-white dark:bg-gray-900 transition-transform duration-300 hover:scale-110"
              />
            </Link>
            <div className="p-4 flex flex-col h-full">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-gray-100">
                {product.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm font-medium"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
