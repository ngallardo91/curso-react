import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner'


export const Route = createFileRoute('/categories/')({
  component: CategoriesComponent,
});

function CategoriesComponent() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: productsApi.getCategories,
  });
  
  if (isLoading) {
    return <div className="text-center py-8"><LoadingSpinner /></div>;
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Categorías
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories?.map((category) => (
          <a
            key={category}
            href={`/categories/${category}`}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-center card-hover animate-fadeIn transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-3 transition-transform duration-200 hover:scale-125">📦</div>
            <h3 className="text-xl font-semibold capitalize">
              {category}
            </h3>
          </a>
        ))}
      </div>
    </div>
  );
}
