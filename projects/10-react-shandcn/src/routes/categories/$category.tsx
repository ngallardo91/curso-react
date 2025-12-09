import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { ProductSkeleton } from '../../components/ProductSkeleton';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/categories/$category')({
  component: CategoryProductsComponent,
});

function CategoryProductsComponent() {
  const { category } = Route.useParams();
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => productsApi.getByCategory(category),
  });
  
  if (isLoading) {
    return (
      <div>
        <div className="mb-6 space-y-4">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link to="/categories">
              <ArrowLeft className="w-4 h-4" />
              Volver a categorías
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="h-9 w-64 bg-muted animate-pulse rounded" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <Button asChild variant="ghost" size="sm" className="gap-2 mb-6">
        <Link to="/categories">
          <ArrowLeft className="w-4 h-4" />
          Volver a categorías
        </Link>
      </Button>
      
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold capitalize">
          {category}
        </h1>
        <Badge variant="secondary">
          {products?.length} productos
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
