import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../services/api';
import { useCartStore } from '../../store/cartStore';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { Skeleton } from '../../components/ui/skeleton';
import { ArrowLeft, Star, ShoppingCart, AlertCircle } from 'lucide-react';

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailComponent,
});

function ProductDetailComponent() {
  const { productId } = Route.useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productsApi.getById(Number(productId)),
  });
  
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48" />
        <Card>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Error al cargar producto</h2>
          <p className="text-muted-foreground">
            No pudimos encontrar este producto.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/products">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a productos
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Button asChild variant="ghost" size="sm" className="gap-2">
        <Link to="/products">
          <ArrowLeft className="w-4 h-4" />
          Volver a productos
        </Link>
      </Button>
      
      <Card className="animate-fadeIn">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center bg-muted rounded-lg p-8">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-96 object-contain"
              />
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="secondary" className="capitalize">
                  {product.category}
                </Badge>
                
                <h1 className="text-3xl font-bold">
                  {product.title}
                </h1>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-semibold">
                      {product.rating.rate}
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    ({product.rating.count} reseñas)
                  </span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-4xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-semibold mb-2">Descripción</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              <Button
                onClick={() => addToCart(product)}
                size="lg"
                className="w-full gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar al Carrito
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
