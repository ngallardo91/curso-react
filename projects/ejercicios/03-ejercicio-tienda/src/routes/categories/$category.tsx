import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ProductSkeleton } from '../../components/ProductSkeleton';

export const Route = createFileRoute('/categories/$category')({
  component: CategoryProductsComponent,
});

function CategoryProductsComponent() {
  const { category } = Route.useParams();
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => productsApi.getByCategory(category),
  });
  
  if (isLoading) {
    return (
      <div>
        <a
          href="/categories"
          className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
        >
          ← Volver a categorías
        </a>
        <h1 className="text-3xl font-bold text-gray-900 mb-6 capitalize">
          {category}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <ErrorMessage 
        message="Error al cargar los productos de esta categoría. Por favor, intenta nuevamente."
        onRetry={() => window.location.reload()}
      />
    );
  }
  
  return (
    <div>
      <a
        href="/categories"
        className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
      >
        ← Volver a categorías
      </a>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-6 capitalize">
        {category}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
