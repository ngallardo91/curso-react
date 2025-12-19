import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, type CheckoutFormData } from '../../types/checkout';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Checkbox } from '../../components/ui/checkbox';
import { Separator } from '../../components/ui/separator';
import { Badge } from '../../components/ui/badge';
import { Package, CreditCard, ShoppingBag } from 'lucide-react';

export const Route = createFileRoute('/checkout/')({
  component: CheckoutComponent,
});

function CheckoutComponent() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'credit_card',
      acceptTerms: false,
    },
  });
  
  // Redirigir si el carrito está vacío
  if (items.length === 0) {
    return (
      <div className="text-center py-16 space-y-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center">
          <Package className="w-12 h-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            No hay productos en el carrito
          </h2>
          <p className="text-muted-foreground">
            Agrega productos antes de proceder al checkout
          </p>
        </div>
        <Button asChild size="lg">
          <Link to="/products">
            Ir a Productos
          </Link>
        </Button>
      </div>
    );
  }
  
  const onSubmit = async (data: CheckoutFormData) => {
    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log('Datos del checkout:', data);
    console.log('Items:', items);
    console.log('Total:', totalPrice);
    
    // Limpiar carrito y redirigir
    clearCart();
    alert('¡Compra realizada con éxito! Gracias por tu compra.');
    navigate({ to: '/' });
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Finalizar Compra
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Información Personal */}
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      Nombre <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      {...register('firstName')}
                      placeholder="Juan"
                      className={errors.firstName ? 'border-destructive' : ''}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Apellido <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      {...register('lastName')}
                      placeholder="Pérez"
                      className={errors.lastName ? 'border-destructive' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">{errors.lastName.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="juan@example.com"
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Teléfono <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      placeholder="+1234567890"
                      className={errors.phone ? 'border-destructive' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Dirección de Envío */}
            <Card>
              <CardHeader>
                <CardTitle>Dirección de Envío</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">
                    Dirección <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address"
                    {...register('address')}
                    placeholder="Calle Principal 123"
                    className={errors.address ? 'border-destructive' : ''}
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive">{errors.address.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      Ciudad <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="city"
                      {...register('city')}
                      placeholder="Madrid"
                      className={errors.city ? 'border-destructive' : ''}
                    />
                    {errors.city && (
                      <p className="text-sm text-destructive">{errors.city.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">
                      Estado/Provincia <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="state"
                      {...register('state')}
                      placeholder="Madrid"
                      className={errors.state ? 'border-destructive' : ''}
                    />
                    {errors.state && (
                      <p className="text-sm text-destructive">{errors.state.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">
                      Código Postal <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="zipCode"
                      {...register('zipCode')}
                      placeholder="28001"
                      className={errors.zipCode ? 'border-destructive' : ''}
                    />
                    {errors.zipCode && (
                      <p className="text-sm text-destructive">{errors.zipCode.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Método de Pago */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Método de Pago
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  {...register('paymentMethod')}
                  defaultValue="credit_card"
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="credit_card" id="credit_card" />
                    <Label htmlFor="credit_card" className="flex items-center gap-2 cursor-pointer">
                      💳 Tarjeta de Crédito
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="debit_card" id="debit_card" />
                    <Label htmlFor="debit_card" className="flex items-center gap-2 cursor-pointer">
                      💳 Tarjeta de Débito
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
                      🅿️ PayPal
                    </Label>
                  </div>
                </RadioGroup>
                
                {errors.paymentMethod && (
                  <p className="text-sm text-destructive mt-2">{errors.paymentMethod.message}</p>
                )}
              </CardContent>
            </Card>
            
            {/* Términos y Condiciones */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="acceptTerms"
                    {...register('acceptTerms')}
                    className={errors.acceptTerms ? 'border-destructive' : ''}
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="acceptTerms"
                      className="text-sm cursor-pointer leading-none"
                    >
                      Acepto los términos y condiciones y la política de privacidad{' '}
                      <span className="text-destructive">*</span>
                    </Label>
                    {errors.acceptTerms && (
                      <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Botón de Envío */}
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full"
            >
              {isSubmitting ? 'Procesando...' : 'Confirmar Compra'}
            </Button>
          </form>
        </div>
        
        {/* Resumen del Pedido */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Resumen del Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground line-clamp-1">
                      {item.product.title.substring(0, 30)}... ×{item.quantity}
                    </span>
                    <span className="font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <Separator />
              
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
          </Card>
        </div>
      </div>
    </div>
  );
}
