import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '../../types/register';
import { useCartStore } from '../../store/cartStore';

export const Route = createFileRoute('/register/')({
  component: RegisterComponent,
});

function RegisterComponent() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
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
  
  const onSubmit = async (data: RegisterFormData) => {
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
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Registro de Usuario
      </h1>
      
      <div className="flex flex-row justify-center">
        {/* Formulario */}
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
                  Teléfono
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
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Procesando...' : 'Confirmar'}
          </button>
        </form>
      </div>
    </div>
  );
}
