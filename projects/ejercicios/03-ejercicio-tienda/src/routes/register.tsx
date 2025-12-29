import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '../types/register';

export const Route = createFileRoute('/register')({
  component: RegisterComponent,
});

function PasswordStrength({ password }: { password: string }) {
  const getStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getStrength();
  const labels = ['Muy débil', 'Débil', 'Regular', 'Fuerte', 'Muy fuerte'];
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i < strength ? colors[strength - 1] : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${strength < 3 ? 'text-orange-600' : 'text-green-600'}`}>
        Fortaleza: {labels[strength - 1] || 'Muy débil'}
      </p>
    </div>
  );
}

function RegisterComponent() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptNewsletter: false,
      acceptTerms: false,
    },
  });

  const password = watch('password');
  const completedFields = Object.keys(dirtyFields).length;
  const totalFields = 5; // username, email, password, confirmPassword, acceptTerms

  const onSubmit = async (data: RegisterFormData) => {
    // Simular registro
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log('Datos de registro:', data);
    setRegistrationSuccess(true);
    
    // Redirigir después de 2 segundos
    setTimeout(() => {
      navigate({ to: '/' });
    }, 2000);
  };

  if (registrationSuccess) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="text-6xl mb-4 animate-bounce">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Registro exitoso!
        </h2>
        <p className="text-gray-600">
          Tu cuenta ha sido creada. Redirigiendo...
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
        Completá el formulario para registrarte
      </p>

      {/* Indicador de progreso */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progreso</span>
          <span>{completedFields}/{totalFields} campos</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(completedFields / totalFields) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de usuario *
            </label>
            <input
              {...register('username')}
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                errors.username ? 'border-red-500' : dirtyFields.username && !errors.username ? 'border-green-500' : 'border-gray-300'
              }`}
              placeholder="mi_usuario"
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
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                errors.email ? 'border-red-500' : dirtyFields.email && !errors.email ? 'border-green-500' : 'border-gray-300'
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
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                className={`w-full px-4 py-2 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                  errors.password ? 'border-red-500' : dirtyFields.password && !errors.password ? 'border-green-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
            <PasswordStrength password={password || ''} />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar contraseña *
            </label>
            <div className="relative">
              <input
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                className={`w-full px-4 py-2 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${
                  errors.confirmPassword ? 'border-red-500' : dirtyFields.confirmPassword && !errors.confirmPassword ? 'border-green-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        {/* Checkboxes */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-3">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              {...register('acceptNewsletter')}
              type="checkbox"
              className="w-5 h-5 text-blue-600 mt-0.5 rounded"
            />
            <span className="text-gray-700 text-sm">
              Quiero recibir novedades y ofertas por email
            </span>
          </label>

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              {...register('acceptTerms')}
              type="checkbox"
              className="w-5 h-5 text-blue-600 mt-0.5 rounded"
            />
            <span className="text-gray-700 text-sm">
              Acepto los <a href="#" className="text-blue-600 hover:underline">términos y condiciones</a> y la <a href="#" className="text-blue-600 hover:underline">política de privacidad</a> *
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-red-600 text-sm">{errors.acceptTerms.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Creando cuenta...
            </span>
          ) : (
            'Crear Cuenta'
          )}
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-sm">
          ¿Ya tenés cuenta?{' '}
          <a href="#" className="text-blue-600 hover:underline font-medium">
            Iniciar sesión
          </a>
        </p>
      </form>
    </div>
  );
}
