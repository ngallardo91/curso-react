import { createFileRoute, Link } from '@tanstack/react-router';
import { useCartStore } from '../store/cartStore';
import { CartItemComponent } from '../components/CartItem';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { ShoppingCart, ShoppingBag, Trash2, Package } from 'lucide-react';

export const Route = createFileRoute('/cart')({
  component: CartComponent,
});

function CartComponent() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);
  
  if (items.length === 0) {
    return (
      <div className="text-center py-16 space-y-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center">
          <ShoppingCart className="w-12 h-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            Tu carrito está vacío
          </h2>
          <p className="text-muted-foreground">
            ¡Agrega productos para empezar a comprar!
          </p>
        </div>
        <Button asChild size="lg" className="gap-2">
          <Link to="/products">
            <Package className="w-4 h-4" />
            Ir a Productos
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">
            Carrito de Compras
          </h1>
          <Badge variant="secondary">
            {items.length} {items.length === 1 ? 'producto' : 'productos'}
          </Badge>
        </div>
        <Button
          onClick={clearCart}
          variant="destructive"
          className="gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Vaciar Carrito
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItemComponent key={item.product.id} item={item} />
          ))}
        </div>
        
        <Card className="h-fit animate-fadeIn">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Resumen del Pedido
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envío:</span>
                <span className="font-semibold">
                  {totalPrice > 50 ? (
                    <Badge variant="secondary">GRATIS</Badge>
                  ) : (
                    '$5.99'
                  )}
                </span>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary">
                ${(totalPrice + (totalPrice > 50 ? 0 : 5.99)).toFixed(2)}
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" size="lg">
              <Link to="/checkout">
                Proceder al Pago
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
