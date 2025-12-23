import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, type CheckoutFormData } from '../../types/checkout';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

export const Route = createFileRoute('/checkout/')({
  beforeLoad: async () => {
    const { isAuthenticated } = useAuthStore.getState()

    if (!isAuthenticated) {
      throw redirect({ to: "/login" })
    }
  },
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
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No hay productos en el carrito
        </h2>
        <p className="text-gray-600 mb-6">
          Agrega productos antes de proceder al checkout
        </p>
        <a
          href="/products"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 inline-block"
        >
          Ir a Productos
        </a>
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
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Finalizar Compra
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Información Personal */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    {...register('firstName')}
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Juan"
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido *
                  </label>
                  <input
                    {...register('lastName')}
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Pérez"
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="juan@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+1234567890"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Dirección de Envío */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Dirección de Envío</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección *
                  </label>
                  <input
                    {...register('address')}
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Calle Principal 123"
                  />
                  {errors.address && (
                    <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ciudad *
                    </label>
                    <input
                      {...register('city')}
                      type="text"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Madrid"
                    />
                    {errors.city && (
                      <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado/Provincia *
                    </label>
                    <input
                      {...register('state')}
                      type="text"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Madrid"
                    />
                    {errors.state && (
                      <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Código Postal *
                    </label>
                    <input
                      {...register('zipCode')}
                      type="text"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.zipCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="28001"
                    />
                    {errors.zipCode && (
                      <p className="text-red-600 text-sm mt-1">{errors.zipCode.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Método de Pago */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
              
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    {...register('paymentMethod')}
                    type="radio"
                    value="credit_card"
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">💳 Tarjeta de Crédito</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    {...register('paymentMethod')}
                    type="radio"
                    value="debit_card"
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">💳 Tarjeta de Débito</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    {...register('paymentMethod')}
                    type="radio"
                    value="paypal"
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700">🅿️ PayPal</span>
                </label>
              </div>
              
              {errors.paymentMethod && (
                <p className="text-red-600 text-sm mt-2">{errors.paymentMethod.message}</p>
              )}
            </div>
            
            {/* Términos y Condiciones */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  {...register('acceptTerms')}
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 mt-0.5"
                />
                <span className="text-gray-700">
                  Acepto los términos y condiciones y la política de privacidad *
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="text-red-600 text-sm mt-2">{errors.acceptTerms.message}</p>
              )}
            </div>
            
            {/* Botón de Envío */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Procesando...' : 'Confirmar Compra'}
            </button>
          </form>
        </div>
        
        {/* Resumen del Pedido */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
            
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.product.title.substring(0, 30)}... x{item.quantity}
                  </span>
                  <span className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Envío:</span>
                <span className="font-semibold">
                  {totalPrice > 50 ? 'GRATIS' : '$5.99'}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">
                  ${(totalPrice + (totalPrice > 50 ? 0 : 5.99)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
