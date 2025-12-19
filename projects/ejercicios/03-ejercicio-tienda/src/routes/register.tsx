import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { registerSchema, type RegisterFormData } from '../types/register';

export const Route = createFileRoute('/register')({
  component: RegisterComponent,
});

function RegisterComponent() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptNewsletter: false,
      acceptTerms: false,
    },
  });

  const password = watch('password', '');

  // Calcular fortaleza de contraseña
  const getPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);

  const strengthColors = ['bg-gray-200', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-400', 'bg-green-600'];
  const strengthLabels = ['', 'Muy débil', 'Débil', 'Regular', 'Fuerte', 'Muy fuerte'];

  const onSubmit = async (data: RegisterFormData) => {
    // Simular registro
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Datos de registro:', data);
    setIsSuccess(true);

    // Redirigir después de 2 segundos
    setTimeout(() => {
      navigate({ to: '/' });
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Registro exitoso!
        </h2>
        <p className="text-gray-600 mb-4">
          Tu cuenta ha sido creada correctamente.
        </p>
        <p className="text-gray-500 text-sm">
          Redirigiendo al inicio...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        Crear Cuenta
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Únete a Mi Tienda y disfruta de ofertas exclusivas
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de usuario *
          </label>
          <input
            {...register('username')}
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="usuario123"
          />
          {errors.username && (
            <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
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
            placeholder="tu@email.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña *
          </label>
          <input
            {...register('password')}
            type="password"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="••••••••"
          />
          {/* Indicador de fortaleza */}
          {password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-2 flex-1 rounded ${
                      level <= passwordStrength ? strengthColors[passwordStrength] : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-600">
                Fortaleza: {strengthLabels[passwordStrength]}
              </p>
            </div>
          )}
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar Contraseña *
          </label>
          <input
            {...register('confirmPassword')}
            type="password"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Newsletter checkbox */}
        <div className="flex items-start space-x-3">
          <input
            {...register('acceptNewsletter')}
            type="checkbox"
            className="w-5 h-5 text-blue-600 mt-0.5 rounded"
          />
          <span className="text-gray-700 text-sm">
            Quiero recibir novedades y ofertas exclusivas por email
          </span>
        </div>

        {/* Terms checkbox */}
        <div className="flex items-start space-x-3">
          <input
            {...register('acceptTerms')}
            type="checkbox"
            className="w-5 h-5 text-blue-600 mt-0.5 rounded"
          />
          <span className="text-gray-700 text-sm">
            Acepto los términos y condiciones y la política de privacidad *
          </span>
        </div>
        {errors.acceptTerms && (
          <p className="text-red-600 text-sm">{errors.acceptTerms.message}</p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creando cuenta...' : 'Registrarse'}
        </button>

        {/* Login link */}
        <p className="text-center text-gray-600 text-sm">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
