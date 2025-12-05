import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';

export const Route = createFileRoute('/categories/')({
  component: CategoriesComponent,
});

function CategoriesComponent() {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: productsApi.getCategories,
  });

  if (isLoading) {
    return <LoadingSpinner message="Cargando categorías..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="No se pudieron cargar las categorías"
        message="Intenta nuevamente más tarde."
      />
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Categorías
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Explora los productos agrupados por categoría.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <Link
            key={category}
            to="/categories/$category"
            params={{ category }}
            className="bg-white dark:bg-gray-900 dark:border dark:border-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-center card-hover animate-fadeIn transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3 transition-transform duration-200 hover:scale-125">
              📦
            </div>
            <h3 className="text-xl font-semibold capitalize text-gray-900 dark:text-gray-100">
              {category}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
