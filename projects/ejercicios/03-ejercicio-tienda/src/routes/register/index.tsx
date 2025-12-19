import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useMemo } from 'react';
import { registerSchema, type RegisterFormData } from '../../types/register';

export const Route = createFileRoute('/register/')({
  component: RegisterComponent,
});

function PasswordStrengthIndicator({ password }: { password: string }) {
  const getStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const strength = getStrength(password);
  const strengthLabels = ['Muy débil', 'Débil', 'Regular', 'Fuerte', 'Muy fuerte'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  if (!password) return null;

  const safeStrength = Math.max(1, Math.min(strength, 5));
  const colorIndex = safeStrength - 1;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded ${
              i < safeStrength ? strengthColors[colorIndex] : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${
        safeStrength <= 2 ? 'text-red-600' : safeStrength <= 3 ? 'text-yellow-600' : 'text-green-600'
      }`}>
        Fortaleza: {strengthLabels[colorIndex]}
      </p>
    </div>
  );
}

function RegisterComponent() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptNewsletter: false,
    },
  });

  const password = watch('password');
  const formValues = watch();

  const completedFields = useMemo(() => {
    const requiredFields = ['username', 'email', 'password', 'confirmPassword'];
    return requiredFields.filter((field) => {
      const value = formValues[field as keyof RegisterFormData];
      return value && String(value).trim().length > 0;
    }).length;
  }, [formValues]);

  const totalRequiredFields = 4;
  const completionPercentage = (completedFields / totalRequiredFields) * 100;

  const onSubmit = async (data: RegisterFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log('Datos de registro:', data);
    
    setShowSuccess(true);
    setTimeout(() => {
      navigate({ to: '/' });
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ¡Registro exitoso!
        </h2>
        <p className="text-gray-600 mb-6">
          Tu cuenta ha sido creada correctamente. Serás redirigido a la página principal...
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: '100%' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Crear Cuenta
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">
            Progreso del formulario
          </span>
          <span className="text-sm font-semibold text-blue-600">
            {completedFields}/{totalRequiredFields} campos completados
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Información de Cuenta</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de Usuario *
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
                placeholder="usuario@example.com"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

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
              <PasswordStrengthIndicator password={password || ''} />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
              )}
              <div className="mt-2 text-xs text-gray-500">
                <p>La contraseña debe contener:</p>
                <ul className="list-disc list-inside space-y-1 mt-1">
                  <li className={password && password.length >= 8 ? 'text-green-600' : ''}>
                    Al menos 8 caracteres
                  </li>
                  <li className={password && /[A-Z]/.test(password) ? 'text-green-600' : ''}>
                    Una letra mayúscula
                  </li>
                  <li className={password && /[a-z]/.test(password) ? 'text-green-600' : ''}>
                    Una letra minúscula
                  </li>
                  <li className={password && /[0-9]/.test(password) ? 'text-green-600' : ''}>
                    Un número
                  </li>
                  <li className={password && /[^A-Za-z0-9]/.test(password) ? 'text-green-600' : ''}>
                    Un carácter especial
                  </li>
                </ul>
              </div>
            </div>

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
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              {...register('acceptNewsletter')}
              type="checkbox"
              className="w-5 h-5 text-blue-600 mt-0.5"
            />
            <span className="text-gray-700">
              Acepto recibir novedades y ofertas especiales por email
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <a href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>
  );
}
