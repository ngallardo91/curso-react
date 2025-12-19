import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { Card, CardContent, CardFooter, CardHeader } from '../../components/ui/card';
import { Skeleton } from '../../components/ui/skeleton';
import { Badge } from '../../components/ui/badge';
import { AlertCircle } from 'lucide-react';

export const Route = createFileRoute('/products/')({
  component: ProductsComponent,
});

function ProductCardSkeleton() {
  return (
    <Card>
      <CardHeader className="p-4">
        <Skeleton className="aspect-square w-full rounded-md" />
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-5 w-24" />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-9 w-24" />
      </CardFooter>
    </Card>
  );
}

function ProductsComponent() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAll,
  });
  
  if (isLoading) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="h-9 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Error al cargar productos</h2>
          <p className="text-muted-foreground">
            No pudimos cargar los productos. Por favor, intenta de nuevo más tarde.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold">
          Todos los Productos
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
