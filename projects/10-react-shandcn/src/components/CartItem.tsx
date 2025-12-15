import type { CartItem } from '../types/product';
import { useCartStore } from '../store/cartStore';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItem;
}

export function CartItemComponent({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  
  return (
    <Card className="animate-fadeIn hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 shrink-0 rounded-md overflow-hidden bg-muted">
            <img
              src={item.product.image}
              alt={item.product.title}
              className="w-full h-full object-contain p-2 transition-transform duration-200 hover:scale-110"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold mb-1 line-clamp-1">
              {item.product.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {item.product.description}
            </p>
            <p className="text-xl font-bold text-primary">
              ${item.product.price.toFixed(2)}
            </p>
          </div>
          
          <Separator orientation="vertical" className="h-auto" />
          
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold w-8 text-center">
                {item.quantity}
              </span>
              <Button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Separator className="w-full" />
            
            <div className="text-center space-y-2">
              <p className="text-xl font-bold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
              <Button
                onClick={() => removeFromCart(item.product.id)}
                variant="destructive"
                size="sm"
                className="w-full gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
