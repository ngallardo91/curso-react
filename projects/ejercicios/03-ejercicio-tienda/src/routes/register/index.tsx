import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormValues } from '../../types/register';
import { useState } from 'react';

export const Route = createFileRoute('/register/')({
  component: RegisterComponent,
});

function RegisterComponent() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: undefined
    }
  });

  // Función que se ejecuta si la validación pasa
  const onSubmit = async (data: RegisterFormValues) => {
    // Simular llamada 
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log('Datos enviados al backend:', data);
    setIsSuccess(true);
    reset();
    
    // Oculta el mensaje de éxito después de 3 seg
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Crear Cuenta 🚀
      </h1>

      {isSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center animate-fadeIn">
          ¡Registro exitoso! Bienvenido a la tienda.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* USERNAME */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Usuario</label>
          <input
            {...register('username')}
            type="text"
            className={`w-full p-2 border rounded-lg outline-none transition-all ${
              errors.username ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }`}
            placeholder="Tu usuario"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            {...register('email')}
            type="email"
            className={`w-full p-2 border rounded-lg outline-none transition-all ${
              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }`}
            placeholder="ejemplo@correo.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            {...register('password')}
            type="password"
            className={`w-full p-2 border rounded-lg outline-none transition-all ${
              errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }`}
            placeholder="******"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
          <input
            {...register('confirmPassword')}
            type="password"
            className={`w-full p-2 border rounded-lg outline-none transition-all ${
              errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            }`}
            placeholder="******"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* TERMS CHECKBOX */}
        <div className="flex items-center gap-2">
          <input
            {...register('terms')}
            type="checkbox"
            id="terms"
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="terms" className="text-sm text-gray-600 select-none cursor-pointer">
            Acepto recibir novedades y ofertas
          </label>
        </div>
        {errors.terms && (
            <p className="text-red-500 text-xs">{errors.terms.message}</p>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isSubmitting ? 'Creando cuenta...' : 'Registrarme'}
        </button>
      </form>
    </div>
  );
}