import type { Product } from '../types/product';
import { useCartStore } from '../store/cartStore';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { PriceTag } from './ui/price-tag';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 card-hover animate-fadeIn group">
      <Link to="/products/$productId" params={{ productId: product.id.toString() }}>
        <CardHeader className="p-4">
          <div className="aspect-square relative overflow-hidden rounded-md bg-muted">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 space-y-3">
        <Link to="/products/$productId" params={{ productId: product.id.toString() }}>
          <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">
              {product.rating.rate}
            </span>
          </Badge>
          <span className="text-sm text-muted-foreground">
            ({product.rating.count} reseñas)
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <PriceTag price={product.price} size="md" originalPrice={product.price} />
        <Button
          onClick={() => addToCart(product)}
          size="sm"
          className="gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Agregar
        </Button>
      </CardFooter>
    </Card>
  );
}
