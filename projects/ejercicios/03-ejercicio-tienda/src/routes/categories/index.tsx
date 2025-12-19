import { createFileRoute } from '@tanstack/react-router';
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
        message="Error al cargar las categorías. Por favor, intenta nuevamente."
        onRetry={() => window.location.reload()}
      />
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Categorías
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories?.map((category, index) => (
          <a
            key={category}
            href={`/categories/${category}`}
            className="group bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-center card-hover animate-fadeIn transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-4xl mb-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">📦</div>
            <h3 className="text-xl font-semibold capitalize transition-colors duration-300 group-hover:text-blue-600">
              {category}
            </h3>
          </a>
        ))}
      </div>
    </div>
  );
}
