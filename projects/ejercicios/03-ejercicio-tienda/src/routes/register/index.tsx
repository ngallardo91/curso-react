import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormType } from '../../types/register';

export const Route = createFileRoute('/register/')({
  component: RegisterComponent,
});

function RegisterComponent() {
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptNews: false,
    },
  });
  
  const onSubmit = async (data: RegisterFormType) => {
    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000));
   
    alert('¡Cliente registrado con éxito!');
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
                    Username *
                  </label>
                  <input
                    {...register('username')}
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.username ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Username"
                  />
                  {errors.username && (
                    <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Email@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <input
                    {...register('password')}
                    type="password"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="********"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="********"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Términos y Condiciones */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  {...register('acceptNews')}
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 mt-0.5"
                />
                <span className="text-gray-700">
                  Acepto recibir novedades
                </span>
              </label>
              {errors.acceptNews && (
                <p className="text-red-600 text-sm mt-2">{errors.acceptNews.message}</p>
              )}
            </div>
            
            {/* Botón de Envío */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Procesando...' : 'Registrarme'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
